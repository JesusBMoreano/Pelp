import * as express from "express";
import { Request, Response } from "express";
import { Restaurant } from "../entity/Restaurant";
import { AppDataSource } from "../data-source";
import { Equal, FindOptionsWhere, Like } from "typeorm";
const searchRouter = express.Router();

searchRouter.post("/", (req: Request, res: Response) => {
  try {
    // TODO: Add validation handlers
    const restaurant: Restaurant = req.body;
    const repository = AppDataSource.getRepository(Restaurant);
    const restaurantCreated = repository.create(restaurant);
    repository.save(restaurantCreated);

    res.status(200).send("OK");
  } catch (err) {
    // TODO: Add other error handlers
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

searchRouter.get("/", async (req: Request, res: Response) => {
  try {
    const restaurantRepository = AppDataSource.getRepository(Restaurant);

    // Extract query parameters
    const {
      name,
      cuisine,
      zipCode,
      foodCategory,
      rating,
      price,
      page = 1,
      limit = 10,
    } = req.query;

    // Apply pagination
    const take = parseInt(limit as string);
    const skip = (parseInt(page as string) - 1) * take;

    // Build where clause for filtering
    const where: FindOptionsWhere<Restaurant> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    if (zipCode) {
      where.zipCode = Like(`%${zipCode}%`);
    }

    if (price) {
      where.price = Equal(parseInt(price.toString()));
    }

    let [restaurants, total] = await restaurantRepository.findAndCount({
      relations: ["foodCategories", "cuisines", "photos", "reviews"],
      where: where,
      skip: skip,
      take: take,
      order: {
        name: "ASC", //Question: Order based on location?
      },
    });

    // Filter out based on cuisines
    if (cuisine) {
      restaurants = restaurants.filter((res) => {
        for (const cuis of res.cuisines) {
          if (cuis.id === parseInt(cuisine.toString())) return res;
        }
      });
    }

    // Filter out based on foodCategory
    if (foodCategory) {
      restaurants = restaurants.filter((res) => {
        for (const cat of res.foodCategories) {
          if (cat.id === parseInt(foodCategory.toString())) return res;
        }
      });
    }
    // Filter out based on rating
    if (rating) {
      restaurants = restaurants.filter((res) => {
        const totalRating = res.reviews.reduce(
          (sum, entry) => sum + entry.rating,
          0
        );
        const averageRating = totalRating / res.reviews.length;

        if (averageRating >= parseFloat(rating.toString())) return res;
      });
    }

    const response = {
      restaurants,
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(total / take),
      totalItems: total,
    };

    res.status(200).send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default searchRouter;
