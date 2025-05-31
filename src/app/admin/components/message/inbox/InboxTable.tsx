// // frontend/src/app/admin/components/inbox/InboxTable.tsx
// 'use client';
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns';
// import { Pencil, Trash2, RefreshCw, Circle, CheckCircle2, MoreHorizontal } from 'lucide-react';
// import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path
// import { cn } from '@/lib/utils'; // Assuming you have a cn utility

// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return format(date, "MMM d, yyyy HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// interface InboxTableProps {
//   messages: AdminInboxMessage[];
//   loading: boolean;
//   onEdit: (message: AdminInboxMessage) => void;
//   onDelete: (message: AdminInboxMessage) => void;
//   deletingId: string | null;
//   updatingId: string | null;
//   itemsPerPage: number;
// }

// const InboxTable: React.FC<InboxTableProps> = ({
//   messages,
//   loading,
//   onEdit,
//   onDelete,
//   deletingId,
//   updatingId,
//   itemsPerPage,
// }) => {
//   const getStatusBadge = (isRead: boolean) => {
//     const baseClasses = "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize w-[90px]";
//     if (isRead) {
//       return (
//         <span className={cn(baseClasses, "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200")}>
//           <CheckCircle2 size={14} className="mr-1" /> Read
//         </span>
//       );
//     }
//     return (
//       <span className={cn(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200")}>
//         <Circle size={14} className="mr-1 fill-current" /> Unread
//       </span>
//     );
//   };

//   if (loading && messages.length === 0) {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//           <thead className="bg-gray-50 dark:bg-secondarybox">
//             <tr>
//               {['Status', 'Recipient', 'Sender', 'Subject', 'Sent At', 'Actions'].map((header) => (
//                 <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-primarybox divide-y divide-gray-200 dark:divide-gray-700">
//             {[...Array(itemsPerPage)].map((_, i) => (
//               <tr key={`skeleton-${i}`}>
//                 {[...Array(6)].map((_, j) => (
//                   <td key={`skeleton-cell-${i}-${j}`} className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   if (!loading && messages.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 dark:text-gray-400">No inbox messages found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto shadow border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//         <thead className="bg-gray-50 dark:bg-secondarybox">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recipient</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sender</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sent At</th>
//             <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white dark:bg-primarybox divide-y divide-gray-200 dark:divide-gray-700">
//           {messages.map((msg) => {
//             const isCurrentDeleting = deletingId === msg._id;
//             const isCurrentUpdating = updatingId === msg._id;
//             const isDisabled = isCurrentDeleting || isCurrentUpdating;

//             return (
//               <tr key={msg._id} className={cn(!msg.isRead && "bg-blue-50 dark:bg-blue-900/10", "hover:bg-gray-50 dark:hover:bg-secondarybox/50")}>
//                 <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(msg.isRead)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]" title={msg.userId?.email ?? 'N/A'}>
//                     {msg.userId?.fullName || msg.userId?.email || <span className="italic text-gray-500 dark:text-gray-400">Unknown User</span>}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     ID: {msg.userId?._id?.slice(-6) ?? 'N/A'}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 truncate max-w-[200px]">{msg.sender}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white truncate max-w-[250px]">{msg.subject}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900 dark:text-white">{formatDate(msg.sentAt)}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <div className="flex items-center justify-end space-x-2">
//                     {isDisabled ? (
//                        <RefreshCw className="h-5 w-5 text-gray-400 dark:text-gray-500 animate-spin" />
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => onEdit(msg)}
//                           disabled={isDisabled}
//                           title="Edit Message"
//                           className="p-1.5 text-primary hover:text-primaryhover dark:text-blue-400 dark:hover:text-blue-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary disabled:opacity-50"
//                         >
//                           <Pencil size={18} />
//                         </button>
//                         <button
//                           onClick={() => onDelete(msg)}
//                           disabled={isDisabled}
//                           title="Delete Message"
//                           className="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InboxTable;

