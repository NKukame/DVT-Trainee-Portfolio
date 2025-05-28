import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
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