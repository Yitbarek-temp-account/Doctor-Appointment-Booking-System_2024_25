class AboutManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.animateStats();
        this.setupSidebar();
    }

    initializeElements() {
        this.contactForm = document.getElementById('contactForm');
        this.statElements = document.querySelectorAll('.stat-number');
    }

    setupEventListeners() {
        // Contact form submission
        this.contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));

        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                }
            });
        });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        const formData = {
            doctorName: document.getElementById('contactName').value,
            licenseNumber: document.getElementById('licenseNumber').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            // In real app, make API call here
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Support ticket submitted:', formData);

            // Clear form
            this.contactForm.reset();

            // Show success message
            alert('Support ticket submitted successfully! Our team will contact you shortly.');
        } catch (error) {
            console.error('Error submitting support ticket:', error);
            alert('Failed to submit support ticket. Please try again.');
        }
    }

    animateStats() {
        this.statElements.forEach(element => {
            const targetValue = parseInt(element.dataset.value);
            const duration = 2000; // 2 seconds
            const steps = 50;
            const stepValue = targetValue / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                const currentValue = Math.round(stepValue * currentStep);
                element.textContent = currentValue.toLocaleString();

                if (currentStep >= steps) {
                    element.textContent = targetValue.toLocaleString();
                    clearInterval(interval);
                }
            }, duration / steps);
        });
    }

    setupSidebar() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = document.querySelector('.btn-close-sidebar');

        if (toggleBtn && sidebar && overlay && closeBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeSidebar = () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeSidebar);
            overlay.addEventListener('click', closeSidebar);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutManager();
}); 