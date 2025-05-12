// frontend/src/components/CustomDropdown.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Adjust path if needed

interface CustomDropdownProps {
    trigger: React.ReactNode; // The element that triggers the dropdown (e.g., a button)
    children: React.ReactNode; // The content of the dropdown menu
    contentClassName?: string; // Optional class for styling the dropdown content area
    align?: 'left' | 'right'; // Optional alignment (defaults to right)
    disabled?: boolean; // Disable the trigger
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    trigger,
    children,
    contentClassName,
    align = 'right',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the entire dropdown container

    const toggleDropdown = useCallback(() => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    }, [disabled]);

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup listener on component unmount or when dropdown closes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]); // Re-run effect when isOpen changes

    const handleItemClick = () => {
        // Automatically close the dropdown when an item is clicked
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Trigger Element */}
            <div onClick={toggleDropdown} className={cn(disabled && "cursor-not-allowed opacity-50")}>
                {trigger}
            </div>

            {/* Dropdown Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={cn(
                            'absolute z-50 mt-1 w-48 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:ring-neutral-700',
                            align === 'right' ? 'right-0' : 'left-0',
                            contentClassName
                        )}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button" // Assuming trigger has an id 'menu-button' or similar
                    >
                        <div className="py-1" role="none" onClick={handleItemClick}>
                            {/* Wrap children to attach the close handler */}
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDropdown;