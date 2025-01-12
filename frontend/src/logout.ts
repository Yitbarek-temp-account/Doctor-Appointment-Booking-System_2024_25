
function logoutUser(): void {
    // Clear user token and role from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
  
    console.log('User logged out successfully!');
    // Redirect to the login page or any other appropriate page
    window.location.href = 'login.html';
  }

document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have a logout button with the id 'logoutButton'
    const logoutButton = document.getElementById(
      'logout',
    ) as HTMLButtonElement;
    logoutButton.addEventListener('click', logoutUser);
  })