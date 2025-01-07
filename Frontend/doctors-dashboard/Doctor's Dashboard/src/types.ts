// Doctor Profile Interface
interface DoctorProfile {
    name: string;
    speciality: string;
    location: string;
    contact: string;
    workHours: string;
    about: string;
    imageUrl: string;
}

// API Response Interface
interface ApiResponse {
    success: boolean;
    data?: DoctorProfile;
    error?: string;
}

// Additional interfaces for better type safety
interface EditableFields {
    field: keyof DoctorProfile;
    value: string;
}

interface ImageUploadResponse {
    success: boolean;
    imageUrl?: string;
    error?: string;
}

// Export the interfaces using 'export type'
export type {
    DoctorProfile,
    ApiResponse,
    EditableFields,
    ImageUploadResponse
};