// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react"; // Import useCallback
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions"; // Import from data file
// import TransactionActions from "./TransactionActions"; // Import TransactionActions component

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions); // State for filtered transactions

//   // Use useCallback to memoize handleTransactionsChange
//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []); // Empty dependency array because handleTransactionsChange doesn't depend on any variables from the component scope

//   // Determine which transaction list to use for filtering in-process and processed: filteredTransactions or defaultTransactions (if no filter applied in Search component)
//   const transactionsToFilter = filteredTransactions;

//   // Filter in-process transactions
//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   // Filter processed transactions
//   const processedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "processed"
//   );

//   // Sort processed transactions by processedDate in descending order (latest date first)
//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   // Group processed transactions by processedDate
//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions} // Pass defaultTransactions to TransactionActions
//               onTransactionsChange={handleTransactionsChange} // Pass callback to TransactionActions
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">In progress</h2>
//                 <div className="space-y-8">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description; // Initialize with existing or undefined
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description; // Initialize with existing or undefined
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//   }, []);

//   // Filter transactions based on applied recipient filters
//   const filteredByRecipient = appliedRecipientFilters.length > 0
//     ? defaultTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : defaultTransactions;

//   // Determine which transaction list to use for further filtering (in-process and processed):
//   const transactionsToFilter = filteredByRecipient;

//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const processedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "processed"
//   );

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">In progress</h2>
//                 <div className="space-y-8">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-6 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray-300 after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions); // Initialize with defaultTransactions
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions); // Update filteredTransactions state
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//   }, []);

//   // Filter transactions based on applied recipient filters and already filtered transactions from search
//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction => // Use filteredTransactions here
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions; // Use filteredTransactions here

//   // Determine which transaction list to use for further filtering (in-process and completed):
//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const inProcessTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = transactionsToFilter.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const sortedCompletedTransactions = [...completedTransactions].sort((a, b) => {
//     if (!a.processedDate || !b.processedDate) return 0;
//     return new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime();
//   });

//   const groupedCompletedTransactions: { [date: string]: Transaction[] } =
//     sortedCompletedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         if (!transaction.processedDate) {
//           return groups;
//         }
//         const date = new Date(transaction.processedDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             {/* Transaction Actions Component (Search, Filters, Download) */}
//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {/* In Progress Transactions Section */}
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Transaction History Section (Processed Transactions) */}
//             {Object.entries(groupedCompletedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedCompletedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div className="space-y-8">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                             }
//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${
//                                         transaction.type === "Add Money"
//                                           ? "text-green-600"
//                                           : "text-main"
//                                       }`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* If no transactions of either type */}
//             {inProcessTransactions.length === 0 && Object.entries(groupedCompletedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null); // New state for status filter

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null); // Set status filter
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions;

//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });

//   const inProcessTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByStatus.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });

//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//   sortedProcessedTransactions.reduce(
//     (groups: { [date: string]: Transaction[] }, transaction) => {
//       const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//       if (!groupDate) {
//         return groups;
//       }
//       const date = new Date(groupDate).toLocaleDateString('en-US', {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(transaction);
//       return groups;
//     },
//     {}
//   );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                                 </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div>
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // Latest Code Without Date Picker
// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//   const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]); // Updated to string[]

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[] }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null);
//     setAppliedBalanceFilter(filters.selectedBalance || []); // Set balance filter, default to empty array
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//         transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//       )
//     : filteredTransactions;

//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });

//   const filteredByBalance = filteredByStatus.filter(transaction => {
//     if (appliedBalanceFilter.length === 0) { // Check if the array is empty
//       return true; // No balance filter applied, include all
//     } else {
//       return appliedBalanceFilter.includes(transaction.currency); // Check if transaction currency is in the selected array
//     }
//   });

//   const inProcessTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });

//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//   sortedProcessedTransactions.reduce(
//     (groups: { [date: string]: Transaction[] }, transaction) => {
//       const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//       if (!groupDate) {
//         return groups;
//       }
//       const date = new Date(groupDate).toLocaleDateString('en-US', {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(transaction);
//       return groups;
//     },
//     {}
//   );

//   return (
//     <section className="py-12">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                                 </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-500 mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">{date}</h3>
//                         <div>
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Transaction, defaultTransactions } from "../../../data/transactions";
// import TransactionActions from "./TransactionActions";

// const TransactionsPage: React.FC = () => {
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(defaultTransactions);
//   const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//   const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//   const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//   const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//   const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//   const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

//   const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//     setFilteredTransactions(newTransactions);
//   }, []);

//   const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => {
//     setAppliedRecipientFilters(filters.selectedRecipients);
//     setAppliedDirectionFilter(filters.selectedDirection || 'all');
//     setAppliedStatusFilter(filters.selectedStatus || null);
//     setAppliedBalanceFilter(filters.selectedBalance || []);
//     setAppliedFromDateFilter(filters.fromDate);
//     setAppliedToDateFilter(filters.toDate);
//   }, []);

//   const filteredByRecipientAndSearch = appliedRecipientFilters.length > 0
//     ? filteredTransactions.filter(transaction =>
//       transaction.type === "Send Money" && transaction.recipientId && appliedRecipientFilters.includes(transaction.recipientId)
//     )
//     : filteredTransactions;

//   const transactionsToFilter = filteredByRecipientAndSearch;

//   const filteredByDirection = transactionsToFilter.filter(transaction => {
//     if (appliedDirectionFilter === 'all') {
//       return true;
//     } else if (appliedDirectionFilter === 'add') {
//       return transaction.type === 'Add Money';
//     } else if (appliedDirectionFilter === 'send') {
//       return transaction.type === 'Send Money';
//     }
//     return true;
//   });

//   const filteredByStatus = filteredByDirection.filter(transaction => {
//     if (appliedStatusFilter === null || appliedStatusFilter === undefined) {
//       return true; // No status filter applied, include all
//     } else if (appliedStatusFilter === 'Completed') {
//       return transaction.status === 'completed';
//     } else if (appliedStatusFilter === 'Cancelled') {
//       return transaction.status === 'cancelled';
//     } else if (appliedStatusFilter === 'In Process') {
//       return transaction.status === 'inProcess';
//     }
//     return true;
//   });

//   const filteredByDate = filteredByStatus.filter(transaction => {
//     if (!appliedFromDateFilter && !appliedToDateFilter) {
//       return true; // No date filter applied
//     }

//     let transactionDate = transaction.processedDate || transaction.date;
//     if (!transactionDate) return false;

//     const transactionDateObj = new Date(transactionDate);
//     transactionDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00

//     let fromDateObj: Date | null = appliedFromDateFilter ? parseDateString(appliedFromDateFilter) : null;
//     if (fromDateObj) {
//       fromDateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00
//     }
//     let toDateObj: Date | null = appliedToDateFilter ? parseDateString(appliedToDateFilter) : null;
//     if (toDateObj) {
//       toDateObj.setHours(23, 59, 59, 999); // Set time to 23:59:59 to include the whole To Date
//     }

//     if (fromDateObj && toDateObj) {
//       return transactionDateObj >= fromDateObj && transactionDateObj <= toDateObj;
//     } else if (fromDateObj) {
//       return transactionDateObj >= fromDateObj;
//     } else if (toDateObj) {
//       return transactionDateObj <= toDateObj;
//     }
//     return true;
//   });

//   function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//       const day = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1;
//       const year = parseInt(parts[2], 10);
//       const date = new Date(year, month, day);
//       return date;
//     }
//     return null;
//   }

//   const filteredByBalance = filteredByDate.filter(transaction => {
//     if (appliedBalanceFilter.length === 0) { // Check if the array is empty
//       return true; // No balance filter applied, include all
//     } else {
//       return appliedBalanceFilter.includes(transaction.currency); // Check if transaction currency is in the selected array
//     }
//   });

//   const inProcessTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "inProcess"
//   );

//   const completedTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "completed"
//   );

//   const cancelledTransactions = filteredByBalance.filter(
//     (transaction) => transaction.status === "cancelled"
//   );

//   const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//   const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//     let dateA = a.processedDate || a.date; // Use processedDate if available, otherwise date for sorting
//     let dateB = b.processedDate || b.date;
//     if (!dateA || !dateB) return 0;
//     return new Date(dateB).getTime() - new Date(dateA).getTime();
//   });

//   const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//     sortedProcessedTransactions.reduce(
//       (groups: { [date: string]: Transaction[] }, transaction) => {
//         const groupDate = transaction.processedDate || transaction.date; // Use processedDate if available, otherwise date for grouping
//         if (!groupDate) {
//           return groups;
//         }
//         const date = new Date(groupDate).toLocaleDateString('en-US', {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(transaction);
//         return groups;
//       },
//       {}
//     );

//   return (
//     <section className="Transaction-Page py-10">
//       <div className="">
//         <div className="container mx-auto">
//           <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
//             <h1 className="text-3xl font-semibold text-main">Transactions</h1>

//             <TransactionActions
//               transactions={defaultTransactions}
//               onTransactionsChange={handleTransactionsChange}
//               onFiltersApply={handleFiltersApply}
//             />
//           </div>

//           <div className="space-y-10">
//             {inProcessTransactions.length > 0 && (
//               <div>
//                 <h2 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">In progress</h2>
//                 <div className="space-y-2">
//                   {inProcessTransactions.map((transaction) => {
//                     let description = transaction.description;
//                     if (transaction.type === "Add Money") {
//                       description = "Waiting for your money";
//                     } else if (transaction.type === "Send Money") {
//                       description = "Sending your money";
//                     }
//                     return (
//                       <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                             {transaction.type === "Add Money" ? (
//                               <LuPlus size={24} className="text-main" />
//                             ) : (
//                               <GoArrowUp size={24} className="text-main" />
//                             )}
//                           </div>
//                           <div className="flex justify-between w-full">
//                             <div>
//                               <h3 className="font-medium text-main">
//                                 {transaction.type === "Add Money"
//                                   ? `To your ${transaction.currency} balance`
//                                   : transaction.name}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {description}
//                               </p>
//                             </div>
//                             <div className={`font-medium text-main`}>
//                               {transaction.type === "Add Money" ? "+ " : "- "}
//                               {transaction.amount.toLocaleString(undefined, {
//                                 minimumFractionDigits: 0,
//                                 maximumFractionDigits: 2,
//                               })}{" "}
//                               {transaction.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {Object.entries(groupedProcessedTransactions).length > 0 && (
//               <div>
//                 <div className="space-y-10">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">{date}</h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             let description = transaction.description;
//                             let amountClass = "text-main";
//                             if (transaction.type === "Add Money") {
//                               description = "Added by you";
//                               amountClass = "text-green-600";
//                             } else if (transaction.type === "Send Money") {
//                               description = "Sent by you";
//                               amountClass = "text-main";
//                             }
//                             if (transaction.status === "cancelled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-500 line-through"; // Indicate cancelled status visually
//                             }

//                             return (
//                               <div key={transaction.id} className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//                                 <div className="flex items-center gap-4">
//                                   <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                     {transaction.type === "Add Money" ? (
//                                       <LuPlus size={24} className="text-main" />
//                                     ) : (
//                                       <GoArrowUp size={24} className="text-main" />
//                                     )}
//                                   </div>
//                                   <div className="flex justify-between w-full">
//                                     <div>
//                                       <h3 className="font-medium text-main">
//                                         {transaction.type === "Add Money"
//                                           ? `To your ${transaction.currency} balance`
//                                           : transaction.name}
//                                       </h3>
//                                       <p className="text-sm text-gray-500">
//                                         {description}
//                                       </p>
//                                     </div>
//                                     <div
//                                       className={`font-medium ${amountClass}`}
//                                     >
//                                       {transaction.type === "Add Money" ? "+ " : "- "}
//                                       {transaction.amount.toLocaleString(undefined, {
//                                         minimumFractionDigits: 0,
//                                         maximumFractionDigits: 2,
//                                       })}{" "}
//                                       {transaction.currency}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && (
//               <div className="text-center text-gray-500 py-8">
//                 You don't have any transactions.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TransactionsPage;

// // frontend/src/PageSection/TransactionsPage.tsx
// "use client"
// import React, { useState, useCallback, useEffect } from "react";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions";
// import { useAuth } from "../../../hooks/useAuth";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import { Transaction } from "@/types/transaction"; // Import Transaction interface from types file
// import Link from 'next/link'; // Import Link from next/link

// const TransactionsPage: React.FC = () => {
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); // State for all transactions
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     const fetchTransactions = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing.");
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         try {
//             const paymentsData = await paymentService.getUserPayments(token);
//             const transfersData = await transferService.getUserTransfers(token);

//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status,
//             }));

//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null) ? transfer.recipient.accountHolderName : 'Recipient Name Unavailable',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status,
//                 recipient: transfer.recipient
//             }));

//             const allTransactionsData = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(allTransactionsData); // Set all transactions state
//             setFilteredTransactions(allTransactionsData); // Initially show all transactions
//         } catch (err: any) {
//             setError(err.message || "Failed to fetch transactions.");
//             console.error("Transaction fetch error:", err);
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchTransactions();
//     }, [fetchTransactions]);

//     const handleTransactionsChange = useCallback((newTransactions: Transaction[]) => {
//         setFilteredTransactions(newTransactions);
//     }, []);

//     const handleFiltersApply = useCallback((filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => {
//         setAppliedRecipientFilters(filters.selectedRecipients);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         // Apply filters to allTransactions to get filteredTransactions
//         let tempFilteredTransactions = [...allTransactions]; // Start with all transactions

//         // Direction Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (filters.selectedDirection === 'all') return true;
//             if (filters.selectedDirection === 'add') return transaction.type === 'Add Money';
//             if (filters.selectedDirection === 'send') return transaction.type === 'Send Money';
//             return true;
//         });

//         // Status Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (!filters.selectedStatus) return true;
//             if (filters.selectedStatus === 'Completed') return transaction.status === 'completed';
//             if (filters.selectedStatus === 'Cancelled') return transaction.status === 'canceled';
//             if (filters.selectedStatus === 'In Process') return transaction.status === 'in progress' || transaction.status === 'pending';
//             return true;
//         });

//         // Balance Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (filters.selectedBalance?.length === 0) return true;
//             if (transaction.type === 'Add Money' && transaction.balanceCurrency?.code) {
//                 return filters.selectedBalance?.includes(transaction.balanceCurrency.code);
//             } else if (transaction.type === 'Send Money' && transaction.sendCurrency?.code) {
//                 return filters.selectedBalance?.includes(transaction.sendCurrency.code);
//             }
//             return false;
//         });

//         // Recipient Filter - Assuming recipient filtering is only for "Send Money" transactions
//         if (filters.selectedRecipients && filters.selectedRecipients.length > 0) {
//             tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//                 if (transaction.type === "Send Money" && typeof transaction.recipient === 'object' && transaction.recipient !== null) {
//                     return filters.selectedRecipients.includes(transaction.recipient._id);
//                 }
//                 return transaction.type !== "Send Money"; // Include "Add Money" transactions
//             });
//         }

//         // Date Filter
//         tempFilteredTransactions = tempFilteredTransactions.filter(transaction => {
//             if (!filters.fromDate && !filters.toDate) return true;

//             let transactionDate = transaction.updatedAt || transaction.createdAt;
//             if (!transactionDate) return false;
//             const transactionDateObj = new Date(transactionDate);

//             let fromDateObj: Date | null = filters.fromDate ? parseDateString(filters.fromDate) : null;
//             let toDateObj: Date | null = filters.toDate ? parseDateString(filters.toDate) : null;

//             if (fromDateObj && toDateObj) return transactionDateObj >= fromDateObj && transactionDateObj <= toDateObj;
//             if (fromDateObj) return transactionDateObj >= fromDateObj;
//             if (toDateObj) return transactionDateObj <= toDateObj;
//             return true;
//         });

//         setFilteredTransactions(tempFilteredTransactions); // Update filtered transactions with applied filters
//     }, [allTransactions]); // Dependency array -  allTransactions (crucial to refilter when allTransactions changes)

//     function parseDateString(dateString: string | undefined): Date | null {
//         if (!dateString) return null;
//         const parts = dateString.split('-');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0], 10);
//             const month = parseInt(parts[1], 10) - 1;
//             const year = parseInt(parts[2], 10);
//             const date = new Date(year, month, day);
//             return date;
//         }
//         return null;
//     }

//     const inProcessTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "in progress" || transaction.status === "pending"
//     );

//     const completedTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "completed"
//     );

//     const cancelledTransactions = filteredTransactions.filter(
//         (transaction) => transaction.status === "canceled"
//     );

//     const processedTransactions = [...completedTransactions, ...cancelledTransactions];

//     const sortedProcessedTransactions = [...processedTransactions].sort((a, b) => {
//         let dateA = a.updatedAt || a.createdAt;
//         let dateB = b.updatedAt || b.createdAt;
//         if (!dateA || !dateB) return 0;
//         return new Date(dateB).getTime() - new Date(dateA).getTime();
//     });

//     const groupedProcessedTransactions: { [date: string]: Transaction[] } =
//         sortedProcessedTransactions.reduce(
//             (groups: { [date: string]: Transaction[] }, transaction) => {
//                 const groupDate = transaction.updatedAt || transaction.createdAt;
//                 if (!groupDate) {
//                     return groups;
//                 }
//                 const date = new Date(groupDate).toLocaleDateString('en-US', {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                 });
//                 if (!groups[date]) {
//                     groups[date] = [];
//                 }
//                 groups[date].push(transaction);
//                 return groups;
//             },
//             {}
//         );

//     if (loading) {
//         return <div>Loading transactions...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }

//     return (
//         <section className="Transaction-Page py-10">
//             <div className="">
//                 <div className="container mx-auto">
//                     <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-4 mb-8">
//                         <h1 className="text-3xl font-semibold text-main">Transactions</h1>
//                         <TransactionActions
//                             transactions={allTransactions} // Pass allTransactions here for Search to work on full dataset
//                             onTransactionsChange={handleTransactionsChange}
//                             onFiltersApply={handleFiltersApply}
//                         />
//                     </div>

//                     <div className="space-y-10">
//                         {inProcessTransactions.length > 0 && (
//                             <div>
//                                 <h2 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">In progress</h2>
//                                 <div className="space-y-2">
//                                     {inProcessTransactions.map((transaction) => {
//                                         let description = transaction.description;
//                                         let amount = 0;
//                                         let currencyCode = '';
//                                         if (transaction.type === "Add Money") {
//                                             description = "Waiting for your money";
//                                             amount = transaction.amountToAdd || 0;
//                                             currencyCode = transaction.balanceCurrency?.code || '';
//                                         } else if (transaction.type === "Send Money") {
//                                             description = "Sending your money";
//                                             amount = transaction.sendAmount || 0;
//                                             currencyCode = transaction.sendCurrency?.code || '';
//                                         }
//                                         return (
//                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} > {/* Use Link component */}
//                                                 <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"> {/* Add cursor-pointer for visual feedback */}
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder">
//                                                             {transaction.type === "Add Money" ? (
//                                                                 <LuPlus size={24} className="text-main" />
//                                                             ) : (
//                                                                 <GoArrowUp size={24} className="text-main" />
//                                                             )}
//                                                         </div>
//                                                         <div className="flex justify-between w-full">
//                                                             <div>
//                                                                 <h3 className="font-medium text-main">
//                                                                     {transaction.type === "Add Money"
//                                                                         ? `To your ${currencyCode} balance`
//                                                                         : transaction.name}
//                                                                 </h3>
//                                                                 <p className="text-sm text-gray-500">
//                                                                     {description}
//                                                                 </p>
//                                                             </div>
//                                                             <div className={`font-medium text-main`}>
//                                                                 {transaction.type === "Add Money" ? "+ " : "- "}
//                                                                 {amount.toLocaleString(undefined, {
//                                                                     minimumFractionDigits: 0,
//                                                                     maximumFractionDigits: 2,
//                                                                 })}{" "}
//                                                                 {currencyCode}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {Object.entries(groupedProcessedTransactions).length > 0 && (
//                             <div>
//                                 <div className="space-y-10">
//                                     {Object.entries(groupedProcessedTransactions).map(
//                                         ([date, transactionsForDate]) => (
//                                             <div key={date}>
//                                                 <h3 className="font-medium text-gray mb-3 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">{date}</h3>
//                                                 <div className="space-y-2">
//                                                     {transactionsForDate.map((transaction) => {
//                                                         let description = transaction.description;
//                                                         let amountClass = "text-main";
//                                                         let amount = 0;
//                                                         let currencyCode = '';
//                                                         if (transaction.type === "Add Money") {
//                                                             description = "Added by you";
//                                                             amountClass = "text-green-600";
//                                                             amount = transaction.amountToAdd || 0;
//                                                             currencyCode = transaction.balanceCurrency?.code || '';
//                                                         } else if (transaction.type === "Send Money") {
//                                                             description = "Sent by you";
//                                                             amountClass = "text-main";
//                                                             amount = transaction.sendAmount || 0;
//                                                             currencyCode = transaction.sendCurrency?.code || '';
//                                                         }
//                                                         if (transaction.status === "canceled") {
//                                                             description = "Cancelled";
//                                                             amountClass = "text-red-500 line-through";
//                                                         }

//                                                         return (
//                                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} > {/* Use Link component */}
//                                                                 <div className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"> {/* Add cursor-pointer for visual feedback */}
//                                                                     <div className="flex items-center gap-4">
//                                                                         <div className="p-3 bg-white rounded-full flex items-center justify-center border border-lightborder ">
//                                                                             {transaction.type === "Add Money" ? (
//                                                                                 <LuPlus size={24} className="text-main" />
//                                                                             ) : (
//                                                                                 <GoArrowUp size={24} className="text-main" />
//                                                                             )}
//                                                                         </div>
//                                                                         <div className="flex justify-between w-full">
//                                                                             <div>
//                                                                                 <h3 className="font-medium text-main">
//                                                                                     {transaction.type === "Add Money"
//                                                                                         ? `To your ${currencyCode} balance`
//                                                                                         : transaction.name}
//                                                                                 </h3>
//                                                                                 <p className="text-sm text-gray-500">
//                                                                                     {description}
//                                                                                 </p>
//                                                                             </div>
//                                                                             <div
//                                                                                 className={`font-medium ${amountClass}`}
//                                                                             >
//                                                                                 {transaction.type === "Add Money" ? "+ " : "- "}
//                                                                                 {amount.toLocaleString(undefined, {
//                                                                                     minimumFractionDigits: 0,
//                                                                                     maximumFractionDigits: 2,
//                                                                                 })}{" "}
//                                                                                 {currencyCode}
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </Link>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         )
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {inProcessTransactions.length === 0 && Object.entries(groupedProcessedTransactions).length === 0 && !loading && !error && (
//                             <div className="text-center text-gray-500 py-8">
//                                 You don't have any transactions.
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TransactionsPage;

// "use client"; // Essential for using hooks

// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';

// // Icons
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// // Components
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path

// // Helper function to parse date strings (assuming "dd-MM-yyyy" format from filter)
// // Consider making this more robust or using a library if formats vary widely
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;

//     // Try dd-MM-yyyy first (adjust if filter format differs)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              // Use local time based on user's system if dates are local
//              return new Date(year, month, day);
//              // Or use UTC if dates should be timezone-agnostic:
//              // return new Date(Date.UTC(year, month, day));
//         }
//     }

//      // Fallback for ISO-like strings (e.g., from date pickers that output YYYY-MM-DD)
//      try {
//         const date = new Date(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     // Optional: Add state for search query if search needs to be combined with filters more tightly
//     // const [searchQuery, setSearchQuery] = useState<string>('');

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         // Reset data states to prevent stale data flashing
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency, // Assuming this is populated object with 'code'
//                 payInCurrency: payment.payInCurrency,     // Assuming this is populated object with 'code'
//                 account: payment.account,                 // Account ID or object
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 // Add other relevant fields if needed
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 // Safely access recipient name
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
//                       : 'Recipient', // Default if recipient is just an ID or null/undefined
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency, // Assuming this is populated object with 'code'
//                 receiveCurrency: transfer.receiveCurrency, // Assuming this is populated object with 'code'
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 recipient: transfer.recipient, // Keep full recipient reference (ID or object)
//                 // Safely access source account ID
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id, // Use optional chaining if sourceAccount can be object
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions); // Initialize filtered list
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: any) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             // Provide more specific error messages if possible from err.response?.data
//             setError(err.response?.data?.message || err.message || "Failed to fetch data. Please try again.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]); // Dependency: token

//     // Effect to fetch data on mount or when token changes
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // fetchData includes token in its dependency array

//     // --- Callback from Search Component ---
//     // This function is called when the search component provides results.
//     // Currently, it REPLACES the filtered list. This means subsequent filter applications
//     // will start from the full list again. If you want search AND filters to apply
//     // simultaneously, the filtering logic needs to incorporate the search query.
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//          // To apply filters *on top of* search results, you'd need to:
//          // 1. Store the search query in state.
//          // 2. Modify handleFiltersApply to filter *these* searchResults instead of allTransactions,
//          //    OR modify handleFiltersApply to *also* filter by the stored search query.
//     }, []);

//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: {
//         selectedRecipients: (string | number)[],
//         selectedDirection?: string,
//         selectedStatus?: string | null,
//         selectedBalance?: string[], // Currency codes
//         fromDate?: string,          // Date string "dd-MM-yyyy" (or format from picker)
//         toDate?: string            // Date string "dd-MM-yyyy" (or format from picker)
//     }) => {
//         console.log("Applying filters:", filters);

//         // 1. Update state tracking the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);
//         // Optional: If search is integrated, update search query state here too if passed

//         // 2. Start with the full list of transactions
//         let tempFiltered = [...allTransactions];

//         // --- Apply Filters Sequentially ---

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase in mapping
//                 if (!txStatus) return false; // Should not happen if normalized

//                 // Map UI filter names to backend statuses (ensure these match your backend)
//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Allow both spellings
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false; // Unknown filter status
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     // Check balanceCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     // Check sendCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 // Ensure code exists and is included in the selected filters
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String); // Ensure comparison as strings
//              tempFiltered = tempFiltered.filter(tx => {
//                 // Only apply to 'Send Money' transactions
//                 if (tx.type !== "Send Money") {
//                     return true; // Keep 'Add Money' transactions
//                 }
//                 // Check if the transaction's recipient ID matches any selected filter ID
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null); // Handle recipient being just an ID string

//                 return recipientId ? recipientFilterIds.includes(recipientId) : false; // Exclude if no valid recipient ID
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage
//         // Use UTC methods if dates are UTC, otherwise local time methods
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day (local)
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day (local)

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter without a date

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes backend sends ISO 8601 format
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }

//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) {
//                         include = false;
//                     }
//                     if (toDateObj && transactionDateObj > toDateObj) {
//                         include = false;
//                     }
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // 3. Update the state holding the transactions to be displayed
//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]); // Dependency: Re-run filter logic if the base list changes

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//         );

//         // Sort processed transactions by date (newest first)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing or invalid
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1; // Put items without date at the end
//             if (!dateB) return -1; // Put items without date at the end
//             try {
//                // Compare timestamps for accuracy
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0; // Maintain original order if comparison fails
//             }
//         });

//         // Group sorted processed transactions by date string
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     // Handle transactions without a date (group them under 'Unknown Date'?)
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     // Use a consistent locale and format for grouping keys
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     // Optionally group errors under a specific key
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Optionally sort the date keys if needed (e.g., newest date group first)
//         // const sortedGroupKeys = Object.keys(grouped).sort((a, b) => { /* complex date key sorting logic */ });

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Recalculate only when filteredTransactions changes

//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//         <section className="Transaction-Page py-8 md:py-10">
//              {/* Removed extra div wrapper here */}
//             <div className="container mx-auto px-4"> {/* Added container and padding */}
//                 {/* Header and Actions */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//                     <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Transactions</h1>
//                     {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//                     {!loadingAccounts && userAccounts.length > 0 && (
//                          <TransactionActions
//                             transactions={allTransactions} // Pass full list for Search/Filter base
//                             userAccounts={userAccounts} // Pass accounts for filter options
//                             onTransactionsChange={handleTransactionsChange} // Callback for search results
//                             onFiltersApply={handleFiltersApply} // Callback for filter application
//                         />
//                     )}
//                     {/* Show skeleton/placeholder while accounts load */}
//                     {loadingAccounts && (
//                         <div className="flex items-center gap-4 animate-pulse">
//                             <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                             <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                         </div>
//                     )}
//                     {/* Optional: Handle case where accounts loaded but are empty */}
//                     {!loadingAccounts && userAccounts.length === 0 && !error && (
//                          <p className="text-sm text-gray-500">Create an account to start making transactions.</p>
//                     )}
//                 </div>

//                 {/* Loading State */}
//                 {isLoading && (
//                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading transactions...</div>
//                 )}

//                 {/* Error State */}
//                 {!isLoading && error && (
//                     <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//                         <strong>Error:</strong> {error}
//                     </div>
//                 )}

//                 {/* Transaction List & Empty States (only when not loading and no error) */}
//                 {!isLoading && !error && (
//                     <div className="space-y-10">
//                         {/* In Progress Section */}
//                         {inProgressTransactions.length > 0 && (
//                             <div>
//                                  <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">In progress</h2>
//                                 <div className="space-y-2">
//                                     {inProgressTransactions.map((transaction) => {
//                                         const isAddMoney = transaction.type === "Add Money";
//                                         const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                         const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                                         const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                         // Display currency: For Add use balance currency, for Send use send currency
//                                         const displayCurrencyCode = isAddMoney
//                                             ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
//                                             : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
//                                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                                         // Name: For Add show target balance, for Send show recipient name
//                                         const name = isAddMoney
//                                             ? `To your ${displayCurrencyCode} balance`
//                                             : (transaction.name || "Recipient");

//                                         return (
//                                             <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                                  <a className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="p-3 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">{icon}</div>
//                                                         <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                             <div>
//                                                                 <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">{name}</h3>
//                                                                 <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description} <span className="italic">({transaction.status})</span></p>
//                                                             </div>
//                                                             <div className={`font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
//                                                                 {amountPrefix}
//                                                                 {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                                                 {" "} {displayCurrencyCode}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </Link>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Processed Sections (Grouped by Date) */}
//                         {Object.entries(groupedProcessedTransactions).length > 0 && (
//                             <div className="space-y-10">
//                                 {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                                     <div key={date}>
//                                          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1">{date}</h3>
//                                         <div className="space-y-2">
//                                             {transactionsForDate.map((transaction) => {
//                                                 const isAddMoney = transaction.type === "Add Money";
//                                                 const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                                                 let description = isAddMoney ? "Added by you" : `To ${transaction.name || 'Recipient'}`;
//                                                 let amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100";
//                                                 const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                                 const displayCurrencyCode = isAddMoney
//                                                     ? (typeof transaction.balanceCurrency === 'object' && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : '')
//                                                     : (typeof transaction.sendCurrency === 'object' && transaction.sendCurrency?.code ? transaction.sendCurrency.code : '');
//                                                 const amountPrefix = isAddMoney ? "+ " : "- ";
//                                                 // Clarify name for Add Money
//                                                 const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : (transaction.name || "Recipient");

//                                                 // Adjust appearance based on final status
//                                                 if (transaction.status === "canceled" || transaction.status === "cancelled") {
//                                                     description = "Cancelled";
//                                                     amountClass = "text-red-500 dark:text-red-400 line-through";
//                                                 } else if (transaction.status === "failed") {
//                                                     description = "Failed";
//                                                     amountClass = "text-red-500 dark:text-red-400";
//                                                 } else if (transaction.status === "completed") {
//                                                      description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`;
//                                                 }

//                                                 return (
//                                                     <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                                          <a className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-lg -mx-4 transition-colors duration-200 ease-in-out cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
//                                                             <div className="flex items-center gap-4">
//                                                                 <div className="p-3 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">{icon}</div>
//                                                                 <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                                                     <div>
//                                                                         <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base">{name}</h3>
//                                                                         <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                                     </div>
//                                                                     <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap text-right sm:text-left`}>
//                                                                         {amountPrefix}
//                                                                         {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                                                         {" "} {displayCurrencyCode}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </a>
//                                                     </Link>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Empty State (No transactions match filters or none exist at all) */}
//                         {filteredTransactions.length === 0 && (
//                             <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                                 {allTransactions.length === 0
//                                     ? "You haven't made any transactions yet."
//                                     : "No transactions match your current filter or search criteria."
//                                 }
//                                 {/* Optional: Add a button to clear filters if filters are active */}
//                                 { (appliedRecipientFilters.length > 0 || appliedDirectionFilter !== 'all' || appliedStatusFilter || appliedBalanceFilter.length > 0 || appliedFromDateFilter || appliedToDateFilter) && allTransactions.length > 0 && (
//                                     <button
//                                         onClick={() => handleFiltersApply({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: undefined, toDate: undefined })}
//                                         className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
//                                     >
//                                         Clear Filters
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div> {/* End Container */}
//         </section>
//     );
// };

// export default TransactionsPage;

// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Helper function to parse date strings (assuming "dd-MM-yyyy" format from filter)
// // Consider making this more robust or using a library if formats vary widely
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;

//     // Try dd-MM-yyyy first (adjust if filter format differs)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              // Use local time based on user's system if dates are local
//              return new Date(year, month, day);
//              // Or use UTC if dates should be timezone-agnostic:
//              // return new Date(Date.UTC(year, month, day));
//         }
//     }

//      // Fallback for ISO-like strings (e.g., from date pickers that output YYYY-MM-DD)
//      try {
//         const date = new Date(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     // Optional: Add state for search query if search needs to be combined with filters more tightly
//     // const [searchQuery, setSearchQuery] = useState<string>('');

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         // Reset data states to prevent stale data flashing
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency, // Assuming this is populated object with 'code'
//                 payInCurrency: payment.payInCurrency,     // Assuming this is populated object with 'code'
//                 account: payment.account,                 // Account ID or object
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 // Add other relevant fields if needed
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 // Safely access recipient name
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
//                       : 'Recipient', // Default if recipient is just an ID or null/undefined
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency, // Assuming this is populated object with 'code'
//                 receiveCurrency: transfer.receiveCurrency, // Assuming this is populated object with 'code'
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 recipient: transfer.recipient, // Keep full recipient reference (ID or object)
//                 // Safely access source account ID
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id, // Use optional chaining if sourceAccount can be object
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions); // Initialize filtered list
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: any) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             // Provide more specific error messages if possible from err.response?.data
//             setError(err.response?.data?.message || err.message || "Failed to fetch data. Please try again.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]); // Dependency: token

//     // Effect to fetch data on mount or when token changes
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // fetchData includes token in its dependency array

//     // --- Callback from Search Component ---
//     // This function is called when the search component provides results.
//     // Currently, it REPLACES the filtered list. This means subsequent filter applications
//     // will start from the full list again. If you want search AND filters to apply
//     // simultaneously, the filtering logic needs to incorporate the search query.
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//          // To apply filters *on top of* search results, you'd need to:
//          // 1. Store the search query in state.
//          // 2. Modify handleFiltersApply to filter *these* searchResults instead of allTransactions,
//          //    OR modify handleFiltersApply to *also* filter by the stored search query.
//     }, []);

//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: {
//         selectedRecipients: (string | number)[],
//         selectedDirection?: string,
//         selectedStatus?: string | null,
//         selectedBalance?: string[], // Currency codes
//         fromDate?: string,          // Date string "dd-MM-yyyy" (or format from picker)
//         toDate?: string            // Date string "dd-MM-yyyy" (or format from picker)
//     }) => {
//         console.log("Applying filters:", filters);

//         // 1. Update state tracking the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);
//         // Optional: If search is integrated, update search query state here too if passed

//         // 2. Start with the full list of transactions
//         let tempFiltered = [...allTransactions];

//         // --- Apply Filters Sequentially ---

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase in mapping
//                 if (!txStatus) return false; // Should not happen if normalized

//                 // Map UI filter names to backend statuses (ensure these match your backend)
//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Allow both spellings
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false; // Unknown filter status
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     // Check balanceCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     // Check sendCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 // Ensure code exists and is included in the selected filters
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String); // Ensure comparison as strings
//              tempFiltered = tempFiltered.filter(tx => {
//                 // Only apply to 'Send Money' transactions
//                 if (tx.type !== "Send Money") {
//                     return true; // Keep 'Add Money' transactions
//                 }
//                 // Check if the transaction's recipient ID matches any selected filter ID
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null); // Handle recipient being just an ID string

//                 return recipientId ? recipientFilterIds.includes(recipientId) : false; // Exclude if no valid recipient ID
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage
//         // Use UTC methods if dates are UTC, otherwise local time methods
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day (local)
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day (local)

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter without a date

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes backend sends ISO 8601 format
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }

//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) {
//                         include = false;
//                     }
//                     if (toDateObj && transactionDateObj > toDateObj) {
//                         include = false;
//                     }
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // 3. Update the state holding the transactions to be displayed
//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]); // Dependency: Re-run filter logic if the base list changes

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//         );

//         // Sort processed transactions by date (newest first)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing or invalid
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1; // Put items without date at the end
//             if (!dateB) return -1; // Put items without date at the end
//             try {
//                // Compare timestamps for accuracy
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0; // Maintain original order if comparison fails
//             }
//         });

//         // Group sorted processed transactions by date string
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     // Handle transactions without a date (group them under 'Unknown Date'?)
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     // Use a consistent locale and format for grouping keys
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     // Optionally group errors under a specific key
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Optionally sort the date keys if needed (e.g., newest date group first)
//         // const sortedGroupKeys = Object.keys(grouped).sort((a, b) => { /* complex date key sorting logic */ });

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Recalculate only when filteredTransactions changes

//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//         {/* Removed extra div wrapper here */}
//         <div className="container mx-auto">
//           {" "}
//           {/* Added container and padding */}
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions} // Pass full list for Search/Filter base
//                 userAccounts={userAccounts} // Pass accounts for filter options
//                 onTransactionsChange={handleTransactionsChange} // Callback for search results
//                 onFiltersApply={handleFiltersApply} // Callback for filter application
//               />
//             )}
//             {/* Show skeleton/placeholder while accounts load */}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {/* Optional: Handle case where accounts loaded but are empty */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>
//           {/* Loading State */}
//           {isLoading && (
//             <div className="space-y-2">
//               {Array(8)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                         {/* Icon Skeleton */}
//                         <div className="relative flex-shrink-0">
//                           <div className="flex items-center justify-center">
//                             <Skeleton className="h-12 w-12 rounded-full" />
//                           </div>
//                         </div>
//                         {/* Text and Button Skeletons */}
//                         <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                           <div className="flex-grow">
//                             <Skeleton className="h-4 w-40 mb-2" />
//                             <Skeleton className="h-3 w-32" />
//                           </div>
//                           <div className="shrink-0">
//                             <Skeleton className="h-5 w-20 rounded-full" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}
//           {/* Transaction List & Empty States (only when not loading and no error) */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Waiting for your money"
//                         : "Sending money";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       // Display currency: For Add use balance currency, for Send use send currency
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" &&
//                           transaction.balanceCurrency?.code
//                           ? transaction.balanceCurrency.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object" &&
//                           transaction.sendCurrency?.code
//                         ? transaction.sendCurrency.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       // Name: For Add show target balance, for Send show recipient name
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={transaction._id}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                 {icon}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}{" "}
//                                     <span className="italic">
//                                       ({transaction.status})
//                                     </span>
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? (
//                               <LuPlus
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             ) : (
//                               <GoArrowUp
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             );
//                             let description = isAddMoney
//                               ? "Added by you"
//                               : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney
//                               ? "text-green-600 dark:text-green-500"
//                               : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney
//                               ? transaction.amountToAdd ?? 0
//                               : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency ===
//                                   "object" && transaction.balanceCurrency?.code
//                                 ? transaction.balanceCurrency.code
//                                 : ""
//                               : typeof transaction.sendCurrency === "object" &&
//                                 transaction.sendCurrency?.code
//                               ? transaction.sendCurrency.code
//                               : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             // Clarify name for Add Money
//                             const name = isAddMoney
//                               ? `Added to ${displayCurrencyCode} balance`
//                               : transaction.name || "Recipient";

//                             // Adjust appearance based on final status
//                             if (
//                               transaction.status === "canceled" ||
//                               transaction.status === "cancelled"
//                             ) {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney
//                                 ? "Added"
//                                 : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link
//                                 href={`/dashboard/transactions/${transaction._id}`}
//                                 key={transaction._id}
//                                 className="block"
//                               >
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                       {icon}
//                                     </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                           {name}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                           {description}
//                                         </p>
//                                       </div>
//                                       <div
//                                         className={`font-medium ${amountClass} whitespace-nowrap`}
//                                       >
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, {
//                                           minimumFractionDigits: 2,
//                                           maximumFractionDigits: 2,
//                                         })}{" "}
//                                         {displayCurrencyCode}
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
//               )}

//               {/* Empty State (No transactions match filters or none exist at all) */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {/* Optional: Add a button to clear filters if filters are active */}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;

// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors that might have a response structure
// // Adjust this based on the actual structure of errors from your services (e.g., Axios)
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//             // other potential properties from error response body
//         };
//         status?: number;
//         // other potential response properties
//     };
// }

// // Helper function to parse date strings (assuming "dd-MM-yyyy" format from filter)
// // Consider making this more robust or using a library if formats vary widely
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;

//     // Try dd-MM-yyyy first (adjust if filter format differs)
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              // Use local time based on user's system if dates are local
//              return new Date(year, month, day);
//              // Or use UTC if dates should be timezone-agnostic:
//              // return new Date(Date.UTC(year, month, day));
//         }
//     }

//      // Fallback for ISO-like strings (e.g., from date pickers that output YYYY-MM-DD)
//      try {
//         const date = new Date(dateString);
//         // Check if the parsed date is valid
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }

//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);
//     // Optional: Add state for search query if search needs to be combined with filters more tightly
//     // const [searchQuery, setSearchQuery] = useState<string>('');

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         // Reset data states to prevent stale data flashing
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency, // Assuming this is populated object with 'code'
//                 payInCurrency: payment.payInCurrency,     // Assuming this is populated object with 'code'
//                 account: payment.account,                 // Account ID or object
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: payment.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 // Add other relevant fields if needed
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 // Safely access recipient name
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient' // Use nullish coalescing
//                       : 'Recipient', // Default if recipient is just an ID or null/undefined
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency, // Assuming this is populated object with 'code'
//                 receiveCurrency: transfer.receiveCurrency, // Assuming this is populated object with 'code'
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: transfer.status?.toLowerCase() ?? 'unknown', // Normalize status
//                 recipient: transfer.recipient, // Keep full recipient reference (ID or object)
//                 // Safely access source account ID
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id, // Use optional chaining if sourceAccount can be object
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions); // Initialize filtered list
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: unknown) { // <-- FIX: Changed 'any' to 'unknown' for better type safety
//             console.error("Data fetch error in TransactionsPage:", err);

//             let errorMessage = "Failed to fetch data. Please try again."; // Default message

//             // Check if it's a standard Error object
//             if (err instanceof Error) {
//                 errorMessage = err.message; // Use the standard error message first

//                 // Check if it resembles our defined ApiError structure (or a typical Axios error)
//                 // You might need to adjust these checks based on your actual error structure
//                 const apiError = err as ApiError; // Use type assertion carefully
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message; // Use the more specific backend message
//                 }
//             } else if (typeof err === 'string') {
//                 // Handle cases where a string might be thrown (less common)
//                 errorMessage = err;
//             }
//             // If err is not an Error object (e.g., null, undefined, primitive), the default message remains

//             setError(errorMessage);
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]); // Dependency: token

//     // Effect to fetch data on mount or when token changes
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // fetchData includes token in its dependency array

//     // --- Callback from Search Component ---
//     // This function is called when the search component provides results.
//     // Currently, it REPLACES the filtered list. This means subsequent filter applications
//     // will start from the full list again. If you want search AND filters to apply
//     // simultaneously, the filtering logic needs to incorporate the search query.
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//          // To apply filters *on top of* search results, you'd need to:
//          // 1. Store the search query in state.
//          // 2. Modify handleFiltersApply to filter *these* searchResults instead of allTransactions,
//          //    OR modify handleFiltersApply to *also* filter by the stored search query.
//     }, []);

//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: {
//         selectedRecipients: (string | number)[],
//         selectedDirection?: string,
//         selectedStatus?: string | null,
//         selectedBalance?: string[], // Currency codes
//         fromDate?: string,          // Date string "dd-MM-yyyy" (or format from picker)
//         toDate?: string            // Date string "dd-MM-yyyy" (or format from picker)
//     }) => {
//         console.log("Applying filters:", filters);

//         // 1. Update state tracking the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);
//         // Optional: If search is integrated, update search query state here too if passed

//         // 2. Start with the full list of transactions
//         let tempFiltered = [...allTransactions];

//         // --- Apply Filters Sequentially ---

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized to lowercase in mapping
//                 if (!txStatus) return false; // Should not happen if normalized

//                 // Map UI filter names to backend statuses (ensure these match your backend)
//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled' || txStatus === 'cancelled'; // Allow both spellings
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false; // Unknown filter status
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     // Check balanceCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     // Check sendCurrency if it exists and has a code
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 // Ensure code exists and is included in the selected filters
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String); // Ensure comparison as strings
//              tempFiltered = tempFiltered.filter(tx => {
//                 // Only apply to 'Send Money' transactions
//                 if (tx.type !== "Send Money") {
//                     return true; // Keep 'Add Money' transactions
//                 }
//                 // Check if the transaction's recipient ID matches any selected filter ID
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null); // Handle recipient being just an ID string

//                 return recipientId ? recipientFilterIds.includes(recipientId) : false; // Exclude if no valid recipient ID
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);

//         // Set time to ensure full day coverage
//         // Use UTC methods if dates are UTC, otherwise local time methods
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0); // Start of the selected day (local)
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999); // End of the selected day (local)

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 // Prefer updatedAt, fallback to createdAt
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false; // Cannot filter without a date

//                 try {
//                     const transactionDateObj = new Date(transactionDateStr); // Assumes backend sends ISO 8601 format
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false; // Exclude if date is invalid
//                     }

//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) {
//                         include = false;
//                     }
//                     if (toDateObj && transactionDateObj > toDateObj) {
//                         include = false;
//                     }
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false; // Exclude on parsing error
//                 }
//             });
//         }

//         // 3. Update the state holding the transactions to be displayed
//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]); // Dependency: Re-run filter logic if the base list changes

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "cancelled" || tx.status === "failed"
//         );

//         // Sort processed transactions by date (newest first)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing or invalid
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1; // Put items without date at the end
//             if (!dateB) return -1; // Put items without date at the end
//             try {
//                // Compare timestamps for accuracy
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0; // Maintain original order if comparison fails
//             }
//         });

//         // Group sorted processed transactions by date string
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     // Handle transactions without a date (group them under 'Unknown Date'?)
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     // Use a consistent locale and format for grouping keys
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { // Example: 'en-GB' for dd/mm/yyyy
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     // Optionally group errors under a specific key
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Optionally sort the date keys if needed (e.g., newest date group first)
//         // const sortedGroupKeys = Object.keys(grouped).sort((a, b) => { /* complex date key sorting logic */ });

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Recalculate only when filteredTransactions changes

//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//         {/* Removed extra div wrapper here */}
//         <div className="container mx-auto">
//           {" "}
//           {/* Added container and padding */}
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Render Actions only when accounts are loaded (needed for Filter/Search) */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions} // Pass full list for Search/Filter base
//                 userAccounts={userAccounts} // Pass accounts for filter options
//                 onTransactionsChange={handleTransactionsChange} // Callback for search results
//                 onFiltersApply={handleFiltersApply} // Callback for filter application
//               />
//             )}
//             {/* Show skeleton/placeholder while accounts load */}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {/* Optional: Handle case where accounts loaded but are empty */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>
//           {/* Loading State */}
//           {isLoading && (
//             <div className="space-y-2">
//               {Array(8)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div key={index} className="block">
//                     <div className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                         {/* Icon Skeleton */}
//                         <div className="relative flex-shrink-0">
//                           <div className="flex items-center justify-center">
//                             <Skeleton className="h-12 w-12 rounded-full" />
//                           </div>
//                         </div>
//                         {/* Text and Button Skeletons */}
//                         <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                           <div className="flex-grow">
//                             <Skeleton className="h-4 w-40 mb-2" />
//                             <Skeleton className="h-3 w-32" />
//                           </div>
//                           <div className="shrink-0">
//                             <Skeleton className="h-5 w-20 rounded-full" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}
//           {/* Transaction List & Empty States (only when not loading and no error) */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Waiting for your money"
//                         : "Sending money";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       // Display currency: For Add use balance currency, for Send use send currency
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" &&
//                           transaction.balanceCurrency?.code
//                           ? transaction.balanceCurrency.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object" &&
//                           transaction.sendCurrency?.code
//                         ? transaction.sendCurrency.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       // Name: For Add show target balance, for Send show recipient name
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={transaction._id}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                 {icon}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}{" "}
//                                     <span className="italic">
//                                       ({transaction.status})
//                                     </span>
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? (
//                               <LuPlus
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             ) : (
//                               <GoArrowUp
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             );
//                             let description = isAddMoney
//                               ? "Added by you"
//                               : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney
//                               ? "text-green-600 dark:text-green-500"
//                               : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney
//                               ? transaction.amountToAdd ?? 0
//                               : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency ===
//                                   "object" && transaction.balanceCurrency?.code
//                                 ? transaction.balanceCurrency.code
//                                 : ""
//                               : typeof transaction.sendCurrency === "object" &&
//                                 transaction.sendCurrency?.code
//                               ? transaction.sendCurrency.code
//                               : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             // Clarify name for Add Money
//                             const name = isAddMoney
//                               ? `Added to ${displayCurrencyCode} balance`
//                               : transaction.name || "Recipient";

//                             // Adjust appearance based on final status
//                             if (
//                               transaction.status === "canceled" ||
//                               transaction.status === "cancelled"
//                             ) {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney
//                                 ? "Added"
//                                 : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link
//                                 href={`/dashboard/transactions/${transaction._id}`}
//                                 key={transaction._id}
//                                 className="block"
//                               >
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                       {icon}
//                                     </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//                                           {name}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                           {description}
//                                         </p>
//                                       </div>
//                                       <div
//                                         className={`font-medium ${amountClass} whitespace-nowrap`}
//                                       >
//                                         {amountPrefix}
//                                         {amount.toLocaleString(undefined, {
//                                           minimumFractionDigits: 2,
//                                           maximumFractionDigits: 2,
//                                         })}{" "}
//                                         {displayCurrencyCode}
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
//               )}

//               {/* Empty State (No transactions match filters or none exist at all) */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {/* Optional: Add a button to clear filters if filters are active */}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;

// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// // ***** FIX 1: Import TransactionStatus *****
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              return new Date(year, month, day); // Use local time
//         }
//     }
//      // Fallback for ISO-like strings
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // ***** FIX 3: Define specific filter type *****
// interface AppliedFilters {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null;
//     selectedBalance?: string[];
//     fromDate?: string;
//     toDate?: string;
// }

// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 account: payment.account,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 // ***** FIX 1: Cast status to TransactionStatus *****
//                 // Assumes 'unknown' is a valid TransactionStatus or should be handled differently
//                 status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient'
//                       : 'Recipient',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                  // ***** FIX 1: Cast status to TransactionStatus *****
//                  // Assumes 'unknown' is a valid TransactionStatus or should be handled differently
//                 status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: transfer.recipient,
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id,
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions);
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: unknown) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             let errorMessage = "Failed to fetch data. Please try again.";
//             if (err instanceof Error) {
//                 errorMessage = err.message;
//                 const apiError = err as ApiError;
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message;
//                 }
//             } else if (typeof err === 'string') {
//                 errorMessage = err;
//             }
//             setError(errorMessage);
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          setFilteredTransactions(searchResults);
//     }, []);

//     // --- Callback from Filter Component ---
//     // Function signature now implicitly matches AppliedFilters type
//     const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//         console.log("Applying filters:", filters);

//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         let tempFiltered = [...allTransactions];

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized or casted to TransactionStatus

//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 // ***** FIX 2: Remove redundant 'cancelled' check *****
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled';
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false;
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String);
//              tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type !== "Send Money") {
//                     return true;
//                 }
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null);
//                 return recipientId ? recipientFilterIds.includes(recipientId) : false;
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false;
//                 try {
//                     const transactionDateObj = new Date(transactionDateStr);
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false;
//                     }
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                 }
//             });
//         }

//         setFilteredTransactions(tempFiltered);

//     }, [allTransactions]);

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgress = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         // ***** FIX 2: Remove redundant 'cancelled' check *****
//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed"
//         );

//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1;
//             if (!dateB) return -1;
//             try {
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort:", dateA, dateB, e);
//                 return 0;
//             }
//         });

//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', {
//                         year: "numeric", month: "long", day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         return { inProgressTransactions: inProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]);

//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;

//     return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//         <div className="container mx-auto">
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions}
//                 userAccounts={userAccounts}
//                 onTransactionsChange={handleTransactionsChange}
//                 // ***** FIX 3: Pass the correctly typed handler *****
//                 onFiltersApply={handleFiltersApply}
//               />
//             )}
//             {loadingAccounts && (
//               <div className="flex items-center gap-4 animate-pulse">
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                 <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//               </div>
//             )}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>

//           {/* Loading State */}
//           {isLoading && (
//              <div className="space-y-2">
//               {Array(8).fill(0).map((_, index) => (
//                   <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                       <div className="flex items-center gap-4">
//                           <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
//                           <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                               <div className="flex-grow">
//                                   <Skeleton className="h-4 w-40 mb-2" />
//                                   <Skeleton className="h-3 w-32" />
//                               </div>
//                               <div className="shrink-0">
//                                   <Skeleton className="h-5 w-20 rounded-full" />
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               ))}
//             </div>
//           )}

//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           {/* Transaction List & Empty States */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section */}
//               {inProgressTransactions.length > 0 && (
//                 <div>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                         : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p>
//                                 </div>
//                                 <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
//                                   {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date}>
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                             let description = isAddMoney ? "Added by you" : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                               : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                             // ***** FIX 2: Remove redundant 'cancelled' check *****
//                             if (transaction.status === "canceled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               description = isAddMoney ? "Added" : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
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
//               )}

//               {/* Empty State */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             handleFiltersApply({ // Ensure this object matches AppliedFilters
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;

// "use client"; // Essential for using hooks
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
//              return new Date(year, month, day); // Use local time
//         }
//     }
//      // Fallback for ISO-like strings
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//             return date;
//         }
//      } catch (e) {
//          console.warn("Could not parse date string with new Date():", dateString, e);
//      }
//     console.warn("Could not parse date string:", dateString);
//     return null;
// }

// // Define specific filter type
// interface AppliedFilters {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null;
//     selectedBalance?: string[];
//     fromDate?: string;
//     toDate?: string;
// }

// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//       <section className="Transaction-Page pb-8 md:pb-10">
//           <div className="container mx-auto">
//               {/* Skeleton for Header and Actions */}
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky top-0 z-10 bg-white dark:bg-background">
//                   {/* Skeleton for H1 Title */}
//                   <Skeleton className="h-8 w-64 rounded-md" />
//                   {/* Skeleton for Actions (Search, Filters) */}
//                   <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//                       <Skeleton className="h-10 w-full sm:w-64 rounded-full" /> {/* Search */}
//                       <Skeleton className="h-10 w-32 rounded-full" /> {/* Filter Button */}
//                   </div>
//               </div>

//               {/* Skeleton for Transaction List */}
//               <div className="space-y-2">
//                   {Array(8).fill(0).map((_, index) => (
//                       <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                           <div className="flex items-center gap-4">
//                               <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
//                               <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                   <div className="flex-grow">
//                                       <Skeleton className="h-4 w-40 mb-2" />
//                                       <Skeleton className="h-3 w-32" />
//                                   </div>
//                                   <div className="shrink-0">
//                                       <Skeleton className="h-5 w-20 rounded-full" />
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </section>
//   );
// };

// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);

//     // State to hold the currently applied filters
//     const [appliedRecipientFilters, setAppliedRecipientFilters] = useState<(string | number)[]>([]);
//     const [appliedDirectionFilter, setAppliedDirectionFilter] = useState<string>('all');
//     const [appliedStatusFilter, setAppliedStatusFilter] = useState<string | null>(null);
//     const [appliedBalanceFilter, setAppliedBalanceFilter] = useState<string[]>([]);
//     const [appliedFromDateFilter, setAppliedFromDateFilter] = useState<string | undefined>(undefined);
//     const [appliedToDateFilter, setAppliedToDateFilter] = useState<string | undefined>(undefined);

//     // Loading and Error states
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Authentication context
//     const { token } = useAuth();

//     // --- Data Fetching ---
//     const fetchData = useCallback(async () => {
//         if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//             return;
//         }

//         setLoadingTransactions(true);
//         setLoadingAccounts(true);
//         setError(null);
//         setAllTransactions([]);
//         setFilteredTransactions([]);
//         setUserAccounts([]);

//         try {
//             const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);

//             // Process Payments (Add Money)
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id,
//                 type: "Add Money",
//                 amountToAdd: payment.amountToAdd,
//                 amountToPay: payment.amountToPay,
//                 balanceCurrency: payment.balanceCurrency,
//                 payInCurrency: payment.payInCurrency,
//                 account: payment.account,
//                 createdAt: payment.createdAt,
//                 updatedAt: payment.updatedAt,
//                 status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//             }));

