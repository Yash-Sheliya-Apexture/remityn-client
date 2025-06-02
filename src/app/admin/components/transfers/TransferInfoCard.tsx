// "use client";
// import React from "react";
// import { formatFullDateTime } from "../../../utils/helpers"; // Adjust path

// interface TransferInfoCardProps {
//   transfer: any; // Consider creating a Transfer type/interface
// }

// const TransferInfoCard: React.FC<TransferInfoCardProps> = ({ transfer }) => {
//   if (!transfer) return null;

//   return (
//     <div className="bg-white dark:bg-primarybox rounded-xl border overflow-hidden">
//       <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
//         <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Transfer Information</h3>
//       </div>
//       <div className="p-6 space-y-4">
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Transfer ID</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border break-all">
//             {transfer._id}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Created On</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {formatFullDateTime(transfer.createdAt)}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Last Updated</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {formatFullDateTime(transfer.updatedAt)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferInfoCard;




// "use client";
// import React from "react";
// import { formatFullDateTime } from "../../../utils/helpers"; // Adjust path if needed

// // Define a specific interface for the transfer object's relevant properties
// interface TransferInfo {
//   _id?: string | null; // Transfer ID, likely a string
//   createdAt?: string | Date | null; // Date/time, can be string or Date object
//   updatedAt?: string | Date | null; // Date/time, can be string or Date object
//   // Add other relevant properties if needed, but these cover current usage
// }

// interface TransferInfoCardProps {
//   // Use the defined interface and allow null/undefined
//   transfer: TransferInfo | null | undefined;
// }

// const TransferInfoCard: React.FC<TransferInfoCardProps> = ({ transfer }) => {
//   // Handle null or undefined transfer case early
//   if (!transfer) return null;

//   return (
//     <div className="bg-white dark:bg-primarybox rounded-xl border overflow-hidden">
//       <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
//         <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Transfer Information</h3>
//       </div>
//       <div className="p-6 space-y-4">
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Transfer ID</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border break-all">
//             {/* Provide a fallback in case _id is unexpectedly null/undefined */}
//             {transfer._id || 'N/A'}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Created On</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {/* formatFullDateTime should handle potential null/undefined values if necessary */}
//             {formatFullDateTime(transfer.createdAt)}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Last Updated</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {/* formatFullDateTime should handle potential null/undefined values if necessary */}
//             {formatFullDateTime(transfer.updatedAt)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferInfoCard;


// // FILE: src/app/admin/components/transfers/TransferInfoCard.tsx
// "use client";
// import React from "react";
// import { formatFullDateTime } from "../../../utils/helpers"; // Adjust path if needed

// // Define a specific interface for the transfer object's relevant properties
// interface TransferInfo {
//   _id?: string | null; // Transfer ID, likely a string
//   createdAt?: string | Date | null | undefined; // Allow null/undefined/Date
//   updatedAt?: string | Date | null | undefined; // Allow null/undefined/Date
// }

// interface TransferInfoCardProps {
//   transfer: TransferInfo | null | undefined;
// }

// const TransferInfoCard: React.FC<TransferInfoCardProps> = ({ transfer }) => {
//   if (!transfer) return null;

//   // Safely handle date conversion if helper functions require string
//   // Assuming formatFullDateTime can handle string | Date | null | undefined
//   const createdAtValue = transfer.createdAt;
//   const updatedAtValue = transfer.updatedAt;

//   return (
//     <div className="bg-white dark:bg-primarybox rounded-xl border overflow-hidden">
//       <div className="bg-lightgray dark:bg-secondarybox px-6 py-4">
//         <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Transfer Information</h3>
//       </div>
//       <div className="p-6 space-y-4">
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Transfer ID</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border break-all">
//             {transfer._id || 'N/A'}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Created On</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {/* FIX: Pass potentially null/undefined/Date value */}
//             {/* Ensure formatFullDateTime handles different types or provide string */}
//             {formatFullDateTime(createdAtValue)}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Last Updated</p>
//           <div className="text-sm bg-lightgray dark:bg-primarybox px-3 py-3 rounded-lg border">
//             {/* FIX: Pass potentially null/undefined/Date value */}
//             {/* Ensure formatFullDateTime handles different types or provide string */}
//             {formatFullDateTime(updatedAtValue)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferInfoCard;


// // FILE: src/app/admin/components/transfers/TransferInfoCard.tsx
// "use client";
// import React from "react";
// import { formatFullDateTime } from "../../../utils/helpers"; // Adjust path if needed

// // Define a specific interface for the transfer object's relevant properties
// interface TransferInfo {
//   _id?: string | null; // Transfer ID, likely a string
//   createdAt?: string | Date | null | undefined; // Allow null/undefined/Date
//   updatedAt?: string | Date | null | undefined; // Allow null/undefined/Date
// }

// interface TransferInfoCardProps {
//   transfer: TransferInfo | null | undefined;
// }

