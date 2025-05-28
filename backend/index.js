<<<<<<< HEAD
=======
import { PrismaClient } from '@prisma/client';
>>>>>>> 951db540789b6492e16e551763347f31637e7f60
import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import REST_API from './api.js';

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient();

app.use(REST_API);

app.get('/', async (req, res) => {
  await prisma.$connect();
<<<<<<< HEAD
  const users = await prisma.employee.findMany();
=======
  const users = await prisma.user.findMany();
>>>>>>> 951db540789b6492e16e551763347f31637e7f60
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;