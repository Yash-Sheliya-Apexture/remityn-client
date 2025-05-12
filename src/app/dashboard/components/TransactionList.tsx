// // src/app/dashboard/components/TransactionList.tsx
// import React from 'react';
// import Link from 'next/link';
// import { Transaction } from '@/types/transaction'; // Adjust path
// import { useGroupedTransactions, GroupedTransactions } from '@/app/hooks/useGroupedTransactions'; // Adjust path
// import { LuPlus } from 'react-icons/lu';
// import { GoArrowUp } from 'react-icons/go';
// import { MdErrorOutline } from 'react-icons/md';

// interface TransactionListProps {
//     transactions: Transaction[]; // The list to display (potentially filtered/searched)
//     isLoading: boolean;
//     error: string | null; // Transaction-specific error
//     currencyCode: string; // Needed for display consistency
//     balanceId: string; // Needed for links in empty state
//     onSendClick: () => void; // For empty state button
//     canSendMoney: boolean; // For empty state button
//     wasInitiallyEmpty: boolean; // To differentiate empty states
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//     transactions,
//     isLoading,
//     error,
//     currencyCode,
//     balanceId,
//     onSendClick,
//     canSendMoney,
//     wasInitiallyEmpty, // Pass whether the *original* balanceSpecificTransactions was empty
// }) => {
//     const {
//         pendingAttentionTransactions,
//         inProgressTransactions,
//         groupedProcessedTransactions,
//         hasProcessedTransactions,
//         hasAnyTransactionsToDisplay
//     } = useGroupedTransactions(transactions); // Use the hook with the currently displayed transactions

//     // Transaction Loading State
//     if (isLoading) {
//         return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading transactions...</div>;
//     }

//     // Transaction Error State
//     if (error) {
//         return (
//             <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//                 <strong>Transaction Error:</strong> {error}
//             </div>
//         );
//     }

//     // Transaction List Area
//     return (
//         <div className="space-y-6">
//             {/* --- Needs Your Attention Section --- */}
//             {pendingAttentionTransactions.length > 0 && (
//                 <div>
//                     <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">Needs your attention</h2>
//                     <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border  dark:border-gray-700 shadow-sm">
//                         {pendingAttentionTransactions.map((transaction) => {
//                             const amount = transaction.amountToAdd ?? 0;
//                             const name = `To your ${currencyCode} balance`;
//                             return (
//                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                      <a className="block hover:bg-orange-50 dark:hover:bg-orange-900/20 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          {/* ... (rest of the JSX for Needs Attention item - copied from original) ... */}
//                                           <div className="flex items-center gap-4">
//                                               {/* Icon with Badge */}
//                                               <div className="relative flex-shrink-0">
//                                                   <div className="p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-700/40">
//                                                       <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" />
//                                                   </div>
//                                                   <MdErrorOutline size={18} className="absolute -bottom-1 -right-1 text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm" />
//                                               </div>
//                                               {/* Details */}
//                                               <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                                   <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                       <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                       <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">Waiting for you to pay</p>
//                                                   </div>
//                                                   {/* Amount added */}
//                                                   <div className={`font-medium text-green-600 dark:text-green-400 text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                       + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencyCode}
//                                                   </div>
//                                               </div>
//                                           </div>
//                                      </a>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}

//             {/* --- In Progress Transactions Section --- */}
//             {inProgressTransactions.length > 0 && (
//                 <div>
//                     <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-gray-700 after:mt-1 text-sm uppercase tracking-wider">In progress</h2>
//                     <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border  dark:border-gray-700 shadow-sm">
//                         {inProgressTransactions.map((transaction) => {
//                             // ... (logic and JSX for In Progress item - copied from original) ...
//                              const isAddMoney = transaction.type === "Add Money";
//                              const icon = isAddMoney ? <LuPlus size={22} className="text-blue-600 dark:text-blue-400" /> : <GoArrowUp size={22} className="text-blue-600 dark:text-blue-400" />;
//                              let description = isAddMoney ? "Processing your deposit" : (transaction.status === 'pending' ? "Sending your money" : "Processing transfer");
//                              const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                              const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                              const amountPrefix = isAddMoney ? "+ " : "- ";
//                              const name = isAddMoney ? `To your ${txCurrencyCode || currencyCode} balance` : (transaction.name || "Recipient");

//                             return (
//                                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                     <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                          {/* ... (rest of the JSX for In Progress item) ... */}
//                                           <div className="flex items-center gap-4">
//                                               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700/40 flex-shrink-0">
//                                                   {icon}
//                                               </div>
//                                               <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                   <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                       <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                       <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">{description}</p>
//                                                   </div>
//                                                   <div className={`font-medium text-sm md:text-base whitespace-nowrap sm:ml-4 ${isAddMoney ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
//                                                       {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {txCurrencyCode || currencyCode}
//                                                   </div>
//                                               </div>
//                                           </div>
//                                     </a>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}

//              {/* --- Processed Transactions (Grouped by Date) Section --- */}
//             {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//                 <div className="space-y-6">
//                     {Object.entries(groupedProcessedTransactions).map(([date, transactionsForDate]) => (
//                         <div key={date}>
//                             <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-3 text-sm uppercase tracking-wider">{date}</h3>
//                             <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//                                 {transactionsForDate.map((transaction) => {
//                                     // ... (logic and JSX for Processed item - copied from original) ...
//                                     const isAddMoney = transaction.type === "Add Money";
//                                     const icon = isAddMoney ? <LuPlus size={22} className="text-gray-500 dark:text-gray-400" /> : <GoArrowUp size={22} className="text-gray-500 dark:text-gray-400" />;
//                                     let description = "";
//                                     let amountClass = "";
//                                     const amount = isAddMoney ? (transaction.amountToAdd ?? 0) : (transaction.sendAmount ?? 0);
//                                     const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                                     const amountPrefix = isAddMoney ? "+ " : "- ";
//                                     const name = isAddMoney ? `Added to ${displayCurrencyCode || currencyCode} balance` : (transaction.name || "Recipient");

//                                     switch (transaction.status) {
//                                         case "completed": /* ... */ amountClass = isAddMoney ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100"; description = isAddMoney ? "Added" : `Sent to ${transaction.name || 'Recipient'}`; break;
//                                         case "canceled": case "cancelled": /* ... */ amountClass = "text-red-500 dark:text-red-400 line-through"; description = "Cancelled"; break;
//                                         case "failed": /* ... */ amountClass = "text-red-500 dark:text-red-400"; description = "Failed"; break;
//                                         default: /* ... */ amountClass = "text-gray-500 dark:text-gray-400"; description = transaction.status ?? 'Unknown';
//                                     }

