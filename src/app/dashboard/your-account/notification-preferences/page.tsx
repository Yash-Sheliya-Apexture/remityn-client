// import React from "react";
// import { FaRegBell } from "react-icons/fa6";
// import { LuMail } from "react-icons/lu";


// export default function Notifications() {
//   return (
//     <section className="Notifications py-10">
//       <div className="conatiner mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Notifications</h2>

//         {/* Notifications with Toogle switch on/off*/}

//           {/* Main Notification */}
//           <div className="mt-8 px-4">
//             <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
//               {/* Icon Container */}
//               <div className="bg-lightborder rounded-full p-3 ">
//                 <FaRegBell size={24} className="text-main" />
//               </div>

//               <div className="flex-grow">
//                 <p className="font-semibold text-main">Allow notifications</p>
//               </div>

//               {/* Right Arrow Icon */}
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input className="sr-only peer" value="" type="checkbox" />
//                 <div className="peer bg-gray/50 rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:border-gray-500  peer-checked:after:translate-x-5"></div>
//               </label>
//             </div>
//           </div>

//           {/* Notification for transfers and balances your money */}
//           <div className="px-4 mt-8">
//             <div className="mb-3">
//               <h4 className="text-xl text-main font-semibold">
//                 Your transfers and balances
//               </h4>
//               <p className="text-sm text-gray">
//                 Notifications about where your money is.
//               </p>
//             </div>

//             <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
//               {/* Icon Container */}
//               <div className="bg-lightborder rounded-full p-3 ">
//                 <LuMail size={24} className="text-main" />
//               </div>

//               <div className="flex-grow">
//                 <p className="font-semibold text-main">Email</p>
//               </div>

//               {/* Right Arrow Icon */}
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input className="sr-only peer" value="" type="checkbox" />
//                 <div className="peer bg-gray/50 rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:border-gray-500  peer-checked:after:translate-x-5"></div>
//               </label>
//             </div>
//           </div>

//           {/* Notification for Personalised updates */}
//           <div className="px-4 mt-8">
//             <div className="mb-3">
//               <h4 className="text-xl text-main font-semibold">
//                 Personalised updates
//               </h4>
//               <p className="text-sm text-gray">
//                 Receive updates about the latest Wise products and features.
//               </p>
//             </div>

//             <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
//               {/* Icon Container */}
//               <div className="bg-lightborder rounded-full p-3 ">
//                 <LuMail size={24} className="text-main" />
//               </div>

//               <div className="flex-grow">
//                 <p className="font-semibold text-main">Email</p>
//               </div>

//               {/* Right Arrow Icon */}
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input className="sr-only peer" value="" type="checkbox" />
//                 <div className="peer bg-gray/50 rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:border-gray-500  peer-checked:after:translate-x-5"></div>
//               </label>
//             </div>
//           </div>
        
//       </div>
//     </section>
//   );
// }












// "use client"
// import React, { useState, useRef } from "react"; // Removed useEffect as it's not needed for this change
// import PropTypes from "prop-types";
// import { FaRegBell } from "react-icons/fa6";
// import { LuMail } from "react-icons/lu";
// import DashboardHeader from "@/app/components/layout/DashboardHeader";

// // --- Reusable Components Defined Locally ---

// // 1. Reusable Toggle Switch Component (Added stopPropagation)
// function ToggleSwitch({ checked, onChange, disabled = false }) {

//   // Handler specifically for the switch input/label to stop propagation
//   const handleSwitchClick = (event) => {
//     // Stop the click event from bubbling up to the parent NotificationItem div
//     event.stopPropagation();
//     // Let the native checkbox onChange handle the actual state toggle
//     // (or call onChange(event) here if needed, but native behavior is usually sufficient)
//   };

