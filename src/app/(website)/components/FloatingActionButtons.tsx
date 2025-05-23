// // src/components/FloatingContactButtons.tsx
// import React from 'react';
// import { BsWhatsapp, BsChatDots, BsTelephone } from 'react-icons/bs';

// interface ContactButtonConfig {
//   id: string;
//   icon: React.ReactNode;
//   text: string;
//   href: string;
//   ringColor: string;        // Tailwind class for the outer ring (e.g., 'bg-green-700')
//   innerCircleColor: string; // Tailwind class for the initial inner circle (e.g., 'bg-white')
//   iconColorInitial: string; // Tailwind class for icon in initial state (e.g., 'text-green-500')
//   bgColorHover: string;     // Tailwind class for pill background on hover (e.g., 'hover:bg-green-600')
//   iconColorHover: string;   // Tailwind class for icon on hover (e.g., 'text-green-300')
//   textColor: string;        // Tailwind class for text on hover (e.g., 'text-white')
//   focusRingColor: string;   // Tailwind class for focus ring (e.g., 'focus:ring-green-500')
//   ariaLabel: string;
// }

// const buttonConfigs: ContactButtonConfig[] = [
//   {
//     id: 'whatsapp',
//     icon: <BsWhatsapp size={28} />,
//     text: '+91 9779816382',
//     href: 'https://wa.me/919779816382', // Replace with your WhatsApp link
//     ringColor: 'bg-green-700',
//     innerCircleColor: 'bg-white',
//     iconColorInitial: 'text-green-500',
//     bgColorHover: 'hover:bg-green-600',
//     iconColorHover: 'text-green-300',
//     textColor: 'text-white',
//     focusRingColor: 'focus:ring-green-400',
//     ariaLabel: 'Chat on WhatsApp',
//   },
//   {
//     id: 'chat',
//     icon: <BsChatDots size={28} />,
//     text: 'Live Chat',
//     href: '#chat', // Replace with your chat link/action
//     ringColor: 'bg-blue-700',
//     innerCircleColor: 'bg-white',
//     iconColorInitial: 'text-blue-500',
//     bgColorHover: 'hover:bg-blue-600',
//     iconColorHover: 'text-blue-300',
//     textColor: 'text-white',
//     focusRingColor: 'focus:ring-blue-400',
//     ariaLabel: 'Start a live chat',
//   },
//   {
//     id: 'call',
//     icon: <BsTelephone size={28} />,
//     text: 'Call Us',
//     href: 'tel:+1234567890', // Replace with your phone number
//     ringColor: 'bg-purple-700', // Using purple from your image
//     innerCircleColor: 'bg-white',
//     iconColorInitial: 'text-purple-500',
//     bgColorHover: 'hover:bg-purple-600',
//     iconColorHover: 'text-purple-300',
//     textColor: 'text-white',
//     focusRingColor: 'focus:ring-purple-400',
//     ariaLabel: 'Call us',
//   },
// ];

// const FloatingContactButtons: React.FC = () => {
//   return (
//     <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4 z-50">
//       {buttonConfigs.map((button) => (
//         <a
//           key={button.id}
//           href={button.href}
//           target={button.href.startsWith('http') ? '_blank' : '_self'}
//           rel="noopener noreferrer"
//           aria-label={button.ariaLabel}
//           className={`
//             group
//             relative
//             flex items-center
//             h-16 w-16 min-w-[4rem] {/* 64px */}
//             ${button.ringColor}
//             ${button.bgColorHover} {/* This applies the hover background color */}
//             rounded-full
//             shadow-xl
//             transition-all duration-300 ease-in-out
//             overflow-hidden
//             hover:w-60 md:hover:w-64 {/* Expanded width, adjust as needed */}
//             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${button.focusRingColor}
//           `}
//         >
//           {/* Initial State Layer: White circle with colored icon (as per Image 1) */}
//           <div
//             className={`
//               absolute inset-1 {/* Creates the ring effect by making this smaller */}
//               ${button.innerCircleColor}
//               rounded-full
//               flex items-center justify-center
//               transition-opacity duration-200 ease-in-out
//               group-hover:opacity-0
//               pointer-events-none {/* Allows hover to pass through to the <a> tag */}
//             `}
//           >
//             <div className={`${button.iconColorInitial}`}>
//               {button.icon}
//             </div>
//           </div>

