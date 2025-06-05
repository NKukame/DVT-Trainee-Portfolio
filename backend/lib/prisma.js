import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

// Create Redis connection
const redis = new Redis();

// Log Redis connection
redis.on('connect', () => {
    console.log('✅ Redis connected');
});

redis.on('error', (err) => {
    console.error('❌ Redis error:', err);
});

// Create Prisma client
const prisma = new PrismaClient();

// Create Redis cache middleware
const cacheMiddleware = createPrismaRedisCache({
    redis,
    keyGenerator: (model, action, args) => {
        return `${model}:${action}:${JSON.stringify(args)}`;
    },
    cacheTime: 300, // 5 minutes
});

// Apply caching to Prisma
prisma.$use(cacheMiddleware);

console.log('🚀 Prisma with Redis caching initialized');

export default prisma;
export { redis }; // Export Redis instance for use in other modules