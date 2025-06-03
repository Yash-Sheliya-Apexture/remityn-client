// // frontend/src/components/UserProfileCombined.tsx
// "use client";

// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaCog } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";

// export interface UserProfileProps {
//   userName: string;
//   profileImageUrl: string;
// }

// interface UserProfileDropdownMenuProps {
//   onClose: () => void;
// }

// const UserProfileDropdownMenu: React.FC<UserProfileDropdownMenuProps> = ({
//   onClose,
// }) => {
//   const menuItems = [
//     {
//       text: "Profile",
//       icon: <IoPersonOutline className="size-5" />,
//       action: () => {
//         console.log("Profile Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Settings",
//       icon: <FaCog className="size-5" />,
//       action: () => {
//         console.log("Settings Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Logout",
//       icon: <BiLogOut className="size-5" />,
//       action: () => {
//         console.log("Logout Clicked");
//         onClose();
//       },
//     },
//   ];

//   return (
//     <div
//       className="absolute mt-3 right-0 w-52 z-10 border rounded-xl shadow-md origin-top-right bg-white dark:bg-background "
//       style={{ transformOrigin: "top right" }}
//     >
//       <div className="p-2 mt-1">
//         <ul
//           className="space-y-2"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//         >
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightgray dark:hover:bg-primarybox rounded-md transition-all duration-75 ease-linear cursor-pointer"
//               role="menuitem"
//               onClick={item.action}
//             >
//               {item.icon}
//               <span>{item.text}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const UserProfile: React.FC<UserProfileProps> = ({
//   userName,
//   profileImageUrl,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         closeDropdown();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div className="flex items-center space-x-5 cursor-pointer">
//         <div onClick={toggleDropdown}>
//           <Image
//             src={profileImageUrl}
//             alt={`${userName}'s Profile`}
//             width={100}
//             height={100}
//             className="lg:size-14 size-10 rounded-full object-cover"
//             onError={(e) => {
//               e.currentTarget.onerror = null;
//               e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
//             }}
//           />
//         </div>
//       </div>

//       {/* Dropdown Menu Component */}
//       {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
//     </div>
//   );
// };

// export default UserProfile;

// // frontend/src/components/UserProfileCombined.tsx
// "use client";

// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { FaCog } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// export interface UserProfileProps {
//   userName: string;
//   profileImageUrl: string;
// }

// interface UserProfileDropdownMenuProps {
//   onClose: () => void;
// }

// const UserProfileDropdownMenu: React.FC<UserProfileDropdownMenuProps> = ({
//   onClose,
// }) => {
//   const menuItems = [
//     {
//       text: "Profile",
//       icon: <IoPersonOutline className="size-5" />,
//       action: () => {
//         console.log("Profile Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Settings",
//       icon: <FaCog className="size-5" />,
//       action: () => {
//         console.log("Settings Clicked");
//         onClose();
//       },
//     },
//     {
//       text: "Logout",
//       icon: <BiLogOut className="size-5" />,
//       action: () => {
//         console.log("Logout Clicked");
//         onClose();
//       },
//     },
//   ];

//   return (
//     // Use motion.div for the dropdown container
//     <motion.div
//       className="absolute mt-3 right-0 w-52 z-10 border rounded-xl shadow-md origin-top-right bg-white dark:bg-background "
//       style={{ transformOrigin: "top right" }} // Keep this style for the origin point
//       initial={{ opacity: 0, scale: 0.95 }} // Start state: slightly scaled down and transparent
//       animate={{ opacity: 1, scale: 1 }}     // End state: fully opaque and normal scale
//       exit={{ opacity: 0, scale: 0.95 }}       // Exit state: back to initial state
//       transition={{ duration: 0.15, ease: "easeOut" }} // Animation duration and easing
//     >
//       <div className="p-2 mt-1">
//         <ul
//           className="space-y-2"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//         >
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightgray dark:hover:bg-primarybox rounded-md transition-all duration-75 ease-linear cursor-pointer"
//               role="menuitem"
//               onClick={item.action}
//             >
//               {item.icon}
//               <span>{item.text}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// const UserProfile: React.FC<UserProfileProps> = ({
//   userName,
//   profileImageUrl,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         closeDropdown();
//       }
//     };

