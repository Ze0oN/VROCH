// panels.js
let currentPanel = "";

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
}

function bindPanelEvents(name) {
  const fnMap = panelFunctions[name];
  if (!fnMap) return;

  Object.entries(fnMap).forEach(([btn, fn]) => {
    const el = document.querySelector(`button[onclick="${btn}()"]`);
    if (el) el.onclick = fn;
  });
}

function showOutput(data) {
  if (data?.error === 'jwt expired' || data?.error === 'invalid token') {
    alert('Session expired. Please log in again.');
    localStorage.clear();
    window.location.href = 'login.html';
    return;
  }

  const output = document.getElementById('output');
  output.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

const panelFunctions = {
  users: {
    getAllUsers: async () => {
      const res = await fetch('/api/users', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getUserById: async () => {
      const id = document.getElementById('userId')?.value;
      const res = await fetch(`/api/users/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createUser: async () => {
      const body = {
        full_name: document.getElementById('full_name')?.value,
        email: document.getElementById('email')?.value,
        password: document.getElementById('password')?.value,
        role: document.getElementById('role')?.value,
        phone: document.getElementById('phone')?.value,
        gender: document.getElementById('gender')?.value,
        date_of_birth: document.getElementById('date_of_birth')?.value,
      };
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateUser: async () => {
      const id = document.getElementById('userId')?.value;
      const body = {
        full_name: document.getElementById('full_name')?.value,
        email: document.getElementById('email')?.value,
        password: document.getElementById('password')?.value,
        role: document.getElementById('role')?.value,
        phone: document.getElementById('phone')?.value,
        gender: document.getElementById('gender')?.value,
        date_of_birth: document.getElementById('date_of_birth')?.value,
      };
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteUser: async () => {
      const id = document.getElementById('userId')?.value;
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },  

  appointments: {
    getAllAppointments: async () => {
      const res = await fetch('/api/appointments', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getAppointmentById: async () => {
      const id = document.getElementById('appointmentId')?.value;
      const res = await fetch(`/api/appointments/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createAppointment: async () => {
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        doctor_id: document.getElementById('doctor_id')?.value,
        appointment_date: document.getElementById('appointment_date')?.value,
        appointment_time: document.getElementById('appointment_time')?.value,
        status: document.getElementById('status')?.value,
        notes: document.getElementById('notes')?.value,
      };
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateAppointment: async () => {
      const id = document.getElementById('appointmentId')?.value;
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        doctor_id: document.getElementById('doctor_id')?.value,
        appointment_date: document.getElementById('appointment_date')?.value,
        appointment_time: document.getElementById('appointment_time')?.value,
        status: document.getElementById('status')?.value,
        notes: document.getElementById('notes')?.value,
      };
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteAppointment: async () => {
      const id = document.getElementById('appointmentId')?.value;
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  'doctor-time-slots': {
    getTimeSlotsByDoctor: async () => {
      const doctorId = document.getElementById('doctor_id')?.value;
      const res = await fetch(`/api/doctor-time-slots/${doctorId}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createTimeSlot: async () => {
      const body = {
        doctor_id: document.getElementById('doctor_id')?.value,
        day_of_week: document.getElementById('day_of_week')?.value,
        start_time: document.getElementById('start_time')?.value,
        end_time: document.getElementById('end_time')?.value,
      };
      const res = await fetch('/api/doctor-time-slots', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateTimeSlot: async () => {
      const slotId = document.getElementById('slotId')?.value;
      const body = {
        doctor_id: document.getElementById('doctor_id')?.value,
        day_of_week: document.getElementById('day_of_week')?.value,
        start_time: document.getElementById('start_time')?.value,
        end_time: document.getElementById('end_time')?.value,
      };
      const res = await fetch(`/api/doctor-time-slots/${slotId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteTimeSlot: async () => {
      const slotId = document.getElementById('slotId')?.value;
      const res = await fetch(`/api/doctor-time-slots/${slotId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      showOutput(await res.json());
    }
  },

  'appointment-status-logs': {
    getLogsByAppointment: async () => {
      const appointmentId = document.getElementById('appointment_id')?.value;
      const res = await fetch(`/api/appointment-status-logs/${appointmentId}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createStatusLog: async () => {
      const body = {
        appointment_id: document.getElementById('appointment_id')?.value,
        old_status: document.getElementById('old_status')?.value,
        new_status: document.getElementById('new_status')?.value,
      };
      const res = await fetch('/api/appointment-status-logs', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteStatusLog: async () => {
      const logId = document.getElementById('logId')?.value;
      const res = await fetch(`/api/appointment-status-logs/${logId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      showOutput(await res.json());
    }
  },
  
  bills: {
    getAllBills: async () => {
      const res = await fetch('/api/bills', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getBillById: async () => {
      const id = document.getElementById('billId')?.value;
      const res = await fetch(`/api/bills/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createBill: async () => {
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        amount: document.getElementById('amount')?.value,
        status: document.getElementById('status')?.value,
        billing_date: document.getElementById('billing_date')?.value,
        details: document.getElementById('details')?.value,
      };
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateBill: async () => {
      const id = document.getElementById('billId')?.value;
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        amount: document.getElementById('amount')?.value,
        status: document.getElementById('status')?.value,
        billing_date: document.getElementById('billing_date')?.value,
        details: document.getElementById('details')?.value,
      };
      const res = await fetch(`/api/bills/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteBill: async () => {
      const id = document.getElementById('billId')?.value;
      const res = await fetch(`/api/bills/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  doctors: {
    getAllDoctors: async () => {
      const res = await fetch('/api/doctors', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getDoctorById: async () => {
      const id = document.getElementById('doctorId')?.value;
      const res = await fetch(`/api/doctors/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createDoctor: async () => {
      const body = {
        user_id: document.getElementById('user_id')?.value,
        specialization: document.getElementById('specialization')?.value,
        qualifications: document.getElementById('qualifications')?.value,
        availability_status: document.getElementById('availability_status')?.value,
        profile_picture_url: document.getElementById('profile_picture_url')?.value,
        bio: document.getElementById('bio')?.value,
      };
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateDoctor: async () => {
      const id = document.getElementById('doctorId')?.value;
      const body = {
        user_id: document.getElementById('user_id')?.value,
        specialization: document.getElementById('specialization')?.value,
        qualifications: document.getElementById('qualifications')?.value,
        availability_status: document.getElementById('availability_status')?.value,
        profile_picture_url: document.getElementById('profile_picture_url')?.value,
        bio: document.getElementById('bio')?.value,
      };
      const res = await fetch(`/api/doctors/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteDoctor: async () => {
      const id = document.getElementById('doctorId')?.value;
      const res = await fetch(`/api/doctors/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },
  
  'medical-records': {
    getAllMedicalRecords: async () => {
      const res = await fetch('/api/medical-records', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getMedicalRecordById: async () => {
      const id = document.getElementById('medicalRecordsId')?.value;
      const res = await fetch(`/api/medical-records/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createMedicalRecord: async () => {
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        doctor_id: document.getElementById('doctor_id')?.value,
        record_type: document.getElementById('record_type')?.value,
        description: document.getElementById('description')?.value,
        file_url: document.getElementById('file_url')?.value,
      };
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateMedicalRecord: async () => {
      const id = document.getElementById('medicalRecordsId')?.value;
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        doctor_id: document.getElementById('doctor_id')?.value,
        record_type: document.getElementById('record_type')?.value,
        description: document.getElementById('description')?.value,
        file_url: document.getElementById('file_url')?.value,
      };
      const res = await fetch(`/api/medical-records/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteMedicalRecord: async () => {
      const id = document.getElementById('medicalRecordsId')?.value;
      const res = await fetch(`/api/medical-records/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  messages: {
    getAllMessages: async () => {
      const res = await fetch('/api/messages', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getMessageById: async () => {
      const id = document.getElementById('messageId')?.value;
      const res = await fetch(`/api/messages/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createMessage: async () => {
      const body = {
        sender_id: document.getElementById('sender_id')?.value,
        receiver_id: document.getElementById('receiver_id')?.value,
        message: document.getElementById('message')?.value,
        is_read: document.getElementById('is_read')?.value === 'true',
      };
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateMessage: async () => {
      const id = document.getElementById('messageId')?.value;
      const body = {
        sender_id: document.getElementById('sender_id')?.value,
        receiver_id: document.getElementById('receiver_id')?.value,
        message: document.getElementById('message')?.value,
        is_read: document.getElementById('is_read')?.value === 'true',
      };
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteMessage: async () => {
      const id = document.getElementById('messageId')?.value;
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  notifications: {
    getAllNotifications: async () => {
      const res = await fetch('/api/notifications', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getNotificationById: async () => {
      const id = document.getElementById('notificationId')?.value;
      const res = await fetch(`/api/notifications/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createNotification: async () => {
      const body = {
        user_id: document.getElementById('user_id')?.value,
        title: document.getElementById('title')?.value,
        body: document.getElementById('body')?.value,
        is_read: document.getElementById('is_read')?.value === 'true',
      };
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateNotification: async () => {
      const id = document.getElementById('notificationId')?.value;
      const body = {
        user_id: document.getElementById('user_id')?.value,
        title: document.getElementById('title')?.value,
        body: document.getElementById('body')?.value,
        is_read: document.getElementById('is_read')?.value === 'true',
      };
      const res = await fetch(`/api/notifications/${id}`, { headers: authHeaders() }, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteNotification: async () => {
      const id = document.getElementById('notificationId')?.value;
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  patients: {
    getAllPatients: async () => {
      const res = await fetch('/api/patients', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getPatientById: async () => {
      const id = document.getElementById('patientId')?.value;
      const res = await fetch(`/api/patients/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createPatient: async () => {
      const body = {
        user_id: document.getElementById('user_id')?.value,
        blood_group: document.getElementById('blood_group')?.value,
        emergency_contact_name: document.getElementById('emergency_contact_name')?.value,
        emergency_contact_phone: document.getElementById('emergency_contact_phone')?.value,
        address: document.getElementById('address')?.value,
        allergies: document.getElementById('allergies')?.value,
        chronic_conditions: document.getElementById('chronic_conditions')?.value,
      };
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updatePatient: async () => {
      const id = document.getElementById('patientId')?.value;
      const body = {
        user_id: document.getElementById('user_id')?.value,
        blood_group: document.getElementById('blood_group')?.value,
        emergency_contact_name: document.getElementById('emergency_contact_name')?.value,
        emergency_contact_phone: document.getElementById('emergency_contact_phone')?.value,
        address: document.getElementById('address')?.value,
        allergies: document.getElementById('allergies')?.value,
        chronic_conditions: document.getElementById('chronic_conditions')?.value,
      };
      const res = await fetch(`/api/patients/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deletePatient: async () => {
      const id = document.getElementById('patientId')?.value;
      const res = await fetch(`/api/patients/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  'pharmacy-orders': {
    getAllPharmacy_orders: async () => {
      const res = await fetch('/api/adminBoard/pharmacy-orders', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getPharmacy_ordersById: async () => {
      const id = document.getElementById('pharmacy_ordersId')?.value;
      const res = await fetch(`/api/adminBoard/pharmacy-orders/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createPharmacy_orders: async () => {
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        medications: document.getElementById('medications')?.value,
        total_amount: document.getElementById('total_amount')?.value,
        status: document.getElementById('status')?.value,
        ordered_at: document.getElementById('order_date')?.value,
      };
      const res = await fetch('/api/adminBoard/pharmacy-orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updatePharmacy_orders: async () => {
      const id = document.getElementById('pharmacy_ordersId')?.value;
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        medications: document.getElementById('medications')?.value,
        total_amount: document.getElementById('total_amount')?.value,
        status: document.getElementById('status')?.value,
        ordered_at: document.getElementById('order_date')?.value,
      };
      const res = await fetch(`/api/adminBoard/pharmacy-orders/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deletePharmacy_orders: async () => {
      const id = document.getElementById('pharmacy_ordersId')?.value;
      const res = await fetch(`/api/adminBoard/pharmacy-orders/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  prescriptions: {
    getAllPrescriptions: async () => {
      const res = await fetch('/api/prescriptions', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getPrescriptionById: async () => {
      const id = document.getElementById('prescriptionId')?.value;
      const res = await fetch(`/api/prescriptions/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createPrescription: async () => {
      const body = {
        appointment_id: document.getElementById('appointment_id')?.value,
        medication: document.getElementById('medication')?.value,
        dosage: document.getElementById('dosage')?.value,
        instructions: document.getElementById('instructions')?.value,
        issued_date: document.getElementById('issued_date')?.value,
      };
      const res = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updatePrescription: async () => {
      const id = document.getElementById('prescriptionId')?.value;
      const body = {
        appointment_id: document.getElementById('appointment_id')?.value,
        medication: document.getElementById('medication')?.value,
        dosage: document.getElementById('dosage')?.value,
        instructions: document.getElementById('instructions')?.value,
        issued_date: document.getElementById('issued_date')?.value,
      };
      const res = await fetch(`/api/prescriptions/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deletePrescription: async () => {
      const id = document.getElementById('prescriptionId')?.value;
      const res = await fetch(`/api/prescriptions/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  programs: {
    getAllPrograms: async () => {
      const res = await fetch('/api/programs', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getProgramById: async () => {
      const id = document.getElementById('programId')?.value;
      const res = await fetch(`/api/programs/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createProgram: async () => {
      const body = {
        name: document.getElementById('name')?.value,
        description: document.getElementById('description')?.value,
        start_date: document.getElementById('start_date')?.value,
        end_date: document.getElementById('end_date')?.value,
        eligibility: document.getElementById('eligibility')?.value,
      };
      const res = await fetch('/api/programs', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateProgram: async () => {
      const id = document.getElementById('programId')?.value;
      const body = {
        name: document.getElementById('name')?.value,
        description: document.getElementById('description')?.value,
        start_date: document.getElementById('start_date')?.value,
        end_date: document.getElementById('end_date')?.value,
        eligibility: document.getElementById('eligibility')?.value,
      };
      const res = await fetch(`/api/programs/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteProgram: async () => {
      const id = document.getElementById('programId')?.value;
      const res = await fetch(`/api/programs/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },  
  
  'support-tickets': {
    getAllSupport_tickets: async () => {
      const res = await fetch('/api/support-tickets', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getSupport_ticketsById: async () => {
      const id = document.getElementById('support_ticketsId')?.value;
      const res = await fetch(`/api/support-tickets/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createSupport_tickets: async () => {
      const body = {
        user_id: document.getElementById('user_id')?.value,
        subject: document.getElementById('subject')?.value,
        description: document.getElementById('description')?.value,
        status: document.getElementById('status')?.value,
      };
      const res = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateSupport_tickets: async () => {
      const id = document.getElementById('support_ticketsId')?.value;
      const body = {
        user_id: document.getElementById('user_id')?.value,
        subject: document.getElementById('subject')?.value,
        description: document.getElementById('description')?.value,
        status: document.getElementById('status')?.value,
      };
      const res = await fetch(`/api/support-tickets/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteSupport_tickets: async () => {
      const id = document.getElementById('support_ticketsId')?.value;
      const res = await fetch(`/api/support-tickets/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  subscriptions: {
    getAllSubscriptions: async () => {
      const res = await fetch('/api/subscriptions', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getSubscriptionById: async () => {
      const id = document.getElementById('subscriptionId')?.value;
      const res = await fetch(`/api/subscriptions/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createSubscription: async () => {
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        plan_name: document.getElementById('plan_name')?.value,
        start_date: document.getElementById('start_date')?.value,
        end_date: document.getElementById('end_date')?.value,
        auto_renew: document.getElementById('auto_renew')?.value === 'true',
      };
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateSubscription: async () => {
      const id = document.getElementById('subscriptionId')?.value;
      const body = {
        patient_id: document.getElementById('patient_id')?.value,
        plan_name: document.getElementById('plan_name')?.value,
        start_date: document.getElementById('start_date')?.value,
        end_date: document.getElementById('end_date')?.value,
        auto_renew: document.getElementById('auto_renew')?.value === 'true',
      };
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteSubscription: async () => {
      const id = document.getElementById('subscriptionId')?.value;
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  },

  services: {
    getAllServices: async () => {
      const res = await fetch('/api/services', { headers: authHeaders() });
      showOutput(await res.json());
    },
    getServiceById: async () => {
      const id = document.getElementById('serviceId')?.value;
      const res = await fetch(`/api/services/${id}`, { headers: authHeaders() });
      showOutput(await res.json());
    },
    createService: async () => {
      const body = {
        name: document.getElementById('name')?.value,
        description: document.getElementById('description')?.value,
        cost: document.getElementById('cost')?.value,
      };
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    updateService: async () => {
      const id = document.getElementById('serviceId')?.value;
      const body = {
        name: document.getElementById('name')?.value,
        description: document.getElementById('description')?.value,
        cost: document.getElementById('cost')?.value,
      };
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      showOutput(await res.json());
    },
    deleteService: async () => {
      const id = document.getElementById('serviceId')?.value;
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      showOutput(await res.json());
    }    
  }  
};

function collect(fields) {
  const data = {};
  fields.forEach(f => data[f] = document.getElementById(f).value);
  return data;
}

function post(body) {
  return {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  };
}

function put(body) {
  return {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  };
}

function del() {
  return { method: 'DELETE' };
}

function bindCRUD(entity, fields) {
  const cap = entity.replace('-', '_');
  return {
    [`getAll${capitalize(cap)}`]: async () => {
      const res = await fetch(`/api/${entity}`);
      showOutput(await res.json());
    },
    [`get${capitalize(cap)}ById`]: async () => {
      const id = document.getElementById(`${cap}Id`).value;
      const res = await fetch(`/api/${entity}/${id}`);
      showOutput(await res.json());
    },
    [`create${capitalize(cap)}`]: async () => {
      const body = collect(fields);
      const res = await fetch(`/api/${entity}`, post(body));
      showOutput(await res.json());
    },
    [`update${capitalize(cap)}`]: async () => {
      const id = document.getElementById(`${cap}Id`).value;
      const body = collect(fields);
      const res = await fetch(`/api/${entity}/${id}`, put(body));
      showOutput(await res.json());
    },
    [`delete${capitalize(cap)}`]: async () => {
      const id = document.getElementById(`${cap}Id`).value;
      const res = await fetch(`/api/${entity}/${id}`, del());
      showOutput(await res.json());
    },
  };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
