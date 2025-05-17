// frontend/src/app/admin/components/users/SendMessageModal.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoClose as X } from "react-icons/io5";
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex justify-center sm:items-center items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-labelledby="send-message-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative" // Adjusted max-width slightly
          >
            {/* Header */}
            <div className="p-4 sm:p-6 flex items-center justify-between flex-shrink-0 border-b font-medium">
              <h2
                id="send-message-modal-title"
                className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white"
              >
                Send Message to User
              </h2>

              <div
                onClick={() => setIsOpen(false)}
                className="size-12 bg-lightgray hover:bg-lightborder cursor-pointer dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear"
                aria-label="Close send message modal"
                role="button"
              >
                <button className="text-neutral-900 dark:text-primary cursor-pointer focus:outline-none">
                  <IoClose
                    size={28}
                    aria-label="Close"
                    className="text-neutral-900 dark:text-primary"
                  />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Compose message for {userName}'s inbox.
              </p>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
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
                  className="mt-1 block px-4 py-3 focus:border-[#5f5f5f] bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="body"
                  className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
                >
                  Body <span className="text-red-600">*</span>
                </label>

                <div className="overflow-y-auto rounded-lg">
                  <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75 min-h-[150px]"
                    maxLength={5000}
                    disabled={isSending}
                    placeholder="Enter message content..."
                  />
                </div>
              </div>

              {/* Error Display Area */}
              {sendError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Error Sending Message</p>
                    <p>{sendError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSending}
                className="inline-flex justify-center cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-60 disabled:cursor-not-allowed" // Dark mode secondary
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || !subject.trim() || !body.trim()}
                className="inline-flex items-center justify-center cursor-pointer bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
              >
                {isSending ? (
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
                      />{" "}
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
                  <>
                    <span className="text-neutral-900">Send Message</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendMessageModal;
