document.addEventListener('DOMContentLoaded', function() {
    // Load admin profile
    loadAdminProfile();
    
    // Load statistics
    updateDashboardStats();
    
    // Load activity logs
    loadActivityLogs();
    
    // Handle profile form submission
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateAdminProfile();
    });
});

function loadAdminProfile() {
    // Simulate loading profile data
    const adminData = {
        name: 'Admin User',
        email: 'admin@example.com'
    };
    
    document.getElementById('adminName').value = adminData.name;
    document.getElementById('adminEmail').value = adminData.email;
}

function updateAdminProfile() {
    const name = document.getElementById('adminName').value;
    const email = document.getElementById('adminEmail').value;
    
    // Simulate API call to update profile
    console.log('Updating profile:', { name, email });
    alert('Profile updated successfully!');
}

function updateDashboardStats() {
    // Simulate loading statistics
    const stats = {
        totalUsers: 150,
        totalAppointments: 1234,
        newUsers: 25,
        upcomingAppointments: 45
    };
    
    document.getElementById('totalUsers').textContent = stats.totalUsers;
    document.getElementById('totalAppointments').textContent = stats.totalAppointments;
    document.getElementById('newUsers').textContent = stats.newUsers;
    document.getElementById('upcomingAppointments').textContent = stats.upcomingAppointments;
}

function loadActivityLogs() {
    // Simulate loading activity logs
    const logs = [
        { time: '2024-03-20 10:30', action: 'New appointment created', user: 'Dr. Smith' },
        { time: '2024-03-20 09:15', action: 'User profile updated', user: 'John Doe' },
        { time: '2024-03-19 16:45', action: 'Appointment cancelled', user: 'Jane Smith' }
    ];
    
    const logContainer = document.getElementById('activityLog');
    logContainer.innerHTML = logs.map(log => `
        <div class="alert alert-info">
            <small class="text-muted">${log.time}</small>
            <p class="mb-0">${log.action} by ${log.user}</p>
        </div>
    `).join('');
} 