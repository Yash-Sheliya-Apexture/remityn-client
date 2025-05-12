// // components/NicknamePopup.tsx
// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// interface NicknamePopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   description?: string;
//   children: React.ReactNode;
// }

// const NicknamePopup: React.FC<NicknamePopupProps> = ({
//   isOpen,
//   onClose,
//   title,
//   description,
//   children,
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white dark:bg-background rounded-2xl p-10 w-full max-w-xl relative"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
//             exit={{ y: -50, opacity: 0 }}
//           >
//             <button
//               className="absolute top-4 right-4 p-3 hover:bg-lightborder dark:hover:bg-secondarybox rounded-full transition-colors duration-300 ease-in-out cursor-pointer"
//               onClick={onClose}
//             >
//               <IoClose size={28} className="text-neutral-900 dark:text-white"/>
//             </button>
//             <h3 className="text-3xl font-semibold text-mainheading dark:text-white my-6">{title}</h3>
//             {description && (
//               <p className="text-gray dark:text-gray-300 font-medium mb-6">
//                 {description}
//               </p>
//             )}
//             {children}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default NicknamePopup;


// components/NicknamePopup.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface NicknamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const NicknamePopup: React.FC<NicknamePopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (768px as an example)
    };

    checkMobileScreen(); // Initial check on mount

    window.addEventListener('resize', checkMobileScreen); // Add listener for resize

    return () => {
      window.removeEventListener('resize', checkMobileScreen); // Cleanup listener on unmount
    };
  }, []);

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
    /* Delete recipient Model */
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
              <button
                className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                onClick={onClose}
              >
                <IoClose
                  size={28}
                  className="text-neutral-900 dark:text-primary"
                />
              </button>
            </div>
            <h3 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
              {title}
            </h3>
            {description && (
              <p className="text-gray-500 dark:text-gray-300 font-medium mb-6">
                {description}
              </p>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NicknamePopup;