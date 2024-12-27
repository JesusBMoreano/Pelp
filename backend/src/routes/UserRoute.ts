import { Router } from 'express';
import {UserController} from '../controllers/UserController';
import { AppDataSource } from '../data-source';

const UserRouter = Router();
const userController = new UserController(AppDataSource);  // Pass the initialized dataSource

UserRouter.get('/allUsers', async (req, res) => {
    try {
        await userController.getUsers(req, res);  // Call the method to get all users
      } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ message: "Internal Server Error" });  // Return a 500 error
      }
});

// Get a user by username
UserRouter.get('/user/:username', async (req, res) => {
  try {
    await userController.getUser(req, res);  // Call the new method
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default UserRouter;