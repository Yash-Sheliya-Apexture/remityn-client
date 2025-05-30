// // components/TransactionsSection.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// const TransactionsSection: React.FC = () => {
//   // Sort all transactions by date in descending order
//   const sortedTransactions = [...defaultTransactions].sort((a, b) => {
//     const dateA = a.processedDate ? new Date(a.processedDate) : new Date(a.date || "");
//     const dateB = b.processedDate ? new Date(b.processedDate) : new Date(b.date || "");
//     return dateB.getTime() - dateA.getTime();
//   });

//   // Get the latest 3 transactions
//   const latestTransactions = sortedTransactions.slice(0, 3);

//   return (
//     <section className="Transactions py-12">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//           <Link
//             href="dashboard/transactions"
//             className="text-secondary font-medium underline cursor-pointer"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Latest 3 Transaction History */}
//         <div className="space-y-2">
//           {latestTransactions.map((transaction) => {
//             let description = transaction.description;
//             if (transaction.type === "Add Money") {
//               description = transaction.status === "completed" ? "Added by you" : "Waiting for your money";
//             } else if (transaction.type === "Send Money") {
//               description = transaction.status === "completed" ? "Sent by you" : "Sending your money";
//             }
//             return (
//               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                     {transaction.type === "Add Money" ? (
//                       <LuPlus size={24} className="text-main" />
//                     ) : (
//                       <GoArrowUp size={24} className="text-main" />
//                     )}
//                   </div>
//                   <div className="flex justify-between w-full">
//                     <div>
//                       <h3 className="font-medium text-main">
//                         {transaction.type === "Add Money"
//                           ? `To your ${transaction.currency} balance`
//                           : transaction.name}
//                       </h3>
//                       <p className="text-sm text-gray-500">{description}</p>
//                     </div>
//                     <div
//                       className={`font-medium ${transaction.type === "Add Money" && transaction.status === "completed" ? "text-green-600" : "text-main"}`}
//                     >
//                       {transaction.type === "Add Money" ? "+ " : "- "}
//                       {transaction.amount.toLocaleString(undefined, {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 2,
//                       })}{" "}
//                       {transaction.currency}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client"; // Required for hooks like useState, useEffect, useAuth

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
// import paymentService from "../../../services/payment"; // Adjust path if needed
// import transferService from "../../../services/transfer"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]); // Clear previous data

//     try {
//       // Fetch both payments and transfers concurrently
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//       ]);

//       // Map payments to the common Transaction structure
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money",
//         amountToAdd: payment.amountToAdd, // Amount relevant for display
//         balanceCurrency: payment.balanceCurrency, // For currency code
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: payment.status,
//         // Add other fields from Transaction type if needed, initialized appropriately
//         payInCurrency: payment.payInCurrency,
//         account: payment.account,
//         amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
//       }));

//       // Map transfers to the common Transaction structure
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName
//             : "Recipient", // Use recipient name
//         sendAmount: transfer.sendAmount, // Amount relevant for display
//         sendCurrency: transfer.sendCurrency, // For currency code
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status,
//         recipient: transfer.recipient, // Keep recipient details if needed
//         sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//         // Add other fields from Transaction type if needed
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency,
//       }));

//       // Combine both types of transactions
//       const allTransactions = [...mappedPayments, ...mappedTransfers];

//       // Sort all transactions by date (use updatedAt falling back to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle potentially missing dates
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Put transactions without date last
//         if (!dateB) return -1; // Put transactions without date last
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Get the latest 3 transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: any) {
//       console.error("Failed to fetch transactions:", err);
//       setError(err.message || "Could not load recent transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]); // Dependency: run when token changes

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Run fetch logic

//   // --- Render Helper ---
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? <LuPlus size={24} className="text-main" /> : <GoArrowUp size={24} className="text-main" />;
//     const name = isAddMoney ? `To your ${transaction.balanceCurrency?.code ?? ''} balance` : (transaction.name || "Recipient");

//     let description = transaction.status; // Default description to status
//     if (isAddMoney) {
//         description = transaction.status === "completed" ? "Added by you" :
//                       transaction.status === 'pending' || transaction.status === 'in progress' ? "Waiting for your money" :
//                       transaction.status === 'canceled' ? "Cancelled" :
//                       transaction.status === 'failed' ? "Failed" : "Processing";
//     } else { // Send Money
//          description = transaction.status === "completed" ? "Sent by you" :
//                        transaction.status === 'pending' || transaction.status === 'in progress' || transaction.status === 'processing' ? "Sending your money" :
//                        transaction.status === 'canceled' ? "Cancelled" :
//                        transaction.status === 'failed' ? "Failed" : "Processing";
//     }

//     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//     const currencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-main"; // Default for Send Money or pending Add Money
//     if (isAddMoney && transaction.status === "completed") {
//         amountClass = "text-green-600";
//     } else if (transaction.status === "canceled") {
//         amountClass = "text-red-500 line-through";
//     } else if (transaction.status === "failed") {
//          amountClass = "text-red-500";
//     }

//     return (
//         // Link to the specific transaction detail page
//        <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id}>
//           <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                 {icon}
//               </div>
//               <div className="flex justify-between w-full items-center"> {/* Use items-center */}
//                 <div>
//                   <h3 className="font-medium text-main">{name}</h3>
//                   <p className="text-sm text-gray-500">{description}</p>
//                 </div>
//                 <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                   {amountPrefix}
//                   {amount.toLocaleString(undefined, {
//                     minimumFractionDigits: 2, // Show 2 decimal places
//                     maximumFractionDigits: 2,
//                   })}
//                   {" "}
//                   {currencyCode}
//                 </div>
//               </div>
//             </div>
//           </div>
//        </Link>
//     );
//   };

//   return (
//     <section className="Transactions py-10"> {/* Adjusted padding */}
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
//           <h1 className="text-2xl font-semibold text-main">Recent Transactions</h1> {/* Adjusted size */}
//           <Link
//             href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
//             className="text-secondary font-medium underline cursor-pointer hover:text-secondary/80"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction History */}
//         <div className="space-y-2">
//           {loading && <p className="text-center text-gray-500 py-4">Loading transactions...</p>}
//           {!loading && error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
//           )}
//           {!loading && !error && latestTransactions.length > 0 && (
//             latestTransactions.map(renderTransactionRow)
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client"; // Required for hooks like useState, useEffect, useAuth

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
// import paymentService from "../../../services/payment"; // Adjust path if needed
// import transferService from "../../../services/transfer"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]); // Clear previous data

//     try {
//       // Fetch both payments and transfers concurrently
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//       ]);

//       // Map payments to the common Transaction structure
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money",
//         amountToAdd: payment.amountToAdd, // Amount relevant for display
//         balanceCurrency: payment.balanceCurrency, // For currency code
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: payment.status,
//         // Add other fields from Transaction type if needed, initialized appropriately
//         payInCurrency: payment.payInCurrency,
//         account: payment.account,
//         amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
//       }));

//       // Map transfers to the common Transaction structure
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName
//             : "Recipient", // Use recipient name
//         sendAmount: transfer.sendAmount, // Amount relevant for display
//         sendCurrency: transfer.sendCurrency, // For currency code
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status,
//         recipient: transfer.recipient, // Keep recipient details if needed
//         sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//         // Add other fields from Transaction type if needed
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency,
//       }));

//       // Combine both types of transactions
//       const allTransactions = [...mappedPayments, ...mappedTransfers];

//       // Sort all transactions by date (use updatedAt falling back to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle potentially missing dates
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Put transactions without date last
//         if (!dateB) return -1; // Put transactions without date last
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Get the latest 3 transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: any) {
//       console.error("Failed to fetch transactions:", err);
//       setError(err.message || "Could not load recent transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]); // Dependency: run when token changes

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Run fetch logic

//   // --- Render Helper ---
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? <LuPlus size={24} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />;
//     const name = isAddMoney ? `To your ${transaction.balanceCurrency?.code ?? ''} balance` : (transaction.name || "Recipient");

//     let description = transaction.status; // Default description to status
//     if (isAddMoney) {
//         description = transaction.status === "completed" ? "Added by you" :
//                       transaction.status === 'pending' || transaction.status === 'in progress' ? "Waiting for your money" :
//                       transaction.status === 'canceled' ? "Cancelled" :
//                       transaction.status === 'failed' ? "Failed" : "Processing";
//     } else { // Send Money
//          description = transaction.status === "completed" ? "Sent by you" :
//                        transaction.status === 'pending' || transaction.status === 'in progress' || transaction.status === 'processing' ? "Sending your money" :
//                        transaction.status === 'canceled' ? "Cancelled" :
//                        transaction.status === 'failed' ? "Failed" : "Processing";
//     }

//     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//     const currencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-neutral-900  dark:text-white"; // Default for Send Money or pending Add Money
//     if (isAddMoney && transaction.status === "completed") {
//         amountClass = "text-green-600 dark:text-green-500";
//     } else if (transaction.status === "canceled") {
//         amountClass = "text-red-600 line-through";
//     } else if (transaction.status === "failed") {
//          amountClass = "text-red-600 line-through";
//     }

//     return (
//       // Link to the specific transaction detail page

//       <Link
//         href={`/dashboard/transactions/${transaction._id}`}
//         key={transaction._id}
//         className="block"
//       >
//         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//               {icon}
//             </div>
//             <div className="flex justify-between w-full items-center">
//               {" "}
//               {/* Use items-center */}
//               <div>
//                 <h3 className="font-medium text-neutral-900 dark:text-white text-sm md:text-base">{name}</h3>
//                 <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">{description} <span className="italic">({transaction.status})</span></p>
//               </div>
//               <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
//                 {amountPrefix}
//                 {amount.toLocaleString(undefined, {
//                   minimumFractionDigits: 2, // Show 2 decimal places
//                   maximumFractionDigits: 2,
//                 })}{" "}
//                 {currencyCode}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <section className="Transactions py-10"> {/* Adjusted padding */}
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Recent Transactions</h1> {/* Adjusted size */}
//           <Link
//             href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
//             className="text-primary font-medium underline cursor-pointer hover:text-primaryhover transition-all duration-75 ease-linear"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction History */}
//         <div className="space-y-2">
//           {loading && <p className="text-center text-gray-500 dark:text-gray-300 py-4">Loading transactions...</p>}
//           {!loading && error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
//           )}
//           {!loading && !error && latestTransactions.length > 0 && (
//             latestTransactions.map(renderTransactionRow)
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client"; // Required for hooks like useState, useEffect, useAuth

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if needed
// import paymentService from "../../../services/payment"; // Adjust path if needed
// import transferService from "../../../services/transfer"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton" // Assuming Skeleton is in "@/components/ui/skeleton" or adjust path accordingly.

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]); // Clear previous data

//     try {
//       // Fetch both payments and transfers concurrently
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//       ]);

//       // Map payments to the common Transaction structure
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money",
//         amountToAdd: payment.amountToAdd, // Amount relevant for display
//         balanceCurrency: payment.balanceCurrency, // For currency code
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: payment.status,
//         // Add other fields from Transaction type if needed, initialized appropriately
//         payInCurrency: payment.payInCurrency,
//         account: payment.account,
//         amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
//       }));

//       // Map transfers to the common Transaction structure
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName
//             : "Recipient", // Use recipient name
//         sendAmount: transfer.sendAmount, // Amount relevant for display
//         sendCurrency: transfer.sendCurrency, // For currency code
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status,
//         recipient: transfer.recipient, // Keep recipient details if needed
//         sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//         // Add other fields from Transaction type if needed
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency,
//       }));

//       // Combine both types of transactions
//       const allTransactions = [...mappedPayments, ...mappedTransfers];

