// frontend/src/services/admin/user.admin.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed

// --- Import Shared Types ---
// Import types from other services or a central types directory
// Ensure these paths are correct for your project structure
import { KycDetails, KycMobile, KycStatus } from '../kyc'; // Assuming types are exported from kyc service
import type { Account } from '@/types/account'; // Adjust path as needed
import type { Payment } from '@/types/payment'; // Adjust path as needed
import type { Transfer } from '@/types/transfer'; // Adjust path as needed (you might need to define this type)

// --- Define Service-Specific Types ---

// Structure for the user list response item (for the admin table)
export interface AdminUserListItem {
    _id: string;
    fullName?: string | null; // Allow null
    email?: string | null;    // Allow null
    createdAt: string;        // ISO Date string (should always exist)
    kyc?: {                   // Optional, but needed for the table
        status?: KycStatus | null;
        dateOfBirth?: string | Date | null;
        mobile?: KycMobile | null;
    } | null;                 // Allow kyc object itself to be null/undefined
}

// Structure for the full user detail response (for the user detail page)
export interface AdminUserDetailResponse {
    _id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;        // ISO Date string
    updatedAt: string;        // ISO Date string
    kyc: KycDetails | null;   // Full KYC details, can be null
    accounts: Account[];      // Array of user's accounts (potentially empty)
    transfers: Transfer[];    // Array of user's transfers (potentially empty)
    payments: Payment[];      // Array of user's add money payments (potentially empty)
    // Add any other top-level user fields returned by the backend if necessary
}

// Type for sending a message
interface SendMessageData {
    subject: string;
    body: string;
}

// Type for the response after sending a message
interface SendMessageResponse {
    message: string;
    data: { // Assuming backend returns the created message object
        _id: string;
        userId: string;
        sender: string;
        subject: string;
        body: string;
        isRead: boolean;
        sentAt: string;
        createdAt: string;
        updatedAt: string;
    };
}


// Expected structure for the API list response (adjust if backend wraps in 'data')
export type AdminUserListResponse = AdminUserListItem[];

// Interface for potential API error responses
interface ApiErrorData {
    message?: string;
    // Add other potential error fields if your backend sends them
}


// --- Axios Client Setup ---
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl, // Use base URL from config
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Send cookies if session is cookie-based
});

// --- Authorization Token Interceptor ---
// Adds the JWT token from localStorage to outgoing requests
apiClient.interceptors.request.use(config => {
    // Ensure this only runs on the client-side where localStorage is available
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    // Log request errors originating from the interceptor setup
    console.error("[Admin User API Interceptor] Request error:", error);
    return Promise.reject(error);
});

// --- Helper to Extract Error Message ---
// Provides a consistent way to get a user-friendly error message
const getErrorMessage = (error: unknown): string => {
     if (axios.isAxiosError(error)) {
        // Type assertion for AxiosError with potential custom data structure
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response) {
            // Log detailed error information for debugging
            console.error("Admin User API Error Response:", {
                status: axiosError.response.status,
                data: axiosError.response.data,
                url: axiosError.config?.url,
                method: axiosError.config?.method,
            });
            // Prioritize backend's message, then Axios message, then generic fallback
            return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
             // Error specific to the request being made but no response received
             console.error("Admin User API No Response Error:", axiosError.request);
            return 'Network error: Could not connect to the server. Please check your connection.';
        } else {
             // Error happened setting up the request
             console.error("Admin User API Request Setup Error:", axiosError.message);
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
         // Handle standard JavaScript errors
         console.error("Non-API Error (Admin User Service):", error);
        return error.message;
    } else {
         // Handle unexpected error types
         console.error("Unknown Error Type (Admin User Service):", error);
        return 'An unknown error occurred.';
    }
};


// --- Admin User Service Functions ---

/**
 * Fetches a list of all users for the admin panel.
 * Includes only the fields necessary for the user list table.
 * Requires admin privileges (token handled by interceptor).
 * @returns {Promise<AdminUserListResponse>} A promise resolving to an array of user list items.
 * @throws {Error} If the request fails or returns invalid data.
 */
const getAllUsersAdmin = async (): Promise<AdminUserListResponse> => {
    // ... (implementation unchanged)
    try {
        console.log('[Admin User Service] Fetching all users...');
        const response = await apiClient.get<AdminUserListResponse | { data: AdminUserListResponse }>(`/admin/users`);
        console.log('[Admin User Service] Raw response:', response);

        let usersData: AdminUserListResponse;
        if (Array.isArray(response.data)) {
            usersData = response.data;
        } else if (response.data && typeof response.data === 'object' && Array.isArray((response.data as any).data)) {
            usersData = (response.data as { data: AdminUserListResponse }).data;
        } else {
            console.warn('[Admin User Service] Unexpected response format for getAllUsersAdmin.', response.data);
            return [];
        }
        console.log('[Admin User Service] Users fetched successfully:', usersData?.length ?? 0);
        return Array.isArray(usersData) ? usersData : [];
    } catch (error: unknown) {
        console.error(`[Admin User Service] Error fetching all users:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

/**
 * Fetches the detailed information for a specific user by ID.
 * Includes core user data, KYC details, accounts, recent transfers, and recent payments.
 * Requires admin privileges (token handled by interceptor).
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<AdminUserDetailResponse>} A promise resolving to the detailed user object.
 * @throws {Error} If the userId is invalid, user is not found, or the request fails.
 */
const getUserDetailsAdmin = async (userId: string): Promise<AdminUserDetailResponse> => {
     // Basic client-side validation for the user ID
     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
         // Throw an error immediately for invalid input
         throw new Error("Invalid User ID provided.");
     }
    try {
        console.log(`[Admin User Service] Fetching details for user ${userId}...`);
        // Make the GET request to the specific user endpoint
        const response = await apiClient.get<AdminUserDetailResponse>(`/admin/users/${userId}`);

        console.log(`[Admin User Service] User details for ${userId} fetched successfully.`);

        // Validate the received data structure (basic checks)
        if (!response.data || typeof response.data !== 'object' || !response.data._id) {
            console.error("[Admin User Service] Received invalid user detail data structure from server:", response.data);
            throw new Error("Invalid data received from server for user details.");
        }

        // Ensure arrays exist, even if empty, for consistency in the UI
        response.data.accounts = Array.isArray(response.data.accounts) ? response.data.accounts : [];
        response.data.transfers = Array.isArray(response.data.transfers) ? response.data.transfers : [];
        response.data.payments = Array.isArray(response.data.payments) ? response.data.payments : [];

        // Return the validated and potentially sanitized data
        return response.data;

    } catch (error: unknown) {
        console.error(`[Admin User Service] Error fetching details for user ${userId}:`, error);
        const message = getErrorMessage(error);

        // Specific handling for 404 (Not Found) errors potentially passed through getErrorMessage
        if (axios.isAxiosError(error) && error.response?.status === 404) {
             // You could throw a specific error type or just the message
             throw new Error("User not found."); // Or re-throw message which might already be "User not found"
        }

        // Throw the processed error message for other errors
        throw new Error(message);
    }
};


/**
 * Sends an inbox message from an admin to a specific user.
 * Requires admin privileges (token handled by interceptor).
 * @param {string} userId - The ID of the recipient user.
 * @param {SendMessageData} messageData - Object containing subject and body.
 * @returns {Promise<SendMessageResponse>} A promise resolving to the success response.
 * @throws {Error} If the request fails.
 */
const sendMessageToUser = async (userId: string, messageData: SendMessageData): Promise<SendMessageResponse> => {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error("Invalid User ID provided.");
    }
    if (!messageData || !messageData.subject?.trim() || !messageData.body?.trim()) {
         throw new Error("Message subject and body are required.");
    }

    try {
        console.log(`[Admin User Service] Sending message to user ${userId}...`);
        // Use the nested route structure
        const response = await apiClient.post<SendMessageResponse>(`/admin/users/${userId}/inbox`, messageData);

        console.log(`[Admin User Service] Message sent successfully to ${userId}.`);
        return response.data;

    } catch (error: unknown) {
        console.error(`[Admin User Service] Error sending message to user ${userId}:`, error);
        const message = getErrorMessage(error);
        // You might want specific handling for validation errors (400) if needed
        // if (axios.isAxiosError(error) && error.response?.status === 400) { ... }
        throw new Error(message);
    }
};


// --- Export Service Object ---
// Encapsulate the functions within an object for organized export and import
const userAdminService = {
    getAllUsersAdmin,
    getUserDetailsAdmin,
    sendMessageToUser, // <-- Add the new function
    // Add other admin-specific user functions here later
};

export default userAdminService;