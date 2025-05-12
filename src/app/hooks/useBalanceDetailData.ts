// // src/app/hooks/useBalanceDetailData.ts
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from './useAuth'; // Adjust path
// import paymentService from '../services/payment'; // Adjust path
// import transferService from '../services/transfer'; // Adjust path
// import apiConfig from '../config/apiConfig'; // Adjust path
// import { Transaction } from '@/types/transaction'; // Adjust path

// // Interface for the detailed balance data fetched directly
// export interface BalanceDetail {
//     _id: string;
//     user: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//         currencyName?: string;
//     };
//     balance: number;
//     accountNumber?: string;
//     createdAt: string;
//     __v?: number;
// }

// // Configure Axios Base URL (if not globally set)
// axios.defaults.baseURL = apiConfig.baseUrl;

// export const useBalanceDetailData = (balanceId: string | undefined) => {
//     const { token } = useAuth();

//     const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions for potential cross-balance filtering later? Keep for now.
//     const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//     const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//     const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//     const [error, setError] = useState<string | null>(null); // General error

//     const fetchData = useCallback(async () => {
//         if (!balanceId || !token) {
//             setError("Missing balance ID or authentication token.");
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//             return;
//         }

//         // Reset states on new fetch
//         setIsLoading(true);
//         setIsTransactionsLoading(true);
//         setError(null);
//         setBalanceDetail(null);
//         setAllTransactions([]); // Reset all if needed, or maybe just balanceSpecific
//         setBalanceSpecificTransactions([]);

//         try {
//             // 1. Fetch Balance Details
//             const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//             const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
//             setBalanceDetail(fetchedBalanceDetail);
//             setIsLoading(false); // Balance details loaded

//             const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
//             if (!currentCurrencyCode) {
//                 throw new Error("Could not determine the currency code for this balance.");
//             }

//             // 2. Fetch Transactions in parallel
//             const [paymentsResult, transfersResult] = await Promise.allSettled([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//             ]);

//             // Process Transactions Results
//             let combinedTransactions: Transaction[] = [];
//             if (paymentsResult.status === 'fulfilled') {
//                 const mappedPayments: Transaction[] = paymentsResult.value.map(payment => ({
//                     ...payment,
//                     type: "Add Money",
//                     status: payment.status?.toLowerCase() ?? 'unknown',
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedPayments];
//             } else {
//                 console.error("Payments fetch error:", paymentsResult.reason);
//                 if (!error) setError("Failed to load payment history."); // Set transaction-specific error
//             }

//             if (transfersResult.status === 'fulfilled') {
//                 const mappedTransfers: Transaction[] = transfersResult.value.map(transfer => ({
//                     ...transfer,
//                     type: "Send Money",
//                     status: transfer.status?.toLowerCase() ?? 'unknown',
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient',
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id,
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedTransfers];
//             } else {
//                 console.error("Transfers fetch error:", transfersResult.reason);
//                 if (!error) setError("Failed to load transfer history."); // Set transaction-specific error
//             }

//             // Sort combined transactions by date (newest first)
//             combinedTransactions.sort((a, b) => {
//                 const dateA = a.updatedAt || a.createdAt;
//                 const dateB = b.updatedAt || b.createdAt;
//                 if (!dateA && !dateB) return 0;
//                 if (!dateA) return 1;
//                 if (!dateB) return -1;
//                 try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//                 catch { return 0; }
//             });

//             setAllTransactions(combinedTransactions); // Store all for potential other uses

//             // Filter specific transactions *after* combining and sorting
//             const filtered = combinedTransactions.filter((transaction) => {
//                 if (transaction.type === "Add Money") {
//                     const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//                     return paymentAccountId === balanceId;
//                 } else if (transaction.type === "Send Money") {
//                     const sourceAccId = typeof transaction.sourceAccount === 'string'
//                                        ? transaction.sourceAccount
//                                        : transaction.sourceAccount?._id;
//                     return sourceAccId === balanceId;
//                 }
//                 return false;
//             });
//             setBalanceSpecificTransactions(filtered);

//             setIsTransactionsLoading(false); // Transactions loading finished

//         } catch (err: any) {
//             console.error("Overall fetch error in useBalanceDetailData:", err);
//             setError(err.response?.data?.message || err.message || "An unexpected error occurred while loading page data.");
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//         }
//     }, [balanceId, token, error]); // Include error dependency cautiously

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [balanceId, token]); // Keep dependencies minimal for initial fetch trigger

