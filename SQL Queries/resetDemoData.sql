-- DROP ALL TABLES IF THEY EXIST
DROP TABLE IF EXISTS appointment_status_logs, user_passwords, health_programs, services, support_tickets, pharmacy_orders, notifications, messages, subscriptions, bills, medical_records, prescriptions, appointments, doctor_time_slots, patients, doctors, users CASCADE;

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
('Admin User', 'admin@vroch.com', '$2b$10$Nm6Kfq7exRO4pdpznoK6lOYakzHUg6qWJXaAhv9xmgD77Do//4ksO', 'admin', '1111111111', 'other', '1980-01-01'),
('Dr. Strange', 'strange@vroch.com', '$2b$10$j8aygi5zKmczoRel7aMf7.d65DTI1KdVinoWnpMr4RiwRdWcURoPm', 'doctor', '2222222222', 'male', '1975-05-10'),
('Jane Patient', 'jane@vroch.com', '$2b$10$wX7.A1/wNDjPFtN490wLVuM5OHYZsFMmWH9n6EasJTmF1/ETm5lDS', 'patient', '3333333333', 'female', '1990-09-20'),
('Dr. Meredith Grey', 'meredith@vroch.com', '$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC', 'doctor', '5555555555', 'female', '1983-02-14'),
('Mark Spencer', 'mark@vroch.com', '$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC', 'patient', '6666666666', 'male', '1988-07-30'),
('Dr. Karev Alex', 'karev@vroch.com', '$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC', 'doctor', '7777777777', 'male', '1980-11-05'),
('Claire Bennet', 'claire@vroch.com', '$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC', 'patient', '8888888888', 'female', '1995-06-12'),
('Tom Hardy', 'tom@vroch.com', '$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC', 'patient', '9999999999', 'male', '1992-04-18');

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
(4, 'Cardiology', 'MD, FACC', 'on_leave', NULL, 'Cardiologist with 10 years experience.'),
(6, 'Pediatrics', 'MD', 'available', NULL, 'Specialist in child healthcare with a focus on preventive care.');


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
(5, 'B-', 'Emily Spencer', '7777777777', '456 Wellness Blvd', 'Peanuts', 'Diabetes'),
(7, 'O+', 'Angela Bennet', '6666666666', '789 Care Ave.', 'Latex', 'None'),
(8, 'AB-', 'Michael Hardy', '5555555555', '321 Vital Rd.', 'None', 'Hypertension');


-- APPOINTMENTS TABLE
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    doctor_id INT REFERENCES doctors(id),
    appointment_date DATE,
    appointment_start_time TIME,
    appointment_end_time TIME,
    status VARCHAR(20),
    notes TEXT
);

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, status, notes) VALUES
(1, 1, '2025-05-01', '10:00', '10:30', 'confirmed', 'Initial consultation'),
(2, 2, '2025-05-03', '14:00', '14:30', 'pending', 'Follow-up consultation'),
(3, 1, '2025-05-05', '09:30', '10:00', 'confirmed', 'Routine check-up'),
(4, 3, '2025-05-06', '15:45', '16:15', 'cancelled', 'Pediatric exam'),
(1, 3, '2025-05-10', '13:00', '13:30', 'pending', 'Specialist referral discussion'),
(2, 1, '2025-05-11', '08:45', '09:15', 'confirmed', 'Lab results follow-up'),
(4, 1, '2025-05-15', '10:30', '11:00', 'pending', 'Allergy assessment'),
(3, 2, '2025-05-18', '09:00', '09:30', 'confirmed', 'Dietary advice and planning');


-- TIME SLOTS TABLE
CREATE TABLE doctor_time_slots (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id),
    day_of_week VARCHAR(10),
    start_time TIME,
    end_time TIME
);

-- Dr. Strange (Doctor ID = 1) - Neurology
INSERT INTO doctor_time_slots (doctor_id, day_of_week, start_time, end_time) VALUES
(1, 'Monday', '09:00', '09:30'),
(1, 'Monday', '09:30', '10:00'),
(1, 'Monday', '10:00', '10:30'),
(1, 'Monday', '10:30', '11:00'),
(1, 'Monday', '11:00', '11:30'),
(1, 'Monday', '11:30', '12:00'),

(1, 'Wednesday', '13:00', '13:30'),
(1, 'Wednesday', '13:30', '14:00'),
(1, 'Wednesday', '14:00', '14:30'),
(1, 'Wednesday', '14:30', '15:00'),
(1, 'Wednesday', '15:00', '15:30'),
(1, 'Wednesday', '15:30', '16:00');

-- Dr. Meredith Grey (Doctor ID = 2) - Cardiology
INSERT INTO doctor_time_slots (doctor_id, day_of_week, start_time, end_time) VALUES
(2, 'Tuesday', '09:00', '09:30'),
(2, 'Tuesday', '09:30', '10:00'),
(2, 'Tuesday', '10:00', '10:30'),
(2, 'Tuesday', '10:30', '11:00'),
(2, 'Tuesday', '11:00', '11:30'),
(2, 'Tuesday', '11:30', '12:00'),

(2, 'Thursday', '13:00', '13:30'),
(2, 'Thursday', '13:30', '14:00'),
(2, 'Thursday', '14:00', '14:30'),
(2, 'Thursday', '14:30', '15:00'),
(2, 'Thursday', '15:00', '15:30'),
(2, 'Thursday', '15:30', '16:00');

-- Dr. Karev Alex (Doctor ID = 3) - Pediatrics
INSERT INTO doctor_time_slots (doctor_id, day_of_week, start_time, end_time) VALUES
(3, 'Wednesday', '09:00', '09:30'),
(3, 'Wednesday', '09:30', '10:00'),
(3, 'Wednesday', '10:00', '10:30'),
(3, 'Wednesday', '10:30', '11:00'),
(3, 'Wednesday', '11:00', '11:30'),
(3, 'Wednesday', '11:30', '12:00'),

(3, 'Friday', '13:00', '13:30'),
(3, 'Friday', '13:30', '14:00'),
(3, 'Friday', '14:00', '14:30'),
(3, 'Friday', '14:30', '15:00'),
(3, 'Friday', '15:00', '15:30'),
(3, 'Friday', '15:30', '16:00');


-- APPOINTMENTS STATUS LOG TABLE
CREATE TABLE appointment_status_logs (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(id),
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO appointment_status_logs (appointment_id, old_status, new_status) VALUES
(1, 'pending', 'confirmed'),
(2, 'pending', 'pending'),
(3, 'pending', 'confirmed'),
(4, 'pending', 'cancelled');

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
(2, 'Metformin', '500mg', 'Once daily after meals', '2025-05-03'),
(3, 'Amoxicillin', '500mg', 'Three times a day for 7 days', '2025-05-05'),
(4, 'Cetirizine', '10mg', 'Once daily before sleep', '2025-05-06'),
(5, 'Lisinopril', '10mg', 'Once daily in the morning', '2025-05-08'),
(6, 'Omeprazole', '20mg', 'Once before breakfast', '2025-05-10'),
(7, 'Paracetamol', '500mg', 'Every 6 hours as needed', '2025-05-11'),
(8, 'Vitamin D', '1000 IU', 'Once daily with food', '2025-05-13');


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
(2, 2, 'lab', 'Blood sugar level test', NULL),
(3, 1, 'scan', 'X-ray report for ankle sprain', NULL),
(4, 3, 'lab', 'Thyroid hormone test results', NULL),
(2, 3, 'follow-up', 'Monitoring blood pressure response to medication', NULL),
(1, 2, 'prescription', 'Long-term pain management plan', NULL),
(3, 3, 'vaccination', 'Flu shot record', NULL),
(4, 1, 'diagnosis', 'Allergic rhinitis confirmed', NULL);


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
(2, 200.00, 'pending', '2025-05-03', 'Follow-up consultation and lab test'),
(3, 120.00, 'paid', '2025-05-05', 'Routine check-up and vaccination'),
(4, 300.00, 'pending', '2025-05-06', 'Specialist consultation and tests'),
(1, 95.50, 'paid', '2025-05-11', 'Lab tests and prescription'),
(2, 210.00, 'paid', '2025-05-12', 'Blood pressure monitoring'),
(3, 250.00, 'pending', '2025-05-14', 'Diagnostic imaging and review');


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
(2, 'Premium Health Plan', '2025-04-15', '2026-04-15', FALSE),
(3, 'Family Care Plan', '2025-05-01', '2025-11-01', TRUE),
(4, 'Basic Health Plan', '2025-05-10', '2025-11-10', FALSE);


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
(4, 5, 'Please remember to fast before your next blood test.'),
(6, 7, 'Hi Dr. Karev, can we reschedule the appointment?'),
(3, 2, 'Thank you, doctor. I have received the report.'),
(2, 5, 'Your medication is ready for pickup.'),
(7, 6, 'Can I take the new medication with food?'),
(1, 4, 'Reminder: Submit monthly patient review report.'),
(5, 3, 'I have some questions about the dosage.'),
(4, 1, 'Monthly update submitted as requested.'),
(6, 8, 'Please update your contact information during next visit.');


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
(5, 'Lab Test Reminder', 'Don’t forget your lab appointment on May 3rd.'),
(2, 'New Patient Assigned', 'You have been assigned a new patient.'),
(4, 'Leave Approved', 'Your leave request from May 5–7 has been approved.'),
(6, 'Schedule Updated', 'Your appointment schedule has been updated.'),
(7, 'Subscription Expiring Soon', 'Your health plan will expire on May 15.'),
(8, 'Medical Record Uploaded', 'A new medical report has been added to your profile.'),
(1, 'System Alert', 'Backup completed successfully.'),
(3, 'Vaccination Reminder', 'Time for your annual flu shot.');


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
(2, 'Metformin, Aspirin', 90.00, 'processing'),
(3, 'Amoxicillin, Vitamin D', 68.00, 'delivered'),
(4, 'Lisinopril, Omeprazole', 102.25, 'cancelled'),
(1, 'Aspirin', 20.00, 'delivered'),
(2, 'Insulin, Paracetamol', 110.90, 'pending'),
(3, 'Cough Syrup, Antacid', 42.10, 'delivered');


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
(5, 'Billing Question', 'Can I split my bill into two payments?', 'pending'),
(2, 'Schedule Conflict', 'Two appointments are overlapping.', 'resolved'),
(4, 'Leave Request Error', 'Unable to submit leave request for May.', 'open'),
(6, 'Patient History Missing', 'Patient record not loading correctly.', 'open'),
(7, 'Subscription Confusion', 'Do I have auto-renew enabled?', 'closed'),
(1, 'System Backup', 'Did the backup complete successfully?', 'resolved'),
(8, 'Prescription Issue', 'Pharmacy can’t find my prescription.', 'pending');


-- SERVICES TABLE
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    cost NUMERIC(10, 2)
);