// // frontend/src/app/admin/components/inbox/InboxTable.tsx
// 'use client';
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns';
// import { Pencil, Trash2, RefreshCw, Circle, CheckCircle2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path
// import InboxTableHeader, { InboxSortField } from '../inbox/InboxTableHeader'; // Import new header
// import { cn } from '@/lib/utils'; // Assuming you have a cn utility

// const formatDateForTable = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     // Format consistent with PaymentTable
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return date.toLocaleString(undefined, options);
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// interface InboxTableProps {
//   messages: AdminInboxMessage[];
//   loading: boolean; // Renamed from loadingMessages for clarity if used standalone
//   onEdit: (message: AdminInboxMessage) => void;
//   onDelete: (message: AdminInboxMessage) => void;
//   deletingId: string | null;
//   updatingId: string | null;
//   itemsPerPage: number;
//   // Sorting props to be passed from parent page
//   toggleSort: (field: InboxSortField) => void;
//   sortField: InboxSortField | null;
//   sortDirection: 'asc' | 'desc';
// }

// const InboxTable: React.FC<InboxTableProps> = ({
//   messages,
//   loading,
//   onEdit,
//   onDelete,
//   deletingId,
//   updatingId,
//   itemsPerPage,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const getStatusBadge = (isRead: boolean) => {
//     // Using similar styling pattern as PaymentTable status badge
//     const baseClasses = "inline-flex items-center justify-center px-3 py-1 text-xs min-w-[90px] font-medium rounded-full capitalize";
//     if (isRead) {
//       return (
//         <span className={cn(baseClasses, "bg-gray-100 text-gray-700 dark:bg-gray-600/30 dark:text-gray-300")}>
//           <CheckCircle2 size={14} className="mr-1.5" /> Read
//         </span>
//       );
//     }
//     return (
//       <span className={cn(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-500/30 dark:text-blue-300")}>
//         <Circle size={14} className="mr-1.5 fill-current" /> Unread
//       </span>
//     );
//   };

//   const numberOfColumns = 6; // Status, Recipient, Sender, Subject, Sent At, Actions

//   if (loading && messages.length === 0) { // Show skeleton only when loading and no data yet
//     return (
//       <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//         <table className="min-w-full">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
//             {Array(itemsPerPage > 0 ? itemsPerPage : 10) // Use itemsPerPage for skeleton rows
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={`skeleton-row-${i}`} className="bg-white dark:bg-primarybox">
//                   {Array(numberOfColumns).fill(0).map((_, j) => (
//                     <td key={`skeleton-cell-${i}-${j}`} className="px-4 py-3 whitespace-nowrap">
//                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
//             {messages.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={numberOfColumns}
//                   className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
//                 >
//                   No messages found.
//                 </td>
//               </tr>
//             ) : (
//               messages.map((msg, index) => {
//                 const isCurrentDeleting = deletingId === msg._id;
//                 const isCurrentUpdating = updatingId === msg._id;
//                 const isDisabled = isCurrentDeleting || isCurrentUpdating;

//                 return (
//                   <motion.tr
//                     key={msg._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className={cn(
//                         "bg-white dark:bg-primarybox hover:bg-lightgray dark:hover:bg-secondarybox transition-all duration-75 ease-linear",
//                         !msg.isRead && "bg-blue-50/50 dark:bg-blue-900/20" // Subtle indicator for unread
//                     )}
//                   >
//                     <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(msg.isRead)}</td>
//                     <td className="px-4 py-3">
//                       <div className="flex flex-col">
//                         <span className="font-medium text-sm capitalize text-neutral-900 dark:text-white truncate max-w-[180px]" title={msg.userId?.fullName || msg.userId?.email || ''}>
//                           {msg.userId?.fullName || <span className="italic">User Not Set</span>}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-300 truncate max-w-[180px]" title={msg.userId?.email || ''}>
//                           {msg.userId?.email || "N/A"}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 truncate max-w-[180px]" title={msg.sender}>
//                         {msg.sender}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white truncate max-w-[220px]" title={msg.subject}>
//                         {msg.subject}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="text-sm text-neutral-900 dark:text-white">{formatDateForTable(msg.sentAt)}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {msg.sentAt ? formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true }) : 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {isDisabled ? (
//                            <RefreshCw className="h-5 w-5 text-gray-400 dark:text-gray-500 animate-spin" />
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => onEdit(msg)}
//                               disabled={isDisabled}
//                               title="Edit Message"
//                               className="p-1.5 text-primary hover:text-primaryhover dark:text-blue-400 dark:hover:text-blue-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-primary disabled:opacity-50 transition-colors"
//                             >
//                               <Pencil size={16} />
//                             </button>
//                             <button
//                               onClick={() => onDelete(msg)}
//                               disabled={isDisabled}
//                               title="Delete Message"
//                               className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-red-500 disabled:opacity-50 transition-colors"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               }))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
// };

