/**
 * Authentication routes for the application.
 *
 * This module defines the routes related to user authentication, including login, registration,
 * and password recovery. The corresponding route handlers are defined in their respective
 * controller files. As of now, these handlers are placeholders and do not perform actual authentication logic.
 *
 * Routes:
 *  - POST /login           → Handles user login (currently a placeholder).
 *  - POST /register        → Handles user registration (currently a placeholder).
 *  - POST /forgot-password → Initiates password reset process (currently unimplemented).
 */
import express from 'express';
import { login } from '../controllers/LoginController.js';
import { register } from '../controllers/RegisterController.js';

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', register);
export default authRoute;