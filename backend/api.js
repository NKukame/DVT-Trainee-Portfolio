import express from 'express';
import cors from 'cors'
import authRoute from './routes/AuthRoutes.js';

const REST_API = express.Router();
REST_API.use(express.json());
REST_API.use(cors());
REST_API.use('/auth', authRoute);

export default REST_API;