//             // Process Transfers (Send Money)
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => ({
//                 _id: transfer._id,
//                 type: "Send Money",
//                 name: (typeof transfer.recipient === 'object' && transfer.recipient !== null)
//                       ? transfer.recipient.accountHolderName ?? 'Recipient'
//                       : 'Recipient',
//                 sendAmount: transfer.sendAmount,
//                 receiveAmount: transfer.receiveAmount,
//                 sendCurrency: transfer.sendCurrency,
//                 receiveCurrency: transfer.receiveCurrency,
//                 createdAt: transfer.createdAt,
//                 updatedAt: transfer.updatedAt,
//                 status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 recipient: transfer.recipient,
//                 sourceAccountId: typeof transfer.sourceAccount === 'string'
//                                 ? transfer.sourceAccount
//                                 : transfer.sourceAccount?._id,
//             }));

//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions);
//             setLoadingTransactions(false);

//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);

//         } catch (err: unknown) {
//             console.error("Data fetch error in TransactionsPage:", err);
//             let errorMessage = "Failed to fetch data. Please try again.";
//             if (err instanceof Error) {
//                 errorMessage = err.message;
//                 const apiError = err as ApiError;
//                 if (apiError.response?.data?.message) {
//                     errorMessage = apiError.response.data.message;
//                 }
//             } else if (typeof err === 'string') {
//                 errorMessage = err;
//             }
//             setError(errorMessage);
//             setLoadingTransactions(false);
//             setLoadingAccounts(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // --- Callback from Search Component ---
//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          // When search changes, it resets the filter application base
//          // Re-apply current filters to the new search results
//          applyFilters(searchResults, {
//             selectedRecipients: appliedRecipientFilters,
//             selectedDirection: appliedDirectionFilter,
//             selectedStatus: appliedStatusFilter,
//             selectedBalance: appliedBalanceFilter,
//             fromDate: appliedFromDateFilter,
//             toDate: appliedToDateFilter
//          });
//     }, [
//         // Include all applied filter states here so the callback updates correctly
//         appliedRecipientFilters,
//         appliedDirectionFilter,
//         appliedStatusFilter,
//         appliedBalanceFilter,
//         appliedFromDateFilter,
//         appliedToDateFilter
//     ]); // Dependencies on filter states ensure the re-application uses current filter values

//     // --- Centralized Filter Application Logic ---
//     // This function applies filters to a given transaction list
//     const applyFilters = (transactionsToFilter: Transaction[], filters: AppliedFilters) => {
//         let tempFiltered = [...transactionsToFilter];

//         // Apply Direction Filter
//         const direction = filters.selectedDirection;
//         if (direction && direction !== 'all') {
//             tempFiltered = tempFiltered.filter(tx =>
//                 (direction === 'add' && tx.type === 'Add Money') ||
//                 (direction === 'send' && tx.type === 'Send Money')
//             );
//         }

//         // Apply Status Filter
//         const statusFilter = filters.selectedStatus;
//         if (statusFilter) {
//             const lowerCaseStatusFilter = statusFilter.toLowerCase();
//             tempFiltered = tempFiltered.filter(tx => {
//                 const txStatus = tx.status; // Already normalized or casted

//                 if (lowerCaseStatusFilter === 'completed') return txStatus === 'completed';
//                 if (lowerCaseStatusFilter === 'cancelled') return txStatus === 'canceled';
//                 if (lowerCaseStatusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                 if (lowerCaseStatusFilter === 'failed') return txStatus === 'failed';
//                 return false;
//             });
//         }

//         // Apply Balance (Currency) Filter
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') {
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null
//                         ? tx.balanceCurrency.code
//                         : undefined;
//                 } else if (tx.type === 'Send Money') {
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null
//                         ? tx.sendCurrency.code
//                         : undefined;
//                 }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         // Apply Recipient Filter
//         const recipientFilters = filters.selectedRecipients;
//         if (recipientFilters && recipientFilters.length > 0) {
//              const recipientFilterIds = recipientFilters.map(String);
//              tempFiltered = tempFiltered.filter(tx => {
//                 if (tx.type !== "Send Money") {
//                     // Keep non-send transactions if recipient filter is active
//                     // Or filter them out if you only want sends matching recipients
//                     // Current logic: Keep non-sends
//                     return true;
//                 }
//                 const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id)
//                                     ? String(tx.recipient._id)
//                                     : (typeof tx.recipient === 'string' ? tx.recipient : null);
//                 return recipientId ? recipientFilterIds.includes(recipientId) : false;
//             });
//         }

//         // Apply Date Filter
//         const fromDateObj = parseDateString(filters.fromDate);
//         const toDateObj = parseDateString(filters.toDate);
//         if (fromDateObj) fromDateObj.setHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//             tempFiltered = tempFiltered.filter(tx => {
//                 const transactionDateStr = tx.updatedAt || tx.createdAt;
//                 if (!transactionDateStr) return false;
//                 try {
//                     const transactionDateObj = new Date(transactionDateStr);
//                     if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid transaction date string:", transactionDateStr);
//                          return false;
//                     }
//                     let include = true;
//                     if (fromDateObj && transactionDateObj < fromDateObj) include = false;
//                     if (toDateObj && transactionDateObj > toDateObj) include = false;
//                     return include;
//                 } catch (e) {
//                     console.error("Error parsing transaction date for filtering:", transactionDateStr, e);
//                     return false;
//                 }
//             });
//         }

//         setFilteredTransactions(tempFiltered);
//     };

//     // --- Callback from Filter Component ---
//     const handleFiltersApply = useCallback((filters: AppliedFilters) => {
//         console.log("Applying filters:", filters);

//         // Update the state holding the applied filters
//         setAppliedRecipientFilters(filters.selectedRecipients || []);
//         setAppliedDirectionFilter(filters.selectedDirection || 'all');
//         setAppliedStatusFilter(filters.selectedStatus || null);
//         setAppliedBalanceFilter(filters.selectedBalance || []);
//         setAppliedFromDateFilter(filters.fromDate);
//         setAppliedToDateFilter(filters.toDate);

//         // Apply these filters to the *complete* set of transactions
//         applyFilters(allTransactions, filters);

//     }, [allTransactions]); // Depends on allTransactions

//      // --- Transaction Grouping Logic (Optimized with useMemo) ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         // Filter for 'in progress' or 'pending' statuses
//         const inProgressUnsorted = filteredTransactions.filter(
//             (tx) => tx.status === "in progress" || tx.status === "pending"
//         );

//         // **** SORT "IN PROGRESS" TRANSACTIONS BY LATEST DATE ****
//         const sortedInProgress = [...inProgressUnsorted].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             // Handle cases where dates might be missing
//             if (!dateA && !dateB) return 0; // Keep original order if both dates missing
//             if (!dateA) return 1; // Put items without dates last
//             if (!dateB) return -1; // Put items without dates last
//             try {
//                // Sort descending (latest first)
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort (In Progress):", dateA, dateB, e);
//                 return 0; // Avoid crash on invalid date format
//             }
//         });
//         // **** END OF SORTING ****

//         // Filter for processed statuses
//         const processed = filteredTransactions.filter(
//             (tx) => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed"
//         );

//         // Sort processed transactions by latest date (existing logic)
//         const sortedProcessed = [...processed].sort((a, b) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1;
//             if (!dateB) return -1;
//             try {
//                return new Date(dateB).getTime() - new Date(dateA).getTime();
//             } catch (e) {
//                 console.error("Error comparing dates during sort (Processed):", dateA, dateB, e);
//                 return 0;
//             }
//         });

//         // Group sorted processed transactions by date (existing logic)
//         const grouped = sortedProcessed.reduce(
//             (groups: { [date: string]: Transaction[] }, tx) => {
//                 const groupDateStr = tx.updatedAt || tx.createdAt;
//                 if (!groupDateStr) {
//                     const unknownDateKey = 'Unknown Date';
//                     if (!groups[unknownDateKey]) groups[unknownDateKey] = [];
//                     groups[unknownDateKey].push(tx);
//                     return groups;
//                 }
//                 try {
//                     const dateKey = new Date(groupDateStr).toLocaleDateString('en-US', {
//                         year: "numeric", month: "long", day: "numeric",
//                     });
//                     if (!groups[dateKey]) groups[dateKey] = [];
//                     groups[dateKey].push(tx);
//                 } catch (e) {
//                     console.error("Error formatting date for grouping:", groupDateStr, e);
//                     const errorKey = 'Date Error';
//                     if (!groups[errorKey]) groups[errorKey] = [];
//                     groups[errorKey].push(tx);
//                 }
//                 return groups;
//             }, {}
//         );

//         // Return the sorted in-progress list and the grouped processed list
//         return { inProgressTransactions: sortedInProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Dependency remains on filteredTransactions

//     // --- Render Logic ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     // *** RENDER SKELETON IF LOADING ***
//     if (isLoading) {
//       return <TransactionsPageSkeleton />;
//   }

//     return (
//       <section className="Transaction-Wrapper pb-8 md:pb-10">
//         <div className="Transaction-Page">
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               Transactions
//             </h1>
//             {/* Conditional rendering for actions based on accounts loading is now implicit */}
//             {!loadingAccounts && userAccounts.length > 0 && (
//               <TransactionActions
//                 transactions={allTransactions}
//                 userAccounts={userAccounts}
//                 onTransactionsChange={handleTransactionsChange}
//                 onFiltersApply={handleFiltersApply}
//               />
//             )}
//             {/* Skeleton for actions during only account loading phase (less likely now with combined check) */}
//             {/* {loadingAccounts && !loadingTransactions && (...) } */} {/* This case is less common with the combined isLoading check */}
//             {!loadingAccounts && userAccounts.length === 0 && !error && (
//               <p className="text-sm text-gray-500">
//                 Create an account to start making transactions.
//               </p>
//             )}
//           </div>

//           {/* Error State */}
//           {!isLoading && error && (
//             <div className="text-center py-10 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           {/* Transaction List & Empty States */}
//           {!isLoading && !error && (
//             <div className="space-y-4">
//               {/* In Progress Section (Now Sorted by Latest Date) */}
//               {inProgressTransactions.length > 0 && (
//                 <div className="InProcess-Transaction-Lists">
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox">
//                     In progress
//                   </h3>
//                   <div className="space-y-2">
//                     {/* Renders the already sorted inProgressTransactions */}
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                         : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `To your ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className=" text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p>
//                                 </div>
//                                 <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
//                                   {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Processed Sections (Grouped by Date) */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date} className="Transaction-Lists">
//                         <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-gray-200 dark:border-primarybox">
//                           {date}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                             let description = isAddMoney ? "Added by you" : `To ${transaction.name || "Recipient"}`;
//                             let amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900  dark:text-white";
//                             const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency === "object" && transaction.balanceCurrency?.code ? transaction.balanceCurrency.code : ""
//                               : typeof transaction.sendCurrency === "object" && transaction.sendCurrency?.code ? transaction.sendCurrency.code : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             const name = isAddMoney ? `Added to ${displayCurrencyCode} balance` : transaction.name || "Recipient";

//                             if (transaction.status === "canceled") {
//                               description = "Cancelled";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "failed") {
//                               description = "Failed";
//                               amountClass = "text-red-600 line-through";
//                             } else if (transaction.status === "completed") {
//                               // Keep specific descriptions for completed
//                                description = isAddMoney ? "Added" : `Sent to ${transaction.name || "Recipient"}`;
//                             }

//                             return (
//                               <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className=" text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"> {name} </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p>
//                                       </div>
//                                       <div className={`font-medium ${amountClass} whitespace-nowrap`}>
//                                         {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
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
//               )}

//               {/* Empty State */}
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 py-12 dark:bg-white/5 rounded-lg mt-6">
//                   {allTransactions.length === 0
//                     ? "You haven't made any transactions yet."
//                     : "No transactions match your current filter or search criteria."}
//                   {(appliedRecipientFilters.length > 0 ||
//                     appliedDirectionFilter !== "all" ||
//                     appliedStatusFilter ||
//                     appliedBalanceFilter.length > 0 ||
//                     appliedFromDateFilter ||
//                     appliedToDateFilter) &&
//                     allTransactions.length > 0 && (
//                       <div className="flex justify-center ">
//                         <button
//                           onClick={() =>
//                             // Reset filters and re-apply with defaults to show all again
//                             handleFiltersApply({
//                               selectedRecipients: [],
//                               selectedDirection: "all",
//                               selectedStatus: null,
//                               selectedBalance: [],
//                               fromDate: undefined,
//                               toDate: undefined,
//                             })
//                           }
//                           className="mt-4 px-6 cursor-pointer py-3 w-38 bg-primary text-mainheading rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                         >
//                           Clear Filters
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     );
// };

// export default TransactionsPage;

// // frontend/src/app/dashboard/transactions/page.tsx
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import TransactionActions from "./TransactionActions"; // Adjust path if needed
// import FilterModal, { AppliedFilters } from "./FilterModal"; // *** IMPORT FilterModal AND AppliedFilters *** Adjust path

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path
// import accountService from "../../../services/account"; // Adjust path

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction"; // Adjust path
// import { Account } from "@/types/account"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings (DD-MM-YYYY or ISO-like fallback)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     // Try dd-MM-yyyy first
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
//         const year = parseInt(parts[2], 10);
//         // Basic validation for DD-MM-YYYY parts
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              // Further check if the date is valid (e.g., not 31st Feb)
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
//                  return date; // Return UTC date object
//              }
//         }
//     }
//      // Fallback for ISO-like strings or other formats Date can handle
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//              // Return UTC date object for consistency
//              return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
//         }
//      } catch (e) {
//          // console.warn("Could not parse date string with new Date():", dateString, e);
//      }
//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Transactions Page Skeleton ---
// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//       <section className="Transaction-Page pb-8 pt-5 md:pb-10">
//           <div className="container mx-auto">
//               {/* Skeleton for Header and Actions */}
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//                   <Skeleton className="md:h-12 h-8 md:w-64 w-40 rounded-full" />
//                   <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//                       <Skeleton className="h-12 w-full sm:w-70 rounded-full" /> {/* Search */}
//                       <Skeleton className="h-12 w-32 rounded-full" /> {/* Filter Button */}
//                   </div>
//               </div>

//               {/* Skeleton for Transaction List */}
//               <div className="space-y-2">
//                   {Array(8).fill(0).map((_, index) => (
//                       <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                           <div className="flex items-center gap-4">
//                               <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                               <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                   <div className="flex-grow">
//                                       <Skeleton className="h-5 md:w-40 w-28 mb-2" />
//                                       <Skeleton className="h-4 md:w-58 w-40" />
//                                   </div>
//                                   <div className="shrink-0">
//                                       <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" />
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </section>
//   );
// };

// // --- Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);
//     const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: "", toDate: "",
//     });
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//     // --- Hooks --- (All hooks MUST come before any conditional returns)
//     const { token } = useAuth();

//     // --- Callbacks ---
//     const fetchData = useCallback(async () => {
//         // ... (fetch data logic remains the same) ...
//          if (!token) {
//             setError("Authentication token is missing. Please log in.");
//             setLoadingTransactions(false); setLoadingAccounts(false); return;
//         }
//         setLoadingTransactions(true); setLoadingAccounts(true); setError(null);
//         setAllTransactions([]); setFilteredTransactions([]); setUserAccounts([]);
//         setActiveFilters({
//            selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//            selectedBalance: [], fromDate: "", toDate: "",
//         });
//         try {
//              const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token),
//                 transferService.getUserTransfers(token),
//                 accountService.getUserAccounts(token)
//             ]);
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({ /* mapping */_id:payment._id,type:"Add Money",amountToAdd:payment.amountToAdd,amountToPay:payment.amountToPay,balanceCurrency:payment.balanceCurrency,payInCurrency:payment.payInCurrency,account:payment.account,createdAt:payment.createdAt,updatedAt:payment.updatedAt,status:(payment.status?.toLowerCase()??'unknown')as TransactionStatus}));
//             const mappedTransfers: Transaction[] = transfersData.map(transfer=>({/* mapping */_id:transfer._id,type:"Send Money",name:(typeof transfer.recipient==='object'&&transfer.recipient!==null)?transfer.recipient.accountHolderName??'Recipient':'Recipient',sendAmount:transfer.sendAmount,receiveAmount:transfer.receiveAmount,sendCurrency:transfer.sendCurrency,receiveCurrency:transfer.receiveCurrency,createdAt:transfer.createdAt,updatedAt:transfer.updatedAt,status:(transfer.status?.toLowerCase()??'unknown')as TransactionStatus,recipient:transfer.recipient,sourceAccountId:typeof transfer.sourceAccount==='string'?transfer.sourceAccount:transfer.sourceAccount?._id}));
//             const combinedTransactions = [...mappedPayments,...mappedTransfers];
//             combinedTransactions.sort((a,b)=>{const dateA=a.updatedAt||a.createdAt;const dateB=b.updatedAt||b.createdAt;if(!dateA&&!dateB)return 0;if(!dateA)return 1;if(!dateB)return -1;try{return new Date(dateB).getTime()-new Date(dateA).getTime();}catch(e){console.error("Error comparing dates:",dateA,dateB,e);return 0;}});
//             setAllTransactions(combinedTransactions);
//             setFilteredTransactions(combinedTransactions);
//             setLoadingTransactions(false);
//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);
//         } catch (err:unknown) {
//             console.error("Fetch error:",err);
//             let errorMessage="Failed to fetch data.";
//             if(err instanceof Error){errorMessage=err.message;const apiError=err as ApiError;if(apiError.response?.data?.message){errorMessage=apiError.response.data.message;}}else if(typeof err==='string'){errorMessage=err;}
//             setError(errorMessage);
//             setLoadingTransactions(false);setLoadingAccounts(false);
//         }
//     }, [token]);

//     const applyFilters = useCallback((transactionsToFilter: Transaction[], filters: AppliedFilters) => {
//         // ... (applyFilters logic remains the same) ...
//         console.log("Applying filters inside applyFilters:", filters);
//         let tempFiltered = [...transactionsToFilter];
//         const direction=filters.selectedDirection;if(direction!=='all'){tempFiltered=tempFiltered.filter(tx=>(direction==='add'&&tx.type==='Add Money')||(direction==='send'&&tx.type==='Send Money'));}
//         const statusFilter=filters.selectedStatus?.toLowerCase();if(statusFilter){tempFiltered=tempFiltered.filter(tx=>{const txStatus=tx.status;if(statusFilter==='completed')return txStatus==='completed';if(statusFilter==='cancelled')return txStatus==='canceled';if(statusFilter==='in process')return txStatus==='in progress'||txStatus==='pending';if(statusFilter==='failed')return txStatus==='failed';return false;});}
//         const balanceFilters=filters.selectedBalance;if(balanceFilters&&balanceFilters.length>0){tempFiltered=tempFiltered.filter(tx=>{let currencyCodeToCheck:string|undefined;if(tx.type==='Add Money'){currencyCodeToCheck=typeof tx.balanceCurrency==='object'&&tx.balanceCurrency!==null?tx.balanceCurrency.code:undefined;}else if(tx.type==='Send Money'){currencyCodeToCheck=typeof tx.sendCurrency==='object'&&tx.sendCurrency!==null?tx.sendCurrency.code:undefined;}return currencyCodeToCheck?balanceFilters.includes(currencyCodeToCheck):false;});}
//         const recipientFilters=filters.selectedRecipients;if(recipientFilters&&recipientFilters.length>0){const recipientFilterIds=recipientFilters.map(String);tempFiltered=tempFiltered.filter(tx=>{if(tx.type!=="Send Money")return true;const recipientId=(typeof tx.recipient==='object'&&tx.recipient?._id)?String(tx.recipient._id):(typeof tx.recipient==='string'?tx.recipient:null);return recipientId?recipientFilterIds.includes(recipientId):false;});}
//         const fromDateObj=parseDateString(filters.fromDate||undefined);const toDateObj=parseDateString(filters.toDate||undefined);if(fromDateObj)fromDateObj.setUTCHours(0,0,0,0);if(toDateObj)toDateObj.setUTCHours(23,59,59,999);if(fromDateObj||toDateObj){tempFiltered=tempFiltered.filter(tx=>{const transactionDateStr=tx.updatedAt||tx.createdAt;if(!transactionDateStr)return false;try{const transactionDateObj=new Date(transactionDateStr);if(isNaN(transactionDateObj.getTime())){console.warn("Invalid date:",transactionDateStr);return false;}let include=true;if(fromDateObj&&transactionDateObj<fromDateObj)include=false;if(toDateObj&&transactionDateObj>toDateObj)include=false;return include;}catch(e){console.error("Date parse error:",transactionDateStr,e);return false;}});
//         }
//         setFilteredTransactions(tempFiltered);
//     }, []); // No external dependencies needed if it's pure logic

//     const handleTransactionsChange = useCallback((searchResults: Transaction[]) => {
//          console.log("Applying search results:", searchResults.length);
//          applyFilters(searchResults, activeFilters);
//     }, [applyFilters, activeFilters]);

//     const handleFiltersApply = useCallback((filtersFromModal: AppliedFilters) => {
//         console.log("Applying filters from modal callback:", filtersFromModal);
//         setActiveFilters(filtersFromModal);
//         applyFilters(allTransactions, filtersFromModal);
//     }, [allTransactions, applyFilters]);

//     // --- Effects ---
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // Run fetchData on mount (and if token changes)

//     // --- Memoized Values ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         // ... (grouping/sorting logic remains the same) ...
//          const inProgressUnsorted = filteredTransactions.filter(tx => tx.status === "in progress" || tx.status === "pending");
//         const sortedInProgress = [...inProgressUnsorted].sort((a,b)=>{const dateA=a.updatedAt||a.createdAt;const dateB=b.updatedAt||b.createdAt;if(!dateA&&!dateB)return 0;if(!dateA)return 1;if(!dateB)return -1;try{return new Date(dateB).getTime()-new Date(dateA).getTime();}catch(e){return 0;}});
//         const processed=filteredTransactions.filter(tx=>tx.status==="completed"||tx.status==="canceled"||tx.status==="failed");
//         const sortedProcessed=[...processed].sort((a,b)=>{const dateA=a.updatedAt||a.createdAt;const dateB=b.updatedAt||b.createdAt;if(!dateA&&!dateB)return 0;if(!dateA)return 1;if(!dateB)return -1;try{return new Date(dateB).getTime()-new Date(dateA).getTime();}catch(e){return 0;}});
//         const grouped=sortedProcessed.reduce((groups:{[date:string]:Transaction[]},tx)=>{const groupDateStr=tx.updatedAt||tx.createdAt;let dateKey='Unknown Date';if(groupDateStr){try{dateKey=new Date(groupDateStr).toLocaleDateString('en-US',{year:"numeric",month:"long",day:"numeric"});}catch(e){dateKey='Date Formatting Error';}}if(!groups[dateKey])groups[dateKey]=[];groups[dateKey].push(tx);return groups;},{});
//         return{inProgressTransactions:sortedInProgress,groupedProcessedTransactions:grouped};
//     }, [filteredTransactions]);

//     // Moved this useMemo *before* the conditional return
//     const filtersAreActive = useMemo(() => {
//         return (
//             activeFilters.selectedRecipients.length > 0 ||
//             activeFilters.selectedDirection !== 'all' ||
//             activeFilters.selectedStatus !== null ||
//             activeFilters.selectedBalance.length > 0 ||
//             activeFilters.fromDate !== "" ||
//             activeFilters.toDate !== ""
//         );
//     }, [activeFilters]);

//     // --- Loading State Check --- (MUST come after ALL hook calls)
//     const isLoading = loadingTransactions || loadingAccounts;
//     if (isLoading) {
//       return <TransactionsPageSkeleton />;
//     }

//     // --- Non-Hook Logic & Helper Functions (can come after hooks and loading check) ---
//     const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//     const handleCloseFilterModal = () => setIsFilterModalOpen(false);

//     const clearAllAppliedFilters = () => {
//         handleFiltersApply({
//             selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//             selectedBalance: [], fromDate: "", toDate: "",
//         });
//     };

//     // --- Render ---
//     return (
//       <>
//         <section className="Transaction-Wrapper pb-8 pt-5 md:pb-10">
//           <div className="Transaction-Page">
//             {/* Header and Actions */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//               <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                 Transactions
//               </h1>

//               {/* Render actions only when accounts are loaded and available */}
//               {userAccounts.length > 0 && (
//                 <TransactionActions
//                   transactions={allTransactions}
//                   userAccounts={userAccounts}
//                   onTransactionsChange={handleTransactionsChange}
//                   onFilterButtonClick={handleOpenFilterModal}
//                 />
//               )}

//               {/* Message if no accounts exist */}
//               {userAccounts.length === 0 && !error && (
//                 <p className="text-sm text-gray-500">
//                   Create an account to start making transactions.
//                 </p>
//               )}
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="text-center py-5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 mb-2 rounded-md border border-red-200 dark:border-red-800/30">
//                 <strong>Error:</strong> {error}
//               </div>
//             )}

//             {/* Transaction List & Empty States */}
//             {!error && ( // Don't show list section if there was a fetch error
//               <div className="space-y-4">
//                 {/* In Progress Section */}
//                 {inProgressTransactions.length > 0 && (
//                   <div className="InProcess-Transaction-Lists">
//                     <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b">
//                       In progress
//                     </h3>
//                     <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                         const isAddMoney = transaction.type === "Add Money";
//                         const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                         const description = isAddMoney ? "Waiting for your money" : "Sending money";
//                         const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                         const displayCurrencyCode = isAddMoney ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '') : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                         const name = isAddMoney ? `To your ${displayCurrencyCode || '...'} balance` : transaction.name || "Recipient";
//                         return (
//                           <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                             <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                               <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                 <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                   <div className=" text-wrap overflow-hidden mr-2">
//                                     <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3>
//                                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p>
//                                   </div>
//                                   <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0`}>
//                                     {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
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

//                 {/* Processed Sections (Grouped by Date) */}
//                 {Object.entries(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-4">
//                     {Object.entries(groupedProcessedTransactions).map(
//                       ([date, transactionsForDate]) => (
//                         <div key={date} className="Transaction-Lists">
//                           <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b">
//                             {date}
//                           </h3>
//                           <div className="space-y-2">
//                             {transactionsForDate.map((transaction) => {
//                                 const isAddMoney = transaction.type === "Add Money";
//                                 const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                                 const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                                 const displayCurrencyCode = isAddMoney ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '') : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                                 const amountPrefix = isAddMoney ? "+ " : "- ";
//                                 const name = isAddMoney ? `Added to ${displayCurrencyCode || '...'} balance` : transaction.name || "Recipient";
//                                 let description = ""; let amountClass = "";
//                                 switch(transaction.status){case"completed":description=isAddMoney?"Added":`Sent to ${name}`;amountClass=isAddMoney?"text-green-600 dark:text-green-500":"text-neutral-900 dark:text-white";break;case"canceled":description="Cancelled";amountClass="text-red-600 line-through";break;case"failed":description="Failed";amountClass="text-red-600 line-through";break;default:description=`Status: ${transaction.status}`;amountClass="text-gray-500";}
//                                 return (
//                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                     <div className="flex items-center gap-4">
//                                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                         <div className=" text-wrap overflow-hidden mr-2">
//                                           <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3>
//                                           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p>
//                                         </div>
//                                         <div className={`font-medium ${amountClass} shrink-0`}>
//                                           {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </Link>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* Empty State: Rendered when filteredTransactions is empty */}
//                 {filteredTransactions.length === 0 && (
//                   <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-5 dark:bg-white/5 rounded-lg mt-6">
//                     {allTransactions.length === 0
//                       ? "You haven't made any transactions yet."
//                       : "No transactions match your current filter or search criteria."}
//                     {/* Show Clear Filters button only if filters ARE active AND there were transactions initially */}
//                     {filtersAreActive && allTransactions.length > 0 && (
//                         <div className="flex justify-center ">
//                           <button
//                             onClick={clearAllAppliedFilters}
//                             className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-38 bg-primary text-mainheading dark:text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                           >
//                             Clear Filters
//                           </button>
//                         </div>
//                       )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div> {/* End Transaction-Page container */}
//         </section> {/* End Transaction-Wrapper section */}

//         {/* --- FILTER MODAL - RENDERED LAST (outside the main section flow) --- */}
//         <FilterModal
//             isOpen={isFilterModalOpen}
//             onClose={handleCloseFilterModal}
//             userAccounts={userAccounts} // Pass fetched accounts for the Balance filter section
//             onFiltersApply={handleFiltersApply} // Pass the filter application callback
//         />
//       </> // End Fragment
//     );
// };

// export default TransactionsPage;

// // frontend/src/app/dashboard/transactions/page.tsx
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus, LuSettings2 } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import FilterModal, { AppliedFilters } from "./FilterModal";
// import Search from "./Search";

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import accountService from "../../../services/account";

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings (DD-MM-YYYY or ISO-like fallback)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) { return date; }
//         }
//     }
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) { return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); }
//      } catch (e) {}
//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Transactions Page Skeleton ---
// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//       <section className="Transaction-Page pb-8 pt-5 md:pb-10">
//           <div className="container mx-auto">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//                   <Skeleton className="md:h-12 h-8 md:w-64 w-40 rounded-md" />
//                   <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//                       <Skeleton className="h-12.5 w-full sm:w-70 rounded-full" />
//                       <Skeleton className="h-12.5 w-36 rounded-full" />
//                   </div>
//               </div>
//               <div className="space-y-2">
//                   {Array(8).fill(0).map((_, index) => (
//                       <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                           <div className="flex items-center gap-4">
//                               <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                               <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                   <div className="flex-grow"> <Skeleton className="h-5 md:w-40 w-28 mb-2" /> <Skeleton className="h-4 md:w-58 w-40" /> </div>
//                                   <div className="shrink-0"> <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" /> </div>
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </section>
//   );
// };

