# VROCH - Hospital Management System (Node.js + PostgreSQL)

This is a full-stack backend system for managing a hospital's operations, built using **Node.js**, **Express**, and **PostgreSQL (pgAdmin)**. It includes RESTful APIs and an interactive HTML-based frontend interface.

---

## Requirements

Make sure the machine you run this project on has:

- [Node.js](https://nodejs.org/)
- [PostgreSQL + pgAdmin](https://www.postgresql.org/download/)

---

## How to Run the Project

### 1. Install Node Modules

Open terminal inside the project folder and run:

```bash
npm install
```

---

### 2. Create PostgreSQL Database

Open **pgAdmin** and:

- Create a new database called `VROCH`
- Open `resetDemoData.sql` or `createAllTables.sql` from the project
- Paste and run it in pgAdmin's Query Tool to generate tables and demo data

---

### 3. Configure Database Connection

In `db.js`, update your local PostgreSQL credentials:

```js
const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'VROCH',
  password: 'your_pg_password',
  port: 5432
});
```

---

### 4. Start the Server

Start the backend using:

```bash
node index.js
```

Or if you're using `nodemon`:

```bash
npx nodemon index.js
```

---

### 5. Open the Interface

Launch the frontend by opening:

```
http://localhost:5000/index.html
```

Use the navigation menu to access and control the hospital system.

---

## Common Issues

- `"invalid input syntax for type integer: 'undefined'"`  
  → Means the ID field was left empty or missing. Ensure input exists before fetch.

---

## Credits

Developed using:
- Node.js
- Express.js
- PostgreSQL + pgAdmin
- HTML, CSS, JS
