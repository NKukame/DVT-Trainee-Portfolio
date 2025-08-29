import express from 'express';
import REST_API from './api.js';
import { swaggerUi, specs } from './swagger.js';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import prisma from './lib/prisma-redis-middleware.js';
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { rateLimit } from 'express-rate-limit';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const openApiSpecPath = path.resolve(__dirname, 'openapi.json');
const openApiSpec = JSON.parse(fs.readFileSync(openApiSpecPath, 'utf8'));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56, 
})

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(limiter);
const port = 3000;
// const prisma = new PrismaClient();
app.use(REST_API);
const adminOptions = {
  resources: [{
    resource: { model: getModelByName('User'), client: prisma },
    options: {},
  }, {
    resource: { model: getModelByName('Employee'), client: prisma },
    options: {},
  }, {
    resource: { model: getModelByName('Project'), client: prisma },
    options: {},
  }],
}

AdminJS.registerAdapter({ Database, Resource })
const admin = new AdminJS({
    rootPath: '/admin',
    ...adminOptions,

})


const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)
// app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));

app.get('/test-prisma-cache', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`)
  console.log(`OpenAPI started on http://localhost:${port}/docs`)
});

