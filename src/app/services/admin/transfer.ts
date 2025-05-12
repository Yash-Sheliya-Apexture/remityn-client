// // frontend/src/services/admin/transfer.ts
// import axios from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

// axios.defaults.baseURL = apiConfig.baseUrl;


// const getAdminTransfers = async (token: string, filters?: { status?: string }) => {
//     try {
//         const params = filters || {}; // Use filters if provided, else empty object
//         const response = await axios.get('/admin/transfers', {
//             headers: { Authorization: `Bearer ${token}` },
//             params: params, // Pass filters as query parameters
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching admin transfers:", error);
//         throw error.response?.data?.message || 'Failed to fetch transfers.';
//     }
// };

// const getAdminTransferById = async (transferId: string, token: string) => {
//     try {
//         const response = await axios.get(`/admin/transfers/${transferId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching admin transfer by ID ${transferId}:`, error);
//         throw error.response?.data?.message || 'Failed to fetch transfer details.';
//     }
// };

// const updateAdminTransferStatus = async (transferId: string, newStatus: string, failureReason: string | null, token: string) => {
//     try {
//         const payload = { status: newStatus };
//         if (failureReason) {
//             payload['failureReason'] = failureReason; // Include failure reason if provided
//         }
//         const response = await axios.put(`/admin/transfers/${transferId}/status`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating transfer status for ${transferId} to ${newStatus}:`, error);
//         throw error.response?.data?.message || 'Failed to update transfer status.';
//     }
// };

// export default {
//     getAdminTransfers,
//     getAdminTransferById,
//     updateAdminTransferStatus,
// };


// frontend/src/services/admin/transfer.ts
import axios from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if necessary

axios.defaults.baseURL = apiConfig.baseUrl;

const getAdminTransfers = async (token: string, filters?: { status?: string }) => {
    try {
        const params = filters || {}; // Use filters if provided, else empty object
        const response = await axios.get('/admin/transfers', {
            headers: { Authorization: `Bearer ${token}` },
            params: params, // Pass filters as query parameters
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admin transfers:", error);
        // It's often better to throw the original error or a custom error object
        // containing more info, but re-throwing the message is common.
        const message = (error as any).response?.data?.message || 'Failed to fetch transfers.';
        throw new Error(message); // Throw an actual Error object
    }
};

const getAdminTransferById = async (transferId: string, token: string) => {
    try {
        const response = await axios.get(`/admin/transfers/${transferId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching admin transfer by ID ${transferId}:`, error);
        const message = (error as any).response?.data?.message || 'Failed to fetch transfer details.';
        throw new Error(message); // Throw an actual Error object
    }
};

const updateAdminTransferStatus = async (transferId: string, newStatus: string, failureReason: string | null, token: string) => {
    try {
        // Define the type for the payload explicitly if possible
        const payload: { status: string; failureReason?: string } = { status: newStatus };
        if (failureReason !== null && failureReason !== undefined) { // Check explicitly against null/undefined
            payload.failureReason = failureReason; // Include failure reason if provided and not null/undefined
        }
        const response = await axios.put(`/admin/transfers/${transferId}/status`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating transfer status for ${transferId} to ${newStatus}:`, error);
        const message = (error as any).response?.data?.message || 'Failed to update transfer status.';
        throw new Error(message); // Throw an actual Error object
    }
};

// --- Fix Start ---
// Assign the object to a named constant
const adminTransferService = {
    getAdminTransfers,
    getAdminTransferById,
    updateAdminTransferStatus,
};

// Export the named constant as the default
export default adminTransferService;
// --- Fix End ---