// // components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none lg:hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center hover:bg-green/8 p-1 rounded-full cursor-pointer gap-2 lg:mx-6 mx-0">
//             {/* user letter */}
//             <span className="size-11 bg-green/10 rounded-full flex items-center justify-center font-medium text-green uppercase">
//               rs
//             </span>
//             {isOnline && (
//               <div className="absolute top-1 left-9 lg:size-4 size-3.5 bg-[#a8200d] rounded-full border-2 border-white"></div>
//             )}

//             {/* User Name */}
//             <div className=" font-medium text-gray capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-gray me-2 hidden md:block" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none hidden sm:block lg:hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center hover:bg-green/8 p-1 rounded-full cursor-pointer gap-2 lg:mx-6 mx-0">
//             {/* user letter */}
//             <span className="size-11 bg-green/10 rounded-full flex items-center justify-center font-medium text-green uppercase">
//               rs
//             </span>
//             {isOnline && (
//               <div className="absolute top-1 left-9 lg:size-4 size-3.5 bg-[#a8200d] rounded-full border-2 border-white"></div>
//             )}

//             {/* User Name */}
//             <div className=" font-medium text-gray capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-gray me-2 hidden md:block" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React from "react";
// import { FiMenu, FiBell, FiUser } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // Hardcoded data (replace with your actual image path or URL)
//   const name = "rudra sutariya";
//   const isOnline = true;

//   return (
//     <header className="bg-white border-b  border-lightgray">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex gap-4 items-center">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none lg:hidden sm:block hidden"
//             >
//               <FiMenu size={24} />
//             </button>
//           </div>

//           {/* Profile Picture */}
//           <div className="relative flex items-center group border border-[#cbd8d9] hover:bg-primary/8 rounded-full cursor-pointer gap-1.5 lg:mx-12 mx-0">
//             {/* user letter */}
//             <span className="size-14 bg-primary/10 rounded-full flex items-center justify-center font-bold text-secondary uppercase">
//               rs
//             </span>

//             {/* User Name */}
//             <div className=" font-medium text-secondary capitalize hidden sm:block">
//               {name}
//             </div>

//             <FaAngleRight className="size-5 text-secondary me-3 hidden md:block group-hover:translate-x-2.5 transition-transform ease-in-out duration-300" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";
// import { useRouter, usePathname } from "next/navigation";
// import { HiArrowLeft } from "react-icons/hi";
// import Link from "next/link";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [showBackArrow, setShowBackArrow] = useState(false);
//   const name = "rudra sutariya";
//   const isOnline = true;

//   useEffect(() => {
//     // Determine if the back arrow should be shown
//     setShowBackArrow(pathname !== "/dashboard"); // Show back arrow if not on base dashboard route
//   }, [pathname]);

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <header className="bg-white">
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex justify-center gap-4">
//             {/* Menu button for conditionaly render sidebar below large screen */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none lg:hidden sm:block hidden"
//             >
//               <FiMenu size={24} />
//             </button>

//             {/* Back arrow button */}
//             {showBackArrow && (
//               <button
//                 onClick={handleBack}
//                 className="focus:outline-none p-4 bg-primary/10 rounded-full text-secondary"
//               >
//                 <HiArrowLeft className="size-5" />
//               </button>
//             )}
//           </div>

//           {/* Profile Picture */}
//           <Link href="/dashboard/your-account">
//             <div className="relative flex items-center group  border border-[#b8cddd] hover:bg-primary/8 rounded-full cursor-pointer gap-1.5">
//               {/* user letter */}
//               <span className="size-12 bg-primary/50 rounded-full flex items-center justify-center font-bold text-secondary capitalize">
//                 rs
//               </span>

//               {/* User Name */}
//               <div className="text-secondary capitalize hidden sm:block">
//                 {name}
//               </div>

