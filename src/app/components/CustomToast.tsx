// // frontend/src/app/components/CustomToast.tsx
// import React from 'react';
// import {
//     X,
//     BellDot,
//     CheckCircle,
//     XCircle,
//     InfoIcon as LucideInfoIcon, // Renamed to avoid conflict
//     AlertTriangle,
// } from 'lucide-react';

// export interface CustomToastProps {
//   closeToast?: () => void;
//   message: string;
//   type?: 'success' | 'error' | 'info' | 'warning' | 'default';
// }

// const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
//   let IconComponent: React.ElementType = BellDot;
//   let iconColorClass = 'text-neutral-900 dark:text-white';
//   let bgColorClass = 'bg-lightgray dark:bg-[#2d2d2d]';
//   let textColorClass = 'text-neutral-900 dark:text-white';
//   let borderColorClass = 'border-primary dark:border-primary';
//   let closeButtonHoverBgClass = 'hover:bg-gray-100 dark:hover:bg-gray-700';
//   let closeButtonFocusRingClass = 'focus:ring-gray-600 dark:focus:ring-offset-gray-800';


//   switch (type) {
//     case 'success':
//       IconComponent = CheckCircle;
//       iconColorClass = 'text-green-500 dark:text-green-400';
//       bgColorClass = 'bg-green-50 dark:bg-green-900/30'; // Slightly more opaque dark bg
//       textColorClass = 'text-green-700 dark:text-green-300';
//       borderColorClass = 'border-green-500 dark:border-green-400';
//       closeButtonHoverBgClass = 'hover:bg-green-100 dark:hover:bg-green-800';
//       closeButtonFocusRingClass = 'focus:ring-green-600 dark:focus:ring-offset-green-900';
//       break;
//     case 'error':
//       IconComponent = XCircle;
//       iconColorClass = 'text-red-500 dark:text-red-400';
//       bgColorClass = 'bg-red-50 dark:bg-red-900/30';
//       textColorClass = 'text-red-700 dark:text-red-300';
//       borderColorClass = 'border-red-500 dark:border-red-400';
//       closeButtonHoverBgClass = 'hover:bg-red-100 dark:hover:bg-red-800';
//       closeButtonFocusRingClass = 'focus:ring-red-600 dark:focus:ring-offset-red-900';
//       break;
//     case 'info':
//       IconComponent = LucideInfoIcon;
//       iconColorClass = 'text-blue-500 dark:text-blue-400';
//       bgColorClass = 'bg-blue-50 dark:bg-blue-900/30';
//       textColorClass = 'text-blue-700 dark:text-blue-300';
//       borderColorClass = 'border-blue-500 dark:border-blue-400';
//       closeButtonHoverBgClass = 'hover:bg-blue-100 dark:hover:bg-blue-800';
//       closeButtonFocusRingClass = 'focus:ring-blue-600 dark:focus:ring-offset-blue-900';
//       break;
//     case 'warning':
//       IconComponent = AlertTriangle;
//       iconColorClass = 'text-yellow-500 dark:text-yellow-400';
//       bgColorClass = 'bg-yellow-50 dark:bg-yellow-900/30';
//       textColorClass = 'text-yellow-700 dark:text-yellow-300';
//       borderColorClass = 'border-yellow-500 dark:border-yellow-400';
//       closeButtonHoverBgClass = 'hover:bg-yellow-100 dark:hover:bg-yellow-800';
//       closeButtonFocusRingClass = 'focus:ring-yellow-600 dark:focus:ring-offset-yellow-900';
//       break;
//     case 'default':
//     default:
//       // Default styles are already set
//       // For a more distinct default, you could use specific colors here too
//       // e.g., gray or a neutral theme color
//       iconColorClass = 'text-gray-500 dark:text-gray-400';
//       bgColorClass = 'bg-gray-50 dark:bg-gray-700/30';
//       textColorClass = 'text-gray-700 dark:text-gray-300';
//       borderColorClass = 'border-gray-400 dark:border-gray-500';
//       break;
//   }

//   return (
//     <div
//       className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md mx-auto ${bgColorClass} ${borderColorClass} border`}
//       role="alert"
//     >
//       <div className="flex-shrink-0 pt-0.5">
//         <IconComponent className={`h-6 w-6 ${iconColorClass}`} aria-hidden="true" />
//       </div>
//       <div className="ml-3 flex-1">
//         <p className={`text-sm font-medium ${textColorClass}`}>
//           {message}
//         </p>
//       </div>
//       {closeToast && (
//         <div className="ml-auto pl-3">
//           <div className="-mx-1.5 -my-1.5">
//             <button
//               type="button"
//               onClick={closeToast}
//               className={`inline-flex rounded-md p-1.5 ${textColorClass} ${closeButtonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-offset-2 ${closeButtonFocusRingClass} transition-colors duration-150 ease-in-out`}
//             >
//               <span className="sr-only">Dismiss</span>
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomToast;



// // frontend/src/app/components/CustomToast.tsx
// import React from 'react';
// import {
//     X,
//     BellDot,
//     CheckCircle,
//     XCircle,
//     InfoIcon as LucideInfoIcon, // Renamed to avoid conflict
//     AlertTriangle,
// } from 'lucide-react';

// export interface CustomToastProps {
//   closeToast?: () => void;
//   message: string;
//   type?: 'success' | 'error' | 'info' | 'warning' | 'default';
// }

