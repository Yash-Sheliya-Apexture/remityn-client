// // frontend/src/app/services/kyc.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// // Define the structure for KYC form data parts
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string;
//     public_id: string;
//     uploadedAt?: string | Date;
// }

// // Structure matching the backend User model's kyc subdocument
// // Use this for GET requests and potentially updates
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string
//     idExpiryDate?: string | Date; // API might return string
//     documents?: KycDocument[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }


// // Payload for initial submission (combines data from all steps)
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Send as ISO string
//     mobile: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality: string;
//     idType: 'passport' | 'resident_permit';
//     idNumber: string;
//     idIssueDate: string; // Send as ISO string
//     idExpiryDate: string; // Send as ISO string
//     // Files are handled separately via FormData
// }

// // Payload for updating editable details
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
// }

// // API Response Structures
// export interface KycStatusResponse {
//     status: KycDetails['status'];
//     rejectionReason?: string | null;
// }

// export interface KycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend should return the updated/current KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Request interceptor to add token
// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// // --- Service Functions ---

// /**
//  * Submits the complete KYC data including documents.
//  * @param kycData - The combined non-file KYC form data.
//  * @param idFrontFile - The file object for the ID front.
//  * @param idBackFile - The file object for the ID back (required for resident_permit).
//  */
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File, // Assuming front is always required
//     idBackFile: File | null // Optional for passport
// ): Promise<KycUpdateResponse> => {
//     const formData = new FormData();

//     // Append non-file data
//     Object.entries(kycData).forEach(([key, value]) => {
//         if (key === 'mobile' && value !== null && typeof value === 'object') {
//             formData.append(key, JSON.stringify(value));
//         } else if (value !== null && value !== undefined) {
//             formData.append(key, String(value));
//         }
//     });

//     // Append files
//     formData.append('id_front', idFrontFile);
//     if (idBackFile) {
//         formData.append('id_back', idBackFile);
//     }

//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/submit', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', // Override for file uploads
//             },
//         });
//         return response.data;
//     } catch (error: any) {
//         console.error('Error submitting KYC:', error.response?.data || error.message);
//         const message = error.response?.data?.message || 'KYC submission failed. Please check your details and try again.';
//         throw new Error(message);
//     }
// };

// /**
//  * Skips the KYC process for the current user.
//  */
// const skipKyc = async (): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/skip');
//         return response.data;
//     } catch (error: any) {
//         console.error('Error skipping KYC:', error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to skip KYC.';
//         throw new Error(message);
//     }
// };

// /**
//  * Fetches the current user's KYC status and rejection reason.
//  */
// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     try {
//         const response = await apiClient.get<KycStatusResponse>('/kyc/status');
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching KYC status:', error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to fetch KYC status.';
//         throw new Error(message);
//     }
// };

// /**
//  * Fetches the full KYC details for the current user.
//  * Used to pre-fill forms if user started/skipped/rejected.
//  */
// const getMyKycDetails = async (): Promise<KycDetails> => {
//      try {
//          // Assuming you have an endpoint like /api/kyc/details or reuse /api/users/me
//          // This endpoint MUST return the full User.kyc object
//          const response = await apiClient.get<{ kyc: KycDetails }>('/dashboard/users/me'); // Adjust endpoint if needed
//          return response.data.kyc || { status: 'not_started' }; // Return kyc object or default
//      } catch (error: any) {
//          console.error('Error fetching full KYC details:', error.response?.data || error.message);
//          const message = error.response?.data?.message || 'Failed to fetch your KYC details.';
//          throw new Error(message);
//      }
// };


// /**
//  * Updates specific editable KYC details for the current user.
//  * @param updateData - Payload containing fields to update.
//  */
// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.put<KycUpdateResponse>('/kyc/update-details', updateData);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error updating KYC details:', error.response?.data || error.message);
//         const message = error.response?.data?.message || 'Failed to update KYC details.';
//         throw new Error(message);
//     }
// };


// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     getMyKycDetails, // Added function to get full details
//     updateMyKycDetails,
// };

// export default kycService;


// // frontend/src/app/services/kyc.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// // Define the structure for KYC form data parts
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string;
//     public_id: string;
//     uploadedAt?: string | Date;
// }

// // Structure matching the backend User model's kyc subdocument
// // Use this for GET requests and potentially updates
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string
//     idExpiryDate?: string | Date; // API might return string
//     documents?: KycDocument[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }


// // Payload for initial submission (combines data from all steps)
// // Ensure these fields align with what your KycContext.kycData holds
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Send as ISO string
//     mobile: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality: string;
//     idType: 'passport' | 'resident_permit';
//     idNumber: string;
//     idIssueDate: string; // Send as ISO string
//     idExpiryDate: string; // Send as ISO string
//     // Files are handled separately via FormData
// }

// // Payload for updating editable details
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
// }

// // API Response Structures
// export interface KycStatusResponse {
//     status: KycDetails['status'];
//     rejectionReason?: string | null;
// }

// export interface KycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend should return the updated/current KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Request interceptor to add token
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error('Axios request interceptor error:', error);
//     return Promise.reject(error);
// });

// // --- Service Functions ---

// /**
//  * Submits the complete KYC data including documents.
//  * @param kycData - The combined non-file KYC form data.
//  * @param idFrontFile - The file object for the ID front.
//  * @param idBackFile - The file object for the ID back (can be null).
//  */
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null
// ): Promise<KycUpdateResponse> => {
//     const formData = new FormData();

//     console.log('Preparing KYC submission...');

//     // Append non-file data carefully
//     Object.entries(kycData).forEach(([key, value]) => {
//         // Handle specific types explicitly
//         if (key === 'mobile' && value !== null && typeof value === 'object') {
//             try {
//                 formData.append(key, JSON.stringify(value)); // Send nested object as JSON string
//             } catch (stringifyError) {
//                 console.error(`Error stringifying mobile data: ${stringifyError}`);
//                 throw new Error(`Failed to prepare mobile data for submission.`);
//             }
//         } else if (value instanceof Date) {
//             // Should not happen if payload expects string, but defensive check
//              console.warn(`submitKyc received Date object for ${key}, converting to ISO string.`);
//              formData.append(key, value.toISOString());
//         } else if (value !== null && value !== undefined) {
//             // Append other primitive values (string, number, boolean, ISO date strings)
//             formData.append(key, String(value));
//         }
//         // Explicitly DO NOT append null/undefined values unless backend requires empty strings
//     });

//     // Append files
//     if (idFrontFile) {
//         console.log('Appending front file:', idFrontFile.name);
//         formData.append('id_front', idFrontFile, idFrontFile.name);
//     } else {
//         // This case should ideally be prevented by form validation before calling submitKyc
//         console.error("submitKyc called without idFrontFile!");
//         throw new Error("Front ID document is required for submission.");
//     }

//     if (idBackFile) {
//         console.log('Appending back file:', idBackFile.name);
//         formData.append('id_back', idBackFile, idBackFile.name);
//     }

