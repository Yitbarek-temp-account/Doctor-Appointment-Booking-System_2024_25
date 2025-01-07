import { DoctorProfile, ApiResponse, EditableFields, ImageUploadResponse } from './types';

// Add Bootstrap type declaration
declare var bootstrap: any;

class DoctorDashboard {
    private currentField: string = '';
    private modal: any;
    // Add ! to tell TypeScript this will be definitely assigned
    private editInput!: HTMLInputElement;
    private profile: DoctorProfile | null = null;

    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadDoctorProfile();
    }

    private initializeElements(): void {
        this.modal = new bootstrap.Modal(document.getElementById('editModal'));
        const inputElement = document.getElementById('editInput');
        if (inputElement instanceof HTMLInputElement) {
            this.editInput = inputElement;
        } else {
            throw new Error('Edit input element not found');
        }
    }

    private setupEventListeners(): void {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => this.handleEditClick(e));
        });

        document.getElementById('saveEdit')?.addEventListener('click', () => this.handleSave());

        document.querySelector('.btn-edit-image')?.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => this.handleImageUpload(e);
            input.click();
        });
    }

    private async loadDoctorProfile(): Promise<void> {
        try {
            // Simulated API call
            this.profile = {
                name: "Dr Yitbarek Alemu",
                speciality: "Dentist",
                location: "Mexico",
                contact: "0988054408",
                workHours: "3AM - 11PM",
                about: "Hi I Am Dr Yitbarek Alemu",
                imageUrl: "https://via.placeholder.com/200"
            };
            this.updateProfileDisplay();
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    private handleEditClick(e: Event): void {
        const button = e.currentTarget as HTMLElement;
        this.currentField = button.dataset.field || '';
        const currentValue = document.getElementById(`doctor${this.currentField.charAt(0).toUpperCase() + this.currentField.slice(1)}`)?.textContent;
        this.editInput.value = currentValue || '';
        this.modal.show();
    }

    private async handleSave(): Promise<void> {
        const newValue = this.editInput.value;

        if (!this.validateInput(this.currentField, newValue)) {
            alert('Invalid input. Please check the value and try again.');
            return;
        }

        try {
            // Simulated API call
            if (this.profile) {
                this.profile[this.currentField as keyof DoctorProfile] = newValue;
                this.updateProfileDisplay();
                this.modal.hide();
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }

    private async handleImageUpload(e: Event): Promise<void> {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file) {
            try {
                // Simulated image upload
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (this.profile && e.target?.result) {
                        this.profile.imageUrl = e.target.result as string;
                        this.updateProfileDisplay();
                    }
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }

    private validateInput(field: string, value: string): boolean {
        switch (field) {
            case 'contact':
                return /^\d{10}$/.test(value);
            case 'workHours':
                return /^\d{1,2}(AM|PM)\s-\s\d{1,2}(AM|PM)$/.test(value);
            default:
                return value.length > 0;
        }
    }

    private updateProfileDisplay(): void {
        if (this.profile) {
            Object.entries(this.profile).forEach(([key, value]) => {
                const element = document.getElementById(`doctor${key.charAt(0).toUpperCase() + key.slice(1)}`);
                if (element) {
                    element.textContent = value;
                }
            });

            // Update profile image and name in the right column
            const profileImage = document.getElementById('profileImage') as HTMLImageElement;
            const profileName = document.getElementById('profileName');
            const profileSpeciality = document.getElementById('profileSpeciality');

            if (profileImage) profileImage.src = this.profile.imageUrl;
            if (profileName) profileName.textContent = this.profile.name;
            if (profileSpeciality) profileSpeciality.textContent = this.profile.speciality;
        }
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorDashboard();
});