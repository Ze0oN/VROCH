--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-07 17:19:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 50424)
-- Name: appointment_status_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment_status_logs (
    id integer NOT NULL,
    appointment_id integer,
    old_status character varying(20),
    new_status character varying(20),
    changed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.appointment_status_logs OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 50423)
-- Name: appointment_status_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_status_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_status_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 227
-- Name: appointment_status_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_status_logs_id_seq OWNED BY public.appointment_status_logs.id;


--
-- TOC entry 224 (class 1259 OID 50393)
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    patient_id integer,
    doctor_id integer,
    appointment_date date,
    appointment_start_time time without time zone,
    appointment_end_time time without time zone,
    status character varying(20),
    notes text
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 50392)
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 223
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- TOC entry 234 (class 1259 OID 50471)
-- Name: bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills (
    id integer NOT NULL,
    patient_id integer,
    amount numeric(10,2),
    status character varying(20),
    billing_date date,
    details text
);


ALTER TABLE public.bills OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 50470)
-- Name: bills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 233
-- Name: bills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_id_seq OWNED BY public.bills.id;


--
-- TOC entry 226 (class 1259 OID 50412)
-- Name: doctor_time_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_time_slots (
    id integer NOT NULL,
    doctor_id integer,
    day_of_week character varying(10),
    start_time time without time zone,
    end_time time without time zone
);


ALTER TABLE public.doctor_time_slots OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 50411)
-- Name: doctor_time_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_time_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_time_slots_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 225
-- Name: doctor_time_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_time_slots_id_seq OWNED BY public.doctor_time_slots.id;


--
-- TOC entry 220 (class 1259 OID 50365)
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    user_id integer,
    specialization character varying(100),
    qualifications text,
    availability_status character varying(20),
    profile_picture_url text,
    bio text
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 50364)
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctors_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 219
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- TOC entry 248 (class 1259 OID 50574)
-- Name: health_programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.health_programs (
    id integer NOT NULL,
    name character varying(100),
    description text,
    start_date date,
    end_date date,
    eligibility text
);


ALTER TABLE public.health_programs OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 50573)
-- Name: health_programs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.health_programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.health_programs_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 247
-- Name: health_programs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.health_programs_id_seq OWNED BY public.health_programs.id;


--
-- TOC entry 232 (class 1259 OID 50451)
-- Name: medical_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medical_records (
    id integer NOT NULL,
    patient_id integer,
    doctor_id integer,
    record_type character varying(50),
    description text,
    file_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.medical_records OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 50450)
-- Name: medical_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medical_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medical_records_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 231
-- Name: medical_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medical_records_id_seq OWNED BY public.medical_records.id;


--
-- TOC entry 238 (class 1259 OID 50497)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    message text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_read boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 50496)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 237
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 240 (class 1259 OID 50518)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer,
    title character varying(100),
    body text,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 50517)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 239
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 222 (class 1259 OID 50379)
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    user_id integer,
    blood_group character varying(5),
    emergency_contact_name character varying(100),
    emergency_contact_phone character varying(20),
    address text,
    allergies text,
    chronic_conditions text
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 50378)
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patients_id_seq OWNER TO postgres;

--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 221
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- TOC entry 242 (class 1259 OID 50534)
-- Name: pharmacy_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pharmacy_orders (
    id integer NOT NULL,
    patient_id integer,
    medications text,
    total_amount numeric(10,2),
    status character varying(20),
    ordered_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pharmacy_orders OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 50533)
-- Name: pharmacy_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pharmacy_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pharmacy_orders_id_seq OWNER TO postgres;

--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 241
-- Name: pharmacy_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pharmacy_orders_id_seq OWNED BY public.pharmacy_orders.id;


--
-- TOC entry 230 (class 1259 OID 50437)
-- Name: prescriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescriptions (
    id integer NOT NULL,
    appointment_id integer,
    medication text,
    dosage text,
    instructions text,
    issued_date date
);


ALTER TABLE public.prescriptions OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 50436)
-- Name: prescriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prescriptions_id_seq OWNER TO postgres;

--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 229
-- Name: prescriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescriptions_id_seq OWNED BY public.prescriptions.id;


--
-- TOC entry 246 (class 1259 OID 50565)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying(100),
    description text,
    cost numeric(10,2)
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 50564)
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO postgres;

--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 245
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- TOC entry 236 (class 1259 OID 50485)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id integer NOT NULL,
    patient_id integer,
    plan_name character varying(100),
    start_date date,
    end_date date,
    auto_renew boolean
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 50484)
-- Name: subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_id_seq OWNER TO postgres;

--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 235
-- Name: subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscriptions_id_seq OWNED BY public.subscriptions.id;


--
-- TOC entry 244 (class 1259 OID 50549)
-- Name: support_tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_tickets (
    id integer NOT NULL,
    user_id integer,
    subject character varying(100),
    description text,
    status character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.support_tickets OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 50548)
-- Name: support_tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.support_tickets_id_seq OWNER TO postgres;

--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 243
-- Name: support_tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_tickets_id_seq OWNED BY public.support_tickets.id;


--
-- TOC entry 249 (class 1259 OID 50582)
-- Name: user_passwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_passwords (
    email character varying(100) NOT NULL,
    password text
);


ALTER TABLE public.user_passwords OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 50352)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(100),
    email character varying(100),
    password_hash text,
    role character varying(20),
    phone character varying(20),
    gender character varying(10),
    date_of_birth date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 50351)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4828 (class 2604 OID 50427)
-- Name: appointment_status_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_status_logs ALTER COLUMN id SET DEFAULT nextval('public.appointment_status_logs_id_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 50396)
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 50474)
-- Name: bills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills ALTER COLUMN id SET DEFAULT nextval('public.bills_id_seq'::regclass);


--
-- TOC entry 4827 (class 2604 OID 50415)
-- Name: doctor_time_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_time_slots ALTER COLUMN id SET DEFAULT nextval('public.doctor_time_slots_id_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 50368)
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- TOC entry 4847 (class 2604 OID 50577)
-- Name: health_programs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.health_programs ALTER COLUMN id SET DEFAULT nextval('public.health_programs_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 50454)
-- Name: medical_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_records ALTER COLUMN id SET DEFAULT nextval('public.medical_records_id_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 50500)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4838 (class 2604 OID 50521)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 50382)
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- TOC entry 4841 (class 2604 OID 50537)
-- Name: pharmacy_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_orders ALTER COLUMN id SET DEFAULT nextval('public.pharmacy_orders_id_seq'::regclass);


--
-- TOC entry 4830 (class 2604 OID 50440)
-- Name: prescriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions ALTER COLUMN id SET DEFAULT nextval('public.prescriptions_id_seq'::regclass);


--
-- TOC entry 4846 (class 2604 OID 50568)
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- TOC entry 4834 (class 2604 OID 50488)
-- Name: subscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions ALTER COLUMN id SET DEFAULT nextval('public.subscriptions_id_seq'::regclass);


--
-- TOC entry 4843 (class 2604 OID 50552)
-- Name: support_tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets ALTER COLUMN id SET DEFAULT nextval('public.support_tickets_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 50355)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5056 (class 0 OID 50424)
-- Dependencies: 228
-- Data for Name: appointment_status_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment_status_logs (id, appointment_id, old_status, new_status, changed_at) FROM stdin;
1	1	pending	confirmed	2025-05-06 21:31:39.46526
2	2	pending	pending	2025-05-06 21:31:39.46526
3	3	pending	confirmed	2025-05-06 21:31:39.46526
4	4	pending	cancelled	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5052 (class 0 OID 50393)
-- Dependencies: 224
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (id, patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, status, notes) FROM stdin;
1	1	1	2025-05-01	10:00:00	10:30:00	confirmed	Initial consultation
2	2	2	2025-05-03	14:00:00	14:30:00	pending	Follow-up consultation
3	3	1	2025-05-05	09:30:00	10:00:00	confirmed	Routine check-up
4	4	3	2025-05-06	15:45:00	16:15:00	cancelled	Pediatric exam
5	1	3	2025-05-10	13:00:00	13:30:00	pending	Specialist referral discussion
6	2	1	2025-05-11	08:45:00	09:15:00	confirmed	Lab results follow-up
7	4	1	2025-05-15	10:30:00	11:00:00	pending	Allergy assessment
8	3	2	2025-05-18	09:00:00	09:30:00	confirmed	Dietary advice and planning
\.


--
-- TOC entry 5062 (class 0 OID 50471)
-- Dependencies: 234
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills (id, patient_id, amount, status, billing_date, details) FROM stdin;
1	1	150.00	paid	2025-05-01	Consultation and medication
2	2	200.00	pending	2025-05-03	Follow-up consultation and lab test
3	3	120.00	paid	2025-05-05	Routine check-up and vaccination
4	4	300.00	pending	2025-05-06	Specialist consultation and tests
5	1	95.50	paid	2025-05-11	Lab tests and prescription
6	2	210.00	paid	2025-05-12	Blood pressure monitoring
7	3	250.00	pending	2025-05-14	Diagnostic imaging and review
\.


--
-- TOC entry 5054 (class 0 OID 50412)
-- Dependencies: 226
-- Data for Name: doctor_time_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_time_slots (id, doctor_id, day_of_week, start_time, end_time) FROM stdin;
1	1	Monday	09:00:00	09:30:00
2	1	Monday	09:30:00	10:00:00
3	1	Monday	10:00:00	10:30:00
4	1	Monday	10:30:00	11:00:00
5	1	Monday	11:00:00	11:30:00
6	1	Monday	11:30:00	12:00:00
7	1	Wednesday	13:00:00	13:30:00
8	1	Wednesday	13:30:00	14:00:00
9	1	Wednesday	14:00:00	14:30:00
10	1	Wednesday	14:30:00	15:00:00
11	1	Wednesday	15:00:00	15:30:00
12	1	Wednesday	15:30:00	16:00:00
13	2	Tuesday	09:00:00	09:30:00
14	2	Tuesday	09:30:00	10:00:00
15	2	Tuesday	10:00:00	10:30:00
16	2	Tuesday	10:30:00	11:00:00
17	2	Tuesday	11:00:00	11:30:00
18	2	Tuesday	11:30:00	12:00:00
19	2	Thursday	13:00:00	13:30:00
20	2	Thursday	13:30:00	14:00:00
21	2	Thursday	14:00:00	14:30:00
22	2	Thursday	14:30:00	15:00:00
23	2	Thursday	15:00:00	15:30:00
24	2	Thursday	15:30:00	16:00:00
25	3	Wednesday	09:00:00	09:30:00
26	3	Wednesday	09:30:00	10:00:00
27	3	Wednesday	10:00:00	10:30:00
28	3	Wednesday	10:30:00	11:00:00
29	3	Wednesday	11:00:00	11:30:00
30	3	Wednesday	11:30:00	12:00:00
31	3	Friday	13:00:00	13:30:00
32	3	Friday	13:30:00	14:00:00
33	3	Friday	14:00:00	14:30:00
34	3	Friday	14:30:00	15:00:00
35	3	Friday	15:00:00	15:30:00
36	3	Friday	15:30:00	16:00:00
\.


--
-- TOC entry 5048 (class 0 OID 50365)
-- Dependencies: 220
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (id, user_id, specialization, qualifications, availability_status, profile_picture_url, bio) FROM stdin;
1	2	Neurology	MD, PhD	available	\N	Experienced neurologist.
2	4	Cardiology	MD, FACC	on_leave	\N	Cardiologist with 10 years experience.
3	6	Pediatrics	MD	available	\N	Specialist in child healthcare with a focus on preventive care.
\.


--
-- TOC entry 5076 (class 0 OID 50574)
-- Dependencies: 248
-- Data for Name: health_programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.health_programs (id, name, description, start_date, end_date, eligibility) FROM stdin;
1	Heart Health Week	Free heart check-ups and awareness program.	2025-06-01	2025-06-07	All patients
2	Diabetes Awareness Month	Workshops and free screening for diabetes	2025-11-01	2025-11-30	Adults 40+
3	Wellness Month	Mental health and stress management events.	2025-07-01	2025-07-31	All users
4	Child Health Camp	Free pediatric check-ups and vaccinations.	2025-08-10	2025-08-20	Children under 12
5	Womens Health Week	Breast cancer screening and wellness tips.	2025-10-01	2025-10-07	Women 18+
6	Flu Vaccination Drive	Free flu shots and consultations.	2025-09-15	2025-09-30	All patients
7	Senior Wellness Program	Fitness and health education for seniors.	2025-12-01	2025-12-10	Seniors 60+
8	Cholesterol Check Camp	Free lipid profile and consultation.	2025-05-15	2025-05-20	Adults 30+
\.


--
-- TOC entry 5060 (class 0 OID 50451)
-- Dependencies: 232
-- Data for Name: medical_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medical_records (id, patient_id, doctor_id, record_type, description, file_url, created_at) FROM stdin;
1	1	1	diagnosis	Migraine diagnosis	\N	2025-05-06 21:31:39.46526
2	2	2	lab	Blood sugar level test	\N	2025-05-06 21:31:39.46526
3	3	1	scan	X-ray report for ankle sprain	\N	2025-05-06 21:31:39.46526
4	4	3	lab	Thyroid hormone test results	\N	2025-05-06 21:31:39.46526
5	2	3	follow-up	Monitoring blood pressure response to medication	\N	2025-05-06 21:31:39.46526
6	1	2	prescription	Long-term pain management plan	\N	2025-05-06 21:31:39.46526
7	3	3	vaccination	Flu shot record	\N	2025-05-06 21:31:39.46526
8	4	1	diagnosis	Allergic rhinitis confirmed	\N	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5066 (class 0 OID 50497)
-- Dependencies: 238
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, sender_id, receiver_id, message, "timestamp", is_read) FROM stdin;
1	2	3	Hello, your test results are ready.	2025-05-06 21:31:39.46526	f
2	4	5	Please remember to fast before your next blood test.	2025-05-06 21:31:39.46526	f
3	6	7	Hi Dr. Karev, can we reschedule the appointment?	2025-05-06 21:31:39.46526	f
4	3	2	Thank you, doctor. I have received the report.	2025-05-06 21:31:39.46526	f
5	2	5	Your medication is ready for pickup.	2025-05-06 21:31:39.46526	f
6	7	6	Can I take the new medication with food?	2025-05-06 21:31:39.46526	f
7	1	4	Reminder: Submit monthly patient review report.	2025-05-06 21:31:39.46526	f
8	5	3	I have some questions about the dosage.	2025-05-06 21:31:39.46526	f
9	4	1	Monthly update submitted as requested.	2025-05-06 21:31:39.46526	f
10	6	8	Please update your contact information during next visit.	2025-05-06 21:31:39.46526	f
\.


--
-- TOC entry 5068 (class 0 OID 50518)
-- Dependencies: 240
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, title, body, is_read, created_at) FROM stdin;
1	3	Appointment Reminder	You have an appointment tomorrow at 10 AM.	f	2025-05-06 21:31:39.46526
2	5	Lab Test Reminder	Don’t forget your lab appointment on May 3rd.	f	2025-05-06 21:31:39.46526
3	2	New Patient Assigned	You have been assigned a new patient.	f	2025-05-06 21:31:39.46526
4	4	Leave Approved	Your leave request from May 5–7 has been approved.	f	2025-05-06 21:31:39.46526
5	6	Schedule Updated	Your appointment schedule has been updated.	f	2025-05-06 21:31:39.46526
6	7	Subscription Expiring Soon	Your health plan will expire on May 15.	f	2025-05-06 21:31:39.46526
7	8	Medical Record Uploaded	A new medical report has been added to your profile.	f	2025-05-06 21:31:39.46526
8	1	System Alert	Backup completed successfully.	f	2025-05-06 21:31:39.46526
9	3	Vaccination Reminder	Time for your annual flu shot.	f	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5050 (class 0 OID 50379)
-- Dependencies: 222
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (id, user_id, blood_group, emergency_contact_name, emergency_contact_phone, address, allergies, chronic_conditions) FROM stdin;
1	3	A+	John Doe	4444444444	123 Health St.	None	Asthma
2	5	B-	Emily Spencer	7777777777	456 Wellness Blvd	Peanuts	Diabetes
3	7	O+	Angela Bennet	6666666666	789 Care Ave.	Latex	None
4	8	AB-	Michael Hardy	5555555555	321 Vital Rd.	None	Hypertension
\.


--
-- TOC entry 5070 (class 0 OID 50534)
-- Dependencies: 242
-- Data for Name: pharmacy_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pharmacy_orders (id, patient_id, medications, total_amount, status, ordered_at) FROM stdin;
1	1	Ibuprofen, Paracetamol	75.50	delivered	2025-05-06 21:31:39.46526
2	2	Metformin, Aspirin	90.00	processing	2025-05-06 21:31:39.46526
3	3	Amoxicillin, Vitamin D	68.00	delivered	2025-05-06 21:31:39.46526
4	4	Lisinopril, Omeprazole	102.25	cancelled	2025-05-06 21:31:39.46526
5	1	Aspirin	20.00	delivered	2025-05-06 21:31:39.46526
6	2	Insulin, Paracetamol	110.90	pending	2025-05-06 21:31:39.46526
7	3	Cough Syrup, Antacid	42.10	delivered	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5058 (class 0 OID 50437)
-- Dependencies: 230
-- Data for Name: prescriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prescriptions (id, appointment_id, medication, dosage, instructions, issued_date) FROM stdin;
1	1	Ibuprofen	200mg	Twice a day	2025-05-01
2	2	Metformin	500mg	Once daily after meals	2025-05-03
3	3	Amoxicillin	500mg	Three times a day for 7 days	2025-05-05
4	4	Cetirizine	10mg	Once daily before sleep	2025-05-06
5	5	Lisinopril	10mg	Once daily in the morning	2025-05-08
6	6	Omeprazole	20mg	Once before breakfast	2025-05-10
7	7	Paracetamol	500mg	Every 6 hours as needed	2025-05-11
8	8	Vitamin D	1000 IU	Once daily with food	2025-05-13
\.


--
-- TOC entry 5074 (class 0 OID 50565)
-- Dependencies: 246
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, description, cost) FROM stdin;
1	General Consultation	Basic doctor consultation service	50.00
2	Diabetes Screening	Includes blood test and doctor review	120.00
3	Cardiology Checkup	Heart health evaluation and ECG	200.00
4	Pediatric Consultation	Doctor visit for children under 12	70.00
5	Allergy Testing	Comprehensive allergy panel testing	150.00
6	Vaccination Service	Routine immunizations and boosters	60.00
7	Nutritional Counseling	Diet plan and wellness advice	90.00
8	Cholesterol Test	Blood test to measure cholesterol levels	80.00
9	Thyroid Function Test	Blood test to assess thyroid hormones	95.00
10	Mental Health Session	One-on-one consultation with a counselor	110.00
\.


--
-- TOC entry 5064 (class 0 OID 50485)
-- Dependencies: 236
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, patient_id, plan_name, start_date, end_date, auto_renew) FROM stdin;
1	1	Basic Health Plan	2025-04-01	2025-10-01	t
2	2	Premium Health Plan	2025-04-15	2026-04-15	f
3	3	Family Care Plan	2025-05-01	2025-11-01	t
4	4	Basic Health Plan	2025-05-10	2025-11-10	f
\.


--
-- TOC entry 5072 (class 0 OID 50549)
-- Dependencies: 244
-- Data for Name: support_tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_tickets (id, user_id, subject, description, status, created_at, updated_at) FROM stdin;
1	3	Login Issue	I can’t access my account.	open	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
2	5	Billing Question	Can I split my bill into two payments?	pending	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
3	2	Schedule Conflict	Two appointments are overlapping.	resolved	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
4	4	Leave Request Error	Unable to submit leave request for May.	open	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
5	6	Patient History Missing	Patient record not loading correctly.	open	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
6	7	Subscription Confusion	Do I have auto-renew enabled?	closed	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
7	1	System Backup	Did the backup complete successfully?	resolved	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
8	8	Prescription Issue	Pharmacy can’t find my prescription.	pending	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5077 (class 0 OID 50582)
-- Dependencies: 249
-- Data for Name: user_passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_passwords (email, password) FROM stdin;
admin@vroch.com	admin123
strange@vroch.com	doctor123
jane@vroch.com	patient123
meredith@vroch.com	password
mark@vroch.com	password
karev@vroch.com	password
claire@vroch.com	password
tom@vroch.com	password
\.


--
-- TOC entry 5046 (class 0 OID 50352)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password_hash, role, phone, gender, date_of_birth, created_at, updated_at) FROM stdin;
1	Admin User	admin@vroch.com	$2b$10$Nm6Kfq7exRO4pdpznoK6lOYakzHUg6qWJXaAhv9xmgD77Do//4ksO	admin	1111111111	other	1980-01-01	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
2	Dr. Strange	strange@vroch.com	$2b$10$j8aygi5zKmczoRel7aMf7.d65DTI1KdVinoWnpMr4RiwRdWcURoPm	doctor	2222222222	male	1975-05-10	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
3	Jane Patient	jane@vroch.com	$2b$10$wX7.A1/wNDjPFtN490wLVuM5OHYZsFMmWH9n6EasJTmF1/ETm5lDS	patient	3333333333	female	1990-09-20	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
4	Dr. Meredith Grey	meredith@vroch.com	$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC	doctor	5555555555	female	1983-02-14	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
5	Mark Spencer	mark@vroch.com	$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC	patient	6666666666	male	1988-07-30	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
6	Dr. Karev Alex	karev@vroch.com	$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC	doctor	7777777777	male	1980-11-05	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
7	Claire Bennet	claire@vroch.com	$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC	patient	8888888888	female	1995-06-12	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
8	Tom Hardy	tom@vroch.com	$2b$10$qoLbs5n1ATk1iIKlhy.8m.b/xiw93/zU/E8pKJp3oSy94IxkwsDdC	patient	9999999999	male	1992-04-18	2025-05-06 21:31:39.46526	2025-05-06 21:31:39.46526
\.


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 227
-- Name: appointment_status_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_status_logs_id_seq', 4, true);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 223
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_id_seq', 8, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 233
-- Name: bills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_id_seq', 7, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 225
-- Name: doctor_time_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_time_slots_id_seq', 36, true);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 219
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_id_seq', 3, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 247
-- Name: health_programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.health_programs_id_seq', 8, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 231
-- Name: medical_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medical_records_id_seq', 8, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 237
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 10, true);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 239
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 9, true);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 221
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patients_id_seq', 4, true);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 241
-- Name: pharmacy_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pharmacy_orders_id_seq', 7, true);


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 229
-- Name: prescriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescriptions_id_seq', 8, true);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 245
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 10, true);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 235
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 4, true);


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 243
-- Name: support_tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_tickets_id_seq', 8, true);


--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- TOC entry 4861 (class 2606 OID 50430)
-- Name: appointment_status_logs appointment_status_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_status_logs
    ADD CONSTRAINT appointment_status_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4857 (class 2606 OID 50400)
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- TOC entry 4867 (class 2606 OID 50478)
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_pkey PRIMARY KEY (id);


--
-- TOC entry 4859 (class 2606 OID 50417)
-- Name: doctor_time_slots doctor_time_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_time_slots
    ADD CONSTRAINT doctor_time_slots_pkey PRIMARY KEY (id);


--
-- TOC entry 4853 (class 2606 OID 50372)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- TOC entry 4881 (class 2606 OID 50581)
-- Name: health_programs health_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.health_programs
    ADD CONSTRAINT health_programs_pkey PRIMARY KEY (id);


--
-- TOC entry 4865 (class 2606 OID 50459)
-- Name: medical_records medical_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4871 (class 2606 OID 50506)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4873 (class 2606 OID 50527)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4855 (class 2606 OID 50386)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- TOC entry 4875 (class 2606 OID 50542)
-- Name: pharmacy_orders pharmacy_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_orders
    ADD CONSTRAINT pharmacy_orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4863 (class 2606 OID 50444)
-- Name: prescriptions prescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT prescriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 4879 (class 2606 OID 50572)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 4869 (class 2606 OID 50490)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 4877 (class 2606 OID 50558)
-- Name: support_tickets support_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 50588)
-- Name: user_passwords user_passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_passwords
    ADD CONSTRAINT user_passwords_pkey PRIMARY KEY (email);


