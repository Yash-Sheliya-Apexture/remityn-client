// // frontend/src/components/layout/AdminSidebar.tsx
// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
// } from "react-icons/fa"; // Example icons

// const AdminSidebar = () => {
//   return (
//     <aside className="bg-main text-white w-64 min-h-screen py-6 px-3">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-center text-white">
//           Wise Admin
//         </h2>
//       </div>
//       <nav>
//         <ul>
//           <li className="mb-3">
//             <Link
//               href="/admin"
//               className="flex items-center p-3 rounded transition-colors duration-200"
//             >
//               <FaTachometerAlt className="mr-3 text-lg" />
//               <span className="text-base">Dashboard</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/currencies"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaCoins className="mr-3 text-lg" />
//               <span className="text-base">Currencies</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/users"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaUsers className="mr-3 text-lg" />
//               <span className="text-base">Users</span>
//             </Link>
//           </li>
//           <li className="mb-3">
//             <Link
//               href="/admin/transactions"
//               className="flex items-center p-3 rounded  transition-colors duration-200"
//             >
//               <FaMoneyBillWave className="mr-3 text-lg" />
//               <span className="text-base">Transactions</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;

// frontend/src/components/layout/AdminSidebar.tsx
// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa"; // Example icons
// import { useState } from "react";
// import Image from "next/image";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { FaArrowLeft } from "react-icons/fa6";

// const AdminSidebar = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

//   const toggleCurrenciesDropdown = () => {
//     setIsCurrenciesOpen(!isCurrenciesOpen);
//   };

//   const toggleTransactionsDropdown = () => {
//     setIsTransactionsOpen(!isTransactionsOpen);
//   };

//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout();
//     router.push("/auth/login");
//   };

//   return (
//     <>
//       <aside className="bg-main text-white w-64 py-6 px-3">
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className="flex items-center hover:bg-gray-300/50 justify-between p-3 rounded transition-colors duration-200"
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={toggleCurrenciesDropdown}
//                     className="flex items-center justify-between hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className="flex items-center hover:bg-gray-100/50 justify-between p-3 rounded  transition-colors duration-200"
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <div
//                     onClick={toggleTransactionsDropdown}
//                     className="flex items-center justify-between hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/export"
//                           className="block p-3 rounded hover:bg-gray-100/50 transition-colors duration-200"
//                         >
//                           Export Transactions
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-700">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;

// // frontend/src/components/layout/AdminSidebar.tsx
// "use client"; // Make sure this is a client component

// import Link from "next/link";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa"; // Example icons
// import { useState, useMemo } from "react"; // Import useMemo
// import Image from "next/image";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter, usePathname } from "next/navigation"; // Import usePathname
// import { FaArrowLeft } from "react-icons/fa6";

// const AdminSidebar = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

//   const toggleCurrenciesDropdown = () => {
//     setIsCurrenciesOpen(!isCurrenciesOpen);
//   };

//   const toggleTransactionsDropdown = () => {
//     setIsTransactionsOpen(!isTransactionsOpen);
//   };

//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname(); // Get current path

//   const handleLogout = async () => {
//     await logout();
//     router.push("/auth/login");
//   };

//   // Helper function to check if a link is active
//   const isActive = (href: string) => {
//     return pathname === href;
//   };

//   // Memoize the link classes for better performance
//   const getLinkClasses = useMemo(
//     () => (href: string) => {
//       const baseClasses =
//         "flex items-center justify-between p-3 rounded transition-colors duration-200";
//       const hoverClasses = "hover:bg-gray-300/50"; // Define hover classes separately

//       return isActive(href)
//         ? `${baseClasses} bg-primary text-secondary` // Active state: no hover
//         : `${baseClasses} ${hoverClasses}`; // Inactive state: with hover
//     },
//     []
//   );

//   const getDropdownLinkClasses = useMemo(
//     () => (href: string) => {
//       const baseClasses = "block p-3 rounded transition-colors duration-200";
//       const hoverClasses = "hover:bg-gray-100/50"; // Define hover classes separately

//       return isActive(href)
//         ? `${baseClasses} bg-primary text-secondary` // Active state: no hover
//         : `${baseClasses} ${hoverClasses}`; // Inactive state: with hover
//     },
//     [pathname]
//   );

//   return (
//     <>
//       <aside className="bg-[#1A202C] text-white w-64 py-6 px-3">
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className={getLinkClasses("/admin")} // Use getLinkClasses
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={toggleCurrenciesDropdown}
//                     className={
//                       getLinkClasses("/admin/currencies") + " cursor-pointer"
//                     }
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className={getDropdownLinkClasses(
//                             "/admin/currencies/add"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className={getDropdownLinkClasses(
//                             "/admin/currencies/list"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className={getLinkClasses("/admin/users")} // Use getLinkClasses
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <div
//                     onClick={toggleTransactionsDropdown}
//                     className={
//                       getLinkClasses("/admin/transactions") + " cursor-pointer"
//                     } // Apply cursor-pointer for div
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className={getDropdownLinkClasses(
//                             "/admin/transactions/list"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/export"
//                           className={getDropdownLinkClasses(
//                             "/admin/transactions/export"
//                           )} // Use getDropdownLinkClasses
//                         >
//                           Export Transactions
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-700">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-3 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";

// const AdminSidebar: React.FC = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside className="bg-main text-white w-64 py-6 px-3">
//       <div className="flex flex-col h-full justify-between">
//         <div>
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-center text-white">
//               Wise Admin
//             </h2>
//           </div>
//           <nav>
//             <ul>
//               <li className="mb-3">
//                 <Link
//                   href="/admin"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaTachometerAlt className="mr-3 text-lg" />
//                     <span className="text-base">Dashboard</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li className="mb-3">
//                 <button
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className="flex items-center justify-between w-full hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     <FaCoins className="mr-3 text-lg" />
//                     <span className="text-base">Currencies</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 space-y-2 mt-2">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li className="mb-3">
//                 <Link
//                   href="/admin/users"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin/users")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaUsers className="mr-3 text-lg" />
//                     <span className="text-base">Users</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li className="mb-3">
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className="flex items-center justify-between w-full hover:bg-gray-100/50 p-3 rounded transition-colors duration-200 cursor-pointer"
//                 >
//                   <div className="flex items-center">
//                     <FaMoneyBillWave className="mr-3 text-lg" />
//                     <span className="text-base">Transactions</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-2 space-y-2">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/export"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/export")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Export Transactions
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div>
//           {user && (
//             <>
//               <span className="text-gray-300">{user.username}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//               >
//                 <FaArrowLeft className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong } from "react-icons/fa6";

// const AdminSidebar: React.FC = () => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside className="bg-main text-white w-64 py-6 px-3">
//       <div className="flex flex-col h-full justify-between">
//         <div>
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-center text-white">
//               Wise Admin
//             </h2>
//           </div>
//           <nav>
//             <ul>
//               <li className="mb-3">
//                 <Link
//                   href="/admin"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaTachometerAlt className="mr-3 text-lg" />
//                     <span className="text-base">Dashboard</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li className="mb-3">
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                     isActive("/admin/currencies")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaCoins className="mr-3 text-lg" />
//                     <span className="text-base">Currencies</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 space-y-2 mt-2">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete" // Add your delete currency page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/currencies/delete") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li className="mb-3">
//                 <Link
//                   href="/admin/users"
//                   className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                     isActive("/admin/users")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaUsers className="mr-3 text-lg" />
//                     <span className="text-base">Users</span>
//                   </div>
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li className="mb-3">
//                 <Link
//                   href="/admin/transactions"
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                     isActive("/admin/transactions")
//                       ? "bg-primary text-secondary"
//                       : "hover:bg-gray-100/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <FaMoneyBillWave className="mr-3 text-lg" />
//                     <span className="text-base">Transactions</span>
//                   </div>
//                   <FaChevronDown
//                     className={`text-lg transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-2 space-y-2">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view" // Add your view transaction page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/view") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund" // Add your refund transaction page link
//                         className={`block p-3 rounded transition-colors duration-200 ${
//                           isActive("/admin/transactions/refund") // Update isActive check if needed
//                             ? "bg-primary text-secondary"
//                             : "hover:bg-gray-100/50"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div>
//           {user && (
//             <>
//               <span className="text-gray-300">{user.username}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//               >
//                 <FaArrowLeftLong className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname(); // Correct way to get the current path

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   // Function to check if a link is active
//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <>
//       {/* Mobile Sidebar - Slide in from left */}
//       <aside
//         className={`fixed lg:relative top-0 left-0 z-50 h-full bg-main text-white w-64 py-6 px-3 transition-transform duration-300 ease-in-out transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0" // Slide in/out animation
//         } lg:translate-x-0`} // Always visible on larger screens
//       >
//         <div className="flex flex-col h-full justify-between">
//           <div>
//             <div className="mb-8 flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-center text-white">
//                 Wise Admin
//               </h2>
//               {/* Close button for mobile sidebar */}
//               <button
//                 onClick={toggleSidebar}
//                 className="lg:hidden text-white focus:outline-none"
//               >
//                 <FaXmark className="h-6 w-6" />
//               </button>
//             </div>
//             <nav>
//               <ul>
//                 <li className="mb-3">
//                   <Link
//                     href="/admin"
//                     className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                       isActive("/admin")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaTachometerAlt className="mr-3 text-lg" />
//                       <span className="text-base">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Currencies with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/currencies"
//                     onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                     className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                       isActive("/admin/currencies")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaCoins className="mr-3 text-lg" />
//                       <span className="text-base">Currencies</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isCurrenciesOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isCurrenciesOpen && (
//                     <ul className="pl-6 space-y-2 mt-2">
//                       <li>
//                         <Link
//                           href="/admin/currencies/add"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/add")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Add Currency
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/list"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/list")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Currency List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/currencies/delete" // Add your delete currency page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/currencies/delete") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Delete Currency
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>

//                 <li className="mb-3">
//                   <Link
//                     href="/admin/users"
//                     className={`flex items-center justify-between p-3 rounded transition-colors duration-200 ${
//                       isActive("/admin/users")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaUsers className="mr-3 text-lg" />
//                       <span className="text-base">Users</span>
//                     </div>
//                   </Link>
//                 </li>

//                 {/* Transactions with Dropdown */}
//                 <li className="mb-3">
//                   <Link
//                     href="/admin/transactions"
//                     onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                     className={`flex items-center justify-between w-full p-3 rounded transition-colors duration-200 cursor-pointer ${
//                       isActive("/admin/transactions")
//                         ? "bg-primary text-secondary"
//                         : "hover:bg-gray-100/50"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-3 text-lg" />
//                       <span className="text-base">Transactions</span>
//                     </div>
//                     <FaChevronDown
//                       className={`text-lg transition-transform duration-300 ${
//                         isTransactionsOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {isTransactionsOpen && (
//                     <ul className="pl-6 mt-2 space-y-2">
//                       <li>
//                         <Link
//                           href="/admin/transactions/list"
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/list")
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Transaction List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/view" // Add your view transaction page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/view") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           View Transaction
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/admin/transactions/refund" // Add your refund transaction page link
//                           className={`block p-3 rounded transition-colors duration-200 ${
//                             isActive("/admin/transactions/refund") // Update isActive check if needed
//                               ? "bg-primary text-secondary"
//                               : "hover:bg-gray-100/50"
//                           }`}
//                         >
//                           Refund Transaction
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div>
//             {user && (
//               <>
//                 <span className="text-gray-300">{user.username}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary cursor-pointer flex justify-center group gap-2 items-center text-secondary font-medium py-2 w-full focus:outline-none focus:shadow-outline"
//                 >
//                   <FaArrowLeftLong className="size-5 group-hover:-translate-x-5 transition-transform duration-300 ease-in-out" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-white border-r border-gray-300 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`} // Removed bg-gray-800, added white background and border
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-5 border-b border-gray-300">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wice Admin Logo"
//             />
//           </div>
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden bg-gray p-2 cursor-pointer absolute top-0 right-0 text-gray-500 hover:text-gray-600 focus:outline-none"
//           >
//             <FaXmark className="size-5 text-white" /> {/* Smaller close icon */}
//           </button>
//           <nav>
//             {/* Reduced spacing between nav items */}
//             <ul className="space-y-4 mt-5">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={`group flex gap-4 items-center p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin")
//                       ? "bg-gray-100 text-main font-semibold" // More subtle active state
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaTachometerAlt className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />{" "}
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`group flex items-center justify-between w-full p-4 font-medium  hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/currencies") ||
//                     pathname.startsWith("/admin/currencies/")
//                       ? "bg-gray-100 text-main font-semibold" // Active state for dropdown parent
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaCoins className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     {" "}
//                     {/* Reduced spacing in dropdown */}
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Add Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/currencies/delete")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={`group flex items-center gap-4 p-4 font-medium  hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/users")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaUsers className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`group flex items-center justify-between w-full p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                     isActive("/admin/transactions") ||
//                     pathname.startsWith("/admin/transactions/")
//                       ? "bg-gray-100 text-main font-semibold" // Active state for dropdown parent
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaMoneyBillWave className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`ml-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     {" "}
//                     {/* Reduced spacing in dropdown */}
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/view")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors ${
//                           isActive("/admin/transactions/refund")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-200">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex items-center justify-center w-full p-4 font-medium bg-gray-50 hover:bg-gray-100 hover:text-main transition-colors text-gray-600" // Neutral logout button
//             >
//               <FaArrowLeftLong className="mr-2 h-4 w-4 group-hover:text-main transition-colors" />
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// // AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState, useEffect } from "react"; // Import useEffect
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const [activePath, setActivePath] = useState<string | null>(null); // State to track active path

//   useEffect(() => {
//     setActivePath(pathname); // Update activePath on pathname change
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => {
//     return activePath === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return activePath?.startsWith(basePath) || false;
//   };

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-white border-r border-gray-300 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`}
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-5 border-b border-gray-300">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wice Admin Logo"
//             />
//           </div>
//           <nav>
//             <ul className="space-y-2 mt-5">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={`group flex gap-4 items-center p-4 lg:text-lg text-sm font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isActive("/admin")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaTachometerAlt className="size-5 text-gray-700 group-hover:text-gray-700 transition-colors" />
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/currencies"
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`group flex items-center justify-between w-full p-4 lg:text-lg text-sm font-medium  hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isDropdownActive("/admin/currencies")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaCoins className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-3" : "-rotate-90"
//                     }`}
//                   />
//                 </Link>