//           {/* Hover State Layer: Icon on left, text on right (as per Image 2 & Video) */}
//           {/* Icon for hover state (visible when white circle fades) */}
//           <div
//             className={`
//               flex-shrink-0
//               w-16 h-16 {/* Ensures icon area is consistent */}
//               flex items-center justify-center
//               ${button.iconColorHover}
//               opacity-0 {/* Starts transparent */}
//               transition-opacity duration-300 ease-in-out delay-50 {/* Fades in after white circle starts fading */}
//               group-hover:opacity-100
//             `}
//           >
//             {button.icon}
//           </div>

//           {/* Text for hover state */}
//           <span
//             className={`
//               ${button.textColor}
//               text-sm font-medium
//               whitespace-nowrap
//               opacity-0
//               max-w-0 {/* Collapsed initially */}
//               transform translate-x-3 {/* Start slightly to the right for a smoother reveal */}
//               group-hover:opacity-100
//               group-hover:max-w-xs {/* Allow it to take space */}
//               group-hover:ml-0.5 group-hover:mr-4 {/* Spacing: ml from icon, mr for padding end */}
//               group-hover:translate-x-0 {/* Move to final position */}
//               transition-all duration-300 ease-in-out delay-[120ms] {/* Text appears after expansion starts */}
//             `}
//           >
//             {button.text}
//           </span>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default FloatingContactButtons;

// // src/components/FloatingContactButtons.tsx
// import React from "react";
// import { BsWhatsapp, BsChatDots, BsTelephone } from "react-icons/bs";

// interface ContactButtonConfig {
//   id: string;
//   icon: React.ReactNode;
//   text: string;
//   href: string;
//   ringColor: string; // Tailwind class for the outer ring (e.g., 'bg-green-700')
//   innerCircleColor: string; // Tailwind class for the initial inner circle (e.g., 'bg-white')
//   iconColorInitial: string; // Tailwind class for icon in initial state (e.g., 'text-green-500')
//   bgColorHover: string; // Tailwind class for pill background on hover (e.g., 'hover:bg-green-600')
//   iconColorHover: string; // Tailwind class for icon on hover (e.g., 'text-green-300')
//   textColor: string; // Tailwind class for text on hover (e.g., 'text-white')
//   focusRingColor: string; // Tailwind class for focus ring (e.g., 'focus:ring-green-500')
//   ariaLabel: string;
// }

// const buttonConfigs: ContactButtonConfig[] = [
//   {
//     id: "whatsapp",
//     icon: <BsWhatsapp size={28} />,
//     text: "+91 9779816382",
//     href: "https://wa.me/919779816382", // Replace with your WhatsApp link
//     ringColor: "bg-green-700",
//     innerCircleColor: "bg-white",
//     iconColorInitial: "text-green-500",
//     bgColorHover: "hover:bg-green-600",
//     iconColorHover: "text-green-300",
//     textColor: "text-white",
//     focusRingColor: "focus:ring-green-400",
//     ariaLabel: "Chat on WhatsApp",
//   },
//   {
//     id: "chat",
//     icon: <BsChatDots size={28} />,
//     text: "Live Chat",
//     href: "#chat", // Replace with your chat link/action
//     ringColor: "bg-blue-700",
//     innerCircleColor: "bg-white",
//     iconColorInitial: "text-blue-500",
//     bgColorHover: "hover:bg-blue-600",
//     iconColorHover: "text-blue-300",
//     textColor: "text-white",
//     focusRingColor: "focus:ring-blue-400",
//     ariaLabel: "Start a live chat",
//   },
//   {
//     id: "call",
//     icon: <BsTelephone size={28} />,
//     text: "Call Us",
//     href: "tel:+1234567890", // Replace with your phone number
//     ringColor: "bg-purple-700", // Using purple from your image
//     innerCircleColor: "bg-white",
//     iconColorInitial: "text-purple-500",
//     bgColorHover: "hover:bg-purple-600",
//     iconColorHover: "text-purple-300",
//     textColor: "text-white",
//     focusRingColor: "focus:ring-purple-400",
//     ariaLabel: "Call us",
//   },
// ];

