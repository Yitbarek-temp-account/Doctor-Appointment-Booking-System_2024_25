
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

async function addUser(userData: UserData): Promise<void> {
  try {
    const userToken = localStorage.getItem('userToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (userToken !== null) {
      headers.append('Authorization', userToken);
    }
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add user: ${response.statusText}`);
    }

    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

function handleAddUser(): void {
  const firstNameInput = document.getElementById(
    'firstname',
  ) as HTMLInputElement;
  const lastNameInput = document.getElementById('lastname') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const phoneNumberInput = document.getElementById(
    'phonenumber',
  ) as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    'confirmpassword',
  ) as HTMLInputElement;

  const userData: UserData = {
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
  const addUserButton = document.querySelector(
    '.submitbutton',
  ) as HTMLButtonElement;
  addUserButton.addEventListener('click', handleAddUser);
});
