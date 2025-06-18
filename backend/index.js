import { PrismaClient } from '@prisma/client';
import express from 'express';
import REST_API from './api.js';
import { swaggerUi, specs } from './swagger.js';

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient();
app.use(REST_API);
app.use(express.json());


// app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// export default app;