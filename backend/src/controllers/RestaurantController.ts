import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { Restaurant } from "../entity/Restaurant";

export class RestaurantController {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async newRestaurant(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);
    const restaurant = restaurantRepository.create(req.body);

    try {
      await restaurantRepository.save(restaurant);
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ message: "Error creating restaurant", error });
    }
  }

  async getRestaurant(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);
    const { id } = req.params;
    try {
      const restaurant = await restaurantRepository.findOneOrFail({
        where: { id: Number(id) },
        relations: ["cuisines", "foodCategories", "reviews", "photos"],
      });
      res.json(restaurant);
    } catch (error) {
      res.status(404).json({ message: "Restaurant not found", error });
    }
  }

  async getRestaurants(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);

    try {
      const restaurants = await restaurantRepository.find({
        relations: ["photos"],
      });
      res.json(restaurants);
    } catch (error) {
      res.status(400).json({ message: "Error fetching restaurants", error });
    }
  }

  async updateRestaurant(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);
    const { id } = req.params;

    try {
      await restaurantRepository.update(id, req.body);
      const updatedRestaurant = await restaurantRepository.findOneOrFail({
        where: { id: Number(id) },
      });
      res.json(updatedRestaurant);
    } catch (error) {
      res.status(400).json({ message: "Error updating restaurant", error });
    }
  }

  async deleteRestaurant(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);
    const { id } = req.params;

    try {
      await restaurantRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error deleting restaurant", error });
    }
  }

  async getDuplicates(req: Request, res: Response) {
    const restaurantRepository = this.dataSource.getRepository(Restaurant);
    try {
      const restaurants = await restaurantRepository.find();
      const nameCount: {
        [key: string]: { count: number; objects: Restaurant[] };
      } = {};
      restaurants.forEach((restaurant) => {
        if (!nameCount[restaurant.name]) {
          nameCount[restaurant.name] = { count: 0, objects: [] };
        }
        nameCount[restaurant.name].count++;
        nameCount[restaurant.name].objects.push(restaurant);
      });
      const duplicates = Object.values(nameCount)
        .filter((entry) => entry.count > 1)
        .flatMap((entry) => entry.objects);
      res.json(duplicates);
    } catch (error) {
      res.status(400).json({ message: "Error finding duplicates", error });
    }
  }
}
