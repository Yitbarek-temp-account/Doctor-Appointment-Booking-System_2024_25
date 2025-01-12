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
function contactUs(contactData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });
            if (!response.ok) {
                throw new Error(`Failed to add Contact: ${response.statusText}`);
            }
            console.log('Contact added successfully!');
        }
        catch (error) {
            console.error('Error adding Contact:', error);
        }
    });
}
function handleContact(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('feedback');
    const contactData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };
    contactUs(contactData);
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}
document.addEventListener('DOMContentLoaded', function () {
    const addContactButton = document.getElementById('submit');
    addContactButton.addEventListener('click', handleContact);
});
