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




// frontend/src/services/recipient.js
import axios from 'axios';
import apiConfig from '../config/apiConfig';

axios.defaults.baseURL = apiConfig.baseUrl;

const addRecipient = async (recipientData, token) => {
    try {
        const response = await axios.post('/recipients', recipientData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to add recipient';
    }
};

const getUserRecipients = async (token) => {
    try {
        const response = await axios.get('/recipients', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch recipients';
    }
};

const getRecipientById = async (recipientId, token) => {
    try {
        const response = await axios.get(`/recipients/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch recipient details';
    }
};

const updateRecipient = async (recipientId, updateData, token) => {
    try {
        const response = await axios.put(`/recipients/${recipientId}`, updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update recipient';
    }
};

const deleteRecipient = async (recipientId, token) => {
    try {
        await axios.delete(`/recipients/${recipientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { message: 'Recipient deleted successfully' };
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete recipient';
    }
};

// Assign the object to a variable
const recipientService = {
    addRecipient,
    getUserRecipients,
    getRecipientById,
    updateRecipient,
    deleteRecipient,
};

// Export the variable as the default
export default recipientService;