// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc"; // No longer needed
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth"; // Import useAuth hook

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   {
//     label: "beneficiaries",
//     icon: "FiUserPlus",
//     route: "/dashboard/beneficiaries",
//   },
//   { label: "settings", icon: "FiSettings", route: "/dashboard/settings" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname(); // Get current route
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth(); // Get logout function from useAuth

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     // Removed event parameter - button onClick doesn't need it directly
//     logout(); // Call the logout function from AuthContext
//     router.push("/auth/login"); // Redirect to login page after logout
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar(); // Close sidebar on mobile after logout
//     }
//   };

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout} // Call handleLogout function on click
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer" // Added absolute positioning and p-4 for padding
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom sidebar */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full border-t border-lightgray bg-white flex justify-center items-center space-x-6 py-4 z-20">
//         {bottomNavLinksData.map((item: NavLink) => {
//           const IconComponent = icons[item.icon];
//           const isActive = pathname === item.route;

//           return (
//             <Link
//               key={item.route}
//               href={item.route}
//               className={`flex flex-col items-center justify-center ${
//                 isActive
//                   ? "text-primary"
//                   : "text-gray-500 hover:text-neutral-800"
//               }`}
//             >
//               {IconComponent && <IconComponent className="size-5 mb-2" />}
//               <span className="text-xs capitalize">{item.label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item
//   const activeMenuItem = bottomNavLinksData.find(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom navigation bar - Fixed to show only active menu name */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full z-20 px-3 pb-3">
//         <div className="flex items-center justify-center border bg-background rounded-4xl p-2">
//           <div className="flex items-center justify-between w-full">
//             {bottomNavLinksData.map((item: NavLink) => {
//               const IconComponent = icons[item.icon];
//               const isActive = pathname === item.route;

//               return (
//                 <Link
//                   key={item.route}
//                   href={item.route}
//                   className="flex items-center justify-center"
//                 >
//                   <div
//                     className={`flex gap-2 items-center p-2.5 rounded-4xl ${
//                       isActive ? "bg-primary" : "text-neutral-900"
//                     }`}
//                   >
//                     <IconComponent
//                       className={`size-6 ${
//                         isActive ? "text-neutral-900" : "text-white"
//                       }`}
//                     />
//                     {isActive && (
//                       <span className="font-medium text-neutral-900">
//                         {item.label}
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../hooks/useAuth";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const [prevPathname, setPrevPathname] = useState<string | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     if (pathname !== prevPathname) {
//       setPrevPathname(pathname);
//     }
//   }, [pathname, prevPathname]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item index for animation
//   const activeIndex = bottomNavLinksData.findIndex(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Enhanced small screen bottom navigation bar */}
//       <AnimatePresence>
//         <motion.div
//           className="sm:hidden fixed bottom-0 left-0 w-full z-20 px-3 pb-3"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 25,
//             delay: 0.1
//           }}
//         >
//           <motion.div
//             className="flex items-center justify-center border bg-background rounded-4xl p-2"
//             initial={{ scale: 0.95, opacity: 0.8 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between w-full relative">
//               {/* Background indicator that slides between active items */}
//               <motion.div
//                 className="absolute bg-primary rounded-4xl h-11 z-0"
//                 initial={false}
//                 animate={{
//                   left: `${(activeIndex * 25)}%`,
//                   width: bottomNavLinksData[activeIndex]?.label ? '25%' : '0%'
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 500,
//                   damping: 30
//                 }}
//               />

//               {bottomNavLinksData.map((item: NavLink, index) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     className="flex items-center justify-center relative z-10 w-1/4"
//                   >
//                     <motion.div
//                       className="flex items-center justify-center gap-2 p-2.5 w-full rounded-4xl"
//                       whileTap={{ scale: 0.92 }}
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                     >
//                       <motion.div
//                         initial={{ rotate: 0 }}
//                         animate={isActive ? { rotate: [0, -10, 10, -5, 5, 0] } : { rotate: 0 }}
//                         transition={isActive ? {
//                           duration: 0.5,
//                           delay: 0.1,
//                           ease: "easeInOut",
//                           times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//                         } : {}}
//                       >
//                         <IconComponent
//                           className={`size-6 transition-colors duration-300 ${
//                             isActive ? "text-neutral-900" : "text-white"
//                           }`}
//                         />
//                       </motion.div>
//                       <AnimatePresence>
//                         {isActive && (
//                           <motion.span
//                             className="font-medium text-neutral-900 whitespace-nowrap overflow-hidden"
//                             initial={{ opacity: 0, width: 0, x: -10 }}
//                             animate={{ opacity: 1, width: "auto", x: 0 }}
//                             exit={{ opacity: 0, width: 0, x: 10 }}
//                             transition={{ duration: 0.3, ease: "easeOut" }}
//                           >
//                             {item.label}
//                           </motion.span>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Find active menu item
//   const activeMenuItem = bottomNavLinksData.find(
//     (item) => pathname === item.route
//   );

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-10 lg:hidden"
//         />
//       )}

//       {isMobileView === null ||
//       isMobileView === false ||
//       (sidebarOpen && isMobileView === true) ? (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:z-0 z-20 px-4 ${
//             isMobileView ? "" : "translate-x-0"
//           } ${
//             sidebarOpen && isMobileView
//               ? "translate-x-0"
//               : isMobileView
//               ? "-translate-x-full"
//               : "translate-x-0"
//           }`}
//           initial={isMobileView ? { x: "-100%" } : {}}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : {}}
//           exit={isMobileView ? { x: "-100%" } : {}}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}}
//         >
//           <div className="flex flex-col items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//               />
//             </Link>
//           </div>
//           <div className="h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-t-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-t-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <nav>
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       if (sidebarOpen && isMobileView) {
//                         toggleSidebar();
//                       }
//                     }}
//                     className={`w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     {IconComponent && <IconComponent className="w-6 h-6" />}
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 group px-4 font-medium rounded-full transition duration-200 mb-2 text-gray cursor-pointer"
//             >
//               <VscSignOut className="w-6 h-6 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary" />
//               <span className="text-gray font-medium group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-primary">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       ) : null}

//       {/* Small screen bottom navigation bar with animation - Design 1 */}
//       <div className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t">
//         <motion.div
//           className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           {bottomNavLinksData.map((item: NavLink) => {
//             const IconComponent = icons[item.icon];
//             const isActive = pathname === item.route;

//             return (
//               <Link
//                 key={item.route}
//                 href={item.route}
//                 className="flex relative flex-col items-center justify-center space-y-1 py-3"
//               >
//                 {isActive && (
//                     <motion.div
//                       className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                       layoutId="bottom-nav-indicator"
//                     />
//                   )}
//                 <motion.div
//                   className={` p-2 rounded-md ${
//                     isActive
//                       ? "text-primary"
//                       : "text-neutral-500 dark:text-gray-300"
//                   }`}
//                   whileTap={{ scale: 0.9 }}
//                   initial={{ scale: 1 }}
//                   animate={{ scale: 1 }}
//                   layout
//                 >
//                   <IconComponent className="size-6" />

//                 </motion.div>
//                 <span
//                   className={`text-xs font-medium ${
//                     isActive
//                       ? "text-neutral-900 dark:text-primary"
//                       : "text-neutral-500 dark:text-gray-400"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//               </Link>
//             );
//           })}
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024); // Use 1024 to match lg breakpoint
//     checkMobileView();
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Only close on outside click if mobile view is true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Determine if the full sidebar should be rendered
//   // Render if:
//   // 1. isMobileView is null (initial state)
//   // 2. isMobileView is false (desktop view)
//   // 3. isMobileView is true AND sidebarOpen is true (mobile view, sidebar is open)
//   const shouldRenderFullSidebar =
//     isMobileView === null || !isMobileView || (isMobileView && sidebarOpen);

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {sidebarOpen && isMobileView && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/45 z-20 lg:hidden"
//           aria-hidden="true" // Good for accessibility
//         />
//       )}

//       {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
//       {shouldRenderFullSidebar && (
//         <motion.div
//           ref={sidebarRef}
//           className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 z-30 px-4 flex flex-col ${
//             isMobileView ? "" : "translate-x-0" // No translate needed for desktop
//           }`}
//           // Animate only on mobile
//           initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//           animate={isMobileView ? { x: sidebarOpen ? 0 : "-100%" } : { x: 0 }}
//           exit={isMobileView ? { x: "-100%" } : { x: 0 }}
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : {}} // Only transition on mobile
//         >
//           {/* Logo Area */}
//           <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//             <Link href="/dashboard">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 priority // Good practice for LCP elements like logos
//               />
//             </Link>
//           </div>

//           {/* Scrollable Nav Area */}
//           <div className="px-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <nav>
//
//               {/* Use space-y for consistent spacing */}
//               {navLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     onClick={(e) => {
//                       // Close mobile sidebar on navigation
//                       if (isMobileView && sidebarOpen) {
//                         toggleSidebar();
//                       }
//                     }}
//                     // Make the Link itself relative for positioning the animated background
//                     //  w-full flex items-center py-3 px-4 font-medium rounded-full transition duration-200 mb-2
//                     className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                       isActive
//                         ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary" // Active text color
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Inactive text color
//                     }`}
//                   >
//                     {/* Animated Background - only rendered when active */}
//                     {isActive &&
//                       !isMobileView && ( // Only show animation on desktop
//                         <motion.div
//                           layoutId="active-desktop-sidebar-indicator" // Unique ID for the layout animation
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox z-0" // Background styling
//                           initial={false} // Prevent initial animation on load if desired
//                           transition={{
//                             // Customize animation feel
//                             type: "spring",
//                             stiffness: 250,
//                             damping: 30,
//                           }}
//                         />
//                       )}

