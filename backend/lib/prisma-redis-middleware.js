import Redis from 'ioredis';
import { Prisma, PrismaClient } from '@prisma/client';



const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
 
});

 export const getCacheKey = (query, industries, techStack, field, order,page, role, location) =>
  ['search', query, industries, techStack, field, order, role, location,page, role].filter(Boolean).join(':');

export async function getCache(key) {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.stringify(cachedData) : [];
}

export async function setCache(key, data, ttl = 3600) {
  await redis.set(key, JSON.stringify(data), 'EX', ttl);
  return data;
}

const prisma = new PrismaClient()

export { redis};
export default prisma;
