// // frontend/src/services/exchangeRate.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Assuming you have this config

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getExchangeRatesForCurrencies = async () => {
//     try {
//         const response = await axios.get('/exchange-rates'); // Backend endpoint for ALL rates

//         // Extract the rates from the nested structure: response.data.rates.rates
//         const ratesData = response.data.rates?.rates;
//         console.log(ratesData) // Keep this console.log for now

//         if (ratesData) {
//             return { rates: response.data.rates }; // Return the whole rates object
//         } else {
//             throw new Error('No exchange rates data received from the server in the expected format.');
//         }

//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//         throw error.response?.data?.message || 'Failed to fetch exchange rates.';
//     }
// };

// export default {
//     getExchangeRatesForCurrencies,
// };


// // frontend/src/services/exchangeRate.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Assuming you have this config

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getExchangeRatesForCurrencies = async () => {
//     try {
//         const response = await axios.get('/exchange-rates'); // Backend endpoint for ALL rates

//         // Directly extract rates - assuming response.data.rates is the correct level
//         const ratesData = response.data.rates; // Modified line: Access rates directly
//         console.log("Exchange Rate API Response:", response.data); // More informative log
//         console.log("Extracted Rates Data:", ratesData);

//         if (ratesData) {
//             return { rates: ratesData }; // Return the rates object
//         } else {
//             throw new Error('No exchange rates data received from the server in the expected format.');
//         }

//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//         throw error.response?.data?.message || 'Failed to fetch exchange rates.';
//     }
// };

// export default {
//     getExchangeRatesForCurrencies,
// };


// // frontend/src/services/exchangeRate.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Assuming you have this config

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getExchangeRatesForCurrencies = async () => {
//     try {
//         const response = await axios.get('/exchange-rates'); // Backend endpoint for ALL rates
//         console.log("Exchange Rate API Response:", response.data); // Log entire response

//         // Directly extract rates - assuming response.data is the correct level
//         const ratesData = response.data?.rates; // Modified line: Access rates directly and use optional chaining
//         console.log("Extracted Rates Data:", ratesData);

//         if (ratesData) {
//             return { rates: ratesData }; // Return the rates object
//         } else {
//             throw new Error('No exchange rates data received from the server in the expected format.');
//         }

//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//         throw error.response?.data?.message || 'Failed to fetch exchange rates.';
//     }
// };

// export default {
//     getExchangeRatesForCurrencies,
// };


// // frontend/src/services/exchangeRate.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Assuming you have this config

// // Create a dedicated Axios instance for this specific API
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     // You can add other default configurations here if needed (e.g., headers)
// });

// /**
//  * Fetches all available exchange rates from the backend.
//  * @returns {Promise<object>} A promise that resolves to an object containing currency rates (e.g., { USD: 1, EUR: 0.9, ... }).
//  * @throws {Error} Throws an error if the request fails or data is missing/malformed.
//  */
// const getExchangeRatesForCurrencies = async () => {
//     try {
//         // Use the dedicated apiClient instance
//         const response = await apiClient.get('/exchange-rates'); // Backend endpoint for ALL rates
//         console.log("Exchange Rate API Response:", response.data); // Log entire response (useful for debugging)

//         // Extract rates - assuming response.data contains the rates object directly
//         // Or if the rates are nested under a 'rates' key: response.data?.rates
//         // Adjust based on your actual backend response structure. Let's assume response.data IS the rates object.
//         const ratesData = response.data; // Example: Assuming response.data = { USD: 1, EUR: 0.9, ... }
//         // If your backend returns { data: { rates: { ... } } } use: const ratesData = response.data?.data?.rates;
//         // If your backend returns { rates: { ... } } use: const ratesData = response.data?.rates;

//         console.log("Extracted Rates Data:", ratesData);

//         // Check if ratesData is an object and not empty (or other validation specific to your needs)
//         if (ratesData && typeof ratesData === 'object' && Object.keys(ratesData).length > 0) {
//              // Return the rates object directly
//              // The previous code returned { rates: ratesData }, which might be an unnecessary nesting.
//              // Returning ratesData directly is often more useful.
//             return ratesData;
//         } else {
//             console.error('Invalid or empty exchange rates data received:', ratesData);
//             throw new Error('No valid exchange rates data received from the server.');
//         }

//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//         // Try to extract a specific error message from the backend response, otherwise provide a generic one.
//         const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch exchange rates.';
//         throw new Error(errorMessage); // Throw a standard Error object
//     }
// };

// // --- Fix for the ESLint Warning ---
// // 1. Define the object containing the service methods
// const exchangeRateService = {
//     getExchangeRatesForCurrencies,
//     // Add other exchange rate related functions here if needed
// };

// // 2. Export the named constant as the default export
// export default exchangeRateService;


// // frontend/src/services/exchangeRate.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// /**
//  * Fetches all available exchange rates from the backend.
//  * The backend is expected to return an object like: { rates: { USD: 1, EUR: 0.9, ... } }
//  * @returns {Promise<{ rates: { [key: string]: number } }>} A promise resolving to the backend's response structure.
//  * @throws {Error} Throws an error if the request fails or data is missing/malformed.
//  */
// const getExchangeRatesForCurrencies = async () => {
//     try {
//         const response = await apiClient.get('/exchange-rates'); // Backend endpoint for ALL rates
//         console.log("Exchange Rate API Response (Raw):", response); // Log raw response

//         // --- MODIFICATION START ---
//         // Expecting backend response like { rates: { USD: 1, EUR: 0.9, ... } }
//         const responseData = response.data;
//         console.log("Exchange Rate API Response Data:", responseData);

//         // Check if the expected 'rates' key exists and is an object
//         if (responseData && typeof responseData.rates === 'object' && responseData.rates !== null && Object.keys(responseData.rates).length > 0) {
//             // Return the entire structure { rates: { ... } } as received from backend
//             return responseData;
//         } else {
//             console.error('Invalid or empty exchange rates data received (expected { rates: {...} }):', responseData);
//             throw new Error('No valid exchange rates data received from the server.');
//         }
//         // --- MODIFICATION END ---

//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//         const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch exchange rates.';
//         throw new Error(errorMessage);
//     }
// };

// const exchangeRateService = {
//     getExchangeRatesForCurrencies,
// };

// export default exchangeRateService;


// frontend/src/services/exchangeRate.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
});

/**
 * Fetches all available exchange rates from the backend.
 * The backend is expected to return an object like: { rates: { USD: 1, EUR: 0.9, ... } }
 * @returns {Promise<{ rates: { [key: string]: number } }>} A promise resolving to the backend's response structure.
 * @throws {Error} Throws an error if the request fails or data is missing/malformed.
 */
const getExchangeRatesForCurrencies = async () => {
    try {
        const response = await apiClient.get('/exchange-rates'); // Backend endpoint for ALL rates
        // console.log("Exchange Rate API Response (Raw):", response); // Log raw response

        // --- MODIFICATION START ---
        // Expecting backend response like { rates: { USD: 1, EUR: 0.9, ... } }
        const responseData = response.data;
        // console.log("Exchange Rate API Response Data:", responseData);

        // Check if the expected 'rates' key exists and is an object
        if (responseData && typeof responseData.rates === 'object' && responseData.rates !== null && Object.keys(responseData.rates).length > 0) {
            // Return the entire structure { rates: { ... } } as received from backend
            return responseData;
        } else {
            console.error('Invalid or empty exchange rates data received (expected { rates: {...} }):', responseData);
            throw new Error('No valid exchange rates data received from the server.');
        }
        // --- MODIFICATION END ---

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch exchange rates.';
        throw new Error(errorMessage);
    }
};

const exchangeRateService = {
    getExchangeRatesForCurrencies,
};

export default exchangeRateService;