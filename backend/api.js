import express from 'express';
import cors from 'cors';
import totalRoutes from './routes/TotalRoutes.js';

const REST_API = express.Router();
REST_API.use(express.json());
REST_API.use(cors());
REST_API.use(totalRoutes);

export default REST_API;