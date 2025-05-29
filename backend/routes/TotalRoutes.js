import express from 'express';
import login from '../controllers/LoginController.js';
import { HomePortfolioController, HomeProjectController } from '../controllers/HomeController.js';
import { SearchEmployeeController, SearchProjectController } from '../controllers/SearchController.js';
import {createProfileController} from '../controllers/CreateProfileController.js';
import {UpdateProfileController} from '../controllers/UpdateProfileController.js';
import {forgotPassword} from '../controllers/ForgotPasswordController.js';
import { deleteProjectController, deleteProfileController } from '../controllers/DeleteController.js';
import signup from '../controllers/SignupController.js';

const totalRoutes = express.Router();

totalRoutes.post('/login', login);
totalRoutes.post('/register', signup);
totalRoutes.post('/create-profile', createProfileController);

totalRoutes.put('/forgot-password', forgotPassword);
totalRoutes.put('/profile/:name', UpdateProfileController)


totalRoutes.delete('/project/:id', deleteProjectController);
totalRoutes.delete('/profile/:id', deleteProfileController);


totalRoutes.get('/project-showcase', HomeProjectController);
totalRoutes.get('/team-cards-showcase', HomePortfolioController); // /profiles/:id

totalRoutes.get('/profile/:name', SearchEmployeeController);
totalRoutes.get('/project/:name', SearchProjectController);

export default totalRoutes;