class DoctorDashboard {
    constructor() {
        this.currentField = '';
        this.modal = null;
        this.editInput = null;
        this.profile = null;
        this.initializeElements();
        this.setupEventListeners();
        this.loadDoctorProfile();
        this.setupSidebar();
    }

    initializeElements() {
        this.modal = new bootstrap.Modal(document.getElementById('editModal'));
        this.editInput = document.getElementById('editInput');
        this.profileImage = document.getElementById('profileImage');
    }

    setupEventListeners() {
        // Setup edit buttons
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => this.handleEditClick(e));
        });

        // Setup save button
        document.getElementById('saveEdit').addEventListener('click', () => this.handleSave());

        // Setup image upload
        document.getElementById('uploadButton').addEventListener('click', () => {
            this.createFileInput();
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

    loadDoctorProfile() {
        this.profile = {
            name: "Dr Yitbarek Alemu",
            speciality: "Dentist",
            location: "Mexico",
            contact: "0988054408",
            workHours: "3AM - 11PM",
            about: "Hi I Am Dr Yitbarek Alemu",
            imageUrl: "https://via.placeholder.com/200"
        };
        this.updateProfileDisplay();
        this.loadSavedImage();
    }

    handleEditClick(e) {
        const button = e.currentTarget;
        this.currentField = button.dataset.field || '';
        const currentValue = document.getElementById(`doctor${this.currentField.charAt(0).toUpperCase() + this.currentField.slice(1)}`)?.textContent;
        this.editInput.value = currentValue || '';
        this.modal.show();
    }

    handleSave() {
        const newValue = this.editInput.value;

        if (!this.validateInput(this.currentField, newValue)) {
            alert('Invalid input. Please check the value and try again.');
            return;
        }

        this.profile[this.currentField] = newValue;
        this.updateProfileDisplay();
        this.modal.hide();
    }

    validateInput(field, value) {
        if (!value.trim()) return false;

        switch (field) {
            case 'contact':
                return /^\d{10}$/.test(value.replace(/\D/g, ''));
            case 'workHours':
                return /^[0-9]{1,2}(AM|PM)\s*-\s*[0-9]{1,2}(AM|PM)$/i.test(value);
            default:
                return true;
        }
    }

    updateProfileDisplay() {
        // Update main profile details
        Object.keys(this.profile).forEach(key => {
            const element = document.getElementById(`doctor${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) {
                element.textContent = this.profile[key];
            }
        });

        // Update sidebar profile details
        const profileName = document.getElementById('profileName');
        const profileSpeciality = document.getElementById('profileSpeciality');
        if (profileName) profileName.textContent = this.profile.name;
        if (profileSpeciality) profileSpeciality.textContent = this.profile.speciality;
    }

    createFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageUpload(file);
            }
            document.body.removeChild(input);
        };

        input.click();
    }

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.profileImage.src = e.target.result;
            localStorage.setItem('profileImage', e.target.result);
        };

        reader.onerror = () => {
            alert('Error reading file');
        };

        reader.readAsDataURL(file);
    }

    loadSavedImage() {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage && this.profileImage) {
            this.profileImage.src = savedImage;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorDashboard();
});