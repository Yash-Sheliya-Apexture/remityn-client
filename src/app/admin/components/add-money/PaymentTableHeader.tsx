// // components/admin/payments/PaymentTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// interface PaymentTableHeaderProps {
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
// }

// const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({ toggleSort, sortField, sortDirection }) => {
//     return (
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="border-b">
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
//                     <button
//                         onClick={() => toggleSort('_id')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Payment ID
//                         {sortField === '_id' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
//                     <button
//                         onClick={() => toggleSort('user')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         User
//                         {sortField === 'user' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
//                     <button
//                         onClick={() => toggleSort('amount')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Amount
//                         {sortField === 'amount' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Currency</th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Reference</th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
//                     <button
//                         onClick={() => toggleSort('status')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Status
//                         {sortField === 'status' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default PaymentTableHeader;

// // components/admin/payments/PaymentTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// interface PaymentTableHeaderProps {
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
// }

// const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({ toggleSort, sortField, sortDirection }) => {
//     return (
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="border-b">
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
//                     <button
//                         onClick={() => toggleSort('_id')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Payment ID
//                         {sortField === '_id' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
//                     <button
//                         onClick={() => toggleSort('user')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         User
//                         {sortField === 'user' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
//                     <button
//                         onClick={() => toggleSort('amount')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Amount
//                         {sortField === 'amount' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Currency</th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Reference</th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
//                     <button
//                         onClick={() => toggleSort('status')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Status
//                         {sortField === 'status' && (
//                             <ArrowDownUp size={18} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
//                         )}
//                     </button>
//                 </th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white uppercase tracking-wider">Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default PaymentTableHeader;

// // components/admin/payments/PaymentTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// // Define the possible fields payments can be sorted by
// export type PaymentSortField =
//     | '_id'          // Payment ID
//     | 'user'         // User (assuming sorting by user identifier, like name or email fetched via population)
//     | 'amount'
//     | 'status'
//     | 'createdAt';   // Date

// interface PaymentTableHeaderProps {
//     // Use the specific type for the field
//     toggleSort: (field: PaymentSortField) => void;
//     sortField: PaymentSortField | null;
//     sortDirection: 'asc' | 'desc';
// }

// const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({
//     toggleSort,
//     sortField,
//     sortDirection
// }) => {

//     // Helper to render the sort icon conditionally (copied from UserTableHeader)
//     const renderSortIcon = (field: PaymentSortField) => {
//         if (sortField === field) {
//             // Active sort field: show icon and rotation based on direction
//             return <ArrowDownUp size={18} className={`ml-1.5 transition-all duration-75 ease-linear ${sortDirection === 'desc' ? 'rotate-90' : ''}`} />;
//         }
//         // Inactive sort field: show a subtle icon on hover
//         return <ArrowDownUp size={18} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear" />;
//     };

//     // Common classes for header cells and buttons (copied from UserTableHeader)
//     // Kept px-6 as it was original for PaymentTable, adjust if needed
//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//     const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class

//     return (
//         // Apply background color directly to the thead
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="payment-head">
//                 {/* --- Payment ID Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('_id')} className={buttonClasses}>
//                         Payment ID {renderSortIcon('_id')}
//                     </button>
//                 </th>

//                 {/* --- User Column (Sortable) --- */}
//                 {/* Note: Sorting 'user' might require backend population for meaningful sorting */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('user')} className={buttonClasses}>
//                         User {renderSortIcon('user')}
//                     </button>
//                 </th>

//                 {/* --- Amount Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('amount')} className={buttonClasses}>
//                         Amount {renderSortIcon('amount')}
//                     </button>
//                 </th>

//                 {/* --- Currency Column (Not Sortable) --- */}
//                 <th className={`${headerCellClasses} uppercase`}>Currency</th>

//                 {/* --- Reference Column (Not Sortable) --- */}
//                 <th className={`${headerCellClasses} uppercase`}>Reference</th>

