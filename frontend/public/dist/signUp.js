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
// Function to handle user signup
function signUpUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                console.log('User signed up successfully!');
                if (response.ok) {
                    const data = yield response.json();
                    // Store user token and role in local storage
                    console.log(data.role);
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
            }
            else {
                console.error('Failed to sign up user:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error signing up user:', error);
        }
    });
}
// Function to get input values and call signUpUser
function handleSignUp(event) {
    // Get input values from the form
    event.preventDefault();
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const phoneNumberInput = document.getElementById('phonenumber');
    // Create a user object with the input values
    const user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phoneNumber: phoneNumberInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
    };
    // Call signUpUser with the user object
    signUpUser(user);
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    phoneNumberInput.value = '';
    confirmPasswordInput.value = '';
}
// Attach the handleSignUp function to the button click event
document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signupButton');
    signupButton.addEventListener('click', handleSignUp);
});
