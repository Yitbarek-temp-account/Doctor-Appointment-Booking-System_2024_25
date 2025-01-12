"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loginUser(signInUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInUser),
            });
            if (response.ok) {
                const data = yield response.json();
                // Store user token and role in local storage
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userRole', data.role);
                console.log('User logged in successfully!');
                if (data.role === 'admin') {
                    window.location.href = 'projectlist.html';
                }
                else {
                    window.location.href = 'index.html';
                }
            }
            else {
                console.error('Failed to login user:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error logging in user:', error);
        }
    });
}
function handleLogin(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log("butten clicked")
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const signInUser = {
            email: emailInput.value,
            password: passwordInput.value,
        };
        yield loginUser(signInUser);
        emailInput.value = '';
        passwordInput.value = '';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    console.log("loaded")
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', handleLogin);
});