INSERT INTO services (name, description, cost) VALUES
('General Consultation', 'Basic doctor consultation service', 50.00),
('Diabetes Screening', 'Includes blood test and doctor review', 120.00),
('Cardiology Checkup', 'Heart health evaluation and ECG', 200.00),
('Pediatric Consultation', 'Doctor visit for children under 12', 70.00),
('Allergy Testing', 'Comprehensive allergy panel testing', 150.00),
('Vaccination Service', 'Routine immunizations and boosters', 60.00),
('Nutritional Counseling', 'Diet plan and wellness advice', 90.00),
('Cholesterol Test', 'Blood test to measure cholesterol levels', 80.00),
('Thyroid Function Test', 'Blood test to assess thyroid hormones', 95.00),
('Mental Health Session', 'One-on-one consultation with a counselor', 110.00);


-- HEALTH PROGRAMS TABLE
CREATE TABLE health_programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE,
    eligibility TEXT
);

-- Existing Programs
INSERT INTO health_programs (name, description, start_date, end_date, eligibility) VALUES
('Heart Health Week', 'Free heart check-ups and awareness program.', '2025-06-01', '2025-06-07', 'All patients'),
('Diabetes Awareness Month', 'Workshops and free screening for diabetes', '2025-11-01', '2025-11-30', 'Adults 40+'),

-- Additional Programs
('Wellness Month', 'Mental health and stress management events.', '2025-07-01', '2025-07-31', 'All users'),
('Child Health Camp', 'Free pediatric check-ups and vaccinations.', '2025-08-10', '2025-08-20', 'Children under 12'),
('Womens Health Week', 'Breast cancer screening and wellness tips.', '2025-10-01', '2025-10-07', 'Women 18+'),
('Flu Vaccination Drive', 'Free flu shots and consultations.', '2025-09-15', '2025-09-30', 'All patients'),
('Senior Wellness Program', 'Fitness and health education for seniors.', '2025-12-01', '2025-12-10', 'Seniors 60+'),
('Cholesterol Check Camp', 'Free lipid profile and consultation.', '2025-05-15', '2025-05-20', 'Adults 30+');


-- PASSWORDS TABLE (Development)
CREATE TABLE user_passwords (
  email VARCHAR(100) PRIMARY KEY,
  password TEXT
);

INSERT INTO user_passwords (email, password) VALUES
('admin@vroch.com', 'admin123'),
('strange@vroch.com', 'doctor123'),
('jane@vroch.com', 'patient123'),
('meredith@vroch.com', 'password'),
('mark@vroch.com', 'password'),
('karev@vroch.com', 'password'),
('claire@vroch.com', 'password'),
('tom@vroch.com', 'password');