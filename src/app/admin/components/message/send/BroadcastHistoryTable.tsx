// // frontend/src/app/(admin)/admin/messages/send/BroadcastHistoryTable.tsx
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns'; // Keep this
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   History,
//   ListChecks,
//   Pencil,
// } from 'lucide-react';
// import { BroadcastBatchInfo, BroadcastBatchListResponse } from '../../../../services/admin/inbox';
// import { cn } from '@/lib/utils';

// // --- Define formatDate directly in this file ---
// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : format(date, "MMM d, yyyy, HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };
// // --- End function definition ---

// interface BroadcastHistoryTableProps {
//   // ... props remain the same
//   batchesData: BroadcastBatchListResponse | null;
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
// }

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   // ... props destructuring
//   batchesData,
//   isLoading,
//   error,
//   currentPage,
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
// }) => {

//   // ... rest of the component implementation using the locally defined formatDate
//   // renderSkeleton, error handling, empty state, table rendering, pagination...
//   // All the parts using <button> instead of <PlainButton> remain the same.

//   const renderSkeleton = () => (
//      // ... implementation
//      <div className="space-y-3 mt-6">
//       {[...Array(3)].map((_, i) => (
//         <div key={i} className="flex items-center space-x-4 p-4 border dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 animate-pulse">
//           <div className="flex-1 space-y-2">
//             <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//             <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
//             <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
//           </div>
//           <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
//            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
//         </div>
//       ))}
//     </div>
//   );

//   if (isLoading && !batchesData) return renderSkeleton();

//   if (error) {
//     return (
//       <div className="mt-6 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//         <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//         <div>
//           <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading History</h3>
//           <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className={cn(
//               "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//               "h-9 px-3",
//               "text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50"
//             )}
//           >
//             <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!batchesData || batchesData.batches.length === 0) {
//      return (
//       <div className="text-center py-16 text-gray-500 dark:text-gray-400">
//         <ListChecks className="mx-auto h-12 w-12 mb-3 text-gray-400 dark:text-gray-500" />
//         <p className="text-lg font-medium">No Past Broadcasts</p>
//         <p className="text-sm">Messages sent to all users will appear here.</p>
//       </div>
//     );
//   }

//   const totalPages = batchesData.totalPages ?? 0;
//   const isActionInProgress = isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="pt-8 border-t">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-mainheading dark:text-white inline-flex items-center gap-2">
//               <History className="size-6 text-primary" />
//               Broadcast History
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//              className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw className={`size-5 ${isLoading ? "animate-spin" : ""}`} />
//             {isLoading ? 'Refreshing...' : 'Refresh History'}
//           </button>
//         </div>

//         {/* Table */}
//         <div className="border dark:border-gray-700 rounded-lg overflow-x-auto shadow-sm bg-white dark:bg-gray-800">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//              <thead className="bg-gray-50 dark:bg-gray-700/50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[250px]">Subject & Snippet</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">Sent At</th>
//                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[100px]">Recipients</th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[150px]">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {batchesData.batches.map((batch) => {
//                 const isDeletingThis = deletingBatchId === batch.batchId;
//                 const isEditingThis = editingBatchId === batch.batchId && isUpdatingBatch;

//                 return (
//                   <tr key={batch.batchId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                      <td className="px-6 py-4 max-w-sm">
//                       <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate" title={batch.subject}>{batch.subject}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={batch.bodySnippet}>
//                         {batch.bodySnippet}{batch.bodySnippet.length >= 100 ? '...' : ''}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {/* Use local formatDate here */}
//                       <div className="text-sm text-gray-900 dark:text-gray-100">{formatDate(batch.sentAt)}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(batch.sentAt), { addSuffix: true })}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">{batch.recipientCount}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end items-center space-x-1">
//                         <button
//                           type="button"
//                           onClick={() => onEdit(batch)}
//                           disabled={isActionInProgress}
//                           aria-label="Edit Batch"
//                           title="Edit Batch"
//                           className={cn(
//                              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                              "h-9 w-9",
//                              "text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
//                           )}
//                         >
//                           {isEditingThis ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Pencil className="h-4 w-4" />
//                           )}
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => onDelete(batch)}
//                           disabled={isActionInProgress}
//                           aria-label="Delete Batch"
//                           title="Delete Batch"
//                            className={cn(
//                              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:pointer-events-none",
//                              "h-9 w-9",
//                              "text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50"
//                           )}
//                         >
//                           {isDeletingThis ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Basic Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-6 flex justify-between items-center px-1 py-3">
//             <button
//               type="button"
//               onClick={onPreviousPage}
//               disabled={currentPage <= 1 || isLoading}
//                className={cn(
//                 "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                 "h-9 px-3",
//                 "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
//               )}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700 dark:text-gray-300">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               type="button"
//               onClick={onNextPage}
//               disabled={currentPage >= totalPages || isLoading}
//               className={cn(
//                 "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                 "h-9 px-3",
//                 "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
//               )}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// // frontend/src/app/(admin)/admin/messages/send/BroadcastHistoryTable.tsx
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns';
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   History,
//   ListChecks,
//   Pencil,
// } from 'lucide-react';
// import { BroadcastBatchInfo, BroadcastBatchListResponse } from '../../../../services/admin/inbox';
// import { cn } from '@/lib/utils';
// // Remove: import BroadcastHistoryTableHeader from './BroadcastHistoryTableHeader';
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";

// // --- Define formatDate directly in this file (as per requirement) ---
// const formatDate = (dateString: string) => {
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
// // --- End function definition ---

// interface BroadcastHistoryTableProps {
//   batchesData: BroadcastBatchListResponse | null;
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   skeletonRowCount?: number;
// }

// // --- Inline Table Header Component ---
// const TableHeaderComponent: React.FC = () => {
//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap uppercase";
//     return (
//         <thead className='bg-lightgray dark:bg-primarybox'>
//             <tr className="border-b">
//                 <th className={`${headerCellClasses} min-w-[250px]`}>
//                     Subject & Snippet
//                 </th>
//                 <th className={`${headerCellClasses} min-w-[180px]`}>
//                     Sent At
//                 </th>
//                 <th className={`${headerCellClasses} `}>
//                     Recipients
//                 </th>
//                 <th className={`${headerCellClasses} `}>
//                     Actions
//                 </th>
//             </tr>
//         </thead>
//     );
// };
// // --- End Inline Table Header Component ---

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   batchesData,
//   isLoading,
//   error,
//   currentPage,
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
//   skeletonRowCount = 3,
// }) => {
//   const numberOfColumns = 4;

