
const express = require('express');
const login = require('../controllers/LoginController.js');
const register = require('../controllers/RegisterController.js');
const { HomePortfolioController, HomeProjectController } = require('../controllers/HomeController.js');
const {SearchEmployeeController, SearchProjectController} = require('../controllers/SearchController.js');
const createProfileController = require('../controllers/CreateProfileController.js');
const UpdateProfileController = require('../controllers/UpdateProfileController.js');
const forgotPassword = require('../controllers/ForgotPasswordController.js');
const {deleteProjectController, deleteProfileController} = require('../controllers/DeleteController.js');

const totalRoutes = express.Router();

totalRoutes.post('/login', login);
totalRoutes.post('/register', register);
totalRoutes.post('/create-profile', createProfileController);

totalRoutes.put('/forgot-password', forgotPassword);
totalRoutes.put('/profile/:name', UpdateProfileController)


totalRoutes.delete('/project/:id', deleteProjectController);
totalRoutes.delete('/profile/:id', deleteProfileController);


totalRoutes.get('/project-showcase', HomeProjectController);
totalRoutes.get('/team-cards-showcase', HomePortfolioController); // /profiles/:id

totalRoutes.get('/profile/:name', SearchEmployeeController);
totalRoutes.get('/project/:name', SearchProjectController);

module.exports = totalRoutes;