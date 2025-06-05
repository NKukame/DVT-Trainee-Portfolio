import Prisma from "prisma";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

const redis = new Redis();

const prisma = new PrismaClient();

export const prismaRedisCache = createPrismaRedisCache({
  redis,
  // Optional: customize the cache key generation
  keyGenerator: (model, action, args) => {
    return `${model}:${action}:${JSON.stringify(args)}`;
  },
});

Prisma.use(prismaRedisCache);
export default prisma;
// This code sets up a Prisma client with Redis caching middleware.
// It uses the `prisma-redis-middleware` package to cache Prisma queries in Redis,
// which can significantly improve performance for read-heavy applications.
// The `createPrismaRedisCache` function is used to create the caching middleware,
// and it is applied to the Prisma client using `Prisma.use()`.
// The `keyGenerator` function is optional and can be customized to generate cache keys based on the model, action, and arguments.
// The Redis client is created using `ioredis`, which is a popular Redis client for Node.js.
// This setup allows for efficient caching of database queries, reducing the load on the database and speeding up response times for frequently accessed data.