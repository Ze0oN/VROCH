# VROCH Backend System

VROCH is a hospital management system developed with **Node.js**, **Express**, and **PostgreSQL**, featuring secure authentication, role-based access, and a full-featured admin dashboard.

---

## Technologies Used

- Node.js + Express.js
- PostgreSQL (managed via pgAdmin)
- RESTful API architecture
- JWT authentication
- bcrypt password hashing
- HTML/CSS/JS frontend (no framework)
- Ngrok for temporary hosting

---

## Project Structure

```
VROCH/
├── controllers/
│   ├── authentication/
│   │   └── authController.js
│   ├── databaseAdminBoard/
│   │   └── usersController.js
│   └── admin/
│       └── adminPasswordsController.js
│
├── middleware/
│   └── verifyToken.js
│
├── routes/
│   ├── authentication/
│   │   └── auth.js
│   ├── databaseAdminBoard/
│   │   └── users.js
│   └── admin/
│       └── admin.js
│
├── panels/
│   └── [14 HTML Panel Files]
│
├── public/
│   ├── [login.html, register.html, databaseTest.html, etc.]
│   └── panels/
│       └── [14 HTML Panel Files]
│
├── db.js
├── index.js
├── .env
└── package.json
```

---

## How to Run the Project Locally

### 1. Clone the repository and navigate into it:
```bash
git clone <your-repo-url>
cd VROCH
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Set up your `.env` file:
```
PORT=5000
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=2h
```

### 4. Start your PostgreSQL server and run:
- `createAllTables.sql` to initialize your database
- `resetDemoData_hashed.sql` to insert users and data

### 5. Start your backend server:
```bash
node index.js
```

### 6. Optional: Expose via ngrok
```bash
ngrok http 5000
```

---

## Authentication System

- **Register/Login**: Auth routes create JWT tokens
- **Role-based redirect**:
  - `admin` → `databaseTest.html`
  - `doctor` & `patient` → `under-development.html`
- **Token stored in localStorage**, passed in headers for all requests

---

## Admin Features

- 14 modules (users, patients, doctors, prescriptions, etc.)
- Each module supports CRUD via dashboard UI
- Token-protected admin routes
- Plaintext passwords stored in `user_passwords` for admin auditing

---

## Bonus Features

- `admin-passwords.html`: View all email-password pairs (separate table)
- Passwords stored at registration & admin-creation time
- Panels.js manages logic for all dashboard buttons
- Ngrok support for public access

---

## Default Demo Accounts

| Role   | Email                | Password   |
|--------|----------------------|------------|
| Admin  | admin@vroch.com      | admin123   |
| Doctor | strange@vroch.com    | doctor123  |
| Doctor | jane@vroch.com       | patient123 |
| Patient| meredith@vroch.com   | password   |
| Patient| mark@vroch.com       | password   |

---

## Contact

For support or questions, contact the developer.