//                     {/* Ensure Icon and Text are above the background */}
//                     {IconComponent && (
//                       <IconComponent className="w-6 h-6 relative z-10" />
//                     )}
//                     <span className="relative z-10">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>
//             {/* Logout Button Area (at the bottom) */}

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//             >
//               <VscSignOut className="w-6 h-6" />
//               <span className="font-medium">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* --- Small screen bottom navigation bar --- */}
//       {!shouldRenderFullSidebar &&
//         isMobileView && ( // Only show bottom nav when full sidebar isn't shown on mobile
//           <div className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t">
//             <motion.div
//               className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none"
//               initial={{ y: 100 }}
//               animate={{ y: 0 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             >
//               {bottomNavLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive = pathname === item.route;

//                 return (
//                   <Link
//                     key={item.route}
//                     href={item.route}
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3"
//                   >
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                         layoutId="bottom-nav-indicator"
//                       />
//                     )}
//                     <motion.div
//                       className={` p-2 rounded-md ${
//                         isActive
//                           ? "text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       <IconComponent className="size-6" />
//                     </motion.div>
//                     <span
//                       className={`text-xs font-medium ${
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 dark:text-gray-400"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </motion.div>
//           </div>
//         )}
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard, // Added back if needed, otherwise remove
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// // Simplified bottom nav links, maybe just the core ones
// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Activity", // Maybe shorter label for mobile
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   // Initialize isMobileView to null for server-side rendering compatibility
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   // --- Effect to detect screen size ---
//   useEffect(() => {
//     const checkMobileView = () => {
//       // Ensure window is defined (for SSR safety, though 'use client' helps)
//       if (typeof window !== "undefined") {
//         setIsMobileView(window.innerWidth < 1024); // lg breakpoint
//       }
//     };
//     checkMobileView(); // Initial check
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

//   // --- Effect for closing sidebar on outside click (only on mobile) ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Only act if the sidebar is open, it's mobile view, and the click is outside the sidebar element
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Explicitly check for true
//       ) {
//         toggleSidebar();
//       }
//     };

//     // Add listener only when needed
//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       // Clean up listener if sidebar closes or view changes
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup function for when the component unmounts or dependencies change
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]); // Dependencies: effect reruns if these change

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     // Close sidebar if it's open on mobile after logout
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // --- Determine which navigation to render ---
//   // Render full sidebar if not mobile OR if mobile and sidebar is open
//   const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
//   // Render bottom nav ONLY if mobile AND full sidebar is closed
//   const renderBottomNav = isMobileView && !sidebarOpen;

//   // Avoid rendering anything until isMobileView is determined
//   if (isMobileView === null) {
//     return null; // Or a loading indicator/skeleton
//   }

//   return (
//     <>
//       {/* --- Backdrop for mobile sidebar --- */}
//       {/* AnimatePresence allows the exit animation */}
//       <AnimatePresence>
//         {sidebarOpen && isMobileView && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/45 z-20 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
//       {/* Use AnimatePresence for smooth transitions between sidebar states */}
//       <AnimatePresence>
//         {renderFullSidebar && (
//           <motion.div
//             key="full-sidebar" // Key is important for AnimatePresence
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 z-30 px-4 flex flex-col`}
//             // Animate only on mobile
//             initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//             animate={{ x: 0 }} // Always animate to x: 0 when present
//             exit={isMobileView ? { x: "-100%" } : { x: 0 }} // Animate out only on mobile
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             {/* Logo Area */}
//             <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//               <Link href="/dashboard" className="inline-block">
//                 <Image
//                   src="/assets/images/wise-logo.svg" // Ensure path is correct
//                   alt="logo"
//                   width={100}
//                   height={100} // Adjust height as needed
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Scrollable Nav Area */}
//             {/* Adjusted padding and height calculation */}
//             <div className="p-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <nav>
//                 {" "}
//                 {/* Nav takes available space */}
//                 {navLinksData.map((item: NavLink) => {
//                   const IconComponent = icons[item.icon];
//                   const isActive =
//                     pathname === item.route ||
//                     (item.route !== "/dashboard" &&
//                       pathname.startsWith(item.route)); // Better active check

//                   return (
//                     <Link
//                       key={item.route}
//                       href={item.route}
//                       onClick={() => {
//                         // Use arrow function for clarity
//                         // Close mobile sidebar on navigation
//                         if (isMobileView && sidebarOpen) {
//                           toggleSidebar();
//                         }
//                       }}
//                       className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                         // Use rounded-lg, mb-1
//                         isActive
//                           ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary" // Active text color
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Inactive colors and hover background
//                       }`}
//                     >
//                       {/* Animated Background - shown on active */}
//                       {isActive && (
//                         <motion.div
//                           layoutId="active-sidebar-indicator" // Unique ID for the layout animation
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox z-0" // Lighter background
//                           initial={false}
//                           transition={{
//                             type: "spring",
//                             stiffness: 250,
//                             damping: 30,
//                           }}
//                         />
//                       )}

//                       {/* Ensure Icon and Text are above the background */}
//                       {IconComponent && (
//                         <IconComponent className="w-6 h-6 relative z-10" />
//                       )}
//                       <span className="relative z-10">{item.label}</span>
//                     </Link>
//                   );
//                 })}
//               </nav>

//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 >
//                   <VscSignOut className="w-6 h-6" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Use AnimatePresence for smooth appearance/disappearance */}
//       {/* --- Small screen bottom navigation bar --- */}
//       <AnimatePresence>
//         {renderBottomNav && (
//           <motion.div
//             key="bottom-nav" // Key is important for AnimatePresence
//             className="lg:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t" // Use z-40, less than sidebar
//             initial={{ y: "100%" }} // Start below screen
//             animate={{ y: 0 }} // Animate to y: 0
//             exit={{ y: "100%" }} // Animate out below screen
//             transition={{ type: "spring", stiffness: 300, damping: 30 }} // Spring animation
//           >
//             <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
//               {" "}
//               {/* Reduced padding */}
//               {bottomNavLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive =
//                   pathname === item.route ||
//                   (item.route !== "/dashboard" &&
//                     pathname.startsWith(item.route)); // Better active check

//                 return (
//                   <Link
//                     key={`bottom-${item.route}`} // Ensure unique key
//                     href={item.route}
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3" // Use flex-1 to distribute space, py-2
//                   >
//                     {/* Active Indicator (Top Line) */}
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary" // Thinner, shorter indicator
//                         layoutId="bottom-nav-indicator" // Shared layout ID for animation
//                         initial={false}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}

//                     {/* Icon container for potential background/tap effects */}
//                     <motion.div
//                       className={`p-1 rounded-md ${
//                         // Smaller padding
//                         isActive
//                           ? "text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       {IconComponent && <IconComponent className="size-5" />}{" "}
//                       {/* Smaller icon */}
//                     </motion.div>

//                     {/* Label */}
//                     <span
//                       className={`text-xs font-medium ${
//                         // Smaller text, closer margin
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path if needed

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLink {
//   label: string;
//   icon: keyof typeof icons;
//   route: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// const navLinksData: NavLink[] = [
//   { label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Transactions",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Add Money", icon: "GoArrowUp", route: "/dashboard/add-money" },
//   {
//     label: "Recipients",
//     icon: "FiUserPlus",
//     route: "/dashboard/recipients",
//   },
//   { label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// const bottomNavLinksData: NavLink[] = [
//   { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//   {
//     label: "Activity",
//     icon: "GrTransaction",
//     route: "/dashboard/transactions",
//   },
//   { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//   { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
// ];

// // Tailwind CSS breakpoints (default):
// // sm: 640px
// // md: 768px
// // lg: 1024px
// // xl: 1280px
// const LG_BREAKPOINT = 1024;
// const SM_BREAKPOINT = 640; // Define the small breakpoint

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   // State for general mobile view (affects sidebar behavior like sliding)
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   // State specifically for small screens (controls bottom nav visibility)
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
//   const { logout } = useAuth();

//   // --- Effect to detect screen size (sets both states) ---
//   useEffect(() => {
//     const checkScreenSizes = () => {
//       if (typeof window !== "undefined") {
//         const currentWidth = window.innerWidth;
//         setIsMobileView(currentWidth < LG_BREAKPOINT); // Mobile view below 1024px
//         setIsSmallScreen(currentWidth < SM_BREAKPOINT); // Small screen below 640px
//       }
//     };
//     checkScreenSizes(); // Initial check
//     window.addEventListener("resize", checkScreenSizes);
//     return () => window.removeEventListener("resize", checkScreenSizes);
//   }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

//   // --- Effect for closing sidebar on outside click (uses isMobileView) ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Only act if the sidebar is open, it's mobile view (<1024px), and the click is outside
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Use isMobileView for sidebar interaction behavior
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarOpen, isMobileView, toggleSidebar]); // Depends on sidebarOpen and isMobileView

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     // Close sidebar if it's open on mobile after logout
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // --- Determine which navigation to render ---
//   // Render full sidebar if not mobile view (<1024px) OR if mobile view AND sidebar is open
//   const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
//   // Render bottom nav ONLY if on a small screen (<640px) AND full sidebar is closed
//   const renderBottomNav = isSmallScreen && !sidebarOpen; // Use isSmallScreen here

//   // Avoid rendering anything until screen sizes are determined
//   if (isMobileView === null || isSmallScreen === null) {
//     return null; // Or a loading indicator/skeleton
//   }

