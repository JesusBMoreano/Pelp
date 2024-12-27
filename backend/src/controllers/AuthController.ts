import { DataSource } from 'typeorm';
import { Request, Response } from 'express'
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";

import config from "../config";

class AuthController{
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async login(req: Request, res: Response){
        let {username, password } = req.body;
        console.log(`Received username: ${username}, password: ${password}`);
        let userRole: string = "user";
        if (!(username && password)) {
            return res.status(400).send('No input for Username/Password');
        }

        const userRepository = this.dataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
           return res.status(401).send('User not found');
        }

        try {
        if(user.userRole !== 'USER'){
            res.status(401).send('Not a user');
            return;
        }
    } catch {
        return res.status(400).send('Error');
    }
        
        if (!user?.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send('Incorrect Password');
        }

        // Create JWT Token, lasts for 1hr
        const token = jwt.sign({ userRole, username }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token }); // Return the token as a JSON response
    }

    async register(req: Request, res: Response){
        let {username, password, firstName, lastName} = req.body;

        if (!(username && password && firstName && lastName)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const userRepository = this.dataSource.getRepository(User);
        let existingUser: User;
        try {
            existingUser = await userRepository.findOne({ where: { username } });
            if (existingUser) {
                return res.status(409).send("Username already exists");
            }
        } catch (error) {
            console.error(error);
        }

        const newUser = new User();
        newUser.username = username;
        newUser.password = password; 
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.userRole = 'USER';


        // Save the user to the database
        try {
            await userRepository.save(newUser);
            return res.status(201).send("User registered successfully");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error saving user");
        }
    }

    async business_login(req: Request, res: Response){
        let {username, password} = req.body;
        let userRole: string = "owner";
        console.log(`Received username: ${username}, password: ${password}`);  // Log the received data

        if (!(username && password)) { //No user input case
            res.status(400).send('No input for Username/Password');
        }

        //Get user from database
        const userRepository = this.dataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send('User not found');
        }
        try {
        //Check if account is a business account
        if(user.userRole !== 'OWNER'){
            return res.status(401).send('Not a Business Owner');
            
        } } catch {
            return res.status(400).send('Error');
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send('Incorrect Password');
            
        }

        // Create JWT Token, lasts for 1hr
        const token = jwt.sign({ userRole, username }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token }); // Return the token as a JSON response
    }


    async business_register(req: Request, res: Response){
        let {username, password, firstName, lastName} = req.body;

        if (!(username && password && firstName && lastName)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check if the username is already taken
        const userRepository = this.dataSource.getRepository(User);
        let existingUser: User;
        try {
            existingUser = await userRepository.findOne({ where: { username } });
            if (existingUser) {
                return res.status(409).send("Username already exists");
            }
        } catch (error) {
            console.error(error);
        }

        // Create a new user
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;  // This will be hashed automatically in the User entity
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.userRole = 'OWNER';


        // Save the user to the database
        try {
            await userRepository.save(newUser);
            return res.status(201).send("User registered successfully");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error saving user");
        }
    }

    async admin_login(req: Request, res: Response){
        let {username, password} = req.body;
        let userRole: string = "admin";
        console.log(`Received username: ${username}, password: ${password}`);  // Log the received data

        if (!(username && password)) { //No user input case
            res.status(400).send('No input for Username/Password');
        }

        //Get user from database
        const userRepository = this.dataSource.getRepository(User);
        let user: User;
        console.log(user)
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send('User not found');
        }

        try {
        //Check if account is a business account
        if(user.userRole !== 'ADMIN'){
            return res.status(401).send('Not an Admin');
            
        }
    } catch {
        return res.status(400).send('Error');
    }
        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send('Incorrect Password');
            
        }

        // Create JWT Token, lasts for 1hr
        const token = jwt.sign({ userRole }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token }); // Return the token as a JSON response
    }

}

export default AuthController;