// "use client";
// import React from "react";
// import { GrTransaction } from "react-icons/gr"; // Corrected import
// import { formatCurrency } from "../../../utils/helpers"; // Adjust path

// interface TransactionDetailsCardProps {
//   transfer: any; // Consider defining a Transfer type/interface
//   currenciesMap: { [key: string]: any };
// }

// const CurrencyDisplay: React.FC<{
//   currency: any;
//   currenciesMap: { [key: string]: any };
// }> = ({ currency, currenciesMap }) => {
//   if (!currency) return null;
//   const currencyInfo = currency._id ? currenciesMap[currency._id] : null;

//   return (
//     <div className="flex items-center text-sm">
//       <span className="text-gray-600 dark:text-gray-300 font-medium mr-1.5">{currency.code}</span>
//       {currencyInfo?.flagImage && (
//         <img
//           src={currencyInfo.flagImage}
//           alt={currency.code}
//           className="w-8 h-8 rounded-full object-cover border"
//           loading="lazy"
//         />
//       )}
//     </div>
//   );
// };

// const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
//   transfer,
//   currenciesMap,
// }) => {
//   if (!transfer) return null;

//   const totalDebit = (transfer.sendAmount || 0) + (transfer.fees || 0);

//   return (
//     <div>
//       <h4 className="inline-flex items-center bg-emerald-50 dark:bg-emerald-600/15 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-600/50">
//         {/* Using GrTransaction from react-icons as specified */}
//         <GrTransaction className="size-4 mr-1.5" />
//         Transaction Details
//       </h4>

//       <div className="rounded-xl border overflow-hidden">
//         {/* Exchange Information */}
//         <div className="p-5 ">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Sent Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Sent Amount
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                   {formatCurrency(transfer.sendAmount, undefined, 2)}
//                 </div>
//                 <CurrencyDisplay
//                     currency={transfer.sendCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>

//             {/* Received Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Recipient Gets (approx)
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                   {formatCurrency(transfer.receiveAmount, undefined, 2)}
//                 </div>
//                  <CurrencyDisplay
//                     currency={transfer.receiveCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-t">
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Exchange Rate</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               1 {transfer.sendCurrency?.code} ≈
//               {transfer.exchangeRate?.toLocaleString(undefined, {
//                 minimumFractionDigits: 4,
//                 maximumFractionDigits: 6,
//               })}
//               {transfer.receiveCurrency?.code}
//             </p>
//           </div>
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Fee</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               {formatCurrency(transfer.fees, transfer.sendCurrency?.code, 2)}
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="p-4 border-t ">
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
//               Total Debit Amount
//             </p>
//             <p className="font-semibold text-lg text-neutral-900 dark:text-white">
//               {formatCurrency(totalDebit, transfer.sendCurrency?.code, 2)}
//             </p>
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">
//             (Amount + Fee)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailsCard;


// "use client";
// import React from "react";
// import Image from "next/image"; // Import next/image
// import { GrTransaction } from "react-icons/gr";
// import { formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// // --- Type Definitions ---

// // Represents the reference to a currency within the transfer object
// interface CurrencyRef {
//   _id: string; // Assuming currency IDs are strings
//   code: string;
// }

// // Represents the full currency information stored in the map
// interface CurrencyInfo {
//   _id: string;
//   code: string;
//   name: string; // Add other relevant properties if available
//   flagImage?: string | null; // Flag image URL might be optional
// }

// // Represents the main transfer object
// interface Transfer {
//   sendAmount?: number | null;
//   fees?: number | null;
//   receiveAmount?: number | null;
//   sendCurrency?: CurrencyRef | null;
//   receiveCurrency?: CurrencyRef | null;
//   exchangeRate?: number | null;
//   // Add other potential transfer properties if needed
// }

// // Type for the currencies map
// type CurrenciesMap = Record<string, CurrencyInfo>; // Use Record for dictionary type

// // --- Prop Interfaces ---

// interface TransactionDetailsCardProps {
//   transfer: Transfer | null | undefined; // Use the defined Transfer type
//   currenciesMap: CurrenciesMap; // Use the defined CurrenciesMap type
// }

// interface CurrencyDisplayProps {
//   currency: CurrencyRef | null | undefined; // Use CurrencyRef type
//   currenciesMap: CurrenciesMap; // Use CurrenciesMap type
// }

// // --- Components ---

// const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ currency, currenciesMap }) => {
//   // Early return if currency or its ID is missing
//   if (!currency?._id) return null;

//   // Access currency info safely
//   const currencyInfo = currenciesMap[currency._id];

//   return (
//     <div className="flex items-center text-sm">
//       <span className="text-gray-600 dark:text-gray-300 font-medium mr-1.5">{currency.code}</span>
//       {/* Check if currencyInfo and flagImage exist */}
//       {currencyInfo?.flagImage && (
//         <div className="relative w-8 h-8 rounded-full overflow-hidden border"> {/* Added relative positioning for Image */}
//           <Image
//             src={currencyInfo.flagImage}
//             alt={`${currency.code} flag`} // More descriptive alt text
//             fill // Use fill to cover the container
//             className="object-cover" // Ensure image covers well
//             // No loading="lazy" needed, next/image handles optimization
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
//   transfer,
//   currenciesMap,
// }) => {
//   // Handle null or undefined transfer case early
//   if (!transfer) return null;

//   // Use default value 0 if amounts/fees are null/undefined
//   const totalDebit = (transfer.sendAmount || 0) + (transfer.fees || 0);
//   const sendCurrencyCode = transfer.sendCurrency?.code || ''; // Default to empty string if code is missing
//   const receiveCurrencyCode = transfer.receiveCurrency?.code || ''; // Default to empty string

//   return (
//     <div>
//       <h4 className="inline-flex items-center bg-emerald-50 dark:bg-emerald-600/15 text-emerald-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-600/50">
//         <GrTransaction className="size-4 mr-1.5" />
//         Transaction Details
//       </h4>

//       <div className="rounded-xl border overflow-hidden">
//         {/* Exchange Information */}
//         <div className="p-5 ">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Sent Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Sent Amount
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                   {/* Pass undefined for currency code if not needed by formatCurrency */}
//                   {formatCurrency(transfer.sendAmount, undefined, 2)}
//                 </div>
//                 <CurrencyDisplay
//                     currency={transfer.sendCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>

//             {/* Received Amount */}
//             <div className="bg-lightgray dark:bg-secondarybox rounded-lg p-4 border">
//               <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
//                 Recipient Gets (approx)
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-2xl font-bold text-neutral-900 dark:text-white mr-2">
//                    {/* Pass undefined for currency code if not needed by formatCurrency */}
//                   {formatCurrency(transfer.receiveAmount, undefined, 2)}
//                 </div>
//                  <CurrencyDisplay
//                     currency={transfer.receiveCurrency}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-t">
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Exchange Rate</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               {/* Check if codes exist before displaying */}
//               {sendCurrencyCode && receiveCurrencyCode ? (
//                 <>
//                   1 {sendCurrencyCode} ≈{' '}
//                   {transfer.exchangeRate?.toLocaleString(undefined, {
//                     minimumFractionDigits: 4,
//                     maximumFractionDigits: 6,
//                   }) || 'N/A'}{' '}
//                   {receiveCurrencyCode}
//                 </>
//               ) : (
//                 'N/A' // Handle case where currency codes might be missing
//               )}
//             </p>
//           </div>
//           <div className="p-4">
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Fee</p>
//             <p className="text-neutral-900 dark:text-white font-medium text-sm">
//               {/* Pass the actual send currency code to formatCurrency */}
//               {formatCurrency(transfer.fees, sendCurrencyCode || undefined, 2)}
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="p-4 border-t ">
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
//               Total Debit Amount
//             </p>
//             <p className="font-semibold text-lg text-neutral-900 dark:text-white">
//               {/* Pass the actual send currency code to formatCurrency */}
//               {formatCurrency(totalDebit, sendCurrencyCode || undefined, 2)}
//             </p>
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">
//             (Amount + Fee)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailsCard;


