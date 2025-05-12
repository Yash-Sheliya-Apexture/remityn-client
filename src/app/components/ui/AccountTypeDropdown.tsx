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
        className={`flex items-center justify-between mt-1 px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white focus:border-[#5f5f5f] ${
          error
            ? "border-red-600 border-2 !shadow-none focus:!ring-red-600"
            : ""
        }`}
        
        onClick={toggleOpen}
      >
        <span>{value || <span className="text-neutral-400 dark:text-white/50">Select account type</span>}</span>
        {isOpen ? <IoChevronUp className="text-neutral-600 dark:text-white/80" /> : <IoChevronDown className="text-neutral-600 dark:text-white/80" />}
      </button>
      <AnimatePresence initial={false} > {/* AnimatePresence to handle mount/unmount animations */}
        {isOpen && ( // Conditionally render dropdown only when isOpen is true
          <motion.div
            className="absolute z-0 mt-0.5 w-full rounded-xl shadow-lg bg-white dark:bg-background border"
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
                    value === type ? 'bg-lightgray text-neutral-900 dark:bg-primarybox dark:text-white' : 'hover:bg-lightgray dark:hover:bg-primarybox text-neutral-900 dark:text-white'
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