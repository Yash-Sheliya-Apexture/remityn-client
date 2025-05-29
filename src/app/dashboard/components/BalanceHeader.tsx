// // frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData"; // Adjust path

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <>
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700 animate-pulse">
//           <div className="flex items-center gap-4 mb-4">
//             <Skeleton className="h-10 w-10 rounded-full" />
//             <Skeleton className="h-6 w-32" />
//           </div>
//           <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
//           <div className="flex justify-start space-x-3">
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Render actual content when data is available (even if other things are loading)
//   if (!balanceDetail) {
//     // This case should ideally be handled by the parent's error state,
//     // but added as a fallback.
//     return null; // Or a more specific "Balance not found" message here
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return (
//     <>
//       {/* Balance Card */}
//       <div className="pb-6 mb-8 border-b">
//         <div className="flex gap-4 justify-between">
//           <div className="Balance">
//             <div className="flex items-center gap-2 mb-4">
//               {balanceDetail.currency.flagImage ? (
//                 <Image
//                   src={balanceDetail.currency.flagImage}
//                   alt={`${currencyCode} flag`}
//                   width={50}
//                   height={50}
//                   className="rounded-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/assets/icon/default.svg";
//                   }}
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
//                   {currencyCode.slice(0, 2)}
//                 </div>
//               )}
//               <h2 className="text-lg text-gray-800 dark:text-gray-100">
//                 {currencyCode} balance
//               </h2>
//             </div>
//             <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
//               {formattedBalance}
//               <span className="text-2xl font-bold"> {currencyCode}</span>
//             </div>
//             {/* Display Market Rate and Our Rate against INR */}
//             {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//               <div className="mb-4 text-gray-500 dark:text-gray-300 flex gap-4">
//                 <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary">
//                   Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR
//                 </div>
//                 <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600">
//                   Market Rate: 1 {currencyCode} =
//                   {marketRateAgainstINR.toFixed(2)} INR
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col justify-between">
//             <div className="flex justify-end space-x-6">
//               <Link
//                 href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                 className="text-center"
//               >
//                 <button className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14.5 h-14 flex justify-center items-center rounded-full">
//                   <LuPlus size={20} />
//                 </button>
//                 Add
//               </Link>
//               <div className="send text-center cursor-pointer" onClick={onSendClick}>
//                 <button
//                   // onClick={onSendClick}
//                   className={`bg-primary cursor-pointer mb-1 -z-1 relative text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
//                     !canSendMoney
//                       ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
//                       : "hover:bg-primaryhover"
//                   }`}
//                   title={
//                     !canSendMoney ? "Add funds to send money" : "Send money"
//                   }
//                   disabled={!canSendMoney} // Explicitly disable for accessibility
//                 >
//                   <GoArrowUp size={20} />
//                 </button>
//                 Send
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BalanceHeader;

// // frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData"; // Adjust path

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // Initial Loading Skeleton
//   if (isLoading && !balanceDetail) {
//     return (
//       <>
//         <Skeleton className="h-6 w-20 mb-4" /> {/* Back button */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8 border border-gray-200 dark:border-gray-700 animate-pulse">
//           <div className="flex items-center gap-4 mb-4">
//             <Skeleton className="h-10 w-10 rounded-full" />
//             <Skeleton className="h-6 w-32" />
//           </div>
//           <Skeleton className="h-10 w-48 mb-6" /> {/* Balance Amount */}
//           <div className="flex justify-start space-x-3">
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Add Button */}
//             <Skeleton className="h-10 w-24 rounded-md" /> {/* Send Button */}
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Render actual content when data is available (even if other things are loading)
//   if (!balanceDetail) {
//     // This case should ideally be handled by the parent's error state,
//     // but added as a fallback.
//     return null; // Or a more specific "Balance not found" message here
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return (
//     <>
//       {/* Balance Card */}
//       <div className="pb-6 mb-8 border-b">
//         <div className="flex sm:flex-row flex-col gap-4 justify-between">

//           <div className="Balance sm:text-left text-center">
//             <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//               {balanceDetail.currency.flagImage ? (
//                 <Image
//                   src={balanceDetail.currency.flagImage}
//                   alt={`${currencyCode} flag`}
//                   width={50}
//                   height={50}
//                   className="rounded-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/assets/icon/default.svg";
//                   }}
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
//                   {currencyCode.slice(0, 2)}
//                 </div>
//               )}
//               <h2 className="text-lg text-neutral-900 dark:text-white">
//                 {currencyCode} balance
//               </h2>
//             </div>
//             <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
//               {formattedBalance}
//               <span className="text-2xl font-bold"> {currencyCode}</span>
//             </div>
//             {/* Display Market Rate and Our Rate against INR */}
//             {marketRateAgainstINR && ourRateAgainstINR && currencyCode && (
//               <div className="mb-4 text-gray-500 dark:text-gray-300 flex md:flex-row flex-col sm:items-start items-center gap-4">
//                 <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary w-fit">
//                   <span>Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</span>
//                 </div>
//                 <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600 w-fit">
//                   <span>Market Rate: 1 {currencyCode} =
//                   {marketRateAgainstINR.toFixed(2)} INR</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col justify-between">
//             <div className="flex justify-center space-x-6">
//               <Link
//                 href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                 className="text-center text-neutral-900 dark:text-white"
//               >
//                 <button className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14.5 h-14 flex justify-center items-center rounded-full">
//                   <LuPlus size={24} />
//                 </button>
//                 Add
//               </Link>

//               <div className="send text-center cursor-pointer" onClick={onSendClick}>
//                 <button
//                   // onClick={onSendClick}
//                   className={`bg-primary cursor-pointer mb-1 text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
//                     !canSendMoney
//                       ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
//                       : "hover:bg-primaryhover"
//                   }`}
//                   title={
//                     !canSendMoney ? "Add funds to send money" : "Send money"
//                   }
//                   // disabled={!canSendMoney}
//                 >
//                   <GoArrowUp size={24} />
//                 </button>
//                 <span className="text-neutral-900 dark:text-white">Send</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default BalanceHeader;

// // frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { BalanceDetail } from "@/app/hooks/useBalanceDetailData"; // Adjust path

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean; // Loading state for the core balance details
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading, // This is primarily for the balance detail itself
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // Initial Loading Skeleton for the *entire* header before balance details arrive
//   if (isLoading && !balanceDetail) {
//     return (
//       <div className="pb-6 mb-8 border-b animate-pulse">
//          <div className="flex sm:flex-row flex-col gap-4 justify-between">
//            {/* Left Side Skeleton */}
//            <div className="Balance sm:text-left text-center">
//              <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//                <Skeleton className="w-[50px] h-[50px] rounded-full" />
//                <Skeleton className="h-6 w-32" />
//              </div>
//              <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" /> {/* Balance Amount */}
//              {/* Skeleton for Rates */}
//              <div className="mb-4 flex md:flex-row flex-col sm:items-start items-center gap-4">
//                  <Skeleton className="h-8 w-48 rounded-4xl" />
//                  <Skeleton className="h-8 w-48 rounded-4xl" />
//              </div>
//            </div>
//            {/* Right Side Skeleton */}
//            <div className="flex flex-col justify-between items-center sm:items-end">
//              <div className="flex justify-center space-x-6">
//                <div className="text-center">
//                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                  <Skeleton className="h-4 w-8" />
//                </div>
//                <div className="text-center">
//                  <Skeleton className="w-14 h-14 rounded-full mb-1" />
//                  <Skeleton className="h-4 w-8" />
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//     );
//   }

//   // Render actual content when data is available (even if rates are still loading)
//   if (!balanceDetail) {
//     // This case should ideally be handled by the parent's error state,
//     // but added as a fallback.
//     return null; // Or a more specific "Balance not found" message here
//   }

//   const currencyCode = balanceDetail.currency.code;
//   const formattedBalance = parseFloat(
//     balanceDetail.balance.toString()
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   // Determine if rates are loading (balance exists, but rates are null)
//   // We also check if the currency is not INR, as rates against INR don't apply to INR itself.
//   const areRatesLoading = marketRateAgainstINR === null && ourRateAgainstINR === null && currencyCode !== 'INR';
//   // Determine if rates are ready to be displayed
//   const showRates = marketRateAgainstINR !== null && ourRateAgainstINR !== null && currencyCode !== 'INR';

//   return (
//     <>
//       {/* Balance Card */}
//       <div className="pb-6 mb-8 border-b">
//         <div className="flex sm:flex-row flex-col gap-4 justify-between">

//           {/* Left Side - Balance Info */}
//           <div className="Balance sm:text-left text-center">
//             {/* Currency Flag and Name */}
//             <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//               {balanceDetail.currency.flagImage ? (
//                 <Image
//                   src={balanceDetail.currency.flagImage}
//                   alt={`${currencyCode} flag`}
//                   width={50}
//                   height={50}
//                   className="rounded-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/assets/icon/default.svg"; // Ensure this default icon exists
//                   }}
//                   priority // Add priority if this is an important above-the-fold image
//                 />
//               ) : (
//                 <div className="w-[50px] h-[50px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
//                   {currencyCode.slice(0, 2)}
//                 </div>
//               )}
//               <h2 className="text-lg text-neutral-900 dark:text-white">
//                 {currencyCode} balance
//               </h2>
//             </div>

//             {/* Balance Amount */}
//             <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
//               {formattedBalance}
//               <span className="text-2xl font-bold"> {currencyCode}</span>
//             </div>

//             {/* Display Market Rate and Our Rate against INR - with Loading State */}
//             <div className="mb-4 text-gray-500 dark:text-gray-300 flex md:flex-row flex-col sm:items-start items-center gap-4 min-h-[32px]"> {/* Added min-height to prevent layout shift */}
//               {areRatesLoading ? (
//                 <>
//                   {/* Skeleton for Rates */}
//                   <Skeleton className="h-8 w-48 rounded-4xl" />
//                   <Skeleton className="h-8 w-48 rounded-4xl" />
//                 </>
//               ) : showRates ? (
//                  <>
//                     {/* Actual Rate Display */}
//                     <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary w-fit whitespace-nowrap">
//                     <span>Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</span>
//                     </div>
//                     <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600 w-fit whitespace-nowrap">
//                     <span>Market Rate: 1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR</span>
//                     </div>
//                  </>
//               ) : (
//                 // Render nothing if rates aren't applicable (e.g., INR) or failed to load
//                 null
//               )}
//             </div>
//           </div>

//           {/* Right Side - Actions */}
//           <div className="flex flex-col justify-start items-center sm:items-end"> {/* Aligned items consistently */}
//              <div className="flex justify-center space-x-6">
//                <Link
//                  href={`/dashboard/balances/${balanceDetail._id}/add-money`}
//                  className="text-center text-neutral-900 dark:text-white flex flex-col items-center" // Added flex for alignment
//                >
//                  <div className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full"> {/* Simplified button structure */}
//                    <LuPlus size={24} />
//                  </div>
//                  Add
//                </Link>

//                <div className="send text-center cursor-pointer flex flex-col items-center" onClick={onSendClick}> {/* Added flex for alignment */}
//                  <div // Changed from button to div for better click handling on the parent
//                    className={`bg-primary cursor-pointer mb-1 text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
//                      !canSendMoney
//                        ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed" // Kept styles similar
//                        : "hover:bg-primaryhover"
//                    }`}
//                    title={
//                      !canSendMoney ? "Add funds to send money" : "Send money"
//                    }
//                  >
//                    <GoArrowUp size={24} />
//                  </div>
//                  <span className="text-neutral-900 dark:text-white">Send</span>
//                </div>
//              </div>
//            </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default BalanceHeader;

// // frontend/src/app/dashboard/components/BalanceHeader.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";
// import { Skeleton } from "@/components/ui/skeleton";
// // *** Import from the type definition file ***
// import { BalanceDetail } from "@/types/balance"; // Adjust path as needed

// interface BalanceHeaderProps {
//   balanceDetail: BalanceDetail | null;
//   isLoading: boolean;
//   onSendClick: () => void;
//   canSendMoney: boolean;
//   marketRateAgainstINR: number | null;
//   ourRateAgainstINR: number | null;
// }

// const BalanceHeader: React.FC<BalanceHeaderProps> = ({
//   balanceDetail,
//   isLoading,
//   onSendClick,
//   canSendMoney,
//   marketRateAgainstINR,
//   ourRateAgainstINR,
// }) => {
//   // ... rest of the component code remains the same ...

//   // Example access using the correct types (already looks correct in your original code)
//   const currencyCode = balanceDetail?.currency.code; // Access works because BalanceDetail has currency: Currency
//   const formattedBalance = balanceDetail ? parseFloat(
//     balanceDetail.balance.toString() // Access works because BalanceDetail has balance: number
//   ).toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }) : '0.00'; // Handle null case

//   // ... rest of the component code ...

//    return (
//     <>
//       {/* Balance Card */}
//       <div className="pb-6 mb-8 border-b">
//         <div className="flex sm:flex-row flex-col gap-4 justify-between">

//           {/* Left Side - Balance Info */}
//           <div className="Balance sm:text-left text-center">
//             {/* Currency Flag and Name */}
//             <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
//               {balanceDetail?.currency.flagImage ? ( // Use optional chaining
//                 <Image
//                   src={balanceDetail.currency.flagImage}
//                   alt={`${currencyCode ?? 'N/A'} flag`} // Handle potential null currencyCode here
//                   width={50}
//                   height={50}
//                   className="rounded-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/assets/icon/default.svg";
//                   }}
//                   priority
//                 />
//               ) : (
//                 <div className="w-[50px] h-[50px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-semibold">
//                   {currencyCode ? currencyCode.slice(0, 2) : '??'} {/* Handle null case */}
//                 </div>
//               )}
//               <h2 className="text-lg text-neutral-900 dark:text-white">
//                 {currencyCode ?? 'N/A'} balance {/* Handle null case */}
//               </h2>
//             </div>

//              {/* Balance Amount - Render Skeleton if loading OR balanceDetail is null */}
//              {isLoading || !balanceDetail ? (
//                  <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
//              ) : (
//                  <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
//                  {formattedBalance}
//                  <span className="text-2xl font-bold"> {currencyCode}</span>
//                  </div>
//              )}

//             {/* Display Market Rate and Our Rate against INR - with Loading State */}
//             {/* Rates logic remains similar, ensure currencyCode check includes null/undefined */}
//             { currencyCode && currencyCode !== 'INR' && (
//                  <div className="mb-4 text-gray-500 dark:text-gray-300 flex md:flex-row flex-col sm:items-start items-center gap-4 min-h-[32px]">
//                  {marketRateAgainstINR === null && ourRateAgainstINR === null ? (
//                      <>
//                      {/* Skeleton for Rates */}
//                      <Skeleton className="h-8 w-48 rounded-4xl" />
//                      <Skeleton className="h-8 w-48 rounded-4xl" />
//                      </>
//                  ) : marketRateAgainstINR !== null && ourRateAgainstINR !== null ? (
//                     <>
//                         {/* Actual Rate Display */}
//                         <div className="p-1.5 px-6 rounded-4xl bg-primary dark:bg-primary/20 text-neutral-900 dark:text-primary w-fit whitespace-nowrap">
//                         <span>Our Rate: 1 {currencyCode} = {ourRateAgainstINR.toFixed(2)} INR</span>
//                         </div>
//                         <div className="p-1.5 px-6 rounded-4xl bg-blue-600 dark:bg-blue-600/20 text-gray-100 dark:text-blue-600 w-fit whitespace-nowrap">
//                         <span>Market Rate: 1 {currencyCode} = {marketRateAgainstINR.toFixed(2)} INR</span>
//                         </div>
//                     </>
//                  ) : (
//                      // Render nothing if rates aren't applicable or failed to load
//                      null
//                  )}
//                  </div>
//             )}
//           </div>

//           {/* Right Side - Actions */}
//           {/* Add checks for balanceDetail existence before rendering links/buttons depending on it */}
//           {balanceDetail && (
//             <div className="flex flex-col justify-start items-center sm:items-end">
//                 <div className="flex justify-center space-x-6">
//                 <Link
//                     href={`/dashboard/balances/${balanceDetail._id}/add-money`} // Safe access
//                     className="text-center text-neutral-900 dark:text-white flex flex-col items-center"
//                 >
//                     <div className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full">
//                     <LuPlus size={24} />
//                     </div>
//                     Add
//                 </Link>

//                 <div className="send text-center cursor-pointer flex flex-col items-center" onClick={onSendClick}>
//                     <div
//                     className={`bg-primary cursor-pointer mb-1 text-neutral-900 w-14 h-14 flex justify-center items-center rounded-full ${
//                         !canSendMoney
//                         ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
//                         : "hover:bg-primaryhover"
//                     }`}
//                     title={
//                         !canSendMoney ? "Add funds to send money" : "Send money"
//                     }
//                     >
//                     <GoArrowUp size={24} />
//                     </div>
//                     <span className="text-neutral-900 dark:text-white">Send</span>
//                 </div>
//                 </div>
//             </div>
//           )}

//         </div>
//       </div>
//       {/* Removed initial loading skeleton logic from here, as it's handled by parent or top-level check */}
//     </>
//   );
// };

// export default BalanceHeader;

// frontend/src/app/dashboard/components/BalanceHeader.tsx
import React from "react";
import Image from "next/image";
// REMOVE Link import if no longer needed directly here
// import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import { BalanceDetail } from "@/types/balance"; // Adjust path as needed

interface BalanceHeaderProps {
  balanceDetail: BalanceDetail | null;
  isLoading: boolean;
  onSendClick: () => void;
  onAddMoneyClick: () => void; // <-- ADDED: Callback for Add Money
  canSendMoney: boolean; // Keep this, it's still relevant *after* KYC check
  marketRateAgainstINR: number | null;
  ourRateAgainstINR: number | null;
}

const BalanceHeader: React.FC<BalanceHeaderProps> = ({
  balanceDetail,
  isLoading,
  onSendClick,
  onAddMoneyClick, // <-- Destructure new prop
  canSendMoney,
  marketRateAgainstINR,
  ourRateAgainstINR,
}) => {
  // ... (rest of the component code remains the same until the Actions section) ...

  const currencyCode = balanceDetail?.currency.code;
  const formattedBalance = balanceDetail
    ? parseFloat(balanceDetail.balance.toString()).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return (
    <>
      {/* Balance Card */}
      <div className="pb-6 mb-8 border-b">
        <div className="flex sm:flex-row flex-col gap-4 justify-between">
          {/* Left Side - Balance Info */}
          <div className="Balance sm:text-left text-center">
            {/* ... (Currency Flag, Name, Balance Amount, Rates - unchanged) ... */}
            <div className="flex items-center sm:justify-start justify-center gap-2 mb-4">
              {balanceDetail?.currency.flagImage ? (
                <>
                  <Image
                    src={balanceDetail.currency.flagImage}
                    alt={`${currencyCode ?? "N/A"} flag`}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/icon/default.svg";
                    }}
                    priority
                  />
                </>
              ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-primarybox flex items-center justify-center text-white/90 text-lg font-semibold">
                  {currencyCode ? currencyCode.slice(0, 2) : "??"}
                </div>
              )}
              <h2 className="text-lg text-mainheadingWhite">
                {currencyCode ?? "N/A"} balance
              </h2>
            </div>

            {/* Balance Amount */}
            {isLoading || !balanceDetail ? (
              <Skeleton className="h-12 w-48 mb-6 sm:mx-0 mx-auto" />
            ) : (
              <div className="text-5xl font-bold text-mainheadingWhite mb-6">
                {formattedBalance}
                <span className="text-2xl font-bold"> {currencyCode}</span>
              </div>
            )}

            {/* Display Market Rate and Our Rate */}
            {currencyCode && currencyCode !== "INR" && (
              <div className="mb-4 text-gray-500 dark:text-gray-300 flex md:flex-row flex-col sm:items-start items-center gap-4 min-h-[32px]">
                {marketRateAgainstINR === null && ourRateAgainstINR === null ? (
                  <>
                    <Skeleton className="h-8 w-48 rounded-4xl" />
                    <Skeleton className="h-8 w-48 rounded-4xl" />
                  </>
                ) : marketRateAgainstINR !== null &&
                  ourRateAgainstINR !== null ? (
                  <>
                    <div className="p-1.5 px-6 rounded-4xl bg-primary/25 text-primary w-fit whitespace-nowrap">
                      <span>
                        Our Rate: 1 {currencyCode} ={" "}
                        {ourRateAgainstINR.toFixed(2)} INR
                      </span>
                    </div>
                    <div className="p-1.5 px-6 rounded-4xl bg-blue-700/20 text-blue-500 w-fit whitespace-nowrap">
                      <span>
                        Market Rate: 1 {currencyCode} ={" "}
                        {marketRateAgainstINR.toFixed(2)} INR
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Side - Actions */}
          {/* Add checks for balanceDetail existence */}
          {balanceDetail && (
            <div className="flex flex-col justify-start items-center sm:items-end">
              <div className="flex justify-center space-x-6">
                {/* --- MODIFIED: Use div + onClick for Add Money --- */}
                <div
                  className="text-center text-white/90 flex flex-col items-center cursor-pointer"
                  onClick={onAddMoneyClick} // <-- Use the callback
                  title="Add money" // Add title for accessibility
                >
                  <div className="bg-primary cursor-pointer mb-1 hover:bg-primaryhover text-mainheading w-14 h-14 flex justify-center items-center rounded-full">
                    <LuPlus size={24} />
                  </div>
                  Add
                </div>
                {/* --- END MODIFICATION --- */}

                {/* Send Money Button (unchanged structure, logic handled by onSendClick in parent) */}
                <div
                  className="send text-center cursor-pointer flex flex-col items-center"
                  onClick={onSendClick}
                >
                  <div
                    className={`bg-primary cursor-pointer mb-1 text-mainheading w-14 h-14 flex justify-center items-center rounded-full ${
                      !canSendMoney // Keep existing styling for insufficient balance visual cue
                        ? "opacity-50 bg-primary hover:bg-primaryhover cursor-not-allowed"
                        : "hover:bg-primaryhover"
                    }`}
                    title={
                      !canSendMoney ? "Add funds to send money" : "Send money"
                    }
                  >
                    <GoArrowUp size={24} />
                  </div>
                  <span className="text-white/90">Send</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BalanceHeader;
