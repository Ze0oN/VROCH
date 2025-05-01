# VROCH - Virtual Hospital Management System

**VROCH** is a full-stack virtual hospital management platform designed to provide secure, role-based access for administrators, doctors, and patients. The system supports real-time appointment scheduling, medical record handling, notifications, and patient-doctor interaction through a simple, accessible interface.

---

## ✨ Core Features

### 👤 Admin
- View, filter, delete, and reassign any appointment
- Manage doctor time slots and availability
- View patient and doctor information
- Access and monitor system updates
- View all records and audit actions

### 🩺 Doctor
- View upcoming and past appointments
- Change appointment status (confirmed, completed, cancelled)
- Add medical records linked to completed appointments
- Automatically notify patients when status changes
- Access patient info directly from appointments

### 🙋‍♀️ Patient
- Book appointments by selecting specialization → doctor → time slot
- View and cancel appointments
- Get real-time notifications on appointment status
- View medical records and prescriptions (from doctor)

---

## 🔔 Notification System

VROCH includes a full notification subsystem that logs important actions:

- **To Doctor**: New appointment booked
- **To Patient**: Appointment confirmed / completed / cancelled
- Notifications are saved in the `notifications` table with read/unread status

---

## 🔐 Authentication & Security

- JWT authentication (stored in `localStorage`)
- Role-based authorization middleware
- Session checks and redirection upon expiration

---

## 🛠 Technologies Used

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Auth**: JWT
- **Notifications**: Stored in DB table (`notifications`)

---

## ⚙️ Smart Features & Logic

- ⏱ **Doctor Availability**: Patients can only book time slots predefined by admins per day of week
- 🚫 **Safe Delete**: Admin cannot delete appointments with prescriptions (clear error message is returned)
- 📅 **Overlap Check**: No duplicate bookings or overlaps allowed
- 📂 **Medical Records**: Only doctors can add them for completed appointments
- 📬 **Notification Auto-Insert**: Linked to booking and status update events

---

## ▶️ How to Run

1. **Clone the repository**  
   `git clone https://github.com/yourusername/vroch.git`

2. **Install dependencies**  
   Inside the project root:  
   `npm install`

3. **Create a `.env` file** with the following (or edit directly if config is hardcoded):

   ```
   PORT=5000
   DATABASE_URL=postgresql://your_user:your_pass@localhost:5432/vroch
   JWT_SECRET=your_jwt_secret
   ```

4. **Start PostgreSQL and import schema/data**  
   Example:  
   `psql -U your_user -d vroch -f resetDemoData.sql`

5. **Run the server**  
   `npm start`  
   Or for development:  
   `nodemon index.js`

6. **Open browser** and visit:  
   - `http://localhost:5000/public/login.html`  
   - Role-based dashboard will redirect based on user

---

## 👨‍💻 Developed By

This project is part of the VROCH Virtual Hospital initiative and was developed for advanced backend systems training and deployment testing.