//               <FaAngleRight className="size-5 text-secondary me-3 hidden md:block group-hover:translate-x-2.5 transition-transform ease-in-out duration-300" />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { useRouter, usePathname } from "next/navigation";
// import { HiArrowLeft } from "react-icons/hi";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext";
// import { IoIosArrowForward } from "react-icons/io";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// // Helper function to get initials from a full name
// const getInitials = (name: string | undefined): string => {
//   if (!name || typeof name !== "string" || name.trim() === "") {
//     return "?"; // Return a default if name is missing or empty
//   }
//   const nameParts = name
//     .trim()
//     .split(" ")
//     .filter((part) => part.length > 0);
//   if (nameParts.length === 0) {
//     return "?";
//   }
//   if (nameParts.length === 1) {
//     return nameParts[0][0].toUpperCase();
//   }
//   // Use first letter of the first part and first letter of the last part
//   return `${nameParts[0][0]}${
//     nameParts[nameParts.length - 1][0]
//   }`.toUpperCase();
// };

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading } = useAuth(); // Get user data and loading state from context
//   const [showBackArrow, setShowBackArrow] = useState(false);
//   const [isMobile, setIsMobile] = useState(false); // <-- State for mobile screen width

//   // --- Effect for Screen Width Detection ---
//   useEffect(() => {
//     const checkScreenWidth = () => {
//       // Set state based on whether window width is less than 640px (Tailwind 'sm' breakpoint)
//       setIsMobile(window.innerWidth < 1024);
//     };

//     // Check on initial mount
//     checkScreenWidth();

//     // Add event listener for window resize
//     window.addEventListener("resize", checkScreenWidth);

//     // Cleanup function to remove the event listener
//     return () => {
//       window.removeEventListener("resize", checkScreenWidth);
//     };
//   }, []); // Empty dependency array means this effect runs only on mount and unmount

//   useEffect(() => {
//     setShowBackArrow(pathname !== "/dashboard");
//   }, [pathname]);

//   const handleBack = () => {
//     router.back();
//   };

//   // Get user's full name and initials, providing fallbacks
//   const userName = user?.fullName || "User";
//   const userInitials = getInitials(user?.fullName);

//   return (
//     <header className="sticky top-0 bg-white dark:bg-background z-5">
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="flex justify-between items-center lg:h-28 h-20">
//           <div className="flex justify-center items-center gap-4">
//             {/* Menu button */}
//             <button
//               onClick={toggleSidebar}
//               className="text-gray focus:outline-none cursor-pointer p-2.5 bg-lightgray dark:bg-secondary dark:text-primary rounded-full transition-colors lg:hidden sm:block hidden" // Removed sm:block hidden - logic handled by lg:hidden
//             >
//               <GiHamburgerMenu
//                 size={26}
//                 className="text-mainheading dark:text-primary"
//               />
//             </button>

//             {/* Logo */}
//             {isMobile && ( // <-- Render only if isMobile is true
//               <Link href="/dashboard">
//                 <Image
//                   src={"/assets/images/wise-logo.svg"}
//                   alt="logo"
//                   width={30}
//                   height={30}
//                 />
//               </Link>
//             )}

//             {/* Back arrow button */}
//             {showBackArrow && (
//               <button
//                 onClick={handleBack}
//                 className="focus:outline-none cursor-pointer p-2.5 bg-lightborder dark:bg-primarybox rounded-full text-neutral-900 dark:text-white hover:bg-primary dark:hover:bg-secondarybox transition-all duration-75 ease-linear" // Adjusted padding and added hover
//               >
//                 <HiArrowLeft
//                   size={26}
//                   className="text-mainheading dark:text-primary"
//                 />
//               </button>
//             )}
//           </div>

