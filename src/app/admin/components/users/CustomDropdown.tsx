// // components/admin/payments/CustomDropdown.tsx
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// interface CustomDropdownProps {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     options: string[];
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div>
//             <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             <div className="relative">
//                 {/* Button for open dropdown */}
//                 <button
//                     type="button"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             ref={dropdownRef}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute z-0 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background dark:border dark:border-white overflow-hidden p-2"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default CustomDropdown;









// // components/admin/payments/CustomDropdown.tsx
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// interface CustomDropdownProps {
//     label: string;
//     value: string | null;
//     onChange: (value: string) => void;
//     options: string[];
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the outer div

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div ref={dropdownRef}> {/* Attach ref to the outer div */}
//             <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             <div className="relative">
//                 {/* Button for open dropdown */}
//                 <button
//                     type="button"
//                     onClick={toggleDropdown} // Use the toggleDropdown function
//                     className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                     <span>{value || `All ${label}s`}</span>
//                     <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute z-0 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
//                                 >
//                                     {option === 'all' ? `All ${label}s` : option}
//                                     {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default CustomDropdown;







// // frontend/src/app/admin/components/add-money/CustomDropdown.tsx
// // OR wherever your CustomDropdown component is located
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi";

// interface CustomDropdownProps {
//     label: React.ReactNode;
//     value: string | null;
//     onChange: (value: string | null) => void; // Allow onChange to receive null
//     options: string[];
//     displayAllOption?: string; // Optional prop for custom "All" option text
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options, displayAllOption }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the outer div
//     const allOptionText = displayAllOption || `All ${label}s`; // Default "All" option text

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div ref={dropdownRef}> {/* Attach ref to the outer div */}
//             <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             <div className="relative">
//                 {/* Button for open dropdown */}
//                 <button
//                     type="button"
//                     onClick={toggleDropdown} // Use the toggleDropdown function
//                     className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                     <span>{value || allOptionText}</span>
//                     <ChevronDown className="size-6 text-neutral-600 dark:text-white/80" />
//                 </button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.ul
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             className="absolute z-20 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2"
//                         >
//                             {options.map((option) => (
//                                 <motion.li
//                                     key={option}
//                                     onClick={() => { onChange(option); setIsOpen(false); }}
//                                     className="px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center hover:bg-lightgray dark:hover:bg-primarybox text-gray-500 dark:text-gray-300"
//                                 >
//                                     {option === 'all' ? allOptionText : option}
//                                     {value === option && <GiCheckMark className="text-gray-500 dark:text-gray-300" size={20} />}
//                                 </motion.li>
//                             ))}
//                         </motion.ul>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default CustomDropdown;


// // frontend/src/app/admin/components/add-money/CustomDropdown.tsx
// // OR wherever your CustomDropdown component is located
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { GiCheckMark } from "react-icons/gi"; // Assuming this icon is available

// interface CustomDropdownProps {
//     label: React.ReactNode;
//     value: string | null; // The current value ('all', 'USD', 'pending', etc., or null initially)
//     onChange: (value: string | null) => void; // Pass the selected value ('all', 'USD', etc.)
//     options: string[]; // The list of possible values, including 'all'
//     displayAllOption?: string; // The text to display for the 'all' value (e.g., "All Currencies")
// }

// // Custom Dropdown Component
// const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, onChange, options, displayAllOption }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the outer div

//     // Determine the text to display for the 'all' option. Use the prop or a simple default.
//     // Avoid using `label` directly as it might not be a string.
//     const allOptionText = displayAllOption || "All";

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             // Close if click is outside the dropdownRef element
//             if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]); // Only depends on isOpen

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleSelect = (optionValue: string) => {
//         onChange(optionValue); // Pass the actual selected value ('all', 'USD', etc.)
//         setIsOpen(false);
//     };

//     // Determine the text to display in the trigger button
//     const displayValue = value === 'all' ? allOptionText : value; // Use dynamic text if value is 'all'

//     return (
//         // Attach ref to the container for outside click detection
//         <div ref={dropdownRef} className="relative">
//             {/* Label remains unchanged */}
//             {typeof label === 'string' ? (
//                  <label className="block font-medium text-neutral-900 dark:text-white mb-1">{label}</label>
//             ) : (
//                 label // Render label as ReactNode if it's not a simple string
//             )}

//             {/* Button for opening dropdown */}
//             <button
//                 type="button"
//                 onClick={toggleDropdown}
//                 aria-haspopup="listbox"
//                 aria-expanded={isOpen}
//                 className="flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//             >
//                 {/* --- Updated Display Logic --- */}
//                 {/* Show the dynamic text if value is 'all' or if value is null/empty, otherwise show the value */}
//                 <span>{ (value === 'all' || !value) ? allOptionText : value }</span>

//                 <ChevronDown className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown List */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -5 }} // Slightly adjusted animation
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -5 }}
//                         transition={{ duration: 0.15 }}
//                         role="listbox"
//                         className="absolute z-20 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2 space-y-2" // Added padding and spacing
//                     >
//                         {options.map((option) => (
//                             <motion.li
//                                 key={option}
//                                 onClick={() => handleSelect(option)}
//                                 role="option"
//                                 aria-selected={value === option}
//                                 className={`px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center  ${
//                                     value === option
//                                         ? 'bg-primary text-neutral-900' // Selected style
//                                         : 'hover:bg-lightgray dark:hover:bg-secondarybox text-gray-500 dark:text-gray-300' // Default/hover style
//                                 }`}
                                
//                             >
//                                 {/* --- Use dynamic text for the 'all' option in the list --- */}
//                                 <span>{option === 'all' ? allOptionText : option}</span>

//                                 {value === option && <GiCheckMark className="text-neutral-900" size={16} />}
//                             </motion.li>
//                         ))}
//                     </motion.ul>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default CustomDropdown;

// frontend/src/app/admin/components/add-money/CustomDropdown.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";

interface CustomDropdownProps {
    label: React.ReactNode;
    value: string | null;
    onChange: (value: string | null) => void;
    options: string[];
    displayAllOption?: string;
    disabled?: boolean; // <-- Add the optional disabled prop
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    value,
    onChange,
    options,
    displayAllOption,
    disabled = false // <-- Default disabled to false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const allOptionText = displayAllOption || "All";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!disabled) { // <-- Only toggle if not disabled
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const displayValue = value === 'all' ? allOptionText : value;

    // --- Base classes for the button ---
    const baseButtonClasses = "flex items-center justify-between cursor-pointer autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-all ease-in-out duration-300 placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white";

    // --- Conditional classes based on disabled state ---
    const disabledClasses = disabled
        ? "bg-gray-100 dark:bg-gray-700 opacity-70 cursor-not-allowed shadow-none" // Disabled styles
        : "hover:shadow-darkcolor dark:hover:shadow-whitecolor focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor"; // Enabled styles (hover/focus)

    return (
        <div ref={dropdownRef} className="relative">
            {typeof label === 'string' ? (
                 <label className={`block font-medium text-neutral-900 dark:text-white mb-1 ${disabled ? 'opacity-70' : ''}`}>{label}</label> // Slightly fade label when disabled
            ) : (
                label
            )}

            <button
                type="button"
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                // Combine base and conditional classes
                className={`${baseButtonClasses} ${disabledClasses}`}
                disabled={disabled} // <-- Add the disabled attribute
            >
                <span>{ (value === 'all' || !value) ? allOptionText : value }</span>
                <ChevronDown className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-gray-500 dark:text-gray-300' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && !disabled && ( // <-- Also check disabled here for safety
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        role="listbox"
                        className="absolute z-20 mt-2 w-full rounded-xl shadow-lg bg-white dark:bg-background border overflow-hidden p-2 space-y-2"
                    >
                        {options.map((option) => (
                            <motion.li
                                key={option}
                                onClick={() => handleSelect(option)}
                                role="option"
                                aria-selected={value === option}
                                className={`px-4 py-2 cursor-pointer rounded-full transition-colors font-medium duration-300 ease-in-out flex justify-between items-center ${
                                    value === option
                                        ? 'bg-primary text-neutral-900'
                                        : 'hover:bg-lightgray dark:hover:bg-secondarybox text-gray-500 dark:text-gray-300'
                                }`}
                            >
                                <span>{option === 'all' ? allOptionText : option}</span>
                                {value === option && <GiCheckMark className="text-neutral-900" size={16} />}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDropdown;