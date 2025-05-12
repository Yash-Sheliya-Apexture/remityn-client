// frontend/src/services/admin/activity.admin.ts
import axios, { AxiosError } from 'axios';
import apiConfig from '../../config/apiConfig'; // Adjust path if needed

export interface ActivityUser {
    name?: string | null;
    role?: string; // if available
}

export interface ActivityDetails {
    amount?: number;
    currency?: string;
    status?: string;
    sendAmount?: number;
    sendCurrency?: string;
}

export interface ActivityItem {
    _id?: string; // May not always exist if it's a synthetic ID
    type: 'NEW_USER' | 'NEW_PAYMENT' | 'NEW_TRANSFER' | 'KYC_PENDING' | string; // Allow other string types
    timestamp: string; // ISO Date string
    message: string;
    itemId: string; // ID of the user, payment, transfer etc.
    user?: ActivityUser | null;
    details?: ActivityDetails | null;
}

export interface ActivityPagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    filtersApplied?: ActivityFilters; // So frontend knows what filters were used by backend
}

export interface ActivityFilters {
    startDate?: string | null; // YYYY-MM-DD
    endDate?: string | null;   // YYYY-MM-DD
    type?: 'NEW_USER' | 'NEW_PAYMENT' | 'NEW_TRANSFER' | 'KYC_PENDING' | string | null;
}


// This is the expected successful response structure
export interface RecentActivitySuccessResponse {
    success: true; // Literal true for success
    data: ActivityItem[];
    pagination: ActivityPagination;
}

// This could be the structure if the backend API call itself was "successful" (e.g. 200 OK)
// but the operation failed logically (e.g. success: false with a message)
export interface RecentActivityLogicalErrorResponse {
    success: false; // Literal false for logical error
    message: string;
    data?: null; // Optional, usually null or empty on error
    pagination?: null;
}

// Union type for the overall API response
export type RecentActivityApiResponse = RecentActivitySuccessResponse | RecentActivityLogicalErrorResponse;


interface ApiErrorData { // For Axios errors (e.g. 4xx, 5xx status codes)
    message?: string;
    // other potential error fields from backend for HTTP errors
}

const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
}, error => Promise.reject(error));

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorData>;
        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }
        return axiosError.message || 'An API error occurred';
    }
    return error instanceof Error ? error.message : 'An unknown error occurred.';
};

/**
 * Fetches recent activities for the admin panel.
 * @param limit - Number of activities per page.
 * @param page - Current page number.
 * @param filters - Optional filters for startDate, endDate, and activity type.
 * @returns A promise resolving to the API response data if successful.
 * @throws An error with a message if fetching fails.
 */
const getRecentActivities = async (
    limit: number = 5,
    page: number = 1,
    filters?: ActivityFilters
): Promise<RecentActivitySuccessResponse> => {
    try {
        const params: any = { limit, page };
        if (filters?.startDate) params.startDate = filters.startDate;
        if (filters?.endDate) params.endDate = filters.endDate;
        if (filters?.type) params.type = filters.type;

        const response = await apiClient.get<RecentActivityApiResponse>(`/admin/activity`, { params });

        if (response.data && response.data.success === true) {
            return response.data;
        } else if (response.data && response.data.success === false) {
            throw new Error(response.data.message || 'API returned a failure status for recent activities.');
        } else {
            throw new Error('Invalid response format received for recent activities.');
        }
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

const activityAdminService = {
    getRecentActivities,
};

export default activityAdminService;