//           {/* Only show profile section if user data is available (or not loading) */}
//           {user && !loading && (
//             <Link href="/dashboard/your-account">
//               <div
//                 className="relative flex items-center group sm:hover:bg-lightgray bg-transparent sm:dark:hover:bg-primarybox rounded-full cursor-pointer gap-2 
//                sm:p-1.5 transition-all duration-75 ease-linear"
//               >
//                 {" "}
//                 {/* Adjusted padding/gap */}
//                 {/* User Initials */}
//                 <span className="size-12.5 bg-lightborder dark:bg-primary rounded-full flex items-center justify-center font-bold text-neutral-900 dark:text-background capitalize text-sm md:text-base">
//                   {userInitials} {/* Use dynamic initials */}
//                 </span>
//                 {/* User Name */}
//                 <div className="text-neutral-900 dark:text-white capitalize hidden sm:block font-medium text-sm md:text-base">
//                   {userName} {/* Use dynamic name */}
//                 </div>
//                 {/* Arrow Icon */}
//                 <IoIosArrowForward className="size-4 md:size-5 text-neutral-900 dark:text-white mr-1 md:mr-2 hidden md:block transition-transform ease-in-out duration-300" />{" "}
//                 {/* Adjusted size/margin/translate */}
//               </div>
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext"; // Path is likely correct based on existing structure
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbMenu3 } from "react-icons/tb";

interface HeaderProps {
  toggleSidebar: () => void;
}

const getInitials = (name: string | undefined): string => {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "?";
  }
  const nameParts = name
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);
  if (nameParts.length === 0) {
    return "?";
  }
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }
  return `${nameParts[0][0]}${
    nameParts[nameParts.length - 1][0]
  }`.toUpperCase();
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  // --- Get user, loading, and unreadMessageCount from context ---
  const { user, loading, unreadMessageCount } = useAuth();
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    setShowBackArrow(pathname !== "/dashboard");
  }, [pathname]);

  const handleBack = () => {
    router.back();
  };

  const userName = user?.fullName || "User";
  const userInitials = getInitials(user?.fullName);

  return (
    <header className="sticky bg-background top-0 z-5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center lg:h-28 h-20">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="focus:outline-none cursor-pointer p-2.5 bg-primarybox hover:bg-secondarybox text-primary rounded-full transition-colors lg:hidden sm:block hidden"
            >
              <TbMenu3
                size={28}
              />
            </button>

            {isMobile && (
              <Link href="/dashboard">
                <Image
                  src="/assets/images/mobile_white_logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="block dark:hidden"
                />
              </Link>
              
            )}
            {isMobile && (
              <Link href="/dashboard">
                <Image
                  src="/assets/images/mobile_dark_logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="hidden dark:block"
                />
              </Link>
              
            )}

            {showBackArrow && (
              <button
                onClick={handleBack}
                className="focus:outline-none w-12 h-12 flex justify-center items-center
                 cursor-pointer p-2.5 bg-primarybox rounded-full text-primary hover:bg-[#2f373b] transition-all duration-75 ease-linear"
              >
                <HiArrowLeft
                  size={22}
                />
              </button>
            )}
          </div>

          {user && !loading && (
            <Link href="/dashboard/your-account">
              <div
                className="relative flex items-center group bg-transparent hover:bg-primarybox rounded-full cursor-pointer gap-2 
               sm:p-1.5 transition-all duration-75 ease-linear"
              >
                <span className="relative size-12.5 bg-primary rounded-full flex items-center justify-center font-bold text-background capitalize text-sm md:text-base">
                  {userInitials}
                  {/* --- Notification Dot --- */}
                  {unreadMessageCount > 0 && (
                    <span
                      className="absolute top-1 right-1 block h-3 w-3 transform translate-x-1/4 -translate-y-1/4 rounded-full bg-red-700 ring-2 ring-background group-hover:ring-primarybox"
                      aria-label="New notifications"
                    />
                  )}
                </span>
                <div className="text-white capitalize hidden sm:block font-medium text-sm md:text-base">
                  {userName}
                </div>
                <IoIosArrowForward className="size-4 md:size-5 text-white mr-1 md:mr-2 hidden md:block transition-transform ease-in-out duration-300" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;