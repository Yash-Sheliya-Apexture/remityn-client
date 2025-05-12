// // frontend/src/app/admin/components/inbox/DeleteConfirmationModal.tsx
// 'use client';
// import React from 'react';
// import { X, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
// import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path
// import { format } from 'date-fns';

// const formatDate = (dateInput?: string | Date | null): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return format(date, "MMM d, yyyy HH:mm");
//   } catch (e) {
//     return "Invalid Date";
//   }
// };

// interface DeleteConfirmationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message: AdminInboxMessage | null;
//   onConfirm: () => Promise<void>;
//   isLoading: boolean;
// }

// const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
//   isOpen,
//   onClose,
//   message,
//   onConfirm,
//   isLoading,
// }) => {
//   if (!isOpen || !message) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//       <div className="bg-white dark:bg-primarybox w-full max-w-md rounded-lg shadow-xl p-6 transform transition-all">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-mainheading dark:text-white flex items-center">
//             <AlertTriangle size={24} className="mr-2 text-red-500" />
//             Confirm Deletion
//           </h3>
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="mb-6">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Are you sure you want to permanently delete this message? This action cannot be undone.
//           </p>
//           <div className="mt-3 p-3 bg-gray-50 dark:bg-secondarybox rounded-md border dark:border-gray-700">
//             <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               Subject: <span className="font-normal">{message.subject}</span>
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               To: {message.userId?.fullName ?? message.userId?.email ?? "Unknown"}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               Sent: {formatDate(message.sentAt)}
//             </p>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isLoading}
//             className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={isLoading}
//             className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
//           >
//             {isLoading ? (
//               <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <Trash2 className="mr-2 h-4 w-4" />
//             )}
//             {isLoading ? 'Deleting...' : 'Delete Message'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;



"use client";

import React, { useState, useEffect } from "react";
import type { AdminInboxMessage } from "../../../../services/admin/inbox"; // Adjusted path to match EditMessageModal
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { format } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

// Define variants outside the component or memoize them if inside
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

// Custom SVG Loader Component (same as in EditMessageModal)
const SvgLoader = () => (
  <svg
    className="h-5 w-5 text-white animate-spin mr-2" // text-white for red button
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatDate = (dateInput?: string | Date | null): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    return format(date, "MMM d, yyyy HH:mm");
  } catch (e) {
    return "Invalid Date";
  }
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: AdminInboxMessage | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  isLoading,
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

  const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

  if (!message) return null; // Keep this check, but AnimatePresence handles isOpen

  const recipientName = message?.userId?.fullName || message?.userId?.email || "Unknown";

  return (
    <AnimatePresence>
      {isOpen && message && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header */}
            <div className="sm:p-6 p-4 border-b">
              <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6 flex items-center">
                Confirm Deletion
              </h3>
              
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Are you sure you want to permanently delete this message? This action cannot be undone.
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 space-y-1.5 border px-4 py-3 rounded-xl">
                <div className="flex items-start">
                    <span className="font-semibold text-neutral-900 dark:text-white w-[70px] shrink-0">Subject:</span>
                    <span className="ml-1.5 flex-1 break-words">{message.subject}</span>
                </div>
                <div className="flex items-start">
                    <span className="font-semibold text-neutral-900 dark:text-white w-[70px] shrink-0">To:</span>
                    <span className="ml-1.5 truncate" title={recipientName}>{recipientName.length > 35 ? `${recipientName.substring(0,35)}...` : recipientName}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-neutral-900 dark:text-white w-[70px] shrink-0">Sent:</span>
                    <span className="ml-1.5">{formatDate(message.sentAt)}</span>
                </div>
              </div>
              <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                  disabled={isLoading}
                >
                  <IoClose
                    size={28}
                    className="text-neutral-900 dark:text-primary"
                  />
                </button>
              </div>
            </div>

            {/* Body - Not strictly needed if all info is in header, but provides structure */}
            <div className="sm:p-6 p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    This message will be permanently removed from the system. Please confirm your action.
                </p>
            </div>


            {/* Footer */}
            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox  dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <SvgLoader />}
                {isLoading ? "Deleting..." : "Delete Message"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;