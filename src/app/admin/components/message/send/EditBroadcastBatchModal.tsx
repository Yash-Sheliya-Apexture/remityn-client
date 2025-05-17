// "use client";

// import React, { useState, useEffect } from "react";
// import type { BroadcastBatchInfo } from "../../../../services/admin/inbox";
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// interface EditBroadcastBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batchToEdit: BroadcastBatchInfo | null;
//   editSubject: string;
//   onSubjectChange: (value: string) => void;
//   editBody: string;
//   onBodyChange: (value: string) => void;
//   onUpdate: () => void;
//   isUpdating: boolean;
//   fullBodyFetched: boolean;
// }

// // Define variants outside the component or memoize them if inside
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

// const EditBroadcastBatchModal: React.FC<EditBroadcastBatchModalProps> = ({
//   isOpen,
//   onClose,
//   batchToEdit,
//   editSubject,
//   onSubjectChange,
//   editBody,
//   onBodyChange,
//   onUpdate,
//   isUpdating,
//   fullBodyFetched,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkIsMobile();
//     window.addEventListener("resize", checkIsMobile);

//     return () => {
//       window.removeEventListener("resize", checkIsMobile);
//     };
//   }, []);

//   const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

//   // Custom SVG Loader Component (can be defined outside or inline if simple)
//   const SvgLoader = () => (
//     <svg
//       className="h-5 w-5 text-neutral-900 animate-spin mr-2" // Adjusted size to h-5 w-5 to better match Pencil
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );

//   // SVG Loader for the loading state in the body
//   const BodySvgLoader = () => ( // Using a different name to avoid confusion if styles differ
//     <svg
//         className="h-6 w-6 animate-spin text-primary" // Kept original styling for body loader
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );

//   return (
//     <AnimatePresence>
//       {isOpen && batchToEdit && (
//         <motion.div
//           className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative"
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="sm:p-6 p-4 border-b">
//               <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                 Edit Broadcast Message
//               </h3>
//               <p className="text-gray dark:text-gray-300 font-medium">
//                 Modify subject and body. This will update messages for all
//                 recipients.
//               </p>
//               <div className="px-4 py-1 bg-primary rounded-3xl w-fit mt-2">
//                 <span className="block text-sm text-neutral-900">
//                   Batch ID: {batchToEdit?.batchId.substring(0, 20)}...
//                 </span>
//               </div>
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                   disabled={isUpdating}
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Body */}
//             {!fullBodyFetched ? (
//               <div className="sm:p-6 p-4 flex items-center justify-center text-gray-600 dark:text-gray-300 min-h-[250px]">
//                 <BodySvgLoader /> {/* Using the SVG loader here too, matching Loader2 style */}
//                 <span className="ml-2">Loading message details...</span>
//               </div>
//             ) : (
//               <div className="sm:p-6 p-4 space-y-4">
//                 <div className="space-y-1.5">
//                   <label
//                     htmlFor="edit-batch-subject"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Subject
//                   </label>
//                   <input
//                     id="edit-batch-subject"
//                     type="text"
//                     value={editSubject}
//                     onChange={(e) => onSubjectChange(e.target.value)}
//                     disabled={isUpdating}
//                     maxLength={200}
//                     className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                   />
//                 </div>
//                 <div className="space-y-1.5">
//                   <label
//                     htmlFor="edit-batch-body"
//                     className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                   >
//                     Body
//                   </label>
//                   <div className="overflow-y-auto rounded-lg">

//                   <textarea
//                     id="edit-batch-body"
//                     value={editBody}
//                     onChange={(e) => onBodyChange(e.target.value)}
//                     className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                     disabled={isUpdating}
//                     placeholder="Enter updated message body..."
//                     rows={6}
//                   />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Footer */}
//             <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isUpdating}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={onUpdate}
//                 disabled={
//                   isUpdating ||
//                   !editSubject.trim() ||
//                   !editBody.trim() ||
//                   !fullBodyFetched
//                 }
//                 className="flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isUpdating && <SvgLoader /> }
//                 {isUpdating ? "Saving..." : "Save Changes"}

//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default EditBroadcastBatchModal;

// // components/admin/broadcast/EditBroadcastBatchModal.tsx (Adjust path as needed)
// "use client";