--
-- TOC entry 4849 (class 2606 OID 50363)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4851 (class 2606 OID 50361)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4889 (class 2606 OID 50431)
-- Name: appointment_status_logs appointment_status_logs_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_status_logs
    ADD CONSTRAINT appointment_status_logs_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id);


--
-- TOC entry 4886 (class 2606 OID 50406)
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- TOC entry 4887 (class 2606 OID 50401)
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4893 (class 2606 OID 50479)
-- Name: bills bills_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4888 (class 2606 OID 50418)
-- Name: doctor_time_slots doctor_time_slots_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_time_slots
    ADD CONSTRAINT doctor_time_slots_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- TOC entry 4884 (class 2606 OID 50373)
-- Name: doctors doctors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4891 (class 2606 OID 50465)
-- Name: medical_records medical_records_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- TOC entry 4892 (class 2606 OID 50460)
-- Name: medical_records medical_records_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4895 (class 2606 OID 50512)
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id);


--
-- TOC entry 4896 (class 2606 OID 50507)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- TOC entry 4897 (class 2606 OID 50528)
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4885 (class 2606 OID 50387)
-- Name: patients patients_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4898 (class 2606 OID 50543)
-- Name: pharmacy_orders pharmacy_orders_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_orders
    ADD CONSTRAINT pharmacy_orders_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4890 (class 2606 OID 50445)
-- Name: prescriptions prescriptions_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT prescriptions_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id);


--
-- TOC entry 4894 (class 2606 OID 50491)
-- Name: subscriptions subscriptions_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- TOC entry 4899 (class 2606 OID 50559)
-- Name: support_tickets support_tickets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-05-07 17:19:20

--
-- PostgreSQL database dump complete
--

