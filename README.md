# VROCH - Virtual Hospital Management System

**VROCH** is a full-stack virtual hospital platform supporting secure, role-based access for Admins, Doctors, and Patients. The system handles real-time appointment scheduling, medical record uploads, prescription tracking, time slot management, notifications, and full audit control—all via a clean interface and RESTful backend.

---

## ✨ Core Features

### 👤 Admin
- Manage all appointments (view, filter, delete with safe-check)
- Manage doctor availability via time slots
- Manage users, view patient/doctor info
- View medical records, prescriptions, bills, messages, and audit logs
- System update tracking (versioned logs)
- Role-based UI dashboard

### 🩺 Doctor
- View upcoming and past appointments
- Update appointment status (confirmed / completed / cancelled)
- Add **medical records** only to completed appointments
- Automatically notify patients on status updates
- View associated patient data from appointments
- Add prescription data and view system notifications

### 🙋‍♀️ Patient
- Book appointments by: Specialization → Doctor → Time Slot
- View & cancel appointments
- Receive real-time notifications on appointment status
- View medical records and prescriptions
- Profile update capability

---

## 🔄 API Documentation

VROCH uses **Swagger UI** for exploring and testing API endpoints.

- 📄 Visit: [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)
- 🔐 All major routes include Swagger JSDoc annotations
- 📂 Schemas defined for `Login`, `Appointment`, `MedicalRecord`, etc.

---

## 🔔 Notification System

A full notification module tracks and delivers event-based updates:

- **To Doctor**: New appointment booked
- **To Patient**: Appointment status updates (confirmed, completed, cancelled)
- Stored in the `notifications` table with read/unread states
- Automatically triggered by key actions (booking, status change, cancelation)

---

## 🔐 Authentication & Security

- JWT authentication (token stored in localStorage)
- Role-based access via middleware (`verifyToken`, `requireRole`)
- Redirect logic and session handling included

---

## 🧠 Backend Logic Highlights

- 🕒 **Time Slot Rules**: Appointments only possible within available time windows
- 🚫 **Safe Deletion**: Appointments cannot be deleted if linked to prescriptions
- ❌ **Duplicate Prevention**: Validations to prevent overlapping appointments
- 🗃️ **Record Control**: Only doctors can add medical records to completed appointments
- 🛑 **Cancel Rules**: Patients can only cancel before the appointment time
- 🧭 **Dynamic Dropdowns**: Booking flows are interactive and dynamic (e.g. dropdowns auto-populate by specialization)

---

## 🛠 Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL
- **Documentation**: Swagger UI (`/api-docs`)
- **Authentication**: JWT
- **Others**: Nodemon, Bcrypt, Dotenv, CORS, Moment.js

---

## ▶️ How to Run

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/vroch.git
   cd vroch
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file** with:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://your_user:your_pass@localhost:5432/vroch
   JWT_SECRET=your_jwt_secret
   ```

4. **Import database structure and demo data**  
   ```bash
   psql -U your_user -d vroch -f resetDemoData.sql
   ```

5. **Run the server**  
   ```bash
   npm start
   ```

6. **Access via browser**  
   - `http://localhost:5000/public/login.html` (login page)  
   - `http://localhost:5000/api-docs` (Swagger API testing)

---

## 👨‍💻 Developed By

VROCH is part of an advanced backend system design project, built for real-world deployment simulation, testing, and full-stack role-based access management.
