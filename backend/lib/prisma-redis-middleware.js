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

// Create Redis cache middleware - CORRECTED STRUCTURE
const prismaRedisCache = createPrismaRedisCache({
  cacheTime: 300, // Default cache time
  storage: {  // Use 'storage' instead of 'redis'
    type: "redis",
    options: {
      client: redis,
      invalidation: {
        referencesTTL: 300, // 5 minutes
      },
      log: console
    }
  },
  models: [
    { model: '*', cacheTime: 3000 }, 
    { model: 'Project', cacheTime: 3000 }
  ],
  onHit: (key) => {
    console.log("🎯 CACHE HIT:", key);
  },
  onMiss: (key) => {
    console.log("❌ CACHE MISS:", key);
  },
  onError: (key, error) => {
    console.log("💥 CACHE ERROR:", key, error);
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

// If you need manual Redis operations, export these methods
export const redisOperations = {
  // Manual get/set methods if needed
  async get(key) {
    return await redis.get(key);
  },
  
  async set(key, value, ttl = 300) {
    return await redis.set(key, value, 'EX', ttl);
  },
  
  async del(key) {
    return await redis.del(key);
  },
  
  async keys(pattern = '*') {
    return await redis.keys(pattern);
  },
  
  async flushall() {
    return await redis.flushall();
  }
};

export { redis };
export default prisma;