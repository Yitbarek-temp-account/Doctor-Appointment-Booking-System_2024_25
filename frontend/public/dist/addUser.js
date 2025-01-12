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
function addUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers({
                'Content-Type': 'application/json',
            });
            if (userToken !== null) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`Failed to add user: ${response.statusText}`);
            }
            console.log('User added successfully!');
        }
        catch (error) {
            console.error('Error adding user:', error);
        }
    });
}
function handleAddUser() {
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phonenumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const userData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phoneNumber: phoneNumberInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
    };
    addUser(userData);
    // Clear the input fields after adding the user
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneNumberInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}
document.addEventListener('DOMContentLoaded', function () {
    const addUserButton = document.querySelector('.submitbutton');
    addUserButton.addEventListener('click', handleAddUser);
});
