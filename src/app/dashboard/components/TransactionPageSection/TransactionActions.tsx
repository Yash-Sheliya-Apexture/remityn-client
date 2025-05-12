// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "../../../data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[]; // Receive transactions as prop
//   onTransactionsChange: (transactions: Transaction[]) => void; // Callback for transaction changes
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions} // Pass transactions to Search
//         onTransactionsChange={onTransactionsChange} // Pass callback to Search
//       />
//       <div className="flex items-center gap-2">
//         <Filter />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;












// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "../../../data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[];
//   onTransactionsChange: (transactions: Transaction[]) => void;
//   onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null }) => void; // Update filters type
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions}
//         onTransactionsChange={onTransactionsChange}
//       />
//       <div className="flex items-center gap-2">
//         <Filter onFiltersApply={onFiltersApply} />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;










// // Latest Code Without Date Picker
// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/app/data/transactions";

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[] }) => void; // Updated selectedBalance type to string[]
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//     return (
//         <div className="flex items-center gap-4">
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                 <Filter onFiltersApply={onFiltersApply} />
//                 <Download />
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;





// // components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/app/data/transactions";

// interface TransactionActionsProps {
//   transactions: Transaction[];
//   onTransactionsChange: (transactions: Transaction[]) => void;
//   onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Search
//         transactions={transactions}
//         onTransactionsChange={onTransactionsChange}
//       />
//       <div className="flex items-center gap-2">
//         <Filter onFiltersApply={onFiltersApply} />
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default TransactionActions;


// // frontend/src/components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/types/transaction"; // Import Transaction interface from types file

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { selectedRecipients: (string | number)[], selectedDirection?: string, selectedStatus?: string | null, selectedBalance?: string[], fromDate?: string, toDate?: string }) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({ transactions, onTransactionsChange, onFiltersApply }) => {
//     return (
//         <div className="flex items-center gap-4">
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                 <Filter onFiltersApply={onFiltersApply} />
//                 <Download />
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;


// // frontend/src/components/TransactionActions.tsx
// import React from "react";
// import Search from "./Search";
// import Filter from "./Filter";
// import Download from "./Download";
// import { Transaction } from "@/types/transaction";
// import { Account } from "@/types/account"; // Import Account type

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     userAccounts: Account[]; // <-- Add userAccounts prop
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: { /* ... filter types */ }) => void;
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({
//     transactions,
//     userAccounts, // <-- Destructure userAccounts
//     onTransactionsChange,
//     onFiltersApply
// }) => {
//     return (
//         <div className="flex items-center gap-4 "> {/* Added flex-wrap */}
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                  {/* Pass userAccounts down to Filter */}
//                 <Filter
//                     userAccounts={userAccounts} // <-- Pass accounts here
//                     onFiltersApply={onFiltersApply}
//                 />
//                 {/* <Download /> */}
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;


// // app/dashboard/components/TransactionPageSection/TransactionActions.tsx
// import React from "react";
// import Search from "./Search"; // Adjusted relative path
// import Filter from "./Filter"; // Adjusted relative path
// import { Transaction } from "@/types/transaction";
// import { Account } from "@/types/account"; // Import Account type

// // Define a placeholder type for filters until specific structure is known
// type TransactionFilters = object; // Or define specific properties: { status?: string[], dateRange?: { from: Date; to: Date }; ... }

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     userAccounts: Account[]; // <-- Add userAccounts prop
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: TransactionFilters) => void; // Use defined type
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({
//     transactions,
//     userAccounts, // <-- Destructure userAccounts
//     onTransactionsChange,
//     onFiltersApply
// }) => {
//     return (
//         <div className="flex justify-between items-center gap-4 sm:w-auto w-full"> {/* Added flex-wrap */}
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                  {/* Pass userAccounts down to Filter */}
//                 <Filter
//                     userAccounts={userAccounts} // <-- Pass accounts here
//                     onFiltersApply={onFiltersApply}
//                 />
//                 {/* <Download /> */}
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;


// // app/dashboard/components/TransactionPageSection/TransactionActions.tsx
// import React from "react";
// import Search from "./Search"; // Adjusted relative path
// import Filter from "./Filter"; // Adjusted relative path
// import { Transaction } from "@/types/transaction";
// import { Account } from "@/types/account"; // Import Account type

// // Define or import the specific filter type
// interface AppliedFilters {
//     selectedRecipients: (string | number)[];
//     selectedDirection?: string;
//     selectedStatus?: string | null;
//     selectedBalance?: string[];
//     fromDate?: string;
//     toDate?: string;
// }

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     userAccounts: Account[];
//     onTransactionsChange: (transactions: Transaction[]) => void;
//     onFiltersApply: (filters: AppliedFilters) => void; // <-- Use the specific type here
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({
//     transactions,
//     userAccounts,
//     onTransactionsChange,
//     onFiltersApply // Prop type now matches the expected function signature
// }) => {
//     return (
//         <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                 <Filter
//                     userAccounts={userAccounts}
//                     onFiltersApply={onFiltersApply} // Pass the correctly typed prop down
//                 />
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;

// // app/dashboard/components/TransactionPageSection/TransactionActions.tsx
// import React from "react";
// import Search from "./Search"; // Adjusted relative path
// import { Transaction } from "@/types/transaction";
// import { Account } from "@/types/account"; // Import Account type
// import { LuSettings2 } from "react-icons/lu"; // Import icon for the button
// // No need to import AppliedFilters here anymore

// interface TransactionActionsProps {
//     transactions: Transaction[];
//     userAccounts: Account[]; // Keep: might be needed for search or future actions
//     onTransactionsChange: (transactions: Transaction[]) => void; // For Search
//     // REMOVE: onFiltersApply: (filters: AppliedFilters) => void; // No longer needed here
//     onFilterButtonClick: () => void; // Callback to open the modal in parent
// }

// const TransactionActions: React.FC<TransactionActionsProps> = ({
//     transactions,
//     userAccounts, // Keep prop
//     onTransactionsChange,
//     onFilterButtonClick // Use this prop for the button's onClick
// }) => {
//     return (
//         <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
//             <Search
//                 transactions={transactions}
//                 onTransactionsChange={onTransactionsChange}
//             />
//             <div className="flex items-center gap-2">
//                  {/* Filter Trigger Button */}
//                 <button
//                     className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-36 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={onFilterButtonClick} // Trigger the modal open action
//                     aria-haspopup="dialog"
//                 >
//                     <LuSettings2 size={20} />
//                     <span className="md:block hidden">Filters</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TransactionActions;


// frontend/src/app/dashboard/components/TransactionPageSection/TransactionActions.tsx
import React from "react";
import Search from "./Search"; // Correct relative path
// REMOVED: import { Transaction } from "@/types/transaction"; // No longer needed here for search
// REMOVED: import { Account } from "@/types/account"; // No longer needed here for search/filter button props
import { LuSettings2 } from "react-icons/lu";

interface TransactionActionsProps {
    // Props for Search component
    searchTerm: string;
    onSearchChange: (newSearchTerm: string) => void;

    // Prop for Filter button
    onFilterButtonClick: () => void;

    // REMOVED: transactions: Transaction[]; // No longer needed here for Search
    // REMOVED: userAccounts: Account[]; // Not needed for these specific actions
    // REMOVED: onTransactionsChange: (transactions: Transaction[]) => void; // No longer needed here
}

const TransactionActions: React.FC<TransactionActionsProps> = ({
    searchTerm,         // Receive from parent
    onSearchChange,     // Receive from parent
    onFilterButtonClick // Receive from parent
}) => {
    return (
        <div className="flex justify-between items-center gap-4 sm:w-auto w-full">
            <Search
                searchTerm={searchTerm}     // Pass down to Search
                onSearchChange={onSearchChange} // Pass down to Search
            />
            {/* Filter Trigger Button - Moved inside a simple div if needed, or directly */}
            <button
                className="inline-flex items-center justify-center gap-3 bg-primary text-neutral-900 hover:bg-primaryhover h-12.5 md:w-40 w-12.5 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer shrink-0" // Added shrink-0
                onClick={onFilterButtonClick} // Use the passed callback
                aria-haspopup="dialog"
            >
                <LuSettings2 size={20} />
                <span className="md:block hidden">Filters</span>
            </button>
        </div>
    );
};

export default TransactionActions;