class AuthService {
    static checkAuth() {
        const token = localStorage.getItem('jwt_token');
        const userRole = localStorage.getItem('userRole');

        if (!token || userRole !== 'doctor') {
            window.location.href = '../../login.html';
            return false;
        }
        return true;
    }

    static logout() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userRole');
        window.location.href = '../../login.html';
    }
}