//   return (
//     <>
//       {/* --- Backdrop for mobile sidebar (controlled by isMobileView) --- */}
//       <AnimatePresence>
//         {sidebarOpen && isMobileView && ( // Backdrop appears below 1024px when sidebar is open
//           <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.5 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-20 lg:hidden" // lg:hidden ensures it's only for mobile views
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* --- Full Sidebar (Desktop / Mobile Open) --- */}
//       <AnimatePresence>
//         {renderFullSidebar && (
//           <motion.div
//             key="full-sidebar"
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-0 z-30 px-4 flex flex-col`}
//             // Animate only on mobile view (<1024px)
//             initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//             animate={{ x: 0 }}
//             exit={isMobileView ? { x: "-100%" } : { x: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             {/* Logo Area */}
//             <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//               <Link href="/dashboard" className="inline-block">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="logo"
//                   width={100}
//                   height={100}
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Scrollable Nav Area */}
//             <div className="p-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <nav>
//                 {navLinksData.map((item: NavLink) => {
//                   const IconComponent = icons[item.icon];
//                   const isActive =
//                     pathname === item.route ||
//                     (item.route !== "/dashboard" &&
//                       pathname.startsWith(item.route));

//                   return (
//                     <Link
//                       key={item.route}
//                       href={item.route}
//                       onClick={() => {
//                         // Close mobile sidebar on navigation if it's open (<1024px)
//                         if (isMobileView && sidebarOpen) {
//                           toggleSidebar();
//                         }
//                       }}
//                       className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                         isActive
//                           ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       {isActive && (
//                         <motion.div
//                           layoutId="active-sidebar-indicator"
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox "
//                           initial={false}
//                           transition={{
//                             type: "spring",
//                             stiffness: 250,
//                             damping: 30,
//                           }}
//                         />
//                       )}
//                       {IconComponent && (
//                         <IconComponent className="w-6 h-6 relative z-10" />
//                       )}
//                       <span className="relative z-10">{item.label}</span>
//                     </Link>
//                   );
//                 })}
//               </nav>

//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 >
//                   <VscSignOut className="w-6 h-6" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- Small screen bottom navigation bar (Rendered only if isSmallScreen (<640px) and sidebar closed) --- */}
//       <AnimatePresence>
//         {renderBottomNav && ( // Condition updated to use isSmallScreen
//           <motion.div
//             key="bottom-nav"
//             // lg:hidden still prevents it from *ever* showing >= 1024px via CSS,
//             // but the JS `renderBottomNav` condition handles the <640px logic.
//             className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t"
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
//               {bottomNavLinksData.map((item: NavLink) => {
//                 const IconComponent = icons[item.icon];
//                 const isActive =
//                   pathname === item.route ||
//                   (item.route !== "/dashboard" &&
//                     pathname.startsWith(item.route));

//                 return (
//                   <Link
//                     key={`bottom-${item.route}`}
//                     href={item.route}
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3"
//                   >
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                         layoutId="bottom-nav-indicator"
//                         initial={false}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}
//                     <motion.div
//                       className={`p-1 rounded-md ${
//                         isActive
//                           ? "text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       {IconComponent && <IconComponent className="size-5" />}
//                     </motion.div>
//                     <span
//                       className={`text-xs font-medium ${
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

// // frontend/src/app/dashboard/components/Sidebar.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path
// import { useBalances } from "../../hooks/useBalances"; // Import the new hook (adjust path)
// import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLinkDefinition {
//   label: string;
//   icon: keyof typeof icons;
//   route: string | (() => string); // Route can be a string or a function
//   id: string; // Unique ID for key and logic
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };

// // --- Breakpoints ---
// const LG_BREAKPOINT = 1024;
// const SM_BREAKPOINT = 640;

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
//   const { logout } = useAuth();
//   const { balances, isLoading: isLoadingBalances, error: balancesError } = useBalances(); // Use the hook

//   // --- Screen Size Detection ---
//   useEffect(() => {
//     const checkScreenSizes = () => {
//       if (typeof window !== "undefined") {
//         const currentWidth = window.innerWidth;
//         setIsMobileView(currentWidth < LG_BREAKPOINT);
//         setIsSmallScreen(currentWidth < SM_BREAKPOINT);
//       }
//     };
//     checkScreenSizes();
//     window.addEventListener("resize", checkScreenSizes);
//     return () => window.removeEventListener("resize", checkScreenSizes);
//   }, []);

//   // --- Outside Click Handler ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };
//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [sidebarOpen, isMobileView, toggleSidebar]);

//   // --- Dynamic Add Money Route ---
//   const getAddMoneyRoute = (): string => {
//     // If balances are still loading, maybe disable or point to a loading state?
//     // Or default to add-balance, assuming it's safer.
//     if (isLoadingBalances) {
//         // Could return '#' or a specific loading route if needed
//         // For simplicity, let's default to add-balance, user can be redirected if needed
//         return "/dashboard/add-balance";
//     }
//     if (balancesError) {
//         // Handle error case, maybe disable or link to an error page
//         console.error("Error loading balances for navigation:", balancesError);
//         return "/dashboard"; // Fallback to dashboard on error
//     }
//     // The core logic:
//     return balances && balances.length > 0
//       ? "/dashboard/add-money/select-balance" // Go to selection page if balances exist
//       : "/dashboard/add-balance"; // Go to create page if no balances
//   };

//   // --- Nav Link Definitions ---
//   const navLinksData: NavLinkDefinition[] = [
//     { id: "dashboard", label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//     {
//       id: "transactions",
//       label: "Transactions",
//       icon: "GrTransaction",
//       route: "/dashboard/transactions",
//     },
//     { id: "send", label: "Send Money", icon: "BsSend", route: "/dashboard/send" },
//     // Use the function for the Add Money route
//     { id: "add-money", label: "Add Money", icon: "GoArrowUp", route: getAddMoneyRoute },
//     {
//       id: "recipients",
//       label: "Recipients",
//       icon: "FiUserPlus",
//       route: "/dashboard/recipients",
//     },
//     { id: "settings", label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
//   ];

//     // Bottom nav might need similar logic if "Add Money" exists there,
//     // but the provided data doesn't include it. Let's assume it's not there or static.
//    const bottomNavLinksData = [ // Assuming static or simplified bottom nav
//      { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//      { label: "Activity", icon: "GrTransaction", route: "/dashboard/transactions"},
//      { label: "Send", icon: "BsSend", route: "/dashboard/send" },
//      { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
//    ];

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // --- Render Logic ---
//   const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
//   const renderBottomNav = isSmallScreen && !sidebarOpen;

//   if (isMobileView === null || isSmallScreen === null) {
//     return null; // Avoid rendering until screen sizes are determined
//   }

