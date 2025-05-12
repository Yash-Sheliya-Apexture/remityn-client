"use client";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root") || createModalRoot();

  function createModalRoot() {
    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("id", "modal-root");
    document.body.appendChild(rootDiv);
    return rootDiv;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, when modal is open */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* This element is to trick the browser into centering the modal content. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          ​
        </span>

        {/* Modal panel */}
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="document"
        >
          <div className="bg-white p-6">
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export { Modal };
