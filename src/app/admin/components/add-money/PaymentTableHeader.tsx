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




// components/admin/payments/PaymentTableHeader.tsx
'use client';
import React from 'react';
import { ArrowDownUp } from 'lucide-react';

// Define the possible fields payments can be sorted by
export type PaymentSortField =
    | '_id'          // Payment ID
    | 'user'         // User (assuming sorting by user identifier, like name or email fetched via population)
    | 'amount'
    | 'status'
    | 'createdAt';   // Date

interface PaymentTableHeaderProps {
    // Use the specific type for the field
    toggleSort: (field: PaymentSortField) => void;
    sortField: PaymentSortField | null;
    sortDirection: 'asc' | 'desc';
}

const PaymentTableHeader: React.FC<PaymentTableHeaderProps> = ({
    toggleSort,
    sortField,
    sortDirection
}) => {

    // Helper to render the sort icon conditionally (copied from UserTableHeader)
    const renderSortIcon = (field: PaymentSortField) => {
        if (sortField === field) {
            // Active sort field: show icon and rotation based on direction
            return <ArrowDownUp size={16} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
        }
        // Inactive sort field: show a subtle icon on hover
        return <ArrowDownUp size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
    };

    // Common classes for header cells and buttons (copied from UserTableHeader)
    // Kept px-6 as it was original for PaymentTable, adjust if needed
    const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
    const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class

    return (
        // Apply background color directly to the thead
        <thead className='bg-lightgray dark:bg-primarybox '>
            <tr className="border-b ">
                {/* --- Payment ID Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('_id')} className={buttonClasses}>
                        Payment ID {renderSortIcon('_id')}
                    </button>
                </th>

                {/* --- User Column (Sortable) --- */}
                {/* Note: Sorting 'user' might require backend population for meaningful sorting */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('user')} className={buttonClasses}>
                        User {renderSortIcon('user')}
                    </button>
                </th>

                {/* --- Amount Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('amount')} className={buttonClasses}>
                        Amount {renderSortIcon('amount')}
                    </button>
                </th>

                {/* --- Currency Column (Not Sortable) --- */}
                <th className={`${headerCellClasses} uppercase`}>Currency</th>

                {/* --- Reference Column (Not Sortable) --- */}
                <th className={`${headerCellClasses} uppercase`}>Reference</th>

                {/* --- Status Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('status')} className={buttonClasses}>
                        Status {renderSortIcon('status')}
                    </button>
                </th>

                {/* --- Date Column (Sortable by createdAt) --- */}
                <th className={headerCellClasses}>
                     <button onClick={() => toggleSort('createdAt')} className={buttonClasses}>
                        Date {renderSortIcon('createdAt')}
                    </button>
                </th>

                {/* --- Actions Column (Not Sortable) --- */}
                <th className={`${headerCellClasses} uppercase`}>Actions</th>
            </tr>
        </thead>
    );
};

export default PaymentTableHeader;