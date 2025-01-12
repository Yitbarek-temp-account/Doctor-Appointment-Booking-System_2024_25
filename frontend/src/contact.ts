
interface ContactData {
  name: string;
  email: string;
  message: string;
}

async function contactUs(contactData: ContactData): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/contact', {
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
  } catch (error) {
    console.error('Error adding Contact:', error);
  }
}

function handleContact(event:Event): void {
  event.preventDefault();
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const messageInput = document.getElementById(
    'feedback',
  ) as HTMLInputElement;
  

  const contactData: ContactData = {
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
  const addContactButton = document.getElementById(
    'submit',
  ) as HTMLButtonElement;
  addContactButton.addEventListener('click', handleContact);
});