//     return {
//         balanceDetail,
//         // allTransactions, // Decide if the parent component needs *all* transactions
//         balanceSpecificTransactions, // Provide the filtered list
//         isLoading, // Loading state for balance detail
//         isTransactionsLoading, // Loading state for transactions
//         error, // Combined error state
//         fetchData, // Allow refetching from parent if needed
//     };
// };




// // src/app/hooks/useBalanceDetailData.ts
// import { useState, useEffect, useCallback } from 'react';
// import axios, { isAxiosError } from 'axios'; // Import isAxiosError
// import { useAuth } from '../contexts/AuthContext'; // Adjust path
// import paymentService from '../services/payment'; // Adjust path
// import transferService from '../services/transfer'; // Adjust path
// import apiConfig from '../config/apiConfig'; // Adjust path
// import { Transaction } from '@/types/transaction'; // Adjust path

// // Interface for the detailed balance data fetched directly
// export interface BalanceDetail {
//     _id: string;
//     user: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//         currencyName?: string;
//     };
//     balance: number;
//     accountNumber?: string;
//     createdAt: string;
//     __v?: number;
// }

// // Configure Axios Base URL (if not globally set)
// // It's often better to create an Axios instance rather than modifying the global default
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// export const useBalanceDetailData = (balanceId: string | undefined) => {
//     const { token } = useAuth();

//     const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//     // Removed allTransactions state as it wasn't used
//     const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//     const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//     const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//     const [error, setError] = useState<string | null>(null); // General error

//     const fetchData = useCallback(async () => {
//         if (!balanceId || !token) {
//             setError("Missing balance ID or authentication token.");
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//             setBalanceDetail(null); // Ensure detail is null if ID/token missing
//             setBalanceSpecificTransactions([]); // Clear transactions
//             return;
//         }

//         // Reset states on new fetch
//         setIsLoading(true);
//         setIsTransactionsLoading(true);
//         setError(null);
//         setBalanceDetail(null);
//         setBalanceSpecificTransactions([]);

//         try {
//             // 1. Fetch Balance Details using the configured apiClient
//             const balanceResponse = await apiClient.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//             const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
//             setBalanceDetail(fetchedBalanceDetail);
//             setIsLoading(false); // Balance details loaded

//             const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
//             if (!currentCurrencyCode) {
//                  // Don't necessarily throw an error, maybe just log and proceed if transactions can still be fetched
//                  console.warn("Could not determine the currency code for this balance. Transactions might still be fetched.");
//                  // Or if it's critical:
//                  // throw new Error("Could not determine the currency code for this balance.");
//             }


//             // 2. Fetch Transactions in parallel
//             // Ensure services also use the token correctly (assuming they handle it internally)
//             const [paymentsResult, transfersResult] = await Promise.allSettled([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//             ]);

//             // Process Transactions Results
//             let combinedTransactions: Transaction[] = [];
//             let transactionErrorOccurred = false; // Flag to track if any transaction fetch failed

//             if (paymentsResult.status === 'fulfilled') {
//                 const mappedPayments: Transaction[] = paymentsResult.value.map(payment => ({
//                     ...payment,
//                     type: "Add Money",
//                     status: payment.status?.toLowerCase() ?? 'unknown',
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedPayments];
//             } else {
//                 console.error("Payments fetch error:", paymentsResult.reason);
//                 transactionErrorOccurred = true;
//                  // Set error only if no other error has been set yet
//                 if (!error) setError("Failed to load payment history.");
//             }

//             if (transfersResult.status === 'fulfilled') {
//                 const mappedTransfers: Transaction[] = transfersResult.value.map(transfer => ({
//                     ...transfer,
//                     type: "Send Money",
//                     status: transfer.status?.toLowerCase() ?? 'unknown',
//                     // Safely access nested properties
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient',
//                     // Handle sourceAccount being string or object
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id,
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedTransfers];
//             } else {
//                 console.error("Transfers fetch error:", transfersResult.reason);
//                 transactionErrorOccurred = true;
//                 // Set error only if no other error has been set yet
//                 if (!error) setError("Failed to load transfer history.");
//             }

//             // Sort combined transactions by date (newest first)
//              combinedTransactions.sort((a, b) => {
//                 // Use updatedAt first, fallback to createdAt
//                 const dateA = a.updatedAt || a.createdAt;
//                 const dateB = b.updatedAt || b.createdAt;
//                 // Handle cases where dates might be missing or invalid
//                 if (!dateA && !dateB) return 0;
//                 if (!dateA) return 1; // Put items without date at the end
//                 if (!dateB) return -1; // Put items without date at the end
//                 try {
//                     // Compare valid dates
//                     return new Date(dateB).getTime() - new Date(dateA).getTime();
//                 } catch (e) {
//                     // Handle potential invalid date strings
//                     console.error("Error parsing date for sorting:", e);
//                     return 0;
//                 }
//             });

//             // Filter specific transactions *after* combining and sorting
//             const filtered = combinedTransactions.filter((transaction) => {
//                 // Ensure transaction.account and transaction.sourceAccount exist before accessing _id
//                 if (transaction.type === "Add Money") {
//                     const paymentAccountId = typeof transaction.account === 'string'
//                         ? transaction.account
//                         : transaction.account?._id; // Use optional chaining
//                     return paymentAccountId === balanceId;
//                 } else if (transaction.type === "Send Money") {
//                     const sourceAccId = typeof transaction.sourceAccount === 'string'
//                         ? transaction.sourceAccount
//                         : transaction.sourceAccount?._id; // Use optional chaining
//                     return sourceAccId === balanceId;
//                 }
//                 return false;
//             });
//             setBalanceSpecificTransactions(filtered);

//             setIsTransactionsLoading(false); // Transactions loading finished (even if some failed)

//             // If a transaction error occurred but balance loaded fine, keep the transaction error message
//             if (transactionErrorOccurred && !error) {
//                  // This case is already handled by setting error inside the Promise.allSettled checks
//                  // setError("Failed to load complete transaction history."); // Or a more specific combined message
//             }


//         } catch (err: unknown) { // Use unknown instead of any
//             console.error("Overall fetch error in useBalanceDetailData:", err);
//             let message = "An unexpected error occurred while loading page data.";
//              // Check if it's an Axios error first
//             if (isAxiosError(err)) {
//                 // Safely access Axios error properties
//                 message = err.response?.data?.message || err.message || message;
//             } else if (err instanceof Error) {
//                 // Handle standard JavaScript errors
//                 message = err.message;
//             } else if (typeof err === 'string') {
//                  // Handle cases where a string might be thrown
//                  message = err;
//             }
//             setError(message);
//             // Ensure loading states are false on any error
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//         }
//     }, [balanceId, token]); // Removed 'error' from dependencies as it's set within the function

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [fetchData]); // Depend on fetchData directly, which depends on balanceId and token

//     return {
//         balanceDetail,
//         // allTransactions, // Removed from return value
//         balanceSpecificTransactions, // Provide the filtered list
//         isLoading, // Loading state for balance detail
//         isTransactionsLoading, // Loading state for transactions
//         error, // Combined error state
//         fetchData, // Allow refetching from parent if needed
//     };
// };


// // src/app/hooks/useBalanceDetailData.ts
// import { useState, useEffect, useCallback } from 'react';
// import axios, { isAxiosError } from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import paymentService, { PaymentDetailsResponse } from '../services/payment'; // Import specific response type
// import transferService, { TransferDetailsResponse } from '../services/transfer'; // Import specific response type
// import apiConfig from '../config/apiConfig';
// import { Transaction, TransactionStatus } from '@/types/transaction'; // Import TransactionStatus

// // Interface for the detailed balance data fetched directly
// export interface BalanceDetail {
//     _id: string;
//     user: string;
//     currency: {
//         _id: string;
//         code: string;
//         flagImage?: string;
//         currencyName?: string;
//     };
//     balance: number;
//     accountNumber?: string;
//     createdAt: string;
//     __v?: number;
// }

// // Configure Axios Base URL
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// export const useBalanceDetailData = (balanceId: string | undefined) => {
//     const { token } = useAuth();

//     const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//     const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchData = useCallback(async () => {
//         if (!balanceId || !token) {
//             setError("Missing balance ID or authentication token.");
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//             setBalanceDetail(null);
//             setBalanceSpecificTransactions([]);
//             return;
//         }

//         setIsLoading(true);
//         setIsTransactionsLoading(true);
//         setError(null);
//         setBalanceDetail(null);
//         setBalanceSpecificTransactions([]);

//         try {
//             // 1. Fetch Balance Details
//             const balanceResponse = await apiClient.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//             const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
//             setBalanceDetail(fetchedBalanceDetail);
//             setIsLoading(false);

//             const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
//             if (!currentCurrencyCode) {
//                  console.warn("Could not determine the currency code for this balance. Transactions might still be fetched.");
//             }

//             // 2. Fetch Transactions in parallel
//             const [paymentsResult, transfersResult] = await Promise.allSettled([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//             ]);

//             // Process Transactions Results
//             let combinedTransactions: Transaction[] = [];
//             let transactionErrorOccurred = false;

//             if (paymentsResult.status === 'fulfilled') {
//                 // ***** MODIFIED MAPPING for Payments *****
//                 const mappedPayments: Transaction[] = paymentsResult.value.map((payment: PaymentDetailsResponse) => ({
//                     _id: payment._id,
//                     type: "Add Money",
//                     // Add type assertion here
//                     status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                     createdAt: payment.createdAt,
//                     updatedAt: payment.updatedAt,
//                     amountToAdd: payment.amountAdded, // Map amountAdded to amountToAdd
//                     // Assuming balanceCurrencyCode relates to the Currency type needed
//                     // This might need more complex mapping if the API doesn't return a Currency object directly
//                     // balanceCurrency: { _id: ??? , code: payment.balanceCurrencyCode },
//                     amountToPay: payment.amountToPay,
//                      // Assuming payInCurrencyCode relates to the Currency type needed
//                     // payInCurrency: { _id: ??? , code: payment.payInCurrencyCode },
//                     account: payment.account ?? payment.accountId, // Use account if available, fallback to accountId
//                     // Keep other potential fields if needed for Transaction type
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedPayments];
//             } else {
//                 console.error("Payments fetch error:", paymentsResult.reason);
//                 transactionErrorOccurred = true;
//                 if (!error) setError("Failed to load payment history.");
//             }

//             if (transfersResult.status === 'fulfilled') {
//                 // ***** MODIFIED MAPPING for Transfers *****
//                 const mappedTransfers: Transaction[] = transfersResult.value.map((transfer: TransferDetailsResponse) => ({
//                     _id: transfer._id,
//                     type: "Send Money",
//                     // Add type assertion here
//                     status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                     createdAt: transfer.createdAt,
//                     updatedAt: transfer.updatedAt,
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient',
//                     sendAmount: transfer.sendAmount,
//                     // Assuming sendCurrency object matches Transaction's Currency type
//                     sendCurrency: transfer.sendCurrency,
//                     receiveAmount: transfer.receiveAmount,
//                     // Assuming receiveCurrency object matches Transaction's Currency type
//                     receiveCurrency: transfer.receiveCurrency,
//                     recipient: transfer.recipient, // Keep full recipient if object, or ID if string
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id, // Correctly map to sourceAccountId
//                     // Keep other potential fields if needed for Transaction type
//                 }));
//                 combinedTransactions = [...combinedTransactions, ...mappedTransfers];
//             } else {
//                 console.error("Transfers fetch error:", transfersResult.reason);
//                 transactionErrorOccurred = true;
//                 if (!error) setError("Failed to load transfer history.");
//             }

//             // Sort combined transactions by date (newest first)
//              combinedTransactions.sort((a, b) => {
//                 const dateA = a.updatedAt || a.createdAt;
//                 const dateB = b.updatedAt || b.createdAt;
//                 if (!dateA && !dateB) return 0;
//                 if (!dateA) return 1;
//                 if (!dateB) return -1;
//                 try {
//                     return new Date(dateB).getTime() - new Date(dateA).getTime();
//                 } catch (e) {
//                     console.error("Error parsing date for sorting:", e);
//                     return 0;
//                 }
//             });

