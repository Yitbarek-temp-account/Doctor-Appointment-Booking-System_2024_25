interface SigninUserData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  role: string;
}

async function loginUser(signInUser: SigninUserData): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInUser),
    });

    if (response.ok) {
      console.log("user found")
      const data: AuthResponse = await response.json();

      // Store user token and role in local storage
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRole', data.role);
console.log(data.token)
      console.log('User logged in successfully!');
      if (data.role === 'admin') {
        window.location.href = 'projectlist.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      console.error('Failed to login user:', response.statusText);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}



async function handleLogin(event: Event): Promise<void> {
  event.preventDefault();
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  const signInUser: SigninUserData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  await loginUser(signInUser);
  emailInput.value = '';
  passwordInput.value = '';
}

document.addEventListener('DOMContentLoaded', function () {

  console.log("here --------")
  const loginButton = document.getElementById(
    'loginButton',
  ) as HTMLButtonElement;
  loginButton.addEventListener('click', handleLogin);

});
