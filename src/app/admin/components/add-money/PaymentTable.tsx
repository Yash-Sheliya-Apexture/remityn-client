// // components/admin/payments/PaymentTable.tsx
// 'use client';
// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Edit, Copy } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";
// import PaymentTableHeader from './PaymentTableHeader';
// import { useCopyToClipboard } from './useCopyToClipboard';

// interface PaymentTableProps {
//     filteredPayments: any[]; // Replace 'any' with a more specific type if possible
//     loadingPayments: boolean;
//     getStatusColor: (status: string) => string;
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
//     handleEditPayment: (payment: any) => void; // Replace 'any' with a more specific type if possible
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({
//     filteredPayments,
//     loadingPayments,
//     getStatusColor,
//     toggleSort,
//     sortField,
//     sortDirection,
//     handleEditPayment,
// }) => {
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//     if (loadingPayments) {
//         return (
//             <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
//                 <table className="min-w-full">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody>
//                         {Array(5).fill(0).map((_, i) => (
//                             <tr key={i} className="hover:bg-gray-50">
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (
//         <div
//             className="rounded-xl border overflow-hidden"
//         >
//             <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody className="divide-y ">
//                         {filteredPayments.length === 0 ? (
//                             <tr>
//                                 <td colSpan="7" className="px-4 py-10 text-center text-gray-500">
//                                     No payments found matching your filters.
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredPayments.map((payment, index) => (
//                                 <motion.tr
//                                     key={payment._id}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                 >
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         <div className="flex flex-col">
//                                             <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
//                                             <span className="text-sm text-gray-500 dark:text-gray-300">{payment.user?.email || 'N/A'}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                                         {payment.amountToAdd}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                                         {payment.payInCurrency?.code || 'N/A'}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
//                                             {payment.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium">
//                                         <motion.button
//                                             onClick={() => handleEditPayment(payment)}
//                                             className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                                         >
//                                             <Edit size={18} className="mr-1" />
//                                             Edit
//                                         </motion.button>
//                                     </td>
//                                 </motion.tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentTable;



// // components/admin/payments/PaymentTable.tsx
// 'use client';
// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Edit, Copy } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";
// import PaymentTableHeader from './PaymentTableHeader';
// import { useCopyToClipboard } from './useCopyToClipboard';

// interface PaymentTableProps {
//     filteredPayments: any[]; // Replace 'any' with a more specific type if possible
//     loadingPayments: boolean;
//     getStatusColor: (status: string) => string;
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
//     handleEditPayment: (payment: any) => void; // Replace 'any' with a more specific type if possible
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({
//     filteredPayments,
//     loadingPayments,
//     getStatusColor,
//     toggleSort,
//     sortField,
//     sortDirection,
//     handleEditPayment,
// }) => {
//     const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
//     const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

//     if (loadingPayments) {
//         return (
//             <div className="rounded-xl border overflow-hidden">
//                 <table className="min-w-full">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody>
//                         {Array(10).fill(0).map((_, i) => (
//                             <tr key={i}>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (
//         <div
//             className="rounded-xl border overflow-hidden"
//         >
//             <div className="overflow-x-auto">
//                 <table className="min-w-full overflow-hidden">
//                     <PaymentTableHeader toggleSort={toggleSort} sortField={sortField} sortDirection={sortDirection} />
//                     <tbody className="divide-y overflow-hidden">
//                         {filteredPayments.length === 0 ? (
//                             <tr>
//                                 <td colSpan="7" className="px-4 py-10 text-center text-gray-500">
//                                     No payments found matching your filters.
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredPayments.map((payment, index) => (
//                                 <motion.tr
//                                     key={payment._id}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                 >
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         <div className="flex flex-col">
//                                             <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
//                                             <span className="text-sm text-gray-500 dark:text-gray-300">{payment.user?.email || 'N/A'}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                                         {payment.amountToAdd}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                                         {payment.payInCurrency?.code || 'N/A'}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
//                                             {payment.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium">
//                                         <motion.button
//                                             onClick={() => handleEditPayment(payment)}
//                                             className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                                         >
//                                             <Edit size={18} className="mr-1" />
//                                             Edit
//                                         </motion.button>
//                                     </td>
//                                 </motion.tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentTable;



// // components/admin/payments/PaymentTable.tsx
// 'use client';
// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { motion } from 'framer-motion'; // Keep motion for row animation
// import { Edit } from 'lucide-react'; // Keep Edit icon for the button
// // Removed AnimatePresence, Copy, GiCheckMark as they are unused
// import PaymentTableHeader from './PaymentTableHeader';
// // Removed useCopyToClipboard hook import as it's unused

// // Define a basic Payment interface to replace 'any' for better type safety
// interface Payment {
//     _id: string;
//     user?: { // User might be optional or not populated
//         fullName?: string;
//         email?: string;
//     };
//     amountToAdd: number | string; // Adjust type as needed
//     payInCurrency?: { // Optional based on 'N/A' fallback
//         code?: string;
//     };
//     referenceCode?: string; // Optional based on 'N/A' fallback
//     status: string;
//     // Add other relevant payment properties if they exist
// }

// interface PaymentTableProps {
//     filteredPayments: Payment[]; // Use the Payment interface
//     loadingPayments: boolean;
//     getStatusColor: (status: string) => string;
//     // Adjust the type for toggleSort if you sort by nested fields
//     toggleSort: (field: keyof Payment | 'user.fullName' | 'payInCurrency.code' | string) => void; // Allow string for flexibility or refine further
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
//     handleEditPayment: (payment: Payment) => void; // Use the Payment interface
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({
//     filteredPayments,
//     loadingPayments,
//     getStatusColor,
//     toggleSort,
//     sortField,
//     sortDirection,
//     handleEditPayment,
// }) => {
//     // Removed useCopyToClipboard hook calls as they are unused

//     if (loadingPayments) {
//         return (
//             <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//                 <table className="min-w-full">
//                     <PaymentTableHeader
//                         // Cast toggleSort if necessary or refine its type
//                         toggleSort={toggleSort as (field: string) => void}
//                         sortField={sortField}
//                         sortDirection={sortDirection}
//                     />
//                     <tbody>
//                         {Array(10).fill(0).map((_, i) => (
//                             <tr key={i} className="dark:border-neutral-800"> {/* Added dark mode border */}
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (
//         <div className="rounded-xl border overflow-hidden dark:border-neutral-800"> {/* Added dark mode border */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full overflow-hidden">
//                     <PaymentTableHeader
//                         // Cast toggleSort if necessary or refine its type
//                         toggleSort={toggleSort as (field: string) => void}
//                         sortField={sortField}
//                         sortDirection={sortDirection}
//                     />
//                     {/* Added dark mode divider */}
//                     <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
//                         {filteredPayments.length === 0 ? (
//                             <tr>
//                                 <td colSpan={7} className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"> {/* Adjusted colspan and dark text */}
//                                     No payments found matching your filters.
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredPayments.map((payment, index) => (
//                                 <motion.tr
//                                     key={payment._id}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                     className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-100" // Added subtle hover and transition
//                                 >
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         {/* Kept original display */}
//                                         <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         <div className="flex flex-col">
//                                              {/* Adjusted dark mode text color */}
//                                             <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
//                                             <span className="text-sm text-gray-500 dark:text-gray-400">{payment.user?.email || 'N/A'}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                                         {payment.amountToAdd}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                                         {payment.payInCurrency?.code || 'N/A'}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                          {/* Adjusted dark mode text color */}
//                                         <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                          {/* Kept original styling, ensure getStatusColor handles dark mode if needed */}
//                                         <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
//                                             {payment.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium">
//                                         <motion.button
//                                             whileTap={{ scale: 0.95 }} // Added subtle tap animation
//                                             onClick={() => handleEditPayment(payment)}
//                                              // Kept original classes, ensure they work well in dark mode
//                                             className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                                         >
//                                             <Edit size={18} className="mr-1" />
//                                             Edit
//                                         </motion.button>
//                                     </td>
//                                 </motion.tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentTable;


// // components/admin/payments/PaymentTable.tsx
// 'use client';
// import React from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { motion } from 'framer-motion';
// import { Edit } from 'lucide-react';
// import PaymentTableHeader from './PaymentTableHeader';
// import { Payment } from '../../../../types/payment'; // Import shared Payment type - Adjust path if needed

// interface PaymentTableProps {
//     filteredPayments: Payment[]; // Use shared Payment type
//     loadingPayments: boolean;
//     getStatusColor: (status: string) => string;
//     // Keep toggleSort field as string, as the implementation handles nested keys
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
//     handleEditPayment: (payment: Payment) => void; // Use shared Payment type
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({
//     filteredPayments,
//     loadingPayments,
//     getStatusColor,
//     toggleSort,
//     sortField,
//     sortDirection,
//     handleEditPayment,
// }) => {

//     if (loadingPayments) {
//         // Skeleton remains the same
//         return (
//             <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//                 <table className="min-w-full">
//                     <PaymentTableHeader
//                         toggleSort={toggleSort}
//                         sortField={sortField}
//                         sortDirection={sortDirection}
//                     />
//                     <tbody>
//                         {Array(10).fill(0).map((_, i) => (
//                             <tr key={i} className="dark:border-neutral-800"> 
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap"><Skeleton className="h-7 w-28" /></td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><Skeleton className="h-8 w-24" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (
//         // Table structure remains the same
//         <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full overflow-hidden">
//                     <PaymentTableHeader
//                         toggleSort={toggleSort}
//                         sortField={sortField}
//                         sortDirection={sortDirection}
//                     />
//                     <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
//                         {filteredPayments.length === 0 ? (
//                             <tr>
//                                 <td colSpan={7} className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
//                                     No payments found. {/* Simpler message */}
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredPayments.map((payment, index) => ( // payment is now the shared Payment type
//                                 <motion.tr
//                                     key={payment._id}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                     className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-100"
//                                 >
//                                     {/* Cells use properties from the shared Payment type */}
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className="font-medium text-neutral-900 dark:text-white">{payment._id.substring(0, 10)}...</span>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         <div className="flex flex-col">
//                                             <span className="font-medium capitalize text-neutral-900 dark:text-white">{payment.user?.fullName || 'N/A'}</span>
//                                             <span className="text-sm text-gray-500 dark:text-gray-400">{payment.user?.email || 'N/A'}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
//                                         {/* Display amount (string) */}
//                                         {payment.amountToAdd}
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
//                                         {payment.payInCurrency?.code || 'N/A'}
//                                     </td>
//                                      <td className="px-4 py-3 whitespace-nowrap">
//                                         {/* Use optional chaining for referenceCode */}
//                                         <span className="text-neutral-900 dark:text-white">{payment.referenceCode || 'N/A'}</span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap">
//                                         <span className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(payment.status)}`}>
//                                             {payment.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 whitespace-nowrap font-medium">
//                                         <motion.button
//                                             whileTap={{ scale: 0.95 }}
//                                             onClick={() => handleEditPayment(payment)} // Passes the correctly typed payment
//                                             className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
//                                         >
//                                             <Edit size={18} className="mr-1" />
//                                             Edit
//                                         </motion.button>
//                                     </td>
//                                 </motion.tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentTable;



// components/admin/payments/PaymentTable.tsx
'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import PaymentTableHeader, { PaymentSortField } from './PaymentTableHeader';
import { Payment } from '../../../../types/payment'; // Import shared Payment type - Adjust path if needed

interface PaymentTableProps {
    filteredPayments: Payment[]; // Use shared Payment type
    loadingPayments: boolean;
    getStatusColor: (status: string) => string;
    toggleSort: (field: PaymentSortField) => void;
    sortField: PaymentSortField | null;
    sortDirection: 'asc' | 'desc';
    handleEditPayment: (payment: Payment) => void; // Use shared Payment type
}

const PaymentTable: React.FC<PaymentTableProps> = ({
    filteredPayments,
    loadingPayments,
    getStatusColor,
    toggleSort,
    sortField,
    sortDirection,
    handleEditPayment,
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

  if (loadingPayments) {
    // Skeleton remains the same
    return (
      <div className="rounded-xl border overflow-hidden dark:border-neutral-800">
        <table className="min-w-full">
          <PaymentTableHeader
            toggleSort={toggleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <tr key={i}>
                  {Array(numberOfColumns).fill(0).map(( _, j) => (
                        <td key={j} className="px-4 py-3 whitespace-nowrap">
                          <Skeleton className="h-4 w-full" /> {/* Use full width skeleton */}
                        </td>
                      ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <table className="min-w-full overflow-hidden">
          <PaymentTableHeader
            toggleSort={toggleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <tbody className="divide-y overflow-hidden">
            {filteredPayments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-300"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  // className="hover:bg-lightgray dark:hover:bg-primarybox transition-all duration-75 ease-linear"
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {payment._id}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium capitalize text-neutral-900 dark:text-white">
                        {payment.user?.fullName || "N/A"}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {payment.user?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
                    {payment.amountToAdd} {/* Display string amount */}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-neutral-900 dark:text-white">
                    {payment.payInCurrency?.code || "N/A"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="text-neutral-900 dark:text-white">
                      {payment.referenceCode || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex justify-center items-center px-4 py-1 w-28 font-medium rounded-3xl capitalize ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditPayment(payment)}
                      className="bg-primary hover:bg-primaryhover dark:bg-primarybox hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-3xl px-6 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center"
                    >
                      <Edit size={18} className="mr-1" />
                      Edit
                    </motion.button>
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

export default PaymentTable;