// const FloatingContactButtons: React.FC = () => {
//   return (
//     <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4 z-50">
//       {buttonConfigs.map((button) => (
//         <a
//           key={button.id}
//           href={button.href}
//           target={button.href.startsWith("http") ? "_blank" : "_self"}
//           rel="noopener noreferrer"
//           aria-label={button.ariaLabel}
//           className={`
//             group
//             relative
//             flex items-center
//             h-16 w-16 min-w-[4rem]
//             ${button.ringColor}
//             ${button.bgColorHover}
//             rounded-full
//             shadow-xl
//             transition-all duration-300 ease-in-out
//             overflow-hidden
//             hover:w-60 md:hover:w-64
//             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${button.focusRingColor}
//           `}
//         >
//           {/* Initial State Layer: White circle with colored icon (as per Image 1) */}
//           <div
//             className={`
//               absolute inset-1
//               ${button.innerCircleColor}
//               rounded-full
//               flex items-center justify-center
//               transition-opacity duration-200 ease-in-out
//               group-hover:opacity-0
//               pointer-events-none
//             `}
//           >
//             <div className={`${button.iconColorInitial}`}>{button.icon}</div>
//           </div>

//           {/* Hover State Layer: Icon on left, text on right (as per Image 2 & Video) */}
//           {/* Icon for hover state (visible when white circle fades) */}
//           <div
//             className={`
//               flex-shrink-0
//               w-16 h-16
//               flex items-center justify-center
//               ${button.iconColorHover}
//               opacity-0 {/* Starts transparent */}
//               transition-opacity duration-300 ease-in-out delay-50
//               group-hover:opacity-100
//             `}
//           >
//             {button.icon}
//           </div>

//           {/* Text for hover state */}
//           <span
//             className={`
//               ${button.textColor}
//               text-sm font-medium
//               whitespace-nowrap
//               opacity-0
//               max-w-0
//               transform translate-x-3
//               group-hover:opacity-100
//               group-hover:max-w-xs
//               group-hover:ml-0.5 group-hover:mr-4
//               group-hover:translate-x-0
//               transition-all duration-300 ease-in-out delay-[120ms]
//             `}
//           >
//             {button.text}
//           </span>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default FloatingContactButtons;

// // src/components/FloatingContactButtons.tsx
// import React from 'react';
// import { BsWhatsapp, BsChatDots, BsTelephone } from 'react-icons/bs';

// interface ContactButtonConfig {
//   id: string;
//   icon: React.ReactNode;
//   text: string;
//   href: string;
//   initialBorderColor: string; // For the initial non-hovered circle border
//   initialBgColor: string;     // For the initial non-hovered circle background (white)
//   initialIconColor: string;   // For the initial non-hovered circle icon color
//   hoverPillBgColor: string;   // For the expanded pill background on hover (will be white)
//   hoverPillIconColor: string; // For the icon color inside the expanded white pill
//   hoverPillTextColor: string; // For the text color inside the expanded white pill
//   ariaLabel: string;
// }

// const ICON_SIZE = 24;
// const BUTTON_DIMENSION = 'h-14 w-14';
// const BUTTON_MIN_WIDTH = 'min-w-[3.5rem]';
// const EXPANDED_WIDTH_CLASS = 'hover:w-56'; // Adjust as needed
// const INITIAL_BORDER_WIDTH = 'border-[3px]';

// const buttonConfigs: ContactButtonConfig[] = [
//   {
//     id: 'whatsapp',
//     icon: <BsWhatsapp size={ICON_SIZE} />,
//     text: '+91 9779816382',
//     href: 'https://wa.me/919779816382',
//     initialBorderColor: 'border-green-600',
//     initialBgColor: 'bg-white',
//     initialIconColor: 'text-green-500',
//     hoverPillBgColor: 'group-hover:bg-white', // Pill background is white on hover
//     hoverPillIconColor: 'text-green-500',     // Icon color on white pill
//     hoverPillTextColor: 'text-green-600',     // Text color on white pill (can be same as icon or slightly different)
//     ariaLabel: 'Chat on WhatsApp',
//   },
//   {
//     id: 'chat',
//     icon: <BsChatDots size={ICON_SIZE} />,
//     text: 'Live Chat',
//     href: '#chat',
//     initialBorderColor: 'border-blue-600',
//     initialBgColor: 'bg-white',
//     initialIconColor: 'text-blue-500',
//     hoverPillBgColor: 'group-hover:bg-white',
//     hoverPillIconColor: 'text-blue-500',
//     hoverPillTextColor: 'text-blue-600',
//     ariaLabel: 'Start a live chat',
//   },
//   {
//     id: 'call',
//     icon: <BsTelephone size={ICON_SIZE} />,
//     text: 'Call Us',
//     href: 'tel:+1234567890',
//     initialBorderColor: 'border-purple-600',
//     initialBgColor: 'bg-white',
//     initialIconColor: 'text-purple-500',
//     hoverPillBgColor: 'group-hover:bg-white',
//     hoverPillIconColor: 'text-purple-500',
//     hoverPillTextColor: 'text-purple-600',
//     ariaLabel: 'Call us',
//   },
// ];

