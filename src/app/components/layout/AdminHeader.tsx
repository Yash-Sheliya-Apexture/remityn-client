// // frontend/src/components/layout/AdminHeader.tsx
"use client";

import React from "react";
import UserProfile from "@/app/components/UserProfile";
import { UserProfileProps } from "@/app/components/UserProfile";
import { FaBars } from "react-icons/fa";
import { TbMenu3 } from "react-icons/tb";

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const adminUserProfileProps: UserProfileProps = {
    userName: "Rudra Sutariya",
    profileImageUrl: "/assets/images/users.jpg",
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      {/* Subtle shadow and border */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button onClick={toggleSidebar} className="p-2 lg:hidden cursor-pointer bg-primarybox hover:bg-secondarybox flex items-center justify-center rounded-full transition-all duration-75 ease-linear">
              <span className="text-primary">
                <TbMenu3 size={28} />
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