//   return (
//     // Use onClick on the label to capture clicks and stop propagation
//     <label
//       className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       onClick={handleSwitchClick} // Add click handler here
//     >
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange} // This is still needed to trigger the state update
//         className="sr-only peer"
//         disabled={disabled}
//         // Clicks directly on the input are handled by the label's onClick now
//       />
//       <div
//         // Styling remains the same
//         className={`peer rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center transition-colors ease-in-out
//                     ${disabled
//                         ? 'bg-gray-200 dark:bg-gray-600 opacity-50'
//                         : 'bg-gray/50 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none'
//                     }
//                     ${checked && !disabled ? 'peer-checked:after:translate-x-5' : ''}
//                     ${checked && disabled ? 'after:translate-x-5' : ''} // Keep visual position if disabled but checked
//                     ${disabled ? 'after:bg-gray-400' : 'after:bg-white'}
//                   `}
//       ></div>
//     </label>
//   );
// }

// ToggleSwitch.propTypes = {
//   checked: PropTypes.bool.isRequired,
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
// };


// // 2. Reusable Notification Item Component (Added onClick to main div)
// function NotificationItem({ icon: IconComponent, label, checked, onChange, disabled = false }) {

//   const handleItemClick = () => {
//       // Only call the onChange handler if the item is NOT disabled
//       if (!disabled) {
//           onChange(); // Call the passed-in state toggle handler
//       }
//   };

//   return (
//     <div
//       // Add onClick handler to the entire div
//       onClick={handleItemClick}
//       className={`flex items-center gap-4 sm:p-4 p-2 rounded-2xl transition-all duration-75 ease-linear 
//                   ${disabled
//                      ? 'opacity-60 cursor-not-allowed bg-transparent' // Ensure no hover effect when disabled
//                      : 'hover:bg-lightgray dark:hover:bg-primarybox cursor-pointer' // Style for enabled item
//                   }`}
//       // Add ARIA roles for better accessibility
//       role="button" // Indicate it's clickable
//       aria-pressed={checked} // Indicate the toggle state
//       tabIndex={disabled ? -1 : 0} // Make it focusable only when enabled
//       onKeyDown={(e) => { // Allow toggling with Space/Enter keys
//         if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
//             e.preventDefault(); // Prevent scrolling on spacebar
//             onChange();
//         }
//       }}
//     >
//       {/* Icon Container */}
//       {IconComponent && (
//         <div className={`bg-lightborder dark:bg-secondarybox rounded-full p-3 ${disabled ? 'opacity-70' : ''}`}>
//           <IconComponent size={24} className="text-neutral-900 dark:text-white" />
//         </div>
//       )}

//       {/* Label */}
//       <div className="flex-grow">
//         <p className={`font-medium leading-relaxed sm:text-xl ${disabled ? 'text-gray-500 dark:text-gray-300' : 'text-neutral-900 dark:text-white'}`}>
//            {label}
//         </p>
//       </div>

//       {/* Toggle Switch (pass props as before) */}
//       {/* The switch handles its own click via the label now to stop propagation */}
//       <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
//     </div>
//   );
// }

// NotificationItem.propTypes = {
//   icon: PropTypes.elementType.isRequired,
//   label: PropTypes.string.isRequired,
//   checked: PropTypes.bool.isRequired,
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
// };


// // 3. Reusable Notification Section Component (No changes needed)
// function NotificationSection({ title, description, children }) {
//   return (
//     <div className="sm:px-4 px-2 mt-8">
//       {(title || description) && (
//         <div className="mb-3">
//           {title && (
//             <h4 className="sm:text-xl text-lg text-mainheading dark:text-white font-semibold">{title}</h4>
//           )}
//           {description && (
//             <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
//           )}
//         </div>
//       )}
//       {children}
//     </div>
//   );
// }

// NotificationSection.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   children: PropTypes.node.isRequired,
// };


// // --- Main Notifications Component (No changes needed here for this feature) ---

// export default function Notifications() {
//   // --- State Management ---
//   const [allowNotifications, setAllowNotifications] = useState(true);
//   const [emailTransfers, setEmailTransfers] = useState(false);
//   const [emailUpdates, setEmailUpdates] = useState(true);

//   const rememberedStates = useRef({
//       emailTransfers: emailTransfers,
//       emailUpdates: emailUpdates,
//   });

//   // --- Event Handlers ---
//   const handleAllowNotificationsChange = () => {
//     const nextValue = !allowNotifications;

//     if (nextValue === false) {
//       rememberedStates.current = {
//         emailTransfers: emailTransfers,
//         emailUpdates: emailUpdates,
//       };
//       setEmailTransfers(false);
//       setEmailUpdates(false);
//       console.log("Main toggle OFF -> Remembering:", rememberedStates.current, "Setting all sub-toggles OFF");
//     } else {
//       setEmailTransfers(rememberedStates.current.emailTransfers);
//       setEmailUpdates(rememberedStates.current.emailUpdates);
//       console.log("Main toggle ON -> Restoring:", rememberedStates.current);
//     }
//     setAllowNotifications(nextValue);
//   };

//   const handleEmailTransfersChange = () => {
//     // No need for the disabled check here anymore,
//     // as NotificationItem's onClick won't call this if disabled.
//     // However, keeping it doesn't hurt as a safeguard.
//     if (!allowNotifications) return;
//     setEmailTransfers((prev) => !prev);
//     console.log("Email Transfers toggled:", !emailTransfers);
//   };

//   const handleEmailUpdatesChange = () => {
//     if (!allowNotifications) return;
//     setEmailUpdates((prev) => !prev);
//     console.log("Email Updates toggled:", !emailUpdates);
//   };

//   // --- Render Logic ---
//   const subNotificationsDisabled = !allowNotifications;

//   return (
//     <section className="Notifications py-10">
//       <div className="container mx-auto">
//         {/* <h2 className="text-3xl text-main font-semibold mb-8 px-4">Notifications</h2> */}
//         <DashboardHeader title="Notifications" />

//         {/* --- Main Notification --- */}
//         <div className="sm:px-4 px-2">
//            <NotificationItem
//             icon={FaRegBell}
//             label="Allow notifications"
//             checked={allowNotifications}
//             onChange={handleAllowNotificationsChange}
//             // Master toggle is never disabled by the sub-toggle logic
//            />
//         </div>


//         {/* --- Transfers and Balances Section --- */}
//         <NotificationSection
//           title="Your transfers and balances"
//           description="Notifications about where your money is."
//         >
//           <NotificationItem
//             icon={LuMail}
//             label="Email"
//             checked={emailTransfers}
//             onChange={handleEmailTransfersChange}
//             disabled={subNotificationsDisabled} // Pass disabled state
//           />
//         </NotificationSection>

//         {/* --- Personalised Updates Section --- */}
//         <NotificationSection
//           title="Personalised updates"
//           description="Receive updates about the latest Wise products and features."
//         >
//           <NotificationItem
//             icon={LuMail}
//             label="Email"
//             checked={emailUpdates}
//             onChange={handleEmailUpdatesChange}
//             disabled={subNotificationsDisabled} // Pass disabled state
//           />
//         </NotificationSection>

//       </div>
//     </section>
//   );
// }



// "use client"
// import React, { useState, useRef } from "react";
// // Removed PropTypes import
// import { FaRegBell } from "react-icons/fa6";
// import { LuMail } from "react-icons/lu";
// import DashboardHeader from "@/app/components/layout/DashboardHeader";

// // --- Reusable Components Defined Locally ---

// // 1. Reusable Toggle Switch Component
// interface ToggleSwitchProps {
//   checked: boolean;
//   onChange: () => void; // Changed from expecting event to simple function call based on usage
//   disabled?: boolean;
// }

// function ToggleSwitch({ checked, onChange, disabled = false }: ToggleSwitchProps) {

//   // Handler specifically for the switch input/label to stop propagation
//   const handleSwitchClick = (event: React.MouseEvent<HTMLLabelElement>) => { // Typed event
//     // Stop the click event from bubbling up to the parent NotificationItem div
//     event.stopPropagation();
//     // Let the native checkbox onChange handle the actual state toggle
//     // (or call onChange(event) here if needed, but native behavior is usually sufficient)
//     // Since the parent NotificationItem expects onChange() without args, we don't call it here.
//     // The input's onChange below will trigger the passed onChange prop.
//   };

//   // Handler for the actual input change
//   const handleInputChange = () => {
//     // Call the passed onChange function when the input state changes
//     onChange();
//   }

//   return (
//     // Use onClick on the label to capture clicks and stop propagation
//     <label
//       className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       onClick={handleSwitchClick} // Add click handler here
//     >
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={handleInputChange} // Use dedicated handler to call the prop correctly
//         className="sr-only peer"
//         disabled={disabled}
//       />
//       <div
//         // Styling remains the same
//         className={`peer rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center transition-colors ease-in-out
//                     ${disabled
//                         ? 'bg-gray-200 dark:bg-gray-600 opacity-50'
//                         : 'bg-gray/50 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none'
//                     }
//                     ${checked && !disabled ? 'peer-checked:after:translate-x-5' : ''}
//                     ${checked && disabled ? 'after:translate-x-5' : ''} // Keep visual position if disabled but checked
//                     ${disabled ? 'after:bg-gray-400' : 'after:bg-white'}
//                   `}
//       ></div>
//     </label>
//   );
// }

// // Removed ToggleSwitch.propTypes


// // 2. Reusable Notification Item Component
// interface NotificationItemProps {
//   icon: React.ElementType; // Type for React components (like icons)
//   label: string;
//   checked: boolean;
//   onChange: () => void; // Function that takes no arguments and returns nothing
//   disabled?: boolean;
// }

// function NotificationItem({ icon: IconComponent, label, checked, onChange, disabled = false }: NotificationItemProps) {

//   const handleItemClick = () => {
//       // Only call the onChange handler if the item is NOT disabled
//       if (!disabled) {
//           onChange(); // Call the passed-in state toggle handler
//       }
//   };

//   return (
//     <div
//       // Add onClick handler to the entire div
//       onClick={handleItemClick}
//       className={`flex items-center gap-4 sm:p-4 p-2 rounded-2xl transition-all duration-75 ease-linear
//                   ${disabled
//                      ? 'opacity-60 cursor-not-allowed bg-transparent' // Ensure no hover effect when disabled
//                      : 'hover:bg-lightgray dark:hover:bg-primarybox cursor-pointer' // Style for enabled item
//                   }`}
//       // Add ARIA roles for better accessibility
//       role="button" // Indicate it's clickable
//       aria-pressed={checked} // Indicate the toggle state
//       tabIndex={disabled ? -1 : 0} // Make it focusable only when enabled
//       onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => { // Typed event
//         if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
//             e.preventDefault(); // Prevent scrolling on spacebar
//             onChange();
//         }
//       }}
//     >
//       {/* Icon Container */}
//       {IconComponent && (
//         <div className={`bg-lightborder dark:bg-secondarybox rounded-full p-3 ${disabled ? 'opacity-70' : ''}`}>
//           {/* Assuming IconComponent accepts size and className */}
//           <IconComponent size={24} className="text-neutral-900 dark:text-white" />
//         </div>
//       )}

//       {/* Label */}
//       <div className="flex-grow">
//         <p className={`font-medium leading-relaxed sm:text-xl ${disabled ? 'text-gray-500 dark:text-gray-300' : 'text-neutral-900 dark:text-white'}`}>
//            {label}
//         </p>
//       </div>

//       {/* Toggle Switch (pass props as before) */}
//       {/* The switch handles its own click via the label now to stop propagation */}
//       <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
//     </div>
//   );
// }

// // Removed NotificationItem.propTypes


// // 3. Reusable Notification Section Component
// interface NotificationSectionProps {
//   title?: string; // Optional string
//   description?: string; // Optional string
//   children: React.ReactNode; // Type for any valid React child
// }

// function NotificationSection({ title, description, children }: NotificationSectionProps) {
//   return (
//     <div className="sm:px-4 px-2 mt-8">
//       {(title || description) && (
//         <div className="mb-3">
//           {title && (
//             <h4 className="sm:text-xl text-lg text-mainheading dark:text-white font-semibold">{title}</h4>
//           )}
//           {description && (
//             <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
//           )}
//         </div>
//       )}
//       {children}
//     </div>
//   );
// }

// // Removed NotificationSection.propTypes


// // --- Main Notifications Component ---

// export default function Notifications() {
//   // --- State Management ---
//   const [allowNotifications, setAllowNotifications] = useState<boolean>(true); // Explicit type
//   const [emailTransfers, setEmailTransfers] = useState<boolean>(false);      // Explicit type
//   const [emailUpdates, setEmailUpdates] = useState<boolean>(true);          // Explicit type

//   // Type the ref's initial value and current property
//   const rememberedStates = useRef<{ emailTransfers: boolean; emailUpdates: boolean }>({
//       emailTransfers: emailTransfers,
//       emailUpdates: emailUpdates,
//   });

//   // --- Event Handlers ---
//   const handleAllowNotificationsChange = () => {
//     const nextValue = !allowNotifications;

//     if (nextValue === false) {
//       // Store the current state *before* disabling
//       rememberedStates.current = {
//         emailTransfers: emailTransfers,
//         emailUpdates: emailUpdates,
//       };
//       setEmailTransfers(false);
//       setEmailUpdates(false);
//       console.log("Main toggle OFF -> Remembering:", rememberedStates.current, "Setting all sub-toggles OFF");
//     } else {
//       // Restore the remembered state when enabling
//       setEmailTransfers(rememberedStates.current.emailTransfers);
//       setEmailUpdates(rememberedStates.current.emailUpdates);
//       console.log("Main toggle ON -> Restoring:", rememberedStates.current);
//     }
//     setAllowNotifications(nextValue);
//   };

//   const handleEmailTransfersChange = () => {
//     // No explicit disabled check needed due to NotificationItem's logic,
//     // but state update should only happen if allowed. Component correctly prevents call if disabled.
//     setEmailTransfers((prev) => !prev);
//     console.log("Email Transfers toggled:", !emailTransfers);
//   };

//   const handleEmailUpdatesChange = () => {
//      // Component correctly prevents call if disabled.
//     setEmailUpdates((prev) => !prev);
//     console.log("Email Updates toggled:", !emailUpdates);
//   };

//   // --- Render Logic ---
//   const subNotificationsDisabled = !allowNotifications;

//   return (
//     <section className="Notifications py-10">
//       <div className="container mx-auto">
//         {/* <h2 className="text-3xl text-main font-semibold mb-8 px-4">Notifications</h2> */}
//         <DashboardHeader title="Notifications" />

//         {/* --- Main Notification --- */}
//         <div className="sm:px-4 px-2">
//            <NotificationItem
//             icon={FaRegBell}
//             label="Allow notifications"
//             checked={allowNotifications}
//             onChange={handleAllowNotificationsChange}
//             // Master toggle is never disabled by the sub-toggle logic
//            />
//         </div>


//         {/* --- Transfers and Balances Section --- */}
//         <NotificationSection
//           title="Your transfers and balances"
//           description="Notifications about where your money is."
//         >
//           <NotificationItem
//             icon={LuMail}
//             label="Email"
//             checked={emailTransfers}
//             onChange={handleEmailTransfersChange}
//             disabled={subNotificationsDisabled} // Pass disabled state
//           />
//         </NotificationSection>

//         {/* --- Personalised Updates Section --- */}
//         <NotificationSection
//           title="Personalised updates"
//           description="Receive updates about the latest Wise products and features."
//         >
//           <NotificationItem
//             icon={LuMail}
//             label="Email"
//             checked={emailUpdates}
//             onChange={handleEmailUpdatesChange}
//             disabled={subNotificationsDisabled} // Pass disabled state
//           />
//         </NotificationSection>

//       </div>
//     </section>
//   );
// }





"use client"
import React, { useState, useRef } from "react";
// Removed PropTypes import
import { FaRegBell } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import DashboardHeader from "@/app/components/layout/DashboardHeader";

