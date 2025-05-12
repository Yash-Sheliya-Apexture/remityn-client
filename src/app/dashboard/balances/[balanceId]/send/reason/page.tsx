// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import Link from 'next/link';
// import DashboardHeader from '../../../../components/layout/DashboardHeader';

// interface ReasonParams {
//     balanceId: string;
// }

// // Define steps for the header (if using)
// const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Adjust based on whether reason is always shown

// const TransferReasonPage = () => {
//     const router = useRouter();
//     const params = useParams<ReasonParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const [selectedReason, setSelectedReason] = useState('');
//     const [error, setError] = useState('');

//     // Retrieve summary from localStorage
//     const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

//     useEffect(() => {
//          const storedSummary = localStorage.getItem('sendTransferSummary');
//          if (storedSummary) {
//              setSummary(JSON.parse(storedSummary));
//          } else {
//              // Handle missing summary - maybe redirect back
//              setError("Transfer details missing. Please start again.");
//              console.error("Transfer summary missing from localStorage");
//              // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//          }
//     }, []);

//     const reasons = [
//         "Sending money home to family",
//         "Paying for goods or services",
//         "Property payment",
//         "Paying salary",
//         "General expenses",
//     ];

//     const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedReason(event.target.value);
//         setError(''); // Clear error on selection
//     };

//     const handleSubmit = () => {
//         if (!selectedReason) {
//             setError('Please select a reason for your transfer.');
//             return;
//         }
//         if (!summary) {
//              setError("Transfer details missing. Please start again.");
//              return;
//          }

//         // Add reason to summary object
//          const updatedSummary = { ...summary, reason: selectedReason };
//          localStorage.setItem('sendTransferSummary', JSON.stringify(updatedSummary)); // Update localStorage

//         // Navigate to review page
//         router.push(`/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`);
//     };

//     return (
//         <div className='TransferReason-Page'>
//              {/* Optional Header */}
//              {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//              <div className="container mx-auto max-w-lg p-4 lg:p-8">

//                  <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">What's the reason for your transfer?</h1>
//                  {/* Add note about India transfers if needed */}
//                  {summary?.receiveCurrencyCode === 'INR' && (
//                      <p className="text-gray-500 dark:text-gray-300 mb-6">Please note that transfers to charities or NGOs in India may have restrictions.</p>
//                  )}

//                 <div className="mb-6">
//                      <label htmlFor="transfer-reason" className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
//                          Select an option that best describes the reason
//                      </label>
//                      <select
//                          id="transfer-reason"
//                          value={selectedReason}
//                          onChange={handleReasonChange}
//                          className={`block w-full border dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 ${error ? '' : ''}`}
//                      >
//                          <option value="" disabled>Select an option</option>
//                          {reasons.map((reason) => (
//                              <option key={reason} value={reason}>{reason}</option>
//                          ))}
//                      </select>
//                      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//                 </div>

//                  <button
//                      onClick={handleSubmit}
//                      className="w-full bg-primary text-secondary font-semibold py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors"
//                      disabled={!summary} // Disable if summary is missing
//                  >
//                      Continue
//                  </button>
//              </div>
//         </div>
//     );
// };

// export default TransferReasonPage;

// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import Link from "next/link";
// import DashboardHeader from "../../../../components/layout/DashboardHeader";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { GiCheckMark } from "react-icons/gi";

// interface ReasonParams {
//   balanceId: string;
// }

// // Define steps for the header (if using)
// const steps = ["Recipient", "Amount", "Review", "Pay"]; // Adjust based on whether reason is always shown

// const TransferReasonPage = () => {
//   const router = useRouter();
//   const params = useParams<ReasonParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [error, setError] = useState("");
//   const dropdownRef = useRef(null);

//   // Retrieve summary from localStorage
//   const [summary, setSummary] = useState<any>(null); // Use 'any' or define SendSummary interface

//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//       setSummary(JSON.parse(storedSummary));
//     } else {
//       // Handle missing summary - maybe redirect back
//       setError("Transfer details missing. Please start again.");
//       console.error("Transfer summary missing from localStorage");
//       // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     }

//     const handleClickOutside = (event: any) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const reasons = [
//     "Sending money home to family",
//     "Paying for goods or services",
//     "Property payment",
//     "Paying salary",
//     "General expenses",
//   ];

//   const handleReasonSelect = (reason: string) => {
//     setSelectedReason(reason);
//     setIsDropdownOpen(false);
//     setError(""); // Clear error on selection
//   };

//   const handleSubmit = () => {
//     if (!selectedReason) {
//       setError("Please select a reason for your transfer.");
//       return;
//     }
//     if (!summary) {
//       setError("Transfer details missing. Please start again.");
//       return;
//     }

//     // Add reason to summary object
//     const updatedSummary = { ...summary, reason: selectedReason };
//     localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

//     // Navigate to review page
//     router.push(
//       `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
//     );
//   };

//   return (
//     <div className="TransferReason-Page">
//       {/* Optional Header */}
//       {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//       <div className="container mx-auto max-w-lg p-4 lg:p-8">
//         <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">
//           What's the reason for your transfer?
//         </h1>
//         {/* Add note about India transfers if needed */}
//         {summary?.receiveCurrencyCode === "INR" && (
//           <p className="text-gray-500 dark:text-gray-300 mb-6">
//             Please note that transfers to charities or NGOs in India may have
//             restrictions.
//           </p>
//         )}

//         <div className="mb-6" ref={dropdownRef}>
//           <label
//             htmlFor="transfer-reason"
//             className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
//           >
//             Select an option that best describes the reason
//           </label>
//           <div className="relative">
//             <button
//               type="button"
//               className={`flex justify-between items-center cursor-pointer w-full border dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 text-left ${
//                 error ? "" : ""
//               }`}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-expanded={isDropdownOpen}
//               aria-haspopup="listbox"
//             >
//               {selectedReason || (
//                 <span className="text-gray-500 dark:text-white">
//                   Select an option
//                 </span>
//               )}
//               <IoChevronDownOutline
//                 className={`size-6 text-gray-500 dark:text-gray-300 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 } transition-transform duration-300`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div
//                 className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-background border focus:outline-none"
//                 role="listbox"
//                 aria-activedescendant="listbox-item-3" // You might need to dynamically manage this for accessibility
//               >
//                 <ul
//                   className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
//                   tabIndex={-1}
//                   role="listbox"
//                 >
//                   {reasons.map((reason) => (
//                     <li
//                       key={reason}
//                       className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300  ${
//                         selectedReason === reason
//                           ? "font-semibold bg-primary dark:bg-background "
//                           : "font-normal hover:bg-lightgray dark:hover:bg-background hover:text-subheading"
//                       }`}
//                       id="listbox-item-0"
//                       role="option"
//                       onClick={() => handleReasonSelect(reason)}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium ml-2 block truncate">
//                           {reason}
//                         </span>
//                       </div>
//                       {selectedReason === reason && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                         <GiCheckMark className="text-main dark:text-gray-300 size-5"/>
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-primary  hover:bg-primaryhover text-mainheading cursor-pointer h-14 font-medium py-3 rounded-full disabled:opacity-50 hover:bg-primary-hover transition-colors duration-300 ease-in-out"
//           disabled={!summary} // Disable if summary is missing
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferReasonPage;



// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { GiCheckMark } from "react-icons/gi";

// interface ReasonParams {
//   balanceId: string;
// }

// // Define an interface for the summary data stored in localStorage
// // Adjust fields based on your actual summary object structure
// interface SendSummary {
//   recipientId: string;
//   recipientName?: string; // Example field
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   rate?: number; // Example field
//   fee?: number; // Example field
//   reason?: string; // Reason will be added here
//   // Add other relevant fields from your summary object
// }


// // Define steps for the header (if using)
// // const steps = ["Recipient", "Amount", "Review", "Pay"]; // Removed unused variable

// const TransferReasonPage = () => {
//   const router = useRouter();
//   const params = useParams<ReasonParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [error, setError] = useState("");
//   const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify ref type

//   // Retrieve summary from localStorage
//   const [summary, setSummary] = useState<SendSummary | null>(null); // Use defined interface

//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//         try {
//             const parsedSummary: SendSummary = JSON.parse(storedSummary);
//             // Basic validation (optional but recommended)
//             if (parsedSummary && typeof parsedSummary === 'object' && parsedSummary.recipientId) {
//                  setSummary(parsedSummary);
//             } else {
//                  throw new Error("Invalid summary format");
//             }
//         } catch (e) {
//             setError("Failed to load transfer details. Please start again.");
//             console.error("Error parsing transfer summary from localStorage:", e);
//             // Optional: Clear invalid storage item
//             // localStorage.removeItem("sendTransferSummary");
//             // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         }
//     } else {
//       // Handle missing summary - maybe redirect back
//       setError("Transfer details missing. Please start again.");
//       console.error("Transfer summary missing from localStorage");
//       // Optional: router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//     }

//     // Type the event parameter
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Use type assertion
//         setIsDropdownOpen(false);
//       }
//     };

//     // Add listener with correct type
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Remove listener with correct type
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []); // Removed balanceId and recipientId from dependency array as they don't directly affect this effect


//   const reasons = [
//     "Sending money home to family",
//     "Paying for goods or services",
//     "Property payment",
//     "Paying salary",
//     "General expenses",
//   ];

//   const handleReasonSelect = (reason: string) => {
//     setSelectedReason(reason);
//     setIsDropdownOpen(false);
//     setError(""); // Clear error on selection
//   };

//   const handleSubmit = () => {
//     if (!selectedReason) {
//       setError("Please select a reason for your transfer.");
//       return;
//     }
//     if (!summary) {
//       setError("Transfer details missing. Please start again.");
//       // Maybe disable the button if summary is null to prevent this state
//       return;
//     }

//     // Add reason to summary object
//     const updatedSummary: SendSummary = { ...summary, reason: selectedReason };
//     localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

//     // Navigate to review page
//     // Ensure recipientId is still valid before navigating
//     if (!recipientId) {
//         setError("Recipient information is missing. Please go back.");
//         console.error("Recipient ID missing from search params on reason page");
//         return;
//     }
//     router.push(
//       `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
//     );
//   };

//   return (
//     <div className="TransferReason-Page">
//       {/* Optional Header */}
//       {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//       <div className="container mx-auto max-w-lg p-4 lg:p-8">
//         {/* Escaped apostrophe */}
//         <h1 className="text-xl lg:text-2xl font-bold capitalize text-main dark:text-white mb-4">
//           What&apos;s the reason for your transfer?
//         </h1>
//         {/* Add note about India transfers if needed */}
//         {summary?.receiveCurrencyCode === "INR" && (
//           <p className="text-gray-500 dark:text-gray-300 mb-6">
//             Please note that transfers to charities or NGOs in India may have
//             restrictions.
//           </p>
//         )}

//         <div className="mb-6" ref={dropdownRef}>
//           <label
//             htmlFor="transfer-reason-button" // Match the button id if needed, or just associate with the concept
//             className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
//           >
//             Select an option that best describes the reason
//           </label>
//           <div className="relative">
//             <button
//               id="transfer-reason-button" // Added id for label association
//               type="button"
//               className={`flex justify-between items-center cursor-pointer w-full border dark:border-gray-600 dark:bg-background dark:hover:shadow-whitecolor hover:shadow-darkcolor transition-shadow duration-300 ease-in-out rounded-md p-3 text-left ${
//                 error ? "border-red-500" : "border-gray-300 dark:border-gray-600" // Add error styling to border
//               }`}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-expanded={isDropdownOpen}
//               aria-haspopup="listbox"
//               aria-controls="reason-listbox" // Added aria-controls
//             >
//               {selectedReason || (
//                 <span className="text-gray-500 dark:text-white">
//                   Select an option
//                 </span>
//               )}
//               <IoChevronDownOutline
//                 className={`size-6 text-gray-500 dark:text-gray-300 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 } transition-transform duration-300`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div
//                 id="reason-listbox" // Added id for aria-controls
//                 className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-background border border-gray-300 dark:border-gray-600 focus:outline-none"
//                 role="listbox"
//                 aria-labelledby="transfer-reason-button" // Labelled by the button
//                 // aria-activedescendant is managed automatically by focus usually, or manually if implementing keyboard nav
//               >
//                 <ul
//                   className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
//                   tabIndex={-1} // Keep focus management on the container or button
//                   role="presentation" // Role listbox is on the parent div
//                 >
//                   {reasons.map((reason) => (
//                     <li
//                       key={reason}
//                       className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300 ${
//                         selectedReason === reason
//                           ? "font-semibold bg-primary/20 dark:bg-primary/30" // Adjusted selected style
//                           : "font-normal hover:bg-lightgray dark:hover:bg-gray-700 hover:text-subheading dark:hover:text-white" // Adjusted hover style
//                       }`}
//                       id={`listbox-option-${reason.replace(/\s+/g, '-')}`} // Generate unique ID
//                       role="option"
//                       // Added aria-selected attribute
//                       aria-selected={selectedReason === reason}
//                       onClick={() => handleReasonSelect(reason)}
//                       // Optional: Add keyboard support (onKeyDown) if needed for full accessibility
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium ml-2 block truncate">
//                           {reason}
//                         </span>
//                       </div>
//                       {selectedReason === reason && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                         <GiCheckMark className="text-main dark:text-primary size-5"/>
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-primary hover:bg-primaryhover text-white cursor-pointer h-14 font-medium py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out"
//           // Disable button if no reason selected OR if summary is missing
//           disabled={!summary || !selectedReason}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferReasonPage;



// // frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { GiCheckMark } from "react-icons/gi";

// // The specific interface `ReasonParams` caused the issue because the generic
// // constraint for useParams expects a type compatible with `Record<string, string | string[]>`.
// // We can remove the explicit generic from useParams and let TypeScript infer it.
// // interface ReasonParams {
// //   balanceId: string;
// // }

// // Define an interface for the summary data stored in localStorage
// // Adjust fields based on your actual summary object structure
// interface SendSummary {
//   recipientId: string;
//   recipientName?: string; // Example field
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   rate?: number; // Example field
//   fee?: number; // Example field
//   reason?: string; // Reason will be added here
//   // Add other relevant fields from your summary object
// }


// // Define steps for the header (if using)
// // const steps = ["Recipient", "Amount", "Review", "Pay"]; // Removed unused variable

// const TransferReasonPage = () => {
//   const router = useRouter();
//   // Remove the explicit generic type <ReasonParams>.
//   // useParams() will return an object with string keys and string | string[] | undefined values.
//   const params = useParams();
//   const searchParams = useSearchParams();

//   // Access balanceId from the inferred params object.
//   // Since `[balanceId]` is a dynamic segment, Next.js typically provides it as a string.
//   // We can assert it as string if we are confident based on the route structure,
//   // or add a runtime check for robustness.
//   const balanceId = params.balanceId as string;

//   // Add a runtime check for safety (optional but recommended)
//   if (typeof balanceId !== 'string') {
//     console.error("Invalid balanceId parameter:", balanceId);
//     // Handle the error appropriately, maybe show an error message or redirect
//     // For example:
//     // setError("Invalid URL parameter. Cannot proceed.");
//     // return <div>Error loading page details.</div>;
//     // Or redirect:
//     // router.push('/dashboard'); // Redirect to a safe page
//     // For now, let's just log and potentially show an error state later if needed
//   }


//   const recipientId = searchParams.get("recipientId");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [error, setError] = useState("");
//   const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify ref type

//   // Retrieve summary from localStorage
//   const [summary, setSummary] = useState<SendSummary | null>(null); // Use defined interface

//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//         try {
//             const parsedSummary: SendSummary = JSON.parse(storedSummary);
//             // Basic validation (optional but recommended)
//             if (parsedSummary && typeof parsedSummary === 'object' && parsedSummary.recipientId) {
//                  setSummary(parsedSummary);
//             } else {
//                  throw new Error("Invalid summary format");
//             }
//         } catch (e) {
//             setError("Failed to load transfer details. Please start again.");
//             console.error("Error parsing transfer summary from localStorage:", e);
//             // Optional: Clear invalid storage item
//             // localStorage.removeItem("sendTransferSummary");
//             // Optional: Consider redirecting if summary is crucial and invalid/missing
//             // if (balanceId) { // Check if balanceId is valid before redirecting
//             //     router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//             // }
//         }
//     } else {
//       // Handle missing summary - maybe redirect back
//       setError("Transfer details missing. Please start again.");
//       console.error("Transfer summary missing from localStorage");
//       // Optional: Consider redirecting if summary is crucial and missing
//         // if (balanceId) { // Check if balanceId is valid before redirecting
//         //     router.push(`/dashboard/balances/${balanceId}/send/select-recipient`);
//         // }
//     }

//     // Type the event parameter
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Use type assertion
//         setIsDropdownOpen(false);
//       }
//     };

//     // Add listener with correct type
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Remove listener with correct type
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Keep dependency array minimal for this effect


//   const reasons = [
//     "Sending money home to family",
//     "Paying for goods or services",
//     "Property payment",
//     "Paying salary",
//     "General expenses",
//   ];

//   const handleReasonSelect = (reason: string) => {
//     setSelectedReason(reason);
//     setIsDropdownOpen(false);
//     setError(""); // Clear error on selection
//   };

//   const handleSubmit = () => {
//     if (!selectedReason) {
//       setError("Please select a reason for your transfer.");
//       return;
//     }
//     if (!summary) {
//       setError("Transfer details missing. Please start again.");
//       // Maybe disable the button if summary is null to prevent this state
//       return;
//     }
//     // Ensure balanceId is valid before proceeding (it should be checked earlier)
//     if (typeof balanceId !== 'string') {
//         setError("Page URL is invalid. Please go back.");
//         console.error("Attempted submit with invalid balanceId");
//         return;
//     }

//     // Add reason to summary object
//     const updatedSummary: SendSummary = { ...summary, reason: selectedReason };
//     localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

//     // Navigate to review page
//     // Ensure recipientId is still valid before navigating
//     if (!recipientId) {
//         setError("Recipient information is missing. Please go back.");
//         console.error("Recipient ID missing from search params on reason page");
//         return;
//     }
//     router.push(
//       `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
//     );
//   };

//   // Render error early if balanceId is fundamentally wrong
//   if (typeof balanceId !== 'string') {
//       return <div className="container mx-auto max-w-lg p-4 lg:p-8 text-red-600">Error: Invalid page URL.</div>;
//   }

//   return (
//     <div className="TransferReason-Page">
//       {/* Optional Header */}
//       {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

//       <div className="container mx-auto max-w-lg p-4 lg:p-8">
//         {/* Escaped apostrophe */}
//         <h1 className="text-xl lg:text-2xl font-bold capitalize text-mainheading dark:text-white mb-4">
//           What's the reason for your transfer?
//         </h1>
//         {/* Add note about India transfers if needed */}
//         {summary?.receiveCurrencyCode === "INR" && (
//           <p className="text-gray-500 dark:text-gray-300 mb-6">
//             Please note that transfers to charities or NGOs in India may have
//             restrictions.
//           </p>
//         )}

//         <div className="mb-6" ref={dropdownRef}>
//           <label
//             htmlFor="transfer-reason-button" // Match the button id if needed, or just associate with the concept
//             className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//           >
//             Select an option that best describes the reason
//           </label>
//           <div className="relative">
//             <button
//               id="transfer-reason-button" // Added id for label association
//               type="button"
//               className={`flex items-center justify-between mt-1 px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white focus:border-[#5f5f5f] ${
//                 error && !selectedReason ? "border-red-600 border-2 !shadow-none focus:!ring-red-600" : "border-gray-300 dark:border-gray-600" // Add error styling to border only if relevant
//               }`}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-expanded={isDropdownOpen}
//               aria-haspopup="listbox"
//               aria-controls="reason-listbox" // Added aria-controls
//             >
//               {selectedReason || (
//                 <span className="text-gray-500 dark:text-white">
//                   Select an option
//                 </span>
//               )}
//               <IoChevronDownOutline
//                 className={`size-6 text-gray-500 dark:text-gray-300 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 } transition-transform duration-300`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div
//                 id="reason-listbox" // Added id for aria-controls
//                 className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-background border focus:outline-none"
//                 role="listbox"
//                 aria-labelledby="transfer-reason-button" // Labelled by the button
//                 // aria-activedescendant is managed automatically by focus usually, or manually if implementing keyboard nav
//               >
//                 <ul
//                   className="py-1 rounded-md overflow-auto max-h-70 focus:outline-none"
//                   tabIndex={-1} // Keep focus management on the container or button
//                   role="presentation" // Role listbox is on the parent div
//                 >
//                   {reasons.map((reason) => (
//                     <li
//                       key={reason}
//                       className={`text-neutral-900 dark:text-white cursor-pointer select-none relative py-3 pl-3 pr-9 transition-colors ease-in-out duration-300 ${
//                         selectedReason === reason
//                           ? "font-semibold bg-primary/20 dark:bg-white/5" // Adjusted selected style
//                           : "font-normal hover:bg-lightgray dark:hover:bg-white/5 hover:text-subheading dark:hover:text-white" // Adjusted hover style
//                       }`}
//                       id={`listbox-option-${reason.replace(/\s+/g, '-')}`} // Generate unique ID
//                       role="option"
//                       // Added aria-selected attribute
//                       aria-selected={selectedReason === reason}
//                       onClick={() => handleReasonSelect(reason)}
//                       // Optional: Add keyboard support (onKeyDown) if needed for full accessibility
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium ml-2 block truncate">
//                           {reason}
//                         </span>
//                       </div>
//                       {selectedReason === reason && (
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                         <GiCheckMark className="text-main dark:text-white size-5"/>
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           {/* Display error only if it's the "select reason" error */}
//           {error && !selectedReason && <p className="text-red-600 text-sm mt-2">{error}</p>}
//           {/* Display other errors (like missing summary/recipientId) separately if needed */}
//           {error && selectedReason && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-primary hover:bg-primaryhover text-mainheading cursor-pointer lg:h-14 font-medium py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out"
//           // Disable button if no reason selected OR if summary is missing OR if recipientId is missing
//           disabled={!summary || !selectedReason || !recipientId}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferReasonPage;




// frontend/src/app/dashboard/balances/[balanceId]/send/reason/page.tsx
"use client";
import React, { useState, useEffect } from "react"; // Removed useRef
import { useParams, useRouter, useSearchParams } from "next/navigation";
// Removed IoChevronDown, GiCheckMark as they are inside CustomDropdown

// Import the CustomDropdown component
import CustomDropdown from "../../../../../admin/components/add-money/CustomDropdown"; // Adjust path as needed

// Define an interface for the summary data stored in localStorage
interface SendSummary {
  recipientId: string;
  recipientName?: string;
  sendAmount: number;
  receiveAmount: number;
  sendCurrencyCode: string;
  receiveCurrencyCode: string;
  rate?: number;
  fee?: number;
  reason?: string;
}

const TransferReasonPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const balanceId = params.balanceId as string;

  if (typeof balanceId !== 'string') {
    console.error("Invalid balanceId parameter:", balanceId);
    // Consider showing an error message or redirecting immediately
    // return <div>Error: Invalid page URL.</div>;
  }

  const recipientId = searchParams.get("recipientId");
  // Initialize state with null to match CustomDropdown's value prop type
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Retrieve summary from localStorage
  const [summary, setSummary] = useState<SendSummary | null>(null);

  useEffect(() => {
    const storedSummary = localStorage.getItem("sendTransferSummary");
    if (storedSummary) {
        try {
            const parsedSummary: SendSummary = JSON.parse(storedSummary);
            if (parsedSummary && typeof parsedSummary === 'object' && parsedSummary.recipientId) {
                 setSummary(parsedSummary);
            } else {
                 throw new Error("Invalid summary format");
            }
        } catch (e) {
            setError("Failed to load transfer details. Please start again.");
            console.error("Error parsing transfer summary from localStorage:", e);
            // Optional: Clear invalid storage item
            // localStorage.removeItem("sendTransferSummary");
        }
    } else {
      setError("Transfer details missing. Please start again.");
      console.error("Transfer summary missing from localStorage");
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep dependency array minimal

  const reasons = [
    "Sending money home to family",
    "Paying for goods or services",
    "Property payment",
    "Paying salary",
    "General expenses",
  ];

  // Updated handler for CustomDropdown's onChange
  const handleReasonSelect = (reason: string | null) => {
    setSelectedReason(reason);
    if (reason) { // Clear error only if a valid reason is selected
        setError("");
    }
  };

  const handleSubmit = () => {
    // Check remains the same: !selectedReason covers both null and "" (though it should be null now)
    if (!selectedReason) {
      setError("Please select a reason for your transfer.");
      return;
    }
    if (!summary) {
      setError("Transfer details missing. Please start again.");
      return;
    }
    if (typeof balanceId !== 'string') {
        setError("Page URL is invalid. Please go back.");
        console.error("Attempted submit with invalid balanceId");
        return;
    }
    if (!recipientId) {
        setError("Recipient information is missing. Please go back.");
        console.error("Recipient ID missing from search params on reason page");
        return;
    }

    // Add reason to summary object
    const updatedSummary: SendSummary = { ...summary, reason: selectedReason }; // selectedReason is guaranteed to be string here
    localStorage.setItem("sendTransferSummary", JSON.stringify(updatedSummary)); // Update localStorage

    router.push(
      `/dashboard/balances/${balanceId}/send/review?recipientId=${recipientId}`
    );
  };

  // Render error early if balanceId is fundamentally wrong (optional stricter check)
  if (typeof balanceId !== 'string') {
      return <div className="container mx-auto max-w-lg p-4 lg:p-8 text-red-600">Error: Invalid page URL.</div>;
  }

  return (
    <div className="TransferReason-Page pt-5">
      {/* Optional Header */}
      {/* <DashboardHeader title="Send Money" currentStep={2.5} totalSteps={steps.length} steps={steps} /> */}

      <div className="mx-auto lg:max-w-lg">
        <h1 className="sm:text-3xl text-2xl font-bold text-mainheading dark:text-white mb-4">
          What's the reason for your transfer?
        </h1>
        {summary?.receiveCurrencyCode === "INR" && (
          <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base mb-6">
            Please note that transfers to charities or NGOs in India may have
            restrictions.
          </p>
        )}

        {/* Use CustomDropdown component */}
        <div className="mb-6">
           <CustomDropdown
              label={ <label className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base mb-1">
                         Select an option that best describes the reason
                      </label>
                    }
              options={reasons}
              value={selectedReason}
              onChange={handleReasonSelect}
              displayAllOption="Select an option" // Set placeholder text
              // The 'disabled' prop could be used if needed, e.g., disabled={!summary}
           />
          {/* Display error only if relevant */}
          {error && !selectedReason && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {/* Display other errors (like missing summary/recipientId) separately */}
          {error && selectedReason && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>


        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full bg-primary text-neutral-900 font-medium hover:bg-primaryhover space-x-3 py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!summary || !selectedReason || !recipientId}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferReasonPage;