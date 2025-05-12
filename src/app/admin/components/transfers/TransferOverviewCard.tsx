// "use client";
// import React from "react";
// import { Calendar, DollarSign } from "lucide-react";
// import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path

// interface TransferOverviewCardProps {
//   transfer: any; // Consider creating a Transfer type/interface
// }

// const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
//   transfer,
// }) => {
//   if (!transfer) return null; // Or a loading state

//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Side: Status and ID */}
//         <div className="flex items-center">
//           <div className="mr-4 flex-shrink-0">
//             <GetStatusBadge status={transfer.status} />
//           </div>
//           <div className="min-w-0"> {/* Ensure ID doesn't overflow */}
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
//             <p className="text-neutral-900 dark:text-white text-sm break-all">
//               {transfer._id}
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Dates and Amount */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 {getTimeAgo(transfer.createdAt)}
//               </p>
//             </div>
//           </div>

//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 {formatCurrency(transfer.sendAmount, transfer.sendCurrency?.code)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferOverviewCard;





// "use client";
// import React from "react";
// import { Calendar, DollarSign } from "lucide-react";
// import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// // Define an interface for the currency reference within the transfer
// interface CurrencyRef {
//   code?: string | null; // Currency code, might be optional or null
//   // Add other currency properties if needed by formatCurrency or elsewhere
// }

// // Define a specific interface for the transfer object's relevant properties
// interface TransferOverview {
//   _id?: string | null; // Transfer ID
//   status?: string | null; // Transfer status (assuming string, adjust if different)
//   createdAt?: string | Date | null; // Creation date/time
//   sendAmount?: number | null; // Amount sent
//   sendCurrency?: CurrencyRef | null; // Reference to the sending currency object
//   // Add other properties if needed for future use or if accessed indirectly
// }

// interface TransferOverviewCardProps {
//   // Use the defined interface and allow null/undefined
//   transfer: TransferOverview | null | undefined;
// }

// const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
//   transfer,
// }) => {
//   // Handle null or undefined transfer case early
//   if (!transfer) return null; // Or a loading state

//   // Safely access the currency code, providing undefined if not available
//   const sendCurrencyCode = transfer.sendCurrency?.code || undefined;

//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Side: Status and ID */}
//         <div className="flex items-center">
//           <div className="mr-4 flex-shrink-0">
//              {/* Assuming GetStatusBadge can handle null/undefined status gracefully */}
//             <GetStatusBadge status={transfer.status} />
//           </div>
//           <div className="min-w-0"> {/* Ensure ID doesn't overflow */}
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
//             <p className="text-neutral-900 dark:text-white text-sm break-all">
//               {/* Provide fallback for ID */}
//               {transfer._id || 'N/A'}
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Dates and Amount */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                 {/* Assuming getTimeAgo handles null/undefined createdAt */}
//                 {getTimeAgo(transfer.createdAt)}
//               </p>
//             </div>
//           </div>

//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                  {/* Pass the safely retrieved currency code */}
//                 {formatCurrency(transfer.sendAmount, sendCurrencyCode)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferOverviewCard;


// // FILE: src/app/admin/components/transfers/TransferOverviewCard.tsx
// "use client";
// import React from "react";
// import { Calendar, DollarSign } from "lucide-react";
// import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers"; // Adjust path if needed

// // Define an interface for the currency reference within the transfer
// interface CurrencyRef {
//   _id?: string; // Adding _id if it exists and might be needed
//   code?: string | null; // Currency code, might be optional or null
// }

// // Define a specific interface for the transfer object's relevant properties
// interface TransferOverview {
//   _id?: string | null; // Transfer ID
//   status?: string | null | undefined; // Allow null/undefined
//   createdAt?: string | Date | null | undefined; // Allow null/undefined
//   sendAmount?: number | null; // Amount sent
//   // Updated based on potential structure from main page: could be string ID or nested object
//   sourceCurrency?: string | CurrencyRef | null; // Use this if API matches
//   sendCurrency?: CurrencyRef | null; // Keep this if used by formatCurrency specifically
//   // Add other properties if needed
// }

// interface TransferOverviewCardProps {
//   transfer: TransferOverview | null | undefined;
// }

// const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
//   transfer,
// }) => {
//   if (!transfer) return null;

//   // Determine the send currency code safely
//   // Check both possible fields based on main page definition vs. this component's definition
//   const sendCurrencyRef = transfer.sendCurrency || (typeof transfer.sourceCurrency === 'object' ? transfer.sourceCurrency : null);
//   const sendCurrencyCode = sendCurrencyRef?.code || undefined; // Safely access code

//   // Safely handle date conversion for getTimeAgo
//   // Assuming getTimeAgo can handle string | Date | null | undefined directly
//   // If not, convert here:
//   // const createdAtString = transfer.createdAt ? String(transfer.createdAt) : undefined;
//   const createdAtValue = transfer.createdAt; // Pass original value

//   // Safely handle status for GetStatusBadge
//   // Assuming GetStatusBadge can handle string | null | undefined directly
//   // If not, provide default:
//   // const statusValue = transfer.status || 'unknown';
//   const statusValue = transfer.status; // Pass original value


//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-xl border dark:border-primarybox p-6 mb-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Side: Status and ID */}
//         <div className="flex items-center">
//           <div className="mr-4 flex-shrink-0">
//              {/* FIX: Pass the potentially null/undefined status value */}
//              {/* Ensure GetStatusBadge handles null/undefined/empty string gracefully */}
//             <GetStatusBadge status={statusValue ?? 'unknown'} />
//           </div>
//           <div className="min-w-0">
//             <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
//             <p className="text-neutral-900 dark:text-white text-sm break-all">
//               {transfer._id || 'N/A'}
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Dates and Amount */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                  {/* FIX: Pass the potentially null/undefined/Date value */}
//                  {/* Ensure getTimeAgo handles different types or provide string */}
//                  {getTimeAgo(createdAtValue)}
//               </p>
//             </div>
//           </div>

//           <div className="bg-lightborder dark:bg-secondarybox rounded-lg px-4 py-2 flex items-center">
//             <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                  {/* Pass the safely retrieved currency code */}
//                 {formatCurrency(transfer.sendAmount, sendCurrencyCode)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferOverviewCard;



"use client";
import React from "react";
import { Calendar, DollarSign } from "lucide-react";
// Make sure paths are correct
import { GetStatusBadge, getTimeAgo, formatCurrency } from "../../../utils/helpers";

// Interface for the currency reference (as expected in props)
interface CurrencyRef {
  _id?: string; // Optional ID
  code?: string | null; // Code is the primary piece needed here
}

// Interface for the expected transfer prop structure
interface TransferOverview {
  _id?: string | null;
  status?: string | null | undefined;
  createdAt?: string | Date | null | undefined; // Can be string or Date
  sendAmount?: number | null;
  sendCurrency?: CurrencyRef | null; // Expecting the resolved object or null
}

interface TransferOverviewCardProps {
  transfer: TransferOverview | null | undefined;
}

const TransferOverviewCard: React.FC<TransferOverviewCardProps> = ({
  transfer,
}) => {
  if (!transfer) return null;

  // Currency code is now directly available (if lookup was successful in parent)
  const sendCurrencyCode = transfer.sendCurrency?.code || undefined; // Use optional chaining

  // Date handling logic (keep as is, it handles string/Date/null)
  const getCreatedAtString = (dateValue: string | Date | null | undefined): string | undefined => {
    if (dateValue instanceof Date) {
      return dateValue.toISOString();
    }
    if (typeof dateValue === 'string') {
      return dateValue;
    }
    return undefined;
  };
  const createdAtStringForHelper = getCreatedAtString(transfer.createdAt);

  // Status handling (keep as is)
  const statusValue = transfer.status;


  return (
    <div className="bg-lightgray dark:bg-primarybox rounded-xl sm:p-6 p-4 mb-8"> {/* Added shadow/border */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Status and ID */}
        <div className="flex sm:items-center gap-4 sm:flex-row flex-col">
          <div className="flex-shrink-0">
             {/* Pass original status, provide fallback */}
            <GetStatusBadge status={statusValue ?? 'unknown'} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Transfer ID</p>
            <p className="text-neutral-900 dark:text-white text-sm font-medium break-all"> {/* Added font-medium */}
              {transfer._id || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Side: Dates and Amount */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mt-4 md:mt-0"> {/* Adjusted gap */}
          <div className="bg-lightborder dark:bg-primarybox rounded-lg px-4 py-2 flex items-center border dark:border-neutral-700/70"> {/* Added border */}
            <Calendar className="size-4 text-gray-500 dark:text-gray-300 mr-2.5 flex-shrink-0" /> {/* Adjusted margin */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Created</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                 {createdAtStringForHelper ? getTimeAgo(createdAtStringForHelper) : 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-lightborder dark:bg-primarybox rounded-lg px-4 py-2 flex items-center border dark:border-neutral-700/70"> {/* Added border */}
            <DollarSign className="size-4 text-gray-500 dark:text-gray-300 mr-2.5 flex-shrink-0" /> {/* Adjusted margin */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Amount Sent</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                 {/* Use the code directly from the prop */}
                {formatCurrency(transfer.sendAmount, sendCurrencyCode)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOverviewCard;