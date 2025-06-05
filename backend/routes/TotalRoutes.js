import express from 'express';
import login from '../controllers/LoginController.js';
import { HomePortfolioController, HomeProjectController } from '../controllers/HomeController.js';
import { SearchEmployeeController, SearchProjectController } from '../controllers/SearchController.js';
import {createProfileController} from '../controllers/CreateProfileController.js';
import {UpdateProfileController} from '../controllers/UpdateProfileController.js';
import {forgotPassword} from '../controllers/ForgotPasswordController.js';
import { deleteProjectController, deleteProfileController } from '../controllers/DeleteController.js';
import signup from '../controllers/SignupController.js';
import { redis } from '../lib/prisma.js';


const totalRoutes = express.Router();

totalRoutes.post('/login', login);
totalRoutes.post('/register', signup);
totalRoutes.post('/create-profile', createProfileController); //done

totalRoutes.put('/forgot-password', forgotPassword);
totalRoutes.put('/profile/:name', UpdateProfileController)


totalRoutes.delete('/project/:id', deleteProjectController);
totalRoutes.delete('/profile/:email', deleteProfileController);


totalRoutes.get('/project-showcase', HomeProjectController);
totalRoutes.get('/team-cards-showcase', HomePortfolioController); // /profiles/:id

totalRoutes.get('/profile/:name', SearchEmployeeController);
totalRoutes.get('/project/:name', SearchProjectController);


// Middleware to check Redis cache
totalRoutes.get('/test-cache', async (req, res) => {
  try {
    // Test Redis connection
    const pongResult = await redis.ping();
    
    // Get cache info
    const cacheKeys = await redis.keys('*');
    
    res.json({
      success: true,
      redis: {
        connected: pongResult === 'PONG',
        totalCacheKeys: cacheKeys.length,
        cacheKeys: cacheKeys.slice(0, 10) // Show first 10 keys
      },
      message: 'Redis is working! Try calling /team-cards-showcase twice to see caching in action.'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default totalRoutes;
