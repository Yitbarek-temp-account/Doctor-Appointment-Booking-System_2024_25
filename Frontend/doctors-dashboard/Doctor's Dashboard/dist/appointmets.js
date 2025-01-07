class AppointmentsManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.appointments = [];
        this.filteredAppointments = [];
        this.currentFilters = {
            status: '',
            dateRange: '',
            search: ''
        };
        this.initializeElements();
        this.setupEventListeners();
        this.setupDatePicker();
        this.loadAppointments();
        this.setupSidebar();
    }

    initializeElements() {
        // Table elements
        this.tableBody = document.getElementById('appointmentsTableBody');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.emptyState = document.getElementById('emptyState');
        this.pagination = document.getElementById('appointmentsPagination');

        // Filter elements
        this.statusFilter = document.getElementById('statusFilter');
        this.dateRangeFilter = document.getElementById('dateRange');
        this.searchInput = document.getElementById('searchInput');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        this.refreshBtn = document.getElementById('refreshAppointments');

        // Modals
        this.viewDetailsModal = new bootstrap.Modal(document.getElementById('viewDetailsModal'));
        this.cancelModal = new bootstrap.Modal(document.getElementById('cancelAppointmentModal'));
        this.currentAppointmentId = null;
    }

    setupEventListeners() {
        // Filter events
        this.statusFilter.addEventListener('change', () => this.applyFilters());
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        this.refreshBtn.addEventListener('click', () => this.refreshAppointments());

        // Modal events
        document.getElementById('confirmCancel').addEventListener('click', () => this.cancelAppointment());

        // Medical Notes Edit
        document.getElementById('editMedicalNotes')?.addEventListener('click', () => {
            const notesDisplay = document.getElementById('modalMedicalNotes');
            const editContainer = document.querySelector('.edit-notes-container');
            const textarea = document.getElementById('editMedicalNotesInput');

            notesDisplay.parentElement.classList.add('d-none');
            editContainer.classList.remove('d-none');
            textarea.value = notesDisplay.textContent || '';
            textarea.focus();
        });

        document.getElementById('saveMedicalNotes')?.addEventListener('click', async () => {
            const textarea = document.getElementById('editMedicalNotesInput');
            const newNotes = textarea.value.trim();

            if (this.currentAppointmentId) {
                try {
                    // Find the appointment in both arrays
                    const appointmentIndex = this.appointments.findIndex(
                        a => a.id === parseInt(this.currentAppointmentId)
                    );

                    if (appointmentIndex !== -1) {
                        // Update in main appointments array
                        this.appointments[appointmentIndex].medicalNotes = newNotes;

                        // Update in filtered appointments array
                        const filteredIndex = this.filteredAppointments.findIndex(
                            a => a.id === parseInt(this.currentAppointmentId)
                        );
                        if (filteredIndex !== -1) {
                            this.filteredAppointments[filteredIndex].medicalNotes = newNotes;
                        }

                        // Update the modal display
                        document.getElementById('modalMedicalNotes').textContent = newNotes;

                        // Hide the editor
                        this.hideNotesEditor();

                        // Optional: Show success message
                        console.log('Medical notes updated successfully');
                    }
                } catch (error) {
                    console.error('Error saving medical notes:', error);
                    // Optional: Show error message to user
                }
            }
        });

        document.getElementById('cancelEditNotes')?.addEventListener('click', () => {
            this.hideNotesEditor();
        });

        this.tableBody.querySelectorAll('.complete').forEach(button => {
            button.addEventListener('click', (e) => this.completeAppointment(e.currentTarget.dataset.id));
        });

        // Staff Edit
        document.getElementById('editStaff')?.addEventListener('click', () => {
            const staffDisplay = document.getElementById('modalAssignedStaff');
            const editContainer = document.querySelector('.edit-staff-container');
            const select = document.getElementById('staffSelect');

            staffDisplay.parentElement.classList.add('d-none');
            editContainer.classList.remove('d-none');
            select.value = staffDisplay.textContent || '';
        });

        document.getElementById('saveStaff')?.addEventListener('click', async () => {
            const select = document.getElementById('staffSelect');
            const newStaff = select.value;

            if (this.currentAppointmentId) {
                try {
                    const appointmentIndex = this.appointments.findIndex(
                        a => a.id === parseInt(this.currentAppointmentId)
                    );

                    if (appointmentIndex !== -1) {
                        this.appointments[appointmentIndex].assignedStaff = newStaff;
                        document.getElementById('modalAssignedStaff').textContent = newStaff;
                    }
                    this.hideStaffEditor();
                } catch (error) {
                    console.error('Error saving staff assignment:', error);
                }
            }
        });

        document.getElementById('cancelEditStaff')?.addEventListener('click', () => {
            this.hideStaffEditor();
        });
    }

    setupDatePicker() {
        flatpickr(this.dateRangeFilter, {
            mode: 'range',
            dateFormat: 'Y-m-d',
            onChange: (selectedDates) => {
                if (selectedDates.length === 2) {
                    this.applyFilters();
                }
            }
        });
    }

    setupSidebar() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = document.querySelector('.btn-close-sidebar');

        if (toggleBtn && sidebar && overlay && closeBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeSidebar = () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeSidebar);
            overlay.addEventListener('click', closeSidebar);
        }
    }

    async loadAppointments() {
        this.showLoading(true);
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.appointments = this.getMockAppointments();
            this.filteredAppointments = [...this.appointments];
            this.renderAppointments();
        } catch (error) {
            console.error('Error loading appointments:', error);
            // Handle error (show error message to user)
        }
        this.showLoading(false);
    }

    getMockAppointments() {
        return [
            {
                id: 1,
                patientName: "John Doe",
                dateTime: "2024-01-15T14:30:00",
                status: "upcoming",
                age: 35,
                contact: "123-456-7890",
                medicalNotes: "Regular checkup, history of hypertension",
                assignedStaff: "Dr. Smith"
            },
            {
                id: 2,
                patientName: "Jane Smith",
                dateTime: "2024-01-14T10:00:00",
                status: "completed",
                age: 28,
                contact: "098-765-4321",
                medicalNotes: "Follow-up appointment for dental cleaning"
            },
            {
                id: 3,
                patientName: "Mike Johnson",
                dateTime: "2024-01-16T16:15:00",
                status: "upcoming",
                age: 42,
                contact: "555-123-4567",
                medicalNotes: "Emergency consultation requested"
            },
            {
                id: 4,
                patientName: "Sarah Williams",
                dateTime: "2024-01-13T09:00:00",
                status: "cancelled",
                age: 31,
                contact: "777-888-9999",
                medicalNotes: "Annual checkup"
            },
            {
                id: 5,
                patientName: "Robert Brown",
                dateTime: "2024-01-17T11:30:00",
                status: "upcoming",
                age: 55,
                contact: "444-333-2222",
                medicalNotes: "Follow-up on medication"
            }
        ];
    }

    renderAppointments() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const appointmentsToShow = this.filteredAppointments.slice(startIndex, endIndex);

        if (appointmentsToShow.length === 0) {
            this.showEmptyState(true);
            return;
        }

        this.showEmptyState(false);
        this.tableBody.innerHTML = appointmentsToShow.map(appointment => this.createAppointmentRow(appointment)).join('');
        this.renderPagination();
        this.setupRowEventListeners();
    }

    createAppointmentRow(appointment) {
        return `
            <tr>
                <td data-label="Patient Name">${appointment.patientName}</td>
                <td data-label="Date & Time">${this.formatDateTime(appointment.dateTime)}</td>
                <td data-label="Status">
                    <span class="status-badge status-${appointment.status}">
                        ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                </td>
                <td data-label="Actions">
                    <button class="btn btn-action view-details" data-id="${appointment.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${appointment.status === 'upcoming' ? `
                        <button class="btn btn-action complete" data-id="${appointment.id}" title="Mark as Completed">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-action cancel" data-id="${appointment.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    }

    setupRowEventListeners() {
        this.tableBody.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => this.showAppointmentDetails(e.currentTarget.dataset.id));
        });

        this.tableBody.querySelectorAll('.cancel').forEach(button => {
            button.addEventListener('click', (e) => this.showCancelConfirmation(e.currentTarget.dataset.id));
        });
    }

    showAppointmentDetails(appointmentId) {
        // Store the current appointment ID when showing details
        this.currentAppointmentId = appointmentId;
        const appointment = this.appointments.find(a => a.id === parseInt(appointmentId));
        if (!appointment) return;

        // Store the current appointment for reference
        this.currentAppointment = appointment;

        document.getElementById('modalPatientName').textContent = appointment.patientName;
        document.getElementById('modalPatientAge').textContent = appointment.age;
        document.getElementById('modalPatientContact').textContent = appointment.contact;
        document.getElementById('modalMedicalNotes').textContent = appointment.medicalNotes;
        document.getElementById('modalAssignedStaff').textContent = appointment.assignedStaff || 'Not assigned';

        this.viewDetailsModal.show();
    }

    showCancelConfirmation(appointmentId) {
        this.currentAppointmentId = appointmentId;
        this.cancelModal.show();
    }

    async cancelAppointment() {
        if (!this.currentAppointmentId) return;

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const appointmentIndex = this.appointments.findIndex(
                a => a.id === parseInt(this.currentAppointmentId)
            );

            if (appointmentIndex !== -1) {
                this.appointments[appointmentIndex].status = 'cancelled';
                this.applyFilters();
                this.cancelModal.hide();
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            // Handle error (show error message to user)
        }
    }

    applyFilters() {
        const status = this.statusFilter.value.toLowerCase();
        const dateRange = this.dateRangeFilter.value;
        const search = this.searchInput.value.toLowerCase();

        this.filteredAppointments = this.appointments.filter(appointment => {
            // Status filter
            const matchesStatus = !status || appointment.status === status;

            // Search filter
            const matchesSearch = !search ||
                appointment.patientName.toLowerCase().includes(search) ||
                appointment.medicalNotes.toLowerCase().includes(search);

            // Date range filter
            let matchesDate = true;
            if (dateRange) {
                const [startStr, endStr] = dateRange.split(' to ');
                if (startStr && endStr) {
                    const start = new Date(startStr);
                    const end = new Date(endStr);
                    end.setHours(23, 59, 59); // Include entire end day
                    const appointmentDate = new Date(appointment.dateTime);
                    matchesDate = appointmentDate >= start && appointmentDate <= end;
                }
            }

            return matchesStatus && matchesSearch && matchesDate;
        });

        this.currentPage = 1; // Reset to first page when filtering
        this.renderAppointments();
    }

    checkDateRange(appointmentDate, dateRange) {
        if (!dateRange) return true;

        const [startStr, endStr] = dateRange.split(' to ');
        if (!startStr || !endStr) return true;

        const start = new Date(startStr);
        const end = new Date(endStr);
        const date = new Date(appointmentDate);

        return date >= start && date <= end;
    }

    clearFilters() {
        this.statusFilter.value = '';
        this.dateRangeFilter.value = '';
        this.searchInput.value = '';
        this.applyFilters();
    }

    async refreshAppointments() {
        const icon = this.refreshBtn.querySelector('i');
        icon.classList.add('refreshing');
        this.showLoading(true);
        try {
            await this.loadAppointments();
        } finally {
            icon.classList.remove('refreshing');
            this.showLoading(false);
        }
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
        let paginationHTML = '';

        if (totalPages > 1) {
            paginationHTML += `
                <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
                </li>
            `;

            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `
                    <li class="page-item ${this.currentPage === i ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `;
            }

            paginationHTML += `
                <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
                </li>
            `;
        }

        this.pagination.innerHTML = paginationHTML;
        this.setupPaginationEventListeners();
    }

    setupPaginationEventListeners() {
        this.pagination.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage && newPage !== this.currentPage) {
                    this.currentPage = newPage;
                    this.renderAppointments();
                }
            });
        });
    }

    showLoading(show) {
        this.loadingSpinner.classList.toggle('d-none', !show);
        this.tableBody.classList.toggle('d-none', show);
    }

    showEmptyState(show) {
        this.emptyState.classList.toggle('d-none', !show);
        this.tableBody.classList.toggle('d-none', show);
    }

    formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    hideNotesEditor() {
        const notesDisplay = document.getElementById('modalMedicalNotes');
        const editContainer = document.querySelector('.edit-notes-container');

        notesDisplay.parentElement.classList.remove('d-none');
        editContainer.classList.add('d-none');
    }

    async completeAppointment(appointmentId) {
        try {
            // In real app, make API call here
            const appointmentIndex = this.appointments.findIndex(
                a => a.id === parseInt(appointmentId)
            );

            if (appointmentIndex !== -1) {
                this.appointments[appointmentIndex].status = 'completed';
                // Update filtered appointments as well
                const filteredIndex = this.filteredAppointments.findIndex(
                    a => a.id === parseInt(appointmentId)
                );
                if (filteredIndex !== -1) {
                    this.filteredAppointments[filteredIndex].status = 'completed';
                }
                this.renderAppointments();
            }
        } catch (error) {
            console.error('Error completing appointment:', error);
        }
    }

    hideStaffEditor() {
        const staffDisplay = document.getElementById('modalAssignedStaff');
        const editContainer = document.querySelector('.edit-staff-container');

        staffDisplay.parentElement.classList.remove('d-none');
        editContainer.classList.add('d-none');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentsManager();
});