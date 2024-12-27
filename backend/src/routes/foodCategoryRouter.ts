import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cuisine } from "../entity/Cuisine";
import { FoodCategory } from "../entity/FoodCategory";

const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const foodCategory = AppDataSource.getRepository(FoodCategory);
    const foodCategories = await foodCategory.find();

    res.status(200).send(foodCategories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default foodCategoryRouter;
