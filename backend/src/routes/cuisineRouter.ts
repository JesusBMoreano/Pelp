import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cuisine } from "../entity/Cuisine";

const cuisineRouter = express.Router();

cuisineRouter.get("/", async (req: Request, res: Response) => {
  try {
    const cuisineRepository = AppDataSource.getRepository(Cuisine);
    const cuisines = await cuisineRepository.find();

    res.status(200).send(cuisines);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default cuisineRouter;
