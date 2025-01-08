import { ApiService } from './api.js';

export class ContactService extends ApiService {
    async submitSupportTicket(data) {
        try {
            const response = await fetch(`${this.baseUrl}/support/ticket`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to submit support ticket');
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            throw error;
        }
    }
} 