//       // Sort all transactions by date (use updatedAt falling back to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle potentially missing dates
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Put transactions without date last
//         if (!dateB) return -1; // Put transactions without date last
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Get the latest 3 transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: any) {
//       console.error("Failed to fetch transactions:", err);
//       setError(err.message || "Could not load recent transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]); // Dependency: run when token changes

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Run fetch logic

//   // --- Render Helper ---
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? <LuPlus size={24} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />;
//     const name = isAddMoney ? `To your ${transaction.balanceCurrency?.code ?? ''} balance` : (transaction.name || "Recipient");

//     let description = transaction.status; // Default description to status
//     if (isAddMoney) {
//         description = transaction.status === "completed" ? "Added by you" :
//                       transaction.status === 'pending' || transaction.status === 'in progress' ? "Waiting for your money" :
//                       transaction.status === 'canceled' ? "Cancelled" :
//                       transaction.status === 'failed' ? "Failed" : "Processing";
//     } else { // Send Money
//          description = transaction.status === "completed" ? "Sent by you" :
//                        transaction.status === 'pending' || transaction.status === 'in progress' || transaction.status === 'processing' ? "Sending your money" :
//                        transaction.status === 'canceled' ? "Cancelled" :
//                        transaction.status === 'failed' ? "Failed" : "Processing";
//     }

//     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//     const currencyCode = isAddMoney ? (transaction.balanceCurrency?.code ?? '') : (transaction.sendCurrency?.code ?? '');
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-neutral-900  dark:text-white"; // Default for Send Money or pending Add Money
//     if (isAddMoney && transaction.status === "completed") {
//         amountClass = "text-green-600 dark:text-green-500";
//     } else if (transaction.status === "canceled") {
//         amountClass = "text-red-600 line-through";
//     } else if (transaction.status === "failed") {
//          amountClass = "text-red-600 line-through";
//     }

//     return (
//       // Link to the specific transaction detail page

//       <Link
//         href={`/dashboard/transactions/${transaction._id}`}
//         key={transaction._id}
//         className="block"
//       >
//         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//               {icon}
//             </div>
//             <div className="flex justify-between w-full items-center">
//               {" "}
//               {/* Use items-center */}
//               <div>
//                 <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">{name}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{description} <span className="italic">({transaction.status})</span></p>
//               </div>
//               <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                 {amountPrefix}
//                 {amount.toLocaleString(undefined, {
//                   minimumFractionDigits: 2, // Show 2 decimal places
//                   maximumFractionDigits: 2,
//                 })}{" "}
//                 {currencyCode}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <section className="Transactions py-10"> {/* Adjusted padding */}
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">Recent Transactions</h1> {/* Adjusted size */}
//           <Link
//             href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
//             className="text-primary font-medium underline cursor-pointer hover:text-primaryhover transition-all duration-75 ease-linear"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction History */}
//         <div className="space-y-2">
//           {loading && (
//             <div className="space-y-2"> {/* Keep space-y-2 for skeleton spacing */}
//               {Array(3).fill(0).map((_, index) => (
//                 <div key={index} className="block">
//                   <div className="block p-2 sm:p-4 rounded-2xl"> {/* Match padding and rounded corners */}
//                     <div className="flex items-center gap-4"> {/* Match flex layout */}
//                       <div className="flex items-center justify-center"> {/* Match icon container */}
//                         <Skeleton className="h-12 w-12 rounded-full" />
//                       </div>
//                       <div className="flex justify-between w-full items-center"> {/* Match text and amount container */}
//                         <div>
//                           <Skeleton className="h-4 w-40 mb-2" /> {/* Skeleton for name */}
//                           <Skeleton className="h-3 w-32" /> {/* Skeleton for description */}
//                         </div>
//                         <div className="text-right sm:text-left">
//                           <Skeleton className="h-5 w-20" /> {/* Skeleton for amount */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {!loading && error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
//           )}
//           {!loading && !error && latestTransactions.length > 0 && (
//             latestTransactions.map(renderTransactionRow)
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client"; // Required for hooks like useState, useEffect, useAuth

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import paymentService from "../../../services/payment"; // Adjust path if needed
// import transferService from "../../../services/transfer"; // Adjust path if needed
// import { Transaction } from "@/types/transaction"; // Adjust path if needed
// import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton is in "@/components/ui/skeleton" or adjust path accordingly.

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]); // Clear previous data

//     try {
//       // Fetch both payments and transfers concurrently
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//       ]);

//       // Map payments to the common Transaction structure
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money",
//         amountToAdd: payment.amountToAdd, // Amount relevant for display
//         balanceCurrency: payment.balanceCurrency, // For currency code
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: payment.status,
//         // Add other fields from Transaction type if needed, initialized appropriately
//         payInCurrency: payment.payInCurrency,
//         account: payment.account,
//         amountToPay: payment.amountToPay, // Keep if needed elsewhere, but amountToAdd is primary for display
//       }));

//       // Map transfers to the common Transaction structure
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName
//             : "Recipient", // Use recipient name
//         sendAmount: transfer.sendAmount, // Amount relevant for display
//         sendCurrency: transfer.sendCurrency, // For currency code
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status,
//         recipient: transfer.recipient, // Keep recipient details if needed
//         sourceAccountId:
//           typeof transfer.sourceAccount === "string"
//             ? transfer.sourceAccount
//             : transfer.sourceAccount?._id,
//         // Add other fields from Transaction type if needed
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency,
//       }));

//       // Combine both types of transactions
//       const allTransactions = [...mappedPayments, ...mappedTransfers];

//       // Sort all transactions by date (use updatedAt falling back to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle potentially missing dates
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Put transactions without date last
//         if (!dateB) return -1; // Put transactions without date last
//         // Sort descending (newest first)
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       // Get the latest 3 transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));
//     } catch (err: unknown) { // Changed 'any' to 'unknown'
//       console.error("Failed to fetch transactions:", err); // Log the raw error object/value

//       // Determine the error message safely
//       let errorMessage = "Could not load recent transactions."; // Default message
//       if (err instanceof Error) {
//         // If it's an Error object, use its message
//         errorMessage = err.message || errorMessage; // Use error message if available, otherwise default
//       } else if (typeof err === 'string' && err) {
//         // If it's a non-empty string, use it directly
//         errorMessage = err;
//       }
//       // You could add more specific checks here if needed (e.g., for custom error objects)

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]); // Dependency: run when token changes

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Run fetch logic

