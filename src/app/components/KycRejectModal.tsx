// frontend/src/app/admin/kyc-management/[userId]/KycRejectModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

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

interface KycRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
  isProcessing: boolean;
  processingError: string | null;
  initialReason?: string;
  isMobileView?: boolean;
}

const KycRejectModal: React.FC<KycRejectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isProcessing,
  processingError,
  initialReason = "",
  isMobileView = false,
}) => {
  const [rejectionReason, setRejectionReason] = useState(initialReason);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRejectionReason(initialReason); // Reset reason when modal opens
      setLocalError(null); // Clear local errors
    }
  }, [isOpen, initialReason]);

  const handleSubmit = async () => {
    if (!rejectionReason.trim()) {
      setLocalError("Rejection reason cannot be empty.");
      return;
    }
    setLocalError(null);
    await onSubmit(rejectionReason.trim());
    // If there's no processingError after submission, it implies success, so the parent will close.
    // If there is a processingError, it will be displayed.
  };

  const modalSpecificVariants = isMobileView ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-white/15 z-50 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isProcessing) onClose();
          }}
          aria-labelledby="rejection-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative"
            variants={modalSpecificVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2
                id="edit-message-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheadingWhite"
              >
                Reject KYC Application 
              </h2>
              <button
                onClick={onClose}
                disabled={isProcessing}
                aria-label="Close modal"
                className="p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
              >
                <IoClose size={28} />
              </button>
            </div>


            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-sm text-subheadingWhite">
                Provide a clear reason for rejection. This will be visible to
                the user.
              </p>
              <Label
                htmlFor="rejectionReasonInputModal"
                className="text-white/90 inline-block capitalize text-sm lg:text-base mb-1"
              >
                Reason <span className="text-red-600">*</span>
              </Label>
              <div className="overflow-y-auto rounded-lg">
                <textarea
                  id="rejectionReasonInputModal"
                  rows={4}
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    if (localError && e.target.value.trim())
                      setLocalError(null);
                  }}
                  placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
                  className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full  sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white h-14 w-full transition-all border rounded-lg focus:outline-none ease-linear duration-75"
                  aria-describedby="rejection-error-message-modal"
                  disabled={isProcessing}
                />
              </div>
              {(localError || processingError) && (
                <p
                  id="rejection-error-message-modal"
                  className="text-sm text-destructive font-medium flex items-center gap-1.5 pt-1 px-0.5"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" />{" "}
                  {localError || processingError}
                </p>
              )}
            </div>

            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
              <button
                className="text-primary bg-primarybox hover:bg-secondarybox font-medium  rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={isProcessing || !rejectionReason.trim()}
              >
                {isProcessing && (
                  <svg
                    className="h-5 w-5 text-white animate-spin mr-2" // Ensure spinner color contrasts
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
                {isProcessing ? "Confirming..." : "Confirm Rejection"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KycRejectModal;