// const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
//   // --- Fixed styles as per your request ---
//   const bgColorClass = 'bg-lightgray dark:bg-[#2d2d2d]';
//   const textColorClass = 'text-neutral-900 dark:text-white';
//   const borderColorClass = ''; // Still this style empty
//   const closeButtonHoverBgClass = ''; // Still this style empty
//   const closeButtonFocusRingClass = ''; // Still this style empty

//   // --- Icon and icon color will still change based on type ---
//   let IconComponent: React.ElementType = BellDot;
//   let iconColorClass = 'text-neutral-900 dark:text-white'; // Default icon color, can be overridden by type

//   switch (type) {
//     case 'success':
//       IconComponent = CheckCircle;
//       iconColorClass = 'text-green-500 dark:text-green-400';
//       // bgColorClass, textColorClass, borderColorClass, etc., remain fixed
//       break;
//     case 'error':
//       IconComponent = XCircle;
//       iconColorClass = 'text-red-500 dark:text-red-400';
//       // bgColorClass, textColorClass, borderColorClass, etc., remain fixed
//       break;
//     case 'info':
//       IconComponent = LucideInfoIcon;
//       iconColorClass = 'text-blue-500 dark:text-blue-400';
//       // bgColorClass, textColorClass, borderColorClass, etc., remain fixed
//       break;
//     case 'warning':
//       IconComponent = AlertTriangle;
//       iconColorClass = 'text-yellow-500 dark:text-yellow-400';
//       // bgColorClass, textColorClass, borderColorClass, etc., remain fixed
//       break;
//     case 'default':
//     default:
//       IconComponent = BellDot; // Explicitly set default icon
//       iconColorClass = 'text-gray-500 dark:text-gray-400'; // Default icon color if you want it different from text
//       // bgColorClass, textColorClass, borderColorClass, etc., remain fixed
//       break;
//   }

//   return (
//     <div
//       className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md mx-auto ${bgColorClass} ${borderColorClass} `}
//       role="alert"
//     >
//       <div className="flex-shrink-0 pt-0.5">
//         <IconComponent className={`h-6 w-6 ${iconColorClass}`} aria-hidden="true" />
//       </div>
//       <div className="ml-3 flex-1">
//         {/* Text color for the message will use the fixed textColorClass */}
//         <p className={`text-sm font-medium ${textColorClass}`}>
//           {message}
//         </p>
//       </div>
//       {closeToast && (
//         <div className="ml-auto pl-3">
//           <div className="-mx-1.5 -my-1.5">
//             <button
//               type="button"
//               onClick={closeToast}
//               // Text color for the X icon inside the button also uses the fixed textColorClass
//               // Hover and focus classes are also the fixed ones
//               className={`inline-flex rounded-md p-1.5 ${textColorClass} ${closeButtonHoverBgClass} focus:outline-none ${closeButtonFocusRingClass} transition-all duration-75 ease-linear cursor-pointer`}
//             >
//               <span className="sr-only">Dismiss</span>
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomToast;

// new latest code
// frontend/src/app/components/CustomToast.tsx
import React from 'react';
import {
    X,
    BellDot,
    CheckCircle,
    XCircle,
    InfoIcon as LucideInfoIcon, // Renamed to avoid conflict
    AlertTriangle,
} from 'lucide-react';

export interface CustomToastProps {
  closeToast?: () => void;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'default';
}

const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
  // --- Fixed styles as per your request ---
  const bgColorClass = 'bg-primarybox';
  const textColorClass = 'text-mainheadingWhite';
  const borderColorClass = ''; // Still this style empty
  const closeButtonHoverBgClass = ''; // Still this style empty
  const closeButtonFocusRingClass = ''; // Still this style empty

  // --- Icon and icon color will still change based on type ---
  let IconComponent: React.ElementType = BellDot;
  let iconColorClass = 'text-white/90'; // Default icon color, can be overridden by type

  switch (type) {
    case 'success':
      IconComponent = CheckCircle;
      iconColorClass = 'text-green-400';
      break;
    case 'error':
      IconComponent = XCircle;
      iconColorClass = 'text-red-400';
      break;
    case 'info':
      IconComponent = LucideInfoIcon;
      iconColorClass = 'text-blue-400';
      break;
    case 'warning':
      IconComponent = AlertTriangle;
      iconColorClass = 'text-yellow-400';
      break;
    case 'default':
    default:
      IconComponent = BellDot; // Explicitly set default icon
      iconColorClass = 'text-subheadingWhite'; // Default icon color if you want it different from text
      break;
  }

  return (
    <div
      className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md mx-auto ${bgColorClass} ${borderColorClass} `}
      role="alert"
    >
      <div className="flex-shrink-0 pt-0.5">
        <IconComponent className={`h-6 w-6 ${iconColorClass}`} aria-hidden="true" />
      </div>
      <div className="ml-3 flex-1">
        <p className={`text-sm font-medium ${textColorClass}`}>
          {message}
        </p>
      </div>
      {closeToast && (
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={closeToast}
              className={`inline-flex rounded-md p-1.5 ${textColorClass} ${closeButtonHoverBgClass} focus:outline-none ${closeButtonFocusRingClass} transition-all duration-75 ease-linear cursor-pointer`}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomToast;