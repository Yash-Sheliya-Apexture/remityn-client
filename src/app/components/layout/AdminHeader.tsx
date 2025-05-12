// // frontend/src/components/layout/AdminHeader.tsx
"use client";

import React from "react";
import UserProfile from "@/app/components/UserProfile";
import { UserProfileProps } from "@/app/components/UserProfile";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const adminUserProfileProps: UserProfileProps = {
    userName: "Rudra Sutariya",
    profileImageUrl: "/assets/images/Char.jpg",
  };

  return (
    <header className="bg-white dark:bg-background border-b sticky top-0 z-10">
      {/* Subtle shadow and border */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          {/* <button
            onClick={toggleSidebar}
            className="lg:hidden text-primary hover:text-primaryhover transition-all duration-75 ease-linear focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button> */}

          {/* Close button remains the same */}
          <button onClick={toggleSidebar} className="size-12 lg:hidden bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear">
              <span className="text-neutral-900 dark:text-primary">
                <FaBars size={28} />
              </span>
          </button>

          <div className="hidden lg:block">
            {/* You can add header content here if needed for larger screens */}
          </div>
          {/* User Profile Component */}
          <UserProfile {...adminUserProfileProps} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

// frontend/src/app/components/layout/AdminHeader.tsx
// "use client";

// import React from "react";
// import { FaBars } from "react-icons/fa";

// interface AdminHeaderProps {
//   toggleSidebar: () => void;
// }

// const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
//   return (
//     <header className="bg-gray-100 dark:bg-gray-800 border-b p-4 flex justify-between items-center">
//       <div>
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
//         >
//           <FaBars className="h-6 w-6" />
//         </button>
//       </div>
//       <div>
//         {/* Header Content (e.g., user info, notifications) */}
//         <p className="text-gray-700 dark:text-gray-300">Admin Header</p>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;