// const FloatingContactButtons: React.FC = () => {
//   return (
//     <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-50">
//       {buttonConfigs.map((button) => (
//         <a
//           key={button.id}
//           href={button.href}
//           target={button.href.startsWith('http') ? '_blank' : '_self'}
//           rel="noopener noreferrer"
//           aria-label={button.ariaLabel}
//           className={`
//             group
//             relative
//             flex items-center
//             ${BUTTON_DIMENSION} ${BUTTON_MIN_WIDTH}
//             ${button.hoverPillBgColor}
//             rounded-full
//             shadow-lg
//             transition-all duration-300 ease-in-out
//             overflow-hidden
//             ${EXPANDED_WIDTH_CLASS}
//             focus:outline-none
//           `}
//         >
//           {/* Initial State: White circle with colored border and icon */}
//           <div
//             className={`
//               absolute inset-0
//               rounded-full
//               flex items-center justify-center
//               ${button.initialBgColor}
//               ${button.initialBorderColor}
//               ${INITIAL_BORDER_WIDTH}
//               ${button.initialIconColor}
//               transition-opacity duration-200 ease-in-out
//               group-hover:opacity-0
//               pointer-events-none
//             `}
//           >
//             {button.icon}
//           </div>

//           {/* Hover State Content: Icon + Text (on the pill's background) */}
//           <div
//             className={`
//               flex items-center w-full h-full
//               opacity-0 group-hover:opacity-100
//               transition-opacity duration-300 ease-in-out delay-50
//             `}
//           >
//             {/* Hover Icon Container */}
//             <div
//               className={`
//                 flex-shrink-0
//                 ${BUTTON_DIMENSION} ${BUTTON_MIN_WIDTH}
//                 flex items-center justify-center
//                 ${button.hoverPillIconColor}
//               `}
//             >
//               {button.icon}
//             </div>

//             {/* Hover Text */}
//             <span
//               className={`
//                 ${button.hoverPillTextColor}
//                 text-sm font-medium
//                 whitespace-nowrap
//                 opacity-0
//                 max-w-0
//                 transform translate-x-2
//                 group-hover:opacity-100
//                 group-hover:max-w-xs
//                 group-hover:ml-0 group-hover:mr-3
//                 group-hover:translate-x-0
//                 transition-all duration-300 ease-in-out delay-[100ms]
//               `}
//             >
//               {button.text}
//             </span>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default FloatingContactButtons;

// // src/components/FloatingActionButtons.tsx
// import React from "react";
// import { IoLogoWhatsapp, IoCall } from "react-icons/io5";
// import { BsChatDots } from "react-icons/bs";

// interface FloatingButtonProps {
//   onClick: () => void;
//   icon: React.ReactNode;
//   textOnHover: string;
//   iconColorClass: string;
//   borderColorClass?: string;
//   initialTextColorClass?: string;
//   hoverTextColorClass?: string;
//   hoverButtonBgClass?: string;
//   ariaLabel: string;
//   animationConfig?: {
//     type: "whatsapp" | "message" | "phone";
//     trigger: "always" | "on-hover";
//   };
//   animationDelay?: string; // New prop for animation delay
// }

// const FloatingButton: React.FC<FloatingButtonProps> = ({
//   onClick,
//   icon,
//   textOnHover,
//   iconColorClass,
//   initialTextColorClass = "text-white", // Text color when it appears on hover
//   borderColorClass = "border-gray-300", // Default border color
//   hoverTextColorClass = "group-hover:text-white", // Can be used for further text color changes on hover
//   hoverButtonBgClass = "group-hover:bg-black",
//   ariaLabel,
//   animationConfig,
//   animationDelay = "0s", // Default delay
// }) => {
//   let buttonSpecificAnimationClass = "";

