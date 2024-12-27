import { Express, Request, Response } from 'express'
import { DataSource } from 'typeorm';
import { User } from "../entity/User";



export class UserController{
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
      this.dataSource = dataSource;
  }

  async getUsers(req: Request, res: Response){
    const userRepository = this.dataSource.getRepository(User);
    try {
      const users = await userRepository.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching Users', error });
    }
  }

  async getUser(req: Request, res: Response) {
    const userRepository = this.dataSource.getRepository(User);
    const { username } = req.params;  // Extract username from request parameters

    try {
        const user = await userRepository.findOneOrFail({ where: { username: String(username) } });
        res.json(user);  // Return the user data
    } catch (error) {
        res.status(404).json({ message: 'User not found', error });  // Handle user not found
    }
}
  /*
  async addUser(req: Request, res: Response){
    const {username, password} = req.body;
  }

  async deleteUser(req: Request, res: Response){
    const {username, password} = req.body;
  }
  */
}