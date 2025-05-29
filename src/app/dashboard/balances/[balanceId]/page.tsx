// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation"; // Correct import for Next.js 13+
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../config/apiConfig";
// import Link from "next/link";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//   };
//   balance: number;
//   accountNumber?: string; // Assuming account number is optional or might not be always present
//   createdAt: string;
//   __v: number;
// }

// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>(); // Use useParams hook
//   const router = useRouter();
//   const { balanceId } = params;
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
//     null
//   ); // Use interface for type safety
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchBalanceDetail = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/accounts/${balanceId}`, {
//           // Assuming your backend endpoint is /api/accounts/:balanceId
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBalanceDetail(response.data);
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load balance details"
//         );
//         setIsLoading(false);
//         console.error("Error fetching balance detail:", err);
//         if (err.response?.status === 404) {
//           router.push("/dashboard"); // Redirect to dashboard if balance not found
//         }
//       }
//     };

//     if (balanceId) {
//       fetchBalanceDetail();
//     } else {
//       setIsLoading(false);
//       setError("Balance ID is missing.");
//     }
//   }, [balanceId, token, router]);

//   if (isLoading) {
//     return <div>Loading balance details...</div>;
//   }

//   if (error || !balanceDetail) {
//     return (
//       <div className="text-red-500">
//         Error: {error || "Balance details not found."}
//       </div>
//     );
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2); // Format balance to 2 decimal places

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-2"
//       >
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={`/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={() =>
//               console.error(`Error loading image for ${currencyCode}`)
//             }
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>

//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>

//         {balanceDetail.accountNumber && ( // Conditionally render account number if available
//           <div className="flex items-center gap-2 mb-6">
//             <span className="bg-gray-300 p-1 rounded-md">🏦</span>
//             <span className="text-sm text-gray-700">
//               {balanceDetail.accountNumber}
//             </span>
//             <span className="ml-2 text-green-500 cursor-pointer hover:underline">
//               Copy
//             </span>{" "}
//             {/* Implement copy functionality if needed */}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex justify-around space-x-4 mt-8">
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             {" "}
//             {/* Link to Add Money page */}
//             <button className="action-button bg-green-500 hover:bg-green-700 text-white">
//               Add
//             </button>
//           </Link>
//           <Link
//             href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//             passHref
//           >
//             <button className="action-button bg-blue-500 hover:bg-blue-700 text-white">
//               {" "}
//               {/* Changed color */}
//               Send
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Transactions Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Transactions</h3>
//         <p className="text-gray-600">
//           No transactions to display yet. (Placeholder)
//         </p>
//         {/*  Transaction list component would go here */}
//       </div>

//       {/* Options Section (Placeholder) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Options</h3>
//         <p className="text-gray-600">
//           Account options will be displayed here. (Placeholder)
//         </p>
//         {/* Account options components would go here */}
//       </div>
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import { format, parseISO } from "date-fns";

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import apiConfig from "../../../config/apiConfig";

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path as needed
// import { Transaction } from "@/types/transaction"; // Ensure this type includes sourceAccountId and correct currency object shapes

// // Axios default URL
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v: number;
// }

// // --- Utility Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//   if (!dateString) return null;
//   // Try dd-MM-yyyy first (likely from filter component)
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//     const year = parseInt(parts[2], 10);
//     if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//       return new Date(year, month, day);
//     }
//   }
//   // Fallback to ISO parsing (likely from backend data)
//   try {
//     return parseISO(dateString);
//   } catch {
//     console.error("Failed to parse date string:", dateString);
//     return null;
//   }
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(
//     null
//   );
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] =
//     useState<Transaction[]>([]);
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(true); // Loading for balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Separate loading for transactions
//   const [error, setError] = useState<string | null>(null);

//   // --- Data Fetching ---
//   const fetchData = useCallback(async () => {
//     if (!balanceId || !token) {
//       setError("Missing balance ID or authentication token.");
//       setIsLoading(false);
//       setIsTransactionsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     setIsTransactionsLoading(true);
//     setError(null);
//     setBalanceDetail(null); // Reset on new fetch
//     setAllTransactions([]); // Reset on new fetch

//     try {
//       // Fetch balance detail first
//       const balanceResponse = await axios.get(`/accounts/${balanceId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBalanceDetail(balanceResponse.data);
//       setIsLoading(false); // Balance detail loaded or failed

//       // Fetch transactions only if balance detail was successful
//       try {
//         const [paymentsResponse, transfersResponse] = await Promise.all([
//           paymentService.getUserPayments(token),
//           transferService.getUserTransfers(token),
//         ]);

//         const mappedPayments: Transaction[] = paymentsResponse.map(
//           (payment): Transaction => ({
//             _id: payment._id,
//             type: "Add Money",
//             amountToAdd: payment.amountToAdd,
//             amountToPay: payment.amountToPay,
//             balanceCurrency: payment.balanceCurrency,
//             payInCurrency: payment.payInCurrency,
//             account: payment.account, // Include the account reference
//             createdAt: payment.createdAt,
//             updatedAt: payment.updatedAt,
//             status: payment.status,
//           })
//         );

//         const mappedTransfers: Transaction[] = transfersResponse.map(
//           (transfer): Transaction => ({
//             _id: transfer._id,
//             type: "Send Money",
//             name:
//               typeof transfer.recipient === "object" &&
//               transfer.recipient !== null
//                 ? transfer.recipient.accountHolderName
//                 : "Recipient Name Unavailable",
//             sendAmount: transfer.sendAmount,
//             receiveAmount: transfer.receiveAmount,
//             sendCurrency: transfer.sendCurrency,
//             receiveCurrency: transfer.receiveCurrency,
//             createdAt: transfer.createdAt,
//             updatedAt: transfer.updatedAt,
//             status: transfer.status,
//             recipient: transfer.recipient,
//             sourceAccountId:
//               typeof transfer.sourceAccount === "string"
//                 ? transfer.sourceAccount
//                 : transfer.sourceAccount?._id, // Extract ID if populated
//           })
//         );

//         const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//         setAllTransactions(combinedTransactions);
//       } catch (transErr: any) {
//         console.error("Error fetching transaction data:", transErr);
//         // Keep balance detail even if transactions fail, but show error
//         setError(
//           (prevError) =>
//             prevError || `Failed to load transactions: ${transErr.message}`
//         );
//       } finally {
//         setIsTransactionsLoading(false);
//       }
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to load balance details";
//       setError(message);
//       console.error("Error fetching balance detail:", err);
//       setIsLoading(false); // Stop main loading on error
//       setIsTransactionsLoading(false); // Also stop transaction loading
//       if (err.response?.status === 401) {
//         router.push("/auth/login");
//       }
//       // Optional: Handle 404 redirect for balance not found
//       // if (err.response?.status === 404) router.push("/dashboard");
//     }
//   }, [balanceId, token, router]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }

//     // console.log(`%cBalanceDetailPage: Filtering for balanceId: [${balanceId}]`, 'color: blue; font-weight: bold;');

//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//         // Compare the account ID associated with the payment to the current balance/account ID
//         const paymentAccountId = transaction.account?._id || transaction.account; // Handle populated object or string ID
//         // console.log(`  Checking Payment Tx ${transaction._id}: accountId [${paymentAccountId}] vs page balanceId [${balanceId}]`);
//         return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//         // Compare the source account ID of the transfer to the current balance/account ID
//         const transferSourceId = transaction.sourceAccountId;
//         // console.log(`  Checking Transfer Tx ${transaction._id}: sourceAccountId [${transferSourceId}] vs page balanceId [${balanceId}]`);
//         return transferSourceId === balanceId;
//       }
//       return false; // Ignore transactions of unknown types
//     });

//     // console.log(`%cBalanceDetailPage: Filtering Complete. Found ${filtered.length} specific transactions.`, 'color: green;');
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with filtered results
//   }, [allTransactions, balanceId]);

//   // --- Callbacks for TransactionActions ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//     // Update the displayed list based on search results from TransactionActions
//     setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback(
//     (filters: {
//       selectedRecipients: (string | number)[];
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       selectedBalance?: string[];
//       fromDate?: string;
//       toDate?: string;
//     }) => {
//       // Apply filters *only* to the transactions already specific to this balance
//       let tempFiltered = [...balanceSpecificTransactions];

//       // Apply Direction Filter
//       if (filters.selectedDirection && filters.selectedDirection !== "all") {
//         tempFiltered = tempFiltered.filter(
//           (transaction) =>
//             (filters.selectedDirection === "add" &&
//               transaction.type === "Add Money") ||
//             (filters.selectedDirection === "send" &&
//               transaction.type === "Send Money")
//         );
//       }

//       // Apply Status Filter
//       if (filters.selectedStatus) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           if (filters.selectedStatus === "Completed") return transaction.status === "completed";
//           if (filters.selectedStatus === "Cancelled") return transaction.status === "canceled";
//           if (filters.selectedStatus === "In Process") return transaction.status === "in progress" || transaction.status === "pending";
//           if (filters.selectedStatus === "Failed") return transaction.status === "failed";
//           return true;
//         });
//       }

//       // Apply Date Filter
//       const fromDateObj = parseDateString(filters.fromDate);
//       const toDateObj = parseDateString(filters.toDate);
//       if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day
//       if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day

//       if (fromDateObj || toDateObj) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           const transactionDateStr = transaction.updatedAt || transaction.createdAt;
//           if (!transactionDateStr) return false; // Cannot filter without a date
//           try {
//             const transactionDateObj = parseISO(transactionDateStr);
//             let include = true;
//             if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//             if (toDateObj && transactionDateObj > toDateObj) include = false;
//             return include;
//           } catch (e) {
//             console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//             return false; // Exclude if date parsing fails
//           }
//         });
//       }

//       // Update the list that gets rendered
//       setDisplayTransactions(tempFiltered);
//     },
//     [balanceSpecificTransactions] // Re-run filter logic if the base list changes
//   );

//   // --- Memoized Transaction Grouping for Display ---
//   const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//       // Calculations are based on the currently visible transactions (`displayTransactions`)
//       const inProgress = displayTransactions.filter(
//         (tx) => tx.status === "in progress" || tx.status === "pending"
//       );

//       const processed = displayTransactions.filter(
//         (tx) =>
//           tx.status === "completed" ||
//           tx.status === "canceled" ||
//           tx.status === "failed"
//       );

//       const sortedProcessed = [...processed].sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Group by formatted date string
//       const grouped = sortedProcessed.reduce(
//         (groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDate = tx.updatedAt || tx.createdAt;
//           if (!groupDate) return groups; // Skip if no date
//           try {
//              const dateKey = format(parseISO(groupDate), "MMMM d, yyyy");
//              if (!groups[dateKey]) groups[dateKey] = [];
//              groups[dateKey].push(tx);
//           } catch (e) {
//              console.error("Error formatting date for grouping:", groupDate, e);
//           }
//           return groups;
//         }, {}
//       );

//       return {
//         inProgressTransactions: inProgress,
//         groupedProcessedTransactions: grouped,
//       };
//     }, [displayTransactions]); // Re-calculate only when the displayed transactions change

//   // --- Render Logic ---

//   // Initial loading state (before balance detail is fetched)
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Loading balance details...
//       </div>
//     );
//   }

//   // Error state if balance detail failed to load
//   if (error && !balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//           <IoIosArrowBack size={20} /> Back
//         </button>
//         <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//           Error: {error}
//         </div>
//       </div>
//     );
//   }

//   // If loading finished but balanceDetail is somehow still null
//   if (!balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Balance details could not be loaded or found.
//       </div>
//     );
//   }

//   // --- Main Render (Balance Detail Loaded) ---
//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(balanceDetail.balance).toFixed(2);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md mb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={balanceDetail.currency.flagImage || `/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} // Fallback image
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>
//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>
//         {/* Optional: Account Details (like number) could go here */}
//         <div className="flex justify-center sm:justify-start space-x-4 mt-8">
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <LuPlus size={20} /> Add
//             </button>
//           </Link>
//           <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} passHref>
//             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <GoArrowUp size={20} /> Send
//             </button>
//           </Link>
//           {/* Add other actions here (Convert, Details, etc.) */}
//         </div>
//       </div>

//       {/* Transactions Section */}
//       <div className="mt-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h3 className="text-xl font-semibold">Transactions for {currencyCode}</h3>
//           {/* Render TransactionActions only if there are base transactions to filter/search */}
//           {balanceSpecificTransactions.length > 0 && (
//              <TransactionActions
//                 transactions={balanceSpecificTransactions} // Pass the balance-specific list as the base
//                 onTransactionsChange={handleSearchChange} // Update display on search
//                 onFiltersApply={handleFiltersApply}       // Update display on filter
//              />
//           )}
//         </div>

//         {/* Transaction Loading/Empty/List States */}
//         {isTransactionsLoading && (
//           <div className="text-center py-6 text-gray-500">Loading transactions...</div>
//         )}

//         {!isTransactionsLoading && error && !balanceDetail && ( // Show transaction-specific error if balance detail also failed
//              <div className="text-center py-6 text-red-500">Error loading transactions.</div>
//         )}

//         {!isTransactionsLoading && !error && displayTransactions.length === 0 && balanceSpecificTransactions.length > 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions match your current filter or search criteria.
//           </div>
//         )}

//         {!isTransactionsLoading && !error && balanceSpecificTransactions.length === 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions found for this balance yet.
//           </div>
//         )}

//         {/* Render Transaction List if data is available and not loading/errored */}
//         {!isTransactionsLoading && !error && displayTransactions.length > 0 && (
//           <div className="space-y-10">
//             {/* In Progress Transactions */}
//             {inProgressTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                   In progress
//                 </h2>
//                 <div className="space-y-2">
//                   {inProgressTransactions.map((transaction) => {
//                     // Determine display values
//                     const isAddMoney = transaction.type === "Add Money";
//                     const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                     const description = isAddMoney ? "Waiting for your money" : "Sending your money";
//                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                     const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                     const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                     return (
//                       <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                         <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                           <div className="flex items-center gap-4">
//                             <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                             <div className="flex justify-between w-full items-center">
//                               <div>
//                                 <h3 className="font-medium text-gray-800">{name}</h3>
//                                 <p className="text-sm text-gray-500">{description}</p>
//                               </div>
//                               <div className={`font-medium text-gray-800 whitespace-nowrap`}>
//                                 {amountPrefix}
//                                 {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                 {" "} {displayCurrencyCode}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Processed Transactions (Grouped by Date) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                              // Determine display values
//                              const isAddMoney = transaction.type === "Add Money";
//                              const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                              let description = isAddMoney ? "Added by you" : "Sent by you";
//                              let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
//                              const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                              const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                              const amountPrefix = isAddMoney ? "+ " : "- ";
//                              const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                              if (transaction.status === "canceled") {
//                                description = "Cancelled";
//                                amountClass = "text-red-500 line-through";
//                              } else if (transaction.status === "failed") {
//                                description = "Failed";
//                                amountClass = "text-red-500";
//                              }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                                 <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                     <div className="flex justify-between w-full items-center">
//                                       <div>
//                                         <h3 className="font-medium text-gray-800">{name}</h3>
//                                         <p className="text-sm text-gray-500">{description}</p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                         {" "} {displayCurrencyCode}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import { format, parseISO } from "date-fns";

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import apiConfig from "../../../config/apiConfig";

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions";
// import { Transaction } from "@/types/transaction";
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Import the modal

// // Axios default URL
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v: number;
// }

// // --- Utility Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first (likely from filter component)
//     const parts = dateString.split("-");
//     if (parts.length === 3) {
//       const day = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//       const year = parseInt(parts[2], 10);
//       if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//         return new Date(year, month, day);
//       }
//     }
//     // Fallback to ISO parsing (likely from backend data)
//     try {
//       return parseISO(dateString);
//     } catch {
//       console.error("Failed to parse date string:", dateString);
//       return null;
//     }
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]);
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//   const fetchData = useCallback(async () => {
//     // ... (fetchData logic remains the same)
//     if (!balanceId || !token) {
//         setError("Missing balance ID or authentication token.");
//         setIsLoading(false);
//         setIsTransactionsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       setIsTransactionsLoading(true);
//       setError(null);
//       setBalanceDetail(null); // Reset on new fetch
//       setAllTransactions([]); // Reset on new fetch

//       try {
//         // Fetch balance detail first
//         const balanceResponse = await axios.get(`/accounts/${balanceId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBalanceDetail(balanceResponse.data);
//         setIsLoading(false); // Balance detail loaded or failed

//         // Fetch transactions only if balance detail was successful
//         try {
//           const [paymentsResponse, transfersResponse] = await Promise.all([
//             paymentService.getUserPayments(token),
//             transferService.getUserTransfers(token),
//           ]);

//           const mappedPayments: Transaction[] = paymentsResponse.map(
//             (payment): Transaction => ({
//               _id: payment._id,
//               type: "Add Money",
//               amountToAdd: payment.amountToAdd,
//               amountToPay: payment.amountToPay,
//               balanceCurrency: payment.balanceCurrency,
//               payInCurrency: payment.payInCurrency,
//               account: payment.account, // Include the account reference
//               createdAt: payment.createdAt,
//               updatedAt: payment.updatedAt,
//               status: payment.status,
//             })
//           );

//           const mappedTransfers: Transaction[] = transfersResponse.map(
//             (transfer): Transaction => ({
//               _id: transfer._id,
//               type: "Send Money",
//               name:
//                 typeof transfer.recipient === "object" &&
//                 transfer.recipient !== null
//                   ? transfer.recipient.accountHolderName
//                   : "Recipient Name Unavailable",
//               sendAmount: transfer.sendAmount,
//               receiveAmount: transfer.receiveAmount,
//               sendCurrency: transfer.sendCurrency,
//               receiveCurrency: transfer.receiveCurrency,
//               createdAt: transfer.createdAt,
//               updatedAt: transfer.updatedAt,
//               status: transfer.status,
//               recipient: transfer.recipient,
//               sourceAccountId:
//                 typeof transfer.sourceAccount === "string"
//                   ? transfer.sourceAccount
//                   : transfer.sourceAccount?._id, // Extract ID if populated
//             })
//           );

//           const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//           setAllTransactions(combinedTransactions);
//         } catch (transErr: any) {
//           console.error("Error fetching transaction data:", transErr);
//           // Keep balance detail even if transactions fail, but show error
//           setError(
//             (prevError) =>
//               prevError || `Failed to load transactions: ${transErr.message}`
//           );
//         } finally {
//           setIsTransactionsLoading(false);
//         }
//       } catch (err: any) {
//         const message =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to load balance details";
//         setError(message);
//         console.error("Error fetching balance detail:", err);
//         setIsLoading(false); // Stop main loading on error
//         setIsTransactionsLoading(false); // Also stop transaction loading
//         if (err.response?.status === 401) {
//           router.push("/auth/login");
//         }
//       }
//   }, [balanceId, token, router]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     // ... (filtering logic remains the same)
//     if (!balanceId || allTransactions.length === 0) {
//         setBalanceSpecificTransactions([]);
//         setDisplayTransactions([]);
//         return;
//       }

//       const filtered = allTransactions.filter((transaction) => {
//         if (transaction.type === "Add Money") {
//           const paymentAccountId = transaction.account?._id || transaction.account;
//           return paymentAccountId === balanceId;
//         } else if (transaction.type === "Send Money") {
//           const transferSourceId = transaction.sourceAccountId;
//           return transferSourceId === balanceId;
//         }
//         return false;
//       });

//       setBalanceSpecificTransactions(filtered);
//       setDisplayTransactions(filtered); // Initialize display list with filtered results
//   }, [allTransactions, balanceId]);

//   // --- Callbacks for TransactionActions ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//     // ... (handleSearchChange logic remains the same)
//     setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */ }) => {
//     // ... (handleFiltersApply logic remains the same)
//     let tempFiltered = [...balanceSpecificTransactions];

//       // Apply Direction Filter
//       if (filters.selectedDirection && filters.selectedDirection !== "all") {
//         tempFiltered = tempFiltered.filter(
//           (transaction) =>
//             (filters.selectedDirection === "add" &&
//               transaction.type === "Add Money") ||
//             (filters.selectedDirection === "send" &&
//               transaction.type === "Send Money")
//         );
//       }

//       // Apply Status Filter
//       if (filters.selectedStatus) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           if (filters.selectedStatus === "Completed") return transaction.status === "completed";
//           if (filters.selectedStatus === "Cancelled") return transaction.status === "canceled";
//           if (filters.selectedStatus === "In Process") return transaction.status === "in progress" || transaction.status === "pending";
//           if (filters.selectedStatus === "Failed") return transaction.status === "failed";
//           return true;
//         });
//       }

//       // Apply Date Filter
//       const fromDateObj = parseDateString(filters.fromDate);
//       const toDateObj = parseDateString(filters.toDate);
//       if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of day
//       if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of day

//       if (fromDateObj || toDateObj) {
//         tempFiltered = tempFiltered.filter((transaction) => {
//           const transactionDateStr = transaction.updatedAt || transaction.createdAt;
//           if (!transactionDateStr) return false;
//           try {
//             const transactionDateObj = parseISO(transactionDateStr);
//             let include = true;
//             if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//             if (toDateObj && transactionDateObj > toDateObj) include = false;
//             return include;
//           } catch (e) {
//             console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//             return false;
//           }
//         });
//       }

//       setDisplayTransactions(tempFiltered);
//   }, [balanceSpecificTransactions]);

//   // --- Memoized Transaction Grouping for Display ---
//   const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//     // ... (useMemo logic remains the same)
//     const inProgress = displayTransactions.filter(
//         (tx) => tx.status === "in progress" || tx.status === "pending"
//       );

//       const processed = displayTransactions.filter(
//         (tx) =>
//           tx.status === "completed" ||
//           tx.status === "canceled" ||
//           tx.status === "failed"
//       );

//       const sortedProcessed = [...processed].sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       const grouped = sortedProcessed.reduce(
//         (groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDate = tx.updatedAt || tx.createdAt;
//           if (!groupDate) return groups;
//           try {
//              const dateKey = format(parseISO(groupDate), "MMMM d, yyyy");
//              if (!groups[dateKey]) groups[dateKey] = [];
//              groups[dateKey].push(tx);
//           } catch (e) {
//              console.error("Error formatting date for grouping:", groupDate, e);
//           }
//           return groups;
//         }, {}
//       );

//       return {
//         inProgressTransactions: inProgress,
//         groupedProcessedTransactions: grouped,
//       };
//   }, [displayTransactions]);

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => {
//     setIsInsufficientBalanceModalOpen(true);
//   };

//   const handleCloseInsufficientBalanceModal = () => {
//     setIsInsufficientBalanceModalOpen(false);
//   };

//   const handleAddMoneyFromModal = () => {
//     setIsInsufficientBalanceModalOpen(false);
//     router.push(`/dashboard/balances/${balanceId}/add-money`);
//   };

//   // --- Render Logic ---

//   // Initial loading state (before balance detail is fetched)
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Loading balance details...
//       </div>
//     );
//   }

//   // Error state if balance detail failed to load
//   if (error && !balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//           <IoIosArrowBack size={20} /> Back
//         </button>
//         <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//           Error: {error}
//         </div>
//         {/* Optionally show transaction loading error here too if applicable */}
//         {isTransactionsLoading && <div className="text-center py-6 text-gray-500">Loading transactions...</div>}
//         {!isTransactionsLoading && error && <div className="text-center py-6 text-red-500">Error loading transactions.</div>}

//       </div>
//     );
//   }

//   // If loading finished but balanceDetail is somehow still null (should be caught by above, but good failsafe)
//   if (!balanceDetail) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//         Balance details could not be loaded or found.
//          {/* Optionally show transaction loading error here too if applicable */}
//          {isTransactionsLoading && <div className="text-center py-6 text-gray-500">Loading transactions...</div>}
//          {!isTransactionsLoading && error && <div className="text-center py-6 text-red-500">Error loading transactions.</div>}
//       </div>
//     );
//   }

//   // --- Main Render (Balance Detail IS Loaded) ---
//   // <<<--- MOVE declarations here --->>>
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toFixed(2);
//   const canSendMoney = currentBalance > 0;

//   const handleSendClick = () => {
//     if (canSendMoney) {
//       router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     } else {
//       handleOpenInsufficientBalanceModal(); // Open modal if balance is zero
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-lightgray rounded-2xl p-6 shadow-md mb-8">
//         <div className="flex items-center gap-4 mb-4">
//           <Image
//             src={balanceDetail.currency.flagImage || `/assets/icon/${currencyCode.toLowerCase()}.svg`}
//             alt={`${currencyCode} flag`}
//             width={50}
//             height={50}
//             onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} // Fallback image
//           />
//           <h2 className="text-2xl font-semibold">{currencyCode} balance</h2>
//         </div>
//         <div className="text-4xl font-bold mb-4">
//           {formattedBalance} {currencyCode}
//         </div>
//         {/* Action Buttons */}
//         <div className="flex justify-center sm:justify-start space-x-4 mt-8">
//           {/* Add Money Button */}
//           <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//             <button className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition duration-150 ease-in-out">
//               <LuPlus size={20} /> Add
//             </button>
//           </Link>
//           {/* Send Money Button */}
//           <button
//               onClick={handleSendClick}
//               className={`flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md font-medium transition duration-150 ease-in-out ${
//                   !canSendMoney
//                       ? 'opacity-50 bg-blue-400 hover:bg-blue-400'
//                       : 'hover:bg-blue-700'
//               }`}
//               title={!canSendMoney ? "Cannot send from zero balance" : "Send money"}
//           >
//             <GoArrowUp size={20} /> Send
//           </button>
//           {/* Add other actions here */}
//         </div>
//       </div>

//       {/* Transactions Section */}
//       <div className="mt-8">
//          {/* ... (Transaction Section Header and TransactionActions component) ... */}
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h3 className="text-xl font-semibold">Transactions for {currencyCode}</h3>
//           {balanceSpecificTransactions.length > 0 && (
//              <TransactionActions
//                 transactions={balanceSpecificTransactions}
//                 onTransactionsChange={handleSearchChange}
//                 onFiltersApply={handleFiltersApply}
//              />
//           )}
//         </div>

//         {/* Transaction Loading/Empty/List States */}
//         {/* Note: Separate transaction loading/error handling */}
//         {isTransactionsLoading && (
//           <div className="text-center py-6 text-gray-500">Loading transactions...</div>
//         )}

//         {!isTransactionsLoading && error && balanceDetail && ( // Show transaction-specific error only if balance detail loaded ok
//              <div className="text-center py-6 text-red-500">Error loading transactions: {error}</div>
//         )}

//         {!isTransactionsLoading && !error && displayTransactions.length === 0 && balanceSpecificTransactions.length > 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions match your current filter or search criteria.
//           </div>
//         )}

//         {!isTransactionsLoading && !error && balanceSpecificTransactions.length === 0 && (
//           <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg mt-6">
//             No transactions found for this balance yet.
//           </div>
//         )}

//         {/* Render Transaction List if data is available */}
//         {/* ... (Rest of the transaction list rendering logic using inProgressTransactions and groupedProcessedTransactions) ... */}
//         {!isTransactionsLoading && !error && displayTransactions.length > 0 && (
//             <div className="space-y-10">
//                 {/* In Progress Transactions */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                       In progress
//                     </h2>
//                     <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                         const isAddMoney = transaction.type === "Add Money";
//                         const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                         const description = isAddMoney ? "Waiting for your money" : "Sending your money";
//                         const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                         const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                         const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                         return (
//                           <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                             <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                               <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                 <div className="flex justify-between w-full items-center">
//                                   <div>
//                                     <h3 className="font-medium text-gray-800">{name}</h3>
//                                     <p className="text-sm text-gray-500">{description}</p>
//                                   </div>
//                                   <div className={`font-medium text-gray-800 whitespace-nowrap`}>
//                                     {amountPrefix}
//                                     {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                     {" "} {displayCurrencyCode}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Processed Transactions (Grouped by Date) */}
//                 {Object.entries(groupedProcessedTransactions).length > 0 && (
//                   <div>
//                     <div className="space-y-10">
//                       {Object.entries(groupedProcessedTransactions).map(
//                         ([date, transactionsForDate]) => (
//                           <div key={date}>
//                             <h3 className="font-medium text-gray-600 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 after:mt-1">
//                               {date}
//                             </h3>
//                             <div className="space-y-2">
//                               {transactionsForDate.map((transaction) => {
//                                  const isAddMoney = transaction.type === "Add Money";
//                                  const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//                                  let description = isAddMoney ? "Added by you" : "Sent by you";
//                                  let amountClass = isAddMoney ? "text-green-600" : "text-gray-800";
//                                  const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                  const displayCurrencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//                                  const amountPrefix = isAddMoney ? "+ " : "- ";
//                                  const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                  if (transaction.status === "canceled") {
//                                    description = "Cancelled";
//                                    amountClass = "text-red-500 line-through";
//                                  } else if (transaction.status === "failed") {
//                                    description = "Failed";
//                                    amountClass = "text-red-500";
//                                  }

//                                 return (
//                                   <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//                                     <div className="hover:bg-gray-100 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//                                       <div className="flex items-center gap-4">
//                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200">{icon}</div>
//                                         <div className="flex justify-between w-full items-center">
//                                           <div>
//                                             <h3 className="font-medium text-gray-800">{name}</h3>
//                                             <p className="text-sm text-gray-500">{description}</p>
//                                           </div>
//                                           <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                             {amountPrefix}
//                                             {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                             {" "} {displayCurrencyCode}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}
//             </div>
//         )}

//       </div>

//       {/* Render the Insufficient Balance Modal */}
//       {/* <<<--- Ensure modal is only rendered when balanceDetail is loaded --->>> */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode} // Now currencyCode is guaranteed to be defined here
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/app/dashboard/balances/[balanceId]/page.tsx

// "use client"; // Required for hooks and client-side interactivity

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios"; // Keep for direct balance fetch
// import { format, parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Add Money
// import { GoArrowUp } from "react-icons/go"; // Send Money
// import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import apiConfig from "../../../config/apiConfig"; // Adjust path

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // Configure Axios Base URL (Optional: Services might handle this)
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // Interface for the detailed balance data fetched directly
// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v?: number;
// }

// // --- Utility Function ---
// // More robust date parsing, prioritizing ISO format
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Attempt ISO parsing first (most common from backend)
//         const isoDate = parseISO(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(isoDate.getTime())) {
//             return isoDate;
//         }
//     } catch {
//         // Ignore ISO parsing errors and try other formats if needed
//     }

//     // Fallback for dd-MM-yyyy if you expect it from filters
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//             // Use local time based on user's system
//             return new Date(year, month, day);
//         }
//     }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//   const [error, setError] = useState<string | null>(null);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//    const fetchData = useCallback(async () => {
//        if (!balanceId || !token) {
//            setError("Missing balance ID or authentication token.");
//            setIsLoading(false); setIsTransactionsLoading(false); return;
//        }
//        // Reset states on new fetch
//        setIsLoading(true); setIsTransactionsLoading(true); setError(null);
//        setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);

//        try {
//            // Fetch Balance Details using direct Axios call
//            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//            setBalanceDetail(balanceResponse.data);
//            setIsLoading(false); // Balance details loaded

//            // Fetch Transactions using Services (Parallel)
//            try {
//                const [paymentsResponse, transfersResponse] = await Promise.all([
//                    paymentService.getUserPayments(token),
//                    transferService.getUserTransfers(token),
//                ]);

//                 // Map Payments (Add Money) - Ensure 'type' is added and status normalized
//                 const mappedPayments: Transaction[] = paymentsResponse.map(payment => ({
//                     ...payment, // Spread existing payment data
//                     type: "Add Money", // Explicitly set type
//                     status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     // Ensure nested objects like currency/account are handled if needed elsewhere
//                 }));

//                 // Map Transfers (Send Money) - Ensure 'type' is added and status normalized
//                 const mappedTransfers: Transaction[] = transfersResponse.map(transfer => ({
//                     ...transfer, // Spread existing transfer data
//                     type: "Send Money", // Explicitly set type
//                     status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient', // Example: Extract name
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id, // Extract source ID
//                 }));

//                const combined = [...mappedPayments, ...mappedTransfers];
//                // Sort combined transactions by date (newest first)
//                combined.sort((a, b) => {
//                    const dateA = a.updatedAt || a.createdAt;
//                    const dateB = b.updatedAt || b.createdAt;
//                    if (!dateA && !dateB) return 0;
//                    if (!dateA) return 1;
//                    if (!dateB) return -1;
//                    try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//                    catch { return 0; }
//                });
//                setAllTransactions(combined);

//            } catch (transErr: any) {
//                console.error("Transaction fetch error:", transErr);
//                setError(transErr.response?.data?.message || transErr.message || "Failed to load transactions.");
//                // Don't stop balance display if transactions fail, but show error
//            } finally {
//                setIsTransactionsLoading(false); // Transactions loading finished (success or fail)
//            }

//        } catch (err: any) {
//            console.error("Balance fetch error:", err);
//            setError(err.response?.data?.message || err.message || "Failed to load balance details.");
//            setIsLoading(false); // Stop all loading if balance fetch fails
//            setIsTransactionsLoading(false);
//        }
//    }, [balanceId, token]); // Dependencies for fetchData

//   useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }
//     // Filter all transactions to get only those relevant to this balanceId
//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//          // Payment is relevant if its associated account ID matches the current balance ID
//          const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//          return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//          // Transfer is relevant if its source account ID matches the current balance ID
//          return transaction.sourceAccountId === balanceId;
//       }
//       return false;
//     });
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
//   }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//     const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//         // This callback receives the results AFTER TransactionActions has filtered
//         // the `balanceSpecificTransactions` list based on the search term.
//         // We just need to update the `displayTransactions` state with these results.
//         setDisplayTransactions(searchResults);
//     }, []); // No dependencies needed here as it only sets state

//     const handleFiltersApply = useCallback((filters: {
//         selectedDirection?: string;
//         selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
//         fromDate?: string; // Date string format depends on your DatePicker
//         toDate?: string;   // Date string format depends on your DatePicker
//         // Add other potential filter types if TransactionActions supports them
//     }) => {
//         console.log(`BalanceDetailPage: Applying filters:`, filters);
//         let tempFiltered = [...balanceSpecificTransactions]; // Always start filtering from the balance-specific list

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase
//                 if (!txStatus) return false;

//                 // Map UI filter names to potential backend statuses
//                 if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                 if (statusFilter === 'completed') return txStatus === 'completed';
//                 if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                 if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                 if (statusFilter === 'failed') return txStatus === 'failed';
//                 // Add more mappings if needed
//                 return false; // Default to excluding if status doesn't match known filters
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to cover the entire day for comparisons
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt for the transaction date
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter if date is missing

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string for filtering:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }
//                     // Apply date range filtering
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // Update the state that controls the UI display
//         setDisplayTransactions(tempFiltered);

