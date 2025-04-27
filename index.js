const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
require('dotenv').config();
require('./controllers/authentication/googleStrategy');
require('./controllers/authentication/facebookStrategy');
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

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
app.use('/api/pharmacy-orders', require('./routes/databaseAdminBoard/pharmacyOrders'));
app.use('/api/support-tickets', require('./routes/databaseAdminBoard/supportTickets'));
app.use('/api/services', require('./routes/databaseAdminBoard/services'));
app.use('/api/programs', require('./routes/databaseAdminBoard/programs'));

app.use('/api/auth', require('./routes/authentication/auth'));

app.use('/api/dashboard', require('./routes/dashboard/dashboard'))

app.use('/api/admin', require('./routes/admin/admin'));

app.use('/api/doctor', require('./routes/doctor/doctor'))

app.use('/api/patient', require('./routes/patient/patient'));
app.use('/api/patient/appointments', require('./routes/patient/patientAppointments'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`VROCH backend running at http://localhost:${PORT}`);
});
