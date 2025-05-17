// // frontend/src/components/dashboard/shared/SelectBalanceComponent.tsx
// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { IoIosArrowForward } from "react-icons/io";
// import { GoPlus } from "react-icons/go";

// // Define needed interfaces (or import from a central types file)
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string;
//     currency: Currency;
//     user: string; // Assuming user ID might be needed contextually
//     createdAt: string;
//     updatedAt: string;
// }

// interface SelectBalanceComponentProps {
//     balances: Account[];
//     isLoading: boolean;
//     error: string | null;
//     refetchBalances: () => void;
//     onSelectBalance: (balanceId: string) => void; // Callback when a balance is selected
//     allowAddBalance: boolean; // Controls if the "Add New" card is shown
//     pageTitle: string; // Title for the page/section
//     noBalancePrimaryMessage: string; // Message when no balances exist
//     noBalanceSecondaryMessage?: string; // Optional secondary message or link text
//     addBalanceHref?: string; // Link for the "Add New" card (if shown)
//     addBalanceLinkText?: string; // Text for the "Add New" card (if shown)
//     tokenExists: boolean; // Pass token presence for conditional rendering of login message
// }

// const SelectBalanceComponent: React.FC<SelectBalanceComponentProps> = ({
//     balances,
//     isLoading,
//     error,
//     refetchBalances,
//     onSelectBalance,
//     allowAddBalance,
//     pageTitle,
//     noBalancePrimaryMessage,
//     noBalanceSecondaryMessage,
//     addBalanceHref = "/dashboard/add-balance", // Default link
//     addBalanceLinkText = "Add another currency to your account", // Default text
//     tokenExists,
// }) => {

//     // --- Loading State ---
//     if (isLoading) {
//         return (
//             <div className="">
//                 <Skeleton className="h-10 w-72 sm:w-96 mx-auto rounded-md mb-8" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {Array(allowAddBalance ? 6 : 5) // Show one less skeleton if adding isn't allowed
//                         .fill(0)
//                         .map((_, i) => (
//                             <Skeleton key={`skel-${i}`} className="h-28 w-full rounded-2xl" />
//                         ))}
//                     {/* Optional: Specific skeleton for add card if needed */}
//                     {/* {allowAddBalance && <Skeleton key="add-skel" className="h-28 w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600" />} */}
//                 </div>
//             </div>
//         );
//     }

//     // --- Main Content ---
//     return (
//         <div className="">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-mainheading dark:text-white text-center mb-8">
//                 {pageTitle}
//             </h1>

//             {/* --- Error State --- */}
//             {error && !isLoading && (
//                 <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6">
//                     <p>Error loading balances: {error}</p>
//                     {/* Only show retry if it's not an auth error */}
//                     {!error.toLowerCase().includes("unauthorized") && (
//                          <button
//                          onClick={refetchBalances}
//                          className="mt-2 px-4 py-1 bg-primary text-neutral-900 rounded hover:bg-primaryhover"
//                          >
//                          Retry
//                          </button>
//                     )}
//                      {/* Guide to login on auth error */}
//                     {error.toLowerCase().includes("unauthorized") && (
//                          <p className="mt-2">Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> again.</p>
//                      )}
//                 </div>
//             )}

//             {/* --- No Balances State --- */}
//             {!isLoading && !error && balances.length === 0 && tokenExists && (
//                 <div className="text-center text-neutral-600 dark:text-gray-400 p-6 bg-lightgray dark:bg-primarybox rounded-lg">
//                     <p>{noBalancePrimaryMessage}</p>
//                     {/* Conditionally show Add Balance link/text */}
//                     {allowAddBalance && noBalanceSecondaryMessage && (
//                         <Link href={addBalanceHref} className="text-primary hover:underline block mt-3 font-medium">
//                             {noBalanceSecondaryMessage}
//                         </Link>
//                     )}
//                     {!allowAddBalance && noBalanceSecondaryMessage && (
//                          <p className="mt-3 font-medium">{noBalanceSecondaryMessage}</p> // Display secondary message without link
//                     )}
//                 </div>
//             )}

