// // src/app/hooks/useSendAmountLogic.ts
// import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import axios from 'axios';
// import { debounce } from 'lodash';
// import { useAuth } from './useAuth'; // Adjust path
// import apiConfig from '../config/apiConfig'; // Adjust path

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (Copied from original) ---
// export interface AccountDetails { /* ... */
//     _id: string;
//     balance: number;
//     currency: { _id: string; code: string; flagImage?: string; };
// }
// export interface RecipientDetails { /* ... */
//     _id: string;
//     accountHolderName: string;
//     nickname?: string;
//     currency: { _id: string; code: string; flagImage?: string; };
//     accountNumber?: string;
// }
// export interface SendSummary { /* ... */
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrencyCode: string;
//     receiveCurrencyCode: string;
//     exchangeRate: number;
//     liveExchangeRate?: number | null;
//     rateAdjustmentApplied?: number;
//     availableBalance: number; // This might be redundant if sourceAccount is available
//     sourceAccountId?: string;
//     recipientId?: string;
//     userId?: string;
// }

// export const useSendAmountLogic = (balanceId?: string, recipientId?: string | null) => {
//     const { token } = useAuth();

//     // --- Core Data State ---
//     const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
//     const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
//     const [summary, setSummary] = useState<SendSummary | null>(null);
//     const [initialRateSummary, setInitialRateSummary] = useState<SendSummary | null>(null);

//     // --- Operational State ---
//     const [isLoading, setIsLoading] = useState(true); // Initial data load
//     const [isCalculating, setIsCalculating] = useState(false); // Debounced calculation
//     const [error, setError] = useState<string | null>(null); // User-facing errors (validation, balance)
//     const [apiError, setApiError] = useState<string | null>(null); // API specific errors

//     // --- Refs for Debounce ---
//     const sourceAccountRef = useRef(sourceAccount);
//     const recipientRef = useRef(recipient);
//     const tokenRef = useRef(token);
//     const errorRef = useRef(error); // Ref to access latest error state

//     useEffect(() => { sourceAccountRef.current = sourceAccount; }, [sourceAccount]);
//     useEffect(() => { recipientRef.current = recipient; }, [recipient]);
//     useEffect(() => { tokenRef.current = token; }, [token]);
//     useEffect(() => { errorRef.current = error; }, [error]);

//     // --- Fetch Initial Data ---
//     useEffect(() => {
//         const fetchInitialData = async () => {
//             console.log("Hook: Fetching initial data and rates...");
//             setIsLoading(true);
//             setApiError(null); setError(null); setSummary(null); setInitialRateSummary(null);
//             setSourceAccount(null); setRecipient(null); // Clear previous data

//             if (!recipientId || !balanceId || !token) {
//                 setError("Missing required information.");
//                 setIsLoading(false);
//                 return;
//             }

//             let fetchedAccount: AccountDetails | null = null;
//             let fetchedRecipient: RecipientDetails | null = null;

//             try {
//                 const [accountRes, recipientRes] = await Promise.all([
//                     axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
//                     axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
//                 ]);
//                 fetchedAccount = accountRes.data;
//                 fetchedRecipient = recipientRes.data;
//                 setSourceAccount(fetchedAccount);
//                 setRecipient(fetchedRecipient);
//                 console.log("Hook: Account/Recipient loaded.");

//                 // Fetch initial rate context
//                 if (fetchedAccount && fetchedRecipient) {
//                     setIsCalculating(true); // Indicate rate fetch
//                     try {
//                         const initialRateResponse = await axios.post<SendSummary>(
//                             '/transfers/calculate-summary',
//                             { sourceAccountId: fetchedAccount._id, recipientId: fetchedRecipient._id, amount: 1, isSendingAmount: true },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         setInitialRateSummary(initialRateResponse.data);
//                         console.log("Hook: Initial rates loaded.", initialRateResponse.data);
//                         setApiError(null);
//                     } catch (rateErr: any) {
//                         console.error("Hook: Error fetching initial rates:", rateErr);
//                         setApiError(rateErr.response?.data?.message || "Failed to load initial exchange rates.");
//                         setInitialRateSummary(null);
//                     } finally {
//                         setIsCalculating(false); // Rate fetch finished
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Hook: Error fetching account/recipient:", err);
//                 const message = err.response?.data?.message || "Failed to load required details.";
//                 setError(message);
//                 setApiError(message);
//             } finally {
//                 setIsLoading(false);
//                 console.log("Hook: Initial fetch complete.");
//             }
//         };
//         fetchInitialData();
//     }, [balanceId, recipientId, token]);

