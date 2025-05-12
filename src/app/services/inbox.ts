// frontend/src/services/inbox.ts
import axios from 'axios';
import apiConfig from '../config/apiConfig';

// --- Interfaces ---

export interface InboxMessage {
    _id: string;
    userId: string;
    sender: string;
    subject: string;
    body: string;
    isRead: boolean;
    sentAt: string; // ISO Date string
    readAt?: string | null; // ISO Date string or null
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
}

export interface InboxListResponse {
    messages: InboxMessage[];
    currentPage: number;
    totalPages: number;
    totalMessages: number;
}

export interface UnreadCountResponse {
    unreadCount: number;
}

export interface MarkReadResponse extends InboxMessage { } // Returns the updated message

export interface DeleteResponse {
    success: boolean;
    message: string;
}

interface ApiErrorData {
    message?: string;
    errors?: any[]; // Adjust based on backend error structure
}

// --- Axios Client (Get authenticated instance) ---
// Assuming you have a way to get the configured client, e.g., from AuthContext or a central setup
// Replace this with your actual method of getting the authorized Axios instance
const getApiClient = () => {
    const client = axios.create({
        baseURL: apiConfig.baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        withCredentials: true, // If using cookies
    });

    // Add interceptor to include token from localStorage dynamically
    client.interceptors.request.use(config => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Optional: Add response interceptor for centralized error handling (like 401 logout)
    // client.interceptors.response.use(response => response, error => { ... });

    return client;
};

// --- Service Functions ---

const getMyMessages = async (page = 1, limit = 10): Promise<InboxListResponse> => {
    const apiClient = getApiClient();
    try {
        const response = await apiClient.get<InboxListResponse>('/inbox', {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching inbox messages:", error);
        // Rethrow a more specific error or handle it as needed
        throw error; // Let the calling component handle UI feedback
    }
};

const getUnreadCount = async (): Promise<UnreadCountResponse> => {
    const apiClient = getApiClient();
    try {
        const response = await apiClient.get<UnreadCountResponse>('/inbox/unread-count');
        return response.data;
    } catch (error) {
        console.error("Error fetching unread count:", error);
        throw error;
    }
};

const markAsRead = async (messageId: string): Promise<MarkReadResponse> => {
    if (!messageId) throw new Error("Message ID is required.");
    const apiClient = getApiClient();
    try {
        const response = await apiClient.put<MarkReadResponse>(`/inbox/${messageId}/read`);
        return response.data;
    } catch (error) {
        console.error(`Error marking message ${messageId} as read:`, error);
        throw error;
    }
};

const deleteMessage = async (messageId: string): Promise<DeleteResponse> => {
    if (!messageId) throw new Error("Message ID is required.");
    const apiClient = getApiClient();
    try {
        const response = await apiClient.delete<DeleteResponse>(`/inbox/${messageId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting message ${messageId}:`, error);
        throw error;
    }
};

const inboxService = {
    getMyMessages,
    getUnreadCount,
    markAsRead,
    deleteMessage,
};

export default inboxService;