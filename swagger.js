// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VROCH API',
      version: '1.0.0',
      description: 'API documentation for VROCH Virtual Hospital System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    tags: [
      { name: 'Authentication', description: 'Login, registration, profiles' },
      { name: 'Patients', description: 'Endpoints for patient activities' },
      { name: 'Doctors', description: 'Doctor-specific endpoints' },
      { name: 'Appointments', description: 'Appointment booking and tracking' },
      { name: 'Prescriptions', description: 'Prescription uploads and downloads' },
      { name: 'Billing', description: 'Bills, payments, and subscriptions' },
      { name: 'Support Tickets', description: 'Help and support' },
      { name: 'Pharmacy Orders', description: 'Prescription-based order tracking' },
      { name: 'Medical Records', description: 'Health records management' },
      { name: 'Admin', description: 'Admin dashboard and database actions' }
    ]
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
