// frontend/src/app/admin/kyc-management/[userId]/KycApproveModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Modal Animation Variants ---
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

interface KycApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  isProcessing: boolean;
  processingError: string | null;
  isMobileView?: boolean;
}

const KycApproveModal: React.FC<KycApproveModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isProcessing,
  processingError,
  isMobileView = false,
}) => {
  const modalSpecificVariants = isMobileView ? mobileVariants : desktopVariants;

  const handleSubmit = async () => {
    await onSubmit();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isProcessing) onClose();
          }}
          aria-labelledby="approval-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center"
            variants={modalSpecificVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
              <button
                className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
                onClick={onClose}
                disabled={isProcessing}
                aria-label="Close modal"
              >
                <IoClose
                  size={28}
                  className="text-neutral-900 dark:text-primary"
                />
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <h3
              id="approval-modal-title"
              className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-center mb-3"
            >
              Approve KYC Application
            </h3>

            <p className="text-gray dark:text-gray-300 font-medium mb-6 text-center">
              Are you sure you want to mark this KYC application as verified?
            </p>

            {processingError && (
              <div className="mb-4 px-4 sm:px-0">
                <p
                  id="approval-error-message-modal"
                  className="text-sm text-destructive font-medium flex items-center justify-center gap-1.5 pt-1 px-0.5"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" /> {processingError}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing && (
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
                )}
                {isProcessing ? "Confirming..." : "Confirm Approval"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KycApproveModal;
