
# VROCH - Hospital Management Web System

VROCH is a full-stack hospital management system built using Node.js, Express, PostgreSQL, and vanilla HTML/CSS/JS. It supports different user roles: Admin, Doctor, and Patient — each with dedicated dashboards and tailored functionalities.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (managed using pgAdmin)
- **Authentication**: JWT, bcrypt.js, Google OAuth, Facebook OAuth
- **Frontend**: HTML5, CSS3, JavaScript
- **Deployment (local)**: `ngrok` for local testing with webhooks

---

## Folder Structure Overview

```
/VROCH
│
├── index.js                # Main entry point
├── db.js                   # PostgreSQL database connection
├── .env                    # Environment variables (JWT_SECRET, DB configs, etc.)
│
├── /routes                 # Route definitions
│   ├── /auth               # Auth routes (login, register, social auth)
│   ├── /dashboard          # Role-based dashboard routing
│   ├── /patient            # Patient-specific endpoints
│   ├── /doctor             # Doctor-specific endpoints
│   ├── /admin              # Admin functionalities
│
├── /controllers            # Business logic for each route
│   ├── /authentication     # Auth controllers
│   ├── /patient            # Patient controllers
│   ├── /doctor             # Doctor controllers
│   ├── /databaseAdminBoard # Database controllers
│   ├── /admin              # Admin controllers
│
├── /public                 # HTML/CSS/JS for frontend
│   ├── /panels             # Panel UI files for admin dashboard
│   ├── login.html
│   ├── register.html
│   ├── under-development.html
│   ├── admin-dashboard.html
│   ├── doctor-dashboard.html
│   ├── patient-dashboard.html
│   ├── /admin              # HTML/CSS/JS for admin page
│   ├── /doctor             # HTML/CSS/JS for doctor page
│   ├── /patient            # HTML/CSS/JS for admin page
│
├── /middleware             # JWT token verification and access control
│
├── README.md
└── package.json
```

---

## Features

- Admin:
  - Manage users (CRUD)
  - View and control medical records, billing, programs, etc.
- Doctor:
  - View assigned patients
  - Issue prescriptions
  - View appointments
- Patient:
  - View own medical records
  - View prescriptions & appointments
  - Update own profile
- Auth:
  - Email/password login & registration
  - Google and Facebook login
  - Token-based role redirection
- Logging and Debugging:
  - Debug logs included in backend logic
  - Token-based access protected by middleware

---

## How to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/VROCH.git
cd VROCH
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup PostgreSQL database
- Create a new database (e.g., `vroch`)
- Import `createAllTables.sql` and `resetDemoData.sql`

### 4. Configure `.env`
```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
FACEBOOK_CLIENT_ID=your_facebook_id
FACEBOOK_CLIENT_SECRET=your_facebook_secret
```

### 5. Start the server
```bash
npm start
```

### 6. Test locally
Visit: `http://localhost:5000/login.html` or use `ngrok http 5000` for public access.

---

## Author Notes

This README reflects the latest build of VROCH including:
- Patient dashboard views
- Role-based backend security
- Proper login token handling
- Modern UI updates