//   // --- Helper to resolve route ---
//   const resolveRoute = (route: string | (() => string)): string => {
//     return typeof route === 'function' ? route() : route;
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <AnimatePresence>
//         {sidebarOpen && isMobileView && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-20 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Full Sidebar */}
//       <AnimatePresence>
//         {renderFullSidebar && (
//           <motion.div
//             key="full-sidebar"
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-0 z-30 px-4 flex flex-col`}
//             initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//             animate={{ x: 0 }}
//             exit={isMobileView ? { x: "-100%" } : { x: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//               <Link href="/dashboard" className="inline-block">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="logo"
//                   width={100}
//                   height={100}
//                   priority
//                 />
//               </Link>
//             </div>

//             {/* Nav Area */}
//             <div className="p-2 h-[calc(100%-112px)] overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <nav>
//                 {navLinksData.map((item) => {
//                   const IconComponent = icons[item.icon];
//                   const finalRoute = resolveRoute(item.route); // Resolve dynamic routes
//                   const isActive =
//                     pathname === finalRoute ||
//                     (finalRoute !== "/dashboard" && pathname.startsWith(finalRoute));

//                   // --- Loading state for Add Money link ---
//                   if (item.id === 'add-money' && isLoadingBalances) {
//                     return (
//                       <div key={item.id} className="relative w-full flex items-center gap-3 py-3 px-4 font-medium mb-2">
//                          <Skeleton className="w-6 h-6 rounded" />
//                          <Skeleton className="h-5 w-24 rounded" />
//                       </div>
//                     );
//                   }

//                   return (
//                     <Link
//                       key={item.id} // Use the unique ID
//                       href={finalRoute}
//                       onClick={() => {
//                         if (isMobileView && sidebarOpen) {
//                           toggleSidebar();
//                         }
//                       }}
//                       className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 ${
//                         isActive
//                           ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                       // Add aria-disabled if loading/error prevents navigation?
//                     >
//                       {isActive && (
//                         <motion.div
//                           layoutId="active-sidebar-indicator"
//                           className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox "
//                           initial={false}
//                           transition={{ type: "spring", stiffness: 250, damping: 30 }}
//                         />
//                       )}
//                       {IconComponent && (
//                         <IconComponent className="w-6 h-6 relative z-10" />
//                       )}
//                       <span className="relative z-10">{item.label}</span>
//                     </Link>
//                   );
//                 })}
//               </nav>

//               {/* Logout Button */}
//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 >
//                   <VscSignOut className="w-6 h-6" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Bottom Nav (Small Screens) */}
//       <AnimatePresence>
//         {renderBottomNav && (
//           <motion.div
//             key="bottom-nav"
//             className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t"
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
//               {bottomNavLinksData.map((item) => {
//                  const IconComponent = icons[item.icon as keyof typeof icons]; // Assert type
//                 const isActive =
//                   pathname === item.route ||
//                   (item.route !== "/dashboard" && pathname.startsWith(item.route));

//                 return (
//                   <Link
//                     key={`bottom-${item.route}`}
//                     href={item.route} // Assuming static routes here
//                     className="flex relative flex-col items-center justify-center space-y-1 py-3"
//                   >
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                         layoutId="bottom-nav-indicator"
//                         initial={false}
//                         transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                       />
//                     )}
//                     <motion.div
//                       className={`p-1 rounded-md ${isActive ? "text-primary" : "text-neutral-500 dark:text-gray-300"}`}
//                       whileTap={{ scale: 0.9 }}
//                       initial={{ scale: 1 }}
//                       animate={{ scale: 1 }}
//                       layout
//                     >
//                       {IconComponent && <IconComponent className="size-5" />}
//                     </motion.div>
//                     <span className={`text-xs font-medium ${isActive ? "text-neutral-900 dark:text-primary" : "text-neutral-500 dark:text-gray-300"}`}>
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

// // frontend/src/app/dashboard/components/Sidebar.tsx

// "use client";

// import React, { useEffect, useRef, useState, useCallback } from "react"; // Added useCallback
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path
// import { useBalances } from "../../hooks/useBalances"; // Import the new hook (adjust path)
// import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// // ... (Keep interfaces and icons object) ...
// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// interface NavLinkDefinition {
//   label: string;
//   icon: keyof typeof icons;
//   route: string | (() => string);
//   id: string;
// }

// const icons = { RiHomeLine, GrTransaction, BsSend, GoArrowUp, FiCreditCard, FiUserPlus, FiSettings };
// const LG_BREAKPOINT = 1024;
// const SM_BREAKPOINT = 640;

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const sidebarRef = useRef<HTMLDivElement>(null);
//     const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//     const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
//     const { logout, token } = useAuth(); // Add token here if needed for other logic
//     const { balances, isLoading: isLoadingBalances, error: balancesError } = useBalances();

//     // ... (Keep useEffect for screen size and outside click) ...
//       // --- Screen Size Detection ---
//     useEffect(() => {
//         const checkScreenSizes = () => {
//         if (typeof window !== "undefined") {
//             const currentWidth = window.innerWidth;
//             setIsMobileView(currentWidth < LG_BREAKPOINT);
//             setIsSmallScreen(currentWidth < SM_BREAKPOINT);
//         }
//         };
//         checkScreenSizes();
//         window.addEventListener("resize", checkScreenSizes);
//         return () => window.removeEventListener("resize", checkScreenSizes);
//     }, []);

//     // --- Outside Click Handler ---
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//         if (
//             sidebarRef.current &&
//             !sidebarRef.current.contains(event.target as Node) &&
//             sidebarOpen &&
//             isMobileView === true
//         ) {
//             toggleSidebar();
//         }
//         };
//         if (sidebarOpen && isMobileView === true) {
//         document.addEventListener("mousedown", handleClickOutside);
//         } else {
//         document.removeEventListener("mousedown", handleClickOutside);
//         }
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [sidebarOpen, isMobileView, toggleSidebar]);

//     // --- Dynamic Routes using useCallback for stable references ---
//     const getAddMoneyRoute = useCallback((): string => {
//         if (!token) return "/auth/login"; // Redirect if not logged in
//         if (isLoadingBalances) return "#"; // Prevent navigation while loading
//         if (balancesError) return "/dashboard?error=balances"; // Indicate error state

//         return balances && balances.length > 0
//             ? "/dashboard/add-money/select-balance"
//             : "/dashboard/add-balance"; // Go directly to add if none exist
//     }, [balances, isLoadingBalances, balancesError, token]);

//     const getSendMoneyRoute = useCallback((): string => {
//       if (!token) return "/auth/login"; // Redirect if not logged in
//       if (isLoadingBalances) return "#"; // Prevent navigation while loading
//       if (balancesError) return "/dashboard?error=balances"; // Indicate error state

//       // Always go to the select balance page for sending.
//       // The page itself will handle the case where no balances exist.
//       return "/dashboard/send/select-balance"; // <<< This is correct
//  }, [isLoadingBalances, balancesError, token]);

//     // --- Nav Link Definitions ---
//     const navLinksData: NavLinkDefinition[] = [
//         { id: "dashboard", label: "Dashboard", icon: "RiHomeLine", route: "/dashboard" },
//         { id: "transactions", label: "Transactions", icon: "GrTransaction", route: "/dashboard/transactions" },
//         // Use the functions for dynamic routes
//         { id: "send", label: "Send Money", icon: "BsSend", route: getSendMoneyRoute },
//         { id: "add-money", label: "Add Money", icon: "GoArrowUp", route: getAddMoneyRoute },
//         { id: "recipients", label: "Recipients", icon: "FiUserPlus", route: "/dashboard/recipients" },
//         { id: "settings", label: "Settings", icon: "FiSettings", route: "/dashboard/your-account" },
//     ];

//     // Bottom nav - Assuming it doesn't have dynamic send/add links, otherwise apply similar logic
//     const bottomNavLinksData = [
//         { label: "Home", icon: "RiHomeLine", route: "/dashboard" },
//         { label: "Activity", icon: "GrTransaction", route: "/dashboard/transactions"},
//         { label: "Send", icon: "BsSend", route: getSendMoneyRoute() }, // Can also call the function here if needed
//         { label: "Account", icon: "FiSettings", route: "/dashboard/your-account" },
//     ];

//     // --- Logout Handler ---
//     const handleLogout = () => {
//         logout();
//         router.push("/auth/login");
//         if (sidebarOpen && isMobileView) {
//             toggleSidebar();
//         }
//     };

//     // --- Render Logic ---
//     const renderFullSidebar = !isMobileView || (isMobileView && sidebarOpen);
//     const renderBottomNav = isSmallScreen && !sidebarOpen;

//     if (isMobileView === null || isSmallScreen === null) {
//         return null;
//     }

//     // --- Helper to resolve route ---
//     const resolveRoute = (route: string | (() => string)): string => {
//         return typeof route === 'function' ? route() : route;
//     };

//     // --- Helper to check if a dynamic link should be disabled ---
//      const isLinkDisabled = (id: string): boolean => {
//         if (isLoadingBalances && (id === 'add-money' || id === 'send')) {
//             return true;
//         }
//          // Add more conditions if needed (e.g., based on specific errors)
//          return false;
//      };

//     return (
//         <>
//             {/* Backdrop */}
//             <AnimatePresence>
//                 {sidebarOpen && isMobileView && (
//                     <motion.div
//                         initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
//                         onClick={toggleSidebar}
//                         className="fixed inset-0 bg-black/50 dark:bg-white/30 z-20 lg:hidden"
//                         aria-hidden="true"
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Full Sidebar */}
//             <AnimatePresence>
//                 {renderFullSidebar && (
//                     <motion.div
//                         key="full-sidebar" ref={sidebarRef}
//                         className={`w-64 fixed bg-white dark:bg-background h-screen inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-0 z-30 px-4 flex flex-col`}
//                         initial={isMobileView ? { x: "-100%" } : { x: 0 }}
//                         animate={{ x: 0 }} exit={isMobileView ? { x: "-100%" } : { x: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                     >
//                         {/* Logo */}
//                         <div className="flex-shrink-0 flex items-center justify-center lg:h-28 h-20">
//                             <Link href="/dashboard" className="inline-block">
//                                 <Image src="/assets/images/wise-logo.svg" alt="logo" width={100} height={100} priority />
//                             </Link>
//                         </div>

//                         {/* Nav Area */}
//                         <div className="p-2 flex-grow overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//                             <nav className="flex-grow">
//                                 {navLinksData.map((item) => {
//                                     const IconComponent = icons[item.icon];
//                                     const finalRoute = resolveRoute(item.route);
//                                     const isDisabled = isLinkDisabled(item.id) || finalRoute === '#'; // Disable if loading or route is '#'
//                                     const isActive = !isDisabled && (pathname === finalRoute || (finalRoute !== "/dashboard" && pathname.startsWith(finalRoute)));

//                                     // --- Loading skeleton for dynamic links ---
//                                     if (isLoadingBalances && (item.id === 'add-money' || item.id === 'send')) {
//                                         return (
//                                             <div key={item.id} className="relative w-full flex items-center gap-3 py-3 px-4 font-medium mb-2 text-neutral-400 dark:text-gray-600">
//                                                 <Skeleton className="w-6 h-6 rounded" />
//                                                 <Skeleton className="h-5 w-24 rounded" />
//                                             </div>
//                                         );
//                                     }

//                                     return (
//                                         <Link
//                                             key={item.id}
//                                             href={isDisabled ? '#' : finalRoute} // Prevent navigation if disabled
//                                             onClick={(e) => {
//                                                 if (isDisabled) {
//                                                      e.preventDefault(); // Explicitly prevent default action
//                                                      return; // Stop further execution
//                                                 }
//                                                 if (isMobileView && sidebarOpen) {
//                                                     toggleSidebar();
//                                                 }
//                                             }}
//                                             className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2
//                                                 ${isActive ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary"
//                                                          : isDisabled ? "text-neutral-400 dark:text-gray-600 cursor-not-allowed"
//                                                                       : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"}
//                                             `}
//                                             aria-disabled={isDisabled} // Accessibility
//                                             tabIndex={isDisabled ? -1 : 0} // Make non-focusable if disabled
//                                         >
//                                             {isActive && (
//                                                 <motion.div
//                                                     layoutId="active-sidebar-indicator"
//                                                     className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox"
//                                                     initial={false} transition={{ type: "spring", stiffness: 250, damping: 30 }}
//                                                 />
//                                             )}
//                                             {IconComponent && <IconComponent className="w-6 h-6 relative z-10 flex-shrink-0" />}
//                                             <span className="relative z-10 truncate">{item.label}</span>
//                                         </Link>
//                                     );
//                                 })}
//                             </nav>
//                             {/* Logout Button */}
//                             <div> {/* Pushes logout to bottom */}
//                                 <button
//                                     onClick={handleLogout}
//                                     className="w-full flex items-center space-x-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                                 >
//                                     <VscSignOut className="w-6 h-6" />
//                                     <span className="font-medium">Logout</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Bottom Nav (Small Screens) */}
//              {/* ... (Bottom Nav remains largely the same, update routes if needed) ... */}
//              <AnimatePresence>
//                 {renderBottomNav && (
//                 <motion.div
//                     key="bottom-nav"
//                     className="sm:hidden fixed bottom-0 left-0 w-full z-80 bg-white dark:bg-background border-t"
//                     initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 >
//                     <div className="flex items-center justify-around px-3 rounded-t-xl shadow-md dark:shadow-none">
//                     {bottomNavLinksData.map((item) => {
//                         const IconComponent = icons[item.icon as keyof typeof icons];
//                         // Resolve route for bottom nav links too
//                         const finalRoute = resolveRoute(item.route);
//                         const isDisabled = finalRoute === '#'; // Basic check for bottom nav
//                         const isActive = !isDisabled && (pathname === finalRoute || (finalRoute !== "/dashboard" && pathname.startsWith(finalRoute)));

//                         return (
//                         <Link
//                             key={`bottom-${item.label}`} // Use label or a unique ID if available
//                             href={isDisabled ? '#' : finalRoute}
//                             onClick={(e) => { if(isDisabled) e.preventDefault(); }}
//                             className={`flex relative flex-col items-center justify-center space-y-1 py-3 grow basis-0 ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`} // Added grow/basis for equal spacing
//                             aria-disabled={isDisabled}
//                             tabIndex={isDisabled ? -1 : 0}
//                         >
//                             {isActive && (
//                             <motion.div
//                                 className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-primary"
//                                 layoutId="bottom-nav-indicator" // Ensure unique layoutId if needed, maybe append `-bottom`
//                                 initial={false} transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                             />
//                             )}
//                             <motion.div
//                             className={`p-1 rounded-md ${isActive ? "text-primary" : isDisabled ? "text-neutral-400 dark:text-gray-600" : "text-neutral-500 dark:text-gray-300"}`}
//                             whileTap={isDisabled ? {} : { scale: 0.9 }} // Disable tap animation if disabled
//                             layout
//                             >
//                             {IconComponent && <IconComponent className="size-5" />}
//                             </motion.div>
//                             <span className={`text-xs font-medium ${isActive ? "text-neutral-900 dark:text-primary" : isDisabled ? "text-neutral-400 dark:text-gray-600" : "text-neutral-500 dark:text-gray-300"}`}>
//                             {item.label}
//                             </span>
//                         </Link>
//                         );
//                     })}
//                     </div>
//                 </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default Sidebar;

// frontend/src/app/dashboard/components/Sidebar.tsx

// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCreditCard, FiUserPlus, FiSettings } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import { GrTransaction } from "react-icons/gr";
// import { BsSend } from "react-icons/bs";
// import { GoArrowUp } from "react-icons/go";
// import { VscSignOut } from "react-icons/vsc";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "../../contexts/AuthContext"; // Adjust path
// import { useBalances } from "../../hooks/useBalances"; // Import the new hook (adjust path)
// import { Skeleton } from "@/components/ui/skeleton"; // For loading state
// import { IoClose } from "react-icons/io5";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   toggleSidebar: () => void; // Function to toggle the sidebar state
// }

// interface NavLinkDefinition {
//   label: string;
//   icon: keyof typeof icons;
//   route: string | (() => string);
//   id: string;
// }

// const icons = {
//   RiHomeLine,
//   GrTransaction,
//   BsSend,
//   GoArrowUp,
//   FiCreditCard,
//   FiUserPlus,
//   FiSettings,
// };
// const LG_BREAKPOINT = 1024;
// const SM_BREAKPOINT = 640;

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
//   const { logout, token } = useAuth();
//   const {
//     balances,
//     isLoading: isLoadingBalances,
//     error: balancesError,
//   } = useBalances();

//   // --- Screen Size Detection ---
//   useEffect(() => {
//     const checkScreenSizes = () => {
//       if (typeof window !== "undefined") {
//         const currentWidth = window.innerWidth;
//         setIsMobileView(currentWidth < LG_BREAKPOINT);
//         setIsSmallScreen(currentWidth < SM_BREAKPOINT);
//       }
//     };
//     checkScreenSizes();
//     window.addEventListener("resize", checkScreenSizes);
//     return () => window.removeEventListener("resize", checkScreenSizes);
//   }, []);

//   // --- Outside Click Handler ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         sidebarOpen &&
//         isMobileView === true // Only close on outside click if it's mobile view
//       ) {
//         toggleSidebar();
//       }
//     };
//     // Add listener only when sidebar is open AND it's mobile view
//     if (sidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [sidebarOpen, isMobileView, toggleSidebar]); // Dependencies ensure listener updates correctly

//   // --- Dynamic Routes using useCallback for stable references ---
//   const getAddMoneyRoute = useCallback((): string => {
//     if (!token) return "/auth/login";
//     if (isLoadingBalances) return "#"; // Return '#' while loading
//     if (balancesError) return "/dashboard?error=balances"; // Indicate error, maybe show modal later

//     // Decide route based on balances existence
//     return balances && balances.length > 0
//       ? "/dashboard/add-money/select-balance"
//       : "/dashboard/add-balance";
//   }, [balances, isLoadingBalances, balancesError, token]); // Dependencies for useCallback

//   const getSendMoneyRoute = useCallback((): string => {
//     if (!token) return "/auth/login";
//     if (isLoadingBalances) return "#"; // Return '#' while loading
//     if (balancesError) return "/dashboard?error=balances";

//     // Always go to select balance for sending, assuming user needs a balance to send *from*
//     // If no balances exist, the target page should handle that state.
//     return "/dashboard/send/select-balance";
//   }, [isLoadingBalances, balancesError, token]); // Dependencies for useCallback

//   // --- Nav Link Definitions ---
//   const navLinksData: NavLinkDefinition[] = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: "RiHomeLine",
//       route: "/dashboard",
//     },
//     {
//       id: "transactions",
//       label: "Transactions",
//       icon: "GrTransaction",
//       route: "/dashboard/transactions",
//     },
//     {
//       id: "send",
//       label: "Send Money",
//       icon: "BsSend",
//       route: getSendMoneyRoute, // Use the callback directly
//     },
//     {
//       id: "add-money",
//       label: "Add Money",
//       icon: "GoArrowUp",
//       route: getAddMoneyRoute, // Use the callback directly
//     },
//     {
//       id: "recipients",
//       label: "Recipients",
//       icon: "FiUserPlus",
//       route: "/dashboard/recipients",
//     },
//     {
//       id: "settings",
//       label: "Settings",
//       icon: "FiSettings",
//       route: "/dashboard/your-account",
//     },
//   ];

//   // Bottom nav - Apply similar logic for dynamic routes if needed
//   const bottomNavLinksData = [
//     {
//       label: "Home",
//       icon: "RiHomeLine",
//       route: "/dashboard",
//       id: "bottom-home",
//     },
//     {
//       label: "Activity",
//       icon: "GrTransaction",
//       route: "/dashboard/transactions",
//       id: "bottom-activity",
//     },
//     // Call the dynamic route function here for consistency
//     {
//       label: "Send",
//       icon: "BsSend",
//       route: getSendMoneyRoute(),
//       id: "bottom-send",
//     },
//     {
//       label: "Account",
//       icon: "FiSettings",
//       route: "/dashboard/your-account",
//       id: "bottom-account",
//     },
//   ];

//   // --- Logout Handler ---
//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//     // Ensure sidebar closes on mobile after logout if it was open
//     if (sidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // --- Render Logic ---
//   // Sidebar should render if it's not mobile OR if it is mobile AND sidebarOpen is true
//   const renderFullSidebar =
//     !isMobileView || (isMobileView === true && sidebarOpen);
//   // Bottom nav should render only if it's small screen AND sidebar is NOT open
//   const renderBottomNav = isSmallScreen === true && !sidebarOpen;

//   // Prevent rendering during SSR or initial hydration mismatch until screen size is known
//   if (isMobileView === null || isSmallScreen === null) {
//     // Optionally return a placeholder/loader here if needed, but null is often fine
//     return null;
//   }

//   // --- Helper to resolve route (handles both string and function types) ---
//   const resolveRoute = (route: string | (() => string)): string => {
//     return typeof route === "function" ? route() : route;
//   };

//   // --- Helper to check if a dynamic link should be disabled (used when NOT loading) ---
//   const isLinkDisabled = (id: string): boolean => {
//     // Find the link definition by ID
//     const linkDef = navLinksData.find((link) => link.id === id);
//     if (!linkDef) return false; // Should not happen if ID is valid

//     const finalRoute = resolveRoute(linkDef.route);
//     // Disable if route resolved to '#' AND we are NOT currently loading balances
//     // This means the dynamic route logic determined it shouldn't navigate (e.g., error state)
//     return finalRoute === "#" && !isLoadingBalances;
//   };

//   // --- Helper for bottom nav disabled state ---
//   const isBottomNavLinkDisabled = (id: string): boolean => {
//     const linkDef = bottomNavLinksData.find((link) => link.id === id);
//     if (!linkDef) return false;

//     // Example: Specifically disable 'Send' button while balances load
//     if (id === "bottom-send" && isLoadingBalances) {
//       return true;
//     }

//     // Could add more conditions based on `balancesError` or other factors if needed
//     // For now, mainly focuses on the loading state for dynamic routes.
//     const finalRoute = resolveRoute(linkDef.route);
//     // Also disable if route resolves to '#' and not loading (consistent with sidebar)
//     return finalRoute === "#" && !isLoadingBalances;
//   };

//   // --- Skeleton Component for Links/Buttons ---
//   const NavItemSkeleton = () => (
//     <div className="relative w-full flex items-center gap-3 py-3 px-4 font-medium mb-2 text-neutral-400 dark:text-gray-600">
//       <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />{" "}
//       {/* Circle skeleton for icon */}
//       <Skeleton className="w-24 h-6 rounded" /> {/* Rect skeleton for text */}
//     </div>
//   );

//   return (
//     <>
//       {/* Backdrop for Mobile Sidebar */}
//       <AnimatePresence>
//         {sidebarOpen && isMobileView === true && (
//           <motion.div
//             key="sidebar-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={toggleSidebar} // Close sidebar when backdrop is clicked
//             className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 lg:hidden" // Ensure z-index is below sidebar but above content
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Full Sidebar (Desktop or Mobile when open) */}
//       <AnimatePresence>
//         {renderFullSidebar && (
//           <motion.div
//             key="full-sidebar"
//             ref={sidebarRef}
//             className={`w-64 fixed lg:sticky bg-white dark:bg-background h-screen inset-y-0 left-0 ${
//               isMobileView ? "z-40" : "lg:z-10" // Higher z-index on mobile when open
//             } flex flex-col shadow-lg lg:shadow-none`}
//             initial={isMobileView ? { x: "-100%" } : { x: 0 }} // Slide in from left on mobile
//             animate={{ x: 0 }} // Target position
//             exit={isMobileView ? { x: "-100%" } : { x: 0 }} // Slide out to left on mobile
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             {/* Sidebar Header */}
//             <div className="flex-shrink-0 flex items-center justify-start px-4 lg:h-28 h-20">
//               <Link
//                 href="/dashboard"
//                 className="inline-block"
//                 onClick={() => {
//                   if (isMobileView && sidebarOpen) toggleSidebar();
//                 }}
//               >
//                 <Image
//                   src="/assets/images/wise-logo.svg" // Ensure this path is correct
//                   alt="Wise Logo"
//                   width={120}
//                   height={30} // Adjust height as needed
//                   priority // Load logo faster
//                 />
//               </Link>

//               {/* Close Sidebar button - Only show on mobile */}
//               {isMobileView && (
//                 <button
//                   onClick={toggleSidebar} // *** ADD THIS ONCLICK HANDLER ***
//                   className="absolute top-2 right-1.5 lg:hidden bg-lightborder cursor-pointer hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox z-10 p-2 rounded-full transition-colors duration-300 ease-in-out"
//                   aria-label="Close sidebar" // For accessibility
//                 >
//                   <IoClose
//                     size={24} // Slightly smaller icon might fit better
//                     className="text-mainheading dark:text-primary"
//                   />
//                 </button>
//               )}
//             </div>

//             {/* Nav Area */}
//             <div className="p-2 flex-grow overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <nav className="flex-grow">
//                 {isLoadingBalances ? (
//                   // --- Render Skeletons when loading ---
//                   <>
//                     {navLinksData.map((item) => (
//                       <NavItemSkeleton key={`${item.id}-skeleton`} />
//                     ))}
//                   </>
//                 ) : (
//                   // --- Render Actual Links when not loading ---
//                   navLinksData.map((item) => {
//                     const IconComponent = icons[item.icon];
//                     const finalRoute = resolveRoute(item.route);
//                     // Check disabled state *after* resolving route, only when not loading
//                     const isDisabled = isLinkDisabled(item.id);
//                     const isActive =
//                       !isDisabled &&
//                       (pathname === finalRoute ||
//                         (finalRoute !== "/dashboard" && // Avoid highlighting dashboard for sub-routes
//                           pathname.startsWith(finalRoute)));

//                     return (
//                       <Link
//                         key={item.id}
//                         href={isDisabled ? "#" : finalRoute} // Prevent navigation if disabled
//                         onClick={(e) => {
//                           if (isDisabled) {
//                             e.preventDefault(); // Explicitly prevent default action
//                             return;
//                           }
//                           // Close sidebar on mobile after navigation
//                           if (isMobileView && sidebarOpen) {
//                             toggleSidebar();
//                           }
//                         }}
//                         className={`relative w-full flex items-center gap-3 py-3 px-4 font-medium rounded-full transition duration-200 mb-3
//                           ${
//                             isActive
//                               ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox  dark:text-primary" // Active text color only
//                               : isDisabled
//                               ? "text-neutral-400 dark:text-gray-600  cursor-not-allowed opacity-60" // More explicit disabled styling
//                               : "text-neutral-500 hover:text-neutral-900 hover:bg-[#ECECEC] dark:hover:bg-white/5 dark:text-gray-300 dark:hover:text-primary" // Hover state
//                           }
//                         `}
//                         aria-current={isActive ? "page" : undefined} // Accessibility for active link
//                         aria-disabled={isDisabled}
//                         tabIndex={isDisabled ? -1 : 0} // Accessibility for disabled link
//                       >
//                         {/* Active indicator with layout animation */}
//                         {isActive && (
//                           <motion.div
//                             layoutId="active-sidebar-indicator" // Shared ID for animation
//                             className="absolute inset-0 rounded-full bg-primary/60 dark:bg-primarybox" // Subtle background for active item
//                             initial={false}
//                             transition={{
//                               type: "spring",
//                               stiffness: 300,
//                               damping: 30,
//                             }}
//                           />
//                         )}

//                         {IconComponent && (
//                           <IconComponent
//                             className="w-6 h-6 relative z-10 flex-shrink-0"
//                           />
//                         )}

//                         <span className="relative z-10 truncate">
//                           {item.label}
//                         </span>
//                       </Link>
//                     );
//                   })
//                 )}
//               </nav>

//               {/* Logout Button Area */}
//               {isLoadingBalances ? (
//                 // --- Render Logout Skeleton when loading balances (optional, could just show the button) ---
//                 <NavItemSkeleton />
//               ) : (
//                 // --- Render Actual Logout Button ---
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-3 py-3 px-4 font-medium hover:bg-gray/10 dark:hover:bg-white/5  rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                   // Logout button isn't typically disabled by balance loading state
//                 >
//                   <VscSignOut className="w-6 h-6 flex-shrink-0" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Bottom Nav (Small Screens Only, when sidebar is closed) */}
//       <AnimatePresence>
//         {renderBottomNav && (
//           <div
//             key="bottom-nav"
//             className="sm:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-background border-t z-12 border-gray-200 dark:border-secondarybox/50 "
//           >
//             {/* No skeleton needed here unless balance loading blocks critical nav */}
//             <div className="flex items-center justify-around h-16">
//               {bottomNavLinksData.map((item) => {
//                 const IconComponent = icons[item.icon as keyof typeof icons];
//                 const finalRoute = resolveRoute(item.route);
//                 // Use the specific bottom nav disabled check
//                 const isDisabled = isBottomNavLinkDisabled(item.id);
//                 const isActive =
//                   !isDisabled &&
//                   (pathname === finalRoute ||
//                     (finalRoute !== "/dashboard" &&
//                       pathname.startsWith(finalRoute)));

