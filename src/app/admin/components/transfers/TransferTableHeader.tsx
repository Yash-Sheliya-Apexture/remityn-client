// // frontend/src/app/admin/components/transfers/TransferTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// interface TransferTableHeaderProps {
//     toggleSort: (field: string) => void;
//     sortField: string | null;
//     sortDirection: 'asc' | 'desc';
// }

// const TransferTableHeader: React.FC<TransferTableHeaderProps> = ({ toggleSort, sortField, sortDirection }) => {
//     return (
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="border-b">
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider">
//                     <button
//                         onClick={() => toggleSort('_id')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Transfer ID
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
//                 <th className="px-6 py-4 text-left font-medium text-neutral-900 dark:text-white  tracking-wider">
//                     <button
//                         onClick={() => toggleSort('recipient')}
//                         className="flex items-center gap-1 hover:text-primary uppercase"
//                     >
//                         Recipient
//                         {sortField === 'recipient' && (
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
//                 <th className="px-6 py-4 font-medium text-neutral-900 dark:text-white uppercase tracking-wider text-left">Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default TransferTableHeader;

// // frontend/src/app/admin/components/transfers/TransferTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// // Define the possible fields transfers can be sorted by
// export type TransferSortField =
//     | '_id'         // Transfer ID
//     | 'user'        // Sending User (e.g., by name)
//     | 'recipient'   // Recipient (e.g., by name or identifier)
//     | 'amount'
//     | 'status'
//     | 'createdAt';  // Date

// interface TransferTableHeaderProps {
//     // Use the specific type for the field
//     toggleSort: (field: TransferSortField) => void;
//     sortField: TransferSortField | null;
//     sortDirection: 'asc' | 'desc';
// }

// const TransferTableHeader: React.FC<TransferTableHeaderProps> = ({
//     toggleSort,
//     sortField,
//     sortDirection
// }) => {

//     // Helper to render the sort icon conditionally (copied from PaymentTableHeader)
//     const renderSortIcon = (field: TransferSortField) => {
//         if (sortField === field) {
//             // Active sort field: show icon and rotation based on direction
//             return <ArrowDownUp size={18} className={`ml-1.5 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-90' : ''}`} />;
//         }
//         // Inactive sort field: show a subtle icon on hover
//         return <ArrowDownUp size={18} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
//     };

//     // Common classes for header cells and buttons (copied from PaymentTableHeader)
//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//     const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class

//     return (
//         // Apply background color directly to the thead
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="border-b dark:border-neutral-800">
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('_id')} className={buttonClasses}>
//                         Transfer ID {renderSortIcon('_id')}
//                     </button>
//                 </th>

//                 {/* --- User Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('user')} className={buttonClasses}>
//                         User {renderSortIcon('user')}
//                     </button>
//                 </th>

//                  {/* --- Recipient Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('recipient')} className={buttonClasses}>
//                         Recipient {renderSortIcon('recipient')}
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

// export default TransferTableHeader;

// frontend/src/app/admin/components/transfers/TransferTableHeader.tsx
"use client";
import React from "react";
import { ArrowDownUp, ArrowUpDown } from "lucide-react"; // Import both icons

// Define the possible fields transfers can be sorted by
export type TransferSortField =
  | "_id" // Transfer ID
  | "user" // Sending User (e.g., by name)
  | "recipient" // Recipient (e.g., by name or identifier)
  | "amount"
  | "status"
  | "createdAt"; // Date

interface TransferTableHeaderProps {
  // Use the specific type for the field
  toggleSort: (field: TransferSortField) => void;
  sortField: TransferSortField | null;
  sortDirection: "asc" | "desc";
}

const TransferTableHeader: React.FC<TransferTableHeaderProps> = ({
  toggleSort,
  sortField,
  sortDirection,
}) => {
  // Helper to render the sort icon conditionally
  const renderSortIcon = (field: TransferSortField) => {
    if (sortField === field) {
      // Active sort field: show specific icon based on direction
      if (sortDirection === "asc") {
        // Show ArrowUpDown for ascending
        return (
          <ArrowUpDown
            size={18}
            className="ml-1.5 text-primary transition-all duration-75 ease-linear"
          />
        );
      } else {
        // Show ArrowDownUp for descending
        return (
          <ArrowDownUp
            size={18}
            className="ml-1.5 text-primary transition-all duration-75 ease-linear"
          />
        );
      }
    }
    // Inactive sort field: show a subtle ArrowUpDown icon on hover (or your preferred default sortable indicator)
    return (
      <ArrowUpDown
        size={18}
        className="ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-75 ease-linear"
      />
    );
  };

  // Common classes for header cells and buttons
  const headerCellClasses =
    "px-4 py-4 text-left font-medium text-mainheadingWhite tracking-wider whitespace-nowrap";
  const buttonClasses =
    "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class

  return (
    <thead className="bg-primarybox">
      <tr className="transfer-head">
        {/* Ensure border for dark mode if needed */}
        <th className={headerCellClasses}>
          <button onClick={() => toggleSort("_id")} className={buttonClasses}>
            Transfer ID {renderSortIcon("_id")}
          </button>
        </th>
        {/* --- User Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button onClick={() => toggleSort("user")} className={buttonClasses}>
            User {renderSortIcon("user")}
          </button>
        </th>
        {/* --- Recipient Column (Sortable) --- */}
        <th className={headerCellClasses}>
          <button
            onClick={() => toggleSort("recipient")}
            className={buttonClasses}
          >
            Recipient {renderSortIcon("recipient")}
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

export default TransferTableHeader;
