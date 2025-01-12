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
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers();
            if (userToken) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch('http://localhost:3000/users', {
                headers: headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch Users: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Error fetching Users:', error);
            return [];
        }
    });
}
function fetchUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/Users/${userId}`);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Failed to fetch User data: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Error fetching User data:', error);
            throw error;
        }
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers();
            if (userToken) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch(`http://localhost:3000/Users/${userId}`, {
                method: 'DELETE',
                headers: headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.statusText}`);
            }
            console.log('User deleted successfully!');
        }
        catch (error) {
            console.error('Error deleting User:', error);
            throw error;
        }
    });
}
function updateUser(userId, updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToken = localStorage.getItem('userToken');
            const headers = new Headers({
                'Content-Type': 'application/json',
            });
            if (userToken !== null) {
                headers.append('Authorization', userToken);
            }
            const response = yield fetch(`http://localhost:3000/Users/${userId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                throw new Error(`Failed to update User: ${response.statusText}`);
            }
            console.log('User updated successfully!');
        }
        catch (error) {
            console.error('Error updating User:', error);
            throw error;
        }
    });
}
function populateTable(Users) {
    const tableBody = document.querySelector('.table tbody');
    Users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `

       <td class="eachcol">${user._id}</td
      <td class="eachcol">${user.firstName}</td>
      <th scope="row">${user.lastName}</th>
      <td class="eachcol">${user.email}</td>
      <td class="eachcol">${user.phoneNumber}</td>
      <td class="eachcol">${user.role}</td>
      <td class="eachcol">
        <button class="btn btn-primary btn-sm editButton">
          Edit
        </button>
      </td>
      <td class="eachcol">
        <button class="btn btn-danger btn-sm deleteButton">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
        // Add event listener to the Edit button
        const editButton = row.querySelector('.editButton');
        if (editButton) {
            editButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () { return yield handleEditButtonClick(user); }));
        }
        // Add event listener to the Delete button
        const deleteButton = row.querySelector('.deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () { return yield handleDeleteButtonClick(user._id); }));
        }
    });
}
function handleEditButtonClick(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch User data by ID
            const idInput = document.getElementById('id');
            const firstNameInput = document.getElementById('firstname');
            const lastNameInput = document.getElementById('lastname');
            const emailInput = document.getElementById('email');
            const phoneNumberInput = document.getElementById('phonenumber');
            const roleInput = document.getElementById('role');
            idInput.value = user._id;
            firstNameInput.value = user.firstName;
            lastNameInput.value = user.lastName;
            emailInput.value = user.email;
            phoneNumberInput.value = user.phoneNumber;
            roleInput.value = user.role;
            // Show the modal
            const modal = document.getElementById('updateModal');
            modal.style.display = 'block';
            // Add event listener to close the modal
            const closeModalButton = document.getElementById('closeModal');
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            // Add event listener to handle the form submission
            const updateForm = document.getElementById('updateForm');
            updateForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield handleUpdateUser(user._id, getFormData(updateForm));
                modal.style.display = 'none';
            }));
        }
        catch (error) {
            console.error('Error filling form with User:', error);
        }
    });
}
// Helper function to extract form data
function getFormData(form) {
    return {
        _id: form.querySelector('#id').value,
        firstName: form.querySelector('#firstname').value,
        lastName: form.querySelector('#lastname').value,
        email: form.querySelector('#email').value,
        phoneNumber: form.querySelector('#phonenumber').value,
        role: form.querySelector('#role').value,
    };
}
// Function to handle the update of the User
function handleUpdateUser(userId, updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Implement the logic to update the User on the server
            yield updateUser(userId, updatedUser);
            // Optionally, update the corresponding row in the table
            const rowToUpdate = document.querySelector(`tr[data-user-id="${userId}"]`);
            if (rowToUpdate) {
                // Update the table row with the updated User data
                const cells = rowToUpdate.querySelectorAll('.eachcol');
                cells[0].textContent = updatedUser._id;
                cells[1].textContent = updatedUser.firstName;
                cells[2].textContent = updatedUser.lastName;
                cells[3].textContent = updatedUser.email;
                cells[4].textContent = updatedUser.phoneNumber;
                cells[5].textContent = updatedUser.role;
            }
            console.log('User updated successfully!');
        }
        catch (error) {
            console.error('Error updating User:', error);
            throw error;
        }
    });
}
function handleDeleteButtonClick(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Confirm deletion with the user (you may use window.confirm or a modal)
            const confirmDeletion = window.confirm('Are you sure you want to delete this User?');
            if (confirmDeletion) {
                // Delete the User
                yield deleteUser(userId);
                // Optionally, you can remove the corresponding row from the table
                const rowToDelete = document.querySelector(`tr[data-User-id="${userId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            }
        }
        catch (error) {
            console.error('Error handling Delete button click:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield fetchUsers();
            populateTable(users);
        }
        catch (error) {
            console.error('Error loading User data:', error);
        }
    });
});