// export default InboxTable;

//
// // frontend/src/app/admin/components/inbox/InboxTable.tsx
// 'use client';
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns';
// import { motion } from 'framer-motion';
// import { Pencil, Trash2, RefreshCw, Circle, CheckCircle2 } from 'lucide-react';
// import { Skeleton } from '@/components/ui/skeleton'; // Using Shadcn Skeleton as in PaymentTable
// import InboxTableHeader, { InboxSortField } from './InboxTableHeader'; // Import new header
// import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path
// import { cn } from '@/lib/utils'; // Assuming you have a cn utility

// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return format(date, "MMM d, yyyy HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// interface InboxTableProps {
//   messages: AdminInboxMessage[];
//   loading: boolean;
//   onEdit: (message: AdminInboxMessage) => void;
//   onDelete: (message: AdminInboxMessage) => void;
//   deletingId: string | null;
//   updatingId: string | null;
//   itemsPerPage: number;
//   // Props for sorting, to be passed to InboxTableHeader
//   toggleSort: (field: InboxSortField) => void;
//   sortField: InboxSortField | null;
//   sortDirection: 'asc' | 'desc';
// }

// const InboxTable: React.FC<InboxTableProps> = ({
//   messages,
//   loading,
//   onEdit,
//   onDelete,
//   deletingId,
//   updatingId,
//   itemsPerPage,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const getStatusBadge = (isRead: boolean) => {
//     const baseClasses = "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium capitalize w-[90px]"; // Adjusted padding and width slightly
//     if (isRead) {
//       return (
//         <span className={cn(baseClasses, "bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200")}>
//           <CheckCircle2 size={14} className="mr-1.5" /> Read
//         </span>
//       );
//     }
//     return (
//       <span className={cn(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-600/30 dark:text-blue-300")}>
//         <Circle size={14} className="mr-1.5 fill-current" /> Unread
//       </span>
//     );
//   };

//   // Define the number of columns for consistency in skeleton
//   const numberOfColumns = 6; // Status, Recipient, Sender, Subject, Sent At, Actions

