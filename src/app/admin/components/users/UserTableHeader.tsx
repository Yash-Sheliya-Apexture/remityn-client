// // frontend/src/app/admin/components/users/UserTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// // Define the possible fields users can sort by
// export type UserSortField =
//     | '_id' // Added User ID sorting capability
//     | 'fullName'
//     | 'email'
//     | 'kyc.status'
//     | 'createdAt' // Date Joined
//     | 'kyc.dateOfBirth';

// interface UserTableHeaderProps {
//     toggleSort: (field: UserSortField) => void;
//     sortField: UserSortField | null;
//     sortDirection: 'asc' | 'desc';
// }

// const UserTableHeader: React.FC<UserTableHeaderProps> = ({
//     toggleSort,
//     sortField,
//     sortDirection
// }) => {

//     // Helper to render the sort icon conditionally
//     const renderSortIcon = (field: UserSortField) => {
//         if (sortField === field) {
//             // Active sort field: show icon and rotation based on direction
//             return <ArrowDownUp size={14} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
//         }
//         // Inactive sort field: show a subtle icon on hover
//         return <ArrowDownUp size={14} className="ml-1 opacity-0 group-hover:opacity-40 transition-opacity duration-150" />;
//     };

//     // Common classes for header cells and buttons
//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider";
//     const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase";

//     return (
//         // Apply background color directly to the thead
//         <thead className='bg-lightgray dark:bg-primarybox '>
//             <tr className="border-b">
//                 {/* --- User ID Column (Sortable) --- */}
//                 {/* Commented out based on UserTable structure, uncomment if needed */}
//                 {/* <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('_id')} className={buttonClasses}>
//                         User ID {renderSortIcon('_id')}
//                     </button>
//                 </th> */}

//                 {/* --- Full Name Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('fullName')} className={buttonClasses}>
//                         Full Name {renderSortIcon('fullName')}
//                     </button>
//                 </th>

//                 {/* --- Email Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('email')} className={buttonClasses}>
//                         Email {renderSortIcon('email')}
//                     </button>
//                 </th>

//                 {/* --- Date of Birth Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('kyc.dateOfBirth')} className={buttonClasses}>
//                         Date of Birth {renderSortIcon('kyc.dateOfBirth')}
//                     </button>
//                 </th>

//                 {/* --- Mobile Column (Not Sortable) --- */}
//                 <th className={headerCellClasses}>Mobile</th>

//                 {/* --- KYC Status Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('kyc.status')} className={buttonClasses}>
//                         KYC Status {renderSortIcon('kyc.status')}
//                     </button>
//                 </th>

//                 {/* --- Date Joined Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('createdAt')} className={buttonClasses}>
//                         Date Joined {renderSortIcon('createdAt')}
//                     </button>
//                 </th>

//                 {/* --- Actions Column (Not Sortable) --- */}
//                 <th className={`${headerCellClasses} text-right`}>Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default UserTableHeader;


// frontend/src/app/admin/components/users/UserTableHeader.tsx
'use client';
import React from 'react';
import { ArrowDownUp } from 'lucide-react';

// Define the possible fields users can sort by
export type UserSortField =
    // Removed User ID sorting as it's not in the table layout
    // | '_id'
    | 'fullName'
    | 'email'
    | 'kyc.dateOfBirth'
    | 'kyc.status'
    | 'createdAt'; // Date Joined

interface UserTableHeaderProps {
    toggleSort: (field: UserSortField) => void;
    sortField: UserSortField | null;
    sortDirection: 'asc' | 'desc';
}

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
    toggleSort,
    sortField,
    sortDirection
}) => {

    // Helper to render the sort icon conditionally (like PaymentTableHeader)
    const renderSortIcon = (field: UserSortField) => {
        if (sortField === field) {
            // Active sort field: show icon and rotation based on direction
            return <ArrowDownUp size={16} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
        }
        // Inactive sort field: show a subtle icon on hover
        return <ArrowDownUp size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
    };

    // Common classes for header cells and buttons (like PaymentTableHeader)
    const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap"; // Adjusted padding to px-4 like UserTable cells
    const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer"; // Added group class for hover effect on icon

    return (
        // Apply background color directly to the thead (like PaymentTableHeader)
        <thead className='bg-lightgray dark:bg-primarybox '>
            <tr className="border-b">
                {/* --- Full Name Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('fullName')} className={buttonClasses}>
                        Full Name {renderSortIcon('fullName')}
                    </button>
                </th>

                {/* --- Email Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('email')} className={buttonClasses}>
                        Email {renderSortIcon('email')}
                    </button>
                </th>

                {/* --- Date of Birth Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('kyc.dateOfBirth')} className={buttonClasses}>
                        Date of Birth {renderSortIcon('kyc.dateOfBirth')}
                    </button>
                </th>

                {/* --- Mobile Column (Not Sortable) --- */}
                <th className={`${headerCellClasses} uppercase`}>Mobile</th>

                {/* --- KYC Status Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('kyc.status')} className={buttonClasses}>
                        KYC Status {renderSortIcon('kyc.status')}
                    </button>
                </th>

                {/* --- Date Joined Column (Sortable) --- */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('createdAt')} className={buttonClasses}>
                        Date Joined {renderSortIcon('createdAt')}
                    </button>
                </th>

                {/* --- Actions Column (Not Sortable) --- */}
                {/* Apply headerCellClasses */}
                <th className={`${headerCellClasses} uppercase`}>Actions</th>
            </tr>
        </thead>
    );
};

export default UserTableHeader;