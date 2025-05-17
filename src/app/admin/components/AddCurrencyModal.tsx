// frontend/src/components/admin/modals/AddCurrencyModal.tsx
"use client";
import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define NewCurrencyData interface, mirroring the one in AdminCurrenciesPage
// Or, this could be imported from a shared types file if you have one
interface NewCurrencyData {
  code: string;
  currencyName: string;
  flagImage: string;
  rateAdjustmentPercentage: string;
}

interface AddCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  newCurrencyData: NewCurrencyData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createFlagImageError: boolean;
  setCreateFlagImageError: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  newCurrencyData,
  onInputChange,
  createFlagImageError,
  setCreateFlagImageError,
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
          className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-80 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close modal when clicking on the backdrop
        >
          <motion.div
            className="bg-white dark:bg-background sm:rounded-3xl rounded-none w-full sm:max-w-xl relative flex flex-col overflow-hidden sm:h-auto h-screen"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b">
              <h2 className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white">
                Add New Currency
              </h2>
              <div
                onClick={onClose}
                className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onClose();
                }}
                aria-label="Close modal"
              >
                <button
                  className="text-neutral-900 dark:text-primary cursor-pointer focus:outline-none"
                  aria-label="Close"
                >
                  <IoClose size={28} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-5">
              <div>
                <label
                  htmlFor="create-code"
                  className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
                >
                  Currency Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="create-code"
                  name="code"
                  value={newCurrencyData.code}
                  onChange={onInputChange}
                  maxLength={3}
                  placeholder="e.g., USD"
                  className="mt-1 block px-4 py-3 bg-white dark:bg-background focus:border-[#5f5f5f] h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
                />
                <p className="mt-2 text-sm text-gray-500 font-medium dark:text-gray-300">
                  3-letter uppercase code.
                </p>
              </div>

              <div>
                <label
                  htmlFor="create-currencyName"
                  className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
                >
                  Currency Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="create-currencyName"
                  name="currencyName"
                  value={newCurrencyData.currencyName}
                  onChange={onInputChange}
                  placeholder="e.g., US Dollar"
                  className="mt-1 block px-4 py-3 bg-white focus:border-[#5f5f5f] font-medium dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
                />
              </div>
              <div>
                <label
                  htmlFor="create-flagImage"
                  className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
                >
                  Flag Image Path <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="create-flagImage"
                    name="flagImage"
                    value={newCurrencyData.flagImage}
                    onChange={onInputChange}
                    placeholder="/assets/icon/flags/usd.png"
                    className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
                  />
                  {newCurrencyData.flagImage && !createFlagImageError && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 size-8 pointer-events-none">
                      <Image
                        src={newCurrencyData.flagImage}
                        alt={`${newCurrencyData.code || "New Currency"} flag`}
                        fill
                        style={{ objectFit: "contain" }}
                        onError={() => setCreateFlagImageError(true)}
                        unoptimized={newCurrencyData.flagImage.startsWith(
                          "http"
                        )}
                      />
                    </div>
                  )}
                  {createFlagImageError && newCurrencyData.flagImage && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-medium text-xs">
                      Load Error
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 font-medium dark:text-gray-300">
                  Relative path (e.g., /assets/icon/flags/eur.png) or full URL.
                  Must be accessible.
                </p>
                {createFlagImageError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    Could not load the flag image. Check the path/URL.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="create-rateAdjustmentPercentage"
                  className="text-gray-500 dark:text-gray-300 capitalize text-sm lg:text-base flex items-center gap-2"
                >
                  Rate Adjustment
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="create-rateAdjustmentPercentage"
                    name="rateAdjustmentPercentage"
                    value={newCurrencyData.rateAdjustmentPercentage}
                    onChange={onInputChange}
                    step="any"
                    placeholder="e.g., 0.5 (for +0.5%) or -0.1 (for -0.1%)"
                    className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 no-spinner"
                  />
                  <div className="absolute top-4 right-4">
                    <Percent
                      size={20}
                      className="dark:text-white text-neutral-900"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 font-medium dark:text-gray-300">
                  Enter percentage adjustment. Default is 0%.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t bg-white dark:bg-background flex-shrink-0">
              <div className="flex sm:flex-row flex-col justify-end gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  disabled={
                    isSubmitting ||
                    !newCurrencyData.code ||
                    !newCurrencyData.currencyName
                  }
                  className="inline-flex justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
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
                    </>
                  ) : null}
                  {isSubmitting ? "Adding..." : "Add Currency"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCurrencyModal;
