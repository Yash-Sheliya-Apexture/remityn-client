// "use client";

// import React from "react";
// import { Loader2, Trash2, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import type { BroadcastBatchInfo } from "../../../../services/admin/inbox";

// interface DeleteBroadcastBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batchToDelete: BroadcastBatchInfo | null;
//   onDelete: () => void;
//   isDeleting: boolean;
//   formatDateForDisplay: (dateInput?: string | Date | null) => string;
// }

// const DeleteBroadcastBatchModal: React.FC<DeleteBroadcastBatchModalProps> = ({
//   isOpen,
//   onClose,
//   batchToDelete,
//   onDelete,
//   isDeleting,
//   formatDateForDisplay,
// }) => {
//   if (!isOpen || !batchToDelete) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//       <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
//         {/* Header */}
//         <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Confirm Batch Deletion
//           </h3>
//           <button
//             type="button"
//             onClick={onClose}
//             className={cn(
//               "inline-flex items-center justify-center rounded-lg text-sm p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none",
//               "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
//             )}
//             disabled={isDeleting}
//           >
//             <X className="w-5 h-5" /> <span className="sr-only">Close modal</span>
//           </button>
//         </div>
//         {/* Body */}
//         <div className="p-6 space-y-3">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Delete all{" "}
//             <strong className="text-gray-800 dark:text-gray-200">
//               {batchToDelete?.recipientCount ?? 0}
//             </strong>{" "}
//             messages in this broadcast?
//             <span className="font-medium text-red-600 dark:text-red-400 block mt-1">
//               This action cannot be undone.
//             </span>
//           </p>
//           <div className="text-sm space-y-1 border-t pt-3 mt-3 dark:border-gray-600">
//             <p>
//               <strong className="text-gray-700 dark:text-gray-300">Subject:</strong>{" "}
//               {batchToDelete?.subject}
//             </p>
//             <p>
//               <strong className="text-gray-700 dark:text-gray-300">Sent:</strong>{" "}
//               {formatDateForDisplay(batchToDelete?.sentAt)}
//             </p>
//             <p>
//               <strong className="text-gray-700 dark:text-gray-300">Batch ID:</strong>{" "}
//               {batchToDelete?.batchId.substring(0, 13)}...
//             </p>
//           </div>
//         </div>
//         {/* Footer */}
//         <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isDeleting}
//             className={cn(
//               "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none",
//               "h-10 px-4 py-2",
//               "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
//             )}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onDelete}
//             disabled={isDeleting}
//             className={cn(
//               "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:pointer-events-none",
//               "h-10 px-4 py-2",
//               "bg-red-600 text-white hover:bg-red-700"
//             )}
//           >
//             {isDeleting ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <Trash2 className="mr-2 h-4 w-4" />
//             )}
//             Delete Entire Batch
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteBroadcastBatchModal;

// "use client";

// import React, { useState, useEffect } from "react";
// import type { BroadcastBatchInfo } from "../../../../services/admin/inbox";
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// // Define variants consistent with EditBroadcastBatchModal
// const mobileVariantsConfig = {
//   initial: { y: 50, opacity: 0 },
//   animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//   exit: { y: 50, opacity: 0 },
// };

// const desktopVariantsConfig = {
//   initial: { y: -30, opacity: 0, scale: 0.95 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
//   exit: { y: -30, opacity: 0, scale: 0.95 },
// };

// interface DeleteBroadcastBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batchToDelete: BroadcastBatchInfo | null;
//   onDelete: () => void;
//   isDeleting: boolean;
//   formatDateForDisplay: (dateInput?: string | Date | null) => string;
// }

// // Custom SVG Loader Component (consistent with EditBroadcastBatchModal)
// const SvgLoader = () => (
//   <svg
//     className="h-5 w-5 text-white animate-spin mr-2" // text-white for red button
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const DeleteBroadcastBatchModal: React.FC<DeleteBroadcastBatchModalProps> = ({
//   isOpen,
//   onClose,
//   batchToDelete,
//   onDelete,
//   isDeleting,
//   formatDateForDisplay,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 640); // sm breakpoint
//     };

//     checkIsMobile();
//     window.addEventListener("resize", checkIsMobile);

//     return () => {
//       window.removeEventListener("resize", checkIsMobile);
//     };
//   }, []);

//   const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;
//   return (
//     <AnimatePresence>
//       {isOpen && batchToDelete && (
//         <motion.div
//           className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close when clicking on backdrop
//         >
//           <motion.div
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative" // sm:max-w-md for delete modal
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">

//               <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                 Confirm Batch Deletion
//               </h2>

//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="size-12 bg-lightgray cursor-pointer hover:bg-lightborder text-neutral-900 dark:text-primary dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear focus:outline-none"
//                   disabled={isDeleting}
//                 >
//                   <IoClose
//                     size={28}
//                   />
//                 </button>
//             </div>

//             {/* Body */}
//             <div className="sm:p-6 p-4 space-y-4">
//               <p className="text-neutral-900 dark:text-white">
//                 Are you sure you want to delete all{" "}
//                 <strong>
//                   {batchToDelete?.recipientCount ?? 0}
//                 </strong>{" "}
//                 messages in this broadcast batch?
//               </p>
//               <p className="font-medium text-red-600 dark:text-red-400">
//                 This action cannot be undone.
//               </p>
//               <div className="text-sm space-y-1 border-t pt-4 mt-4">
//                 <p className="text-gray-500 dark:text-gray-300">
//                   <strong className="text-mainheading dark:text-white">Subject :-</strong>{" "}
//                   {batchToDelete?.subject}
//                 </p>
//                 <p className="text-gray-500 dark:text-gray-300">
//                   <strong className="text-mainheading dark:text-white">Sent :-</strong>{" "}
//                   {formatDateForDisplay(batchToDelete?.sentAt)}
//                 </p>
//                 <p className="text-gray-500 dark:text-gray-300">
//                   <strong className="text-mainheading dark:text-white">Batch ID :-</strong>{" "}
//                   {batchToDelete?.batchId}
//                 </p>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isDeleting}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 disabled={isDeleting}
//                 className="flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isDeleting && <SvgLoader /> }
//                 {isDeleting ? "Deleting..." : "Delete Batch"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DeleteBroadcastBatchModal;

"use client";

import React, { useState, useEffect } from "react";
import type { BroadcastBatchInfo } from "../../../../services/admin/inbox";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Define variants consistent with EditBroadcastBatchModal
const mobileVariantsConfig = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
  exit: { y: 50, opacity: 0 },
};

const desktopVariantsConfig = {
  initial: { y: -30, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { y: -30, opacity: 0, scale: 0.95 },
};

interface DeleteBroadcastBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchToDelete: BroadcastBatchInfo | null;
  onDelete: () => void;
  isDeleting: boolean;
  formatDateForDisplay: (dateInput?: string | Date | null) => string;
}

// Custom SVG Loader Component (consistent with EditBroadcastBatchModal)
const SvgLoader = () => (
  <svg
    className="h-5 w-5 text-white animate-spin mr-2" // text-white for red button
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.93 4.93L7.76 7.76"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.24 16.24L19.07 19.07"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 12H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.93 19.07L7.76 16.24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.24 7.76L19.07 4.93"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteBroadcastBatchModal: React.FC<DeleteBroadcastBatchModalProps> = ({
  isOpen,
  onClose,
  batchToDelete,
  onDelete,
  isDeleting,
  formatDateForDisplay,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Effect to handle body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Only reset if no other modal is controlling overflow
      // This simple check might need to be more robust if multiple modals can stack
      document.body.style.overflow = "";
    }

    // Cleanup function to ensure overflow is reset when component unmounts
    // or before the effect runs again if isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]); // Dependency array ensures this effect runs only when isOpen changes

  const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;
  return (
    <AnimatePresence>
      {isOpen && batchToDelete && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking on backdrop
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative" // sm:max-w-md for delete modal
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
                Confirm Batch Deletion
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="size-12 bg-lightgray cursor-pointer hover:bg-lightborder text-neutral-900 dark:text-primary dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear focus:outline-none"
                disabled={isDeleting}
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Body */}
            <div className="sm:p-6 p-4 space-y-4">
              <p className="text-neutral-900 dark:text-white">
                Are you sure you want to delete all{" "}
                <strong>{batchToDelete?.recipientCount ?? 0}</strong> messages
                in this broadcast batch?
              </p>
              <p className="font-medium text-red-600 dark:text-red-400">
                This action cannot be undone.
              </p>
              <div className="text-sm space-y-1 border-t pt-4 mt-4">
                <p className="text-gray-500 dark:text-gray-300">
                  <strong className="text-mainheading dark:text-white">
                    Subject :-
                  </strong>{" "}
                  {batchToDelete?.subject}
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  <strong className="text-mainheading dark:text-white">
                    Sent :-
                  </strong>{" "}
                  {formatDateForDisplay(batchToDelete?.sentAt)}
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  <strong className="text-mainheading dark:text-white">
                    Batch ID :-
                  </strong>{" "}
                  {batchToDelete?.batchId}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={isDeleting}
                className="flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting && <SvgLoader />}
                {isDeleting ? "Deleting..." : "Delete Batch"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteBroadcastBatchModal;
