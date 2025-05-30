// // components/Filter/Status.tsx
// import React from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";


// interface StatusProps {
//   selectedStatus: string | null;
//   onStatusChange: (status: string | null) => void;
// }

// export default function Status({ selectedStatus, onStatusChange }: StatusProps) {
//   const statuses = ["Completed", "Cancelled"]; // Example statuses

//   const handleStatusButtonClick = (status: string) => {
//     if (selectedStatus === status) {
//       onStatusChange(null); // Deselect if already selected
//     } else {
//       onStatusChange(status);
//     }
//   };

//   const handleClearStatus = () => {
//     onStatusChange(null); // Directly clear status
//   };

//   return (
//     <div>
//       <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b">
//         Status
//       </h4>
//       <div className="flex items-center gap-2">
//         {statuses.map((status) => (
//           <button
//             key={status}
//             className={`font-medium border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer ${
//               selectedStatus === status
//                 ? "bg-neutral-900 text-primary dark:bg-green-600/20" // Highlight if selected
//                 : "text-mainheading dark:bg-background dark:text-white bg-white"
//             }`}
//             onClick={() => handleStatusButtonClick(status)}
//           >
//             {status}
//             {selectedStatus === status && (
//               <span // Changed from <button> to <span>
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent button click from re-selecting
//                   handleClearStatus();
//                 }}
//                 className="inline-flex items-center justify-center" // Added cursor-pointer to indicate it's clickable
//                 aria-label={`Clear status ${status}`}
//               >
//                 <IoIosCloseCircleOutline size={24} />
//               </span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// components/Filter/Status.tsx
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface StatusProps {
  selectedStatus: string | null; // Expects lowercase status key or null
  onStatusChange: (status: string | null) => void;
}

// Define statuses with display text and internal value (lowercase key)
const statusOptions = [
  { display: "Completed", value: "completed" },
  { display: "In Progress", value: "in progress" },
  { display: "Cancelled", value: "cancelled" }, // Matches filter spelling
  { display: "Failed", value: "failed" },
];

export default function Status({ selectedStatus, onStatusChange }: StatusProps) {

  const handleStatusButtonClick = (statusValue: string) => {
    // Compare with the lowercase value
    if (selectedStatus === statusValue) {
      onStatusChange(null); // Deselect if already selected
    } else {
      onStatusChange(statusValue); // Select the new status (already lowercase)
    }
  };

  const handleClearStatus = () => {
    onStatusChange(null); // Directly clear status
  };

  return (
    <div>
      <h4 className="font-medium text-white/90 mb-3 leading-8 border-b">
        Status
      </h4>
      <div className="flex items-center flex-wrap gap-2"> {/* Added flex-wrap */}
        {statusOptions.map((status) => (
          <button
            key={status.value}
            className={`font-medium border flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer transition-colors ${ // Adjusted gap and text size slightly
              selectedStatus === status.value
                ? "bg-primarybox hover:bg-secondarybox text-primary border-transparent" // Highlight if selected
                : "text-white/90 bg-background hover:border-gray-500"
            }`}
            onClick={() => handleStatusButtonClick(status.value)}
          >
            {status.display} {/* Show display text */}
            {selectedStatus === status.value && (
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent button click from re-selecting
                  handleClearStatus();
                }}
                className="inline-flex items-center justify-center leading-none" // Adjusted styling slightly
                aria-label={`Clear status ${status.display}`}
              >
                <IoIosCloseCircleOutline size={20} /> {/* Adjusted size slightly */}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}