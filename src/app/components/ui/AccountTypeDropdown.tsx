// components/ui/AccountTypeDropdown.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence from framer-motion

interface AccountTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const dropdownVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
      display: "block",
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: "linear",
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

const AccountTypeDropdown: React.FC<AccountTypeDropdownProps> = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accountTypes = ['Savings', 'Current'];

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleAccountTypeSelect = (type: string) => {
    onChange(type);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between mt-1 px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 placeholder:text-gray-400 border-gray-600 hover:border-gray-500 text-white focus:outline-0 cursor-pointer ${
          error
            ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
            : "focus:border-gray-500"
        }`}
        
        onClick={toggleOpen}
      >
        <span>{value || <span className="text-gray-400">Select account type</span>}</span>
        {isOpen ? <IoChevronUp className="text-gray-400" /> : <IoChevronDown className="text-gray-400" />}
      </button>
      <AnimatePresence initial={false} > {/* AnimatePresence to handle mount/unmount animations */}
        {isOpen && ( // Conditionally render dropdown only when isOpen is true
          <motion.div
            className="absolute z-20 mt-2 w-full rounded-xl shadow-sm bg-background border overflow-hidden p-2 space-y-2"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="p-2 space-y-2" role="listbox">
              {accountTypes.map((type) => (
                <li
                  key={type}
                  className={`block px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out ${
                    value === type ? 'hover:bg-primarybox text-subheadingWhite' : 'bg-primary text-mainheading'
                  }`}
                  onClick={() => handleAccountTypeSelect(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="flex text-red-500 text-sm items-center mt-0.5">
          <span className="mr-1">
            <IoMdCloseCircle className="size-4" />
          </span>
          {error}
        </p>
      )}
    </div>
  );
};

export default AccountTypeDropdown;