// // Helper function to prepare the date value for formatFullDateTime
// // It ensures the value passed is either string | undefined, handling Date and null.
// const prepareDateForFormatting = (dateValue: string | Date | null | undefined): string | undefined => {
//   if (dateValue === null || dateValue === undefined) {
//     return undefined; // Pass undefined if null or undefined
//   }
//   if (dateValue instanceof Date) {
//     return dateValue.toISOString(); // Convert Date object to ISO string
//   }
//   // If it's already a string, return it as is
//   // (TypeScript knows it must be a string here if not Date/null/undefined)
//   return dateValue;
// };


// const TransferInfoCard: React.FC<TransferInfoCardProps> = ({ transfer }) => {
//   if (!transfer) return null;

//   // Prepare date values using the helper function before passing them
//   const preparedCreatedAt = prepareDateForFormatting(transfer.createdAt);
//   const preparedUpdatedAt = prepareDateForFormatting(transfer.updatedAt);

//   // Decide what to display if the formatted date is null/empty (formatFullDateTime might return empty/null for invalid inputs)
//   const displayCreatedAt = formatFullDateTime(preparedCreatedAt) || 'N/A';
//   const displayUpdatedAt = formatFullDateTime(preparedUpdatedAt) || 'N/A';


//   return (
//     <div className="bg-primarybox rounded-xl border overflow-hidden">
//       <div className="bg-secondarybox px-6 py-4">
//         <h3 className="text-lg font-semibold text-mainheadingWhite">Transfer Information</h3>
//       </div>
//       <div className="sm:p-6 p-4 space-y-4">
//         <div>
//           <p className="text-sm font-medium text-white/90 mb-1">Transfer ID</p>
//           <div className="text-sm bg-secondarybox text-mainheadingWhite px-3 py-3 rounded-lg break-all">
//             {transfer._id || 'N/A'}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-white/90 mb-1">Created On</p>
//           <div className="text-sm bg-secondarybox text-mainheadingWhite px-3 py-3 rounded-lg">
//             {/* FIX: Pass value pre-processed to string | undefined */}
//             {displayCreatedAt}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-white/90 mb-1">Last Updated</p>
//           <div className="text-sm bg-secondarybox text-mainheadingWhite px-3 py-3 rounded-lg">
//              {/* FIX: Pass value pre-processed to string | undefined */}
//             {displayUpdatedAt}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransferInfoCard;


// FILE: src/app/admin/components/transfers/TransferInfoCard.tsx
"use client";
import React from "react";
import { formatFullDateTime } from "../../../utils/helpers";

// Define a specific interface for the transfer object's relevant properties
interface TransferInfo {
  _id: string; // Transfer ID, made required
  createdAt?: string | Date | null | undefined; // Allow null/undefined/Date
  updatedAt?: string | Date | null | undefined; // Allow null/undefined/Date
}

interface TransferInfoCardProps {
  transfer: TransferInfo | null | undefined;
}

// Helper function to prepare the date value for formatFullDateTime
// It ensures the value passed is either string | undefined, handling Date and null.
const prepareDateForFormatting = (dateValue: string | Date | null | undefined): string | undefined => {
  if (dateValue === null || dateValue === undefined) {
    return undefined; // Pass undefined if null or undefined
  }
  if (dateValue instanceof Date) {
    return dateValue.toISOString(); // Convert Date object to ISO string
  }
  return dateValue; // If it's already a string, return it as is
};

const TransferInfoCard: React.FC<TransferInfoCardProps> = ({ transfer }) => {
  if (!transfer) return null; // Defensive rendering

  // Prepare date values using the helper function before passing them
  const preparedCreatedAt = prepareDateForFormatting(transfer.createdAt);
  const preparedUpdatedAt = prepareDateForFormatting(transfer.updatedAt);

  // Decide what to display if the formatted date is null/empty (formatFullDateTime might return empty/null for invalid inputs)
  const displayCreatedAt = formatFullDateTime(preparedCreatedAt) || 'N/A';
  const displayUpdatedAt = formatFullDateTime(preparedUpdatedAt) || 'N/A';

  return (
    <div className="bg-primarybox rounded-xl border overflow-hidden">
      <div className="bg-secondarybox px-6 py-4">
        <h3 className="text-lg font-semibold text-mainheadingWhite">Transfer Information</h3>
      </div>
      <div className="sm:p-6 p-4 space-y-4">
        <div>
          <p className="text-sm font-medium text-mainheadingWhite mb-1">Transfer ID</p>
          <div className="text-sm bg-secondarybox text-white px-3 py-3 rounded-lg break-all">
            {/* Using transfer._id directly as it's made required by interface */}
            {transfer._id}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-mainheadingWhite mb-1">Created On</p>
          <div className="text-sm bg-secondarybox text-white px-3 py-3 rounded-lg">
            {displayCreatedAt}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-mainheadingWhite mb-1">Last Updated</p>
          <div className="text-sm bg-secondarybox text-white px-3 py-3 rounded-lg">
            {displayUpdatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferInfoCard;