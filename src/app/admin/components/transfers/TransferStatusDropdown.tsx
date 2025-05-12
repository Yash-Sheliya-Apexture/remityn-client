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





"use client";
import React, { useState, useEffect } from "react";
import adminTransferService from "../../../services/admin/transfer"; // Adjust path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner"; // Using sonner for notifications

interface TransferStatusDropdownProps {
  transferId: string;
  currentStatus: string;
  token: string | null;
  onStatusUpdated: () => void;
}

// Define a type for the potential error structure, extending the base Error
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const TransferStatusDropdown: React.FC<TransferStatusDropdownProps> = ({
  transferId,
  currentStatus,
  token,
  onStatusUpdated,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const statuses = ["pending", "processing", "completed", "failed", "canceled"];
  const isFinalStatus = ["completed", "failed", "canceled"].includes(
    currentStatus
  );

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus || isUpdating || !token || isFinalStatus)
      return;

    setIsUpdating(true);
    const toastId = toast.loading("Updating status...");

    try {
      await adminTransferService.updateAdminTransferStatus(
        transferId,
        newStatus,
        null, // failureReason (can be updated separately if needed)
        token
      );
      toast.success("Transfer status updated successfully!", { id: toastId });
      setSelectedStatus(newStatus); // Update local state
      onStatusUpdated(); // Refresh details
    } catch (err) { // Catch without explicit 'any'
      console.error("Failed to update status:", err);

      // Use type assertion to treat the caught error as our potential ApiError structure
      // This assumes the error will either be a standard Error or have the response structure
      const error = err as ApiError;

      // Safely extract the message using optional chaining and fallbacks
      const errorMessage =
        error.response?.data?.message || // Check for API error message
        error.message || // Fallback to standard error message
        "Failed to update status."; // Generic fallback

      toast.error(errorMessage, { id: toastId });
      // Don't revert selectedStatus - Select handles display. Error is shown via toast.
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Select
        value={selectedStatus}
        onValueChange={handleStatusChange}
        disabled={isUpdating || isFinalStatus}
      >
        <SelectTrigger
          className={`w-full ${isUpdating ? "cursor-not-allowed" : ""} ${
            isFinalStatus ? "bg-slate-100 cursor-not-allowed opacity-70" : ""
          }`}
        >
          <SelectValue placeholder="Select status" />
          {isUpdating && (
            <RefreshCw className="ml-auto mr-2 size-4 animate-spin text-slate-500" />
          )}
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem
              key={status}
              value={status}
              // Disable selecting the current status again
              disabled={status === currentStatus || isUpdating || isFinalStatus}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isFinalStatus && (
        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 italic">
          Final status reached, cannot be changed.
        </p>
      )}
    </div>
  );
};

export default TransferStatusDropdown;