//     // --- Debounced Calculation ---
//     const calculateSummary = useMemo(
//         () =>
//             debounce(async (amount: number, isSending: boolean): Promise<SendSummary | null> => {
//                 const currentSourceAccount = sourceAccountRef.current;
//                 const currentRecipient = recipientRef.current;
//                 const currentToken = tokenRef.current;
//                 const currentError = errorRef.current; // Use ref

//                 // Bail out conditions
//                 if (!currentSourceAccount || !currentRecipient || !currentToken || isNaN(amount) || amount <= 0) {
//                     console.log("Hook: Calculation skipped (invalid input/state).");
//                     setSummary(null); // Clear summary if input is invalid
//                     setIsCalculating(false);
//                      if (currentError && currentError !== "Insufficient balance.") setError(null); // Clear non-balance errors
//                      setApiError(null);
//                     return null;
//                 }

//                 console.log(`Hook: Debounced calculate running: amount=${amount}, isSending=${isSending}`);
//                 setIsCalculating(true);
//                  if (currentError && currentError !== "Insufficient balance.") setError(null); // Clear non-balance errors
//                 setApiError(null); // Clear previous API calc errors

//                 try {
//                     const response = await axios.post<SendSummary>(
//                         '/transfers/calculate-summary',
//                         { sourceAccountId: currentSourceAccount._id, recipientId: currentRecipient._id, amount, isSendingAmount: isSending },
//                         { headers: { Authorization: `Bearer ${currentToken}` } }
//                     );
//                     console.log("Hook: Calculation success:", response.data);
//                     setSummary(response.data);
//                     setError(null); // Clear errors on success
//                     setApiError(null);

//                     // Post-calculation balance check
//                     if (response.data.sendAmount > currentSourceAccount.balance) {
//                         setError("Insufficient balance."); // Set error but keep summary
//                     }
//                     return response.data; // Return the calculated summary

//                 } catch (err: any) {
//                     console.error("Hook: Calculation error:", err);
//                     const message = err.response?.data?.message || "Calculation failed.";
//                     const code = err.response?.data?.code;
//                     setApiError(message);
//                     setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
//                     setSummary(null); // Clear summary on error
//                     return null; // Indicate failure
//                 } finally {
//                     setIsCalculating(false);
//                     console.log("Hook: Calculation finished.");
//                 }
//             }, 500),
//         [] // No dependencies needed due to refs
//     );

//     // --- Helper to cancel pending calculation ---
//     const cancelCalculation = useCallback(() => {
//         calculateSummary.cancel();
//         setIsCalculating(false); // Ensure state is reset
//     }, [calculateSummary]);

//     return {
//         sourceAccount,
//         recipient,
//         summary,
//         initialRateSummary,
//         isLoading,
//         isCalculating,
//         error,
//         apiError,
//         calculateSummary,
//         cancelCalculation,
//         setError // Expose setError for direct manipulation (e.g., on continue click)
//     };
// };


// src/app/hooks/useSendAmountLogic.ts
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { debounce } from 'lodash';
import { useAuth } from '../contexts/AuthContext'; // Adjust path
import apiConfig from '../config/apiConfig'; // Adjust path

axios.defaults.baseURL = apiConfig.baseUrl;

// --- Interfaces (Copied from original) ---
export interface AccountDetails {
    _id: string;
    balance: number;
    currency: { _id: string; code: string; flagImage?: string; };
}
export interface RecipientDetails {
    _id: string;
    accountHolderName: string;
    nickname?: string;
    currency: { _id: string; code: string; flagImage?: string; };
    accountNumber?: string;
}
export interface SendSummary {
    totalFee: any;
    sendAmount: number;
    receiveAmount: number;
    sendCurrencyCode: string;
    receiveCurrencyCode: string;
    exchangeRate: number;
    liveExchangeRate?: number | null;
    rateAdjustmentApplied?: number;
    availableBalance: number; // This might be redundant if sourceAccount is available
    sourceAccountId?: string;
    recipientId?: string;
    userId?: string;
}

// --- Interface for expected API Error data structure ---
interface ApiErrorData {
    message?: string;
    code?: string;
    // Add other potential fields if your API returns more structured errors
}

export const useSendAmountLogic = (balanceId?: string, recipientId?: string | null) => {
    const { token } = useAuth();

    // --- Core Data State ---
    const [sourceAccount, setSourceAccount] = useState<AccountDetails | null>(null);
    const [recipient, setRecipient] = useState<RecipientDetails | null>(null);
    const [summary, setSummary] = useState<SendSummary | null>(null);
    const [initialRateSummary, setInitialRateSummary] = useState<SendSummary | null>(null);

    // --- Operational State ---
    const [isLoading, setIsLoading] = useState(true); // Initial data load
    const [isCalculating, setIsCalculating] = useState(false); // Debounced calculation
    const [error, setError] = useState<string | null>(null); // User-facing errors (validation, balance)
    const [apiError, setApiError] = useState<string | null>(null); // API specific errors

    // --- Refs for Debounce ---
    const sourceAccountRef = useRef(sourceAccount);
    const recipientRef = useRef(recipient);
    const tokenRef = useRef(token);
    const errorRef = useRef(error); // Ref to access latest error state

    useEffect(() => { sourceAccountRef.current = sourceAccount; }, [sourceAccount]);
    useEffect(() => { recipientRef.current = recipient; }, [recipient]);
    useEffect(() => { tokenRef.current = token; }, [token]);
    useEffect(() => { errorRef.current = error; }, [error]);

    // --- Fetch Initial Data ---
    useEffect(() => {
        const fetchInitialData = async () => {
            // console.log("Hook: Fetching initial data and rates...");
            setIsLoading(true);
            setApiError(null); setError(null); setSummary(null); setInitialRateSummary(null);
            setSourceAccount(null); setRecipient(null); // Clear previous data

            if (!recipientId || !balanceId || !token) {
                setError("Missing required information.");
                setIsLoading(false);
                return;
            }

            let fetchedAccount: AccountDetails | null = null;
            let fetchedRecipient: RecipientDetails | null = null;

            try {
                const [accountRes, recipientRes] = await Promise.all([
                    axios.get<AccountDetails>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                fetchedAccount = accountRes.data;
                fetchedRecipient = recipientRes.data;
                setSourceAccount(fetchedAccount);
                setRecipient(fetchedRecipient);
                // console.log("Hook: Account/Recipient loaded.");

                // Fetch initial rate context
                if (fetchedAccount && fetchedRecipient) {
                    setIsCalculating(true); // Indicate rate fetch
                    try {
                        const initialRateResponse = await axios.post<SendSummary>(
                            '/transfers/calculate-summary',
                            { sourceAccountId: fetchedAccount._id, recipientId: fetchedRecipient._id, amount: 1, isSendingAmount: true },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setInitialRateSummary(initialRateResponse.data);
                        // console.log("Hook: Initial rates loaded.", initialRateResponse.data);
                        setApiError(null);
                    } catch (rateErr: unknown) { // <-- FIX 1: Use unknown
                        console.error("Hook: Error fetching initial rates:", rateErr);
                        let message = "Failed to load initial exchange rates."; // Default
                        if (axios.isAxiosError<ApiErrorData>(rateErr)) {
                            message = rateErr.response?.data?.message || rateErr.message || message;
                        } else if (rateErr instanceof Error) {
                             message = rateErr.message;
                        }
                        setApiError(message);
                        setInitialRateSummary(null);
                    } finally {
                        setIsCalculating(false); // Rate fetch finished
                    }
                }
            } catch (err: unknown) { // <-- FIX 2: Use unknown
                console.error("Hook: Error fetching account/recipient:", err);
                let message = "Failed to load required details."; // Default
                if (axios.isAxiosError<ApiErrorData>(err)) {
                     message = err.response?.data?.message || err.message || message;
                } else if (err instanceof Error) {
                    message = err.message;
                }
                setError(message);
                setApiError(message); // Also set apiError for consistency if needed
            } finally {
                setIsLoading(false);
                // console.log("Hook: Initial fetch complete.");
            }
        };
        fetchInitialData();
    }, [balanceId, recipientId, token]);

    // --- Debounced Calculation ---
    const calculateSummary = useMemo(
        () =>
            debounce(async (amount: number, isSending: boolean): Promise<SendSummary | null> => {
                const currentSourceAccount = sourceAccountRef.current;
                const currentRecipient = recipientRef.current;
                const currentToken = tokenRef.current;
                const currentError = errorRef.current; // Use ref

                // Bail out conditions
                if (!currentSourceAccount || !currentRecipient || !currentToken || isNaN(amount) || amount <= 0) {
                    // console.log("Hook: Calculation skipped (invalid input/state).");
                    setSummary(null); // Clear summary if input is invalid
                    setIsCalculating(false);
                     if (currentError && currentError !== "Insufficient balance.") setError(null); // Clear non-balance errors
                     setApiError(null);
                    return null;
                }

                // console.log(`Hook: Debounced calculate running: amount=${amount}, isSending=${isSending}`);
                setIsCalculating(true);
                 if (currentError && currentError !== "Insufficient balance.") setError(null); // Clear non-balance errors
                setApiError(null); // Clear previous API calc errors

                try {
                    const response = await axios.post<SendSummary>(
                        '/transfers/calculate-summary',
                        { sourceAccountId: currentSourceAccount._id, recipientId: currentRecipient._id, amount, isSendingAmount: isSending },
                        { headers: { Authorization: `Bearer ${currentToken}` } }
                    );
                    // console.log("Hook: Calculation success:", response.data);
                    setSummary(response.data);
                    setError(null); // Clear errors on success
                    setApiError(null);

                    // Post-calculation balance check
                    if (response.data.sendAmount > currentSourceAccount.balance) {
                        setError("Insufficient balance."); // Set error but keep summary
                    }
                    return response.data; // Return the calculated summary

                } catch (err: unknown) { // <-- FIX 3: Use unknown
                    console.error("Hook: Calculation error:", err);
                    let message = "Calculation failed."; // Default
                    let code: string | undefined = undefined;

                    if (axios.isAxiosError<ApiErrorData>(err)) {
                        message = err.response?.data?.message || err.message || message;
                        code = err.response?.data?.code;
                    } else if (err instanceof Error) {
                        message = err.message;
                    }

                    setApiError(message);
                    setError(code === 'INSUFFICIENT_BALANCE' ? "Insufficient balance." : message);
                    setSummary(null); // Clear summary on error
                    return null; // Indicate failure
                } finally {
                    setIsCalculating(false);
                    // console.log("Hook: Calculation finished.");
                }
            }, 500),
        [] // No dependencies needed due to refs
    );

    // --- Helper to cancel pending calculation ---
    const cancelCalculation = useCallback(() => {
        calculateSummary.cancel();
        setIsCalculating(false); // Ensure state is reset
    }, [calculateSummary]);

    return {
        sourceAccount,
        recipient,
        summary,
        initialRateSummary,
        isLoading,
        isCalculating,
        error,
        apiError,
        calculateSummary,
        cancelCalculation,
        setError // Expose setError for direct manipulation (e.g., on continue click)
    };
};