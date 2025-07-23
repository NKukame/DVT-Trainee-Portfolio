import express from 'express';
import login from '../controllers/LoginController.js';
import { HomePortfolioController, HomeProjectController } from '../controllers/HomeController.js';
import { SearchEmployeeController, SearchProjectController } from '../controllers/SearchController.js';
import {createProfileController} from '../controllers/CreateProfileController.js';
import {UpdateProfileController} from '../controllers/UpdateProfileController.js';
import forgotPassword from '../controllers/ForgotPasswordController.js';
import { deleteProjectController, deleteProfileController } from '../controllers/DeleteController.js';
import signup from '../controllers/SignupController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


const totalRoutes = express.Router();


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@dvtsoftware.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email and password are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and password are required
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Incorrect email
 *       500:
 *         description: Internal server error during login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Login failed
 *                 detail:
 *                   type: string
 *                   example: Error message from server
 */
totalRoutes.post('/login',  login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@dvtsoftware.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MySecurePassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clw0z2k480000v8l5hnhn61ny
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: user@dvtsoftware.com
 *       400:
 *         description: Signup failed (e.g., validation error or duplicate email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: signup failed
 */
totalRoutes.post('/register', signup);

/**
 * @swagger
 * /create-profile:
 *   post:
 *     summary: Create a new user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - bio
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               introduction:
 *                 type: string
 *                 example: Software developer and tech enthusiast.
 *               profilePictureUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/images/john.jpg
 *     responses:
 *       200:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: profile creation
 */
totalRoutes.post('/create-profile', createProfileController); //done

/**
 * @swagger
 * /forgot-password:
 *   put:
 *     summary: Initiate password reset process
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@dvtsoftware.com
 *     responses:
 *       200:
 *         description: Password reset initiated (placeholder response)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: forgot password
 */
totalRoutes.put('/forgot-password', forgotPassword);

/**
 * @swagger
 * /profile/{name}:
 *   put:
 *     summary: Update a user's profile email
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - newEmail
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@dvtsoftware.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               newEmail:
 *                 type: string
 *                 format: email
 *                 example: newuser@dvtsoftware.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: clw123abc0001v8l5xyz987mn
 *                 name: John Doe
 *                 email: newuser@dvtsoftware.com
 *       400:
 *         description: Couldn't update profile
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Couldn't Update profile
 */
totalRoutes.put('/profile/:name', authenticateToken, UpdateProfileController)
/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete a project by ID and owner email
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: delete project controller
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
totalRoutes.delete('/project/:id', authenticateToken, deleteProjectController);

/**
 * @swagger
 * /profile/{email}:
 *   delete:
 *     summary: Delete a user profile using ID and email
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The user's email
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: deleted
 *                 deletedProfile:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@dvtsoftware.com
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
totalRoutes.delete('/profile/:email', authenticateToken, deleteProfileController);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: A list of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
totalRoutes.get('/projects', authenticateToken, HomeProjectController);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get all user profiles
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: A list of user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
totalRoutes.get('/profiles', HomePortfolioController); // /profiles/:id

/**
 * @swagger
 * /search/employee:
 *   get:
 *     summary: Search employees with filters, sorting and pagination
 *     tags:
 *       - Profile
 *
 *     # ──────────────────────────────
 *     # Free-text search
 *     # ──────────────────────────────
 *     parameters:
 *       - in: query
 *         name: query
 *         description: >
 *           Free-text search over name, surname, title, bio, company or
 *           department.
 *         schema:
 *           type: string
 *
 *     # ──────────────────────────────
 *     # Filter parameters (square-bracket notation)
 *     # ──────────────────────────────
 *       - in: query
 *         name: location
 *         description: Filter by one or more locations
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *       - in: query
 *         name: role
 *         description: Filter by one or more roles
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *       - in: query
 *         name: techStack
 *         description: Filter by one or more technology names
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *       - in: query
 *         name: industry
 *         description: Filter by one or more industries
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *     # ──────────────────────────────
 *     # Sorting parameters
 *     # ──────────────────────────────
 *       - in: query
 *         name: field
 *         description: Field to sort by
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: order
 *         description: Sort direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *
 *     # ──────────────────────────────
 *     # Pagination
 *     # ──────────────────────────────
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Employees not found
 *       500:
 *         description: Server error
 */
totalRoutes.get('/search/employee', SearchEmployeeController);



/**
 * @swagger
 * /search/project:
 *   get:
 *     summary: Search projects with filters, sorting and pagination
 *     tags:
 *       - Project
 *
 *     # ──────────────────────────────
 *     # Free-text search
 *     # ──────────────────────────────
 *     parameters:
 *       - in: query
 *         name: query
 *         description: >
 *           Free-text search over project name or description.
 *         schema:
 *           type: string
 *
 *     # ──────────────────────────────
 *     # Filter parameters (square-bracket notation)
 *     # ──────────────────────────────
 *       - in: query
 *         name: industries
 *         description: Filter by one or more industries
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *       - in: query
 *         name: techStack
 *         description: Filter by one or more tech-stack names
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *     # ──────────────────────────────
 *     # Sorting parameters
 *     # ──────────────────────────────
 *       - in: query
 *         name: field
 *         description: Field to sort by (e.g. createdAt)
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: order
 *         description: Sort direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *
 *     # ──────────────────────────────
 *     # Pagination
 *     # ──────────────────────────────
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Projects not found
 *       500:
 *         description: Server error
 */
totalRoutes.get('/search/project', authenticateToken, SearchProjectController);





export default totalRoutes;
