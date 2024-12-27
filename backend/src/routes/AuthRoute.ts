import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { AppDataSource } from '../data-source';

const AuthRoute = Router();
const authController = new AuthController(AppDataSource); 

AuthRoute.post('/login', (req, res) => {
  authController.login(req, res); 
});

AuthRoute.post('/register', (req, res) => {
    authController.register(req, res);
});

AuthRoute.post('/business_login', (req, res) => {
  authController.business_login(req, res);
});

AuthRoute.post('/business_register', (req, res) => {
    authController.business_register(req, res);
});

AuthRoute.post('/admin_login', (req, res) => {
  authController.admin_login(req, res);
});

export default AuthRoute;
