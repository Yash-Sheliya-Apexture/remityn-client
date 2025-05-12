// // frontend/src/services/admin/stats.admin.ts
// import axios, { AxiosError } from 'axios';
// import apiConfig from '../../config/apiConfig'; // Adjust path if needed


// export interface PopularCorridorStat {
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     count: number;
//     percentage: number;
//     // Optional: if you add names/flags from backend
//     // sendCurrencyName?: string;
//     // receiveCurrencyName?: string;
// }

// // Define the expected structure for individual dashboard stats
// export interface AdminDashboardStats {
//     totalUsers: number;
//     growthPercentageThisWeek: number;
//     todaysAddMoneyCount: number;         // <-- ADD THIS
//     addMoneyChangePercentage: number;   // <-- ADD THIS
//     todaysSendMoneyCount: number;         // <-- ADD THIS
//     sendMoneyChangePercentage: number;    // <-- ADD THIS
//     completedTransfersThisMonth: number;  // <-- ADD THIS
//     completedTransfersChangeCount: number;// <-- ADD THIS
//     popularCorridors: PopularCorridorStat[]; // <-- ADD THIS
//     // --- ADDED/UPDATED KYC fields ---
//     kycNotStartedCount: number; // Added
//     kycPendingCount: number;
//     kycVerifiedCount: number;
//     kycRejectedCount: number; // Added
//     kycSkippedCount: number;
//     // --- END ADDED/UPDATED ---
// }

// // Define the structure for the API response that wraps the stats data
// interface AdminDashboardStatsApiResponse {
//     success: boolean;
//     data: AdminDashboardStats;
//     message?: string; // Optional message from backend
// }

// // Interface for potential API error responses (if backend sends structured errors)
// interface ApiErrorData {
//     message?: string;
//     // Add other potential error fields if your backend sends them
// }


// // --- NEW: Interface for Chart Data Point ---
// export interface ChartDataPoint {
//     date: string; // Format 'YYYY-MM-DD'
//     volume: number;
// }

// // --- NEW: Interface for Chart API Response ---
// export interface ChartDataResponse {
//     success: boolean;
//     data: ChartDataPoint[];
//     message?: string; // Optional error message
// }


// // --- NEW: Interfaces for Balance Distribution Chart ---
// export interface BalanceDistributionDataPoint {
//     currencyCode: string;
//     currencyName: string;
//     totalBalance: number;
//     fill?: string; // Optional: for chart item color, can be assigned on frontend
// }

// export interface BalanceDistributionApiResponse {
//     success: boolean;
//     data: BalanceDistributionDataPoint[];
//     message?: string;
// }
// // --- END NEW ---



// // --- Axios Client Setup (reuse or create new if specific config needed) ---
// // This assumes you have a shared apiClient or can create one here.
// // If you already have user.admin.ts with apiClient, you might want to centralize it.
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     withCredentials: true, // Important for session cookies or future auth mechanisms
// });

// // --- Authorization Token Interceptor (same as in user.admin.ts) ---
// apiClient.interceptors.request.use(config => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem('token');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => {
//     console.error("[Admin Stats API Interceptor] Request error:", error);
//     return Promise.reject(error);
// });

// // --- Helper to Extract Error Message (can be shared) ---
// const getErrorMessage = (error: unknown): string => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<ApiErrorData>;
//         if (axiosError.response) {
//             console.error("Admin Stats API Error Response:", {
//                 status: axiosError.response.status,
//                 data: axiosError.response.data,
//                 url: axiosError.config?.url,
//             });
//             return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
//         } else if (axiosError.request) {
//             return 'Network error: Could not connect to the server.';
//         } else {
//             return `Request setup failed: ${axiosError.message}`;
//         }
//     } else if (error instanceof Error) {
//         return error.message;
//     }
//     return 'An unknown error occurred.';
// };


// // --- Admin Stats Service Functions ---

// /**
//  * Fetches overview statistics for the admin dashboard.
//  * @returns {Promise<AdminDashboardStats>} A promise resolving to the stats object.
//  * @throws {Error} If the request fails or data is invalid.
//  */
// const getAdminDashboardOverviewStats = async (): Promise<AdminDashboardStats> => {
//     try {
//         console.log('[Admin Stats Service] Fetching dashboard overview stats...');
//         const response = await apiClient.get<AdminDashboardStatsApiResponse>(`/admin/stats/overview`);

//         if (response.data && response.data.success && response.data.data) {
//             console.log('[Admin Stats Service] Stats fetched successfully:', response.data.data);
//             return response.data.data;
//         } else {
//             console.error('[Admin Stats Service] Invalid stats response format:', response.data);
//             throw new Error(response.data?.message || 'Invalid data received for dashboard stats.');
//         }
//     } catch (error: unknown) {
//         const message = getErrorMessage(error);
//         console.error(`[Admin Stats Service] Error fetching dashboard overview stats: ${message}`, error);
//         throw new Error(message);
//     }
// };

// // --- NEW: Function to fetch Chart Data ---
// type ChartType = 'payments' | 'transfers';
// type ChartRange = 'month' | 'year' | 'all'; // Added 'all'
// // --- END MODIFIED ---

// const getAdminChartData = async (type: ChartType, range: ChartRange): Promise<ChartDataPoint[]> => {
//     try {
//         console.log(`Fetching chart data - Type: ${type}, Range: ${range}`); // Log frontend call
//         const response = await apiClient.get<ChartDataResponse>(`/admin/stats/chart-data`, {
//             params: { type, range }
//         });
//         if (response.data && response.data.success && Array.isArray(response.data.data)) {
//             console.log(`Received ${response.data.data.length} data points for ${type}/${range}`);
//             return response.data.data;
//         }
//         // Throw error if success is false or data is not an array
//         throw new Error(response.data?.message || `Invalid data received for ${type} chart.`);
//     } catch (error: unknown) {
//         console.error(`Error fetching chart data for ${type}/${range}:`, error);
//         // Re-throw the processed error message
//         throw new Error(getErrorMessage(error));
//     }
// };
// // --- END NEW ---


// // --- NEW: Function to fetch Balance Distribution Data ---
// const getAdminBalanceDistribution = async (): Promise<BalanceDistributionDataPoint[]> => {
//     try {
//         console.log('[Admin Stats Service] Fetching balance distribution data...');
//         const response = await apiClient.get<BalanceDistributionApiResponse>(`/admin/stats/balance-distribution`);

//         if (response.data && response.data.success && Array.isArray(response.data.data)) {
//             console.log('[Admin Stats Service] Balance distribution data fetched successfully:', response.data.data.length, "currencies");
//             return response.data.data;
//         } else {
//             console.error('[Admin Stats Service] Invalid balance distribution response format:', response.data);
//             throw new Error(response.data?.message || 'Invalid data received for balance distribution.');
//         }
//     } catch (error: unknown) {
//         const message = getErrorMessage(error);
//         console.error(`[Admin Stats Service] Error fetching balance distribution data: ${message}`, error);
//         throw new Error(message);
//     }
// };
// // --- END NEW ---


// const statsAdminService = {
//     getAdminDashboardOverviewStats,
//     getAdminChartData, // <-- Export new function
//     getAdminBalanceDistribution, // <-- Export new function
// };

// export default statsAdminService;
// export type { ChartType, ChartRange }; // Export new types


// frontend/src/services/admin/stats.admin.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed


export interface PopularCorridorStat {
    sendCurrencyCode: string;
    receiveCurrencyCode: string;
    count: number;
    percentage: number;
}

export interface AdminDashboardStats {
    totalUsers: number;
    growthPercentageThisWeek: number;
    todaysAddMoneyCount: number;
    addMoneyChangePercentage: number;
    todaysSendMoneyCount: number;
    sendMoneyChangePercentage: number;
    completedTransfersThisMonth: number;
    completedTransfersChangeCount: number;
    popularCorridors: PopularCorridorStat[];
    kycNotStartedCount: number;
    kycPendingCount: number;
    kycVerifiedCount: number;
    kycRejectedCount: number;
    kycSkippedCount: number;
}

interface AdminDashboardStatsApiResponse {
    success: boolean;
    data: AdminDashboardStats;
    message?: string;
}

interface ApiErrorData {
    message?: string;
}

// --- MODIFIED: Chart Data Point and Range Types ---
export type ChartRange = 'month' | 'year' | 'all' | 'by_currency'; // Already exported here

// A more generic data point for charts.
// 'category' will hold dates for time-series or currency codes for 'by_currency'
export interface ChartDataPoint {
    category: string;      // Date string (YYYY-MM-DD) or Currency Code
    volume: number;
    currencyName?: string; // Optional, for 'by_currency' to display in tooltips if needed
}
// --- END MODIFIED ---

export interface ChartDataResponse {
    success: boolean;
    data: ChartDataPoint[]; // Uses the generic ChartDataPoint
    message?: string;
}


export interface BalanceDistributionDataPoint {
    currencyCode: string;
    currencyName: string;
    totalBalance: number;
    fill?: string;
}

export interface BalanceDistributionApiResponse {
    success: boolean;
    data: BalanceDistributionDataPoint[];
    message?: string;
}


const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    console.error("[Admin Stats API Interceptor] Request error:", error);
    return Promise.reject(error);
});

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response) {
            console.error("Admin Stats API Error Response:", {
                status: axiosError.response.status,
                data: axiosError.response.data,
                url: axiosError.config?.url,
            });
            return axiosError.response.data?.message || axiosError.message || `Request failed with status ${axiosError.response.status}`;
        } else if (axiosError.request) {
            return 'Network error: Could not connect to the server.';
        } else {
            return `Request setup failed: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred.';
};


const getAdminDashboardOverviewStats = async (): Promise<AdminDashboardStats> => {
    try {
        console.log('[Admin Stats Service] Fetching dashboard overview stats...');
        const response = await apiClient.get<AdminDashboardStatsApiResponse>(`/admin/stats/overview`);

        if (response.data && response.data.success && response.data.data) {
            console.log('[Admin Stats Service] Stats fetched successfully:', response.data.data);
            return response.data.data;
        } else {
            console.error('[Admin Stats Service] Invalid stats response format:', response.data);
            throw new Error(response.data?.message || 'Invalid data received for dashboard stats.');
        }
    } catch (error: unknown) {
        const message = getErrorMessage(error);
        console.error(`[Admin Stats Service] Error fetching dashboard overview stats: ${message}`, error);
        throw new Error(message);
    }
};

type ChartType = 'payments' | 'transfers'; // ChartType is defined here but not exported inline
// ChartRange is already exported above

const getAdminChartData = async (type: ChartType, range: ChartRange): Promise<ChartDataPoint[]> => {
    try {
        console.log(`Fetching chart data - Type: ${type}, Range: ${range}`);
        const response = await apiClient.get<ChartDataResponse>(`/admin/stats/chart-data`, {
            params: { type, range }
        });
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
            console.log(`Received ${response.data.data.length} data points for ${type}/${range}`);
            return response.data.data as ChartDataPoint[];
        }
        throw new Error(response.data?.message || `Invalid data received for ${type} chart.`);
    } catch (error: unknown) {
        console.error(`Error fetching chart data for ${type}/${range}:`, error);
        throw new Error(getErrorMessage(error));
    }
};


const getAdminBalanceDistribution = async (): Promise<BalanceDistributionDataPoint[]> => {
    try {
        console.log('[Admin Stats Service] Fetching balance distribution data...');
        const response = await apiClient.get<BalanceDistributionApiResponse>(`/admin/stats/balance-distribution`);

        if (response.data && response.data.success && Array.isArray(response.data.data)) {
            console.log('[Admin Stats Service] Balance distribution data fetched successfully:', response.data.data.length, "currencies");
            return response.data.data;
        } else {
            console.error('[Admin Stats Service] Invalid balance distribution response format:', response.data);
            throw new Error(response.data?.message || 'Invalid data received for balance distribution.');
        }
    } catch (error: unknown) {
        const message = getErrorMessage(error);
        console.error(`[Admin Stats Service] Error fetching balance distribution data: ${message}`, error);
        throw new Error(message);
    }
};


const statsAdminService = {
    getAdminDashboardOverviewStats,
    getAdminChartData,
    getAdminBalanceDistribution,
};

export default statsAdminService;
// --- MODIFIED EXPORT ---
// ChartRange is already exported at its definition.
// ChartType needs to be exported here as it's defined without the `export` keyword.
export type { ChartType };
// --- END MODIFIED EXPORT ---