//                                     return (
//                                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} passHref legacyBehavior>
//                                             <a className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -m-3 rounded-md transition-colors duration-150 ease-in-out cursor-pointer">
//                                                  {/* ... (rest of the JSX for Processed item) ... */}
//                                                    <div className="flex items-center gap-4">
//                                                        <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600/50 flex-shrink-0">
//                                                            {icon}
//                                                        </div>
//                                                        <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-2">
//                                                            <div className="mb-1 sm:mb-0 flex-1 min-w-0">
//                                                                <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm md:text-base truncate" title={name}>{name}</h3>
//                                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
//                                                            </div>
//                                                            <div className={`font-medium ${amountClass} text-sm md:text-base whitespace-nowrap sm:ml-4`}>
//                                                                {amountPrefix}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrencyCode || currencyCode}
//                                                            </div>
//                                                        </div>
//                                                    </div>
//                                             </a>
//                                         </Link>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//              )}

//              {/* --- Empty State for Transactions --- */}
//              {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//                 <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800/50 rounded-lg mt-6 border border-gray-200 dark:border-gray-700/50">
//                     {wasInitiallyEmpty // Check if the *original* list for this balance was empty
//                         ? `No transactions found for your ${currencyCode} balance yet.`
//                         : "No transactions match your current filter or search criteria."
//                     }
//                     <p className="mt-2 text-sm">You can <Link href={`/dashboard/balances/${balanceId}/add-money`} className="text-primary hover:underline font-medium">add money</Link> or <button onClick={onSendClick} disabled={!canSendMoney} className={`text-primary hover:underline font-medium ${!canSendMoney ? 'opacity-50 cursor-not-allowed' : ''}`}>send money</button>.</p>
//                 </div>
//              )}
//         </div>
//     );
// };

// export default TransactionList;

// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
//   GroupedTransactions,
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[]; // The list to display (potentially filtered/searched)
//   isLoading: boolean;
//   error: string | null; // Transaction-specific error
//   currencyCode: string; // Needed for display consistency
//   balanceId: string; // Needed for links in empty state
//   onSendClick: () => void; // For empty state button
//   canSendMoney: boolean; // For empty state button
//   wasInitiallyEmpty: boolean; // To differentiate empty states
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty, // Pass whether the *original* balanceSpecificTransactions was empty
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay,
//   } = useGroupedTransactions(transactions); // Use the hook with the currently displayed transactions

//   // Transaction Loading State
//   if (isLoading) {
//     return (
//       <div className="space-y-2">
//         {Array(3)
//           .fill(0)
//           .map((_, index) => (
//             <div key={index} className="block">
//               <div className="block p-2 sm:p-4 rounded-2xl">
//                 <div className="flex items-center gap-4">
//                   {/* Icon Skeleton */}
//                   <div className="relative flex-shrink-0">
//                     <div className="flex items-center justify-center">
//                       <Skeleton className="h-12 w-12 rounded-full" />
//                     </div>
//                   </div>
//                   {/* Text and Button Skeletons */}
//                   <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                     <div className="flex-grow">
//                       <Skeleton className="h-4 w-40 mb-2" />
//                       <Skeleton className="h-3 w-32" />
//                     </div>
//                     <div className="shrink-0">
//                       <Skeleton className="h-5 w-20 rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     );
//   }

//   // Transaction Error State
//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//         <strong>Transaction Error:</strong> {error}
//       </div>
//     );
//   }

//   // Transaction List Area
//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//         <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">
//             Needs your attention
//           </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               const amount = transaction.amountToAdd ?? 0;
//               const name = `To your ${currencyCode} balance`;
//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     {/* ... (rest of the JSX for Needs Attention item - copied from original) ... */}
//                     <div className="flex items-center gap-4">
//                       {/* Icon with Badge */}
//                       <div className="relative flex-shrink-0">
//                         <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                           <LuPlus
//                             size={24}
//                             className="text-yellow-700 dark:text-yellow-300"
//                           />
//                         </div>
//                         <MdErrorOutline
//                           size={20}
//                           className="absolute -bottom-1 -right-1 text-orange-500 bg-white rounded-full p-0.5 shadow"
//                         />
//                       </div>
//                       {/* Details */}
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-orange-600 font-semibold mt-1">
//                             Waiting for you to pay
//                           </p>
//                         </div>
//                         {/* Amount added */}
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           +
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//         <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             In progress
//           </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               // ... (logic and JSX for In Progress item - copied from original) ...
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? (
//                 <LuPlus
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               ) : (
//                 <GoArrowUp
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               );
//               let description = isAddMoney
//                 ? "Processing your deposit"
//                 : transaction.status === "pending"
//                 ? "Sending your money"
//                 : "Processing transfer";
//               const amount = isAddMoney
//                 ? transaction.amountToAdd ?? 0
//                 : transaction.sendAmount ?? 0;
//               const txCurrencyCode = isAddMoney
//                 ? transaction.balanceCurrency?.code
//                 : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney
//                 ? `To your ${txCurrencyCode || currencyCode} balance`
//                 : transaction.name || "Recipient";

//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     {/* ... (rest of the JSX for In Progress item) ... */}
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                         {icon}
//                       </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                             {description}
//                             <span className="italic">
//                               ({transaction.status})
//                             </span>
//                           </p>
//                         </div>
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           {amountPrefix}
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {txCurrencyCode || currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions &&
//         groupedProcessedTransactions &&
//         Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map(
//               ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     {date}
//                   </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
//                       // ... (logic and JSX for Processed item - copied from original) ...
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
//                       let description = "";
//                       let amountClass = "";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? transaction.balanceCurrency?.code
//                         : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `Added to ${
//                             displayCurrencyCode || currencyCode
//                           } balance`
//                         : transaction.name || "Recipient";

//                       switch (transaction.status) {
//                         case "completed":
//                           /* ... */ amountClass = isAddMoney
//                             ? "text-green-600 dark:text-green-500"
//                             : "text-neutral-900  dark:text-white";
//                           description = isAddMoney
//                             ? "Added"
//                             : `Sent to ${transaction.name || "Recipient"}`;
//                           break;
//                         case "canceled":
//                         case "cancelled":
//                           /* ... */ amountClass = "text-red-600 line-through";
//                           description = "Cancelled";
//                           break;
//                         case "failed":
//                           /* ... */ amountClass = "text-red-600 line-through";
//                           description = "Failed";
//                           break;
//                         default:
//                           /* ... */ amountClass =
//                             "text-neutral-900  dark:text-white";
//                           description = transaction.status ?? "Unknown";
//                       }

//                       return (
//                         <Link
//                           href={`/dashboard/transactions/${transaction._id}`}
//                           key={transaction._id}
//                           className="block"
//                         >
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             {/* ... (rest of the JSX for Processed item) ... */}
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                                 {icon}
//                               </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className="text-wrap">
//                                   <h3
//                                     className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                                     title={name}
//                                   >
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium ${amountClass} whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}
//                                   {displayCurrencyCode || currencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State for Transactions --- */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//         <div className="text-center text-gray-500 dark:text-gray-300 py-10 bg-white dark:bg-white/5 rounded-lg mt-6 border">
//           {wasInitiallyEmpty // Check if the *original* list for this balance was empty
//             ? `No transactions found for your ${currencyCode} balance yet.`
//             : "No transactions match your current filter or search criteria."}
//           <p className="mt-2 text-sm">
//             You can
//             <Link
//               href={`/dashboard/balances/${balanceId}/add-money`}
//               className="text-primary hover:underline font-medium"
//             >
//               add money
//             </Link>
//             or
//             {/* Send money button */}
//             <button
//               onClick={onSendClick}
//               // disabled={!canSendMoney}
//               className={`text-primary hover:underline font-medium ${
//                 !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               send money
//             </button>
//             .
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;



// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
//   // GroupedTransactions, // Removed unused type import
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[]; // The list to display (potentially filtered/searched)
//   isLoading: boolean;
//   error: string | null; // Transaction-specific error
//   currencyCode: string; // Needed for display consistency
//   balanceId: string; // Needed for links in empty state
//   onSendClick: () => void; // For empty state button
//   canSendMoney: boolean; // For empty state button
//   wasInitiallyEmpty: boolean; // To differentiate empty states
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty, // Pass whether the *original* balanceSpecificTransactions was empty
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay,
//   } = useGroupedTransactions(transactions); // Use the hook with the currently displayed transactions

//   // Transaction Loading State
//   if (isLoading) {
//     return (
//       <div className="space-y-2">
//         {Array(3)
//           .fill(0)
//           .map((_, index) => (
//             <div key={index} className="block">
//               <div className="block p-2 sm:p-4 rounded-2xl">
//                 <div className="flex items-center gap-4">
//                   {/* Icon Skeleton */}
//                   <div className="relative flex-shrink-0">
//                     <div className="flex items-center justify-center">
//                       <Skeleton className="h-12 w-12 rounded-full" />
//                     </div>
//                   </div>
//                   {/* Text and Button Skeletons */}
//                   <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                     <div className="flex-grow">
//                       <Skeleton className="h-4 w-40 mb-2" />
//                       <Skeleton className="h-3 w-32" />
//                     </div>
//                     <div className="shrink-0">
//                       <Skeleton className="h-5 w-20 rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     );
//   }

//   // Transaction Error State
//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//         <strong>Transaction Error:</strong> {error}
//       </div>
//     );
//   }

//   // Transaction List Area
//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//         <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">
//             Needs your attention
//           </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               const amount = transaction.amountToAdd ?? 0;
//               const name = `To your ${currencyCode} balance`;
//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     {/* ... (rest of the JSX for Needs Attention item - copied from original) ... */}
//                     <div className="flex items-center gap-4">
//                       {/* Icon with Badge */}
//                       <div className="relative flex-shrink-0">
//                         <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                           <LuPlus
//                             size={24}
//                             className="text-yellow-700 dark:text-yellow-300"
//                           />
//                         </div>
//                         <MdErrorOutline
//                           size={20}
//                           className="absolute -bottom-1 -right-1 text-orange-500 bg-white rounded-full p-0.5 shadow"
//                         />
//                       </div>
//                       {/* Details */}
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-orange-600 font-semibold mt-1">
//                             Waiting for you to pay
//                           </p>
//                         </div>
//                         {/* Amount added */}
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           +
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//         <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             In progress
//           </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? (
//                 <LuPlus
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               ) : (
//                 <GoArrowUp
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               );
//                // Fixed: Changed let to const as 'description' is not reassigned here
//               const description = isAddMoney
//                 ? "Processing your deposit"
//                 : transaction.status === "pending"
//                 ? "Sending your money"
//                 : "Processing transfer";
//               const amount = isAddMoney
//                 ? transaction.amountToAdd ?? 0
//                 : transaction.sendAmount ?? 0;
//               const txCurrencyCode = isAddMoney
//                 ? transaction.balanceCurrency?.code
//                 : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney
//                 ? `To your ${txCurrencyCode || currencyCode} balance`
//                 : transaction.name || "Recipient";

//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                         {icon}
//                       </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                             {description}
//                             <span className="italic">
//                               ({transaction.status})
//                             </span>
//                           </p>
//                         </div>
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           {amountPrefix}
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {txCurrencyCode || currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions &&
//         groupedProcessedTransactions &&
//         Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map(
//               ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     {date}
//                   </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
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
//                       let description = ""; // Keep 'let' here as it's reassigned in the switch
//                       let amountClass = "";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? transaction.balanceCurrency?.code
//                         : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `Added to ${
//                             displayCurrencyCode || currencyCode
//                           } balance`
//                         : transaction.name || "Recipient";

//                       switch (transaction.status) {
//                         case "completed":
//                           amountClass = isAddMoney
//                             ? "text-green-600 dark:text-green-500"
//                             : "text-neutral-900  dark:text-white";
//                           description = isAddMoney
//                             ? "Added"
//                             : `Sent to ${transaction.name || "Recipient"}`;
//                           break;
//                         case "canceled": // Also handle "canceled" if that's a possible status
//                         case "cancelled":
//                           amountClass = "text-red-600 dark:text-red-400 line-through"; // Adjusted color for dark mode
//                           description = "Cancelled";
//                           break;
//                         case "failed":
//                           amountClass = "text-red-600 dark:text-red-400 line-through";
//                           description = "Failed";
//                           break;
//                         default:
//                           amountClass =
//                             "text-neutral-900  dark:text-white";
//                           description = transaction.status ?? "Unknown";
//                       }

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
//                                 <div className="text-wrap">
//                                   <h3
//                                     className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                                     title={name}
//                                   >
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium ${amountClass} whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}
//                                   {displayCurrencyCode || currencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State for Transactions --- */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//         <div className="text-center text-gray-500 dark:text-gray-300 py-10 bg-white dark:bg-white/5 rounded-lg mt-6 border border-gray-200 dark:border-primarybox">
//           {wasInitiallyEmpty // Check if the *original* list for this balance was empty
//             ? `No transactions found for your ${currencyCode} balance yet.`
//             : "No transactions match your current filter or search criteria."}
//           <p className="mt-2 text-sm">
//             You can
//             <Link
//               href={`/dashboard/balances/${balanceId}/add-money`}
//               className="text-primary hover:underline font-medium"
//             >
//               add money
//             </Link>
//             or
//             {/* Send money button */}
//             <button
//               type="button" // Added type="button"
//               onClick={onSendClick}
//               disabled={!canSendMoney} // Keep disabled logic if needed
//               className={`text-primary hover:underline font-medium ${
//                 !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               send money
//             </button>
//             .
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;



// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[];
//   isLoading: boolean;
//   error: string | null;
//   currencyCode: string;
//   balanceId: string;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   wasInitiallyEmpty: boolean;
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty,
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay,
//   } = useGroupedTransactions(transactions);

//   if (isLoading) {
//     // ... (Skeleton code remains the same)
//     return (
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     {/* Icon Skeleton */}
//                     <div className="relative flex-shrink-0">
//                       <div className="flex items-center justify-center">
//                         <Skeleton className="h-12 w-12 rounded-full" />
//                       </div>
//                     </div>
//                     {/* Text and Button Skeletons */}
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         <Skeleton className="h-4 w-40 mb-2" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                       <div className="shrink-0">
//                         <Skeleton className="h-5 w-20 rounded-full" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       );
//   }

//   if (error) {
//     // ... (Error code remains the same)
//      return (
//         <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//           <strong>Transaction Error:</strong> {error}
//         </div>
//       );
//   }

//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//         // ... (Needs Attention code remains the same)
//          <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">
//             Needs your attention
//           </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               const amount = transaction.amountToAdd ?? 0;
//               const name = `To your ${currencyCode} balance`;
//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     {/* ... (rest of the JSX for Needs Attention item - copied from original) ... */}
//                     <div className="flex items-center gap-4">
//                       {/* Icon with Badge */}
//                       <div className="relative flex-shrink-0">
//                         <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                           <LuPlus
//                             size={24}
//                             className="text-yellow-700 dark:text-yellow-300"
//                           />
//                         </div>
//                         <MdErrorOutline
//                           size={20}
//                           className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-neutral-900 dark:text-orange-400 rounded-full p-0.5 shadow"
//                         />
//                       </div>
//                       {/* Details */}
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-1">
//                             Waiting for you to pay
//                           </p>
//                         </div>
//                         {/* Amount added */}
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           +
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//         // ... (In Progress code remains the same)
//          <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             In progress
//           </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? (
//                 <LuPlus
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               ) : (
//                 <GoArrowUp
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               );
//               const description = isAddMoney
//                 ? "Processing your deposit"
//                 : transaction.status === "pending"
//                 ? "Sending your money"
//                 : "Processing transfer";
//               const amount = isAddMoney
//                 ? transaction.amountToAdd ?? 0
//                 : transaction.sendAmount ?? 0;
//               const txCurrencyCode = isAddMoney
//                 ? transaction.balanceCurrency?.code
//                 : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney
//                 ? `To your ${txCurrencyCode || currencyCode} balance`
//                 : transaction.name || "Recipient";

//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                         {icon}
//                       </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                             {description}
//                             <span className="italic">
//                               ({transaction.status})
//                             </span>
//                           </p>
//                         </div>
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           {amountPrefix}
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {txCurrencyCode || currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions &&
//         groupedProcessedTransactions &&
//         Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map(
//               ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     {date}
//                   </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
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
//                       let description = "";
//                       let amountClass = "";
//                       const amount = isAddMoney
//                         ? transaction.amountToAdd ?? 0
//                         : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney
//                         ? transaction.balanceCurrency?.code
//                         : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `Added to ${
//                             displayCurrencyCode || currencyCode
//                           } balance`
//                         : transaction.name || "Recipient";

//                       switch (transaction.status) {
//                         case "completed":
//                           amountClass = isAddMoney
//                             ? "text-green-600 dark:text-green-500"
//                             : "text-neutral-900  dark:text-white";
//                           description = isAddMoney
//                             ? "Added"
//                             : `Sent to ${transaction.name || "Recipient"}`;
//                           break;
//                         case "canceled": // Use the correct spelling from the type
//                           amountClass = "text-red-600 dark:text-red-400 line-through";
//                           description = "Canceled"; // Match description spelling if desired
//                           break;
//                         // REMOVED -> case "cancelled": // This was incorrect and redundant
//                         case "failed":
//                           amountClass = "text-red-600 dark:text-red-400 line-through";
//                           description = "Failed";
//                           break;
//                         default:
//                           amountClass =
//                             "text-neutral-900  dark:text-white";
//                           description = transaction.status ?? "Unknown";
//                       }

//                       return (
//                         // ... (Link and item structure remain the same)
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
//                                 <div className="text-wrap">
//                                   <h3
//                                     className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                                     title={name}
//                                   >
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium ${amountClass} whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}
//                                   {displayCurrencyCode || currencyCode}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State for Transactions --- */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//          // ... (Empty state code remains the same)
//         <div className="text-center text-gray-500 dark:text-gray-300 py-10 bg-white dark:bg-white/5 rounded-lg mt-6 border border-gray-200 dark:border-primarybox">
//           {wasInitiallyEmpty
//             ? `No transactions found for your ${currencyCode} balance yet.`
//             : "No transactions match your current filter or search criteria."}
//           <p className="mt-2 text-sm">
//             You can
//             <Link
//               href={`/dashboard/balances/${balanceId}/add-money`}
//               className="text-primary hover:underline font-medium"
//             >
//               add money
//             </Link>
//             or
//             <button
//               type="button"
//               onClick={onSendClick}
//               disabled={!canSendMoney}
//               className={`text-primary hover:underline font-medium ${
//                 !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               send money
//             </button>
//             .
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;


// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[];
//   isLoading: boolean;
//   error: string | null;
//   currencyCode: string; // The primary currency code of the balance being viewed
//   balanceId: string;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   wasInitiallyEmpty: boolean;
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty,
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay,
//   } = useGroupedTransactions(transactions);

//   if (isLoading) {
//     return (
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     {/* Icon Skeleton */}
//                     <div className="relative flex-shrink-0">
//                       <div className="flex items-center justify-center">
//                         <Skeleton className="h-12 w-12 rounded-full" />
//                       </div>
//                     </div>
//                     {/* Text and Button Skeletons */}
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow">
//                         <Skeleton className="h-4 w-40 mb-2" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                       <div className="shrink-0">
//                         <Skeleton className="h-5 w-20 rounded-full" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       );
//   }

//   if (error) {
//      return (
//         <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//           <strong>Transaction Error:</strong> {error}
//         </div>
//       );
//   }

//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">
//             Needs your attention
//           </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               // **FIX APPLIED HERE**: Use amountToPay for pending Add Money
//               const amount = transaction.amountToPay ?? 0;
//               // Determine the currency to display - prefer the 'payIn' currency if available
//               const displayCurrency = transaction.payInCurrency?.code ?? currencyCode;
//               const name = `To your ${transaction.balanceCurrency?.code || currencyCode} balance`; // Show the target balance currency

//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       {/* Icon with Badge */}
//                       <div className="relative flex-shrink-0">
//                         <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
//                           <LuPlus
//                             size={24}
//                             className="text-yellow-700 dark:text-yellow-300"
//                           />
//                         </div>
//                         <MdErrorOutline
//                           size={20}
//                           className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-neutral-900 dark:text-orange-400 rounded-full p-0.5 shadow"
//                         />
//                       </div>
//                       {/* Details */}
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-1">
//                             Waiting for you to pay
//                           </p>
//                         </div>
//                         {/* Amount to pay */}
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           + {/* Still represents an eventual addition */}
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {displayCurrency} {/* Show the currency to be paid */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//             In progress
//           </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? (
//                 <LuPlus
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               ) : (
//                 <GoArrowUp
//                   size={22}
//                   className="text-neutral-900 dark:text-white"
//                 />
//               );
//               const description = isAddMoney
//                 ? "Processing your deposit"
//                 : transaction.status === "pending"
//                 ? "Sending your money"
//                 : "Processing transfer"; // Include 'processing' for Send Money here too
//               // For 'Add Money' in progress, amountToAdd should now have the value
//               // For 'Send Money' pending/processing, use sendAmount
//               const amount = isAddMoney
//                 ? transaction.amountToPay ?? 0 // If it's 'in progress', amountToAdd should be populated
//                 : transaction.sendAmount ?? 0;
//               const txCurrencyCode = isAddMoney
//                 ? transaction.balanceCurrency?.code
//                 : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney
//                 ? `To your ${txCurrencyCode || currencyCode} balance`
//                 : transaction.name || "Recipient";

//               return (
//                 <Link
//                   href={`/dashboard/transactions/${transaction._id}`}
//                   key={transaction._id}
//                   className="block"
//                 >
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
//                         {icon}
//                       </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap">
//                           <h3
//                             className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                             title={name}
//                           >
//                             {name}
//                           </h3>
//                           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                             {description}
//                             <span className="italic">
//                               ({transaction.status})
//                             </span>
//                           </p>
//                         </div>
//                         <div
//                           className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}
//                         >
//                           {amountPrefix}
//                           {amount.toLocaleString(undefined, {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                           {txCurrencyCode || currencyCode}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions &&
//         groupedProcessedTransactions &&
//         Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map(
//               ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                     {date === 'Unknown Date' || date === 'Date Error' ? 'Older Transactions' : date} {/* Handle fallback keys */}
//                   </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
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
//                       let description = "";
//                       let amountClass = "";
//                       // For processed transactions, use amountToAdd or sendAmount respectively
//                       const amount = isAddMoney
//                         ? transaction.amountToPay ?? 0
//                         : transaction.sendAmount ?? 0;
//                       // Use the currency related to the amount being displayed
//                       const displayCurrencyCode = isAddMoney
//                         ? transaction.balanceCurrency?.code
//                         : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney
//                         ? `Added to ${
//                             displayCurrencyCode || currencyCode
//                           } balance`
//                         : transaction.name || "Recipient"; // Use Recipient name if available for sends

//                       switch (transaction.status) {
//                         case "completed":
//                           amountClass = isAddMoney
//                             ? "text-green-600 dark:text-green-500"
//                             : "text-neutral-900 dark:text-white"; // Completed sends are neutral, not green
//                           description = isAddMoney
//                             ? "Added"
//                             : `Sent to ${transaction.recipient ? (transaction.recipient as any).accountHolderName || transaction.name || 'Recipient' : transaction.name || 'Recipient'}`; // Try to get recipient name
//                           break;
//                         case "canceled": // Use the correct spelling from the type
//                           amountClass = "text-red-600 line-through";
//                           description = "Canceled";
//                           break;
//                         case "failed":
//                           amountClass = "text-red-600 line-through";
//                           description = "Failed";
//                           break;
//                         default: // Should ideally not happen for 'processed' but handle just in case
//                           amountClass = "text-neutral-900 dark:text-white";
//                           description = transaction.status ?? "Unknown";
//                       }

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
//                                 <div className="text-wrap">
//                                   <h3
//                                     className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg"
//                                     title={name}
//                                   >
//                                     {name}
//                                   </h3>
//                                   <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                                     {description}
//                                   </p>
//                                 </div>
//                                 <div
//                                   className={`font-medium ${amountClass} whitespace-nowrap`}
//                                 >
//                                   {amountPrefix}
//                                   {amount.toLocaleString(undefined, {
//                                     minimumFractionDigits: 2,
//                                     maximumFractionDigits: 2,
//                                   })}
//                                   {displayCurrencyCode || currencyCode} {/* Show relevant currency */}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State for Transactions --- */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//         <div className="text-center text-gray-700 dark:text-gray-300 capitalize py-5 bg-lightgray dark:bg-white/5 rounded-lg mt-6">
//           {wasInitiallyEmpty
//             ? `No transactions found for your ${currencyCode} balance yet.`
//             : "No transactions match your current filter or search criteria."}
//           <p className="mt-1 text-sm">
//             You can{" "}
//             <Link
//               href={`/dashboard/balances/${balanceId}/add-money`}
//               className="text-primary hover:underline font-medium"
//             >
//               add money
//             </Link>{" "}
//             or{" "}
//             <button
//               type="button"
//               onClick={onSendClick}
//               disabled={!canSendMoney}
//               className={`text-primary hover:underline font-medium ${
//                 !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Send money
//             </button>
//             .
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;


// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[];
//   isLoading: boolean;
//   error: string | null;
//   currencyCode: string; // The primary currency code of the balance being viewed
//   balanceId: string;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   wasInitiallyEmpty: boolean; // Required prop
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions,
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty, // Now received as a prop
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay, // Use this to check if *any* section will render
//   } = useGroupedTransactions(transactions); // Group the currently passed (potentially filtered) list

//   // Loading Skeleton
//   if (isLoading) {
//     return (
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     <div className="relative flex-shrink-0"> <div className="flex items-center justify-center"> <Skeleton className="h-12 w-12 rounded-full" /> </div> </div>
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow"> <Skeleton className="h-4 w-40 mb-2" /> <Skeleton className="h-3 w-32" /> </div>
//                       <div className="shrink-0"> <Skeleton className="h-5 w-20 rounded-full" /> </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       );
//   }

//   // Specific Transaction Fetch Error
//   if (error) {
//      return (
//         <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//           <strong>Transaction Error:</strong> {error}
//         </div>
//       );
//   }

//   // --- Render Transaction Sections ---
//   // Note: The empty state is handled *after* attempting to render sections
//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider"> Needs your attention </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               const amount = transaction.amountToPay ?? 0; // Use amountToPay
//               const displayCurrency = transaction.payInCurrency?.code ?? currencyCode;
//               const name = `To your ${transaction.balanceCurrency?.code || currencyCode} balance`;
//               return (
//                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       <div className="relative flex-shrink-0"> <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center"> <LuPlus size={24} className="text-yellow-700 dark:text-yellow-300" /> </div> <MdErrorOutline size={20} className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-neutral-900 dark:text-orange-400 rounded-full p-0.5 shadow" /> </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg" title={name}> {name} </h3> <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-1"> Waiting for you to pay </p> </div>
//                         <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}> + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {displayCurrency} </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"> In progress </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//               const description = isAddMoney ? "Processing your deposit" : transaction.status === "pending" ? "Sending your money" : "Processing transfer";
//               const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0; // Corrected: use amountToAdd for AddMoney in progress
//               const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney ? `To your ${txCurrencyCode || currencyCode} balance` : transaction.name || "Recipient";
//               return (
//                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg" title={name}> {name} </h3> <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} <span className="italic"> ({transaction.status}) </span> </p> </div>
//                         <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {txCurrencyCode || currencyCode} </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map( ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"> {date === 'Unknown Date' || date === 'Date Error' ? 'Older Transactions' : date} </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       let description = ""; let amountClass = "";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0; // Use amountToAdd/sendAmount for processed
//                       const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `Added to ${displayCurrencyCode || currencyCode} balance` : transaction.name || "Recipient";
//                       switch (transaction.status) {
//                         case "completed": amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white"; description = isAddMoney ? "Added" : `Sent to ${transaction.recipient ? (transaction.recipient as any).accountHolderName || transaction.name || 'Recipient' : transaction.name || 'Recipient'}`; break;
//                         case "canceled": amountClass = "text-red-600 line-through"; description = "Canceled"; break;
//                         case "failed": amountClass = "text-red-600 line-through"; description = "Failed"; break;
//                         default: amountClass = "text-neutral-900 dark:text-white"; description = transaction.status ?? "Unknown";
//                       }
//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center gap-4">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg" title={name}> {name} </h3> <p className="text-sm text-gray-500 dark:text-gray-300 mt-1"> {description} </p> </div>
//                                 <div className={`font-medium ${amountClass} whitespace-nowrap`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {displayCurrencyCode || currencyCode} </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State Display --- */}
//       {/* Show this only if NO sections above had any transactions to display */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && (
//         <div className="text-center text-gray-700 dark:text-gray-300 capitalize py-8 bg-lightgray dark:bg-white/5 rounded-lg mt-6 px-4">
//           {/* Message changes based on whether the *initial* fetch was empty */}
//           {wasInitiallyEmpty
//             ? `No transactions found for your ${currencyCode} balance yet.`
//             : "No transactions match your current filter or search criteria."}

//            {/* Suggest actions, only show if relevant */}
//            {wasInitiallyEmpty && ( // Only show add/send links if truly no history
//              <p className="mt-2 text-sm normal-case">
//                 You can{" "}
//                 <Link
//                   href={`/dashboard/balances/${balanceId}/add-money`}
//                   className="text-primary hover:underline font-medium"
//                 >
//                   add money
//                 </Link>{" "}
//                 {/* Keep Send button disabled state logic */}
//                 or{" "}
//                 <button
//                   type="button"
//                   onClick={onSendClick}
//                   disabled={!canSendMoney}
//                   className={`text-primary hover:underline font-medium ${
//                     !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   Send money
//                 </button>
//                 .
//              </p>
//            )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;



// // src/app/dashboard/components/TransactionList.tsx
// import React from "react";
// import Link from "next/link";
// import { Transaction } from "@/types/transaction"; // Adjust path
// import {
//   useGroupedTransactions,
// } from "@/app/hooks/useGroupedTransactions"; // Adjust path
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { MdErrorOutline } from "react-icons/md";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

// interface TransactionListProps {
//   transactions: Transaction[]; // Receives the potentially filtered list
//   isLoading: boolean;
//   error: string | null;
//   currencyCode: string; // The primary currency code of the balance being viewed
//   balanceId: string;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   wasInitiallyEmpty: boolean; // Prop indicating if the *original* list was empty
// }

// const TransactionList: React.FC<TransactionListProps> = ({
//   transactions, // This is now the filtered list (displayTransactions)
//   isLoading,
//   error,
//   currencyCode,
//   balanceId,
//   onSendClick,
//   canSendMoney,
//   wasInitiallyEmpty, // Use this to determine the correct empty message
// }) => {
//   const {
//     pendingAttentionTransactions,
//     inProgressTransactions,
//     groupedProcessedTransactions,
//     hasProcessedTransactions,
//     hasAnyTransactionsToDisplay, // Check if *any* section will render based on the *filtered* list
//   } = useGroupedTransactions(transactions); // Group the currently passed (potentially filtered) list

//   // Loading Skeleton
//   if (isLoading) {
//     // --- Skeleton remains the same ---
//      return (
//         <div className="space-y-2">
//           {Array(3)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="block">
//                 <div className="block p-2 sm:p-4 rounded-2xl">
//                   <div className="flex items-center gap-4">
//                     <div className="relative flex-shrink-0"> <div className="flex items-center justify-center"> <Skeleton className="h-12 w-12 rounded-full" /> </div> </div>
//                     <div className="flex-grow flex flex-row justify-between items-center gap-4">
//                       <div className="flex-grow"> <Skeleton className="h-4 w-40 mb-2" /> <Skeleton className="h-3 w-32" /> </div>
//                       <div className="shrink-0"> <Skeleton className="h-5 w-20 rounded-full" /> </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       );
//   }

//   // Specific Transaction Fetch Error (Passed from Parent)
//   if (error) {
//      // --- Error remains the same ---
//      return (
//         <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
//           <strong>Transaction Error:</strong> {error}
//         </div>
//       );
//   }

//   // --- Render Transaction Sections ---
//   // No changes needed in the rendering of actual transaction items
//   return (
//     <div className="space-y-4">
//       {/* --- Needs Your Attention Section --- */}
//       {pendingAttentionTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider"> Needs your attention </h2>
//           <div className="space-y-2">
//             {pendingAttentionTransactions.map((transaction) => {
//               const amount = transaction.amountToPay ?? 0;
//               const displayCurrency = transaction.payInCurrency?.code ?? currencyCode;
//               const name = `To your ${transaction.balanceCurrency?.code || currencyCode} balance`;
//               return (
//                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center sm:gap-4 gap-2">
//                       <div className="relative flex-shrink-0"> <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center"> <LuPlus size={22} className="text-yellow-700 dark:text-yellow-300" /> </div> <MdErrorOutline size={20} className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-neutral-900 dark:text-orange-400 rounded-full p-0.5 shadow" /> </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px" title={name}> {name} </h3> <p className="sm:text-sm text-13px text-orange-600 dark:text-orange-400 font-semibold mt-1"> Waiting for you to pay </p> </div>
//                         <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap sm:text-base text-15px`}> + {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {displayCurrency} </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- In Progress Transactions Section --- */}
//       {inProgressTransactions.length > 0 && (
//          <div>
//           <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"> In progress </h2>
//           <div className="space-y-2">
//             {inProgressTransactions.map((transaction) => {
//               const isAddMoney = transaction.type === "Add Money";
//               const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//               const description = isAddMoney ? "Waiting for your money" : transaction.status === "pending" ? "Sending by you" : "Sending by you";
//               const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//               const txCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//               const amountPrefix = isAddMoney ? "+ " : "- ";
//               const name = isAddMoney ? `To your ${txCurrencyCode || currencyCode} balance` : transaction.name || "Recipient";
//               return (
//                 <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                   <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                     <div className="flex items-center sm:gap-4 gap-2">
//                       <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                       <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                         <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px" title={name}> {name} </h3> <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1"> {description}</p> </div>
//                         <div className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap sm:text-base text-15px`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {txCurrencyCode || currencyCode} </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* --- Processed Transactions (Grouped by Date) Section --- */}
//       {hasProcessedTransactions && groupedProcessedTransactions && Object.keys(groupedProcessedTransactions).length > 0 && (
//           <div className="space-y-4">
//             {Object.entries(groupedProcessedTransactions).map( ([date, transactionsForDate]) => (
//                 <div key={date}>
//                   <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"> {date === 'Unknown Date' || date === 'Date Error' ? 'Older Transactions' : date} </h3>
//                   <div className="space-y-2">
//                     {transactionsForDate.map((transaction) => {
//                       const isAddMoney = transaction.type === "Add Money";
//                       const icon = isAddMoney ? <LuPlus size={22} className="text-neutral-900 dark:text-white" /> : <GoArrowUp size={22} className="text-neutral-900 dark:text-white" />;
//                       let description = ""; let amountClass = "";
//                       const amount = isAddMoney ? transaction.amountToAdd ?? 0 : transaction.sendAmount ?? 0;
//                       const displayCurrencyCode = isAddMoney ? transaction.balanceCurrency?.code : transaction.sendCurrency?.code;
//                       const amountPrefix = isAddMoney ? "+ " : "- ";
//                       const name = isAddMoney ? `Added to ${displayCurrencyCode || currencyCode} balance` : transaction.name || "Recipient";
//                       switch (transaction.status) {
//                         case "completed": amountClass = isAddMoney ? "text-green-600 dark:text-green-500" : "text-neutral-900 dark:text-white"; description = isAddMoney ? "Added" : `Sent by you `; break;
//                         case "canceled": amountClass = "text-red-600 line-through"; description = "Canceled"; break;
//                         case "failed": amountClass = "text-red-600 line-through"; description = "Failed"; break;
//                         default: amountClass = "text-neutral-900 dark:text-white"; description = transaction.status ?? "Unknown";
//                       }
//                       return (
//                         <Link href={`/dashboard/transactions/${transaction._id}`} key={transaction._id} className="block">
//                           <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
//                             <div className="flex items-center sm:gap-4 gap-2">
//                               <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center"> {icon} </div>
//                               <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                                 <div className="text-wrap"> <h3 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px" title={name}> {name} </h3> <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1"> {description} </p> </div>
//                                 <div className={`font-medium ${amountClass} whitespace-nowrap sm:text-base text-15px`}> {amountPrefix} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })} {displayCurrencyCode || currencyCode} </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}

//       {/* --- Empty State Display (Only for *Initial* Empty) --- */}
//       {/* Show this only if NO sections above had any transactions AND the balance was *initially* empty */}
//       {!isLoading && !error && !hasAnyTransactionsToDisplay && wasInitiallyEmpty && (
//         <div className="text-center text-gray-700 dark:text-gray-300 capitalize py-8 bg-lightgray dark:bg-white/5 rounded-lg mt-6 px-4">
//            {/* Message specifically for when there were never any transactions */}
//            No transactions found for your {currencyCode} balance yet.

//            {/* Suggest actions */}
//            <p className="mt-2 text-sm normal-case">
//               You can{" "}
//               <Link
//                 href={`/dashboard/balances/${balanceId}/add-money`}
//                 className="text-primary hover:underline font-medium"
//               >
//                 add money
//               </Link>{" "}
//               or{" "}
//               <button
//                 type="button"
//                 onClick={onSendClick}
//                 disabled={!canSendMoney}
//                 className={`text-primary hover:underline font-medium ${
//                   !canSendMoney ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 Send money
//               </button>
//               .
//            </p>
//         </div>
//       )}
//        {/* NOTE: The "No transactions match filter" message is now handled exclusively by the parent component */}
//     </div>
//   );
// };

// export default TransactionList;




import React from "react";
import { Transaction } from "@/types/transaction";
import {
  useGroupedTransactions,
} from "@/app/hooks/useGroupedTransactions";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ClipboardXIcon } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  currencyCode: string;
  balanceId: string;
  onSendClick: () => void;
  onAddMoneyClick: () => void;
  canSendMoney: boolean;
  wasInitiallyEmpty: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  error,
  currencyCode,
  balanceId,
  onSendClick,
  onAddMoneyClick,
  canSendMoney,
  wasInitiallyEmpty,
}) => {
  const {
    pendingAttentionTransactions,
    inProgressTransactions,
    groupedProcessedTransactions,
    hasProcessedTransactions,
    hasAnyTransactionsToDisplay,
  } = useGroupedTransactions(transactions);

  if (isLoading) {
     return (
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="block">
                <div className="block p-2 sm:p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0"> <div className="flex items-center justify-center"> <Skeleton className="h-12 w-12 rounded-full" /> </div> </div>
                    <div className="flex-grow flex flex-row justify-between items-center gap-4">
                      <div className="flex-grow"> <Skeleton className="h-4 w-40 mb-2" /> <Skeleton className="h-3 w-32" /> </div>
                      <div className="shrink-0"> <Skeleton className="h-5 w-20 rounded-full" /> </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
  }

  if (error) {
     return (
        <div className="text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">
          <strong>Transaction Error:</strong> {error}
        </div>
      );
  }

  return (
    <div className="space-y-4">
      {pendingAttentionTransactions.length > 0 && (
        <div>
          <h2 className="font-medium text-orange-600 dark:text-orange-400 mb-3 text-sm uppercase tracking-wider">
            {" "}
            Needs your attention{" "}
          </h2>
          <div className="space-y-2">
            {pendingAttentionTransactions.map((transaction) => {
              const amount = transaction.amountToPay ?? 0;
              const displayCurrency =
                transaction.payInCurrency?.code ?? currencyCode;
              const name = `To your ${
                transaction.balanceCurrency?.code || currencyCode
              } balance`;
              return (
                <Link
                  href={`/dashboard/transactions/${transaction._id}`}
                  key={transaction._id}
                  className="block"
                >
                  <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                    <div className="flex items-center sm:gap-4 gap-2">
                      <div className="relative flex-shrink-0">
                        {" "}
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-800/60 rounded-full flex items-center justify-center">
                          {" "}
                          <LuPlus
                            size={22}
                            className="text-yellow-700 dark:text-yellow-300"
                          />{" "}
                        </div>{" "}
                        <MdErrorOutline
                          size={20}
                          className="absolute -bottom-1 -right-1 text-orange-500 bg-white dark:bg-neutral-900 dark:text-orange-400 rounded-full p-0.5 shadow"
                        />{" "}
                      </div>
                      <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                        <div className="text-wrap">
                          {" "}
                          <h3
                            className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px"
                            title={name}
                          >
                            {" "}
                            {name}{" "}
                          </h3>{" "}
                          <p className="sm:text-sm text-13px text-orange-600 dark:text-orange-400 font-semibold mt-1">
                            {" "}
                            Waiting for you to pay{" "}
                          </p>{" "}
                        </div>
                        <div
                          className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap sm:text-base text-15px`}
                        >
                          {" "}
                          +{" "}
                          {amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          {displayCurrency}{" "}
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

      {inProgressTransactions.length > 0 && (
        <div>
          <h2 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
            {" "}
            In progress{" "}
          </h2>
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
                ? "Waiting for your money"
                : transaction.status === "pending"
                ? "Sending by you"
                : "Sending by you";
              const amount = isAddMoney
                ? transaction.amountToAdd ?? 0
                : transaction.sendAmount ?? 0;
              const txCurrencyCode = isAddMoney
                ? transaction.balanceCurrency?.code
                : transaction.sendCurrency?.code;
              const amountPrefix = isAddMoney ? "+ " : "- ";
              const name = isAddMoney
                ? `To your ${txCurrencyCode || currencyCode} balance`
                : transaction.name || "Recipient";
              return (
                <Link
                  href={`/dashboard/transactions/${transaction._id}`}
                  key={transaction._id}
                  className="block"
                >
                  <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                    <div className="flex items-center sm:gap-4 gap-2">
                      <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
                        {" "}
                        {icon}{" "}
                      </div>
                      <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                        <div className="text-wrap">
                          {" "}
                          <h3
                            className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px"
                            title={name}
                          >
                            {" "}
                            {name}{" "}
                          </h3>{" "}
                          <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1">
                            {" "}
                            {description}
                          </p>{" "}
                        </div>
                        <div
                          className={`font-medium text-neutral-900 dark:text-white whitespace-nowrap sm:text-base text-15px`}
                        >
                          {" "}
                          {amountPrefix}{" "}
                          {amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          {txCurrencyCode || currencyCode}{" "}
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

      {hasProcessedTransactions &&
        groupedProcessedTransactions &&
        Object.keys(groupedProcessedTransactions).length > 0 && (
          <div className="space-y-4">
            {Object.entries(groupedProcessedTransactions).map(
              ([date, transactionsForDate]) => (
                <div key={date}>
                  <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
                    {" "}
                    {date === "Unknown Date" || date === "Date Error"
                      ? "Older Transactions"
                      : date}{" "}
                  </h3>
                  <div className="space-y-2">
                    {transactionsForDate.map((transaction) => {
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
                      let description = "";
                      let amountClass = "";
                      const amount = isAddMoney
                        ? transaction.amountToAdd ?? 0
                        : transaction.sendAmount ?? 0;
                      const displayCurrencyCode = isAddMoney
                        ? transaction.balanceCurrency?.code
                        : transaction.sendCurrency?.code;
                      const amountPrefix = isAddMoney ? "+ " : "- ";
                      const name = isAddMoney
                        ? `Added to ${
                            displayCurrencyCode || currencyCode
                          } balance`
                        : transaction.name || "Recipient";
                      switch (transaction.status) {
                        case "completed":
                          amountClass = isAddMoney
                            ? "text-green-600 dark:text-green-500"
                            : "text-neutral-900 dark:text-white";
                          description = isAddMoney ? "Added" : `Sent by you `;
                          break;
                        case "canceled":
                          amountClass = "text-red-600 line-through";
                          description = "Canceled";
                          break;
                        case "failed":
                          amountClass = "text-red-600 line-through";
                          description = "Failed";
                          break;
                        default:
                          amountClass = "text-neutral-900 dark:text-white";
                          description = transaction.status ?? "Unknown";
                      }
                      return (
                        <Link
                          href={`/dashboard/transactions/${transaction._id}`}
                          key={transaction._id}
                          className="block"
                        >
                          <div className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer">
                            <div className="flex items-center sm:gap-4 gap-2">
                              <div className="p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center">
                                {" "}
                                {icon}{" "}
                              </div>
                              <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">
                                <div className="text-wrap">
                                  {" "}
                                  <h3
                                    className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg text-15px"
                                    title={name}
                                  >
                                    {" "}
                                    {name}{" "}
                                  </h3>{" "}
                                  <p className="sm:text-sm text-13px text-gray-500 dark:text-gray-300 mt-1">
                                    {" "}
                                    {description}{" "}
                                  </p>{" "}
                                </div>
                                <div
                                  className={`font-medium ${amountClass} whitespace-nowrap sm:text-base text-15px`}
                                >
                                  {" "}
                                  {amountPrefix}{" "}
                                  {amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  {displayCurrencyCode || currencyCode}{" "}
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

      {!isLoading &&
        !error &&
        !hasAnyTransactionsToDisplay &&
        wasInitiallyEmpty && (
          <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
              <ClipboardXIcon className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
            </div>
            <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
              {" "}
              No transactions found for your {currencyCode} balance yet.
            </h2>
            <p className="mt-2 lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
              You can{" "}
              <button
                type="button"
                onClick={onAddMoneyClick}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                add money
              </button>{" "}
              or{" "}
              <button
                type="button"
                onClick={onSendClick}
                // REMOVED: disabled={!canSendMoney}
                // The button will now always be clickable.
                // The `handleSendClick` logic in the parent will determine KYC/Insufficient Funds modals.
                // Visual styling for insufficient funds is still applied via className.
                className={`text-primary hover:underline font-medium cursor-pointer ${
                  !canSendMoney ? "opacity-50" : ""
                }`}
              >
                Send money
              </button>
              .
            </p>
          </div>
        )}
    </div>
  );
};

export default TransactionList;