//   if (loading && messages.length === 0) { // Show skeleton only when loading and no messages yet
//     return (
//       <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//         <table className="min-w-full">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(itemsPerPage)
//               .fill(0)
//               .map((_, i) => (
//                 <tr key={`skeleton-inbox-${i}`} className="border-b ">
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td key={j} className="px-4 py-3 whitespace-nowrap">
//                         <Skeleton className="h-4 w-full" />{" "}
//                         {/* Use full width skeleton */}
//                       </td>
//                     ))}
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
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {messages.length === 0 && !loading ? ( // Show "No messages" only if not loading and no messages
//               <tr>
//                 <td
//                   colSpan={numberOfColumns}
//                   className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//                 >
//                   No messages found.
//                 </td>
//               </tr>
//             ) : (
//               messages.map((msg, index) => {
//                 const isCurrentDeleting = deletingId === msg._id;
//                 const isCurrentUpdating = updatingId === msg._id;
//                 const isDisabled = isCurrentDeleting || isCurrentUpdating;

//                 return (
//                   <motion.tr
//                     key={msg._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <td className="px-6 py-3 whitespace-nowrap">{getStatusBadge(msg.isRead)}</td>
//                     <td className="px-6 py-3 whitespace-nowrap">
//                       <div className="font-medium text-neutral-900 dark:text-white truncate max-w-[200px]" title={msg.userId?.email ?? 'N/A'}>
//                         {msg.userId?.fullName || msg.userId?.email || <span className="italic text-gray-500 dark:text-gray-400">Unknown User</span>}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-300">
//                         ID: {msg.userId?._id?.slice(-6) ?? 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[200px]">{msg.sender}</td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[250px]">{msg.subject}</td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap">
//                       <div className="text-neutral-900 dark:text-white">{formatDate(msg.sentAt)}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {msg.sentAt ? formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true }) : 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 whitespace-nowrap text-right font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         {isDisabled ? (
//                           <RefreshCw className="h-5 w-5 text-gray-300 dark:text-gray-500 animate-spin" />
//                         ) : (
//                           <>
//                             <motion.button
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => onEdit(msg)}
//                               disabled={isDisabled}
//                               title="Edit Message"
//                               className="flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-all duration-100 ease-linear focus:outline-none"
//                             >
//                               <Pencil size={16} />
//                             </motion.button>
//                             <motion.button
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => onDelete(msg)}
//                               disabled={isDisabled}
//                               title="Delete Message"
//                               className="flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-all duration-100 ease-linear focus:outline-none"
//                             >
//                               <Trash2 size={16} />
//                             </motion.button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               }))}
//             </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InboxTable;

// // frontend/src/app/admin/components/inbox/InboxTable.tsx
// 'use client';
// import React from 'react';
// import { format, formatDistanceToNow } from 'date-fns';
// import { motion } from 'framer-motion';
// import { Pencil, Trash2, RefreshCw, Circle, CheckCircle2 } from 'lucide-react';
// import { Skeleton } from '@/components/ui/skeleton';
// import InboxTableHeader, { InboxSortField } from './InboxTableHeader';
// import type { AdminInboxMessage } from '../../../../services/admin/inbox';
// import { cn } from '@/lib/utils';

// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput || isNaN(new Date(dateInput).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateInput).toLocaleString(undefined, options);
// };

// interface InboxTableProps {
//   messages: AdminInboxMessage[];
//   loading: boolean;
//   onEdit: (message: AdminInboxMessage) => void;
//   onDelete: (message: AdminInboxMessage) => void;
//   deletingId: string | null;
//   updatingId: string | null;
//   itemsPerPage: number;
//   toggleSort: (field: InboxSortField) => void;
//   sortField: InboxSortField | null;
//   sortDirection: 'asc' | 'desc';
// }

// const InboxTable: React.FC<InboxTableProps> = ({
//   messages,
//   loading,
//   onEdit,
//   onDelete,
//   deletingId,
//   updatingId,
//   itemsPerPage,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const getStatusBadge = (isRead: boolean) => {
//     const baseClasses = "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium capitalize w-[90px]";
//     if (isRead) {
//       return (
//         <span className={cn(baseClasses, "bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200")}>
//           <CheckCircle2 size={14} className="mr-1.5" /> Read
//         </span>
//       );
//     }
//     return (
//       <span className={cn(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-600/30 dark:text-blue-300")}>
//         <Circle size={14} className="mr-1.5 fill-current" /> Unread
//       </span>
//     );
//   };

//   const numberOfColumns = 6;

//   if (loading) {
//     return (
//       <div className="rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
//         <table className="min-w-full">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(itemsPerPage)
//               .fill(0)
//               .map((_, i) => (
//                 <tr
//                   key={`skeleton-inbox-${i}`}
//                   className="border-b border-gray-200 dark:border-neutral-700/50"
//                 >
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td key={j} className="px-4 py-3 whitespace-nowrap">
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
//       <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//         <table className="min-w-full overflow-hidden">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {messages.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={numberOfColumns}
//                   className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//                 >
//                   No messages found.
//                 </td>
//               </tr>
//             ) : (
//               messages.map((msg, index) => {
//                 const isCurrentDeleting = deletingId === msg._id;
//                 const isCurrentUpdating = updatingId === msg._id;
//                 const isDisabled = isCurrentDeleting || isCurrentUpdating;