//   const renderSkeleton = () => (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full">
//           <TableHeaderComponent />
//           <tbody className="divide-y">
//             {Array(skeletonRowCount)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={`skel-batch-${i}`}>
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td key={`skel-cell-batch-${i}-${j}`} className="px-4 py-3 whitespace-nowrap">
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   if (isLoading && !batchesData?.batches.length) return renderSkeleton();

//   if (error) {
//     return (
//       <div className="mt-6 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//         <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//         <div>
//           <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading History</h3>
//           <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className={cn(
//               "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//               "h-9 px-3",
//               "text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50"
//             )}
//           >
//             <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const totalPages = batchesData?.totalPages ?? 0;
//   const isActionInProgress = isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="pt-8">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-mainheading dark:text-white inline-flex items-center gap-2">
//               <History className="size-6 text-primary" />
//               Broadcast History
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-300">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw className={`size-5 ${isLoading ? "animate-spin" : ""}`} />
//             {isLoading ? 'Refreshing...' : 'Refresh History'}
//           </button>
//         </div>

//         <div className="rounded-xl border overflow-hidden">
//           <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <table className="min-w-full overflow-hidden">
//               <TableHeaderComponent />
//               <tbody className="divide-y  overflow-hidden">
//                 {!isLoading && (!batchesData || batchesData.batches.length === 0) ? (
//                   <tr>
//                     <td
//                       colSpan={numberOfColumns}
//                       className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//                     >
//                        <ListChecks className="mx-auto h-10 w-10 mb-2 text-gray-400 dark:text-gray-500" />
//                        <p className="text-base font-medium">No Past Broadcasts</p>
//                        <p className="text-xs">Messages sent to all users will appear here.</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   batchesData?.batches.map((batch, index) => {
//                     const isDeletingThis = deletingBatchId === batch.batchId;
//                     const isEditingThis = editingBatchId === batch.batchId && isUpdatingBatch;

//                     return (
//                       <motion.tr
//                         key={batch.batchId}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.03 }}
//                       >
//                         <td className="px-6 py-4 max-w-sm whitespace-normal">
//                           <div className="flex flex-col">
//                             <span className="font-semibold text-neutral-900 dark:text-white truncate" title={batch.subject} >
//                               {batch.subject}
//                             </span>
//                             <span className="text-xs text-gray-500 dark:text-gray-300 truncate" title={batch.bodySnippet} >
//                               {batch.bodySnippet}
//                               {batch.bodySnippet.length >= 100 ? "..." : ""}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex flex-col">
//                                 <span className="font-medium text-neutral-900 dark:text-white"> {formatDate(batch.sentAt)} </span>
//                                 <span className="text-xs text-gray-500 dark:text-gray-300">
//                                     {formatDistanceToNow(new Date(batch.sentAt), {addSuffix: true,})}
//                                 </span>
//                             </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="font-medium text-neutral-900 dark:text-white">
//                             {batch.recipientCount}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => onEdit(batch)}
//                               disabled={isActionInProgress}
//                               aria-label="Edit Batch"
//                               title="Edit Batch"
//                               className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => onDelete(batch)}
//                               disabled={isActionInProgress}
//                               aria-label="Delete Batch"
//                               title="Delete Batch"
//                               className="bg-red-600 hover:bg-red-700 text-white transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {totalPages > 1 && (
//           <div className="mt-6 flex justify-between items-center px-1 py-3">
//             <button
//               type="button"
//               onClick={onPreviousPage}
//               disabled={currentPage <= 1 || isLoading}
//               className={cn(
//                 "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                 "h-9 px-4",
//                 "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//               )}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700 dark:text-gray-300">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               type="button"
//               onClick={onNextPage}
//               disabled={currentPage >= totalPages || isLoading}
//               className={cn(
//                 "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                 "h-9 px-4",
//                 "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//               )}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// // frontend/src/app/(admin)/admin/messages/send/BroadcastHistoryTable.tsx
// import React, { useEffect, useState } from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   History,
//   ListChecks,
//   Pencil,
//   Edit,
// } from "lucide-react";
// import {
//   BroadcastBatchInfo,
//   BroadcastBatchListResponse,
// } from "../../../../services/admin/inbox";
// import { cn } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import { FaBroadcastTower, FaPaperPlane } from "react-icons/fa";

// // --- Define formatDate directly in this file (as per requirement) ---
// const formatDate = (dateString: string) => {
//   if (!dateString || isNaN(new Date(dateString).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleString(undefined, options);
// };
// // --- End function definition ---

// interface BroadcastHistoryTableProps {
//   batchesData: BroadcastBatchListResponse | null;
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   skeletonRowCount?: number;
// }

// // --- Inline Table Header Component ---
// const TableHeaderComponent: React.FC = () => {
//   const headerCellClasses =
//     "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap uppercase";
//   return (
//     <thead className="bg-lightgray dark:bg-primarybox">
//       <tr className="broadcast-head">
//         <th className={`${headerCellClasses} min-w-[250px]`}>
//           Subject & Snippet
//         </th>
//         <th className={`${headerCellClasses} min-w-[180px]`}>Sent At</th>
//         <th className={`${headerCellClasses} `}>Recipients</th>
//         <th className={`${headerCellClasses} `}>Actions</th>
//       </tr>
//     </thead>
//   );
// };
// // --- End Inline Table Header Component ---

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   batchesData,
//   isLoading,
//   error,
//   currentPage,
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
//   skeletonRowCount = 3,
// }) => {
//   const numberOfColumns = 4;

