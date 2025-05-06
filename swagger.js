// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VROCH API',
      version: '1.0.0',
      description: 'API documentation for VROCH Virtual Hospital',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/**/*.js'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
