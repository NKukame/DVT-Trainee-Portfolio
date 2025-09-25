import Redis from "ioredis";
import { PrismaClient } from "@prisma/client";
import 'dotenv'

const redis = new Redis({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  
});

console.log(redis);

// const client = createClient({
//     username: 'default',
//     password: 'eOTGmAXiSwkFWOwA0G0uPWYLusN2sOKm',
//     socket: {
//         host: 'redis-14307.c341.af-south-1-1.ec2.redns.redis-cloud.com',
//         port: 14307
//     }
// });

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


/**
 * Delete all Redis keys matching a pattern
 * 
 * @param {string} pattern - The Redis key pattern to match (e.g. "searchProject:*")
 */
export async function clearCache(pattern = "*") {
  try {
  
    const keys = await redis.keys(pattern);

    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`🧹 Cleared ${keys.length} keys matching pattern: ${pattern}`);
    } else {
      console.log(`ℹ️ No keys found for pattern: ${pattern}`);
    }
  } catch (err) {
    console.error("Error clearing cache:", err);
  }
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

// export async function clearCache(pattern = "*") {
//   try {
//     // Get all keys matching the pattern
//     const keys = await redis.keys(pattern);
 
//     if (keys.length > 0) {
//       // Delete all keys
//       await redis.del(...keys);
//       console.log(`🧹 Cleared ${keys.length} keys matching pattern: ${pattern}`);
//     } else {
//       console.log(`ℹ️ No keys found for pattern: ${pattern}`);
//     }
//   } catch (err) {
//     console.error("Error clearing cache:", err);
//   }
// }

