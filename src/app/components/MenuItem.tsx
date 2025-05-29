//MenuCards

// import React from "react";
// import { GoChevronRight } from "react-icons/go";

// type MenuItemProps = {
//   icon: React.ReactNode;
//   label: string;
//   hasChevron?: boolean;
//   description?: string;
//   badge?: number;
//   onClick?: () => void; // Add an optional onClick handler
// };

// const MenuItem: React.FC<MenuItemProps> = ({
//   icon,
//   label,
//   hasChevron = true,
//   description,
//   badge,
//   onClick, // Destructure the onClick prop
// }) => {
//   return (
//     <div
//       className="flex items-center p-4 hover:bg-green/10 rounded-xl gap-4 cursor-pointer group"
//       onClick={onClick} // Add the onClick handler to the div
//     >
//       <div className="bg-green/6 p-3 rounded-full">{icon}</div>
//       <div className="flex-grow">
//         <div className="font-medium leading-relaxed lg:text-xl">{label}</div>
//         {description && (
//           <div className="text-sm text-gray-500">{description}</div>
//         )}
//       </div>

//       {hasChevron && (
//         <GoChevronRight className="size-6 text-gray group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//       )}
//     </div>
//   );
// };

// export default MenuItem;

// import React from "react";
// import { GoChevronRight } from "react-icons/go";
// import Link from "next/link"; // Import Link from next/link

// type MenuItemProps = {
//   icon: React.ReactNode;
//   label: string;
//   hasChevron?: boolean;
//   description?: string;
//   onClick?: () => void;
//   href?: string; // Optional href prop for links
// };

// const MenuItem: React.FC<MenuItemProps> = ({
//   icon,
//   label,
//   hasChevron = true,
//   description,
//   onClick,
//   href, // Destructure the href prop
// }) => {
//   const menuItemContent = (
//     <div className="flex items-center gap-4 hover:bg-lightgray dark:hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
//       <div className="bg-lightborder dark:bg-secondarybox p-3 rounded-full">
//         {icon}
//       </div>
//       <div className="flex-grow">
//         <div className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-xl">
//           {label}
//         </div>
//         {description && (
//           <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//             {description}
//           </div>
//         )}
//       </div>

//       {hasChevron && (
//         <div className="ml-4">
//           <GoChevronRight size={24} className="text-neutral-900 dark:text-white group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
//         </div>
//       )}
//     </div>
//   );

//   if (href) {
//     // If href prop is provided, render MenuItem as a Link
//     return (
//       <div>
//         <Link href={href} passHref>
//           {/* Wrap the menuItemContent with an <a> tag from Link */}
//           {menuItemContent}
//         </Link>
//       </div>
//     );
//   } else {
//     // If no href prop, render as a div with onClick handler if provided
//     return <div onClick={onClick}>{menuItemContent}</div>;
//   }
// };

// export default MenuItem;



// components/MenuItem.tsx
import React from "react";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  hasChevron?: boolean;
  description?: string;
  onClick?: () => void;
  href?: string;
  hasNotificationDot?: boolean; // --- New prop ---
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  hasChevron = true,
  description,
  onClick,
  href,
  hasNotificationDot = false, // --- Default to false ---
}) => {
  const menuItemContent = (
    <div className="flex items-center gap-4 hover:bg-primarybox p-2 sm:p-4 rounded-2xl transition-all duration-75 ease-linear cursor-pointer group">
      <div className="bg-[#52636c] p-3 rounded-full relative">
        {icon}
        {hasNotificationDot && (
            // <span className="ml-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            <span
              className="absolute top-1 right-1 block h-3 w-3 transform translate-x-1/4 -translate-y-1/4 rounded-full bg-red-700 ring-2 ring-background group-hover:ring-primarybox"
              aria-label="New notifications"
            />
          )}
      </div>
      <div className="flex-grow">
        <div className="flex items-center font-medium leading-relaxed text-white/90 sm:text-xl">
          {label}
        </div>
        {description && (
          <div className="text-sm text-subheadingWhite mt-1">
            {description}
          </div>
        )}
      </div>

      {hasChevron && (
        <div className="ml-4">
          <GoChevronRight size={24} className="text-white/90 group-hover:translate-x-2.5 font-medium transition-transform ease-in-out duration-300" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <div>
        <Link href={href} passHref>
          {menuItemContent}
        </Link>
      </div>
    );
  } else {
    return <div onClick={onClick}>{menuItemContent}</div>;
  }
};

export default MenuItem;