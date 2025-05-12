// import axios from 'axios';
// import apiConfig from '../config/apiConfig'; // Correct import path using alias

// axios.defaults.baseURL = apiConfig.baseUrl;

// const register = async (userData) => {
//     try {
//         const response = await axios.post('/auth/register', userData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Registration failed';
//     }
// };

// const login = async (credentials) => {
//     try {
//         const response = await axios.post('/auth/login', credentials, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Login failed';
//     }
// };



// const forgotPassword = async (emailData) => {
//     try {
//         const response = await axios.post('/auth/forgot-password', emailData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to request password reset';
//     }
// };

// const resetPassword = async (resetData) => {
//     try {
//         const response = await axios.post('/auth/reset-password', resetData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Password reset failed';
//     }
// };


// export default {
//     register,
//     login,
//     forgotPassword, // Add forgotPassword API call
//     resetPassword,   // Add resetPassword API call
// };


// frontend/src/services/auth.js
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Correct import path using alias

axios.defaults.baseURL = apiConfig.baseUrl;

const register = async (userData) => {
    try {
        const response = await axios.post('/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Registration failed'; // Return full error data for better handling in components
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post('/auth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Login failed'; // Return full error data
    }
};



const forgotPassword = async (emailData) => {
    try {
        const response = await axios.post('/auth/forgot-password', emailData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to request password reset';
    }
};

const resetPassword = async (resetData) => {
    try {
        const response = await axios.post('/auth/reset-password', resetData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Password reset failed';
    }
};


export default {
    register,
    login,
    forgotPassword, // Add forgotPassword API call
    resetPassword,   // Add resetPassword API call
};