//     }, [balanceSpecificTransactions]); // Recalculate filters if the base list changes

//   // --- Memoized Transaction Grouping for Display ---
//   // Groups transactions from the `displayTransactions` state (which reflects search/filters)
//   const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
//       // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//       const pendingAttention = displayTransactions.filter(
//           (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
//       );

//       // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//       const inProgress = displayTransactions.filter(
//           (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                    (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//       );

//       // 3. Processed: Completed, Canceled, Failed transactions
//       const processed = displayTransactions.filter(
//           (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//       );

//       // Sort processed transactions by date (newest first)
//       const sortedProcessed = [...processed].sort((a, b) => {
//           const dateA = a.updatedAt || a.createdAt;
//           const dateB = b.updatedAt || b.createdAt;
//           if (!dateA && !dateB) return 0;
//           if (!dateA) return 1; // Put items without date at the end
//           if (!dateB) return -1;
//           try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//           catch { return 0; } // Avoid crashing on invalid dates
//       });

//       // Group sorted processed transactions by date string (e.g., "July 20, 2023")
//       const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDateStr = tx.updatedAt || tx.createdAt;
//           if (!groupDateStr) {
//               const unknownDateKey = 'Unknown Date';
//               groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//               return groups;
//           }
//           try {
//               // Use a consistent format for grouping keys
//               const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example locale
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//               });
//               groups[dateKey] = [...(groups[dateKey] || []), tx];
//           } catch (e) {
//               console.error("Error formatting date for grouping:", groupDateStr, e);
//               const errorKey = 'Date Error';
//               groups[errorKey] = [...(groups[errorKey] || []), tx];
//           }
//           return groups;
//       }, {});

//       return {
//           pendingAttentionTransactions: pendingAttention,
//           inProgressTransactions: inProgress,
//           groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
//           hasProcessedTransactions: processed.length > 0,
//       };
//   }, [displayTransactions]); // Recalculate only when the transactions to display change

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => {
//     router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page
//   };

//    // --- Send Click Handler ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             // Navigate to the first step of the send flow
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             // Open the insufficient balance modal
//             handleOpenInsufficientBalanceModal();
//         }
//     };

//   // --- Render Logic ---

//   // Initial Loading State for Balance Detail
//   if (isLoading) return (
//     <div className="container mx-auto px-4 py-8 animate-pulse">
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//             </div>
//             <Skeleton className="h-10 w-48 mb-6" />
//             <div className="flex justify-start space-x-3">
//                 <Skeleton className="h-10 w-24 rounded-md" />
//                 <Skeleton className="h-10 w-24 rounded-md" />
//             </div>
//         </div>
//          <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//          <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//     </div>
//   );

//   // Balance Loading Error State
//   if (error && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//              <p className="font-semibold">Error Loading Balance</p>
//              <p className="text-sm mt-1">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline" className="mt-6">
//             Go Back
//         </Button>
//     </div>
//    );

//   // Balance Not Found State
//   if (!isLoading && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//         <p>Balance details not found or you may not have access.</p>
//         <Button onClick={() => router.push('/dashboard')} variant="outline" className="mt-4">
//              Go to Dashboard
//         </Button>
//     </div>
//    );

//   // --- Balance Detail is Loaded, Continue Rendering ---
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
//   const canSendMoney = currentBalance > 0;
//   const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm transition-colors">
//         <IoIosArrowBack size={18} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//          {/* Card Content: Flag, Title, Amount, Buttons */}
//           <div className="flex items-center gap-4 mb-4">
//                 {balanceDetail.currency.flagImage ? (
//                     <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
//                  ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
//                  )}
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{currencyCode} Balance</h2>
//             </div>
//             <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                 {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
//             </div>
//             <div className="flex justify-start space-x-3">
//                 <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//                     <Button className="bg-green-600 hover:bg-green-700 text-white">
//                         <LuPlus size={18} className="mr-2"/> Add
//                     </Button>
//                 </Link>
//                 <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
//                     <GoArrowUp size={18} className="mr-2" /> Send
//                 </Button>
//             </div>
//       </div>

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions if there are transactions to filter/search */}
//             {/* Pass balanceSpecificTransactions as the base list for actions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // Add userAccounts prop if filter component needs it
//                />
//             )}
//             {/* Loading skeleton for actions */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//         </div>

//         {/* Transaction Loading State */}
//         {isTransactionsLoading && (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//         )}

//         {/* Transaction Error State */}
//         {!isTransactionsLoading && error && balanceDetail && (
//              <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                  <strong>Error:</strong> {error.replace('Failed to load transactions: ','')}
//              </div>
//         )}

//         {/* Transaction List Area */}
//         {!isTransactionsLoading && !error && (
//             <div className="space-y-8">

//                  {/* --- Needs Your Attention Section --- */}
//                  {pendingAttentionTransactions.length > 0 && (
//                      <div>
//                          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                              {pendingAttentionTransactions.map((transaction) => {
//                                  const amount = transaction.amountToAdd ?? 0;
//                                  const name = `To your ${currencyCode} balance`;
//                                  return (
//                                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                           <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                              <div className="flex items-center gap-4">
//                                                  {/* Icon with Badge */}
//                                                  <div className="relative flex-shrink-0">
//                                                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                          <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                      </div>
//                                                       <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                                  </div>
//                                                  {/* Details */}
//                                                  <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                      <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                          <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                      </div>
//                                                      <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                          + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                      </div>
//                                                  </div>
//                                              </div>
//                                          </a>
//                                      </Link>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  )}

//                 {/* --- In Progress Transactions Section --- */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">In progress</h2>
//                      <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                       {inProgressTransactions.map((transaction) => {
//                            const isAddMoney = transaction.type === "Add Money";
//                            const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                            let description = isAddMoney ? "We received your funds" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                            const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                            const amountPrefix = isAddMoney ? "+ " : "- ";
//                            const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient");

//                            return (
//                                  <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          <div className="flex items-center gap-4">
//                                              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40">
//                                                  {icon}
//                                              </div>
//                                              <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                  <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                  </div>
//                                                  <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                      {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode}
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </a>
//                                  </Link>
//                              );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Processed Transactions (Grouped by Date) Section --- */}
//                 {/* Fix: Check groupedProcessedTransactions exists before accessing keys */}
//                 {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                              <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                     let description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                     let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                     if (transaction.status === "canceled" || transaction.status === "cancelled") { description = "Cancelled"; amountClass = "text-red-500 dark:text-red-400 line-through"; }
//                                     else if (transaction.status === "failed") { description = "Failed"; amountClass = "text-red-500 dark:text-red-400"; }

//                                      return (
//                                          <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                              <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  <div className="flex items-center gap-4">
//                                                      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50">
//                                                          {icon}
//                                                      </div>
//                                                      <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                          <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                          </div>
//                                                          <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                              {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode}
//                                                          </div>
//                                                      </div>
//                                                  </div>
//                                              </a>
//                                          </Link>
//                                      );
//                                 })}
//                             </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* --- Empty State for Transactions --- */}
//                 {!hasAnyTransactionsToDisplay && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty
//                        ? `No transactions found for this ${currencyCode} balance yet.`
//                        : "No transactions match your current filter or search criteria." // Filters/search yielded empty
//                     }
//                   </div>
//                 )}
//             </div>
//         )}
//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/app/dashboard/balances/[balanceId]/page.tsx

// "use client"; // Required for hooks and client-side interactivity

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios"; // Keep for direct balance fetch
// import { format, parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Add Money
// import { GoArrowUp } from "react-icons/go"; // Send Money
// import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import apiConfig from "../../../config/apiConfig"; // Adjust path

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // Configure Axios Base URL (Optional: Services might handle this)
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // Interface for the detailed balance data fetched directly
// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v?: number;
// }

// // --- Utility Function ---
// // More robust date parsing, prioritizing ISO format
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Attempt ISO parsing first (most common from backend)
//         const isoDate = parseISO(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(isoDate.getTime())) {
//             return isoDate;
//         }
//     } catch {
//         // Ignore ISO parsing errors and try other formats if needed
//     }

//     // Fallback for dd-MM-yyyy if you expect it from filters
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//             // Use local time based on user's system
//             return new Date(year, month, day);
//         }
//     }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//   const [error, setError] = useState<string | null>(null);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//    const fetchData = useCallback(async () => {
//        if (!balanceId || !token) {
//            setError("Missing balance ID or authentication token.");
//            setIsLoading(false); setIsTransactionsLoading(false); return;
//        }
//        // Reset states on new fetch
//        setIsLoading(true); setIsTransactionsLoading(true); setError(null);
//        setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);

//        try {
//            // Fetch Balance Details using direct Axios call
//            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//            setBalanceDetail(balanceResponse.data);
//            setIsLoading(false); // Balance details loaded

//            // Fetch Transactions using Services (Parallel)
//            try {
//                const [paymentsResponse, transfersResponse] = await Promise.all([
//                    paymentService.getUserPayments(token),
//                    transferService.getUserTransfers(token),
//                ]);

//                 // Map Payments (Add Money) - Ensure 'type' is added and status normalized
//                 const mappedPayments: Transaction[] = paymentsResponse.map(payment => ({
//                     ...payment, // Spread existing payment data
//                     type: "Add Money", // Explicitly set type
//                     status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     // Ensure nested objects like currency/account are handled if needed elsewhere
//                 }));

//                 // Map Transfers (Send Money) - Ensure 'type' is added and status normalized
//                 const mappedTransfers: Transaction[] = transfersResponse.map(transfer => ({
//                     ...transfer, // Spread existing transfer data
//                     type: "Send Money", // Explicitly set type
//                     status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                     name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                           ? transfer.recipient.accountHolderName ?? 'Recipient'
//                           : 'Recipient', // Example: Extract name
//                     sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                       ? transfer.sourceAccount
//                                       : transfer.sourceAccount?._id, // Extract source ID
//                 }));

//                const combined = [...mappedPayments, ...mappedTransfers];
//                // Sort combined transactions by date (newest first)
//                combined.sort((a, b) => {
//                    const dateA = a.updatedAt || a.createdAt;
//                    const dateB = b.updatedAt || b.createdAt;
//                    if (!dateA && !dateB) return 0;
//                    if (!dateA) return 1;
//                    if (!dateB) return -1;
//                    try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//                    catch { return 0; }
//                });
//                setAllTransactions(combined);

//            } catch (transErr: any) {
//                console.error("Transaction fetch error:", transErr);
//                setError(transErr.response?.data?.message || transErr.message || "Failed to load transactions.");
//                // Don't stop balance display if transactions fail, but show error
//            } finally {
//                setIsTransactionsLoading(false); // Transactions loading finished (success or fail)
//            }

//        } catch (err: any) {
//            console.error("Balance fetch error:", err);
//            setError(err.response?.data?.message || err.message || "Failed to load balance details.");
//            setIsLoading(false); // Stop all loading if balance fetch fails
//            setIsTransactionsLoading(false);
//        }
//    }, [balanceId, token]); // Dependencies for fetchData

//   useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }
//     // Filter all transactions to get only those relevant to this balanceId
//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//          // Payment is relevant if its associated account ID matches the current balance ID
//          const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//          return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//          // Transfer is relevant if its source account ID matches the current balance ID
//          return transaction.sourceAccountId === balanceId;
//       }
//       return false;
//     });
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
//   }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//     const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//         // This callback receives the results AFTER TransactionActions has filtered
//         // the `balanceSpecificTransactions` list based on the search term.
//         // We just need to update the `displayTransactions` state with these results.
//         setDisplayTransactions(searchResults);
//     }, []); // No dependencies needed here as it only sets state

//     const handleFiltersApply = useCallback((filters: {
//         selectedDirection?: string;
//         selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
//         fromDate?: string; // Date string format depends on your DatePicker
//         toDate?: string;   // Date string format depends on your DatePicker
//         // Add other potential filter types if TransactionActions supports them
//     }) => {
//         console.log(`BalanceDetailPage: Applying filters:`, filters);
//         let tempFiltered = [...balanceSpecificTransactions]; // Always start filtering from the balance-specific list

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase
//                 if (!txStatus) return false;

//                 // Map UI filter names to potential backend statuses
//                 if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                 if (statusFilter === 'completed') return txStatus === 'completed';
//                 if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                 if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                 if (statusFilter === 'failed') return txStatus === 'failed';
//                 // Add more mappings if needed
//                 return false; // Default to excluding if status doesn't match known filters
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to cover the entire day for comparisons
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt for the transaction date
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter if date is missing

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string for filtering:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }
//                     // Apply date range filtering
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // Update the state that controls the UI display
//         setDisplayTransactions(tempFiltered);

//     }, [balanceSpecificTransactions]); // Recalculate filters if the base list changes

//   // --- Memoized Transaction Grouping for Display ---
//   // Groups transactions from the `displayTransactions` state (which reflects search/filters)
//   const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
//       // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//       const pendingAttention = displayTransactions.filter(
//           (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
//       );

//       // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//       const inProgress = displayTransactions.filter(
//           (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                    (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//       );

//       // 3. Processed: Completed, Canceled, Failed transactions
//       const processed = displayTransactions.filter(
//           (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//       );

//       // Sort processed transactions by date (newest first)
//       const sortedProcessed = [...processed].sort((a, b) => {
//           const dateA = a.updatedAt || a.createdAt;
//           const dateB = b.updatedAt || b.createdAt;
//           if (!dateA && !dateB) return 0;
//           if (!dateA) return 1; // Put items without date at the end
//           if (!dateB) return -1;
//           try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//           catch { return 0; } // Avoid crashing on invalid dates
//       });

//       // Group sorted processed transactions by date string (e.g., "July 20, 2023")
//       const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDateStr = tx.updatedAt || tx.createdAt;
//           if (!groupDateStr) {
//               const unknownDateKey = 'Unknown Date';
//               groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//               return groups;
//           }
//           try {
//               // Use a consistent format for grouping keys
//               const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example locale
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//               });
//               groups[dateKey] = [...(groups[dateKey] || []), tx];
//           } catch (e) {
//               console.error("Error formatting date for grouping:", groupDateStr, e);
//               const errorKey = 'Date Error';
//               groups[errorKey] = [...(groups[errorKey] || []), tx];
//           }
//           return groups;
//       }, {});

//       return {
//           pendingAttentionTransactions: pendingAttention,
//           inProgressTransactions: inProgress,
//           groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
//           hasProcessedTransactions: processed.length > 0,
//       };
//   }, [displayTransactions]); // Recalculate only when the transactions to display change

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => {
//     router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page
//   };

//    // --- Send Click Handler ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             // Navigate to the first step of the send flow
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             // Open the insufficient balance modal
//             handleOpenInsufficientBalanceModal();
//         }
//     };

//   // --- Render Logic ---

//   // Initial Loading State for Balance Detail
//   if (isLoading) return (
//     <div className="container mx-auto px-4 py-8 animate-pulse">
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//             </div>
//             <Skeleton className="h-10 w-48 mb-6" />
//             <div className="flex justify-start space-x-3">
//                 <Skeleton className="h-10 w-24 rounded-md" />
//                 <Skeleton className="h-10 w-24 rounded-md" />
//             </div>
//         </div>
//          <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//          <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//     </div>
//   );

//   // Balance Loading Error State
//   if (error && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//              <p className="font-semibold">Error Loading Balance</p>
//              <p className="text-sm mt-1">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline" className="mt-6">
//             Go Back
//         </Button>
//     </div>
//    );

//   // Balance Not Found State
//   if (!isLoading && !balanceDetail) return (
//     <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//         <p>Balance details not found or you may not have access.</p>
//         <Button onClick={() => router.push('/dashboard')} variant="outline" className="mt-4">
//              Go to Dashboard
//         </Button>
//     </div>
//    );

//   // --- Balance Detail is Loaded, Continue Rendering ---
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
//   const canSendMoney = currentBalance > 0;
//   const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm transition-colors">
//         <IoIosArrowBack size={18} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//          {/* Card Content: Flag, Title, Amount, Buttons */}
//           <div className="flex items-center gap-4 mb-4">
//                 {balanceDetail.currency.flagImage ? (
//                     <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
//                  ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
//                  )}
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{currencyCode} Balance</h2>
//             </div>
//             <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                 {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
//             </div>
//             <div className="flex justify-start space-x-3">
//                 <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//                     <Button className="bg-green-600 hover:bg-green-700 text-white">
//                         <LuPlus size={18} className="mr-2"/> Add
//                     </Button>
//                 </Link>
//                 <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
//                     <GoArrowUp size={18} className="mr-2" /> Send
//                 </Button>
//             </div>
//       </div>

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions if there are transactions to filter/search */}
//             {/* Pass balanceSpecificTransactions as the base list for actions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // Add userAccounts prop if filter component needs it
//                />
//             )}
//             {/* Loading skeleton for actions */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//         </div>

//         {/* Transaction Loading State */}
//         {isTransactionsLoading && (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//         )}

//         {/* Transaction Error State */}
//         {!isTransactionsLoading && error && balanceDetail && (
//              <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                  <strong>Error:</strong> {error.replace('Failed to load transactions: ','')}
//              </div>
//         )}

//         {/* Transaction List Area */}
//         {!isTransactionsLoading && !error && (
//             <div className="space-y-4">

//                  {/* --- Needs Your Attention Section --- */}
//                  {pendingAttentionTransactions.length > 0 && (
//                      <div>
//                          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                              {pendingAttentionTransactions.map((transaction) => {
//                                  const amount = transaction.amountToAdd ?? 0;
//                                  const name = `To your ${currencyCode} balance`;
//                                  return (
//                                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                           <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                              <div className="flex items-center gap-4">
//                                                  {/* Icon with Badge */}
//                                                  <div className="relative flex-shrink-0">
//                                                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                          <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                      </div>
//                                                       <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                                  </div>
//                                                  {/* Details */}
//                                                  <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                      <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                          <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                      </div>
//                                                      <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                          + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                      </div>
//                                                  </div>
//                                              </div>
//                                          </a>
//                                      </Link>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  )}

//                 {/* --- In Progress Transactions Section --- */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">In progress</h2>
//                      <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                            const isAddMoney = transaction.type === "Add Money";
//                            const icon = isAddMoney ? <LuPlus size={22} className="`text-blue-600 dark:text-blue-400`" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                            let description = isAddMoney ? "We received your funds" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                            const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                            const amountPrefix = isAddMoney ? "+ " : "- ";
//                            const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient");

//                            return (
//                                  <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          <div className="flex items-center gap-4">
//                                              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40">
//                                                  {icon}
//                                              </div>
//                                              <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                  <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                  </div>
//                                                  <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                      {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode}
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </a>
//                                  </Link>
//                              );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Processed Transactions (Grouped by Date) Section --- */}
//                 {/* Fix: Check groupedProcessedTransactions exists before accessing keys */}
//                 {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                              <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                     let description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                     let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                     if (transaction.status === "canceled" || transaction.status === "cancelled") { description = "Cancelled"; amountClass = "text-red-500 dark:text-red-400 line-through"; }
//                                     else if (transaction.status === "failed") { description = "Failed"; amountClass = "text-red-500 dark:text-red-400"; }

//                                      return (
//                                          <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                              <a className="block hover:bg-gray-100 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  <div className="flex items-center gap-4">
//                                                      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50">
//                                                          {icon}
//                                                      </div>
//                                                      <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                          <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                          </div>
//                                                          <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                              {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode}
//                                                          </div>
//                                                      </div>
//                                                  </div>
//                                              </a>
//                                          </Link>
//                                      );
//                                 })}
//                             </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* --- Empty State for Transactions --- */}
//                 {!hasAnyTransactionsToDisplay && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty
//                        ? `No transactions found for this ${currencyCode} balance yet.`
//                        : "No transactions match your current filter or search criteria." // Filters/search yielded empty
//                     }
//                   </div>
//                 )}
//             </div>
//         )}
//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client"; // Required for hooks and client-side interactivity

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios"; // Keep for direct balance fetch
// import { parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Add Money
// import { GoArrowUp } from "react-icons/go"; // Send Money
// import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge
// import { FaExchangeAlt, FaInfoCircle, FaPercent } from "react-icons/fa"; // For rates section

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import apiConfig from "../../../config/apiConfig"; // Adjust path
// import currencyService from "../../../services/currency"; // Import currency service
// import exchangeRateService from "../../../services/exchangeRate"; // Import exchange rate service

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // Configure Axios Base URL (Optional: Services might handle this)
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // Interface for the detailed balance data fetched directly
// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v?: number;
// }

// // Interface for currencies fetched WITH adjustment percentage
// interface CurrencyWithRate {
//     _id: string;
//     code: string;
//     currencyName: string;
//     flagImage?: string;
//     rateAdjustmentPercentage?: number; // Use the correct field name
// }

// // Interface for live rates from exchangeRateService
// interface LiveRatesData {
//     base: string;
//     date: string;
//     rates: { [key: string]: string }; // Rates are string values from API
//     timestamp: number;
//     updatedAt: Date; // Or string if your service returns string
// }

// // --- Utility Function ---
// // More robust date parsing, prioritizing ISO format
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Attempt ISO parsing first (most common from backend)
//         const isoDate = parseISO(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(isoDate.getTime())) {
//             return isoDate;
//         }
//     } catch {
//         // Ignore ISO parsing errors and try other formats if needed
//     }

//     // Fallback for dd-MM-yyyy if you expect it from filters
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//             // Use local time based on user's system
//             return new Date(year, month, day);
//         }
//     }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//   const [isRatesLoading, setIsRatesLoading] = useState(true); // Loading rates data
//   const [error, setError] = useState<string | null>(null); // General error for balance/transactions
//   const [ratesError, setRatesError] = useState<string | null>(null); // Specific error for rates section
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // NEW State for rates data
//   const [balanceCurrencyDetails, setBalanceCurrencyDetails] = useState<CurrencyWithRate | null>(null); // Details for THIS balance currency including adjustment %
//   const [liveRates, setLiveRates] = useState<LiveRatesData | null>(null); // Live market rates

//   // --- Data Fetching ---
//    const fetchData = useCallback(async () => {
//        if (!balanceId || !token) {
//            setError("Missing balance ID or authentication token.");
//            setIsLoading(false); setIsTransactionsLoading(false); setIsRatesLoading(false); return;
//        }
//        // Reset states on new fetch
//        setIsLoading(true); setIsTransactionsLoading(true); setIsRatesLoading(true);
//        setError(null); setRatesError(null);
//        setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);
//        setBalanceCurrencyDetails(null); setLiveRates(null);

//        try {
//            // 1. Fetch Balance Details first to get the currency code
//            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//            const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
//            setBalanceDetail(fetchedBalanceDetail);
//            setIsLoading(false); // Balance details loaded

//            const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
//            if (!currentCurrencyCode) {
//                 throw new Error("Could not determine the currency code for this balance.");
//            }

//            // 2. Fetch Currency Details (with rate adjustment), Live Rates, and Transactions in parallel
//            const [currencyDetailsResult, liveRatesResult, paymentsResult, transfersResult] = await Promise.allSettled([
//                // Fetch this specific currency's details using the public route with ?rates=true
//                // This assumes the public route returns the rateAdjustmentPercentage when requested
//                currencyService.getAllCurrencies(true).then(allCurrencies =>
//                     allCurrencies.find(c => c.code === currentCurrencyCode) || null
//                 ),
//                exchangeRateService.getExchangeRatesForCurrencies(),
//                paymentService.getUserPayments(token),
//                transferService.getUserTransfers(token),
//            ]);

//            // Process Currency Details Result
//            if (currencyDetailsResult.status === 'fulfilled' && currencyDetailsResult.value) {
//                 setBalanceCurrencyDetails(currencyDetailsResult.value);
//            } else {
//                 console.error("Balance currency details fetch error:", currencyDetailsResult.status === 'rejected' ? currencyDetailsResult.reason : 'Not found/returned');
//                 setRatesError("Failed to load currency adjustment details."); // Set specific error
//            }

//            // Process Live Rates Result
//            if (liveRatesResult.status === 'fulfilled' && liveRatesResult.value.rates) {
//                 setLiveRates(liveRatesResult.value.rates);
//            } else {
//                 console.error("Live rates fetch error:", liveRatesResult.status === 'rejected' ? liveRatesResult.reason : 'No rates data');
//                 if (!ratesError) setRatesError("Failed to load live exchange rates."); // Don't overwrite previous error
//            }
//            setIsRatesLoading(false); // Rates loading finished (success or fail)

//            // Process Transactions Results
//            let combinedTransactions: Transaction[] = [];
//            if (paymentsResult.status === 'fulfilled') {
//                  const mappedPayments: Transaction[] = paymentsResult.value.map(payment => ({
//                      ...payment, // Spread existing payment data
//                      type: "Add Money", // Explicitly set type
//                      status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                  }));
//                  combinedTransactions = [...combinedTransactions, ...mappedPayments];
//            } else {
//                  console.error("Payments fetch error:", paymentsResult.reason);
//                  // Optionally set a general error if transactions are critical
//                  // if (!error) setError("Failed to load payment history.");
//            }

//            if (transfersResult.status === 'fulfilled') {
//                  const mappedTransfers: Transaction[] = transfersResult.value.map(transfer => ({
//                      ...transfer, // Spread existing transfer data
//                      type: "Send Money", // Explicitly set type
//                      status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                      name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                            ? transfer.recipient.accountHolderName ?? 'Recipient'
//                            : 'Recipient', // Example: Extract name
//                      sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                        ? transfer.sourceAccount
//                                        : transfer.sourceAccount?._id, // Extract source ID
//                  }));
//                  combinedTransactions = [...combinedTransactions, ...mappedTransfers];
//            } else {
//                  console.error("Transfers fetch error:", transfersResult.reason);
//                  // if (!error) setError("Failed to load transfer history.");
//            }

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
//             setAllTransactions(combinedTransactions);
//             setIsTransactionsLoading(false); // Transactions loading finished

//        } catch (err: any) { // Catch errors from initial balance fetch or unexpected issues
//            console.error("Overall fetch error in BalanceDetailPage:", err);
//            setError(err.response?.data?.message || err.message || "An unexpected error occurred while loading page data.");
//            setIsLoading(false); setIsTransactionsLoading(false); setIsRatesLoading(false); // Ensure all loaders stop on critical error
//        }
//    }, [balanceId, token]); // Dependencies for fetchData

//   useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }
//     // Filter all transactions to get only those relevant to this balanceId
//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//          // Payment is relevant if its associated account ID matches the current balance ID
//          const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//          return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//          // Transfer is relevant if its source account ID matches the current balance ID
//          // Ensure sourceAccountId is correctly populated or derived
//          const sourceAccId = typeof transaction.sourceAccount === 'string'
//                                 ? transaction.sourceAccount
//                                 : transaction.sourceAccount?._id; // Check if sourceAccount is object or string ID
//          return sourceAccId === balanceId;
//       }
//       return false;
//     });
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
//   }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//     const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//         // Update the displayed transactions based on search results from the child component
//         setDisplayTransactions(searchResults);
//     }, []); // No dependencies needed here as it only sets state

//     const handleFiltersApply = useCallback((filters: {
//         selectedDirection?: string;
//         selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
//         fromDate?: string; // Date string format depends on your DatePicker
//         toDate?: string;   // Date string format depends on your DatePicker
//     }) => {
//         console.log(`BalanceDetailPage: Applying filters:`, filters);
//         let tempFiltered = [...balanceSpecificTransactions]; // Start with transactions for this specific balance

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase during mapping
//                 if (!txStatus) return false;

//                 // Map UI filter names (like 'needs attention') to potential backend statuses
//                 if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                 if (statusFilter === 'completed') return txStatus === 'completed';
//                 if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Handle variations
//                 if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                 if (statusFilter === 'failed') return txStatus === 'failed';
//                 // Add more specific mappings if your filter UI has other options
//                 return false; // Default to excluding if status doesn't match known filter categories
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage for comparisons
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected 'from' day
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected 'to' day

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt for the transaction date
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter if date is missing

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend is parsable
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string for filtering:", transactionDateStr);
//                          return false; // Exclude transactions with invalid dates
//                     }
//                     // Apply date range filtering logic
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // Update the state that controls the UI transaction list
//         setDisplayTransactions(tempFiltered);

//     }, [balanceSpecificTransactions]); // Recalculate filters if the base list of balance-specific transactions changes

//   // --- Memoized Transaction Grouping for Display ---
//   // Groups transactions from the `displayTransactions` state (which reflects search/filters)
//   const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
//       // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//       const pendingAttention = displayTransactions.filter(
//           (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
//       );

//       // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//       const inProgress = displayTransactions.filter(
//           (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                    (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//       );

//       // 3. Processed: Completed, Canceled/Cancelled, Failed transactions
//       const processed = displayTransactions.filter(
//           (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//       );

//       // Sort processed transactions by date (newest first)
//       const sortedProcessed = [...processed].sort((a, b) => {
//           const dateA = a.updatedAt || a.createdAt;
//           const dateB = b.updatedAt || b.createdAt;
//           if (!dateA && !dateB) return 0;
//           if (!dateA) return 1; // Put items without date at the end
//           if (!dateB) return -1;
//           try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//           catch { return 0; } // Avoid crashing on invalid dates
//       });

//       // Group sorted processed transactions by date string (e.g., "July 20, 2023")
//       const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDateStr = tx.updatedAt || tx.createdAt;
//           if (!groupDateStr) {
//               const unknownDateKey = 'Unknown Date'; // Handle transactions without a date
//               groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//               return groups;
//           }
//           try {
//               // Use a consistent, user-friendly format for grouping keys
//               const dateKey = new Date(groupDateStr).toLocaleDateString(undefined, { // Use user's locale settings
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//               });
//               groups[dateKey] = [...(groups[dateKey] || []), tx];
//           } catch (e) {
//               console.error("Error formatting date for grouping:", groupDateStr, e);
//               const errorKey = 'Date Error'; // Handle potential date parsing errors
//               groups[errorKey] = [...(groups[errorKey] || []), tx];
//           }
//           return groups;
//       }, {});

//       return {
//           pendingAttentionTransactions: pendingAttention,
//           inProgressTransactions: inProgress,
//           groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
//           hasProcessedTransactions: processed.length > 0,
//       };
//   }, [displayTransactions]); // Recalculate only when the transactions to display change

//     // --- Calculate Live Rates for Display ---
//     const displayLiveRates = useMemo(() => {
//         if (isRatesLoading || !balanceDetail || !liveRates?.rates) {
//             return []; // Return empty array if data isn't ready
//         }

//         const userCurrencyCode = balanceDetail.currency.code;
//         const liveRatesMap = liveRates.rates; // Map of currency code -> rate string
//         const liveBaseCode = liveRates.base; // Base currency from the API (e.g., 'USD')

//         // Define target currencies for comparison (adjust as needed)
//         const targetCodes = ['USD', 'EUR', 'GBP', 'INR'].filter(code => code !== userCurrencyCode); // Exclude self-comparison
//         const results = [];

//         for (const targetCode of targetCodes) {
//             let liveRateDisplay = "N/A"; // Default display

//             // Get rates relative to the API's base currency
//             // Handle cases where rate might be missing or non-numeric
//             const rateLiveBaseToUserStr = liveRatesMap[userCurrencyCode];
//             const rateLiveBaseToTargetStr = liveRatesMap[targetCode];

//             const rateLiveBaseToUser = userCurrencyCode === liveBaseCode ? 1 : (rateLiveBaseToUserStr ? parseFloat(rateLiveBaseToUserStr) : NaN);
//             const rateLiveBaseToTarget = targetCode === liveBaseCode ? 1 : (rateLiveBaseToTargetStr ? parseFloat(rateLiveBaseToTargetStr) : NaN);

//             // Calculate direct live rate if both relative rates are valid numbers
//             if (!isNaN(rateLiveBaseToUser) && !isNaN(rateLiveBaseToTarget) && rateLiveBaseToUser !== 0) {
//                 const liveRate = rateLiveBaseToTarget / rateLiveBaseToUser;
//                 liveRateDisplay = `1 ${userCurrencyCode} ≈ ${liveRate.toFixed(4)} ${targetCode}`; // Format the output string
//             } else {
//                  console.warn(`Could not calculate live rate between ${userCurrencyCode} and ${targetCode}`);
//             }

//             results.push({ targetCode, liveRate: liveRateDisplay });
//         }
//         return results;

//     }, [balanceDetail, liveRates, isRatesLoading]); // Dependencies for recalculation

//     // Get the adjustment percentage for the current balance's currency
//     const currentAdjustmentPercent = useMemo(() => {
//         if (isRatesLoading || !balanceCurrencyDetails) return null; // Return null if still loading or details missing
//         // Default to 0% if the field is null, undefined, or missing
//         return balanceCurrencyDetails.rateAdjustmentPercentage ?? 0;
//     }, [balanceCurrencyDetails, isRatesLoading]); // Dependencies

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => {
//     router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page for this balance
//   };

//    // --- Send Click Handler ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             // Navigate to the first step of the send flow for this balance
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             // Open the insufficient balance modal if balance is zero or less
//             handleOpenInsufficientBalanceModal();
//         }
//     };

//   // --- Render Logic ---

//   // Initial Loading State for Balance Detail (Most critical part)
//   if (isLoading) return (
//     <div className="container mx-auto px-4 py-8 animate-pulse">
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//             </div>
//             <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
//             <div className="flex justify-start space-x-3">
//                 <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
//                 <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
//             </div>
//         </div>
//          {/* Placeholders for other sections */}
//          <Skeleton className="h-8 w-40 mb-4" /> {/* Rates Title */}
//          <Skeleton className="h-24 w-full rounded-lg mb-8" /> {/* Rates Area */}
//          <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//          <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//     </div>
//   );

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     // Show error message if loading failed, or "not found" if loading finished but no data
//     const message = error || "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={() => router.back()} variant="outline" className="mt-6">
//                 Go Back
//             </Button>
//         </div>
//      );
//    }

//   // --- Balance Detail is Loaded, Continue Rendering ---
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
//   const canSendMoney = currentBalance > 0;
//   const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
//         <IoIosArrowBack size={18} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//          {/* Card Content: Flag, Title, Amount, Buttons */}
//           <div className="flex items-center gap-4 mb-4">
//                 {balanceDetail.currency.flagImage ? (
//                     <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
//                  ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
//                  )}
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{balanceDetail.currency.currencyName || `${currencyCode} Balance`}</h2>
//             </div>
//             <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                 {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
//             </div>
//             <div className="flex justify-start space-x-3">
//                 <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//                     <Button className="bg-green-600 hover:bg-green-700 text-white">
//                         <LuPlus size={18} className="mr-2"/> Add
//                     </Button>
//                 </Link>
//                 <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
//                     <GoArrowUp size={18} className="mr-2" /> Send
//                 </Button>
//             </div>
//       </div>

//       {/* --- Exchange Rates & Adjustment Section --- */}
//       <div className="mt-10 mb-8">
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
//                  <FaExchangeAlt className="text-primary"/> Market Rates & Adjustment
//             </h3>
//             {isRatesLoading ? (
//                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {/* Skeletons for Rate Cards */}
//                       {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 rounded-lg bg-gray-200 dark:bg-gray-700"/>)}
//                  </div>
//             ) : ratesError ? (
//                  <div className="text-center py-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-700/40 text-sm">
//                      <strong>Rates Error:</strong> {ratesError}
//                  </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                      {/* Adjustment Percentage Display Card */}
//                      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700/50 flex flex-col justify-between">
//                           <div>
//                              <div className="flex items-center gap-2 mb-1 text-blue-700 dark:text-blue-300">
//                                   <FaPercent size={14}/>
//                                   <span className="text-xs font-semibold uppercase tracking-wider">Rate Adjustment</span>
//                              </div>
//                              <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
//                                   {/* Display the fetched adjustment percentage */}
//                                   {currentAdjustmentPercent != null ? `${currentAdjustmentPercent >= 0 ? '+' : ''}${currentAdjustmentPercent}%` : 'N/A'}
//                              </p>
//                           </div>
//                           <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Applied when sending from {currencyCode}.</p>
//                      </div>

//                      {/* Live Rate Comparison Cards */}
//                      {displayLiveRates.map(rateInfo => (
//                          <div key={rateInfo.targetCode} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
//                               <div>
//                                  <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400">
//                                       <FaInfoCircle size={14}/>
//                                       <span className="text-xs font-semibold uppercase tracking-wider">Market Rate</span>
//                                  </div>
//                                  <p className="text-base font-medium text-gray-800 dark:text-gray-100">
//                                       {/* Display the calculated live rate string */}
//                                       {rateInfo.liveRate}
//                                  </p>
//                               </div>
//                              {/* Optional: Add a timestamp if available from liveRates.date */}
//                              {/* <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">As of {liveRates?.date ? format(parseISO(liveRates.date), 'MMM d, HH:mm') : 'latest'}</p> */}
//                          </div>
//                      ))}
//                       {/* Show message if no comparison rates could be calculated */}
//                       {displayLiveRates.length === 0 && !isRatesLoading && !ratesError && (
//                             <div className="sm:col-span-3 text-center py-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700/50 text-sm">
//                                 No live rate comparisons available for {currencyCode}.
//                             </div>
//                         )}
//                  </div>
//             )}
//       </div>

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions if there are transactions to filter/search */}
//             {/* Pass balanceSpecificTransactions as the base list for actions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Provide the list specific to this balance
//                   onTransactionsChange={handleSearchChange} // Callback for search updates
//                   onFiltersApply={handleFiltersApply} // Callback for filter updates
//                   // Pass userAccounts if the filter component needs account info (e.g., for filtering by account)
//                   // userAccounts={userAccounts} // You might need to fetch/pass userAccounts if required by TransactionActions
//                />
//             )}
//             {/* Loading skeleton for actions */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//         </div>

//         {/* Transaction Loading State */}
//         {isTransactionsLoading && (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//         )}

//         {/* Transaction Error State (Show only if balance loaded but transactions failed) */}
//         {!isTransactionsLoading && error && balanceDetail && (
//              <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                  <strong>Transaction Error:</strong> {error.replace('Failed to load transactions: ','')}
//              </div>
//         )}

//         {/* Transaction List Area */}
//         {!isTransactionsLoading && !error && ( // Render list only if no error and not loading
//             <div className="space-y-6">

//                  {/* --- Needs Your Attention Section --- */}
//                  {pendingAttentionTransactions.length > 0 && (
//                      <div>
//                          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                              {pendingAttentionTransactions.map((transaction) => {
//                                  const amount = transaction.amountToAdd ?? 0;
//                                  // Use balance currency code for the name display
//                                  const name = `To your ${currencyCode} balance`;
//                                  return (
//                                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                           <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                              <div className="flex items-center gap-4">
//                                                  {/* Icon with Badge */}
//                                                  <div className="relative flex-shrink-0">
//                                                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                          <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                      </div>
//                                                       {/* Error icon positioned at bottom right */}
//                                                       <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                                  </div>
//                                                  {/* Details */}
//                                                  <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                      <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                          <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                      </div>
//                                                      {/* Amount added */}
//                                                      <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                          + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                      </div>
//                                                  </div>
//                                              </div>
//                                          </a>
//                                      </Link>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  )}

//                 {/* --- In Progress Transactions Section --- */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1 text-sm uppercase tracking-wider">In progress</h2>
//                      <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                       {inProgressTransactions.map((transaction) => {
//                            const isAddMoney = transaction.type === "Add Money";
//                            const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                            let description = isAddMoney ? "Processing your deposit" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                            // For 'Add Money', use amountToAdd and balanceCurrency. For 'Send Money', use sendAmount and sendCurrency.
//                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                            const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                            const amountPrefix = isAddMoney ? "+ " : "- ";
//                            const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient"); // Use recipient name for sends

//                            return (
//                                  <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          <div className="flex items-center gap-4">
//                                              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40 flex-shrink-0">
//                                                  {icon}
//                                              </div>
//                                              <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                  <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                  </div>
//                                                  <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                      {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode || currencyCode} {/* Fallback to balance currency */}
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </a>
//                                  </Link>
//                              );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Processed Transactions (Grouped by Date) Section --- */}
//                 {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                              {/* Date Header */}
//                              <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                              {/* Group Container */}
//                              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-gray-500 dark:text-gray-400" /> : <GoArrowUp size={22} className="text-gray-500 dark:text-gray-400" />;
//                                     let description = "";
//                                     let amountClass = "";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient"); // Use recipient name for sends

//                                     // Determine description and amount style based on status
//                                     switch (transaction.status) {
//                                         case "completed":
//                                             description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                             amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                             break;
//                                         case "canceled":
//                                             description = "Cancelled";
//                                             amountClass = "text-red-500 dark:text-red-400 line-through";
//                                             break;
//                                         case "failed":
//                                             description = "Failed";
//                                             amountClass = "text-red-500 dark:text-red-400";
//                                             break;
//                                         default: // Should not happen in processed group, but fallback
//                                             description = transaction.status ?? 'Unknown';
//                                             amountClass = "text-gray-500 dark:text-gray-400";
//                                     }

//                                      return (
//                                          <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                              <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  <div className="flex items-center gap-4">
//                                                       {/* Icon */}
//                                                      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50 flex-shrink-0">
//                                                          {icon}
//                                                      </div>
//                                                      {/* Details */}
//                                                      <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                          <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                          </div>
//                                                           {/* Amount */}
//                                                          <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                              {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode || currencyCode} {/* Fallback to balance currency */}
//                                                          </div>
//                                                      </div>
//                                                  </div>
//                                              </a>
//                                          </Link>
//                                      );
//                                 })}
//                             </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* --- Empty State for Transactions --- */}
//                 {!isTransactionsLoading && !hasAnyTransactionsToDisplay && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty initially
//                        ? `No transactions found for your ${currencyCode} balance yet.`
//                        : "No transactions match your current filter or search criteria." // Filters/search yielded empty results
//                     }
//                      <p className="mt-2 text-sm">You can <Link href={`/dashboard/balances/${balanceId}/add-money`} className="text-primary hover:underline font-medium">add money</Link> or <button onClick={handleSendClick} disabled={!canSendMoney} className={`text-primary hover:underline font-medium ${!canSendMoney ? 'opacity-50 cursor-not-allowed' : ''}`}>send money</button>.</p>
//                   </div>
//                 )}
//             </div>
//         )}
//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client"; // Required for hooks and client-side interactivity

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios"; // Keep for direct balance fetch
// import { parseISO } from "date-fns"; // Keep for potential use, though grouping uses toLocaleDateString

// // Icons
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Add Money
// import { GoArrowUp } from "react-icons/go"; // Send Money
// import { MdErrorOutline } from "react-icons/md"; // Needs Attention badge

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import apiConfig from "../../../config/apiConfig"; // Adjust path

// // Components and Types
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // Configure Axios Base URL (Optional: Services might handle this)
// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces ---
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // Interface for the detailed balance data fetched directly
// interface BalanceDetail {
//   _id: string;
//   user: string;
//   currency: {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//   };
//   balance: number;
//   accountNumber?: string;
//   createdAt: string;
//   __v?: number;
// }

// // --- Utility Function ---
// // More robust date parsing, prioritizing ISO format
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Attempt ISO parsing first (most common from backend)
//         const isoDate = parseISO(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(isoDate.getTime())) {
//             return isoDate;
//         }
//     } catch {
//         // Ignore ISO parsing errors and try other formats if needed
//     }

//     // Fallback for dd-MM-yyyy if you expect it from filters
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//             // Use local time based on user's system
//             return new Date(year, month, day);
//         }
//     }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth();

//   // --- State ---
//   const [balanceDetail, setBalanceDetail] = useState<BalanceDetail | null>(null);
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // All user transactions
//   const [balanceSpecificTransactions, setBalanceSpecificTransactions] = useState<Transaction[]>([]); // Filtered for this balance
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isLoading, setIsLoading] = useState(true); // Loading balance detail
//   const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); // Loading transactions
//   const [error, setError] = useState<string | null>(null); // General error for balance/transactions
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Data Fetching ---
//    const fetchData = useCallback(async () => {
//        if (!balanceId || !token) {
//            setError("Missing balance ID or authentication token.");
//            setIsLoading(false); setIsTransactionsLoading(false); /* Removed setIsRatesLoading(false) */ return;
//        }
//        // Reset states on new fetch
//        setIsLoading(true); setIsTransactionsLoading(true); /* Removed setIsRatesLoading(true) */
//        setError(null); /* Removed setRatesError(null) */
//        setBalanceDetail(null); setAllTransactions([]); setBalanceSpecificTransactions([]); setDisplayTransactions([]);

//        try {
//            // 1. Fetch Balance Details first to get the currency code
//            const balanceResponse = await axios.get(`/accounts/${balanceId}`, { headers: { Authorization: `Bearer ${token}` } });
//            const fetchedBalanceDetail = balanceResponse.data as BalanceDetail;
//            setBalanceDetail(fetchedBalanceDetail);
//            setIsLoading(false); // Balance details loaded

//            const currentCurrencyCode = fetchedBalanceDetail?.currency?.code;
//            if (!currentCurrencyCode) {
//                 throw new Error("Could not determine the currency code for this balance.");
//            }

//            // 2. Fetch Transactions in parallel
//            const [paymentsResult, transfersResult] = await Promise.allSettled([

//                paymentService.getUserPayments(token),
//                transferService.getUserTransfers(token),
//            ]);

//            // Process Transactions Results
//            let combinedTransactions: Transaction[] = [];
//            if (paymentsResult.status === 'fulfilled') {
//                  const mappedPayments: Transaction[] = paymentsResult.value.map(payment => ({
//                      ...payment, // Spread existing payment data
//                      type: "Add Money", // Explicitly set type
//                      status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                  }));
//                  combinedTransactions = [...combinedTransactions, ...mappedPayments];
//            } else {
//                  console.error("Payments fetch error:", paymentsResult.reason);
//                  // Set general error if transactions are critical, even if rates failed before
//                  if (!error) setError("Failed to load payment history.");
//            }

//            if (transfersResult.status === 'fulfilled') {
//                  const mappedTransfers: Transaction[] = transfersResult.value.map(transfer => ({
//                      ...transfer, // Spread existing transfer data
//                      type: "Send Money", // Explicitly set type
//                      status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                      name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                            ? transfer.recipient.accountHolderName ?? 'Recipient'
//                            : 'Recipient', // Example: Extract name
//                      sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                        ? transfer.sourceAccount
//                                        : transfer.sourceAccount?._id, // Extract source ID
//                  }));
//                  combinedTransactions = [...combinedTransactions, ...mappedTransfers];
//            } else {
//                  console.error("Transfers fetch error:", transfersResult.reason);
//                  if (!error) setError("Failed to load transfer history.");
//            }

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
//             setAllTransactions(combinedTransactions);
//             setIsTransactionsLoading(false); // Transactions loading finished

//        } catch (err: any) { // Catch errors from initial balance fetch or unexpected issues
//            console.error("Overall fetch error in BalanceDetailPage:", err);
//            setError(err.response?.data?.message || err.message || "An unexpected error occurred while loading page data.");
//            setIsLoading(false); setIsTransactionsLoading(false); /* Removed setIsRatesLoading(false) */ // Ensure all loaders stop on critical error
//        }
//    }, [balanceId, token, error]); // Added error to dependencies to avoid potential infinite loop if error setting occurs

//   useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when dependencies change

//   // --- Filter Transactions Specific to this Balance ---
//   useEffect(() => {
//     if (!balanceId || allTransactions.length === 0) {
//       setBalanceSpecificTransactions([]);
//       setDisplayTransactions([]);
//       return;
//     }
//     // Filter all transactions to get only those relevant to this balanceId
//     const filtered = allTransactions.filter((transaction) => {
//       if (transaction.type === "Add Money") {
//          // Payment is relevant if its associated account ID matches the current balance ID
//          const paymentAccountId = typeof transaction.account === 'string' ? transaction.account : transaction.account?._id;
//          return paymentAccountId === balanceId;
//       } else if (transaction.type === "Send Money") {
//          // Transfer is relevant if its source account ID matches the current balance ID
//          // Ensure sourceAccountId is correctly populated or derived
//          const sourceAccId = typeof transaction.sourceAccount === 'string'
//                                 ? transaction.sourceAccount
//                                 : transaction.sourceAccount?._id; // Check if sourceAccount is object or string ID
//          return sourceAccId === balanceId;
//       }
//       return false;
//     });
//     setBalanceSpecificTransactions(filtered);
//     setDisplayTransactions(filtered); // Initialize display list with balance-specific transactions
//   }, [allTransactions, balanceId]); // Run when all transactions are loaded or balanceId changes

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//     const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//         // Update the displayed transactions based on search results from the child component
//         setDisplayTransactions(searchResults);
//     }, []); // No dependencies needed here as it only sets state

//     const handleFiltersApply = useCallback((filters: {
//         selectedDirection?: string;
//         selectedStatus?: string | null; // Status filter value (e.g., 'completed', 'pending')
//         fromDate?: string; // Date string format depends on your DatePicker
//         toDate?: string;   // Date string format depends on your DatePicker
//     }) => {
//         console.log(`BalanceDetailPage: Applying filters:`, filters);
//         let tempFiltered = [...balanceSpecificTransactions]; // Start with transactions for this specific balance

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase during mapping
//                 if (!txStatus) return false;

//                 // Map UI filter names (like 'needs attention') to potential backend statuses
//                 if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                 if (statusFilter === 'completed') return txStatus === 'completed';
//                 if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Handle variations
//                 if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                 if (statusFilter === 'failed') return txStatus === 'failed';
//                 // Add more specific mappings if your filter UI has other options
//                 return false; // Default to excluding if status doesn't match known filter categories
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage for comparisons
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected 'from' day
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected 'to' day

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt for the transaction date
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter if date is missing

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes ISO 8601 format from backend is parsable
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string for filtering:", transactionDateStr);
//                          return false; // Exclude transactions with invalid dates
//                     }
//                     // Apply date range filtering logic
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date during filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // Update the state that controls the UI transaction list
//         setDisplayTransactions(tempFiltered);

//     }, [balanceSpecificTransactions]); // Recalculate filters if the base list of balance-specific transactions changes

//   // --- Memoized Transaction Grouping for Display ---
//   // Groups transactions from the `displayTransactions` state (which reflects search/filters)
//   const { pendingAttentionTransactions, inProgressTransactions, groupedProcessedTransactions, hasProcessedTransactions } = useMemo(() => {
//       // 1. Needs Attention: 'Add Money' transactions with status 'pending'
//       const pendingAttention = displayTransactions.filter(
//           (tx) => tx.type === "Add Money" && tx.status === "pending" // Status already normalized
//       );

//       // 2. In Progress: 'Add Money'/'in progress' OR 'Send Money'/'pending'/'processing'
//       const inProgress = displayTransactions.filter(
//           (tx) => (tx.type === "Add Money" && tx.status === "in progress") ||
//                    (tx.type === "Send Money" && (tx.status === "pending" || tx.status === "processing"))
//       );

//       // 3. Processed: Completed, Canceled/Cancelled, Failed transactions
//       const processed = displayTransactions.filter(
//           (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//       );

//       // Sort processed transactions by date (newest first)
//       const sortedProcessed = [...processed].sort((a, b) => {
//           const dateA = a.updatedAt || a.createdAt;
//           const dateB = b.updatedAt || b.createdAt;
//           if (!dateA && !dateB) return 0;
//           if (!dateA) return 1; // Put items without date at the end
//           if (!dateB) return -1;
//           try { return new Date(dateB).getTime() - new Date(dateA).getTime(); }
//           catch { return 0; } // Avoid crashing on invalid dates
//       });

//       // Group sorted processed transactions by date string (e.g., "July 20, 2023")
//       const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//           const groupDateStr = tx.updatedAt || tx.createdAt;
//           if (!groupDateStr) {
//               const unknownDateKey = 'Unknown Date'; // Handle transactions without a date
//               groups[unknownDateKey] = [...(groups[unknownDateKey] || []), tx];
//               return groups;
//           }
//           try {
//               // Use a consistent, user-friendly format for grouping keys
//               const dateKey = new Date(groupDateStr).toLocaleDateString(undefined, { // Use user's locale settings
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//               });
//               groups[dateKey] = [...(groups[dateKey] || []), tx];
//           } catch (e) {
//               console.error("Error formatting date for grouping:", groupDateStr, e);
//               const errorKey = 'Date Error'; // Handle potential date parsing errors
//               groups[errorKey] = [...(groups[errorKey] || []), tx];
//           }
//           return groups;
//       }, {});

//       return {
//           pendingAttentionTransactions: pendingAttention,
//           inProgressTransactions: inProgress,
//           groupedProcessedTransactions: grouped || {}, // Ensure it's always an object
//           hasProcessedTransactions: processed.length > 0,
//       };
//   }, [displayTransactions]); // Recalculate only when the transactions to display change

//     // Removed calculations for live rates: displayLiveRates, currentAdjustmentPercent

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => {
//     router.push(`/dashboard/balances/${balanceId}/add-money`); // Navigate to Add Money page for this balance
//   };

//    // --- Send Click Handler ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             // Navigate to the first step of the send flow for this balance
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             // Open the insufficient balance modal if balance is zero or less
//             handleOpenInsufficientBalanceModal();
//         }
//     };

//   // --- Render Logic ---

//   // Initial Loading State for Balance Detail (Most critical part)
//   if (isLoading) return (
//     <div className="container mx-auto px-4 py-8 animate-pulse">
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-4 mb-4">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//             </div>
//             <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
//             <div className="flex justify-start space-x-3">
//                 <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
//                 <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
//             </div>
//         </div>
//          {/* Removed Placeholders for rates section */}
//          <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//          <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//     </div>
//   );

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     // Show error message if loading failed, or "not found" if loading finished but no data
//     const message = error || "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={() => router.back()} variant="outline" className="mt-6">
//                 Go Back
//             </Button>
//         </div>
//      );
//    }

//   // --- Balance Detail is Loaded, Continue Rendering ---
//   const currencyCode = balanceDetail.currency.code;
//   const currentBalance = balanceDetail.balance;
//   const formattedBalance = parseFloat(currentBalance.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Format with commas
//   const canSendMoney = currentBalance > 0;
//   const hasAnyTransactionsToDisplay = pendingAttentionTransactions.length > 0 || inProgressTransactions.length > 0 || hasProcessedTransactions;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
//         <IoIosArrowBack size={18} /> Back
//       </button>

//       {/* Balance Card */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
//          {/* Card Content: Flag, Title, Amount, Buttons */}
//           <div className="flex items-center gap-4 mb-4">
//                 {balanceDetail.currency.flagImage ? (
//                     <Image src={balanceDetail.currency.flagImage} alt={`${currencyCode} flag`} width={40} height={40} className="rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }} />
//                  ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">{currencyCode.slice(0, 2)}</div>
//                  )}
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{balanceDetail.currency.currencyName || `${currencyCode} Balance`}</h2>
//             </div>
//             <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                 {formattedBalance} <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">{currencyCode}</span>
//             </div>
//             <div className="flex justify-start space-x-3">
//                 <Link href={`/dashboard/balances/${balanceId}/add-money`} passHref>
//                     <Button className="bg-green-600 hover:bg-green-700 text-white">
//                         <LuPlus size={18} className="mr-2"/> Add
//                     </Button>
//                 </Link>
//                 <Button onClick={handleSendClick} className={`bg-blue-600 text-white ${!canSendMoney ? 'opacity-50 bg-blue-400 hover:bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`} title={!canSendMoney ? "Add funds to send money" : "Send money"}>
//                     <GoArrowUp size={18} className="mr-2" /> Send
//                 </Button>
//             </div>
//       </div>

//       {/* --- Transactions Section --- */}
//       <div className="mt-10"> {/* Adjusted margin if needed after removing the section above */}
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions if there are transactions to filter/search */}
//             {/* Pass balanceSpecificTransactions as the base list for actions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Provide the list specific to this balance
//                   onTransactionsChange={handleSearchChange} // Callback for search updates
//                   onFiltersApply={handleFiltersApply} // Callback for filter updates
//                   // Pass userAccounts if the filter component needs account info (e.g., for filtering by account)
//                   // userAccounts={userAccounts} // You might need to fetch/pass userAccounts if required by TransactionActions
//                />
//             )}
//             {/* Loading skeleton for actions */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//         </div>

//         {/* Transaction Loading State */}
//         {isTransactionsLoading && (
//           <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//         )}

//         {/* Transaction Error State (Show only if balance loaded but transactions failed) */}
//         {/* Adjusted condition to check specifically for transaction error, even if balance loaded */}
//         {!isTransactionsLoading && error && balanceDetail && (error.includes('payment history') || error.includes('transfer history')) && (
//              <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                  <strong>Transaction Error:</strong> {error}
//              </div>
//         )}

//         {/* Transaction List Area */}
//          {/* Render list only if not loading and no critical *transaction* error */}
//         {!isTransactionsLoading && (!error || !(error.includes('payment history') || error.includes('transfer history'))) && (
//             <div className="space-y-6">

//                  {/* --- Needs Your Attention Section --- */}
//                  {pendingAttentionTransactions.length > 0 && (
//                      <div>
//                          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                          <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                              {pendingAttentionTransactions.map((transaction) => {
//                                  const amount = transaction.amountToAdd ?? 0;
//                                  // Use balance currency code for the name display
//                                  const name = `To your ${currencyCode} balance`;
//                                  return (
//                                      <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                           <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                              <div className="flex items-center gap-4">
//                                                  {/* Icon with Badge */}
//                                                  <div className="relative flex-shrink-0">
//                                                       <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                          <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                      </div>
//                                                       {/* Error icon positioned at bottom right */}
//                                                       <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                                  </div>
//                                                  {/* Details */}
//                                                  <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                      <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                          <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                      </div>
//                                                      {/* Amount added */}
//                                                      <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                          + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                      </div>
//                                                  </div>
//                                              </div>
//                                          </a>
//                                      </Link>
//                                  );
//                              })}
//                          </div>
//                      </div>
//                  )}

//                 {/* --- In Progress Transactions Section --- */}
//                 {inProgressTransactions.length > 0 && (
//                   <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1 text-sm uppercase tracking-wider">In progress</h2>
//                      <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                       {inProgressTransactions.map((transaction) => {
//                            const isAddMoney = transaction.type === "Add Money";
//                            const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                            let description = isAddMoney ? "Processing your deposit" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                            // For 'Add Money', use amountToAdd and balanceCurrency. For 'Send Money', use sendAmount and sendCurrency.
//                            const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                            const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                            const amountPrefix = isAddMoney ? "+ " : "- ";
//                            const name = isAddMoney ? `To your ${txCurrencyCode} balance` : (transaction.name || "Recipient"); // Use recipient name for sends

//                            return (
//                                  <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          <div className="flex items-center gap-4">
//                                              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40 flex-shrink-0">
//                                                  {icon}
//                                              </div>
//                                              <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                  <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                      <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                  </div>
//                                                  <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                      {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode || currencyCode} {/* Fallback to balance currency */}
//                                                  </div>
//                                              </div>
//                                          </div>
//                                      </a>
//                                  </Link>
//                              );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* --- Processed Transactions (Grouped by Date) Section --- */}
//                 {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                              {/* Date Header */}
//                              <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                              {/* Group Container */}
//                              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-gray-500 dark:text-gray-400" /> : <GoArrowUp size={22} className="text-gray-500 dark:text-gray-400" />;
//                                     let description = "";
//                                     let amountClass = "";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient"); // Use recipient name for sends

//                                     // Determine description and amount style based on status
//                                     switch (transaction.status) {
//                                         case "completed":
//                                             description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                             amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                             break;
//                                         case "canceled": // Handle both spellings if needed
//                                         case "cancelled":
//                                             description = "Cancelled";
//                                             amountClass = "text-red-500 dark:text-red-400 line-through";
//                                             break;
//                                         case "failed":
//                                             description = "Failed";
//                                             amountClass = "text-red-500 dark:text-red-400";
//                                             break;
//                                         default: // Should not happen in processed group, but fallback
//                                             description = transaction.status ?? 'Unknown';
//                                             amountClass = "text-gray-500 dark:text-gray-400";
//                                     }

//                                      return (
//                                          <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                              <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  <div className="flex items-center gap-4">
//                                                       {/* Icon */}
//                                                      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50 flex-shrink-0">
//                                                          {icon}
//                                                      </div>
//                                                      {/* Details */}
//                                                      <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                          <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                          </div>
//                                                           {/* Amount */}
//                                                          <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                              {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode || currencyCode} {/* Fallback to balance currency */}
//                                                          </div>
//                                                      </div>
//                                                  </div>
//                                              </a>
//                                          </Link>
//                                      );
//                                 })}
//                             </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* --- Empty State for Transactions --- */}
//                 {!isTransactionsLoading && !hasAnyTransactionsToDisplay && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {balanceSpecificTransactions.length === 0 // Check if the base list for this balance was empty initially
//                        ? `No transactions found for your ${currencyCode} balance yet.`
//                        : "No transactions match your current filter or search criteria." // Filters/search yielded empty results
//                     }
//                      <p className="mt-2 text-sm">You can <Link href={`/dashboard/balances/${balanceId}/add-money`} className="text-primary hover:underline font-medium">add money</Link> or <button onClick={handleSendClick} disabled={!canSendMoney} className={`text-primary hover:underline font-medium ${!canSendMoney ? 'opacity-50 cursor-not-allowed' : ''}`}>send money</button>.</p>
//                   </div>
//                 )}
//             </div>
//         )}
//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import { useBalanceDetailData, BalanceDetail } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path

// // --- Interfaces --- (Keep params interface here)
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch {}
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook

//   // --- Data Fetching using Custom Hook ---
//   const {
//       balanceDetail,
//       balanceSpecificTransactions, // Base list fetched by the hook
//       isLoading, // Loading state for balance detail
//       isTransactionsLoading, // Loading state for transactions
//       error, // Combined error from hook
//       // fetchData, // Can expose fetchData if manual refetch is needed
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Derived State ---
//   const canSendMoney = useMemo(() => (balanceDetail?.balance ?? 0) > 0, [balanceDetail]);
//   const currencyCode = useMemo(() => balanceDetail?.currency?.code ?? 'N/A', [balanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       // When the base list from the hook changes (initial load, refetch), reset the display list
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults); // Update display list based on search
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions]; // Start with the base list for this balance

//       // --- Apply Filters (Copied logic from original) ---
//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') { /* ... filter logic ... */
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status; // Already normalized in hook
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//              });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered); // Update display list based on filters

//   }, [balanceSpecificTransactions]); // Recalculate if the base list changes

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal();
//         }
//     };
//     const handleBackClick = () => router.back();

//   // --- Render Logic ---

//   // Loading state before balance detail is available (or critical error)
//   if (isLoading && !balanceDetail && !error) {
//      // Show a more comprehensive initial skeleton maybe? Or keep BalanceHeader's skeleton
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Minimal Page Skeleton */}
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" /> {/* Placeholder for BalanceHeader */}
//              <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" /> {/* Actions Placeholder */}
//              <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//         </div>
//      );
//   }

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     const message = error || "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <BalanceHeader
//           balanceDetail={balanceDetail} // Already checked for null above
//           isLoading={isLoading} // Pass loading state for internal skeleton
//           onBackClick={handleBackClick}
//           onSendClick={handleSendClick}
//           canSendMoney={canSendMoney}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions only when transactions *could* exist */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Base list for filtering/searching
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // userAccounts={...} // Pass if needed
//                />
//             )}
//             {/* Loading skeleton for actions while transactions load */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//          </div>

//          {/* Transaction List Component handles its own loading/error/empty states */}
//          <TransactionList
//              transactions={displayTransactions} // Pass the potentially filtered/searched list
//              isLoading={isTransactionsLoading}
//              error={error && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Pass only transaction-specific errors
//              currencyCode={currencyCode}
//              balanceId={balanceId!} // We know balanceId exists if we reach here
//              onSendClick={handleSendClick} // Needed for empty state
//              canSendMoney={canSendMoney}   // Needed for empty state
//              wasInitiallyEmpty={wasInitiallyEmpty} // Pass flag for correct empty message
//          />

//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import { useBalanceDetailData, BalanceDetail } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // --- Interfaces --- (Keep params interface here)
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch {}
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook

//   // --- Data Fetching using Custom Hook ---
//   const {
//       balanceDetail,
//       balanceSpecificTransactions, // Base list fetched by the hook
//       isLoading, // Loading state for balance detail
//       isTransactionsLoading, // Loading state for transactions
//       error, // Combined error from hook
//       // fetchData, // Can expose fetchData if manual refetch is needed
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Derived State ---
//   const canSendMoney = useMemo(() => (balanceDetail?.balance ?? 0) > 0, [balanceDetail]);
//   const currencyCode = useMemo(() => balanceDetail?.currency?.code ?? 'N/A', [balanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       // When the base list from the hook changes (initial load, refetch), reset the display list
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults); // Update display list based on search
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions]; // Start with the base list for this balance

//       // --- Apply Filters (Copied logic from original) ---
//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') { /* ... filter logic ... */
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status; // Already normalized in hook
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered); // Update display list based on filters

//   }, [balanceSpecificTransactions]); // Recalculate if the base list changes

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal();
//         }
//     };
//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             if (!balanceDetail || !currencyCode) return;
//             try {
//                 const ratesData = await exchangeRateService.getExchangeRatesForCurrencies();
//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD';

//                 if (liveRates && currencyCode && liveRates[currencyCode] && liveRates['INR']) {
//                     const liveRateToINR = liveRates['INR'] / liveRates[currencyCode]; // Rate: 1 unit of balance currency to INR (Market Rate)
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Simulate "Our Rate" calculation - using adjustment percentage from balanceDetail
//                     const adjustmentPercent = balanceDetail.currency.rateAdjustmentPercentage?? 0;
//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100)); // Halved adjustment  <-- **POTENTIAL ISSUE HERE - Halved adjustment?**
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier; // Our Rate
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn("Could not find exchange rates for Balance Currency and INR.");
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [balanceDetail, currencyCode]);

//   // --- Render Logic ---

//   // Loading state before balance detail is available (or critical error)
//   if (isLoading && !balanceDetail && !error) {
//      // Show a more comprehensive initial skeleton maybe? Or keep BalanceHeader's skeleton
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Minimal Page Skeleton */}
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" /> {/* Placeholder for BalanceHeader */}
//              <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" /> {/* Actions Placeholder */}
//              <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//         </div>
//      );
//   }

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     const message = error || "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <BalanceHeader
//           balanceDetail={balanceDetail} // Already checked for null above
//           isLoading={isLoading} // Pass loading state for internal skeleton

//           onSendClick={handleSendClick}
//           canSendMoney={canSendMoney}
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
//             {/* Render Actions only when transactions *could* exist */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Base list for filtering/searching
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // userAccounts={...} // Pass if needed
//                />
//             )}
//             {/* Loading skeleton for actions while transactions load */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                      <Skeleton className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
//                  </div>
//               )}
//          </div>

//          {/* Transaction List Component handles its own loading/error/empty states */}
//          <TransactionList
//              transactions={displayTransactions} // Pass the potentially filtered/searched list
//              isLoading={isTransactionsLoading}
//              error={error && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Pass only transaction-specific errors
//              currencyCode={currencyCode}
//              balanceId={balanceId!} // We know balanceId exists if we reach here
//              onSendClick={handleSendClick} // Needed for empty state
//              canSendMoney={canSendMoney}   // Needed for empty state
//              wasInitiallyEmpty={wasInitiallyEmpty} // Pass flag for correct empty message
//          />

//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import { useBalanceDetailData, BalanceDetail } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // --- Interfaces --- (Keep params interface here)
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch {}
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook

//   // --- Data Fetching using Custom Hook ---
//   const {
//       balanceDetail,
//       balanceSpecificTransactions, // Base list fetched by the hook
//       isLoading, // Loading state for balance detail
//       isTransactionsLoading, // Loading state for transactions
//       error, // Combined error from hook
//       // fetchData, // Can expose fetchData if manual refetch is needed
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false); // <<<--- STATE FOR MODAL

//   // --- Derived State ---
//   const canSendMoney = useMemo(() => (balanceDetail?.balance ?? 0) > 0, [balanceDetail]); // <<<--- CONDITION CHECKED HERE
//   const currencyCode = useMemo(() => balanceDetail?.currency?.code ?? 'N/A', [balanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       // When the base list from the hook changes (initial load, refetch), reset the display list
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults); // Update display list based on search
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions]; // Start with the base list for this balance

//       // --- Apply Filters (Copied logic from original) ---
//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') { /* ... filter logic ... */
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status; // Already normalized in hook
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered); // Update display list based on filters

//   }, [balanceSpecificTransactions]); // Recalculate if the base list changes

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); }; // <<<--- FUNCTION TO OPEN MODAL
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         // DEBUGGING: Log the values right before the check
//         console.log("handleSendClick triggered. canSendMoney:", canSendMoney, "Balance:", balanceDetail?.balance);
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal(); // <<<--- MODAL IS TRIGGERED HERE IF canSendMoney is false
//         }
//     };
//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             if (!balanceDetail || !currencyCode || currencyCode === 'N/A') return; // Added check for N/A
//             try {
//                 const ratesData = await exchangeRateService.getExchangeRatesForCurrencies();
//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD'; // Assuming base is USD if not provided

//                 // Check if INR and the specific currency code exist
//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     // Calculate rate relative to base first, then to INR
//                     // Example: (INR / BASE) / (CUR / BASE) = INR / CUR
//                     const rateToBase = liveRates[currencyCode];
//                     const inrToBase = liveRates['INR'];

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     const liveRateToINR = inrToBase / rateToBase; // Rate: 1 unit of balance currency to INR (Market Rate)
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Simulate "Our Rate" calculation - using adjustment percentage from balanceDetail
//                     // Ensure rateAdjustmentPercentage exists and is a number
//                     const adjustmentPercent = typeof balanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? balanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0;

//                     // Our rate applies the adjustment. Example: If adjustment is -1 (-1%), multiplier is 0.99
//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier; // Our Rate
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null); // Reset if rates aren't available
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null); // Reset on error
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [balanceDetail, currencyCode]); // currencyCode dependency is correct

//   // --- Render Logic ---

//   // Loading state before balance detail is available (or critical error)
//   if (isLoading && !balanceDetail && !error) {
//      // Show a more comprehensive initial skeleton maybe? Or keep BalanceHeader's skeleton
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Minimal Page Skeleton */}
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" /> {/* Placeholder for BalanceHeader */}
//              <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" /> {/* Actions Placeholder */}
//              <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//         </div>
//      );
//   }

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access."; // Ensure message is string
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={balanceDetail} // Already checked for null above
//           isLoading={isLoading} // Pass loading state for internal skeleton
//           onSendClick={handleSendClick} // <<<--- PASSING THE HANDLER
//           canSendMoney={canSendMoney} // <<<--- PASSING THE CONDITION
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {/* Render Actions only when transactions *could* exist */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Base list for filtering/searching
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // userAccounts={...} // Pass if needed - NOTE: TransactionActions expects userAccounts prop now
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {/* Loading skeleton for actions while transactions load */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          {/* Transaction List Component handles its own loading/error/empty states */}
//          <TransactionList
//              transactions={displayTransactions} // Pass the potentially filtered/searched list
//              isLoading={isTransactionsLoading}
//              error={error && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Pass only transaction-specific errors
//              currencyCode={currencyCode}
//              balanceId={balanceId!} // We know balanceId exists if we reach here
//              onSendClick={handleSendClick} // Needed for empty state
//              canSendMoney={canSendMoney}   // Needed for empty state
//              wasInitiallyEmpty={wasInitiallyEmpty} // Pass flag for correct empty message
//          />

//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen} // <<<--- CONTROLLED BY STATE
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // --- Interfaces --- (Keep params interface here)
// interface BalanceDetailPageParams {
//   balanceId: string;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) { // fix: use e to log the error
//         console.warn("Could not parse date string:", dateString, e);
//     }
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook // fix: token is likely used in useAuth hook, keep it

//   // --- Data Fetching using Custom Hook ---
//   const {
//       balanceDetail,
//       balanceSpecificTransactions, // Base list fetched by the hook
//       isLoading, // Loading state for balance detail
//       isTransactionsLoading, // Loading state for transactions
//       error, // Combined error from hook
//       // fetchData, // Can expose fetchData if manual refetch is needed
//   } = useBalanceDetailData(balanceId); // BalanceDetail is used as type in hook definition, keep import

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]); // Filtered/Searched list for UI display
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false); // <<<--- STATE FOR MODAL

//   // --- Derived State ---
//   const canSendMoney = useMemo(() => (balanceDetail?.balance ?? 0) > 0, [balanceDetail]); // <<<--- CONDITION CHECKED HERE
//   const currencyCode = useMemo(() => balanceDetail?.currency?.code ?? 'N/A', [balanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       // When the base list from the hook changes (initial load, refetch), reset the display list
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults); // Update display list based on search
//   }, []);

//   const handleFiltersApply = useCallback((filters: { /* ... filter types ... */
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions]; // Start with the base list for this balance

//       // --- Apply Filters (Copied logic from original) ---
//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') { /* ... filter logic ... */
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status; // Already normalized in hook
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled';
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) { /* ... filter logic ... */
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered); // Update display list based on filters

//   }, [balanceSpecificTransactions]); // Recalculate if the base list changes

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); }; // <<<--- FUNCTION TO OPEN MODAL
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         // DEBUGGING: Log the values right before the check
//         console.log("handleSendClick triggered. canSendMoney:", canSendMoney, "Balance:", balanceDetail?.balance);
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal(); // <<<--- MODAL IS TRIGGERED HERE IF canSendMoney is false
//         }
//     };
//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             if (!balanceDetail || !currencyCode || currencyCode === 'N/A') return; // Added check for N/A
//             try {
//                 const ratesData = await exchangeRateService.getExchangeRatesForCurrencies();
//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD'; // Assuming base is USD if not provided

//                 // Check if INR and the specific currency code exist
//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     // Calculate rate relative to base first, then to INR
//                     // Example: (INR / BASE) / (CUR / BASE) = INR / CUR
//                     const rateToBase = liveRates[currencyCode];
//                     const inrToBase = liveRates['INR'];

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     const liveRateToINR = inrToBase / rateToBase; // Rate: 1 unit of balance currency to INR (Market Rate)
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Simulate "Our Rate" calculation - using adjustment percentage from balanceDetail
//                     // Ensure rateAdjustmentPercentage exists and is a number
//                     const adjustmentPercent = typeof balanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? balanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0;

//                     // Our rate applies the adjustment. Example: If adjustment is -1 (-1%), multiplier is 0.99
//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier; // Our Rate
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null); // Reset if rates aren't available
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null); // Reset on error
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [balanceDetail, currencyCode]); // currencyCode dependency is correct

//   // --- Render Logic ---

//   // Loading state before balance detail is available (or critical error)
//   if (isLoading && !balanceDetail && !error) {
//      // Show a more comprehensive initial skeleton maybe? Or keep BalanceHeader's skeleton
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Minimal Page Skeleton */}
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" /> {/* Placeholder for BalanceHeader */}
//              <Skeleton className="h-8 w-40 mb-6" /> {/* Transactions title */}
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" /> {/* Actions Placeholder */}
//              <Skeleton className="h-40 w-full rounded-lg" /> {/* Placeholder for transactions */}
//         </div>
//      );
//   }

//   // Error State or Balance Not Found
//   if ((error && !balanceDetail) || (!isLoading && !balanceDetail)) {
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access."; // Ensure message is string
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={balanceDetail} // Already checked for null above
//           isLoading={isLoading} // Pass loading state for internal skeleton
//           onSendClick={handleSendClick} // <<<--- PASSING THE HANDLER
//           canSendMoney={canSendMoney} // <<<--- PASSING THE CONDITION
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {/* Render Actions only when transactions *could* exist */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions} // Base list for filtering/searching
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   // userAccounts={...} // Pass if needed - NOTE: TransactionActions expects userAccounts prop now
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {/* Loading skeleton for actions while transactions load */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          {/* Transaction List Component handles its own loading/error/empty states */}
//          <TransactionList
//              transactions={displayTransactions} // Pass the potentially filtered/searched list
//              isLoading={isTransactionsLoading}
//              error={error && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Pass only transaction-specific errors
//              currencyCode={currencyCode}
//              balanceId={balanceId!} // We know balanceId exists if we reach here
//              onSendClick={handleSendClick} // Needed for empty state
//              canSendMoney={canSendMoney}   // Needed for empty state
//              wasInitiallyEmpty={wasInitiallyEmpty} // Pass flag for correct empty message
//          />

//       </div> {/* End Transactions Section Div */}

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen} // <<<--- CONTROLLED BY STATE
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div> // End Main Container Div
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { BalanceDetail } from "@/types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "@/types/currency"; // Assuming Currency type exists here or elsewhere
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // --- Interfaces ---

// // Fix 1: Make BalanceDetailPageParams compatible with Next.js useParams constraints
// // It needs an index signature or should match the expected structure.
// // Using Record<string, string | string[]> covers typical path parameters.
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // Fix 3: Define the expected structure for the exchange rate API response
// interface ExchangeRateApiResponse {
//     rates?: {
//         base: string;
//         rates: { [currencyCode: string]: number };
//     };
//     // Add other potential properties if the API returns more
// }

// // Fix 5 & 6 Assumption: Update the Currency type definition (e.g., in @/types/currency)
// // Ensure your Currency type definition includes rateAdjustmentPercentage
// // Example modification (add this to your actual Currency type definition file):
// /*
// export interface Currency {
//     _id: string;
//     code: string;
//     flagImage?: string;
//     currencyName?: string;
//     rateAdjustmentPercentage?: number; // Add this optional property
// }
// */
// // Using an extended interface locally if modifying the shared type isn't feasible immediately
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// // Ensure BalanceDetail uses this ExtendedCurrency or the updated base Currency type
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         console.warn("Could not parse date string:", dateString, e);
//     }
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook

//   // --- Data Fetching using Custom Hook ---
//   // Ensure useBalanceDetailData returns a type compatible with ExtendedBalanceDetail
//   const {
//       balanceDetail, // Type this as ExtendedBalanceDetail | null within the hook or cast here if necessary
//       balanceSpecificTransactions,
//       isLoading,
//       isTransactionsLoading,
//       error,
//       // fetchData,
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null; // Use type assertion if hook doesn't return extended type
//   const canSendMoney = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: {
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions];

//       // --- Apply Filters ---
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status;
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  // Fix 2: Use 'canceled' (single 'l') consistent with expected Transaction status types
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Removed || txStatus === 'cancelled'
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);

//   }, [balanceSpecificTransactions]);

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         console.log("handleSendClick triggered. canSendMoney:", canSendMoney, "Balance:", typedBalanceDetail?.balance);
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal();
//         }
//     };
//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             // Use the typed version here
//             if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A') return;
//             try {
//                 // Fix 3: Type the response from the service call
//                 const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();

//                 // Access properties safely using optional chaining
//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD';

//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     const rateToBase = liveRates[currencyCode];
//                     const inrToBase = liveRates['INR'];

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     const liveRateToINR = inrToBase / rateToBase;
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Fix 5 & 6: Access rateAdjustmentPercentage safely from the typedBalanceDetail
//                     // Ensure the Currency type includes rateAdjustmentPercentage (as added in ExtendedCurrency or base Currency type)
//                     const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? typedBalanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0;

//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null);
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null);
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [typedBalanceDetail, currencyCode]); // Depend on typedBalanceDetail

//   // --- Render Logic ---

//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" />
//              <Skeleton className="h-8 w-40 mb-6" />
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" />
//              <Skeleton className="h-40 w-full rounded-lg" />
//         </div>
//      );
//   }

//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={typedBalanceDetail} // Use the non-null, typed detail
//           isLoading={isLoading}
//           onSendClick={handleSendClick}
//           canSendMoney={canSendMoney}
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          <TransactionList
//              transactions={displayTransactions}
//              isLoading={isTransactionsLoading}
//              error={typeof error === 'string' && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Check type before includes
//              currencyCode={currencyCode}
//              balanceId={balanceId!}
//              onSendClick={handleSendClick}
//              canSendMoney={canSendMoney}
//              wasInitiallyEmpty={wasInitiallyEmpty}
//          />

//       </div>

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path
// import { parseISO } from "date-fns"; // Keep for filter parsing

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path
// import TransactionList from "../../components/TransactionList"; // Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { BalanceDetail } from "../../../../types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "../../../../types/currency"; // Assuming Currency type exists here or elsewhere
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // --- Interfaces ---

// // Using Record<string, string | string[]> covers typical path parameters.
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // Fix 3: Define the expected structure for the exchange rate API response
// interface ExchangeRateApiResponse {
//     rates?: {
//         base: string;
//         rates: { [currencyCode: string]: number };
//     };
//     // Add other potential properties if the API returns more
// }

// // Using an extended interface locally if modifying the shared type isn't feasible immediately
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// // Ensure BalanceDetail uses this ExtendedCurrency or the updated base Currency type
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         console.warn("Could not parse date string:", dateString, e);
//     }
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1;
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { return new Date(year, month, day); }
//     }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token } = useAuth(); // Needed for the hook

//   // --- Data Fetching using Custom Hook ---
//   // Ensure useBalanceDetailData returns a type compatible with ExtendedBalanceDetail
//   const {
//       balanceDetail, // Type this as ExtendedBalanceDetail | null within the hook or cast here if necessary
//       balanceSpecificTransactions,
//       isLoading,
//       isTransactionsLoading,
//       error,
//       // fetchData,
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null; // Use type assertion if hook doesn't return extended type
//   const canSendMoney = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: {
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions];

//       // --- Apply Filters ---
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status;
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  // Fix 2: Use 'canceled' (single 'l') consistent with expected Transaction status types
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Removed || txStatus === 'cancelled'
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;
//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) { return false; }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);

//   }, [balanceSpecificTransactions]);

//   // --- Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(true); };
//   const handleCloseInsufficientBalanceModal = () => { setIsInsufficientBalanceModalOpen(false); };
//   const handleAddMoneyFromModal = () => { router.push(`/dashboard/balances/${balanceId}/add-money`); };

//    // --- Send/Back Click Handlers ---
//     const handleSendClick = () => {
//         console.log("handleSendClick triggered. canSendMoney:", canSendMoney, "Balance:", typedBalanceDetail?.balance);
//         if (canSendMoney) {
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             handleOpenInsufficientBalanceModal();
//         }
//     };
//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             // Use the typed version here
//             if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A') return;
//             try {
//                 // Fix 3: Type the response from the service call
//                 const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();

//                 // Access properties safely using optional chaining
//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD';

//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     const rateToBase = liveRates[currencyCode];
//                     const inrToBase = liveRates['INR'];

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     const liveRateToINR = inrToBase / rateToBase;
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Fix 5 & 6: Access rateAdjustmentPercentage safely from the typedBalanceDetail
//                     // Ensure the Currency type includes rateAdjustmentPercentage (as added in ExtendedCurrency or base Currency type)
//                     const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? typedBalanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0;

//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null);
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null);
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [typedBalanceDetail, currencyCode]); // Depend on typedBalanceDetail

//   // --- Render Logic ---

//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-20 mb-4" />
//              <Skeleton className="h-48 w-full mb-8 rounded-lg" />
//              <Skeleton className="h-8 w-40 mb-6" />
//              <Skeleton className="h-10 w-full md:w-auto mb-6 ml-auto rounded-full" />
//              <Skeleton className="h-40 w-full rounded-lg" />
//         </div>
//      );
//   }

//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={typedBalanceDetail} // Use the non-null, typed detail
//           isLoading={isLoading}
//           onSendClick={handleSendClick}
//           canSendMoney={canSendMoney}
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          <TransactionList
//              transactions={displayTransactions}
//              isLoading={isTransactionsLoading}
//              error={typeof error === 'string' && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Check type before includes
//              currencyCode={currencyCode}
//              balanceId={balanceId!}
//              onSendClick={handleSendClick}
//              canSendMoney={canSendMoney}
//              wasInitiallyEmpty={wasInitiallyEmpty}
//          />

//       </div>

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromModal}
//           currencyCode={currencyCode}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path if needed
// import { parseISO } from "date-fns"; // Keep for filter parsing
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path if needed
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path if needed
// import TransactionList from "../../components/TransactionList"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { BalanceDetail } from "../../../../types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "../../../../types/currency"; // Assuming Currency type exists here or elsewhere
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path if needed
// import KycRequiredModal from "../../components/KycRequiredModal"; // Import the new KYC modal
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { Button } from "@/components/ui/button"; // Adjust path if needed
// import type { KycStatus } from '@/app/services/kyc'; // Import KYC status type

// // --- Interfaces ---

// // Using Record<string, string | string[]> covers typical path parameters.
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // Structure for the exchange rate API response
// interface ExchangeRateApiResponse {
//     rates?: {
//         base: string;
//         rates: { [currencyCode: string]: number };
//     };
//     // Add other potential properties if the API returns more
// }

