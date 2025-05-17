// // frontend/src/services/recipient.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const addRecipient = async (recipientData, token) => {
//     try {
//         const response = await axios.post('/recipients', recipientData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to add recipient';
//     }
// };

// const getUserRecipients = async (token) => {
//     try {
//         const response = await axios.get('/recipients', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch recipients';
//     }
// };

// const getRecipientById = async (recipientId, token) => {
//     try {
//         const response = await axios.get(`/recipients/${recipientId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch recipient details';
//     }
// };

// const updateRecipient = async (recipientId, updateData, token) => {
//     try {
//         const response = await axios.put(`/recipients/${recipientId}`, updateData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to update recipient';
//     }
// };

// const deleteRecipient = async (recipientId, token) => {
//     try {
//         await axios.delete(`/recipients/${recipientId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return { message: 'Recipient deleted successfully' };
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to delete recipient';
//     }
// };


// export default {
//     addRecipient,
//     getUserRecipients,
//     getRecipientById,
//     updateRecipient,
//     deleteRecipient,
// };




// // frontend/src/services/recipient.js
// import axios from 'axios';
// import apiConfig from '../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// const addRecipient = async (recipientData, token) => {
//     try {
//         const response = await axios.post('/recipients', recipientData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to add recipient';
//     }
// };

// const getUserRecipients = async (token) => {
//     try {
//         const response = await axios.get('/recipients', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch recipients';
//     }
// };

// const getRecipientById = async (recipientId, token) => {
//     try {
//         const response = await axios.get(`/recipients/${recipientId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch recipient details';
//     }
// };

// const updateRecipient = async (recipientId, updateData, token) => {
//     try {
//         const response = await axios.put(`/recipients/${recipientId}`, updateData, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to update recipient';
//     }
// };

// const deleteRecipient = async (recipientId, token) => {
//     try {
//         await axios.delete(`/recipients/${recipientId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return { message: 'Recipient deleted successfully' };
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to delete recipient';
//     }
// };

// // Assign the object to a variable
// const recipientService = {
//     addRecipient,
//     getUserRecipients,
//     getRecipientById,
//     updateRecipient,
//     deleteRecipient,
// };

// // Export the variable as the default
// export default recipientService;


// frontend/src/services/recipient.js
import axios from 'axios';
import apiConfig from '../config/apiConfig'; // Assuming this path is correct

// It's better to create an instance if you're setting defaults consistently
const axiosInstance = axios.create({
    baseURL: apiConfig.baseUrl,
});

const addRecipient = async (recipientData, token) => {
    try {
        const response = await axiosInstance.post('/recipients', recipientData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        // Throw the whole error object so the component can inspect it
        // The component will then handle extracting status and message
        if (error.response) {
            // If there's a response, it's likely an API error
            // Add the message to the error object for easier access if needed,
            // but the component will primarily use error.response.data
            error.message = error.response.data?.message || error.message || 'Failed to add recipient';
        } else if (error.request) {
            error.message = 'No response from server. Check network connection.';
        } else {
            error.message = error.message || 'An unexpected error occurred setting up the request.';
        }
        throw error; // Re-throw the (potentially augmented) error object
    }
};

const getUserRecipients = async (token) => {
    try {
        const response = await axiosInstance.get('/recipients', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            error.message = error.response.data?.message || error.message || 'Failed to fetch recipients';
        } else if (error.request) {
            error.message = 'No response from server.';
        } else {
            error.message = error.message || 'An unexpected error occurred.';
        }
        throw error;
    }
};

const getRecipientById = async (recipientId, token) => {
    try {
        const response = await axiosInstance.get(`/recipients/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            error.message = error.response.data?.message || error.message || 'Failed to fetch recipient details';
        } else if (error.request) {
            error.message = 'No response from server.';
        } else {
            error.message = error.message || 'An unexpected error occurred.';
        }
        throw error;
    }
};

const updateRecipient = async (recipientId, updateData, token) => {
    try {
        const response = await axiosInstance.put(`/recipients/${recipientId}`, updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            error.message = error.response.data?.message || error.message || 'Failed to update recipient';
        } else if (error.request) {
            error.message = 'No response from server.';
        } else {
            error.message = error.message || 'An unexpected error occurred.';
        }
        throw error;
    }
};

const deleteRecipient = async (recipientId, token) => {
    try {
        await axiosInstance.delete(`/recipients/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { message: 'Recipient deleted successfully' }; // This is fine
    } catch (error) {
        if (error.response) {
            error.message = error.response.data?.message || error.message || 'Failed to delete recipient';
        } else if (error.request) {
            error.message = 'No response from server.';
        } else {
            error.message = error.message || 'An unexpected error occurred.';
        }
        throw error;
    }
};

const recipientService = {
    addRecipient,
    getUserRecipients,
    getRecipientById,
    updateRecipient,
    deleteRecipient,
};

export default recipientService;