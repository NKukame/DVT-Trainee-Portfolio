<<<<<<< HEAD
import { PrismaClient } from './generated/prisma/index.js';
import express from 'express';
import REST_API from './api.js';
=======
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;
>>>>>>> 8314f8ecfcd6d3a307ee1a1a752859abbbe7efaf

const app = express();
app.use(REST_API);
const port = 3000;
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});