// // frontend/src/app/admin/components/inbox/EditMessageModal.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { X, CheckCircle2, RefreshCw } from 'lucide-react';
// import type { AdminInboxMessage } from '../../../../services/admin/inbox'; // Adjust path

// interface EditMessageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message: AdminInboxMessage | null;
//   onSave: (id: string, subject: string, body: string) => Promise<void>;
//   isLoading: boolean;
// }

// const EditMessageModal: React.FC<EditMessageModalProps> = ({
//   isOpen,
//   onClose,
//   message,
//   onSave,
//   isLoading,
// }) => {
//   const [subject, setSubject] = useState('');
//   const [body, setBody] = useState('');

//   useEffect(() => {
//     if (message) {
//       setSubject(message.subject);
//       setBody(message.body || ''); // Ensure body is handled if undefined
//     } else {
//       setSubject('');
//       setBody('');
//     }
//   }, [message]);

//   if (!isOpen || !message) return null;

//   const handleSave = () => {
//     if (subject.trim() && body.trim()) {
//       onSave(message._id, subject.trim(), body.trim());
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//       <div className="bg-white dark:bg-primarybox w-full max-w-lg rounded-lg shadow-xl p-6 transform transition-all">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-mainheading dark:text-white">Edit Message</h3>
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="space-y-4 mb-6">
//           <div>
//             <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Subject
//             </label>
//             <input
//               type="text"
//               id="edit-subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               disabled={isLoading}
//               maxLength={200}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondarybox dark:text-white sm:text-sm disabled:opacity-70"
//               placeholder="Enter subject"
//             />
//           </div>
//           <div>
//             <label htmlFor="edit-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Body
//             </label>
//             <textarea
//               id="edit-body"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               disabled={isLoading}
//               rows={6}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondarybox dark:text-white sm:text-sm disabled:opacity-70"
//               placeholder="Enter message body..."
//             />
//           </div>
//            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//               Message ID: {message._id?.slice(-6)} | To: {message.userId?.fullName ?? message.userId?.email ?? "N/A"}
//           </p>
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
//             onClick={handleSave}
//             disabled={isLoading || !subject.trim() || !body.trim()}
//             className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primaryhover rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//           >
//             {isLoading ? (
//               <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <CheckCircle2 className="mr-2 h-4 w-4" />
//             )}
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMessageModal;


"use client";

import React, { useState, useEffect } from "react";
import type { AdminInboxMessage } from "../../../../services/admin/inbox"; // Adjusted path
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface EditMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: AdminInboxMessage | null;
  onSave: (id: string, subject: string, body: string) => Promise<void>;
  isLoading: boolean;
}

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

// Custom SVG Loader Component
const SvgLoader = () => (
  <svg
    className="h-5 w-5 text-neutral-900 animate-spin mr-2"
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

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  isOpen,
  onClose,
  message,
  onSave,
  isLoading,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');

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

  useEffect(() => {
    if (message) {
      setEditSubject(message.subject);
      setEditBody(message.body || '');
    } else {
      // Reset fields if message becomes null (e.g., modal closes and reopens quickly)
      setEditSubject('');
      setEditBody('');
    }
  }, [message]);

  const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

  const handleSave = () => {
    if (message && editSubject.trim() && editBody.trim()) {
      onSave(message._id, editSubject.trim(), editBody.trim());
    }
  };

  const recipientName = message?.userId?.fullName || message?.userId?.email || "N/A";

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
              <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
                Edit Message
              </h3>
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Modify the subject and body of this message.
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 space-y-1.5 border px-4 py-3 rounded-xl">
                <div className="flex items-start">
                    <span className="font-semibold text-neutral-900 dark:text-white w-[70px] shrink-0">ID:</span>
                    <span className="ml-1.5 flex-1 break-words">{message?.batchId ? `Batch ${message.batchId}` : message?._id}</span>
                </div>
                 {message?.userId && (
                    <div className="flex items-start">
                        <span className="font-semibold text-neutral-900 dark:text-white w-[70px] shrink-0">To:</span>
                        <span className="ml-1.5 truncate" title={recipientName}>{recipientName.length > 25 ? `${recipientName.substring(0,25)}...` : recipientName}</span>
                    </div>
                 )}
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

            {/* Body */}
            <div className="sm:p-6 p-4 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-message-subject"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  Subject
                </label>
                <input
                  id="edit-message-subject"
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  disabled={isLoading}
                  maxLength={200}
                  className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
                  placeholder="Enter subject"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-message-body"
                  className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                >
                  Body
                </label>
                <textarea
                  id="edit-message-body"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="min-h-[150px] mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
                  disabled={isLoading}
                  placeholder="Enter updated message body..."
                  rows={6}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="bg-neutral-900 hover:bg-neutral-700 text-primary w-full dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center cursor-pointer transition-all duration-75 ease-linear"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={
                  isLoading ||
                  !editSubject.trim() ||
                  !editBody.trim()
                }
                className="flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <SvgLoader />}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditMessageModal;