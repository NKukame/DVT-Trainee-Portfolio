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
  const users = await prisma.employee.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;