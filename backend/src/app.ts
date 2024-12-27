import express, { Request, Response } from "express";

import { AppDataSource } from "./data-source";
import { restaurantRoutes } from "./routes/restaurantRoutes";
import { reviewRoutes } from "./routes/reviewRoutes";
import AuthRoute from "./routes/AuthRoute";
import UserRoute from "./routes/UserRoute";
import searchRouter from "./routes/searchRouter";
import cuisineRouter from "./routes/cuisineRouter";
import cors from "cors";
import foodCategoryRouter from "./routes/foodCategoryRouter";
import * as dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    console.log("Data Source has been initialized!");
    reviewRoutes(app, AppDataSource);
    restaurantRoutes(app, AppDataSource);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// Initialize Express
const app = express();

// Enable CORS
const corsOptions = {
  origin: "*", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
// This allows requests from any origin
app.use(express.json()); // For parsing application/json

// Define port
const PORT: number = parseInt(process.env.PORT || "8080", 10);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

//Routes
app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/search", searchRouter);
app.use("/cuisine", cuisineRouter);
app.use("/foodCategory", foodCategoryRouter);

// Global error handler (optional)
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

// Global error handler (optional)
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

// Start the server
// Start the server and bind it to 0.0.0.0 to accept all incoming connections
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