//             {/* --- Balances Grid --- */}
//             {!isLoading && !error && balances.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {/* Map existing balances */}
//                     {balances.map((account) => (
//                         <div
//                             key={account._id}
//                             onClick={() => onSelectBalance(account._id)}
//                             className="p-6 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]"
//                             role="button"
//                             tabIndex={0}
//                             onKeyPress={(e) => e.key === 'Enter' && onSelectBalance(account._id)}
//                             aria-label={`Select ${account.currency.code} balance`} // Accessibility
//                         >
//                             <div className="flex items-center gap-4 overflow-hidden">
//                                 <Image
//                                     src={account.currency.flagImage || `/assets/icon/${account.currency.code.toLowerCase()}.svg`}
//                                     alt={`${account.currency.code} flag`}
//                                     width={40}
//                                     height={40}
//                                     className="rounded-full flex-shrink-0"
//                                     onError={(e) => { (e.target as HTMLImageElement).src = "/assets/icon/default.svg"; }}
//                                     unoptimized
//                                 />
//                                 <div className="flex-grow min-w-0">
//                                     <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate">
//                                         {account.currency.code} Balance
//                                     </p>
//                                     <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
//                                         {parseFloat(account.balance).toFixed(2)} {account.currency.code}
//                                     </p>
//                                 </div>
//                             </div>
//                             <IoIosArrowForward className='text-neutral-900 dark:text-white ml-2 flex-shrink-0' aria-hidden="true" />
//                         </div>
//                     ))}

//                     {/* "Add Another Balance" Card - Conditionally Rendered */}
//                     {allowAddBalance && (
//                         <Link
//                             href={addBalanceHref}
//                             className="p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300 min-h-[112px]"
//                         >
//                             <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//                                 <GoPlus size={24} className="text-neutral-900 dark:text-white" />
//                             </div>
//                             <span className="text-center text-neutral-500 dark:text-white">
//                                 {addBalanceLinkText}
//                             </span>
//                         </Link>
//                     )}
//                 </div>
//             )}

//             {/* --- Logged Out State --- */}
//             {!tokenExists && !isLoading && (
//                 <div className="text-center text-neutral-600 dark:text-gray-400 p-4 mt-6">
//                     Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> to view and manage your balances.
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SelectBalanceComponent;

// // frontend/src/components/dashboard/shared/SelectBalanceComponent.tsx
// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { IoIosArrowForward } from "react-icons/io";
// import { GoPlus } from "react-icons/go";

// // Define needed interfaces (or import from a central types file)
// interface Currency {
//     _id: string;
//     code: string;
//     name: string;
//     flagImage?: string;
// }
// interface Account {
//     _id: string;
//     balance: string;
//     currency: Currency;
//     user: string; // Assuming user ID might be needed contextually
//     createdAt: string;
//     updatedAt: string;
// }

// interface SelectBalanceComponentProps {
//     balances: Account[];
//     isLoading: boolean;
//     error: string | null;
//     refetchBalances: () => void;
//     onSelectBalance: (balanceId: string) => void; // Callback when a balance is selected
//     allowAddBalance: boolean; // Controls if the "Add New" card is shown
//     pageTitle: string; // Title for the page/section
//     noBalancePrimaryMessage: string; // Message when no balances exist
//     noBalanceSecondaryMessage?: string; // Optional secondary message or link text
//     addBalanceHref?: string; // Link for the "Add New" card (if using Link)
//     onAddBalanceClick?: () => void; // *** ADD THIS PROP: Callback for clicking the "Add New" card ***
//     addBalanceLinkText?: string; // Text for the "Add New" card (if shown)
//     tokenExists: boolean; // Pass token presence for conditional rendering of login message
// }

// const SelectBalanceComponent: React.FC<SelectBalanceComponentProps> = ({
//     balances,
//     isLoading,
//     error,
//     refetchBalances,
//     onSelectBalance,
//     allowAddBalance,
//     pageTitle,
//     noBalancePrimaryMessage,
//     noBalanceSecondaryMessage,
//     addBalanceHref = "/dashboard/add-balance", // Default link if onAddBalanceClick is not provided
//     onAddBalanceClick, // *** DESTRUCTURE THE NEW PROP ***
//     addBalanceLinkText = "Add another currency to your account", // Default text
//     tokenExists,
// }) => {

//     // --- Loading State ---
//     if (isLoading) {
//         return (
//             <div className="">
//                 <Skeleton className="h-10 w-72 sm:w-96 mx-auto rounded-md mb-8" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {Array(6) // Show one less skeleton if adding isn't allowed
//                         .fill(0)
//                         .map((_, i) => (
//                             <Skeleton key={`skel-${i}`} className="h-28 w-full rounded-2xl" />
//                         ))}
//                 </div>
//             </div>
//         );
//     }

//     // --- Common Add Card Style ---
//     const addCardClasses = "p-6 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300 min-h-[112px]";

//     // --- Add Card Content ---
//     const AddCardContent = () => (
//         <>
//             <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//                 <GoPlus size={24} className="text-neutral-900 dark:text-white" />
//             </div>
//             <span className="text-center text-neutral-500 dark:text-white">
//                 {addBalanceLinkText}
//             </span>
//         </>
//     );

//     // --- Main Content ---
//     return (
//         <div className="">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-mainheading dark:text-white text-center mb-8">
//                 {pageTitle}
//             </h1>

//             {/* --- Error State --- */}
//             {error && !isLoading && (
//                 <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6">
//                     <p>Error loading balances: {error}</p>
//                     {!error.toLowerCase().includes("unauthorized") && (
//                          <button
//                          onClick={refetchBalances}
//                          className="mt-2 px-4 py-1 bg-primary text-neutral-900 rounded hover:bg-primaryhover"
//                          >
//                          Retry
//                          </button>
//                     )}
//                     {error.toLowerCase().includes("unauthorized") && (
//                          <p className="mt-2">Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> again.</p>
//                      )}
//                 </div>
//             )}

//             {/* --- No Balances State --- */}
//             {!isLoading && !error && balances.length === 0 && tokenExists && (
//                  <div className="text-center text-neutral-600 dark:text-gray-400 p-6 bg-lightgray dark:bg-primarybox rounded-lg">
//                     <p>{noBalancePrimaryMessage}</p>
//                     {/* Conditionally show Add Balance link/text or trigger action */}
//                     {allowAddBalance && noBalanceSecondaryMessage && (
//                         <>
//                             {onAddBalanceClick ? ( // If click handler exists, make the text clickable
//                                 <button
//                                     onClick={onAddBalanceClick}
//                                     className="text-primary hover:underline block mt-3 font-medium mx-auto bg-transparent border-none p-0"
//                                 >
//                                     {noBalanceSecondaryMessage}
//                                 </button>
//                             ) : ( // Otherwise, use the Link (if href exists)
//                                 addBalanceHref && (
//                                     <Link href={addBalanceHref} className="text-primary hover:underline block mt-3 font-medium">
//                                         {noBalanceSecondaryMessage}
//                                     </Link>
//                                 )
//                             )}
//                         </>
//                     )}
//                     {!allowAddBalance && noBalanceSecondaryMessage && (
//                          <p className="mt-3 font-medium">{noBalanceSecondaryMessage}</p> // Display secondary message without interaction
//                     )}
//                 </div>
//             )}

//             {/* --- Balances Grid --- */}
//             {!isLoading && !error && balances.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

//                     {/* "Add Another Balance" Card - Conditionally Rendered */}
//                     {allowAddBalance && (
//                         <>
//                             {onAddBalanceClick ? ( // *** If click handler is provided, use a div/button with onClick ***
//                                 <div
//                                     onClick={onAddBalanceClick}
//                                     className={addCardClasses}
//                                     role="button"
//                                     tabIndex={0}
//                                     onKeyPress={(e) => e.key === 'Enter' && onAddBalanceClick()}
//                                     aria-label={addBalanceLinkText}
//                                 >
//                                    <AddCardContent />
//                                 </div>
//                             ) : ( // *** Otherwise, use the Link component (if href exists) ***
//                                 addBalanceHref && (
//                                     <Link
//                                         href={addBalanceHref}
//                                         className={addCardClasses}
//                                         aria-label={addBalanceLinkText}
//                                     >
//                                         <AddCardContent />
//                                     </Link>
//                                 )
//                             )}
//                         </>
//                     )}

//                     {/* Map existing balances */}
//                     {balances.map((account) => (
//                         <div
//                             key={account._id}
//                             onClick={() => onSelectBalance(account._id)}
//                             className="p-6 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]"
//                             role="button"
//                             tabIndex={0}
//                             onKeyPress={(e) => e.key === 'Enter' && onSelectBalance(account._id)}
//                             aria-label={`Select ${account.currency.code} balance`} // Accessibility
//                         >
//                             <div className="flex items-center gap-4 overflow-hidden">
//                                 <Image
//                                     src={account.currency.flagImage || `/assets/icon/${account.currency.code.toLowerCase()}.svg`}
//                                     alt={`${account.currency.code} flag`}
//                                     width={40}
//                                     height={40}
//                                     className="rounded-full flex-shrink-0"
//                                     onError={(e) => { (e.target as HTMLImageElement).src = "/assets/icon/default.svg"; }}
//                                     unoptimized
//                                 />
//                                 <div className="flex-grow min-w-0">
//                                     <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate">
//                                         {account.currency.code} Balance
//                                     </p>
//                                     <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
//                                         {parseFloat(account.balance).toFixed(2)} {account.currency.code}
//                                     </p>
//                                 </div>
//                             </div>
//                             <IoIosArrowForward className='text-neutral-900 dark:text-white ml-2 flex-shrink-0' aria-hidden="true" />
//                         </div>
//                     ))}

//                 </div>
//             )}

//             {/* --- Logged Out State --- */}
//             {!tokenExists && !isLoading && (
//                 <div className="text-center text-neutral-600 dark:text-gray-400 p-4 mt-6">
//                     Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> to view and manage your balances.
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SelectBalanceComponent;



// // frontend/src/components/dashboard/shared/SelectBalanceComponent.tsx
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
// import { IoIosArrowForward } from "react-icons/io";
// import { GoPlus } from "react-icons/go";
// import { MdOutlineAccessTime } from "react-icons/md";
// import { ShieldCheck } from "lucide-react";

// // Interfaces (define or import)
// interface Currency {
//   _id: string;
//   code: string;
//   name: string;
//   flagImage?: string;
// }
// interface Account {
//   _id: string;
//   balance: string;
//   currency: Currency;
//   user: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface SelectBalanceComponentProps {
//   balances: Account[];
//   isLoading: boolean;
//   error: string | null;
//   refetchBalances: () => void;
//   onSelectBalance: (balanceId: string) => void;
//   allowAddBalance: boolean;
//   pageTitle: string;
//   noBalancePrimaryMessage: string;
//   noBalanceSecondaryMessage?: string;
//   addBalanceHref?: string; // Optional: Fallback Link href if onAddBalanceClick not provided
//   onAddBalanceClick?: () => void; // Callback for clicking the "Add New" card or secondary message
//   addBalanceLinkText?: string;
//   tokenExists: boolean;
// }

// const SelectBalanceComponent: React.FC<SelectBalanceComponentProps> = ({
//   balances,
//   isLoading,
//   error,
//   refetchBalances,
//   onSelectBalance,
//   allowAddBalance,
//   pageTitle,
//   noBalancePrimaryMessage,
//   noBalanceSecondaryMessage,
//   addBalanceHref = "/dashboard/add-balance", // Default fallback link
//   onAddBalanceClick,
//   addBalanceLinkText = "Add another currency", // Default text
//   tokenExists,
// }) => {
//   // --- Loading State ---
//   if (  isLoading) {
//     return (
//       <>
//         <Skeleton className="h-14 w-72 sm:w-96 mx-auto rounded-md mb-4" />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {allowAddBalance && (
//             <Skeleton className="lg:h-32 h-28 w-full rounded-2xl border-2 border-dashed" />
//           )}

//           {Array(allowAddBalance ? 8 : 8) // Adjust skeleton count based on add card presence
//             .fill(0)
//             .map((_, i) => (
//               <Skeleton key={`skel-${i}`} className="h-32 w-full rounded-2xl" />
//             ))}
//         </div>
//       </>
//     );
//   }

//   const addCardClasses =
//     "sm:p-4 p-2 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300 min-h-[112px]";

//   // --- Add Card Content ---
//   const AddCardContent = () => (
//     <>
//       <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
//         <GoPlus size={28} className="text-neutral-900 dark:text-white" />
//       </div>
//       <span className="text-center text-neutral-500 dark:text-white">
//         {addBalanceLinkText}
//       </span>
//     </>
//   );

//   // --- Main Content ---
//   return (
//     <section className="Select-Balance-Wrapper pt-5">
//       <div className="All-Balance-Card">
//         <h1 className="text-xl md:text-2xl lg:text-3xl capitalize font-semibold text-mainheading dark:text-white text-left md:text-center mb-4">
//           {pageTitle}
//         </h1>

//         {/* --- Error State --- */}
//         {error && !isLoading && (
//           <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6">
//             <p>Error loading balances: {error}</p>
//             {!error.toLowerCase().includes("unauthorized") && (
//               <button
//                 onClick={refetchBalances}
//                 className="mt-2 px-4 py-1 bg-primary text-neutral-900 rounded hover:bg-primaryhover"
//               >
//                 Retry
//               </button>
//             )}
//             {error.toLowerCase().includes("unauthorized") && (
//               <p className="mt-2">
//                 Please{" "}
//                 <Link
//                   href="/auth/login"
//                   className="text-primary hover:underline"
//                 >
//                   log in
//                 </Link>{" "}
//                 again.
//               </p>
//             )}
//           </div>
//         )}

//         {/* --- No Balances State --- */}
//         {!isLoading && !error && balances.length === 0 && tokenExists && (
//           <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//             <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//               <ShieldCheck className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//             </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
//               {noBalancePrimaryMessage}
//             </h2>
//             {/* Use onAddBalanceClick if available for the secondary message */}
//             {allowAddBalance &&
//               noBalanceSecondaryMessage &&
//               onAddBalanceClick && (
//                 <button
//                   onClick={onAddBalanceClick} // Use the main add click handler
//                   className="text-primary hover:underline block mt-3 font-medium mx-auto bg-transparent border-none p-0 cursor-pointer"
//                 >
//                   {noBalanceSecondaryMessage}
//                 </button>
//               )}

//             {/* Fallback to Link if no click handler but href exists */}
//             {allowAddBalance &&
//               noBalanceSecondaryMessage &&
//               !onAddBalanceClick &&
//               addBalanceHref && (
//                 <Link
//                   href={addBalanceHref}
//                   className="text-primary hover:underline block mt-3 font-medium"
//                 >
//                   {noBalanceSecondaryMessage}
//                 </Link>
//               )}
//             {/* Display text only if add not allowed or no action intended */}
//             {(!allowAddBalance || (!onAddBalanceClick && !addBalanceHref)) &&
//               noBalanceSecondaryMessage && (
//                 <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//                   {noBalanceSecondaryMessage}
//                 </p>
//               )}
//           </div>
//         )}

//         {/* --- Balances Grid --- */}
//         {!isLoading && !error && balances.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* "Add Another Balance" Card - Use onClick if provided */}
//             {allowAddBalance && (
//               <div
//                 onClick={onAddBalanceClick} // Use the handler passed from parent
//                 className={`${addCardClasses} ${
//                   onAddBalanceClick
//                     ? "cursor-pointer"
//                     : "opacity-60 cursor-not-allowed"
//                 }`} // Adjust cursor/opacity
//                 role="button"
//                 tabIndex={onAddBalanceClick ? 0 : -1} // Make non-interactive if no handler
//                 onKeyPress={(e) => e.key === "Enter" && onAddBalanceClick?.()}
//                 aria-label={addBalanceLinkText}
//                 aria-disabled={!onAddBalanceClick}
//               >
//                 <AddCardContent />
//               </div>
//             )}

//             {/* Map existing balances */}
//             {balances.map((account) => (
//               <div
//                 key={account._id}
//                 onClick={() => onSelectBalance(account._id)} // Parent handles KYC in this callback
//                 className="sm:p-4 p-2 sm:h-32 h-28 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]"
//                 role="button"
//                 tabIndex={0}
//                 onKeyPress={(e) =>
//                   e.key === "Enter" && onSelectBalance(account._id)
//                 }
//                 aria-label={`Select ${account.currency.code} balance`}
//               >
//                 <div className="flex items-center gap-4 overflow-hidden">
//                   <Image
//                     src={
//                       account.currency.flagImage ||
//                       `/assets/icon/${account.currency.code.toLowerCase()}.svg`
//                     }
//                     alt={`${account.currency.code} flag`}
//                     width={40}
//                     height={40}
//                     className="rounded-full flex-shrink-0"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         "/assets/icon/default.svg";
//                     }} // Fallback image
//                     unoptimized // Consider if optimization is needed based on source
//                   />
//                   <div className="flex-grow min-w-0">
//                     <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate">
//                       {account.currency.code} Balance
//                     </p>
//                     <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
//                       {/* Consider using Intl.NumberFormat for better formatting */}
//                       {parseFloat(account.balance).toFixed(2)}{" "}
//                       {account.currency.code}
//                     </p>
//                   </div>
//                 </div>
//                 <IoIosArrowForward
//                   className="text-neutral-900 dark:text-white ml-2 flex-shrink-0"
//                   aria-hidden="true"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* --- Logged Out State --- */}
//         {!tokenExists && !isLoading && (
//           <div className="text-center text-neutral-600 dark:text-gray-400 p-4 mt-6">
//             Please{" "}
//             <Link href="/auth/login" className="text-primary hover:underline">
//               log in
//             </Link>{" "}
//             to view and manage your balances.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SelectBalanceComponent;






"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed
import { IoIosArrowForward } from "react-icons/io";
import { GoPlus } from "react-icons/go";
// import { MdOutlineAccessTime } from "react-icons/md"; // Not used in current render
import { ShieldCheck } from "lucide-react";

// Interfaces (define or import)
interface Currency {
  _id: string;
  code: string;
  name: string;
  flagImage?: string;
}
interface Account {
  _id: string;
  balance: string;
  currency: Currency;
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface SelectBalanceComponentProps {
  balances: Account[];
  isLoading: boolean;
  error: string | null;
  refetchBalances: () => void;
  onSelectBalance: (balanceId: string) => void;
  allowAddBalance: boolean;
  pageTitle: string;
  noBalancePrimaryMessage: string;
  noBalanceSecondaryMessage?: string;
  addBalanceHref?: string;
  onAddBalanceClick?: () => void;
  addBalanceLinkText?: string;
  tokenExists: boolean;
}

const SelectBalanceComponent: React.FC<SelectBalanceComponentProps> = ({
  balances,
  isLoading,
  error,
  refetchBalances,
  onSelectBalance,
  allowAddBalance,
  pageTitle,
  noBalancePrimaryMessage,
  noBalanceSecondaryMessage,
  addBalanceHref = "/dashboard/add-money/select-balance",
  onAddBalanceClick,
  addBalanceLinkText = "Add another currency",
  tokenExists,
}) => {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-14 w-72 sm:w-96 mx-auto rounded-md mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allowAddBalance && (
            <Skeleton className="lg:h-32 h-28 w-full rounded-2xl border-2 border-dashed" />
          )}
          {Array(allowAddBalance ? 8 : 8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={`skel-${i}`} className="h-32 w-full rounded-2xl" />
            ))}
        </div>
      </>
    );
  }

  const addCardClasses =
    "sm:p-4 p-2 bg-lightgray dark:bg-primarybox/70 hover:dark:bg-secondarybox rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-200/70 transition-all duration-75 ease-linear border-2 border-dashed border-neutral-900 dark:border-neutral-300 min-h-[112px]";

  const AddCardContent = () => (
    <>
      <div className="rounded-full border-2 border-neutral-900 dark:border-white p-2 flex items-center justify-center mb-2">
        <GoPlus size={28} className="text-neutral-900 dark:text-white" />
      </div>
      <span className="text-center text-neutral-500 dark:text-white">
        {addBalanceLinkText}
      </span>
    </>
  );

  return (
    <section className="Select-Balance-Wrapper">
      <div className="All-Balance-Card">
        <h1 className="text-xl md:text-2xl lg:text-3xl capitalize font-semibold text-mainheading dark:text-white text-left md:text-center mb-4">
          {pageTitle}
        </h1>

        {error && !isLoading && (
          <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg sm:p-10 p-4 flex flex-col items-center gap-3 mb-6">
            <p className="font-medium text-center text-red-600 dark:text-red-400 text-base">Error loading balances: {error}</p>
            {!error.toLowerCase().includes("unauthorized") && (
              <div>
                <button
                  onClick={refetchBalances}
                  className="font-medium inline-flex items-center justify-center px-6 py-2 rounded-3xl bg-primary text-neutral-900 hover:bg-primaryhover sm:w-auto w-full"
                >
                  Retry
                </button>
              </div>

            )}
            {error.toLowerCase().includes("unauthorized") && (
              <p className="text-neutral-900 dark:text-white">
                Please{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline"
                >
                  log in
                </Link>{" "}
                again.
              </p>
            )}
          </div>
        )}

        {!isLoading && !error && balances.length === 0 && tokenExists && (
          <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
              <ShieldCheck className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
            </div>
            <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">
              {noBalancePrimaryMessage}
            </h2>

            {/* --- REFINED LOGIC for noBalanceSecondaryMessage --- */}
            {noBalanceSecondaryMessage && (
              <>
                {onAddBalanceClick ? ( // If onAddBalanceClick is provided, always render as a button
                  <button
                    onClick={onAddBalanceClick}
                    className="text-primary hover:underline block mt-3 font-medium mx-auto bg-transparent border-none p-0 cursor-pointer"
                  >
                    {noBalanceSecondaryMessage}
                  </button>
                ) : allowAddBalance && addBalanceHref ? ( // Else, if allowed and href exists, render as Link
                  <Link
                    href={addBalanceHref}
                    className="text-primary hover:underline block mt-3 font-medium"
                  >
                    {noBalanceSecondaryMessage}
                  </Link>
                ) : ( // Else (no click handler, OR not allowed to add balance, OR no href for link), render as plain text
                  <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
                    {noBalanceSecondaryMessage}
                  </p>
                )}
              </>
            )}
            {/* --- END REFINED LOGIC --- */}

          </div>
        )}

        {!isLoading && !error && balances.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allowAddBalance && (
              <div
                onClick={onAddBalanceClick} // This onAddBalanceClick is for the "Add Card"
                className={`${addCardClasses} ${
                  onAddBalanceClick // Check the *specific* handler for the add card
                    ? "cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
                role="button"
                tabIndex={onAddBalanceClick ? 0 : -1}
                onKeyPress={(e) => e.key === "Enter" && onAddBalanceClick?.()}
                aria-label={addBalanceLinkText}
                aria-disabled={!onAddBalanceClick}
              >
                <AddCardContent />
              </div>
            )}

            {balances.map((account) => (
              <div
                key={account._id}
                onClick={() => onSelectBalance(account._id)}
                className="sm:p-4 p-2 sm:h-32 h-28 bg-lightgray dark:bg-primarybox hover:bg-neutral-200/70 hover:dark:bg-secondarybox rounded-2xl flex justify-between items-center gap-2 transition-all duration-75 ease-linear cursor-pointer min-h-[112px]"
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && onSelectBalance(account._id)
                }
                aria-label={`Select ${account.currency.code} balance`}
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <Image
                    src={
                      account.currency.flagImage ||
                      `/assets/icon/${account.currency.code.toLowerCase()}.svg`
                    }
                    alt={`${account.currency.code} flag`}
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/icon/default.svg";
                    }}
                    unoptimized
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-neutral-900 dark:text-white text-lg font-semibold truncate">
                      {account.currency.code} Balance
                    </p>
                    <p className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
                      {parseFloat(account.balance).toFixed(2)}{" "}
                      {account.currency.code}
                    </p>
                  </div>
                </div>
                <IoIosArrowForward
                  className="text-neutral-900 dark:text-white ml-2 flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        )}

        {!tokenExists && !isLoading && (
          <div className="text-center text-neutral-600 dark:text-gray-400 p-4 mt-6">
            Please{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              log in
            </Link>{" "}
            to view and manage your balances.
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectBalanceComponent;