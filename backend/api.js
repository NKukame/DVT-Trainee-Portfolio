import express from 'express';
import cors from 'cors';
import { enhance } from '@zenstackhq/runtime';
import { PrismaClient } from '@prisma/client';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import totalRoutes from './routes/TotalRoutes.js';
import { RestApiHandler } from '@zenstackhq/server/api';

const prisma = new PrismaClient();
const REST_API = express.Router();

REST_API.use(express.json());
REST_API.use(cors());
REST_API.use(
    '/api/v2',
    ZenStackMiddleware({
        getPrisma: (request) => enhance(prisma, undefined, {
            // Prisma Accelerate limits interactive transaction timeout to 15s
            // Ref: P6005 error from Accelerate
            transactionMaxWait: 10_000,
            transactionTimeout: 15_000,
        }),
    })
);



REST_API.use(totalRoutes);

export default REST_API;