// // frontend/src/services/payment.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Define interfaces for request/response data (optional, but recommended for type safety)
// // Example interfaces (adjust based on your backend API contracts)
// interface CalculatePaymentSummaryPayload {
//     balanceCurrencyCode: string;
//     payInCurrencyCode: string;
//     amountToAdd: number;
// }

// interface InitiatePaymentPayload {
//     paymentSummary: any; // Define based on what your backend expects
// }

// interface PaymentDetailsResponse {
//     // Define properties based on your backend's payment details response
//     _id: string;
//     // ... other properties
// }

// interface PaymentSummaryResponse {
//     // Define properties based on your backend's payment summary response
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     balanceCurrencyCode: string;
//     payInCurrencyCode: string;
//     amountToAdd: number;
//     userId: string;
//     // ... other properties
// }

// const calculatePaymentSummary = async (data: CalculatePaymentSummaryPayload, token: string | null): Promise<PaymentSummaryResponse> => {
//     const response = await axios.post('/payments/add-money/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const initiatePaymentAndSave = async (paymentSummary: InitiatePaymentPayload, token: string | null): Promise<PaymentDetailsResponse> => {
//     const response = await axios.post('/payments/add-money/initiate', paymentSummary, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const getPaymentDetails = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
//     const response = await axios.get(`/payments/${paymentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const getUserPayments = async (token: string | null): Promise<PaymentDetailsResponse[]> => {
//     const response = await axios.get('/payments', { // Assuming '/payments' endpoint fetches user's payments
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const cancelPayment = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
//     const response = await axios.post(`/payments/${paymentId}/cancel`, {}, { // Assuming empty body for cancel request
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// // NEW: Function to confirm user has made the transfer (optional backend call)
// const confirmUserTransfer = async (paymentId: string, token: string | null): Promise<{ message: string; payment: PaymentDetailsResponse }> => {
//     const response = await axios.post(`/payments/${paymentId}/confirm-transfer`, {}, { // Empty body
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };


// export default {
//     calculatePaymentSummary,
//     initiatePaymentAndSave,
//     getPaymentDetails,
//     getUserPayments,
//     cancelPayment,
//     confirmUserTransfer,
// };


// // frontend/src/services/payment.ts
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path if needed

// // Consider creating a dedicated Axios instance for better isolation
// // if your app interacts with multiple APIs or needs specific interceptors.
// // Example:
// // const apiClient = axios.create({
// //   baseURL: apiConfig.baseUrl,
// // });
// // Then use apiClient.get, apiClient.post, etc.
// // For now, using the global default is okay for simplicity.
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---

// // Payload for calculating the payment summary
// interface CalculatePaymentSummaryPayload {
//     balanceCurrencyCode: string;
//     payInCurrencyCode: string;
//     amountToAdd: number;
// }

// // Response from calculating the payment summary
// // (Also likely the payload needed to initiate the payment)
// interface PaymentSummaryResponse {
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     balanceCurrencyCode: string;
//     payInCurrencyCode: string;
//     amountToAdd: number;
//     userId: string; // Or ObjectId type if using mongoose/mongodb types
//     // ... other properties returned by your backend
//     // e.g., quoteId, estimatedDelivery, etc.
// }

// // Payload for initiating the payment
// // FIX: Changed 'any' to 'PaymentSummaryResponse' assuming the calculated summary is sent
// interface InitiatePaymentPayload {
//     paymentSummary: PaymentSummaryResponse;
// }

// // Response containing details of a specific payment
// interface PaymentDetailsResponse {
//     _id: string; // Or ObjectId type
//     status: string; // e.g., 'PENDING_PAYMENT', 'PROCESSING', 'COMPLETED', 'CANCELLED'
//     // Include all relevant details returned by your backend for a single payment
//     amountToPay?: number; // Optional if not always present
//     payInCurrencyCode?: string;
//     amountAdded?: number; // e.g. amount credited to balance
//     balanceCurrencyCode?: string;
//     createdAt: string; // Or Date type
//     updatedAt: string; // Or Date type
//     userId: string; // Or ObjectId
//     // ... other specific payment properties (transfer details, etc.)
// }

// // Response type for confirming user transfer (adjust as needed)
// interface ConfirmTransferResponse {
//     message: string;
//     payment: PaymentDetailsResponse; // Assuming the updated payment details are returned
// }


// // --- Service Functions ---
// // Note: Error handling (try/catch) is omitted here for brevity.
// // It's recommended to handle API errors in the calling components/hooks
// // or implement global error handling (e.g., via Axios interceptors).

