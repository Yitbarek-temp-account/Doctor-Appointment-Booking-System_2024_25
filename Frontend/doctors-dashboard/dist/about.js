document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    if (!AuthService.checkAuth()) return;

    initializeContactForm();
    initializeLogout();
});

function initializeLogout() {
    const logoutButtons = document.querySelectorAll('.btn-logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
        });
    });
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const licenseInput = document.getElementById('licenseNumber');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const submitButton = form?.querySelector('button[type="submit"]');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'mt-3';
    form?.appendChild(feedbackDiv);

    // Add real-time validation for each field
    nameInput?.addEventListener('input', () => {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!nameRegex.test(nameInput.value.trim())) {
            nameInput.setCustomValidity('Name must contain at least 3 letters (no numbers or special characters)');
            nameInput.reportValidity();
        } else {
            nameInput.setCustomValidity('');
        }
    });

    licenseInput?.addEventListener('input', () => {
        const licenseRegex = /^[A-Z0-9-]{5,}$/;
        if (!licenseRegex.test(licenseInput.value.trim())) {
            licenseInput.setCustomValidity('License number must be at least 5 characters (letters, numbers, and hyphens only)');
            licenseInput.reportValidity();
        } else {
            licenseInput.setCustomValidity('');
        }
    });

    emailInput?.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
            emailInput.reportValidity();
        } else {
            emailInput.setCustomValidity('');
        }
    });

    messageInput?.addEventListener('input', () => {
        const minLength = 20;
        if (messageInput.value.trim().length < minLength) {
            messageInput.setCustomValidity(`Message must be at least ${minLength} characters long`);
            messageInput.reportValidity();
        } else {
            messageInput.setCustomValidity('');
        }
    });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic form validation
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!validateFormData(data)) {
            showFeedback(feedbackDiv, 'error', 'Please fill in all required fields correctly.');
            return;
        }

        // Disable submit button and show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Sending...
            `;
        }

        try {
            // API endpoint for contact form
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }

            // Show success message
            showFeedback(feedbackDiv, 'success', 'Thank you! Your message has been sent successfully.');
            form.reset();

        } catch (error) {
            console.error('Error sending message:', error);

            // Don't show alert for connection errors (since we expect them without a backend)
            if (!error.message.includes('Failed to fetch')) {
                showFeedback(feedbackDiv, 'error', 'Sorry, we couldn\'t send your message. Please try again.');
            }
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        }
    });
}

function validateFormData(data) {
    // Basic validation rules
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const licenseRegex = /^[A-Z0-9-]{5,}$/;

    return (
        nameRegex.test(data.name?.trim()) &&
        emailRegex.test(data.email) &&
        licenseRegex.test(data.licenseNumber?.trim()) &&
        data.message?.trim().length >= 20
    );
}

function showFeedback(container, type, message) {
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';

    container.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <i class="fas fa-${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
} 