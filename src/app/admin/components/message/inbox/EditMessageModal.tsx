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

// "use client";

// import React, { useState, useEffect } from "react";
// import type { AdminInboxMessage } from "../../../../services/admin/inbox"; // Adjusted path
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// interface EditMessageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message: AdminInboxMessage | null;
//   onSave: (id: string, subject: string, body: string) => Promise<void>;
//   isLoading: boolean;
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

// // Custom SVG Loader Component
// const SvgLoader = () => (
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

// const EditMessageModal: React.FC<EditMessageModalProps> = ({
//   isOpen,
//   onClose,
//   message,
//   onSave,
//   isLoading,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [editSubject, setEditSubject] = useState("");
//   const [editBody, setEditBody] = useState("");

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

//   useEffect(() => {
//     if (message) {
//       setEditSubject(message.subject);
//       setEditBody(message.body || "");
//     } else {
//       // Reset fields if message becomes null (e.g., modal closes and reopens quickly)
//       setEditSubject("");
//       setEditBody("");
//     }
//   }, [message]);

//   const modalVariants = isMobile ? mobileVariantsConfig : desktopVariantsConfig;

//   const handleSave = () => {
//     if (message && editSubject.trim() && editBody.trim()) {
//       onSave(message._id, editSubject.trim(), editBody.trim());
//     }
//   };

//   const recipientName =
//     message?.userId?.fullName || message?.userId?.email || "N/A";

//   return (
//     <AnimatePresence>
//       {isOpen && message && (
//         <motion.div
//           className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close on overlay click
//         >
//           <motion.div
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-xl relative"
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 rounded-t-2xl flex items-center justify-between border-b">
//               {" "}
//               {/* Added dark border */}
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   type="button"
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
//                   onClick={onClose}
//                   aria-label="Close modal"
//                   disabled={isLoading}
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>
//               <div className="flex justify-between items-center">
//                 <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                   Edit Message
//                 </h2>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="sm:p-6 p-4 space-y-5">
//               <p className="text-gray-500 dark:text-gray-300 font-medium">
//                 Modify the subject and body of this message.
//               </p>
//               <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 space-y-1.5 border px-4 py-3 rounded-xl">
//                 <div className="flex items-start">
//                   <span className="font-semibold text-neutral-900 dark:text-white shrink-0">
//                     ID:
//                   </span>
//                   <span className="ml-1.5 flex-1 break-words">
//                     {message?.batchId
//                       ? `Batch ${message.batchId}`
//                       : message?._id}
//                   </span>
//                 </div>
//                 {message?.userId && (
//                   <div className="flex items-start">
//                     <span className="font-semibold text-neutral-900 dark:text-white shrink-0">
//                       To:
//                     </span>
//                     <span className="ml-1.5 truncate" title={recipientName}>
//                       {recipientName.length > 25
//                         ? `${recipientName.substring(0, 25)}...`
//                         : recipientName}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-1.5">
//                 <label
//                   htmlFor="edit-message-subject"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Subject {" "}
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   id="edit-message-subject"
//                   type="text"
//                   value={editSubject}
//                   onChange={(e) => setEditSubject(e.target.value)}
//                   disabled={isLoading}
//                   maxLength={200}
//                   className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                   placeholder="Enter subject"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label
//                   htmlFor="edit-message-body"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Body {" "}
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <textarea
//                   id="edit-message-body"
//                   value={editBody}
//                   onChange={(e) => setEditBody(e.target.value)}
//                   className="resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75 min-h-[150px]"
//                   disabled={isLoading}
//                   placeholder="Enter updated message body..."
//                   rows={6}
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex flex-row items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isLoading}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary w-full dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={isLoading || !editSubject.trim() || !editBody.trim()}
//                 className="flex items-center text-nowrap justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading && <SvgLoader />}
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default EditMessageModal;

// "use client";
// import React, { useState, useEffect } from "react";
// import type { AdminInboxMessage } from "../../../../services/admin/inbox"; // Adjusted path
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";

// interface EditMessageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message: AdminInboxMessage | null;
//   onSave: (id: string, subject: string, body: string) => Promise<void>;
//   isLoading: boolean;
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

// // Custom SVG Loader Component
// const SvgLoader = () => (
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

// const EditMessageModal: React.FC<EditMessageModalProps> = ({
//   isOpen,
//   onClose,
//   message,
//   onSave,
//   isLoading,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [editSubject, setEditSubject] = useState("");
//   const [editBody, setEditBody] = useState("");

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

//   useEffect(() => {
//     if (message) {
//       setEditSubject(message.subject);
//       setEditBody(message.body || "");
//     } else {
//       // Reset fields if message becomes null (e.g., modal closes and reopens quickly)
//       setEditSubject("");
//       setEditBody("");
//     }
//   }, [message]);

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

//   const handleSave = () => {
//     if (message && editSubject.trim() && editBody.trim()) {
//       onSave(message._id, editSubject.trim(), editBody.trim());
//     }
//   };

//   const recipientName =
//     message?.userId?.fullName || message?.userId?.email || "N/A";

//   return (
//     <AnimatePresence>
//       {isOpen && message && (
//         <motion.div
//           className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose} // Close on overlay click
//         >
//           <motion.div
//             className="bg-white dark:bg-background sm:rounded-3xl rounded-none w-full sm:max-w-xl relative flex flex-col overflow-hidden sm:h-auto h-screen"
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
//           >

//             {/* header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
//               <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
//                 Edit Message
//               </h2>

//               <button
//                 onClick={onClose}
//                 className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
//                 role="button"
//                 disabled={isLoading}
//                 aria-label="Close modal"
//               >
//                 <button
//                   className="text-neutral-900 dark:text-primary cursor-pointer focus:outline-none"
//                   aria-label="Close"
//                 >
//                   <IoClose size={28} />
//                 </button>
//               </button>
//             </div>

//           {/* Scrollable Content Area */}
//             <div className="sm:p-6 p-4 space-y-5">
//               <p className="text-gray-500 dark:text-gray-300 font-medium">
//                 Modify the subject and body of this message.
//               </p>
//               <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 space-y-1.5 border px-4 py-3 rounded-xl">
//                 <div className="flex items-start">
//                   <span className="font-semibold text-neutral-900 dark:text-white shrink-0">
//                     ID:
//                   </span>
//                   <span className="ml-1.5 flex-1 break-words">
//                     {message?.batchId
//                       ? `Batch ${message.batchId}`
//                       : message?._id}
//                   </span>
//                 </div>
//                 {message?.userId && (
//                   <div className="flex items-start">
//                     <span className="font-semibold text-neutral-900 dark:text-white shrink-0">
//                       To:
//                     </span>
//                     <span className="ml-1.5 truncate" title={recipientName}>
//                       {recipientName.length > 25
//                         ? `${recipientName.substring(0, 25)}...`
//                         : recipientName}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-1.5">
//                 <label
//                   htmlFor="edit-message-subject"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Subject <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   id="edit-message-subject"
//                   type="text"
//                   value={editSubject}
//                   onChange={(e) => setEditSubject(e.target.value)}
//                   disabled={isLoading}
//                   maxLength={200}
//                   className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                   placeholder="Enter subject"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label
//                   htmlFor="edit-message-body"
//                   className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//                 >
//                   Body <span className="text-red-600">*</span>
//                 </label>

//                 <textarea
//                   id="edit-message-body"
//                   value={editBody}
//                   onChange={(e) => setEditBody(e.target.value)}
//                   className="resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75 min-h-[150px]"
//                   disabled={isLoading}
//                   placeholder="Enter updated message body..."
//                   rows={6}
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex flex-row items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isLoading}
//                 className="bg-neutral-900 hover:bg-neutral-700 text-primary w-full dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center cursor-pointer transition-all duration-75 ease-linear"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={isLoading || !editSubject.trim() || !editBody.trim()}
//                 className="flex items-center text-nowrap justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-[48px] leading-5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading && <SvgLoader />}
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default EditMessageModal;

// components/admin/messages/EditMessageModal.tsx (Adjust path as needed)
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

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  isOpen,
  onClose,
  message,
  onSave,
  isLoading,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");

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
      setEditBody(message.body || "");
    } else {
      // Reset fields if message becomes null (e.g., modal closes and reopens quickly)
      setEditSubject("");
      setEditBody("");
    }
  }, [message]);

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

  const handleSave = () => {
    if (message && editSubject.trim() && editBody.trim()) {
      onSave(message._id, editSubject.trim(), editBody.trim());
    }
  };

  const recipientName =
    message?.userId?.fullName || message?.userId?.email || "N/A";

  return (
    <AnimatePresence>
      {isOpen && message && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-white/15 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
          aria-labelledby="edit-message-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-background sm:rounded-3xl rounded-none w-full sm:max-w-xl relative flex flex-col overflow-hidden sm:h-auto h-screen"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2
                id="edit-message-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
              >
                Edit Message
                
              </h2>
              <button
                onClick={onClose}
                disabled={isLoading}
                aria-label="Close modal"
                className="p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <div className="p-4 sm:p-6 space-y-5">
                <p className="text-subheadingWhite font-medium">
                  Modify the subject and body of this message.
                </p>
                <div className="mt-4 text-sm text-subheadingWhite space-y-1.5 border px-4 py-3 rounded-xl">
                  <div className="flex items-start">
                    <span className="font-semibold text-mainheadingWhite shrink-0">
                      ID:
                    </span>
                    <span className="ml-1.5 flex-1 break-words">
                      {message?.batchId
                        ? `Batch ${message.batchId}`
                        : message?._id}
                    </span>
                  </div>
                  {message?.userId && (
                    <div className="flex items-start">
                      <span className="font-semibold text-mainheadingWhite shrink-0">
                        To:
                      </span>
                      <span className="ml-1.5 truncate" title={recipientName}>
                        {recipientName.length > 25
                          ? `${recipientName.substring(0, 25)}...`
                          : recipientName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="edit-message-subject"
                    className="text-subheadingWhite block capitalize text-sm lg:text-base"
                  >
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="edit-message-subject"
                    type="text"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    disabled={isLoading}
                    maxLength={200}
                    className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="edit-message-body"
                    className="text-subheadingWhite block capitalize text-sm lg:text-base"
                  >
                    Body <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="edit-message-body"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full  sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white h-14 w-full transition-all border rounded-lg focus:outline-none ease-linear duration-75"
                    disabled={isLoading}
                    placeholder="Enter updated message body..."
                    rows={6}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t flex-shrink-0">
              <div className="flex sm:flex-row flex-col justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={
                    isLoading || !editSubject.trim() || !editBody.trim()
                  }
                  className="inline-flex items-center text-nowrap justify-center cursor-pointer bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && <SvgLoader />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="inline-flex justify-center cursor-pointer text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-6 py-3 h-[48px] text-center w-full transition-all duration-75 ease-linear"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditMessageModal;
