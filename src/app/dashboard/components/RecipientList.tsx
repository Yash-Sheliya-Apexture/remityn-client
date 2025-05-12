// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React from "react";
// import { Recipient } from "../../data/transactions";

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   return (
//     <div className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//       {/* Recipients List */}
//       <div className="flex items-center">
//         <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//           <span className="font-bold text-main">
//             {getInitials(recipient.accountHolderName)}
//           </span>
//           {recipient.countryCode === "INR" && (
//             <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//               <Image
//                 src={"/assets/icon/inr.svg"}
//                 alt="inr flag"
//                 width={20}
//                 height={20}
//               />
//             </div>
//           )}
//         </div>
//         <div className="ml-4">
//           <h5 className="font-medium text-main capitalize">
//             {recipient.accountHolderName}
//           </h5>
//           {recipient.accountNumber && (
//             <p className="text-sm text-gray-600">
//               {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//             </p>
//           )}
//         </div>
//       </div>
//       {/* Recipients List */}

//       {showCheckbox && (
//         <div className="pt-1.5">
//           <input
//             type="checkbox"
//             className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//             checked={isSelected}
//             onChange={(e) =>
//               onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked)
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// // Latest Updated Code
// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { Recipient } from "../../data/transactions";
// import { IoIosArrowForward } from "react-icons/io"; // Import the icon

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);

//   const handleItemClick = () => {
//     if (showCheckbox && onCheckboxChange && checkboxRef.current) {
//       checkboxRef.current.click(); // Programmatically trigger checkbox click
//     }
//   };

//   const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked);
//   };

//   return (
//     <div
//       className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between">
//         {/* Recipients List */}
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//             <span className="font-bold text-main">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium text-main capitalize">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-600">
//                 {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Recipients List */}

//         {showCheckbox ? ( // If showCheckbox is true, render checkbox
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : ( // If showCheckbox is false, render icon
//           <div className="">
//             <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // components/Filter/RecipientListItem.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { Recipient } from "../../data/transactions";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation'; // Import useRouter

// interface RecipientListProps {
//   recipient: Recipient;
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const nameParts = accountHolderName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 2) {
//       initials = nameParts[0][0] + nameParts[1][0];
//     } else if (nameParts.length === 1) {
//       initials = nameParts[0].slice(0, 2);
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const router = useRouter(); // Initialize useRouter

//   const handleItemClick = () => {
//     if (!showCheckbox) {
//       router.push(`/dashboard/recipients/${recipient.id}`); // Navigate to recipient details page
//       return;
//     }
//     if (showCheckbox && onCheckboxChange && checkboxRef.current) {
//       checkboxRef.current.click(); // Programmatically trigger checkbox click
//     }
//   };

//   const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCheckboxChange && onCheckboxChange(recipient.id, e.target.checked);
//   };

//   return (
//     <div
//       className="hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between">
//         {/* Recipients List */}
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//             <span className="font-bold text-main">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             {recipient.countryCode === "INR" && (
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                 <Image
//                   src={"/assets/icon/inr.svg"}
//                   alt="inr flag"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium text-main capitalize">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-600">
//                 {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Recipients List */}

//         {showCheckbox ? ( // If showCheckbox is true, render checkbox
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : ( // If showCheckbox is false, render icon
//           <div className="">
//             <IoIosArrowForward className="h-5 w-5 text-gray-500" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/components/RecipientList.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from 'next/navigation';

// interface RecipientListProps {
//   recipient: any; // Type this properly with your Recipient type from backend if possible
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") { // Ensure there's a word after trimming
//       initials += nameParts[0][0]; // First letter of the first word
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") { // Ensure there's a last word after trimming
//         initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//       }
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const handleItemClick = () => {
//     if (!showCheckbox) {
//       router.push(`/dashboard/recipients/${recipient._id}`); // Navigate to recipient details page using _id from backend
//       return;
//     }
//     if (showCheckbox && onCheckboxChange && checkboxRef.current) {
//       checkboxRef.current.click();
//     }
//   };

//   const handleCheckboxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onCheckboxChange && onCheckboxChange(recipient._id, e.target.checked); // Use recipient._id
//   };

//   return (
//     <div
//       className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative">
//             <span className="font-bold text-neutral-900 dark:text-white">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//               <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                 <Image
//                   src={`/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} // Use dynamic icon path
//                   alt={`${recipient.currency.code} flag`}
//                   width={20}
//                   height={20}
//                   onError={() => console.error(`Error loading image for ${recipient.currency.code}`)}
//                 />
//               </div>
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                 {recipient.currency.code} Account ending in {recipient.accountNumber.slice(-4)} {/* Use dynamic currency code */}
//               </p>
//             )}
//           </div>
//         </div>

//         {showCheckbox ? (
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="rounded-sm size-5 border-gray-500 font-medium
//                accent-primary dark:border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : (
//           <div className="ml-4">
//             <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // frontend/src/app/dashboard/components/RecipientList.tsx
// "use client";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/navigation";

// interface RecipientListProps {
//   recipient: any; // Type this properly with your Recipient type from backend if possible
//   isSelected: boolean;
//   onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
//   showCheckbox?: boolean;
// }

// export default function RecipientList({
//   recipient,
//   isSelected,
//   onCheckboxChange,
//   showCheckbox = true,
// }: RecipientListProps) {
//   const getInitials = (accountHolderName: string) => {
//     const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
//     const nameParts = trimmedName.toUpperCase().split(" ");
//     let initials = "";
//     if (nameParts.length >= 1 && nameParts[0] !== "") {
//       // Ensure there's a word after trimming
//       initials += nameParts[0][0]; // First letter of the first word
//       if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
//         // Ensure there's a last word after trimming
//         initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
//       }
//     }
//     return initials;
//   };

//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const handleItemClick = () => {
//     if (!showCheckbox) {
//       router.push(`/dashboard/recipients/${recipient._id}`); // Navigate to recipient details page using _id from backend
//       return;
//     }

//     // Always toggle the checkbox state on div click when showCheckbox is true
//     if (onCheckboxChange) {
//       const newCheckedState = !isSelected; // Toggle the selected state
//       onCheckboxChange(recipient._id, newCheckedState);
//     }
//   };

//   const handleCheckboxInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     onCheckboxChange && onCheckboxChange(recipient._id, e.target.checked); // Use recipient._id
//   };

//   return (
//     <div
//       className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       onClick={handleItemClick}
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative">
//             <span className="font-bold text-neutral-900 dark:text-white">
//               {getInitials(recipient.accountHolderName)}
//             </span>
//             <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//               <Image
//                 src={`/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} // Use dynamic icon path
//                 alt={`${recipient.currency.code} flag`}
//                 width={20}
//                 height={20}
//                 onError={() =>
//                   console.error(
//                     `Error loading image for ${recipient.currency.code}`
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <div className="ml-4">
//             <h5 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
//               {recipient.accountHolderName}
//             </h5>
//             {recipient.accountNumber && (
//               <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                 {recipient.currency.code} Account ending in{" "}
//                 {recipient.accountNumber.slice(-4)}{" "}
//                 {/* Use dynamic currency code */}
//               </p>
//             )}
//           </div>
//         </div>

//         {showCheckbox ? (
//           <div className="pt-1.5">
//             <input
//               ref={checkboxRef}
//               type="checkbox"
//               className="rounded-sm size-5 border-gray-500 font-medium
//                accent-primary dark:border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isSelected}
//               onChange={handleCheckboxInputChange}
//             />
//           </div>
//         ) : (
//           <div className="ml-4">
//             <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// frontend/src/app/dashboard/components/RecipientList.tsx
"use client";
import Image from "next/image";
// No longer needed if ref is removed: import React, { useRef } from "react";
import React from "react"; // Keep React import
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"; // Import Shadcn Checkbox
import { Button } from "@/components/ui/button"; // Needed for correct ref type if kept

interface RecipientListProps {
  recipient: any; // Type this properly with your Recipient type from backend if possible
  isSelected: boolean;
  onCheckboxChange?: (recipientId: string | number, isChecked: boolean) => void;
  showCheckbox?: boolean;
}

export default function RecipientList({
  recipient,
  isSelected,
  onCheckboxChange,
  showCheckbox = true,
}: RecipientListProps) {
  const getInitials = (accountHolderName: string) => {
    const trimmedName = accountHolderName.trim(); // Trim leading/trailing spaces
    const nameParts = trimmedName.toUpperCase().split(" ");
    let initials = "";
    if (nameParts.length >= 1 && nameParts[0] !== "") {
      // Ensure there's a word after trimming
      initials += nameParts[0][0]; // First letter of the first word
      if (nameParts.length > 1 && nameParts[nameParts.length - 1] !== "") {
        // Ensure there's a last word after trimming
        initials += nameParts[nameParts.length - 1][0]; // First letter of the last word
      }
    }
    return initials;
  };

  // --- SOLUTION 1: Remove the ref if not needed ---
  // If you don't actually need to interact with the Checkbox's DOM element directly
  // (e.g., for focusing), you can simply remove the ref.
  // const checkboxRef = useRef<HTMLInputElement>(null); // REMOVE THIS LINE

  // --- SOLUTION 2: Use the correct ref type if needed ---
  // If you *do* need the ref for some reason, change the type to HTMLButtonElement
  // const checkboxRef = useRef<HTMLButtonElement>(null); // Use HTMLButtonElement

  const router = useRouter();

  const handleItemClick = () => {
    if (!showCheckbox) {
      router.push(`/dashboard/recipients/${recipient._id}`); // Navigate to recipient details page using _id from backend
      return;
    }

    // Always toggle the checkbox state on div click when showCheckbox is true
    if (onCheckboxChange) {
      const newCheckedState = !isSelected; // Toggle the selected state
      onCheckboxChange(recipient._id, newCheckedState);
    }
  };

  const handleCheckboxInputChange = (checked: boolean | 'indeterminate') => { // Shadcn onCheckedChange provides boolean or 'indeterminate'
    // Ensure we only pass boolean to our handler if that's what it expects
    if (typeof checked === 'boolean' && onCheckboxChange) {
       onCheckboxChange(recipient._id, checked); // Use recipient._id and checked value
    }
  };

  // Prevent the click event on the checkbox itself from propagating to the parent div,
  // otherwise handleItemClick would run *after* handleCheckboxInputChange,
  // effectively toggling the state twice.
  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  }

  return (
    <div
      className="block hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-12.5 h-12.5 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center relative">
            <span className="font-bold text-neutral-900 dark:text-white">
              {getInitials(recipient.accountHolderName)}
            </span>
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
              {recipient.currency?.code && ( // Add check for currency code existence
                 <Image
                 src={`/assets/icon/${recipient.currency.code.toLowerCase()}.svg`} // Use dynamic icon path
                 alt={`${recipient.currency.code} flag`}
                 width={20}
                 height={20}
                 onError={(e) => {
                    // Optional: Hide image container or show placeholder on error
                    console.error(`Error loading image for ${recipient.currency.code}`);
                    // e.currentTarget.style.display = 'none'; // Example: hide broken image icon
                 }}
               />
              )}
            </div>
          </div>
          <div className="ml-4">
            <h5 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">
              {recipient.accountHolderName}
            </h5>
            {recipient.accountNumber && recipient.currency?.code && ( // Add check for currency code
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                {recipient.currency.code} Account ending in{" "}
                {recipient.accountNumber.slice(-4)}{" "}
                {/* Use dynamic currency code */}
              </p>
            )}
             {/* Optional: Handle cases where account number might be missing but currency exists */}
             {!recipient.accountNumber && recipient.currency?.code && (
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {recipient.currency.code} Recipient
                </p>
             )}
          </div>
        </div>

        {showCheckbox ? (
          // Add onClick handler with stopPropagation to the Checkbox container
          <div className="pt-1.5" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              id={`recipient-checkbox-${recipient._id}`} // Added id for accessibility
              // ref={checkboxRef} // Remove or keep based on Solution 1 or 2 above
              checked={isSelected}
              onCheckedChange={handleCheckboxInputChange} // Use onCheckedChange and pass boolean value
              aria-label={`Select recipient ${recipient.accountHolderName}`} // Add accessibility label
            />
          </div>
        ) : (
          <div className="ml-4">
            <IoIosArrowForward className="size-5 text-neutral-900 dark:text-white" />
          </div>
        )}
      </div>
    </div>
  );
}