//   // --- Render Helper ---
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? (
//       <LuPlus size={24} className="text-neutral-900 dark:text-white" />
//     ) : (
//       <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />
//     );
//     const name = isAddMoney
//       ? `To your ${transaction.balanceCurrency?.code ?? ""} balance`
//       : transaction.name || "Recipient";

//     let description = transaction.status; // Default description to status
//     if (isAddMoney) {
//       description =
//         transaction.status === "completed"
//           ? "Added by you"
//           : transaction.status === "pending" ||
//             transaction.status === "in progress"
//           ? "Waiting for your money"
//           : transaction.status === "canceled"
//           ? "Cancelled"
//           : transaction.status === "failed"
//           ? "Failed"
//           : "Processing";
//     } else {
//       // Send Money
//       description =
//         transaction.status === "completed"
//           ? "Sent by you"
//           : transaction.status === "pending" ||
//             transaction.status === "in progress" ||
//             transaction.status === "processing"
//           ? "Sending your money"
//           : transaction.status === "canceled"
//           ? "Cancelled"
//           : transaction.status === "failed"
//           ? "Failed"
//           : "Processing";
//     }

//     const amount = isAddMoney
//       ? transaction.amountToAdd ?? 0
//       : transaction.sendAmount ?? 0;
//     const currencyCode = isAddMoney
//       ? transaction.balanceCurrency?.code ?? ""
//       : transaction.sendCurrency?.code ?? "";
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-neutral-900  dark:text-white"; // Default for Send Money or pending Add Money
//     if (isAddMoney && transaction.status === "completed") {
//       amountClass = "text-green-600 dark:text-green-500";
//     } else if (transaction.status === "canceled") {
//       amountClass = "text-red-600 line-through";
//     } else if (transaction.status === "failed") {
//       amountClass = "text-red-600 line-through";
//     }

//     return (
//       // Link to the specific transaction detail page

//       <Link
//         href={`/dashboard/transactions/${transaction._id}`}
//         key={transaction._id}
//         className="block"
//       >
//         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//               {icon}
//             </div>
//             <div className="flex justify-between w-full items-center">
//               {" "}
//               {/* Use items-center */}
//               <div>
//                 <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                   {name}
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                   {description}{" "}
//                   <span className="italic">({transaction.status})</span>
//                 </p>
//               </div>
//               <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                 {amountPrefix}
//                 {amount.toLocaleString(undefined, {
//                   minimumFractionDigits: 2, // Show 2 decimal places
//                   maximumFractionDigits: 2,
//                 })}{" "}
//                 {currencyCode}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <section className="Transactions py-10"> {/* Adjusted padding */}
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6"> {/* Adjusted margin */}
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//             Recent Transactions
//           </h1> {/* Adjusted size */}
//           <Link
//             href="/dashboard/transactions" // Corrected path assuming it's directly under dashboard
//             className="text-primary font-medium underline cursor-pointer hover:text-primaryhover transition-all duration-75 ease-linear"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction History */}
//         <div className="space-y-2">
//           {loading && (
//             <div className="space-y-2"> {/* Keep space-y-2 for skeleton spacing */}
//               {Array(3)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl"> {/* Match padding and rounded corners */}
//                       <div className="flex items-center gap-4"> {/* Match flex layout */}
//                         <div className="flex items-center justify-center"> {/* Match icon container */}
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                         <div className="flex justify-between w-full items-center"> {/* Match text and amount container */}
//                           <div>
//                             <Skeleton className="h-4 w-40 mb-2" /> {/* Skeleton for name */}
//                             <Skeleton className="h-3 w-32" /> {/* Skeleton for description */}
//                           </div>
//                           <div className="text-right sm:text-left">
//                             <Skeleton className="h-5 w-20" /> {/* Skeleton for amount */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {!loading && error && (
//             <p className="text-center text-red-500 py-4">Error: {error}</p>
//           )}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">
//               No recent transactions found.
//             </p>
//           )}
//           {!loading &&
//             !error &&
//             latestTransactions.length > 0 &&
//             latestTransactions.map(renderTransactionRow)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../contexts/AuthContext";
// // Import the response types from the service files
// import paymentService, { PaymentDetailsResponse } from "../../../services/payment"; // Ensure PaymentDetailsResponse is defined correctly in payment.ts
// import transferService, { TransferDetailsResponse } from "../../../services/transfer";
// // Import the core Transaction type and Currency type
// import { Transaction, Currency, TransactionStatus } from "@/types/transaction";
// import { Skeleton } from "@/components/ui/skeleton";

// // Helper function to create a Currency object from a code (Temporary Solution)
// // TODO: Replace this with actual currency data lookup or ensure API returns full object
// const mapCodeToCurrency = (code: string | undefined): Currency | undefined => {
//   if (!code) return undefined;
//   return {
//     _id: code, // TEMPORARY HACK: Using code as _id. Assumes codes are unique.
//                // Ideally, fetch/lookup the real Currency object with its actual _id.
//     code: code,
//   };
// };

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
//     []
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     // ... (token check, loading state logic remains the same) ...
//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]);

//     try {
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token), // Should return PaymentDetailsResponse[]
//         transferService.getUserTransfers(token), // Should return TransferDetailsResponse[]
//       ]);

//       // --- Map Payments ---
//       const mappedPayments: Transaction[] = paymentsData.map((payment: PaymentDetailsResponse): Transaction => {
//           // Validate required fields from payment response if necessary
//           if (!payment._id || !payment.status || payment.amountToPay === undefined) {
//               console.warn("Skipping incomplete payment data:", payment);
//               // Return null or throw an error, or handle appropriately
//               // For now, let's filter these out later (or return a placeholder if needed)
//               // This example implicitly filters by not pushing anything for invalid data
//           }

//           // Map accountId to the Transaction's account field
//           const transactionAccount = typeof payment.accountId === 'string'
//               ? { _id: payment.accountId } // Create object if only ID is given
//               : payment.account; // Use directly if structure matches { _id: string } | string

//           return {
//               _id: payment._id,
//               type: "Add Money",
//               // Use amountToPay from response for amountToAdd in Transaction
//               // You might want amountToAdd specifically if the API provides it,
//               // otherwise derive from amountToPay. Let's assume amountToAdd = amountToPay here.
//               amountToAdd: payment.amountToPay, // Corrected: Use amountToPay
//               // Map balanceCurrencyCode to balanceCurrency object { _id, code } using helper
//               balanceCurrency: mapCodeToCurrency(payment.balanceCurrencyCode), // Corrected: Use balanceCurrencyCode
//               createdAt: payment.createdAt,
//               updatedAt: payment.updatedAt,
//               // Assert status type
//               status: payment.status as TransactionStatus, // Use TransactionStatus alias
//               // Map payInCurrencyCode to payInCurrency object { _id, code } using helper
//               payInCurrency: mapCodeToCurrency(payment.payInCurrencyCode), // Corrected: Use payInCurrencyCode
//               // Map accountId correctly
//               account: transactionAccount, // Corrected: Use mapped accountId/account
//               amountToPay: payment.amountToPay, // Keep original amountToPay

//               // --- Initialize fields specific to Send Money ---
//               name: undefined,
//               sendAmount: undefined,
//               sendCurrency: undefined,
//               recipient: undefined,
//               sourceAccountId: undefined,
//               receiveAmount: undefined,
//               receiveCurrency: undefined,
//           };
//       });

//       // --- Map Transfers --- (Assuming this part was correct from previous step)
//       const mappedTransfers: Transaction[] = transfersData.map((transfer: TransferDetailsResponse): Transaction => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName ?? "Recipient"
//             : typeof transfer.recipient === 'string'
//             ? "Recipient"
//             : "Recipient",
//         sendAmount: transfer.sendAmount,
//         // Assume transfer response *does* contain full currency objects
//         // If not, apply mapCodeToCurrency or similar logic here too
//         sendCurrency: transfer.sendCurrency as Currency | undefined, // Assert type if needed
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status as TransactionStatus,
//         recipient: transfer.recipient,
//         sourceAccountId:
//           typeof transfer.sourceAccount === "string"
//             ? transfer.sourceAccount
//             : typeof transfer.sourceAccount === 'object' && transfer.sourceAccount !== null
//             ? transfer.sourceAccount._id
//             : undefined,
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency as Currency | undefined, // Assert type if needed

//         // --- Initialize fields specific to Add Money ---
//         amountToAdd: undefined,
//         balanceCurrency: undefined,
//         payInCurrency: undefined,
//         account: undefined,
//         amountToPay: undefined,
//       }));

//       // Combine and sort
//       // Filter out any nulls potentially introduced by validation in mapping
//       const allTransactions = [...mappedPayments, ...mappedTransfers].filter(t => t !== null) as Transaction[];

//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1;
//         if (!dateB) return -1;
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//       });

//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: unknown) {
//        // ... (error handling remains the same) ...
//         console.error("Failed to fetch transactions:", err);
//         let errorMessage = "Could not load recent transactions.";
//         if (err instanceof Error) {
//             errorMessage = err.message || errorMessage;
//         } else if (typeof err === 'string' && err) {
//             errorMessage = err;
//         }
//         setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]);

//   // --- Render Helper --- (renderTransactionRow function remains the same)
//   const renderTransactionRow = (transaction: Transaction) => {
//     // ... (implementation from previous step should be fine) ...
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? (
//       <LuPlus size={24} className="text-neutral-900 dark:text-white" />
//     ) : (
//       <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />
//     );
//     const name = isAddMoney
//       ? `To your ${transaction.balanceCurrency?.code ?? ""} balance`
//       : transaction.name || "Recipient";

//     let description: string;
//     const status = transaction.status;

//     if (isAddMoney) {
//       description =
//         status === "completed"
//           ? "Added by you"
//           : status === "pending" || status === "in progress"
//           ? "Waiting for your money"
//           : status === "canceled"
//           ? "Cancelled"
//           : status === "failed"
//           ? "Failed"
//           : status === "processing"
//           ? "Processing payment"
//           : "Processing";
//     } else { // Send Money
//       description =
//         status === "completed"
//           ? "Sent by you"
//           : status === "pending"
//           ? "Waiting to send"
//           : status === "in progress" || status === "processing"
//           ? "Sending your money"
//           : status === "canceled"
//           ? "Cancelled"
//           : status === "failed"
//           ? "Failed"
//           : "Processing";
//     }

//     const amount = isAddMoney
//       ? transaction.amountToAdd ?? 0
//       : transaction.sendAmount ?? 0;
//     const currencyCode = isAddMoney
//       ? transaction.balanceCurrency?.code ?? ""
//       : transaction.sendCurrency?.code ?? "";
//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-neutral-900 dark:text-white";

//     if (isAddMoney && status === "completed") {
//       amountClass = "text-green-600 dark:text-green-500";
//     } else if (!isAddMoney && status === "completed") {
//       amountClass = "text-neutral-900 dark:text-white";
//     } else if (status === "canceled" || status === "failed") {
//        amountClass = "text-red-600 line-through";
//     } else if (status === 'pending' || status === 'processing' || status === 'in progress') {
//        amountClass = "text-neutral-900 dark:text-white";
//     }

//     return (
//       <Link
//         href={`/dashboard/transactions/${transaction._id}`}
//         key={transaction._id}
//         className="block"
//       >
//         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//               {icon}
//             </div>
//             <div className="flex justify-between w-full items-center">
//               <div>
//                 <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                   {name}
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                   {description}
//                   {(status === 'processing' || status === 'pending' || status === 'in progress') && (
//                      <span className="italic text-xs"> ({status})</span>
//                   )}
//                 </p>
//               </div>
//               <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                 {amountPrefix}
//                 {amount.toLocaleString(undefined, {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}{" "}
//                 {currencyCode}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   // --- Return JSX --- (remains the same)
//   return (
//     // ... (section, container, heading, link, loading/error/empty/list logic) ...
//      <section className="Transactions py-10">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//             Recent Transactions
//           </h1>
//           <Link
//             href="/dashboard/transactions"
//             className="text-primary font-medium underline cursor-pointer hover:text-primaryhover transition-all duration-75 ease-linear"
//           >
//             See all
//           </Link>
//         </div>

//         <div className="space-y-2">
//           {loading && (
//              <div className="space-y-2">
//               {Array(3)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 rounded-full flex items-center justify-center">
//                           <Skeleton className="h-12 w-12 rounded-full" />
//                         </div>
//                         <div className="flex justify-between w-full items-center">
//                           <div>
//                             <Skeleton className="h-5 w-40 mb-2 rounded" />
//                             <Skeleton className="h-4 w-32 rounded" />
//                           </div>
//                           <div className="text-right">
//                             <Skeleton className="h-5 w-24 rounded" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {!loading && error && (
//             <p className="text-center text-red-500 py-4">Error: {error}</p>
//           )}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 py-4">
//               No recent transactions found.
//             </p>
//           )}
//           {!loading &&
//             !error &&
//             latestTransactions.length > 0 &&
//             latestTransactions.map(renderTransactionRow)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// // components/MainDashBoardSection/TransactionsSection.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// import { useAuth } from "../../../contexts/AuthContext";
// // Import the response types from the service files
// import paymentService, { PaymentDetailsResponse } from "../../../services/payment";
// import transferService, { TransferDetailsResponse } from "../../../services/transfer";
// // Import the core Transaction type and Currency type
// import { Transaction, Currency, TransactionStatus } from "@/types/transaction"; // Ensure Currency is imported here
// import { Skeleton } from "@/components/ui/skeleton";

// const TransactionsSection: React.FC = () => {
//   const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   const fetchAndProcessTransactions = useCallback(async () => {
//     if (!token) {
//       setError("Not authenticated");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setLatestTransactions([]);

//     try {
//       const [paymentsData, transfersData] = await Promise.all([
//         paymentService.getUserPayments(token), // Expects PaymentDetailsResponse[]
//         transferService.getUserTransfers(token), // Expects TransferDetailsResponse[]
//       ]);

//       // --- Map Payments ---
//       // Assume PaymentDetailsResponse now includes full Currency objects like TransferDetailsResponse
//       const mappedPayments: (Transaction | null)[] = paymentsData.map((payment: PaymentDetailsResponse): Transaction | null => {
//           // Basic validation: Ensure essential fields are present
//           if (!payment._id || !payment.status || payment.amountToAdd === undefined || !payment.balanceCurrency) {
//               console.warn("Skipping incomplete payment data:", payment);
//               return null; // Indicate this entry should be skipped
//           }

//           // Map accountId/account object to the Transaction's account field
//           const transactionAccount = typeof payment.accountId === 'string'
//               ? { _id: payment.accountId } // Create object if only ID is given
//               : payment.account;          // Use directly if structure matches

//           return {
//               _id: payment._id,
//               type: "Add Money",
//               // Use amountToAdd from response. If amountToPay is what should be displayed, use that.
//               // Assuming amountToAdd is the intended value for the transaction list display here.
//               amountToAdd: payment.amountToAdd,
//               // **** CORRECTED MAPPING ****
//               // Directly use the Currency objects from the response, assuming the API provides them.
//               // Assert the type if necessary, ensuring it matches your local Currency type.
//               balanceCurrency: payment.balanceCurrency as Currency | undefined,
//               payInCurrency: payment.payInCurrency as Currency | undefined,
//               // **** END CORRECTION ****
//               createdAt: payment.createdAt,
//               updatedAt: payment.updatedAt,
//               // Assert status type to match your TransactionStatus enum/type
//               status: payment.status as TransactionStatus,
//               // Map accountId correctly
//               account: transactionAccount,
//               // Include amountToPay if needed elsewhere, but amountToAdd is used for display amount
//               amountToPay: payment.amountToPay,

//               // --- Initialize fields specific to Send Money (set to undefined) ---
//               name: undefined,
//               sendAmount: undefined,
//               sendCurrency: undefined,
//               recipient: undefined,
//               sourceAccountId: undefined,
//               receiveAmount: undefined,
//               receiveCurrency: undefined,
//           };
//       });

//       // --- Map Transfers --- (Assumed correct based on previous context)
//       const mappedTransfers: Transaction[] = transfersData.map((transfer: TransferDetailsResponse): Transaction => ({
//         _id: transfer._id,
//         type: "Send Money",
//         name:
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName ?? "Recipient" // Use name if available
//             : "Recipient", // Fallback if recipient is just an ID or null/undefined
//         sendAmount: transfer.sendAmount,
//         // Assume transfer response contains full currency objects
//         sendCurrency: transfer.sendCurrency as Currency | undefined, // Assert type if needed
//         createdAt: transfer.createdAt,
//         updatedAt: transfer.updatedAt,
//         status: transfer.status as TransactionStatus, // Assert type
//         recipient: transfer.recipient, // Keep the full recipient structure or ID
//         sourceAccountId: // Extract ID from sourceAccount if it's an object
//           typeof transfer.sourceAccount === "string"
//             ? transfer.sourceAccount
//             : typeof transfer.sourceAccount === 'object' && transfer.sourceAccount !== null
//             ? transfer.sourceAccount._id
//             : undefined,
//         receiveAmount: transfer.receiveAmount,
//         receiveCurrency: transfer.receiveCurrency as Currency | undefined, // Assert type

//         // --- Initialize fields specific to Add Money (set to undefined) ---
//         amountToAdd: undefined,
//         balanceCurrency: undefined,
//         payInCurrency: undefined,
//         account: undefined,
//         amountToPay: undefined,
//       }));

//       // Combine and sort
//       // Filter out any nulls potentially introduced by validation in payment mapping
//       const allTransactions = [
//           ...mappedPayments.filter((t): t is Transaction => t !== null), // Type guard to filter nulls
//           ...mappedTransfers
//         ];

//       // Sort by latest date (updatedAt preferred, fallback to createdAt)
//       const sortedTransactions = allTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         // Handle cases where dates might be missing
//         if (!dateA && !dateB) return 0; // Keep original order if both dates missing
//         if (!dateA) return 1;           // Put items without dates last
//         if (!dateB) return -1;          // Put items without dates last
//         // Sort descending (latest first)
//         try {
//            return new Date(dateB).getTime() - new Date(dateA).getTime();
//         } catch (e) {
//             console.error("Error comparing dates during sort:", dateA, dateB, e);
//             return 0; // Avoid crash on invalid date format
//         }
//       });

//       // Take the top 3 most recent transactions
//       setLatestTransactions(sortedTransactions.slice(0, 3));

//     } catch (err: unknown) {
//         console.error("Failed to fetch transactions:", err);
//         let errorMessage = "Could not load recent transactions.";
//         if (err instanceof Error) {
//             errorMessage = err.message || errorMessage;
//         } else if (typeof err === 'string' && err) {
//             errorMessage = err;
//         }
//         setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchAndProcessTransactions();
//   }, [fetchAndProcessTransactions]); // Re-run if the function identity changes (e.g., token changes)

//   // --- Render Helper ---
//   // This function should now work correctly as `transaction.balanceCurrency` will have the object
//   const renderTransactionRow = (transaction: Transaction) => {
//     const isAddMoney = transaction.type === "Add Money";
//     const icon = isAddMoney ? (
//       <LuPlus size={24} className="text-neutral-900 dark:text-white" />
//     ) : (
//       <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />
//     );

//     // Determine the display name
//     // Use optional chaining safely
//     const name = isAddMoney
//       ? `To your ${transaction.balanceCurrency?.code ?? "Unknown"} balance` // Access code safely
//       : transaction.name || "Recipient"; // Fallback for Send Money

//     // Determine the description based on type and status
//     let description: string;
//     const status = transaction.status;

//     if (isAddMoney) {
//       description =
//         status === "completed"
//           ? "Added" // Simplified description
//           : status === "pending" || status === "in progress"
//           ? "Waiting for money" // Simplified description
//           : status === "canceled"
//           ? "Cancelled"
//           : status === "failed"
//           ? "Failed"
//           : status === "processing" // Added processing status
//           ? "Processing deposit"
//           : "Processing"; // Generic fallback
//     } else { // Send Money
//       description =
//         status === "completed"
//           ? `Sent to ${transaction.name || "Recipient"}` // More specific
//           : status === "pending"
//           ? "Waiting to send"
//           : status === "in progress" || status === "processing" // Grouped processing statuses
//           ? "Sending money" // Simplified description
//           : status === "canceled"
//           ? "Cancelled"
//           : status === "failed"
//           ? "Failed"
//           : "Processing"; // Generic fallback
//     }

//     // Determine amount and currency code for display
//     const amount = isAddMoney
//       ? transaction.amountToAdd ?? 0 // Default to 0 if undefined
//       : transaction.sendAmount ?? 0;  // Default to 0 if undefined

//     // **** CORRECTED CURRENCY CODE ACCESS ****
//     // Safely access the code from the respective currency object
//     const currencyCode = isAddMoney
//       ? transaction.balanceCurrency?.code ?? "" // Use balance currency for Add Money
//       : transaction.sendCurrency?.code ?? "";    // Use send currency for Send Money

//     const amountPrefix = isAddMoney ? "+ " : "- ";
//     let amountClass = "text-neutral-900 dark:text-white"; // Default style

//     // Apply specific styles based on status
//     if (status === "completed") {
//         amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white";
//     } else if (status === "canceled" || status === "failed") {
//        amountClass = "text-red-600 line-through";
//     } else if (status === 'pending' || status === 'processing' || status === 'in progress') {
//        amountClass = "text-neutral-900 dark:text-white"; // Indicate pending/processing state visually
//     }
//     // else: Keep default style for other/unknown statuses

//     return (
//       <Link
//         href={`/dashboard/transactions/${transaction._id}`} // Link to specific transaction detail page
//         key={transaction._id}
//         className="block" // Make the whole row clickable
//       >
//         {/* Use hover effect for better UX */}
//         <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//           <div className="flex items-center gap-4">
//             {/* Icon container */}
//             <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
//               {icon}
//             </div>
//             {/* Transaction details and amount */}
//             <div className="flex justify-between w-full items-center flex-grow gap-2">
//               {/* Name and Description */}
//               <div className="flex-grow overflow-hidden"> {/* Prevent text overflow */}
//                 <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {/* Truncate long names */}
//                   {name}
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate"> {/* Truncate long descriptions */}
//                   {description}
//                   {/* Optionally show specific status for pending/processing */}
//                   {(status === 'processing' || status === 'pending' || status === 'in progress') && (
//                      <span className="italic text-xs"> ({status})</span>
//                   )}
//                 </p>
//               </div>
//               {/* Amount and Currency */}
//               <div className={`font-medium ${amountClass} whitespace-nowrap flex-shrink-0`}>
//                 {amountPrefix}
//                 {amount.toLocaleString(undefined, { // Format number nicely
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//                 {/* Conditionally render currency code only if available */}
//                 {currencyCode && ` ${currencyCode}`}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   // --- Return JSX ---
//   return (
//      <section className="Transactions py-10">
//       <div className="container mx-auto">
//         {/* Section Header */}
//         <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
//           <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//             Recent Transactions
//           </h1>
//           <Link
//             href="/dashboard/transactions"
//             className="text-primary font-medium underline cursor-pointer hover:text-primaryhover transition-all duration-75 ease-linear"
//           >
//             See all
//           </Link>
//         </div>

//         {/* Transaction List Area */}
//         <div className="space-y-2">
//           {/* Loading Skeletons */}
//           {loading && (
//              <div className="space-y-2">
//               {Array(3) // Show 3 skeleton loaders
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                       <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
//                       <div className="flex-grow flex justify-between items-center gap-4">
//                         <div className="flex-grow">
//                            <Skeleton className="h-5 w-3/5 mb-2 rounded" /> {/* Adjusted width */}
//                            <Skeleton className="h-4 w-2/5 rounded" />      {/* Adjusted width */}
//                         </div>
//                         <div className="flex-shrink-0">
//                            <Skeleton className="h-5 w-20 rounded" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}

//           {/* Error Message */}
//           {!loading && error && (
//             <p className="text-center text-red-500 dark:text-red-400 py-4 px-2">
//                 Error: {error}
//             </p>
//           )}

//           {/* No Transactions Message */}
//           {!loading && !error && latestTransactions.length === 0 && (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-4 px-2">
//               No recent transactions found.
//             </p>
//           )}

//           {/* Render Actual Transactions */}
//           {!loading &&
//             !error &&
//             latestTransactions.length > 0 &&
//             latestTransactions.map(renderTransactionRow)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsSection;

// components/MainDashBoardSection/TransactionsSection.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { MdOutlineAccessTime } from "react-icons/md";

import { useAuth } from "../../../contexts/AuthContext";
// Import the response types from the service files
import paymentService, {
  PaymentDetailsResponse,
} from "../../../services/payment";
import transferService, {
  TransferDetailsResponse,
} from "../../../services/transfer";
// Import the core Transaction type and Currency type
import { Transaction, Currency, TransactionStatus } from "@/types/transaction"; // Ensure Currency is imported here
import { Skeleton } from "@/components/ui/skeleton";

const TransactionsSection: React.FC = () => {
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchAndProcessTransactions = useCallback(async () => {
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setLatestTransactions([]);

    try {
      const [paymentsData, transfersData] = await Promise.all([
        paymentService.getUserPayments(token), // Expects PaymentDetailsResponse[]
        transferService.getUserTransfers(token), // Expects TransferDetailsResponse[]
      ]);

      // --- Map Payments ---
      // Assume PaymentDetailsResponse now includes full Currency objects like TransferDetailsResponse
      const mappedPayments: (Transaction | null)[] = paymentsData.map(
        (payment: PaymentDetailsResponse): Transaction | null => {
          // Basic validation: Ensure essential fields are present
          if (
            !payment._id ||
            !payment.status ||
            payment.amountToAdd === undefined ||
            !payment.balanceCurrency
          ) {
            console.warn("Skipping incomplete payment data:", payment);
            return null; // Indicate this entry should be skipped
          }

          // Map accountId/account object to the Transaction's account field
          const transactionAccount =
            typeof payment.accountId === "string"
              ? { _id: payment.accountId } // Create object if only ID is given
              : payment.account; // Use directly if structure matches

          return {
            _id: payment._id,
            type: "Add Money",
            // Use amountToAdd from response. If amountToPay is what should be displayed, use that.
            // Assuming amountToAdd is the intended value for the transaction list display here.
            amountToAdd: payment.amountToAdd,
            // **** CORRECTED MAPPING ****
            // Directly use the Currency objects from the response, assuming the API provides them.
            // Assert the type if necessary, ensuring it matches your local Currency type.
            balanceCurrency: payment.balanceCurrency as Currency | undefined,
            payInCurrency: payment.payInCurrency as Currency | undefined,
            // **** END CORRECTION ****
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
            // Assert status type to match your TransactionStatus enum/type
            status: payment.status as TransactionStatus,
            // Map accountId correctly
            account: transactionAccount,
            // Include amountToPay if needed elsewhere, but amountToAdd is used for display amount
            amountToPay: payment.amountToPay,

            // --- Initialize fields specific to Send Money (set to undefined) ---
            name: undefined,
            sendAmount: undefined,
            sendCurrency: undefined,
            recipient: undefined,
            sourceAccountId: undefined,
            receiveAmount: undefined,
            receiveCurrency: undefined,
          };
        }
      );

      // --- Map Transfers --- (Assumed correct based on previous context)
      const mappedTransfers: Transaction[] = transfersData.map(
        (transfer: TransferDetailsResponse): Transaction => ({
          _id: transfer._id,
          type: "Send Money",
          name:
            typeof transfer.recipient === "object" &&
            transfer.recipient !== null
              ? transfer.recipient.accountHolderName ?? "Recipient" // Use name if available
              : "Recipient", // Fallback if recipient is just an ID or null/undefined
          sendAmount: transfer.sendAmount,
          // Assume transfer response contains full currency objects
          sendCurrency: transfer.sendCurrency as Currency | undefined, // Assert type if needed
          createdAt: transfer.createdAt,
          updatedAt: transfer.updatedAt,
          status: transfer.status as TransactionStatus, // Assert type
          recipient: transfer.recipient, // Keep the full recipient structure or ID
          // Extract ID from sourceAccount if it's an object
          sourceAccountId:
            typeof transfer.sourceAccount === "string"
              ? transfer.sourceAccount
              : typeof transfer.sourceAccount === "object" &&
                transfer.sourceAccount !== null
              ? transfer.sourceAccount._id
              : undefined,
          receiveAmount: transfer.receiveAmount,
          receiveCurrency: transfer.receiveCurrency as Currency | undefined, // Assert type

          // --- Initialize fields specific to Add Money (set to undefined) ---
          amountToAdd: undefined,
          balanceCurrency: undefined,
          payInCurrency: undefined,
          account: undefined,
          amountToPay: undefined,
        })
      );

      // Combine and sort
      // Filter out any nulls potentially introduced by validation in payment mapping
      const allTransactions = [
        ...mappedPayments.filter((t): t is Transaction => t !== null), // Type guard to filter nulls
        ...mappedTransfers,
      ];

      // Sort by latest date (updatedAt preferred, fallback to createdAt)
      const sortedTransactions = allTransactions.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        // Handle cases where dates might be missing
        if (!dateA && !dateB) return 0; // Keep original order if both dates missing
        if (!dateA) return 1; // Put items without dates last
        if (!dateB) return -1; // Put items without dates last
        // Sort descending (latest first)
        try {
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        } catch (e) {
          console.error("Error comparing dates during sort:", dateA, dateB, e);
          return 0; // Avoid crash on invalid date format
        }
      });

      // Take the top 3 most recent transactions
      setLatestTransactions(sortedTransactions.slice(0, 3));
    } catch (err: unknown) {
      console.error("Failed to fetch transactions:", err);
      let errorMessage = "Could not load recent transactions.";
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      } else if (typeof err === "string" && err) {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAndProcessTransactions();
  }, [fetchAndProcessTransactions]); // Re-run if the function identity changes (e.g., token changes)

  // --- Render Helper ---
  const renderTransactionRow = (transaction: Transaction) => {
    const isAddMoney = transaction.type === "Add Money";
    const icon = isAddMoney ? (
      <LuPlus size={22} className="text-white" />
    ) : (
      <GoArrowUp size={22} className="text-white" />
    );

    // --- START MODIFICATION ---

    // 1. Calculate amount and currency code *first*
    const amount = isAddMoney
      ? transaction.amountToAdd ?? 0 // Default to 0 if undefined
      : transaction.sendAmount ?? 0; // Default to 0 if undefined

    // Use balance currency for Add Money title/details, send currency for Send Money
    const displayCurrencyCode = isAddMoney
      ? transaction.balanceCurrency?.code ?? "" // Use balance currency code
      : transaction.sendCurrency?.code ?? ""; // Use send currency code

    // Format the amount for display in the name and on the right
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // 2. Determine the display name using the calculated amount and currency
    const name = isAddMoney
      ? // Construct the name like in TasksPage
        `To your ${displayCurrencyCode} balance`
      : transaction.name || "Recipient"; // Fallback for Send Money

    // --- END MODIFICATION ---

    // Determine the description based on type and status
    let description: string;
    const status = transaction.status;

    // (Description logic remains the same)
    if (isAddMoney) {
      description =
        status === "completed"
          ? "Added"
          : status === "pending" || status === "in progress"
          ? "Waiting for your money"
          : status === "canceled"
          ? "Cancelled"
          : status === "failed"
          ? "Failed"
          : status === "processing"
          ? "Processing deposit"
          : "Processing";
    } else {
      // Send Money
      description =
        status === "completed"
          ? `Sent by you`
          : status === "pending"
          ? "Sending by you"
          : status === "in progress" || status === "processing"
          ? "Sending by you"
          : status === "canceled"
          ? "Cancelled"
          : status === "failed"
          ? "Failed"
          : "Processing";
    }

    // Determine amount prefix and class for the right-side display
    const amountPrefix = isAddMoney ? "+ " : "- ";
    let amountClass = "text-mainheadingWhite"; // Default style

    // (Amount class logic remains the same)
    if (status === "completed") {
      amountClass = isAddMoney ? "text-green-500" : "text-mainheadingWhite";
    } else if (status === "canceled" || status === "failed") {
      amountClass = "text-red-600 line-through";
    } else if (
      status === "pending" ||
      status === "processing" ||
      status === "in progress"
    ) {
      amountClass = "text-mainheadingWhite";
    }

    return (
      <Link
        href={`/dashboard/transactions/${transaction._id}`}
        key={transaction._id}
        className="block"
      >
        <div className="block hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
          <div className="flex sm:items-center items-start sm:gap-4 gap-2">
            {/* Icon container */}
            <div className="p-3 bg-[#52636c] rounded-full flex items-center justify-center">
              {icon}
            </div>

            {/* Transaction details and amount */}
            <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
              {/* Name and Description */}
              {/* This h3 now uses the correctly formatted 'name' */}
              <div className="text-wrap">
                <h3 className="font-medium leading-relaxed text-mainheadingWhite sm:text-lg text-15px">
                  {name}
                </h3>
                <p className="sm:text-sm text-13px text-subheadingWhite mt-1">
                  {description}
                </p>
              </div>

              {/* Amount and Currency */}
              {/* Use the pre-formatted amount and the display currency code */}
              <div
                className={`font-medium ${amountClass} whitespace-nowrap flex-shrink-0 sm:text-base text-15px`}
              >
                {amountPrefix}
                {formattedAmount} {/* Use the formatted amount */}
                {/* Conditionally render currency code only if available */}
                {displayCurrencyCode && ` ${displayCurrencyCode}`}{" "}
                {/* Use the display code */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // --- Return JSX ---
  return (
    <section className="Transactions-Wrapper">
      <div className="Transactions">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite text-wrap">
            Recent Transactions
          </h1>
          <div className="flex items-center justify-center cursor-pointer text-primary hover:text-neutral-900 bg-primarybox hover:bg-primaryhover px-4 py-1.5 rounded-full transition-all duration-75 ease-linear">
            <Link
              href="/dashboard/transactions"
              className=" text-xs font-semibold text-nowrap"
            >
              See all
            </Link>
          </div>
        </div>

        {/* Transaction List Area */}
        <div className="space-y-2">
          {/* Loading Skeletons */}
          {loading && (
            <div className="space-y-2">
              {Array(3) // Show 3 skeleton loaders
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="block p-2 sm:p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                      {/* Icon Skeleton */}
                      <div className="relative flex-shrink-0">
                        <div className="flex items-center justify-center">
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                      </div>
                      {/* Text and Button Skeletons */}
                      <div className="flex-grow flex flex-row justify-between items-center gap-4">
                        <div className="flex-grow">
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <div className="shrink-0">
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <p className="text-center text-red-500 py-4 px-2">Error: {error}</p>
          )}

          {/* No Transactions Message */}
          {!loading && !error && latestTransactions.length === 0 && (
            <>
              <div className="flex items-center sm:gap-4 gap-2">
                <div className="p-3 bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
                  <MdOutlineAccessTime size={22} className="text-white" />
                </div>
                <p className="text-center text-subheadingWhite">
                  No recent transactions found.
                </p>
              </div>
            </>
          )}

          {/* Render Actual Transactions */}
          {!loading &&
            !error &&
            latestTransactions.length > 0 &&
            latestTransactions.map(renderTransactionRow)}
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;
