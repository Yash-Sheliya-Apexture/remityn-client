// // app/(main)/your-account/language-and-appearance/appearance-settings/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { GoChevronLeft } from 'react-icons/go';
// import Link from 'next/link';

// // Define the possible theme preferences
// type ThemePreference = 'light' | 'dark' | 'system';

// // --- Reusable Theme Option Component ---
// interface ThemeOptionProps {
//   label: string;
//   value: ThemePreference;
//   currentSelection: ThemePreference;
//   onSelect: (theme: ThemePreference) => void;
// }

// const ThemeOption: React.FC<ThemeOptionProps> = ({ label, value, currentSelection, onSelect }) => {
//   const isSelected = currentSelection === value;

//   // Add description for System option
//   const description = value === 'system' ? 'Automatically switch between light and dark themes' : undefined;

//   return (
//     <button
//       onClick={() => onSelect(value)}
//       className="flex items-center justify-between w-full p-4 hover:bg-neutral-100 dark:hover:bg-primarybox rounded-lg cursor-pointer focus:outline-none transition-colors text-left"
//       aria-pressed={isSelected}
//       role="radio"
//       aria-checked={isSelected}
//     >
//       {/* Label and Optional Description */}
//       <div>
//           <span className="text-base font-medium text-neutral-800 dark:text-neutral-100">{label}</span>
//           {description && <p className="text-sm text-neutral-500 dark:text-neutral-200 mt-1">{description}</p>}
//       </div>

//       {/* Custom Radio Button */}
//       <div className={`ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
//           isSelected
//             ? 'border-primary dark:border-primary bg-primary dark:bg-primary'
//             : 'border-neutral-400 dark:border-neutral-400 bg-transparent'
//         }`}
//       >
//         {/* Optional inner dot styling - adjust if needed */}
//         {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
//       </div>
//     </button>
//   );
// };

// // --- Main Appearance Settings Page Component ---
// const AppearanceSettingsPage: React.FC = () => {
//   // State holds the user's *preference* ('light', 'dark', or 'system')
//   const [selectedPreference, setSelectedPreference] = useState<ThemePreference>('system'); // Default state before hydration

//   // Apply theme based on preference, resolving 'system'
//   const applyTheme = useCallback((preference: ThemePreference) => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark'); // Clean slate

//     let themeToApply: 'light' | 'dark';

//     if (preference === 'system') {
//       themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//       console.log(`Applying theme based on system: ${themeToApply}`);
//     } else {
//       themeToApply = preference;
//        console.log(`Applying theme directly: ${themeToApply}`);
//     }
//      root.classList.add(themeToApply);
//   }, []);

//   // Effect to load preference and set up listener
//   useEffect(() => {
//     // Load saved preference, default to 'system'
//     const storedPreference = (localStorage.getItem('theme') as ThemePreference) || 'system';
//     console.log(`Loaded preference from localStorage: ${storedPreference}`);
//     setSelectedPreference(storedPreference);
//     applyTheme(storedPreference); // Apply theme based on loaded preference

//     // Listener for system changes
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemChange = (e: MediaQueryListEvent) => {
//       // Only re-apply if the *currently selected preference* is 'system'
//       if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
//           console.log(`System theme changed (${e.matches ? 'dark' : 'light'}), applying...`);
//           applyTheme('system');
//       } else {
//           console.log("System theme changed, but user preference is not 'system'. No change applied.");
//       }
//     };

//     mediaQuery.addEventListener('change', handleSystemChange);
//     // Initial check in case the preference is already system
//     // applyTheme(storedPreference);

//     // Cleanup listener on unmount
//     return () => mediaQuery.removeEventListener('change', handleSystemChange);
//   }, [applyTheme]); // applyTheme is stable due to useCallback

//   // Handler for selecting a theme option
//   const handleThemeSelect = (preference: ThemePreference) => {
//     console.log(`User selected preference: ${preference}`);
//     setSelectedPreference(preference); // Update radio button state
//     localStorage.setItem('theme', preference); // Save the selected preference
//     applyTheme(preference); // Apply the theme based on the new preference
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-screen transition-colors duration-300">
//       {/* Back Button and Title */}
//       <div className="flex items-center mb-6 relative">
//         <Link
//           href="your-account/language-and-appearance"
//           className="absolute left-0 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-primarybox transition-colors"
//           aria-label="Back to Language and Appearance"
//         >
//           <GoChevronLeft className="size-6 text-neutral-600 dark:text-neutral-300" />
//         </Link>
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 text-center flex-grow">
//           Appearance
//         </h1>
//         <div className="w-8 h-8"></div> {/* Placeholder for alignment */}
//       </div>

//       {/* Theme Selection Options */}
//       <div className="space-y-2">
//         <ThemeOption
//           label="Light"
//           value="light"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//         <ThemeOption
//           label="Dark"
//           value="dark"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//          <ThemeOption
//           label="System"
//           value="system"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettingsPage;




// // app/(main)/your-account/language-and-appearance/appearance-settings/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";

// type ThemePreference = "light" | "dark" | "system";

// // --- ThemeOption Component (Keep as is) ---
// interface ThemeOptionProps {
//   label: string;
//   value: ThemePreference;
//   currentSelection: ThemePreference;
//   onSelect: (theme: ThemePreference) => void;
// }

// const ThemeOption: React.FC<ThemeOptionProps> = ({
//   label,
//   value,
//   currentSelection,
//   onSelect,
// }) => {
//   const isSelected = currentSelection === value;
//   const description =
//     value === "system"
//       ? "Automatically switch between light and dark themes"
//       : undefined;

//   return (
//     <button
//       onClick={() => onSelect(value)}
//       className="flex items-center justify-between w-full text-left hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer"
//       aria-pressed={isSelected}
//       role="radio"
//       aria-checked={isSelected}
//     >
//       <div>
//         <span className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
//           {label}
//         </span>
//         {description && (
//           <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//             {description}
//           </p>
//         )}
//       </div>
//       <div
//         className={`ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
//           isSelected
//             ? "border-primary dark:border-primary bg-primary dark:bg-primary"
//             : "border-neutral-400 dark:border-neutral-500 bg-transparent" // Adjusted dark border
//         }`}
//       >
//         {isSelected && (
//           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//         )}
//       </div>
//     </button>
//   );
// };

// // --- Main Appearance Settings Page Component (Refined) ---
// const AppearanceSettingsPage: React.FC = () => {
//   // State holds the user's *preference* ('light', 'dark', or 'system')
//   // Initialize state by reading directly from localStorage if available on client
//   const [selectedPreference, setSelectedPreference] = useState<ThemePreference>(
//     () => {
//       if (typeof window !== "undefined") {
//         return (localStorage.getItem("theme") as ThemePreference) || "system";
//       }
//       return "system"; // Default for SSR or before hydration
//     }
//   );

//   // Function to apply the theme based on preference (handles 'system')
//   const applyTheme = useCallback((preference: ThemePreference) => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark"); // Clean slate

//     let themeToApply: "light" | "dark";

//     if (preference === "system") {
//       themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
//       console.log(`Applying theme based on system: ${themeToApply}`);
//     } else {
//       themeToApply = preference;
//       console.log(`Applying theme directly: ${themeToApply}`);
//     }
//     root.classList.add(themeToApply);
//   }, []);

//   // Effect to sync state with localStorage on mount and listen for system changes
//   useEffect(() => {
//     // Ensure state reflects localStorage after hydration
//     const storedPreference =
//       (localStorage.getItem("theme") as ThemePreference) || "system";
//     if (selectedPreference !== storedPreference) {
//       setSelectedPreference(storedPreference);
//     }

//     // Apply theme on initial load (although the layout script handles the *very* first paint)
//     // This ensures consistency if the component mounts later or state was initialized differently server-side
//     // applyTheme(storedPreference); // You could potentially remove this line if the layout script is reliable

//     // Listener for system changes
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleSystemChange = (e: MediaQueryListEvent) => {
//       // Only re-apply if the *currently selected preference* is 'system'
//       // Read directly from localStorage for the most up-to-date preference
//       const currentPref = localStorage.getItem("theme") || "system";
//       if (currentPref === "system") {
//         console.log(
//           `System theme changed (${
//             e.matches ? "dark" : "light"
//           }), re-applying 'system' logic...`
//         );
//         applyTheme("system");
//       } else {
//         console.log(
//           "System theme changed, but user preference is not 'system'. No change applied."
//         );
//       }
//     };

//     mediaQuery.addEventListener("change", handleSystemChange);

//     // Cleanup listener on unmount
//     return () => mediaQuery.removeEventListener("change", handleSystemChange);
//   }, [applyTheme, selectedPreference]); // Add selectedPreference dependency if applyTheme call on mount is kept

//   // Handler for selecting a theme option
//   const handleThemeSelect = (preference: ThemePreference) => {
//     console.log(`User selected preference: ${preference}`);
//     setSelectedPreference(preference); // Update radio button state
//     localStorage.setItem("theme", preference); // Save the selected preference
//     applyTheme(preference); // Apply the theme based on the new preference
//   };

//   return (
//     <div>
//       <div className="py-4 mb-6 ">
//         <h1 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white">
//           Appearance
//         </h1>
//       </div>

//       {/* Theme Selection Options */}
//       <div className="space-y-2">
//         <ThemeOption
//           label="Light"
//           value="light"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//         <ThemeOption
//           label="Dark"
//           value="dark"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//         <ThemeOption
//           label="System"
//           value="system"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettingsPage;


// // app/(main)/your-account/language-and-appearance/appearance-settings/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { GoChevronLeft } from 'react-icons/go';
// import Link from 'next/link';

// // Define the possible theme preferences
// type ThemePreference = 'light' | 'dark' | 'system';

// // --- Reusable Theme Option Component ---
// interface ThemeOptionProps {
//   label: string;
//   value: ThemePreference;
//   currentSelection: ThemePreference;
//   onSelect: (theme: ThemePreference) => void;
// }

// const ThemeOption: React.FC<ThemeOptionProps> = ({ label, value, currentSelection, onSelect }) => {
//   const isSelected = currentSelection === value;

//   // Add description for System option
//   const description = value === 'system' ? 'Automatically switch between light and dark themes' : undefined;

//   return (
//     <button
//       onClick={() => onSelect(value)}
//       className="flex items-center justify-between w-full text-left hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       aria-pressed={isSelected}
//       role="radio"
//       aria-checked={isSelected}
//     >
//       {/* Label and Optional Description */}
//       <div>
//           <span className="text-base font-medium text-neutral-900 dark:text-white">{label}</span>
//           {description && <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{description}</p>}
//       </div>

//       {/* Custom Radio Button */}
//       <div className={`ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
//           isSelected
//             ? 'border-primary dark:border-primary bg-primary dark:bg-primary'
//             : 'border-neutral-400 dark:border-neutral-500 bg-transparent'
//         }`}
//       >
//         {/* Optional inner dot styling - adjust if needed */}
//         {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
//       </div>
//     </button>
//   );
// };

// // --- Main Appearance Settings Page Component ---
// const AppearanceSettingsPage: React.FC = () => {
//   // State holds the user's *preference* ('light', 'dark', or 'system')
//   const [selectedPreference, setSelectedPreference] = useState<ThemePreference>('system'); // Default state before hydration

//   // Apply theme based on preference, resolving 'system'
//   const applyTheme = useCallback((preference: ThemePreference) => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark'); // Clean slate

//     let themeToApply: 'light' | 'dark';

//     if (preference === 'system') {
//       themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//       console.log(`Applying theme based on system: ${themeToApply}`);
//     } else {
//       themeToApply = preference;
//        console.log(`Applying theme directly: ${themeToApply}`);
//     }
//      root.classList.add(themeToApply);
//   }, []);

//   // Effect to load preference and set up listener
//   useEffect(() => {
//     // Load saved preference, default to 'system'
//     const storedPreference = (localStorage.getItem('theme') as ThemePreference) || 'system';
//     console.log(`Loaded preference from localStorage: ${storedPreference}`);
//     setSelectedPreference(storedPreference);
//     applyTheme(storedPreference); // Apply theme based on loaded preference

//     // Listener for system changes
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemChange = (e: MediaQueryListEvent) => {
//       // Only re-apply if the *currently selected preference* is 'system'
//       if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
//           console.log(`System theme changed (${e.matches ? 'dark' : 'light'}), applying...`);
//           applyTheme('system');
//       } else {
//           console.log("System theme changed, but user preference is not 'system'. No change applied.");
//       }
//     };

//     mediaQuery.addEventListener('change', handleSystemChange);


//     // Cleanup listener on unmount
//     return () => mediaQuery.removeEventListener('change', handleSystemChange);
//   }, [applyTheme]); // applyTheme is stable due to useCallback

//   // Handler for selecting a theme option
//   const handleThemeSelect = (preference: ThemePreference) => {
//     console.log(`User selected preference: ${preference}`);
//     setSelectedPreference(preference); // Update radio button state
//     localStorage.setItem('theme', preference); // Save the selected preference
//     applyTheme(preference); // Apply the theme based on the new preference
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-screen transition-colors duration-300">
//       {/* Back Button and Title */}
//       <div className="flex items-center mb-6 relative">
//         <Link
//           href="your-account/language-and-appearance"
//           className="absolute left-0 p-2 rounded-full hover:bg-lightgray dark:hover:bg-primarybox transition-colors"
//           aria-label="Back to Language and Appearance"
//         >
//           <GoChevronLeft className="size-6 text-neutral-600 dark:text-neutral-300" />
//         </Link>
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 text-center flex-grow">
//           Appearance
//         </h1>
//         <div className="w-8 h-8"></div> {/* Placeholder for alignment */}
//       </div>

//       {/* Theme Selection Options */}
//       <div className="space-y-2">
//         <ThemeOption
//           label="Light"
//           value="light"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//         <ThemeOption
//           label="Dark"
//           value="dark"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//          <ThemeOption
//           label="System"
//           value="system"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettingsPage;


// // app/(main)/your-account/language-and-appearance/appearance-settings/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// // Define the possible theme preferences
// type ThemePreference = 'light' | 'dark' | 'system';

// // --- Reusable Theme Option Component ---
// interface ThemeOptionProps {
//   label: string;
//   value: ThemePreference;
//   currentSelection: ThemePreference;
//   onSelect: (theme: ThemePreference) => void;
// }

// const ThemeOption: React.FC<ThemeOptionProps> = ({ label, value, currentSelection, onSelect }) => {
//   const isSelected = currentSelection === value;

//   // Add description for System option
//   const description = value === 'system' ? 'Automatically switch between light and dark themes' : undefined;

//   return (
//     <button
//       onClick={() => onSelect(value)}
//       className="flex items-center justify-between w-full text-left hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
//       // Removed aria-pressed as it's not valid for role="radio"
//       role="radio"
//       aria-checked={isSelected} // Correct attribute for role="radio"
//       // Consider wrapping options in a div with role="radiogroup" for better semantics
//     >
//       {/* Label and Optional Description */}
//       <div>
//           <span className="text-base font-medium text-neutral-900 dark:text-white">{label}</span>
//           {description && <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{description}</p>}
//       </div>

//       {/* Custom Radio Button Visual Indicator */}
//       <div className={`ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
//           isSelected
//             ? 'border-primary dark:border-primary bg-primary dark:bg-primary'
//             : 'border-neutral-400 dark:border-neutral-500 bg-transparent'
//         }`}
//         aria-hidden="true" // Hide visual element from screen readers, state is conveyed by aria-checked
//       >
//         {/* Optional inner dot styling - adjust if needed */}
//         {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
//       </div>
//     </button>
//   );
// };

// // --- Main Appearance Settings Page Component ---
// const AppearanceSettingsPage: React.FC = () => {
//   // State holds the user's *preference* ('light', 'dark', or 'system')
//   const [selectedPreference, setSelectedPreference] = useState<ThemePreference>('system'); // Default state before hydration

//   // Apply theme based on preference, resolving 'system'
//   const applyTheme = useCallback((preference: ThemePreference) => {
//     if (typeof window === 'undefined') return; // Guard against server-side execution

//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark'); // Clean slate

//     let themeToApply: 'light' | 'dark';

//     if (preference === 'system') {
//       themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//       // console.log(`Applying theme based on system: ${themeToApply}`);
//     } else {
//       themeToApply = preference;
//       //  console.log(`Applying theme directly: ${themeToApply}`);
//     }
//      root.classList.add(themeToApply);
//   }, []);

//   // Effect to load preference and set up listener
//   useEffect(() => {
//     // Load saved preference, default to 'system'
//     const storedPreference = (localStorage.getItem('theme') as ThemePreference) || 'system';
//     // console.log(`Loaded preference from localStorage: ${storedPreference}`);
//     setSelectedPreference(storedPreference);
//     applyTheme(storedPreference); // Apply theme based on loaded preference

//     // Listener for system changes
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemChange = (e: MediaQueryListEvent) => {
//       // Use the current state value to check if system is selected
//       // because localStorage might not be updated instantly if the change
//       // happens *while* the user is on this page but hasn't interacted yet.
//       // Alternatively, read localStorage again, but state is more direct here.
//       if (selectedPreference === 'system') {
//           // console.log(`System theme changed (${e.matches ? 'dark' : 'light'}), applying...`);
//           applyTheme('system');
//       } else {
//           // console.log("System theme changed, but user preference is not 'system'. No change applied.");
//       }
//     };

//     // Add listener - using addEventListener is preferred over deprecated addListener
//     mediaQuery.addEventListener('change', handleSystemChange);


//     // Cleanup listener on unmount
//     return () => mediaQuery.removeEventListener('change', handleSystemChange);
//   // Only re-run if applyTheme changes (which it won't due to useCallback)
//   // or if selectedPreference changes, ensuring the listener logic uses the latest state.
//   }, [applyTheme, selectedPreference]);

//   // Handler for selecting a theme option
//   const handleThemeSelect = (preference: ThemePreference) => {
//     // console.log(`User selected preference: ${preference}`);
//     setSelectedPreference(preference); // Update radio button state
//     localStorage.setItem('theme', preference); // Save the selected preference
//     applyTheme(preference); // Apply the theme based on the new preference
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-6 transition-colors duration-300">
//       {/* Back Button and Title */}
//       <div className="flex items-center mb-6 relative">
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 flex-grow">
//         Theme Settings
//         </h1>
//       </div>

//       {/* Theme Selection Options - Grouped for accessibility */}
//       <div role="radiogroup" aria-labelledby="appearance-heading" className="space-y-2">
//         <ThemeOption
//           label="Light"
//           value="light"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//         <ThemeOption
//           label="Dark"
//           value="dark"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//          <ThemeOption
//           label="System"
//           value="system"
//           currentSelection={selectedPreference}
//           onSelect={handleThemeSelect}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppearanceSettingsPage;




// app/(main)/your-account/language-and-appearance/appearance-settings/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
// Define the possible theme preferences
type ThemePreference = 'light' | 'dark' | 'system';

// --- Reusable Theme Option Component ---
interface ThemeOptionProps {
  label: string;
  value: ThemePreference;
  currentSelection: ThemePreference;
  onSelect: (theme: ThemePreference) => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ label, value, currentSelection, onSelect }) => {
  const isSelected = currentSelection === value;

  // Add description for System option
  const description = value === 'system' ? 'Automatically switch between light and dark themes' : undefined;

  return (
    <button
      onClick={() => onSelect(value)}
      className="flex items-center justify-between gap-3 w-full text-left hover:bg-lightgray dark:hover:bg-primarybox p-3 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer"
      // Removed aria-pressed as it's not valid for role="radio"
      role="radio"
      aria-checked={isSelected} // Correct attribute for role="radio"
      // Consider wrapping options in a div with role="radiogroup" for better semantics
    >
      {/* Label and Optional Description */}
      <div>
          <span className="text-base font-medium text-neutral-900 dark:text-white">{label}</span>
          {description && <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{description}</p>}
      </div>

      {/* Custom Radio Button Visual Indicator */}
      <div className={`ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
          isSelected
            ? 'border-primary dark:border-primary bg-primary dark:bg-primary'
            : 'border-neutral-400 dark:border-neutral-500 bg-transparent'
        }`}
        aria-hidden="true" // Hide visual element from screen readers, state is conveyed by aria-checked
      >
        {/* Optional inner dot styling - adjust if needed */}
        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
      </div>
    </button>
  );
};

// --- Main Appearance Settings Page Component ---
const AppearanceSettingsPage: React.FC = () => {
  // State holds the user's *preference* ('light', 'dark', or 'system')
  const [selectedPreference, setSelectedPreference] = useState<ThemePreference>('system'); // Default state before hydration

  // Apply theme based on preference, resolving 'system'
  const applyTheme = useCallback((preference: ThemePreference) => {
    if (typeof window === 'undefined') return; // Guard against server-side execution

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // Clean slate

    let themeToApply: 'light' | 'dark';

    if (preference === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      // console.log(`Applying theme based on system: ${themeToApply}`);
    } else {
      themeToApply = preference;
      //  console.log(`Applying theme directly: ${themeToApply}`);
    }
     root.classList.add(themeToApply);
  }, []);

  // Effect to load preference and set up listener
  useEffect(() => {
    // Load saved preference, default to 'system'
    const storedPreference = (localStorage.getItem('theme') as ThemePreference) || 'system';
    // console.log(`Loaded preference from localStorage: ${storedPreference}`);
    setSelectedPreference(storedPreference);
    applyTheme(storedPreference); // Apply theme based on loaded preference

    // Listener for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Use the current state value to check if system is selected
      // because localStorage might not be updated instantly if the change
      // happens *while* the user is on this page but hasn't interacted yet.
      // Alternatively, read localStorage again, but state is more direct here.
      if (selectedPreference === 'system') {
          // console.log(`System theme changed (${e.matches ? 'dark' : 'light'}), applying...`);
          applyTheme('system');
      } else {
          // console.log("System theme changed, but user preference is not 'system'. No change applied.");
      }
    };

    // Add listener - using addEventListener is preferred over deprecated addListener
    mediaQuery.addEventListener('change', handleSystemChange);


    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  // Only re-run if applyTheme changes (which it won't due to useCallback)
  // or if selectedPreference changes, ensuring the listener logic uses the latest state.
  }, [applyTheme, selectedPreference]);

  // Handler for selecting a theme option
  const handleThemeSelect = (preference: ThemePreference) => {
    // console.log(`User selected preference: ${preference}`);
    setSelectedPreference(preference); // Update radio button state
    localStorage.setItem('theme', preference); // Save the selected preference
    applyTheme(preference); // Apply the theme based on the new preference
  };

  return (
    <section className='Theme-Setting-Wrapper'>
      {/* Back Button and Title */}
      <div className="flex items-center mb-6 relative">
        <h1 className="lg:text-3xl text-2xl font-semibold text-mainheading dark:text-white flex-shrink-0">
        Theme Settings
        </h1>
      </div>

      {/* Theme Selection Options - Grouped for accessibility */}
      <div role="radiogroup" aria-labelledby="appearance-heading" className="space-y-2">
        <ThemeOption
          label="Light"
          value="light"
          currentSelection={selectedPreference}
          onSelect={handleThemeSelect}
        />
        <ThemeOption
          label="Dark"
          value="dark"
          currentSelection={selectedPreference}
          onSelect={handleThemeSelect}
        />
         <ThemeOption
          label="System"
          value="system"
          currentSelection={selectedPreference}
          onSelect={handleThemeSelect}
        />
      </div>

    </section>
  );
};

export default AppearanceSettingsPage;