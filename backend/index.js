const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('./generated/prisma');
const REST_API = require('./api.js')

const prisma = new PrismaClient();
app.use(REST_API);

app.get('/', async (req, res) => {
  await prisma.$connect()
  const users = await prisma.employee.findMany()
  res.send(users)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});