//   if (animationConfig) {
//     if (animationConfig.trigger === "always") {
//       if (animationConfig.type === "whatsapp") {
//         buttonSpecificAnimationClass = "animate-pulse-whatsapp-fab";
//       } else if (animationConfig.type === "message") {
//         buttonSpecificAnimationClass = "animate-pulse-message-fab";
//       } else if (animationConfig.type === "phone") {
//         buttonSpecificAnimationClass = "animate-pulse-phone-fab";
//       }
//     } else if (animationConfig.trigger === "on-hover") {
//       if (animationConfig.type === "phone") {
//         buttonSpecificAnimationClass = "phone-hover-animation-target";
//       }
//     }
//   }

//   const applyBaseShadow = !(
//     animationConfig && animationConfig.trigger === "always"
//   );

//   // CSS custom property for animation delay
//   const buttonStyle = {
//     '--animation-delay': animationDelay,
//   } as React.CSSProperties;

//   return (
//     <div className="relative group">
//       <button
//         onClick={onClick}
//         aria-label={ariaLabel}
//         type="button"
//         style={buttonStyle} // Apply the style with CSS custom property
//         className={`relative z-10 flex items-center rounded-full p-2 bg-white border ${borderColorClass} ${
//           applyBaseShadow ? "shadow-lg" : ""
//         } transition-all duration-300 ease-in-out overflow-hidden group-hover:px-4 group-hover:border-none focus:outline-none cursor-pointer ${hoverButtonBgClass} ${buttonSpecificAnimationClass}`}
//       >
//         <span className={`flex-shrink-0 ${iconColorClass}`}>{icon}</span>
//         <span
//           className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden max-w-0 opacity-0 ml-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 ${initialTextColorClass} ${hoverTextColorClass}`}
//         >
//           {textOnHover}
//         </span>
//       </button>
//       <style jsx>{`
//         /* WhatsApp Button Animation */
//         @keyframes pulse_whatsapp_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
//           }
//         }
//         .animate-pulse-whatsapp-fab {
//           animation: pulse_whatsapp_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay); /* Use CSS custom property */
//         }

//         /* Message Button Animation */
//         @keyframes pulse_message_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(0, 152, 233, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
//           }
//         }
//         .animate-pulse-message-fab {
//           animation: pulse_message_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay); /* Use CSS custom property */
//         }

//         /* Phone Button Animation */
//         @keyframes pulse_phone_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(114, 96, 256, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(114, 96, 256, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(114, 96, 256, 0);
//           }
//         }
//         .animate-pulse-phone-fab {
//           animation: pulse_phone_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay); /* Use CSS custom property */
//         }

//         /* Target class for hover-triggered phone animation (if used) */
//         .group:hover .phone-hover-animation-target {
//           /* Example: animation: pulse_phone_fab_kf 1.5s ease-out infinite; */
//           /* animation-delay: var(--animation-delay); */ /* Also apply delay if used */
//         }
//       `}</style>
//     </div>
//   );
// };

// const FloatingActionButtons: React.FC = () => {
//   const handleWhatsAppClick = () => {
//     console.log("WhatsApp clicked: +91 9779816382");
//     // window.open('https://wa.me/919779816382', '_blank');
//   };

//   const handleMessagesClick = () => {
//     console.log("Messages clicked: Chat with us");
//   };

//   const handlePhoneClick = () => {
//     console.log("Phone clicked: Call support");
//     // window.location.href = 'tel:+1234567890';
//   };

//   const iconSize = "h-6 w-6";

//   return (
//     <div className="fixed bottom-6 right-6 flex flex-col items-end gap-6 z-30">
//       <FloatingButton
//         onClick={handleWhatsAppClick}
//         icon={<IoLogoWhatsapp className={iconSize} />}
//         textOnHover="+91 9779816382"
//         iconColorClass="text-green-500"
//         borderColorClass="border-green-500" // Custom border color
//         ariaLabel="Contact on WhatsApp"
//         animationConfig={{ type: "whatsapp", trigger: "always" }}
//         animationDelay="0s" // First button, no delay
//       />
//       <FloatingButton
//         onClick={handleMessagesClick}
//         icon={<BsChatDots className={iconSize} />}
//         textOnHover="Chat with us"
//         iconColorClass="text-blue-500"
//         borderColorClass="border-blue-500" // Custom border color
//         ariaLabel="Send a message"
//         animationConfig={{ type: "message", trigger: "always" }}
//         animationDelay="0.3s" // Second button, 0.3s delay
//       />
//       <FloatingButton
//         onClick={handlePhoneClick}
//         icon={<IoCall className={iconSize} />}
//         textOnHover="Call support"
//         iconColorClass="text-purple-500"
//         borderColorClass="border-purple-500" // Custom border color
//         ariaLabel="Call us"
//         animationConfig={{ type: "phone", trigger: "always" }}
//         animationDelay="0.6s" // Third button, 0.6s delay
//       />
//     </div>
//   );
// };

