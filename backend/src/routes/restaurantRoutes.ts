import { Application, NextFunction, Request, Response } from "express";
import { DataSource } from "typeorm";
import { RestaurantController } from "../controllers/RestaurantController";
import multer from "multer";
import { AppDataSource } from "../data-source";
import { Restaurant } from "../entity/Restaurant";
import { Image } from "../entity/Image";
export const restaurantRoutes = (
  app: Application,
  dataSource: DataSource
): void => {
  const restaurantController = new RestaurantController(dataSource);

  app.post("/restaurant/newRestaurant", (req: Request, res: Response) =>
    restaurantController.newRestaurant(req, res)
  );
  app.get("/restaurant/:id", (req: Request, res: Response) =>
    restaurantController.getRestaurant(req, res)
  );
  app.get("/restaurants", (req: Request, res: Response) =>
    restaurantController.getRestaurants(req, res)
  );
  app.put("/restaurant/:id", (req: Request, res: Response) =>
    restaurantController.updateRestaurant(req, res)
  );
  app.delete("/restaurant/:id", (req: Request, res: Response) =>
    restaurantController.deleteRestaurant(req, res)
  );
  app.get("/restaurants/getDuplicates", (req: Request, res: Response) =>
    restaurantController.getDuplicates(req, res)
  );
  // Image Storage
  // Configure multer for file storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../frontend/public/"); // TODO: Change this to S3 in future
      // Specify the directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  app.post(
    "/restaurant/:id/photos",
    upload.array("photos", 10),
    async (req: Request, res: any) => {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const { id } = req.params;
      console.log(req.files);
      const uploadedFiles = (req.files as Express.Multer.File[]).map(
        (file) => ({
          filename: file.filename.replace(/\s/g, "_"),
          originalname: file.originalname,
          size: file.size,
        })
      );

      // Link images to the restaurant

      await saveImagesToDatabase(uploadedFiles, parseInt(id));

      res.json({
        message: "Files uploaded successfully",
        files: uploadedFiles,
      });
    }
  );

  app.delete("/restaurant/:id/photos", async (req: Request, res: any) => {
    const { id } = req.params;
    const { photoIds } = req.body;

    if (!photoIds || !Array.isArray(photoIds) || photoIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or empty photo IDs array" });
    }

    try {
      const deletedPhotos = await deleteImagesFromDatabase(
        photoIds,
        parseInt(id)
      );
      return res.json({
        message: "Photos deleted successfully",
        deletedPhotos: deletedPhotos,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to delete photos", details: error.message });
    }
  });
};

async function saveImagesToDatabase(
  uploadedFiles: {
    filename: string;
    originalname: string;
    size: number;
  }[],
  restaurantId: number
) {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const imageRepository = AppDataSource.getRepository(Image);
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  console.log("RESULT: " + restaurant);

  const savedImages = await Promise.all(
    uploadedFiles.map(async (file) => {
      const image = new Image();
      image.filename = file.filename;
      image.filepath = ("./" + file.filename).replace(/\\/g, "/"); // Convert backslashes to forward slashes
      image.restaurant = restaurant;

      return await imageRepository.save(image);
    })
  );

  console.log("IMAGES added to database", savedImages);
  return savedImages;
}

async function deleteImagesFromDatabase(
  photoIds: number[],
  restaurantId: number
): Promise<Image[]> {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const imageRepository = AppDataSource.getRepository(Image);

  const restaurant = await restaurantRepository.findOne({
    where: {
      id: restaurantId,
    },
    relations: ["photos"],
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const imagesToDelete = restaurant.photos.filter((image) =>
    photoIds.includes(image.id)
  );

  if (imagesToDelete.length === 0) {
    throw new Error("No matching photos found for the given IDs");
  }

  const deletedImages = await imageRepository.remove(imagesToDelete);

  return deletedImages;
}