//                 return (
//                   <motion.tr
//                     key={msg._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}

//                   >
//                     <td className="px-6 py-3 whitespace-nowrap">{getStatusBadge(msg.isRead)}</td>
//                     <td className="px-6 py-3 whitespace-nowrap">
//                       <div className="font-medium text-neutral-900 dark:text-white truncate max-w-[200px]" title={msg.userId?.email ?? 'N/A'}>
//                         {msg.userId?.fullName || msg.userId?.email || <span className="italic text-gray-500 dark:text-gray-300">Unknown User</span>}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-300">
//                         ID: {msg.userId?._id?.slice(-6) ?? 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[200px]">{msg.sender}</td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[250px]">{msg.subject}</td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap">
//                       <div className="text-neutral-900 dark:text-white">{formatDate(msg.sentAt)}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {msg.sentAt ? formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true }) : 'N/A'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 whitespace-nowrap text-right font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         {!isDisabled ? (
//                           <RefreshCw className="h-5 w-5 text-gray-300 dark:text-gray-500 animate-spin" />
//                         ) : (
//                           <>
//                             <motion.button
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => onEdit(msg)}
//                               disabled={isDisabled}
//                               title="Edit Message"
//                               className="flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-all duration-100 ease-linear focus:outline-none"
//                             >
//                               <Pencil size={16} />
//                             </motion.button>
//                             <motion.button
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => onDelete(msg)}
//                               disabled={isDisabled}
//                               title="Delete Message"
//                               className="flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-all duration-100 ease-linear focus:outline-none"
//                             >
//                               <Trash2 size={16} />
//                             </motion.button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               }))}
//             </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InboxTable;

// // frontend/src/app/admin/components/inbox/InboxTable.tsx
// "use client";
// import React from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import { motion } from "framer-motion";
// import { Pencil, Trash2, Circle, CircleCheckBig, Edit } from "lucide-react"; // Removed RefreshCw from imports
// import { Skeleton } from "@/components/ui/skeleton";
// import InboxTableHeader, { InboxSortField } from "./InboxTableHeader";
// import type { AdminInboxMessage } from "../../../../services/admin/inbox";
// import { cn } from "@/lib/utils";

// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput || isNaN(new Date(dateInput).getTime())) {
//     return "Invalid Date";
//   }
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateInput).toLocaleString(undefined, options);
// };

// interface InboxTableProps {
//   messages: AdminInboxMessage[];
//   loading: boolean;
//   onEdit: (message: AdminInboxMessage) => void;
//   onDelete: (message: AdminInboxMessage) => void;
//   deletingId: string | null; // Prop remains, but not used for row rendering logic anymore
//   updatingId: string | null; // Prop remains, but not used for row rendering logic anymore
//   itemsPerPage: number;
//   toggleSort: (field: InboxSortField) => void;
//   sortField: InboxSortField | null;
//   sortDirection: "asc" | "desc";
// }

