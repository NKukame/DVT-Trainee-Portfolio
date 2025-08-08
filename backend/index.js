import express from 'express';
import REST_API from './api.js';
import { swaggerUi, specs } from './swagger.js';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import prisma from './lib/prisma-redis-middleware.js';
import { Database, Resource, getModelByName } from '@adminjs/prisma'
const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
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

app.get('/test-prisma-cache', async (req, res) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`)
});

// export default app;
