import { ApiService } from './api.js';

export class DoctorService extends ApiService {
    async getDoctorProfile() {
        console.log('Fetching doctor profile');
        try {
            const response = await fetch(`${this.baseUrl}/doctors/profile`, {
                headers: this.getHeaders()
            });
            console.log('API Response:', response);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    async updateDoctorProfile(data) {
        try {
            const response = await fetch(`${this.baseUrl}/doctors/profile`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }
} 