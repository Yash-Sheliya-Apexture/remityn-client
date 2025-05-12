// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define interfaces if needed (e.g., SendSummary, TransferDetails)

// const calculateSendSummary = async (data: {
//     sourceAccountId: string;
//     recipientId: string;
//     amount: number;
//     isSendingAmount: boolean;
// }, token: string | null): Promise<any> => { // Use specific type instead of any
//     const response = await axios.post('/transfers/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (transferData: any, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.post('/transfers/execute', transferData, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (transferId: string, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.get(`/transfers/${transferId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getUserTransfers = async (token: string | null): Promise<any[]> => { // Use specific type array
//      const response = await axios.get('/transfers', {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };


// export default {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
// };




// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define interfaces if needed (e.g., SendSummary, TransferDetails)

// const calculateSendSummary = async (data: {
//     sourceAccountId: string;
//     recipientId: string;
//     amount: number;
//     isSendingAmount: boolean;
// }, token: string | null): Promise<any> => { // Use specific type instead of any
//     const response = await axios.post('/transfers/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (transferData: any, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.post('/transfers/execute', transferData, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (transferId: string, token: string | null): Promise<any> => { // Use specific type
//      const response = await axios.get(`/transfers/${transferId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getUserTransfers = async (token: string | null): Promise<any[]> => { // Use specific type array
//      const response = await axios.get('/transfers', {
//         headers: { Authorization: `Bearer ${token}` },
//         // Ensure token is passed in headers for protected routes
//         ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
//     });
//     return response.data;
// };
// const cancelTransfer = async (transferId: string, token: string | null): Promise<any> => { // Return type might be void or specific confirmation
//     if (!transferId || !token) {
//         throw new Error("Transfer ID and authentication token are required.");
//     }
//     try {
//         // --- Adjust HTTP method (POST or DELETE) and endpoint as per your backend ---
//         // Example using POST:
//         const response = await axios.post(`/transfers/${transferId}/cancel`, {}, { // Empty body if no data needed
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log(`Cancellation response for ${transferId}:`, response.data);
//         return response.data; // Return backend confirmation if any
//     } catch (error: any) {
//         console.error(`API Error cancelling transfer ${transferId}:`, error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || 'Failed to cancel transfer. Please try again.');
//     }
// };

// export default {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
//     cancelTransfer,
// };

// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Define Currency Object Structure (Matches Transaction type) ---
// // You can reuse the Currency type from transaction.ts if it matches
// interface CurrencyObject {
//     _id: string;
//     code: string;
//     // Add other fields if returned by the API (currencyName, flagImage, etc.)
// }

// // --- Define Recipient Structure (Example) ---
// interface RecipientDetails {
//     _id: string;
//     accountHolderName: string;
//     // Add other recipient fields if needed (email, account number etc.)
// }

// // --- Define Source Account Structure (Example) ---
// interface SourceAccountDetails {
//     _id: string;
//     // Add other account fields if needed (account number, type etc.)
// }

// // --- Define the structure for a single transfer details response ---
// export interface TransferDetailsResponse {
//     _id: string;
//     status: string; // API returns string, will be asserted later
//     sendAmount: number;
//     receiveAmount?: number; // Optional?
//     sendCurrency: CurrencyObject; // Expecting full object from API
//     receiveCurrency?: CurrencyObject; // Optional? Expecting full object
//     recipient: RecipientDetails | string; // Can be populated object or just ID string
//     sourceAccount: SourceAccountDetails | string; // Can be populated object or just ID string
//     createdAt: string;
//     updatedAt: string;
//     // Add any other relevant fields returned by the API
//     type?: string; // Maybe the API includes a type?
//     exchangeRate?: number;
//     fee?: number;
// }

// // --- Define the structure for Calculate Summary Response (Example) ---
// export interface SendSummaryResponse {
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     fee: number;
//     rate: number;
//     estimatedDelivery?: string; // Optional
//     // Add other relevant summary fields
// }

// // --- Define the structure for Execute Transfer Request (Example) ---
// export interface ExecuteTransferData {
//     sourceAccountId: string;
//     recipientId: string;
//     sendAmount?: number; // Send either sendAmount or receiveAmount
//     receiveAmount?: number;
//     isSendingAmount: boolean; // To clarify which amount is fixed
//     // You might need quoteId or summary details here depending on backend
//     reference?: string; // Optional
// }

// // --- Define the structure for Execute Transfer Response (Example) ---
// export interface ExecuteTransferResponse {
//     transferId: string;
//     status: string; // e.g., "pending", "processing"
//     message: string;
//     // Include details of the created transfer if returned
//     transfer?: TransferDetailsResponse; // Optional
// }

// // --- Define the structure for Cancel Transfer Response (Example) ---
// export interface CancelTransferResponse {
//     message: string;
//     status?: string; // Optional: new status if returned
// }


// // --- Service Functions with Typing ---

// const calculateSendSummary = async (data: {
//     sourceAccountId: string;
//     recipientId: string;
//     amount: number;
//     isSendingAmount: boolean;
// }, token: string | null): Promise<SendSummaryResponse> => { // Use specific type
//     const response = await axios.post('/transfers/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (transferData: ExecuteTransferData, token: string | null): Promise<ExecuteTransferResponse> => { // Use specific type
//      const response = await axios.post('/transfers/execute', transferData, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (transferId: string, token: string | null): Promise<TransferDetailsResponse> => { // Use specific type
//      const response = await axios.get(`/transfers/${transferId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  // The list endpoint likely returns an array of transfer details
//  const getUserTransfers = async (token: string | null): Promise<TransferDetailsResponse[]> => { // Use specific type array
//      const response = await axios.get('/transfers', {
//         // Combine headers correctly
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     // Assuming the API returns an array directly in the data property
//     // If it's nested like { transfers: [...] }, adjust accordingly: return response.data.transfers;
//     return response.data;
// };

// const cancelTransfer = async (transferId: string, token: string | null): Promise<CancelTransferResponse> => { // Use specific type
//     if (!transferId || !token) {
//         throw new Error("Transfer ID and authentication token are required.");
//     }
//     try {
//         const response = await axios.post(`/transfers/${transferId}/cancel`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(`Cancellation response for ${transferId}:`, response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error(`API Error cancelling transfer ${transferId}:`, error.response?.data || error.message);
//         // Rethrow a more specific error if possible
//         const message = error.response?.data?.message || 'Failed to cancel transfer. Please try again.';
//         throw new Error(message);
//     }
// };

// export default {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
//     cancelTransfer,
// };





// frontend/src/services/transfer.ts
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Define Currency Object Structure (Matches Transaction type) ---
// You can reuse the Currency type from transaction.ts if it matches
interface CurrencyObject {
    _id: string;
    code: string;
    // Add other fields if returned by the API (currencyName, flagImage, etc.)
}

// --- Define Recipient Structure (Example) ---
interface RecipientDetails {
    _id: string;
    accountHolderName: string;
    // Add other recipient fields if needed (email, account number etc.)
}

// --- Define Source Account Structure (Example) ---
interface SourceAccountDetails {
    _id: string;
    // Add other account fields if needed (account number, type etc.)
}

// --- Define the structure for a single transfer details response ---
export interface TransferDetailsResponse {
    _id: string;
    status: string; // API returns string, will be asserted later
    sendAmount: number;
    receiveAmount?: number; // Optional?
    sendCurrency: CurrencyObject; // Expecting full object from API
    receiveCurrency?: CurrencyObject; // Optional? Expecting full object
    recipient: RecipientDetails | string; // Can be populated object or just ID string
    sourceAccount: SourceAccountDetails | string; // Can be populated object or just ID string
    createdAt: string;
    updatedAt: string;
    // Add any other relevant fields returned by the API
    type?: string; // Maybe the API includes a type?
    exchangeRate?: number;
    fee?: number;
}

// --- Define the structure for Calculate Summary Response (Example) ---
export interface SendSummaryResponse {
    sendAmount: number;
    receiveAmount: number;
    sendCurrencyCode: string;
    receiveCurrencyCode: string;
    fee: number;
    rate: number;
    estimatedDelivery?: string; // Optional
    // Add other relevant summary fields
}

// --- Define the structure for Execute Transfer Request (Example) ---
export interface ExecuteTransferData {
    sourceAccountId: string;
    recipientId: string;
    sendAmount?: number; // Send either sendAmount or receiveAmount
    receiveAmount?: number;
    isSendingAmount: boolean; // To clarify which amount is fixed
    // You might need quoteId or summary details here depending on backend
    reference?: string; // Optional
}

// --- Define the structure for Execute Transfer Response (Example) ---
export interface ExecuteTransferResponse {
    transferId: string;
    status: string; // e.g., "pending", "processing"
    message: string;
    // Include details of the created transfer if returned
    transfer?: TransferDetailsResponse; // Optional
}

// --- Define the structure for Cancel Transfer Response (Example) ---
export interface CancelTransferResponse {
    message: string;
    status?: string; // Optional: new status if returned
}


// --- Service Functions with Typing ---

const calculateSendSummary = async (data: {
    sourceAccountId: string;
    recipientId: string;
    amount: number;
    isSendingAmount: boolean;
}, token: string | null): Promise<SendSummaryResponse> => { // Use specific type
    const response = await axios.post('/transfers/calculate-summary', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const executeTransfer = async (transferData: ExecuteTransferData, token: string | null): Promise<ExecuteTransferResponse> => { // Use specific type
     const response = await axios.post('/transfers/execute', transferData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

 const getTransferDetails = async (transferId: string, token: string | null): Promise<TransferDetailsResponse> => { // Use specific type
     const response = await axios.get(`/transfers/${transferId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

 // The list endpoint likely returns an array of transfer details
 const getUserTransfers = async (token: string | null): Promise<TransferDetailsResponse[]> => { // Use specific type array
     const response = await axios.get('/transfers', {
        // Combine headers correctly
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    // Assuming the API returns an array directly in the data property
    // If it's nested like { transfers: [...] }, adjust accordingly: return response.data.transfers;
    return response.data;
};

// --- START FIX: Enhance cancelTransfer error handling ---
const cancelTransfer = async (transferId: string, token: string | null): Promise<CancelTransferResponse> => {
    if (!transferId || !token) {
        throw new Error("Transfer ID and authentication token are required.");
    }
    try {
        const response = await axios.post<CancelTransferResponse>(`/transfers/${transferId}/cancel`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`Cancellation response for ${transferId}:`, response.data);
        return response.data;
    } catch (error: unknown) {
        let specificMessage = 'Failed to cancel transfer. Please try again.'; // Default message
        let responseData: any = null; // Variable to hold response data for logging

        // Check if it's an Axios error with a response
        if (axios.isAxiosError(error) && error.response) {
            responseData = error.response.data; // Capture the data
            // Attempt to extract the specific message from backend
            specificMessage = responseData?.message || specificMessage;
            console.error(
                `API Error cancelling transfer ${transferId} (Status: ${error.response.status}). Received data:`,
                responseData // Log the actual received data
            );
        } else if (error instanceof Error) {
            // Use message from standard Error object
            specificMessage = error.message;
            console.error(`Non-API Error cancelling transfer ${transferId}:`, error.message);
        } else {
            // Fallback for unknown error types
            console.error(`Unknown error cancelling transfer ${transferId}:`, error);
        }

        // Throw a new error using the *extracted* specific message
        console.log(`Throwing error with message: "${specificMessage}"`); // Log the final message being thrown
        throw new Error(specificMessage);
    }
};
// --- END FIX ---

export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
    cancelTransfer,
};


// // frontend/src/services/transfer.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// // Import the defined interfaces
// import {
//     SendSummaryRequest,
//     SendSummaryResponse,
//     ExecuteTransferRequest,
//     TransferDetails, // Assuming execute also returns full details, adjust if needed
//     CancelTransferResponse,
//     TransferListItem, // Use this or TransferDetails for getUserTransfers
// } from '../../types/transfer'; // Adjust path if interfaces are in a separate file

// axios.defaults.baseURL = apiConfig.baseUrl;

// const calculateSendSummary = async (
//     data: SendSummaryRequest,
//     token: string | null
// ): Promise<SendSummaryResponse> => { // Use specific type
//     const response = await axios.post<SendSummaryResponse>('/transfers/calculate-summary', data, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const executeTransfer = async (
//     transferData: ExecuteTransferRequest,
//     token: string | null
// ): Promise<TransferDetails> => { // Use specific type (e.g., TransferDetails or a specific ExecuteResponse)
//      const response = await axios.post<TransferDetails>('/transfers/execute', transferData, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  const getTransferDetails = async (
//      transferId: string,
//      token: string | null
// ): Promise<TransferDetails> => { // Use specific type
//      const response = await axios.get<TransferDetails>(`/transfers/${transferId}`, { // Add response type generic
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

//  // Choose TransferListItem[] or TransferDetails[] based on what your API actually returns
//  const getUserTransfers = async (
//      token: string | null
//  ): Promise<TransferListItem[]> => { // Use specific type array (e.g., TransferListItem[] or TransferDetails[])
//      const response = await axios.get<TransferListItem[]>('/transfers', { // Add response type generic
//         // Headers object will always be present if token is not null
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     return response.data;
// };

// const cancelTransfer = async (
//     transferId: string,
//     token: string | null
// ): Promise<CancelTransferResponse> => { // Use specific return type
//     if (!transferId || !token) {
//         // Consider returning a rejected Promise or throwing a specific error type
//         throw new Error("Transfer ID and authentication token are required.");
//     }
//     try {
//         // --- Adjust HTTP method (POST or DELETE) and endpoint as per your backend ---
//         // Example using POST:
//         const response = await axios.post<CancelTransferResponse>(`/transfers/${transferId}/cancel`, {}, { // Empty body, add response type generic
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         // Example using DELETE:
//         // const response = await axios.delete<CancelTransferResponse>(`/transfers/${transferId}`, {
//         //    headers: { Authorization: `Bearer ${token}` },
//         // });

//         console.log(`Cancellation response for ${transferId}:`, response.data);
//         return response.data; // Return backend confirmation
//     } catch (error: unknown) { // Use unknown instead of any for better type safety in catch
//         // Type guard to check if it's an Axios error
//         if (axios.isAxiosError(error) && error.response) {
//             console.error(`API Error cancelling transfer ${transferId}:`, error.response.data);
//              // Use the error message from the backend if available
//             throw new Error(error.response.data?.message || 'Failed to cancel transfer. Please try again.');
//         } else if (error instanceof Error) {
//              console.error(`Error cancelling transfer ${transferId}:`, error.message);
//             throw new Error(`Failed to cancel transfer: ${error.message}`);
//         } else {
//             console.error(`Unknown error cancelling transfer ${transferId}:`, error);
//             throw new Error('An unknown error occurred while cancelling the transfer.');
//         }
//     }
// };

// // Fix the anonymous default export warning
// const transferService = {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
//     cancelTransfer,
// };

// export default transferService;