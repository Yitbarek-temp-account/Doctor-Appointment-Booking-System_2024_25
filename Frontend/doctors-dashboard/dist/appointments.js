// Mock data for testing
const mockAppointments = [
    {
        id: 1,
        patientName: "John Doe",
        date: "2024-03-20",
        time: "10:00 AM",
        status: "confirmed",
        reason: "Regular Checkup",
        patientDetails: {
            age: 45,
            contact: "+1 234-567-8900",
            medicalHistory: "Regular checkup, blood pressure normal"
        }
    },
    {
        id: 2,
        patientName: "Jane Smith",
        date: "2024-03-21",
        time: "2:30 PM",
        status: "pending",
        reason: "Follow-up",
        patientDetails: {
            age: 32,
            contact: "+1 234-567-8901",
            medicalHistory: "Follow-up for flu symptoms"
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (!AuthService.checkAuth()) return;

    loadAppointments();
    initializeFilters();
    initializeLogout();

    // Add cancel confirmation handler
    const confirmCancelBtn = document.getElementById('confirmCancel');
    const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));

    let selectedAppointmentId = null;

    // When "Cancel Appointment" button is clicked
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cancel-appointment')) {
            selectedAppointmentId = parseInt(e.target.dataset.appointmentId);
            cancelModal.show();
        }
    });

    // When "Yes, Cancel Appointment" is clicked in the modal
    confirmCancelBtn?.addEventListener('click', async () => {
        if (selectedAppointmentId) {
            await cancelAppointment(selectedAppointmentId);
            cancelModal.hide();
        }
    });
});

async function loadAppointments() {
    try {
        // Store appointments globally for filtering
        window.allAppointments = mockAppointments;
        updateAppointmentsTable(mockAppointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
        showAlert('error', 'Failed to load appointments');
    }
}

function updateAppointmentsTable(appointments) {
    const tbody = document.querySelector('#appointmentsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = appointments.map(appointment => `
        <tr>
            <td>${appointment.patientName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td><span class="badge bg-${getStatusColor(appointment.status)}">${appointment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-info me-2" onclick="showPatientDetailsModal(${JSON.stringify(appointment).replace(/"/g, '&quot;')})">
                    <i class="fas fa-eye"></i> View
                </button>
                ${appointment.status === 'pending' ? `
                    <button class="btn btn-sm btn-success me-2" onclick="confirmAppointment(${appointment.id})">
                        <i class="fas fa-check"></i> Confirm
                    </button>
                ` : ''}
                ${appointment.status !== 'cancelled' ? `
                    <button class="btn btn-sm btn-danger btn-cancel-appointment" data-appointment-id="${appointment.id}">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchInput');
    const clearFilters = document.getElementById('clearFilters');

    statusFilter.addEventListener('change', filterAppointments);
    searchInput.addEventListener('input', filterAppointments);
    clearFilters.addEventListener('click', clearAllFilters);
}

function filterAppointments() {
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    let filtered = window.allAppointments;

    if (status) {
        filtered = filtered.filter(app => app.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
        filtered = filtered.filter(app =>
            app.patientName.toLowerCase().includes(search) ||
            app.date.includes(search)
        );
    }

    updateAppointmentsTable(filtered);
}

function clearAllFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('searchInput').value = '';
    updateAppointmentsTable(window.allAppointments);
}

function getStatusColor(status) {
    // Return both background and text color
    switch (status.toLowerCase()) {
        case 'confirmed':
            return {
                bg: 'bg-teal-light',
                text: 'text-teal-dark'
            };
        case 'pending':
            return {
                bg: 'bg-warning-light',
                text: 'text-warning-dark'
            };
        case 'cancelled':
            return {
                bg: 'bg-danger-light',
                text: 'text-danger'
            };
        default:
            return {
                bg: 'bg-secondary-light',
                text: 'text-secondary'
            };
    }
}

function setupCancelModal(appointmentId, patientName) {
    const modalBody = document.querySelector('#cancelModal .modal-body p');
    modalBody.textContent = `Are you sure you want to cancel the appointment with ${patientName}?`;

    const confirmButton = document.getElementById('confirmCancel');
    confirmButton.onclick = () => processCancelAppointment(appointmentId);
}

async function processCancelAppointment(appointmentId) {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        // Update mock data
        const appointmentIndex = mockAppointments.findIndex(app => app.id === appointmentId);
        if (appointmentIndex !== -1) {
            mockAppointments[appointmentIndex].status = 'cancelled';
        }

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
        modal.hide();

        // Refresh the table
        loadAppointments();
    } catch (error) {
        console.error('Error canceling appointment:', error);
    }
}

function getActionButtons(appointment) {
    const buttons = [];

    // Start with a container div
    buttons.push('<div class="action-buttons">');

    // View details button (available for all statuses)
    buttons.push(`
        <button class="btn btn-sm btn-outline-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#viewDetailsModal" 
            onclick="showPatientDetails(${JSON.stringify(appointment).replace(/"/g, '&quot;')})">
            <i class="fas fa-eye"></i>
        </button>
    `);

    switch (appointment.status.toLowerCase()) {
        case 'pending':
            buttons.push(`
                <button class="btn btn-sm btn-outline-success" 
                    onclick="confirmAppointment(${appointment.id}, '${appointment.patientName}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" 
                    data-bs-toggle="modal" 
                    data-bs-target="#cancelModal" 
                    onclick="setupCancelModal(${appointment.id}, '${appointment.patientName}')">
                    <i class="fas fa-times"></i>
                </button>
            `);
            break;

        case 'confirmed':
            buttons.push(`
                <button class="btn btn-sm btn-outline-danger" 
                    data-bs-toggle="modal" 
                    data-bs-target="#cancelModal" 
                    onclick="setupCancelModal(${appointment.id}, '${appointment.patientName}')">
                    <i class="fas fa-times"></i>
                </button>
            `);
            break;

        case 'cancelled':
            buttons.push(`<span class="no-actions">No actions available</span>`);
            break;
    }

    buttons.push('</div>'); // Close container div
    return buttons.join('');
}

// Add this function to handle confirming appointments
async function confirmAppointment(appointmentId) {
    try {
        // For now, using mock data
        const appointment = mockAppointments.find(app => app.id === appointmentId);
        if (appointment) {
            appointment.status = 'confirmed';
            // Refresh the appointments table
            updateAppointmentsTable(mockAppointments);
            showAlert('success', 'Appointment confirmed successfully');
        }

        // When connected to backend, it will look like this:
        /*
        const response = await fetch(`http://your-api/appointments/${appointmentId}/confirm`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to confirm appointment');
        
        // Refresh appointments list
        loadAppointments();
        */
    } catch (error) {
        console.error('Error confirming appointment:', error);
        showAlert('error', 'Failed to confirm appointment');
    }
}

// Add function to show patient details
async function showPatientDetails(appointmentId) {
    try {
        const response = await fetch(`http://localhost:3000/api/doctors/appointments/${appointmentId}/details`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch patient details');
        }

        const details = await response.json();

        // Update modal with patient details
        document.getElementById('patientName').textContent = details.patientName;
        document.getElementById('patientAge').textContent = details.age;
        document.getElementById('patientContact').textContent = details.contact;
        document.getElementById('lastVisit').textContent = details.lastVisit;
        document.getElementById('medicalNotes').textContent = details.medicalNotes;
    } catch (error) {
        console.error('Error fetching patient details:', error);
        alert('Failed to load patient details. Please try again.');
    }
}

function initializeLogout() {
    const logoutButtons = document.querySelectorAll('.btn-logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
        });
    });
}

function displayAppointmentDetails(appointment) {
    const detailsContainer = document.querySelector('#appointmentDetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <h5>Patient Details</h5>
            <div class="patient-info">
                <p><strong>Name:</strong> ${appointment.patientName}</p>
                <p><strong>Age:</strong> ${appointment.patientDetails?.age || 'N/A'}</p>
                <p><strong>Contact:</strong> ${appointment.patientDetails?.contact || 'N/A'}</p>
                <p><strong>Medical History:</strong> ${appointment.patientDetails?.medicalHistory || 'None'}</p>
            </div>
            <h5 class="mt-3">Appointment Info</h5>
            <div class="appointment-info">
                <p><strong>Date:</strong> ${appointment.date}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
                <p><strong>Reason:</strong> ${appointment.reason}</p>
                <p><strong>Status:</strong> <span class="badge bg-${getStatusColor(appointment.status)}">${appointment.status}</span></p>
            </div>
        `;
    }
}

// Add this function to handle appointment cancellation
async function cancelAppointment(appointmentId) {
    try {
        // For now, using mock data
        const appointment = mockAppointments.find(app => app.id === appointmentId);
        if (appointment) {
            appointment.status = 'cancelled';
            // Refresh the appointments table
            updateAppointmentsTable(mockAppointments);
            showAlert('success', 'Appointment cancelled successfully');
        }

        // When connected to backend, it will look like this:
        /*
        const response = await fetch(`http://your-api/appointments/${appointmentId}/cancel`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to cancel appointment');
        
        // Refresh appointments list
        loadAppointments();
        */
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        showAlert('error', 'Failed to cancel appointment');
    }
}

// Helper function to show alerts
function showAlert(type, message) {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';

    alertContainer.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Helper function to create alert container if it doesn't exist
function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container position-fixed top-0 start-50 translate-middle-x mt-3';
    document.body.appendChild(container);
    return container;
}

function showPatientDetailsModal(appointment) {
    // Update modal content
    document.getElementById('modalPatientName').textContent = appointment.patientName;
    document.getElementById('modalPatientAge').textContent = appointment.patientDetails.age;
    document.getElementById('modalPatientContact').textContent = appointment.patientDetails.contact;
    document.getElementById('modalAppointmentDate').textContent = appointment.date;
    document.getElementById('modalAppointmentTime').textContent = appointment.time;
    document.getElementById('modalAppointmentStatus').textContent = appointment.status;
    document.getElementById('modalAppointmentReason').textContent = appointment.reason;
    document.getElementById('modalMedicalHistory').textContent = appointment.patientDetails.medicalHistory;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('patientDetailsModal'));
    modal.show();
} 