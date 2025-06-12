// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DVT Trainee Portfolio API',
      version: '1.0.0',
      description: 'API Documentation for DVT Trainee Portfolio'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./routes/*.js'], // Adjust path to your actual route files
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
