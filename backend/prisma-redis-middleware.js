import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

// Create Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  retryDelayOnFailover: 100,
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

// Create Prisma client
const prisma = new PrismaClient();

// Create Redis cache middleware
const prismaRedisCache = createPrismaRedisCache({
  redis,
  keyGenerator: (model, action, args) => {
    return `${model}:${action}:${JSON.stringify(args)}`;
  },
  cacheTime: {
    default: 300,    // 5 minutes for most queries
    Employee: 600,   // 10 minutes for employees (they don't change often)
    Project: 300,    // 5 minutes for projects
    User: 180,       // 3 minutes for users
  },
});

// Apply Redis caching to Prisma
prisma.$use(prismaRedisCache());

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  redis.disconnect();
  process.exit(0);
});

export { redis };
export default prisma;