// "use client";
// import React from "react";
// import Image from "next/image";
// import { GrTransaction } from "react-icons/gr";
// import { formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// // --- Type Definitions ---

// // Reference to a currency, potentially just an ID or a basic object
// // Make _id optional as it might not always be present in Ref objects
// interface CurrencyRef {
//   _id?: string;
//   code: string;
// }

// // Full currency information from the map
// interface CurrencyInfo {
//   _id: string;
//   code: string;
//   name: string;
//   flagImage?: string | null;
// }

// // Updated Transfer interface for this component's props
// // Allows currency fields to be string IDs OR CurrencyRef objects
// interface Transfer {
//   // Amounts and Fees (use names consistent with API response passed)
//   sourceAmount?: number | null; // From parent component
//   targetAmount?: number | null; // From parent component
//   sendAmount?: number | null;   // Potentially alternative name in data
//   receiveAmount?: number | null; // Potentially alternative name in data
//   fee?: number | null;          // From parent component
//   fees?: number | null;         // Potentially alternative name in data

//   // Currency identifiers (string ID or object)
//   sourceCurrency?: string | CurrencyRef | null; // From parent component
//   targetCurrency?: string | CurrencyRef | null; // From parent component
//   sendCurrency?: string | CurrencyRef | null;   // Potentially alternative name
//   receiveCurrency?: string | CurrencyRef | null; // Potentially alternative name

//   exchangeRate?: number | null;
// }

// // Map of currency ID -> CurrencyInfo
// type CurrenciesMap = Record<string, CurrencyInfo>;

// // --- Prop Interfaces ---

// interface TransactionDetailsCardProps {
//   transfer: Transfer | null | undefined;
//   currenciesMap: CurrenciesMap;
// }

// // Props for the internal CurrencyDisplay component
// interface CurrencyDisplayProps {
//   currencyIdentifier: string | CurrencyRef | null | undefined; // ID string or Ref object
//   currenciesMap: CurrenciesMap;
// }

// // --- Helper Function to get Currency Code ---
// const getCurrencyCode = (
//     identifier: string | CurrencyRef | null | undefined,
//     map: CurrenciesMap
// ): string => {
//     if (!identifier) return '';
//     if (typeof identifier === 'string') {
//         return map[identifier]?.code ?? ''; // Lookup code using ID from map
//     }
//     // If it's an object (CurrencyRef), return its code directly
//     return identifier.code ?? '';
// };

// // --- Components ---

// const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ currencyIdentifier, currenciesMap }) => {
//   let currencyInfo: CurrencyInfo | undefined = undefined;
//   let currencyCode: string = '';
//   let currencyId: string | undefined = undefined;

//   if (typeof currencyIdentifier === 'string') {
//     // It's an ID, look up in the map
//     currencyId = currencyIdentifier;
//     currencyInfo = currenciesMap[currencyId];
//     currencyCode = currencyInfo?.code ?? 'N/A';
//   } else if (currencyIdentifier?.code) {
//     // It's a CurrencyRef object
//     currencyCode = currencyIdentifier.code;
//     currencyId = currencyIdentifier._id;
//     if (currencyId) {
//         currencyInfo = currenciesMap[currencyId]; // Try to get full info from map using _id
//     }
//     // If full info not found via _id, we still have the code from the Ref object
//   }

//   if (!currencyCode || currencyCode === 'N/A') {
//     return <span className="text-sm text-white/90 font-medium">N/A</span>;
//   }

//   return (
//     <div className="flex items-center text-sm ml-2">
//       <span className="text-mainheadingWhite font-medium mr-1.5">{currencyCode}</span>
//       {/* Use flagImage from the full currencyInfo if found */}
//       {currencyInfo?.flagImage && (
//         <div className="relative w-7 h-7 rounded-full overflow-hidden">
//           <Image
//             src={currencyInfo.flagImage}
//             alt={`${currencyCode} flag`}
//             fill
//             sizes="24px" // Provide sizes prop
//             className="object-cover"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
//   transfer,
//   currenciesMap,
// }) => {
//   if (!transfer) return null;

//   // Determine the correct fields to use, prioritizing specific names if available
//   const actualSendAmount = transfer.sendAmount ?? transfer.sourceAmount;
//   const actualReceiveAmount = transfer.receiveAmount ?? transfer.targetAmount;
//   const actualFees = transfer.fees ?? transfer.fee;
//   const actualSendCurrencyIdentifier = transfer.sendCurrency ?? transfer.sourceCurrency;
//   const actualReceiveCurrencyIdentifier = transfer.receiveCurrency ?? transfer.targetCurrency;

//   const totalDebit = (actualSendAmount || 0) + (actualFees || 0);

//   // Get currency codes using the helper function
//   const sendCurrencyCode = getCurrencyCode(actualSendCurrencyIdentifier, currenciesMap);
//   const receiveCurrencyCode = getCurrencyCode(actualReceiveCurrencyIdentifier, currenciesMap);

//   return (
//     <div>
//       <h4 className="inline-flex items-center bg-emerald-500/15 text-emerald-500 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-emerald-600/50">
//         <GrTransaction className="size-4 mr-1.5" />
//         Transaction Details
//       </h4>

//       <div className="rounded-xl border overflow-hidden bg-secondarybox"> {/* Added background/shadow */}
//         {/* Exchange Information */}
//         <div className="sm:p-5 p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Sent Amount */}
//             <div className="bg-secondaryboxhover rounded-lg p-4"> {/* Added border */}
//               <p className="text-mainheadingWhite text-sm font-medium mb-1">
//                 Sent Amount
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-xl font-bold text-white/90">
//                   {/* Format using amount */}
//                   {formatCurrency(actualSendAmount, undefined, 2)}
//                 </div>
//                 {/* Pass the identifier directly */}
//                 <CurrencyDisplay
//                     currencyIdentifier={actualSendCurrencyIdentifier}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>

//             {/* Received Amount */}
//             <div className="bg-secondaryboxhover rounded-lg p-4"> {/* Added border */}
//               <p className="text-mainheadingWhite text-sm font-medium mb-1">
//                 Recipient Gets (approx)
//               </p>
//               <div className="flex items-baseline">
//                 <div className="text-xl font-bold text-white/90">
//                    {/* Format using amount and CODE */}
//                   {formatCurrency(actualReceiveAmount, undefined, 2)}
//                 </div>
//                  {/* Pass the identifier directly */}
//                  <CurrencyDisplay
//                     currencyIdentifier={actualReceiveCurrencyIdentifier}
//                     currenciesMap={currenciesMap}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-y border-secondaryboxhover"> {/* Added dark mode styles */}
//           <div className="p-4 border-secondaryboxhover">
//             <p className="text-sm text-subheadingWhite mb-1">Exchange Rate</p>
//             <p className="text-white/90 font-medium text-sm">
//               {/* Use the extracted codes */}
//               {sendCurrencyCode && receiveCurrencyCode && transfer.exchangeRate ? (
//                 <>
//                   1 {sendCurrencyCode} ≈{' '}
//                   {transfer.exchangeRate.toLocaleString(undefined, {
//                     minimumFractionDigits: 4,
//                     maximumFractionDigits: 6,
//                   })}{' '}
//                   {receiveCurrencyCode}
//                 </>
//               ) : (
//                 'N/A'
//               )}
//             </p>
//           </div>
//           <div className="p-4">
//             <p className="text-sm text-subheadingWhite mb-1">Fee</p>
//             <p className="text-white/90 font-medium text-sm">
//               {/* Format using fee amount and SEND currency code */}
//               {formatCurrency(actualFees, sendCurrencyCode || undefined, 2)}
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="p-4"> {/* Added dark mode styles */}
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-mainheadingWhite">
//               Total Debit Amount
//             </p>
//             <p className="font-semibold text-lg text-white/90">
//               {/* Format using total and SEND currency code */}
//               {formatCurrency(totalDebit, sendCurrencyCode || undefined, 2)}
//             </p>
//           </div>
//           <p className="text-xs text-mainheadingWhite mt-1 text-right">
//             (Amount + Fee)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetailsCard;

// src/app/admin/components/transfers/TransactionDetailsCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { GrTransaction } from "react-icons/gr";
import { formatCurrency } from "../../../utils/helpers";

// --- Type Definitions ---

// Reference to a currency, potentially just an ID or a basic object
interface CurrencyRef {
  _id?: string;
  code: string;
}

// Full currency information from the map
interface CurrencyInfo {
  _id: string;
  code: string;
  name: string;
  symbol: string; // Added symbol as it's part of the Currency interface
  flagImage?: string | null;
}

// Updated Transfer interface for this component's props
interface Transfer {
  sourceAmount?: number | null;
  targetAmount?: number | null;
  sendAmount?: number | null;
  receiveAmount?: number | null;
  fee?: number | null;
  fees?: number | null; // Use 'fees' as preferred
  sourceCurrency?: string | CurrencyRef | null;
  targetCurrency?: string | CurrencyRef | null;
  sendCurrency?: string | CurrencyRef | null;
  receiveCurrency?: string | CurrencyRef | null;
  exchangeRate?: number | null;
}

// Map of currency ID -> CurrencyInfo
type CurrenciesMap = Record<string, CurrencyInfo>;

// --- Prop Interfaces ---

interface TransactionDetailsCardProps {
  transfer: Transfer | null | undefined;
  currenciesMap: CurrenciesMap;
}

// Props for the internal CurrencyDisplay component
interface CurrencyDisplayProps {
  currencyIdentifier: string | CurrencyRef | null | undefined; // ID string or Ref object
  currenciesMap: CurrenciesMap;
}

// --- Helper Function to get Currency Code ---
const getCurrencyCode = (
  identifier: string | CurrencyRef | null | undefined,
  map: CurrenciesMap
): string | undefined => {
  if (!identifier) return undefined;
  if (typeof identifier === 'string') {
    return map[identifier]?.code; // Lookup code using ID from map
  }
  // If it's an object (CurrencyRef), return its code directly
  return identifier.code;
};

// --- Components ---

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ currencyIdentifier, currenciesMap }) => {
  let currencyInfo: CurrencyInfo | undefined = undefined;
  let currencyCode: string | undefined = undefined;

  if (typeof currencyIdentifier === 'string') {
    // It's an ID, look up in the map
    currencyInfo = currenciesMap[currencyIdentifier];
    currencyCode = currencyInfo?.code;
  } else if (currencyIdentifier?.code) {
    // It's a CurrencyRef object (or similar structure with a 'code')
    currencyCode = currencyIdentifier.code;
    if (currencyIdentifier._id) {
      currencyInfo = currenciesMap[currencyIdentifier._id]; // Try to get full info from map using _id
    }
  }

  if (!currencyCode) {
    return <span className="text-sm text-white font-medium">N/A</span>;
  }

  return (
    <div className="flex items-center text-sm ml-2">
      <span className="text-mainheadingWhite font-medium mr-1.5">{currencyCode}</span>
      {/* Use flagImage from the full currencyInfo if found */}
      {currencyInfo?.flagImage && (
        <div className="relative size-6 rounded-full overflow-hidden">
          <Image
            src={currencyInfo.flagImage}
            alt={`${currencyCode} flag`}
            fill
            sizes="24px" // Provide sizes prop for Next.js Image optimization
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  transfer,
  currenciesMap,
}) => {
  if (!transfer) return null; // Defensive rendering

  // Determine the correct fields to use, prioritizing specific names if available
  const actualSendAmount = transfer.sendAmount ?? transfer.sourceAmount;
  const actualReceiveAmount = transfer.receiveAmount ?? transfer.targetAmount;
  const actualFees = transfer.fees ?? transfer.fee; // Prioritize `fees`

  const actualSendCurrencyIdentifier = transfer.sendCurrency ?? transfer.sourceCurrency;
  const actualReceiveCurrencyIdentifier = transfer.receiveCurrency ?? transfer.targetCurrency;

  const totalDebit = (actualSendAmount || 0) + (actualFees || 0);

  // Get currency codes using the helper function
  const sendCurrencyCode = getCurrencyCode(actualSendCurrencyIdentifier, currenciesMap);
  const receiveCurrencyCode = getCurrencyCode(actualReceiveCurrencyIdentifier, currenciesMap);

  return (
    <div>
      <h4 className="inline-flex items-center bg-emerald-500/15 text-emerald-500 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-emerald-600/50">
        <GrTransaction className="size-4 mr-1.5" />
        Transaction Details
      </h4>

      <div className="rounded-xl border overflow-hidden bg-primarybox">
        {/* Exchange Information */}
        <div className="sm:p-5 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Sent Amount */}
            <div className="bg-secondarybox rounded-lg p-4">
              <p className="text-subheadingWhite text-sm font-medium mb-1">
                Sent Amount
              </p>
              <div className="flex items-baseline">
                <div className="text-xl font-bold text-mainheadingWhite">
                  {/* Format using amount */}
                  {formatCurrency(actualSendAmount, sendCurrencyCode, 2)}
                </div>
                {/* Pass the identifier directly */}
                <CurrencyDisplay
                  currencyIdentifier={actualSendCurrencyIdentifier}
                  currenciesMap={currenciesMap}
                />
              </div>
            </div>

            {/* Received Amount */}
            <div className="bg-secondarybox rounded-lg p-4">
              <p className="text-mainheadingWhite text-sm font-medium mb-1">
                Recipient Gets (approx)
              </p>
              <div className="flex items-baseline">
                <div className="text-xl font-bold text-mainheadingWhite">
                  {/* Format using amount and CODE */}
                  {formatCurrency(actualReceiveAmount, receiveCurrencyCode, 2)}
                </div>
                {/* Pass the identifier directly */}
                <CurrencyDisplay
                  currencyIdentifier={actualReceiveCurrencyIdentifier}
                  currenciesMap={currenciesMap}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-y">
          <div className="p-4">
            <p className="text-sm text-subheadingWhite mb-1">Exchange Rate</p>
            <p className="text-mainheadingWhite font-medium text-sm">
              {/* Use the extracted codes */}
              {sendCurrencyCode && receiveCurrencyCode && typeof transfer.exchangeRate === 'number' ? (
                <>
                  1 {sendCurrencyCode} ≈{' '}
                  {transfer.exchangeRate.toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 6,
                  })}{' '}
                  {receiveCurrencyCode}
                </>
              ) : (
                'N/A'
              )}
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm text-subheadingWhite mb-1">Fee</p>
            <p className="text-mainheadingWhite font-medium text-sm">
              {/* Format using fee amount and SEND currency code */}
              {formatCurrency(actualFees, sendCurrencyCode, 2)}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-subheadingWhite">
              Total Debit Amount
            </p>
            <p className="font-semibold text-lg text-mainheadingWhite">
              {/* Format using total and SEND currency code */}
              {formatCurrency(totalDebit, sendCurrencyCode, 2)}
            </p>
          </div>
          <p className="text-xs text-subheadingWhite mt-1 text-right">
            (Amount + Fee)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsCard;