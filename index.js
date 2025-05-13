const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
require('dotenv').config();
require('./controllers/authentication/googleStrategy');
require('./controllers/authentication/facebookStrategy');
app.use(passport.initialize());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'VROCH API',
      version: '1.0.0',
      description: 'API Documentation for Virtual Hospital System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/**/*.js'], // This picks up JSDoc from all route files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// API Routes

// Database Admin Board
app.use('/api/users', require('./routes/databaseAdminBoard/users'));
app.use('/api/doctors', require('./routes/databaseAdminBoard/doctors'));
app.use('/api/patients', require('./routes/databaseAdminBoard/patients'));
app.use('/api/appointments', require('./routes/databaseAdminBoard/appointments'));
app.use('/api/doctor-time-slots', require('./routes/databaseAdminBoard/doctorTimeSlots'));
app.use('/api/appointment-status-logs', require('./routes/databaseAdminBoard/appointmentStatusLogs'));
app.use('/api/prescriptions', require('./routes/databaseAdminBoard/prescriptions'));
app.use('/api/medical-records', require('./routes/databaseAdminBoard/medicalRecords'));
app.use('/api/bills', require('./routes/databaseAdminBoard/bills'));
app.use('/api/subscriptions', require('./routes/databaseAdminBoard/subscriptions'));
app.use('/api/messages', require('./routes/databaseAdminBoard/messages'));
app.use('/api/notifications', require('./routes/databaseAdminBoard/notifications'));
app.use('/api/adminBoard/pharmacy-orders', require('./routes/databaseAdminBoard/pharmacyOrders'));
app.use('/api/support-tickets', require('./routes/databaseAdminBoard/supportTickets'));
app.use('/api/services', require('./routes/databaseAdminBoard/services'));
app.use('/api/programs', require('./routes/databaseAdminBoard/programs'));

// Authentication
app.use('/api/auth', require('./routes/authentication/auth'));
app.use('/api/auth/profile', require('./routes/authentication/profile'));

// Dashboard Controll
app.use('/api/dashboard', require('./routes/dashboard/dashboard'))

// Admin Functions
app.use('/api/admin', require('./routes/admin/admin'));
app.use('/api/admin/appointments', require('./routes/admin/adminAppointments'));
app.use('/api/admin/billing', require('./routes/admin/billing'));
app.use('/api/admin/subscriptions', require('./routes/admin/subscriptions'));
app.use('/api/admin/stats', require('./routes/admin/stats'));
app.use('/api/admin/charts', require('./routes/admin/charts'));

// Doctor Functions
app.use('/api/doctor', require('./routes/doctor/doctor'))
app.use('/api/doctor/appointments', require('./routes/doctor/doctorAppointments'));

// Patient Functions
app.use('/api/patient', require('./routes/patient/patient'));
app.use('/api/patient/appointments', require('./routes/patient/patientAppointments'));

// Upload
app.use('/api/upload', require('./routes/fileUpload'))
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/medicalRecords/medicalRecords'));
app.use('/api', require('./routes/prescriptions/prescriptions'));

// Pharmacy
app.use('/api/pharmacy-orders', require('./routes/PharmacyOrders/pharmacyOrders'));
app.use('/api/files', require('./routes/files/files'));

// Payments
app.use('/api/payments', require('./routes/payments/payments'));
app.use('/api/payments/bills', require('./routes/payments/bills'));
app.use('/api/payments/webhook', require('./routes/payments/webhook'));
app.use('/api/payments/subscriptions', require('./routes/payments/subscriptions'));


// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`VROCH backend running at http://localhost:${PORT}`);
});
