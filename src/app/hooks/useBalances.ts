// // frontend/src/hooks/useBalances.ts
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
// import apiConfig from '../config/apiConfig'; // Adjust path if needed

// // Re-use or define the Account interface (ensure consistency)
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string; // Optional flag image URL
// }

// interface Account {
//     _id: string;
//     balance: string; // Or number, ensure consistency with API
//     currency: Currency; // Use the detailed Currency interface
//     user: string; // User ID
//     createdAt: string;
//     updatedAt: string;
// }

// interface UseBalancesResult {
//     balances: Account[];
//     isLoading: boolean;
//     error: string | null;
//     refetchBalances: () => void; // Function to manually trigger refetch
// }

// axios.defaults.baseURL = apiConfig.baseUrl;

// export const useBalances = (): UseBalancesResult => {
//     const [balances, setBalances] = useState<Account[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     const fetchBalances = useCallback(async () => {
//         if (!token) {
//             // Don't set loading to true if there's no token,
//             // maybe the user is logged out. Let components handle lack of data.
//             // setIsLoading(false); // Already false initially or after logout
//             setBalances([]); // Clear balances if token disappears
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         // console.log('Fetching balances with token:', token ? 'present' : 'absent'); // Debug log

//         try {
//             // Adjust endpoint and response structure as needed
//             const response = await axios.get<{ data: Account[] }>('/accounts', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // console.log('Balances fetched:', response.data); // Debug log
//             // Assuming API returns { data: [...] }
//             setBalances(response.data.data || response.data || []); // Handle different possible structures
//         } catch (err: unknown) {
//             // console.error("Error fetching balances:", err); // Debug log
//             let errorMessage = "Failed to fetch balances";
//              if (axios.isAxiosError(err)) {
//                 errorMessage = err.response?.data?.message || err.message || errorMessage;
//                 if (err.response?.status === 401) {
//                    // Handle unauthorized access if needed (e.g., redirect in component)
//                    setError("Unauthorized. Please log in again.");
//                 } else {
//                    setError(errorMessage);
//                 }
//              } else if (err instanceof Error) {
//                 errorMessage = err.message;
//                 setError(errorMessage);
//              } else {
//                setError(errorMessage);
//              }
//              setBalances([]); // Clear balances on error
//         } finally {
//             setIsLoading(false);
//         }
//     }, [token]); // Dependency on token

//     useEffect(() => {
//         fetchBalances();
//     }, [fetchBalances]); // Fetch when hook mounts or token changes

//     // Provide a way to refetch manually if needed
//     const refetchBalances = () => {
//         fetchBalances();
//     };


//     return { balances, isLoading, error, refetchBalances };
// };






// frontend/src/hooks/useBalances.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
import apiConfig from '../config/apiConfig'; // Adjust path if needed

// Ensure these interfaces match expectations in components
interface Currency {
    _id: string;
    code: string;
    name: string; // Ensure API provides name if needed
    flagImage?: string;
}

interface Account {
    _id: string;
    balance: string; // Ensure API provides string if components expect string
    currency: Currency;
    user: string;
    createdAt: string;
    updatedAt: string;
}

interface UseBalancesResult {
    balances: Account[];
    isLoading: boolean;
    error: string | null;
    refetchBalances: () => void;
}

axios.defaults.baseURL = apiConfig.baseUrl;

export const useBalances = (): UseBalancesResult => {
    const [balances, setBalances] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Start true to trigger initial load display
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const fetchBalances = useCallback(async (isInitialLoad = false) => {
        if (!token) {
            setBalances([]);
            // Only set loading false if it wasn't an initial load scenario handled by useEffect
            if (!isInitialLoad) setIsLoading(false);
            // Set error only if token was expected but missing? Or let components handle based on token state.
            // setError("Not authenticated.");
            return;
        }

        // Don't reset loading to true on manual refetch if already loading? Optional.
        // if (!isLoading) setIsLoading(true); // Or always set true on fetch start
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<{ data: Account[] }>('/accounts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBalances(response.data.data || response.data || []);
        } catch (err: unknown) {
            let errorMessage = "Failed to fetch balances";
             if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || err.message || errorMessage;
                if (err.response?.status === 401) {
                   setError("Unauthorized. Please log in again.");
                   // Consider calling logout() from useAuth here if appropriate
                } else {
                   setError(errorMessage);
                }
             } else if (err instanceof Error) {
                setError(err.message);
             } else {
               setError(errorMessage);
             }
             setBalances([]);
        } finally {
            setIsLoading(false);
        }
    }, [token]); // Removed isLoading from dependency array

    useEffect(() => {
        // console.log("useBalances useEffect: Fetching initial balances. Token present:", !!token);
        fetchBalances(true); // Pass flag for initial load
    }, [fetchBalances]); // Depend on the stable fetchBalances callback

    const refetchBalances = useCallback(() => {
        // console.log("useBalances: Manual refetch triggered.");
        fetchBalances(false); // Not an initial load
    }, [fetchBalances]);


    return { balances, isLoading, error, refetchBalances };
};