// // --- Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);
//     const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: "", toDate: "",
//     });
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//     // --- Hooks ---
//     const { token } = useAuth();

//     // --- Callbacks ---
//     const fetchData = useCallback(async () => {
//          if (!token) { setError("Authentication token is missing. Please log in."); setLoadingTransactions(false); setLoadingAccounts(false); return; }
//         setLoadingTransactions(true); setLoadingAccounts(true); setError(null);
//         setAllTransactions([]); setFilteredTransactions([]); setUserAccounts([]);
//         setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//         setSearchTerm("");
//         try {
//              const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token), transferService.getUserTransfers(token), accountService.getUserAccounts(token)
//             ]);
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id, type: "Add Money", amountToAdd: payment.amountToAdd, amountToPay: payment.amountToPay, balanceCurrency: payment.balanceCurrency, payInCurrency: payment.payInCurrency,
//                 account: payment.account, createdAt: payment.createdAt, updatedAt: payment.updatedAt, status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 description: `Add money via ${payment.payInCurrency?.code || 'N/A'} to ${payment.balanceCurrency?.code || 'N/A'} balance`
//             }));
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => {
//                 const recipientName = (typeof transfer.recipient === 'object' && transfer.recipient !== null) ? transfer.recipient.accountHolderName ?? 'Recipient' : 'Recipient';
//                 return {
//                     _id: transfer._id, type: "Send Money", name: recipientName, sendAmount: transfer.sendAmount, receiveAmount: transfer.receiveAmount, sendCurrency: transfer.sendCurrency, receiveCurrency: transfer.receiveCurrency,
//                     createdAt: transfer.createdAt, updatedAt: transfer.updatedAt, status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus, recipient: transfer.recipient,
//                     sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//                     description: `Send money from ${transfer.sendCurrency?.code || 'N/A'} to ${recipientName}`
//                 };
//             });
//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             combinedTransactions.sort((a, b) => { const dateA = a.updatedAt || a.createdAt; const dateB = b.updatedAt || b.createdAt; if (!dateA && !dateB) return 0; if (!dateA) return 1; if (!dateB) return -1; try { return new Date(dateB).getTime() - new Date(dateA).getTime(); } catch (e) { console.error("Error comparing dates:", dateA, dateB, e); return 0; } });
//             setAllTransactions(combinedTransactions);
//             setLoadingTransactions(false);
//             setUserAccounts(accountsData);
//             setLoadingAccounts(false);
//         } catch (err: unknown) {
//             console.error("Fetch error:", err);
//             let errorMessage = "Failed to fetch data.";
//             if (err instanceof Error) { errorMessage = err.message; const apiError = err as ApiError; if (apiError.response?.data?.message) { errorMessage = apiError.response.data.message; } }
//             else if (typeof err === 'string') { errorMessage = err; }
//             setError(errorMessage);
//             setLoadingTransactions(false); setLoadingAccounts(false);
//         }
//     }, [token]);

//     // --- Filtering and Searching Logic ---
//     useEffect(() => {
//         let results = [...allTransactions];
//         // 1. Apply Search
//         if (searchTerm.trim()) {
//             const searchTermLower = searchTerm.toLowerCase().trim();
//             results = results.filter(tx => {
//                 const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//                 const descriptionMatches = typeof tx.description === 'string' && tx.description.toLowerCase().includes(searchTermLower);
//                 const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
//                 let currencyMatch = false;
//                 if (tx.type === 'Add Money') { currencyMatch = (typeof tx.balanceCurrency === 'object' && tx.balanceCurrency?.code?.toLowerCase().includes(searchTermLower)) || (typeof tx.payInCurrency === 'object' && tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower)); }
//                 else if (tx.type === 'Send Money') { currencyMatch = (typeof tx.sendCurrency === 'object' && tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) || (typeof tx.receiveCurrency === 'object' && tx.receiveCurrency?.code?.toLowerCase().includes(searchTermLower)); }
//                  const statusMatches = tx.status?.toLowerCase().includes(searchTermLower);
//                 return nameMatches || descriptionMatches || typeMatches || currencyMatch || statusMatches;
//             });
//         }
//         // 2. Apply Filters
//         const filters = activeFilters;
//         const direction = filters.selectedDirection;
//         if (direction !== 'all') { results = results.filter(tx => (direction === 'add' && tx.type === 'Add Money') || (direction === 'send' && tx.type === 'Send Money')); }
//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             results = results.filter(tx => {
//                const txStatus = tx.status; if (!txStatus) return false;
//                if (statusFilter === 'completed') return txStatus === 'completed';
//                if (statusFilter === 'cancelled') return txStatus === 'canceled';
//                if (statusFilter === 'in process') return txStatus === 'in progress' || txStatus === 'pending';
//                if (statusFilter === 'failed') return txStatus === 'failed';
//                return false;
//             });
//         }
//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             results = results.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 if (tx.type === 'Add Money') { currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null ? tx.balanceCurrency.code : undefined; }
//                 else if (tx.type === 'Send Money') { currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null ? tx.sendCurrency.code : undefined; }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
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
//              results = results.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt; if (!transactionDateStr) return false;
//                  try {
//                      const transactionDateObj = new Date(transactionDateStr); if (isNaN(transactionDateObj.getTime())) { console.warn("Invalid date:", transactionDateStr); return false; }
//                      let include = true; if (fromDateObj && transactionDateObj < fromDateObj) include = false; if (toDateObj && transactionDateObj > toDateObj) include = false; return include;
//                  } catch (e) { console.error("Date parse error:", transactionDateStr, e); return false; }
//              });
//         }
//         setFilteredTransactions(results);
//     }, [allTransactions, searchTerm, activeFilters]);

//     // --- Filter Modal Application ---
//     const handleFiltersApply = useCallback((filtersFromModal: AppliedFilters) => {
//         setActiveFilters(filtersFromModal);
//         setIsFilterModalOpen(false);
//     }, []);

//     // --- Effects ---
//     useEffect(() => { fetchData(); }, [fetchData]);

//     // --- Memoized Values ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         const inProgressUnsorted = filteredTransactions.filter(tx => tx.status === "in progress" || tx.status === "pending");
//         const sortedInProgress = [...inProgressUnsorted].sort((a, b) => { const dateA = a.updatedAt || a.createdAt; const dateB = b.updatedAt || b.createdAt; if (!dateA && !dateB) return 0; if (!dateA) return 1; if (!dateB) return -1; try { return new Date(dateB).getTime() - new Date(dateA).getTime(); } catch (e) { return 0; } });
//         const processed = filteredTransactions.filter(tx => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed");
//         const sortedProcessed = [...processed].sort((a, b) => { const dateA = a.updatedAt || a.createdAt; const dateB = b.updatedAt || b.createdAt; if (!dateA && !dateB) return 0; if (!dateA) return 1; if (!dateB) return -1; try { return new Date(dateB).getTime() - new Date(dateA).getTime(); } catch (e) { return 0; } });
//         const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//             const groupDateStr = tx.updatedAt || tx.createdAt; let dateKey = 'Unknown Date';
//             if (groupDateStr) { try { dateKey = new Date(groupDateStr).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" }); } catch (e) { dateKey = 'Date Formatting Error'; } }
//             if (!groups[dateKey]) groups[dateKey] = []; groups[dateKey].push(tx); return groups;
//         }, {});
//         return { inProgressTransactions: sortedInProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]);

//     // Check if any filter is active
//     const filtersAreActive = useMemo(() => (activeFilters.selectedRecipients.length > 0 || activeFilters.selectedDirection !== 'all' || activeFilters.selectedStatus !== null || activeFilters.selectedBalance.length > 0 || activeFilters.fromDate !== "" || activeFilters.toDate !== ""), [activeFilters]);
//     // Check if search is active
//     const searchIsActive = useMemo(() => searchTerm.trim() !== "", [searchTerm]);
//     // Determine if filters or search are causing the empty state
//     const noResultsDueToFilterOrSearch = useMemo(() => (allTransactions.length > 0 && filteredTransactions.length === 0 && (filtersAreActive || searchIsActive)), [allTransactions.length, filteredTransactions.length, filtersAreActive, searchIsActive]);

//     // --- Loading State Check ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     if (isLoading) { return <TransactionsPageSkeleton />; }

//     // --- Helper Functions ---
//     const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//     const handleCloseFilterModal = () => setIsFilterModalOpen(false);
//     const clearAllAppliedFiltersAndSearch = () => {
//         setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//         setSearchTerm("");
//     };

//     // --- Render ---
//     return (
//       <>
//         <section className="Transaction-Wrapper pb-8 pt-5 md:pb-10">
//           <div className="Transaction-Page">
//             {/* Header and Actions */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//               <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold text-mainheading dark:text-white"> Transactions </h1>
//               {(allTransactions.length > 0 || userAccounts.length > 0) && !error && (
//                   <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//                       <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
//                       <button
//                           className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-36 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0"
//                           onClick={handleOpenFilterModal} aria-haspopup="dialog" >
//                           <LuSettings2 size={20} /> <span className="md:block hidden">Filters</span>
//                       </button>
//                   </div>
//               )}
//               {userAccounts.length === 0 && allTransactions.length === 0 && !isLoading && !error && ( <p className="text-sm text-gray-500 w-full text-right md:text-left mt-2 md:mt-0"> Create an account to start making transactions. </p> )}
//             </div>

//             {/* Error Display */}
//             {error && ( <div className="text-center py-5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 mb-2 rounded-md border border-red-200 dark:border-red-800/30"> <strong>Error:</strong> {error} </div> )}

//             {/* Transaction List & Empty States */}
//             {!isLoading && !error && (
//               <div className="space-y-4">
//                 {/* In Progress Section */}
//                 {inProgressTransactions.length > 0 && (
//                   <div className="InProcess-Transaction-Lists">
//                     <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700"> In progress </h3>
//                     <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                         const isAddMoney = transaction.type === "Add Money";
//                         const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                         const description = isAddMoney ? "Waiting for your money" : `Sending money to ${transaction.name || 'recipient'}`;
//                         const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                         const displayCurrencyCode = isAddMoney ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '') : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                         const name = isAddMoney ? `To your ${displayCurrencyCode || '...'} balance` : transaction.name || "Recipient";
//                         return (
//                           <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                             <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                               <div className="flex items-center gap-4">
//                                 <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                 <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                   <div className=" text-wrap overflow-hidden mr-2"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3> <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description}{" "} <span className="italic"> ({transaction.status}) </span> </p> </div>
//                                   <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode} </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Processed Sections (Grouped by Date) */}
//                 {Object.entries(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-4">
//                     {Object.entries(groupedProcessedTransactions).map( ([date, transactionsForDate]) => (
//                         <div key={date} className="Transaction-Lists">
//                           <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700"> {date} </h3>
//                           <div className="space-y-2">
//                             {transactionsForDate.map((transaction) => {
//                                 const isAddMoney = transaction.type === "Add Money";
//                                 const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                                 const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                                 const displayCurrencyCode = isAddMoney ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '') : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                                 const amountPrefix = isAddMoney ? "+ " : "- "; const recipientName = transaction.name || "Recipient"; const name = isAddMoney ? `Added to ${displayCurrencyCode || '...'} balance` : recipientName;
//                                 let description = ""; let amountClass = "";
//                                 switch(transaction.status){
//                                     case"completed":description=isAddMoney?"Added":`Sent to ${recipientName}`;amountClass=isAddMoney?"text-green-600 dark:text-green-500":"text-neutral-900 dark:text-white";break;
//                                     case"canceled":description="Cancelled";amountClass="text-red-600 line-through dark:text-red-500";break;
//                                     case"failed":description="Failed";amountClass="text-red-600 line-through dark:text-red-500";break;
//                                     default:description=`Status: ${transaction.status}`;amountClass="text-gray-500 dark:text-gray-400";
//                                 }
//                                 return (
//                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                     <div className="flex items-center gap-4">
//                                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                         <div className=" text-wrap overflow-hidden mr-2"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg truncate"> {name} </h3> <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p> </div>
//                                         <div className={`font-medium ${amountClass} shrink-0 whitespace-nowrap`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {" "} {displayCurrencyCode} </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </Link>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* ---- Empty State Logic ---- */}
//                 {allTransactions.length === 0 && !isLoading && !error && ( <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6"> You haven't made any transactions yet. </div> )}
//                 {filteredTransactions.length === 0 && allTransactions.length > 0 && !isLoading && !error && (
//                    <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                      <span>No transactions match your current filter or search criteria.</span>
//                      {(filtersAreActive || searchIsActive) && (
//                        <Button
//                          onClick={clearAllAppliedFiltersAndSearch}
//                          // variant="primary" // <-- Removed variant="primary"
//                          className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                        >
//                          Clear Filters
//                        </Button>
//                      )}
//                    </div>
//                  )}
//                 {/* ---- End Empty State Logic ---- */}

//               </div>
//             )}
//           </div>
//         </section>

//         {/* --- FILTER MODAL --- */}
//         <FilterModal
//             isOpen={isFilterModalOpen} onClose={handleCloseFilterModal}
//             userAccounts={userAccounts} onFiltersApply={handleFiltersApply}
//             initialFilters={activeFilters}
//         />
//       </>
//     );
// };

// export default TransactionsPage;

// // frontend/src/app/dashboard/transactions/page.tsx
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from 'next/link';
// import { LuPlus, LuSettings2 } from "react-icons/lu"; // LuSettings2 might not be needed directly here anymore if only used in TransactionActions
// import { GoArrowUp } from "react-icons/go";
// import FilterModal, { AppliedFilters } from "./FilterModal";
// // REMOVED: import Search from "./Search"; // No longer directly used here
// import TransactionActions from "./TransactionActions"; // Import the new component

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import accountService from "../../../services/account";

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";

// // Define a type for potential API errors
// interface ApiError extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// // Helper function to parse date strings (DD-MM-YYYY or ISO-like fallback)
// function parseDateString(dateString: string | undefined): Date | null {
//     if (!dateString) return null;
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//         const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const year = parseInt(parts[2], 10);
//         if (!isNaN(day) && !isNaN(month) && !isNaN(year) && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
//              const date = new Date(Date.UTC(year, month, day));
//              if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) { return date; }
//         }
//     }
//      try {
//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) { return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); }
//      } catch (e) {}
//     console.warn("Could not parse date string into a valid Date object:", dateString);
//     return null;
// }

// // --- Transactions Page Skeleton ---
// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//       <section className="Transaction-Page pb-8 pt-5 md:pb-10">
//           <div className="container mx-auto">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//                   <Skeleton className="md:h-12 h-8 md:w-64 w-40 rounded-md" />
//                   <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//                       <Skeleton className="h-12.5 w-full sm:w-70 rounded-full" />
//                       <Skeleton className="h-12.5 w-36 rounded-full" />
//                   </div>
//               </div>
//               <div className="space-y-2">
//                   {Array(8).fill(0).map((_, index) => (
//                       <div key={index} className="block p-2 sm:p-4 rounded-2xl">
//                           <div className="flex items-center gap-4">
//                               <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                               <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                                   <div className="flex-grow"> <Skeleton className="h-5 md:w-40 w-28 mb-2" /> <Skeleton className="h-4 md:w-58 w-40" /> </div>
//                                   <div className="shrink-0"> <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" /> </div>
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </section>
//   );
// };

// // --- Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//     // --- State Declarations ---
//     const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//     const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
//     const [userAccounts, setUserAccounts] = useState<Account[]>([]);
//     const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//         selectedRecipients: [], selectedDirection: 'all', selectedStatus: null,
//         selectedBalance: [], fromDate: "", toDate: "",
//     });
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [loadingTransactions, setLoadingTransactions] = useState(true);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//     // --- Hooks ---
//     const { token } = useAuth();

//     // --- Callbacks ---
//     const fetchData = useCallback(async () => {
//          if (!token) { setError("Authentication token is missing. Please log in."); setLoadingTransactions(false); setLoadingAccounts(false); return; }
//         setLoadingTransactions(true); setLoadingAccounts(true); setError(null);
//         // Reset state on fetch
//         setAllTransactions([]); setFilteredTransactions([]); setUserAccounts([]);
//         setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//         setSearchTerm("");

//         try {
//              const [paymentsData, transfersData, accountsData] = await Promise.all([
//                 paymentService.getUserPayments(token), transferService.getUserTransfers(token), accountService.getUserAccounts(token)
//             ]);

//             // --- Mapping Logic (keep as is) ---
//             const mappedPayments: Transaction[] = paymentsData.map(payment => ({
//                 _id: payment._id, type: "Add Money", amountToAdd: payment.amountToAdd, amountToPay: payment.amountToPay, balanceCurrency: payment.balanceCurrency, payInCurrency: payment.payInCurrency,
//                 account: payment.account, createdAt: payment.createdAt, updatedAt: payment.updatedAt, status: (payment.status?.toLowerCase() ?? 'unknown') as TransactionStatus,
//                 description: `Add money via ${payment.payInCurrency?.code || 'N/A'} to ${payment.balanceCurrency?.code || 'N/A'} balance`
//             }));
//             const mappedTransfers: Transaction[] = transfersData.map(transfer => {
//                 const recipientName = (typeof transfer.recipient === 'object' && transfer.recipient !== null) ? transfer.recipient.accountHolderName ?? 'Recipient' : 'Recipient';
//                 return {
//                     _id: transfer._id, type: "Send Money", name: recipientName, sendAmount: transfer.sendAmount, receiveAmount: transfer.receiveAmount, sendCurrency: transfer.sendCurrency, receiveCurrency: transfer.receiveCurrency,
//                     createdAt: transfer.createdAt, updatedAt: transfer.updatedAt, status: (transfer.status?.toLowerCase() ?? 'unknown') as TransactionStatus, recipient: transfer.recipient,
//                     sourceAccountId: typeof transfer.sourceAccount === 'string' ? transfer.sourceAccount : transfer.sourceAccount?._id,
//                     description: `Send money from ${transfer.sendCurrency?.code || 'N/A'} to ${recipientName}`
//                 };
//             });
//             const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//             combinedTransactions.sort((a, b) => { const dateA = a.updatedAt || a.createdAt; const dateB = b.updatedAt || b.createdAt; if (!dateA && !dateB) return 0; if (!dateA) return 1; if (!dateB) return -1; try { return new Date(dateB).getTime() - new Date(dateA).getTime(); } catch (e) { console.error("Error comparing dates:", dateA, dateB, e); return 0; } });
//             // --- End Mapping Logic ---

//             setAllTransactions(combinedTransactions);
//             setUserAccounts(accountsData);

//         } catch (err: unknown) {
//             console.error("Fetch error:", err);
//             let errorMessage = "Failed to fetch data.";
//             if (err instanceof Error) { errorMessage = err.message; const apiError = err as ApiError; if (apiError.response?.data?.message) { errorMessage = apiError.response.data.message; } }
//             else if (typeof err === 'string') { errorMessage = err; }
//             setError(errorMessage);
//         } finally {
//              setLoadingTransactions(false);
//              setLoadingAccounts(false);
//         }
//     }, [token]);

//     // --- Filtering and Searching Logic ---
//     useEffect(() => {
//         let results = [...allTransactions];

//         // 1. Apply Search (Uses searchTerm state)
//         if (searchTerm.trim()) {
//             const searchTermLower = searchTerm.toLowerCase().trim();
//             results = results.filter(tx => {
//                 const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//                 const descriptionMatches = typeof tx.description === 'string' && tx.description.toLowerCase().includes(searchTermLower);
//                 const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
//                 let currencyMatch = false;
//                 if (tx.type === 'Add Money') { currencyMatch = (typeof tx.balanceCurrency === 'object' && tx.balanceCurrency?.code?.toLowerCase().includes(searchTermLower)) || (typeof tx.payInCurrency === 'object' && tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower)); }
//                 else if (tx.type === 'Send Money') { currencyMatch = (typeof tx.sendCurrency === 'object' && tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) || (typeof tx.receiveCurrency === 'object' && tx.receiveCurrency?.code?.toLowerCase().includes(searchTermLower)); }
//                  const statusMatches = tx.status?.toLowerCase().includes(searchTermLower);
//                 return nameMatches || descriptionMatches || typeMatches || currencyMatch || statusMatches;
//             });
//         }

//         // 2. Apply Filters (Uses activeFilters state)
//         const filters = activeFilters;
//         const direction = filters.selectedDirection;
//         if (direction !== 'all') { results = results.filter(tx => (direction === 'add' && tx.type === 'Add Money') || (direction === 'send' && tx.type === 'Send Money')); }

//         const statusFilter = filters.selectedStatus?.toLowerCase();
//         if (statusFilter) {
//             results = results.filter(tx => {
//                const txStatus = tx.status; if (!txStatus) return false;
//                // Map UI filter names to actual status values
//                if (statusFilter === 'completed') return txStatus === 'completed';
//                if (statusFilter === 'cancelled') return txStatus === 'canceled'; // Note: API might use 'canceled'
//                if (statusFilter === 'pending') return txStatus === 'pending'; // Note: API might use 'canceled'
//                if (statusFilter === 'in process') return txStatus === 'in progress' || txStatus === "processing";
//                if (statusFilter === 'failed') return txStatus === 'failed';
//                return false; // Default case if status doesn't match known filters
//             });
//         }

//         const balanceFilters = filters.selectedBalance;
//         if (balanceFilters && balanceFilters.length > 0) {
//             results = results.filter(tx => {
//                 let currencyCodeToCheck: string | undefined;
//                 // Check relevant currency based on transaction type
//                 if (tx.type === 'Add Money') {
//                     currencyCodeToCheck = typeof tx.balanceCurrency === 'object' && tx.balanceCurrency !== null ? tx.balanceCurrency.code : undefined;
//                 } else if (tx.type === 'Send Money') {
//                      // Filter outgoing transfers based on the currency *sent* from the user's perspective
//                     currencyCodeToCheck = typeof tx.sendCurrency === 'object' && tx.sendCurrency !== null ? tx.sendCurrency.code : undefined;
//                 }
//                 return currencyCodeToCheck ? balanceFilters.includes(currencyCodeToCheck) : false;
//             });
//         }

//         const recipientFilters = filters.selectedRecipients;
//          if (recipientFilters && recipientFilters.length > 0) {
//            // Ensure comparison is consistent (e.g., strings)
//            const recipientFilterIds = recipientFilters.map(String);
//            results = results.filter(tx => {
//               if (tx.type !== "Send Money") return true; // Don't filter non-send transactions by recipient
//               // Safely access recipient ID, converting potential objects/strings
//               const recipientId = (typeof tx.recipient === 'object' && tx.recipient?._id) ? String(tx.recipient._id) : (typeof tx.recipient === 'string' ? tx.recipient : null);
//               return recipientId ? recipientFilterIds.includes(recipientId) : false;
//           });
//         }

//         const fromDateObj = parseDateString(filters.fromDate || undefined);
//         const toDateObj = parseDateString(filters.toDate || undefined);

//         // Set time to start/end of day for inclusive range in UTC
//         if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
//         if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

//         if (fromDateObj || toDateObj) {
//              results = results.filter(tx => {
//                  const transactionDateStr = tx.updatedAt || tx.createdAt; // Prefer updatedAt if available
//                  if (!transactionDateStr) return false; // Skip if no date

//                  try {
//                      // Ensure comparison uses UTC dates if parsed correctly
//                      const transactionDateObj = new Date(transactionDateStr);
//                      if (isNaN(transactionDateObj.getTime())) {
//                          console.warn("Invalid date encountered during filtering:", transactionDateStr);
//                          return false; // Skip invalid dates
//                      }
//                      // Convert transaction date to UTC day for comparison
//                      const transactionUTCDate = new Date(Date.UTC(transactionDateObj.getUTCFullYear(), transactionDateObj.getUTCMonth(), transactionDateObj.getUTCDate()));

//                      let include = true;
//                      if (fromDateObj && transactionUTCDate < fromDateObj) include = false;
//                      if (toDateObj && transactionUTCDate > toDateObj) include = false;
//                      return include;
//                  } catch (e) {
//                      console.error("Date parsing/comparison error during filtering:", transactionDateStr, e);
//                      return false; // Skip on error
//                  }
//              });
//         }
//         // --- End Filtering Logic ---

//         setFilteredTransactions(results);
//     }, [allTransactions, searchTerm, activeFilters]); // Dependencies for filtering effect

//     // --- Filter Modal Application ---
//     const handleFiltersApply = useCallback((filtersFromModal: AppliedFilters) => {
//         setActiveFilters(filtersFromModal);
//         setIsFilterModalOpen(false);
//     }, []);

//     // --- Effects ---
//     useEffect(() => { fetchData(); }, [fetchData]); // Fetch data on mount or when token changes

//     // --- Memoized Values ---
//     const { inProgressTransactions, groupedProcessedTransactions } = useMemo(() => {
//         // Filter first
//         const inProgressUnsorted = filteredTransactions.filter(tx => tx.status === "in progress" || tx.status === "pending");
//         const processed = filteredTransactions.filter(tx => tx.status === "completed" || tx.status === "canceled" || tx.status === "failed");

//         // Sort each group
//         const sortFn = (a: Transaction, b: Transaction) => {
//             const dateA = a.updatedAt || a.createdAt;
//             const dateB = b.updatedAt || b.createdAt;
//             if (!dateA && !dateB) return 0;
//             if (!dateA) return 1; // Put items without date last
//             if (!dateB) return -1; // Put items without date last
//             try {
//                 return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending order
//             } catch (e) {
//                 console.error("Error sorting dates:", dateA, dateB, e);
//                 return 0;
//             }
//         };
//         const sortedInProgress = [...inProgressUnsorted].sort(sortFn);
//         const sortedProcessed = [...processed].sort(sortFn);

//         // Group sorted processed transactions
//         const grouped = sortedProcessed.reduce((groups: { [date: string]: Transaction[] }, tx) => {
//             const groupDateStr = tx.updatedAt || tx.createdAt;
//             let dateKey = 'Unknown Date'; // Fallback key
//             if (groupDateStr) {
//                 try {
//                     // Consistent date formatting
//                     dateKey = new Date(groupDateStr).toLocaleDateString('en-US', {
//                         year: "numeric", month: "long", day: "numeric", timeZone: 'UTC' // Use UTC for consistency
//                     });
//                 } catch (e) {
//                      console.error("Date formatting error:", groupDateStr, e);
//                     dateKey = 'Date Formatting Error';
//                 }
//             }
//             if (!groups[dateKey]) groups[dateKey] = [];
//             groups[dateKey].push(tx);
//             return groups;
//         }, {});

//         return { inProgressTransactions: sortedInProgress, groupedProcessedTransactions: grouped };
//     }, [filteredTransactions]); // Depends only on the filtered list

//     // Check if any filter is active
//     const filtersAreActive = useMemo(() => (
//         activeFilters.selectedRecipients.length > 0 ||
//         activeFilters.selectedDirection !== 'all' ||
//         activeFilters.selectedStatus !== null ||
//         activeFilters.selectedBalance.length > 0 ||
//         activeFilters.fromDate !== "" ||
//         activeFilters.toDate !== ""
//     ), [activeFilters]);

//     // Check if search is active
//     const searchIsActive = useMemo(() => searchTerm.trim() !== "", [searchTerm]);

//     // Determine if filters or search are causing the empty state
//     const noResultsDueToFilterOrSearch = useMemo(() => (
//         allTransactions.length > 0 &&
//         filteredTransactions.length === 0 &&
//         (filtersAreActive || searchIsActive)
//     ), [allTransactions.length, filteredTransactions.length, filtersAreActive, searchIsActive]);

//     // --- Loading State Check ---
//     const isLoading = loadingTransactions || loadingAccounts;
//     if (isLoading) { return <TransactionsPageSkeleton />; }

//     // --- Helper Functions ---
//     const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//     const handleCloseFilterModal = () => setIsFilterModalOpen(false);
//     const clearAllAppliedFiltersAndSearch = () => {
//         setActiveFilters({ selectedRecipients: [], selectedDirection: 'all', selectedStatus: null, selectedBalance: [], fromDate: "", toDate: "" });
//         setSearchTerm(""); // Also clear search term
//     };

//     // --- Render ---
//     return (
//       <>
//         <section className="Transaction-Wrapper pb-8 pt-5 md:pb-10">
//           {/* Use container directly for better structure */}
//           <div className="container mx-auto">
//             {/* Header and Actions */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//               <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white"> Transactions </h1>
//               {/* Conditionally render actions only if there's potential data or accounts */}
//               {(allTransactions.length > 0 || userAccounts.length > 0) && !error && (
//                   <TransactionActions
//                       searchTerm={searchTerm}
//                       onSearchChange={setSearchTerm} // Pass the state setter
//                       onFilterButtonClick={handleOpenFilterModal} // Pass the modal opener
//                   />
//               )}
//               {/* Message when user has no accounts/transactions yet */}
//               {userAccounts.length === 0 && allTransactions.length === 0 && !isLoading && !error && (
//                 <p className="text-sm text-gray-500 w-full text-right md:text-left mt-2 md:mt-0">
//                     Create an account to start making transactions.
//                 </p>
//               )}
//             </div>

//             {/* Error Display */}
//             {error && (
//                 <div className="text-center py-5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 mb-2 rounded-md border border-red-200 dark:border-red-800/30">
//                     <strong>Error:</strong> {error}
//                 </div>
//             )}

//             {/* Transaction List & Empty States - Render only if not loading and no error */}
//             {!isLoading && !error && (
//               <div className="space-y-4">
//                 {/* In Progress Section */}
//                 {inProgressTransactions.length > 0 && (
//                   <div className="InProcess-Transaction-Lists">
//                     <h3 className="font-medium text-gray-600 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                         In progress
//                     </h3>
//                     <div className="space-y-2">
//                       {inProgressTransactions.map((transaction) => {
//                         // Common logic for rendering in-progress items
//                         const isAddMoney = transaction.type === "Add Money";
//                         const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                         const description = isAddMoney ? "Waiting for your money" : `Sending by you`;
//                         const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                         const displayCurrencyCode = isAddMoney
//                             ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '')
//                             : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                         const amountPrefix = isAddMoney ? "+ " : "- ";
//                         const name = isAddMoney ? `To your ${displayCurrencyCode || '...'} balance` : transaction.name || "Recipient";

//                         return (
//                           <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                             <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                               <div className="flex items-center sm:gap-4 gap-2">
//                                 <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0"> {/* Added flex-shrink-0 */}
//                                     {icon}
//                                 </div>
//                                 <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                   <div className="text-wrap">
//                                     <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
//                                         {name}
//                                     </h3>
//                                     <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1 ">
//                                         {description}

//                                     </p>
//                                   </div>
//                                   <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0 sm:text-base text-15px`}>
//                                     {amountPrefix}
//                                     {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                     {" "}
//                                     {displayCurrencyCode}
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

//                 {/* Processed Sections (Grouped by Date) */}
//                 {Object.entries(groupedProcessedTransactions).length > 0 && (
//                   <div className="space-y-4">
//                     {Object.entries(groupedProcessedTransactions).map( ([date, transactionsForDate]) => (
//                         <div key={date} className="Transaction-Lists">
//                           <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                             {date}
//                           </h3>
//                           <div className="space-y-2">
//                             {transactionsForDate.map((transaction) => {
//                                 // Common logic for rendering processed items
//                                 const isAddMoney = transaction.type === "Add Money";
//                                 const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                                 const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                                 const displayCurrencyCode = isAddMoney
//                                     ? (typeof transaction.balanceCurrency === 'object' ? transaction.balanceCurrency?.code : '')
//                                     : (typeof transaction.sendCurrency === 'object' ? transaction.sendCurrency?.code : '');
//                                 const amountPrefix = isAddMoney ? "+ " : "- ";
//                                 const recipientName = transaction.name || "Recipient";
//                                 const name = isAddMoney ? `Added to ${displayCurrencyCode || '...'} balance` : recipientName;

//                                 let description = "";
//                                 let amountClass = "";
//                                 switch(transaction.status){
//                                     case "completed":
//                                         description = isAddMoney ? "Added" : `Sent by you`;
//                                         amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white";
//                                         break;
//                                     case "canceled": // Handle 'canceled' status
//                                         description = "Cancelled";
//                                         amountClass = "text-red-600 line-through dark:text-red-500";
//                                         break;
//                                     case "failed":
//                                         description = "Failed";
//                                         amountClass = "text-red-600 line-through dark:text-red-500";
//                                         break;
//                                     default: // Fallback for any other status
//                                         description = `Status: ${transaction.status}`;
//                                         amountClass = "text-gray-500 dark:text-gray-400";
//                                 }

//                                 return (
//                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                     <div className="flex sm:items-center items-start sm:gap-4 gap-2">
//                                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0"> {/* Added flex-shrink-0 */}
//                                           {icon}
//                                       </div>
//                                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                         <div className="text-wrap">
//                                           <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
//                                               {name}
//                                           </h3>
//                                           <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1">
//                                               {description}
//                                           </p>
//                                         </div>
//                                         <div className={`font-medium ${amountClass} shrink-0 whitespace-nowrap sm:text-base text-15px`}>
//                                             {amountPrefix}
//                                             {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                                             {" "}
//                                             {displayCurrencyCode}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </Link>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}

//                 {/* ---- Empty State Logic ---- */}
//                 {/* Case 1: No transactions *at all* */}
//                 {allTransactions.length === 0 && !isLoading && !error && (
//                      <div className="text-center flex flex-col text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                         You haven't made any transactions yet.
//                      </div>
//                  )}

//                  {/* Case 2: Have transactions, but none match filter/search */}
//                 {filteredTransactions.length === 0 && allTransactions.length > 0 && !isLoading && !error && (
//                    <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                      <span>No transactions match your current {filtersAreActive && searchIsActive ? 'filter and search criteria' : filtersAreActive ? 'filter criteria' : 'search criteria'}.</span>
//                      {/* Show clear button only if filters or search are active */}
//                      {(filtersAreActive || searchIsActive) && (
//                        <Button
//                          onClick={clearAllAppliedFiltersAndSearch}
//                          className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                          // Removed variant="primary" - rely on base Button style + custom classes
//                        >
//                          Clear {filtersAreActive && searchIsActive ? 'Filters & Search' : filtersAreActive ? 'Filters' : 'Search'}
//                        </Button>
//                      )}
//                    </div>
//                  )}
//                 {/* ---- End Empty State Logic ---- */}

//               </div>
//             )} {/* End conditional rendering block */}
//           </div> {/* Close container */}
//         </section>

//         {/* --- FILTER MODAL --- */}
//         <FilterModal
//             isOpen={isFilterModalOpen}
//             onClose={handleCloseFilterModal}
//             userAccounts={userAccounts} // Pass accounts needed for balance/recipient filters
//             onFiltersApply={handleFiltersApply}
//             initialFilters={activeFilters} // Pass current filters to initialize modal state
//         />
//       </>
//     );
// };

// export default TransactionsPage;

// // frontend/src/app/dashboard/transactions/page.tsx
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import FilterModal, { AppliedFilters } from "./FilterModal";
// import TransactionActions from "./TransactionActions"; // Import the actions component

// // Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext";
// import paymentService from "../../../services/payment";
// import transferService from "../../../services/transfer";
// import accountService from "../../../services/account";

// // Types
// import { Transaction, TransactionStatus } from "@/types/transaction";
// import { Account } from "@/types/account";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { ClipboardXIcon } from "lucide-react";
// import { MdOutlineAccessTime } from "react-icons/md";

// // Define a type for potential API errors
// interface ApiError extends Error {
//   response?: {
//     data?: {
//       message?: string;
//     };
//     status?: number;
//   };
// }

// // Helper function to parse date strings (DD-MM-YYYY or ISO-like fallback)
// // (Keep the existing parseDateString function)
// function parseDateString(dateString: string | undefined): Date | null {
//   if (!dateString) return null;
//   // Try DD-MM-YYYY first
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
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
//       // Validate the date components (e.g., handle 31-Feb)
//       if (
//         date.getUTCFullYear() === year &&
//         date.getUTCMonth() === month &&
//         date.getUTCDate() === day
//       ) {
//         return date;
//       }
//     }
//   }
//   // Fallback to default ISO-like parsing if DD-MM-YYYY fails or isn't used
//   try {
//     const date = new Date(dateString);
//     if (!isNaN(date.getTime())) {
//       // Return date object representing the start of the UTC day
//       return new Date(
//         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//       );
//     }
//   } catch (e) {
//     // Ignore parsing errors here, handled below
//   }
//   console.warn(
//     "Could not parse date string into a valid Date object:",
//     dateString
//   );
//   return null;
// }

// // --- Transactions Page Skeleton ---
// const TransactionsPageSkeleton: React.FC = () => {
//   return (
//     <section className="Transaction-Page pb-8 pt-5 md:pb-10">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//           <Skeleton className="md:h-12 h-8 md:w-64 w-40 rounded-md" />
//           <div className="flex items-center gap-4 w-full md:w-auto justify-end">
//             <Skeleton className="h-12.5 w-full sm:w-70 rounded-full" />
//             <Skeleton className="h-12.5 w-36 rounded-full" />
//           </div>
//         </div>
//         <div className="space-y-6">
//           {" "}
//           {/* Add more spacing between skeleton groups */}
//           {/* Simulate Pending/In Progress group */}
//           <div>
//             <Skeleton className="h-6 w-32 mb-4 rounded" />{" "}
//             {/* Heading skeleton */}
//             {Array(2)
//               .fill(0)
//               .map((_, index) => (
//                 <div
//                   key={`sk-pending-${index}`}
//                   className="block p-2 sm:p-4 rounded-2xl"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         {" "}
//                         <Skeleton className="h-5 md:w-40 w-28 mb-2" />{" "}
//                         <Skeleton className="h-4 md:w-58 w-40" />{" "}
//                       </div>
//                       <div className="shrink-0">
//                         {" "}
//                         <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" />{" "}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           {/* Simulate Processed group */}
//           <div>
//             <Skeleton className="h-6 w-40 mb-4 rounded" />{" "}
//             {/* Date heading skeleton */}
//             {Array(4)
//               .fill(0)
//               .map((_, index) => (
//                 <div
//                   key={`sk-processed-${index}`}
//                   className="block p-2 sm:p-4 rounded-2xl"
//                 >
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="size-14 rounded-full flex-shrink-0" />
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         {" "}
//                         <Skeleton className="h-5 md:w-40 w-28 mb-2" />{" "}
//                         <Skeleton className="h-4 md:w-58 w-40" />{" "}
//                       </div>
//                       <div className="shrink-0">
//                         {" "}
//                         <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" />{" "}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- Transactions Page Component ---
// const TransactionsPage: React.FC = () => {
//   // --- State Declarations ---
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
//   const [filteredTransactions, setFilteredTransactions] = useState<
//     Transaction[]
//   >([]); // Results after filter/search
//   const [userAccounts, setUserAccounts] = useState<Account[]>([]);
//   const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
//     selectedRecipients: [],
//     selectedDirection: "all",
//     selectedStatus: null,
//     selectedBalance: [],
//     fromDate: "",
//     toDate: "",
//   });
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [loadingTransactions, setLoadingTransactions] = useState(true);
//   const [loadingAccounts, setLoadingAccounts] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//   // --- Hooks ---
//   const { token } = useAuth();

//   // --- Callbacks ---
//   const fetchData = useCallback(async () => {
//     if (!token) {
//       setError("Authentication token is missing. Please log in.");
//       setLoadingTransactions(false);
//       setLoadingAccounts(false);
//       return;
//     }
//     setLoadingTransactions(true);
//     setLoadingAccounts(true);
//     setError(null);
//     // Reset state on fetch
//     setAllTransactions([]);
//     setFilteredTransactions([]);
//     setUserAccounts([]);
//     setActiveFilters({
//       selectedRecipients: [],
//       selectedDirection: "all",
//       selectedStatus: null,
//       selectedBalance: [],
//       fromDate: "",
//       toDate: "",
//     });
//     setSearchTerm("");

//     try {
//       const [paymentsData, transfersData, accountsData] = await Promise.all([
//         paymentService.getUserPayments(token),
//         transferService.getUserTransfers(token),
//         accountService.getUserAccounts(token),
//       ]);

//       // --- Mapping Logic (ensure correct types and structure) ---
//       const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
//         _id: payment._id,
//         type: "Add Money", // Consistent type
//         amountToAdd: payment.amountToAdd,
//         amountToPay: payment.amountToPay,
//         balanceCurrency: payment.balanceCurrency, // Expect populated object
//         payInCurrency: payment.payInCurrency, // Expect populated object
//         account: payment.account, // May be null or ObjectId
//         createdAt: payment.createdAt,
//         updatedAt: payment.updatedAt,
//         status: (payment.status?.toLowerCase() ??
//           "unknown") as TransactionStatus,
//         description: `Add money via ${
//           payment.payInCurrency?.code || "N/A"
//         } to ${payment.balanceCurrency?.code || "N/A"} balance`,
//       }));
//       const mappedTransfers: Transaction[] = transfersData.map((transfer) => {
//         const recipientName =
//           typeof transfer.recipient === "object" && transfer.recipient !== null
//             ? transfer.recipient.accountHolderName ?? "Recipient"
//             : "Recipient";
//         return {
//           _id: transfer._id,
//           type: "Send Money", // Consistent type
//           name: recipientName, // Extract name if available
//           sendAmount: transfer.sendAmount,
//           receiveAmount: transfer.receiveAmount,
//           sendCurrency: transfer.sendCurrency, // Expect populated object
//           receiveCurrency: transfer.receiveCurrency, // Expect populated object
//           createdAt: transfer.createdAt,
//           updatedAt: transfer.updatedAt,
//           status: (transfer.status?.toLowerCase() ??
//             "unknown") as TransactionStatus,
//           recipient: transfer.recipient, // Could be object or ID string
//           sourceAccountId:
//             typeof transfer.sourceAccount === "string"
//               ? transfer.sourceAccount
//               : transfer.sourceAccount?._id, // Get source account ID
//           description: `Send money from ${
//             transfer.sendCurrency?.code || "N/A"
//           } to ${recipientName}`,
//         };
//       });
//       // Combine and Sort all transactions initially (by date descending)
//       const combinedTransactions = [...mappedPayments, ...mappedTransfers];
//       combinedTransactions.sort((a, b) => {
//         const dateA = a.updatedAt || a.createdAt;
//         const dateB = b.updatedAt || b.createdAt;
//         if (!dateA && !dateB) return 0;
//         if (!dateA) return 1; // Treat null/undefined dates as older
//         if (!dateB) return -1;
//         try {
//           return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending
//         } catch (e) {
//           console.error("Error comparing dates:", dateA, dateB, e);
//           return 0;
//         }
//       });
//       // --- End Mapping Logic ---

//       setAllTransactions(combinedTransactions);
//       setUserAccounts(accountsData);
//     } catch (err: unknown) {
//       console.error("Fetch error:", err);
//       let errorMessage = "Failed to fetch data.";
//       if (err instanceof Error) {
//         errorMessage = err.message;
//         const apiError = err as ApiError;
//         if (apiError.response?.data?.message) {
//           errorMessage = apiError.response.data.message;
//         }
//       } else if (typeof err === "string") {
//         errorMessage = err;
//       }
//       setError(errorMessage);
//     } finally {
//       setLoadingTransactions(false);
//       setLoadingAccounts(false);
//     }
//   }, [token]); // Dependency: token

//   // --- Filtering and Searching Logic ---
//   useEffect(() => {
//     let results = [...allTransactions];

//     // 1. Apply Search Term Filter
//     if (searchTerm.trim()) {
//       const searchTermLower = searchTerm.toLowerCase().trim();
//       results = results.filter((tx) => {
//         // Check various fields for the search term
//         const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
//         const descriptionMatches =
//           typeof tx.description === "string" &&
//           tx.description.toLowerCase().includes(searchTermLower);
//         const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
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
//         const statusMatches = tx.status
//           ?.toLowerCase()
//           .includes(searchTermLower);
//         const idMatches = tx._id.toLowerCase().includes(searchTermLower); // Search by ID too

//         // Check recipient name specifically for transfers
//         let recipientNameMatches = false;
//         if (
//           tx.type === "Send Money" &&
//           typeof tx.recipient === "object" &&
//           tx.recipient?.accountHolderName
//         ) {
//           recipientNameMatches = tx.recipient.accountHolderName
//             .toLowerCase()
//             .includes(searchTermLower);
//         }

//         return (
//           nameMatches ||
//           descriptionMatches ||
//           typeMatches ||
//           currencyMatch ||
//           statusMatches ||
//           idMatches ||
//           recipientNameMatches
//         );
//       });
//     }

//     // 2. Apply Active Filters
//     const filters = activeFilters;

//     // Direction Filter ('add' or 'send')
//     const direction = filters.selectedDirection;
//     if (direction !== "all") {
//       results = results.filter(
//         (tx) =>
//           (direction === "add" && tx.type === "Add Money") ||
//           (direction === "send" && tx.type === "Send Money")
//       );
//     }

//     // Status Filter
//     const statusFilter = filters.selectedStatus?.toLowerCase();
//     if (statusFilter) {
//       results = results.filter((tx) => {
//         const txStatus = tx.status;
//         if (!txStatus) return false;
//         // Map UI filter names to actual status values
//         if (statusFilter === "completed") return txStatus === "completed";
//         if (statusFilter === "cancelled") return txStatus === "canceled";
//         if (statusFilter === "pending") return txStatus === "pending";
//         if (statusFilter === "in progress")
//           return txStatus === "in progress" || txStatus === "processing";
//         if (statusFilter === "failed") return txStatus === "failed";
//         return false;
//       });
//     }

//     // Balance (Currency) Filter
//     const balanceFilters = filters.selectedBalance;
//     if (balanceFilters && balanceFilters.length > 0) {
//       results = results.filter((tx) => {
//         let currencyCodeToCheck: string | undefined;
//         if (tx.type === "Add Money") {
//           currencyCodeToCheck =
//             typeof tx.balanceCurrency === "object" &&
//             tx.balanceCurrency !== null
//               ? tx.balanceCurrency.code
//               : undefined;
//         } else if (tx.type === "Send Money") {
//           currencyCodeToCheck =
//             typeof tx.sendCurrency === "object" && tx.sendCurrency !== null
//               ? tx.sendCurrency.code
//               : undefined;
//         }
//         return currencyCodeToCheck
//           ? balanceFilters.includes(currencyCodeToCheck)
//           : false;
//       });
//     }

//     // Recipient Filter (Only applies to 'Send Money')
//     const recipientFilters = filters.selectedRecipients;
//     if (recipientFilters && recipientFilters.length > 0) {
//       const recipientFilterIds = recipientFilters.map(String); // Ensure comparison with strings
//       results = results.filter((tx) => {
//         if (tx.type !== "Send Money") return true; // Keep non-send transactions
//         const recipientId =
//           typeof tx.recipient === "object" && tx.recipient?._id
//             ? String(tx.recipient._id)
//             : typeof tx.recipient === "string"
//             ? tx.recipient
//             : null;
//         return recipientId ? recipientFilterIds.includes(recipientId) : false;
//       });
//     }

//     // Date Range Filter
//     const fromDateObj = parseDateString(filters.fromDate || undefined);
//     const toDateObj = parseDateString(filters.toDate || undefined);
//     if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0); // Start of the day UTC
//     if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999); // End of the day UTC

//     if (fromDateObj || toDateObj) {
//       results = results.filter((tx) => {
//         const transactionDateStr = tx.updatedAt || tx.createdAt;
//         if (!transactionDateStr) return false;
//         try {
//           const transactionDateObj = new Date(transactionDateStr);
//           if (isNaN(transactionDateObj.getTime())) return false;
//           const transactionUTCDate = new Date(
//             Date.UTC(
//               transactionDateObj.getUTCFullYear(),
//               transactionDateObj.getUTCMonth(),
//               transactionDateObj.getUTCDate()
//             )
//           );
//           let include = true;
//           if (fromDateObj && transactionUTCDate < fromDateObj) include = false;
//           if (toDateObj && transactionUTCDate > toDateObj) include = false;
//           return include;
//         } catch (e) {
//           console.error(
//             "Date parsing/comparison error during filtering:",
//             transactionDateStr,
//             e
//           );
//           return false;
//         }
//       });
//     }

//     // Set the final filtered list
//     setFilteredTransactions(results);
//   }, [allTransactions, searchTerm, activeFilters]); // Dependencies for filtering effect

//   // --- Filter Modal Application ---
//   const handleFiltersApply = useCallback((filtersFromModal: AppliedFilters) => {
//     setActiveFilters(filtersFromModal);
//     setIsFilterModalOpen(false);
//   }, []); // No dependencies needed as it only sets state

//   // --- Effects ---
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]); // Fetch data on mount or when token changes

