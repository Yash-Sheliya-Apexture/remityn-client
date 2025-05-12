// // frontend/src/services/admin/inbox.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path

// // --- Interfaces ---

// interface UserSnippet {
//     _id: string;
//     fullName?: string | null;
//     email?: string | null;
// }

// export interface AdminInboxMessage {
//     _id: string;
//     userId: UserSnippet; // Nested user info
//     sender: string;       // <-- Ensure this exists
//     subject: string;
//     body: string;
//     isRead: boolean;
//     sentAt: string; // ISO Date string
//     readAt?: string | null; // ISO Date string or null
//     createdAt: string; // ISO Date string
//     updatedAt: string; // ISO Date string
// }

// export interface AdminInboxListResponse {
//     messages: AdminInboxMessage[];
//     currentPage: number;
//     totalPages: number;
//     totalMessages: number;
// }

// export interface AdminUpdatePayload {
//     subject: string;
//     body: string;
// }

// export interface AdminUpdateResponse { // Response when updating
//     message: string;
//     data: AdminInboxMessage; // The updated message object
// }

// export interface AdminDeleteResponse {
//     success: boolean;
//     message: string;
// }

// interface ApiErrorData {
//     message?: string;
//     errors?: any[];
// }

// // --- Axios Client ---
// const apiClient = axios.create({
//     // ... (keep existing setup)
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     withCredentials: true,
// });

// apiClient.interceptors.request.use(config => {
//     // ... (keep existing interceptor)
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error("[Admin Inbox API Interceptor] Request error:", error);
//     return Promise.reject(error);
// });

// // --- Error Helper ---
// const getErrorMessage = (error: unknown): string => {
//     // ... (keep existing helper)
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<ApiErrorData>;
//         if (axiosError.response) {
//             // console.error("Admin Inbox API Error Response:", { /* ... logging */ });
//             return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             //  console.error("Admin Inbox API No Response Error:", axiosError.request);
//             return 'Network error: Could not connect to the server.';
//         } else {
//             //  console.error("Admin Inbox API Request Setup Error:", axiosError.message);
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//         //  console.error("Non-API Error (Admin Inbox Service):", error);
//         return error.message;
//     } else {
//         //  console.error("Unknown Error Type (Admin Inbox Service):", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Service Functions ---

// /**
//  * Fetches all inbox messages across users for the admin panel.
//  */
// const getAllMessagesAdmin = async (
//     // ... (keep existing params)
//     page = 1,
//     limit = 15,
//     sortBy = 'createdAt',
//     sortOrder = 'desc',
//     userId?: string | null,
//     readStatus?: boolean | null
// ): Promise<AdminInboxListResponse> => {
//     // ... (keep existing implementation)
//     try {
//         const params: Record<string, any> = { page, limit, sortBy, sortOrder };
//         if (userId) params.userId = userId;
//         if (readStatus !== null && readStatus !== undefined) params.read = readStatus; // 'read' is the query param name

//         // console.log('[Admin Inbox Service] Fetching all messages with params:', params);
//         const response = await apiClient.get<AdminInboxListResponse>('/admin/inbox', { params });
//         // console.log('[Admin Inbox Service] Messages fetched:', response.data);

//         if (!response.data || !Array.isArray(response.data.messages)) {
//             console.error("[Admin Inbox Service] Received invalid message list data structure:", response.data);
//             throw new Error("Invalid data received from server for message list.");
//         }
//         return response.data;
//     } catch (error: unknown) {
//         console.error(`[Admin Inbox Service] Error fetching all messages:`, error);
//         const message = getErrorMessage(error);
//         throw new Error(message);
//     }
// };

// /**
//  * Admin updates a specific inbox message (subject/body) by its ID.
//  */
// const updateMessageAdmin = async (
//     messageId: string,
//     payload: AdminUpdatePayload
// ): Promise<AdminUpdateResponse> => {
//     if (!messageId) {
//         throw new Error("Message ID is required for update.");
//     }
//     if (!payload || !payload.subject || !payload.body) {
//         throw new Error("Subject and body are required for update.");
//     }

//     try {
//         console.log(`[Admin Inbox Service] Updating message ${messageId}...`);
//         const response = await apiClient.put<AdminUpdateResponse>(`/admin/inbox/${messageId}`, payload);
//         console.log(`[Admin Inbox Service] Message ${messageId} updated successfully.`);
//         return response.data;
//     } catch (error: unknown) {
//         console.error(`[Admin Inbox Service] Error updating message ${messageId}:`, error);
//         const message = getErrorMessage(error);
//         throw new Error(message);
//     }
// };


// /**
//  * Admin deletes a specific inbox message by its ID.
//  */
// const deleteMessageAdmin = async (messageId: string): Promise<AdminDeleteResponse> => {
//     // ... (keep existing implementation)
//     if (!messageId) {
//         throw new Error("Message ID is required.");
//     }
//     try {
//         // console.log(`[Admin Inbox Service] Deleting message ${messageId}...`);
//         const response = await apiClient.delete<AdminDeleteResponse>(`/admin/inbox/${messageId}`);
//         // console.log(`[Admin Inbox Service] Message ${messageId} deleted successfully.`);
//         return response.data;
//     } catch (error: unknown) {
//         console.error(`[Admin Inbox Service] Error deleting message ${messageId}:`, error);
//         const message = getErrorMessage(error);
//         throw new Error(message);
//     }
// };


// // --- Export Service Object ---
// const inboxAdminService = {
//     getAllMessagesAdmin,
//     updateMessageAdmin, // <-- ADD NEW
//     deleteMessageAdmin,
// };

// export default inboxAdminService;

// frontend/src/services/admin/inbox.ts

import axios, { AxiosError } from 'axios';
// Adjust the path to your API configuration file if necessary
import apiConfig from '../../config/apiConfig';

// --- Common Interfaces ---

// Basic user information included in messages
interface UserSnippet {
    _id: string;
    fullName?: string | null; // Optional fields based on population
    email?: string | null;    // Optional fields based on population
}

// Represents a single message instance (as seen in the main admin inbox list)
export interface AdminInboxMessage {
    _id: string;
    userId: UserSnippet; // Nested user info
    sender: string;
    subject: string;
    body: string; // Assuming body is always fetched for admin views
    isRead: boolean;
    sentAt: string; // ISO Date string
    readAt?: string | null; // ISO Date string or null
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    batchId?: string | null; // Optional: The batch ID if it was part of a broadcast
}

// Response structure for listing individual messages (main admin inbox)
export interface AdminInboxListResponse {
    messages: AdminInboxMessage[];
    currentPage: number;
    totalPages: number;
    totalMessages: number;
}

// Payload for updating an individual message
export interface AdminUpdatePayload {
    subject: string;
    body: string;
}

// Response structure when updating an individual message
export interface AdminUpdateResponse {
    message: string;
    data: AdminInboxMessage; // The updated message object
}

// Response structure when deleting an individual message
export interface AdminDeleteResponse {
    success: boolean;
    message: string;
}

// --- Interfaces for Sending Broadcast Messages ---

// Represents the nested 'data' field in the raw backend response for send-to-all
interface SendToAllBackendData {
    count: number;
    totalAttempted: number;
    batchId?: string; // The batch ID generated by the backend
    // message?: string; // Backend might have a nested message here too
}

// Represents the full raw JSON response from the backend when sending to all
interface RawSendToAllApiResponse {
    success: boolean;
    message: string; // Top-level confirmation message from the controller
    data: SendToAllBackendData;
}

// Interface for the structured *result* returned by our sendMessageToAllAdmin service function
export interface SendToAllAdminResult {
    message: string;        // Confirmation message suitable for the UI
    count: number;          // Number successfully created initially
    totalAttempted: number; // Total users targeted
    batchId?: string;       // The batch ID, if returned
}

// --- Interfaces for Managing Broadcast Batches ---

// Represents summary information for a single broadcast batch (for listing)
export interface BroadcastBatchInfo {
    batchId: string;
    subject: string;
    bodySnippet: string; // Only a snippet for the list view
    sender: string;
    sentAt: string; // ISO Date string
    recipientCount: number;
}

// Response structure for listing unique broadcast batches
export interface BroadcastBatchListResponse {
    batches: BroadcastBatchInfo[];
    currentPage: number;
    totalPages: number;
    totalBatches: number;
}

// Response structure when deleting an entire broadcast batch
export interface DeleteBatchResponse {
    success: boolean;
    deletedCount: number;
    message: string;
}

// --- NEW Interfaces for Updating Broadcast Batches ---
export interface UpdateBatchPayload {
    subject: string;
    body: string;
}

export interface UpdateBatchResponse {
    success: boolean;
    modifiedCount: number;
    matchedCount: number;
    message: string;
}

// --- Common API Error Structure ---
interface ApiErrorData {
    message?: string;
    errors?: any[]; // Keep consistent with your backend's error format
}

// --- Axios Client Setup ---
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl, // Make sure this points to your backend API base (e.g., http://localhost:5001/api)
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for sending cookies (like auth tokens)
});

// Axios Request Interceptor (for adding Auth token)
apiClient.interceptors.request.use(config => {
    // Ensure this runs only on the client-side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token'); // Or wherever you store the auth token
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    // Log request setup errors (less common)
    console.error("[Admin Inbox API Interceptor] Request setup error:", error);
    return Promise.reject(error);
});

// --- Centralized Error Handling Helper ---
const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response) {
            // Error response from the server (e.g., 4xx, 5xx)
            // console.error("Admin Inbox API Error Response:", { status: axiosError.response.status, data: axiosError.response.data });
            // Prefer the specific message from the backend response body
            return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
            // Request was made but no response received (network error, server down)
            // console.error("Admin Inbox API No Response Error:", axiosError.request);
            return 'Network error: Could not connect to the server. Please check your connection or try again later.';
        } else {
            // Error setting up the request (should be caught by interceptor ideally)
            // console.error("Admin Inbox API Request Setup Error:", axiosError.message);
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        // Standard JavaScript error (e.g., thrown manually in service)
        // console.error("Non-API Error (Admin Inbox Service):", error);
        return error.message;
    } else {
        // Unknown error type
        // console.error("Unknown Error Type (Admin Inbox Service):", error);
        return 'An unexpected error occurred. Please try again.';
    }
};


// --- Service Functions ---

/**
 * Fetches all individual inbox messages across users for the main admin inbox panel.
 * Supports pagination, sorting, and filtering.
 */
const getAllMessagesAdmin = async (
    page = 1,
    limit = 15,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    userId?: string | null,
    readStatus?: boolean | null
): Promise<AdminInboxListResponse> => {
    try {
        const params: Record<string, any> = { page, limit, sortBy, sortOrder };
        if (userId) params.userId = userId;
        // Use 'read' as the query parameter name to match backend controller expectation
        if (readStatus !== null && readStatus !== undefined) params.read = String(readStatus); // Send as 'true' or 'false' string

        // console.log('[Admin Inbox Service] Fetching all messages with params:', params);
        const response = await apiClient.get<AdminInboxListResponse>('/admin/inbox', { params });
        // console.log('[Admin Inbox Service] Individual messages fetched:', response.data);

        // Basic validation of the response structure
        if (!response.data || !Array.isArray(response.data.messages)) {
            console.error("[Admin Inbox Service] Received invalid message list data structure:", response.data);
            throw new Error("Invalid data received from server for message list.");
        }
        // Optionally warn if body is missing, crucial for editing
        if (response.data.messages.length > 0 && response.data.messages[0].body === undefined) {
             console.warn("[Admin Inbox Service] Warning: Message 'body' might be missing from the API response. Ensure it's selected in the backend if needed for editing.");
        }

        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error fetching all messages:`, error);
        const message = getErrorMessage(error);
        throw new Error(message); // Re-throw with a user-friendly message
    }
};

/**
 * Admin updates a specific individual inbox message (subject/body) by its ID.
 * (Used on the main Admin Inbox page)
 */
const updateMessageAdmin = async (
    messageId: string,
    payload: AdminUpdatePayload
): Promise<AdminUpdateResponse> => {
    if (!messageId) {
        throw new Error("Message ID is required for update.");
    }
    if (!payload || !payload.subject?.trim() || !payload.body?.trim()) {
        throw new Error("Subject and body cannot be empty and are required for update.");
    }

    try {
        // console.log(`[Admin Inbox Service] Updating message ${messageId}...`);
        const response = await apiClient.put<AdminUpdateResponse>(`/admin/inbox/${messageId}`, payload);
        // console.log(`[Admin Inbox Service] Message ${messageId} updated successfully.`);

        // Validate response structure
        if (!response.data || !response.data.data?._id) {
             console.error("[Admin Inbox Service] Received invalid update response data structure:", response.data);
             throw new Error("Invalid data received from server after update.");
        }

        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error updating message ${messageId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};


/**
 * Admin deletes a specific individual inbox message by its ID.
 * (Used on the main Admin Inbox page)
 */
const deleteMessageAdmin = async (messageId: string): Promise<AdminDeleteResponse> => {
    if (!messageId) {
        throw new Error("Message ID is required for deletion.");
    }
    try {
        // console.log(`[Admin Inbox Service] Deleting message ${messageId}...`);
        const response = await apiClient.delete<AdminDeleteResponse>(`/admin/inbox/${messageId}`);
        // console.log(`[Admin Inbox Service] Message ${messageId} deleted successfully.`);

        // Basic validation of response
        if (typeof response.data?.success !== 'boolean') {
             console.error("[Admin Inbox Service] Received invalid delete response data structure:", response.data);
             throw new Error("Invalid data received from server after delete.");
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error deleting message ${messageId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

/**
 * Admin sends a broadcast message to all registered users.
 * (Used on the Send Broadcast page)
 */
const sendMessageToAllAdmin = async (subject: string, body: string): Promise<SendToAllAdminResult> => {
    if (!subject?.trim() || !body?.trim()) {
         throw new Error("Subject and body cannot be empty.");
    }

    try {
        // console.log('[Admin Inbox Service] Sending message to all users...');
        const payload = { subject: subject.trim(), body: body.trim() };

        // Make the POST request, expecting the RawSendToAllApiResponse structure
        const response = await apiClient.post<RawSendToAllApiResponse>('/admin/inbox/send-to-all', payload);
        // console.log('[Admin Inbox Service] Send to all response received:', response.data);

        // Validate the core parts of the response
        if (!response.data || typeof response.data.success !== 'boolean' || !response.data.data) {
            console.error("[Admin Inbox Service] Received invalid 'send to all' response structure:", response.data);
            throw new Error("Invalid response received from server after sending message.");
        }

        // Structure the result for the frontend component based on SendToAllAdminResult
        return {
            message: response.data.message, // Use the main confirmation message
            count: response.data.data.count ?? 0, // Use nullish coalescing for safety
            totalAttempted: response.data.data.totalAttempted ?? 0,
            batchId: response.data.data.batchId, // Pass along the batchId
        };

    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error sending message to all users:`, error);
        const message = getErrorMessage(error);
        throw new Error(message); // Re-throw cleaned error message
    }
};

