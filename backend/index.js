import express from 'express';
import REST_API from './api.js';
import prisma from './lib/prisma-redis-middleware.js';
import { redis } from './lib/prisma-redis-middleware.js';
const app = express();
app.use(express.json());
const port = 3000;

app.use(REST_API);


// app

app.get('/test-cache', async (req, res) => {
  try {
    // Test Redis connection
    const pongResult = await redis.ping();

    // Make two consecutive requests to /team-cards-showcase
    const response1 = await fetch('http://localhost:3000/team-cards-showcase');
    const data1 = await response1.json();
    console.log('First request:', data1);

    const response2 = await fetch('http://localhost:3000/team-cards-showcase');
    const data2 = await response2.json();
    console.log('Second request:', data2);
    
    // Get cache info
    const cacheKeys = await redis.keys('*');
    
    res.json({
      success: true,
      redis: {
        connected: pongResult === 'PONG',
        totalCacheKeys: cacheKeys.length,
        cacheKeys: cacheKeys.slice(0, 10) // Show first 10 keys
      },
      message: 'Redis is working! Check the console logs for cache hits and misses.'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/test-prisma-cache', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// export default app;
