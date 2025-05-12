// src/components/CurrencyDropdown_NoHeadless.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
// Import icons from react-icons (using Ionicons 5 here)
import { IoChevronDown, IoCheckmark } from 'react-icons/io5';

// --- Interfaces ---
interface Currency {
    _id: string;
    code: string;
    currencyName: string;
    flagImage?: string | null; // Allow null or undefined explicitly
}

interface CurrencyDropdownProps {
    currencies: Currency[];
    selectedCurrency: Currency | null;
    onCurrencyChange: (currency: Currency | null) => void;
    placeholder?: string;
    triggerClassName?: string; // Custom classes for the trigger button
    contentClassName?: string; // Custom classes for the dropdown content area
    disabled?: boolean;        // To disable the dropdown
    ariaLabel?: string;        // Accessibility label
}

// --- Component ---
const CurrencyDropdownNoHeadless: React.FC<CurrencyDropdownProps> = ({
    currencies,
    selectedCurrency,
    onCurrencyChange,
    placeholder = "Select Currency",
    triggerClassName,
    contentClassName,
    disabled = false,
    ariaLabel = "Currency selector"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the main container

    // --- Toggle Dropdown ---
    const toggleDropdown = useCallback(() => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    }, [disabled]);

    // --- Handle Option Click ---
    const handleOptionClick = (currency: Currency) => {
        onCurrencyChange(currency);
        setIsOpen(false); // Close dropdown after selection
    };

    // --- Handle Click Outside ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close if clicked outside the dropdown's ref and dropdown is open
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add listener if dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove listener if dropdown is closed
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup listener on component unmount or when isOpen changes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]); // Re-run effect when isOpen changes

    // --- Helper to get Image Path (with trimming) ---
    const getImagePath = (currency: Currency | null): string => {
        const defaultIconPath = '/assets/icon/default.svg'; // Define default path

        if (!currency) return defaultIconPath; // Return default if no currency

        // Check if flagImage exists and is a non-empty string
        const flagImageExists = typeof currency.flagImage === 'string' && currency.flagImage.length > 0;

        // Trim the flagImage path if it exists, otherwise construct the fallback path
        const path = flagImageExists
            ? currency.flagImage!.trim() // Use non-null assertion as we checked existence
            : `/assets/icon/${currency.code.toLowerCase()}.svg`;

        // Ensure the path (after potential trimming) isn't empty, fallback if it is
        return path || defaultIconPath;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button" // Important for forms
                onClick={toggleDropdown}
                disabled={disabled}
                aria-haspopup="listbox" // Accessibility
                aria-expanded={isOpen}  // Accessibility
                aria-label={ariaLabel}
                className={clsx(
                    "relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm", // Standard focus styling
                    "border-gray-300",
                    disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "hover:bg-gray-50",
                    triggerClassName // Allow custom classes
                )}
            >
                {/* Display selected currency or placeholder */}
                {selectedCurrency ? (
                    <span className="flex items-center truncate">
                        <Image
                            // Use the helper function to get the potentially trimmed path
                            src={getImagePath(selectedCurrency)}
                            alt={`${selectedCurrency.code} flag`}
                            width={20}
                            height={20}
                            className="mr-2 h-5 w-5 flex-shrink-0 rounded-full object-cover"
                            // Fallback in case image fails to load (onError)
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }}
                        />
                        <span className="font-medium">{selectedCurrency.code}</span>
                    </span>
                ) : (
                    <span className="block truncate text-gray-500">{placeholder}</span>
                )}
                {/* Dropdown Icon */}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <IoChevronDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </button>

            {/* Dropdown Options Panel (Conditional Rendering) */}
            {isOpen && (
                <ul
                    role="listbox" // Accessibility
                    aria-label={`${ariaLabel} options`}
                    className={clsx(
                        "absolute z-10 mt-1 max-h-60 w-auto min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
                        "list-none p-0 m-0", // Reset list styles
                        contentClassName // Allow custom classes
                    )}
                >
                    {/* Render each currency as an option */}
                    {currencies.map((currency) => {
                        const isSelected = selectedCurrency?._id === currency._id;
                        return (
                            <li
                                key={currency._id}
                                onClick={() => handleOptionClick(currency)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOptionClick(currency); }} // Basic keyboard support
                                tabIndex={0} // Make it focusable
                                role="option" // Accessibility
                                aria-selected={isSelected} // Accessibility
                                className={clsx(
                                    'relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-primary/10 hover:text-primary', // Use your primary color
                                    'focus:bg-primary/10 focus:text-primary focus:outline-none' // Consistent focus state
                                )}
                            >
                                {/* Currency display within the option */}
                                <span className={clsx(
                                    'flex items-center truncate',
                                    isSelected ? 'font-semibold' : 'font-normal'
                                )}>
                                    <Image
                                        // Use the helper function again for list items
                                        src={getImagePath(currency)}
                                        alt={`${currency.code} flag`}
                                        width={20}
                                        height={20}
                                        className="mr-2 h-5 w-5 flex-shrink-0 rounded-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/icon/default.svg'; }}
                                    />
                                    {currency.code}
                                    <span className={clsx("ml-2 truncate text-gray-500 hover:text-primary/80")}>
                                        ({currency.currencyName})
                                    </span>
                                </span>

                                {/* Checkmark for selected item */}
                                {isSelected ? (
                                    <span className={clsx(
                                        "absolute inset-y-0 left-0 flex items-center pl-3 text-primary" // Use your primary color
                                    )}>
                                        <IoCheckmark className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null}
                            </li>
                        );
                    })}
                    {/* Show message if no currencies */}
                    {currencies.length === 0 && (
                        <li className="relative cursor-default select-none py-2 px-4 text-gray-500">
                            No currencies available.
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

// Export the component and the Currency type for use elsewhere
export default CurrencyDropdownNoHeadless;
export type { Currency };