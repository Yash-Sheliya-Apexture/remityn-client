// frontend/src/app/dashboard/components/KycRequiredModal.tsx
"use client"; // Add this directive

import React, { useState, useEffect } from "react"; // Import useState, useEffect
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { IoClose } from "react-icons/io5"; // Import close icon
import { AlertTriangle } from "lucide-react"; // Keep AlertTriangle for the specific icon

interface KycRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVerification: () => void; // Callback for the "Start Verification" button
}

const KycRequiredModal: React.FC<KycRequiredModalProps> = ({
  isOpen,
  onClose,
  onStartVerification,
}) => {
  // --- Copied from InsufficientBalanceModal ---
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

    if (typeof window !== "undefined") {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const modalVariants = isMobile ? mobileVariants : desktopVariants;
  // --- End Copied Section ---

  return (
    <AnimatePresence>
      {isOpen && ( // Render based on isOpen prop
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center" // Overlay styles
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
          aria-modal="true" // Added for accessibility
          role="dialog"      // Added for accessibility
          aria-labelledby="kyc-required-modal-title" // Added for accessibility
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center" // Modal container styles
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
              <button
                className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                onClick={onClose}
                aria-label="Close modal"
              >
                <IoClose
                  size={28}
                  className="text-neutral-900 dark:text-primary"
                />
              </button>
            </div>

            {/* Icon Container */}
            <div className="flex justify-center w-20 h-20 mx-auto mb-4 relative">
              {/* Styled container for the icon */}
              <div
                className="w-full h-full bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 border-4 border-yellow-200 dark:border-yellow-700/50"
                aria-hidden="true"
              >
                {/* Use AlertTriangle icon */}
                <AlertTriangle className="w-10 h-10" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h3 id="kyc-required-modal-title" className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6">
              KYC Verification Required
            </h3>

            {/* Description */}
            <p className="text-gray dark:text-gray-300 font-medium mb-6">
              Please complete your KYC verification first. This helps us keep
              your account secure.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {/* Start Verification Button (Primary Style) */}
              <button
                className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                onClick={onStartVerification}
              >
                Start Verification
              </button>
              {/* Cancel Button (Secondary Style) */}
              <button
                className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                onClick={onClose}
              >
                Cancel {/* Changed from "Got It" to "Cancel" for clarity */}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KycRequiredModal;
