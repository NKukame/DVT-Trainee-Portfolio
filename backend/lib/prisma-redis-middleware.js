import Redis from "ioredis";
import { Prisma, PrismaClient } from "@prisma/client";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

export async function generateKey(
  type,
  query,
  location,
  role,
  techStack,
  industry,
  field,
  order,
  page,
  industries,
) {
  const key = [
    type,
    query,
    role,
    location,
    techStack,
    industry,
    field,
    order,
    page,
    industries,
  ]
    .filter((possibleKey) => Boolean(possibleKey))
    .join(":");
  return key;
}

export async function getCache(key) {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
}

export async function setCache(key, data, ttl = 3600) {
  await redis.set(key, JSON.stringify(data), "EX", ttl);
}

const prisma = new PrismaClient();

export { redis };
export default prisma;
