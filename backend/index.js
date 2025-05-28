const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('./generated/prisma');
const REST_API = require('./api.js');
const dataSearch = require('./Data/MockSearch.json');
const dataTeam = require('./Data/team-portfolio.json');
const dataProject = require('./Data/projects-modal.json');
const prisma = new PrismaClient();
app.use(REST_API);
app.use(express.json());


app



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});