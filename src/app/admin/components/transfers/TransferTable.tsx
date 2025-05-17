// // frontend/src/app/admin/components/transfers/TransferTable.tsx
// "use client";
// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import TransferTableHeader from "./TransferTableHeader"; // Correct import statement

// interface TransferTableProps {
//   filteredTransfers: any[]; // Replace 'any' with a more specific type if possible
//   loadingTransfers: boolean;
//   getStatusColor: (status: string) => string;
//   toggleSort: (field: string) => void;
//   sortField: string | null;
//   sortDirection: "asc" | "desc";
// }

// const TransferTable: React.FC<TransferTableProps> = ({
//   filteredTransfers,
//   loadingTransfers,
//   getStatusColor,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   // Function to format date - ADDED FUNCTION HERE
//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   if (loadingTransfers) {
//     return (
//       <div className="rounded-xl border overflow-hidden">
//         <table className="min-w-full">
//           <TransferTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(10)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={i}>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-24" />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Skeleton className="h-4 w-32" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-24" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-16" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-16" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-7 w-28" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
//                     <Skeleton className="h-8 w-24" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
//                     <Skeleton className="h-8 w-24" />
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <TransferTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {filteredTransfers.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="8"
//                   className="px-6 py-10 text-center text-gray-500"
//                 >
//                   No transfers found matching your filters.
//                 </td>
//               </tr>
//             ) : (
//               filteredTransfers.map((transfer, index) => (
//                 <motion.tr
//                   key={transfer._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       {transfer._id.substring(0, 10)}...
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex flex-col">
//                       <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                         {transfer.user?.fullName || "N/A"}
//                       </span>
//                       <span className="text-sm text-gray-500 dark:text-gray-300">
//                         {transfer.user?.email || "N/A"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                       {transfer.recipient?.accountHolderName || "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {transfer.sendAmount}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                     {transfer.sendCurrency?.code || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
//                         transfer.status
//                       )}`}
//                     >
//                       {transfer.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(transfer.createdAt)}{" "}
//                     {/* CALL FORMATDATE HERE */}
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium text-end">
//                     <Link
//                       href={`/admin/transfer/${transfer._id}`}
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 text-secondary transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                     >
//                       <span>View Details</span>
//                     </Link>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransferTable;

// // frontend/src/app/admin/components/transfers/TransferTable.tsx
// "use client";
// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import TransferTableHeader from "./TransferTableHeader"; // Correct import statement

// // Define a more specific type for a Transfer object
// interface Transfer {
//   _id: string;
//   user?: { // User might not always be populated, or might be null
//     fullName?: string; // User details might be optional
//     email?: string;
//   };
//   recipient?: { // Recipient might not always be populated, or might be null
//     accountHolderName?: string; // Recipient details might be optional
//   };
//   sendAmount: number; // Assuming amount is a number
//   sendCurrency?: { // Currency might not always be populated, or might be null
//     code?: string; // Currency code might be optional
//   };
//   status: string;
//   createdAt: string; // Assuming createdAt is a string (like ISO date string)
//   // Add any other relevant fields from your transfer data model here
// }

// interface TransferTableProps {
//   // Use the specific Transfer type here instead of 'any'
//   filteredTransfers: Transfer[];
//   loadingTransfers: boolean;
//   getStatusColor: (status: string) => string;
//   toggleSort: (field: keyof Transfer | 'user.fullName' | 'recipient.accountHolderName') => void; // Make sort field more specific if possible
//   sortField: keyof Transfer | 'user.fullName' | 'recipient.accountHolderName' | null; // Make sort field more specific if possible
//   sortDirection: "asc" | "desc";
// }

// const TransferTable: React.FC<TransferTableProps> = ({
//   filteredTransfers,
//   loadingTransfers,
//   getStatusColor,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   // Function to format date - ADDED FUNCTION HERE
//   const formatDate = (dateString: string) => {
//     // Add a check for invalid date string
//     if (!dateString || isNaN(new Date(dateString).getTime())) {
//         return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   if (loadingTransfers) {
//     return (
//       <div className="rounded-xl border overflow-hidden">
//         <table className="min-w-full">
//           <TransferTableHeader
//             toggleSort={toggleSort as (field: string) => void} // Cast back for header component if it expects string
//             sortField={sortField as string | null} // Cast back for header component if it expects string
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(10)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={i}>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-24" />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Skeleton className="h-4 w-32" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-24" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-16" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-4 w-16" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Skeleton className="h-7 w-28" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
//                     <Skeleton className="h-8 w-24" />
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
//                     <Skeleton className="h-8 w-24" />
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <TransferTableHeader
//              toggleSort={toggleSort as (field: string) => void} // Cast back for header component if it expects string
//              sortField={sortField as string | null} // Cast back for header component if it expects string
//              sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {filteredTransfers.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="8"
//                   className="px-6 py-10 text-center text-gray-500"
//                 >
//                   No transfers found matching your filters.
//                 </td>
//               </tr>
//             ) : (
//               filteredTransfers.map((transfer, index) => (
//                 <motion.tr
//                   key={transfer._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       {/* Add check for _id existence if it can be missing */}
//                       {transfer._id ? `${transfer._id.substring(0, 10)}...` : "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex flex-col">
//                       <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                         {transfer.user?.fullName || "N/A"}
//                       </span>
//                       <span className="text-sm text-gray-500 dark:text-gray-300">
//                         {transfer.user?.email || "N/A"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                       {transfer.recipient?.accountHolderName || "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {/* Consider formatting the amount */}
//                     {transfer.sendAmount != null ? transfer.sendAmount : "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                     {transfer.sendCurrency?.code || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
//                         transfer.status || 'unknown' // Provide default if status can be missing
//                       )}`}
//                     >
//                       {transfer.status || 'Unknown'} {/* Provide default */}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(transfer.createdAt)}{" "}
//                     {/* CALL FORMATDATE HERE */}
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium text-end">
//                     <Link
//                       href={`/admin/transfer/${transfer._id}`}
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 text-secondary transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                     >
//                       <span>View Details</span>
//                     </Link>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransferTable;

// // frontend/src/app/admin/components/transfers/TransferTable.tsx
// "use client";
// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import TransferTableHeader from "./TransferTableHeader";

// // --- Define Transfer type used WITHIN this component ---
// // --- FIX: Changed sendAmount to string to match parent component's type ---
// interface Transfer {
//   _id: string;
//   user?: {
//     fullName?: string;
//     email?: string;
//   };
//   recipient?: {
//     accountHolderName?: string;
//   };
//   sendAmount: string; // <<< CHANGED FROM number TO string
//   sendCurrency?: {
//     code?: string;
//   };
//   status: string;
//   createdAt: string;
// }

// // --- Define the type for the sortable fields accepted by this component ---
// // Corresponds to the values passed by the parent and handled by the header
// type TransferTableSortField = keyof Omit<Transfer, 'user' | 'recipient' | 'sendCurrency'> | 'user' | 'recipient' | 'createdAt' | 'amount' | '_id';

// interface TransferTableProps {
//   filteredTransfers: Transfer[]; // Expects the Transfer type defined above
//   loadingTransfers: boolean;
//   getStatusColor: (status: string) => string;
//   // --- FIX: Update prop type to match the parent's state type ---
//   toggleSort: (field: TransferTableSortField) => void; // Adjusted to match parent's toggleSort signature
//   sortField: TransferTableSortField | null; // Adjusted to match parent's sortField state type
//   sortDirection: "asc" | "desc";
// }

// const TransferTable: React.FC<TransferTableProps> = ({
//   filteredTransfers,
//   loadingTransfers,
//   getStatusColor,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const formatDate = (dateString: string) => {
//     if (!dateString || isNaN(new Date(dateString).getTime())) {
//         return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   // Define the number of columns for consistency
//   const numberOfColumns = 8; // Matched to actual columns

//   if (loadingTransfers) {
//     return (
//       <div className="rounded-xl border overflow-hidden">
//         <table className="min-w-full">
//           <TransferTableHeader
//             // Cast the specific types back to general string if the Header component expects it
//             toggleSort={toggleSort as (field: string) => void}
//             sortField={sortField as string | null}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(10)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={i}>
//                   {Array(numberOfColumns).fill(0).map((_, j) => ( // Dynamic skeleton columns
//                       <td key={j} className="px-4 py-3 whitespace-nowrap">
//                           <Skeleton className="h-4 w-full" /> {/* Use full width skeleton */}
//                       </td>
//                   ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <TransferTableHeader
//              // Cast the specific types back to general string if the Header component expects it
//              toggleSort={toggleSort as (field: string) => void}
//              sortField={sortField as string | null}
//              sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {filteredTransfers.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={numberOfColumns} // Use the defined constant
//                   className="px-6 py-10 text-center text-gray-500"
//                 >
//                   No transfers found matching your filters.
//                 </td>
//               </tr>
//             ) : (
//               filteredTransfers.map((transfer, index) => (
//                 <motion.tr
//                   key={transfer._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium text-neutral-900 dark:text-white">
//                       {transfer._id ? `${transfer._id.substring(0, 10)}...` : "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex flex-col">
//                       <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                         {transfer.user?.fullName || "N/A"}
//                       </span>
//                       <span className="text-sm text-gray-500 dark:text-gray-300">
//                         {transfer.user?.email || "N/A"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span className="font-medium capitalize text-neutral-900 dark:text-white">
//                       {transfer.recipient?.accountHolderName || "N/A"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                     {/* Display the string amount directly */}
//                     {transfer.sendAmount != null ? transfer.sendAmount : "N/A"}
//                     {/* Add currency symbol or formatting if needed */}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                     {transfer.sendCurrency?.code || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <span
//                       className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
//                         transfer.status || 'unknown'
//                       )}`}
//                     >
//                       {transfer.status || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium">
//                     {formatDate(transfer.createdAt)}
//                   </td>
//                   <td className="px-6 py-3 whitespace-nowrap font-medium text-end">
//                     <Link
//                       href={`/admin/transfer/${transfer._id}`}
//                       className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
//                     >
//                       <span>View Details</span>
//                     </Link>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransferTable;

// frontend/src/app/admin/components/transfers/TransferTable.tsx
"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import TransferTableHeader, { TransferSortField } from "./TransferTableHeader";

// --- Define Transfer type used WITHIN this component ---
// --- FIX: Changed sendAmount to string to match parent component's type ---
interface Transfer {
  _id: string;
  user?: {
    fullName?: string;
    email?: string;
  };
  recipient?: {
    accountHolderName?: string;
  };
  sendAmount: string; // <<< CHANGED FROM number TO string
  sendCurrency?: {
    code?: string;
  };
  status: string;
  createdAt: string;
}

// --- Define the type for the sortable fields accepted by this component ---
// Corresponds to the values passed by the parent and handled by the header
// We rely on TransferSortField imported from the header.
// type TransferTableSortField = keyof Omit<Transfer, 'user' | 'recipient' | 'sendCurrency'> | 'user' | 'recipient' | 'createdAt' | 'amount' | '_id';

interface TransferTableProps {
  filteredTransfers: Transfer[]; // Expects the Transfer type defined above
  loadingTransfers: boolean;
  getStatusColor: (status: string) => string;
  // --- FIX: Update prop type to match the parent's state type ---
  toggleSort: (field: TransferSortField) => void; // Use the imported type
  sortField: TransferSortField | null; // Use the imported type
  sortDirection: "asc" | "desc";
}

const TransferTable: React.FC<TransferTableProps> = ({
  filteredTransfers,
  loadingTransfers,
  getStatusColor,
  toggleSort,
  sortField,
  sortDirection,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "Invalid Date";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Define the number of columns for consistency
  const numberOfColumns = 8; // Matched to actual columns

  // Loading Skeleton
  if (loadingTransfers) {
    return (
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
          <table className="min-w-full">
            <TransferTableHeader
              // Cast the specific types back to general string if the Header component expects it
              toggleSort={toggleSort} // Pass directly - types now match
              sortField={sortField} // Pass directly - types now match
              sortDirection={sortDirection}
            />
            <tbody>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b">
                    {Array(numberOfColumns)
                      .fill(0)
                      .map(
                        (
                          _,
                          j // Dynamic skeleton columns
                        ) => (
                          <td
                            key={j}
                            className="px-6 py-4 h-[70px] whitespace-nowrap"
                          >
                            {/* Use full width skeleton */}
                            <Skeleton className="h-4 w-full" />{" "}
                          </td>
                        )
                      )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <table className="min-w-full overflow-hidden">
          <TransferTableHeader
            // Cast the specific types back to general string if the Header component expects it
            toggleSort={toggleSort} // Pass directly - types now match
            sortField={sortField} // Pass directly - types now match
            sortDirection={sortDirection}
          />
          <tbody className="divide-y overflow-hidden">
            {filteredTransfers.length === 0 ? (
              <tr>
                <td
                  colSpan={numberOfColumns} // Use the defined constant
                  className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
                >
                  No transfers found matching your filters.
                </td>
              </tr>
            ) : (
              filteredTransfers.map((transfer, index) => (
                <motion.tr
                  key={transfer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {transfer._id
                        ? `${transfer._id.substring(0, 10)}...`
                        : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium capitalize text-neutral-900 dark:text-white">
                        {transfer.user?.fullName || "N/A"}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {transfer.user?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="font-medium capitalize text-neutral-900 dark:text-white">
                      {transfer.recipient?.accountHolderName || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
                    {/* Display the string amount directly */}
                    {transfer.sendAmount != null ? transfer.sendAmount : "N/A"}
                    {/* Add currency symbol or formatting if needed */}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
                    {transfer.sendCurrency?.code || "N/A"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
                        transfer.status || "unknown"
                      )}`}
                    >
                      {transfer.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                    {formatDate(transfer.createdAt)}
                  </td>
                  <td className="px-6 py-3 font-medium text-neutral-900 dark:text-white whitespace-nowrap ">
                    <Link
                      href={`/admin/transfer/${transfer._id}`}
                      className="inline-flex items-center group px-6 py-2 rounded-3xl space-x-1 transition-colors duration-300 font-medium bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox text-neutral-900 dark:text-primary focus:outline-none"
                    >
                      <span>View Details</span>
                    </Link>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferTable;
