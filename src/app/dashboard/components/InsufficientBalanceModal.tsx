// // frontend/app/dashboard/components/InsufficientBalanceModal.tsx
// "use client";
// import React from "react";
// import Image from "next/image"; // Import Image component
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface InsufficientBalanceModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onAddMoney: () => void; // Action to navigate to add money
//     currencyCode: string; // To display the currency
// }

// const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
//     isOpen,
//     onClose,
//     onAddMoney,
//     currencyCode,
// }) => {
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="fixed inset-0 w-full h-full bg-black/60 z-50 flex items-center justify-center p-4" // Added padding for smaller screens
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={onClose} // Close on overlay click
//                 >
//                     <motion.div
//                         className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md relative text-center" // Adjusted padding and max-width
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }}
//                         exit={{ scale: 0.9, opacity: 0 }}
//                         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//                     >
//                         {/* Close Button */}
//                         <button
//                             className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200 ease-in-out"
//                             onClick={onClose}
//                             aria-label="Close modal"
//                         >
//                             <IoClose size={24} />
//                         </button>

//                         {/* Image (Optional - replace with your actual image path) */}
//                         <div className="flex justify-center mb-5">
//                             {/* Use your actual image path here */}
//                             {/* Example using a placeholder - replace src */}
//                              <Image
//                                  src="/assets/images/exclamation-mark-small.png" // <<<--- Replace with your actual image path!
//                                  alt="Warning"
//                                  width={80} // Adjust size as needed
//                                  height={80} // Adjust size as needed
//                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} // Hide if image fails
//                              />
//                              {/* Fallback Icon if image fails or not provided */}
//                              {/* <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
//                                 </svg>
//                              </div> */}
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
//                             Sorry, you can't send money from this balance
//                         </h3>

//                         {/* Description */}
//                         <p className="text-gray-600 font-normal mb-6 sm:mb-8 text-sm sm:text-base">
//                             If you want to send {currencyCode} from your balance, you'll need to add money first.
//                         </p>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col justify-center gap-3">
//                             <button
//                                 className="bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg px-6 py-3 text-center w-full transition-colors duration-200 ease-in-out"
//                                 onClick={onAddMoney}
//                             >
//                                 Add money
//                             </button>
//                             <button
//                                 className="bg-white text-gray-700 font-medium rounded-lg px-6 py-3 text-center border border-gray-300 hover:bg-gray-50 w-full transition-colors duration-200 ease-in-out"
//                                 onClick={onClose}
//                             >
//                                 Got it
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default InsufficientBalanceModal;.

// "use client";
// import React from "react";
// import Image from "next/image"; // Import Image component
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface InsufficientBalanceModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onAddMoney: () => void; // Action to navigate to add money
//     currencyCode: string; // To display the currency
// }

// const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
//     isOpen,
//     onClose,
//     onAddMoney,
//     currencyCode,
// }) => {
//     return (
//         <AnimatePresence>
//             {isOpen && ( // <<<--- Renders based on isOpen prop
//                 <motion.div
//                     className="fixed inset-0 w-full h-full bg-black/60 z-50 flex items-center justify-center p-4" // Added padding for smaller screens
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={onClose} // Close on overlay click
//                 >
//                     <motion.div
//                         className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md relative text-center shadow-xl" // Added dark mode and shadow
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }}
//                         exit={{ scale: 0.9, opacity: 0 }}
//                         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//                     >
//                         {/* Close Button */}
//                         <button
//                             className="absolute top-3 right-3 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 ease-in-out"
//                             onClick={onClose}
//                             aria-label="Close modal"
//                         >
//                             <IoClose size={24} />
//                         </button>

//                         {/* Image */}
//                         <div className="flex justify-center mb-5">
//                              <Image
//                                  src="/assets/images/exclamation-mark-small.png" // <<<--- Make sure this image path is correct in your public folder
//                                  alt="Warning"
//                                  width={80}
//                                  height={80}
//                                  className="object-contain" // Use contain to prevent distortion
//                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} // Hide if image fails
//                              />
//                              {/* Basic Fallback (Hidden if image loads) */}
//                              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 border-4 border-yellow-200 dark:border-yellow-700/50" style={{ display: 'none' }}> {/* Initially hidden */}
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" />
//                                 </svg>
//                              </div>
//                              {/* Simple script to show fallback if image fails - add this script tag somewhere in your layout or page */}
//                              {/*
//                              <script dangerouslySetInnerHTML={{ __html: `
//                                 const img = document.querySelector('img[alt="Warning"]');
//                                 const fallback = document.querySelector('.w-20.h-20.bg-yellow-100');
//                                 if (img && fallback) {
//                                     img.onerror = () => { img.style.display='none'; fallback.style.display='flex'; };
//                                     // Also check if src is empty or invalid initially
//                                     if (!img.getAttribute('src') || img.naturalWidth === 0) {
//                                          img.style.display='none'; fallback.style.display='flex';
//                                     }
//                                 }
//                              `}} />
//                              */}
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
//                             Insufficient Balance
//                         </h3>

//                         {/* Description */}
//                         <p className="text-gray-600 dark:text-gray-300 font-normal mb-6 sm:mb-8 text-sm sm:text-base">
//                             You don't have enough funds in your {currencyCode} balance to send money. Please add funds first.
//                         </p>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-center gap-3"> {/* Row layout on larger screens */}
//                             <button
//                                 className="bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-lg px-6 py-3 text-center w-full sm:w-auto transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" // Added focus styles
//                                 onClick={onAddMoney}
//                             >
//                                 Add Money
//                             </button>
//                             <button
//                                 className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg px-6 py-3 text-center border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 w-full sm:w-auto transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" // Added dark mode and focus styles
//                                 onClick={onClose}
//                             >
//                                 Got It
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default InsufficientBalanceModal;

// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image"; // Import Image component
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface InsufficientBalanceModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onAddMoney: () => void; // Action to navigate to add money
//     currencyCode: string; // To display the currency
// }

// const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
//     isOpen,
//     onClose,
//     onAddMoney,
//     currencyCode,
// }) => {
//     const mobileVariants = {
//         initial: { y: 50, opacity: 0 },
//         animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//         exit: { y: 50, opacity: 0 },
//     };

//     const desktopVariants = {
//         initial: { y: -30, opacity: 0, scale: 0.95 },
//         animate: {
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             transition: { type: "spring", stiffness: 100, damping: 15 },
//         },
//         exit: { y: -30, opacity: 0, scale: 0.95 },
//     };

//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 640); // Example breakpoint, adjust as needed
//         };

//         handleResize(); // Initial check
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const modalVariants = isMobile ? mobileVariants : desktopVariants;

//     return (
//       <AnimatePresence>
//         {isOpen && ( // <<<--- Renders based on isOpen prop
//           <motion.div
//             className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // Added padding for smaller screens
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose} // Close on overlay click
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center" // Added dark mode and shadow
//               variants={modalVariants} // Apply variants here
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//             >
//               {/* Close Button */}
//               <div className="w-full inline-flex justify-end">
//                 <button
//                   className="p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={onClose}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-white"
//                   />
//                 </button>
//               </div>

//               {/* Image */}
//               <div className="flex justify-center">
//                 <Image
//                   src="/assets/images/exclamation-mark-small.png" // <<<--- Make sure this image path is correct in your public folder
//                   alt="Warning"
//                   width={80}
//                   height={80}
//                   className="object-contain" // Use contain to prevent distortion
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = "none";
//                   }} // Hide if image fails
//                 />
//                 {/* Basic Fallback (Hidden if image loads) */}
//                 <div
//                   className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 border-4 border-yellow-200 dark:border-yellow-700/50"
//                   style={{ display: "none" }}
//                 >
//                   {" "}
//                   {/* Initially hidden */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-10 h-10"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                 Insufficient Balance
//               </h3>

//               {/* Description */}
//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 You don't have enough funds in your {currencyCode} balance to
//                 send money. Please add funds first.
//               </p>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row justify-center gap-3">
//                 {" "}
//                 {/* Row layout on larger screens */}
//                 <button
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear" // Added focus styles
//                   onClick={onAddMoney}
//                 >
//                   Add Money
//                 </button>
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear" // Added dark mode and focus styles
//                   onClick={onClose}
//                 >
//                   Got It
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
// };

// export default InsufficientBalanceModal;

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface InsufficientBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMoney: () => void; // Action to navigate to add money
  currencyCode: string; // To display the currency
}

const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
  isOpen,
  onClose,
  onAddMoney,
  currencyCode,
}) => {
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

  const [isMobile, setIsMobile] = useState(false);

  // --- Body Scroll Lock ---
useEffect(() => {
    if (isOpen) {
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to ensure the class is removed when the component unmounts
    // or if the modal was closed by other means.
    return () => {
        document.body.classList.remove("overflow-hidden");
    };
}, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Example breakpoint, adjust as needed
    };

    // Ensure window is defined (for SSR safety, though less critical with "use client")
    if (typeof window !== "undefined") {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && ( // <<<--- Renders based on isOpen prop
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center" // Added padding for smaller screens
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
          aria-modal="true" // Added for accessibility
          role="dialog"      // Added for accessibility
          aria-labelledby="insufficient-balance-modal-title" // Added for accessibility
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center" // Added dark mode and shadow
            variants={modalVariants} // Apply variants here
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <div className="absolute top-2 right-2">
              <button
                className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none" // Added focus styles
                onClick={onClose}
                aria-label="Close modal"
              >
                <IoClose
                  size={28}
                  className="text-neutral-900 dark:text-primary"
                />
              </button>
            </div>

            {/* Image & Fallback Container */}
            <div className="flex justify-center w-20 h-20 mx-auto mb-4 relative">
              {/* SVG Fallback (Initially hidden by class, shown via onError) */}
              <div
                className="w-full h-full bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 border-4 border-yellow-200 dark:border-yellow-700/50" // Use 'hidden' class
                aria-hidden="true" // Hide from screen readers as it's decorative/redundant with text
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 id="insufficient-balance-modal-title" className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
              Insufficient Balance
            </h3>

            {/* Description */}
            <p className="text-gray dark:text-gray-300 font-medium mb-6">
              {/* Corrected the apostrophe */}
              You don&apos;t have enough funds in your {currencyCode} balance to
              send money. Please add funds first.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {/* Added focus styles */}
              <button
                className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                onClick={onAddMoney}
              >
                Add Money
              </button>
              {/* Added dark mode and focus styles */}
              <button
                className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                onClick={onClose}
              >
                Got It
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsufficientBalanceModal;