// const calculatePaymentSummary = async (data: CalculatePaymentSummaryPayload, token: string | null): Promise<PaymentSummaryResponse> => {
//     const response = await axios.post<PaymentSummaryResponse>('/payments/add-money/calculate-summary', data, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// // Renamed 'paymentSummary' parameter to 'payload' for clarity, as it wraps the actual summary
// const initiatePaymentAndSave = async (payload: InitiatePaymentPayload, token: string | null): Promise<PaymentDetailsResponse> => {
//     // Make sure the payload structure { paymentSummary: { ... } } matches backend expectation.
//     // If the backend *only* expects the summary object directly, adjust the interface and call:
//     // const initiatePaymentAndSave = async (paymentSummaryData: PaymentSummaryResponse, token: string | null): Promise<PaymentDetailsResponse> => {
//     //    const response = await axios.post<PaymentDetailsResponse>('/payments/add-money/initiate', paymentSummaryData, { ... });
//     //    return response.data;
//     // }
//     const response = await axios.post<PaymentDetailsResponse>('/payments/add-money/initiate', payload, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const getPaymentDetails = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
//     const response = await axios.get<PaymentDetailsResponse>(`/payments/${paymentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const getUserPayments = async (token: string | null): Promise<PaymentDetailsResponse[]> => {
//     // Ensure the backend endpoint '/payments' returns an array of PaymentDetailsResponse
//     const response = await axios.get<PaymentDetailsResponse[]>('/payments', {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const cancelPayment = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
//     // Assuming the cancel endpoint returns the updated payment details
//     const response = await axios.post<PaymentDetailsResponse>(`/payments/${paymentId}/cancel`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// const confirmUserTransfer = async (paymentId: string, token: string | null): Promise<ConfirmTransferResponse> => {
//     const response = await axios.post<ConfirmTransferResponse>(`/payments/${paymentId}/confirm-transfer`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// };

// // FIX: Assign the object to a variable before exporting
// const paymentService = {
//     calculatePaymentSummary,
//     initiatePaymentAndSave,
//     getPaymentDetails,
//     getUserPayments,
//     cancelPayment,
//     confirmUserTransfer,
// };

// export default paymentService;



// frontend/src/services/payment.ts
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path if needed

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces ---
// Add 'export' before each interface definition

export interface CalculatePaymentSummaryPayload {
    balanceCurrencyCode: string;
    payInCurrencyCode: string;
    amountToAdd: number;
}

// Response from calculating the payment summary
// (Also likely the payload needed to initiate the payment)
export interface PaymentSummaryResponse {
    amountToPay: number;
    exchangeRate: number;
    wiseFee: number;
    bankTransferFee: number;
    balanceCurrencyCode: string;
    payInCurrencyCode: string;
    amountToAdd: number;
    userId: string; // Or ObjectId type if using mongoose/mongodb types
    // ... other properties returned by your backend
}

// Payload for initiating the payment
export interface InitiatePaymentPayload {
    paymentSummary: PaymentSummaryResponse;
}

// Response containing details of a specific payment
export interface PaymentDetailsResponse {
    type: string;
    _id: string;
    status: string; // Should ideally be TransactionStatus type from backend if possible
    amountToAdd: number; // Changed from any
    amountToPay?: number;
    // *** CHANGED LINES START ***
    // Use the imported Currency type (adjust if structure differs slightly from API)
    balanceCurrency: any;
    payInCurrency: any;
    // Use the optional code fields if the API *sometimes* provides them
    balanceCurrencyCode?: string; // Keep if API sometimes sends this IN ADDITION TO object
    payInCurrencyCode?: string;   // Keep if API sometimes sends this IN ADDITION TO object
    // *** CHANGED LINES END ***
    account: any;
    accountId: string | undefined; // More specific than 'any'
    amountAdded?: number;
    createdAt: string; // Or Date type
    updatedAt: string; // Or Date type
    userId: string; // Or ObjectId
    // NOTE: 'type' field removed as it's usually determined frontend-side based on origin (payment vs transfer)
}


// Response type for confirming user transfer (adjust as needed)
export interface ConfirmTransferResponse {
    message: string;
    payment: PaymentDetailsResponse; // Assuming the updated payment details are returned
}


// --- Service Functions ---
// (Service functions remain the same)

const calculatePaymentSummary = async (data: CalculatePaymentSummaryPayload, token: string | null): Promise<PaymentSummaryResponse> => {
    const response = await axios.post<PaymentSummaryResponse>('/payments/add-money/calculate-summary', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const initiatePaymentAndSave = async (payload: InitiatePaymentPayload, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.post<PaymentDetailsResponse>('/payments/add-money/initiate', payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const getPaymentDetails = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.get<PaymentDetailsResponse>(`/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const getUserPayments = async (token: string | null): Promise<PaymentDetailsResponse[]> => {
    const response = await axios.get<PaymentDetailsResponse[]>('/payments', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const cancelPayment = async (paymentId: string, token: string | null): Promise<PaymentDetailsResponse> => {
    const response = await axios.post<PaymentDetailsResponse>(`/payments/${paymentId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const confirmUserTransfer = async (paymentId: string, token: string | null): Promise<ConfirmTransferResponse> => {
    const response = await axios.post<ConfirmTransferResponse>(`/payments/${paymentId}/confirm-transfer`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const paymentService = {
    calculatePaymentSummary,
    initiatePaymentAndSave,
    getPaymentDetails,
    getUserPayments,
    cancelPayment,
    confirmUserTransfer,
};

// Keep the default export for the service object
export default paymentService;