//                 {isCurrenciesOpen && (
//                   <ul className="pl-6 mt-2 space-y-1">
//                     <li>
//                       <button
//                         className={`block w-full text-left cursor-pointer p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/add")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         New Currency
//                       </button>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/currencies/delete")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={`group flex items-center gap-4 p-4 lg:text-lg text-sm font-medium  hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isActive("/admin/users")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <FaUsers className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions with Dropdown */}
//               <li>
//                 <Link
//                   href="/admin/transactions"
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`group flex items-center justify-between w-full p-4 lg:text-lg text-sm cursor-pointer font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                     isDropdownActive("/admin/transactions")
//                       ? "bg-gray-100 text-main font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <FaMoneyBillWave className="size-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`ml-2 h-4 w-4 text-gray-500 group-hover:text-gray-600 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-3" : "-rotate-90"
//                     }`}
//                   />
//                 </Link>

//                 {isTransactionsOpen && (
//                   <ul className="pl-6 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/list")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/view")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={`block p-4 font-medium hover:bg-gray-100 hover:text-main transition-colors relative overflow-hidden ${
//                           isActive("/admin/transactions/refund")
//                             ? "bg-gray-100 text-main font-semibold"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-300">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex gap-2.5 items-center lg:text-lg text-sm font-semibold cursor-pointer justify-center w-full p-4  hover:text-main transition-colors text-gray-600"
//             >
//               <FaArrowLeftLong className="size-4 group-hover:-translate-x-5 group-hover:text-main transition-all duration-300 ease-in-out" />
//               LogOut
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// // AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaCoins,
//   FaUsers,
//   FaTachometerAlt,
//   FaMoneyBillWave,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useState, useEffect } from "react"; // Import useEffect
// import { useAuth } from "../../hooks/useAuth";
// import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
// import Image from "next/image";

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [isCurrenciesOpen, setIsCurrenciesOpen] = useState(false);
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const [activePath, setActivePath] = useState<string | null>(null); // State to track active path