//                 {/* --- Status Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('status')} className={buttonClasses}>
//                         Status {renderSortIcon('status')}
//                     </button>
//                 </th>

//                 {/* --- Date Column (Sortable by createdAt) --- */}
//                 <th className={headerCellClasses}>
//                      <button onClick={() => toggleSort('createdAt')} className={buttonClasses}>
//                         Date {renderSortIcon('createdAt')}
//                     </button>
//                 </th>

//                 {/* --- Actions Column (Not Sortable) --- */}
//                 <th className={`${headerCellClasses} uppercase`}>Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default PaymentTableHeader;

// // components/admin/payments/PaymentTableHeader.tsx
// "use client";
// import React from "react";
// import { ArrowDownUp, ArrowUpDown } from "lucide-react"; // Import both icons

// // Define the possible fields payments can be sorted by
// export type PaymentSortField =
//   | "_id" // Payment ID
//   | "user" // User (assuming sorting by user identifier, like name or email fetched via population)
//   | "amount"
//   | "status"
//   | "createdAt"; // Date

// interface PaymentTableHeaderProps {
//   // Use the specific type for the field
//   toggleSort: (field: PaymentSortField) => void;
//   sortField: PaymentSortField | null;
//   sortDirection: "asc" | "desc";
// }

// const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({
//   toggleSort,
//   sortField,
//   sortDirection,
// }) => {
//   // Helper to render the sort icon conditionally
//   const renderSortIcon = (field: PaymentSortField) => {
//     if (sortField === field) {
//       // Active sort field: show specific icon based on direction
//       if (sortDirection === "asc") {
//         // Show ArrowUpDown for ascending
//         return (
//           <ArrowUpDown
//             size={18}
//             className="ml-1.5 text-primary transition-all duration-75 ease-linear"
//           />
//         );
//       } else {
//         // Show ArrowDownUp for descending
//         return (
//           <ArrowDownUp
//             size={18}
//             className="ml-1.5 text-primary transition-all duration-75 ease-linear"
//           />
//         );
//       }
//     }
//     // Inactive sort field: show a subtle ArrowUpDown icon on hover (or your preferred default sortable indicator)
//     return (
//       <ArrowUpDown
//         size={18}
//         className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear"
//       />
//     );
//   };

//   // Common classes for header cells and buttons
//   const headerCellClasses =
//     "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//   const buttonClasses =
//     "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class

//   return (
//     <thead className="bg-lightgray dark:bg-primarybox">
//       <tr className="payment-head">
//         {/* --- Payment ID Column (Sortable) --- */}
//         <th className={headerCellClasses}>
//           <button onClick={() => toggleSort("_id")} className={buttonClasses}>
//             Payment ID {renderSortIcon("_id")}
//           </button>
//         </th>

//         {/* --- User Column (Sortable) --- */}
//         <th className={headerCellClasses}>
//           <button onClick={() => toggleSort("user")} className={buttonClasses}>
//             User {renderSortIcon("user")}
//           </button>
//         </th>

//         {/* --- Amount Column (Sortable) --- */}
//         <th className={headerCellClasses}>
//           <button
//             onClick={() => toggleSort("amount")}
//             className={buttonClasses}
//           >
//             Amount {renderSortIcon("amount")}
//           </button>
//         </th>

//         {/* --- Currency Column (Not Sortable) --- */}
//         <th className={`${headerCellClasses} uppercase`}>Currency</th>

//         {/* --- Reference Column (Not Sortable) --- */}
//         <th className={`${headerCellClasses} uppercase`}>Reference</th>

//         {/* --- Status Column (Sortable) --- */}
//         <th className={headerCellClasses}>
//           <button
//             onClick={() => toggleSort("status")}
//             className={buttonClasses}
//           >
//             Status {renderSortIcon("status")}
//           </button>
//         </th>