// export default FloatingActionButtons;



// // src/components/FloatingActionButtons.tsx
// import React, { useCallback } from "react"; // Added useCallback
// import { IoLogoWhatsapp, IoCall } from "react-icons/io5";
// import { BsChatDots } from "react-icons/bs";

// interface FloatingButtonProps {
//   onClick: () => void;
//   icon: React.ReactNode;
//   textOnHover: string;
//   iconColorClass: string;
//   borderColorClass?: string;
//   initialTextColorClass?: string;
//   hoverTextColorClass?: string;
//   hoverButtonBgClass?: string;
//   ariaLabel: string;
//   animationConfig?: {
//     type: "whatsapp" | "message" | "phone";
//     trigger: "always" | "on-hover";
//   };
//   animationDelay?: string; // New prop for animation delay
// }

// const FloatingButton: React.FC<FloatingButtonProps> = ({
//   onClick,
//   icon,
//   textOnHover,
//   iconColorClass,
//   initialTextColorClass = "text-white",
//   borderColorClass = "border-gray-300",
//   hoverTextColorClass = "group-hover:text-white",
//   hoverButtonBgClass = "group-hover:bg-black",
//   ariaLabel,
//   animationConfig,
//   animationDelay = "0s",
// }) => {
//   let buttonSpecificAnimationClass = "";

//   if (animationConfig) {
//     if (animationConfig.trigger === "always") {
//       if (animationConfig.type === "whatsapp") {
//         buttonSpecificAnimationClass = "animate-pulse-whatsapp-fab";
//       } else if (animationConfig.type === "message") {
//         buttonSpecificAnimationClass = "animate-pulse-message-fab";
//       } else if (animationConfig.type === "phone") {
//         buttonSpecificAnimationClass = "animate-pulse-phone-fab";
//       }
//     } else if (animationConfig.trigger === "on-hover") {
//       if (animationConfig.type === "phone") {
//         buttonSpecificAnimationClass = "phone-hover-animation-target";
//       }
//     }
//   }

//   const applyBaseShadow = !(
//     animationConfig && animationConfig.trigger === "always"
//   );

//   const buttonStyle = {
//     '--animation-delay': animationDelay,
//   } as React.CSSProperties;

//   return (
//     <div className="relative group">
//       <button
//         onClick={onClick}
//         aria-label={ariaLabel}
//         type="button"
//         style={buttonStyle}
//         className={`relative z-10 flex items-center rounded-full p-2 bg-white border ${borderColorClass} ${
//           applyBaseShadow ? "shadow-lg" : ""
//         } transition-all duration-300 ease-in-out overflow-hidden group-hover:px-4 group-hover:border-none focus:outline-none cursor-pointer ${hoverButtonBgClass} ${buttonSpecificAnimationClass}`}
//       >
//         <span className={`flex-shrink-0 ${iconColorClass}`}>{icon}</span>
//         <span
//           className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden max-w-0 opacity-0 ml-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 ${initialTextColorClass} ${hoverTextColorClass}`}
//         >
//           {textOnHover}
//         </span>
//       </button>
//       <style jsx>{`
//         /* WhatsApp Button Animation */
//         @keyframes pulse_whatsapp_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
//           }
//         }
//         .animate-pulse-whatsapp-fab {
//           animation: pulse_whatsapp_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay);
//         }

//         /* Message Button Animation */
//         @keyframes pulse_message_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(0, 152, 233, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
//           }
//         }
//         .animate-pulse-message-fab {
//           animation: pulse_message_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay);
//         }

