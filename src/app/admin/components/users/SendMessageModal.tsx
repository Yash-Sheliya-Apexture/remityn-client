// // frontend/src/app/admin/components/users/SendMessageModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose, IoClose as X } from "react-icons/io5";
// import { AlertCircle } from "lucide-react";

// interface SendMessageModalProps {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   userName: string; // For display purposes
//   subject: string;
//   setSubject: React.Dispatch<React.SetStateAction<string>>;
//   body: string;
//   setBody: React.Dispatch<React.SetStateAction<string>>;
//   isSending: boolean;
//   handleSend: () => Promise<void>; // The function to call on send
//   sendError: string | null;
//   clearSendError: () => void; // Function to clear the error message
// }

// const SendMessageModal: React.FC<SendMessageModalProps> = ({
//   isOpen,
//   setIsOpen,
//   userName,
//   subject,
//   setSubject,
//   body,
//   setBody,
//   isSending,
//   handleSend,
//   sendError,
//   clearSendError,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Reset error when opening
//   useEffect(() => {
//     if (isOpen) {
//       clearSendError();
//     }
//   }, [isOpen, clearSendError]);

//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };
//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, setIsOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-white/15 z-50 flex justify-center sm:items-center items-end"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           aria-labelledby="send-message-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <motion.div
//             ref={modalRef}
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative" // Adjusted max-width slightly
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b font-medium">
//               <h2
//                 id="send-message-modal-title"
//                 className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
//               >
//                 Send Message to User
//               </h2>

//               <div
//                 onClick={() => setIsOpen(false)}
//                 className="size-12 cursor-pointer bg-primarybox text-primary hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
//                 aria-label="Close send message modal"
//                 role="button"
//               >
//                 <button className="cursor-pointer focus:outline-none">
//                   <IoClose size={28} aria-label="Close" />
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 sm:p-6 space-y-4">
//               <p className="text-sm text-subheadingWhite">
//                 Compose message for {userName}'s inbox.
//               </p>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="subject"
//                   className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
//                 >
//                   Subject <span className="text-red-600">*</span>
//                 </label>

//                 <input
//                   id="subject"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                   maxLength={200}
//                   disabled={isSending}
//                   placeholder="Enter message subject"
//                   className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="body"
//                   className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
//                 >
//                   Body <span className="text-red-600">*</span>
//                 </label>

//                 <div className="overflow-y-auto rounded-lg">
//                   <textarea
//                     id="body"
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     className="sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-background h-14 w-full transition-all border text-white resize-none border-gray-600 hover:border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none ease-linear duration-75 min-h-[150px]"
//                     maxLength={5000}
//                     disabled={isSending}
//                     placeholder="Enter message content..."
//                   />
//                 </div>
//               </div>

//               {/* Error Display Area */}
//               {sendError && (
//                 <div
//                   className="w-full flex relative items-center  bg-red-900/25 border sm:order-1 order-2 border-red-500 px-5 py-4 rounded-xl"
//                   role="alert"
//                 >
//                   <div className="flex items-center gap-3 text-center">
//                     <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
//                       <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                     </div>

//                     <div className="flex-1">
//                       <h4 className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
//                         Error Sending Message
//                       </h4>

//                       <p className="text-sm mt-2 text-red-300/90">
//                         {sendError}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 onClick={handleSend}
//                 disabled={isSending || !subject.trim() || !body.trim()}
//                 className="inline-flex items-center gap-2 justify-center cursor-pointer bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
//               >
//                 {isSending ? (
//                   <>
//                     <svg
//                       className="h-5 w-5 text-mainheading animate-spin"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />{" "}
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Sending...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-mainheading">Send Message</span>
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() => setIsOpen(false)}
//                 disabled={isSending}
//                 className="inline-flex justify-center cursor-pointer bg-primarybox hover:bg-secondarybox text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed" // Dark mode secondary
//               >
//                 Cancel
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SendMessageModal;

// // frontend/src/app/admin/components/users/SendMessageModal.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose, IoClose as X } from "react-icons/io5"; // Note: `IoClose as X` is redundant, IoClose can be used directly.
// import { AlertCircle } from "lucide-react";

// interface SendMessageModalProps {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   userName: string; // For display purposes
//   subject: string;
//   setSubject: React.Dispatch<React.SetStateAction<string>>;
//   body: string;
//   setBody: React.Dispatch<React.SetStateAction<string>>;
//   isSending: boolean;
//   handleSend: () => Promise<void>; // The function to call on send
//   sendError: string | null;
//   clearSendError: () => void; // Function to clear the error message
// }

// const SendMessageModal: React.FC<SendMessageModalProps> = ({
//   isOpen,
//   setIsOpen,
//   userName,
//   subject,
//   setSubject,
//   body,
//   setBody,
//   isSending,
//   handleSend,
//   sendError,
//   clearSendError,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Reset error when opening
//   useEffect(() => {
//     if (isOpen) {
//       clearSendError();
//     }
//   }, [isOpen, clearSendError]);

//   // Check for mobile screen size
//   useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => {
//       window.removeEventListener("resize", checkMobileScreen);
//     };
//   }, []);

//   // Handle click outside to close modal
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         isOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, setIsOpen]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     // Cleanup function to ensure scroll is restored if component unmounts while modal is open
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };
//   const modalVariants = isMobile ? mobileVariants : desktopVariants;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-white/15 z-50 flex justify-center sm:items-center items-end"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           aria-labelledby="send-message-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <motion.div
//             ref={modalRef}
//             variants={modalVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative" // Adjusted max-width slightly
//           >
//             {/* Header */}
//             <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b font-medium">
//               <h2
//                 id="send-message-modal-title"
//                 className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
//               >
//                 Send Message to User
//               </h2>

//               <div
//                 onClick={() => setIsOpen(false)}
//                 className="size-12 cursor-pointer bg-primarybox text-primary hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
//                 aria-label="Close send message modal"
//                 role="button"
//                 tabIndex={0} // Make it focusable
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") setIsOpen(false);
//                 }} // Keyboard accessibility
//               >
//                 {/* Removed redundant button, div itself is clickable */}
//                 <IoClose size={28} aria-hidden="true" />{" "}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 sm:p-6 space-y-4">
//               <p className="text-sm text-subheadingWhite">
//                 Compose message for {userName}'s inbox.
//               </p>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="subject"
//                   className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
//                 >
//                   Subject <span className="text-red-600">*</span>
//                 </label>

//                 <input
//                   id="subject"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                   maxLength={200}
//                   disabled={isSending}
//                   placeholder="Enter message subject"
//                   className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="body"
//                   className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
//                 >
//                   Body <span className="text-red-600">*</span>
//                 </label>

//                 <div className="overflow-y-auto rounded-lg">
//                   <textarea
//                     id="body"
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     className="sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-background h-14 w-full transition-all border text-white resize-none border-gray-600 hover:border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none ease-linear duration-75 min-h-[150px]"
//                     maxLength={5000}
//                     disabled={isSending}
//                     placeholder="Enter message content..."
//                   />
//                 </div>
//               </div>

//               {/* Error Display Area */}
//               {sendError && (
//                 <div
//                   className="w-full flex relative items-center  bg-red-900/25 border sm:order-1 order-2 border-red-500 px-5 py-4 rounded-xl"
//                   role="alert"
//                 >
//                   <div className="flex items-center gap-3 text-center">
//                     <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
//                       <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                     </div>

//                     <div className="flex-1">
//                       <h4 className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
//                         Error Sending Message
//                       </h4>

