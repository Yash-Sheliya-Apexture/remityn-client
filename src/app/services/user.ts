// // frontend/src/services/user.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllUsers = async () => {
//     try {
//         const response = await axios.get('/users'); // Relative path
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching users';
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const response = await axios.get(`/users/${userId}`); // Relative path with parameter
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching user';
//     }
// };

// export default {
//     getAllUsers,
//     getUserById,
// };


// // frontend/src/services/user.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const getAllUsers = async () => {
//     try {
//         const response = await axios.get('/users'); // Relative path
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching users';
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const response = await axios.get(`/users/${userId}`); // Relative path with parameter
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Error fetching user';
//     }
// };

// export default {
//     getAllUsers,
//     getUserById,
// };


// // frontend/src/services/user.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// // It's generally better practice to create a dedicated Axios instance
// // instead of modifying the global default, especially in larger apps.
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     // You might add default headers or other config here later
// });

// const getAllUsers = async () => {
//     try {
//         // Use the specific apiClient instance
//         const response = await apiClient.get('/users');
//         return response.data;
//     } catch (error) {
//         // Enhance error handling slightly
//         const errorMessage = error.response?.data?.message || error.message || 'Error fetching users';
//         console.error("Error in getAllUsers:", errorMessage, error); // Log the error
//         throw new Error(errorMessage); // Throw a standard Error object
//     }
// };

// const getUserById = async (userId) => {
//     // Basic validation
//     if (!userId) {
//         throw new Error('User ID is required.');
//     }
//     try {
//         // Use the specific apiClient instance
//         const response = await apiClient.get(`/users/${userId}`);
//         return response.data;
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || error.message || 'Error fetching user';
//         console.error(`Error in getUserById for ID ${userId}:`, errorMessage, error); // Log the error
//         throw new Error(errorMessage); // Throw a standard Error object
//     }
// };

// /**
//  * Changes the current user's password.
//  * @param {object} passwordData - Object containing currentPassword and newPassword.
//  * @param {string} token - The JWT token for authorization.
//  * @returns {Promise<object>} The response data from the API (usually a success message).
//  * @throws {Error} If the API call fails or returns an error status.
//  */

// const changePassword = async (passwordData, token) => {
//     if (!token) {
//         throw new Error('Authorization token is required to change password.');
//     }
//     try {
//         // Make a PUT request to the backend endpoint
//         const response = await apiClient.put(
//             '/dashboard/users/me/password', // The endpoint defined in backend routes
//             passwordData, // { currentPassword, newPassword }
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`, // Pass the token
//                 },
//             }
//         );
//         return response.data; // Return the success message { message: '...' }
//     } catch (error) {
//         console.error("Error in changePassword service:", error.response?.data || error.message);
//         // Throw the specific error data from the backend if available, otherwise a generic message
//         throw error.response?.data || { message: 'Failed to change password. Please try again.', error: error.message };
//     }
// };

// // Assign the methods to a named object
// const userService = {
//     getAllUsers,
//     getUserById,
//     changePassword,
// };

// // Export the named object as the default
// export default userService;


// frontend/src/services/user.ts
import axios, { AxiosError } from 'axios'; // Import AxiosError for better typing
import apiConfig from '../config/apiConfig';

// --- Define Interfaces ---

// Interface for the data sent TO the changePassword endpoint
interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

// Interface for the successful response FROM the changePassword endpoint
interface ChangePasswordSuccessResponse {
  message: string;
}

// Interface for a potential error response structure (adjust as needed based on your backend)
interface ApiErrorResponse {
  message: string;
  errors?: { [key: string]: string }; // Example if backend sends validation errors
  error?: string; // Example if backend sends a general error string
}

// Placeholder for User Type (replace with your actual User type if defined)
interface User {
    _id: string;
    email: string;
    fullName: string;
    // ... other user properties
}

// -------------------------

const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
});

// Type the functions properly (optional but good practice)
const getAllUsers = async (): Promise<User[]> => { // Assuming it returns an array of Users
    try {
        const response = await apiClient.get<User[]>('/users'); // Use generic type
        return response.data;
    } catch (error) {
        // Type the error if possible (e.g., AxiosError<ApiErrorResponse>)
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error fetching users';
        console.error("Error in getAllUsers:", errorMessage, axiosError);
        // Rethrow with a consistent error format if desired, or just the message
        throw new Error(errorMessage);
    }
};

const getUserById = async (userId: string): Promise<User | null> => { // Add type for userId and return type
    if (!userId) {
        // This check might be redundant if called with valid ID, but ok
        throw new Error('User ID is required.');
    }
    try {
        const response = await apiClient.get<User>(`/users/${userId}`); // Use generic type
        return response.data;
    } catch (error) {
         const axiosError = error as AxiosError<ApiErrorResponse>;
         // Handle 404 specifically if needed
         if (axiosError.response?.status === 404) {
            // console.log(`User with ID ${userId} not found.`);
            return null; // Or throw a specific "NotFound" error
         }
        const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error fetching user';
        console.error(`Error in getUserById for ID ${userId}:`, errorMessage, axiosError);
        throw new Error(errorMessage);
    }
};

/**
 * Changes the current user's password.
 * @param passwordData - Object containing currentPassword and newPassword.
 * @param token - The JWT token for authorization.
 * @returns The success response data from the API.
 * @throws If the API call fails or returns an error status.
 */
const changePassword = async (
    passwordData: PasswordChangeData, // Use the defined interface
    token: string
): Promise<ChangePasswordSuccessResponse> => { // Specify the success response type
    if (!token) {
        // This error won't typically return ApiErrorResponse structure
        throw new Error('Authorization token is required to change password.');
    }
    try {
        // *** Use the Axios generic type for the PUT request ***
        const response = await apiClient.put<ChangePasswordSuccessResponse>(
            '/dashboard/users/me/password',
            passwordData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        // response.data is now correctly typed as ChangePasswordSuccessResponse
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>; // Type assertion for the error
        console.error("Error in changePassword service:", axiosError.response?.data || axiosError.message);
        // Throw the specific error data from the backend if available
        // Ensure the thrown object matches ApiErrorResponse or a simpler structure
        throw axiosError.response?.data || { message: 'Failed to change password. Please try again.', error: axiosError.message };
    }
};

const userService = {
    getAllUsers,
    getUserById,
    changePassword,
};

export default userService;

// Optionally export types if needed elsewhere
export type { PasswordChangeData, ChangePasswordSuccessResponse, ApiErrorResponse, User };