//         /* Phone Button Animation */
//         @keyframes pulse_phone_fab_kf {
//           0% {
//             box-shadow: 0 0 0 0 rgba(114, 96, 256, 0.5);
//           }
//           80% {
//             box-shadow: 0 0 0 14px rgba(114, 96, 256, 0);
//           }
//           100% {
//             box-shadow: 0 0 0 14px rgba(114, 96, 256, 0);
//           }
//         }
//         .animate-pulse-phone-fab {
//           animation: pulse_phone_fab_kf 1.5s ease-out infinite;
//           animation-delay: var(--animation-delay);
//         }

//         .group:hover .phone-hover-animation-target {
//           /* Example animation for hover */
//         }
//       `}</style>
//     </div>
//   );
// };


// const FloatingActionButtons: React.FC = () => {
//   const handleWhatsAppClick = () => {
//     console.log("WhatsApp clicked: +91 9779816382");
//     // window.open('https://wa.me/919779816382', '_blank');
//   };

//   const handleMessagesClick = useCallback(() => {
//     console.log("Messages FAB clicked: Attempting to open Tawk.to chat");
//     if (typeof window !== 'undefined' && window.Tawk_API) {
//       if (typeof window.Tawk_API.maximize === 'function') {
//         window.Tawk_API.maximize();
//       } else if (typeof window.Tawk_API.toggle === 'function') {
//         // Fallback to toggle if maximize is not available for some reason
//         window.Tawk_API.toggle();
//       } else {
//         console.warn("Tawk_API.maximize() or Tawk_API.toggle() is not available.");
//       }
//     } else {
//       console.warn("Tawk_API is not initialized or not available on window. Cannot open chat.");
//     }
//   }, []);

//   const handlePhoneClick = () => {
//     console.log("Phone clicked: Call support");
//     // window.location.href = 'tel:+1234567890';
//   };

//   const iconSize = "h-6 w-6";

//   return (
//     <div className="fixed bottom-6 right-6 flex flex-col items-end gap-6 z-30">
//       <FloatingButton
//         onClick={handleWhatsAppClick}
//         icon={<IoLogoWhatsapp className={iconSize} />}
//         textOnHover="+91 9779816382"
//         iconColorClass="text-green-500"
//         borderColorClass="border-green-500"
//         ariaLabel="Contact on WhatsApp"
//         animationConfig={{ type: "whatsapp", trigger: "always" }}
//         animationDelay="0s"
//       />
//       <FloatingButton
//         onClick={handleMessagesClick} // Updated handler
//         icon={<BsChatDots className={iconSize} />}
//         textOnHover="Chat with us"
//         iconColorClass="text-blue-500"
//         borderColorClass="border-blue-500"
//         ariaLabel="Chat with us via Tawk.to" // More specific aria-label
//         animationConfig={{ type: "message", trigger: "always" }}
//         animationDelay="0.3s"
//       />
//       <FloatingButton
//         onClick={handlePhoneClick}
//         icon={<IoCall className={iconSize} />}
//         textOnHover="Call support"
//         iconColorClass="text-purple-500"
//         borderColorClass="border-purple-500"
//         ariaLabel="Call us"
//         animationConfig={{ type: "phone", trigger: "always" }}
//         animationDelay="0.6s"
//       />
//     </div>
//   );
// };

// export default FloatingActionButtons;


// src/components/FloatingActionButtons.tsx
import React, { useCallback } from "react";
import { IoLogoWhatsapp } from "react-icons/io5"; // IoCall removed
import { BsChatDots } from "react-icons/bs";