// --- Reusable Components Defined Locally ---

// 1. Reusable Toggle Switch Component
interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void; // Changed from expecting event to simple function call based on usage
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, disabled = false }: ToggleSwitchProps) {

  // Handler specifically for the switch input/label to stop propagation
  const handleSwitchClick = (event: React.MouseEvent<HTMLLabelElement>) => { // Typed event
    // Stop the click event from bubbling up to the parent NotificationItem div
    event.stopPropagation();
    // Let the native checkbox onChange handle the actual state toggle
    // (or call onChange(event) here if needed, but native behavior is usually sufficient)
    // Since the parent NotificationItem expects onChange() without args, we don't call it here.
    // The input's onChange below will trigger the passed onChange prop.
  };

  // Handler for the actual input change
  const handleInputChange = () => {
    // Call the passed onChange function when the input state changes
    onChange();
  }

  return (
    // Use onClick on the label to capture clicks and stop propagation
    <label
      className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleSwitchClick} // Add click handler here
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleInputChange} // Use dedicated handler to call the prop correctly
        className="sr-only peer"
        disabled={disabled}
      />
      <div
        // Styling remains the same
        className={`peer rounded-full outline-none duration-500 after:duration-300 w-12 h-7 shadow-inner after:content-[''] after:rounded-full after:absolute after:outline-none after:h-5 after:w-5 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center transition-colors ease-in-out
                    ${disabled
                        ? 'bg-gray-200 dark:bg-gray-600 opacity-50'
                        : 'bg-gray/50 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-primary peer-focus:outline-none'
                    }
                    ${checked && !disabled ? 'peer-checked:after:translate-x-5' : ''}
                    ${checked && disabled ? 'after:translate-x-5' : ''} // Keep visual position if disabled but checked
                    ${disabled ? 'after:bg-gray-400' : 'after:bg-white'}
                  `}
      ></div>
    </label>
  );
}

// Removed ToggleSwitch.propTypes


// 2. Reusable Notification Item Component
interface NotificationItemProps {
  icon: React.ElementType; // Type for React components (like icons)
  label: string;
  checked: boolean;
  onChange: () => void; // Function that takes no arguments and returns nothing
  disabled?: boolean;
}

function NotificationItem({ icon: IconComponent, label, checked, onChange, disabled = false }: NotificationItemProps) {

  const handleItemClick = () => {
      // Only call the onChange handler if the item is NOT disabled
      if (!disabled) {
          onChange(); // Call the passed-in state toggle handler
      }
  };

  return (
    <div
      // Add onClick handler to the entire div
      onClick={handleItemClick}
      className={`flex items-center gap-4 sm:p-4 p-2 rounded-2xl transition-all duration-75 ease-linear focus:outline-none
                  ${disabled
                     ? 'opacity-60 cursor-not-allowed bg-transparent' // Ensure no hover effect when disabled
                     : 'hover:bg-lightgray dark:hover:bg-primarybox cursor-pointer' // Style for enabled item
                  }`}
      // Add ARIA roles for better accessibility
      role="button" // Indicate it's clickable
      aria-pressed={checked} // Indicate the toggle state
      tabIndex={disabled ? -1 : 0} // Make it focusable only when enabled
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => { // Typed event
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); // Prevent scrolling on spacebar
            onChange();
        }
      }}
    >
      {/* Icon Container */}
      {IconComponent && (
        <div className={`bg-lightborder dark:bg-secondarybox rounded-full p-3 ${disabled ? 'opacity-70' : ''}`}>
          {/* Assuming IconComponent accepts size and className */}
          <IconComponent size={24} className="text-neutral-900 dark:text-white" />
        </div>
      )}

      {/* Label */}
      <div className="flex-grow">
        <p className={`font-medium leading-relaxed sm:text-xl ${disabled ? 'text-gray-500 dark:text-gray-300' : 'text-neutral-900 dark:text-white'}`}>
           {label}
        </p>
      </div>

      {/* Toggle Switch (pass props as before) */}
      {/* The switch handles its own click via the label now to stop propagation */}
      <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}

// Removed NotificationItem.propTypes


// 3. Reusable Notification Section Component
interface NotificationSectionProps {
  title?: string; // Optional string
  description?: string; // Optional string
  children: React.ReactNode; // Type for any valid React child
}

function NotificationSection({ title, description, children }: NotificationSectionProps) {
  return (
    <div className="sm:mt-6 mt-4">
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h4 className="sm:text-xl text-lg text-mainheading dark:text-white font-semibold">{title}</h4>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Removed NotificationSection.propTypes


// --- Main Notifications Component ---

export default function Notifications() {
  // --- State Management ---
  const [allowNotifications, setAllowNotifications] = useState<boolean>(true); // Explicit type
  const [emailTransfers, setEmailTransfers] = useState<boolean>(false);      // Explicit type
  const [emailUpdates, setEmailUpdates] = useState<boolean>(true);          // Explicit type

  // Type the ref's initial value and current property
  const rememberedStates = useRef<{ emailTransfers: boolean; emailUpdates: boolean }>({
      emailTransfers: emailTransfers,
      emailUpdates: emailUpdates,
  });

  // --- Event Handlers ---
  const handleAllowNotificationsChange = () => {
    const nextValue = !allowNotifications;

    if (nextValue === false) {
      // Store the current state *before* disabling
      rememberedStates.current = {
        emailTransfers: emailTransfers,
        emailUpdates: emailUpdates,
      };
      setEmailTransfers(false);
      setEmailUpdates(false);
      // console.log("Main toggle OFF -> Remembering:", rememberedStates.current, "Setting all sub-toggles OFF");
    } else {
      // Restore the remembered state when enabling
      setEmailTransfers(rememberedStates.current.emailTransfers);
      setEmailUpdates(rememberedStates.current.emailUpdates);
      // console.log("Main toggle ON -> Restoring:", rememberedStates.current);
    }
    setAllowNotifications(nextValue);
  };

  const handleEmailTransfersChange = () => {
    // No explicit disabled check needed due to NotificationItem's logic,
    // but state update should only happen if allowed. Component correctly prevents call if disabled.
    setEmailTransfers((prev) => !prev);
    // console.log("Email Transfers toggled:", !emailTransfers);
  };

  const handleEmailUpdatesChange = () => {
     // Component correctly prevents call if disabled.
    setEmailUpdates((prev) => !prev);
    // console.log("Email Updates toggled:", !emailUpdates);
  };

  // --- Render Logic ---
  const subNotificationsDisabled = !allowNotifications;

  return (
    <section className="Notifications-Wrapper">
      <div className="Notifications">
        {/* <h2 className="text-3xl text-main font-semibold mb-8 px-4">Notifications</h2> */}
        <DashboardHeader title="Notifications" />

        {/* --- Main Notification --- */}
        <div className="">
           <NotificationItem
            icon={FaRegBell}
            label="Allow notifications"
            checked={allowNotifications}
            onChange={handleAllowNotificationsChange}
            // Master toggle is never disabled by the sub-toggle logic
           />
        </div>


        {/* --- Transfers and Balances Section --- */}
        <NotificationSection
          title="Your transfers and balances"
          description="Notifications about where your money is."
        >
          <NotificationItem
            icon={LuMail}
            label="Email"
            checked={emailTransfers}
            onChange={handleEmailTransfersChange}
            disabled={subNotificationsDisabled} // Pass disabled state
          />
        </NotificationSection>

        {/* --- Personalised Updates Section --- */}
        <NotificationSection
          title="Personalised updates"
          description="Receive updates about the latest Wise products and features."
        >
          <NotificationItem
            icon={LuMail}
            label="Email"
            checked={emailUpdates}
            onChange={handleEmailUpdatesChange}
            disabled={subNotificationsDisabled} // Pass disabled state
          />
        </NotificationSection>

      </div>
    </section>
  );
}