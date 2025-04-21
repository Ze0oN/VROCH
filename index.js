const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/medical-records', require('./routes/medicalRecords'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/pharmacy-orders', require('./routes/pharmacyOrders'));
app.use('/api/support-tickets', require('./routes/supportTickets'));
app.use('/api/services', require('./routes/services'));
app.use('/api/programs', require('./routes/programs'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`VROCH backend running at http://localhost:${PORT}`);
});
