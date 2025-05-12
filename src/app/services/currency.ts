// // frontend/src/services/currency.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllCurrencies = async () => {
//     try {
//         const response = await axios.get('/currencies');
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching currencies';
//     }
// };

// export default {
//     getAllCurrencies,
// };


// // frontend/src/services/currency.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path if needed

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- MODIFIED ---
// // Function now correctly uses the includeRates flag to modify the URL
// const getAllCurrencies = async (includeRates = false) => {
//     try {
//         // Construct the URL conditionally based on the flag
//         const url = includeRates ? '/currencies?rates=true' : '/currencies';
//         console.log(`Fetching currencies from: ${url}`); // Add log for debugging
//         const response = await axios.get(url);
//         console.log('Received currencies data:', response.data); // Add log
//         return response.data; // Assuming response.data is the array of currencies
//     } catch (error: any) { // Add type annotation for error
//         console.error('Error fetching currencies:', error.response?.data || error.message); // Log error details
//         // Re-throw a more specific error message if possible
//         throw new Error(error.response?.data?.message || 'Error fetching currencies');
//     }
// };
// // --- END MODIFIED ---

// export default {
//     getAllCurrencies,
// };


// // frontend/src/services/currency.ts  <-- Recommended to use .ts extension for TypeScript
// import axios, { AxiosError } from 'axios'; // Import AxiosError for specific error handling
// import apiConfig from '../config/apiConfig'; // Adjust path if needed

// // Define a basic type for Currency - replace with your actual type if available
// interface Currency {
//   code: string;
//   name: string;
//   rate?: number; // Example: rate might be optional
//   // ... other properties
// }

// // Define a type for the expected error response structure from your API (optional but helpful)
// interface ApiErrorResponse {
//     message: string;
//     // ... other potential error properties
// }


// axios.defaults.baseURL = apiConfig.baseUrl;

// /**
//  * Fetches a list of currencies, optionally including their rates.
//  * @param includeRates - If true, fetches currencies with rates. Defaults to false.
//  * @returns A promise that resolves to an array of Currency objects.
//  * @throws {Error} If fetching fails.
//  */
// const getAllCurrencies = async (includeRates = false): Promise<Currency[]> => { // Add return type annotation
//     try {
//         const url = includeRates ? '/currencies?rates=true' : '/currencies';
//         console.log(`Fetching currencies from: ${axios.defaults.baseURL}${url}`); // Log full URL
//         // Add type parameter to axios.get for better response type inference
//         const response = await axios.get<Currency[]>(url);
//         console.log('Received currencies data:', response.data);
//         return response.data; // response.data should now be typed as Currency[]
//     } catch (error: unknown) { // --- MODIFIED: Use unknown instead of any ---
//         console.error('Error fetching currencies:', error); // Log the raw error first

//         let errorMessage = 'An unknown error occurred while fetching currencies.';

//         // --- MODIFIED: Type checking for better error handling ---
//         if (axios.isAxiosError(error)) {
//             // Error is from Axios (network issue, 4xx, 5xx)
//             const axiosError = error as AxiosError<ApiErrorResponse>; // Type assertion for data
//             console.error('Axios error details:', axiosError.response?.status, axiosError.response?.data, axiosError.message);
//             // Try to get a specific message from the API response, otherwise use default Axios message
//             errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error fetching currencies from API.';
//         } else if (error instanceof Error) {
//             // Standard JavaScript error
//             console.error('Standard error:', error.message);
//             errorMessage = error.message;
//         }

//         // Re-throw a new error with a consolidated message
//         throw new Error(errorMessage);
//     }
// };

// // --- MODIFIED: Assign to a named constant before exporting ---
// const currencyService = {
//     getAllCurrencies,
// };

// export default currencyService; // --- MODIFIED: Export the named constant ---.




// // frontend/src/services/currency.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../config/apiConfig'; // Adjust path if needed

// // --- MODIFIED: Unified Currency Interface ---
// // This should match the actual structure returned by the /currencies endpoint
// // Based on usage in page.tsx, it includes _id, code, currencyName, and optionally flagImage.
// export interface Currency { // Export the interface directly
//   _id: string; // Assuming API returns an ID
//   code: string;
//   currencyName: string; // Changed from 'name' based on page.tsx usage
//   flagImage?: string; // Optional based on page.tsx usage
//   rate?: number; // Kept optional for includeRates=true scenario
//   // Add other relevant properties if returned by the API
// }
// // --- END MODIFIED ---

// // Define a type for the expected error response structure from your API (optional but helpful)
// interface ApiErrorResponse {
//     message: string;
//     // ... other potential error properties
// }


// axios.defaults.baseURL = apiConfig.baseUrl;

// /**
//  * Fetches a list of currencies, optionally including their rates.
//  * @param includeRates - If true, fetches currencies with rates. Defaults to false.
//  * @returns A promise that resolves to an array of Currency objects.
//  * @throws {Error} If fetching fails.
//  */
// const getAllCurrencies = async (includeRates = false): Promise<Currency[]> => { // Return type uses the updated Currency interface
//     try {
//         const url = includeRates ? '/currencies?rates=true' : '/currencies';
//         console.log(`Fetching currencies from: ${axios.defaults.baseURL}${url}`); // Log full URL
//         // axios.get<Currency[]> uses the updated Currency interface
//         const response = await axios.get<Currency[]>(url);
//         console.log('Received currencies data:', response.data);
//         // Ensure the data conforms to the Currency interface. Add validation/transformation if needed.
//         // For example, if API returns 'name' instead of 'currencyName':
//         // return response.data.map(c => ({ ...c, currencyName: c.name }));
//         return response.data; // Data should match the updated Currency interface
//     } catch (error: unknown) { // Use unknown instead of any
//         console.error('Error fetching currencies:', error); // Log the raw error first

//         let errorMessage = 'An unknown error occurred while fetching currencies.';

//         // Type checking for better error handling
//         if (axios.isAxiosError(error)) {
//             // Error is from Axios (network issue, 4xx, 5xx)
//             const axiosError = error as AxiosError<ApiErrorResponse>; // Type assertion for data
//             console.error('Axios error details:', axiosError.response?.status, axiosError.response?.data, axiosError.message);
//             // Try to get a specific message from the API response, otherwise use default Axios message
//             errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error fetching currencies from API.';
//         } else if (error instanceof Error) {
//             // Standard JavaScript error
//             console.error('Standard error:', error.message);
//             errorMessage = error.message;
//         }

//         // Re-throw a new error with a consolidated message
//         throw new Error(errorMessage);
//     }
// };

// const currencyService = {
//     getAllCurrencies,
// };

// // No need for separate 'export type { Currency };' as it's exported directly above
// export default currencyService;



import axios, { AxiosError } from 'axios';
import apiConfig from '../config/apiConfig'; // Adjust path if needed

// --- MODIFIED: Unified Currency Interface ---
// This should match the actual structure returned by the /currencies endpoint
// Include the fields returned when 'rates=true' query parameter is used.
export interface Currency { // Export the interface directly
  _id: string; // Assuming API returns an ID
  code: string;
  currencyName: string; // Changed from 'name' based on page.tsx usage
  flagImage?: string; // Optional based on page.tsx usage
  rate?: number; // Optional: Direct rate (less common in this context)

  // --- ADD FIELDS RETURNED WHEN includeRates=true ---
  rateAdjustmentPercentage?: number; // Make it optional as it's conditionally fetched
  wiseFeePercentage?: number;         // Make optional
  bankTransferFee?: number;           // Make optional
  // Add other relevant properties if returned by the API (e.g., payeeName, iban etc. if needed)
  // --- END ADD ---
}
// --- END MODIFIED ---

// Define a type for the expected error response structure from your API (optional but helpful)
interface ApiErrorResponse {
    message: string;
    // ... other potential error properties
}


axios.defaults.baseURL = apiConfig.baseUrl;

/**
 * Fetches a list of currencies, optionally including their rates and fee details.
 * @param includeRates - If true, fetches currencies with rateAdjustmentPercentage, etc. Defaults to false.
 * @returns A promise that resolves to an array of Currency objects.
 * @throws {Error} If fetching fails.
 */
const getAllCurrencies = async (includeRates = false): Promise<Currency[]> => { // Return type uses the updated Currency interface
    try {
        const url = includeRates ? '/currencies?rates=true' : '/currencies';
        console.log(`Fetching currencies from: ${axios.defaults.baseURL}${url}`); // Log full URL
        // axios.get<Currency[]> uses the updated Currency interface
        const response = await axios.get<Currency[]>(url);
        console.log('Received currencies data:', response.data);
        // Ensure the data conforms to the Currency interface. No transformation needed if backend matches.
        return response.data; // Data should match the updated Currency interface
    } catch (error: unknown) { // Use unknown instead of any
        console.error('Error fetching currencies:', error); // Log the raw error first

        let errorMessage = 'An unknown error occurred while fetching currencies.';

        // Type checking for better error handling
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiErrorResponse>; // Type assertion for data
            console.error('Axios error details:', axiosError.response?.status, axiosError.response?.data, axiosError.message);
            errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error fetching currencies from API.';
        } else if (error instanceof Error) {
            console.error('Standard error:', error.message);
            errorMessage = error.message;
        }

        // Re-throw a new error with a consolidated message
        throw new Error(errorMessage);
    }
};

const currencyService = {
    getAllCurrencies,
};

export default currencyService;