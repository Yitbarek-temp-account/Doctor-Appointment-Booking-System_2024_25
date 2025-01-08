import { ApiService } from './api.js';

export class AppointmentService extends ApiService {
    async getAppointments() {
        try {
            const response = await fetch(`${this.baseUrl}/appointments`, {
                headers: this.getHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    }

    async updateAppointmentStatus(id, status) {
        try {
            const response = await fetch(`${this.baseUrl}/appointments/${id}/status`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ status })
            });
            if (!response.ok) {
                throw new Error('Failed to update appointment status');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    }
} 