// // Extended interface locally if modifying the shared type isn't feasible immediately
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// // Ensure BalanceDetail uses this ExtendedCurrency or the updated base Currency type
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Try parsing as ISO 8601 first
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         // console.warn("Could not parse date string as ISO:", dateString, e);
//     }
//     // Fallback to DD-MM-YYYY format (adjust if your backend uses a different format)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues if possible
//              // Basic validation
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//                  return date;
//              }
//         }
//     }
//     // Fallback to trying standard Date constructor (less reliable for ambiguous formats)
//     try {
//         const genericDate = new Date(dateString);
//         if (!isNaN(genericDate.getTime())) {
//             return genericDate;
//         }
//     } catch (e) {
//         // console.warn("Could not parse date string with generic Date constructor:", dateString, e);
//     }

//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth(); // Get user, token, and auth loading state
//   const kycStatus: KycStatus | undefined = user?.kyc.status; // Get KYC status from user object

//   // --- Data Fetching using Custom Hook ---
//   // Ensure useBalanceDetailData returns a type compatible with ExtendedBalanceDetail
//   const {
//       balanceDetail, // Type this as ExtendedBalanceDetail | null within the hook or cast here if necessary
//       balanceSpecificTransactions,
//       isLoading: isBalanceLoading, // Renamed for clarity vs authLoading
//       isTransactionsLoading,
//       error,
//       // fetchData, // Uncomment if you need manual refetching capability from the hook
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false); // State for KYC modal

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null; // Use type assertion if hook doesn't return extended type
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: {
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions];

//       // --- Apply Filters ---
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status;
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Use 'canceled'
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         // Set time parts for inclusive date range filtering
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      // Assume dates from backend are UTC or ISO strings parsable by Date
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;

//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) {
//                     console.warn("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                  }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);

//   }, [balanceSpecificTransactions]);

//   // --- KYC Modal Handlers ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => {
//       // Navigate to the KYC start page (adjust path as needed)
//       router.push('/kyc/start');
//       handleCloseKycModal(); // Close modal after initiating navigation
//   };

//   // --- Insufficient Balance Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//       // This ALSO needs the KYC check now
//        if (authLoading || !user) {
//            console.log("Add Money (from modal) blocked: Auth loading or user not available.");
//            return; // Do nothing if auth isn't ready
//        }
//        if (kycStatus !== 'verified') {
//           console.log("Add Money (from modal) blocked: KYC not verified. Opening KYC modal.");
//           handleCloseInsufficientBalanceModal(); // Close this modal first
//           handleOpenKycModal();
//           return;
//       }
//       // If KYC is verified, proceed to add money page
//       console.log("Add Money (from modal) allowed: KYC verified. Navigating.");
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal(); // Close the insufficient balance modal
//   };

//    // --- Add/Send/Back Click Handlers ---

//     // Handler for the "Add Money" action (called from BalanceHeader)
//     const handleAddMoneyClick = useCallback(() => {
//         console.log("handleAddMoneyClick triggered. KYC Status:", kycStatus);
//         if (authLoading || !user) {
//             console.log("Add Money blocked: Auth loading or user not available.");
//             // Optionally show a toast or do nothing while loading
//             return;
//         }
//         if (kycStatus !== 'verified') {
//             console.log("Add Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else {
//             console.log("Add Money allowed: KYC verified. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/add-money`);
//         }
//     }, [kycStatus, authLoading, user, balanceId, router]); // Added dependencies

//     // Handler for the "Send Money" action (called from BalanceHeader)
//     const handleSendClick = useCallback(() => {
//         console.log("handleSendClick triggered. KYC Status:", kycStatus, "Has Sufficient Funds:", hasSufficientFunds);
//          if (authLoading || !user) {
//             console.log("Send Money blocked: Auth loading or user not available.");
//              // Optionally show a toast or do nothing while loading
//              return;
//          }
//         if (kycStatus !== 'verified') {
//             console.log("Send Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else if (hasSufficientFunds) {
//             console.log("Send Money allowed: KYC verified and funds sufficient. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             console.log("Send Money blocked: KYC verified but insufficient funds. Opening insufficient balance modal.");
//             handleOpenInsufficientBalanceModal();
//         }
//     }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]); // Added dependencies

//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             // Use the typed version here
//             if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return; // Don't fetch if base is INR or detail missing
//             try {
//                 const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();

//                 const liveRates = ratesData.rates?.rates;
//                 const baseCurrency = ratesData.rates?.base || 'USD'; // Assuming USD base if not provided

//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     const rateToBase = liveRates[currencyCode];
//                     const inrToBase = liveRates['INR'];

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     // Calculate rate: (INR/Base) / (CUR/Base) = INR/CUR
//                     const liveRateToINR = inrToBase / rateToBase;
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Access rateAdjustmentPercentage safely from the typedBalanceDetail
//                     const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? typedBalanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0; // Default to 0 if not present or not a number

//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null);
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null);
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [typedBalanceDetail, currencyCode]); // Depend on typedBalanceDetail and currencyCode

//   // Combined loading state for initial page render
//   const isLoading = isBalanceLoading || authLoading; // Consider auth loading as part of initial load

//   // --- Render Logic ---

//   // Updated Loading State: Show skeleton if balance data is loading OR auth is loading (before user/KYC is known)
//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Mimic BalanceHeader structure */}
//              <div className="pb-6 mb-8 border-b">
//                 <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                     {/* Left side */}
//                     <div>
//                         <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                             <Skeleton className="w-[50px] h-[50px] rounded-full" />
//                             <Skeleton className="h-6 w-24" />
//                         </div>
//                         <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//                         <Skeleton className="h-8 w-48 mb-4 rounded-4xl" />
//                     </div>
//                     {/* Right side actions */}
//                     <div className="flex flex-col justify-start items-center sm:items-end">
//                          <div className="flex justify-center space-x-6">
//                               <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                               </div>
//                              <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                              </div>
//                          </div>
//                     </div>
//                 </div>
//              </div>

//              {/* Mimic Transactions Section Header */}
//              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8">
//                  <Skeleton className="h-8 w-40" />
//                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//              </div>

//              {/* Mimic Transaction List Loading */}
//              <div className="space-y-4">
//                  <Skeleton className="h-16 w-full rounded-lg" />
//                  <Skeleton className="h-16 w-full rounded-lg" />
//                  <Skeleton className="h-16 w-full rounded-lg" />
//              </div>
//         </div>
//      );
//   }

//   // Updated Error State: Show error if balance fetch failed OR if not loading AND balance detail is still null (after auth check)
//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     // Ensure we don't show error just because auth might still be loading briefly after balance fetch finishes
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//    // If we reach here, auth has loaded and balance detail *should* be available (or handled by error state)
//    // We can safely assume typedBalanceDetail is not null for the main render if no error occurred.
//    // Added a fallback just in case, but ideally the loading/error states cover this.
//    if (!typedBalanceDetail) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                  <p>Something went wrong. Balance details are unavailable.</p>
//                  <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//         );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={typedBalanceDetail} // Pass the non-null, typed detail
//           isLoading={isBalanceLoading} // Pass only balance loading state here, overall handled above
//           onSendClick={handleSendClick} // Pass updated handler
//           onAddMoneyClick={handleAddMoneyClick} // Pass new handler for Add Money
//           canSendMoney={hasSufficientFunds} // Pass fund status (visual cue for Send button)
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {/* Show actions only if NOT loading AND there are transactions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {/* Show skeleton for actions while transactions are loading */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          <TransactionList
//              transactions={displayTransactions}
//              isLoading={isTransactionsLoading}
//              error={typeof error === 'string' && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Check type before includes
//              currencyCode={currencyCode}
//              balanceId={balanceId!}
//              // Pass handlers/state if needed within list items, otherwise remove
//              onSendClick={handleSendClick}
//              canSendMoney={hasSufficientFunds}
//              wasInitiallyEmpty={wasInitiallyEmpty}
//          />

//       </div>

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromInsufficientModal} // Use updated handler with KYC check
//           currencyCode={currencyCode}
//       />

//       {/* --- ADDED: KYC Required Modal --- */}
//       <KycRequiredModal
//           isOpen={isKycModalOpen}
//           onClose={handleCloseKycModal}
//           onStartVerification={handleStartVerification}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path if needed
// import { parseISO } from "date-fns"; // Keep for filter parsing
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path if needed
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path if needed
// import TransactionList from "../../components/TransactionList"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { BalanceDetail } from "../../../../types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "../../../../types/currency"; // Assuming Currency type exists here or elsewhere
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path if needed
// import KycRequiredModal from "../../components/KycRequiredModal"; // Import the new KYC modal
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { Button } from "@/components/ui/button"; // Adjust path if needed
// import type { KycStatus } from '@/app/services/kyc'; // Import KYC status type

// // --- Interfaces ---

// // Using Record<string, string | string[]> covers typical path parameters.
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // --- MODIFIED Interface ---
// // Structure for the exchange rate API response (Matches typical API structure)
// interface ExchangeRateApiResponse {
//     base?: string; // The base currency (e.g., "USD") - Optional if not always present
//     rates?: { [currencyCode: string]: number }; // The map of currency codes to rates
//     // Add other potential properties like 'timestamp', 'date' if the API returns them
// }
// // --- END MODIFICATION ---

// // Extended interface locally if modifying the shared type isn't feasible immediately
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// // Ensure BalanceDetail uses this ExtendedCurrency or the updated base Currency type
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Try parsing as ISO 8601 first
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         // console.warn("Could not parse date string as ISO:", dateString, e);
//     }
//     // Fallback to DD-MM-YYYY format (adjust if your backend uses a different format)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues if possible
//              // Basic validation
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//                  return date;
//              }
//         }
//     }
//     // Fallback to trying standard Date constructor (less reliable for ambiguous formats)
//     try {
//         const genericDate = new Date(dateString);
//         if (!isNaN(genericDate.getTime())) {
//             return genericDate;
//         }
//     } catch (e) {
//         // console.warn("Could not parse date string with generic Date constructor:", dateString, e);
//     }

//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth(); // Get user, token, and auth loading state
//   const kycStatus: KycStatus | undefined = user?.kyc.status; // Get KYC status from user object

//   // --- Data Fetching using Custom Hook ---
//   // Ensure useBalanceDetailData returns a type compatible with ExtendedBalanceDetail
//   const {
//       balanceDetail, // Type this as ExtendedBalanceDetail | null within the hook or cast here if necessary
//       balanceSpecificTransactions,
//       isLoading: isBalanceLoading, // Renamed for clarity vs authLoading
//       isTransactionsLoading,
//       error,
//       // fetchData, // Uncomment if you need manual refetching capability from the hook
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false); // State for KYC modal

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null; // Use type assertion if hook doesn't return extended type
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: {
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions];

//       // --- Apply Filters ---
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status;
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Use 'canceled'
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         // Set time parts for inclusive date range filtering
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      // Assume dates from backend are UTC or ISO strings parsable by Date
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;

//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) {
//                     console.warn("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                  }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);

//   }, [balanceSpecificTransactions]);

//   // --- KYC Modal Handlers ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => {
//       // Navigate to the KYC start page (adjust path as needed)
//       router.push('/kyc/start');
//       handleCloseKycModal(); // Close modal after initiating navigation
//   };

//   // --- Insufficient Balance Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//       // This ALSO needs the KYC check now
//        if (authLoading || !user) {
//            console.log("Add Money (from modal) blocked: Auth loading or user not available.");
//            return; // Do nothing if auth isn't ready
//        }
//        if (kycStatus !== 'verified') {
//           console.log("Add Money (from modal) blocked: KYC not verified. Opening KYC modal.");
//           handleCloseInsufficientBalanceModal(); // Close this modal first
//           handleOpenKycModal();
//           return;
//       }
//       // If KYC is verified, proceed to add money page
//       console.log("Add Money (from modal) allowed: KYC verified. Navigating.");
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal(); // Close the insufficient balance modal
//   };

//    // --- Add/Send/Back Click Handlers ---

//     // Handler for the "Add Money" action (called from BalanceHeader)
//     const handleAddMoneyClick = useCallback(() => {
//         console.log("handleAddMoneyClick triggered. KYC Status:", kycStatus);
//         if (authLoading || !user) {
//             console.log("Add Money blocked: Auth loading or user not available.");
//             // Optionally show a toast or do nothing while loading
//             return;
//         }
//         if (kycStatus !== 'verified') {
//             console.log("Add Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else {
//             console.log("Add Money allowed: KYC verified. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/add-money`);
//         }
//     }, [kycStatus, authLoading, user, balanceId, router]); // Added dependencies

//     // Handler for the "Send Money" action (called from BalanceHeader)
//     const handleSendClick = useCallback(() => {
//         console.log("handleSendClick triggered. KYC Status:", kycStatus, "Has Sufficient Funds:", hasSufficientFunds);
//          if (authLoading || !user) {
//             console.log("Send Money blocked: Auth loading or user not available.");
//              // Optionally show a toast or do nothing while loading
//              return;
//          }
//         if (kycStatus !== 'verified') {
//             console.log("Send Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else if (hasSufficientFunds) {
//             console.log("Send Money allowed: KYC verified and funds sufficient. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             console.log("Send Money blocked: KYC verified but insufficient funds. Opening insufficient balance modal.");
//             handleOpenInsufficientBalanceModal();
//         }
//     }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]); // Added dependencies

//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             // Use the typed version here
//             if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return; // Don't fetch if base is INR or detail missing
//             try {
//                 // Fetch using the service - the type should now match
//                 const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();

//                 // --- Access data according to the REVISED interface ---
//                 const liveRates = ratesData.rates; // Direct access to the rates map
//                 const baseCurrency = ratesData.base || 'USD'; // Use base if present, fallback to USD

//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     const rateToBase = liveRates[currencyCode]; // Rate of target currency against base
//                     const inrToBase = liveRates['INR'];       // Rate of INR against base

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     // Calculate rate: (INR/Base) / (CUR/Base) = INR/CUR
//                     const liveRateToINR = inrToBase / rateToBase;
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Access rateAdjustmentPercentage safely from the typedBalanceDetail
//                     const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? typedBalanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0; // Default to 0 if not present or not a number

//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null);
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null);
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [typedBalanceDetail, currencyCode]); // Depend on typedBalanceDetail and currencyCode

//   // Combined loading state for initial page render
//   const isLoading = isBalanceLoading || authLoading; // Consider auth loading as part of initial load

//   // --- Render Logic ---

//   // Updated Loading State: Show skeleton if balance data is loading OR auth is loading (before user/KYC is known)
//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//              {/* Mimic BalanceHeader structure */}
//              <div className="pb-6 mb-8 border-b">
//                 <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                     {/* Left side */}
//                     <div>
//                         <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                             <Skeleton className="w-[50px] h-[50px] rounded-full" />
//                             <Skeleton className="h-6 w-24" />
//                         </div>
//                         <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//                         <Skeleton className="h-8 w-48 mb-4 rounded-4xl" />
//                     </div>
//                     {/* Right side actions */}
//                     <div className="flex flex-col justify-start items-center sm:items-end">
//                          <div className="flex justify-center space-x-6">
//                               <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                               </div>
//                              <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                              </div>
//                          </div>
//                     </div>
//                 </div>
//              </div>

//              {/* Mimic Transactions Section Header */}
//              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8">
//                  <Skeleton className="h-8 w-40" />
//                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//              </div>

//              {/* Mimic Transaction List Loading */}
//              <div className="space-y-4">
//                  <Skeleton className="h-16 w-full rounded-lg" />
//                  <Skeleton className="h-16 w-full rounded-lg" />
//                  <Skeleton className="h-16 w-full rounded-lg" />
//              </div>
//         </div>
//      );
//   }

//   // Updated Error State: Show error if balance fetch failed OR if not loading AND balance detail is still null (after auth check)
//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     // Ensure we don't show error just because auth might still be loading briefly after balance fetch finishes
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//    // If we reach here, auth has loaded and balance detail *should* be available (or handled by error state)
//    // We can safely assume typedBalanceDetail is not null for the main render if no error occurred.
//    // Added a fallback just in case, but ideally the loading/error states cover this.
//    if (!typedBalanceDetail) {
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                  <p>Something went wrong. Balance details are unavailable.</p>
//                  <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//         );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="container mx-auto py-8">
//       <BalanceHeader
//           balanceDetail={typedBalanceDetail} // Pass the non-null, typed detail
//           isLoading={isBalanceLoading} // Pass only balance loading state here, overall handled above
//           onSendClick={handleSendClick} // Pass updated handler
//           onAddMoneyClick={handleAddMoneyClick} // Pass new handler for Add Money
//           canSendMoney={hasSufficientFunds} // Pass fund status (visual cue for Send button)
//           marketRateAgainstINR={marketRateAgainstINR}
//           ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-background dark:bg-background"> {/* Use theme background */}
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Transactions</h3>
//             {/* Show actions only if NOT loading AND there are transactions */}
//             {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//                <TransactionActions
//                   transactions={balanceSpecificTransactions}
//                   onTransactionsChange={handleSearchChange}
//                   onFiltersApply={handleFiltersApply}
//                   userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//                />
//             )}
//             {/* Show skeleton for actions while transactions are loading */}
//             {isTransactionsLoading && (
//                  <div className="flex items-center gap-2 animate-pulse w-full md:w-auto justify-end">
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                      <Skeleton className="h-9 w-24 rounded-full" />
//                  </div>
//               )}
//          </div>

//          <TransactionList
//              transactions={displayTransactions}
//              isLoading={isTransactionsLoading}
//              error={typeof error === 'string' && (error.includes('payment history') || error.includes('transfer history')) ? error : null} // Check type before includes
//              currencyCode={currencyCode}
//              balanceId={balanceId!}
//              // Pass handlers/state if needed within list items, otherwise remove
//              onSendClick={handleSendClick}
//              canSendMoney={hasSufficientFunds}
//              wasInitiallyEmpty={wasInitiallyEmpty}
//          />

//       </div>

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//           isOpen={isInsufficientBalanceModalOpen}
//           onClose={handleCloseInsufficientBalanceModal}
//           onAddMoney={handleAddMoneyFromInsufficientModal} // Use updated handler with KYC check
//           currencyCode={currencyCode}
//       />

//       {/* --- ADDED: KYC Required Modal --- */}
//       <KycRequiredModal
//           isOpen={isKycModalOpen}
//           onClose={handleCloseKycModal}
//           onStartVerification={handleStartVerification}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path if needed
// import { parseISO } from "date-fns"; // Keep for filter parsing
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path if needed
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path if needed
// import TransactionList from "../../components/TransactionList"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { BalanceDetail } from "../../../../types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "../../../../types/currency"; // Assuming Currency type exists here or elsewhere
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path if needed
// import KycRequiredModal from "../../components/KycRequiredModal"; // Import the new KYC modal
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { Button } from "@/components/ui/button"; // Adjust path if needed
// import type { KycStatus } from '@/app/services/kyc'; // Import KYC status type

// // --- Interfaces ---

// // Using Record<string, string | string[]> covers typical path parameters.
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }

// // --- MODIFIED Interface ---
// // Structure for the exchange rate API response (Matches typical API structure)
// interface ExchangeRateApiResponse {
//     base?: string; // The base currency (e.g., "USD") - Optional if not always present
//     rates?: { [currencyCode: string]: number }; // The map of currency codes to rates
//     // Add other potential properties like 'timestamp', 'date' if the API returns them
// }
// // --- END MODIFICATION ---

// // Extended interface locally if modifying the shared type isn't feasible immediately
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// // Ensure BalanceDetail uses this ExtendedCurrency or the updated base Currency type
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep or move to utils)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Try parsing as ISO 8601 first
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         // console.warn("Could not parse date string as ISO:", dateString, e);
//     }
//     // Fallback to DD-MM-YYYY format (adjust if your backend uses a different format)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues if possible
//              // Basic validation
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//                  return date;
//              }
//         }
//     }
//     // Fallback to trying standard Date constructor (less reliable for ambiguous formats)
//     try {
//         const genericDate = new Date(dateString);
//         if (!isNaN(genericDate.getTime())) {
//             return genericDate;
//         }
//     } catch (e) {
//         // console.warn("Could not parse date string with generic Date constructor:", dateString, e);
//     }

//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth(); // Get user, token, and auth loading state
//   const kycStatus: KycStatus | undefined = user?.kyc.status; // Get KYC status from user object

//   // --- Data Fetching using Custom Hook ---
//   // Ensure useBalanceDetailData returns a type compatible with ExtendedBalanceDetail
//   const {
//       balanceDetail, // Type this as ExtendedBalanceDetail | null within the hook or cast here if necessary
//       balanceSpecificTransactions,
//       isLoading: isBalanceLoading, // Renamed for clarity vs authLoading
//       isTransactionsLoading,
//       error,
//       // fetchData, // Uncomment if you need manual refetching capability from the hook
//   } = useBalanceDetailData(balanceId);

//   // --- State for UI Interaction ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false); // State for KYC modal

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null; // Use type assertion if hook doesn't return extended type
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);

//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effect to Initialize/Reset Display Transactions ---
//   useEffect(() => {
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   // --- Callbacks for TransactionActions (Search/Filter) ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       setDisplayTransactions(searchResults);
//   }, []);

//   const handleFiltersApply = useCallback((filters: {
//       selectedDirection?: string;
//       selectedStatus?: string | null;
//       fromDate?: string;
//       toDate?: string;
//   }) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions];

//       // --- Apply Filters ---
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                  (direction === 'add' && tx.type === 'Add Money') ||
//                  (direction === 'send' && tx.type === 'Send Money')
//              );
//         }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const txStatus = tx.status;
//                  if (!txStatus) return false;
//                  if (statusFilter === 'needs attention') return tx.type === 'Add Money' && txStatus === 'pending';
//                  if (statusFilter === 'completed') return txStatus === 'completed';
//                  if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Use 'canceled'
//                  if (statusFilter === 'in process') return (tx.type === 'Add Money' && txStatus === 'in progress') || (tx.type === 'Send Money' && (txStatus === 'pending' || txStatus === 'processing'));
//                  if (statusFilter === 'failed') return txStatus === 'failed';
//                  return false;
//               });
//         }

//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         // Set time parts for inclusive date range filtering
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//              tempFiltered = tempFiltered.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt;
//                  if (!transactionDateStr) return false;
//                  try {
//                      // Assume dates from backend are UTC or ISO strings parsable by Date
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) return false;

//                      let include = true;
//                      if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                      if (toDateObj && transactionDateObj > toDateObj) include = false;
//                      return include;
//                  } catch (e) {
//                     console.warn("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                  }
//              });
//         }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);

//   }, [balanceSpecificTransactions]);

//   // --- KYC Modal Handlers ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => {
//       // Navigate to the KYC start page (adjust path as needed)
//       router.push('/kyc/start');
//       handleCloseKycModal(); // Close modal after initiating navigation
//   };

//   // --- Insufficient Balance Modal Handlers ---
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//       // This ALSO needs the KYC check now
//        if (authLoading || !user) {
//            console.log("Add Money (from modal) blocked: Auth loading or user not available.");
//            return; // Do nothing if auth isn't ready
//        }
//        if (kycStatus !== 'verified') {
//           console.log("Add Money (from modal) blocked: KYC not verified. Opening KYC modal.");
//           handleCloseInsufficientBalanceModal(); // Close this modal first
//           handleOpenKycModal();
//           return;
//       }
//       // If KYC is verified, proceed to add money page
//       console.log("Add Money (from modal) allowed: KYC verified. Navigating.");
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal(); // Close the insufficient balance modal
//   };

//    // --- Add/Send/Back Click Handlers ---

//     // Handler for the "Add Money" action (called from BalanceHeader)
//     const handleAddMoneyClick = useCallback(() => {
//         console.log("handleAddMoneyClick triggered. KYC Status:", kycStatus);
//         if (authLoading || !user) {
//             console.log("Add Money blocked: Auth loading or user not available.");
//             // Optionally show a toast or do nothing while loading
//             return;
//         }
//         if (kycStatus !== 'verified') {
//             console.log("Add Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else {
//             console.log("Add Money allowed: KYC verified. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/add-money`);
//         }
//     }, [kycStatus, authLoading, user, balanceId, router]); // Added dependencies

//     // Handler for the "Send Money" action (called from BalanceHeader)
//     const handleSendClick = useCallback(() => {
//         console.log("handleSendClick triggered. KYC Status:", kycStatus, "Has Sufficient Funds:", hasSufficientFunds);
//          if (authLoading || !user) {
//             console.log("Send Money blocked: Auth loading or user not available.");
//              // Optionally show a toast or do nothing while loading
//              return;
//          }
//         if (kycStatus !== 'verified') {
//             console.log("Send Money blocked: KYC not verified. Opening KYC modal.");
//             handleOpenKycModal();
//         } else if (hasSufficientFunds) {
//             console.log("Send Money allowed: KYC verified and funds sufficient. Navigating.");
//             router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         } else {
//             console.log("Send Money blocked: KYC verified but insufficient funds. Opening insufficient balance modal.");
//             handleOpenInsufficientBalanceModal();
//         }
//     }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]); // Added dependencies

//     const handleBackClick = () => router.back();

//     // --- Fetch Market and Our Rate against INR ---
//     useEffect(() => {
//         const fetchRatesAgainstINR = async () => {
//             // Use the typed version here
//             if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return; // Don't fetch if base is INR or detail missing
//             try {
//                 // Fetch using the service - the type should now match
//                 const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();

//                 // --- Access data according to the REVISED interface ---
//                 const liveRates = ratesData.rates; // Direct access to the rates map
//                 const baseCurrency = ratesData.base || 'USD'; // Use base if present, fallback to USD

//                 if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                     const rateToBase = liveRates[currencyCode]; // Rate of target currency against base
//                     const inrToBase = liveRates['INR'];       // Rate of INR against base

//                     if (rateToBase === 0) {
//                          console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                          setMarketRateAgainstINR(null);
//                          setOurRateAgainstINR(null);
//                          return;
//                     }

//                     // Calculate rate: (INR/Base) / (CUR/Base) = INR/CUR
//                     const liveRateToINR = inrToBase / rateToBase;
//                     setMarketRateAgainstINR(liveRateToINR);

//                     // Access rateAdjustmentPercentage safely from the typedBalanceDetail
//                     const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number'
//                                                 ? typedBalanceDetail.currency.rateAdjustmentPercentage
//                                                 : 0; // Default to 0 if not present or not a number

//                     const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                     const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                     setOurRateAgainstINR(ourRateToINR);

//                 } else {
//                     console.warn(`Could not find live exchange rates for ${currencyCode} or INR in API response. Base: ${baseCurrency}`, liveRates);
//                     setMarketRateAgainstINR(null);
//                     setOurRateAgainstINR(null);
//                 }

//             } catch (error) {
//                 console.error("Error fetching exchange rates for INR comparison:", error);
//                 setMarketRateAgainstINR(null);
//                 setOurRateAgainstINR(null);
//             }
//         };
//         fetchRatesAgainstINR();
//     }, [typedBalanceDetail, currencyCode]); // Depend on typedBalanceDetail and currencyCode

//   // Combined loading state for initial page render
//   const isLoading = isBalanceLoading || authLoading; // Consider auth loading as part of initial load

//   // --- Render Logic ---

//   // Updated Loading State: Show skeleton if balance data is loading OR auth is loading (before user/KYC is known)
//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="py-8 animate-pulse">
//              {/* Mimic BalanceHeader structure */}
//              <div className="pb-6 mb-8 border-b">
//                 <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                     {/* Left side */}
//                     <div>
//                         <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                             <Skeleton className="w-[50px] h-[50px] rounded-full" />
//                             <Skeleton className="h-6 w-24" />
//                         </div>
//                         <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />

//                         <div className="flex sm:flex-row flex-col items-center gap-4">
//                             <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
//                             <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
//                         </div>

//                     </div>
//                     {/* Right side actions */}
//                     <div className="flex flex-col justify-start items-center sm:items-end">
//                          <div className="flex justify-center space-x-6">
//                               <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                               </div>
//                              <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                              </div>
//                          </div>
//                     </div>
//                 </div>
//              </div>
//         </div>
//      );
//   }

//   // Updated Error State: Show error if balance fetch failed OR if not loading AND balance detail is still null (after auth check)
//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     // Ensure we don't show error just because auth might still be loading briefly after balance fetch finishes
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//    // If we reach here, auth has loaded and balance detail *should* be available (or handled by error state)
//    // We can safely assume typedBalanceDetail is not null for the main render if no error occurred.
//    // Added a fallback just in case, but ideally the loading/error states cover this.
//    if (!typedBalanceDetail) {
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                  <p>Something went wrong. Balance details are unavailable.</p>
//                  <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//         );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="py-8">
//       <BalanceHeader
//         balanceDetail={typedBalanceDetail} // Pass the non-null, typed detail
//         isLoading={isBalanceLoading} // Pass only balance loading state here, overall handled above
//         onSendClick={handleSendClick} // Pass updated handler
//         onAddMoneyClick={handleAddMoneyClick} // Pass new handler for Add Money
//         canSendMoney={hasSufficientFunds} // Pass fund status (visual cue for Send button)
//         marketRateAgainstINR={marketRateAgainstINR}
//         ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//           {" "}

//           {/* Conditionally render Heading OR Skeleton */}
//           {isTransactionsLoading ? (
//             <Skeleton className="h-8 w-48 rounded-md" /> // Skeleton for "Transactions" heading
//           ) : (
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h3>
//           )}

//           {/* Show actions only if NOT loading AND there are transactions */}
//           {!isTransactionsLoading && balanceSpecificTransactions.length > 0 && (
//             <TransactionActions
//               transactions={balanceSpecificTransactions}
//               onTransactionsChange={handleSearchChange}
//               onFiltersApply={handleFiltersApply}
//               userAccounts={[]} // TODO: Pass actual user accounts if filter needs them
//             />
//           )}
//           {/* Show skeleton for actions while transactions are loading */}
//           {/* This Skeleton apply for Search box and filter button */}
//           {isTransactionsLoading && (
//               <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                 <Skeleton className="h-10 w-full sm:w-64 rounded-full" />
//                 <Skeleton className="h-10 w-32 rounded-full" />{" "}
//               </div>

