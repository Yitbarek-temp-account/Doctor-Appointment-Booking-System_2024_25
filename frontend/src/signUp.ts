
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
interface AuthResponse {
  token: string;
  role: string;
}
// Function to handle user signup
async function signUpUser(user: UserData): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log('User signed up successfully!');
      if (response.ok) {
        const data: AuthResponse = await response.json();

        // Store user token and role in local storage
        console.log(data.role);
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userRole', data.role);

        console.log('User logged in successfully!');
        if (data.role === 'admin') {
          window.location.href = 'projectlist.html';
        } else {
          window.location.href = 'index.html';
        }
      }
    } else {
      console.error('Failed to sign up user:', response.statusText);
    }
  } catch (error) {
    console.error('Error signing up user:', error);
  }
}

// Function to get input values and call signUpUser
function handleSignUp(event: Event): void {
  // Get input values from the form
  event.preventDefault();
  const firstNameInput = document.getElementById(
    'firstname',
  ) as HTMLInputElement;
  const lastNameInput = document.getElementById('lastname') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    'confirmpassword',
  ) as HTMLInputElement;
  const phoneNumberInput = document.getElementById(
    'phonenumber',
  ) as HTMLInputElement;

  // Create a user object with the input values
  const user: UserData = {
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
  const signupButton = document.getElementById(
    'signupButton',
  ) as HTMLButtonElement;
  signupButton.addEventListener('click', handleSignUp);
});
