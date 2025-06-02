// frontend/src/components/admin/modals/DeleteCurrencyModal.tsx
"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { CheckCircle } from "lucide-react"; // Changed from Trash2 to CheckCircle as per original code
import { motion, AnimatePresence } from "framer-motion";

interface DeleteCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isSubmitting: boolean;
  isMobile: boolean;
}

const DeleteCurrencyModal: React.FC<DeleteCurrencyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  isMobile,
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

  const modalVariants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white/15 z-80 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close modal when clicking on the backdrop
        >
          <motion.div
            className="bg-background sm:rounded-3xl rounded-t-3xl space-y-3 text-center sm:p-8 p-4 w-full sm:max-w-xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
              <button
                className="p-3 bg-primarybox text-primary hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
                onClick={onClose}
                aria-label="Close modal"
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className="flex justify-center">
              <div className="p-3 bg-red-900/30 rounded-full">
                <CheckCircle className="size-10 text-red-400" />
              </div>
            </div>

            <h3 className="lg:text-3xl text-2xl font-semibold text-mainheadingWhite">
              Delete Currency ?
            </h3>

            <p className="text-subheadingWhite font-medium">
              Confirmation modal to delete a selected currency, warning the
              admin that this action is irreversible.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                type="button"
                className="bg-red-500 text-white gap-2 flex justify-center items-center hover:bg-red-600 font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 text-white animate-spin" // text-white for red bg
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
                  </>
                ) : null}
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
                className="text-primary bg-primarybox hover:bg-secondarybox w-full font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
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

export default DeleteCurrencyModal;