//   // --- ** NEW ** Memoized Grouping Logic ---
//   const {
//     pendingTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//   } = useMemo(() => {
//     const pending: Transaction[] = [];
//     const inProgress: Transaction[] = [];
//     const processedUnsorted: Transaction[] = [];

//     // Categorize based on status
//     filteredTransactions.forEach((tx) => {
//       switch (tx.status) {
//         case "pending":
//           pending.push(tx);
//           break;
//         case "in progress":
//         case "processing":
//           inProgress.push(tx);
//           break;
//         case "completed":
//         case "canceled":
//         case "failed":
//           processedUnsorted.push(tx);
//           break;
//         default:
//           // Optionally handle unknown statuses, maybe add to processed?
//           console.warn(
//             "Unknown transaction status encountered:",
//             tx.status,
//             tx._id
//           );
//           // processedUnsorted.push(tx); // Or ignore
//           break;
//       }
//     });

//     // Define sorting function (used for Pending, In Progress, and *before* grouping Processed)
//     const sortFn = (a: Transaction, b: Transaction) => {
//       const dateA = a.updatedAt || a.createdAt;
//       const dateB = b.updatedAt || b.createdAt;
//       if (!dateA && !dateB) return 0;
//       if (!dateA) return 1;
//       if (!dateB) return -1;
//       try {
//         return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending
//       } catch (e) {
//         console.error("Error sorting dates:", dateA, dateB, e);
//         return 0;
//       }
//     };

//     // Sort each category
//     const sortedPending = [...pending].sort(sortFn);
//     const sortedInProgress = [...inProgress].sort(sortFn);
//     const sortedProcessed = [...processedUnsorted].sort(sortFn); // Sort processed *before* grouping

//     // Group the *sorted* processed transactions by date
//     const grouped = sortedProcessed.reduce(
//       (groups: { [date: string]: Transaction[] }, tx) => {
//         const groupDateStr = tx.updatedAt || tx.createdAt;
//         let dateKey = "Unknown Date";
//         if (groupDateStr) {
//           try {
//             dateKey = new Date(groupDateStr).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//               timeZone: "UTC",
//             });
//           } catch (e) {
//             console.error("Date formatting error:", groupDateStr, e);
//             dateKey = "Date Formatting Error";
//           }
//         }
//         if (!groups[dateKey]) groups[dateKey] = [];
//         groups[dateKey].push(tx);
//         return groups;
//       },
//       {}
//     );

//     return {
//       pendingTransactions: sortedPending,
//       inProgressTransactions: sortedInProgress,
//       groupedProcessedTransactions: grouped,
//     };
//   }, [filteredTransactions]); // Dependency: only recalculate when filteredTransactions change

//   // --- Other Memoized Values (for empty state logic) ---
//   const filtersAreActive = useMemo(
//     () =>
//       activeFilters.selectedRecipients.length > 0 ||
//       activeFilters.selectedDirection !== "all" ||
//       activeFilters.selectedStatus !== null ||
//       activeFilters.selectedBalance.length > 0 ||
//       activeFilters.fromDate !== "" ||
//       activeFilters.toDate !== "",
//     [activeFilters]
//   );

//   const searchIsActive = useMemo(() => searchTerm.trim() !== "", [searchTerm]);

//   // Determine if no results are shown *because* of active filters/search
//   const noResultsDueToFilterOrSearch = useMemo(
//     () =>
//       allTransactions.length > 0 && // Must have some transactions initially
//       filteredTransactions.length === 0 && // But none match current filter/search
//       (filtersAreActive || searchIsActive), // And filters/search must be active
//     [
//       allTransactions.length,
//       filteredTransactions.length,
//       filtersAreActive,
//       searchIsActive,
//     ]
//   );

//   // --- Loading State Check ---
//   const isLoading = loadingTransactions || loadingAccounts;
//   if (isLoading) {
//     return <TransactionsPageSkeleton />;
//   }

//   // --- Helper Functions ---
//   const handleOpenFilterModal = () => setIsFilterModalOpen(true);
//   const handleCloseFilterModal = () => setIsFilterModalOpen(false);
//   const clearAllAppliedFiltersAndSearch = () => {
//     setActiveFilters({
//       selectedRecipients: [],
//       selectedDirection: "all",
//       selectedStatus: null,
//       selectedBalance: [],
//       fromDate: "",
//       toDate: "",
//     });
//     setSearchTerm(""); // Also clear search term
//   };

//   // --- RENDER ---
//   return (
//     <>
//       <section className="Transaction-Wrapper pb-8 pt-5 md:pb-10">
//         <div className="container mx-auto">
//           {/* Header and Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
//             <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//               {" "}
//               Transactions{" "}
//             </h1>
//             {(allTransactions.length > 0 || userAccounts.length > 0) &&
//               !error && (
//                 <TransactionActions
//                   searchTerm={searchTerm}
//                   onSearchChange={setSearchTerm}
//                   onFilterButtonClick={handleOpenFilterModal}
//                 />
//               )}
//           </div>
//           {/* Error Display */}
//           {error && (
//             <div className="text-center py-5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 mb-4 rounded-md border border-red-200 dark:border-red-800/30">
//               <strong>Error:</strong> {error}
//             </div>
//           )}
//           {/* Transaction List & Empty States - Render only if not loading and no error */}
//           {!isLoading && !error && (
//             <div className="space-y-6">
//               {" "}
//               {/* Increased spacing between sections */}
//               {/* ---- Pending Section ---- */}
//               {pendingTransactions.length > 0 && (
//                 <div className="Pending-Transaction-Lists">
//                   <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                     Pending
//                   </h3>
//                   <div className="space-y-2">
//                     {pendingTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Waiting for you money"
//                         : `Sending by you`;
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object"
//                           ? transaction.balanceCurrency?.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object"
//                         ? transaction.sendCurrency?.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode || "..."} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={`pending-${transaction._id}`}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center sm:gap-4 gap-2">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
//                                 {" "}
//                                 {icon}{" "}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className="text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
//                                     {" "}
//                                     {name}{" "}
//                                   </h3>
//                                   <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1 ">
//                                     {" "}
//                                     {description}{" "}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0 sm:text-base text-15px`}
//                                 >
//                                   {amountPrefix}{" "}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//               {/* ---- In Progress Section ---- */}
//               {inProgressTransactions.length > 0 && (
//                 <div className="InProcess-Transaction-Lists">
//                   <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                     In Progress
//                   </h3>
//                   <div className="space-y-2">
//                     {inProgressTransactions.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? (
//                         <LuPlus
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       ) : (
//                         <GoArrowUp
//                           size={22}
//                           className="text-neutral-900 dark:text-white"
//                         />
//                       );
//                       const description = isAddMoney
//                         ? "Processing payment"
//                         : `Processing transfer`;
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? typeof transaction.balanceCurrency === "object"
//                           ? transaction.balanceCurrency?.code
//                           : ""
//                         : typeof transaction.sendCurrency === "object"
//                         ? transaction.sendCurrency?.code
//                         : "";
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `To your ${displayCurrencyCode || "..."} balance`
//                         : transaction.name || "Recipient";

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={`progress-${transaction._id}`}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center sm:gap-4 gap-2">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
//                                 {" "}
//                                 {icon}{" "}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className="text-wrap">
//                                   <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
//                                     {" "}
//                                     {name}{" "}
//                                   </h3>
//                                   <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1 ">
//                                     {" "}
//                                     {description}{" "}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0 sm:text-base text-15px`}
//                                 >
//                                   {amountPrefix}{" "}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}{" "}
//                                   {displayCurrencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//               {/* ---- Processed Section (Grouped by Date) ---- */}
//               {Object.entries(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-4">
//                   {" "}
//                   {/* Add space between date groups */}
//                   {Object.entries(groupedProcessedTransactions).map(
//                     ([date, transactionsForDate]) => (
//                       <div key={date} className="Processed-Transaction-Lists">
//                         <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
//                           {date} {/* Date heading */}
//                         </h3>
//                         <div className="space-y-2">
//                           {transactionsForDate.map((transaction) => {
//                             const isAddMoney = transaction.type === "Add Money";
//                             const icon = isAddMoney ? (
//                               <LuPlus
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             ) : (
//                               <GoArrowUp
//                                 size={22}
//                                 className="text-neutral-900 dark:text-white"
//                               />
//                             );
//                             const amount = isAddMoney
//                               ? transaction.amountToAdd ?? 0
//                               : transaction.sendAmount ?? 0;
//                             const displayCurrencyCode = isAddMoney
//                               ? typeof transaction.balanceCurrency === "object"
//                                 ? transaction.balanceCurrency?.code
//                                 : ""
//                               : typeof transaction.sendCurrency === "object"
//                               ? transaction.sendCurrency?.code
//                               : "";
//                             const amountPrefix = isAddMoney ? "+ " : "- ";
//                             const recipientName =
//                               transaction.name || "Recipient";
//                             const name = isAddMoney
//                               ? `Added to ${
//                                   displayCurrencyCode || "..."
//                                 } balance`
//                               : recipientName;

//                             let description = "";
//                             let amountClass = "";
//                             switch (transaction.status) {
//                               case "completed":
//                                 description = isAddMoney
//                                   ? "Added"
//                                   : `Sent by you`;
//                                 amountClass = isAddMoney
//                                   ? "text-green-600 dark:text-green-500"
//                                   : "text-neutral-900 dark:text-white";
//                                 break;
//                               case "canceled":
//                                 description = "Cancelled";
//                                 amountClass =
//                                   "text-red-600 line-through dark:text-red-500";
//                                 break;
//                               case "failed":
//                                 description = "Failed";
//                                 amountClass =
//                                   "text-red-600 line-through dark:text-red-500";
//                                 break;
//                               default:
//                                 description = `Status: ${transaction.status}`;
//                                 amountClass =
//                                   "text-gray-500 dark:text-gray-400";
//                             }

//                             return (
//                               <Link
//                                 href={`/dashboard/transactions/${transaction._id}`}
//                                 key={`processed-${transaction._id}`}
//                                 className="block"
//                               >
//                                 <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                                   <div className="flex sm:items-center items-start sm:gap-4 gap-2">
//                                     <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
//                                       {" "}
//                                       {icon}{" "}
//                                     </div>
//                                     <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                       <div className="text-wrap">
//                                         <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
//                                           {" "}
//                                           {name}{" "}
//                                         </h3>
//                                         <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1">
//                                           {" "}
//                                           {description}{" "}
//                                         </p>
//                                       </div>
//                                       <div
//                                         className={`font-medium ${amountClass} shrink-0 whitespace-nowrap sm:text-base text-15px`}
//                                       >
//                                         {amountPrefix}{" "}
//                                         {amount.toLocaleString(undefined, {
//                                           minimumFractionDigits: 2,
//                                           maximumFractionDigits: 2,
//                                         })}{" "}
//                                         {displayCurrencyCode}
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
//               )}
//               {/* ---- Empty State Logic ---- */}
//               {/* Case 1: No transactions *at all* */}
//               {allTransactions.length === 0 && !isLoading && !error && (
//                 <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//                   <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                     <MdOutlineAccessTime className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                   </div>
//                   <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//                     You haven't made any transactions yet.
//                   </h2>
//                   <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">Once you start <strong className="text-primary">Adding</strong> or <strong className="text-primary">Sending</strong> money, your transactions will show up here.</p>
//                 </div>
//               )}
//               {/* Case 2: Have transactions, but none match filter/search */}
//               {filteredTransactions.length === 0 &&
//                 allTransactions.length > 0 &&
//                 !isLoading &&
//                 !error && (
//                   <div className="text-center flex flex-col items-center text-lg px-4 text-gray-500 dark:text-gray-300 bg-lightgray py-8 dark:bg-white/5 rounded-lg mt-6">
//                     <span>
//                       No transactions match your current{" "}
//                       {filtersAreActive && searchIsActive
//                         ? "filter and search criteria"
//                         : filtersAreActive
//                         ? "filter criteria"
//                         : "search criteria"}
//                       .
//                     </span>
//                     {(filtersAreActive || searchIsActive) && (
//                       <Button
//                         onClick={clearAllAppliedFiltersAndSearch}
//                         className="mt-4 px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
//                       >
//                         Clear{" "}
//                         {filtersAreActive && searchIsActive
//                           ? "Filters & Search"
//                           : filtersAreActive
//                           ? "Filters"
//                           : "Search"}
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               {/* ---- End Empty State Logic ---- */}
//             </div>
//           )}{" "}
//           {/* End conditional rendering block (!isLoading && !error) */}
//         </div>{" "}
//         {/* Close container */}
//       </section>

//       {/* --- FILTER MODAL --- */}
//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={handleCloseFilterModal}
//         userAccounts={userAccounts}
//         onFiltersApply={handleFiltersApply}
//         initialFilters={activeFilters}
//       />
//     </>
//   );
// };

// export default TransactionsPage;

// frontend/src/app/dashboard/transactions/page.tsx
"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import FilterModal, { AppliedFilters } from "./FilterModal";
import TransactionActions from "./TransactionActions"; // Import the actions component

// Hooks & Services
import { useAuth } from "../../../contexts/AuthContext";
import paymentService from "../../../services/payment";
import transferService from "../../../services/transfer";
import accountService from "../../../services/account";

// Types
import { Transaction, TransactionStatus } from "@/types/transaction";
import { Account } from "@/types/account";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClipboardXIcon } from "lucide-react";
import { MdOutlineAccessTime } from "react-icons/md";

// Define a type for potential API errors
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

// Helper function to parse date strings (DD-MM-YYYY or ISO-like fallback)
function parseDateString(dateString: string | undefined): Date | null {
  if (!dateString) return null;
  // Try DD-MM-YYYY first
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
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
      // Validate the date components (e.g., handle 31-Feb)
      if (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month &&
        date.getUTCDate() === day
      ) {
        return date;
      }
    }
  }
  // Fallback to default ISO-like parsing if DD-MM-YYYY fails or isn't used
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // Return date object representing the start of the UTC day
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
    }
  } catch (e) {
    // Ignore parsing errors here, handled below
  }
  console.warn(
    "Could not parse date string into a valid Date object:",
    dateString
  );
  return null;
}

// --- Transactions Page Skeleton ---
const TransactionsPageSkeleton: React.FC = () => {
  return (
    <section className="Transaction-Page pb-8 md:pb-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
          <Skeleton className="md:h-12 h-8 md:w-64 w-40 rounded-md" />
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <Skeleton className="h-12.5 w-full sm:w-70 rounded-full" />
            <Skeleton className="h-12.5 w-36 rounded-full" />
          </div>
        </div>
        <div className="space-y-6">
          {" "}
          {/* Add more spacing between skeleton groups */}
          {/* Simulate Pending/In Progress group */}
          <div>
            <Skeleton className="h-6 w-32 mb-4 rounded" />{" "}
            {/* Heading skeleton */}
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`sk-pending-${index}`}
                  className="block p-2 sm:p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="size-14 rounded-full flex-shrink-0" />
                    <div className="flex-grow flex flex-row justify-between items-center gap-4">
                      <div className="flex-grow">
                        {" "}
                        <Skeleton className="h-5 md:w-40 w-28 mb-2" />{" "}
                        <Skeleton className="h-4 md:w-58 w-40" />{" "}
                      </div>
                      <div className="shrink-0">
                        {" "}
                        <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Simulate Processed group */}
          <div>
            <Skeleton className="h-6 w-40 mb-4 rounded" />{" "}
            {/* Date heading skeleton */}
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`sk-processed-${index}`}
                  className="block p-2 sm:p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="size-14 rounded-full flex-shrink-0" />
                    <div className="flex-grow flex flex-row justify-between items-center gap-4">
                      <div className="flex-grow">
                        {" "}
                        <Skeleton className="h-5 md:w-40 w-28 mb-2" />{" "}
                        <Skeleton className="h-4 md:w-58 w-40" />{" "}
                      </div>
                      <div className="shrink-0">
                        {" "}
                        <Skeleton className="lg:h-8 h-6 lg:w-32 w-16 rounded-full" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Transactions Page Component ---
const TransactionsPage: React.FC = () => {
  // --- State Declarations ---
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);
  const [activeFilters, setActiveFilters] = useState<AppliedFilters>({
    selectedRecipients: [],
    selectedDirection: "all",
    selectedStatus: null,
    selectedBalance: [],
    fromDate: "",
    toDate: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isClientMounted, setIsClientMounted] = useState(false); // <-- NEW

  // --- Hooks ---
  const { token } = useAuth();

  // --- Callbacks ---
  const fetchData = useCallback(async () => {
    if (!token) {
      // This check is more robust when fetchData is called after client mount
      setError("Authentication token is missing. Please log in.");
      setLoadingTransactions(false);
      setLoadingAccounts(false);
      return;
    }

    setLoadingTransactions(true);
    setLoadingAccounts(true);
    setError(null);
    // Reset state on fetch - be mindful if you want filters/search to persist across token changes
    // setAllTransactions([]); // Resetting here can cause a flash if token changes but data is similar
    // setFilteredTransactions([]);
    // setUserAccounts([]); // Only if accounts are volatile and tied to token changes

    try {
      const [paymentsData, transfersData, accountsData] = await Promise.all([
        paymentService.getUserPayments(token),
        transferService.getUserTransfers(token),
        accountService.getUserAccounts(token),
      ]);

      // --- Mapping Logic (ensure correct types and structure) ---
      const mappedPayments: Transaction[] = paymentsData.map((payment) => ({
        _id: payment._id,
        type: "Add Money",
        amountToAdd: payment.amountToAdd,
        amountToPay: payment.amountToPay,
        balanceCurrency: payment.balanceCurrency,
        payInCurrency: payment.payInCurrency,
        account: payment.account,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        status: (payment.status?.toLowerCase() ??
          "unknown") as TransactionStatus,
        description: `Add money via ${
          payment.payInCurrency?.code || "N/A"
        } to ${payment.balanceCurrency?.code || "N/A"} balance`,
      }));
      const mappedTransfers: Transaction[] = transfersData.map((transfer) => {
        const recipientName =
          typeof transfer.recipient === "object" && transfer.recipient !== null
            ? transfer.recipient.accountHolderName ?? "Recipient"
            : "Recipient";
        return {
          _id: transfer._id,
          type: "Send Money",
          name: recipientName,
          sendAmount: transfer.sendAmount,
          receiveAmount: transfer.receiveAmount,
          sendCurrency: transfer.sendCurrency,
          receiveCurrency: transfer.receiveCurrency,
          createdAt: transfer.createdAt,
          updatedAt: transfer.updatedAt,
          status: (transfer.status?.toLowerCase() ??
            "unknown") as TransactionStatus,
          recipient: transfer.recipient,
          sourceAccountId:
            typeof transfer.sourceAccount === "string"
              ? transfer.sourceAccount
              : transfer.sourceAccount?._id,
          description: `Send money from ${
            transfer.sendCurrency?.code || "N/A"
          } to ${recipientName}`,
        };
      });

      const combinedTransactions = [...mappedPayments, ...mappedTransfers];
      combinedTransactions.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        try {
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        } catch (e) {
          console.error("Error comparing dates:", dateA, dateB, e);
          return 0;
        }
      });

      setAllTransactions(combinedTransactions);
      setUserAccounts(accountsData);
    } catch (err: unknown) {
      console.error("Fetch error:", err);
      let errorMessage = "Failed to fetch data.";
      if (err instanceof Error) {
        errorMessage = err.message;
        const apiError = err as ApiError;
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setLoadingTransactions(false);
      setLoadingAccounts(false);
    }
  }, [token]);

  // --- Effects ---
  useEffect(() => {
    setIsClientMounted(true); // Mark component as mounted on client
  }, []);

  useEffect(() => {
    if (isClientMounted) {
      // Only fetch data if component is mounted and token might be available
      fetchData();
    }
  }, [fetchData, isClientMounted]); // Re-fetch if token changes (via fetchData dep) or on initial client mount

  // --- Filtering and Searching Logic ---
  useEffect(() => {
    let results = [...allTransactions];

    // 1. Apply Search Term Filter
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      results = results.filter((tx) => {
        const nameMatches = tx.name?.toLowerCase().includes(searchTermLower);
        const descriptionMatches =
          typeof tx.description === "string" &&
          tx.description.toLowerCase().includes(searchTermLower);
        const typeMatches = tx.type?.toLowerCase().includes(searchTermLower);
        let currencyMatch = false;
        if (tx.type === "Add Money") {
          currencyMatch =
            (typeof tx.balanceCurrency === "object" &&
              tx.balanceCurrency?.code
                ?.toLowerCase()
                .includes(searchTermLower)) ||
            (typeof tx.payInCurrency === "object" &&
              tx.payInCurrency?.code?.toLowerCase().includes(searchTermLower));
        } else if (tx.type === "Send Money") {
          currencyMatch =
            (typeof tx.sendCurrency === "object" &&
              tx.sendCurrency?.code?.toLowerCase().includes(searchTermLower)) ||
            (typeof tx.receiveCurrency === "object" &&
              tx.receiveCurrency?.code
                ?.toLowerCase()
                .includes(searchTermLower));
        }
        const statusMatches = tx.status
          ?.toLowerCase()
          .includes(searchTermLower);
        const idMatches = tx._id.toLowerCase().includes(searchTermLower);

        let recipientNameMatches = false;
        if (
          tx.type === "Send Money" &&
          typeof tx.recipient === "object" &&
          tx.recipient?.accountHolderName
        ) {
          recipientNameMatches = tx.recipient.accountHolderName
            .toLowerCase()
            .includes(searchTermLower);
        }

        return (
          nameMatches ||
          descriptionMatches ||
          typeMatches ||
          currencyMatch ||
          statusMatches ||
          idMatches ||
          recipientNameMatches
        );
      });
    }

    // 2. Apply Active Filters
    const filters = activeFilters;

    const direction = filters.selectedDirection;
    if (direction !== "all") {
      results = results.filter(
        (tx) =>
          (direction === "add" && tx.type === "Add Money") ||
          (direction === "send" && tx.type === "Send Money")
      );
    }

    const statusFilter = filters.selectedStatus?.toLowerCase();
    if (statusFilter) {
      results = results.filter((tx) => {
        const txStatus = tx.status;
        if (!txStatus) return false;
        if (statusFilter === "completed") return txStatus === "completed";
        if (statusFilter === "cancelled") return txStatus === "canceled"; // API uses 'canceled'
        if (statusFilter === "pending") return txStatus === "pending";
        if (statusFilter === "in progress")
          return txStatus === "in progress" || txStatus === "processing";
        if (statusFilter === "failed") return txStatus === "failed";
        return false;
      });
    }

    const balanceFilters = filters.selectedBalance;
    if (balanceFilters && balanceFilters.length > 0) {
      results = results.filter((tx) => {
        let currencyCodeToCheck: string | undefined;
        if (tx.type === "Add Money") {
          currencyCodeToCheck =
            typeof tx.balanceCurrency === "object" &&
            tx.balanceCurrency !== null
              ? tx.balanceCurrency.code
              : undefined;
        } else if (tx.type === "Send Money") {
          currencyCodeToCheck =
            typeof tx.sendCurrency === "object" && tx.sendCurrency !== null
              ? tx.sendCurrency.code
              : undefined;
        }
        return currencyCodeToCheck
          ? balanceFilters.includes(currencyCodeToCheck)
          : false;
      });
    }

    const recipientFilters = filters.selectedRecipients;
    if (recipientFilters && recipientFilters.length > 0) {
      const recipientFilterIds = recipientFilters.map(String);
      results = results.filter((tx) => {
        if (tx.type !== "Send Money") return true;
        const recipientId =
          typeof tx.recipient === "object" && tx.recipient?._id
            ? String(tx.recipient._id)
            : typeof tx.recipient === "string"
            ? tx.recipient
            : null;
        return recipientId ? recipientFilterIds.includes(recipientId) : false;
      });
    }

    const fromDateObj = parseDateString(filters.fromDate || undefined);
    const toDateObj = parseDateString(filters.toDate || undefined);
    if (fromDateObj) fromDateObj.setUTCHours(0, 0, 0, 0);
    if (toDateObj) toDateObj.setUTCHours(23, 59, 59, 999);

    if (fromDateObj || toDateObj) {
      results = results.filter((tx) => {
        const transactionDateStr = tx.updatedAt || tx.createdAt;
        if (!transactionDateStr) return false;
        try {
          const transactionDateObj = new Date(transactionDateStr);
          if (isNaN(transactionDateObj.getTime())) return false;
          const transactionUTCDate = new Date(
            Date.UTC(
              transactionDateObj.getUTCFullYear(),
              transactionDateObj.getUTCMonth(),
              transactionDateObj.getUTCDate()
            )
          );
          let include = true;
          if (fromDateObj && transactionUTCDate < fromDateObj) include = false;
          if (toDateObj && transactionUTCDate > toDateObj) include = false;
          return include;
        } catch (e) {
          console.error(
            "Date parsing/comparison error during filtering:",
            transactionDateStr,
            e
          );
          return false;
        }
      });
    }

    setFilteredTransactions(results);
  }, [allTransactions, searchTerm, activeFilters]);

  // --- Filter Modal Application ---
  const handleFiltersApply = useCallback((filtersFromModal: AppliedFilters) => {
    setActiveFilters(filtersFromModal);
    setIsFilterModalOpen(false);
  }, []);

  // --- Memoized Grouping Logic ---
  const {
    pendingTransactions,
    inProgressTransactions,
    groupedProcessedTransactions,
  } = useMemo(() => {
    const pending: Transaction[] = [];
    const inProgress: Transaction[] = [];
    const processedUnsorted: Transaction[] = [];

    filteredTransactions.forEach((tx) => {
      switch (tx.status) {
        case "pending":
          pending.push(tx);
          break;
        case "in progress":
        case "processing":
          inProgress.push(tx);
          break;
        case "completed":
        case "canceled":
        case "failed":
          processedUnsorted.push(tx);
          break;
        default:
          console.warn(
            "Unknown transaction status encountered:",
            tx.status,
            tx._id
          );
          break;
      }
    });

    const sortFn = (a: Transaction, b: Transaction) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      try {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      } catch (e) {
        console.error("Error sorting dates:", dateA, dateB, e);
        return 0;
      }
    };

    const sortedPending = [...pending].sort(sortFn);
    const sortedInProgress = [...inProgress].sort(sortFn);
    const sortedProcessed = [...processedUnsorted].sort(sortFn);

    const grouped = sortedProcessed.reduce(
      (groups: { [date: string]: Transaction[] }, tx) => {
        const groupDateStr = tx.updatedAt || tx.createdAt;
        let dateKey = "Unknown Date";
        if (groupDateStr) {
          try {
            dateKey = new Date(groupDateStr).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            });
          } catch (e) {
            console.error("Date formatting error:", groupDateStr, e);
            dateKey = "Date Formatting Error";
          }
        }
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(tx);
        return groups;
      },
      {}
    );

    return {
      pendingTransactions: sortedPending,
      inProgressTransactions: sortedInProgress,
      groupedProcessedTransactions: grouped,
    };
  }, [filteredTransactions]);

  // --- Other Memoized Values (for empty state logic) ---
  const filtersAreActive = useMemo(
    () =>
      activeFilters.selectedRecipients.length > 0 ||
      activeFilters.selectedDirection !== "all" ||
      activeFilters.selectedStatus !== null ||
      activeFilters.selectedBalance.length > 0 ||
      activeFilters.fromDate !== "" ||
      activeFilters.toDate !== "",
    [activeFilters]
  );

  const searchIsActive = useMemo(() => searchTerm.trim() !== "", [searchTerm]);

  // --- Loading State Check ---
  const isLoading = !isClientMounted || loadingTransactions || loadingAccounts; // <-- MODIFIED

  if (isLoading) {
    return <TransactionsPageSkeleton />;
  }

  // --- Helper Functions ---
  const handleOpenFilterModal = () => setIsFilterModalOpen(true);
  const handleCloseFilterModal = () => setIsFilterModalOpen(false);
  const clearAllAppliedFiltersAndSearch = () => {
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

  // --- RENDER ---
  return (
    <>
      <section className="Transaction-Wrapper">
        <div className="container mx-auto">
          {/* Header and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sticky lg:top-28 top-20 z-10 bg-white dark:bg-background">
            <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
              Transactions
            </h1>

            {/* Show actions if there's any data, or if filters/search are active, but not on critical error */}
            {(allTransactions.length > 0 ||
              userAccounts.length > 0 ||
              filtersAreActive ||
              searchIsActive) &&
              !error && ( // Ensure !error condition here
                <TransactionActions
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onFilterButtonClick={handleOpenFilterModal}
                />
              )}
          </div>

          {/* Error Display: Only show error if not loading */}
          {error && ( // isLoading check is implicitly handled by the main isLoading guard above
            <div className="text-center py-5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 p-4 mb-4 rounded-md border border-red-200 dark:border-red-800/30">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Transaction List & Empty States - Render only if not loading and no error */}
          {!isLoading &&
            !error && ( // This outer check is technically redundant due to the main isLoading guard, but good for clarity
              <div className="space-y-6">
                {/* ---- Pending Section ---- */}
                {pendingTransactions.length > 0 && (
                  <div className="Pending-Transaction-Lists">
                    <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
                      Pending
                    </h3>
                    <div className="space-y-2">
                      {pendingTransactions.map((transaction) => {
                        const isAddMoney = transaction.type === "Add Money";
                        const icon = isAddMoney ? (
                          <LuPlus
                            size={22}
                            className="text-neutral-900 dark:text-white"
                          />
                        ) : (
                          <GoArrowUp
                            size={22}
                            className="text-neutral-900 dark:text-white"
                          />
                        );
                        const description = isAddMoney
                          ? "Waiting for you money"
                          : `Sending by you`;
                        const amount = isAddMoney
                          ? transaction.amountToAdd ?? 0
                          : transaction.sendAmount ?? 0;
                        const displayCurrencyCode = isAddMoney
                          ? typeof transaction.balanceCurrency === "object"
                            ? transaction.balanceCurrency?.code
                            : ""
                          : typeof transaction.sendCurrency === "object"
                          ? transaction.sendCurrency?.code
                          : "";
                        const amountPrefix = isAddMoney ? "+ " : "- ";
                        const name = isAddMoney
                          ? `To your ${displayCurrencyCode || "..."} balance`
                          : transaction.name || "Recipient";

                        return (
                          <Link
                            href={`/dashboard/transactions/${transaction._id}`}
                            key={`pending-${transaction._id}`}
                            className="block"
                          >
                            <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                              <div className="flex items-center sm:gap-4 gap-2">
                                <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
                                  {icon}
                                </div>

                                <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                  <div className="text-wrap">
                                    <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
                                      {name}
                                    </h3>
                                    <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1 ">
                                      {description}
                                    </p>
                                  </div>
                                  <div
                                    className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0 sm:text-base text-15px`}
                                  >
                                    {amountPrefix}
                                    {amount.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}{" "}
                                    {displayCurrencyCode}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* ---- In Progress Section ---- */}
                {inProgressTransactions.length > 0 && (
                  <div className="InProcess-Transaction-Lists">
                    <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
                      In Progress
                    </h3>
                    <div className="space-y-2">
                      {inProgressTransactions.map((transaction) => {
                        const isAddMoney = transaction.type === "Add Money";
                        const icon = isAddMoney ? (
                          <LuPlus
                            size={22}
                            className="text-neutral-900 dark:text-white"
                          />
                        ) : (
                          <GoArrowUp
                            size={22}
                            className="text-neutral-900 dark:text-white"
                          />
                        );
                        const description = isAddMoney
                          ? "Processing payment"
                          : `Processing transfer`;
                        const amount = isAddMoney
                          ? transaction.amountToAdd ?? 0
                          : transaction.sendAmount ?? 0;
                        const displayCurrencyCode = isAddMoney
                          ? typeof transaction.balanceCurrency === "object"
                            ? transaction.balanceCurrency?.code
                            : ""
                          : typeof transaction.sendCurrency === "object"
                          ? transaction.sendCurrency?.code
                          : "";
                        const amountPrefix = isAddMoney ? "+ " : "- ";
                        const name = isAddMoney
                          ? `To your ${displayCurrencyCode || "..."} balance`
                          : transaction.name || "Recipient";

                        return (
                          <Link
                            href={`/dashboard/transactions/${transaction._id}`}
                            key={`progress-${transaction._id}`}
                            className="block"
                          >
                            <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                              <div className="flex items-center sm:gap-4 gap-2">
                                <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
                                  {icon}
                                </div>
                                <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                  <div className="text-wrap">
                                    <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
                                      {name}
                                    </h3>
                                    <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1 ">
                                      {description}
                                    </p>
                                  </div>
                                  <div
                                    className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap shrink-0 sm:text-base text-15px`}
                                  >
                                    {amountPrefix}
                                    {amount.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}{" "}
                                    {displayCurrencyCode}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* ---- Processed Section (Grouped by Date) ---- */}
                {Object.entries(groupedProcessedTransactions).length > 0 && (
                  <div className="space-y-4">
                    {Object.entries(groupedProcessedTransactions).map(
                      ([date, transactionsForDate]) => (
                        <div key={date} className="Processed-Transaction-Lists">
                          <h3 className="font-medium text-gray-700 dark:text-white mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
                            {date}
                          </h3>
                          <div className="space-y-2">
                            {transactionsForDate.map((transaction) => {
                              const isAddMoney =
                                transaction.type === "Add Money";
                              const icon = isAddMoney ? (
                                <LuPlus
                                  size={22}
                                  className="text-neutral-900 dark:text-white"
                                />
                              ) : (
                                <GoArrowUp
                                  size={22}
                                  className="text-neutral-900 dark:text-white"
                                />
                              );
                              const amount = isAddMoney
                                ? transaction.amountToAdd ?? 0
                                : transaction.sendAmount ?? 0;
                              const displayCurrencyCode = isAddMoney
                                ? typeof transaction.balanceCurrency ===
                                  "object"
                                  ? transaction.balanceCurrency?.code
                                  : ""
                                : typeof transaction.sendCurrency === "object"
                                ? transaction.sendCurrency?.code
                                : "";
                              const amountPrefix = isAddMoney ? "+ " : "- ";
                              const recipientName =
                                transaction.name || "Recipient";
                              const name = isAddMoney
                                ? `Added to ${
                                    displayCurrencyCode || "..."
                                  } balance`
                                : recipientName;

                              let description = "";
                              let amountClass = "";
                              switch (transaction.status) {
                                case "completed":
                                  description = isAddMoney
                                    ? "Added"
                                    : `Sent by you`;
                                  amountClass = isAddMoney
                                    ? "text-green-600 dark:text-green-500"
                                    : "text-neutral-900 dark:text-white";
                                  break;
                                case "canceled":
                                  description = "Cancelled";
                                  amountClass =
                                    "text-red-600 line-through dark:text-red-500";
                                  break;
                                case "failed":
                                  description = "Failed";
                                  amountClass =
                                    "text-red-600 line-through dark:text-red-500";
                                  break;
                                default:
                                  description = `Status: ${transaction.status}`;
                                  amountClass =
                                    "text-gray-500 dark:text-gray-400";
                              }

                              return (
                                <Link
                                  href={`/dashboard/transactions/${transaction._id}`}
                                  key={`processed-${transaction._id}`}
                                  className="block"
                                >
                                  <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                                    <div className="flex sm:items-center items-start sm:gap-4 gap-2">
                                      <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center flex-shrink-0">
                                        {icon}
                                      </div>
                                      <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                        <div className="text-wrap">
                                          <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px">
                                            {name}
                                          </h3>
                                          <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1">
                                            {description}
                                          </p>
                                        </div>
                                        <div
                                          className={`font-medium ${amountClass} shrink-0 whitespace-nowrap sm:text-base text-15px`}
                                        >
                                          {amountPrefix}
                                          {amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}{" "}
                                          {displayCurrencyCode}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                {/* ---- Empty State Logic ---- */}
                {/* Case 1: No transactions *at all* (and not because of filters/search) */}
                {allTransactions.length === 0 &&
                  filteredTransactions.length === 0 && // Ensure it's not just filters clearing the view
                  !filtersAreActive &&
                  !searchIsActive && ( // Explicitly check that no filters/search are active
                    <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
                      <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
                        <MdOutlineAccessTime className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
                      </div>
                      <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
                        You haven't made any transactions yet.
                      </h2>
                      <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
                        Once you start{" "}
                        <strong className="text-primary">Adding</strong> or{" "}
                        <strong className="text-primary">Sending</strong> money,
                        your transactions will show up here.
                      </p>
                    </div>
                  )}
                {/* Case 2: Have transactions, but none match filter/search */}
                {filteredTransactions.length === 0 &&
                  allTransactions.length > 0 && // Only show if there *are* transactions to filter from
                  (filtersAreActive || searchIsActive) && ( // Only show if filters or search are active
                    <div className="text-center flex flex-col items-center text-lg px-4 space-y-4 bg-lightgray py-10 dark:bg-primarybox rounded-lg">
                      <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full">
                        <ClipboardXIcon className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
                      </div>

                      <span className="text-gray-500 dark:text-gray-300"> 
                        No transactions match your current{" "}
                        {filtersAreActive && searchIsActive
                          ? "filter and search criteria"
                          : filtersAreActive
                          ? "filter criteria"
                          : "search criteria"}
                        .
                      </span>

                      <Button
                        onClick={clearAllAppliedFiltersAndSearch}
                        className="px-6 cursor-pointer lg:py-3 py-2.5 lg:text-base text-sm font-medium w-auto bg-primary text-neutral-900 rounded-full hover:bg-primaryhover transition-colors duration-500 ease-in-out"
                      >
                        Clear{" "}
                        {filtersAreActive && searchIsActive
                          ? "Filters & Search"
                          : filtersAreActive
                          ? "Filters"
                          : "Search"}
                      </Button>
                    </div>
                  )}
              </div>
            )}
        </div>
      </section>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        userAccounts={userAccounts}
        onFiltersApply={handleFiltersApply}
        initialFilters={activeFilters}
      />
    </>
  );
};

export default TransactionsPage;
