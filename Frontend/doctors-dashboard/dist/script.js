// Mock data for testing
const mockDoctorProfile = {
    name: "Dr. John Smith",
    speciality: "Cardiologist",
    location: "New York Medical Center",
    contact: "+1 234-567-8900",
    workHours: "Mon-Fri, 9:00 AM - 5:00 PM",
    about: "Experienced cardiologist with over 15 years of practice",
    profileImage: "path/to/default/image.jpg"
};

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    if (!AuthService.checkAuth()) return;

    console.log('Script loaded');
    loadDoctorProfile();
    initializeEditButtons();
    initializeLogout();

    // Add mobile sidebar functionality
    initializeMobileSidebar();
});

async function loadDoctorProfile() {
    try {
        // Will be replaced with real API call:
        /*
        const response = await fetch('http://localhost:3000/api/doctors/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load profile');
        }

        const profile = await response.json();
        */

        // Using mock data for now
        const profile = mockDoctorProfile;
        updateProfileUI(profile);
    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Failed to load profile. Please try again.');
    }
}

function updateProfileUI(profile) {
    // Update all profile fields
    document.getElementById('doctorName').textContent = profile.name;
    document.getElementById('profileName').textContent = profile.name;

    document.getElementById('doctorSpeciality').textContent = profile.speciality;
    document.getElementById('profileSpeciality').textContent = profile.speciality;

    document.getElementById('doctorLocation').textContent = profile.location;
    document.getElementById('doctorContact').textContent = profile.contact;
    document.getElementById('doctorWorkHours').textContent = profile.workHours;
    document.getElementById('doctorAbout').textContent = profile.about;

    // Update profile image if exists
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.src = profile.profileImage || 'https://via.placeholder.com/200x200?text=Profile';
    }
}

function initializeEditButtons() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    console.log('Found edit buttons:', editButtons.length);

    editButtons.forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    // Save button
    const saveButton = document.getElementById('saveEdit');
    if (saveButton) {
        saveButton.addEventListener('click', handleSave);
    } else {
        console.error('Save button not found');
    }

    // Image upload button
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.addEventListener('click', handleImageUpload);
    }
}

function handleEdit(e) {
    console.log('Edit clicked');
    const button = e.currentTarget;
    const field = button.dataset.field;
    console.log('Editing field:', field);

    if (!field) {
        console.error('No field specified');
        return;
    }

    const currentValue = document.getElementById(`doctor${field}`)?.textContent || '';
    const editInput = document.getElementById('editInput');

    if (!editInput) {
        console.error('Edit input not found');
        return;
    }

    editInput.value = currentValue;
    editInput.dataset.field = field;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

async function handleSave() {
    const editInput = document.getElementById('editInput');
    const field = editInput.dataset.field;
    const value = editInput.value;

    if (!field) return;

    try {
        // Update UI first for better UX
        if (field === 'name') {
            document.getElementById('doctorName').textContent = value;
            document.getElementById('profileName').textContent = value;  // Update card name
        } else if (field === 'speciality') {
            document.getElementById('doctorSpeciality').textContent = value;
            document.getElementById('profileSpeciality').textContent = value;  // Update card speciality
        } else {
            document.getElementById(`doctor${field}`).textContent = value;
        }

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal?.hide();

        // Make API call
        const response = await fetch('http://localhost:3000/api/doctors/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [field]: value })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
    } catch (error) {
        console.error('Error in handleSave:', error);
        // Don't show alert for connection errors
        if (!error.message.includes('Failed to fetch')) {
            alert('Failed to update profile. Please try again.');
        }
    }
}

async function handleImageUpload() {
    console.log('Image upload clicked');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                // Update image preview immediately
                const profileImage = document.getElementById('profileImage');
                if (profileImage) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profileImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }

                // Make API call
                const response = await fetch('http://localhost:3000/api/doctors/profile/image', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error in handleImageUpload:', error);
                // Don't show alert for connection errors
                if (!error.message.includes('Failed to fetch')) {
                    alert('Failed to upload image. Please try again.');
                }
            }
        }
    };

    input.click();
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

function initializeMobileSidebar() {
    const sidebarToggle = document.querySelector('.navbar-toggler');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const closeButton = document.querySelector('.btn-close-sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar?.classList.add('show');
            overlay?.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    function closeSidebar() {
        sidebar?.classList.remove('show');
        overlay?.classList.remove('show');
        document.body.style.overflow = '';
    }
}