//   const renderSkeleton = () => (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full">
//           <TableHeaderComponent />
//           <tbody>
//             {Array(skeletonRowCount)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={`skel-batch-${i}`} className="border-b">
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td
//                         key={`skel-cell-batch-${i}-${j}`}
//                         className="px-6 py-4 h-[70px] whitespace-nowrap"
//                       >
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderError = () => (
//     <div className="mt-5 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//       <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//       <div>
//         <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//           Error Loading History
//         </h3>
//         <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
//         <button
//           type="button"
//           onClick={onRefresh}
//           disabled={isLoading}
//           className={cn(
//             "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//             "h-9 px-3",
//             "text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50"
//           )}
//         >
//           <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640); // Tailwind's 'md' breakpoint is 768px
//     };

//     checkScreenSize(); // Initial check
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const totalPages = batchesData?.totalPages ?? 0;
//   const isActionDisabled =
//     isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="py-5">
//         {/* Header Section - Always Visible */}
//         <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Broadcast-History">
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <FaBroadcastTower className="size-6 text-mainheading dark:text-primary" />
//               </div>

//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 Broadcast History
//               </h1>
//             </div>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 aspect-square sm:aspect-auto h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             <RefreshCw className={cn("size-5", isLoading && "animate-spin")} />
//             {!isMobile && <span>Refresh</span>}
//           </button>
//         </div>

//         {/* Table Content Area - Conditional Rendering for loading, error, or data */}
//         {isLoading ? (
//           renderSkeleton()
//         ) : error ? (
//           renderError()
//         ) : (
//           <>
//             <div className="rounded-xl border overflow-hidden">
//               <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//                 <table className="min-w-full overflow-hidden">
//                   <TableHeaderComponent />
//                   <tbody className="divide-y overflow-hidden">
//                     {!batchesData || batchesData.batches.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={numberOfColumns}
//                           className="px-6 py-10 text-center space-y-3 text-gray-500 dark:text-gray-300"
//                         >
//                           <div className="flex justify-center items-center">
//                             <span className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                               <ListChecks className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                             </span>
//                           </div>

//                           <p className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//                             No Past Broadcasts
//                           </p>

//                           <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                             It looks like there are no past broadcasts to
//                             display at the moment. Once a session or stream
//                             ends, it will appear here for you to revisit
//                             anytime. Stay tuned!
//                           </p>
//                         </td>
//                       </tr>
//                     ) : (
//                       batchesData?.batches.map((batch, index) => {
//                         const isDeletingThis =
//                           deletingBatchId === batch.batchId;
//                         const isEditingThis =
//                           editingBatchId === batch.batchId && isUpdatingBatch;
//                         const rowActionDisabled =
//                           isActionDisabled || isDeletingThis || isEditingThis;

//                         return (
//                           <motion.tr
//                             key={batch.batchId}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.03 }}
//                           >
//                             <td className="px-6 py-4 max-w-sm whitespace-normal">
//                               <div className="flex flex-col">
//                                 <span
//                                   className="font-semibold text-neutral-900 dark:text-white truncate"
//                                   title={batch.subject}
//                                 >
//                                   {batch.subject}
//                                 </span>
//                                 <span
//                                   className="text-xs text-gray-500 dark:text-gray-300 truncate"
//                                   title={batch.bodySnippet}
//                                 >
//                                   {batch.bodySnippet.length > 100
//                                     ? `${batch.bodySnippet.substring(0, 97)}...`
//                                     : batch.bodySnippet}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex flex-col">
//                                 <span className="font-medium text-neutral-900 dark:text-white">
//                                   {" "}
//                                   {formatDate(batch.sentAt)}{" "}
//                                 </span>
//                                 <span className="text-xs text-gray-500 dark:text-gray-300">
//                                   {formatDistanceToNow(new Date(batch.sentAt), {
//                                     addSuffix: true,
//                                   })}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="font-medium text-neutral-900 dark:text-white">
//                                 {batch.recipientCount}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => onEdit(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Edit Batch"
//                                   title="Edit Batch"
//                                   className="bg-primary gap-1.5 hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Edit size={18} />
//                                   Edit
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => onDelete(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Delete Batch"
//                                   title="Delete Batch"
//                                   className="bg-red-600 gap-1.5 hover:bg-red-700 text-white transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Trash2 size={18} />
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </motion.tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {totalPages > 1 && (
//               <div className="mt-6 flex justify-between items-center px-1 py-3">
//                 <button
//                   type="button"
//                   onClick={onPreviousPage}
//                   disabled={currentPage <= 1 || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={onNextPage}
//                   disabled={currentPage >= totalPages || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// // frontend/src/app/(admin)/admin/messages/send/BroadcastHistoryTable.tsx
// import React, { useEffect, useState } from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   History,
//   ListChecks,
//   Pencil,
//   Edit,
//   ArrowDownUp,
//   ArrowUpDown,
// } from "lucide-react";
// import {
//   BroadcastBatchInfo,
//   // BroadcastBatchListResponse, // No longer needed here as we receive totalPages etc. separately
// } from "../../../../services/admin/inbox"; // Adjusted path
// import { cn } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import { FaBroadcastTower } from "react-icons/fa"; // FaPaperPlane not used here

// // Define sortable fields for Broadcast History
// export type BroadcastSortField = "subject" | "sentAt" | "recipientCount";

// // --- Define formatDate directly in this file (as per requirement) ---
// const formatDateToLocale = (dateString: string) => {
//   // Renamed to avoid conflict if imported globally
//   if (!dateString || isNaN(new Date(dateString).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     // timeZone: 'UTC', // Optional: specify if dates are UTC and you want them displayed as such
//   };
//   return new Date(dateString).toLocaleString(undefined, options);
// };
// // --- End function definition ---

// interface BroadcastHistoryTableProps {
//   batches: BroadcastBatchInfo[]; // Now receives sorted batches directly
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   totalPages: number;
//   totalItems: number; // For displaying total results
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   skeletonRowCount?: number;
//   // Sorting props
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null;
//   sortDirection: "asc" | "desc";
// }

// // --- Inline Table Header Component ---
// interface TableHeaderComponentProps {
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null;
//   sortDirection: "asc" | "desc";
// }

// const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const headerCellClasses =
//     "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//   const buttonClasses =
//     "flex items-center gap-1 hover:text-primary dark:hover:text-primary uppercase group cursor-pointer transition-colors duration-150 ease-linear";

//   const renderSortIcon = (field: BroadcastSortField) => {
//     if (sortField === field) {
//       return sortDirection === "asc" ? (
//         <ArrowUpDown size={18} className="ml-1.5 text-primary" />
//       ) : (
//         <ArrowDownUp size={18} className="ml-1.5 text-primary" />
//       );
//     }
//     return (
//       <ArrowUpDown
//         size={18}
//         className="ml-1.5 opacity-0 group-hover:opacity-100 text-gray-400 dark:text-gray-500 transition-opacity duration-150 ease-linear"
//       />
//     );
//   };

//   return (
//     <thead className="bg-lightgray dark:bg-primarybox">
//       <tr className="broadcast-head">
//         <th className={`${headerCellClasses} min-w-[250px]`}>
//           <button onClick={() => onSort("subject")} className={buttonClasses}>
//             Subject & Snippet {renderSortIcon("subject")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} min-w-[180px]`}>
//           <button onClick={() => onSort("sentAt")} className={buttonClasses}>
//             Sent At {renderSortIcon("sentAt")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} `}>
//           <button
//             onClick={() => onSort("recipientCount")}
//             className={buttonClasses}
//           >
//             Recipients {renderSortIcon("recipientCount")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} uppercase`}>Actions</th>
//       </tr>
//     </thead>
//   );
// };
// // --- End Inline Table Header Component ---

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   batches,
//   isLoading,
//   error,
//   currentPage,
//   totalPages,
//   totalItems,
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
//   skeletonRowCount = 3,
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const numberOfColumns = 4;

//   const renderSkeleton = () => (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full">
//           <TableHeaderComponent
//             onSort={onSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(skeletonRowCount)
//               .fill(0)
//               .map((_, i) => (
//                 <tr
//                   key={`skel-batch-${i}`}
//                   className="border-b dark:border-neutral-700"
//                 >
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td
//                         key={`skel-cell-batch-${i}-${j}`}
//                         className="px-6 py-4 h-[70px] whitespace-nowrap"
//                       >
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderError = () => (
//     <div className="mt-5 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//       <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//       <div>
//         <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//           Error Loading History
//         </h3>
//         <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
//         <button
//           type="button"
//           onClick={onRefresh}
//           disabled={isLoading}
//           className={cn(
//             "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//             "h-9 px-3",
//             "text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50"
//           )}
//         >
//           <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const isActionDisabled =
//     isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="py-5">
//         {/* Header Section - Always Visible */}
//         <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Broadcast-History">
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <FaBroadcastTower className="size-6 text-mainheading dark:text-primary" />
//               </div>

//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 Broadcast History
//               </h1>
//             </div>

//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 aspect-square sm:aspect-auto h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//             title="Refresh history"
//           >
//             <RefreshCw className={cn("size-5", isLoading && "animate-spin")} />
//             {!isMobile && <span>Refresh</span>}
//           </button>
//         </div>

//         {/* Table Content Area - Conditional Rendering for loading, error, or data */}
//         {isLoading ? (
//           renderSkeleton()
//         ) : error ? (
//           renderError()
//         ) : (
//           <>
//             <div className="rounded-xl border overflow-hidden">
//               <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//                 <table className="min-w-full overflow-hidden">
//                   <TableHeaderComponent
//                     onSort={onSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                   />
//                   <tbody className="divide-y overflow-hidden">
//                     {batches.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={numberOfColumns}
//                           className="px-6 py-10 text-center space-y-3 text-gray-500 dark:text-gray-300"
//                         >
//                           <div className="flex justify-center items-center">
//                             <span className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                               <ListChecks className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                             </span>
//                           </div>

//                           <p className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//                             No Past Broadcasts
//                           </p>

//                           <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                             It looks like there are no past broadcasts to
//                             display at the moment. Once a broadcast is sent, it
//                             will appear here.
//                           </p>
//                         </td>
//                       </tr>
//                     ) : (
//                       batches.map((batch, index) => {
//                         const isDeletingThis =
//                           deletingBatchId === batch.batchId;
//                         const isEditingThis =
//                           editingBatchId === batch.batchId && isUpdatingBatch;
//                         const rowActionDisabled =
//                           isActionDisabled || isDeletingThis || isEditingThis;

//                         return (
//                           <motion.tr
//                             key={batch.batchId}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.03 }}
//                             className="hover:bg-lightgray/50 dark:hover:bg-primarybox/50 transition-colors duration-100 ease-linear"
//                           >
//                             <td className="px-6 py-4 max-w-sm whitespace-normal">
//                               <div className="flex flex-col">
//                                 <span
//                                   className="font-semibold text-neutral-900 dark:text-white truncate"
//                                   title={batch.subject}
//                                 >
//                                   {batch.subject || "N/A"}
//                                 </span>
//                                 <span
//                                   className="text-xs text-gray-500 dark:text-gray-300 truncate"
//                                   title={batch.bodySnippet}
//                                 >
//                                   {batch.bodySnippet.length > 100
//                                     ? `${batch.bodySnippet.substring(0, 97)}...`
//                                     : batch.bodySnippet}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex flex-col">
//                                 <span className="font-medium text-neutral-900 dark:text-white">
//                                   {formatDateToLocale(batch.sentAt)}
//                                 </span>
//                                 <span className="text-xs text-gray-500 dark:text-gray-300">
//                                   {formatDistanceToNow(new Date(batch.sentAt), {
//                                     addSuffix: true,
//                                   })}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="font-medium text-neutral-900 dark:text-white">
//                                 {batch.recipientCount}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => onEdit(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Edit Batch"
//                                   title="Edit Batch"
//                                   className="bg-primary gap-1.5 hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Edit size={18} />
//                                   Edit
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => onDelete(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Delete Batch"
//                                   title="Delete Batch"
//                                   className="bg-red-600 gap-1.5 hover:bg-red-700 text-white transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Trash2 size={18} />
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </motion.tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {totalPages > 1 && (
//               <div className="mt-6 flex justify-between items-center px-1 py-3">
//                 <button
//                   type="button"
//                   onClick={onPreviousPage}
//                   disabled={currentPage <= 1 || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={onNextPage}
//                   disabled={currentPage >= totalPages || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// // frontend/src/app/(admin)/admin/messages/send/BroadcastHistoryTable.tsx
// import React, { useEffect, useState } from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   ListChecks,
//   Edit,
//   ArrowDownUp,
//   ArrowUpDown,
// } from "lucide-react";
// import { BroadcastBatchInfo } from "../../../../services/admin/inbox"; // Adjusted path
// import { cn } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import { FaBroadcastTower } from "react-icons/fa";

// export type BroadcastSortField = "subject" | "sentAt" | "recipientCount";

// const formatDateToLocale = (dateString: string) => {
//   if (!dateString || isNaN(new Date(dateString).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleString(undefined, options);
// };

// interface BroadcastHistoryTableProps {
//   batches: BroadcastBatchInfo[];
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   totalPages: number;
//   // totalItems: number; // REMOVE THIS LINE
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   skeletonRowCount?: number;
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null;
//   sortDirection: "asc" | "desc";
// }

// interface TableHeaderComponentProps {
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null;
//   sortDirection: "asc" | "desc";
// }

// const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const headerCellClasses =
//     "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//   const buttonClasses =
//     "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

//   const renderSortIcon = (field: BroadcastSortField) => {
//     if (sortField === field) {
//       return sortDirection === "asc" ? (
//         <ArrowUpDown size={18} className="ml-1.5 text-primary transition-all duration-75 ease-linear" />
//       ) : (
//         <ArrowDownUp size={18} className="ml-1.5 text-primary transition-all duration-75 ease-linear" />
//       );
//     }
//     return (
//       <ArrowUpDown
//         size={20}
//         className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear"
//       />
//     );
//   };

//   return (
//     <thead className="bg-lightgray dark:bg-primarybox">
//       <tr className="broadcast-head">
//         <th className={`${headerCellClasses} min-w-[250px]`}>
//           <button className={buttonClasses}>
//             Subject & Snippet {renderSortIcon("subject")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} min-w-[180px]`}>
//           <button onClick={() => onSort("sentAt")} className={buttonClasses}>
//             Sent At {renderSortIcon("sentAt")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} `}>
//           <button
//             onClick={() => onSort("recipientCount")}
//             className={buttonClasses}
//           >
//             Recipients {renderSortIcon("recipientCount")}
//           </button>
//         </th>
//         <th className={`${headerCellClasses} uppercase`}>Actions</th>
//       </tr>
//     </thead>
//   );
// };

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   batches,
//   isLoading,
//   error,
//   currentPage,
//   totalPages,
//   // totalItems, // REMOVE THIS from destructuring
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
//   skeletonRowCount = 3,
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const numberOfColumns = 4;

//   const renderSkeleton = () => (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full">
//           <TableHeaderComponent
//             onSort={onSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(skeletonRowCount)
//               .fill(0)
//               .map((_, i) => (
//                 <tr
//                   key={`skel-batch-${i}`}
//                   className="border-b dark:border-neutral-700"
//                 >
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td
//                         key={`skel-cell-batch-${i}-${j}`}
//                         className="px-6 py-4 h-[70px] whitespace-nowrap"
//                       >
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderError = () => (
//     <div className="mt-5 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 rounded-md flex items-start space-x-3">
//       <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
//       <div>
//         <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
//           Error Loading History
//         </h3>
//         <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
//         <button
//           type="button"
//           onClick={onRefresh}
//           disabled={isLoading}
//           className={cn(
//             "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//             "h-9 px-3",
//             "text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50"
//           )}
//         >
//           <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const isActionDisabled =
//     isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="py-5">
//         <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Broadcast-History">
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary dark:bg-primarybox rounded-full flex items-center justify-center">
//                 <FaBroadcastTower className="size-6 text-mainheading dark:text-primary" />
//               </div>
//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-primary">
//                 Broadcast History
//               </h1>
//             </div>
//             <p className="text-gray-500 mt-2 dark:text-gray-300 lg:text-lg">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white sm:px-8 sm:py-3 aspect-square sm:aspect-auto h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//             title="Refresh history"
//           >
//             <RefreshCw className={cn("size-5", isLoading && "animate-spin")} />
//             {!isMobile && <span>Refresh</span>}
//           </button>
//         </div>

//         {isLoading ? (
//           renderSkeleton()
//         ) : error ? (
//           renderError()
//         ) : (
//           <>
//             <div className="rounded-xl border overflow-hidden">
//               <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//                 <table className="min-w-full overflow-hidden">
//                   <TableHeaderComponent
//                     onSort={onSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                   />
//                   <tbody className="divide-y overflow-hidden">
//                     {batches.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={numberOfColumns}
//                           className="px-6 py-10 text-center space-y-3 text-gray-500 dark:text-gray-300"
//                         >
//                           <div className="flex justify-center items-center">
//                             <span className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                               <ListChecks className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//                             </span>
//                           </div>
//                           <p className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//                             No Past Broadcasts
//                           </p>
//                           <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                             It looks like there are no past broadcasts to
//                             display at the moment. Once a broadcast is sent, it
//                             will appear here.
//                           </p>
//                         </td>
//                       </tr>
//                     ) : (
//                       batches.map((batch, index) => {
//                         const isDeletingThis =
//                           deletingBatchId === batch.batchId;
//                         const isEditingThis =
//                           editingBatchId === batch.batchId && isUpdatingBatch;
//                         const rowActionDisabled =
//                           isActionDisabled || isDeletingThis || isEditingThis;

//                         return (
//                           <motion.tr
//                             key={batch.batchId}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.03 }}
//                             className="hover:bg-lightgray/50 dark:hover:bg-primarybox/50 transition-colors duration-100 ease-linear"
//                           >
//                             <td className="px-6 py-4 max-w-sm whitespace-normal">
//                               <div className="flex flex-col">
//                                 <span
//                                   className="font-semibold text-neutral-900 dark:text-white truncate"
//                                   title={batch.subject}
//                                 >
//                                   {batch.subject || "N/A"}
//                                 </span>
//                                 <span
//                                   className="text-xs text-gray-500 dark:text-gray-300 truncate"
//                                   title={batch.bodySnippet}
//                                 >
//                                   {batch.bodySnippet.length > 100
//                                     ? `${batch.bodySnippet.substring(0, 97)}...`
//                                     : batch.bodySnippet}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex flex-col">
//                                 <span className="font-medium text-neutral-900 dark:text-white">
//                                   {formatDateToLocale(batch.sentAt)}
//                                 </span>
//                                 <span className="text-xs text-gray-500 dark:text-gray-300">
//                                   {formatDistanceToNow(new Date(batch.sentAt), {
//                                     addSuffix: true,
//                                   })}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className="font-medium text-neutral-900 dark:text-white">
//                                 {batch.recipientCount}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => onEdit(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Edit Batch"
//                                   title="Edit Batch"
//                                   className="bg-primary gap-1.5 hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Edit size={18} />
//                                   Edit
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => onDelete(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Delete Batch"
//                                   title="Delete Batch"
//                                   className="bg-red-600 gap-1.5 hover:bg-red-700 text-white transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                   <Trash2 size={18} />
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </motion.tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {totalPages > 1 && (
//               <div className="mt-6 flex justify-between items-center px-1 py-3">
//                 <button
//                   type="button"
//                   onClick={onPreviousPage}
//                   disabled={currentPage <= 1 || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={onNextPage}
//                   disabled={currentPage >= totalPages || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// import React, { useEffect, useState } from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Loader2,
//   AlertCircle,
//   Trash2,
//   RefreshCw,
//   ListChecks,
//   Edit,
//   ArrowDownUp,
//   ArrowUpDown,
// } from "lucide-react";
// import { BroadcastBatchInfo } from "../../../../services/admin/inbox";
// import { cn } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import { FaBroadcastTower } from "react-icons/fa";

// // "subject" removed from sortable fields
// export type BroadcastSortField = "sentAt" | "recipientCount";

// const formatDateToLocale = (dateString: string) => {
//   if (!dateString || isNaN(new Date(dateString).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleString(undefined, options);
// };

// interface BroadcastHistoryTableProps {
//   batches: BroadcastBatchInfo[];
//   isLoading: boolean;
//   error: string | null;
//   currentPage: number;
//   totalPages: number;
//   deletingBatchId: string | null;
//   editingBatchId: string | null;
//   isUpdatingBatch: boolean;
//   onRefresh: () => void;
//   onEdit: (batch: BroadcastBatchInfo) => void;
//   onDelete: (batch: BroadcastBatchInfo) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   skeletonRowCount?: number;
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null; // Can be null now
//   sortDirection: "asc" | "desc";
// }

// interface TableHeaderComponentProps {
//   onSort: (field: BroadcastSortField) => void;
//   sortField: BroadcastSortField | null;
//   sortDirection: "asc" | "desc";
// }

// const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const headerCellClasses =
//     "px-4 py-4 text-left font-medium text-mainheadingWhite tracking-wider whitespace-nowrap";
//   const buttonClasses =
//     "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

//   const renderSortIcon = (field: BroadcastSortField) => {
//     // Only show active icon (with primary color) if this field IS the actively sorted one
//     if (sortField === field) {
//       return sortDirection === "asc" ? (
//         <ArrowUpDown
//           size={18}
//           className="ml-1.5 text-primary transition-all duration-75 ease-linear"
//         />
//       ) : (
//         <ArrowDownUp
//           size={18}
//           className="ml-1.5 text-primary transition-all duration-75 ease-linear"
//         />
//       );
//     }
//     // Otherwise, show the default hover-only icon
//     return (
//       <ArrowUpDown
//         size={18}
//         className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear"
//       />
//     );
//   };

//   return (
//     <thead className="bg-primarybox">
//       <tr className="broadcast-head">
//         {/* Subject & Snippet - No longer sortable */}
//         <th className={`${headerCellClasses} min-w-[250px]`}>
//           SUBJECT & SNIPPET
//         </th>

//         <th className={`${headerCellClasses} min-w-[180px]`}>
//           <button onClick={() => onSort("sentAt")} className={buttonClasses}>
//             SENT AT {renderSortIcon("sentAt")}
//           </button>
//         </th>

//         <th className={`${headerCellClasses} `}>
//           <button
//             onClick={() => onSort("recipientCount")}
//             className={buttonClasses}
//           >
//             RECIPIENT {renderSortIcon("recipientCount")}
//           </button>
//         </th>

//         <th className={`${headerCellClasses}`}>
//           <button>SENDER</button>
//         </th>

//         <th className={`${headerCellClasses}`}>ACTION</th>
//       </tr>
//     </thead>
//   );
// };

// const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
//   batches,
//   isLoading,
//   error,
//   currentPage,
//   totalPages,
//   deletingBatchId,
//   editingBatchId,
//   isUpdatingBatch,
//   onRefresh,
//   onEdit,
//   onDelete,
//   onPreviousPage,
//   onNextPage,
//   skeletonRowCount = 3,
//   onSort,
//   sortField,
//   sortDirection,
// }) => {
//   const numberOfColumns = 4;

//   const renderSkeleton = () => (
//     <div className="rounded-xl border overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full">
//           <TableHeaderComponent
//             onSort={onSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(skeletonRowCount)
//               .fill(0)
//               .map((_, i) => (
//                 <tr
//                   key={`skel-batch-${i}`}
//                   className="border-b dark:border-neutral-700"
//                 >
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td
//                         key={`skel-cell-batch-${i}-${j}`}
//                         className="px-6 py-4 h-[70px] whitespace-nowrap"
//                       >
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderError = () => (
//     <div className="mt-5 p-4 border bg-red-900/30 border-red-700 rounded-md flex items-start space-x-3">
//       <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
//       <div>
//         <h3 className="text-lg font-medium text-red-200">
//           Error Loading History
//         </h3>
//         <p className="text-sm text-red-300 mt-1">{error}</p>
//         <button
//           type="button"
//           onClick={onRefresh}
//           disabled={isLoading}
//           className={cn(
//             "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//             "h-9 px-3",
//             "text-red-300 hover:bg-red-800/50"
//           )}
//         >
//           <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
//         </button>
//       </div>
//     </div>
//   );

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const isActionDisabled =
//     isLoading || deletingBatchId !== null || isUpdatingBatch;

//   return (
//     <>
//       <div className="py-5">
//         <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
//           <div className="Broadcast-History">
//             <div className="flex items-center gap-3">
//               <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
//                 <FaBroadcastTower className="size-6 text-mainheading dark:text-primary" />
//               </div>
//               <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite dark:text-primary">
//                 Broadcast History
//               </h1>
//             </div>
//             <p className="text-subheadingWhite lg:text-lg">
//               Review and manage previously sent broadcast messages.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={isLoading}
//             className="flex items-center justify-center cursor-pointer gap-2 text-primary bg-primarybox hover:bg-secondarybox font-medium sm:px-8 sm:py-3 aspect-square sm:aspect-auto h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
//             title="Refresh history"
//           >
//             <RefreshCw className={cn("size-5", isLoading && "animate-spin")} />
//             {!isMobile && <span>Refresh</span>}
//           </button>
//         </div>

//         {isLoading ? (
//           renderSkeleton()
//         ) : error ? (
//           renderError()
//         ) : (
//           <>
//             <div className="rounded-xl border overflow-hidden">
//               <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-primarybox [&::-webkit-scrollbar-thumb]:bg-secondarybox">
//                 <table className="min-w-full overflow-hidden">
//                   <TableHeaderComponent
//                     onSort={onSort}
//                     sortField={sortField}
//                     sortDirection={sortDirection}
//                   />
//                   <tbody className="divide-y overflow-hidden">
//                     {batches.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={numberOfColumns}
//                           className="text-center space-y-3 w-full text-subheadingWhite"
//                         >
//                           <div className="flex justify-center items-center">
//                             <span className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//                               <ListChecks className="lg:size-8 size-6 mx-auto text-mainheadingWhite dark:text-primary" />
//                             </span>
//                           </div>

//                           <p className="lg:text-3xl text-2xl font-medium text-mainheadingWhite mt-1">
//                             No Past Broadcasts
//                           </p>

//                           <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                             It looks like there are no past broadcasts to
//                             display at the moment. Once a broadcast is sent, it
//                             will appear here.
//                           </p>
//                         </td>
//                       </tr>
//                     ) : (
//                       batches.map((batch, index) => {
//                         const isDeletingThis =
//                           deletingBatchId === batch.batchId;
//                         const isEditingThis =
//                           editingBatchId === batch.batchId && isUpdatingBatch;
//                         const rowActionDisabled =
//                           isActionDisabled || isDeletingThis || isEditingThis;

//                         return (
//                           <motion.tr
//                             key={batch.batchId}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.03 }}
//                           >
//                             <td className="px-4 py-4 max-w-sm whitespace-normal">
//                               <div className="flex flex-col">
//                                 <span
//                                   className="font-semibold text-mainheadingWhite truncate"
//                                   title={batch.subject}
//                                 >
//                                   {batch.subject || "N/A"}
//                                 </span>
//                                 <span
//                                   className="text-xs text-subheadingWhite/60 truncate"
//                                   title={batch.bodySnippet}
//                                 >
//                                   {batch.bodySnippet.length > 100
//                                     ? `${batch.bodySnippet.substring(0, 97)}...`
//                                     : batch.bodySnippet}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap">
//                               <div className="flex flex-col">
//                                 <span className="font-medium text-mainheadingWhite">
//                                   {formatDateToLocale(batch.sentAt)}
//                                 </span>
//                                 <span className="text-xs text-subheadingWhite/60">
//                                   {formatDistanceToNow(new Date(batch.sentAt), {
//                                     addSuffix: true,
//                                   })}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap">
//                               <span className="font-medium text-mainheadingWhite">
//                                 {batch.recipientCount}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap">
//                               <span className="font-medium text-mainheadingWhite">
//                                 {batch.sender}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4 whitespace-nowrap">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => onEdit(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Edit Batch"
//                                   title="Edit Batch"
//                                   className="bg-primary hover:bg-primaryhover gap-1.5 transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-mainheading  focus:outline-none flex items-center"
//                                 >
//                                   <Edit size={18} />
//                                   Edit
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => onDelete(batch)}
//                                   disabled={rowActionDisabled}
//                                   aria-label="Delete Batch"
//                                   title="Delete Batch"
//                                   className="bg-red-600 hover:bg-red-700 gap-1.5 text-white  transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center"
//                                 >
//                                   <Trash2 size={18} />
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </motion.tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {totalPages > 1 && (
//               <div className="mt-6 flex justify-between items-center px-1 py-3">
//                 <button
//                   type="button"
//                   onClick={onPreviousPage}
//                   disabled={currentPage <= 1 || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "bg-primarybox hover:bg-primaryboxdubal text-primary"
//                   )}
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={onNextPage}
//                   disabled={currentPage >= totalPages || isLoading}
//                   className={cn(
//                     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//                     "h-9 px-4",
//                     "border border-gray-300 dark:border-neutral-700 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                   )}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default BroadcastHistoryTable;

// frontend/src/app/components/message/send/BroadcastHistoryTable.tsx
import React, { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Loader2,
  AlertCircle,
  Trash2,
  RefreshCw,
  ListChecks,
  Edit,
  ArrowDownUp,
  ArrowUpDown,
} from "lucide-react";
import { BroadcastBatchInfo } from "../../../../services/admin/inbox";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FaBroadcastTower } from "react-icons/fa";

// Import the Pagination component
import Pagination from "../../../components/Pagination"; // Adjust path if necessary

// "subject" removed from sortable fields
export type BroadcastSortField = "sentAt" | "recipientCount";

const formatDateToLocale = (dateString: string) => {
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

interface BroadcastHistoryTableProps {
  batches: BroadcastBatchInfo[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  deletingBatchId: string | null;
  editingBatchId: string | null;
  isUpdatingBatch: boolean;
  onRefresh: () => void;
  onEdit: (batch: BroadcastBatchInfo) => void;
  onDelete: (batch: BroadcastBatchInfo) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  paginate: (pageNumber: number) => void; // ADD THIS LINE
  skeletonRowCount?: number;
  onSort: (field: BroadcastSortField) => void;
  sortField: BroadcastSortField | null;
  sortDirection: "asc" | "desc";
}

interface TableHeaderComponentProps {
  onSort: (field: BroadcastSortField) => void;
  sortField: BroadcastSortField | null;
  sortDirection: "asc" | "desc";
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({
  onSort,
  sortField,
  sortDirection,
}) => {
  const headerCellClasses =
    "px-4 py-4 text-left font-medium text-mainheadingWhite tracking-wider whitespace-nowrap";
  const buttonClasses =
    "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

  const renderSortIcon = (field: BroadcastSortField) => {
    // Only show active icon (with primary color) if this field IS the actively sorted one
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ArrowUpDown
          size={18}
          className="ml-1.5 text-primary transition-all duration-75 ease-linear"
        />
      ) : (
        <ArrowDownUp
          size={18}
          className="ml-1.5 text-primary transition-all duration-75 ease-linear"
        />
      );
    }
    // Otherwise, show the default hover-only icon
    return (
      <ArrowUpDown
        size={18}
        className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear"
      />
    );
  };

  return (
    <thead className="bg-primarybox">
      <tr className="broadcast-head">
        {/* Subject & Snippet - No longer sortable */}
        <th className={`${headerCellClasses} min-w-[250px]`}>
          SUBJECT & SNIPPET
        </th>

        <th className={`${headerCellClasses} min-w-[180px]`}>
          <button onClick={() => onSort("sentAt")} className={buttonClasses}>
            SENT AT {renderSortIcon("sentAt")}
          </button>
        </th>

        <th className={`${headerCellClasses} `}>
          <button
            onClick={() => onSort("recipientCount")}
            className={buttonClasses}
          >
            RECIPIENT {renderSortIcon("recipientCount")}
          </button>
        </th>

        <th className={`${headerCellClasses}`}>
          <button>SENDER</button>
        </th>

        <th className={`${headerCellClasses}`}>ACTION</th>
      </tr>
    </thead>
  );
};

const BroadcastHistoryTable: React.FC<BroadcastHistoryTableProps> = ({
  batches,
  isLoading,
  error,
  currentPage,
  totalPages,
  deletingBatchId,
  editingBatchId,
  isUpdatingBatch,
  onRefresh,
  onEdit,
  onDelete,
  onPreviousPage,
  onNextPage,
  paginate, // DESTRUCTURE THIS PROP
  skeletonRowCount = 3,
  onSort,
  sortField,
  sortDirection,
}) => {
  const numberOfColumns = 5; // Updated this to 5 as there are 5 <th> elements in TableHeaderComponent

  const renderSkeleton = () => (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full  [&::-webkit-scrollbar-thumb]:rounded-full  [&::-webkit-scrollbar-track]:bg-primarybox [&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <table className="min-w-full">
          <TableHeaderComponent
            onSort={onSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody>
            {Array(skeletonRowCount)
              .fill(0)
              .map((_, i) => (
                <tr key={`skel-batch-${i}`} className="border-b">
                  {Array(numberOfColumns) // Use numberOfColumns here
                    .fill(0)
                    .map((_, j) => (
                      <td
                        key={`skel-cell-batch-${i}-${j}`}
                        className="px-6 py-4 h-[70px] whitespace-nowrap"
                      >
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="mt-5 p-4 border bg-red-900/30 border-red-700 rounded-md flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-lg font-medium text-red-200">
          Error Loading History
        </h3>
        <p className="text-sm text-red-300 mt-1">{error}</p>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className={cn(
            "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
            "h-9 px-3",
            "text-red-300 hover:bg-red-800/50"
          )}
        >
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
        </button>
      </div>
    </div>
  );

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isActionDisabled =
    isLoading || deletingBatchId !== null || isUpdatingBatch;

  return (
    <>
      <div className="py-5">
        <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
          <div className="Broadcast-History">
            <div className="flex items-center gap-3">
              <div className="p-2.5 shrink-0 bg-primary rounded-full flex items-center justify-center">
                <FaBroadcastTower className="size-6 text-mainheading dark:text-primary" />
              </div>
              <h1 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
                Broadcast History
              </h1>
            </div>
            <p className="mt-2 text-subheadingWhite text-base lg:text-lg max-w-5xl">
              track of all your past communications with the Broadcast History
              feature. Easily review previously sent broadcast messages,
              including their content, delivery time, and recipient reach
            </p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center justify-center cursor-pointer gap-2 text-primary bg-primarybox hover:bg-secondarybox font-medium sm:px-8 sm:py-3 aspect-square sm:aspect-auto h-12.5 sm:w-auto w-12.5 rounded-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
            title="Refresh history"
          >
            <RefreshCw className={cn("size-5", isLoading && "animate-spin")} />
            {!isMobile && <span>Refresh</span>}
          </button>
        </div>

        {isLoading ? (
          renderSkeleton()
        ) : error ? (
          renderError()
        ) : (
          <>
            <div className="rounded-xl border overflow-hidden">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-primarybox [&::-webkit-scrollbar-thumb]:bg-secondarybox">
                <table className="min-w-full overflow-hidden">
                  <TableHeaderComponent
                    onSort={onSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                  <tbody className="divide-y overflow-hidden">
                    {batches.length === 0 ? (
                      <tr>
                        <td
                          colSpan={numberOfColumns} // Use numberOfColumns here
                          className="text-center space-y-3 w-full text-subheadingWhite"
                        >
                          <div className="flex justify-center items-center">
                            <span className="lg:size-12 size-10 flex items-center justify-center bg-primary rounded-full">
                              <ListChecks className="lg:size-6 size-4 mx-auto text-mainheading " />
                            </span>
                          </div>

                          <p className="lg:text-3xl text-2xl font-medium text-mainheadingWhite">
                            No Past Broadcasts
                          </p>

                          <p className="text-subheadingWhite max-w-lg mx-auto">
                            It looks like there are no past broadcasts to
                            display at the moment. Once a broadcast is sent, it
                            will appear here.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      batches.map((batch, index) => {
                        const isDeletingThis =
                          deletingBatchId === batch.batchId;
                        const isEditingThis =
                          editingBatchId === batch.batchId && isUpdatingBatch;
                        const rowActionDisabled =
                          isActionDisabled || isDeletingThis || isEditingThis;

                        return (
                          <motion.tr
                            key={batch.batchId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <td className="px-4 py-4 max-w-sm whitespace-normal">
                              <div className="flex flex-col">
                                <span
                                  className="font-semibold text-mainheadingWhite truncate"
                                  title={batch.subject}
                                >
                                  {batch.subject || "N/A"}
                                </span>
                                <span
                                  className="text-xs text-subheadingWhite/60 truncate"
                                  title={batch.bodySnippet}
                                >
                                  {batch.bodySnippet.length > 100
                                    ? `${batch.bodySnippet.substring(0, 97)}...`
                                    : batch.bodySnippet}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium text-mainheadingWhite">
                                  {formatDateToLocale(batch.sentAt)}
                                </span>
                                <span className="text-xs text-subheadingWhite/60">
                                  {formatDistanceToNow(new Date(batch.sentAt), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="font-medium text-mainheadingWhite">
                                {batch.recipientCount}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="font-medium text-mainheadingWhite">
                                {batch.sender}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => onEdit(batch)}
                                  disabled={rowActionDisabled}
                                  aria-label="Edit Batch"
                                  title="Edit Batch"
                                  className="bg-primarybox hover:bg-secondarybox gap-2 transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-primary focus:outline-none flex items-center"
                                >
                                  <Edit size={18} />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onDelete(batch)}
                                  disabled={rowActionDisabled}
                                  aria-label="Delete Batch"
                                  title="Delete Batch"
                                  className="bg-red-500 hover:bg-red-600 gap-2 text-white  transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center"
                                >
                                  <Trash2 size={18} />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Replace old pagination with the new Pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              goToPreviousPage={onPreviousPage}
              goToNextPage={onNextPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default BroadcastHistoryTable;