interface FloatingButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  textOnHover: string;
  iconColorClass: string;
  borderColorClass?: string;
  initialTextColorClass?: string;
  hoverTextColorClass?: string;
  hoverButtonBgClass?: string;
  ariaLabel: string;
  animationConfig?: {
    type: "whatsapp" | "message"; // "phone" type removed from animationConfig
    trigger: "always" | "on-hover";
  };
  animationDelay?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  icon,
  textOnHover,
  iconColorClass,
  initialTextColorClass = "text-white",
  borderColorClass = "border-gray-300",
  hoverTextColorClass = "group-hover:text-white",
  hoverButtonBgClass = "group-hover:bg-black",
  ariaLabel,
  animationConfig,
  animationDelay = "0s",
}) => {
  let buttonSpecificAnimationClass = "";

  if (animationConfig) {
    if (animationConfig.trigger === "always") {
      if (animationConfig.type === "whatsapp") {
        buttonSpecificAnimationClass = "animate-pulse-whatsapp-fab";
      } else if (animationConfig.type === "message") {
        buttonSpecificAnimationClass = "animate-pulse-message-fab";
      }
      // Removed phone animation type handling
    }
    // Removed phone hover animation handling
  }

  const applyBaseShadow = !(
    animationConfig && animationConfig.trigger === "always"
  );

  const buttonStyle = {
    '--animation-delay': animationDelay,
  } as React.CSSProperties;

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        type="button"
        style={buttonStyle}
        className={`relative z-10 flex items-center rounded-full p-2 bg-white border ${borderColorClass} ${
          applyBaseShadow ? "shadow-lg" : ""
        } transition-all duration-300 ease-in-out overflow-hidden group-hover:px-4 group-hover:border-transparent focus:outline-none cursor-pointer ${hoverButtonBgClass} ${buttonSpecificAnimationClass}`}
      >
        <span className={`flex-shrink-0 ${iconColorClass}`}>{icon}</span>
        <span
          className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden max-w-0 opacity-0 ml-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 ${initialTextColorClass} ${hoverTextColorClass}`}
        >
          {textOnHover}
        </span>
      </button>
      <style jsx>{`
        /* WhatsApp Button Animation */
        @keyframes pulse_whatsapp_fab_kf {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
          }
          80% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
          }
        }
        .animate-pulse-whatsapp-fab {
          animation: pulse_whatsapp_fab_kf 1.5s ease-out infinite;
          animation-delay: var(--animation-delay);
        }

        /* Message Button Animation */
        @keyframes pulse_message_fab_kf {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 152, 233, 0.5);
          }
          80% {
            box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
          }
          100% {
            box-shadow: 0 0 0 14px rgba(0, 152, 233, 0);
          }
        }
        .animate-pulse-message-fab {
          animation: pulse_message_fab_kf 1.5s ease-out infinite;
          animation-delay: var(--animation-delay);
        }

        /* Phone Button Animation Removed */
        /* @keyframes pulse_phone_fab_kf { ... } */
        /* .animate-pulse-phone-fab { ... } */

        /* Target class for hover-triggered phone animation (if used) */
        /* .group:hover .phone-hover-animation-target { ... } */
      `}</style>
    </div>
  );
};

const FloatingActionButtons: React.FC = () => {
  const handleWhatsAppClick = () => {
    console.log("WhatsApp clicked: +91 9265348797");
    window.open('https://wa.me/919265348797', '_blank');
  };

  const handleMessagesClick = useCallback(() => {
    console.log("Messages FAB clicked: Attempting to open Tawk.to chat");
    if (typeof window !== 'undefined' && window.Tawk_API) {
      if (typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize();
      } else if (typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle();
      } else {
        console.warn("Tawk_API.maximize() or Tawk_API.toggle() is not available.");
      }
    } else {
      console.warn("Tawk_API is not initialized or not available on window. Cannot open chat.");
    }
  }, []);

  // handlePhoneClick removed
  // const handlePhoneClick = () => {
  //   console.log("Phone clicked: Call support");
  //   // window.location.href = 'tel:+1234567890';
  // };

  const iconSize = "h-6 w-6";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-6 z-30">
      <FloatingButton
        onClick={handleWhatsAppClick}
        icon={<IoLogoWhatsapp className={iconSize} />}
        textOnHover="+91 9779816382"
        iconColorClass="text-green-500"
        borderColorClass="border-green-500"
        ariaLabel="Contact on WhatsApp"
        animationConfig={{ type: "whatsapp", trigger: "always" }}
        animationDelay="0s"
      />
      <FloatingButton
        onClick={handleMessagesClick}
        icon={<BsChatDots className={iconSize} />}
        textOnHover="Chat with us"
        iconColorClass="text-blue-500"
        borderColorClass="border-blue-500"
        ariaLabel="Chat with us via Tawk.to"
        animationConfig={{ type: "message", trigger: "always" }}
        animationDelay="0.3s" // This delay is fine, it will now be the last button
      />
      {/* FloatingButton for Phone removed */}
      {/*
      <FloatingButton
        onClick={handlePhoneClick}
        icon={<IoCall className={iconSize} />}
        textOnHover="Call support"
        iconColorClass="text-purple-500"
        borderColorClass="border-purple-500"
        ariaLabel="Call us"
        animationConfig={{ type: "phone", trigger: "always" }}
        animationDelay="0.6s"
      />
      */}
    </div>
  );
};

export default FloatingActionButtons;