// const InboxTable: React.FC<InboxTableProps> = ({
//   messages,
//   loading,
//   onEdit,
//   onDelete,
//   deletingId, // Prop received
//   updatingId, // Prop received
//   itemsPerPage,
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   const getStatusBadge = (isRead: boolean) => {
//     const baseClasses =
//       "inline-flex items-center justify-center px-4 py-1 rounded-full font-medium capitalize w-28";
//     if (isRead) {
//       return (
//         <span
//           className={cn(
//             baseClasses,
//             "text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400"
//           )}
//         >
//           Read
//         </span>
//       );
//     }
//     return (
//       <span
//         className={cn(
//           baseClasses,
//           "text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400"
//         )}
//       >
//         Unread
//       </span>
//     );
//   };

//   const numberOfColumns = 6;

//   if (loading) {
//     return (
//       <div className="rounded-xl border overflow-hidden">
//         <table className="min-w-full">
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody>
//             {Array(itemsPerPage)
//               .fill(0)
//               .map((_, i) => (
//                 <tr
//                   key={`skeleton-inbox-${i}`}
//                   className="border-b"
//                 >
//                   {Array(numberOfColumns)
//                     .fill(0)
//                     .map((_, j) => (
//                       <td key={j} className="px-4 py-3 whitespace-nowrap">
//                         <Skeleton className="h-4 w-full" />
//                       </td>
//                     ))}
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
//           <InboxTableHeader
//             toggleSort={toggleSort}
//             sortField={sortField}
//             sortDirection={sortDirection}
//           />
//           <tbody className="divide-y overflow-hidden">
//             {messages.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={numberOfColumns}
//                   className="px-6 py-10 text-center text-gray-500 dark:text-gray-300"
//                 >
//                   No messages found.
//                 </td>
//               </tr>
//             ) : (
//               messages.map((msg, index) => {
//                 // const isCurrentDeleting = deletingId === msg._id; // No longer needed for this rendering
//                 // const isCurrentUpdating = updatingId === msg._id; // No longer needed for this rendering
//                 // const showSpinnerForRow = isCurrentDeleting || isCurrentUpdating; // No longer needed for this rendering

//                 return (
//                   <motion.tr
//                     key={msg._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <td className="px-6 py-3 whitespace-nowrap">
//                       {getStatusBadge(msg.isRead)}
//                     </td>
//                     <td className="px-6 py-3 whitespace-nowrap">
//                       <div
//                         className="font-medium text-neutral-900 dark:text-white truncate max-w-[200px]"
//                         title={msg.userId?.email ?? "N/A"}
//                       >
//                         {msg.userId?.fullName || msg.userId?.email || (
//                           <span className="italic text-gray-500 dark:text-gray-300">
//                             Unknown User
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-300">
//                         ID: {msg.userId?._id?.slice(-6) ?? "N/A"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[200px]">
//                       {msg.sender}
//                     </td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap text-neutral-900 dark:text-white truncate max-w-[250px]">
//                       {msg.subject}
//                     </td>
//                     <td className="px-6 py-3 font-medium whitespace-nowrap">
//                       <div className="text-neutral-900 dark:text-white">
//                         {formatDate(msg.sentAt)}
//                       </div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {msg.sentAt
//                           ? formatDistanceToNow(new Date(msg.sentAt), {
//                               addSuffix: true,
//                             })
//                           : "N/A"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-3 whitespace-nowrap text-right font-medium">
//                       <div className="flex items-center justify-end gap-3">
//                         <button
//                           onClick={() => onEdit(msg)}
//                           title="Edit Message"
//                           className="bg-primary hover:bg-primaryhover gap-1.5 dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                         >
//                           <Edit size={18} />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => onDelete(msg)}
//                           title="Delete Message"
//                           className="bg-red-600 hover:bg-red-700 text-white  transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center"
//                         >
//                           <Trash2 size={18} className="mr-1" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InboxTable;

// frontend/src/app/admin/components/inbox/InboxTable.tsx
"use client";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Circle,
  CircleCheckBig,
  Edit,
  ListChecks,
} from "lucide-react"; // Removed RefreshCw from imports
import { Skeleton } from "@/components/ui/skeleton";
import InboxTableHeader, { InboxSortField } from "./InboxTableHeader";
import type { AdminInboxMessage } from "../../../../services/admin/inbox";
import { cn } from "@/lib/utils";

const formatDate = (dateInput?: string | Date | null): string => {
  if (!dateInput || isNaN(new Date(dateInput).getTime())) {
    return "Invalid Date";
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateInput).toLocaleString(undefined, options);
};

interface InboxTableProps {
  messages: AdminInboxMessage[];
  loading: boolean;
  onEdit: (message: AdminInboxMessage) => void;
  onDelete: (message: AdminInboxMessage) => void;
  deletingId: string | null; // Prop remains, but not used for row rendering logic anymore
  updatingId: string | null; // Prop remains, but not used for row rendering logic anymore
  itemsPerPage: number;
  toggleSort: (field: InboxSortField) => void;
  sortField: InboxSortField | null;
  sortDirection: "asc" | "desc";
}

