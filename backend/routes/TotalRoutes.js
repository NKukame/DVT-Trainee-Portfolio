import express from 'express';
import login from '../controllers/LoginController.js';
import { HomePortfolioController, HomeProjectController } from '../controllers/HomeController.js';
import { SearchEmployeeController, SearchProjectController } from '../controllers/SearchController.js';
import {createProfileController} from '../controllers/CreateProfileController.js';
import {UpdateProfileController} from '../controllers/UpdateProfileController.js';
import {forgotPassword} from '../controllers/ForgotPasswordController.js';
import { deleteProjectController, deleteProfileController } from '../controllers/DeleteController.js';
import signup from '../controllers/SignupController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const totalRoutes = express.Router();

totalRoutes.post('/login', login);
totalRoutes.post('/register', signup);
totalRoutes.put('/forgot-password', forgotPassword);

totalRoutes.post('/create-profile', authenticateToken , createProfileController);
totalRoutes.put('/profile/:name', authenticateToken , UpdateProfileController);

totalRoutes.delete('/project/:id', authenticateToken , deleteProjectController);
totalRoutes.delete('/profile/:email', authenticateToken , deleteProfileController);

totalRoutes.get('/project-showcase', authenticateToken, HomeProjectController);
totalRoutes.get('/team-cards-showcase', authenticateToken, HomePortfolioController); 
totalRoutes.get('/profile/:name', authenticateToken, SearchEmployeeController);
totalRoutes.get('/project/:name', authenticateToken, SearchProjectController);

export default totalRoutes;