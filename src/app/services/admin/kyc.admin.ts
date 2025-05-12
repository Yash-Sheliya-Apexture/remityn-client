// // frontend/src/app/services/admin/kyc.admin.ts
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig'; // Assuming apiConfig.baseUrl exists
// import type { User } from '../../contexts/AuthContext'; // Adjust if User type comes from elsewhere
// import type { KycDetails, KycUpdateResponse as UserKycUpdateResponse } from '../kyc'; // Adjust path if needed

// // Interface for the simplified user data in the list
// export interface PendingKycUser {
//     _id: string;
//     fullName: string;
//     email: string;
//     kyc: {
//         status: KycDetails['status'];
//         submittedAt?: string | Date; // Keep Date type for flexibility if backend sends it
//     };
// }

// // Response type for fetching pending users
// export type PendingKycUsersResponse = PendingKycUser[];

// // Type for the full user details fetched by admin
// export interface AdminKycUserResponse extends Omit<User, 'kycStatus' | 'kycRejectionReason'> { // Omit simplified fields if they exist on User type
//     kyc: KycDetails; // Include the full nested KYC details
// }

// // Payload for updating status
// export interface AdminUpdateStatusPayload {
//     status: 'verified' | 'rejected';
//     rejectionReason?: string;
// }

// // Response type for status update (often includes a message and the updated kyc part)
// export interface AdminKycUpdateResponse extends UserKycUpdateResponse {}

// // --- Axios Client Setup ---
// // !!! IMPORTANT: Ensure this is properly configured !!!
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl, // Make sure you have a base URL defined in your config
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add Authorization token interceptor
// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('token'); // Or wherever you store your token
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
// // --- Admin Service Functions ---

// /**
//  * Fetches users with pending KYC status.
//  */
// const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
//     try {
//         // Matches backend route: GET /api/admin/kyc/pending
//         const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
//         return response.data;
//     } catch (error: any) {
//         console.error(`Error fetching pending KYC users (Admin):`, error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to fetch pending KYC submissions.';
//         throw new Error(message);
//     }
// };


// /**
//  * Fetches the full user object including detailed KYC information for a specific user.
//  * Requires Admin privileges.
//  * @param userId - The ID of the user whose details are to be fetched.
//  */
// const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     try {
//         // Matches backend route: GET /api/admin/kyc/users/:userId
//         const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
//         return response.data;
//     } catch (error: any) {
//         console.error(`Error fetching KYC details for user ${userId} (Admin):`, error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to fetch user KYC details.';
//         throw new Error(message);
//     }
// };

// /**
//  * Updates the KYC status (verified/rejected) for a specific user.
//  * Requires Admin privileges.
//  * @param userId - The ID of the user whose status is to be updated.
//  * @param payload - Object containing the new status and optional rejection reason.
//  */
// const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     if (!payload || !payload.status) throw new Error("Status payload is required.");
//     if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
//         throw new Error("Rejection reason is required when rejecting KYC.");
//     }

//     try {
//         // Matches backend route: PUT /api/admin/kyc/users/:userId/status
//         const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
//         return response.data;
//     } catch (error: any) {
//         console.error(`Error updating KYC status for user ${userId} (Admin):`, error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to update user KYC status.';
//         throw new Error(message);
//     }
// };

// // --- Export Service ---
// const kycAdminService = {
//     getPendingKycUsersAdmin,
//     getKycDetailsAdmin,
//     updateKycStatusAdmin,
// };

// export default kycAdminService;


// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import apiConfig from '../../config/apiConfig';
// import type { User } from '../../contexts/AuthContext';
// import type { KycDetails, KycUpdateResponse as UserKycUpdateResponse } from '../kyc';

// // Interfaces (Keep as they are)
// export interface PendingKycUser { /* ... */ }
// export type PendingKycUsersResponse = PendingKycUser[];
// export interface AdminKycUserResponse extends Omit<User, 'kycStatus' | 'kycRejectionReason'> { kyc: KycDetails; }
// export interface AdminUpdateStatusPayload { status: 'verified' | 'rejected'; rejectionReason?: string; }
// export interface AdminKycUpdateResponse extends UserKycUpdateResponse {}

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Add this if you rely on cookies for authentication session
// });

// // Authorization Token Interceptor
// apiClient.interceptors.request.use(config => {
//     try {
//         const token = localStorage.getItem('token'); // Or cookies, etc.
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//             console.log('[API Interceptor] Token added to request.'); // Debug log
//         } else {
//             console.log('[API Interceptor] No token found or headers missing.'); // Debug log
//         }
//     } catch (error) {
//         console.error("[API Interceptor] Error accessing token or setting header:", error);
//         // Optionally, you might want to prevent the request or reject it here
//         // return Promise.reject(new Error("Failed to set auth token"));
//     }
//     return config;
// }, error => {
//     console.error("[API Interceptor] Request error:", error); // Log request setup errors
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// // This function tries to get a meaningful message from various Axios error shapes
// const getErrorMessage = (error: any): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>; // Type assertion
//         if (axiosError.response) {
//             // Server responded with a status code outside the 2xx range
//             console.error("API Error Response:", axiosError.response.data);
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             // The request was made but no response was received (network error, timeout)
//             console.error("API No Response Error:", axiosError.request);
//             return 'Network error: No response received from server.';
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error("API Request Setup Error:", axiosError.message);
//             return axiosError.message || 'Error setting up the request.';
//         }
//     } else if (error instanceof Error) {
//         // Handle non-Axios errors (e.g., errors in interceptors)
//         console.error("Non-API Error:", error.message);
//         return error.message;
//     } else {
//         // Fallback for unknown errors
//         console.error("Unknown Error:", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Admin Service Functions ---

// const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
//     try {
//         console.log('[Admin Service] Fetching pending KYC users...'); // Debug log
//         const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
//         console.log('[Admin Service] Pending KYC users fetched:', response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching pending KYC users:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message:`, message); // Log parsed message
//         throw new Error(message);
//     }
// };

// const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     try {
//         console.log(`[Admin Service] Fetching KYC details for user ${userId}...`); // Debug log
//         // Ensure the URL is correct: /api/admin/kyc/users/:userId
//         const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
//         console.log(`[Admin Service] KYC details for user ${userId} fetched:`, response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching KYC details for user ${userId}:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message for getKycDetailsAdmin:`, message); // Log parsed message
//         throw new Error(message); // Re-throw with a meaningful message
//     }
// };

// const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     if (!payload || !payload.status) throw new Error("Status payload is required.");
//     if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
//         throw new Error("Rejection reason is required when rejecting KYC.");
//     }

//     try {
//         console.log(`[Admin Service] Updating KYC status for user ${userId} to ${payload.status}...`); // Debug log
//         // Ensure the URL is correct: /api/admin/kyc/users/:userId/status
//         const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
//         console.log(`[Admin Service] KYC status updated for user ${userId}:`, response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error updating KYC status for user ${userId}:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message for updateKycStatusAdmin:`, message); // Log parsed message
//         throw new Error(message);
//     }
// };

// // --- Export Service ---
// const kycAdminService = {
//     getPendingKycUsersAdmin,
//     getKycDetailsAdmin,
//     updateKycStatusAdmin,
// };

// export default kycAdminService;




// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import apiConfig from '../../config/apiConfig';
// import type { User } from '../../contexts/AuthContext';
// import type { KycDetails, KycUpdateResponse as UserKycUpdateResponse } from '../kyc';

// // Interfaces (Keep as they are)
// export interface PendingKycUser { /* ... */ }
// export type PendingKycUsersResponse = PendingKycUser[];
// export interface AdminKycUserResponse extends Omit<User, 'kycStatus' | 'kycRejectionReason'> { kyc: KycDetails; }
// export interface AdminUpdateStatusPayload { status: 'verified' | 'rejected'; rejectionReason?: string; }
// export interface AdminKycUpdateResponse extends UserKycUpdateResponse {}

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Add this if you rely on cookies for authentication session
// });

