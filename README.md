# VROCH - Virtual Hospital System

VROCH is a full-stack web application designed to simulate a virtual hospital environment with features for patient management, doctor scheduling, prescription uploads, pharmacy orders, and billing integration.

---

## 🚀 Features
- JWT-based authentication and role-based access control (Admin, Doctor, Patient)
- Medical record and prescription upload
- Pharmacy order placement and tracking
- Billing system with subscription support
- Analytics dashboard (charts & stats)
- RESTful API documented with Swagger

---

## 📦 Project Structure

```
/routes           # All API routes grouped by user type
/controllers      # Business logic for each route
/middleware       # JWT, role check, upload validation
/uploads          # Uploaded prescriptions & records
/public           # Static frontend content
/swagger.js       # Swagger API docs setup
.env              # Environment config (see .env.example)
```

---

## 🔧 Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/vroch.git
cd vroch
```

2. Install dependencies:
```bash
npm install
```

3. Set up your `.env` file using the example provided:
```bash
cp .env.example .env
```

4. Run the server:
```bash
npm start
```
or
```bash
npm start
```

---

## 📚 API Documentation

Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for full Swagger UI documentation once the server is running.

---

## 🛠 Technologies Used

- **Backend:** Node.js, Express, PostgreSQL
- **Auth:** JWT, OAuth (Google, Facebook)
- **Docs:** Swagger (OpenAPI 3.0)
- **Upload:** Multer
- **Charts:** Chart.js or front-end chart library (TBD)

---

## 👥 Roles

- **Admin:** Dashboard access, full CRUD, analytics
- **Doctor:** Appointment and prescription handling
- **Patient:** Booking, viewing records, managing bills

---

## 📬 Contact

For questions, contact the development team.

---

© 2025 VROCH Team — All rights reserved.
