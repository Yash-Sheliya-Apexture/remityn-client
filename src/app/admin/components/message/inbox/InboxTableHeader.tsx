// // frontend/src/app/admin/components/inbox/InboxTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// // Define the possible fields inbox messages can be sorted by
// export type InboxSortField =
//     | 'isRead'       // For Status (read/unread)
//     | 'recipient'    // For Recipient (User's name or email)
//     | 'sender'
//     | 'subject'
//     | 'sentAt';      // Date

// interface InboxTableHeaderProps {
//     toggleSort: (field: InboxSortField) => void;
//     sortField: InboxSortField | null;
//     sortDirection: 'asc' | 'desc';
// }

// const InboxTableHeader: React.FC<InboxTableHeaderProps> = ({
//     toggleSort,
//     sortField,
//     sortDirection
// }) => {
//     const renderSortIcon = (field: InboxSortField) => {
//         if (sortField === field) {
//             return <ArrowDownUp size={16} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
//         }
//         return <ArrowDownUp size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
//     };

//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap"; // Matched with PaymentTableHeader
//     const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer text-xs"; // Matched, added text-xs for consistency

//     return (
//         <thead className='bg-lightgray dark:bg-primarybox'>
//             <tr className="border-b border-neutral-200 dark:border-neutral-700">
//                 {/* --- Status Column (Sortable by isRead) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('isRead')} className={buttonClasses}>
//                         Status {renderSortIcon('isRead')}
//                     </button>
//                 </th>

//                 {/* --- Recipient Column (Sortable by user info) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('recipient')} className={buttonClasses}>
//                         Recipient {renderSortIcon('recipient')}
//                     </button>
//                 </th>

//                 {/* --- Sender Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('sender')} className={buttonClasses}>
//                         Sender {renderSortIcon('sender')}
//                     </button>
//                 </th>

//                 {/* --- Subject Column (Sortable) --- */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('subject')} className={buttonClasses}>
//                         Subject {renderSortIcon('subject')}
//                     </button>
//                 </th>

//                 {/* --- Sent At Column (Sortable by sentAt) --- */}
//                 <th className={headerCellClasses}>
//                      <button onClick={() => toggleSort('sentAt')} className={buttonClasses}>
//                         Sent At {renderSortIcon('sentAt')}
//                     </button>
//                 </th>

//                 {/* --- Actions Column (Not Sortable) --- */}
//                 <th className={`${headerCellClasses} uppercase text-xs text-right`}>Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default InboxTableHeader;




// // frontend/src/app/admin/components/inbox/InboxTableHeader.tsx
// 'use client';
// import React from 'react';
// import { ArrowDownUp } from 'lucide-react';

// // Define the possible fields inbox messages can be sorted by
// export type InboxSortField =
//     | 'status'       // isRead (boolean, needs specific handling in sort logic)
//     | 'recipient'    // userId.fullName or userId.email
//     | 'sender'
//     | 'subject'
//     | 'sentAt';      // Date

// interface InboxTableHeaderProps {
//     toggleSort: (field: InboxSortField) => void;
//     sortField: InboxSortField | null;
//     sortDirection: 'asc' | 'desc';
// }

// const InboxTableHeader: React.FC<InboxTableHeaderProps> = ({
//     toggleSort,
//     sortField,
//     sortDirection
// }) => {
//     const renderSortIcon = (field: InboxSortField) => {
//             if (sortField === field) {
//                 // Active sort field: show icon and rotation based on direction
//                 return <ArrowDownUp size={16} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
//             }
//             // Inactive sort field: show a subtle icon on hover
//             return <ArrowDownUp size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
//         };

//     const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
//     const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

//     return (
//         <thead className='bg-lightgray dark:bg-primarybox'>
//             <tr className="border-b">
//                 {/* Status Column (Sortable by 'status' which maps to 'isRead') */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('status')} className={buttonClasses}>
//                         Status {renderSortIcon('status')}
//                     </button>
//                 </th>

//                 {/* Recipient Column (Sortable) */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('recipient')} className={buttonClasses}>
//                         Recipient {renderSortIcon('recipient')}
//                     </button>
//                 </th>

//                 {/* Sender Column (Sortable) */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('sender')} className={buttonClasses}>
//                         Sender {renderSortIcon('sender')}
//                     </button>
//                 </th>

//                 {/* Subject Column (Sortable) */}
//                 <th className={headerCellClasses}>
//                     <button onClick={() => toggleSort('subject')} className={buttonClasses}>
//                         Subject {renderSortIcon('subject')}
//                     </button>
//                 </th>

//                 {/* Sent At Column (Sortable by 'sentAt') */}
//                 <th className={headerCellClasses}>
//                      <button onClick={() => toggleSort('sentAt')} className={buttonClasses}>
//                         Sent At {renderSortIcon('sentAt')}
//                     </button>
//                 </th>

//                 {/* Actions Column (Not Sortable) */}
//                 <th className={`${headerCellClasses} text-right uppercase`}>Actions</th>
//             </tr>
//         </thead>
//     );
// };

// export default InboxTableHeader;



// frontend/src/app/admin/components/inbox/InboxTableHeader.tsx
'use client';
import React from 'react';
import { ArrowDownUp } from 'lucide-react';

// Define the possible fields inbox messages can be sorted by
export type InboxSortField =
    | 'status'       // isRead (boolean, needs specific handling in sort logic)
    | 'recipient'    // userId.fullName or userId.email - Key remains 'recipient', display changes to 'User'
    | 'sender'
    | 'subject'
    | 'sentAt';      // Date

interface InboxTableHeaderProps {
    toggleSort: (field: InboxSortField) => void;
    sortField: InboxSortField | null;
    sortDirection: 'asc' | 'desc';
}

const InboxTableHeader: React.FC<InboxTableHeaderProps> = ({
    toggleSort,
    sortField,
    sortDirection
}) => {
    const renderSortIcon = (field: InboxSortField) => {
            if (sortField === field) {
                return <ArrowDownUp size={16} className={`ml-1 transition-transform duration-150 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />;
            }
            return <ArrowDownUp size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />;
        };

    const headerCellClasses = "px-6 py-4 text-left font-medium text-neutral-900 dark:text-white tracking-wider whitespace-nowrap";
    const buttonClasses = "flex items-center gap-1 hover:text-primary uppercase group cursor-pointer";

    return (
        <thead className='bg-lightgray dark:bg-primarybox'>
            <tr className="border-b">
                {/* Status Column (Sortable by 'status' which maps to 'isRead') */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('status')} className={buttonClasses}>
                        Status {renderSortIcon('status')}
                    </button>
                </th>

                {/* User Column (Sortable by 'recipient' key) */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('recipient')} className={buttonClasses}>
                        User {renderSortIcon('recipient')}
                    </button>
                </th>

                {/* Sender Column (Sortable) */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('sender')} className={buttonClasses}>
                        Sender {renderSortIcon('sender')}
                    </button>
                </th>

                {/* Subject Column (Sortable) */}
                <th className={headerCellClasses}>
                    <button onClick={() => toggleSort('subject')} className={buttonClasses}>
                        Subject {renderSortIcon('subject')}
                    </button>
                </th>

                {/* Sent At Column (Sortable by 'sentAt') */}
                <th className={headerCellClasses}>
                     <button onClick={() => toggleSort('sentAt')} className={buttonClasses}>
                        Sent At {renderSortIcon('sentAt')}
                    </button>
                </th>

                {/* Actions Column (Not Sortable) */}
                <th className={`${headerCellClasses} text-right uppercase`}>Actions</th>
            </tr>
        </thead>
    );
};

export default InboxTableHeader;