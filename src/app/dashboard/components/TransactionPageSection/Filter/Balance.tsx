// // components/Filter/Balance.tsx
// import React, { useState } from "react";
// import Image from "next/image";

// interface BalanceProps {
//   currency: string; // e.g., "EUR", "USD"
//   isSelected?: boolean; // Optional: Initial selected state
//   onBalanceChange?: (isSelected: boolean) => void; // Optional: Callback for changes
// }

// const Balance: React.FC<BalanceProps> = ({
//   currency,
//   isSelected = false,
//   onBalanceChange,
// }) => {
//   const [checked, setChecked] = useState(isSelected);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//     if (onBalanceChange) {
//       onBalanceChange(event.target.checked);
//     }
//   };

//   const getCurrencySymbol = (currencyCode: string) => {
//     switch (currencyCode.toUpperCase()) {
//       case "EUR":
//         return "/assets/icon/eur.svg";
//       case "USD":
//         return "/assets/icon/usd.svg"; // You might need to add USD icon
//       // Add more cases for other currencies if needed
//       default:
//         return "/assets/icon/default_currency.svg"; // Or a default icon
//     }
//   };

//   const getCurrencyName = (currencyCode: string) => {
//     switch (currencyCode.toUpperCase()) {
//       case "EUR":
//         return "Euro Balance";
//       case "USD":
//         return "US Dollar Balance";
//       // Add more cases for other currencies if needed
//       default:
//         return `${currencyCode} Balance`;
//     }
//   };

//   const currencyIcon = getCurrencySymbol(currency);
//   const currencyName = getCurrencyName(currency);

//   return (
//     <>
//       <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//         Balance
//       </h4>
//       <div className="pt-4">
//         <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="flex items-center">
//             <div className="relative">
//               <Image
//                 src={currencyIcon}
//                 alt={`${currencyName} Icon`}
//                 width={48}
//                 height={48}
//               />
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main capitalize">
//                 {currencyName}
//               </h5>
//             </div>
//           </div>
//           <div className="pt-1.5">
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={checked}
//               onChange={handleCheckboxChange}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Balance;

// components/Filter/Balance.tsx
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// export interface CurrencyBalance {
//   currencyCode: string;
//   currencyName: string;
//   currencySymbolPath: string; // Path to the currency symbol icon
// }

// export const currencyBalances: CurrencyBalance[] = [
//   {
//     currencyCode: "EUR",
//     currencyName: "Euro Balance",
//     currencySymbolPath: "/assets/icon/eur.svg",
//   },
//   {
//     currencyCode: "USD",
//     currencyName: "US Dollar Balance",
//     currencySymbolPath: "/assets/icon/usd.svg",
//   },
//   // Add more currencies as needed
//   {
//     currencyCode: "GBP",
//     currencyName: "British Pound Balance",
//     currencySymbolPath: "/assets/icon/gbp.svg", // Example path, you might need to add this icon
//   },
//   {
//     currencyCode: "CAD",
//     currencyName: "Canadian Dollar Balance",
//     currencySymbolPath: "/assets/icon/cad.svg", // Example path, you might need to add this icon
//   },
// ];

// interface BalanceProps {
//   currencyBalance: CurrencyBalance; // Now accepts a CurrencyBalance object
//   isSelected?: boolean; // Indicate if this currency is selected
//   onBalanceChange?: (isSelected: boolean, currencyCode: string) => void; // Pass currencyCode to callback
// }

// const BalanceComponent: React.FC<BalanceProps> = ({
//   currencyBalance, // Use currencyBalance prop
//   isSelected = false,
//   onBalanceChange,
// }) => {
//   const [checked, setChecked] = useState(isSelected);

//   useEffect(() => {
//     setChecked(isSelected); // Sync checked state with isSelected prop
//   }, [isSelected]);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//     if (onBalanceChange) {
//       onBalanceChange(event.target.checked, currencyBalance.currencyCode); // Pass currencyCode
//     }
//   };

//   return (
//     <div className="flex items-center justify-between dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
//       <div className="flex items-center">
//         <div className="relative">
//           <Image
//             src={currencyBalance.currencySymbolPath}
//             alt={`${currencyBalance.currencyName} Icon`}
//             width={48}
//             height={48}
//           />
//         </div>
//         <div className="ml-4">
//           <h5 className="font-medium text-neutral-900 dark:text-white capitalize">
//             {currencyBalance.currencyName}
//           </h5>
//         </div>
//       </div>
//       <div className="pt-1.5">
//         <input
//           type="checkbox"
//           className="rounded-sm size-5 border-gray-500 font-medium cursor-pointer
//                accent-primary dark:border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//           checked={checked}
//           onChange={handleCheckboxChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default BalanceComponent; // Rename the component to avoid confusion with data name


// // components/Filter/Balance.tsx
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";

// export interface CurrencyBalance {
//   currencyCode: string;
//   currencyName: string;
//   currencySymbolPath: string; // Path to the currency symbol icon
// }

// export const currencyBalances: CurrencyBalance[] = [
//   {
//     currencyCode: "EUR",
//     currencyName: "Euro Balance",
//     currencySymbolPath: "/assets/icon/eur.svg",
//   },
//   {
//     currencyCode: "USD",
//     currencyName: "US Dollar Balance",
//     currencySymbolPath: "/assets/icon/usd.svg",
//   },
//   // Add more currencies as needed
//   {
//     currencyCode: "GBP",
//     currencyName: "British Pound Balance",
//     currencySymbolPath: "/assets/icon/gbp.svg", // Example path, you might need to add this icon
//   },
//   {
//     currencyCode: "CAD",
//     currencyName: "Canadian Dollar Balance",
//     currencySymbolPath: "/assets/icon/cad.svg", // Example path, you might need to add this icon
//   },
// ];

// interface BalanceProps {
//   currencyBalance: CurrencyBalance; // Now accepts a CurrencyBalance object
//   isSelected?: boolean; // Indicate if this currency is selected
//   onBalanceChange?: (isSelected: boolean, currencyCode: string) => void; // Pass currencyCode to callback
// }

// const BalanceComponent: React.FC<BalanceProps> = ({
//   currencyBalance, // Use currencyBalance prop
//   isSelected = false,
//   onBalanceChange,
// }) => {
//   const [checked, setChecked] = useState(isSelected);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setChecked(isSelected); // Sync checked state with isSelected prop
//   }, [isSelected]);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newChecked = event.target.checked;
//     setChecked(newChecked);
//     if (onBalanceChange) {
//       onBalanceChange(newChecked, currencyBalance.currencyCode); // Pass currencyCode
//     }
//   };


//   const handleDivClick = () => {
//     const newChecked = !checked;
//     setChecked(newChecked);
//     if (onBalanceChange) {
//       onBalanceChange(newChecked, currencyBalance.currencyCode);
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-between dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleDivClick}
//       ref={containerRef}
//     >
//       <div className="flex items-center">
//         <div className="relative">
//           <Image
//             src={currencyBalance.currencySymbolPath}
//             alt={`${currencyBalance.currencyName} Icon`}
//             width={48}
//             height={48}
//           />
//         </div>
//         <div className="ml-4">
//           <h5 className="font-medium text-neutral-900 dark:text-white capitalize">
//             {currencyBalance.currencyName}
//           </h5>
//         </div>
//       </div>
//       <div className="pt-1.5">
//         <input
//           type="checkbox"
//           className="rounded-sm size-5 border-gray-500 font-medium cursor-pointer
//                accent-primary dark:border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//           checked={checked}
//           onChange={handleCheckboxChange}
//           onClick={(e) => e.stopPropagation()} // Prevent div click when checkbox is clicked directly
//         />
//       </div>
//     </div>
//   );
// };

// export default BalanceComponent; // Rename the component to avoid confusion with data name







// // components/Filter/Balance.tsx
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Checkbox } from "@/components/ui/checkbox"; // Import Shadcn Checkbox

// export interface CurrencyBalance {
//   currencyCode: string;
//   currencyName: string;
//   currencySymbolPath: string; // Path to the currency symbol icon
// }

// export const currencyBalances: CurrencyBalance[] = [
//   {
//     currencyCode: "EUR",
//     currencyName: "Euro Balance",
//     currencySymbolPath: "/assets/icon/eur.svg",
//   },
//   {
//     currencyCode: "USD",
//     currencyName: "US Dollar Balance",
//     currencySymbolPath: "/assets/icon/usd.svg",
//   },
//   // Add more currencies as needed
//   {
//     currencyCode: "GBP",
//     currencyName: "British Pound Balance",
//     currencySymbolPath: "/assets/icon/gbp.svg", // Example path, you might need to add this icon
//   },
//   {
//     currencyCode: "CAD",
//     currencyName: "Canadian Dollar Balance",
//     currencySymbolPath: "/assets/icon/cad.svg", // Example path, you might need to add this icon
//   },
// ];

// interface BalanceProps {
//   currencyBalance: CurrencyBalance; // Now accepts a CurrencyBalance object
//   isSelected?: boolean; // Indicate if this currency is selected
//   onBalanceChange?: (isSelected: boolean, currencyCode: string) => void; // Pass currencyCode to callback
// }

// const BalanceComponent: React.FC<BalanceProps> = ({
//   currencyBalance, // Use currencyBalance prop
//   isSelected = false,
//   onBalanceChange,
// }) => {
//   const [checked, setChecked] = useState(isSelected);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setChecked(isSelected); // Sync checked state with isSelected prop
//   }, [isSelected]);

//   const handleCheckboxChange = (newChecked: boolean) => { // Changed event type to boolean from Shadcn Checkbox
//     setChecked(newChecked);
//     if (onBalanceChange) {
//       onBalanceChange(newChecked, currencyBalance.currencyCode); // Pass currencyCode
//     }
//   };


//   const handleDivClick = () => {
//     const newChecked = !checked;
//     setChecked(newChecked);
//     if (onBalanceChange) {
//       onBalanceChange(newChecked, currencyBalance.currencyCode);
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-between dark:hover:bg-primarybox hover:bg-lightgray sm:p-4 p-2 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleDivClick}
//       ref={containerRef}
//     >
//       <div className="flex items-center">
//         <div className="relative">
//           <Image
//             src={currencyBalance.currencySymbolPath}
//             alt={`${currencyBalance.currencyName} Icon`}
//             width={48}
//             height={48}
//           />
//         </div>
//         <div className="ml-4">
//           <h5 className="font-medium text-neutral-900 dark:text-white capitalize">
//             {currencyBalance.currencyName}
//           </h5>
//         </div>
//       </div>
//       <div className="pt-1.5">
//         <Checkbox
//           id={`balance-checkbox-${currencyBalance.currencyCode}`} // Added id for accessibility
//           checked={checked}
//           onCheckedChange={handleCheckboxChange} // Use onCheckedChange and pass boolean value
//           onClick={(e) => e.stopPropagation()} // Prevent div click when checkbox is clicked directly
//           className="size-5 border-neutral-400 shadow-none"
//         />
//       </div>
//     </div>
//   );
// };

// export default BalanceComponent; // Rename the component to avoid confusion with data name



// components/Filter/Balance.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"; // Import Shadcn Checkbox

// Interface defining the expected props for a single balance filter item
// Corresponds to the data mapped from 'userAccounts' in FilterModal
export interface CurrencyBalance {
  currencyCode: string;
  currencyName: string;
  currencySymbolPath: string; // Path to the currency symbol icon/flag
}

// Interface for the component's props
interface BalanceFilterItemProps {
  currencyBalance: CurrencyBalance; // Accepts a single CurrencyBalance object
  isSelected?: boolean;            // Indicates if this currency is currently selected by the parent
  onBalanceChange?: (isSelected: boolean, currencyCode: string) => void; // Callback to notify parent of changes
}

// Renamed component for clarity
const BalanceFilterItem: React.FC<BalanceFilterItemProps> = ({
  currencyBalance,
  isSelected = false, // Default to false if not provided
  onBalanceChange,
}) => {
  // Internal state to manage the visual checked status of the checkbox
  const [checked, setChecked] = useState(isSelected);
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect to sync the internal 'checked' state if the 'isSelected' prop changes from the parent
  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);

  // Handler for when the Shadcn Checkbox component's state changes
  const handleCheckboxChange = (newCheckedState: boolean | 'indeterminate') => {
    // We only care about boolean true/false for this use case
    const newChecked = typeof newCheckedState === 'boolean' ? newCheckedState : false;
    setChecked(newChecked); // Update internal visual state
    if (onBalanceChange) {
      // Notify the parent component about the change, passing the new state and currency code
      onBalanceChange(newChecked, currencyBalance.currencyCode);
    }
  };

  // Handler for clicking the entire div container (acts as a larger click target)
  const handleDivClick = () => {
    const newChecked = !checked; // Toggle the current state
    setChecked(newChecked); // Update internal visual state
    if (onBalanceChange) {
       // Notify the parent component about the change
      onBalanceChange(newChecked, currencyBalance.currencyCode);
    }
  };

  return (
    // Make the entire div clickable
    <div
      className="flex items-center justify-between hover:bg-primarybox sm:p-4 p-2 rounded-2xl transition-colors duration-150 ease-in-out cursor-pointer"
      onClick={handleDivClick}
      ref={containerRef}
      role="checkbox" // Accessibility: Indicate the div acts like a checkbox container
      aria-checked={checked} // Accessibility: Announce the checked state
      tabIndex={0} // Accessibility: Make the div focusable
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleDivClick(); }}} // Accessibility: Allow toggling with space/enter
    >
      {/* Currency Info */}
      <div className="flex items-center pointer-events-none"> {/* Prevent clicks on children propagating */}
        <div className="relative flex-shrink-0 size-10 md:size-12"> {/* Adjusted size */}
          <Image
            src={currencyBalance.currencySymbolPath}
            alt={`${currencyBalance.currencyName} flag`} // Use "flag" for better description
            fill // Use fill for responsive images within the sized container
            sizes="(max-width: 768px) 40px, 48px" // Provide sizes hint
            className="rounded-full object-cover" // Ensure image is round and covers
            onError={(e) => { // Basic fallback in case image fails to load
                e.currentTarget.src = '/assets/icon/default-flag.svg'; // Provide a default placeholder
                e.currentTarget.alt = 'Default currency flag';
             }}
          />
        </div>
        <div className="ml-3 md:ml-4"> {/* Adjusted margin */}
          <h5 className="font-medium text-white/90 capitalize text-sm md:text-base"> {/* Adjusted text size */}
            {currencyBalance.currencyName}
          </h5>
          {/* Optional: Could add currency code here if needed */}
          <p className="text-xs text-subheadingWhite">{currencyBalance.currencyCode}</p>
        </div>
      </div>

      {/* Checkbox */}
      {/* Use hidden label for accessibility, linked by htmlFor */}
      <label htmlFor={`balance-checkbox-${currencyBalance.currencyCode}`} className="sr-only">
          Select {currencyBalance.currencyName}
      </label>
      <Checkbox
        id={`balance-checkbox-${currencyBalance.currencyCode}`}
        checked={checked}
        onCheckedChange={handleCheckboxChange} // Use the specific handler for Shadcn Checkbox
        onClick={(e) => e.stopPropagation()} // VERY IMPORTANT: Prevent click on checkbox triggering the div click handler
        className="size-5 shadow-none data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" // Added more specific styling based on Shadcn convention
        aria-label={`Select ${currencyBalance.currencyName}`} // More descriptive aria-label
      />
    </div>
  );
};

// Export the renamed component
export default BalanceFilterItem;