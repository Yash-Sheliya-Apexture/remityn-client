// // frontend/src/app/dashboard/components/DeleteRecipientModal.tsx
// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface DeleteRecipientModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     recipientName: string;
//     onConfirmDelete: () => void;
// }

// const DeleteRecipientModal: React.FC<DeleteRecipientModalProps> = ({
//     isOpen,
//     onClose,
//     recipientName,
//     onConfirmDelete,
// }) => {
//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl p-10 w-full max-w-lg relative"
//                         initial={{ y: -50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
//                         exit={{ y: -50, opacity: 0 }}
//                     >
//                         <button
//                             className="absolute top-4 right-4 p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-300 ease-in-out cursor-pointer"
//                             onClick={onClose}
//                         >
//                             <IoClose size={28} className="text-neutral-900 dark:text-white" />
//                         </button>
//                         <h3 className="text-3xl font-semibold text-mainheading dark:text-white my-6">Delete recipient ?</h3>
//                         <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                             You'll have to add {recipientName} again as a recipient to send money to them.
//                         </p>
//                         <div className="flex flex-col justify-center gap-4 mt-8">
//                             <button
//                                 className="bg-primary text-neutral-900 hover:bg-primary/50 font-medium rounded-full px-6 py-3 text-center w-full cursor-pointer transition-colors duration-500 ease-in-out"
//                                 onClick={onConfirmDelete}
//                             >
//                                 Delete
//                             </button>
//                             <button
//                                 className="bg-white text-neutral-900 hover:bg-lightgray font-medium rounded-full px-6 py-3 text-center border border-gray w-full cursor-pointer transition-colors duration-500 ease-in-out"
//                                 onClick={onClose}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default DeleteRecipientModal;




// // frontend/src/app/dashboard/components/DeleteRecipientModal.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface DeleteRecipientModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     recipientName: string;
//     onConfirmDelete: () => void;
// }

// const DeleteRecipientModal: React.FC<DeleteRecipientModalProps> = ({
//     isOpen,
//     onClose,
//     recipientName,
//     onConfirmDelete,
// }) => {
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkMobileScreen = () => {
//             setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
//         };

//         checkMobileScreen(); // Initial check on mount

//         window.addEventListener('resize', checkMobileScreen); // Add listener for resize

//         return () => {
//             window.removeEventListener('resize', checkMobileScreen); // Cleanup listener on unmount
//         };
//     }, []);

//     const mobileVariants = {
//         initial: { y: 50, opacity: 0 },
//         animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//         exit: { y: 50, opacity: 0 },
//     };

//     const desktopVariants = {
//       initial: { y: -30, opacity: 0, scale: 0.95 },
//       animate: {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         transition: { type: "spring", stiffness: 100, damping: 15 },
//       },
//       exit: { y: -30, opacity: 0, scale: 0.95 },
//     };

//     const modalVariants = isMobile ? mobileVariants : desktopVariants;

//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-2xl rounded-t-2xl sm:p-8 p-4 w-full sm:max-w-lg relative"
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//             >
//               <div className="w-full inline-flex justify-end">
//                 <button
//                   className="p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={onClose}
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-white"
//                   />
//                 </button>
//               </div>
//               <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
//                 Delete recipient ?
//               </h3>
//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 You'll have to add {recipientName} again as a recipient to send
//                 money to them.
//               </p>
//               <div className="flex flex-col justify-center gap-4 mt-8">
//                 <button
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onConfirmDelete}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
// };

// export default DeleteRecipientModal;



// frontend/src/app/dashboard/components/DeleteRecipientModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface DeleteRecipientModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: string;
    onConfirmDelete: () => void;
}

const DeleteRecipientModal: React.FC<DeleteRecipientModalProps> = ({
    isOpen,
    onClose,
    recipientName,
    onConfirmDelete,
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobileScreen = () => {
            setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (640px)
        };

        // Check on mount and add listener
        if (typeof window !== 'undefined') {
            checkMobileScreen();
            window.addEventListener('resize', checkMobileScreen);
        }

        // Cleanup listener on unmount
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkMobileScreen);
            }
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount


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
            className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close modal on backdrop click
          >
            <motion.div
              className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative"
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
            >
              <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
                <button
                  className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                  onClick={onClose}
                  aria-label="Close modal" // Added aria-label for accessibility
                >
                  <IoClose
                    size={28}
                    className="text-neutral-900 dark:text-primary"
                  />
                </button>
              </div>
              <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
                Delete recipient ?
              </h3>
              <p className="text-gray dark:text-gray-300 font-medium mb-6">
                {/* Escaped the apostrophe in "You'll" */}
                You&apos;ll have to add {recipientName} again as a recipient to send
                money to them.
              </p>
              <div className="flex flex-col justify-center gap-4 mt-8">
                <button
                  className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                  onClick={onConfirmDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                  onClick={onClose}
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

export default DeleteRecipientModal;