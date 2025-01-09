let users = [];
const userModal = new bootstrap.Modal(document.getElementById('userModal'));

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Setup event listeners
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    document.getElementById('userRole').addEventListener('change', toggleDoctorFields);
    
    // Setup search input
    document.getElementById('searchInput').addEventListener('input', debounce(function(e) {
        filterUsers(e.target.value);
    }, 300));
});

function loadUsers() {
    // Simulate API call to get users
    users = [
        {
            id: 1,
            name: 'Dr. John Smith',
            email: 'john.smith@example.com',
            role: 'doctor',
            specialty: 'Cardiology',
            licenseNumber: 'MD12345',
            status: 'active',
            createdDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            role: 'patient',
            status: 'active',
            createdDate: '2024-02-20'
        },
        // Add more sample users
    ];
    
    renderUsers();
}

function renderUsers() {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <span class="badge ${user.role === 'doctor' ? 'bg-primary' : 'bg-info'}">
                    ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
            </td>
            <td>
                <span class="badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}">
                    ${user.status.toUpperCase()}
                </span>
            </td>
            <td>${new Date(user.createdDate).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewUser(${user.id})">
                    View
                </button>
                <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">
                    Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function showAddUserModal() {
    document.getElementById('modalTitle').textContent = 'Add New User';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    userModal.show();
}

function handleUserSubmit(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };

    if (userData.role === 'doctor') {
        userData.specialty = document.getElementById('specialty').value;
        userData.licenseNumber = document.getElementById('licenseNumber').value;
    }

    if (userId) {
        // Update existing user
        const index = users.findIndex(u => u.id === parseInt(userId));
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
        }
    } else {
        // Add new user
        userData.id = users.length + 1;
        userData.createdDate = new Date().toISOString().split('T')[0];
        users.push(userData);
    }

    renderUsers();
    userModal.hide();
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    document.getElementById('modalTitle').textContent = 'Edit User';
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    document.getElementById('userStatus').value = user.status;

    if (user.role === 'doctor') {
        document.getElementById('specialty').value = user.specialty || '';
        document.getElementById('licenseNumber').value = user.licenseNumber || '';
        toggleDoctorFields();
    }

    userModal.show();
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }
}

function toggleDoctorFields() {
    const doctorFields = document.getElementById('doctorFields');
    const role = document.getElementById('userRole').value;
    doctorFields.style.display = role === 'doctor' ? 'block' : 'none';
}

function applyFilters() {
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();

    const filteredUsers = users.filter(user => {
        const roleMatch = !roleFilter || user.role === roleFilter;
        const statusMatch = !statusFilter || user.status === statusFilter;
        const searchMatch = !searchText || 
            user.name.toLowerCase().includes(searchText) || 
            user.email.toLowerCase().includes(searchText);
        
        return roleMatch && statusMatch && searchMatch;
    });

    renderFilteredUsers(filteredUsers);
}

function renderFilteredUsers(filteredUsers) {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = filteredUsers.map(user => `
        // Same as renderUsers() table row template
    `).join('');
}

// Utility function for debouncing search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 