//   useEffect(() => {
//     setActivePath(pathname); // Update activePath on pathname change
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const isActive = (path: string): boolean => {
//     return activePath === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return activePath?.startsWith(basePath) || false;
//   };

//   const navLinkClasses = (isActive: boolean) => {
//     return `group flex gap-3 items-center px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200
//             hover:bg-indigo-50 hover:text-indigo-700
//             ${
//               isActive
//                 ? "bg-indigo-100 text-indigo-900 font-semibold"
//                 : "text-gray-600"
//             }`;
//   };

//   const dropdownLinkClasses = (isActive: boolean) => {
//     return `block px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200
//             hover:bg-indigo-50 hover:text-indigo-700
//             ${
//               isActive
//                 ? "bg-indigo-100 text-indigo-900 font-semibold"
//                 : "text-gray-600"
//             }`;
//   };

//   return (
//     <aside
//       className={`fixed lg:relative top-0 left-0 z-50 h-full bg-gray-50 border-r border-gray-200 w-64 transition-transform duration-300 ease-in-out transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       } lg:translate-x-0`}
//     >
//       <div className="h-full flex flex-col justify-between">
//         <div className="py-4">
//           <div className="flex justify-center items-center py-6">
//             <Link href="/admin" className="flex items-center space-x-2">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 height={30}
//                 width={30}
//                 alt="Wice Admin Logo"
//               />
//               <span className="font-bold text-xl text-gray-800">
//                 Wice Admin
//               </span>
//             </Link>
//           </div>

//           <nav className="mt-6">
//             <ul className="space-y-1">
//               <li>
//                 <Link
//                   href="/admin"
//                   className={navLinkClasses(isActive("/admin"))}
//                 >
//                   <FaTachometerAlt className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                   Dashboard
//                 </Link>
//               </li>

//               {/* Currencies Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsCurrenciesOpen(!isCurrenciesOpen)}
//                   className={`${navLinkClasses(
//                     isDropdownActive("/admin/currencies")
//                   )} w-full flex justify-between items-center`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <FaCoins className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                     Currencies
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-indigo-700 transition-transform duration-300 ${
//                       isCurrenciesOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </button>

//                 {isCurrenciesOpen && (
//                   <ul className="ml-2 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/currencies/add"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/add")
//                         )}
//                       >
//                         New Currency
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/list"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/list")
//                         )}
//                       >
//                         Currency List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/currencies/delete"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/currencies/delete")
//                         )}
//                       >
//                         Delete Currency
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <Link
//                   href="/admin/users"
//                   className={navLinkClasses(isActive("/admin/users"))}
//                 >
//                   <FaUsers className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                   Users
//                 </Link>
//               </li>

//               {/* Transactions Dropdown */}
//               <li>
//                 <button
//                   onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
//                   className={`${navLinkClasses(
//                     isDropdownActive("/admin/transactions")
//                   )} w-full flex justify-between items-center`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <FaMoneyBillWave className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//                     Transactions
//                   </div>
//                   <FaChevronDown
//                     className={`size-4 text-gray-500 group-hover:text-indigo-700 transition-transform duration-300 ${
//                       isTransactionsOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </button>

//                 {isTransactionsOpen && (
//                   <ul className="ml-2 mt-1 space-y-1">
//                     <li>
//                       <Link
//                         href="/admin/transactions/list"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/list")
//                         )}
//                       >
//                         Transaction List
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/view"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/view")
//                         )}
//                       >
//                         View Transaction
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/admin/transactions/refund"
//                         className={dropdownLinkClasses(
//                           isActive("/admin/transactions/refund")
//                         )}
//                       >
//                         Refund Transaction
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Logout Section at Bottom */}
//         <div className="border-t border-gray-200 py-2">
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="group flex justify-start items-center gap-3 px-4 py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-indigo-700 w-full"
//             >
//               <FaArrowLeftLong className="size-4 text-gray-500 group-hover:text-indigo-700 transition-colors" />
//               LogOut
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../hooks/useAuth";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaMoneyBillWave,
//   FaChevronRight,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import ThemeToggle from "../../contexts/ThemeToggle"; // Import ThemeToggle

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [dashboardDropdownOpen, setDashboardDropdownOpen] =
//     useState<boolean>(false); // State for Dashboard dropdown
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   useEffect(() => {
//     // Update dropdown state based on current path
//     if (pathname?.startsWith("/admin/currencies")) {
//       setActiveDropdown("currencies");
//     } else if (pathname?.startsWith("/admin/transactions")) {
//       setActiveDropdown("transactions");
//     } else if (pathname?.startsWith("/admin/dashboard")) {
//       setDashboardDropdownOpen(true); // Open dashboard dropdown if on a dashboard subpage
//     }
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const toggleDropdown = (dropdown: string) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//     if (dropdown === "dashboard") {
//       setDashboardDropdownOpen(!dashboardDropdownOpen);
//     }
//   };

//   const isActive = (path: string): boolean => {
//     return pathname === path;
//   };

//   const isDropdownActive = (basePath: string): boolean => {
//     return pathname?.startsWith(basePath) || false;
//   };

//   const isDashboardActive = (): boolean => {
//     return isActive("/admin"); // Modified to check for exact match of /admin
//   };

//   const isDashboardDropdownActive = (): boolean => {
//     return pathname?.startsWith("/admin/dashboard") || false; // Keep this for dropdown active state
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:relative top-0 left-0 z-40 h-full border-r transition-all duration-300 ease-in-out${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }lg:translate-x-0 w-64 flex flex-col`}
//       >
//         {/* Mobile Close Button */}
//         <button
//           className="absolute top-4 right-4 lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
//           onClick={toggleSidebar}
//         >
//           <FaTimes className="size-5" />
//         </button>

//         {/* Logo Section */}
//         <div className="p-3 border-b">
//           <div className="h-14 flex justify-center items-center">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wise Admin Logo"
//               className="transition-opacity"
//             />
//           </div>
//         </div>

//         {/* User Profile Summary */}
//         {user && (
//           <div className="flex items-center gap-3 p-3 border-b">
//             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative">
//               <span className="text-neutral-900 font-semibold uppercase">
//                 {user.email?.charAt(0) || "A"}
//               </span>
//             </div>
//             <div className="overflow-hidden space-y-1 w-[calc(100%-60px)]">
//               <p className="font-semibold text-neutral-900 dark:text-white truncate">
//                 {user.name || "Admin User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
//                 {user.email || "admin@example.com"}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
//           <div className="px-4 mb-4">
//             <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white px-4">
//               Main
//             </span>
//           </div>

//           <ul className="space-y-2.5 px-3">
//             {/* Dashboard */}
//             <li>
//               <Link
//                 href="/admin"
//                 onClick={() => toggleDropdown("dashboard")}
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//     ${
//       isDashboardActive() || isDashboardDropdownActive()
//         ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//     }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaChartPie className="size-5" />
//                   <span className="font-medium">Dashboard</span>
//                 </div>
//                 <FaChevronRight
//                   className={`size-3.5 transition-transform duration-200 ${
//                     dashboardDropdownOpen ? "rotate-90" : ""
//                   }`}
//                 />
//               </Link>

//               {dashboardDropdownOpen && (
//                 <ul className="mt-2 ml-6 space-y-1 border-l-2 pl-4">
//                   {/* Demo 1 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo1"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo1")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 1
//                     </Link>
//                   </li>
//                   {/* Demo 2 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo2"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo2")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 2
//                     </Link>
//                   </li>
//                   {/* Demo 3 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo3"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo3")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 3
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Currencies */}
//             <li>
//               <Link
//                 href="/admin/currencies"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/currencies")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaCoins className="size-5" />
//                 <span className="font-medium">Currencies</span>
//               </Link>
//             </li>

//             {/* Users */}
//             <li>
//               <Link
//                 href="/admin/users"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/users")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaUsers className="size-5" />
//                 <span className="font-medium">Users</span>
//               </Link>
//             </li>

//             {/* Add-Money */}
//             <li>
//               <Link
//                 href="/admin/add-money"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/add-money")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <IoMdAddCircleOutline className="size-5" />
//                   <span className="font-medium">Add-Money</span>
//                 </div>
//               </Link>
//             </li>

//             {/* Send-Money */}
//             <li>
//               <Link
//                 href="/admin/transfer"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/transfer")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaMoneyBillWave className="size-5" />
//                   <span className="font-medium">Send-Money</span>
//                 </div>
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Footer Actions */}
//         <div className="p-4 border-t space-y-2">
//           {/* Theme Toggle for Admin Sidebar */}
//           <div className="mb-2 flex justify-center">
//             <ThemeToggle location="admin" className="inline-block" />
//           </div>
//           {/* Logout Button */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 rounded-4xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
//             >
//               <FaSignOutAlt className="size-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* Mobile Toggle Button - Outside the sidebar */}
//       <button
//         className="fixed bottom-6 left-6 z-30 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
//         onClick={toggleSidebar}
//       >
//         <FaBars className="size-5" />
//       </button>
//     </>
//   );
// };

// export default AdminSidebar;

// // frontend/src/app/components/layout/AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaMoneyBillWave,
//   FaChevronRight,
//   FaTimes,
// } from "react-icons/fa";
// import { GrLogout } from "react-icons/gr";

// import { IoMdAddCircleOutline } from "react-icons/io";
// import ThemeToggle from "../../contexts/ThemeToggle"; // Import ThemeToggle

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [dashboardDropdownOpen, setDashboardDropdownOpen] =
//     useState<boolean>(false); // State for Dashboard dropdown
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   useEffect(() => {
//     // Update dropdown state based on current path
//     if (pathname?.startsWith("/admin/currencies")) {
//       setActiveDropdown("currencies");
//     } else if (pathname?.startsWith("/admin/transactions")) {
//       setActiveDropdown("transactions");
//     } else if (pathname?.startsWith("/admin/dashboard")) {
//       setDashboardDropdownOpen(true); // Open dashboard dropdown if on a dashboard subpage
//     }
//   }, [pathname]);

//   const handleLogout = async () => {
//     await logout();
//     window.location.href = "/auth/login";
//   };

//   const toggleDropdown = (dropdown: string) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//     if (dropdown === "dashboard") {
//       setDashboardDropdownOpen(!dashboardDropdownOpen);
//     }
//   };

//   const isActive = (path: string): boolean => {
//     return pathname === path;
//   };

//   const isDashboardActive = (): boolean => {
//     return isActive("/admin"); // Modified to check for exact match of /admin
//   };

//   const isDashboardDropdownActive = (): boolean => {
//     return pathname?.startsWith("/admin/dashboard") || false; // Keep this for dropdown active state
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:relative top-0 left-0 z-50 h-full border-r transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         } lg:translate-x-0 w-64 flex flex-col`} // Modified classes for left sidebar
//       >
//         {/* Mobile Close Button */}
//         <button
//           className="absolute top-4 right-4 lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" // Modified right-4
//           onClick={toggleSidebar}
//         >
//           <FaTimes className="size-5" />
//         </button>

//         {/* Logo Section */}
//         <div className="p-3 border-b">
//           <div className="h-14 flex justify-center items-center">
//             <Image
//               src="/assets/images/wise-logo.svg"
//               height={100}
//               width={100}
//               alt="Wise Admin Logo"
//               className="transition-opacity"
//             />
//           </div>
//         </div>

//         {/* User Profile Summary */}
//         {user && (
//           <div className="flex items-center gap-3 p-3 border-b">
//             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative">
//               <span className="text-neutral-900 font-semibold uppercase">
//                 {user.email?.charAt(0) || "A"}
//               </span>
//             </div>
//             <div className="overflow-hidden space-y-1 w-[calc(100%-60px)]">
//               <p className="font-semibold text-neutral-900 dark:text-white truncate">
//                 {user.name || "Admin User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
//                 {user.email || "admin@example.com"}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
//           <div className="px-4 mb-4">
//             <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white px-4">
//               Main
//             </span>
//           </div>

//           <ul className="space-y-2.5 px-3">
//             {/* Dashboard */}
//             <li>
//               <Link
//                 href="/admin"
//                 onClick={() => toggleDropdown("dashboard")}
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//     ${
//       isDashboardActive() || isDashboardDropdownActive()
//         ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//     }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaChartPie className="size-5" />
//                   <span className="font-medium">Dashboard</span>
//                 </div>
//                 <FaChevronRight
//                   className={`size-3.5 transition-transform duration-200 ${
//                     dashboardDropdownOpen ? "rotate-90" : ""
//                   }`}
//                 />
//               </Link>

//               {dashboardDropdownOpen && (
//                 <ul className="mt-2 ml-6 space-y-1 border-l-2 pl-4">
//                   {/* Demo 1 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo1"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo1")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 1
//                     </Link>
//                   </li>
//                   {/* Demo 2 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo2"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo2")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 2
//                     </Link>
//                   </li>
//                   {/* Demo 3 */}
//                   <li>
//                     <Link
//                       href="/admin/dashboard/demo3"
//                       className={`block px-4 py-2.5 rounded-md transition-all duration-200
//                       ${
//                         isActive("/admin/dashboard/demo3")
//                           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                       }`}
//                     >
//                       Demo 3
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Currencies */}
//             <li>
//               <Link
//                 href="/admin/currencies"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/currencies")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaCoins className="size-5" />
//                 <span className="font-medium">Currencies</span>
//               </Link>
//             </li>

//             {/* Users */}
//             <li>
//               <Link
//                 href="/admin/users"
//                 className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/users")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <FaUsers className="size-5" />
//                 <span className="font-medium">Users</span>
//               </Link>
//             </li>

//             {/* Add-Money */}
//             <li>
//               <Link
//                 href="/admin/add-money"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/add-money")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <IoMdAddCircleOutline className="size-5" />
//                   <span className="font-medium">Add-Money</span>
//                 </div>
//               </Link>
//             </li>

//             {/* Send-Money */}
//             <li>
//               <Link
//                 href="/admin/transfer"
//                 className={`flex items-center justify-between w-full cursor-pointer px-4 py-3 rounded-4xl transition-all duration-200
//                 ${
//                   isActive("/admin/transfer")
//                     ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                     : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <FaMoneyBillWave className="size-5" />
//                   <span className="font-medium">Send-Money</span>
//                 </div>
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Footer Actions */}
//         <div className="p-4 border-t space-y-2">
//           {/* Theme Toggle for Admin Sidebar */}
//           <div className="mb-2 flex justify-center">
//             <ThemeToggle location="admin" className="inline-block" />
//           </div>
//           {/* Logout Button */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 rounded-4xl text-red-600 bg-red-600/20 hover:bg-red-500/30 transition-all duration-200"
//             >
//               <GrLogout className="size-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;











// // frontend/src/app/components/layout/AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext";
// import React, { useState, useEffect, useRef } from "react"; // Import React and hooks
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { motion } from "framer-motion"; // Import motion
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaMoneyBillWave,
//   FaChevronRight,
//   FaTimes,
// } from "react-icons/fa";
// import { MdManageAccounts } from "react-icons/md";
// import { GrLogout } from "react-icons/gr";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import ThemeToggle from "../../contexts/ThemeToggle";

// // --- Reusable Nav Item Component (Keep as is) ---
// interface SidebarNavItemProps {
//   href: string;
//   icon: IconType;
//   label: string;
//   isActive: boolean;
//   onClick?: () => void; // Add onClick prop for mobile close
// }

// const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, onClick }) => {
//   return (
//     <Link
//       href={href}
//       onClick={onClick} // Call onClick when link is clicked
//       className={`flex items-center gap-3 py-2 pl-2 rounded-4xl transition-all duration-200 group ${
//         isActive
//           ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//       }`}
//     >
//       <div className={`p-2 rounded-full transition-colors duration-200`}>
//         <Icon className={`size-5 transition-colors duration-200 ${
//             isActive ? "text-neutral-900 dark:text-primary" : ""
//         }`} />
//       </div>
//       <span className="font-medium">{label}</span>
//     </Link>
//   );
// };
// // --- End Reusable Nav Item Component ---

// interface AdminSidebarProps {
//   isSidebarOpen: boolean; // Renamed from sidebarOpen for clarity if preferred, keep AdminSidebar prop name consistent
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement or HTMLAsideElement
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { user, logout } = useAuth();
//   const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState<boolean>(false);

//   // --- Effect for Mobile View Detection ---
//   useEffect(() => {
//     const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
//     checkMobileView(); // Initial check
//     window.addEventListener("resize", checkMobileView);
//     return () => window.removeEventListener("resize", checkMobileView);
//   }, []);

//   // --- Effect for Click Outside ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         isSidebarOpen && // Use the prop directly
//         isMobileView === true // Only on mobile
//       ) {
//         toggleSidebar(); // Call the passed toggle function
//       }
//     };

//     // Add listener only when sidebar is open on mobile
//     if (isSidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen, isMobileView, toggleSidebar]); // Dependencies

//   // --- Active State Logic (Keep as is) ---
//   const isDashboardRoute = pathname === "/admin";
//   const isDashboardSubRoute = pathname?.startsWith("/admin/dashboard");
//   const isCurrenciesRoute = pathname === "/admin/currencies";
//   const isUsersRoute = pathname === "/admin/users";
//   const isAddMoneyRoute = pathname === "/admin/add-money";
//   const isTransferRoute = pathname === "/admin/transfer";
//   const isKycManagementRoute = pathname === "/admin/kyc-management";

//   const isDashboardSectionActive = isDashboardRoute || isDashboardSubRoute;

//   // --- Effect for Dropdown (Keep as is, but maybe close on mobile nav click?) ---
//   useEffect(() => {
//     if (isDashboardSubRoute) {
//       setDashboardDropdownOpen(true);
//     } else if (!isDashboardRoute && !isDashboardSubRoute) {
//       setDashboardDropdownOpen(false);
//     }
//   }, [pathname, isDashboardRoute, isDashboardSubRoute]);

//   // --- Handlers ---
//   const handleLogout = async () => {
//     await logout();
//     if (isSidebarOpen && isMobileView) { // Close sidebar on mobile after action
//         toggleSidebar();
//     }
//     window.location.href = "/auth/login"; // Or use Next router if preferred
//   };

//   const toggleDashboardSubmenu = () => {
//     setDashboardDropdownOpen((prevOpen) => !prevOpen);
//   };

//   // Helper to close sidebar on mobile when a nav item is clicked
//   const handleMobileNavClick = () => {
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//     // Optional: Close dropdown when navigating away on mobile?
//     // setDashboardDropdownOpen(false);
//   };

//    const handleDashboardLinkClick = () => {
//      if (isSidebarOpen && isMobileView) {
//        toggleSidebar();
//      }
//      // Don't toggle the submenu here, just navigate
//    };

//   const isSubmenuActive = (path: string): boolean => pathname === path;

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       {isSidebarOpen && isMobileView === true && ( // Condition based on state and prop
//         <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.5 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.2 }}
//           onClick={toggleSidebar} // Allow closing by clicking backdrop
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden" // Use z-index lower than sidebar
//           aria-hidden="true"
//         />
//       )}

//       {/* Conditionally render Sidebar based on screen size and open state */}
//       {/* Logic: Render if isMobileView isn't determined yet (null), OR if it's desktop (false), OR if it's mobile AND open (true && true) */}
//       {isMobileView === null || isMobileView === false || (isSidebarOpen && isMobileView === true) ? (
//         <motion.aside
//           ref={sidebarRef} // Attach ref for click outside detection
//           className={`w-64 fixed bg-white dark:bg-neutral-900 h-full inset-y-0 left-0 lg:relative lg:z-auto z-50 border-r dark:border-neutral-700 flex flex-col`} // Base styles + z-index
//           // Framer Motion props based on Sidebar component
//           initial={isMobileView ? { x: "-100%" } : {}} // Start off-screen on mobile
//           animate={isMobileView ? { x: isSidebarOpen ? 0 : "-100%" } : {}} // Animate based on open state on mobile, always visible on desktop
//           exit={isMobileView ? { x: "-100%" } : {}} // Animate out on mobile
//           transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }} // Only transition on mobile
//         >
//           {/* Mobile Close Button - Render only on mobile */}
//           {isMobileView && (
//             <button
//               className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 z-10" // z-10 to be above content
//               onClick={toggleSidebar}
//               aria-label="Close sidebar"
//             >
//               <FaTimes className="size-5" />
//             </button>
//           )}

//           {/* Logo Section (Keep as is) */}
//           <div className="p-3 border-b dark:border-neutral-700">
//             <div className="h-14 flex justify-center items-center">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 height={100}
//                 width={100}
//                 alt="Wise Admin Logo"
//                 className="h-auto w-auto max-h-10"
//                 priority
//               />
//             </div>
//           </div>

//           {/* User Profile Summary (Keep as is) */}
//           {user && (
//             <div className="flex items-center gap-3 p-3 border-b dark:border-neutral-700">
//               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
//                 <span className="text-neutral-900 font-semibold uppercase text-lg">
//                   {user.email?.charAt(0) || "A"}
//                 </span>
//               </div>
//               <div className="overflow-hidden space-y-0.5">
//                 <p className="font-semibold capitalize text-neutral-900 dark:text-white truncate text-sm">
//                   {user.fullName || "Admin User"}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                   {user.email || "admin@example.com"}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           {/* Add scrollbar styling */}
//           <nav className="flex-1 py-4 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-lightborder dark:[&::-webkit-scrollbar-track]:bg-primarybox dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//             <div className="px-4 mb-4">
//               <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3">
//                 Main
//               </span>
//             </div>

//             <ul className="space-y-1 px-3">
//               {/* Dashboard Section */}
//               <li>
//                 <div
//                   className={`flex items-center justify-between w-full py-2 pl-2 rounded-4xl transition-all duration-200 group ${
//                     isDashboardSectionActive
//                       ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary"
//                       : "text-neutral-500 dark:text-gray-300"
//                   }`}
//                 >
//                   <Link
//                     href="/admin"
//                     onClick={handleDashboardLinkClick} // Close sidebar on mobile click
//                     className={`flex items-center gap-3 flex-grow ${!isDashboardSectionActive ? "hover:text-neutral-900 dark:hover:text-primary" : ""}`}
//                   >
//                     <div className={`p-2 rounded-full transition-colors duration-200`}>
//                       <FaChartPie className={`size-5 transition-colors duration-200 ${ isDashboardSectionActive ? "text-neutral-900 dark:text-primary" : "" }`} />
//                     </div>
//                     <span className="font-medium">Dashboard</span>
//                   </Link>
//                   <button
//                     onClick={toggleDashboardSubmenu}
//                     className={`p-2 mr-1 rounded-full transition-colors duration-200 ${
//                       !isDashboardSectionActive ? "hover:bg-gray-500/10 dark:hover:bg-gray-700/30" : ""
//                     }`}
//                     aria-label="Toggle dashboard submenu"
//                     aria-expanded={dashboardDropdownOpen}
//                   >
//                     <FaChevronRight
//                       className={`size-3.5 transition-transform duration-200 ${ dashboardDropdownOpen ? "rotate-90" : "" } ${
//                           isDashboardSectionActive ? "" : "text-neutral-500 dark:text-gray-400"
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 {/* Sub-menu */}
//                 {dashboardDropdownOpen && (
//                   <ul className="mt-1 ml-7 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
//                     {[
//                       { href: "/admin/dashboard/demo1", label: "Demo 1" },
//                       { href: "/admin/dashboard/demo2", label: "Demo 2" },
//                       { href: "/admin/dashboard/demo3", label: "Demo 3" }
//                     ].map(item => (
//                       <li key={item.href}>
//                         <Link
//                           href={item.href}
//                           onClick={handleMobileNavClick} // Close sidebar on mobile click
//                           className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
//                             isSubmenuActive(item.href)
//                               ? "bg-primary/60 dark:bg-primarybox text-neutral-900 dark:text-primary font-medium"
//                               : "text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-primary hover:bg-gray-500/5 dark:hover:bg-gray-700/20"
//                           }`}
//                         >
//                           {item.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               {/* Other Nav Items using SidebarNavItem */}
//               {/* Pass handleMobileNavClick to close sidebar on mobile */}
//               <li> <SidebarNavItem href="/admin/currencies" icon={FaCoins} label="Currencies" isActive={isCurrenciesRoute} onClick={handleMobileNavClick} /> </li>
//               <li> <SidebarNavItem href="/admin/users" icon={FaUsers} label="Users" isActive={isUsersRoute} onClick={handleMobileNavClick} /> </li>
//               <li> <SidebarNavItem href="/admin/add-money" icon={IoMdAddCircleOutline} label="Add-Money" isActive={isAddMoneyRoute} onClick={handleMobileNavClick} /> </li>
//               <li> <SidebarNavItem href="/admin/transfer" icon={FaMoneyBillWave} label="Send-Money" isActive={isTransferRoute} onClick={handleMobileNavClick} /> </li>
//               <li> <SidebarNavItem href="/admin/kyc-management" icon={MdManageAccounts} label="KYC Management" isActive={isKycManagementRoute} onClick={handleMobileNavClick} /> </li>
            
//             </ul>
//           </nav>

//           {/* Footer Actions (Keep as is, but inside motion.aside) */}
//           <div className="p-4 border-t dark:border-neutral-700 mt-auto space-y-3">
//             <div className="flex justify-center">
//               <ThemeToggle location="admin" className="inline-block" />
//             </div>
//             {user && (
//               <button
//                 onClick={handleLogout} // handleLogout already closes sidebar on mobile
//                 className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 dark:text-red-500 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/15 dark:hover:bg-red-500/25 transition-colors duration-200"
//               >
//                 <GrLogout className="size-5" aria-hidden="true"/>
//                 <span className="font-medium text-sm">Logout</span>
//               </button>
//             )}
//           </div>
//         </motion.aside>
//       ) : null /* Render nothing if mobile and closed */}
//     </>
//   );
// };

// export default AdminSidebar;




// // frontend/src/app/components/layout/AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// // Import motion
// import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence, might be useful later
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaMoneyBillWave,
//   FaTimes,
// } from "react-icons/fa";
// import { MdManageAccounts } from "react-icons/md";
// import { GrLogout } from "react-icons/gr";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import ThemeToggle from "../../contexts/ThemeToggle"; // Ensure path is correct
// import { FiX } from "react-icons/fi";

// // --- Reusable Nav Item Component (Modified for Animation) ---
// interface SidebarNavItemProps {
//   href: string;
//   icon: IconType;
//   label: string;
//   isActive: boolean;
//   onClick?: () => void;
// }

// const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, onClick }) => {
//   return (
//     // 1. Add position: relative to the Link container
//     <Link
//       href={href}
//       onClick={onClick}
//       // 5. Remove active background style from Link itself
//       //    Keep hover styles for inactive items
//       className={`relative flex items-center gap-3 py-2 pl-2 rounded-4xl transition-all duration-200 group ${ // Use rounded-md to match indicator shape
//         isActive
//           ? "text-neutral-900 dark:text-primary" // Active text color remains
//           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary" // Inactive + hover styles
//       }`}
//     >
//        {/* 6. Ensure Icon and Text are above the indicator */}
//        {/* Icon Container */}
//        <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
//            <Icon className={`size-5 transition-colors duration-200 `} />
//        </div>
//        {/* Label */}
//        <span className="relative z-10 font-medium">{label}</span>

//        {/* 2. Conditionally render the animated background */}
//        {isActive && (
//         <motion.div
//           // 3. Unique layoutId tells Framer Motion to animate between elements with the same ID
//           layoutId="active-sidebar-indicator"
//           // 4. Style the indicator: absolute positioning, fills the link, rounded, background color, behind content
//           className="absolute inset-0 bg-primary/60 dark:bg-primarybox rounded-full -z-10"
//           transition={{
//              type: "spring", // Or "tween"
//              stiffness: 350,
//              damping: 30,
//              // duration: 0.2 // if using tween
//           }}
//         />
//       )}
//     </Link>
//   );
// };
// // --- End Reusable Nav Item Component ---

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { user, logout } = useAuth();

//   // --- Effects (Keep as is) ---
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
//         isSidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (isSidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen, isMobileView, toggleSidebar]);

//   // --- Active State Logic (Keep as is) ---
//   const isDashboardRoute = pathname === "/admin";
//   const isCurrenciesRoute = pathname === "/admin/currencies";
//   const isUsersRoute = pathname === "/admin/users";
//   const isAddMoneyRoute = pathname === "/admin/add-money";
//   const isTransferRoute = pathname === "/admin/transfer";
//   const isKycManagementRoute = pathname === "/admin/kyc-management";

//   // --- Handlers (Keep as is) ---
//   const handleLogout = async () => {
//     await logout();
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//     window.location.href = "/auth/login";
//   };

//   const handleMobileNavClick = () => {
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//   };

//   // Define sidebar animation variants
//   const sidebarVariants = {
//       open: { x: 0 },
//       closed: { x: "-100%" },
//   };

//   const backdropVariants = {
//       visible: { opacity: 0.5 },
//       hidden: { opacity: 0 },
//   };

//   // --- *** CRITICAL CHANGE: Wait for isMobileView *** ---
//   // If we haven't determined the view type yet, don't render the sidebar
//   // to avoid incorrect initial animation states.
//   if (isMobileView === null) {
//     return null; // Or a loading skeleton/placeholder if preferred
//   }
//   // --- *** END CRITICAL CHANGE *** ---

//   return (
//     <>
//       {/* Backdrop for mobile sidebar */}
//       <AnimatePresence>
//         {isSidebarOpen && isMobileView === true && (
//           <motion.div
//             key="backdrop" // Add key for AnimatePresence
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             transition={{ duration: 0.2 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar uses AnimatePresence for mobile slide in/out */}
//       {/* Logic adjusted slightly: Use AnimatePresence for mobile animation control */}
//       <AnimatePresence>
//         {/* Render sidebar always on desktop OR when open on mobile */}
//         {(!isMobileView || isSidebarOpen) && (
//           <motion.aside
//             key="sidebar" // Add key for AnimatePresence
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-neutral-900 h-full inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-auto z-50 border-r dark:border-neutral-700 flex flex-col`} // Ensure lg:translate-x-0 overrides mobile animation
//             // Animate only on mobile view
//             variants={sidebarVariants}
//             initial={isMobileView ? "closed" : "open"} // Start closed on mobile, open on desktop
//             animate={
//               isMobileView ? (isSidebarOpen ? "open" : "closed") : "open"
//             } // Control based on state only on mobile
//             exit={isMobileView ? "closed" : "open"} // Exit to closed state on mobile
//             transition={
//               isMobileView
//                 ? { duration: 0.3, ease: "easeInOut" }
//                 : { duration: 0 }
//             } // Only transition on mobile
//           >
//             {/* Mobile Close Button */}
//             {isMobileView && (
//               <button
//                 className="absolute top-1 right-1 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox z-10 p-2 rounded-full" // Added padding/rounding
//                 onClick={toggleSidebar}
//                 aria-label="Close sidebar"
//               >
//                 <FiX className="size-5 text-neutral-900 dark:text-primary" />
//               </button>
//             )}

//             {/* Logo Section */}
//             <div className="p-3 border-b dark:border-neutral-700">
//               <div className="h-14 flex justify-center items-center">
//                 <Link href="/admin" className="inline-block">
//                   <Image
//                     src="/assets/images/wise-logo.svg" // Ensure path is correct
//                     height={100}
//                     width={100}
//                     alt="Wise Admin Logo"
//                     className="h-auto w-auto max-h-10"
//                     priority
//                   />
//                 </Link>
//               </div>
//             </div>

//             {/* User Profile Summary */}
//             {user && (
//               <div className="flex items-center gap-3 p-4 border-b dark:border-neutral-700">
//                 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
//                   <span className="text-neutral-900 font-semibold uppercase text-lg">
//                     {user.email?.charAt(0) || "A"}
//                   </span>
//                 </div>
//                 <div className="overflow-hidden space-y-0.5">
//                   <p className="font-semibold capitalize text-neutral-900 dark:text-white truncate text-sm">
//                     {user.fullName || "Admin User"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                     {user.email || "admin@example.com"}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Navigation */}
//             <nav className="flex-1 py-4 overflow-x-hidden overflow-y-auto">
//               {" "}
//               {/* Slimmer scrollbar */}
//               <div className="px-4 mb-4">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2">
//                   {" "}
//                   {/* Adjusted padding */}
//                   Main
//                 </span>
//               </div>
//               {/* Use the modified SidebarNavItem */}
//               <ul className="space-y-1 px-4">
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin"
//                     icon={FaChartPie}
//                     label="Dashboard"
//                     isActive={isDashboardRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin/currencies"
//                     icon={FaCoins}
//                     label="Currencies"
//                     isActive={isCurrenciesRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin/users"
//                     icon={FaUsers}
//                     label="Users"
//                     isActive={isUsersRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin/add-money"
//                     icon={IoMdAddCircleOutline}
//                     label="Add-Money"
//                     isActive={isAddMoneyRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin/transfer"
//                     icon={FaMoneyBillWave}
//                     label="Send-Money"
//                     isActive={isTransferRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <SidebarNavItem
//                     href="/admin/kyc-management"
//                     icon={MdManageAccounts}
//                     label="KYC Management"
//                     isActive={isKycManagementRoute}
//                     onClick={handleMobileNavClick}
//                   />{" "}
//                 </li>
//               </ul>
//             </nav>

//             {/* Footer Actions */}
//             <div className="p-4 border-t dark:border-neutral-700 mt-auto space-y-3">
//               <div className="flex justify-center">
//                 <ThemeToggle location="admin" className="inline-block" />
//               </div>
//               {user && (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 dark:text-red-500 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/15 dark:hover:bg-red-500/25 transition-colors duration-200"
//                 >
//                   <GrLogout className="size-5" aria-hidden="true" />
//                   <span className="font-medium text-sm">Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default AdminSidebar;

// // frontend/src/app/components/layout/AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// // Import motion
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaEnvelope, // Added for Messages
//   FaInbox, // Added for Inbox
//   FaPaperPlane, // Added for Send Message
//   FaChevronDown, // Added for dropdown indicator
// } from "react-icons/fa";
// import { LuActivity } from "react-icons/lu";
// import { TbMoneybag } from "react-icons/tb";
// import { BsSend } from "react-icons/bs";
// import { MdManageAccounts } from "react-icons/md";
// import { GrLogout } from "react-icons/gr";
// import ThemeToggle from "../../contexts/ThemeToggle";
// import { FiX } from "react-icons/fi";

// // --- Reusable Nav Item Component (Modified for Animation) ---
// interface SidebarNavItemProps {
//   href: string;
//   icon: IconType;
//   label: string;
//   isActive: boolean;
//   onClick?: () => void;
//   isSubmenuItem?: boolean; // Added to handle indentation for submenus
// }

// const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, onClick, isSubmenuItem = false }) => {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className={`relative flex items-center gap-3 py-2 rounded-full transition-all duration-200 group ${
//         isSubmenuItem ? 'pl-6' : 'pl-2' // Indent submenu items
//       } ${
//         isActive
//           ? "text-neutral-900 dark:text-primary"
//           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//       }`}
//     >
//        {/* Icon Container */}
//        <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
//            <Icon className={`size-5 transition-colors duration-200 `} />
//        </div>
//        {/* Label */}
//        <span className="relative z-10 font-medium">{label}</span>

//        {isActive && (
//         <motion.div
//           layoutId="active-sidebar-indicator"
//           className="absolute inset-0 bg-primary/60 dark:bg-primarybox rounded-full -z-10"
//           transition={{
//              type: "spring",
//              stiffness: 350,
//              damping: 30,
//           }}
//         />
//       )}
//     </Link>
//   );
// };
// // --- End Reusable Nav Item Component ---

// // --- Submenu Animation Variants ---
// const submenuVariants = {
//   open: {
//     height: "auto",
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       when: "beforeChildren", // Ensure parent transition completes before children animate
//       staggerChildren: 0.05, // Optional: stagger children appearance
//     },
//   },
//   closed: {
//     height: 0,
//     opacity: 0,
//     transition: {
//       duration: 0.2,
//       when: "afterChildren", // Ensure children complete before parent transition
//     },
//   },
// };

// const submenuItemVariants = { // Optional: for staggering
//     open: { opacity: 1, y: 0 },
//     closed: { opacity: 0, y: -10 },
// };
// // --- End Submenu Animation Variants ---


// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { user, logout } = useAuth();
//   const [isMessagesMenuOpen, setIsMessagesMenuOpen] = useState(false); // State for Messages submenu

//   // --- Effects ---
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
//         isSidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (isSidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen, isMobileView, toggleSidebar]);

//   // --- Active State Logic ---
//   const isDashboardRoute = pathname === "/admin";
//   const isActivityRoute = pathname === "/admin/activity";
//   const isCurrenciesRoute = pathname === "/admin/currencies";
//   const isUsersRoute = pathname === "/admin/users";
//   const isAddMoneyRoute = pathname === "/admin/add-money";
//   const isTransferRoute = pathname === "/admin/transfer";
//   const isKycManagementRoute = pathname === "/admin/kyc-management";
//   // New Message Routes
//   const isMessagesInboxRoute = pathname === "/admin/messages/inbox";
//   const isMessagesSendRoute = pathname === "/admin/messages/send";
//   const isMessagesRouteActive = isMessagesInboxRoute || isMessagesSendRoute; // Check if any message route is active

//   // Effect to open the messages menu if a message route is active on load/navigation
//   useEffect(() => {
//     if (isMessagesRouteActive) {
//       setIsMessagesMenuOpen(true);
//     }
//     // Optional: close it if no message route is active and it was previously open
//     // else if (!isMessagesRouteActive && isMessagesMenuOpen) {
//     //   setIsMessagesMenuOpen(false);
//     // }
//   }, [pathname]); // Rerun when pathname changes


//   // --- Handlers ---
//   const handleLogout = async () => {
//     await logout();
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//     window.location.href = "/auth/login";
//   };

//   const handleMobileNavClick = () => {
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar();
//     }
//     // Note: We don't close the submenu here, navigation itself handles the highlight
//   };

//   const toggleMessagesMenu = () => {
//     setIsMessagesMenuOpen(!isMessagesMenuOpen);
//   };

//   // Sidebar animation variants (unchanged)
//   const sidebarVariants = {
//       open: { x: 0 },
//       closed: { x: "-100%" },
//   };

//   // Backdrop animation variants (unchanged)
//   const backdropVariants = {
//       visible: { opacity: 0.5 },
//       hidden: { opacity: 0 },
//   };

//   // --- Critical Change: Wait for isMobileView (unchanged) ---
//   if (isMobileView === null) {
//     return null;
//   }
  
//   // --- End Critical Change ---

//   return (
//     <>
//       {/* Backdrop for mobile sidebar (unchanged) */}
//       <AnimatePresence>
//         {isSidebarOpen && isMobileView === true && (
//           <motion.div
//             key="backdrop"
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             transition={{ duration: 0.2 }}
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar (unchanged structure, content updated below) */}
//       <AnimatePresence>
//         {(!isMobileView || isSidebarOpen) && (
//           <motion.aside
//             key="sidebar"
//             ref={sidebarRef}
//             className={`w-64 fixed bg-white dark:bg-neutral-900 h-full inset-y-0 left-0 lg:relative lg:translate-x-0 lg:z-auto z-50 border-r dark:border-neutral-700 flex flex-col`}
//             variants={sidebarVariants}
//             initial={isMobileView ? "closed" : "open"}
//             animate={isMobileView ? (isSidebarOpen ? "open" : "closed") : "open"}
//             exit={isMobileView ? "closed" : "open"}
//             transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }}
//           >
//             {/* Mobile Close Button (unchanged) */}
//             {isMobileView && (
//               <button
//                 className="absolute top-1 right-1 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox z-10 p-2 rounded-full"
//                 onClick={toggleSidebar}
//                 aria-label="Close sidebar"
//               >
//                 <FiX className="size-5 text-neutral-900 dark:text-primary" />
//               </button>
//             )}

//             {/* Logo Section (unchanged) */}
//             <div className="p-3 border-b dark:border-neutral-700">
//               <div className="h-14 flex justify-center items-center">
//                 <Link href="/admin" className="inline-block" onClick={handleMobileNavClick}>
//                   <Image
//                     src="/assets/images/wise-logo.svg"
//                     height={100}
//                     width={100}
//                     alt="Wise Admin Logo"
//                     className="h-auto w-auto max-h-10"
//                     priority
//                   />
//                 </Link>
//               </div>
//             </div>

//             {/* User Profile Summary (unchanged) */}
//             {user && (
//               <div className="flex items-center gap-3 p-4 border-b dark:border-neutral-700">
//                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
//                   <span className="text-neutral-900 font-semibold uppercase text-lg">
//                     {user.email?.charAt(0) || "A"}
//                   </span>
//                 </div>
//                 <div className="overflow-hidden space-y-0.5">
//                   <p className="font-semibold capitalize text-neutral-900 dark:text-white truncate text-sm">
//                     {user.fullName || "Admin User"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                     {user.email || "admin@example.com"}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Navigation */}
//             <nav className="flex-1 py-4 overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3  sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <div className="px-4 mb-4">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2">
//                   Main
//                 </span>
//               </div>
//               {/* Navigation List */}
//               <ul className="space-y-1 px-4">
//                 {/* Existing Items */}
//                 <li> <SidebarNavItem href="/admin" icon={FaChartPie} label="Dashboard" isActive={isDashboardRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/activity" icon={LuActivity} label="Activity" isActive={isActivityRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/currencies" icon={FaCoins} label="Currencies" isActive={isCurrenciesRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/users" icon={FaUsers} label="Users" isActive={isUsersRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/add-money" icon={TbMoneybag} label="Add-Money" isActive={isAddMoneyRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/transfer" icon={BsSend} label="Send-Money" isActive={isTransferRoute} onClick={handleMobileNavClick} /> </li>
//                 <li> <SidebarNavItem href="/admin/kyc-management" icon={MdManageAccounts} label="KYC Management" isActive={isKycManagementRoute} onClick={handleMobileNavClick} /> </li>

//                 {/* --- New Messages Menu Item --- */}
//                 <li>
//                   {/* Button to toggle the submenu */}
//                   <button
//                     onClick={toggleMessagesMenu}
//                     className={`flex items-center justify-between w-full gap-3 py-2 pl-2 rounded-full transition-all duration-200 group ${
//                       isMessagesRouteActive // Highlight parent if child is active
//                         ? "text-neutral-900 dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                         <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
//                             <FaEnvelope className="size-5" />
//                         </div>
//                         <span className="relative z-10 font-medium">Messages</span>
//                     </div>
//                     {/* Chevron icon for dropdown indicator */}
//                     <FaChevronDown
//                       className={`size-3 mr-4 transition-transform duration-200 ${
//                         isMessagesMenuOpen ? "rotate-180" : "rotate-0"
//                       }`}
//                     />
//                   </button>

//                   {/* Animated Submenu */}
//                   <AnimatePresence initial={false}>
//                     {isMessagesMenuOpen && (
//                       <motion.ul
//                         key="messages-submenu"
//                         variants={submenuVariants}
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         className="mt-1 space-y-1 overflow-hidden" // overflow-hidden is crucial for height animation
//                       >
//                         {/* Submenu Item 1: Inbox */}
//                         <motion.li variants={submenuItemVariants}> {/* Optional: for staggering */}
//                           <SidebarNavItem
//                             href="/admin/messages/inbox"
//                             icon={FaInbox}
//                             label="Inbox"
//                             isActive={isMessagesInboxRoute}
//                             onClick={handleMobileNavClick}
//                             isSubmenuItem={true} // Indicate it's a submenu item for styling
//                           />
//                         </motion.li>
//                         {/* Submenu Item 2: Send Message */}
//                          <motion.li variants={submenuItemVariants}> {/* Optional: for staggering */}
//                            <SidebarNavItem
//                              href="/admin/messages/send"
//                              icon={FaPaperPlane}
//                              label="Send Message"
//                              isActive={isMessagesSendRoute}
//                              onClick={handleMobileNavClick}
//                              isSubmenuItem={true} // Indicate it's a submenu item for styling
//                            />
//                         </motion.li>
//                       </motion.ul>
//                     )}
//                   </AnimatePresence>
//                 </li>
//                 {/* --- End New Messages Menu Item --- */}

//               </ul>
//             </nav>

//             {/* Footer Actions (unchanged) */}
//             <div className="p-4 border-t dark:border-neutral-700 mt-auto space-y-3">
//               <div className="flex justify-center">
//                 <ThemeToggle location="admin" className="inline-block" />
//               </div>
//               {user && (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 dark:text-red-500 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/15 dark:hover:bg-red-500/25 transition-colors duration-200"
//                 >
//                   <GrLogout className="size-5" aria-hidden="true" />
//                   <span className="font-medium text-sm">Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default AdminSidebar;



// // frontend/src/app/components/layout/AdminSidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../../contexts/AuthContext";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// // Import motion
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaChartPie,
//   FaCoins,
//   FaUsers,
//   FaEnvelope,
//   FaInbox,
//   FaPaperPlane,
//   FaChevronDown,
// } from "react-icons/fa";
// import { LuActivity } from "react-icons/lu";
// import { TbMoneybag } from "react-icons/tb";
// import { BsSend } from "react-icons/bs";
// import { MdManageAccounts } from "react-icons/md";
// import { GrLogout } from "react-icons/gr";
// import ThemeToggle from "../../contexts/ThemeToggle";
// import { FiX } from "react-icons/fi";

// // --- Reusable Nav Item Component ---
// interface SidebarNavItemProps {
//   href: string;
//   icon: IconType;
//   label: string;
//   isActive: boolean;
//   onClick?: () => void;
//   isSubmenuItem?: boolean;
// }

// const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, onClick, isSubmenuItem = false }) => {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className={`relative flex items-center gap-3 py-2 rounded-full transition-all duration-200 group ${
//         isSubmenuItem ? 'pl-6' : 'pl-2'
//       } ${
//         isActive
//           ? "text-neutral-900 dark:text-primary"
//           : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//       }`}
//     >
//        <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
//            <Icon className={`size-5 transition-colors duration-200 `} />
//        </div>
//        <span className="relative z-10 font-medium">{label}</span>

//        {isActive && (
//         <motion.div
//           layoutId="active-sidebar-indicator"
//           className="absolute inset-0 bg-primary/60 dark:bg-primarybox rounded-full -z-10"
//           transition={{
//              type: "spring",
//              stiffness: 350,
//              damping: 30,
//           }}
//         />
//       )}
//     </Link>
//   );
// };

// // --- Submenu Animation Variants ---
// const submenuVariants = {
//   open: {
//     height: "auto",
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       when: "beforeChildren",
//       staggerChildren: 0.05,
//     },
//   },
//   closed: {
//     height: 0,
//     opacity: 0,
//     transition: {
//       duration: 0.2,
//       when: "afterChildren",
//     },
//   },
// };

// const submenuItemVariants = {
//     open: { opacity: 1, y: 0 },
//     closed: { opacity: 0, y: -10 },
// };

// interface AdminSidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   isSidebarOpen,
//   toggleSidebar,
// }) => {
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
//   const { user, logout } = useAuth();
//   const [isMessagesMenuOpen, setIsMessagesMenuOpen] = useState(false);

//   // --- Effects ---
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
//         isSidebarOpen &&
//         isMobileView === true
//       ) {
//         toggleSidebar();
//       }
//     };

//     if (isSidebarOpen && isMobileView === true) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen, isMobileView, toggleSidebar]);

//   // --- MODIFIED: Effect to control body scroll ---
//   useEffect(() => {
//     if (isSidebarOpen && isMobileView === true) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = ""; // Or "auto", "visible"
//     }

//     // Cleanup function to restore scroll on component unmount
//     return () => {
//       document.body.style.overflow = ""; // Or "auto", "visible"
//     };
//   }, [isSidebarOpen, isMobileView]);
//   // --- END MODIFIED Effect ---


//   // --- Active State Logic ---
//   const isDashboardRoute = pathname === "/admin";
//   const isActivityRoute = pathname === "/admin/activity";
//   const isCurrenciesRoute = pathname === "/admin/currencies";
//   const isUsersRoute = pathname === "/admin/users";
//   const isAddMoneyRoute = pathname === "/admin/add-money";
//   const isTransferRoute = pathname === "/admin/transfer";
//   const isKycManagementRoute = pathname === "/admin/kyc-management";
//   const isMessagesInboxRoute = pathname === "/admin/messages/inbox";
//   const isMessagesSendRoute = pathname === "/admin/messages/send";
//   const isMessagesRouteActive = isMessagesInboxRoute || isMessagesSendRoute;

//   useEffect(() => {
//     if (isMessagesRouteActive) {
//       setIsMessagesMenuOpen(true);
//     }
//   }, [pathname, isMessagesRouteActive]);


//   // --- Handlers ---
//   const handleLogout = async () => {
//     await logout();
//     // No need to explicitly toggle sidebar here, body scroll effect will handle it
//     window.location.href = "/auth/login";
//   };

//   const handleMobileInteraction = () => {
//     if (isSidebarOpen && isMobileView) {
//       toggleSidebar(); // This will trigger the body scroll effect
//     }
//   };

//   const toggleMessagesMenu = () => {
//     setIsMessagesMenuOpen(!isMessagesMenuOpen);
//   };

//   const sidebarVariants = {
//       open: { x: 0 },
//       closed: { x: "-100%" },
//   };

//   const backdropVariants = {
//       visible: { opacity: 0.5 },
//       hidden: { opacity: 0 },
//   };

//   if (isMobileView === null) {
//     return null;
//   }

//   return (
//     <>
//       <AnimatePresence>
//         {isSidebarOpen && isMobileView === true && (
//           <motion.div
//             key="backdrop"
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             transition={{ duration: 0.2 }}
//             onClick={toggleSidebar} // This will trigger the body scroll effect
//             className="fixed inset-0 bg-black/50 dark:bg-white/30 z-40 lg:hidden"
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {(!isMobileView || isSidebarOpen) && (
//           <motion.aside
//             key="sidebar"
//             ref={sidebarRef}
//             className={`w-64 fixed lg:sticky bg-white border-r dark:bg-neutral-900 inset-y-0 left-0 lg:translate-x-0 lg:z-auto z-50 h-screen flex flex-col`}
//             variants={sidebarVariants}
//             initial={isMobileView ? "closed" : "open"}
//             animate={isMobileView ? (isSidebarOpen ? "open" : "closed") : "open"}
//             exit={isMobileView ? "closed" : "open"}
//             transition={isMobileView ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }}
//           >
//             {isMobileView && (
//               <button 
//                 className="absolute top-1 right-1 cursor-pointer bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox transition-all ease-linear duration-75 z-10 p-2 rounded-full"
//                 onClick={toggleSidebar} // This will trigger the body scroll effect
//                 aria-label="Close sidebar"
//               >
//                 <FiX className="size-5 text-neutral-900 dark:text-primary" />
//               </button>
//             )}

//             <div className="p-2 border-b">
//               <div className="h-16 flex justify-center items-center">
//                 <Link href="/admin" className="inline-block" onClick={handleMobileInteraction}>
//                   <Image
//                     src="/assets/images/wise-logo.svg"
//                     height={100}
//                     width={100}
//                     alt="Wise Admin Logo"
//                     className="h-auto w-auto max-h-10"
//                     priority
//                   />
//                 </Link>
//               </div>
//             </div>

//             {user && (
//               <div className="flex items-center gap-3 p-4 border-b dark:border-neutral-700">
//                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
//                   <span className="text-neutral-900 font-semibold uppercase text-lg">
//                     {user.email?.charAt(0) || "A"}
//                   </span>
//                 </div>
//                 <div className="overflow-hidden space-y-0.5">
//                   <p className="font-semibold capitalize text-neutral-900 dark:text-white truncate text-sm">
//                     {user.fullName || "Admin User"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                     {user.email || "admin@example.com"}
//                   </p>
//                 </div>
//               </div>
//             )}

//             <nav className="flex-1 py-4 overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3  sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
//               <div className="px-4 mb-4">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2">
//                   Main
//                 </span>
//               </div> 

//               <ul className="space-y-1 px-4">
//                 <li> <SidebarNavItem href="/admin" icon={FaChartPie} label="Dashboard" isActive={isDashboardRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/activity" icon={LuActivity} label="Activity" isActive={isActivityRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/currencies" icon={FaCoins} label="Currencies" isActive={isCurrenciesRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/users" icon={FaUsers} label="Users" isActive={isUsersRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/add-money" icon={TbMoneybag} label="Add-Money" isActive={isAddMoneyRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/transfer" icon={BsSend} label="Send-Money" isActive={isTransferRoute} onClick={handleMobileInteraction} /> </li>
//                 <li> <SidebarNavItem href="/admin/kyc-management" icon={MdManageAccounts} label="KYC Management" isActive={isKycManagementRoute} onClick={handleMobileInteraction} /> </li>

//                 <li>
//                   <button
//                     onClick={toggleMessagesMenu}
//                     className={`flex items-center justify-between w-full gap-3 py-2 pl-2 rounded-full transition-all duration-200 group cursor-pointer ${
//                       isMessagesRouteActive // Highlight parent if child is active
//                         ? "text-neutral-900 dark:text-primary"
//                         : "text-neutral-500 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-primary"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                         <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
//                             <FaEnvelope className="size-5" />
//                         </div>
//                         <span className="relative z-10 font-medium">Messages</span>
//                     </div>
//                     <FaChevronDown
//                       className={`size-3 mr-4 transition-transform duration-200 ${
//                         isMessagesMenuOpen ? "rotate-180" : "rotate-0"
//                       }`}
//                     />
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {isMessagesMenuOpen && (
//                       <motion.ul
//                         key="messages-submenu"
//                         variants={submenuVariants}
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         className="mt-1 space-y-1 overflow-hidden"
//                       >
//                         <motion.li variants={submenuItemVariants}>
//                           <SidebarNavItem
//                             href="/admin/messages/inbox"
//                             icon={FaInbox}
//                             label="Inbox"
//                             isActive={isMessagesInboxRoute}
//                             onClick={handleMobileInteraction}
//                             isSubmenuItem={true}
//                           />
//                         </motion.li>
//                          <motion.li variants={submenuItemVariants}>
//                            <SidebarNavItem
//                              href="/admin/messages/send"
//                              icon={FaPaperPlane}
//                              label="Send Message"
//                              isActive={isMessagesSendRoute}
//                              onClick={handleMobileInteraction}
//                              isSubmenuItem={true}
//                            />
//                         </motion.li>
//                       </motion.ul>
//                     )}
//                   </AnimatePresence>
//                 </li>
//               </ul>
//             </nav>

//             <div className="p-4 border-t space-y-3">
//               <div className="flex justify-center">
//                 <ThemeToggle location="admin" className="inline-block" />
//               </div>
//               {user && (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-2.5 rounded-lg text-red-600 dark:text-red-500 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/15 dark:hover:bg-red-500/25 transition-colors duration-200"
//                 >
//                   <GrLogout className="size-5" aria-hidden="true" />
//                   <span className="font-medium text-sm">Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default AdminSidebar;



// frontend/src/app/components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IconType } from "react-icons";
// Import motion
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartPie,
  FaCoins,
  FaUsers,
  FaEnvelope,
  FaInbox,
  FaPaperPlane,
  FaChevronDown,
} from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { BsSend } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { FiX } from "react-icons/fi";

// --- Define UserType locally if not exported from AuthContext ---
// Ideally, import this from your AuthContext file if it's defined and exported there
interface UserType {
  email?: string | null;
  fullName?: string | null;
  // Add other user properties if needed
}

// --- Reusable Nav Item Component ---
interface SidebarNavItemProps {
  href: string;
  icon: IconType;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isSubmenuItem?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, onClick, isSubmenuItem = false }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-3 py-2 rounded-full transition-all duration-75 ease-linear group ${
        isSubmenuItem ? 'pl-6' : 'pl-2'
      } ${
        isActive
          ? "text-primary"
          : "text-subheadingWhite hover:text-primary"
      }`}
    >
       <div className={`relative z-10 p-2 rounded-full transition-all ease-linear duration-75`}>
           <Icon className={`size-5 transition-all ease-linear duration-75`} />
       </div>
       <span className="relative z-10 font-medium">{label}</span>

       {isActive && (
        <motion.div
          layoutId="active-sidebar-indicator"
          className="absolute inset-0 bg-primarybox rounded-full -z-10"
          transition={{
             type: "spring",
             stiffness: 350,
             damping: 30,
          }}
        />
      )}
    </Link>
  );
};

// --- Submenu Animation Variants ---
const submenuVariants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      when: "afterChildren",
    },
  },
};

const submenuItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
};

// --- Shared Sidebar Contents Component ---
interface SidebarContentsProps {
  user: UserType | null;
  logout: () => void; // Matched to the corrected useAuth().logout signature
  pathname: string;
  onLinkClick?: () => void;
  isMessagesMenuOpen: boolean;
  toggleMessagesMenu: () => void;
  showCloseButton?: boolean;
  onCloseButtonClick?: () => void;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({
  user,
  logout,
  pathname,
  onLinkClick,
  isMessagesMenuOpen,
  toggleMessagesMenu,
  showCloseButton,
  onCloseButtonClick,
}) => {
  const { fullName, email } = user || {};

  const isDashboardRoute = pathname === "/admin";
  const isActivityRoute = pathname === "/admin/activity";
  const isCurrenciesRoute = pathname === "/admin/currencies";
  const isUsersRoute = pathname === "/admin/users";
  const isAddMoneyRoute = pathname === "/admin/add-money";
  const isTransferRoute = pathname === "/admin/transfer";
  const isKycManagementRoute = pathname === "/admin/kyc-management";
  const isMessagesInboxRoute = pathname === "/admin/messages/inbox";
  const isMessagesSendRoute = pathname === "/admin/messages/send";
  const isMessagesRouteActive = isMessagesInboxRoute || isMessagesSendRoute;

  const handleLogoutClick = () => { // No longer async
    logout(); // Call without await
    if (onLinkClick) {
      onLinkClick();
    }
    window.location.href = "/auth/login";
  };

  return (
    <>
      {showCloseButton && onCloseButtonClick && (
        <button
          className="absolute top-1 right-1 cursor-pointer bg-primarybox hover:bg-secondarybox transition-all ease-linear duration-75 z-10 p-2 rounded-full lg:hidden"
          onClick={onCloseButtonClick}
          aria-label="Close sidebar"
        >
          <FiX className="size-5 text-primary" />
        </button>
      )}

      <div className="p-2 px-4 border-b">
        <div className="h-16 flex justify-start items-center">
          <Link href="/admin" className="inline-block" onClick={onLinkClick}>
            <Image
              src="/assets/images/main_logo.svg"
              height={100}
              width={100}
              alt="Wise Admin Logo"
              className="h-auto w-auto max-h-10"
              priority
            />
          </Link>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center relative flex-shrink-0">
            <span className="text-mainheading font-semibold uppercase text-lg">
              {email?.charAt(0) || "A"}
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold capitalize text-mainheadingWhite truncate">
              {fullName || "Admin User"}
            </p>
            <p className="text-sm text-subheadingWhite truncate">
              {email || "admin@example.com"}
            </p>
          </div>
        </div>
      )}

      <nav className="flex-1 py-4 overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3  sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
        <div className="px-4 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-mainheadingWhite px-2">
            Main
          </span>
        </div>

        <ul className="space-y-1 px-4">
          <li> <SidebarNavItem href="/admin" icon={FaChartPie} label="Dashboard" isActive={isDashboardRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/activity" icon={LuActivity} label="Activity" isActive={isActivityRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/currencies" icon={FaCoins} label="Currencies" isActive={isCurrenciesRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/users" icon={FaUsers} label="Users" isActive={isUsersRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/add-money" icon={TbMoneybag} label="Add-Money" isActive={isAddMoneyRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/transfer" icon={BsSend} label="Send-Money" isActive={isTransferRoute} onClick={onLinkClick} /> </li>
          <li> <SidebarNavItem href="/admin/kyc-management" icon={MdManageAccounts} label="KYC Management" isActive={isKycManagementRoute} onClick={onLinkClick} /> </li>

          <li>
            <button
              onClick={toggleMessagesMenu}
              className={`flex items-center justify-between w-full gap-3 py-2 pl-2 rounded-full transition-all duration-200 group cursor-pointer ${
                isMessagesRouteActive
                  ? "text-primary"
                  : "text-subheadingWhite hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`relative z-10 p-2 rounded-full transition-colors duration-200`}>
                  <FaEnvelope className="size-5" />
                </div>
                <span className="relative z-10 font-medium">Messages</span>
              </div>
              <FaChevronDown
                className={`size-3 mr-4 transition-transform duration-200 ${
                  isMessagesMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isMessagesMenuOpen && (
                <motion.ul
                  key="messages-submenu"
                  variants={submenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="mt-1 space-y-1 overflow-hidden"
                >
                  <motion.li variants={submenuItemVariants}> {/* Corrected typo */}
                    <SidebarNavItem
                      href="/admin/messages/inbox"
                      icon={FaInbox}
                      label="Inbox"
                      isActive={isMessagesInboxRoute}
                      onClick={onLinkClick}
                      isSubmenuItem={true}
                    />
                  </motion.li>
                  <motion.li variants={submenuItemVariants}> {/* Corrected typo */}
                    <SidebarNavItem
                      href="/admin/messages/send"
                      icon={FaPaperPlane}
                      label="Send Message"
                      isActive={isMessagesSendRoute}
                      onClick={onLinkClick}
                      isSubmenuItem={true}
                    />
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t space-y-3">
        {user && (
          <button
            onClick={handleLogoutClick}
            className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-2.5 rounded-full text-red-500 bg-red-500/15 hover:bg-red-500/25 transition-all duration-75 ease-linear"
          >
            <GrLogout className="size-4" aria-hidden="true" />
            <span className="font-medium">Logout</span>
          </button>
        )}
      </div>
    </>
  );
};


// --- Main Admin Sidebar Component ---
interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const mobileSidebarRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth(); // user here is of the type from useAuth()
  const [isMessagesMenuOpen, setIsMessagesMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const isMessagesInboxRoute = pathname === "/admin/messages/inbox";
  const isMessagesSendRoute = pathname === "/admin/messages/send";
  const isMessagesRouteActive = isMessagesInboxRoute || isMessagesSendRoute;

  useEffect(() => {
    if (isMessagesRouteActive) {
      setIsMessagesMenuOpen(true);
    }
  }, [pathname, isMessagesRouteActive]);


  const handleLinkClickOnMobile = () => {
    toggleSidebar();
  };

  const toggleMessagesMenuInternal = () => {
    setIsMessagesMenuOpen(!isMessagesMenuOpen);
  };

  const sidebarSlideVariants = {
      open: { x: 0 },
      closed: { x: "-100%" },
  };


  // Cast user from useAuth() to UserType for SidebarContentsProps
  const typedUser = user as UserType | null;

  const sidebarContentsProps = {
    user: typedUser,
    logout, // This logout is from useAuth(), signature should match SidebarContentsProps
    pathname,
    isMessagesMenuOpen,
    toggleMessagesMenu: toggleMessagesMenuInternal,
  };

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-white/15 z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (Animated) */}
      <div className="lg:hidden">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              key="mobile-sidebar"
              ref={mobileSidebarRef}
              className="w-64 fixed bg-background inset-y-0 left-0 z-50 h-screen flex flex-col"
              variants={sidebarSlideVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <SidebarContents
                {...sidebarContentsProps}
                onLinkClick={handleLinkClickOnMobile}
                showCloseButton={true}
                onCloseButtonClick={toggleSidebar}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar (Static) */}
      <aside className="hidden lg:flex w-64 sticky border-r inset-y-0 left-0 z-30 h-screen flex-col">
        <SidebarContents
          {...sidebarContentsProps}
        />
      </aside>
    </>
  );
};

export default AdminSidebar;