//     // DEBUG: Log FormData contents before sending
//     // console.log('--- FormData Contents (before sending) ---');
//     // formData.forEach((value, key) => {
//     //     if (value instanceof File) {
//     //         console.log(`${key}: File { name: ${value.name}, size: ${value.size}, type: ${value.type} }`);
//     //     } else {
//     //         console.log(`${key}: ${value}`);
//     //     }
//     // });
//     // console.log('------------------------------------------');

//     try {
//         console.log(`Attempting POST to ${apiClient.defaults.baseURL}/kyc/submit`);
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/submit', formData, {
//             headers: {
//                 // Let Axios set Content-Type for FormData correctly
//                 'Content-Type': 'multipart/form-data',
//             },
//             // Optional: timeout for large uploads
//             // timeout: 60000,
//         });
//         console.log('KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         // --- ENHANCED ERROR LOGGING ---
//         console.error('--- KYC SUBMISSION ERROR ---');
//         let detailedMessage = 'KYC submission failed. Please check your connection and try again.'; // Default user-friendly message

//         if (axios.isAxiosError(error)) {
//              console.error('Axios Error Details:', {
//                  message: error.message,
//                  code: error.code,
//                  config_url: error.config?.url,
//                  response_status: error.response?.status,
//                  response_data: error.response?.data,
//              });

//             if (error.response) {
//                 // Server responded with an error status (4xx, 5xx)
//                 const serverMsg = error.response.data?.message || JSON.stringify(error.response.data);
//                 // Use server message if available and potentially more specific
//                 detailedMessage = `Submission Error (${error.response.status}): ${serverMsg || 'The server could not process your request.'}`;
//                 // Handle specific status codes if needed
//                 if (error.response.status === 400) {
//                     detailedMessage = `Submission Error: ${serverMsg || 'Please check your input data and documents.'}`;
//                 } else if (error.response.status === 409) {
//                     detailedMessage = `Submission Error: ${serverMsg || 'There was a conflict, perhaps KYC is already pending or verified.'}`;
//                 } else if (error.response.status === 413) {
//                      detailedMessage = `Submission Error: File size too large. Please upload smaller files.`;
//                 } else if (error.response.status >= 500) {
//                     detailedMessage = `Server Error (${error.response.status}): We're experiencing technical difficulties. Please try again later.`;
//                 }
//             } else if (error.request) {
//                 // Request made but no response received (network error, timeout, CORS)
//                  detailedMessage = `Network Error: Could not reach the server. Check your internet connection or try again later. (${error.message})`;
//             } else {
//                 // Error setting up the request
//                 detailedMessage = `Request Setup Error: ${error.message || 'Could not send the request.'}`;
//             }
//         } else {
//             // Not an Axios error (e.g., error during FormData creation)
//              detailedMessage = `An unexpected error occurred: ${error.message || String(error)}`;
//              console.error('Non-Axios Error:', error);
//         }

//         console.error('Processed Error Message:', detailedMessage);
//         // Throw a new error with the refined message for the UI
//         throw new Error(detailedMessage);
//         // --- END OF ENHANCED ERROR LOGGING ---
//     }
// };

// const skipKyc = async (): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/skip');
//         console.log('KYC Skip Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error skipping KYC:', error);
//         const message = error.response?.data?.message || error.message || 'Failed to skip KYC.';
//         throw new Error(message);
//     }
// };

// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     try {
//         const response = await apiClient.get<KycStatusResponse>('/kyc/status');
//         // console.log('Fetched KYC Status:', response.data); // Optional: reduce console noise
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching KYC status:', error);
//         const message = error.response?.data?.message || error.message || 'Failed to fetch KYC status.';
//         throw new Error(message);
//     }
// };

// // Example of fetching full details (adjust endpoint if needed)
// const getMyKycDetails = async (): Promise<KycDetails> => {
//      try {
//          // Assuming an endpoint that returns the user object with populated KYC
//          // Or a dedicated endpoint like '/kyc/details' might be better
//          const response = await apiClient.get<{ kyc: KycDetails }>('/users/me');
//          console.log('Fetched User Details (for KYC):', response.data);
//          // Return kyc object or a default 'not_started' state if kyc is missing/null
//          return response.data?.kyc || { status: 'not_started' };
//      } catch (error: any) {
//          console.error('Error fetching full user/KYC details:', error);
//          const message = error.response?.data?.message || error.message || 'Failed to fetch your details.';
//          // Decide how to handle errors here. Throwing might break initialization.
//          console.warn("Returning default KYC status due to fetch error in getMyKycDetails.");
//          return { status: 'not_started' }; // Return default on error to avoid breaking UI?
//          // throw new Error(message); // Or re-throw if the caller MUST have the data
//      }
// };

// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycUpdateResponse> => {
//     try {
//         console.log("Attempting to update KYC details:", updateData);
//         const response = await apiClient.put<KycUpdateResponse>('/kyc/update-details', updateData);
//         console.log('KYC Details Update Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error updating KYC details:', error);
//         const message = error.response?.data?.message || error.message || 'Failed to update KYC details.';
//         throw new Error(message);
//     }
// };

// // Export the service object as the default export
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     getMyKycDetails, // Include if used elsewhere
//     updateMyKycDetails,
// };

// export default kycService; // Default export


// // frontend/src/app/services/kyc.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// // Define the structure for KYC form data parts
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string;
//     public_id: string;
//     uploadedAt?: string | Date;
// }

// // Structure matching the backend User model's kyc subdocument
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string
//     idExpiryDate?: string | Date; // API might return string
//     documents?: KycDocument[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }


// // Payload for initial submission
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Send as ISO string
//     mobile: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality: string;
//     idType: 'passport' | 'resident_permit';
//     idNumber: string;
//     idIssueDate: string; // Send as ISO string
//     idExpiryDate: string; // Send as ISO string
// }

// // Payload for updating editable details
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
// }

// // API Response Structures
// export interface KycStatusResponse {
//     status: KycDetails['status'];
//     rejectionReason?: string | null;
// }

// export interface KycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend should return the updated/current KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Request interceptor to add token
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error('Axios request interceptor error:', error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// const getErrorMessage = (error: any): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         if (axiosError.response) {
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             return 'Network error: No response received from server.';
//         } else {
//             return axiosError.message || 'Error setting up the request.';
//         }
//     } else if (error instanceof Error) {
//         return error.message;
//     } else {
//         return 'An unknown error occurred.';
//     }
// };


// // --- Service Functions ---
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null
// ): Promise<KycUpdateResponse> => {
//     const formData = new FormData();
//     console.log('Preparing KYC submission...');
//     Object.entries(kycData).forEach(([key, value]) => {
//         if (key === 'mobile' && value !== null && typeof value === 'object') {
//             formData.append(key, JSON.stringify(value));
//         } else if (value !== null && value !== undefined) {
//             formData.append(key, String(value));
//         }
//     });
//     if (idFrontFile) formData.append('id_front', idFrontFile, idFrontFile.name);
//     else throw new Error("Front ID document is required for submission.");
//     if (idBackFile) formData.append('id_back', idBackFile, idBackFile.name);

//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/submit', formData, {
//             headers: { 'Content-Type': 'multipart/form-data', },
//         });
//         console.log('KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('--- KYC SUBMISSION ERROR ---');
//         let detailedMessage = 'KYC submission failed.';
//          if (axios.isAxiosError(error)) {
//              console.error('Axios Error:', {
//                  message: error.message, code: error.code, status: error.response?.status, data: error.response?.data,
//              });
//             detailedMessage = getErrorMessage(error); // Use helper
//             // Add more specific messages based on status if needed
//              if (error.response?.status === 400) detailedMessage = `Submission Error: ${error.response.data?.message || 'Please check your input.'}`;
//              else if (error.response?.status === 409) detailedMessage = `Submission Error: ${error.response.data?.message || 'Conflict (already pending/verified?).'}`;
//              else if (error.response?.status === 413) detailedMessage = `Submission Error: File size too large.`;
//              else if (error.response?.status >= 500) detailedMessage = `Server Error (${error.response.status}). Please try again later.`;
//          } else {
//              detailedMessage = `An unexpected error occurred: ${error.message || String(error)}`;
//              console.error('Non-Axios Error:', error);
//          }
//         console.error('Processed Error Message:', detailedMessage);
//         throw new Error(detailedMessage);
//     }
// };

// const skipKyc = async (): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/skip');
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     try {
//         const response = await apiClient.get<KycStatusResponse>('/kyc/status');
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// const getMyKycDetails = async (): Promise<KycDetails> => {
//      try {
//          const response = await apiClient.get<{ kyc: KycDetails }>('/users/me');
//          return response.data?.kyc || { status: 'not_started' };
//      } catch (error: any) {
//          console.warn("getMyKycDetails failed:", getErrorMessage(error));
//          return { status: 'not_started' }; // Default on error
//      }
// };

// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.put<KycUpdateResponse>('/kyc/update-details', updateData);
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// // Export the service object as the default export
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     getMyKycDetails,
//     updateMyKycDetails,
// };

// export default kycService;


// // frontend/src/app/services/kyc.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// // Define the structure for KYC form data parts
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string;
//     public_id: string;
//     uploadedAt?: string | Date;
// }

// // Structure matching the backend User model's kyc subdocument
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string
//     idExpiryDate?: string | Date; // API might return string
//     documents?: KycDocument[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }


// // Payload for initial submission
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Send as ISO string
//     mobile: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality: string;
//     idType: 'passport' | 'resident_permit';
//     idNumber: string;
//     idIssueDate: string; // Send as ISO string
//     idExpiryDate: string; // Send as ISO string
// }

// // Payload for updating editable details
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
// }

// // API Response Structures
// export interface KycStatusResponse {
//     status: KycDetails['status'];
//     rejectionReason?: string | null;
// }

// export interface KycUpdateResponse {
//     message: string;
//     kyc: KycDetails; // Backend should return the updated/current KYC object
// }

// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Request interceptor to add token
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error('Axios request interceptor error:', error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// const getErrorMessage = (error: any): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         if (axiosError.response) {
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             return 'Network error: No response received from server.';
//         } else {
//             return axiosError.message || 'Error setting up the request.';
//         }
//     } else if (error instanceof Error) {
//         return error.message;
//     } else {
//         return 'An unknown error occurred.';
//     }
// };


// // --- Service Functions ---
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null
// ): Promise<KycUpdateResponse> => {
//     const formData = new FormData();
//     console.log('Preparing KYC submission...');
//     Object.entries(kycData).forEach(([key, value]) => {
//         if (key === 'mobile' && value !== null && typeof value === 'object') {
//             formData.append(key, JSON.stringify(value));
//         } else if (value !== null && value !== undefined) {
//             formData.append(key, String(value));
//         }
//     });
//     if (idFrontFile) formData.append('id_front', idFrontFile, idFrontFile.name);
//     else throw new Error("Front ID document is required for submission.");
//     if (idBackFile) formData.append('id_back', idBackFile, idBackFile.name);

//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/submit', formData, {
//             headers: { 'Content-Type': 'multipart/form-data', },
//         });
//         console.log('KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('--- KYC SUBMISSION ERROR ---');
//         let detailedMessage = 'KYC submission failed.';
//          if (axios.isAxiosError(error)) {
//              console.error('Axios Error:', {
//                  message: error.message, code: error.code, status: error.response?.status, data: error.response?.data,
//              });
//             detailedMessage = getErrorMessage(error); // Use helper
//             // Add more specific messages based on status if needed
//              if (error.response?.status === 400) detailedMessage = `Submission Error: ${error.response.data?.message || 'Please check your input.'}`;
//              else if (error.response?.status === 409) detailedMessage = `Submission Error: ${error.response.data?.message || 'Conflict (already pending/verified?).'}`;
//              else if (error.response?.status === 413) detailedMessage = `Submission Error: File size too large.`;
//              else if (error.response?.status >= 500) detailedMessage = `Server Error (${error.response.status}). Please try again later.`;
//          } else {
//              detailedMessage = `An unexpected error occurred: ${error.message || String(error)}`;
//              console.error('Non-Axios Error:', error);
//          }
//         console.error('Processed Error Message:', detailedMessage);
//         throw new Error(detailedMessage);
//     }
// };

// const skipKyc = async (): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/skip');
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     try {
//         const response = await apiClient.get<KycStatusResponse>('/kyc/status');
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// const getMyKycDetails = async (): Promise<KycDetails> => {
//      try {
//          const response = await apiClient.get<{ kyc: KycDetails }>('/users/me');
//          return response.data?.kyc || { status: 'not_started' };
//      } catch (error: any) {
//          console.warn("getMyKycDetails failed:", getErrorMessage(error));
//          return { status: 'not_started' }; // Default on error
//      }
// };

// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycUpdateResponse> => {
//     try {
//         const response = await apiClient.put<KycUpdateResponse>('/kyc/update-details', updateData);
//         return response.data;
//     } catch (error: any) {
//         throw new Error(getErrorMessage(error));
//     }
// };

// // Export the service object as the default export
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     getMyKycDetails,
//     updateMyKycDetails,
// };

// export default kycService;


// // frontend/src/app/services/kyc.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// // Define the structure for KYC form data parts
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string;
//     public_id: string;
//     uploadedAt?: string | Date;
// }

// // Structure matching the backend User model's kyc subdocument
// export interface KycDetails {
//     status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality?: string;
//     idType?: 'passport' | 'resident_permit' | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string
//     idExpiryDate?: string | Date; // API might return string
//     documents?: KycDocument[];
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }

// // Payload for initial submission (matches backend expectations)
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Send as ISO string YYYY-MM-DDTHH:mm:ss.sssZ or YYYY-MM-DD
//     mobile: KycMobile; // Send as object
//     occupation?: string;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     nationality: string;
//     idType: 'passport' | 'resident_permit';
//     idNumber: string;
//     idIssueDate: string; // Send as ISO string
//     idExpiryDate: string; // Send as ISO string
// }

// // Payload for updating editable details
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: '0-1000' | '10000-50000' | '50000-100000' | '100000+' | null;
//     occupation?: string; // Added occupation
//     // Add other editable fields if allowed by backend service
// }

// // API Response Structures
// export interface KycStatusResponse {
//     status: KycDetails['status'];
//     rejectionReason?: string | null; // Matches backend response
// }

// // Generic response for successful submission, update, skip
// export interface KycUpdateResponse {
//     message: string;
//     kyc?: KycDetails; // Backend might return updated KYC object
//     status?: KycDetails['status']; // For skip response
// }


// // --- Axios Client Setup ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl, // Uses the base URL from config
//     headers: {
//         // 'Content-Type': 'application/json', // Default, overridden for FormData
//     },
//     withCredentials: true, // Send cookies if backend uses them for session
// });

// // Request interceptor to add Authorization token from localStorage
// apiClient.interceptors.request.use(config => {
//     // Ensure this runs only on the client-side
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error('Axios request interceptor error:', error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message ---
// const getErrorMessage = (error: any): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         if (axiosError.response) {
//             // Server responded with an error status code (4xx or 5xx)
//             console.error("API Error Response:", {
//                 status: axiosError.response.status,
//                 data: axiosError.response.data,
//                 headers: axiosError.response.headers,
//             });
//             // Prefer the message from the response body
//             return axiosError.response.data?.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             // Request was made but no response received (network error, timeout)
//             console.error("API No Response Error:", axiosError.request);
//             return 'Network error or server is unreachable. Please check your connection.';
//         } else {
//             // Error setting up the request
//             console.error("API Request Setup Error:", axiosError.message);
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//         // Non-Axios error
//         console.error("Non-API Error:", error);
//         return error.message;
//     } else {
//         // Fallback for unknown errors
//         console.error("Unknown Error:", error);
//         return 'An unknown error occurred.';
//     }
// };


// // --- Service Functions ---

// /**
//  * Submits KYC data along with document files.
//  */
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null // Back file is optional
// ): Promise<KycUpdateResponse> => {
//     const formData = new FormData();

//     // Append text data - ensure dates are strings, mobile is stringified JSON
//     Object.entries(kycData).forEach(([key, value]) => {
//         if (value === undefined || value === null) return; // Skip null/undefined

//         if (key === 'mobile' && typeof value === 'object') {
//             formData.append(key, JSON.stringify(value)); // Stringify mobile object
//         } else {
//             formData.append(key, String(value)); // Convert others to string
//         }
//     });

//     // Append files
//     if (idFrontFile) {
//         formData.append('id_front', idFrontFile, idFrontFile.name);
//     } else {
//         // This should be caught earlier, but defensive check
//         throw new Error("Front ID document file is missing.");
//     }
//     if (idBackFile) {
//         formData.append('id_back', idBackFile, idBackFile.name);
//     } else if (kycData.idType === 'resident_permit') {
//          // Also should be caught earlier
//          throw new Error("Back ID document file is required for Resident Permit.");
//     }

//     console.log('[kycService] Submitting KYC FormData...');
//     try {
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/submit', formData, {
//             headers: {
//                 // Axios sets Content-Type to multipart/form-data automatically
//                 // when FormData is passed as data. Do not set it manually here.
//             },
//         });
//         console.log('[kycService] KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('[kycService] --- KYC SUBMISSION ERROR ---');
//         const errorMessage = getErrorMessage(error); // Use helper
//         console.error('[kycService] Processed Error Message:', errorMessage);
//         throw new Error(errorMessage); // Re-throw processed message
//     }
// };

// /**
//  * Sends a request to skip the KYC process.
//  */
// const skipKyc = async (): Promise<KycUpdateResponse> => {
//     console.log('[kycService] Skipping KYC process...');
//     try {
//         // Uses POST as it changes the resource state (user's kyc status)
//         const response = await apiClient.post<KycUpdateResponse>('/kyc/skip');
//         console.log('[kycService] KYC Skip Successful:', response.data);
//         return response.data; // Should contain { message, status }
//     } catch (error: any) {
//         console.error('[kycService] --- KYC SKIP ERROR ---');
//         const errorMessage = getErrorMessage(error);
//         console.error('[kycService] Processed Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
// };

// /**
//  * Fetches the current user's KYC status and rejection reason.
//  */
// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     console.log('[kycService] Fetching KYC status...');
//     try {
//         const response = await apiClient.get<KycStatusResponse>('/kyc/status');
//         console.log('[kycService] KYC Status Response:', response.data);
//         // Ensure status is always returned, default if necessary in component
//         return response.data || { status: 'not_started', rejectionReason: null };
//     } catch (error: any) {
//         console.error('[kycService] --- GET KYC STATUS ERROR ---');
//         const errorMessage = getErrorMessage(error);
//         console.error('[kycService] Processed Error Message:', errorMessage);
//         // Don't throw, return a default state on error? Or let caller handle?
//         // Let's throw, so caller knows the fetch failed.
//         throw new Error(errorMessage);
//         // Alternative: return { status: 'error', rejectionReason: null }; // Needs type update
//     }
// };

// /**
//  * Updates editable KYC details for the current user.
//  */
// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycUpdateResponse> => {
//     console.log('[kycService] Updating KYC details:', updateData);
//     try {
//         const response = await apiClient.put<KycUpdateResponse>('/kyc/update-details', updateData, {
//              headers: { 'Content-Type': 'application/json' } // Ensure JSON content type
//         });
//         console.log('[kycService] KYC Details Update Successful:', response.data);
//         return response.data; // Should contain { message, kyc }
//     } catch (error: any) {
//         console.error('[kycService] --- UPDATE KYC DETAILS ERROR ---');
//         const errorMessage = getErrorMessage(error);
//         console.error('[kycService] Processed Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
// };

// // Export the service object
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     // getMyKycDetails, // Removed - use getMyKycStatus or fetch user profile which includes KYC
//     updateMyKycDetails,
// };

// export default kycService;



// // frontend/src/app/services/kyc.ts
// // ... (kycService.ts remains the same as provided in the prompt, it was already correct)
// import axios, { AxiosError, type AxiosResponse } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// //--------------------------------------------------
// // Type Definitions (Matching Backend/API)
// //--------------------------------------------------

// // Exported here - Used for mobile number structure
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// // Exported here - Represents stored document info
// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string; // URL to the stored file (e.g., Cloudinary URL)
//     public_id: string; // Public ID for services like Cloudinary
//     uploadedAt?: string | Date; // Timestamp from backend
// }

// // Exported here - Possible KYC statuses from backend
// export type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
// // Exported here - Possible salary ranges
// export type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';
// // Exported here - Possible ID types
// export type IdType = 'passport' | 'resident_permit';

// // Exported here - Detailed structure of KYC info stored in the User model (matches backend)
// export interface KycDetails {
//     status: KycStatus;
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string or Date object if transformed
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string or Date object
//     idExpiryDate?: string | Date; // API might return string or Date object
//     documents?: KycDocument[]; // Array of uploaded document info
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }

// // Exported here - Payload for the initial KYC submission (text data part)
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Expecting YYYY-MM-DD format string
//     mobile: KycMobile; // Will be stringified before sending
//     nationality: string;
//     idType: IdType;
//     idNumber: string;
//     idIssueDate: string; // Expecting YYYY-MM-DD format string
//     idExpiryDate: string; // Expecting YYYY-MM-DD format string
//     // Optional fields
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
// }

// // Exported here - Payload for updating *editable* KYC details (if backend allows)
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: SalaryRange | null;
//     occupation?: string;
//     // Add other fields if the backend allows updating them post-submission
//     nationality?: string; // Allow updating nationality?
// }

// // API Response Structures
// // Exported here - Response structure for fetching status
// export interface KycStatusResponse {
//     status: KycStatus;
//     rejectionReason?: string | null;
// }

// // Exported here - Generic success response structure (used for submit, skip, update)
// export interface KycSuccessResponse {
//     message: string;
//     kyc?: KycDetails; // Often included on update/submit containing the updated state
//     status?: KycStatus; // Included on skip to confirm the new status
// }

// // Exported here - Interface for structured API errors (assuming backend sends this on failure)
// export interface ApiErrorResponse {
//     message: string;
//     // Optional: Field-specific errors map { fieldName: errorMessage }
//     errors?: Record<string, string>;
//     status?: number; // HTTP status code might be included
// }

// //--------------------------------------------------
// // Axios Client Setup
// //--------------------------------------------------
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     // REMOVED Default Content-Type header
//     headers: {
//          Accept: 'application/json',
//     },
//     withCredentials: true,
// });

// // Request Interceptor
// apiClient.interceptors.request.use(
//     (config) => {
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('token');
//             if (token && config.headers) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         // console.log('[Axios Interceptor] Request Headers:', config.headers); // Keep commented unless debugging
//         return config;
//     },
//     (error) => {
//         console.error('Axios request interceptor error:', error);
//         return Promise.reject(error);
//     }
// );

// //--------------------------------------------------
// // Error Handling Helper
// //--------------------------------------------------
// const getApiErrorMessage = (error: unknown): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<ApiErrorResponse>;
//         if (axiosError.response) {
//             const status = axiosError.response.status;
//             const responseData = axiosError.response.data;
//             console.error(`API Error Response (Status ${status}):`, responseData);
//             if (responseData?.message) {
//                 return responseData.message;
//             }
//             return axiosError.message || `Request failed with status ${status}`;
//         } else if (axiosError.request) {
//             console.error("API No Response Error:", axiosError.request);
//             return 'Network error or server is unreachable.';
//         } else {
//             console.error("API Request Setup Error:", axiosError.message);
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//         console.error("Non-API Error:", error);
//         return error.message;
//     } else {
//         console.error("Unknown Error Type:", error);
//         return 'An unexpected error occurred.';
//     }
// };

// //--------------------------------------------------
// // KYC Service Functions
// //--------------------------------------------------

// /**
//  * Submits KYC data along with document files using FormData.
//  */
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null
// ): Promise<KycSuccessResponse> => {
//     const formData = new FormData();
//     console.log('[kycService] Preparing FormData for submission...');

//     // 1. Append text data fields
//     Object.entries(kycData).forEach(([key, value]) => {
//         if (value === undefined || value === null) { return; }
//         const fieldName = key;
//         let fieldValue: string;
//         if (key === 'mobile' && typeof value === 'object') { fieldValue = JSON.stringify(value); }
//         else { fieldValue = String(value); }
//         formData.append(fieldName, fieldValue);
//         // console.log(`[kycService] Appending ${fieldName}: ${fieldValue}`); // Optional: Keep for debug if needed
//     });

//     // 2. Append file fields
//     const frontFileFieldName = 'id_front';
//     const backFileFieldName = 'id_back';
//     if (idFrontFile instanceof File) {
//         console.log(`[kycService] Appending file ${frontFileFieldName}: ${idFrontFile.name}`);
//         formData.append(frontFileFieldName, idFrontFile, idFrontFile.name);
//     } else {
//         console.error("[kycService] ERROR: idFrontFile is not a valid File object!", idFrontFile);
//         throw new Error("Internal Error: Front ID document is missing or invalid.");
//     }
//     if (idBackFile instanceof File && kycData.idType === 'resident_permit') {
//         console.log(`[kycService] Appending file ${backFileFieldName}: ${idBackFile.name}`);
//         formData.append(backFileFieldName, idBackFile, idBackFile.name);
//     } else if (!idBackFile && kycData.idType === 'resident_permit') {
//         console.error("[kycService] ERROR: idBackFile missing for resident_permit.");
//         throw new Error("Internal Error: Back ID document is missing for Resident Permit.");
//     }

//     try {
//         console.log('[kycService] Attempting POST /kyc/submit with FormData...');
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.post(
//             '/kyc/submit',
//             formData
//             // No explicit headers object here for Content-Type (browser sets it for FormData)
//         );
//         console.log('[kycService] KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] --- KYC SUBMISSION HTTP ERROR ---');
//         const errorMessage = getApiErrorMessage(error);
//         console.error('[kycService] Processed Submission Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
// };

// /**
//  * Sends a request to mark the KYC process as skipped by the user.
//  */
// const skipKyc = async (): Promise<KycSuccessResponse> => {
//     console.log('[kycService] Skipping KYC process...');
//     try {
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.post('/kyc/skip');
//         console.log('[kycService] KYC Skip Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] KYC Skip Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         console.error('[kycService] Processed Skip Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
//  };

// /**
//  * Fetches the current user's KYC status and rejection reason, if applicable.
//  */
// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     console.log('[kycService] Fetching KYC status...');
//     try {
//         const response: AxiosResponse<KycStatusResponse> = await apiClient.get('/kyc/status');
//         console.log('[kycService] KYC Status Response:', response.data);
//         // Provide default if backend returns empty success response for 'not_started'
//         return response.data || { status: 'not_started', rejectionReason: null };
//     } catch (error: unknown) {
//         console.error('[kycService] Get KYC Status Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         console.error('[kycService] Processed Status Error Message:', errorMessage);
//         // If status fails, maybe default to 'not_started' or rethrow depending on desired UX
//         throw new Error(errorMessage); // Rethrowing is usually safer
//     }
//  };

// /**
//  * Updates editable KYC details for the current user (if backend allows).
//  */
// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycSuccessResponse> => {
//     console.log('[kycService] Updating KYC details:', updateData);
//     try {
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.put(
//             '/kyc/update-details',
//             updateData,
//             { headers: { 'Content-Type': 'application/json' } } // Explicit JSON header for this request
//         );
//         console.log('[kycService] KYC Details Update Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] Update KYC Details Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         console.error('[kycService] Processed Update Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
//  };


// // Export the service object containing all methods as the default export
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     updateMyKycDetails,
// };

// export default kycService;

// // frontend/src/app/services/kyc.ts
// import axios, { AxiosError, type AxiosResponse } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path as necessary

// //--------------------------------------------------
// // Type Definitions (Matching Backend/API)
// //--------------------------------------------------

// // Exported here - Used for mobile number structure
// export interface KycMobile {
//     countryCode: string;
//     number: string;
// }

// // Exported here - Represents stored document info
// export interface KycDocument {
//     docType: 'id_front' | 'id_back';
//     url: string; // URL to the stored file (e.g., Cloudinary URL)
//     public_id: string; // Public ID for services like Cloudinary
//     uploadedAt?: string | Date; // Timestamp from backend
// }

// // Exported here - Possible KYC statuses from backend
// export type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
// // Exported here - Possible salary ranges
// export type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';
// // Exported here - Possible ID types
// export type IdType = 'passport' | 'resident_permit';

// // Exported here - Detailed structure of KYC info stored in the User model (matches backend)
// export interface KycDetails {
//     status: KycStatus;
//     firstName?: string;
//     lastName?: string;
//     dateOfBirth?: string | Date; // API might return string or Date object if transformed
//     mobile?: KycMobile;
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
//     nationality?: string;
//     idType?: IdType | null;
//     idNumber?: string;
//     idIssueDate?: string | Date; // API might return string or Date object
//     idExpiryDate?: string | Date; // API might return string or Date object
//     documents?: KycDocument[]; // Array of uploaded document info
//     submittedAt?: string | Date;
//     verifiedAt?: string | Date;
//     rejectedAt?: string | Date;
//     rejectionReason?: string | null;
//     lastUpdatedAt?: string | Date;
// }

// // Exported here - Payload for the initial KYC submission (text data part)
// export interface KycSubmissionPayload {
//     firstName: string;
//     lastName: string;
//     dateOfBirth: string; // Expecting YYYY-MM-DD format string
//     mobile: KycMobile; // Will be stringified before sending
//     nationality: string;
//     idType: IdType;
//     idNumber: string;
//     idIssueDate: string; // Expecting YYYY-MM-DD format string
//     idExpiryDate: string; // Expecting YYYY-MM-DD format string
//     // Optional fields
//     occupation?: string;
//     salaryRange?: SalaryRange | null;
// }

// // Exported here - Payload for updating *editable* KYC details (if backend allows)
// export interface UpdateDetailsPayload {
//     firstName?: string;
//     lastName?: string;
//     mobile?: KycMobile;
//     salaryRange?: SalaryRange | null;
//     occupation?: string;
//     // Add other fields if the backend allows updating them post-submission
//     nationality?: string; // Allow updating nationality?
// }

// // API Response Structures
// // Exported here - Response structure for fetching status
// export interface KycStatusResponse {
//     status: KycStatus;
//     rejectionReason?: string | null;
// }

// // Exported here - Generic success response structure (used for submit, skip, update)
// export interface KycSuccessResponse {
//     message: string;
//     kyc?: KycDetails; // Often included on update/submit containing the updated state
//     status?: KycStatus; // Included on skip to confirm the new status
// }

// // Exported here - Interface for structured API errors (assuming backend sends this on failure)
// export interface ApiErrorResponse {
//     message: string;
//     // Optional: Field-specific errors map { fieldName: errorMessage }
//     errors?: Record<string, string>;
//     status?: number; // HTTP status code might be included
// }

// //--------------------------------------------------
// // Axios Client Setup
// //--------------------------------------------------
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     // REMOVED Default Content-Type header - Let browser set for FormData, specify JSON manually otherwise
//     headers: {
//          Accept: 'application/json', // Expect JSON responses
//     },
//     withCredentials: true, // Send cookies if needed
// });

// // Request Interceptor: Add Auth Token
// apiClient.interceptors.request.use(
//     (config) => {
//         // Ensure this runs only client-side
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('token');
//             if (token && config.headers) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         // console.log('[kycService Axios Req] URL:', config.url, 'Headers:', config.headers);
//         return config;
//     },
//     (error) => {
//         console.error('kycService Axios request interceptor error:', error);
//         return Promise.reject(error);
//     }
// );

// //--------------------------------------------------
// // Error Handling Helper
// //--------------------------------------------------
// const getApiErrorMessage = (error: unknown): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<ApiErrorResponse>;
//         const responseData = axiosError.response?.data;
//         const status = axiosError.response?.status;

//         // Log detailed error info
//         console.error(`[kycService] API Error: Status ${status}, URL: ${axiosError.config?.url}`, {
//             requestData: axiosError.config?.data,
//             responseData: responseData,
//             axiosErrorMessage: axiosError.message,
//         });

//         // Prefer backend message
//         if (responseData?.message) {
//             // Combine with field errors if available
//             if (responseData.errors) {
//                 const fieldErrors = Object.entries(responseData.errors)
//                     .map(([field, msg]) => `${field}: ${msg}`)
//                     .join(', ');
//                 return `${responseData.message} (${fieldErrors})`;
//             }
//             return responseData.message;
//         }
//         // Fallback to generic Axios messages
//         if (axiosError.response) {
//             return `Request failed with status ${status}`;
//         } else if (axiosError.request) {
//             return 'Network error or server is unreachable. Please check your connection.';
//         } else {
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//         console.error("[kycService] Non-API Error:", error);
//         return error.message;
//     } else {
//         console.error("[kycService] Unknown Error Type:", error);
//         return 'An unexpected error occurred.';
//     }
// };

// //--------------------------------------------------
// // KYC Service Functions
// //--------------------------------------------------

// /**
//  * Submits KYC data along with document files using FormData.
//  */
// const submitKyc = async (
//     kycData: KycSubmissionPayload,
//     idFrontFile: File,
//     idBackFile: File | null // Allow null explicitly
// ): Promise<KycSuccessResponse> => {
//     const formData = new FormData();
//     // console.log('[kycService] Preparing FormData for submission...');

//     // 1. Append text data fields
//     // Use optional chaining and nullish coalescing for safer access
//     formData.append('firstName', kycData.firstName ?? '');
//     formData.append('lastName', kycData.lastName ?? '');
//     formData.append('dateOfBirth', kycData.dateOfBirth ?? ''); // Expecting YYYY-MM-DD
//     formData.append('mobile', JSON.stringify(kycData.mobile ?? {})); // Stringify mobile object
//     formData.append('nationality', kycData.nationality ?? '');
//     formData.append('idType', kycData.idType ?? '');
//     formData.append('idNumber', kycData.idNumber ?? '');
//     formData.append('idIssueDate', kycData.idIssueDate ?? ''); // Expecting YYYY-MM-DD
//     formData.append('idExpiryDate', kycData.idExpiryDate ?? ''); // Expecting YYYY-MM-DD

//     // Append optional fields only if they have a value
//     if (kycData.occupation) formData.append('occupation', kycData.occupation);
//     if (kycData.salaryRange) formData.append('salaryRange', kycData.salaryRange);

//     // 2. Append file fields (ensure they are File objects)
//     const frontFileFieldName = 'id_front'; // Match backend expected field name
//     const backFileFieldName = 'id_back';   // Match backend expected field name

//     if (idFrontFile instanceof File) {
//         // console.log(`[kycService] Appending file ${frontFileFieldName}: ${idFrontFile.name}`);
//         formData.append(frontFileFieldName, idFrontFile, idFrontFile.name);
//     } else {
//         // This should ideally be caught by form validation earlier
//         console.error("[kycService] ERROR: idFrontFile is missing or not a File object.");
//         throw new Error("Front ID document is missing or invalid.");
//     }

//     // Append back file only if it's provided and required for the ID type
//     // (Assuming backend handles the logic of whether it's needed based on idType)
//     if (idBackFile instanceof File) {
//          // console.log(`[kycService] Appending file ${backFileFieldName}: ${idBackFile.name}`);
//          formData.append(backFileFieldName, idBackFile, idBackFile.name);
//     }

//     try {
//         // console.log('[kycService] Attempting POST /kyc/submit with FormData...');
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.post(
//             '/kyc/submit',
//             formData
//             // No explicit Content-Type header - Browser sets it correctly for FormData
//         );
//         // console.log('[kycService] KYC Submission Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] --- KYC SUBMISSION HTTP ERROR ---');
//         const errorMessage = getApiErrorMessage(error);
//         // console.error('[kycService] Processed Submission Error Message:', errorMessage);
//         // Throw the processed error message for the UI to catch
//         throw new Error(errorMessage);
//     }
// };

// /**
//  * Sends a request to mark the KYC process as skipped by the user.
//  */
// const skipKyc = async (): Promise<KycSuccessResponse> => {
//     // console.log('[kycService] Skipping KYC process...');
//     try {
//         // No payload needed for skip
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.post('/kyc/skip');
//         // console.log('[kycService] KYC Skip Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] KYC Skip Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         // console.error('[kycService] Processed Skip Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
//  };

// /**
//  * Fetches the current user's KYC status and rejection reason, if applicable.
//  */
// const getMyKycStatus = async (): Promise<KycStatusResponse> => {
//     // console.log('[kycService] Fetching KYC status...');
//     try {
//         const response: AxiosResponse<KycStatusResponse> = await apiClient.get('/kyc/status');
//         // console.log('[kycService] KYC Status Response:', response.data);
//         // Handle cases where backend might return empty success (e.g., 200 OK with no body)
//         // Ensure a valid status is always returned.
//         if (response.data && response.data.status) {
//              return response.data;
//         } else {
//              // If no status returned but request was successful, assume 'not_started'
//              console.warn("[kycService] getMyKycStatus received success response but no status data. Assuming 'not_started'.");
//              return { status: 'not_started', rejectionReason: null };
//         }
//     } catch (error: unknown) {
//         console.error('[kycService] Get KYC Status Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         // console.error('[kycService] Processed Status Error Message:', errorMessage);
//         // Decide fallback behavior: rethrow, or return a default error state?
//         // Rethrowing is generally better to let the caller handle the failure explicitly.
//         throw new Error(errorMessage);
//     }
//  };

// /**
//  * Updates editable KYC details for the current user (if backend allows).
//  */
// const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycSuccessResponse> => {
//     console.log('[kycService] Updating KYC details:', updateData);
//     try {
//         const response: AxiosResponse<KycSuccessResponse> = await apiClient.put(
//             '/kyc/update-details',
//             updateData,
//             // Explicitly set Content-Type for PUT request with JSON body
//             { headers: { 'Content-Type': 'application/json' } }
//         );
//         console.log('[kycService] KYC Details Update Successful:', response.data);
//         return response.data;
//     } catch (error: unknown) {
//         console.error('[kycService] Update KYC Details Error:', error);
//         const errorMessage = getApiErrorMessage(error);
//         // console.error('[kycService] Processed Update Error Message:', errorMessage);
//         throw new Error(errorMessage);
//     }
//  };


// // Export the service object containing all methods
// const kycService = {
//     submitKyc,
//     skipKyc,
//     getMyKycStatus,
//     updateMyKycDetails,
// };

// export default kycService;



// frontend/src/app/services/kyc.ts
// (No changes needed, keeping the original file content)
import axios, { AxiosError, type AxiosResponse } from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path as necessary

//--------------------------------------------------
// Type Definitions (Matching Backend/API)
//--------------------------------------------------

// Exported here - Used for mobile number structure
export interface KycMobile {
    countryCode: string;
    number: string;
}

// Exported here - Represents stored document info
export interface KycDocument {
    docType: 'id_front' | 'id_back';
    url: string; // URL to the stored file (e.g., Cloudinary URL)
    public_id: string; // Public ID for services like Cloudinary
    uploadedAt?: string | Date; // Timestamp from backend
}

// Exported here - Possible KYC statuses from backend
export type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
// Exported here - Possible salary ranges
export type SalaryRange = '0-1000' | '10000-50000' | '50000-100000' | '100000+';
// Exported here - Possible ID types
export type IdType = 'passport' | 'resident_permit';

// Exported here - Detailed structure of KYC info stored in the User model (matches backend)
export interface KycDetails {
    status: KycStatus;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string | Date; // API might return string or Date object if transformed
    mobile?: KycMobile;
    occupation?: string;
    salaryRange?: SalaryRange | null;
    nationality?: string;
    idType?: IdType | null;
    idNumber?: string;
    idIssueDate?: string | Date; // API might return string or Date object
    idExpiryDate?: string | Date; // API might return string or Date object
    documents?: KycDocument[]; // Array of uploaded document info
    submittedAt?: string | Date;
    verifiedAt?: string | Date;
    rejectedAt?: string | Date;
    rejectionReason?: string | null;
    lastUpdatedAt?: string | Date;
}

// Exported here - Payload for the initial KYC submission (text data part)
export interface KycSubmissionPayload {
    firstName: string;
    lastName: string;
    dateOfBirth: string; // Expecting YYYY-MM-DD format string
    mobile: KycMobile; // Will be stringified before sending
    nationality: string;
    idType: IdType;
    idNumber: string;
    idIssueDate: string; // Expecting YYYY-MM-DD format string
    idExpiryDate: string; // Expecting YYYY-MM-DD format string
    // Optional fields
    occupation?: string;
    salaryRange?: SalaryRange | null;
}

// Exported here - Payload for updating *editable* KYC details (if backend allows)
export interface UpdateDetailsPayload {
    firstName?: string; // Optional because user might only change phone
    lastName?: string;
    nationality?: string; // Added nationality
    mobile?: KycMobile;
    occupation?: string;
    salaryRange?: SalaryRange | null; // If you add salary range update
}

// API Response Structures
// Exported here - Response structure for fetching status
export interface KycStatusResponse {
    status: KycStatus;
    rejectionReason?: string | null;
}

// Exported here - Generic success response structure (used for submit, skip, update)
export interface KycSuccessResponse {
    message: string;
    kyc?: KycDetails; // Often included on update/submit containing the updated state
    status?: KycStatus; // Included on skip to confirm the new status
}

// Exported here - Interface for structured API errors (assuming backend sends this on failure)
export interface ApiErrorResponse {
    message: string;
    // Optional: Field-specific errors map { fieldName: errorMessage }
    errors?: Record<string, string>;
    status?: number; // HTTP status code might be included
}

//--------------------------------------------------
// Axios Client Setup
//--------------------------------------------------
const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    // REMOVED Default Content-Type header - Let browser set for FormData, specify JSON manually otherwise
    headers: {
         Accept: 'application/json', // Expect JSON responses
    },
    withCredentials: true, // Send cookies if needed
});

// Request Interceptor: Add Auth Token
apiClient.interceptors.request.use(
    (config) => {
        // Ensure this runs only client-side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        // console.log('[kycService Axios Req] URL:', config.url, 'Headers:', config.headers);
        return config;
    },
    (error) => {
        console.error('kycService Axios request interceptor error:', error);
        return Promise.reject(error);
    }
);

//--------------------------------------------------
// Error Handling Helper
//--------------------------------------------------
const getApiErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const responseData = axiosError.response?.data;
        const status = axiosError.response?.status;

        // Log detailed error info
        console.error(`[kycService] API Error: Status ${status}, URL: ${axiosError.config?.url}`, {
            requestData: axiosError.config?.data,
            responseData: responseData,
            axiosErrorMessage: axiosError.message,
        });

        // Prefer backend message
        if (responseData?.message) {
            // Combine with field errors if available
            if (responseData.errors) {
                const fieldErrors = Object.entries(responseData.errors)
                    .map(([field, msg]) => `${field}: ${msg}`)
                    .join(', ');
                return `${responseData.message} (${fieldErrors})`;
            }
            return responseData.message;
        }
        // Fallback to generic Axios messages
        if (axiosError.response) {
            return `Request failed with status ${status}`;
        } else if (axiosError.request) {
            return 'Network error or server is unreachable. Please check your connection.';
        } else {
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        console.error("[kycService] Non-API Error:", error);
        return error.message;
    } else {
        console.error("[kycService] Unknown Error Type:", error);
        return 'An unexpected error occurred.';
    }
};

//--------------------------------------------------
// KYC Service Functions
//--------------------------------------------------

/**
 * Submits KYC data along with document files using FormData.
 */
const submitKyc = async (
    kycData: KycSubmissionPayload,
    idFrontFile: File,
    idBackFile: File | null // Allow null explicitly
): Promise<KycSuccessResponse> => {
    const formData = new FormData();
    // console.log('[kycService] Preparing FormData for submission...');

    // 1. Append text data fields
    // Use optional chaining and nullish coalescing for safer access
    formData.append('firstName', kycData.firstName ?? '');
    formData.append('lastName', kycData.lastName ?? '');
    formData.append('dateOfBirth', kycData.dateOfBirth ?? ''); // Expecting YYYY-MM-DD
    formData.append('mobile', JSON.stringify(kycData.mobile ?? {})); // Stringify mobile object
    formData.append('nationality', kycData.nationality ?? '');
    formData.append('idType', kycData.idType ?? '');
    formData.append('idNumber', kycData.idNumber ?? '');
    formData.append('idIssueDate', kycData.idIssueDate ?? ''); // Expecting YYYY-MM-DD
    formData.append('idExpiryDate', kycData.idExpiryDate ?? ''); // Expecting YYYY-MM-DD

    // Append optional fields only if they have a value
    if (kycData.occupation) formData.append('occupation', kycData.occupation);
    if (kycData.salaryRange) formData.append('salaryRange', kycData.salaryRange);

    // 2. Append file fields (ensure they are File objects)
    const frontFileFieldName = 'id_front'; // Match backend expected field name
    const backFileFieldName = 'id_back';   // Match backend expected field name

    if (idFrontFile instanceof File) {
        // console.log(`[kycService] Appending file ${frontFileFieldName}: ${idFrontFile.name}`);
        formData.append(frontFileFieldName, idFrontFile, idFrontFile.name);
    } else {
        // This should ideally be caught by form validation earlier
        console.error("[kycService] ERROR: idFrontFile is missing or not a File object.");
        throw new Error("Front ID document is missing or invalid.");
    }

    // Append back file only if it's provided and required for the ID type
    // (Assuming backend handles the logic of whether it's needed based on idType)
    if (idBackFile instanceof File) {
         // console.log(`[kycService] Appending file ${backFileFieldName}: ${idBackFile.name}`);
         formData.append(backFileFieldName, idBackFile, idBackFile.name);
    }

    try {
        // console.log('[kycService] Attempting POST /kyc/submit with FormData...');
        const response: AxiosResponse<KycSuccessResponse> = await apiClient.post(
            '/kyc/submit',
            formData
            // No explicit Content-Type header - Browser sets it correctly for FormData
        );
        // console.log('[kycService] KYC Submission Successful:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('[kycService] --- KYC SUBMISSION HTTP ERROR ---');
        const errorMessage = getApiErrorMessage(error);
        // console.error('[kycService] Processed Submission Error Message:', errorMessage);
        // Throw the processed error message for the UI to catch
        throw new Error(errorMessage);
    }
};

/**
 * Sends a request to mark the KYC process as skipped by the user.
 */
const skipKyc = async (): Promise<KycSuccessResponse> => {
    // console.log('[kycService] Skipping KYC process...');
    try {
        // No payload needed for skip
        const response: AxiosResponse<KycSuccessResponse> = await apiClient.post('/kyc/skip');
        // console.log('[kycService] KYC Skip Successful:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('[kycService] KYC Skip Error:', error);
        const errorMessage = getApiErrorMessage(error);
        // console.error('[kycService] Processed Skip Error Message:', errorMessage);
        throw new Error(errorMessage);
    }
 };

/**
 * Fetches the current user's KYC status and rejection reason, if applicable.
 */
const getMyKycStatus = async (): Promise<KycStatusResponse> => {
    // console.log('[kycService] Fetching KYC status...');
    try {
        const response: AxiosResponse<KycStatusResponse> = await apiClient.get('/kyc/status');
        // console.log('[kycService] KYC Status Response:', response.data);
        // Handle cases where backend might return empty success (e.g., 200 OK with no body)
        // Ensure a valid status is always returned.
        if (response.data && response.data.status) {
             return response.data;
        } else {
             // If no status returned but request was successful, assume 'not_started'
             console.warn("[kycService] getMyKycStatus received success response but no status data. Assuming 'not_started'.");
             return { status: 'not_started', rejectionReason: null };
        }
    } catch (error: unknown) {
        console.error('[kycService] Get KYC Status Error:', error);
        const errorMessage = getApiErrorMessage(error);
        // console.error('[kycService] Processed Status Error Message:', errorMessage);
        // Decide fallback behavior: rethrow, or return a default error state?
        // Rethrowing is generally better to let the caller handle the failure explicitly.
        throw new Error(errorMessage);
    }
 };

/**
 * Updates editable KYC details for the current user (if backend allows).
 */
const updateMyKycDetails = async (updateData: UpdateDetailsPayload): Promise<KycSuccessResponse> => {
    console.log('[kycService] Updating KYC details:', updateData);
    try {
        const response: AxiosResponse<KycSuccessResponse> = await apiClient.put(
            '/kyc/update-details',
            updateData,
            // Explicitly set Content-Type for PUT request with JSON body
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('[kycService] KYC Details Update Successful:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('[kycService] Update KYC Details Error:', error);
        const errorMessage = getApiErrorMessage(error);
        // console.error('[kycService] Processed Update Error Message:', errorMessage);
        throw new Error(errorMessage);
    }
 };


// Export the service object containing all methods
const kycService = {
    submitKyc,
    skipKyc,
    getMyKycStatus,
    updateMyKycDetails,
};

export default kycService;