const InboxTable: React.FC<InboxTableProps> = ({
  messages,
  loading,
  onEdit,
  onDelete,
  deletingId, // Prop received
  updatingId, // Prop received
  itemsPerPage,
  toggleSort,
  sortField,
  sortDirection,
}) => {
  const getStatusBadge = (isRead: boolean) => {
    const baseClasses =
      "inline-flex items-center justify-center px-4 py-1 rounded-full font-medium capitalize w-28";
    if (isRead) {
      return (
        <span
          className={cn(
            baseClasses,
            "bg-gray-600/20 text-gray-400"
          )}
        >
          Read
        </span>
      );
    }
    return (
      <span
        className={cn(
          baseClasses,
          "bg-blue-600/20 text-blue-400"
        )}
      >
        Unread
      </span>
    );
  };

  const numberOfColumns = 6;

  if (loading) {
    return (
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-primarybox [&::-webkit-scrollbar-thumb]:bg-secondarybox">
          <table className="min-w-full">
            <InboxTableHeader
              toggleSort={toggleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <tbody>
              {Array(itemsPerPage)
                .fill(0)
                .map((_, i) => (
                  <tr key={`skeleton-inbox-${i}`} className="border-b">
                    {Array(numberOfColumns)
                      .fill(10)
                      .map((_, j) => (
                        <td
                          key={j}
                          className="px-4 py-4 h-[70px] whitespace-nowrap"
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
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-primarybox [&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <table className="min-w-full overflow-hidden">
          <InboxTableHeader
            toggleSort={toggleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody className="divide-y overflow-hidden">
            {messages.length === 0 ? (
              <tr>
                <td
                  colSpan={numberOfColumns}
                  className="text-center space-y-3 w-full text-mainheadingWhite"
                >
                  <div className="flex justify-center items-center">
                    <span className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
                      <ListChecks className="lg:size-8 size-6 mx-auto text-mainheadingWhite" />
                    </span>
                  </div>

                  <h1 className="lg:text-3xl text-2xl font-medium text-mainheadingWhite mt-1">
                    No messages found.
                  </h1>

                  <p className="text-subheadingWhite max-w-lg mx-auto">
                    There are currently no past messages in your inbox.
                    Please check back later for updates and announcements
                  </p>
                </td>
              </tr>
            ) : (
              messages.map((msg, index) => {
                // const isCurrentDeleting = deletingId === msg._id; // No longer needed for this rendering
                // const isCurrentUpdating = updatingId === msg._id; // No longer needed for this rendering
                // const showSpinnerForRow = isCurrentDeleting || isCurrentUpdating; // No longer needed for this rendering

                return (
                  <motion.tr
                    key={msg._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {getStatusBadge(msg.isRead)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div
                        className="font-medium text-mainheadingWhite truncate max-w-[200px]"
                        title={msg.userId?.email ?? "N/A"}
                      >
                        {msg.userId?.fullName || msg.userId?.email || (
                          <span className="italic text-subheadingWhite/60">
                            Unknown User
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-subheadingWhite/60">
                        ID: {msg.userId?._id?.slice(-6) ?? "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-mainheadingWhite truncate max-w-[200px]">
                      {msg.sender}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-mainheadingWhite truncate max-w-[250px]">
                      {msg.subject}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      <div className="text-mainheadingWhite">
                        {formatDate(msg.sentAt)}
                      </div>
                      <div className="text-xs text-subheadingWhite/60">
                        {msg.sentAt
                          ? formatDistanceToNow(new Date(msg.sentAt), {
                              addSuffix: true,
                            })
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => onEdit(msg)}
                          title="Edit Message"
                          className="bg-primary hover:bg-primaryhover gap-1.5 transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-mainheading dark:text-primary focus:outline-none flex items-center"
                        >
                          <Edit size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(msg)}
                          title="Delete Message"
                          className="bg-red-600 hover:bg-red-700 text-white  transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium focus:outline-none flex items-center"
                        >
                          <Trash2 size={18} className="mr-1" />
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
  );
};

export default InboxTable;
