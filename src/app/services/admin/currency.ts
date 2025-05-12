// // frontend/src/services/admin/currency.ts
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllCurrenciesAdmin = async (token: string) => {
//     try {
//         const response = await axios.get('/admin/currencies', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching admin currencies:", error);
//         throw error.response?.data?.message || 'Failed to fetch currencies.';
//     }
// };

// const getCurrencyByIdAdmin = async (currencyId: string, token: string) => {
//     try {
//         const response = await axios.get(`/admin/currencies/${currencyId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching admin currency by ID ${currencyId}:`, error);
//         throw error.response?.data?.message || 'Failed to fetch currency details.';
//     }
// };

// const createCurrencyAdmin = async (currencyData: any, token: string) => {
//     try {
//         const response = await axios.post('/admin/currencies', currencyData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error creating admin currency:", error);
//         throw error.response?.data?.message || 'Failed to create currency.';
//     }
// };

// const updateCurrencyAdmin = async (currencyId: string, currencyData: any, token: string) => {
//     try {
//         const response = await axios.put(`/admin/currencies/${currencyId}`, currencyData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating admin currency by ID ${currencyId}:`, error);
//         throw error.response?.data?.message || 'Failed to update currency.';
//     }
// };

// const deleteCurrencyAdmin = async (currencyId: string, token: string) => {
//     try {
//         const response = await axios.delete(`/admin/currencies/${currencyId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data; // Or perhaps return response.status === 204 for delete success
//     } catch (error) {
//         console.error(`Error deleting admin currency by ID ${currencyId}:`, error);
//         throw error.response?.data?.message || 'Failed to delete currency.';
//     }
// };

// export default {
//     getAllCurrenciesAdmin,
//     getCurrencyByIdAdmin,
//     createCurrencyAdmin,
//     updateCurrencyAdmin,
//     deleteCurrencyAdmin,
// };


// frontend/src/services/admin/currency.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

axios.defaults.baseURL = apiConfig.baseUrl;

// Define the structure of a Currency object returned by the API
interface Currency {
    id: string; // Assuming ID is a string, adjust if it's a number
    code: string;
    name: string;
    symbol: string;
    // Add any other relevant fields returned by the API
    // e.g., isActive?: boolean; exchangeRate?: number; createdAt?: string; updatedAt?: string;
}

// Define the structure for data used to create/update a currency
// Make fields optional for update if applicable, or create a separate type/use Partial<CurrencyInput>
interface CurrencyInput {
    code: string;
    name: string;
    symbol: string;
    // Add any other relevant fields required for creation/update
    // e.g., isActive?: boolean; exchangeRate?: number;
}

// Define a potential structure for the delete response data
interface DeleteResponse {
    message: string;
    // Or potentially the deleted object: Currency;
    // Or it could be empty if status 204 is used, handle accordingly
}

// Helper to extract error message
const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Error is an AxiosError
        return error.response?.data?.message || error.message || 'An unknown Axios error occurred.';
    } else if (error instanceof Error) {
        // Error is a standard Error
        return error.message;
    }
    // Fallback for other types of errors
    return 'An unexpected error occurred.';
};


const getAllCurrenciesAdmin = async (token: string): Promise<Currency[]> => {
    try {
        const response = await axios.get<Currency[]>('/admin/currencies', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching admin currencies:", error);
        throw getErrorMessage(error) || 'Failed to fetch currencies.';
    }
};

const getCurrencyByIdAdmin = async (currencyId: string, token: string): Promise<Currency> => {
    try {
        const response = await axios.get<Currency>(`/admin/currencies/${currencyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: unknown) {
        console.error(`Error fetching admin currency by ID ${currencyId}:`, error);
        throw getErrorMessage(error) || 'Failed to fetch currency details.';
    }
};

// Use CurrencyInput instead of any
const createCurrencyAdmin = async (currencyData: CurrencyInput, token: string): Promise<Currency> => {
    try {
        const response = await axios.post<Currency>('/admin/currencies', currencyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: unknown) {
        console.error("Error creating admin currency:", error);
        throw getErrorMessage(error) || 'Failed to create currency.';
    }
};

// Use CurrencyInput (or Partial<CurrencyInput> if partial updates are allowed) instead of any
const updateCurrencyAdmin = async (currencyId: string, currencyData: Partial<CurrencyInput>, token: string): Promise<Currency> => {
    // If only full updates are allowed, use CurrencyInput instead of Partial<CurrencyInput>
    try {
        const response = await axios.put<Currency>(`/admin/currencies/${currencyId}`, currencyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: unknown) {
        console.error(`Error updating admin currency by ID ${currencyId}:`, error);
        throw getErrorMessage(error) || 'Failed to update currency.';
    }
};

const deleteCurrencyAdmin = async (currencyId: string, token: string): Promise<DeleteResponse> => { // Adjust Return type based on actual API response
    try {
        // Assuming the API returns a response body like { message: 'Success' }
        const response = await axios.delete<DeleteResponse>(`/admin/currencies/${currencyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        // If the API returns status 204 No Content, you might want to return void or a success boolean
        // Example for 204:
        // await axios.delete(`/admin/currencies/${currencyId}`, { headers: { Authorization: `Bearer ${token}` } });
        // return { message: 'Currency deleted successfully.' }; // Or just return; for void
        return response.data;
    } catch (error: unknown) {
        console.error(`Error deleting admin currency by ID ${currencyId}:`, error);
        throw getErrorMessage(error) || 'Failed to delete currency.';
    }
};

// Assign the service methods to a named constant
const currencyAdminService = {
    getAllCurrenciesAdmin,
    getCurrencyByIdAdmin,
    createCurrencyAdmin,
    updateCurrencyAdmin,
    deleteCurrencyAdmin,
};

// Export the named constant as the default export
export default currencyAdminService;