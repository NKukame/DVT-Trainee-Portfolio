import express from 'express';
import REST_API from './api.js';
import { swaggerUi, specs } from './swagger.js';

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
const port = 3000;
// const prisma = new PrismaClient();
app.use(REST_API);


// app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/test-prisma-cache', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// export default app;