// // Authorization Token Interceptor
// apiClient.interceptors.request.use(config => {
//     try {
//         const token = localStorage.getItem('token'); // Or cookies, etc.
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//             console.log('[API Interceptor] Token added to request.'); // Debug log
//         } else {
//             console.log('[API Interceptor] No token found or headers missing.'); // Debug log
//         }
//     } catch (error) {
//         console.error("[API Interceptor] Error accessing token or setting header:", error);
//         // Optionally, you might want to prevent the request or reject it here
//         // return Promise.reject(new Error("Failed to set auth token"));
//     }
//     return config;
// }, error => {
//     console.error("[API Interceptor] Request error:", error); // Log request setup errors
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// // This function tries to get a meaningful message from various Axios error shapes
// const getErrorMessage = (error: any): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>; // Type assertion
//         if (axiosError.response) {
//             // Server responded with a status code outside the 2xx range
//             console.error("API Error Response:", axiosError.response.data);
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             // The request was made but no response was received (network error, timeout)
//             console.error("API No Response Error:", axiosError.request);
//             return 'Network error: No response received from server.';
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error("API Request Setup Error:", axiosError.message);
//             return axiosError.message || 'Error setting up the request.';
//         }
//     } else if (error instanceof Error) {
//         // Handle non-Axios errors (e.g., errors in interceptors)
//         console.error("Non-API Error:", error.message);
//         return error.message;
//     } else {
//         // Fallback for unknown errors
//         console.error("Unknown Error:", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Admin Service Functions ---

// const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
//     try {
//         console.log('[Admin Service] Fetching pending KYC users...'); // Debug log
//         const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
//         console.log('[Admin Service] Pending KYC users fetched:', response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching pending KYC users:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message:`, message); // Log parsed message
//         throw new Error(message);
//     }
// };

// const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     try {
//         console.log(`[Admin Service] Fetching KYC details for user ${userId}...`); // Debug log
//         // Ensure the URL is correct: /api/admin/kyc/users/:userId
//         const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
//         console.log(`[Admin Service] KYC details for user ${userId} fetched:`, response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching KYC details for user ${userId}:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message for getKycDetailsAdmin:`, message); // Log parsed message
//         throw new Error(message); // Re-throw with a meaningful message
//     }
// };

// const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
//     if (!userId) throw new Error("User ID is required.");
//     if (!payload || !payload.status) throw new Error("Status payload is required.");
//     if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
//         throw new Error("Rejection reason is required when rejecting KYC.");
//     }

//     try {
//         console.log(`[Admin Service] Updating KYC status for user ${userId} to ${payload.status}...`); // Debug log
//         // Ensure the URL is correct: /api/admin/kyc/users/:userId/status
//         const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
//         console.log(`[Admin Service] KYC status updated for user ${userId}:`, response.data); // Debug log
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error updating KYC status for user ${userId}:`, error); // Log raw error
//         const message = getErrorMessage(error); // Use helper
//         console.error(`[Admin Service] Parsed error message for updateKycStatusAdmin:`, message); // Log parsed message
//         throw new Error(message);
//     }
// };

// // --- Export Service ---
// const kycAdminService = {
//     getPendingKycUsersAdmin,
//     getKycDetailsAdmin,
//     updateKycStatusAdmin,
// };

// export default kycAdminService;


// // frontend/src/app/services/admin/kyc.admin.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if needed

// // Re-export or redefine types matching the backend responses/payloads
// // Import User type if needed, or define specific Admin types
// // import type { User } from '../../contexts/AuthContext';

// // Structure for the list of pending users
// export interface PendingKycUser {
//     _id: string;
//     fullName: string;
//     email: string;
//     kyc?: { // KYC might be minimal in this response
//         status: 'pending';
//         submittedAt?: string | Date;
//     };
// }
// export type PendingKycUsersResponse = PendingKycUser[];

// // Structure for the detailed user response for admin
// // Includes full user details (minus password) and full KYC details
// export interface AdminKycUserResponse {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     createdAt: string | Date;
//     updatedAt: string | Date;
//     kyc: KycDetails; // Use the detailed KycDetails type from kyc.ts
//     // Add other user fields if present in backend response
// }

// // Type for the KycDetails subdocument (can reuse from kyc.ts if exported)
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date;
//     mobile?: { countryCode?: string; number?: string };
//     occupation?: string;
//     salaryRange?: string | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date;
//     idExpiryDate?: string | Date;
//     documents?: { docType: string; url: string; public_id: string; uploadedAt?: string | Date }[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }


// // Payload for updating status
// export interface AdminUpdateStatusPayload {
//     status: 'verified' | 'rejected';
//     rejectionReason?: string; // Required only if status is 'rejected'
// }

// // Response after updating status
// export interface AdminKycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend returns the updated KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl, // Use base URL from config
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Send cookies if session is cookie-based
// });

// // --- Authorization Token Interceptor ---
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//             // console.log('[Admin API Interceptor] Token added to request.');
//         }
//     }
//     return config;
// }, error => {
//     console.error("[Admin API Interceptor] Request error:", error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// const getErrorMessage = (error: any): string => {
//      if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         if (axiosError.response) {
//             console.error("Admin API Error Response:", { status: axiosError.response.status, data: axiosError.response.data });
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//              console.error("Admin API No Response Error:", axiosError.request);
//             return 'Network error: No response received from server.';
//         } else {
//              console.error("Admin API Request Setup Error:", axiosError.message);
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//          console.error("Non-API Error (Admin):", error.message);
//         return error.message;
//     } else {
//          console.error("Unknown Error (Admin):", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Admin Service Functions ---

// /**
//  * Fetches a list of users with pending KYC verification.
//  */
// const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
//     try {
//         console.log('[Admin Service] Fetching pending KYC users...');
//         // Correct endpoint: /api/admin/kyc/pending
//         const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
//         console.log('[Admin Service] Pending KYC users fetched successfully:', response.data.length);
//         return response.data || []; // Return empty array if no data
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching pending KYC users:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message:`, message);
//         throw new Error(message); // Re-throw parsed message
//     }
// };

// /**
//  * Fetches the detailed KYC information for a specific user by ID.
//  */
// const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
//     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//          throw new Error("User ID is required and must be a valid string.");
//     }
//     try {
//         console.log(`[Admin Service] Fetching KYC details for user ${userId}...`);
//         // Correct endpoint: /api/admin/kyc/users/:userId
//         const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
//         console.log(`[Admin Service] KYC details for user ${userId} fetched successfully.`);
//         // Add basic validation if needed (e.g., check if response.data exists)
//         if (!response.data) throw new Error("Received empty response from server.");
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching KYC details for user ${userId}:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message for getKycDetailsAdmin:`, message);
//         // Handle 404 specifically if needed, otherwise throw generic
//         if (axios.isAxiosError(error) && error.response?.status === 404) {
//              throw new Error("User not found.");
//         }
//         throw new Error(message);
//     }
// };

// /**
//  * Updates the KYC status (verified/rejected) for a specific user.
//  */
// const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
//     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//         throw new Error("User ID is required and must be a valid string.");
//     }
//     if (!payload || !payload.status || !['verified', 'rejected'].includes(payload.status)) {
//         throw new Error("Invalid status payload. Status must be 'verified' or 'rejected'.");
//     }
//     if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
//         throw new Error("Rejection reason is required when rejecting KYC.");
//     }

//     try {
//         console.log(`[Admin Service] Updating KYC status for user ${userId} to ${payload.status}...`);
//         // Correct endpoint: /api/admin/kyc/users/:userId/status
//         const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
//         console.log(`[Admin Service] KYC status updated successfully for user ${userId}:`, response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error updating KYC status for user ${userId}:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message for updateKycStatusAdmin:`, message);
//         // Handle specific backend errors (e.g., 400 for invalid state, 404 for user not found)
//         if (axios.isAxiosError(error)) {
//             if (error.response?.status === 400) throw new Error(error.response.data?.message || "Invalid request or user status prevents update.");
//             if (error.response?.status === 404) throw new Error("User not found.");
//         }
//         throw new Error(message); // Throw processed message
//     }
// };

// // --- Export Service Object ---
// const kycAdminService = {
//     getPendingKycUsersAdmin,
//     getKycDetailsAdmin,
//     updateKycStatusAdmin,
// };

// export default kycAdminService;

// // frontend/src/app/services/admin/kyc.admin.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if needed

// // --- Define and Export Specific Types ---

// // Define the specific salary range values used in the application
// export type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';

// // Structure for the list of pending users
// export interface PendingKycUser {
//     _id: string;
//     fullName: string;
//     email: string;
//     kyc?: { // KYC might be minimal in this response
//         status: 'pending';
//         submittedAt?: string | Date;
//     };
// }
// export type PendingKycUsersResponse = PendingKycUser[];

// // Type for the KycDetails subdocument
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date;
//     mobile?: { countryCode?: string; number?: string };
//     occupation?: string;
//     salaryRange?: SalaryRange | null; // <-- USE THE EXPORTED TYPE HERE
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date;
//     idExpiryDate?: string | Date;
//     documents?: { docType: 'id_front' | 'id_back'; url: string; public_id: string; uploadedAt?: string | Date }[]; // Made docType more specific
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }

// // Structure for the detailed user response for admin
// export interface AdminKycUserResponse {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     createdAt: string | Date;
//     updatedAt: string | Date;
//     kyc: KycDetails; // Use the detailed KycDetails type
//     // Add other user fields if present in backend response
// }


// // Payload for updating status
// export interface AdminUpdateStatusPayload {
//     status: 'verified' | 'rejected';
//     rejectionReason?: string; // Required only if status is 'rejected'
// }

// // Response after updating status
// export interface AdminKycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend returns the updated KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl, // Use base URL from config
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Send cookies if session is cookie-based
// });

// // --- Authorization Token Interceptor ---
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error("[Admin API Interceptor] Request error:", error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// const getErrorMessage = (error: any): string => {
//      if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         if (axiosError.response) {
//             console.error("Admin API Error Response:", { status: axiosError.response.status, data: axiosError.response.data });
//             // Check if the data itself is the message (sometimes happens with simple string errors)
//             if (typeof axiosError.response.data === 'string') {
//                  return axiosError.response.data;
//             }
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//              console.error("Admin API No Response Error:", axiosError.request);
//             return 'Network error: No response received from server.';
//         } else {
//              console.error("Admin API Request Setup Error:", axiosError.message);
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//          console.error("Non-API Error (Admin):", error.message);
//         return error.message;
//     } else {
//          console.error("Unknown Error (Admin):", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Admin Service Functions ---

// /**
//  * Fetches a list of users with pending KYC verification.
//  */
// const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
//     try {
//         console.log('[Admin Service] Fetching pending KYC users...');
//         const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
//         console.log('[Admin Service] Pending KYC users fetched successfully:', response.data.length);
//         return response.data || [];
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching pending KYC users:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message:`, message);
//         throw new Error(message);
//     }
// };

// /**
//  * Fetches the detailed KYC information for a specific user by ID.
//  */
// const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
//     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//          throw new Error("User ID is required and must be a valid string.");
//     }
//     try {
//         console.log(`[Admin Service] Fetching KYC details for user ${userId}...`);
//         const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
//         console.log(`[Admin Service] KYC details for user ${userId} fetched successfully.`);
//         if (!response.data) throw new Error("Received empty response from server.");
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error fetching KYC details for user ${userId}:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message for getKycDetailsAdmin:`, message);
//         if (axios.isAxiosError(error) && error.response?.status === 404) {
//              throw new Error("User not found.");
//         }
//         throw new Error(message);
//     }
// };

// /**
//  * Updates the KYC status (verified/rejected) for a specific user.
//  */
// const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
//     if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//         throw new Error("User ID is required and must be a valid string.");
//     }
//     if (!payload || !payload.status || !['verified', 'rejected'].includes(payload.status)) {
//         throw new Error("Invalid status payload. Status must be 'verified' or 'rejected'.");
//     }
//     if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
//         throw new Error("Rejection reason is required when rejecting KYC.");
//     }

//     try {
//         console.log(`[Admin Service] Updating KYC status for user ${userId} to ${payload.status}...`);
//         const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
//         console.log(`[Admin Service] KYC status updated successfully for user ${userId}:`, response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error(`[Admin Service] Error updating KYC status for user ${userId}:`, error);
//         const message = getErrorMessage(error);
//         console.error(`[Admin Service] Parsed error message for updateKycStatusAdmin:`, message);
//         if (axios.isAxiosError(error)) {
//             if (error.response?.status === 400) throw new Error(error.response.data?.message || "Invalid request or user status prevents update.");
//             if (error.response?.status === 404) throw new Error("User not found.");
//         }
//         throw new Error(message);
//     }
// };

// // --- Export Service Object ---
// const kycAdminService = {
//     getPendingKycUsersAdmin,
//     getKycDetailsAdmin,
//     updateKycStatusAdmin,
// };

// export default kycAdminService;


// frontend/src/app/services/admin/kyc.admin.ts
// (No changes needed)
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed

// --- Define and Export Specific Types ---

// Define the specific salary range values used in the application
export type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';

// Structure for the list of pending users
export interface PendingKycUser {
    _id: string;
    fullName: string;
    email: string;
    kyc?: { // KYC might be minimal in this response
        status: 'pending';
        submittedAt?: string | Date;
    };
}
export type PendingKycUsersResponse = PendingKycUser[];

// Type for the KycDetails subdocument
export interface KycDetails {
    status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string | Date;
    mobile?: { countryCode?: string; number?: string };
    occupation?: string;
    salaryRange?: SalaryRange | null; // <-- USE THE EXPORTED TYPE HERE
    nationality?: string;
    idType?: 'passport' | 'resident_permit' | null;
    idNumber?: string;
    idIssueDate?: string | Date;
    idExpiryDate?: string | Date;
    documents?: { docType: 'id_front' | 'id_back'; url: string; public_id: string; uploadedAt?: string | Date }[]; // Made docType more specific
    submittedAt?: string | Date;
    verifiedAt?: string | Date;
    rejectedAt?: string | Date;
    rejectionReason?: string | null;
    lastUpdatedAt?: string | Date;
}

// Structure for the detailed user response for admin
export interface AdminKycUserResponse {
    _id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string | Date;
    updatedAt: string | Date;
    kyc: KycDetails; // Use the detailed KycDetails type
    // Add other user fields if present in backend response
}


// Payload for updating status
export interface AdminUpdateStatusPayload {
    status: 'verified' | 'rejected';
    rejectionReason?: string; // Required only if status is 'rejected'
}

// Response after updating status
export interface AdminKycUpdateResponse {
    message: string;
    kyc: KycDetails; // Backend returns the updated KYC object
}

// --- Axios Client Setup ---
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl, // Use base URL from config
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies if session is cookie-based
});

// --- Authorization Token Interceptor ---
apiClient.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    console.error("[Admin API Interceptor] Request error:", error);
    return Promise.reject(error);
});

// --- Helper to Extract Error Message ---
const getErrorMessage = (error: any): string => {
     if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
            console.error("Admin API Error Response:", { status: axiosError.response.status, data: axiosError.response.data });
            // Check if the data itself is the message (sometimes happens with simple string errors)
            if (typeof axiosError.response.data === 'string') {
                 return axiosError.response.data;
            }
            return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
             console.error("Admin API No Response Error:", axiosError.request);
            return 'Network error: No response received from server.';
        } else {
             console.error("Admin API Request Setup Error:", axiosError.message);
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
         console.error("Non-API Error (Admin):", error.message);
        return error.message;
    } else {
         console.error("Unknown Error (Admin):", error);
        return 'An unknown error occurred.';
    }
};


// --- Admin Service Functions ---

/**
 * Fetches a list of users with pending KYC verification.
 */
const getPendingKycUsersAdmin = async (): Promise<PendingKycUsersResponse> => {
    try {
        console.log('[Admin Service] Fetching pending KYC users...');
        const response = await apiClient.get<PendingKycUsersResponse>(`/admin/kyc/pending`);
        console.log('[Admin Service] Pending KYC users fetched successfully:', response.data.length);
        return response.data || [];
    } catch (error: any) {
        console.error(`[Admin Service] Error fetching pending KYC users:`, error);
        const message = getErrorMessage(error);
        console.error(`[Admin Service] Parsed error message:`, message);
        throw new Error(message);
    }
};

/**
 * Fetches the detailed KYC information for a specific user by ID.
 */
const getKycDetailsAdmin = async (userId: string): Promise<AdminKycUserResponse> => {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
         throw new Error("User ID is required and must be a valid string.");
    }
    try {
        console.log(`[Admin Service] Fetching KYC details for user ${userId}...`);
        const response = await apiClient.get<AdminKycUserResponse>(`/admin/kyc/users/${userId}`);
        console.log(`[Admin Service] KYC details for user ${userId} fetched successfully.`);
        if (!response.data) throw new Error("Received empty response from server.");
        return response.data;
    } catch (error: any) {
        console.error(`[Admin Service] Error fetching KYC details for user ${userId}:`, error);
        const message = getErrorMessage(error);
        console.error(`[Admin Service] Parsed error message for getKycDetailsAdmin:`, message);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
             throw new Error("User not found.");
        }
        throw new Error(message);
    }
};

/**
 * Updates the KYC status (verified/rejected) for a specific user.
 */
const updateKycStatusAdmin = async (userId: string, payload: AdminUpdateStatusPayload): Promise<AdminKycUpdateResponse> => {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error("User ID is required and must be a valid string.");
    }
    if (!payload || !payload.status || !['verified', 'rejected'].includes(payload.status)) {
        throw new Error("Invalid status payload. Status must be 'verified' or 'rejected'.");
    }
    if (payload.status === 'rejected' && (!payload.rejectionReason || !payload.rejectionReason.trim())) {
        throw new Error("Rejection reason is required when rejecting KYC.");
    }

    try {
        console.log(`[Admin Service] Updating KYC status for user ${userId} to ${payload.status}...`);
        const response = await apiClient.put<AdminKycUpdateResponse>(`/admin/kyc/users/${userId}/status`, payload);
        console.log(`[Admin Service] KYC status updated successfully for user ${userId}:`, response.data);
        return response.data;
    } catch (error: any) {
        console.error(`[Admin Service] Error updating KYC status for user ${userId}:`, error);
        const message = getErrorMessage(error);
        console.error(`[Admin Service] Parsed error message for updateKycStatusAdmin:`, message);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) throw new Error(error.response.data?.message || "Invalid request or user status prevents update.");
            if (error.response?.status === 404) throw new Error("User not found.");
        }
        throw new Error(message);
    }
};

// --- Export Service Object ---
const kycAdminService = {
    getPendingKycUsersAdmin,
    getKycDetailsAdmin,
    updateKycStatusAdmin,
};

export default kycAdminService;