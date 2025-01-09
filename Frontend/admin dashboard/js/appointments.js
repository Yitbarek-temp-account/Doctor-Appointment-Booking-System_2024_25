let appointments = [];
const viewModal = new bootstrap.Modal(document.getElementById('viewAppointmentModal'));
const rescheduleModal = new bootstrap.Modal(document.getElementById('rescheduleModal'));

document.addEventListener('DOMContentLoaded', function() {
    loadAppointments();
    loadDoctors();
    
    // Setup form listeners
    document.getElementById('rescheduleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleReschedule();
    });
});

function loadAppointments() {
    // Simulate API call to get appointments
    appointments = [
        {
            id: 'APT001',
            datetime: '2024-03-20T10:00',
            patient: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '123-456-7890'
            },
            doctor: {
                name: 'Dr. Smith',
                specialty: 'Cardiology'
            },
            status: 'pending',
            reason: 'Regular checkup'
        },
        // Add more sample appointments
    ];
    
    renderAppointments();
}

function renderAppointments() {
    const tbody = document.getElementById('appointmentsTable');
    tbody.innerHTML = appointments.map(apt => `
        <tr>
            <td>${apt.id}</td>
            <td>${formatDateTime(apt.datetime)}</td>
            <td>${apt.patient.name}</td>
            <td>${apt.doctor.name}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(apt.status)}">
                    ${apt.status.toUpperCase()}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewAppointment('${apt.id}')">
                    View
                </button>
                ${apt.status === 'pending' ? `
                    <button class="btn btn-sm btn-success" onclick="approveAppointment('${apt.id}')">
                        Approve
                    </button>
                ` : ''}
                ${apt.status !== 'cancelled' ? `
                    <button class="btn btn-sm btn-warning" onclick="showRescheduleModal('${apt.id}')">
                        Reschedule
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="cancelAppointment('${apt.id}')">
                        Cancel
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

function viewAppointment(id) {
    const apt = appointments.find(a => a.id === id);
    if (!apt) return;

    document.getElementById('appointmentDetails').innerHTML = `
        <div class="mb-3">
            <h6>Appointment ID: ${apt.id}</h6>
            <p><strong>Date & Time:</strong> ${formatDateTime(apt.datetime)}</p>
            <hr>
            <h6>Patient Information</h6>
            <p>Name: ${apt.patient.name}<br>
            Email: ${apt.patient.email}<br>
            Phone: ${apt.patient.phone}</p>
            <hr>
            <h6>Doctor Information</h6>
            <p>Name: ${apt.doctor.name}<br>
            Specialty: ${apt.doctor.specialty}</p>
            <hr>
            <p><strong>Reason:</strong> ${apt.reason}</p>
            <p><strong>Status:</strong> 
                <span class="badge ${getStatusBadgeClass(apt.status)}">
                    ${apt.status.toUpperCase()}
                </span>
            </p>
        </div>
    `;
    
    viewModal.show();
}

function showRescheduleModal(id) {
    document.getElementById('rescheduleAppointmentId').value = id;
    rescheduleModal.show();
}

function handleReschedule() {
    const id = document.getElementById('rescheduleAppointmentId').value;
    const newDate = document.getElementById('newDate').value;
    const newTime = document.getElementById('newTime').value;
    
    // Simulate API call to reschedule
    console.log('Rescheduling appointment:', { id, newDate, newTime });
    alert('Appointment rescheduled successfully!');
    
    rescheduleModal.hide();
    loadAppointments(); // Reload the appointments list
}

function approveAppointment(id) {
    if (confirm('Are you sure you want to approve this appointment?')) {
        // Simulate API call to approve
        const apt = appointments.find(a => a.id === id);
        if (apt) {
            apt.status = 'approved';
            renderAppointments();
            alert('Appointment approved successfully!');
        }
    }
}

function cancelAppointment(id) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        // Simulate API call to cancel
        const apt = appointments.find(a => a.id === id);
        if (apt) {
            apt.status = 'cancelled';
            renderAppointments();
            alert('Appointment cancelled successfully!');
        }
    }
}

function applyFilters() {
    const date = document.getElementById('dateFilter').value;
    const status = document.getElementById('statusFilter').value;
    const doctor = document.getElementById('doctorFilter').value;
    
    // Simulate filtered API call
    console.log('Applying filters:', { date, status, doctor });
    // In real implementation, you would fetch filtered data from the server
    loadAppointments();
}

function resetFilters() {
    document.getElementById('dateFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('doctorFilter').value = '';
    loadAppointments();
}

function loadDoctors() {
    // Simulate loading doctors for filter dropdown
    const doctors = [
        { id: 1, name: 'Dr. Smith' },
        { id: 2, name: 'Dr. Johnson' },
        // Add more doctors
    ];
    
    const select = document.getElementById('doctorFilter');
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        select.appendChild(option);
    });
}

function getStatusBadgeClass(status) {
    const classes = {
        pending: 'bg-warning',
        approved: 'bg-success',
        cancelled: 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
}

function formatDateTime(datetime) {
    return new Date(datetime).toLocaleString();
} 