//           )}
//         </div>

//         <TransactionList
//           transactions={displayTransactions}
//           isLoading={isTransactionsLoading}
//           error={
//             typeof error === "string" &&
//             (error.includes("payment history") ||
//               error.includes("transfer history"))
//               ? error
//               : null
//           } // Check type before includes
//           currencyCode={currencyCode}
//           balanceId={balanceId!}
//           // Pass handlers/state if needed within list items, otherwise remove
//           onSendClick={handleSendClick}
//           canSendMoney={hasSufficientFunds}
//           wasInitiallyEmpty={wasInitiallyEmpty}
//         />
//       </div>

//       {/* Insufficient Balance Modal */}
//       <InsufficientBalanceModal
//         isOpen={isInsufficientBalanceModalOpen}
//         onClose={handleCloseInsufficientBalanceModal}
//         onAddMoney={handleAddMoneyFromInsufficientModal} // Use updated handler with KYC check
//         currencyCode={currencyCode}
//       />

//       {/* --- ADDED: KYC Required Modal --- */}
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData"; // Adjust path if needed
// import { parseISO } from "date-fns";
// import exchangeRateService from '../../../services/exchangeRate'; // Import exchange rate service

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader"; // Adjust path if needed
// import TransactionActions from "../../components/TransactionPageSection/TransactionActions"; // Adjust path if needed
// import TransactionList from "../../components/TransactionList"; // Adjust path if needed
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal"; // Adjust path if needed
// import KycRequiredModal from "../../components/KycRequiredModal"; // Import the new KYC modal
// import FilterModal, { AppliedFilters } from "../../components/TransactionPageSection/FilterModal"; // *** IMPORT FilterModal AND AppliedFilters *** Adjust path
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { BalanceDetail } from "../../../../types/balance"; // Assuming BalanceDetail type exists here or elsewhere
// import { Currency } from "../../../../types/currency"; // Assuming Currency type exists here or elsewhere
// import { Account } from "@/types/account"; // Import Account type if needed by FilterModal balance section (if used here)
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { Button } from "@/components/ui/button"; // Adjust path if needed
// import type { KycStatus } from '@/app/services/kyc'; // Import KYC status type

// // --- Interfaces --- (Keep page-specific interfaces)
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }
// interface ExchangeRateApiResponse {
//     base?: string;
//     rates?: { [currencyCode: string]: number };
// }
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }
// // --- REMOVED local definition of AppliedFilters ---

// // --- Utility Function ---
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try {
//         // Try parsing as ISO 8601 first
//         const isoDate = parseISO(dateString);
//         if (!isNaN(isoDate.getTime())) { return isoDate; }
//     } catch (e) {
//         // console.warn("Could not parse date string as ISO:", dateString, e);
//     }
//     // Fallback to DD-MM-YYYY format (adjust if your backend uses a different format)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues if possible
//              // Basic validation
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//                  return date;
//              }
//         }
//     }
//     // Fallback to trying standard Date constructor (less reliable for ambiguous formats)
//     try {
//         const genericDate = new Date(dateString);
//         if (!isNaN(genericDate.getTime())) {
//             return genericDate;
//         }
//     } catch (e) {
//         // console.warn("Could not parse date string with generic Date constructor:", dateString, e);
//     }

//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth();
//   const kycStatus: KycStatus | undefined = user?.kyc.status;

//   // --- Data Fetching ---
//   const {
//       balanceDetail, balanceSpecificTransactions, isLoading: isBalanceLoading,
//       isTransactionsLoading, error,
//   } = useBalanceDetailData(balanceId);

//   // --- State ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null;
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);
//   const wasInitiallyEmpty = useMemo(() => !isTransactionsLoading && balanceSpecificTransactions.length === 0, [isTransactionsLoading, balanceSpecificTransactions]);
//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);

//   // --- Effects ---
//   useEffect(() => {
//       // Initialize display transactions when base data changes
//       setDisplayTransactions(balanceSpecificTransactions);
//   }, [balanceSpecificTransactions]);

//   useEffect(() => { // Fetch rates against INR
//       const fetchRatesAgainstINR = async () => {
//           if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return;
//           try {
//               const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();
//               const liveRates = ratesData.rates;
//               const baseCurrency = ratesData.base || 'USD';

//               if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                   const rateToBase = liveRates[currencyCode];
//                   const inrToBase = liveRates['INR'];
//                   if (rateToBase === 0) {
//                        console.warn(`Exchange rate for ${currencyCode} against base (${baseCurrency}) is zero.`);
//                        setMarketRateAgainstINR(null); setOurRateAgainstINR(null); return;
//                   }
//                   const liveRateToINR = inrToBase / rateToBase;
//                   setMarketRateAgainstINR(liveRateToINR);
//                   const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number' ? typedBalanceDetail.currency.rateAdjustmentPercentage : 0;
//                   const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                   const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//                   setOurRateAgainstINR(ourRateToINR);
//               } else {
//                   console.warn(`Could not find live exchange rates for ${currencyCode} or INR. Base: ${baseCurrency}`, liveRates);
//                   setMarketRateAgainstINR(null); setOurRateAgainstINR(null);
//               }
//           } catch (error) {
//               console.error("Error fetching exchange rates for INR comparison:", error);
//               setMarketRateAgainstINR(null); setOurRateAgainstINR(null);
//           }
//       };
//       fetchRatesAgainstINR();
//   }, [typedBalanceDetail, currencyCode]);

//   // --- Callbacks ---
//   const handleSearchChange = useCallback((searchResults: Transaction[]) => {
//       // When search changes, it provides the new base list. Filters need to be re-applied.
//       // For simplicity, let's assume the user will explicitly re-apply filters if needed after searching.
//       // We just update the displayed list based on search results.
//       setDisplayTransactions(searchResults);
//       // TODO: Decide if filters should be automatically reapplied here.
//       // Example: If you have filter state saved, you could call handleFiltersApply(savedFilters) here.
//   }, []);

//   // Filter application - uses imported AppliedFilters type
//   const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//       console.log(`BalanceDetailPage: Applying filters:`, filters);
//       let tempFiltered = [...balanceSpecificTransactions]; // Start with the full list for this balance

//       // --- Apply Filters (ensure logic handles AppliedFilters correctly) ---
//       const direction = filters.selectedDirection; // string ('all', 'add', 'send')
//       if (direction !== 'all') {
//           tempFiltered = tempFiltered.filter(tx =>
//                (direction === 'add' && tx.type === 'Add Money') ||
//                (direction === 'send' && tx.type === 'Send Money')
//            );
//       }

//       const statusFilter = filters.selectedStatus?.toLowerCase(); // string | null
//       if (statusFilter) {
//            tempFiltered = tempFiltered.filter(tx => {
//                const txStatus = tx.status;
//                if (!txStatus) return false;
//                if (statusFilter === 'completed') return txStatus === 'completed';
//                if (statusFilter === 'cancelled') return txStatus === 'canceled';
//                if (statusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                if (statusFilter === 'failed') return txStatus === 'failed';
//                return false;
//             });
//       }

//       // Balance Filter (Less relevant here, but included for consistency)
//       const balanceFilters = filters.selectedBalance; // string[]
//       if (balanceFilters && balanceFilters.length > 0 && currencyCode !== 'N/A') {
//           // Only keep transactions if the *current* balance's currency is selected
//           if (!balanceFilters.includes(currencyCode)) {
//               tempFiltered = []; // Empty the list if current currency not selected
//           }
//           // If current currency IS selected, no further filtering needed based on *this* balance filter
//       }

//       // Recipient Filter
//       const recipientFilters = filters.selectedRecipients; // (string | number)[]
//       if (recipientFilters && recipientFilters.length > 0) {
//            const recipientFilterIds = recipientFilters.map(String);
//            tempFiltered = tempFiltered.filter(tx => {
//               if (tx.type !== "Send Money") return true; // Keep non-send transactions
//               const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id) ? String(tx.recipient._id) : (typeof tx.recipient === 'string' ? tx.recipient : null);
//               return recipientId ? recipientFilterIds.includes(recipientId) : false;
//           });
//       }

//       // Date Filter (uses string from AppliedFilters)
//       const fromDateObj = parseDateString(filters.fromDate || undefined); // Handle empty string from modal
//       const toDateObj = parseDateString(filters.toDate || undefined);   // Handle empty string from modal
//       if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//       if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

//       if (fromDateObj || toDateObj) {
//            tempFiltered = tempFiltered.filter(tx => {
//                const transactionDateStr = tx.updatedAt || tx.createdAt;
//                if (!transactionDateStr) return false;
//                try {
//                    const transactionDateObj = new Date(transactionDateStr);
//                    if (isNaN(transactionDateObj.getTime())) return false;
//                    let include = true;
//                    if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                    if (toDateObj && transactionDateObj > toDateObj) include = false;
//                    return include;
//                } catch (e) { console.warn("Error parsing transaction date for filtering:", transactionDateStr, e); return false; }
//            });
//       }
//       // --- End Filter Logic ---

//       setDisplayTransactions(tempFiltered);
//       // FilterModal closes itself via its internal onClose call within handleApply/handleClear

//   }, [balanceSpecificTransactions, currencyCode]); // Dependency on base transactions and current currency code

//   // --- Other Handlers (KYC, Insufficient Balance, Add/Send/Back) ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => {
//       router.push('/kyc/start'); // Adjust path if needed
//       handleCloseKycModal();
//   };
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//        if (authLoading || !user) return;
//        if (kycStatus !== 'verified') {
//           handleCloseInsufficientBalanceModal();
//           handleOpenKycModal();
//           return;
//       }
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal();
//   };
//   const handleAddMoneyClick = useCallback(() => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') {
//           handleOpenKycModal();
//       } else {
//           router.push(`/dashboard/balances/${balanceId}/add-money`);
//       }
//   }, [kycStatus, authLoading, user, balanceId, router]);
//   const handleSendClick = useCallback(() => {
//        if (authLoading || !user) return;
//       if (kycStatus !== 'verified') {
//           handleOpenKycModal();
//       } else if (hasSufficientFunds) {
//           router.push(`/dashboard/balances/${balanceId}/send/select-recipient`); // Adjust path if needed
//       } else {
//           handleOpenInsufficientBalanceModal();
//       }
//   }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]);
//   const handleBackClick = () => router.back();

//   // --- Filter Modal Handlers ---
//   const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//   const handleCloseFilterModal = () => setIsFilterModalOpen(false);

//   // --- Render Logic ---
//   const isLoading = isBalanceLoading || authLoading;

//   // Loading Skeleton
//   if (isLoading && !typedBalanceDetail && !error) {
//      return (
//         <div className="py-5 animate-pulse">
//              {/* Mimic BalanceHeader structure */}
//              <div className="pb-6 mb-8 border-b">
//                 <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                     {/* Left side */}
//                     <div>
//                         <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                             <Skeleton className="w-[50px] h-[50px] rounded-full" />
//                             <Skeleton className="h-6 w-24" />
//                         </div>
//                         <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//                         <div className="flex sm:flex-row flex-col items-center gap-4">
//                             <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
//                             <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
//                         </div>
//                     </div>
//                     {/* Right side actions */}
//                     <div className="flex flex-col justify-start items-center sm:items-end">
//                          <div className="flex justify-center space-x-6">
//                               <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                               </div>
//                              <div className="flex flex-col items-center">
//                                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                                  <Skeleton className="h-4 w-8" />
//                              </div>
//                          </div>
//                     </div>
//                 </div>
//              </div>
//              {/* Mimic Transaction Actions & List Header */}
//              <div className="mt-5">
//                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//                      <Skeleton className="h-12 w-60 rounded-md" />
//                      <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                          <Skeleton className="h-12 w-full sm:w-68 rounded-full" /> {/* Search Skel */}
//                          <Skeleton className="h-12 w-32 rounded-full" /> {/* Filter Button Skel */}
//                      </div>
//                  </div>
//                  {/* Mimic Transaction List Items */}
//                  <div className="space-y-2">
//                     {Array(3).fill(0).map((_, index) => (
//                          <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                              <div className="flex items-center gap-4">
//                                  <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                                  <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                      <div className="flex-grow">
//                                          <Skeleton className="h-4 w-40 mb-2" />
//                                          <Skeleton className="h-3 w-32" />
//                                      </div>
//                                      <Skeleton className="h-6 w-26 rounded-full" />
//                                  </div>
//                              </div>
//                          </div>
//                      ))}
//                  </div>

//                  {/* Mimic Transaction List Items */}
//                  <Skeleton className="h-5 w-26 rounded-full mb-2" />
//                  <div className="space-y-2 border-t ">
//                     {Array(5).fill(0).map((_, index) => (
//                          <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                              <div className="flex items-center gap-4">
//                                  <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                                  <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                      <div className="flex-grow">
//                                          <Skeleton className="h-4 w-40 mb-2" />
//                                          <Skeleton className="h-3 w-32" />
//                                      </div>
//                                      <Skeleton className="h-6 w-26 rounded-full" />
//                                  </div>
//                              </div>
//                          </div>
//                      ))}
//                  </div>
//              </div>
//         </div>
//      );
//   }

//   // Error State
//   if ((error && !typedBalanceDetail) || (!isLoading && !typedBalanceDetail)) {
//     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                  <p className="font-semibold">Error Loading Balance</p>
//                  <p className="text-sm mt-1">{message}</p>
//             </div>
//             <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//         </div>
//      );
//    }

//    // Fallback if somehow loading/error checks fail
//    if (!typedBalanceDetail) {
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                  <p>Something went wrong. Balance details are unavailable.</p>
//                  <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//         );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="py-5"> {/* Main container */}
//       <BalanceHeader
//         balanceDetail={typedBalanceDetail}
//         isLoading={isBalanceLoading}
//         onSendClick={handleSendClick}
//         onAddMoneyClick={handleAddMoneyClick}
//         canSendMoney={hasSufficientFunds}
//         marketRateAgainstINR={marketRateAgainstINR}
//         ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//           {/* Heading */}
//           {isTransactionsLoading ? (
//             <Skeleton className="h-8 w-48 rounded-md" />
//           ) : (
//             <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h3>
//           )}

//           {/* Actions: Show if not loading AND (have base transactions OR display list differs from base, indicating active search/filter) */}
//           {(!isTransactionsLoading && (balanceSpecificTransactions.length > 0 || displayTransactions.length !== balanceSpecificTransactions.length)) ? (
//              <TransactionActions
//                transactions={balanceSpecificTransactions} // Pass original list for search base
//                onTransactionsChange={handleSearchChange} // Updates display list based on search
//                // userAccounts prop is needed for TransactionActions signature, but filter uses [] below
//                userAccounts={[]}
//                onFilterButtonClick={handleOpenFilterModal} // Opens the filter modal
//              />
//            ) : null }

//            {/* Skeleton for actions while transactions are loading */}
//           {isTransactionsLoading && (
//               <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                 <Skeleton className="h-10 w-full sm:w-64 rounded-full" /> {/* Search Skel */}
//                 <Skeleton className="h-10 w-32 rounded-full" /> {/* Filter Button Skel */}
//               </div>
//           )}
//         </div>

//         <TransactionList
//           transactions={displayTransactions} // Show the currently filtered/searched list
//           isLoading={isTransactionsLoading}
//           error={
//             typeof error === "string" && (error.includes("payment history") || error.includes("transfer history"))
//               ? error
//               : null
//           }
//           currencyCode={currencyCode}
//           balanceId={balanceId!}
//           onSendClick={handleSendClick} // Keep if needed by list items
//           canSendMoney={hasSufficientFunds} // Keep if needed by list items
//           wasInitiallyEmpty={wasInitiallyEmpty} // To show appropriate empty state in list
//         />
//       </div>

//       {/* --- Modals --- */}
//       <InsufficientBalanceModal
//         isOpen={isInsufficientBalanceModalOpen}
//         onClose={handleCloseInsufficientBalanceModal}
//         onAddMoney={handleAddMoneyFromInsufficientModal}
//         currencyCode={currencyCode}
//       />
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />

//       {/* --- FILTER MODAL - RENDERED LAST --- */}
//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={handleCloseFilterModal}
//         // Pass empty userAccounts array. The Balance filter inside the modal
//         // will not render useful options based on this page's context alone.
//         // If you fetched *all* user accounts here, you could pass them.
//         userAccounts={[]}
//         onFiltersApply={handleFiltersApply} // Pass the callback to apply filters
//       />

//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext";
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData";
// import { parseISO } from "date-fns";
// import exchangeRateService from '../../../services/exchangeRate';

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader";
// import Search from "../../components/TransactionPageSection/Search"; // Import Search
// import TransactionList from "../../components/TransactionList";
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal";
// import KycRequiredModal from "../../components/KycRequiredModal";
// import FilterModal, { AppliedFilters } from "../../components/TransactionPageSection/FilterModal";
// import { Transaction } from "@/types/transaction";
// import { BalanceDetail } from "../../../../types/balance";
// import { Currency } from "../../../../types/currency";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import type { KycStatus } from '@/app/services/kyc';
// import { LuSettings2 } from "react-icons/lu"; // Icon for filter button

// // --- Interfaces ---
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }
// interface ExchangeRateApiResponse {
//     base?: string;
//     rates?: { [currencyCode: string]: number };
// }
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep the robust parseDateString)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try { const isoDate = parseISO(dateString); if (!isNaN(isoDate.getTime())) { return isoDate; } } catch (e) {}
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) { return date; }
//         }
//     }
//     try { const genericDate = new Date(dateString); if (!isNaN(genericDate.getTime())) { return genericDate; } } catch (e) {}
//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth();
//   const kycStatus: KycStatus | undefined = user?.kyc.status;

//   // --- Data Fetching ---
//   const {
//       balanceDetail, balanceSpecificTransactions, isLoading: isBalanceLoading,
//       isTransactionsLoading, error,
//   } = useBalanceDetailData(balanceId);

//   // --- State ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: "", toDate: "",
//     });
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);
//   // State to track if the initial transaction fetch resulted in an empty list
//   const [initiallyEmpty, setInitiallyEmpty] = useState<boolean>(false);

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null;
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);

//   // --- Effects ---

//   // Effect to track if initial load was empty
//   useEffect(() => {
//       // Check only when loading finishes and data is available
//       if (!isTransactionsLoading && balanceSpecificTransactions) {
//          setInitiallyEmpty(balanceSpecificTransactions.length === 0);
//       }
//   }, [isTransactionsLoading, balanceSpecificTransactions]);

//   // Effect to filter/search transactions
//    useEffect(() => {
//         if (isTransactionsLoading && balanceSpecificTransactions.length === 0) {
//              setDisplayTransactions([]);
//              return;
//         }

//         let results = [...balanceSpecificTransactions];

//         // 1. Apply Search Term
//         if (searchTerm.trim()) {
//             const searchTermLower = searchTerm.toLowerCase().trim();
//             results = results.filter(tx => {
//                 const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//                 const descriptionMatches = typeof tx.description === 'string' && tx.description.toLowerCase().includes(searchTermLower);
//                 const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
//                 const statusMatches = tx.status?.toLowerCase().includes(searchTermLower);
//                 const recipientNameMatch = (typeof tx.recipient === 'object' && tx.recipient?.accountHolderName?.toLowerCase().includes(searchTermLower));
//                 // Consider adding currency code search if relevant here
//                 let currencyMatch = false;
//                 if (tx.type === 'Add Money') {
//                      currencyMatch = (typeof tx.balanceCurrency === 'object' && tx.balanceCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
//                                      (typeof tx.payInCurrency === 'object' && tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower));
//                 } else if (tx.type === 'Send Money') {
//                      currencyMatch = (typeof tx.sendCurrency === 'object' && tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
//                                      (typeof tx.receiveCurrency === 'object' && tx.receiveCurrency?.code?.toLowerCase().includes(searchTermLower));
//                 }

//                 return nameMatches || descriptionMatches || typeMatches || statusMatches || recipientNameMatch || currencyMatch;
//             });
//         }

//         // 2. Apply Filters
//         const filters = activeFilters;
//         const direction = filters.selectedDirection;
//         if (direction !== 'all') {
//             results = results.filter(tx => (direction === 'add' && tx.type === 'Add Money') || (direction === 'send' && tx.type === 'Send Money'));
//         }
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//            results = results.filter(tx => {
//                const txStatus = tx.status; if (!txStatus) return false;
//                if (statusFilter === 'completed') return txStatus === 'completed';
//                if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Ensure correct spelling
//                if (statusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                if (statusFilter === 'failed') return txStatus === 'failed';
//                return false;
//             });
//         }
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//            const recipientFilterIds = recipientFilters.map(String);
//            results = results.filter(tx => {
//               if (tx.type !== "Send Money") return true;
//               const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id) ? String(tx.recipient._id) : (typeof tx.recipient === 'string' ? tx.recipient : null);
//               return recipientId ? recipientFilterIds.includes(recipientId) : false;
//           });
//         }
//         const fromDateObj = parseDateString(filters.fromDate || undefined);
//         const toDateObj = parseDateString(filters.toDate || undefined);
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//            results = results.filter(tx => {
//                const transactionDateStr = tx.updatedAt || tx.createdAt; if (!transactionDateStr) return false;
//                try {
//                    const transactionDateObj = new Date(transactionDateStr); if (isNaN(transactionDateObj.getTime())) return false;
//                    let include = true;
//                    if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                    if (toDateObj && transactionDateObj > toDateObj) include = false;
//                    return include;
//                } catch (e) { console.warn("Error parsing transaction date:", transactionDateStr, e); return false; }
//            });
//         }

//         setDisplayTransactions(results);

//     }, [balanceSpecificTransactions, searchTerm, activeFilters, isTransactionsLoading]);

//   // Effect to fetch exchange rates
//   useEffect(() => {
//       const fetchRatesAgainstINR = async () => {
//            if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return;
//            try {
//                const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();
//                const liveRates = ratesData.rates; const baseCurrency = ratesData.base || 'USD';
//                if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                    const rateToBase = liveRates[currencyCode]; const inrToBase = liveRates['INR'];
//                    if (rateToBase === 0) { console.warn(`Rate for ${currencyCode} vs ${baseCurrency} is zero.`); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); return; }
//                    const liveRateToINR = inrToBase / rateToBase; setMarketRateAgainstINR(liveRateToINR);
//                    const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number' ? typedBalanceDetail.currency.rateAdjustmentPercentage : 0;
//                    const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                    const ourRateToINR = liveRateToINR * adjustedRateMultiplier; setOurRateAgainstINR(ourRateToINR);
//                } else { console.warn(`Could not find rates for ${currencyCode} or INR. Base: ${baseCurrency}`, liveRates); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); }
//            } catch (error) { console.error("Error fetching rates:", error); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); }
//       };
//       fetchRatesAgainstINR();
//   }, [typedBalanceDetail, currencyCode]);

//   // --- Filter application callback ---
//   const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//       setActiveFilters(filters);
//       setIsFilterModalOpen(false);
//   }, []);

//   // --- Memoized check if filters or search are active ---
//   const filtersOrSearchAreActive = useMemo(() => {
//       const isFilterActive = (
//             activeFilters.selectedRecipients.length > 0 ||
//             activeFilters.selectedDirection !== 'all' ||
//             activeFilters.selectedStatus !== null ||
//             activeFilters.fromDate !== "" ||
//             activeFilters.toDate !== ""
//       );
//       const isSearchActive = searchTerm.trim() !== "";
//       return isFilterActive || isSearchActive;
//   }, [activeFilters, searchTerm]);

//   // --- Other Handlers (KYC, Insufficient Balance, Add/Send/Back) ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => { router.push('/kyc/start'); handleCloseKycModal(); };
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleCloseInsufficientBalanceModal(); handleOpenKycModal(); return; }
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal();
//   };
//   const handleAddMoneyClick = useCallback(() => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleOpenKycModal(); }
//       else { router.push(`/dashboard/balances/${balanceId}/add-money`); }
//   }, [kycStatus, authLoading, user, balanceId, router]);
//   const handleSendClick = useCallback(() => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleOpenKycModal(); }
//       else if (hasSufficientFunds) { router.push(`/dashboard/balances/${balanceId}/send/select-recipient`); }
//       else { handleOpenInsufficientBalanceModal(); }
//   }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]);
//   const handleBackClick = () => router.back();

//   // --- Filter Modal Handlers ---
//   const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//   const handleCloseFilterModal = () => setIsFilterModalOpen(false);

//   // --- Clear Filters and Search Handler ---
//   const clearAllFiltersAndSearch = () => {
//       setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//       setSearchTerm("");
//   };

//   // --- Render Logic ---
//   const isPageLoading = isBalanceLoading || authLoading;

//   // Loading Skeleton
//   if (isPageLoading && !typedBalanceDetail && !error) {
//         return (
//             <div className="py-5 animate-pulse">
//                  <div className="pb-6 mb-8 border-b">
//                     <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                         <div>
//                             <div className="flex items-center sm:justify-start justify-center gap-2 mb-4"> <Skeleton className="w-[50px] h-[50px] rounded-full" /> <Skeleton className="h-6 w-24" /> </div>
//                             <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//                             <div className="flex sm:flex-row flex-col items-center gap-4"> <Skeleton className="h-8 w-64 mb-4 rounded-4xl" /> <Skeleton className="h-8 w-64 mb-4 rounded-4xl" /> </div>
//                         </div>
//                         <div className="flex flex-col justify-start items-center sm:items-end">
//                              <div className="flex justify-center space-x-6">
//                                   <div className="flex flex-col items-center"> <Skeleton className="w-14 h-14 rounded-full mb-1" /> <Skeleton className="h-4 w-8" /> </div>
//                                   <div className="flex flex-col items-center"> <Skeleton className="w-14 h-14 rounded-full mb-1" /> <Skeleton className="h-4 w-8" /> </div>
//                              </div>
//                         </div>
//                     </div>
//                  </div>
//                  <div className="mt-10">
//                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//                          <Skeleton className="h-8 w-48 rounded-md" />
//                          <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                              <Skeleton className="h-12.5 w-full sm:w-68 rounded-full" />
//                              <Skeleton className="h-12.5 w-36 rounded-full" />
//                          </div>
//                      </div>
//                      <div className="space-y-2">
//                         {Array(5).fill(0).map((_, index) => (
//                              <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                                  <div className="flex items-center gap-4">
//                                      <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                                      <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                          <div className="flex-grow"> <Skeleton className="h-4 w-40 mb-2" /> <Skeleton className="h-3 w-32" /> </div>
//                                          <Skeleton className="h-6 w-26 rounded-full" />
//                                      </div>
//                                  </div>
//                              </div>
//                          ))}
//                      </div>
//                  </div>
//             </div>
//          );
//   }

//   // Error State
//   if ((error && !typedBalanceDetail && !isBalanceLoading) || (!isPageLoading && !typedBalanceDetail)) {
//      const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                      <p className="font-semibold">Error Loading Balance</p>
//                      <p className="text-sm mt-1">{message}</p>
//                 </div>
//                 <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//          );
//    }

//    // Fallback
//    if (!typedBalanceDetail) {
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//             return (
//                 <div className="container mx-auto px-4 py-8 text-center">
//                      <p>Something went wrong. Balance details are unavailable.</p>
//                      <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//                 </div>
//             );
//    }

//   // --- Main Render Structure ---
//   return (
//     <div className="py-5">
//       <BalanceHeader
//         balanceDetail={typedBalanceDetail}
//         isLoading={isBalanceLoading}
//         onSendClick={handleSendClick}
//         onAddMoneyClick={handleAddMoneyClick}
//         canSendMoney={hasSufficientFunds}
//         marketRateAgainstINR={marketRateAgainstINR}
//         ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//            <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//              Transactions
//            </h3>
//            {(typedBalanceDetail) && (
//               <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//                  <Search
//                      searchTerm={searchTerm}
//                      onSearchChange={setSearchTerm}
//                  />
//                  <button
//                       className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-36 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
//                       onClick={handleOpenFilterModal}
//                       aria-haspopup="dialog"
//                       disabled={isTransactionsLoading && balanceSpecificTransactions.length === 0} // Disable if initial load ongoing
//                   >
//                       <LuSettings2 size={20} />
//                       <span className="md:block hidden">Filters</span>
//                   </button>
//               </div>
//            )}
//         </div>

//         <TransactionList
//           transactions={displayTransactions}
//           isLoading={isTransactionsLoading}
//           error={
//             typeof error === "string" && (error.includes("payment history") || error.includes("transfer history"))
//               ? error
//               : null
//           }
//           currencyCode={currencyCode}
//           balanceId={balanceId!}
//           onSendClick={handleSendClick}
//           canSendMoney={hasSufficientFunds}
//           wasInitiallyEmpty={initiallyEmpty} // <-- Pass the prop here
//         />

//         {/* ---- Empty State Logic for Balance Detail Page ---- */}
//         {!isTransactionsLoading && displayTransactions.length === 0 && (
//             <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                  {initiallyEmpty ? ( // Use the state variable
//                     <span>You haven't made any transactions for this balance yet.</span>
//                  ) : (
//                     <>
//                         <span>No transactions match your current filter or search criteria.</span>
//                          {filtersOrSearchAreActive && (
//                            <Button
//                              onClick={clearAllFiltersAndSearch}
//                              // variant="primary" // <-- Removed variant="primary"
//                              className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                            >
//                              Clear Filters
//                            </Button>
//                          )}
//                     </>
//                  )}
//             </div>
//         )}
//          {/* ---- End Empty State Logic ---- */}
//       </div>

//       {/* --- Modals --- */}
//       <InsufficientBalanceModal isOpen={isInsufficientBalanceModalOpen} onClose={handleCloseInsufficientBalanceModal} onAddMoney={handleAddMoneyFromInsufficientModal} currencyCode={currencyCode} />
//       <KycRequiredModal isOpen={isKycModalOpen} onClose={handleCloseKycModal} onStartVerification={handleStartVerification}/>

//       {/* --- FILTER MODAL --- */}
//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={handleCloseFilterModal}
//         userAccounts={[]}
//         onFiltersApply={handleFiltersApply}
//         initialFilters={activeFilters}
//       />

//     </div>
//   );
// };