//         {/* --- Date Column (Sortable by createdAt) --- */}
//         <th className={headerCellClasses}>
//           <button
//             onClick={() => toggleSort("createdAt")}
//             className={buttonClasses}
//           >
//             Date {renderSortIcon("createdAt")}
//           </button>
//         </th>

//         {/* --- Actions Column (Not Sortable) --- */}
//         <th className={`${headerCellClasses} uppercase`}>Actions</th>
//       </tr>
//     </thead>
//   );
// };

// export default PaymentTableHeader;

// components/admin/payments/PaymentTableHeader.tsx
"use client";
import React from "react";
import { ArrowDownUp, ArrowUpDown } from "lucide-react"; // Import both icons

// Define the possible fields payments can be sorted by
export type PaymentSortField =
  | "_id" // Payment ID
  | "user" // User (assuming sorting by user identifier, like name or email fetched via population)
  | "amount"
  | "status"
  | "createdAt"; // Date

interface PaymentTableHeaderProps {
  // Use the specific type for the field
  toggleSort: (field: PaymentSortField) => void;
  sortField: PaymentSortField | null;
  sortDirection: "asc" | "desc";
}

const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({
  toggleSort,
  sortField,
  sortDirection,
}) => {
  // Helper to render the sort icon conditionally
  const renderSortIcon = (field: PaymentSortField) => {
    // Base classes for all icons: margin, transition, initial invisibility, and hover visibility
    const baseIconStyling =
      "ml-1.5 transition-all duration-75 ease-linear opacity-0 group-hover:opacity-100";

    if (sortField === field) {
      // Active sort field: icon is specific to sort direction and colored (e.g., text-primary)
      // It will now also be hidden by default and appear on hover due to baseIconStyling.
      const activeIconClasses = `${baseIconStyling} text-primary`;
      if (sortDirection === "asc") {
        // Show ArrowUpDown for ascending
        return <ArrowUpDown size={18} className={activeIconClasses} />;
      } else {
        // Show ArrowDownUp for descending
        return <ArrowDownUp size={18} className={activeIconClasses} />;
      }
    } else {
      // Inactive sort field: show a subtle ArrowUpDown icon on hover (default color)
      // This part remains largely the same, using baseIconStyling for hover effect.
      const inactiveIconClasses = baseIconStyling;
      return <ArrowUpDown size={18} className={inactiveIconClasses} />;
    }
  };

  // Common classes for header cells and buttons
  const headerCellClasses =
    "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
  const buttonClasses =
    "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Group class is essential for group-hover on icon

  return (
    <thead className="bg-lightgray dark:bg-primarybox">
      <tr className="payment-head">
        {/* --- Payment ID Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button onClick={() => toggleSort("_id")} className={buttonClasses}>
            Payment ID {renderSortIcon("_id")}
          </button>
        </th>

        {/* --- User Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button onClick={() => toggleSort("user")} className={buttonClasses}>
            User {renderSortIcon("user")}
          </button>
        </th>

        {/* --- Amount Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button
            onClick={() => toggleSort("amount")}
            className={buttonClasses}
          >
            Amount {renderSortIcon("amount")}
          </button>
        </th>

        {/* --- Currency Column (Not Sortable) --- */}
        <th className={`${headerCellClasses} uppercase`}>Currency</th>

        {/* --- Reference Column (Not Sortable) --- */}
        <th className={`${headerCellClasses} uppercase`}>Reference</th>

        {/* --- Status Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button
            onClick={() => toggleSort("status")}
            className={buttonClasses}
          >
            Status {renderSortIcon("status")}
          </button>
        </th>

        {/* --- Date Column (Sortable by createdAt) --- */}
        <th className={headerCellClasses}>
          <button
            onClick={() => toggleSort("createdAt")}
            className={buttonClasses}
          >
            Date {renderSortIcon("createdAt")}
          </button>
        </th>

        {/* --- Actions Column (Not Sortable) --- */}
        <th className={`${headerCellClasses} uppercase`}>Actions</th>
      </tr>
    </thead>
  );
};

export default PaymentTableHeader;