/**
 * Fetches a list of unique broadcast message batches for the history view.
 * Supports pagination.
 */
const getBroadcastBatchesAdmin = async (
    page = 1,
    limit = 10 // Default limit for batch history
): Promise<BroadcastBatchListResponse> => {
    try {
        const params = { page, limit };
        // console.log('[Admin Inbox Service] Fetching broadcast batches with params:', params);
        const response = await apiClient.get<BroadcastBatchListResponse>('/admin/inbox/batches', { params });
        // console.log('[Admin Inbox Service] Batches fetched:', response.data);

        // Validate structure
        if (!response.data || !Array.isArray(response.data.batches)) {
             console.error("[Admin Inbox Service] Received invalid batch list data structure:", response.data);
             throw new Error("Invalid data received from server for batch list.");
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error fetching broadcast batches:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

/**
 * Admin deletes all messages associated with a specific broadcast batch ID.
 * (Used on the Send Broadcast page history)
 */
const deleteBroadcastBatchAdmin = async (batchId: string): Promise<DeleteBatchResponse> => {
    if (!batchId) {
        throw new Error("Batch ID is required for deletion.");
    }
    try {
        // console.log(`[Admin Inbox Service] Deleting batch ${batchId}...`);
        const response = await apiClient.delete<DeleteBatchResponse>(`/admin/inbox/batch/${batchId}`);
        // console.log(`[Admin Inbox Service] Batch ${batchId} deleted response:`, response.data);

         // Validate response structure
         if (typeof response.data?.success !== 'boolean' || typeof response.data?.deletedCount !== 'number') {
             console.error("[Admin Inbox Service] Received invalid batch delete response structure:", response.data);
             throw new Error("Invalid response received from server after batch delete.");
         }
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error deleting batch ${batchId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

// --- NEW Service Function: Update Broadcast Batch ---
const updateBroadcastBatchAdmin = async (
    batchId: string,
    payload: UpdateBatchPayload
): Promise<UpdateBatchResponse> => {
    if (!batchId) {
        throw new Error("Batch ID is required for update.");
    }
    if (!payload || !payload.subject?.trim() || !payload.body?.trim()) {
        throw new Error("Subject and body cannot be empty for batch update.");
    }
    try {
        // console.log(`[Admin Inbox Service] Updating batch ${batchId}...`);
        const response = await apiClient.put<UpdateBatchResponse>(`/admin/inbox/batch/${batchId}`, payload);
        // console.log(`[Admin Inbox Service] Batch ${batchId} updated response:`, response.data);

        if (typeof response.data?.success !== 'boolean' || typeof response.data?.modifiedCount !== 'number') {
            console.error("[Admin Inbox Service] Received invalid batch update response structure:", response.data);
            throw new Error("Invalid response received from server after batch update.");
        }
        return response.data;
    } catch (error: unknown) {
        console.error(`[Admin Inbox Service] Error updating batch ${batchId}:`, error);
        const message = getErrorMessage(error);
        throw new Error(message);
    }
};

// --- Export Service Object ---
// Consolidates all functions into a single object for easier import
const inboxAdminService = {
    // Individual message operations (Main Inbox)
    getAllMessagesAdmin,
    updateMessageAdmin,
    deleteMessageAdmin,
    // Broadcast operations (Send Broadcast Page)
    sendMessageToAllAdmin,
    getBroadcastBatchesAdmin,
    deleteBroadcastBatchAdmin,
    updateBroadcastBatchAdmin, // <-- ADD NEW FUNCTION
};

export default inboxAdminService;