// export default BalanceDetailPage;

// // frontend/src/app/dashboard/balances/[balanceId]/page.tsx
// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext";
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData";
// import { parseISO } from "date-fns";
// import exchangeRateService from '../../../services/exchangeRate';

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader";
// import Search from "../../components/TransactionPageSection/Search"; // Import Search
// import TransactionList from "../../components/TransactionList";
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal";
// import KycRequiredModal from "../../components/KycRequiredModal";
// import FilterModal, { AppliedFilters } from "../../components/TransactionPageSection/FilterModal";
// import { Transaction } from "@/types/transaction";
// import { BalanceDetail } from "../../../../types/balance";
// import { Currency } from "../../../../types/currency";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import type { KycStatus } from '@/app/services/kyc';
// import { LuSettings2 } from "react-icons/lu"; // Icon for filter button

// // --- Interfaces ---
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }
// interface ExchangeRateApiResponse {
//     base?: string;
//     rates?: { [currencyCode: string]: number };
// }
// interface ExtendedCurrency extends Currency {
//     rateAdjustmentPercentage?: number;
// }
// interface ExtendedBalanceDetail extends BalanceDetail {
//     currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep the robust parseDateString)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     try { const isoDate = parseISO(dateString); if (!isNaN(isoDate.getTime())) { return isoDate; } } catch (e) {}
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) { return date; }
//         }
//     }
//     try { const genericDate = new Date(dateString); if (!isNaN(genericDate.getTime())) { return genericDate; } } catch (e) {}
//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth();
//   const kycStatus: KycStatus | undefined = user?.kyc.status;

//   // --- Data Fetching ---
//   const {
//       balanceDetail, balanceSpecificTransactions, isLoading: isBalanceLoading,
//       isTransactionsLoading, error,
//   } = useBalanceDetailData(balanceId);

