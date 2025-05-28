/**
 * Authentication routes for the application.
 *
 * This module defines the routes related to user authentication, including login, registration,
 * and password recovery. The corresponding route handlers are defined in their respective
 * controller files. As of now, these handlers are placeholders and do not perform actual authentication logic.
 *
 * Routes:
 *  - POST /login           → Handles user login (currently a placeholder).
 *  - POST /signup        → Handles user registration (currently a placeholder).
 *  - POST /forgot-password → Initiates password reset process (currently unimplemented).
 */
import express from 'express';
<<<<<<< HEAD
import { login } from '../controllers/LoginController.js';
import { register } from '../controllers/RegisterController.js';
=======
import login from '../controllers/LoginController.js';
import signup from '../controllers/SignupController.js';
import forgotPassword from '../controllers/ForgotPasswordController.js';
>>>>>>> 951db540789b6492e16e551763347f31637e7f60

const authRoute = express.Router();

authRoute.post('/login', login);
<<<<<<< HEAD
authRoute.post('/register', register);
=======
authRoute.post('/signup', signup );
authRoute.post('/forgot-password', forgotPassword);

>>>>>>> 951db540789b6492e16e551763347f31637e7f60
export default authRoute;