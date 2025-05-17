// (This would typically be in its own file like src/app/components/CustomToast.tsx)
import React from 'react';
import { BellDot, X } from 'lucide-react'; // Using BellDot as a generic notification icon

// Define the props for our custom toast
interface CustomToastProps {
  closeToast?: () => void; // Injected by react-toastify
  message: string;
  // 'type' prop is no longer strictly needed for styling if all are the same,
  // but can be kept for semantic purposes or if you might differentiate icons later.
  type?: 'success' | 'error' | 'info' | 'warning' | 'default'; // Added 'default'
}

const CustomToast: React.FC<CustomToastProps> = ({ closeToast, message, type = 'default' }) => {
  // Define your single color scheme here using Tailwind CSS classes
  const iconColorClass = 'text-blue-500 dark:text-blue-400'; // Example: Blue icon
  const bgColorClass = 'bg-blue-50 dark:bg-blue-800';       // Example: Light blue background
  const textColorClass = 'text-blue-700 dark:text-blue-300'; // Example: Darker blue text
  const borderColorClass = 'border-blue-400 dark:border-blue-600'; // Example: Blue border

  // You can optionally still change the icon based on type if desired,
  // even if the colors are the same. For full uniformity, use one icon.
  let IconComponent = BellDot; // Default generic icon

  // Example: If you still want different icons but same color scheme
  // switch (type) {
  //   case 'success':
  //     IconComponent = CheckCircle;
  //     break;
  //   case 'error':
  //     IconComponent = XCircle;
  //     break;
  //   case 'info':
  //     IconComponent = LucideInfoIcon;
  //     break;
  //   case 'warning':
  //     IconComponent = AlertTriangle;
  //     break;
  //   default:
  //     IconComponent = BellDot;
  // }


  return (
    <div
      className={`flex items-start p-4 rounded-md shadow-lg w-full max-w-md border-l-4 ${bgColorClass} ${borderColorClass}`}
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
              className={`inline-flex rounded-md p-1.5 ${textColorClass} hover:bg-opacity-20 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-800 focus:ring-blue-600`}
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
// End of CustomToast component definition