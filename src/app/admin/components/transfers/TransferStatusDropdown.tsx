// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RefreshCw } from "lucide-react";
// import { toast } from "sonner"; // Using sonner for notifications

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string;
//   token: string | null;
//   onStatusUpdated: () => void;
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }) => {
//   const [selectedStatus, setSelectedStatus] = useState(currentStatus);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const statuses = ["pending", "processing", "completed", "failed", "canceled"];
//   const isFinalStatus = ["completed", "failed", "canceled"].includes(
//     currentStatus
//   );

//   useEffect(() => {
//     setSelectedStatus(currentStatus);
//   }, [currentStatus]);

//   const handleStatusChange = async (newStatus: string) => {
//     if (newStatus === currentStatus || isUpdating || !token || isFinalStatus)
//       return;

//     setIsUpdating(true);
//     const toastId = toast.loading("Updating status...");

//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         null, // failureReason (can be updated separately if needed)
//         token
//       );
//       toast.success("Transfer status updated successfully!", { id: toastId });
//       setSelectedStatus(newStatus); // Update local state
//       onStatusUpdated(); // Refresh details
//     } catch (err: any) {
//       console.error("Failed to update status:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Failed to update status.";
//       toast.error(errorMessage, { id: toastId });
//       // Don't revert selectedStatus - Select handles display. Error is shown via toast.
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <Select
//         value={selectedStatus}
//         onValueChange={handleStatusChange}
//         disabled={isUpdating || isFinalStatus}
//       >
//         <SelectTrigger
//           className={`w-full ${isUpdating ? "cursor-not-allowed" : ""} ${
//             isFinalStatus ? "bg-slate-100 cursor-not-allowed opacity-70" : ""
//           }`}
//         >
//           <SelectValue placeholder="Select status" />
//           {isUpdating && (
//             <RefreshCw className="ml-auto mr-2 size-4 animate-spin text-slate-500" />
//           )}
//         </SelectTrigger>
//         <SelectContent>
//           {statuses.map((status) => (
//             <SelectItem
//               key={status}
//               value={status}
//               // Disable selecting the current status again
//               disabled={status === currentStatus || isUpdating || isFinalStatus}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       {isFinalStatus && (
//         <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 italic">
//           Final status reached, cannot be changed.
//         </p>
//       )}
//     </div>
//   );
// };

// export default TransferStatusDropdown;

// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RefreshCw } from "lucide-react";
// import { toast } from "sonner"; // Using sonner for notifications

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string;
//   token: string | null;
//   onStatusUpdated: () => void;
// }

// // Define a type for the potential error structure, extending the base Error
// interface ApiError extends Error {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
// }

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus,
//   token,
//   onStatusUpdated,
// }) => {
//   const [selectedStatus, setSelectedStatus] = useState(currentStatus);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const statuses = ["pending", "processing", "completed", "failed", "canceled"];
//   const isFinalStatus = ["completed", "failed", "canceled"].includes(
//     currentStatus
//   );

//   useEffect(() => {
//     setSelectedStatus(currentStatus);
//   }, [currentStatus]);

//   const handleStatusChange = async (newStatus: string) => {
//     if (newStatus === currentStatus || isUpdating || !token || isFinalStatus)
//       return;

//     setIsUpdating(true);
//     const toastId = toast.loading("Updating status...");

//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newStatus,
//         null, // failureReason (can be updated separately if needed)
//         token
//       );
//       toast.success("Transfer status updated successfully!", { id: toastId });
//       setSelectedStatus(newStatus); // Update local state
//       onStatusUpdated(); // Refresh details
//     } catch (err) { // Catch without explicit 'any'
//       console.error("Failed to update status:", err);

//       // Use type assertion to treat the caught error as our potential ApiError structure
//       // This assumes the error will either be a standard Error or have the response structure
//       const error = err as ApiError;

//       // Safely extract the message using optional chaining and fallbacks
//       const errorMessage =
//         error.response?.data?.message || // Check for API error message
//         error.message || // Fallback to standard error message
//         "Failed to update status."; // Generic fallback

//       toast.error(errorMessage, { id: toastId });
//       // Don't revert selectedStatus - Select handles display. Error is shown via toast.
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <Select
//         value={selectedStatus}
//         onValueChange={handleStatusChange}
//         disabled={isUpdating || isFinalStatus}
//       >
//         <SelectTrigger
//           className={`w-full ${isUpdating ? "cursor-not-allowed" : ""} ${
//             isFinalStatus ? "bg-slate-100 cursor-not-allowed opacity-70" : ""
//           }`}
//         >
//           <SelectValue placeholder="Select status" />
//           {isUpdating && (
//             <RefreshCw className="ml-auto mr-2 size-4 animate-spin text-slate-500" />
//           )}
//         </SelectTrigger>

//         <SelectContent>
//           {statuses.map((status) => (
//             <SelectItem
//               key={status}
//               value={status}
//               // Disable selecting the current status again
//               disabled={status === currentStatus || isUpdating || isFinalStatus}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </SelectItem>
//           ))}
//         </SelectContent>

//       </Select>
//       {isFinalStatus && (
//         <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 italic">
//           Final status reached, cannot be changed.
//         </p>
//       )}
//     </div>
//   );
// };

// export default TransferStatusDropdown;

// // Last latest code 
// // FILE: src/app/admin/components/transfers/TransferStatusDropdown.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import adminTransferService from "../../../services/admin/transfer"; // Adjust path
// import CustomDropdown from "../add-money/CustomDropdown"; // Path to your CustomDropdown
// import { RefreshCw } from "lucide-react"; // Keep for potential direct use if needed, though CustomDropdown handles its own
// import { toast } from "sonner";

// interface TransferStatusDropdownProps {
//   transferId: string;
//   currentStatus: string; // Expects lowercase status, e.g., "pending", "unknown"
//   token: string | null;
//   onStatusUpdated: () => void;
// }

// interface ApiError extends Error {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
// }

// // These are the actual values sent to/received from the API (lowercase)
// const actualStatuses = [
//   "pending",
//   "processing",
//   "completed",
//   "failed",
//   "canceled",
// ];

// // Helper to capitalize status for display
// const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// // These are the values shown in the dropdown UI (Capitalized)
// const displayStatuses = actualStatuses.map(capitalize);

// const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
//   transferId,
//   currentStatus, // This is the lowercase actual status
//   token,
//   onStatusUpdated,
// }) => {
//   // selectedDisplayStatus stores the capitalized version for the UI
//   const [selectedDisplayStatus, setSelectedDisplayStatus] = useState<string>(
//     capitalize(currentStatus)
//   );
//   const [isUpdating, setIsUpdating] = useState(false);

//   // Determine if the current status (actual lowercase) is a final one
//   const isFinalActualStatus = ["completed", "failed", "canceled"].includes(
//     currentStatus.toLowerCase()
//   );

//   useEffect(() => {
//     // Sync display status if the prop (currentStatus, lowercase) changes
//     setSelectedDisplayStatus(capitalize(currentStatus));
//   }, [currentStatus]);

//   const handleDropdownChange = async (newDisplayValue: string | null) => {
//     if (!newDisplayValue) return; // Should not receive null if options are always strings

//     const newActualStatus = newDisplayValue.toLowerCase();

//     if (
//       newActualStatus === currentStatus.toLowerCase() ||
//       isUpdating ||
//       !token ||
//       isFinalActualStatus
//     ) {
//       return;
//     }

//     setIsUpdating(true);
//     const toastId = toast.loading("Updating status...");

//     try {
//       await adminTransferService.updateAdminTransferStatus(
//         transferId,
//         newActualStatus, // Send lowercase status to API
//         null,
//         token
//       );
//       toast.success("Transfer status updated successfully!", { id: toastId });
//       // selectedDisplayStatus will be updated via useEffect when currentStatus prop changes after onStatusUpdated()
//       onStatusUpdated(); // Refresh details, which should update currentStatus prop
//     } catch (err) {
//       const error = err as ApiError;
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to update status.";
//       toast.error(errorMessage, { id: toastId });
//       // Do not change selectedDisplayStatus here; let it reflect the actual currentStatus from props
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <CustomDropdown
//         // No explicit label here as "Update Status" is likely above this component
//         value={selectedDisplayStatus} // Pass the capitalized status for display
//         onChange={handleDropdownChange} // Receives capitalized status from CustomDropdown
//         options={displayStatuses} // Pass capitalized statuses as options
//         disabled={isUpdating || isFinalActualStatus}
//         isLoading={isUpdating}
//         placeholder="Select status"
//       />
//       {isFinalActualStatus && (
//         <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
//           Final status reached, cannot be changed.
//         </p>
//       )}
//     </div>
//   );
// };

// export default TransferStatusDropdown;



// frontend/src/app/admin/components/transfers/TransferStatusDropdown.tsx
"use client";
import React, { useState, useEffect } from "react";
import adminTransferService from "../../../services/admin/transfer"; 
import CustomDropdown from "../add-money/CustomDropdown"; 
import { CustomToastProps } from "../../../../app/components/CustomToast"; 

interface TransferStatusDropdownProps {
  transferId: string;
  currentStatus: string; 
  token: string | null;
  onStatusUpdated: () => void;
  showToast: (message: string, type?: CustomToastProps['type']) => void;
  mapStatusToToastType: (status: string) => CustomToastProps['type'];
}

interface ApiError extends Error {
  response?: { data?: { message?: string; }; };
}

const actualStatuses = ["pending", "processing", "completed", "failed", "canceled"];
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const displayStatuses = actualStatuses.map(capitalize);

const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
  transferId, currentStatus, token, onStatusUpdated, showToast, mapStatusToToastType, 
}) => {
  const [selectedDisplayStatus, setSelectedDisplayStatus] = useState<string>(capitalize(currentStatus));
  const [isUpdating, setIsUpdating] = useState(false);
  const isFinalActualStatus = ["completed", "failed", "canceled"].includes(currentStatus.toLowerCase());

  useEffect(() => {
    setSelectedDisplayStatus(capitalize(currentStatus));
  }, [currentStatus]);

  const handleDropdownChange = async (newDisplayValue: string | null) => {
    if (!newDisplayValue) return;
    const newActualStatus = newDisplayValue.toLowerCase();

    console.log('[TransferStatusDropdown] handleDropdownChange:', { newDisplayValue, newActualStatus, currentStatus });

    if (newActualStatus === currentStatus.toLowerCase() || isUpdating || !token || isFinalActualStatus) {
      console.log('[TransferStatusDropdown] Condition not met, returning early:', {
        isSameStatus: newActualStatus === currentStatus.toLowerCase(), isUpdating, hasToken: !!token, isFinalActualStatus,
      });
      return;
    }

    setIsUpdating(true);
    console.log('[TransferStatusDropdown] Attempting to update status to:', newActualStatus);

    try {
      await adminTransferService.updateAdminTransferStatus(transferId, newActualStatus, null, token);
      const toastType = mapStatusToToastType(newActualStatus);
      const successMessage = `Transfer status updated to "${newDisplayValue}" successfully!`;
      
      console.log(`[TransferStatusDropdown] SUCCESS: API call successful. Preparing to show toast. Message: "${successMessage}", Type: "${toastType}", New Actual Status: "${newActualStatus}"`);
      showToast(successMessage, toastType);
      console.log('[TransferStatusDropdown] SUCCESS: showToast called. Calling onStatusUpdated.');
      
      onStatusUpdated(); 
    } catch (err) {
      const error = err as ApiError;
      const errorMessage = error.response?.data?.message || error.message || "Failed to update status.";
      console.error('[TransferStatusDropdown] ERROR: API call failed or error during update.', { errorMessage, errorObj: err });
      console.log(`[TransferStatusDropdown] ERROR: Preparing to show error toast. Message: "${errorMessage}"`);
      showToast(errorMessage, 'error');
      console.log('[TransferStatusDropdown] ERROR: showToast for error called.');
    } finally {
      setIsUpdating(false);
      console.log('[TransferStatusDropdown] Update process finished, isUpdating set to false.');
    }
  };

  return (
    <div className="space-y-2">
      <CustomDropdown
        value={selectedDisplayStatus} 
        onChange={handleDropdownChange} 
        options={displayStatuses} 
        disabled={isUpdating || isFinalActualStatus}
        isLoading={isUpdating}
        placeholder="Select status"
      />
      {isFinalActualStatus && (
        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
          Final status reached, cannot be changed.
        </p>
      )}
    </div>
  );
};

export default TransferStatusDropdown;