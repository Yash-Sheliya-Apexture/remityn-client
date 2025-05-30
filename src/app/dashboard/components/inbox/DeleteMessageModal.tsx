// frontend/src/components/inbox/DeleteMessageModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface DeleteMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageSubject: string; // To display in the confirmation message
  onConfirmDelete: () => void;
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  isOpen,
  onClose,
  messageSubject,
  onConfirmDelete,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 640); // Define mobile breakpoint (640px)
    };

    if (typeof window !== "undefined") {
      checkMobileScreen();
      window.addEventListener("resize", checkMobileScreen);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobileScreen);
      }
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-white/15 z-80 flex sm:items-center items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close modal on backdrop click
        >
          <motion.div
            className="bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
          >
            <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
              <button
                className="p-3 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-all duration-75 ease-linear cursor-pointer focus:outline-none"
                onClick={onClose}
                aria-label="Close modal"
              >
                <IoClose
                  size={28}
                />
              </button>
            </div>
            <h3 className="sm:text-3xl text-2xl font-semibold text-mainheadingWhite my-6">
              Delete message?
            </h3>
            <p className="text-secondheadingWhite font-medium mb-6">
              Are you sure you want to delete the message:{" "}
              <span className="font-semibold">"{messageSubject}"</span>? This
              action cannot be undone.
            </p>
            <div className="flex flex-col justify-center gap-4 mt-8">
              <button
                className="bg-red-500 text-white hover:bg-red-600 font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
                onClick={() => {
                  onConfirmDelete();
                  onClose(); // Close modal after confirming
                }}
              >
                Delete
              </button>
              <button
                className="text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
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

export default DeleteMessageModal;
