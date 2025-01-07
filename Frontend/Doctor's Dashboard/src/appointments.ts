interface Appointment {
    id: number;
    patientName: string;
    dateTime: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    age: number;
    contact: string;
    medicalNotes: string;
}

declare const bootstrap: {
    Modal: new (element: Element | null) => {
        show(): void;
        hide(): void;
    };
};

declare const flatpickr: any;

// Interface defining all the methods
interface IAppointmentsManager {
    initializeElements(): void;
    setupEventListeners(): void;
    setupDatePicker(): void;
    loadAppointments(): Promise<void>;
    setupSidebar(): void;
    showLoading(show: boolean): void;
    showEmptyState(show: boolean): void;
    renderAppointments(): void;
    renderPagination(): void;
    setupPaginationEventListeners(): void;
    showAppointmentDetails(appointmentId: string): void;
    showCancelConfirmation(appointmentId: string): void;
    cancelAppointment(): Promise<void>;
    applyFilters(): void;
    checkDateRange(appointmentDate: string, dateRange: string): boolean;
    clearFilters(): void;
    refreshAppointments(): Promise<void>;
    createAppointmentRow(appointment: Appointment): string;
    setupRowEventListeners(): void;
    formatDateTime(dateTimeStr: string): string;
    getMockAppointments(): Appointment[];
}

// Abstract class with properties
abstract class BaseAppointmentsManager implements IAppointmentsManager {
    protected currentPage: number = 1;
    protected itemsPerPage: number = 10;
    protected appointments: Appointment[] = [];
    protected filteredAppointments: Appointment[] = [];
    protected currentFilters: {
        status: string;
        dateRange: string;
        search: string;
    } = {
            status: '',
            dateRange: '',
            search: ''
        };
    protected currentAppointmentId: string | null = null;
    protected tableBody!: HTMLElement;
    protected loadingSpinner!: HTMLElement;
    protected emptyState!: HTMLElement;
    protected pagination!: HTMLElement;
    protected statusFilter!: HTMLSelectElement;
    protected dateRangeFilter!: HTMLInputElement;
    protected searchInput!: HTMLInputElement;
    protected clearFiltersBtn!: HTMLElement;
    protected refreshBtn!: HTMLElement;
    protected viewDetailsModal: any;
    protected cancelModal: any;

    abstract initializeElements(): void;
    abstract setupEventListeners(): void;
    abstract setupDatePicker(): void;
    abstract loadAppointments(): Promise<void>;
    abstract setupSidebar(): void;
    abstract showLoading(show: boolean): void;
    abstract showEmptyState(show: boolean): void;
    abstract renderAppointments(): void;
    abstract renderPagination(): void;
    abstract setupPaginationEventListeners(): void;
    abstract showAppointmentDetails(appointmentId: string): void;
    abstract showCancelConfirmation(appointmentId: string): void;
    abstract cancelAppointment(): Promise<void>;
    abstract applyFilters(): void;
    abstract checkDateRange(appointmentDate: string, dateRange: string): boolean;
    abstract clearFilters(): void;
    abstract refreshAppointments(): Promise<void>;
    abstract createAppointmentRow(appointment: Appointment): string;
    abstract setupRowEventListeners(): void;
    abstract formatDateTime(dateTimeStr: string): string;
    abstract getMockAppointments(): Appointment[];
}

// The actual implementation will extend this base class in the JavaScript file
declare class AppointmentsManager implements IAppointmentsManager {
    initializeElements(): void;
    setupEventListeners(): void;
    setupDatePicker(): void;
    loadAppointments(): Promise<void>;
    setupSidebar(): void;
    showLoading(show: boolean): void;
    showEmptyState(show: boolean): void;
    renderAppointments(): void;
    renderPagination(): void;
    setupPaginationEventListeners(): void;
    showAppointmentDetails(appointmentId: string): void;
    showCancelConfirmation(appointmentId: string): void;
    cancelAppointment(): Promise<void>;
    applyFilters(): void;
    checkDateRange(appointmentDate: string, dateRange: string): boolean;
    clearFilters(): void;
    refreshAppointments(): Promise<void>;
    createAppointmentRow(appointment: Appointment): string;
    setupRowEventListeners(): void;
    formatDateTime(dateTimeStr: string): string;
    getMockAppointments(): Appointment[];
}