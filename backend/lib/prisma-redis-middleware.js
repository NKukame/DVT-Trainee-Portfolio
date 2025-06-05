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
  cacheTime: 300,
  redis:{
    client: redis,
    invalidation: {
      referencesTTL: 300, // 5 minutes
      log: console
    }
  },

  models: [{model:'User'}, {model:'Project'}, {model:'Employee'}],

  onHit: (key) => {
    console.log("hit", key);
  },

  onMiss: (key) => {
    console.log("miss", key);
  },

  onError: (key) => {
    console.log("error", key);
  }
});

// Apply Redis caching to Prisma
prisma.$use(prismaRedisCache);

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  redis.disconnect();
  process.exit(0);
});

export { redis };
export default prisma;