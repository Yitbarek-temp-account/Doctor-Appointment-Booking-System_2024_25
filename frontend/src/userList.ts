
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}
async function fetchUsers(): Promise<User[]> {
  try {
    const userToken = localStorage.getItem('userToken');
    const headers = new Headers();

    if (userToken) {
      headers.append('Authorization', userToken);
    }
    const response = await fetch('http://localhost:3000/users', {
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Users: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching Users:', error);
    return [];
  }
}

async function fetchUserById(userId: string): Promise<User> {
  try {
    const response = await fetch(`http://localhost:3000/Users/${userId}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch User data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching User data:', error);
    throw error;
  }
}

async function deleteUser(userId: string): Promise<void> {
  try {
    const userToken = localStorage.getItem('userToken');
    const headers = new Headers();

    if (userToken) {
      headers.append('Authorization', userToken);
    }
    const response = await fetch(`http://localhost:3000/Users/${userId}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    console.log('User deleted successfully!');
  } catch (error) {
    console.error('Error deleting User:', error);
    throw error;
  }
}

async function updateUser(userId: string, updatedUser: User): Promise<void> {
  try {
    const userToken = localStorage.getItem('userToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (userToken !== null) {
      headers.append('Authorization', userToken);
    }
    const response = await fetch(`http://localhost:3000/Users/${userId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error(`Failed to update User: ${response.statusText}`);
    }

    console.log('User updated successfully!');
  } catch (error) {
    console.error('Error updating User:', error);
    throw error;
  }
}

function populateTable(Users: User[]): void {
  const tableBody = document.querySelector(
    '.table tbody',
  ) as HTMLTableSectionElement;

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
    const editButton = row.querySelector('.editButton') as HTMLButtonElement;
    if (editButton) {
      editButton.addEventListener(
        'click',
        async () => await handleEditButtonClick(user),
      );
    }

    // Add event listener to the Delete button
    const deleteButton = row.querySelector(
      '.deleteButton',
    ) as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.addEventListener(
        'click',
        async () => await handleDeleteButtonClick(user._id),
      );
    }
  });
}

async function handleEditButtonClick(user: User): Promise<void> {
  try {
    // Fetch User data by ID
    const idInput = document.getElementById('id') as HTMLInputElement;
    const firstNameInput = document.getElementById(
      'firstname',
    ) as HTMLInputElement;
    const lastNameInput = document.getElementById(
      'lastname',
    ) as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneNumberInput = document.getElementById(
      'phonenumber',
    ) as HTMLInputElement;
    const roleInput = document.getElementById('role') as HTMLInputElement;
    idInput.value = user._id;
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    emailInput.value = user.email;
    phoneNumberInput.value = user.phoneNumber;
    roleInput.value = user.role;

    // Show the modal
    const modal = document.getElementById('updateModal') as HTMLBodyElement;
    modal.style.display = 'block';

    // Add event listener to close the modal
    const closeModalButton = document.getElementById(
      'closeModal',
    ) as HTMLButtonElement;
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Add event listener to handle the form submission
    const updateForm = document.getElementById('updateForm') as HTMLFormElement;
    updateForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleUpdateUser(user._id, getFormData(updateForm));
      modal.style.display = 'none';
    });
  } catch (error) {
    console.error('Error filling form with User:', error);
  }
}

// Helper function to extract form data
function getFormData(form: HTMLFormElement): User {
  return {
    _id: (form.querySelector('#id') as HTMLInputElement).value,
    firstName: (form.querySelector('#firstname') as HTMLInputElement).value,
    lastName: (form.querySelector('#lastname') as HTMLInputElement).value,
    email: (form.querySelector('#email') as HTMLInputElement).value,
    phoneNumber: (form.querySelector('#phonenumber') as HTMLInputElement).value,
    role: (form.querySelector('#role') as HTMLInputElement).value,
  };
}

// Function to handle the update of the User
async function handleUpdateUser(
  userId: string,
  updatedUser: User,
): Promise<void> {
  try {
    // Implement the logic to update the User on the server
    await updateUser(userId, updatedUser);
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
  } catch (error) {
    console.error('Error updating User:', error);
    throw error;
  }
}

async function handleDeleteButtonClick(userId: string): Promise<void> {
  try {
    // Confirm deletion with the user (you may use window.confirm or a modal)
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this User?',
    );

    if (confirmDeletion) {
      // Delete the User
      await deleteUser(userId);

      // Optionally, you can remove the corresponding row from the table
      const rowToDelete = document.querySelector(
        `tr[data-User-id="${userId}"]`,
      );
      if (rowToDelete) {
        rowToDelete.remove();
      }
    }
  } catch (error) {
    console.error('Error handling Delete button click:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const users = await fetchUsers();
    populateTable(users);
  } catch (error) {
    console.error('Error loading User data:', error);
  }
});