//                       <p className="text-sm text-red-300/90 text-left">
//                       sdfvgsdfvgsdf  sderfgasdfgad asdfas
//                         {sendError}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
//               <button
//                 onClick={handleSend}
//                 disabled={isSending || !subject.trim() || !body.trim()}
//                 className="inline-flex items-center gap-2 justify-center cursor-pointer bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
//               >
//                 {isSending ? (
//                   <>
//                     <svg
//                       className="h-5 w-5 text-mainheading animate-spin"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />{" "}
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Sending...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-mainheading">Send Message</span>
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() => setIsOpen(false)}
//                 disabled={isSending}
//                 className="inline-flex justify-center cursor-pointer bg-primarybox hover:bg-secondarybox text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed" // Dark mode secondary
//               >
//                 Cancel
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SendMessageModal;

// frontend/src/app/admin/components/users/SendMessageModal.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AlertCircle } from "lucide-react";

interface SendMessageModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string; // For display purposes
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  isSending: boolean;
  handleSend: () => Promise<void>; // The function to call on send
  sendError: string | null;
  clearSendError: () => void; // Function to clear the error message
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  setIsOpen,
  userName,
  subject,
  setSubject,
  body,
  setBody,
  isSending,
  handleSend,
  sendError,
  clearSendError,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Reset error when opening
  useEffect(() => {
    if (isOpen) {
      clearSendError();
    }
  }, [isOpen, clearSendError]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => {
      window.removeEventListener("resize", checkMobileScreen);
    };
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mobileVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
    exit: { y: 50, opacity: 0 },
  };

  const desktopVariants = {
    initial: { y: -30, opacity: 0, scale: 0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: -30, opacity: 0, scale: 0.95 },
  };
  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white/15 z-50 flex justify-center sm:items-center items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-labelledby="send-message-modal-title"
          role="dialog"
          aria-modal="true"
          // onClick={() => setIsOpen(false)} // Alternative: close on backdrop click
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop if using onClick on parent
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b font-medium">
              <h2
                id="send-message-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
              >
                Send Message to User
              </h2>
              <div
                onClick={() => setIsOpen(false)}
                className="size-12 cursor-pointer bg-primarybox text-primary hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
                aria-label="Close send message modal"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsOpen(false);
                }}
              >
                <IoClose size={28} aria-hidden="true" />
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-4">
              <p className="text-sm text-subheadingWhite">
                Compose message for {userName}'s inbox.
              </p>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
                >
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={200}
                  disabled={isSending}
                  placeholder="Enter message subject"
                  className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="body"
                  className="text-mainheadingWhite inline-block capitalize text-sm lg:text-base"
                >
                  Body <span className="text-red-600">*</span>
                </label>
                {/* Textarea container - keeping its specific scrollbar styling if needed for textarea itself */}
                <div className="overflow-y-auto rounded-lg">
                  <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-background h-auto w-full transition-all border text-white resize-none border-gray-600 hover:border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none ease-linear duration-75 min-h-[150px]"
                    maxLength={5000}
                    disabled={isSending}
                    placeholder="Enter message content..."
                    rows={6} // Suggest rows for initial height, min-h also works
                  />
                </div>
              </div>

              {/* Error Display Area */}
              {sendError && (
                <div
                  className="w-full flex relative items-center bg-red-900/25 border border-red-500 px-5 py-4 rounded-xl"
                  role="alert"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    {/* Removed text-center to allow items to align left */}
                    <div className="size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
                      <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
                    </div>
                    <div className="flex-1 text-left">
                      {" "}
                      {/* Ensured text is left aligned */}
                      <h4 className="font-medium sm:text-xl text-lg text-red-600 capitalize">
                        {" "}
                        {/* Adjusted text size */}
                        Error Sending Message
                      </h4>
                      <p className="text-sm text-red-300/90">{sendError}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t bg-background flex-shrink-0">
              <button
                onClick={handleSend}
                disabled={isSending || !subject.trim() || !body.trim()}
                className="inline-flex items-center gap-2 justify-center cursor-pointer bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <svg
                      className="h-5 w-5 text-mainheading animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <span className="text-mainheading">Send Message</span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                disabled={isSending}
                className="inline-flex justify-center cursor-pointer bg-primarybox hover:bg-secondarybox text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendMessageModal;