// import React, { useState, useEffect } from "react";
// import type { BroadcastBatchInfo } from "../../../../services/admin/inbox"; // Adjust path as needed
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// interface EditBroadcastBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batchToEdit: BroadcastBatchInfo | null;
//   editSubject: string;
//   onSubjectChange: (value: string) => void;
//   editBody: string;
//   onBodyChange: (value: string) => void;
//   onUpdate: () => void;
//   isUpdating: boolean;
//   fullBodyFetched: boolean;
// }

// // Define variants outside the component or memoize them if inside
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

// // Custom SVG Loader Component for buttons
// const SvgButtonLoader = () => (
//   <svg
//     className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 18V22"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M4.93 4.93L7.76 7.76"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16.24 16.24L19.07 19.07"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M2 12H6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M18 12H22"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M4.93 19.07L7.76 16.24"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16.24 7.76L19.07 4.93"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// // SVG Loader for the loading state in the body content
// const SvgBodyLoader = () => (
//   <svg
//     className="h-6 w-6 animate-spin text-primary"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 18V22"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M4.93 4.93L7.76 7.76"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16.24 16.24L19.07 19.07"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M2 12H6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M18 12H22"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M4.93 19.07L7.76 16.24"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16.24 7.76L19.07 4.93"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const EditBroadcastBatchModal: React.FC<EditBroadcastBatchModalProps> = ({
//   isOpen,
//   onClose,
//   batchToEdit,
//   editSubject,
//   onSubjectChange,
//   editBody,
//   onBodyChange,
//   onUpdate,
//   isUpdating,
//   fullBodyFetched,
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

//   // Effect to handle body scroll lock
//   useEffect(() => {
//     if (isOpen) {
//       const originalOverflow = window.getComputedStyle(document.body).overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = originalOverflow;
//       };
//     }
//   }, [isOpen]);

//   const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

//   return (
//     <AnimatePresence>
//       {isOpen && batchToEdit && (
//         <motion.div
//           className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close on overlay click
//           aria-labelledby="edit-broadcast-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <motion.div
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-none w-full sm:max-w-lg relative flex flex-col overflow-hidden sm:h-auto h-screen"
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
//               <h2
//                 id="edit-broadcast-modal-title"
//                 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white"
//               >
//                 Edit Broadcast Message
//               </h2>
//               <button
//                 onClick={onClose}
//                 disabled={isUpdating}
//                 aria-label="Close modal"
//                 className="size-12 bg-lightgray cursor-pointer hover:bg-lightborder text-neutral-900 dark:text-primary dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear focus:outline-none"
//               >
//                 <IoClose size={28} />
//               </button>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="flex-grow overflow-y-auto scrollbar-hide">
//               <div className="p-4 sm:p-6 space-y-5">
//                 <p className="text-gray-500 dark:text-gray-300 font-medium">
//                   Modify subject and body. This will update messages for all
//                   recipients in this batch.
//                 </p>
//                 <div className="mt-1 text-sm text-gray-500 dark:text-gray-300 space-y-1.5 border px-4 py-3 h-12.5 rounded-lg">
//                   <div className="flex items-start">
//                     <span className="font-medium text-neutral-900 dark:text-white shrink-0">
//                       Batch ID:
//                     </span>
//                     <span className="ml-1.5 flex-1 break-words text-primary">
//                       {batchToEdit?.batchId}
//                     </span>

//                   </div>
//                 </div>

//                 {!fullBodyFetched ? (
//                   <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 min-h-[250px]">
//                     <SvgBodyLoader />
//                     <span className="ml-2">Loading message details...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-1.5">
//                       <label
//                         htmlFor="edit-batch-subject"
//                         className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                       >
//                         Subject <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         id="edit-batch-subject"
//                         type="text"
//                         value={editSubject}
//                         onChange={(e) => onSubjectChange(e.target.value)}
//                         disabled={isUpdating}
//                         maxLength={200}
//                         className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                         placeholder="Enter subject"
//                       />
//                     </div>
//                     <div className="space-y-1.5">
//                       <label
//                         htmlFor="edit-batch-body"
//                         className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                       >
//                         Body <span className="text-red-600">*</span>
//                       </label>
//                       <textarea
//                         id="edit-batch-body"
//                         value={editBody}
//                         onChange={(e) => onBodyChange(e.target.value)}
//                         className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                         disabled={isUpdating}
//                         placeholder="Enter updated message body..."
//                         rows={6}
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="p-4 sm:p-6 border-t bg-white dark:bg-background flex-shrink-0">
//               <div className="flex sm:flex-row flex-col justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   disabled={isUpdating}
//                   className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onUpdate}
//                   disabled={
//                     isUpdating ||
//                     !editSubject.trim() ||
//                     !editBody.trim() ||
//                     !fullBodyFetched
//                   }
//                   className="inline-flex items-center text-nowrap justify-center cursor-pointer bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isUpdating && <SvgButtonLoader />}
//                   {isUpdating ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default EditBroadcastBatchModal;

// components/admin/broadcast/EditBroadcastBatchModal.tsx (Adjust path as needed)
"use client";

import React, { useState, useEffect } from "react";
import type { BroadcastBatchInfo } from "../../../../services/admin/inbox"; // Adjust path as needed
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface EditBroadcastBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchToEdit: BroadcastBatchInfo | null;
  editSubject: string;
  onSubjectChange: (value: string) => void;
  editBody: string;
  onBodyChange: (value: string) => void;
  onUpdate: () => void;
  isUpdating: boolean;
  fullBodyFetched: boolean;
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

// Custom SVG Loader Component for buttons
const SvgButtonLoader = () => (
  <svg
    className="h-5 w-5 text-neutral-900 animate-spin mr-2"
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

// SVG Loader for the loading state in the body content
const SvgBodyLoader = () => (
  <svg
    className="h-6 w-6 animate-spin text-primary"
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

const EditBroadcastBatchModal: React.FC<EditBroadcastBatchModalProps> = ({
  isOpen,
  onClose,
  batchToEdit,
  editSubject,
  onSubjectChange,
  editBody,
  onBodyChange,
  onUpdate,
  isUpdating,
  fullBodyFetched,
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

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

  return (
    <AnimatePresence>
      {isOpen && batchToEdit && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
          aria-labelledby="edit-broadcast-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-none w-full sm:max-w-lg relative flex flex-col overflow-hidden sm:h-auto h-screen"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2
                id="edit-broadcast-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white"
              >
                Edit Broadcast Message
              </h2>
              
              <button
                onClick={onClose}
                disabled={isUpdating}
                aria-label="Close modal"
                className="size-12 bg-lightgray cursor-pointer hover:bg-lightborder text-neutral-900 dark:text-primary dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear focus:outline-none"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <div className="p-4 sm:p-6 space-y-5">
                <p className="text-gray-500 dark:text-gray-300 font-medium">
                  Modify subject and body. This will update messages for all
                  recipients in this batch.
                </p>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300 border px-4 py-3 h-[50px] rounded-lg flex items-center">
                  <span className="font-medium text-neutral-900 dark:text-white shrink-0">
                    Batch ID:
                  </span>
                  <span className="ml-1.5 flex-1 wrap-break-word text-primary">
                    {/* Truncated version for small screens (visible by default, hidden on sm+) */}
                    <span
                      className="inline sm:hidden"
                      title={batchToEdit?.batchId || ""}
                    >
                      {batchToEdit?.batchId && batchToEdit.batchId.length > 20
                        ? `${batchToEdit.batchId.substring(0, 30)}...`
                        : batchToEdit?.batchId}
                    </span>
                    {/* Full version for sm screens and up (hidden by default, visible on sm+) */}
                    <span className="hidden sm:inline">
                      {batchToEdit?.batchId}
                    </span>
                  </span>
                </div>

                {!fullBodyFetched ? (
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 min-h-[250px]">
                    <SvgBodyLoader />
                    <span className="ml-2">Loading message details...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="edit-batch-subject"
                        className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                      >
                        Subject <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="edit-batch-subject"
                        type="text"
                        value={editSubject}
                        onChange={(e) => onSubjectChange(e.target.value)}
                        disabled={isUpdating}
                        maxLength={200}
                        className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
                        placeholder="Enter subject"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="edit-batch-body"
                        className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
                      >
                        Body <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="edit-batch-body"
                        value={editBody}
                        onChange={(e) => onBodyChange(e.target.value)}
                        className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
                        disabled={isUpdating}
                        placeholder="Enter updated message body..."
                        rows={6}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t bg-white dark:bg-background flex-shrink-0">
              <div className="flex sm:flex-row flex-col justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isUpdating}
                  className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onUpdate}
                  disabled={
                    isUpdating ||
                    !editSubject.trim() ||
                    !editBody.trim() ||
                    !fullBodyFetched
                  }
                  className="inline-flex items-center text-nowrap justify-center cursor-pointer bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating && <SvgButtonLoader />}
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditBroadcastBatchModal;
