-- DROP ALL TABLES IF THEY EXIST
DROP TABLE IF EXISTS health_programs, services, support_tickets, pharmacy_orders, notifications, messages, subscriptions, bills, medical_records, prescriptions, appointments, patients, doctors, users CASCADE;

-- USERS TABLE
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

INSERT INTO users (full_name, email, password_hash, role, phone, gender, date_of_birth) VALUES
('Admin User', 'admin@vroch.com', 'hashed_pw1', 'admin', '1111111111', 'other', '1980-01-01'),
('Dr. Strange', 'strange@vroch.com', 'hashed_pw2', 'doctor', '2222222222', 'male', '1975-05-10'),
('Jane Patient', 'jane@vroch.com', 'hashed_pw3', 'patient', '3333333333', 'female', '1990-09-20'),
('Dr. Meredith Grey', 'meredith@vroch.com', 'hashed_pw4', 'doctor', '5555555555', 'female', '1983-02-14'),
('Mark Spencer', 'mark@vroch.com', 'hashed_pw5', 'patient', '6666666666', 'male', '1988-07-30');

-- DOCTORS TABLE
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    specialization VARCHAR(100),
    qualifications TEXT,
    availability_status VARCHAR(20),
    profile_picture_url TEXT,
    bio TEXT
);

INSERT INTO doctors (user_id, specialization, qualifications, availability_status, profile_picture_url, bio) VALUES
(2, 'Neurology', 'MD, PhD', 'available', NULL, 'Experienced neurologist.'),
(4, 'Cardiology', 'MD, FACC', 'on_leave', NULL, 'Cardiologist with 10 years experience.');

-- PATIENTS TABLE
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

INSERT INTO patients (user_id, blood_group, emergency_contact_name, emergency_contact_phone, address, allergies, chronic_conditions) VALUES
(3, 'A+', 'John Doe', '4444444444', '123 Health St.', 'None', 'Asthma'),
(5, 'B-', 'Emily Spencer', '7777777777', '456 Wellness Blvd', 'Peanuts', 'Diabetes');

-- APPOINTMENTS TABLE
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    notes TEXT
);

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, notes) VALUES
(1, 1, '2025-05-01', '10:00', 'confirmed', 'Initial consultation'),
(2, 2, '2025-05-03', '14:00', 'pending', 'Follow-up consultation');

-- PRESCRIPTIONS TABLE
CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(id),
    medication TEXT,
    dosage TEXT,
    instructions TEXT,
    issued_date DATE
);

INSERT INTO prescriptions (appointment_id, medication, dosage, instructions, issued_date) VALUES
(1, 'Ibuprofen', '200mg', 'Twice a day', '2025-05-01'),
(2, 'Metformin', '500mg', 'Once daily after meals', '2025-05-03');

-- MEDICAL RECORDS TABLE
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    record_type VARCHAR(50),
    description TEXT,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medical_records (patient_id, doctor_id, record_type, description, file_url) VALUES
(1, 1, 'diagnosis', 'Migraine diagnosis', NULL),
(2, 2, 'lab', 'Blood sugar level test', NULL);

-- BILLS TABLE
CREATE TABLE bills (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    amount NUMERIC(10, 2),
    status VARCHAR(20),
    billing_date DATE,
    details TEXT
);

INSERT INTO bills (patient_id, amount, status, billing_date, details) VALUES
(1, 150.00, 'paid', '2025-05-01', 'Consultation and medication'),
(2, 200.00, 'pending', '2025-05-03', 'Follow-up consultation and lab test');

-- SUBSCRIPTIONS TABLE
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    plan_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    auto_renew BOOLEAN
);

INSERT INTO subscriptions (patient_id, plan_name, start_date, end_date, auto_renew) VALUES
(1, 'Basic Health Plan', '2025-04-01', '2025-10-01', TRUE),
(2, 'Premium Health Plan', '2025-04-15', '2026-04-15', FALSE);

-- MESSAGES TABLE
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

INSERT INTO messages (sender_id, receiver_id, message) VALUES
(2, 3, 'Hello, your test results are ready.'),
(4, 5, 'Please remember to fast before your next blood test.');

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(100),
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notifications (user_id, title, body) VALUES
(3, 'Appointment Reminder', 'You have an appointment tomorrow at 10 AM.'),
(5, 'Lab Test Reminder', 'Don’t forget your lab appointment on May 3rd.');

-- PHARMACY ORDERS TABLE
CREATE TABLE pharmacy_orders (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    medications TEXT,
    total_amount NUMERIC(10, 2),
    status VARCHAR(20),
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pharmacy_orders (patient_id, medications, total_amount, status) VALUES
(1, 'Ibuprofen, Paracetamol', 75.50, 'delivered'),
(2, 'Metformin, Aspirin', 90.00, 'processing');

-- SUPPORT TICKETS TABLE
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    subject VARCHAR(100),
    description TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO support_tickets (user_id, subject, description, status) VALUES
(3, 'Login Issue', 'I can’t access my account.', 'open'),
(5, 'Billing Question', 'Can I split my bill into two payments?', 'pending');

-- SERVICES TABLE
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    cost NUMERIC(10, 2)
);

INSERT INTO services (name, description, cost) VALUES
('General Consultation', 'Basic doctor consultation service', 50.00),
('Diabetes Screening', 'Includes blood test and doctor review', 120.00);

-- HEALTH PROGRAMS TABLE
CREATE TABLE health_programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE,
    eligibility TEXT
);

INSERT INTO health_programs (name, description, start_date, end_date, eligibility) VALUES
('Heart Health Week', 'Free heart check-ups and awareness program.', '2025-06-01', '2025-06-07', 'All patients'),
('Diabetes Awareness Month', 'Workshops and free screening for diabetes', '2025-11-01', '2025-11-30', 'Adults 40+');
