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
import os from 'os';
import { warmEssentialCache, smartCacheWarming } from './controllers/SearchController.js';

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


app.post('/api/admin/warm-cache', async (req, res) => {  
  try{
    const result = await warmEssentialCache();
    res.json({
      success: true,
      message:'cache warming completed',
      ...result
    });
  }catch(error){
    res.status(500).json({error: error.message});
  }
});

app.post('/api/admin/smart-warm', async (req, res) => {
  try{
    const result = await smartCacheWarming();
    res.json({ sucess: true, ...result });
  }catch(error){
    res.status(500).json({error: error.message});
  }
});

const getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      if ('IPv4' !== iface.family || iface.internal !== false) {
        continue;
      }
      return iface.address;
    }
  }
  return null;
};
const host = '0.0.0.0';

app.listen(port, host, async() => {
  console.log(getNetworkAddress())
  console.log(`Server running at http://localhost:${port}`);
  console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`)
  console.log(`OpenAPI started on http://localhost:${port}/docs`)


  // Warm cache on server startup
  try {
    console.log('Starting cache warming...');
    const result = await warmEssentialCache();
    console.log(` Cache warming completed: ${result.success} searches warmed in ${result.duration}ms`);
  } catch (error) {
    console.error('Cache warming failed:', error.message);
  }

  //set up recurring smart warming (every hour)
  setInterval(async () => {
    try{
      console.log('Running hourly cache refresh...');
      const result = await smartCacheWarming();
      console.log(`Hourly refresh:${result.success} searches updated`);
    }catch(error){
      console.error('Hourly cache warming failed:', error.message);
    }
  }, 60 * 60 * 1000); // every hour

  console.log('Server ready with intelligent cache warming system!');

});

