-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    role VARCHAR(20),
    phone VARCHAR(20),
    gender VARCHAR(10),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    specialization VARCHAR(100),
    qualifications TEXT,
    availability_status VARCHAR(20),
    profile_picture_url TEXT,
    bio TEXT
);

-- Patients Table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    blood_group VARCHAR(5),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    address TEXT,
    allergies TEXT,
    chronic_conditions TEXT
);

-- Appointments Table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    notes TEXT
);

-- Prescriptions Table
CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(id),
    medication TEXT,
    dosage TEXT,
    instructions TEXT,
    issued_date DATE
);

-- Medical Records Table
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    record_type VARCHAR(50),
    description TEXT,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bills Table
CREATE TABLE bills (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    amount NUMERIC(10, 2),
    status VARCHAR(20),
    billing_date DATE,
    details TEXT
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    plan_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    auto_renew BOOLEAN
);

-- Messages Table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(100),
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pharmacy Orders Table
CREATE TABLE pharmacy_orders (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    medications TEXT,
    total_amount NUMERIC(10, 2),
    status VARCHAR(20),
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Support Tickets Table
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    subject VARCHAR(100),
    description TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    cost NUMERIC(10, 2)
);

-- Health Programs Table
CREATE TABLE health_programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE,
    eligibility TEXT
);
