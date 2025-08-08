import Redis from 'ioredis';
import { Prisma, PrismaClient } from '@prisma/client';



const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
 
});

export async function getCache(key) {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
}

export async function setCache(key, data, ttl = 3600) {
  const stringified = JSON.stringify(data);
  await redis.set(key, stringified, 'EX', ttl);
  return data;
}

export function setKeyValue(...parts) {
  return parts.filter(part => part !== undefined && part !== null && part !== '')
    .map(part => String(part)) 
    .join(':');
}

const prisma = new PrismaClient()

export { redis };
export default prisma;