//                 return (
//                   <Link
//                     key={item.id} // Use unique ID
//                     href={isDisabled ? "#" : finalRoute}
//                     onClick={(e) => {
//                       if (isDisabled) e.preventDefault();
//                       // No need to toggle sidebar here
//                     }}
//                     className={`flex relative flex-col items-center justify-center space-y-1 py-2 grow basis-0 h-full transition-opacity ${
//                       isDisabled
//                         ? "cursor-not-allowed opacity-50 pointer-events-none"
//                         : "opacity-100"
//                     }`}
//                     aria-current={isActive ? "page" : undefined}
//                     aria-disabled={isDisabled}
//                     tabIndex={isDisabled ? -1 : 0}
//                   >
//                     {/* Active indicator line */}
//                     {isActive && (
//                       <motion.div
//                         className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-12 rounded-full bg-primary"
//                         layoutId="bottom-nav-indicator" // Shared layout ID
//                         initial={false}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 35,
//                         }}
//                       />
//                     )}
//                     {/* Icon container */}
//                     <motion.div
//                       className={`p-1 rounded-md transition-colors ${
//                         isActive
//                           ? "text-primary"
//                           : isDisabled
//                           ? "text-neutral-400 dark:text-gray-600"
//                           : "text-neutral-500 dark:text-gray-300 group-hover:text-primary" // Added group hover effect potential
//                       }`}
//                       whileTap={isDisabled ? {} : { scale: 0.9 }} // Tap animation only if not disabled
//                       layout // Animate layout changes if needed
//                     >
//                       {IconComponent && <IconComponent className="size-5" />}
//                     </motion.div>
//                     {/* Label text */}
//                     <span
//                       className={`text-[11px] font-medium transition-colors ${
//                         // Slightly smaller text for bottom nav
//                         isActive
//                           ? "text-neutral-900 dark:text-primary"
//                           : isDisabled
//                           ? "text-neutral-400 dark:text-gray-600"
//                           : "text-neutral-500 dark:text-gray-300"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Sidebar;

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCreditCard,
  FiUserPlus,
  FiSettings,
  FiPlus,
  FiUsers,
} from "react-icons/fi";
import { RiHomeLine, RiHistoryLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext"; // Adjust path if necessary
import { useBalances } from "../../hooks/useBalances"; // Adjust path if necessary
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if necessary
import { IoClose } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";


// Props Interface
interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Navigation Link Definition Interface
interface NavLinkDefinition {
  label: string;
  icon: keyof typeof icons;
  route: string | (() => string); // Can be a static string or a function returning a string
  id: string; // Unique identifier for the link
}

// Icon Mapping
const icons = {
  RiHomeLine,
  GrTransaction,
  BsSend,
  GoArrowUp,
  FiCreditCard,
  FiUserPlus,
  FiSettings,
  RiHistoryLine,
  FiPlus,
  FiUsers,
  TbMoneybag
};

// Breakpoints
const LG_BREAKPOINT = 1024;
const SM_BREAKPOINT = 640;

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
  const { logout, token } = useAuth(); // Get token
  const {
    balances,
    isLoading: isLoadingBalances,
    error: balancesError,
  } = useBalances(); // Fetch balances (hook ideally checks token internally)

  // --- State for Bottom Nav Action Menu ---
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  // --- Simple flag for authentication status ---
  const isAuthenticated = !!token;

  // --- Screen Size Detection ---
  useEffect(() => {
    const checkScreenSizes = () => {
      if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        setIsMobileView(currentWidth < LG_BREAKPOINT);
        const currentlySmall = currentWidth < SM_BREAKPOINT;
        setIsSmallScreen(currentlySmall);
        // Close action menu if screen resizes past the small breakpoint OR if sidebar opens (which hides bottom nav)
        if ((!currentlySmall || sidebarOpen) && isActionMenuOpen) {
          setIsActionMenuOpen(false);
        }
      }
    };
    checkScreenSizes(); // Initial check
    window.addEventListener("resize", checkScreenSizes);
    // Listen for sidebar state changes to close action menu if sidebar opens
    if (sidebarOpen && isActionMenuOpen) {
      setIsActionMenuOpen(false);
    }
    return () => window.removeEventListener("resize", checkScreenSizes);
  }, [isActionMenuOpen, sidebarOpen]); // Re-run if menu or sidebar state changes

  // --- Outside Click Handler (Mobile Sidebar) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close sidebar if clicking outside of it on mobile view
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarOpen &&
        isMobileView === true
      ) {
        toggleSidebar();
      }
      // Note: Action menu closing is handled by backdrop click or item click
    };
    if (sidebarOpen && isMobileView === true) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, isMobileView, toggleSidebar]);

    // --- CORRECTED: Effect to control body scroll ---
    useEffect(() => {
      // Lock body scroll ONLY when the sidebar is open AND it's in mobile overlay mode (isMobileView === true)
      if (sidebarOpen && isMobileView === true) {
        document.body.style.overflow = "hidden";
      } else {
        // Restore body scroll in all other cases (sidebar closed, or not in mobile overlay mode)
        document.body.style.overflow = "";
      }
  
      // Cleanup function to restore scroll on component unmount,
      // especially if it unmounts while scroll is locked.
      return () => {
        document.body.style.overflow = "";
      };
    }, [sidebarOpen, isMobileView]); // Depend on sidebarOpen and isMobileView
    // --- END CORRECTED Effect ---

  // --- Dynamic Route Functions (Memoized with useCallback) ---
  const getAddMoneyRoute = useCallback((): string => {
    if (!isAuthenticated) return "/auth/login"; // Use isAuthenticated flag
    if (isLoadingBalances) return "#"; // Indicate loading, link will be disabled
    if (balancesError) return "/dashboard?error=balances"; // Or handle error appropriately
    // return balances && balances.length > 0
    //   ? "/dashboard/add-money/select-balance"
    //   : "/dashboard/add-balance";
    return "/dashboard/add-money/select-balance";

  }, [balances, isLoadingBalances, balancesError, isAuthenticated]); // Depend on isAuthenticated

  const getSendMoneyRoute = useCallback((): string => {
    if (!isAuthenticated) return "/auth/login"; // Use isAuthenticated flag
    if (isLoadingBalances) return "#"; // Indicate loading, link will be disabled
    if (balancesError) return "/dashboard?error=balances"; // Or handle error appropriately
    return "/dashboard/send/select-balance";
  }, [isLoadingBalances, balancesError, isAuthenticated]); // Depend on isAuthenticated

  // --- Sidebar Nav Link Definitions ---
  const navLinksData: NavLinkDefinition[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "RiHomeLine",
      route: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: "GrTransaction",
      route: "/dashboard/transactions",
    },
    {
      id: "send",
      label: "Send Money",
      icon: "BsSend",
      route: getSendMoneyRoute,
    }, // Use dynamic route function
    {
      id: "add-money",
      label: "Add Money",
      icon: "TbMoneybag",
      route: getAddMoneyRoute,
    }, // Use dynamic route function
    {
      id: "recipients",
      label: "Recipients",
      icon: "FiUserPlus",
      route: "/dashboard/recipients",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "FiSettings",
      route: "/dashboard/your-account",
    },
  ];

  // --- Bottom Nav Data Definitions ---
  const standardBottomNavItems = [
    {
      label: "Home",
      icon: "RiHomeLine",
      route: "/dashboard",
      id: "bottom-home",
    },
    {
      label: "Activity",
      icon: "RiHistoryLine",
      route: "/dashboard/transactions",
      id: "bottom-activity",
    },
    // The middle FAB takes the place of an item here
    {
      label: "Recipients",
      icon: "FiUsers",
      route: "/dashboard/recipients",
      id: "bottom-recipients",
    },
    {
      label: "Settings",
      icon: "FiSettings",
      route: "/dashboard/your-account",
      id: "bottom-settings",
    },
  ];

  // --- Action Items for the Pop-up Menu ---
  const actionItems = [
    {
      id: "bottom-action-send", // Unique ID for disabling check
      label: "Send Money",
      icon: "BsSend",
      route: getSendMoneyRoute, // Use the function
      color: "bg-primary", // Example: Use primary theme color
    },
    {
      id: "bottom-action-add", // Unique ID for disabling check
      label: "Add Money",
      icon: "GoArrowUp",
      route: getAddMoneyRoute, // Use the function
      color: "bg-green-600", // Example: Use an accent color
    },
  ];

  // --- Logout Handler ---
  const handleLogout = () => {
    logout(); // This should update the token state provided by useAuth
    router.push("/auth/login");
    // Close sidebar if it was open on mobile during logout
    if (sidebarOpen && isMobileView) {
      toggleSidebar();
    }
  };

  // --- Render Logic Conditions ---
  // Full sidebar renders on large screens OR on mobile when the sidebar is explicitly open
  const renderFullSidebar =
    isMobileView === false || (isMobileView === true && sidebarOpen);
  // Bottom nav renders ONLY on small screens AND when the sidebar is closed
  const renderBottomNav = isSmallScreen === true && !sidebarOpen;

  // --- Helper Function to Resolve Routes ---
  const resolveRoute = (route: string | (() => string)): string => {
    return typeof route === "function" ? route() : route;
  };

  // --- Disabling Logic for Links/Buttons ---
  const isLinkDisabled = (
    id: string,
    dataSource: "sidebar" | "bottomNav" | "actionMenu" = "sidebar" // Default to sidebar
  ): boolean => {
    let linkDef: { route: string | (() => string) } | undefined;

    // Find the link definition based on the source
    if (dataSource === "sidebar") {
      linkDef = navLinksData.find((link) => link.id === id);
    } else if (dataSource === "bottomNav") {
      linkDef = standardBottomNavItems.find((link) => link.id === id);
    } else if (dataSource === "actionMenu") {
      linkDef = actionItems.find((link) => link.id === id);
    }

    if (!linkDef) return false; // Item not found, shouldn't be disabled

    // Resolve the route first to check for login requirement
    const finalRoute = resolveRoute(linkDef.route);

    // Check if the item specifically depends on balance loading state AND user is authenticated
    const dependsOnBalances = [
      "send",
      "add-money",
      "bottom-action-send",
      "bottom-action-add",
    ].includes(id);

    if (dependsOnBalances) {
        // Disable if not authenticated OR if authenticated but balances are loading
        if (!isAuthenticated || (isAuthenticated && isLoadingBalances)) {
            return true;
        }
    }

    // Disable if the resolved route indicates an issue (e.g., loading placeholder '#')
    // This handles the case where get...Route functions return '#' when loading
    return finalRoute === "#";
  };

  // --- Skeleton Component for Loading States ---
  const NavItemSkeleton = () => (
    <div className="relative w-full flex items-center gap-3 py-3 px-4 font-medium mb-3 text-neutral-400 dark:text-gray-600">
      <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
      <Skeleton className="w-24 h-6 rounded" />
    </div>
  );

  // --- Hydration Guard ---
  // Prevent rendering potentially incorrect UI during SSR/hydration mismatch before screen size is known
  if (isMobileView === null || isSmallScreen === null) {
    return null; // Or a minimal loading state if preferred
  }

  // --- Component Return JSX ---
  return (
    <>
      {/* Backdrop for Mobile Sidebar (when open) */}
      <AnimatePresence>
        {sidebarOpen && isMobileView === true && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleSidebar} // Click backdrop to close sidebar
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Full Sidebar (Desktop or Mobile when open) */}
      <AnimatePresence>
        {renderFullSidebar && (
          <motion.div
            key="full-sidebar"
            ref={sidebarRef}
            className={`w-64 fixed lg:sticky bg-white dark:bg-background h-screen inset-y-0 left-0 ${
              isMobileView ? "z-40" : "lg:z-10" // Higher z-index on mobile to overlay content
            } flex flex-col shadow-lg lg:shadow-none`}
            // Animate sidebar sliding in/out on mobile
            initial={isMobileView ? { x: "-100%" } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobileView ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Sidebar Header */}
            <div className="flex-shrink-0 flex items-center justify-start px-4 lg:h-28 h-20 relative">
              <Link
                href="/dashboard"
                className="inline-block"
                // Close sidebar if clicking logo on mobile
                onClick={() => {
                  if (isMobileView && sidebarOpen) toggleSidebar();
                }}
              >
                <Image
                  src="/assets/images/wise-logo.svg" // Ensure this path is correct in your public folder
                  alt="Wise Logo"
                  width={120}
                  height={30}
                  priority // Load logo faster
                />
              </Link>
              {/* Close button only on mobile */}
              {isMobileView && (
                <button
                  onClick={toggleSidebar}
                  className="absolute top-1/2 right-3 -translate-y-1/2 lg:hidden bg-lightborder cursor-pointer hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox z-10 p-2.5 rounded-full transition-colors duration-300 ease-in-out"
                  aria-label="Close sidebar"
                >
                  <IoClose
                    size={26}
                    className="text-mainheading dark:text-primary"
                  />
                </button>
              )}
            </div>

            {/* Scrollable Navigation Area */}
            <div className="p-2 flex-grow overflow-y-auto [&::-webkit-scrollbar-track]:rounded-3xl [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
              <nav className="flex-grow">
                {/* MODIFIED Condition: Show skeletons ONLY if authenticated AND loading */}
                {isAuthenticated && isLoadingBalances ? (
                  <>
                    {/* Render skeletons based on navLinksData length */}
                    {navLinksData.map((item) => (
                      <NavItemSkeleton key={`${item.id}-skeleton`} />
                    ))}
                  </>
                ) : (
                  // Render actual nav links (links will be disabled/redirect if needed based on auth status)
                  navLinksData.map((item) => {
                    const IconComponent = icons[item.icon];
                    const finalRoute = resolveRoute(item.route);
                    // isLinkDisabled checks token status indirectly via resolveRoute for relevant links
                    const isDisabled = isLinkDisabled(item.id, "sidebar");
                    // Determine active state based on current pathname AND authentication
                    const isActive =
                      isAuthenticated && // Link can only be active if authenticated
                      !isDisabled &&
                      (pathname === finalRoute ||
                        (finalRoute !== "/dashboard" &&
                          pathname.startsWith(finalRoute))); // Match sub-routes too

                    // Define sensitive links that require authentication
                    const requiresAuth = [
                      "transactions",
                      "send",
                      "add-money",
                      "recipients",
                      "settings",
                    ].includes(item.id);
                    const visuallyDisabled =
                      isDisabled || (requiresAuth && !isAuthenticated);

                    return (
                      <Link
                        key={item.id}
                        href={visuallyDisabled ? "#" : finalRoute} // Prevent navigation if disabled or needs auth
                        onClick={(e) => {
                          // Prevent default if visually disabled
                          if (visuallyDisabled) {
                            e.preventDefault();
                            // Optional: Redirect to login if requires auth and not logged in
                            if (requiresAuth && !isAuthenticated) {
                              router.push("/auth/login");
                            }
                            return;
                          }
                          // Close sidebar on mobile after navigation
                          if (isMobileView && sidebarOpen) {
                            toggleSidebar();
                          }
                        }}
                        className={`relative w-full flex items-center gap-3 py-3 px-6 font-medium rounded-full transition duration-200 mb-3
                          ${
                            isActive
                              ? "lg:bg-transparent dark:lg:bg-transparent bg-primary/60 text-neutral-900 dark:bg-primarybox dark:text-primary" // Active styles
                              : visuallyDisabled
                              ? "text-neutral-400 dark:text-gray-600 cursor-not-allowed opacity-60" // Disabled styles (loading or needs auth)
                              : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Default hover styles
                          }
                        `}
                        aria-current={isActive ? "page" : undefined}
                        aria-disabled={visuallyDisabled}
                        tabIndex={visuallyDisabled ? -1 : 0} // Improve accessibility
                      >
                        {/* Animated indicator for active link */}
                        {isActive && (
                          <motion.div
                            layoutId="active-sidebar-indicator" // Shared layout ID for animation
                            className="absolute inset-0 rounded-full bg-primary dark:bg-primarybox"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        {/* Render icon and label */}
                        {IconComponent && (
                          <IconComponent className="w-6 h-6 relative z-10 flex-shrink-0" />
                        )}
                        <span className="relative z-10 truncate">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })
                )}
              </nav>
              {/* Logout Button - Only show if authenticated */}
              {isAuthenticated && (
                <>
                  {/* If authenticated AND loading balances, show skeleton */}
                  {isLoadingBalances ? (
                    <NavItemSkeleton key="logout-skeleton" />
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 py-3 px-6 font-medium rounded-full transition duration-200 mb-2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
                      // disabled={isLoadingBalances} // Optional: disable during loading
                    >
                      <VscSignOut className="w-6 h-6 flex-shrink-0" />
                      <span className="font-medium">Logout</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for Action Menu (when open) */}
      <AnimatePresence>
        {isActionMenuOpen &&
          renderBottomNav && ( // Show only when menu is open AND bottom nav is visible
            <motion.div
              key="action-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsActionMenuOpen(false)} // Click backdrop to close menu
              className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 sm:hidden" // z-index below menu/fab, only on small screens
              aria-hidden="true"
            />
          )}
      </AnimatePresence>

      {/* Bottom Navigation Bar Container */}
      <AnimatePresence>
        {renderBottomNav && (
          <motion.div
            key="bottom-nav"
            initial={{ y: "100%" }} // Animate sliding up from bottom
            animate={{ y: 0 }}
            exit={{ y: "100%" }} // Animate sliding down
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // z-index above backdrop, below action menu/fab pop-up
            className="sm:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-background border-t z-45 rounded-tl-3xl rounded-tr-3xl"
          >
            {/* Flex container for nav items + FAB space */}
            <div className="flex items-center justify-around h-16 relative">
              {standardBottomNavItems.slice(0, 2).map((item) => {
                const IconComponent = icons[item.icon as keyof typeof icons];
                const finalRoute = resolveRoute(item.route);
                // Note: Bottom nav items 'home', 'activity', 'recipients', 'settings' might also need auth check
                const requiresAuth = [
                  "bottom-activity",
                  "bottom-recipients",
                  "bottom-settings",
                ].includes(item.id);
                const isDisabled = isLinkDisabled(item.id, "bottomNav"); // Checks loading state for specific actions if applicable
                const visuallyDisabled =
                  isDisabled || (requiresAuth && !isAuthenticated);
                const isActive =
                  isAuthenticated && // Can only be active if authenticated
                  !visuallyDisabled &&
                  (pathname === finalRoute ||
                    (finalRoute !== "/dashboard" &&
                      pathname.startsWith(finalRoute)));

                return (
                  <Link
                    key={item.id}
                    href={visuallyDisabled ? "#" : finalRoute}
                    onClick={(e) => {
                      if (visuallyDisabled) {
                        e.preventDefault();
                        if (requiresAuth && !isAuthenticated) {
                          router.push("/auth/login");
                        }
                        return;
                      }
                    }}
                    className={`flex relative flex-col items-center justify-center space-y-1 p-1 grow basis-0 h-full transition-colors duration-200 group ${
                      // Use basis-0 and grow for equal spacing
                      visuallyDisabled
                        ? "cursor-not-allowed opacity-50 pointer-events-none"
                        : ""
                    } ${
                      isActive
                        ? "text-primary dark:text-primary"
                        : "text-neutral-500 dark:text-gray-400 hover:text-neutral-800 dark:hover:text-gray-200"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={visuallyDisabled}
                    tabIndex={visuallyDisabled ? -1 : 0}
                  >
                    <div className={`transition-colors`}>
                      {IconComponent && <IconComponent className="size-6" />}
                    </div>
                    <span
                      className={`text-[10px] font-medium transition-colors truncate ${
                        isActive
                          ? "text-primary dark:text-primary"
                          : "text-neutral-600 dark:text-gray-400 group-hover:text-neutral-800 dark:group-hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              {/* Center Action Button Container & Pop-up Menu */}
              <div className="relative flex justify-center grow basis-0 h-full">
                <button
                  onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} // Toggle menu state
                  aria-haspopup="true"
                  aria-expanded={isActionMenuOpen}
                  aria-controls="action-menu-popup" // Links button to the menu
                  aria-label="Open actions menu"
                  // Disable the FAB itself if the user is not logged in, as its actions require auth
                  disabled={!isAuthenticated}
                  className={`absolute -top-1/2 z-50 flex items-center bg-white dark:bg-background rounded-full ${
                    !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                  }`} // Added border classes and disabled state
                >
                  <div className="flex items-center justify-center w-15 h-15 rounded-full bg-primary transition-all duration-200 ease-out hover:bg-primary/90">
                    <BsSend className="size-6 text-neutral-900" />
                    {/* Changed icon and size */}
                  </div>
                </button>
                {/* Action Menu Pop-up - Only render if authenticated */}
                <AnimatePresence>
                  {isAuthenticated &&
                    isActionMenuOpen && ( // Check authentication before rendering menu
                      <motion.div
                        id="action-menu-popup" // ID for aria-controls
                        // Animation: pop up from bottom, fade in, scale up
                        initial={{ y: 10, opacity: 0, scale: 0.9 }}
                        animate={{ y: -78, opacity: 1, scale: 1 }} // Position above the FAB
                        exit={{
                          y: 10,
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.15 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        className="absolute bottom-12 bg-white dark:bg-background rounded-2xl p-3 z-48 flex flex-col gap-1 w-48" // Changed width class
                      >
                        {actionItems.map((action) => {
                          const IconComponent =
                            icons[action.icon as keyof typeof icons];
                          const finalRoute = resolveRoute(action.route);
                          // isLinkDisabled already checks for auth and loading status for these actions
                          const isDisabled = isLinkDisabled(
                            action.id,
                            "actionMenu"
                          );

                          return (
                            <Link
                              key={action.id}
                              href={isDisabled ? "#" : finalRoute}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault(); // Prevent navigation if disabled
                                  return;
                                }
                                setIsActionMenuOpen(false); // Close menu on click/tap
                              }}
                              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150
                              ${
                                isDisabled
                                  ? "text-neutral-400 dark:text-gray-600 cursor-not-allowed opacity-70" // Disabled styles
                                  : `text-neutral-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10` // Enabled styles
                              }`}
                              aria-disabled={isDisabled}
                              tabIndex={isDisabled ? -1 : 0}
                            >
                              {/* Icon with colored background circle */}
                              <div
                                className={`p-2 rounded-md ${
                                  isDisabled
                                    ? "bg-gray-300 dark:bg-gray-700"
                                    : action.color
                                }`}
                              >
                                {IconComponent && (
                                  <IconComponent
                                    className={`size-5 ${
                                      isDisabled
                                        ? "text-gray-500"
                                        : "text-background"
                                    }`}
                                  />
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                {action.label}
                              </span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
              {standardBottomNavItems.slice(2).map((item) => {
                const IconComponent = icons[item.icon as keyof typeof icons];
                const finalRoute = resolveRoute(item.route);
                // Note: Bottom nav items 'home', 'activity', 'recipients', 'settings' might also need auth check
                const requiresAuth = [
                  "bottom-activity",
                  "bottom-recipients",
                  "bottom-settings",
                ].includes(item.id);
                const isDisabled = isLinkDisabled(item.id, "bottomNav"); // Checks loading state if applicable
                const visuallyDisabled =
                  isDisabled || (requiresAuth && !isAuthenticated);
                const isActive =
                  isAuthenticated && // Can only be active if authenticated
                  !visuallyDisabled &&
                  (pathname === finalRoute ||
                    (finalRoute !== "/dashboard" &&
                      pathname.startsWith(finalRoute)));

                return (
                  <Link
                    key={item.id}
                    href={visuallyDisabled ? "#" : finalRoute}
                    onClick={(e) => {
                      if (visuallyDisabled) {
                        e.preventDefault();
                        if (requiresAuth && !isAuthenticated) {
                          router.push("/auth/login");
                        }
                        return;
                      }
                    }}
                    className={`flex relative flex-col items-center justify-center space-y-1 p-1 grow basis-0 h-full transition-colors duration-200 group ${
                      // Use basis-0 and grow for equal spacing
                      visuallyDisabled
                        ? "cursor-not-allowed opacity-50 pointer-events-none"
                        : ""
                    } ${
                      isActive
                        ? "text-primary dark:text-primary"
                        : "text-neutral-500 dark:text-gray-400 hover:text-neutral-800 dark:hover:text-gray-200"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={visuallyDisabled}
                    tabIndex={visuallyDisabled ? -1 : 0}
                  >
                    <div className={`transition-colors`}>
                      {IconComponent && <IconComponent className="size-6" />}
                    </div>
                    <span
                      className={`text-[10px] font-medium transition-colors truncate ${
                        isActive
                          ? "text-primary dark:text-primary"
                          : "text-neutral-600 dark:text-gray-400 group-hover:text-neutral-800 dark:group-hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;