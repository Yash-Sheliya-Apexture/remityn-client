// "use client";

// import React, { useState, useEffect } from "react";
// import { Transaction } from "../../../data/transactions";
// import { FiSearch } from "react-icons/fi";

// interface SearchProps {
//   transactions: Transaction[]; // Receive transactions as prop
//   onTransactionsChange: (filteredTransactions: Transaction[]) => void; // Callback for filtered transactions
// }

// const Search: React.FC<SearchProps> = ({
//   transactions,
//   onTransactionsChange,
// }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     const searchedTransactions = transactions
//       .map((transaction) => {
//         if (searchTerm) {
//           const searchTermLower = searchTerm.toLowerCase();
//           const nameMatches = transaction.name
//             ?.toLowerCase()
//             .includes(searchTermLower);
//           const descriptionMatches = transaction.description
//             ?.toLowerCase()
//             .includes(searchTermLower);

//           if (nameMatches || descriptionMatches) {
//             return transaction;
//           } else {
//             return null;
//           }
//         }
//         return transaction;
//       })
//       .filter((transaction) => transaction !== null) as Transaction[];

//     onTransactionsChange(searchedTransactions); // Send filtered transactions back to parent
//   }, [searchTerm, transactions, onTransactionsChange]); // useEffect dependency on searchTerm and transactions

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//   };

//   return (
//     <div className="relative w-full">
//       <FiSearch
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//         size={18}
//       />

//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-3 focus:outline-none focus:ring-0"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//     </div>
//   );
// };

// export default Search;

// // frontend/src/components/Search.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { Transaction } from "@/types/transaction"; // Import Transaction interface

// interface SearchProps {
//   transactions: Transaction[];
//   onTransactionsChange: (filteredTransactions: Transaction[]) => void;
// }

// const Search: React.FC<SearchProps> = ({
//   transactions,
//   onTransactionsChange,
// }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     if (!transactions) {
//       onTransactionsChange([]); // Handle case where transactions are not yet loaded
//       return;
//     }

//     const searchedTransactions = transactions.filter((transaction) => {
//       if (searchTerm) {
//         const searchTermLower = searchTerm.toLowerCase();
//         const nameMatches = transaction.name
//           ?.toLowerCase()
//           .includes(searchTermLower);
//         const descriptionMatches = transaction.description
//           ?.toLowerCase()
//           .includes(searchTermLower);

//         return nameMatches || descriptionMatches;
//       }
//       return true; // If no searchTerm, include all transactions
//     });

//     onTransactionsChange(searchedTransactions);
//   }, [searchTerm, transactions, onTransactionsChange]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//   };

//   return (
//     <div className="relative w-full">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//         <FiSearch
//           className="h-5 w-5 text-neutral-900 dark:text-white"
//           aria-hidden="true"
//         />
//       </div>
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border focus:border-[#5f5f5f] focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-neutral-900 dark:placeholder:text-white"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//     </div>
//   );
// };

// export default Search;


// // frontend/src/app/dashboard/components/TransactionPageSection/Search.tsx
// "use client";

// import React from "react";
// import { FiSearch } from "react-icons/fi";

// interface SearchProps {
//   searchTerm: string; // Receive current search term
//   onSearchChange: (newSearchTerm: string) => void; // Callback to update parent state
// }

// const Search: React.FC<SearchProps> = ({
//   searchTerm,
//   onSearchChange,
// }) => {

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onSearchChange(event.target.value); // Update parent state on input change
//   };

//   return (
//     <div className="relative w-full">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//         <FiSearch
//           className="h-5 w-5 text-neutral-900 dark:text-white"
//           aria-hidden="true"
//         />
//       </div>
//       <input
//         type="text"
//         placeholder="Search Name, Type, Status..." // Updated placeholder
//         className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border border-neutral-300 dark:border-neutral-700 focus:border-neutral-500 dark:focus:border-neutral-500 focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-neutral-600 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox text-neutral-900 dark:text-white" // Added more styling for consistency
//         value={searchTerm} // Controlled input
//         onChange={handleInputChange}
//         aria-label="Search transactions" // Accessibility
//       />
//     </div>
//   );
// };

// export default Search;

// Note: Keep Search.tsx as it is in your original post - it's correctly defined.
// frontend/src/app/dashboard/components/TransactionPageSection/Search.tsx - NO CHANGES NEEDED HERE
"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  searchTerm: string; // Receive current search term
  onSearchChange: (newSearchTerm: string) => void; // Callback to update parent state
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value); // Update parent state on input change
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <FiSearch
          className="h-5 w-5 text-neutral-900 dark:text-white"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        placeholder="Search Name, Type, Status..." // Updated placeholder
        className="w-full rounded-full h-12.5 py-3 pl-12 pr-3 border border-neutral-300 dark:border-neutral-700 focus:border-neutral-500 dark:focus:border-neutral-500 focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-neutral-600 dark:placeholder:text-neutral-400 bg-white dark:bg-primarybox text-neutral-900 dark:text-white" // Added more styling for consistency
        value={searchTerm} // Controlled input
        onChange={handleInputChange}
        aria-label="Search transactions" // Accessibility
      />
    </div>
  );
};

export default Search;