//     // Only add listener if dropdown is open
//     if (isDropdownOpen) {
//         document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup function
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]); // Re-run effect when isDropdownOpen changes

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* The clickable profile image */}
//       <div className="flex items-center space-x-5 cursor-pointer">
//         <div onClick={toggleDropdown}>
//           <Image
//             src={profileImageUrl}
//             alt={`${userName}'s Profile`}
//             width={100}
//             height={100}
//             className="lg:size-14 size-10 rounded-full object-cover"
//             onError={(e) => {
//               e.currentTarget.onerror = null;
//               e.currentTarget.src = "https://picsum.photos/200"; // Default placeholder
//             }}
//           />
//         </div>
//       </div>

//       {/* Wrap the conditional rendering with AnimatePresence */}
//       <AnimatePresence>
//         {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserProfile;

// frontend/src/components/UserProfileCombined.tsx
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext"; // <-- 1. Import useAuth (Adjust path if needed)
import { noConflict } from "lodash";

export interface UserProfileProps {
  userName: string;
  profileImageUrl: string;
}

interface UserProfileDropdownMenuProps {
  onClose: () => void;
}

const UserProfileDropdownMenu: React.FC<UserProfileDropdownMenuProps> = ({
  onClose,
}) => {
  // 2. Call useAuth to get the logout function
  const { logout } = useAuth();

  // 3. Define the logout handler function
  const handleLogout = async () => {
    // console.log("Logout Clicked"); // Optional: for debugging
    try {
      await logout(); // Call the logout function from the context
      onClose(); // Close the dropdown menu
      // Redirect to login page after successful logout
      window.location.href = "/auth/login"; // Or use Next.js router if preferred: router.push('/auth/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally: show an error message to the user
      onClose(); // Still close the dropdown on error
    }
  };

  const menuItems = [
    {
      text: "Profile",
      icon: <IoPersonOutline className="size-5" />,
      action: () => {
        // console.log("Profile Clicked");
        // Add navigation or modal logic for profile
        onClose();
      },
    },

    {
      text: "Settings",
      icon: <FaCog className="size-5" />,
      action: () => {
        // console.log("Settings Clicked");
        // Add navigation or modal logic for settings
        onClose();
      },
    },

    {
      text: "Logout",
      icon: <BiLogOut className="size-5" />,
      action: handleLogout, // <-- 4. Use the handleLogout function here
    },

  ];

  return (
    // Use motion.div for the dropdown container
    <motion.div
      className="absolute mt-6 right-0 w-52 z-50 border rounded-lg origin-top-right bg-background" // Increased z-index, adjusted dark mode colors slightly
      style={{ transformOrigin: "top right" }}
      initial={{ opacity: 0, scale: 0.95, y: -5 }} // Start slightly above and scaled down
      animate={{ opacity: 1, scale: 1, y: 0 }} // Animate to full opacity, scale, and position
      exit={{ opacity: 0, scale: 0.95, y: -5 }} // Exit animation
      transition={{ duration: 0.1, ease: "easeOut" }} // Faster animation
    >
      {/* Added padding around the list for better spacing */}
      <div className="p-2">
        <ul
          className="space-y-1.5" // Reduced space slightly if needed
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 px-3  py-2 text-sm font-medium rounded-3xl transition-all duration-75 ease-linear cursor-pointer ${
                item.text === "Logout"
                  ? "text-red-500 hover:bg-red-500/10" // Specific styling for logout
                  : "text-gray-300 hover:bg-primaryboxhover" // Standard item styling
              }`}
              role="menuitem"
              onClick={item.action}
            >
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  profileImageUrl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close if clicked outside the dropdown area
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up listener when closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Ensure cleanup on unmount
    };
  }, [isDropdownOpen]); // Dependency array ensures effect runs when isDropdownOpen changes

  return (
    <div className="relative" ref={dropdownRef}>
      {/* The clickable profile image */}
      {/* Removed outer div, applied click directly to Image container */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center rounded-full focus:outline-none cursor-pointer" // Added focus state for accessibility
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label="User menu"
      >
        <Image
          src={profileImageUrl}
          alt={`${userName}'s Profile`}
          width={48} // Standardized size
          height={48} // Standardized size
          className="rounded-full object-cover transition-all duration-75 ease-linear" // Added hover effect
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/images/default-avatar.png"; // Use a local default avatar
          }}
          priority // Consider if this image is high priority
        />

      </button>

      {/* Wrap the conditional rendering with AnimatePresence */}
      <AnimatePresence>
        {isDropdownOpen && <UserProfileDropdownMenu onClose={closeDropdown} />}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
