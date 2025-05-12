// // src/services/account.ts
// // (Adjust path based on your project structure, e.g., frontend/src/services/account.ts)

// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path to your apiConfig file
// import { Account } from '@/types/account'; // Adjust path to your Account type definition

// // Set the base URL for account-related requests
// // You might have already set this globally when setting up axios,
// // but setting it here ensures it's configured for this service.
// axios.defaults.baseURL = apiConfig.baseUrl;

// /**
//  * Fetches the accounts associated with the authenticated user.
//  * Requires a valid authentication token.
//  *
//  * @param token - The JWT authentication token for the user.
//  * @returns A promise that resolves to an array of Account objects.
//  * @throws Throws an error if the request fails or the token is invalid.
//  */
// const getUserAccounts = async (token: string): Promise<Account[]> => {
//     if (!token) {
//         throw new Error('Authentication token is required to fetch accounts.');
//     }
//     try {
//         // Make a GET request to the /api/accounts endpoint (adjust if your endpoint is different)
//         // Expecting the response data to be an array of Account objects
//         const response = await axios.get<Account[]>('/accounts', {
//             headers: {
//                 // Include the Authorization header with the Bearer token
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         // Return the data part of the response, which should be the array of accounts
//         return response.data;
//     } catch (error: any) {
//         // Log the detailed error for debugging
//         console.error("API Error fetching user accounts:", error.response?.data || error.message);

//         // Throw a more specific error message for the frontend to handle
//         throw new Error(error.response?.data?.message || 'Failed to fetch user accounts. Please try again.');
//     }
// };

// // Export the service functions
// const accountService = {
//     getUserAccounts,
//     // Add other account-related API functions here later (e.g., getAccountById, createAccount - though createAccount is already done via CurrencySelectorModal)
// };

// export default accountService;




// src/services/account.ts
// (Adjust path based on your project structure, e.g., frontend/src/services/account.ts)

// Import AxiosError and the isAxiosError type guard
import axios, { AxiosError } from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path to your apiConfig file
import { Account } from '@/types/account'; // Adjust path to your Account type definition

// Set the base URL for account-related requests
// You might have already set this globally when setting up axios,
// but setting it here ensures it's configured for this service.
axios.defaults.baseURL = apiConfig.baseUrl;

/**
 * Fetches the accounts associated with the authenticated user.
 * Requires a valid authentication token.
 *
 * @param token - The JWT authentication token for the user.
 * @returns A promise that resolves to an array of Account objects.
 * @throws Throws an error if the request fails or the token is invalid.
 */
const getUserAccounts = async (token: string): Promise<Account[]> => {
    if (!token) {
        throw new Error('Authentication token is required to fetch accounts.');
    }
    try {
        // Make a GET request to the /api/accounts endpoint (adjust if your endpoint is different)
        // Expecting the response data to be an array of Account objects
        const response = await axios.get<Account[]>('/accounts', {
            headers: {
                // Include the Authorization header with the Bearer token
                Authorization: `Bearer ${token}`,
            },
        });
        // Return the data part of the response, which should be the array of accounts
        return response.data;
    } catch (error: unknown) { // <-- Changed 'any' to 'unknown'
        let errorMessage = 'Failed to fetch user accounts. Please try again.';
        let logDetails: unknown = error; // Keep original error for logging if needed

        // Use Axios type guard to check if it's an Axios error
        if (axios.isAxiosError(error)) {
            // Now TypeScript knows 'error' is an AxiosError
            logDetails = error.response?.data || error.message; // Log response data or message
            // Try to get a specific message from the API response, fallback to Axios message or default
            errorMessage = error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
            // Handle generic JavaScript errors
            logDetails = error.message;
            errorMessage = error.message;
        }
        // Else, it might be a string or something else thrown, use the default message

        // Log the detailed error for debugging
        console.error("API Error fetching user accounts:", logDetails);

        // Throw a new error with a refined message for the frontend
        throw new Error(errorMessage);
    }
};

// Export the service functions
const accountService = {
    getUserAccounts,
    // Add other account-related API functions here later (e.g., getAccountById, createAccount - though createAccount is already done via CurrencySelectorModal)
};

export default accountService;