//   // --- State ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: "", toDate: "",
//     });
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] = useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<number | null>(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(null);
//   // State to track if the initial transaction fetch resulted in an empty list
//   const [initiallyEmpty, setInitiallyEmpty] = useState<boolean>(false); // Keep this

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null;
//   const hasSufficientFunds = useMemo(() => (typedBalanceDetail?.balance ?? 0) > 0, [typedBalanceDetail]);
//   const currencyCode = useMemo(() => typedBalanceDetail?.currency?.code ?? 'N/A', [typedBalanceDetail]);

//   // --- Effects ---

//   // Effect to track if initial load was empty
//   useEffect(() => {
//       // Check only when loading finishes and data is available
//       // AND only set initiallyEmpty once
//       if (!isTransactionsLoading && balanceSpecificTransactions && displayTransactions.length === balanceSpecificTransactions.length) {
//          setInitiallyEmpty(balanceSpecificTransactions.length === 0);
//       }
//       // Reset initiallyEmpty if balanceId changes (though unlikely in this component structure)
//   }, [isTransactionsLoading, balanceSpecificTransactions, displayTransactions.length]);

//   // Effect to filter/search transactions
//    useEffect(() => {
//         // If still loading the base transactions, keep display empty or as is
//         if (isTransactionsLoading) {
//             // Optionally setDisplayTransactions([]) here if you want flicker during loading filters
//             // but better to wait until base data is loaded.
//              return;
//         }

//         let results = [...balanceSpecificTransactions]; // Start with the full list

//         // 1. Apply Search Term
//         if (searchTerm.trim()) {
//             const searchTermLower = searchTerm.toLowerCase().trim();
//             results = results.filter(tx => {
//                 const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//                 const descriptionMatches = typeof tx.description === 'string' && tx.description.toLowerCase().includes(searchTermLower);
//                 const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
//                 const statusMatches = tx.status?.toLowerCase().includes(searchTermLower);
//                 const recipientNameMatch = (typeof tx.recipient === 'object' && tx.recipient?.accountHolderName?.toLowerCase().includes(searchTermLower));
//                 let currencyMatch = false;
//                 if (tx.type === 'Add Money') {
//                      currencyMatch = (typeof tx.balanceCurrency === 'object' && tx.balanceCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
//                                      (typeof tx.payInCurrency === 'object' && tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower));
//                 } else if (tx.type === 'Send Money') {
//                      currencyMatch = (typeof tx.sendCurrency === 'object' && tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
//                                      (typeof tx.receiveCurrency === 'object' && tx.receiveCurrency?.code?.toLowerCase().includes(searchTermLower));
//                 }

//                 return nameMatches || descriptionMatches || typeMatches || statusMatches || recipientNameMatch || currencyMatch;
//             });
//         }

//         // 2. Apply Filters
//         const filters = activeFilters;
//         const direction = filters.selectedDirection;
//         if (direction !== 'all') {
//             results = results.filter(tx => (direction === 'add' && tx.type === 'Add Money') || (direction === 'send' && tx.type === 'Send Money'));
//         }
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//            results = results.filter(tx => {
//                const txStatus = tx.status; if (!txStatus) return false;
//                if (statusFilter === 'completed') return txStatus === 'completed';
//                if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Ensure correct spelling
//                if (statusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                if (statusFilter === 'failed') return txStatus === 'failed';
//                return false;
//             });
//         }
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//            const recipientFilterIds = recipientFilters.map(String);
//            results = results.filter(tx => {
//               if (tx.type !== "Send Money") return true; // Keep non-send money transactions if filtering by recipient
//               const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id) ? String(tx.recipient._id) : (typeof tx.recipient === 'string' ? tx.recipient : null);
//               return recipientId ? recipientFilterIds.includes(recipientId) : false;
//           });
//         }
//         const fromDateObj = parseDateString(filters.fromDate || undefined);
//         const toDateObj = parseDateString(filters.toDate || undefined);
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
//         if (fromDateObj || toDateObj) {
//            results = results.filter(tx => {
//                const transactionDateStr = tx.updatedAt || tx.createdAt; if (!transactionDateStr) return false;
//                try {
//                    const transactionDateObj = new Date(transactionDateStr); if (isNaN(transactionDateObj.getTime())) return false;
//                    let include = true;
//                    if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                    if (toDateObj && transactionDateObj > toDateObj) include = false;
//                    return include;
//                } catch (e) { console.warn("Error parsing transaction date:", transactionDateStr, e); return false; }
//            });
//         }

//         setDisplayTransactions(results);

//     }, [balanceSpecificTransactions, searchTerm, activeFilters, isTransactionsLoading]); // Dependency on isTransactionsLoading ensures re-filter when loading finishes

//   // Effect to fetch exchange rates
//   useEffect(() => {
//       const fetchRatesAgainstINR = async () => {
//            if (!typedBalanceDetail || !currencyCode || currencyCode === 'N/A' || currencyCode === 'INR') return;
//            try {
//                const ratesData: ExchangeRateApiResponse = await exchangeRateService.getExchangeRatesForCurrencies();
//                const liveRates = ratesData.rates; const baseCurrency = ratesData.base || 'USD';
//                if (liveRates && liveRates[currencyCode] && liveRates['INR']) {
//                    const rateToBase = liveRates[currencyCode]; const inrToBase = liveRates['INR'];
//                    if (rateToBase === 0) { console.warn(`Rate for ${currencyCode} vs ${baseCurrency} is zero.`); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); return; }
//                    const liveRateToINR = inrToBase / rateToBase; setMarketRateAgainstINR(liveRateToINR);
//                    const adjustmentPercent = typeof typedBalanceDetail.currency.rateAdjustmentPercentage === 'number' ? typedBalanceDetail.currency.rateAdjustmentPercentage : 0;
//                    const adjustedRateMultiplier = (1 + (adjustmentPercent / 100));
//                    const ourRateToINR = liveRateToINR * adjustedRateMultiplier; setOurRateAgainstINR(ourRateToINR);
//                } else { console.warn(`Could not find rates for ${currencyCode} or INR. Base: ${baseCurrency}`, liveRates); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); }
//            } catch (error) { console.error("Error fetching rates:", error); setMarketRateAgainstINR(null); setOurRateAgainstINR(null); }
//       };
//       fetchRatesAgainstINR();
//   }, [typedBalanceDetail, currencyCode]);

//   // --- Filter application callback ---
//   const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//       setActiveFilters(filters);
//       setIsFilterModalOpen(false);
//   }, []);

//   // --- Memoized check if filters or search are active ---
//   const filtersOrSearchAreActive = useMemo(() => {
//       const isFilterActive = (
//             activeFilters.selectedRecipients.length > 0 ||
//             activeFilters.selectedDirection !== 'all' ||
//             activeFilters.selectedStatus !== null ||
//             activeFilters.fromDate !== "" ||
//             activeFilters.toDate !== ""
//       );
//       const isSearchActive = searchTerm.trim() !== "";
//       return isFilterActive || isSearchActive;
//   }, [activeFilters, searchTerm]);

//   // --- Other Handlers (KYC, Insufficient Balance, Add/Send/Back) ---
//   const handleOpenKycModal = () => setIsKycModalOpen(true);
//   const handleCloseKycModal = () => setIsKycModalOpen(false);
//   const handleStartVerification = () => { router.push('/kyc/start'); handleCloseKycModal(); };
//   const handleOpenInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(true);
//   const handleCloseInsufficientBalanceModal = () => setIsInsufficientBalanceModalOpen(false);
//   const handleAddMoneyFromInsufficientModal = () => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleCloseInsufficientBalanceModal(); handleOpenKycModal(); return; }
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//       handleCloseInsufficientBalanceModal();
//   };
//   const handleAddMoneyClick = useCallback(() => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleOpenKycModal(); }
//       else { router.push(`/dashboard/balances/${balanceId}/add-money`); }
//   }, [kycStatus, authLoading, user, balanceId, router]);
//   const handleSendClick = useCallback(() => {
//       if (authLoading || !user) return;
//       if (kycStatus !== 'verified') { handleOpenKycModal(); }
//       else if (hasSufficientFunds) { router.push(`/dashboard/balances/${balanceId}/send/select-recipient`); }
//       else { handleOpenInsufficientBalanceModal(); }
//   }, [kycStatus, hasSufficientFunds, authLoading, user, balanceId, router]);
//   const handleBackClick = () => router.back();

//   // --- Filter Modal Handlers ---
//   const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//   const handleCloseFilterModal = () => setIsFilterModalOpen(false);

//   // --- Clear Filters and Search Handler ---
//   const clearAllFiltersAndSearch = () => {
//       setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//       setSearchTerm("");
//       // No need to manually setDisplayTransactions here, the useEffect will recalculate it
//   };

//   // --- Render Logic ---
//   const isPageLoading = isBalanceLoading || authLoading;

//   // Loading Skeleton
//   if (isPageLoading && !typedBalanceDetail && !error) {
//         // --- Skeleton remains the same ---
//         return (
//             <div className="py-5 animate-pulse">
//                  <div className="pb-6 mb-8 border-b">
//                     <div className="flex sm:flex-row flex-col gap-4 justify-between">
//                         <div>
//                             <div className="flex items-center sm:justify-start justify-center gap-2 mb-4"> <Skeleton className="w-[50px] h-[50px] rounded-full" /> <Skeleton className="h-6 w-24" /> </div>
//                             <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//                             <div className="flex sm:flex-row flex-col items-center gap-4"> <Skeleton className="h-8 w-64 mb-4 rounded-4xl" /> <Skeleton className="h-8 w-64 mb-4 rounded-4xl" /> </div>
//                         </div>
//                         <div className="flex flex-col justify-start items-center sm:items-end">
//                              <div className="flex justify-center space-x-6">
//                                   <div className="flex flex-col items-center"> <Skeleton className="w-14 h-14 rounded-full mb-1" /> <Skeleton className="h-4 w-8" /> </div>
//                                   <div className="flex flex-col items-center"> <Skeleton className="w-14 h-14 rounded-full mb-1" /> <Skeleton className="h-4 w-8" /> </div>
//                              </div>
//                         </div>
//                     </div>
//                  </div>
//                  <div className="mt-10">
//                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//                          <Skeleton className="h-8 w-48 rounded-md" />
//                          <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//                              <Skeleton className="h-12.5 w-full sm:w-68 rounded-full" />
//                              <Skeleton className="h-12.5 w-36 rounded-full" />
//                          </div>
//                      </div>
//                      <div className="space-y-2">
//                         {Array(5).fill(0).map((_, index) => (
//                              <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                                  <div className="flex items-center gap-4">
//                                      <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                                      <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                          <div className="flex-grow"> <Skeleton className="h-4 w-40 mb-2" /> <Skeleton className="h-3 w-32" /> </div>
//                                          <Skeleton className="h-6 w-26 rounded-full" />
//                                      </div>
//                                  </div>
//                              </div>
//                          ))}
//                      </div>
//                  </div>
//             </div>
//          );
//   }

//   // Error State
//   if ((error && !typedBalanceDetail && !isBalanceLoading) || (!isPageLoading && !typedBalanceDetail)) {
//      // --- Error remains the same ---
//      const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-red-700 dark:text-red-300 p-4 rounded-md max-w-lg mx-auto">
//                      <p className="font-semibold">Error Loading Balance</p>
//                      <p className="text-sm mt-1">{message}</p>
//                 </div>
//                 <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//             </div>
//          );
//    }

//    // Fallback - Should ideally not be reached if logic is correct
//    if (!typedBalanceDetail) {
//         // --- Fallback remains the same ---
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//             return (
//                 <div className="container mx-auto px-4 py-8 text-center">
//                      <p>Something went wrong. Balance details are unavailable.</p>
//                      <Button onClick={handleBackClick} variant="outline" className="mt-6">Go Back</Button>
//                 </div>
//             );
//    }

//   // Determine if the specific "no match" empty state should be shown
//   const showNoMatchEmptyState = !isTransactionsLoading &&
//                                 displayTransactions.length === 0 &&
//                                 !initiallyEmpty && // Only show if there *were* transactions initially
//                                 filtersOrSearchAreActive; // Only show if filters/search caused the empty list

//   // --- Main Render Structure ---
//   return (
//     <div className="py-5">
//       <BalanceHeader
//         balanceDetail={typedBalanceDetail}
//         isLoading={isBalanceLoading}
//         onSendClick={handleSendClick}
//         onAddMoneyClick={handleAddMoneyClick}
//         canSendMoney={hasSufficientFunds}
//         marketRateAgainstINR={marketRateAgainstINR}
//         ourRateAgainstINR={ourRateAgainstINR}
//       />

//       {/* --- Transactions Section --- */}
//       <div className="mt-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//            <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//              Transactions
//            </h3>
//            {/* Conditionally render Search/Filter only if there's a chance of having transactions */}
//            {(!initiallyEmpty || isTransactionsLoading) && (
//               <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//                  <Search
//                      searchTerm={searchTerm}
//                      onSearchChange={setSearchTerm}
//                  />
//                  <button
//                       className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-40 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
//                       onClick={handleOpenFilterModal}
//                       aria-haspopup="dialog"
//                       // Disable filter button if loading OR if it's initially empty AND no filters are active yet (no point filtering nothing)
//                       disabled={isTransactionsLoading || (initiallyEmpty && !filtersOrSearchAreActive)}
//                   >
//                       <LuSettings2 size={20} />
//                       <span className="md:block hidden">Filters</span>
//                   </button>
//               </div>
//            )}
//         </div>

//         {/* Pass displayTransactions and initiallyEmpty state to TransactionList */}
//         <TransactionList
//           transactions={displayTransactions} // Pass the potentially filtered list
//           isLoading={isTransactionsLoading} // Pass loading state
//           error={
//             typeof error === "string" && (error.includes("payment history") || error.includes("transfer history"))
//               ? error // Pass only transaction-specific errors
//               : null
//           }
//           currencyCode={currencyCode}
//           balanceId={balanceId!}
//           onSendClick={handleSendClick}
//           canSendMoney={hasSufficientFunds}
//           wasInitiallyEmpty={initiallyEmpty} // <-- Pass the initial empty state
//         />

//         {/* ---- Empty State Logic for Filter/Search Miss ---- */}
//         {/* Show this *only* when filtering/searching yields no results, but there were initial transactions */}
//         {showNoMatchEmptyState && (
//             <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                <span>No transactions match your current filter or search criteria.</span>
//                {/* Button to clear filters/search */}
//                <Button
//                  onClick={clearAllFiltersAndSearch}
//                  // variant="primary" // <-- Removed variant="primary" as requested
//                  className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                >
//                  Clear Filters
//                </Button>
//             </div>
//         )}
//          {/* ---- End Specific Empty State Logic ---- */}
//       </div>

//       {/* --- Modals --- */}
//       <InsufficientBalanceModal isOpen={isInsufficientBalanceModalOpen} onClose={handleCloseInsufficientBalanceModal} onAddMoney={handleAddMoneyFromInsufficientModal} currencyCode={currencyCode} />
//       <KycRequiredModal isOpen={isKycModalOpen} onClose={handleCloseKycModal} onStartVerification={handleStartVerification}/>

//       {/* --- FILTER MODAL --- */}
//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={handleCloseFilterModal}
//         // Consider fetching actual user accounts/recipients if needed for the filter modal
//         userAccounts={[]}
//         onFiltersApply={handleFiltersApply}
//         initialFilters={activeFilters}
//       />

//     </div>
//   );
// };

// export default BalanceDetailPage;

// "use client";

// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// // Hooks and Services
// import { useAuth } from "../../../contexts/AuthContext";
// import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData";
// import { parseISO } from "date-fns";
// import exchangeRateService from "../../../services/exchangeRate";

// // Components and Types
// import BalanceHeader from "../../components/BalanceHeader";
// import Search from "../../components/TransactionPageSection/Search"; // Import Search
// import TransactionList from "../../components/TransactionList";
// import InsufficientBalanceModal from "../../components/InsufficientBalanceModal";
// import KycRequiredModal from "../../components/KycRequiredModal";
// import FilterModal, {
//   AppliedFilters,
// } from "../../components/TransactionPageSection/FilterModal";
// import { Transaction } from "@/types/transaction";
// import { BalanceDetail } from "../../../../types/balance";
// import { Currency } from "../../../../types/currency";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import type { KycStatus } from "@/app/services/kyc";
// import { LuSettings2 } from "react-icons/lu"; // Icon for filter button
// import { AlertTriangle, Inbox } from "lucide-react";

// // --- Interfaces ---
// interface BalanceDetailPageParams extends Record<string, string | string[]> {
//   balanceId: string;
// }
// interface ExchangeRateApiResponse {
//   base?: string;
//   rates?: { [currencyCode: string]: number };
// }
// interface ExtendedCurrency extends Currency {
//   rateAdjustmentPercentage?: number;
// }
// interface ExtendedBalanceDetail extends BalanceDetail {
//   currency: ExtendedCurrency;
// }

// // --- Utility Function --- (Keep the robust parseDateString)
// function parseDateString(dateString: string | undefined): Date | null {
//   if (!dateString) return null;
//   try {
//     const isoDate = parseISO(dateString);
//     if (!isNaN(isoDate.getTime())) {
//       return isoDate;
//     }
//   } catch (e) {}
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     if (
//       !isNaN(day) &&
//       !isNaN(month) &&
//       !isNaN(year) &&
//       month >= 0 &&
//       month <= 11 &&
//       day >= 1 &&
//       day <= 31
//     ) {
//       const date = new Date(Date.UTC(year, month, day));
//       if (
//         date.getUTCFullYear() === year &&
//         date.getUTCMonth() === month &&
//         date.getUTCDate() === day
//       ) {
//         return date;
//       }
//     }
//   }
//   try {
//     const genericDate = new Date(dateString);
//     if (!isNaN(genericDate.getTime())) {
//       return genericDate;
//     }
//   } catch (e) {}
//   console.warn(
//     "Could not parse date string into a valid Date object:",
//     dateString
//   );
//   return null;
// }

// // --- Component ---
// const BalanceDetailPage = () => {
//   const params = useParams<BalanceDetailPageParams>();
//   const router = useRouter();
//   const { balanceId } = params;
//   const { token, user, loading: authLoading } = useAuth();
//   const kycStatus: KycStatus | undefined = user?.kyc.status;

//   // --- Data Fetching ---
//   const {
//     balanceDetail,
//     balanceSpecificTransactions,
//     isLoading: isBalanceLoading,
//     isTransactionsLoading,
//     error,
//   } = useBalanceDetailData(balanceId);

//   // --- State ---
//   const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>(
//     []
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//     selectedRecipients: [],
//     selectedDirection: "all",
//     selectedStatus: null,
//     selectedBalance: [],
//     fromDate: "",
//     toDate: "",
//   });
//   const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] =
//     useState(false);
//   const [isKycModalOpen, setIsKycModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<
//     number | null
//   >(null);
//   const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(
//     null
//   );
//   const [initiallyEmpty, setInitiallyEmpty] = useState<boolean>(false);

//   // --- Derived State ---
//   const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null;
//   const hasSufficientFunds = useMemo(
//     () => (typedBalanceDetail?.balance ?? 0) > 0,
//     [typedBalanceDetail]
//   );
//   const currencyCode = useMemo(
//     () => typedBalanceDetail?.currency?.code ?? "N/A",
//     [typedBalanceDetail]
//   );

//   // --- Effects ---
//   useEffect(() => {
//     if (
//       !isTransactionsLoading &&
//       balanceSpecificTransactions &&
//       displayTransactions.length === balanceSpecificTransactions.length
//     ) {
//       setInitiallyEmpty(balanceSpecificTransactions.length === 0);
//     }
//   }, [
//     isTransactionsLoading,
//     balanceSpecificTransactions,
//     displayTransactions.length,
//   ]);

//   useEffect(() => {
//     if (isTransactionsLoading) {
//       return;
//     }
//     let results = [...balanceSpecificTransactions];
//     if (searchTerm.trim()) {
//       const searchTermLower = searchTerm.toLowerCase().trim();
//       results = results.filter((tx) => {
//         const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//         const descriptionMatches =
//           typeof tx.description === "string" &&
//           tx.description.toLowerCase().includes(searchTermLower);
//         const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
//         const statusMatches = tx.status
//           ?.toLowerCase()
//           .includes(searchTermLower);
//         const recipientNameMatch =
//           typeof tx.recipient === "object" &&
//           tx.recipient?.accountHolderName
//             ?.toLowerCase()
//             .includes(searchTermLower);
//         let currencyMatch = false;
//         if (tx.type === "Add Money") {
//           currencyMatch =
//             (typeof tx.balanceCurrency === "object" &&
//               tx.balanceCurrency?.code
//                 ?.toLowerCase()
//                 .includes(searchTermLower)) ||
//             (typeof tx.payInCurrency === "object" &&
//               tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower));
//         } else if (tx.type === "Send Money") {
//           currencyMatch =
//             (typeof tx.sendCurrency === "object" &&
//               tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
//             (typeof tx.receiveCurrency === "object" &&
//               tx.receiveCurrency?.code
//                 ?.toLowerCase()
//                 .includes(searchTermLower));
//         }
//         return (
//           nameMatches ||
//           descriptionMatches ||
//           typeMatches ||
//           statusMatches ||
//           recipientNameMatch ||
//           currencyMatch
//         );
//       });
//     }
//     const filters = activeFilters;
//     const direction = filters.selectedDirection;
//     if (direction !== "all") {
//       results = results.filter(
//         (tx) =>
//           (direction === "add" && tx.type === "Add Money") ||
//           (direction === "send" && tx.type === "Send Money")
//       );
//     }
//     const statusFilter = filters.selectedStatus?.toLowerCase();
//     if (statusFilter) {
//       results = results.filter((tx) => {
//         const txStatus = tx.status;
//         if (!txStatus) return false;
//         if (statusFilter === "completed") return txStatus === "completed";
//         if (statusFilter === "cancelled") return txStatus === "canceled";
//         if (statusFilter === "in progress")
//           return txStatus === "in progress" || txStatus === "pending";
//         if (statusFilter === "failed") return txStatus === "failed";
//         return false;
//       });
//     }
//     const recipientFilters = filters.selectedRecipients;
//     if (recipientFilters && recipientFilters.length > 0) {
//       const recipientFilterIds = recipientFilters.map(String);
//       results = results.filter((tx) => {
//         if (tx.type !== "Send Money") return true;
//         const recipientId =
//           typeof tx.recipient === "object" && tx.recipient?._id
//             ? String(tx.recipient._id)
//             : typeof tx.recipient === "string"
//             ? tx.recipient
//             : null;
//         return recipientId ? recipientFilterIds.includes(recipientId) : false;
//       });
//     }
//     const fromDateObj = parseDateString(filters.fromDate || undefined);
//     const toDateObj = parseDateString(filters.toDate || undefined);
//     if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//     if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);
//     if (fromDateObj || toDateObj) {
//       results = results.filter((tx) => {
//         const transactionDateStr = tx.updatedAt || tx.createdAt;
//         if (!transactionDateStr) return false;
//         try {
//           const transactionDateObj = new Date(transactionDateStr);
//           if (isNaN(transactionDateObj.getTime())) return false;
//           let include = true;
//           if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//           if (toDateObj && transactionDateObj > toDateObj) include = false;
//           return include;
//         } catch (e) {
//           console.warn(
//             "Error parsing transaction date:",
//             transactionDateStr,
//             e
//           );
//           return false;
//         }
//       });
//     }
//     setDisplayTransactions(results);
//   }, [
//     balanceSpecificTransactions,
//     searchTerm,
//     activeFilters,
//     isTransactionsLoading,
//   ]);

//   useEffect(() => {
//     const fetchRatesAgainstINR = async () => {
//       if (
//         !typedBalanceDetail ||
//         !currencyCode ||
//         currencyCode === "N/A" ||
//         currencyCode === "INR"
//       )
//         return;
//       try {
//         const ratesData: ExchangeRateApiResponse =
//           await exchangeRateService.getExchangeRatesForCurrencies();
//         const liveRates = ratesData.rates;
//         const baseCurrency = ratesData.base || "USD";
//         if (liveRates && liveRates[currencyCode] && liveRates["INR"]) {
//           const rateToBase = liveRates[currencyCode];
//           const inrToBase = liveRates["INR"];
//           if (rateToBase === 0) {
//             console.warn(
//               `Rate for ${currencyCode} vs ${baseCurrency} is zero.`
//             );
//             setMarketRateAgainstINR(null);
//             setOurRateAgainstINR(null);
//             return;
//           }
//           const liveRateToINR = inrToBase / rateToBase;
//           setMarketRateAgainstINR(liveRateToINR);
//           const adjustmentPercent =
//             typeof typedBalanceDetail.currency.rateAdjustmentPercentage ===
//             "number"
//               ? typedBalanceDetail.currency.rateAdjustmentPercentage
//               : 0;
//           const adjustedRateMultiplier = 1 + adjustmentPercent / 100;
//           const ourRateToINR = liveRateToINR * adjustedRateMultiplier;
//           setOurRateAgainstINR(ourRateToINR);
//         } else {
//           console.warn(
//             `Could not find rates for ${currencyCode} or INR. Base: ${baseCurrency}`,
//             liveRates
//           );
//           setMarketRateAgainstINR(null);
//           setOurRateAgainstINR(null);
//         }
//       } catch (error) {
//         console.error("Error fetching rates:", error);
//         setMarketRateAgainstINR(null);
//         setOurRateAgainstINR(null);
//       }
//     };
//     fetchRatesAgainstINR();
//   }, [typedBalanceDetail, currencyCode]);

//   const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//     setActiveFilters(filters);
//     setIsFilterModalOpen(false);
//   }, []);

//   const filtersOrSearchAreActive = useMemo(() => {
//     const isFilterActive =
//       activeFilters.selectedRecipients.length > 0 ||
//       activeFilters.selectedDirection !== "all" ||
//       activeFilters.selectedStatus !== null ||
//       activeFilters.fromDate !== "" ||
//       activeFilters.toDate !== "";
//     const isSearchActive = searchTerm.trim() !== "";
//     return isFilterActive || isSearchActive;
//   }, [activeFilters, searchTerm]);

//   const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
//   const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
//   const handleStartVerification = useCallback(() => {
//     router.push("/kyc/start");
//     handleCloseKycModal();
//   }, [router, handleCloseKycModal]);

//   const handleOpenInsufficientBalanceModal = useCallback(
//     () => setIsInsufficientBalanceModalOpen(true),
//     []
//   );
//   const handleCloseInsufficientBalanceModal = useCallback(
//     () => setIsInsufficientBalanceModalOpen(false),
//     []
//   );

//   const handleAddMoneyFromInsufficientModal = useCallback(() => {
//     if (authLoading || !user) return;
//     if (kycStatus !== "verified") {
//       handleCloseInsufficientBalanceModal();
//       handleOpenKycModal();
//       return;
//     }
//     router.push(`/dashboard/balances/${balanceId}/add-money`);
//     handleCloseInsufficientBalanceModal();
//   }, [
//     authLoading,
//     user,
//     kycStatus,
//     balanceId,
//     router,
//     handleCloseInsufficientBalanceModal,
//     handleOpenKycModal,
//   ]);

//   const handleAddMoneyClick = useCallback(() => {
//     if (authLoading || !user) return;
//     if (kycStatus !== "verified") {
//       handleOpenKycModal();
//     } else {
//       router.push(`/dashboard/balances/${balanceId}/add-money`);
//     }
//   }, [kycStatus, authLoading, user, balanceId, router, handleOpenKycModal]);

//   const handleSendClick = useCallback(() => {
//     if (authLoading || !user) return;
//     if (kycStatus !== "verified") {
//       handleOpenKycModal();
//       return; // Important: return after opening modal
//     }
//     // KYC is verified at this point
//     if (hasSufficientFunds) {
//       router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     } else {
//       handleOpenInsufficientBalanceModal();
//     }
//   }, [
//     kycStatus,
//     hasSufficientFunds,
//     authLoading,
//     user,
//     balanceId,
//     router,
//     handleOpenKycModal,
//     handleOpenInsufficientBalanceModal,
//   ]);

//   const handleBackClick = () => router.back();
//   const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//   const handleCloseFilterModal = () => setIsFilterModalOpen(false);
//   const clearAllFiltersAndSearch = () => {
//     setActiveFilters({
//       selectedRecipients: [],
//       selectedDirection: "all",
//       selectedStatus: null,
//       selectedBalance: [],
//       fromDate: "",
//       toDate: "",
//     });
//     setSearchTerm("");
//   };

//   const isPageLoading = isBalanceLoading || authLoading;

//   if (isPageLoading && !typedBalanceDetail && !error) {
//     return (
//       <div className="py-5">
//         <div className="pb-6 mb-8 border-b">
//           <div className="flex sm:flex-row flex-col gap-4 justify-between">
//             <div>
//               <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                 {" "}
//                 <Skeleton className="w-[50px] h-[50px] rounded-full" />{" "}
//                 <Skeleton className="h-6 w-24" />{" "}
//               </div>
//               <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//               <div className="flex sm:flex-row flex-col items-center gap-4">
//                 {" "}
//                 <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />{" "}
//                 <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />{" "}
//               </div>
//             </div>
//             <div className="flex flex-col justify-start items-center sm:items-end">
//               <div className="flex justify-center space-x-6">
//                 <div className="flex flex-col items-center">
//                   {" "}
//                   <Skeleton className="w-14 h-14 rounded-full mb-1" />{" "}
//                   <Skeleton className="h-4 w-8" />{" "}
//                 </div>
//                 <div className="flex flex-col items-center">
//                   {" "}
//                   <Skeleton className="w-14 h-14 rounded-full mb-1" />{" "}
//                   <Skeleton className="h-4 w-8" />{" "}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//             <Skeleton className="h-8 w-48 rounded-md" />
//             <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//               <Skeleton className="h-12.5 w-full sm:w-68 rounded-full" />
//               <Skeleton className="h-12.5 w-36 rounded-full" />
//             </div>
//           </div>
//           <div className="space-y-2">
//             {Array(5)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         {" "}
//                         <Skeleton className="h-4 w-40 mb-2" />{" "}
//                         <Skeleton className="h-3 w-32" />{" "}
//                       </div>
//                       <Skeleton className="h-6 w-26 rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         <div className="flex flex-col justify-start items-center sm:items-end">
//           <div className="flex justify-center space-x-6">
//             <div className="flex flex-col items-center">
//               {" "}
//               <Skeleton className="w-14 h-14 rounded-full mb-1" />{" "}
//               <Skeleton className="h-4 w-8" />{" "}
//             </div>
//             <div className="flex flex-col items-center">
//               {" "}
//               <Skeleton className="w-14 h-14 rounded-full mb-1" />{" "}
//               <Skeleton className="h-4 w-8" />{" "}
//             </div>
//           </div>
//         </div>

//         <div className="mt-10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//             <Skeleton className="h-8 w-48 rounded-md" />
//             <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
//               <Skeleton className="h-12.5 w-full sm:w-68 rounded-full" />
//               <Skeleton className="h-12.5 w-36 rounded-full" />
//             </div>
//           </div>
//           <div className="space-y-2">
//             {Array(5)
//               .fill(0)
//               .map((_, index) => (
//                 <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="size-12 rounded-full flex-shrink-0" />
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         {" "}
//                         <Skeleton className="h-4 w-40 mb-2" />{" "}
//                         <Skeleton className="h-3 w-32" />{" "}
//                       </div>
//                       <Skeleton className="h-6 w-26 rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if ((error && !typedBalanceDetail && !isBalanceLoading) || (!isPageLoading && !typedBalanceDetail)) {
//      const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
//         return (
//           <>
//             <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 sm:p-10 p-4 flex sm:flex-col sm:items-center justify-center gap-3 rounded-lg ">
//               <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//                 <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//               </div>
//               <div className="flex flex-col sm:items-center w-full">
//                 <p className="font-semibold text-red-800 dark:text-red-200">
//                   {" "}
//                   Error Loading Balance{" "}
//                 </p>
//                 <p className="text-sm text-red-700 dark:text-red-300/90 mt-1">
//                   {" "}
//                   {message}{" "}
//                 </p>
//               </div>
//             </div>
//             <div className="text-center">
//               <button
//                 onClick={handleBackClick}
//                 className="mt-6 inline-flex font-medium cursor-pointer bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
//               >
//                 Go Back
//               </button>
//             </div>
//           </>
//         );
//     }

//    if (!typedBalanceDetail) {
//         console.error("Invariant violation: Reached main render but typedBalanceDetail is null/undefined despite passing loading/error checks.");
//             return (
//                 <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//                      <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">Something went wrong. Balance details are unavailable.</p>
//                      <button onClick={handleBackClick} className="inline-flex font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer">Go Back</button>
//                 </div>
//             );
//    }

//   const showNoMatchEmptyState =
//     !isTransactionsLoading &&
//     displayTransactions.length === 0 &&
//     !initiallyEmpty &&
//     filtersOrSearchAreActive;

//   return (
//     <div className="py-5">
//       <BalanceHeader
//         balanceDetail={typedBalanceDetail}
//         isLoading={isBalanceLoading}
//         onSendClick={handleSendClick}
//         onAddMoneyClick={handleAddMoneyClick}
//         canSendMoney={hasSufficientFunds}
//         marketRateAgainstINR={marketRateAgainstINR}
//         ourRateAgainstINR={ourRateAgainstINR}
//       />

//       <div className="mt-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
//           <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//             Transactions
//           </h3>
//           {(!initiallyEmpty || isTransactionsLoading) && (
//             <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//               <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
//               <button
//                 className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-40 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleOpenFilterModal}
//                 aria-haspopup="dialog"
//                 disabled={
//                   isTransactionsLoading ||
//                   (initiallyEmpty && !filtersOrSearchAreActive)
//                 }
//               >
//                 <LuSettings2 size={20} />
//                 <span className="md:block hidden">Filters</span>
//               </button>
//             </div>
//           )}
//         </div>

//         <TransactionList
//           transactions={displayTransactions}
//           isLoading={isTransactionsLoading}
//           error={
//             typeof error === "string" &&
//             (error.includes("payment history") ||
//               error.includes("transfer history"))
//               ? error
//               : null
//           }
//           currencyCode={currencyCode}
//           balanceId={balanceId!}
//           onSendClick={handleSendClick}
//           onAddMoneyClick={handleAddMoneyClick}
//           canSendMoney={hasSufficientFunds}
//           wasInitiallyEmpty={initiallyEmpty}
//         />

//         {showNoMatchEmptyState && (
//           <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg space-y-4   ">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full">
//               <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>

//             <span className="text-gray-500 dark:text-gray-300">
//               No transactions match your current filter or search criteria.
//             </span>

//             <Button
//               onClick={clearAllFiltersAndSearch}
//               className="px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//             >
//               Clear Filters
//             </Button>
//           </div>
//         )}
//       </div>

//       <InsufficientBalanceModal
//         isOpen={isInsufficientBalanceModalOpen}
//         onClose={handleCloseInsufficientBalanceModal}
//         onAddMoney={handleAddMoneyFromInsufficientModal}
//         currencyCode={currencyCode}
//       />
//       <KycRequiredModal
//         isOpen={isKycModalOpen}
//         onClose={handleCloseKycModal}
//         onStartVerification={handleStartVerification}
//       />

//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={handleCloseFilterModal}
//         userAccounts={[]}
//         onFiltersApply={handleFiltersApply}
//         initialFilters={activeFilters}
//       />
//     </div>
//   );
// };

// export default BalanceDetailPage;




// app/(website)/components/BalanceDetailPage/index.tsx
"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Hooks and Services
import { useAuth } from "../../../contexts/AuthContext";
import { useBalanceDetailData } from "../../../hooks/useBalanceDetailData";
import { parseISO } from "date-fns";
import exchangeRateService from "../../../services/exchangeRate";

// Components and Types
import BalanceHeader from "../../components/BalanceHeader";
import Search from "../../components/TransactionPageSection/Search";
import TransactionList from "../../components/TransactionList";
import InsufficientBalanceModal from "../../components/InsufficientBalanceModal";
import KycRequiredModal from "../../components/KycRequiredModal";
import FilterModal, {
  AppliedFilters,
} from "../../components/TransactionPageSection/FilterModal";
import { Transaction } from "@/types/transaction";
import { BalanceDetail } from "../../../../types/balance";
import { Currency } from "../../../../types/currency";
import { Account } from "@/types/account"; // Import Account if needed for FilterModal
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { KycStatus } from "@/app/services/kyc";
import { LuSettings2 } from "react-icons/lu";
import { AlertTriangle, Inbox } from "lucide-react";

// --- Interfaces ---
interface BalanceDetailPageParams extends Record<string, string | string[]> {
  balanceId: string;
}
// Adjusted interface to match the scraped data structure { [currencyCode: string]: number }
interface ExchangeRateApiResponse {
  rates?: { [currencyCode: string]: number }; // Expecting only 'rates' now, no 'base' needed
}
interface ExtendedCurrency extends Currency {
  rateAdjustmentPercentage?: number;
}
interface ExtendedBalanceDetail extends BalanceDetail {
  currency: ExtendedCurrency;
}

// --- Utility Function --- (Keep the robust parseDateString)
function parseDateString(dateString: string | undefined): Date | null {
  // ... (parseDateString function remains unchanged) ...
   if (!dateString) return null;
   try {
     const isoDate = parseISO(dateString);
     if (!isNaN(isoDate.getTime())) {
       return isoDate;
     }
   } catch (e) {}
   const parts = dateString.split("-");
   if (parts.length === 3) {
     const day = parseInt(parts[0], 10);
     const month = parseInt(parts[1], 10) - 1;
     const year = parseInt(parts[2], 10);
     if (
       !isNaN(day) &&
       !isNaN(month) &&
       !isNaN(year) &&
       month >= 0 &&
       month <= 11 &&
       day >= 1 &&
       day <= 31
     ) {
       const date = new Date(Date.UTC(year, month, day));
       if (
         date.getUTCFullYear() === year &&
         date.getUTCMonth() === month &&
         date.getUTCDate() === day
       ) {
         return date;
       }
     }
   }
   try {
     const genericDate = new Date(dateString);
     if (!isNaN(genericDate.getTime())) {
       return genericDate;
     }
   } catch (e) {}
   console.warn(
     "Could not parse date string into a valid Date object:",
     dateString
   );
   return null;
}

// --- Component ---
const BalanceDetailPage = () => {
  const params = useParams<BalanceDetailPageParams>();
  const router = useRouter();
  const { balanceId } = params;
  const { token, user, loading: authLoading } = useAuth();
  const kycStatus: KycStatus | undefined = user?.kyc.status;

  // --- Data Fetching ---
  const {
    balanceDetail,
    balanceSpecificTransactions,
    isLoading: isBalanceLoading,
    isTransactionsLoading,
    error,
  } = useBalanceDetailData(balanceId);

  // --- State ---
  const [displayTransactions, setDisplayTransactions] = useState<Transaction[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
    selectedRecipients: [],
    selectedDirection: "all",
    selectedStatus: null,
    selectedBalance: [], // This filter likely applies at the data source level, review if needed
    fromDate: "",
    toDate: "",
  });
  const [isInsufficientBalanceModalOpen, setIsInsufficientBalanceModalOpen] =
    useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // State for rates against INR
  const [marketRateAgainstINR, setMarketRateAgainstINR] = useState<
    number | null
  >(null);
  const [ourRateAgainstINR, setOurRateAgainstINR] = useState<number | null>(
    null
  );

  const [initiallyEmpty, setInitiallyEmpty] = useState<boolean>(false);

  // --- Derived State ---
  const typedBalanceDetail = balanceDetail as ExtendedBalanceDetail | null;
  const hasSufficientFunds = useMemo(
    () => (typedBalanceDetail?.balance ?? 0) > 0,
    [typedBalanceDetail]
  );
  const currencyCode = useMemo(
    () => typedBalanceDetail?.currency?.code ?? "N/A",
    [typedBalanceDetail]
  );

  // --- Effects ---

  // Effect to check if transactions were initially empty
  useEffect(() => {
    // Only set initiallyEmpty once balanceSpecificTransactions is first loaded and not empty
    if (!isTransactionsLoading && balanceSpecificTransactions && !initiallyEmpty) {
      if (balanceSpecificTransactions.length === 0) {
          setInitiallyEmpty(true);
      }
    }
     // Also reset if balanceSpecificTransactions becomes null/undefined (e.g., error state or refetch)
    if (!balanceSpecificTransactions && !isTransactionsLoading && initiallyEmpty) {
         setInitiallyEmpty(false);
    }

  }, [
    isTransactionsLoading,
    balanceSpecificTransactions,
    initiallyEmpty // Keep this dependency to avoid infinite loop if logic changes
  ]);


  // Effect for filtering and searching transactions
  useEffect(() => {
     console.log("Transaction filtering effect running...");
    if (isTransactionsLoading) {
        console.log("Filtering skipped: Transactions still loading.");
        setDisplayTransactions([]); // Clear display while loading or if data isn't ready
        return;
    }
    if (!balanceSpecificTransactions) {
         console.log("Filtering skipped: balanceSpecificTransactions is null/undefined.");
         setDisplayTransactions([]);
         return;
    }

    let results = [...balanceSpecificTransactions];

    // Apply Search Term
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      results = results.filter((tx) => {
        const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
        const descriptionMatches =
          typeof tx.description === "string" &&
          tx.description.toLowerCase().includes(searchTermLower);
        const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
        const statusMatches = tx.status
          ?.toLowerCase()
          .includes(searchTermLower);
        const recipientNameMatch =
          typeof tx.recipient === "object" &&
          tx.recipient?.accountHolderName
            ?.toLowerCase()
            .includes(searchTermLower);
        let currencyMatch = false;
         // Check relevant currency fields based on transaction type
        if (tx.type === "Add Money") {
          currencyMatch =
            (typeof tx.balanceCurrency === "object" && tx.balanceCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
            (typeof tx.payInCurrency === "object" && tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower));
        } else if (tx.type === "Send Money") {
          currencyMatch =
            (typeof tx.sendCurrency === "object" && tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
            (typeof tx.receiveCurrency === "object" && tx.receiveCurrency?.code?.toLowerCase().includes(searchTermLower));
        } else { // Handle other potential transaction types if needed
             currencyMatch = false; // Assume no currency match for unknown types
        }

        return (
          nameMatches ||
          descriptionMatches ||
          typeMatches ||
          statusMatches ||
          recipientNameMatch ||
          currencyMatch
        );
      });
    }

    // Apply Filters
    const filters = activeFilters;

    // Direction Filter
    const direction = filters.selectedDirection;
    if (direction !== "all") {
      results = results.filter(
        (tx) =>
          (direction === "add" && tx.type === "Add Money") ||
          (direction === "send" && tx.type === "Send Money")
      );
    }

    // Status Filter
    const statusFilter = filters.selectedStatus?.toLowerCase();
    if (statusFilter) {
      results = results.filter((tx) => {
        const txStatus = tx.status?.toLowerCase(); // Ensure transaction status is also lower case
        if (!txStatus) return false; // Skip if status is null or undefined
        if (statusFilter === "completed") return txStatus === "completed";
        if (statusFilter === "cancelled") return txStatus === "canceled"; // Note the 'canceled' spelling from your backend
        if (statusFilter === "in progress")
          return txStatus === "in progress" || txStatus === "pending";
        if (statusFilter === "failed") return txStatus === "failed";
        return false; // Return false for unknown statusFilter values
      });
    }

    // Recipient Filter
    const recipientFilters = filters.selectedRecipients;
    if (recipientFilters && recipientFilters.length > 0) {
      const recipientFilterIds = recipientFilters.map(String); // Ensure filter IDs are strings
      results = results.filter((tx) => {
        if (tx.type !== "Send Money") return true; // Only filter 'Send Money' types by recipient
        const recipientId =
          typeof tx.recipient === "object" && tx.recipient?._id
            ? String(tx.recipient._id) // Handle object recipient with _id
            : typeof tx.recipient === "string" // Handle string recipient (maybe just the ID?)
            ? tx.recipient
            : null; // No recipient found

        return recipientId ? recipientFilterIds.includes(recipientId) : false; // Include if recipientId matches one of the filters
      });
    }

    // Date Range Filter
    const fromDateObj = parseDateString(filters.fromDate || undefined);
    const toDateObj = parseDateString(filters.toDate || undefined);

    // Adjust to start/end of day in UTC
    if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
    if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

    if (fromDateObj || toDateObj) {
      results = results.filter((tx) => {
        // Use updatedAt or createdAt, prioritize updatedAt if it exists
        const transactionDateStr = tx.updatedAt || tx.createdAt;
        if (!transactionDateStr) return false; // Transaction must have a date

        try {
          // Ensure parsing dates consistently, assuming backend provides ISO strings or similar
          const transactionDateObj = new Date(transactionDateStr);

          if (isNaN(transactionDateObj.getTime())) {
              console.warn("Invalid date for transaction:", transactionDateStr);
              return false; // Exclude transactions with invalid dates
          }

          let include = true;
          // Check if the transaction date is within the specified range (inclusive)
          if (fromDateObj && transactionDateObj < fromDateObj) include = false;
          if (toDateObj && transactionDateObj > toDateObj) include = false;

          return include;
        } catch (e) {
          console.warn(
            "Error parsing transaction date for filter:",
            transactionDateStr,
            e
          );
          return false; // Exclude transactions that cause parsing errors
        }
      });
    }

    // Finally, update the displayed transactions
    console.log(`Filtered transactions: ${results.length} results.`);
    setDisplayTransactions(results);

  }, [
    balanceSpecificTransactions,
    searchTerm,
    activeFilters,
    isTransactionsLoading, // Re-run when loading state changes (data becomes available)
    // Removed displayTransactions.length as a dependency here to prevent potential loops
  ]);


  // Effect to fetch and calculate rates against INR
  useEffect(() => {
      console.log("Fetching rates effect triggered.");
    // Only fetch and calculate if balanceDetail is available and the currency is not INR
    if (
      !typedBalanceDetail ||
      !currencyCode ||
      currencyCode === "N/A" ||
      currencyCode === "INR"
    ) {
        console.log("Rates fetch skipped: Balance detail unavailable or currency is INR.");
        // Reset rates if conditions are not met
        setMarketRateAgainstINR(null);
        setOurRateAgainstINR(null);
        return;
    }

    const fetchRatesAgainstINR = async () => {
        console.log(`Fetching rates against INR for ${currencyCode}...`);
      try {
        // This service call now fetches rates scraped from Google Finance against INR
        const ratesData: ExchangeRateApiResponse =
          await exchangeRateService.getExchangeRatesForCurrencies();
        const liveRates = ratesData?.rates; // Get the rates object

        // --- MODIFIED RATE CALCULATION ---
        // The scraped rate is already CURRENCY_CODE/INR
        const marketRateForCurrency = liveRates ? liveRates[currencyCode] : undefined;

        if (marketRateForCurrency === undefined || marketRateForCurrency === null || isNaN(marketRateForCurrency) || marketRateForCurrency <= 0) {
          // Handle cases where the rate for the specific currency is missing or invalid
          console.warn(
            `Could not find a valid market rate for ${currencyCode} in fetched rates.`,
            liveRates
          );
          setMarketRateAgainstINR(null);
          setOurRateAgainstINR(null);
          return; // Stop here if the market rate is invalid
        }

        // The scraped rate is the market rate
        setMarketRateAgainstINR(marketRateForCurrency);

        // Find the adjustment percentage for this currency from the balance detail
        const adjustmentPercent =
          typeof typedBalanceDetail.currency.rateAdjustmentPercentage ===
          "number"
            ? typedBalanceDetail.currency.rateAdjustmentPercentage
            : 0;

        // Calculate 'Our Rate' including the adjustment
        const adjustedRateMultiplier = 1 + adjustmentPercent / 100;
        const ourRateToINR = marketRateForCurrency * adjustedRateMultiplier;

        setOurRateAgainstINR(ourRateToINR);
        console.log(`Rates calculated for ${currencyCode}/INR: Market=${marketRateForCurrency.toFixed(4)}, Our=${ourRateToINR.toFixed(4)}, Adjustment=${adjustmentPercent}%`);

      } catch (error) {
        console.error("Error fetching/calculating rates:", error);
        setMarketRateAgainstINR(null);
        setOurRateAgainstINR(null);
      }
    };

    // Fetch rates only if the currencyCode is set and not INR
    if(currencyCode && currencyCode !== 'N/A' && currencyCode !== 'INR') {
         fetchRatesAgainstINR();
    }


  }, [typedBalanceDetail, currencyCode]); // Dependencies: re-run if balance detail or currency changes

  // --- Handlers ---

  const handleFiltersApply = useCallback((filters: AppliedFilters) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
    setIsFilterModalOpen(false);
  }, []);

  const filtersOrSearchAreActive = useMemo(() => {
    const isFilterActive =
      activeFilters.selectedRecipients.length > 0 ||
      activeFilters.selectedDirection !== "all" ||
      activeFilters.selectedStatus !== null ||
      activeFilters.fromDate !== "" ||
      activeFilters.toDate !== "";
    const isSearchActive = searchTerm.trim() !== "";
    return isFilterActive || isSearchActive;
  }, [activeFilters, searchTerm]);

  const handleOpenKycModal = useCallback(() => setIsKycModalOpen(true), []);
  const handleCloseKycModal = useCallback(() => setIsKycModalOpen(false), []);
  const handleStartVerification = useCallback(() => {
    router.push("/kyc/start");
    handleCloseKycModal();
  }, [router, handleCloseKycModal]);

  const handleOpenInsufficientBalanceModal = useCallback(
    () => setIsInsufficientBalanceModalOpen(true),
    []
  );
  const handleCloseInsufficientBalanceModal = useCallback(
    () => setIsInsufficientBalanceModalOpen(false),
    []
  );

  const handleAddMoneyFromInsufficientModal = useCallback(() => {
    if (authLoading || !user) return;
    if (kycStatus !== "verified") {
      handleCloseInsufficientBalanceModal();
      handleOpenKycModal();
      return;
    }
    router.push(`/dashboard/balances/${balanceId}/add-money`);
    handleCloseInsufficientBalanceModal();
  }, [
    authLoading,
    user,
    kycStatus,
    balanceId,
    router,
    handleCloseInsufficientBalanceModal,
    handleOpenKycModal,
  ]);

  const handleAddMoneyClick = useCallback(() => {
    if (authLoading || !user) return;
    if (kycStatus !== "verified") {
      handleOpenKycModal();
    } else {
      router.push(`/dashboard/balances/${balanceId}/add-money`);
    }
  }, [kycStatus, authLoading, user, balanceId, router, handleOpenKycModal]);


  const handleSendClick = useCallback(() => {
      console.log("Send button clicked. Checking KYC and balance...");
    if (authLoading || !user) {
         console.log("Send click skipped: Auth loading or no user.");
         return; // Cannot proceed if auth is loading or user is not logged in
    }
    // Check KYC Status first
    if (kycStatus !== "verified") {
         console.log("Send click: KYC not verified. Opening KYC modal.");
         handleOpenKycModal();
         return; // Stop processing if KYC is required
    }
    // KYC is verified, now check balance
    if (hasSufficientFunds) {
         console.log("Send click: KYC verified and sufficient funds. Navigating to select recipient.");
      router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
    } else {
         console.log("Send click: KYC verified but insufficient funds. Opening insufficient balance modal.");
      handleOpenInsufficientBalanceModal();
    }
  }, [
    kycStatus,
    hasSufficientFunds,
    authLoading,
    user,
    balanceId,
    router,
    handleOpenKycModal,
    handleOpenInsufficientBalanceModal,
  ]);


  const handleBackClick = () => router.back();
  const handleOpenFilterModal = () => setIsFilterModalOpen(true);
  const handleCloseFilterModal = () => setIsFilterModalOpen(false);
  const clearAllFiltersAndSearch = () => {
    setActiveFilters({
      selectedRecipients: [],
      selectedDirection: "all",
      selectedStatus: null,
      selectedBalance: [],
      fromDate: "",
      toDate: "",
    });
    setSearchTerm("");
  };

  const isPageLoading = isBalanceLoading || authLoading; // Combined loading state

  // --- Conditional Renderings ---

  // Skeleton Loader
  if (isPageLoading && !typedBalanceDetail && !error) {
      console.log("Rendering Skeleton Loader...");
    return (
      <div className="">
        <div className="pb-6 mb-8 border-b">
          <div className="flex sm:flex-row flex-col gap-4 justify-between">
            <div>
              <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
              <div className="flex sm:flex-row flex-col items-center gap-4">
                <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
                <Skeleton className="h-8 w-64 mb-4 rounded-4xl" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center sm:items-end">
              <div className="flex justify-center space-x-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex flex-col items-center">
                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
            <Skeleton className="h-8 w-48 rounded-md" />
            <div className="flex items-center gap-4 w-full md:w-auto md:justify-end">
              <Skeleton className="h-12.5 w-full sm:w-68 rounded-full" />
              <Skeleton className="h-12.5 w-36 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="block p-2 sm:p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Skeleton className="size-12 rounded-full flex-shrink-0" />
                    <div className="flex-grow flex flex-row justify-between items-center gap-4">
                      <div className="flex-grow">
                        <Skeleton className="h-4 w-40 mb-2" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-6 w-26 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
         {/* Removed duplicate skeleton block here */}
      </div>
    );
  }

  // Error State
  if ((error && !typedBalanceDetail) || (!isPageLoading && !typedBalanceDetail)) {
       console.error("Rendering Error State:", error);
     const message = typeof error === 'string' ? error : "Balance details not found or you may not have access.";
        return (
          <> {/* Wrap error state in py-5 for consistent spacing */}
             <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 sm:p-10 p-4 flex sm:flex-col sm:items-center justify-center gap-3 rounded-lg ">
               <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
                 <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
               </div>
               <div className="flex flex-col sm:items-center w-full">
                 <p className="font-semibold text-red-800 dark:text-red-200">
                   Error Loading Balance
                 </p>
                 <p className="text-sm text-red-700 dark:text-red-300/90 mt-1">
                   {message}
                 </p>
               </div>
             </div>
             <div className="text-center">
               <button
                 onClick={handleBackClick}
                 className="mt-6 inline-flex font-medium cursor-pointer bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
               >
                 Go Back
               </button>
             </div>
          </>
        );
    }

    // If we reach here, typedBalanceDetail should be available
   if (!typedBalanceDetail) {
        // This is a safeguard, should theoretically not be reached after the checks above
        console.error("Invariant violation: Balance detail is unexpectedly null/undefined in main render.");
            return (
                <div className="py-5"> {/* Wrap safeguard in py-5 */}
                   <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
                        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">Something went wrong. Balance details are unavailable.</p>
                        <button onClick={handleBackClick} className="inline-flex font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer">Go Back</button>
                   </div>
                </div>
            );
   }


   // Content Render
  const showNoMatchEmptyState =
    !isTransactionsLoading &&
    displayTransactions.length === 0 && // No transactions currently displayed
    !initiallyEmpty && // Transactions were NOT initially empty
    filtersOrSearchAreActive; // Filters or search are applied


  return (
    <>
      <BalanceHeader
        balanceDetail={typedBalanceDetail}
        isLoading={isBalanceLoading}
        onSendClick={handleSendClick}
        onAddMoneyClick={handleAddMoneyClick}
        canSendMoney={hasSufficientFunds} // Pass sufficient funds status
        marketRateAgainstINR={marketRateAgainstINR} // Pass calculated market rate
        ourRateAgainstINR={ourRateAgainstINR} // Pass calculated our rate
      />

      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-background dark:bg-background">
          <h3 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
            Transactions
          </h3>
           {/* Only show search/filter if not initially empty OR if transactions are loading */}
           {/* This prevents showing search/filter on an empty balance page with no history */}
          {(!initiallyEmpty || isTransactionsLoading) && (
            <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
              <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <button
                className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-40 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleOpenFilterModal}
                aria-haspopup="dialog"
                // Disable filter button if loading, or if initially empty and no filters/search are active yet
                disabled={
                  isTransactionsLoading ||
                  (initiallyEmpty && !filtersOrSearchAreActive)
                }
              >
                <LuSettings2 size={20} />
                <span className="md:block hidden">Filters</span>
              </button>
            </div>
          )}
        </div>

         {/* Transaction List */}
         <TransactionList
            transactions={displayTransactions}
            isLoading={isTransactionsLoading}
            // Pass a more specific error message if needed for the list itself
            error={
                (typeof error === 'string' && (error.includes("payment history") || error.includes("transfer history")))
                ? "Failed to load transactions." // Generic user-friendly error for transaction list
                : null // No transaction specific error, handled by main error state if balance detail fails
            }
            currencyCode={currencyCode}
            balanceId={balanceId!}
            // Pass down handlers needed by the list (e.g., for empty states)
            onSendClick={handleSendClick}
            onAddMoneyClick={handleAddMoneyClick}
            canSendMoney={hasSufficientFunds}
            wasInitiallyEmpty={initiallyEmpty} // Indicate if there were initially no transactions
         />


        {/* "No Transactions Match Filters" Empty State */}
        {showNoMatchEmptyState && (
          <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg space-y-4">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full">
              <Inbox className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
            </div>
            <span className="text-gray-500 dark:text-gray-300">
              No transactions match your current filter or search criteria.
            </span>
            <Button
              onClick={clearAllFiltersAndSearch}
              className="px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
            >
              Clear Filters
            </Button>
          </div>
        )}

         {/* Modals */}
      <InsufficientBalanceModal
        isOpen={isInsufficientBalanceModalOpen}
        onClose={handleCloseInsufficientBalanceModal}
        onAddMoney={handleAddMoneyFromInsufficientModal}
        currencyCode={currencyCode}
      />
      <KycRequiredModal
        isOpen={isKycModalOpen}
        onClose={handleCloseKycModal}
        onStartVerification={handleStartVerification}
      />
      {/* Pass necessary props to FilterModal, including userAccounts if you use them for recipient filtering */}
       <FilterModal
         isOpen={isFilterModalOpen}
         onClose={handleCloseFilterModal}
         userAccounts={[]}
         onFiltersApply={handleFiltersApply}
         initialFilters={activeFilters}
       />

      </div>
    </>
  );
};

export default BalanceDetailPage;