//             // Filter specific transactions *after* combining and sorting
//             const filtered = combinedTransactions.filter((transaction) => {
//                 // Filter for Add Money (Payments)
//                 if (transaction.type === "Add Money") {
//                      // Ensure transaction.account exists before accessing _id
//                     const paymentAccountId = typeof transaction.account === 'string'
//                         ? transaction.account // If account is just the ID string
//                         : transaction.account?._id; // If account is an object with _id
//                     return paymentAccountId === balanceId;
//                 }
//                 // ***** CORRECTED FILTERING for Send Money (Transfers) *****
//                 else if (transaction.type === "Send Money") {
//                     // Use the correctly mapped sourceAccountId
//                     return transaction.sourceAccountId === balanceId;
//                 }
//                 return false;
//             });
//             setBalanceSpecificTransactions(filtered);

//             setIsTransactionsLoading(false);

//             // Error handling remains the same
//             // ...

//         } catch (err: unknown) {
//              console.error("Overall fetch error in useBalanceDetailData:", err);
//             let message = "An unexpected error occurred while loading page data.";
//              if (isAxiosError(err)) {
//                 message = err.response?.data?.message || err.message || message;
//             } else if (err instanceof Error) {
//                 message = err.message;
//             } else if (typeof err === 'string') {
//                  message = err;
//             }
//             setError(message);
//             setIsLoading(false);
//             setIsTransactionsLoading(false);
//         }
//     }, [balanceId, token, error]); // Added 'error' back if needed for conditional setting logic

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [fetchData]); // fetchData dependency is correct

//     return {
//         balanceDetail,
//         balanceSpecificTransactions,
//         isLoading,
//         isTransactionsLoading,
//         error,
//         fetchData,
//     };
// };


// src/app/hooks/useBalanceDetailData.ts
import { useState, useEffect, useCallback } from 'react';
import axios, { isAxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
// Import response types AND the core Transaction type dependencies
import paymentService, { PaymentDetailsResponse } from '../services/payment';
import transferService, { TransferDetailsResponse } from '../services/transfer';
import apiConfig from '../config/apiConfig';
import { Transaction, TransactionStatus, Currency } from '@/types/transaction'; // Import Currency and TransactionStatus

// Interface for the detailed balance data fetched directly (Seems okay)
export interface BalanceDetail {
    _id: string;
    user: string;
    currency: {
        _id: string;
        code: string;
        flagImage?: string;
        currencyName?: string;
        // Potentially add rateAdjustmentPercentage here if needed later
        rateAdjustmentPercentage?: number;
    };
    balance: number;
    accountNumber?: string;
    createdAt: string;
    updatedAt: string; // Added updatedAt if backend provides it
    __v?: number;
}

const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
});

export const useBalanceDetailData = (balanceId: string | undefined) => {
    const { token } = useAuth();

    // Explicitly type state with the possibly extended BalanceDetail
    const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
    const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading for balance detail
    const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Separate loading for transactions
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        // Reset state at the beginning
        setIsLoading(true);
        setIsTransactionsLoading(true);
        setError(null);
        setBalanceDetail(null);
        setBalanceSpecificTransactions([]);


        if (!balanceId || !token) {
            setError("Missing balance ID or authentication token.");
            setIsLoading(false);
            setIsTransactionsLoading(false);
            return;
        }

        console.log(`Fetching data for balance ID: ${balanceId}`); // Log start

        try {
            // 1. Fetch Balance Details
            console.log("Fetching balance details...");
            const balanceResponse = await apiClient.get<BalanceDetail>(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
            const fetchedBalanceDetail = balanceResponse.data;
            setBalanceDetail(fetchedBalanceDetail);
            setIsLoading(false); // Balance detail loaded
            console.log("Balance details fetched:", fetchedBalanceDetail);

            const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
             if (!currentCurrencyCode) {
                 console.warn("Could not determine currency code from fetched balance detail.");
            }

            // 2. Fetch All Payments and Transfers
            console.log("Fetching payments and transfers...");
            const [paymentsResult, transfersResult] = await Promise.allSettled([
                paymentService.getUserPayments(token),
                transferService.getUserTransfers(token),
            ]);

            let combinedTransactions: Transaction[] = [];
            let transactionFetchError: string | null = null; // Separate error state for transaction part

            // --- Process Payments Result ---
            if (paymentsResult.status === 'fulfilled') {
                console.log(`Processing ${paymentsResult.value.length} payments.`);
                const mappedPayments: Transaction[] = paymentsResult.value
                    .map((payment: PaymentDetailsResponse): Transaction | null => {
                        // Basic validation
                         if (!payment._id || !payment.status || payment.amountToAdd === undefined) {
                             console.warn("Skipping incomplete payment data:", payment);
                             return null; // Skip this invalid entry
                         }

                        // --- *** CORRECTED MAPPING FOR PAYMENTS *** ---
                         // Try to build Currency objects if they are not provided directly
                         // Fallback structure if API gives only codes
                         let balCurrency: Currency | undefined = undefined;
                         let payInCurr: Currency | undefined = undefined;

                         // If API sends full objects (BEST CASE):
                         if (typeof payment.balanceCurrency === 'object' && payment.balanceCurrency?.code) {
                             balCurrency = payment.balanceCurrency as Currency;
                         } else if (payment.balanceCurrencyCode) {
                              console.warn(`Payment ${payment._id}: balanceCurrency missing or not an object, using balanceCurrencyCode`);
                             balCurrency = { _id: 'unknown_id_' + payment.balanceCurrencyCode, code: payment.balanceCurrencyCode }; // Construct basic object
                         } else {
                             console.error(`Payment ${payment._id} is missing balance currency information!`);
                         }

                         if (typeof payment.payInCurrency === 'object' && payment.payInCurrency?.code) {
                             payInCurr = payment.payInCurrency as Currency;
                         } else if (payment.payInCurrencyCode) {
                            console.warn(`Payment ${payment._id}: payInCurrency missing or not an object, using payInCurrencyCode`);
                             payInCurr = { _id: 'unknown_id_' + payment.payInCurrencyCode, code: payment.payInCurrencyCode }; // Construct basic object
                         } // Don't log error if missing, less critical for list display


                        // Map accountId/account object to the Transaction's account field
                        const transactionAccount = typeof payment.accountId === 'string'
                            ? payment.accountId // Use ID string if only that is given
                             : typeof payment.account === 'object' && payment.account !== null
                             ? payment.account // Use object if given (assuming structure matches TransactionAccount)
                             : undefined; // Fallback


                         return {
                            _id: payment._id,
                            type: "Add Money",
                            // ** THE KEY CHANGE ** Use payment.amountToAdd
                            // Use the originally intended amount, not amountAdded
                            amountToAdd: payment.amountToAdd ?? 0, // Default to 0 if null/undefined
                            balanceCurrency: balCurrency,
                            amountToPay: payment.amountToPay,
                            payInCurrency: payInCurr,
                            // Make sure account is string | TransactionAccount or similar
                            account: transactionAccount,
                            // Status: Lowercase and assert type
                             status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
                             createdAt: payment.createdAt,
                             updatedAt: payment.updatedAt,
                            // Map other necessary fields if your Transaction type requires them
                            // Initialize Send Money fields to undefined
                            name: undefined, sendAmount: undefined, sendCurrency: undefined,
                            receiveAmount: undefined, receiveCurrency: undefined, recipient: undefined,
                            sourceAccountId: undefined,
                        };
                     })
                    .filter((tx): tx is Transaction => tx !== null); // Filter out any nulls from validation

                 combinedTransactions = [...combinedTransactions, ...mappedPayments];
                 console.log(`Mapped ${mappedPayments.length} valid payments.`);
            } else {
                 console.error("Payments fetch error:", paymentsResult.reason);
                transactionFetchError = "Failed to load payment history.";
             }

            // --- Process Transfers Result ---
            if (transfersResult.status === 'fulfilled') {
                 console.log(`Processing ${transfersResult.value.length} transfers.`);
                 const mappedTransfers: Transaction[] = transfersResult.value
                     .map((transfer: TransferDetailsResponse): Transaction | null => {
                         // Basic validation
                         if (!transfer._id || !transfer.status || transfer.sendAmount === undefined || !transfer.sendCurrency?.code) {
                             console.warn("Skipping incomplete transfer data:", transfer);
                             return null;
                         }

                         // Ensure currency types are compatible with Transaction['sendCurrency']/['receiveCurrency']
                         const sendCurr = transfer.sendCurrency as Currency | undefined;
                         const receiveCurr = transfer.receiveCurrency as Currency | undefined;

                         return {
                             _id: transfer._id,
                             type: "Send Money",
                             status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
                             createdAt: transfer.createdAt,
                             updatedAt: transfer.updatedAt,
                             // Name derivation seems okay
                             name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
                                 ? transfer.recipient.accountHolderName ?? 'Recipient'
                                 : 'Recipient', // Fallback if only ID or no name
                             sendAmount: transfer.sendAmount, // Keep as is
                             sendCurrency: sendCurr, // Assign potentially casted object
                             receiveAmount: transfer.receiveAmount,
                             receiveCurrency: receiveCurr, // Assign potentially casted object
                             recipient: transfer.recipient,
                             sourceAccountId: typeof transfer.sourceAccount === 'string'
                                 ? transfer.sourceAccount
                                 : (typeof transfer.sourceAccount === 'object' && transfer.sourceAccount !== null)
                                     ? transfer.sourceAccount._id
                                     : undefined, // Correctly get ID from object or use string

                             // Initialize Add Money fields to undefined
                             amountToAdd: undefined, balanceCurrency: undefined, amountToPay: undefined,
                             payInCurrency: undefined, account: undefined,
                         };
                     })
                     .filter((tx): tx is Transaction => tx !== null);

                 combinedTransactions = [...combinedTransactions, ...mappedTransfers];
                 console.log(`Mapped ${mappedTransfers.length} valid transfers.`);
            } else {
                console.error("Transfers fetch error:", transfersResult.reason);
                 if (!transactionFetchError) transactionFetchError = "Failed to load transfer history."; // Set error if not already set by payments
             }


             // --- Filter specific transactions FOR THIS BALANCE ID ---
            console.log(`Filtering ${combinedTransactions.length} total mapped transactions for balance ID ${balanceId}...`);
             const filteredTransactions = combinedTransactions.filter((transaction) => {
                if (transaction.type === "Add Money") {
                    // Account ID for Add Money transactions (The balance it was added TO)
                    const paymentTargetAccountId = typeof transaction.account === 'string'
                         ? transaction.account // account field holds the ID string directly
                         : typeof transaction.account === 'object' && transaction.account !== null
                         ? transaction.account._id // account is an object { _id: ... }
                         : null;
                     //console.log(`Add Money check: tx.account ID = ${paymentTargetAccountId}, balanceId = ${balanceId}`);
                    return paymentTargetAccountId === balanceId;
                 }
                 else if (transaction.type === "Send Money") {
                    // Account ID for Send Money transactions (The balance it was sent FROM)
                    // We correctly mapped this to sourceAccountId during mapping
                     //console.log(`Send Money check: tx.sourceAccountId = ${transaction.sourceAccountId}, balanceId = ${balanceId}`);
                     return transaction.sourceAccountId === balanceId;
                }
                return false; // Should not happen with current types
            });
            console.log(`Found ${filteredTransactions.length} transactions specific to this balance.`);

             // --- Sort the FINAL filtered list ---
             filteredTransactions.sort((a, b) => {
                 const dateA = a.updatedAt || a.createdAt;
                 const dateB = b.updatedAt || b.createdAt;
                 if (!dateA && !dateB) return 0;
                 if (!dateA) return 1; // Undated items last
                 if (!dateB) return -1;
                 try {
                    // Sort descending (most recent first)
                     return new Date(dateB).getTime() - new Date(dateA).getTime();
                } catch (e) {
                     console.error("Error parsing date for sorting:", e, dateA, dateB);
                    return 0; // Avoid crash
                }
             });

             setBalanceSpecificTransactions(filteredTransactions);
             setError(transactionFetchError); // Set error if any occurred during transaction fetch/processing


        } catch (err: unknown) {
            // Catch errors during balance detail fetch or other unexpected issues
             console.error("Error fetching balance detail or mapping transactions:", err);
            let message = "An unexpected error occurred loading balance details.";
            if (isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
             setError(message); // Overwrite previous transaction error if balance fetch failed critically
             setIsLoading(false); // Ensure loading is stopped on critical error
         } finally {
            // Mark transactions as "done loading", even if there was an error fetching them
             setIsTransactionsLoading(false);
             console.log("Fetch data function finished.");
         }

    }, [balanceId, token]); // Removed 'error' dependency as it causes loops if fetch fails

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Dependency array is correct: fetchData changes when balanceId or token changes

    return {
        balanceDetail,
        balanceSpecificTransactions,
        isLoading,
        isTransactionsLoading,
        error,
        fetchData, // Optionally return fetchData if manual refresh is needed
    };
};