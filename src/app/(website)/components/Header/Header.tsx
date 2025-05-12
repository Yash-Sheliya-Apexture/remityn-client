// components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint (Tailwind)
//     };

//     checkScreenSize(); // Check on initial load
//     window.addEventListener("resize", checkScreenSize); // Check on resize

//     return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering) */}
//       {isMobileMenuOpen && (
//         <MobileMenu
//           isOpen={isMobileMenuOpen}
//           onClose={closeMobileMenu}
//           toggleFeaturesDropdown={toggleFeaturesDropdown}
//           isFeaturesOpen={isFeaturesOpen}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Key change:  Combined effect for screen size and closing mobile menu
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);

//       // Close mobile menu if transitioning to large screen
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize(); // Check on initial load
//     window.addEventListener("resize", checkScreenSize); // Check on resize

//     return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
//   }, [isMobileMenuOpen]);  // Dependency array includes isMobileMenuOpen

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering) */}
//       {isMobileMenuOpen && (
//         <MobileMenu
//           isOpen={isMobileMenuOpen}
//           onClose={closeMobileMenu}
//           toggleFeaturesDropdown={toggleFeaturesDropdown}
//           isFeaturesOpen={isFeaturesOpen}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg";
// import plane from "../../../../../public/assets/icons/plane.webp";
// import { IoIosArrowForward } from "react-icons/io";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

// import MobileMenu from "./MobileMenu";

// const Header: React.FC = () => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isMobileMenuOpen]);

//   // Framer Motion Variants
//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.3 } },
//   };

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center flex-1/2 w-full">
//                   {/* Feature Link */}

//                   <div className="relative">
//                     <button
//                       onClick={toggleFeaturesDropdown}
//                       className="px-2.5 py-1.5 rounded-full font-medium"
//                     >
//                       Features
//                     </button>

//                     {isFeaturesOpen && (
//                       <div className="absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50">
//                         {/* Your features dropdown content */}

//                         <div>
//                           <div className="p-8 flex flex-col justify-start bg-green/10">
//                             <Image
//                               src={plane}
//                               alt="Plane"
//                               width={56}
//                               height={56}
//                             />

//                             <div>
//                               <p className="font-light text-gray">
//                                 Learn how millions of customers move their money
//                                 globally
//                               </p>
//                             </div>
//                           </div>

//                           <div className="p-8 flex flex-col gap-4">
//                             {/* Link 1 */}
//                             <Link
//                               href="/sendmoney"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send money</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                             </Link>

//                             {/* Link 2 */}
//                             <Link
//                               href="/sendlargeamount"
//                               passHref
//                               className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                             >
//                               <p>Send large amounts</p>
//                               <IoIosArrowForward
//                                 size={18}
//                                 className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                               />
//                               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile, inside MobileMenu)  */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button onClick={closeMobileMenu} className="text-2xl p-2 bg-green/20 rounded-full">
//                     <FiX className="text-green "/>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               toggleFeaturesDropdown={toggleFeaturesDropdown}
//               isFeaturesOpen={isFeaturesOpen}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// Header.tsx
// components/Header/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../../../public/assets/icons/logo.svg"; // Correct path
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu";
// import FeatureDropdown from "../../../components/FeatureDropdown"; // Correct import path

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image src={logo} alt="Wise Logo" width={120} height={28} />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-lightgreen px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Link (using the FeatureDropdown component) */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     onLinkClick={closeMobileMenu}
//                     // Optionally customize styling:
//                     // buttonClassName="my-custom-button-class"
//                     // dropdownClassName="my-custom-dropdown-class"
//                   />

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>
//                   <Link href="/en" passHref>
//                     <div className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/login"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Log in
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/register"
//                       passHref
//                       className="bg-lightgreen px-4 py-2 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Register
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                   >
//                     <FiX className="text-green " />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Correct import path
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Correct import path

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks = [
//     { href: "/sendmoney", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={56}
//         height={56}
//       />
//       <div>
//         <p className="font-light text-gray">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div className="">
//               <Link href="/" passHref>
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     passHref
//                     className="bg-[#d3f2c0] px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     passHref
//                     className="px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {/* Links (Desktop) */}
//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Link (using the FeatureDropdown component) */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent} //  <--- Pass topContent
//                     onLinkClick={closeMobileMenu}
//                   />

//                   <Link
//                     href="/pricing"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     passHref
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>

//                   {/* Lagunage and country selector */}
//                   <Link href="/en" passHref>
//                     <button className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </button>
//                   </Link>
//                 </div>
//               )}

//               <div className="text-nowrap items-center flex gap-2">
//                 {/* Login  */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/auth/register"
//                     passHref
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Register
//                   </Link>
//                 )}

//                 {/* Register Link and Hamburger (Conditional) */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       passHref
//                       className="bg-lightgreen px-5 py-1.5 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green  p-2"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/*  Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                   >
//                     <FiX className="text-green " />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent} //  <--- Pass topContent
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// // components/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/sendmoney", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={56}
//         height={56}
//       />
//       <div>
//         <p className="font-light text-gray">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow drop-shadow-xs">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div>
//               <Link href="/">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {/* Desktop Links */}
//               {isLargeScreen && (
//                 <div className="flex items-center gap-1">
//                   <Link
//                     href="/personal"
//                     className="bg-[#d3f2c0] px-4 py-1 rounded-full font-medium"
//                   >
//                     Personal
//                   </Link>
//                   <Link
//                     href="/business"
//                     className="px-4 py-1 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Business
//                   </Link>
//                   <Link
//                     href="/platform"
//                     className="px-4 py-1 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Platform
//                   </Link>
//                 </div>
//               )}

//               {isLargeScreen && (
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Feature Dropdown */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent}
//                     onLinkClick={closeMobileMenu}
//                   />

//                   <Link
//                     href="/pricing"
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     href="/help"
//                     className="px-2.5 py-1.5 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Help
//                   </Link>

//                   {/* Language and Country Selector */}
//                   <Link href="/en">
//                     <button className="flex items-center px-2.5 py-1.5 rounded-full hover:bg-gray-200">
//                       <img
//                         src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                         alt="Indian Flag"
//                         className="h-5 w-5 rounded-full mr-1 object-cover"
//                       />
//                       <span className="font-medium">EN</span>
//                     </button>
//                   </Link>
//                 </div>
//               )}

//               <div className="flex items-center gap-2">
//                 {/* Register Link (Desktop) */}
//                 {isLargeScreen && (
//                   <Link
//                     href="/auth/register"
//                     className="px-4 py-2 rounded-full font-medium hover:bg-gray-200"
//                   >
//                     Register
//                   </Link>
//                 )}

//                 {/* Login and Hamburger for Mobile */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       className="bg-primary px-5 py-1.5 rounded-full font-medium hover:bg-lightgreen-hover"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-green p-2"
//                         aria-label="Open Mobile Menu"
//                       >
//                         <GiHamburgerMenu size={24} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/* Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     className="text-2xl p-2 bg-green/20 rounded-full"
//                     aria-label="Close Mobile Menu"
//                   >
//                     <FiX className="text-green" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Import ThemeToggle
// import { IoClose } from "react-icons/io5";

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={100}
//         height={100}
//         className="size-16"
//       />
//       <div>
//         <p className="font-light text-gray-500 dark:text-gray-300 mt-5">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <header className="header">
//       <div className="shadow border">
//         <div className="container mx-auto px-4">
//           <nav className="flex items-center gap-6 h-20" aria-label="Global">
//             {/* Logo */}
//             <div>
//               <Link href="/">
//                 <Image
//                   src="/assets/images/wise-logo.svg"
//                   alt="Wise Logo"
//                   width={120}
//                   height={28}
//                 />
//               </Link>
//             </div>

//             <div className="flex justify-end items-center w-full">
//               {isLargeScreen && (
//                 <>
//                   <div className="flex justify-end items-center gap-4 flex-1/2 w-full">
//                     <div className="relative group">
//                       <Link
//                         href="/"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         Home
//                         <span
//                           className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                         ></span>
//                       </Link>
//                     </div>

//                     <div className="relative group">
//                       <Link
//                         href="/"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         About
//                       </Link>
//                       <span
//                         className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                       ></span>
//                     </div>

//                     <FeatureDropdown
//                       buttonText="Features"
//                       links={featureLinks}
//                       topContent={topContent}
//                       onLinkClick={closeMobileMenu}
//                     />

//                     <div className="relative group">
//                       <Link
//                         href="/help"
//                         className="px-2.5 py-1.5 rounded-full font-medium"
//                       >
//                         Help
//                         <span
//                           className={`absolute left-0 -bottom-1 w-full h-[2px] dark:bg-primary bg-mainheading transform origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100 group-hover:origin-left`}
//                         ></span>
//                       </Link>
//                     </div>
//                   </div>

//                   <div className="flex items-center mr-2">
//                     <ThemeToggle location="header" />
//                   </div>
//                 </>
//               )}

//               <div className="flex items-center gap-2">
//                 {/* Login and Hamburger for Mobile */}
//                 {!isMobileMenuOpen && (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       className="bg-primary px-6 py-1.5 lg:block hidden text-nowrap font-medium text-lg rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//                     >
//                       Log in
//                     </Link>

//                     {!isLargeScreen && (
//                       <button
//                         onClick={toggleMobileMenu}
//                         className="text-primary p-2 cursor-pointer"
//                         aria-label="Open Mobile Menu"
//                       >
//                         <GiHamburgerMenu size={26} />
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/* Close Button (Mobile) */}
//                 {isMobileMenuOpen && !isLargeScreen && (
//                   <button
//                     onClick={closeMobileMenu}
//                     aria-label="Close Mobile Menu"
//                     className="text-neutral-900 cursor-pointer"
//                   >
//                     <IoClose className="size-10 hover:bg-gray-300 text-mainheading dark:text-white hover:dark:bg-primarybox p-1.5 rounded-full transition-colors duration-300 ease-in-out" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// // We use IoClose now, so FiX is not needed unless used elsewhere
// // import { FiX } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Ensure MobileMenu has proper TypeScript definitions
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Ensure FeatureDropdown has proper TypeScript definitions
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Import ThemeToggle
// import { IoClose } from "react-icons/io5";

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
//   const [isSticky, setIsSticky] = useState<boolean>(false); // State for sticky header

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Effect for screen size and closing mobile menu on resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // Dependency remains the same

//   // Effect for handling body scroll lock when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]); // Dependency remains the same

//   // Effect for handling scroll position and setting sticky state
//   useEffect(() => {
//     const handleScroll = () => {
//       // Set sticky state based on scroll position
//       setIsSticky(window.scrollY > 300);
//     };

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function to remove event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array ensures this runs only on mount and unmount

//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     // Add more features here as needed
//   ];

//   const topContent = (
//     <>
//       <Image
//         src="/assets/images/plane.webp"
//         alt="Plane"
//         width={100}
//         height={100}
//         className="size-16"
//       />
//       <div>
//         <p className="font-light text-gray-500 dark:text-gray-300 mt-5">
//           Learn how millions of customers move their money globally
//         </p>
//       </div>
//     </>
//   );

//   return (
//     // Apply sticky styles conditionally to the main header element
//     <header
//       className={`header w-full transition-all duration-300 ease-in-out ${
//         isSticky
//           ? "fixed top-0 left-0 right-0 z-50 bg-background dark:bg-darkbackground shadow-md" // Sticky styles: fixed position, top/left/right 0, z-index, background, shadow
//           : "relative bg-transparent" // Non-sticky styles: relative positioning (or static), transparent background
//       }`}
//     >
//       {/* Remove shadow/border when sticky if background/shadow is handled by the outer header */}
//       <div className="px-4 bg-[#f2f4f7] dark:bg-background ">
//         <nav className="flex items-center gap-6 md:h-20 h-18 container mx-auto" aria-label="Global">
//           {/* Logo */}
//           <div>
//             <Link href="/">
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={120}
//                 height={28}
//                 // Add dark mode logo variant if needed
//                 // className="dark:hidden"
//               />
//             </Link>
//           </div>

//           <div className="flex justify-end items-center w-full">
//             {isLargeScreen && (
//               <>
//                 <div className="flex justify-end items-center gap-2 flex-1/2 w-full">
//                   {/* Home Link */}
//                   <Link
//                     href="/"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Home
//                   </Link>

//                   {/* About Link */}
//                   <Link
//                     href="/about-us" // Assuming you have an about page
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     About
//                   </Link>

//                   {/* Features Dropdown */}
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={featureLinks}
//                     topContent={topContent}
//                     onLinkClick={closeMobileMenu} // Close mobile menu if a link is clicked (though this dropdown is for large screens)
//                   />

//                   {/* Help Link */}
//                   <Link
//                     href="/reviews"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Reviews
//                   </Link>

//                   {/* Help Link */}
//                   <Link
//                     href="/faqs"
//                     className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//                   >
//                     Help
//                   </Link>
//                 </div>

//                 {/* Theme Toggle */}
//                 <div className="flex items-center mx-2">
//                   <ThemeToggle location="header" />
//                 </div>
//               </>
//             )}

//             <div className="flex items-center gap-2">
//               <Link
//                 href="/auth/register"
//                 className="px-4 py-1.5 hidden lg:block  dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-mainheading"
//               >
//                 Register
//               </Link>

//               {/* Login Button (Visible on Large Screens) */}
//               <Link
//                 href="/auth/login"
//                 className="bg-primary px-4 py-1.5 hidden lg:block text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//               >
//                 Log in
//               </Link>

//               {/* Hamburger/Close Button (Mobile/Tablet) */}
//               {!isLargeScreen && (
//                 <>
//                   {!isMobileMenuOpen ? (
//                     <button
//                       onClick={toggleMobileMenu}
//                       className="text-primary p-2 cursor-pointer"
//                       aria-label="Open Mobile Menu"
//                     >
//                       <GiHamburgerMenu size={26} />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={closeMobileMenu}
//                       aria-label="Close Mobile Menu"
//                       className="text-neutral-900 cursor-pointer" // Keep consistent styling or adjust as needed
//                     >
//                       <IoClose className="size-10 hover:bg-gray-300 text-mainheading dark:text-white hover:dark:bg-primarybox p-1.5 rounded-full transition-colors duration-300 ease-in-out" />
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu (Conditional Rendering with Framer Motion) */}
//       <AnimatePresence>
//         {isMobileMenuOpen &&
//           !isLargeScreen && ( // Ensure menu only shows when open AND not on large screen
//             <motion.div
//               key="mobile-menu" // Add key for AnimatePresence to track the element
//               className="fixed inset-0 z-40 lg:hidden" // Use fixed positioning and ensure it's behind the sticky header's z-index if needed
//               variants={mobileMenuVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//             >
//               <MobileMenu
//                 isOpen={isMobileMenuOpen}
//                 onClose={closeMobileMenu}
//                 featureLinks={featureLinks}
//                 topContent={topContent}
//               />
//             </motion.div>
//           )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5"; // Correct import for the close icon
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
//   const [isSticky, setIsSticky] = useState<boolean>(false); // State for sticky header

//   // --- State Toggling Functions ---
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // --- Effects ---

//   // Effect for screen size detection and closing menu on resize to large screen
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024; // lg breakpoint
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu(); // Close mobile menu if screen becomes large
//       }
//     };

//     checkScreenSize(); // Initial check
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // Re-run if menu state changes

//   // Effect for handling body scroll lock when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]); // Dependency on menu state

//   // Effect for handling scroll position and setting sticky state
//   useEffect(() => {
//     const handleScroll = () => {
//       // Set sticky state based on scroll position (e.g., > 100px)
//       setIsSticky(window.scrollY > 100); // Adjust threshold as needed
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []); // Run only on mount and unmount

//   // --- Animation Variants ---
//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%", // Slide out to the left
//       opacity: 0.8, // Optional: fade out slightly
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   // --- Data for Dropdowns/Links ---
//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     { href: "/feature-3", text: "Another Feature" }, // Example
//   ];

//   const topContent = // Example top content for dropdown
//     (
//       <div>
//         <Image
//           src="/assets/images/plane.webp" // Ensure this path is correct
//           alt="Plane"
//           width={64} // Adjusted size
//           height={64}
//           className="size-16 mb-2" // Centered and margin bottom
//         />
//         <div>
//           <p className="text-gray-500 max-w-sm leading-normal dark:text-gray-300">
//             Learn how millions of customers move their money globally right.
//           </p>
//         </div>
//       </div>
//     );

//   // --- Component Return ---
//   return (
//     <header
//       className={`w-full transition-all duration-300 ease-in-out z-50 ${
//         isSticky
//           ? "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-md" // Sticky styles
//           : "relative bg-[#f2f4f7] dark:bg-background" // Non-sticky styles (adjust initial background if needed)
//       }`}
//     >
//       <div className="px-4">
//         {/* Removed specific background color here, handled by header */}
//         <nav
//           className="flex items-center justify-between gap-4 md:h-20 h-[72px] container mx-auto"
//           aria-label="Global"
//         >
//           {/* Adjusted height to 72px for h-18 */}
//           <div className="flex-shrink-0">
//             <Link href="/" onClick={closeMobileMenu}>
//               {/* Close menu if logo clicked */}
//               <Image
//                 // Consider using different logos for light/dark if needed
//                 src="/assets/images/wise-logo.svg" // Ensure path is correct
//                 alt="Wise Logo"
//                 width={100} // Slightly smaller logo maybe?
//                 height={24}
//                 priority // Prioritize loading the logo
//                 className="md:size-28 size-22"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2">
//             {/* Desktop Links */}
//             <Link
//               href="/"
//               className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//             >
//               Home
//             </Link>

//             <Link
//               href="/about-us"
//               className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//             >
//               About
//             </Link>

//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               buttonClassName="nav-link-desktop" // Use consistent styling
//               // onLinkClick is not strictly needed here as it's desktop
//             />

//             <Link
//               href="/reviews"
//               className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//             >
//               Reviews
//             </Link>

//             <Link
//               href="/faqs"
//               className="px-4 py-1.5 rounded-full font-medium text-mainheading dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary dark:text-white transition-colors duration-300"
//             >
//               Help
//             </Link>

//             {/* Theme Toggle */}
//             <div className="mx-2">
//               <ThemeToggle location="header" />
//             </div>

//             <Link
//               href="/auth/register"
//               className="px-4 py-1.5 hidden lg:block  dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-mainheading"
//             >
//               Register
//             </Link>

//             {/* Login Button (Visible on Large Screens) */}
//             <Link
//               href="/auth/login"
//               className="bg-primary px-4 py-1.5 hidden lg:block text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//             >
//               Log in
//             </Link>
//           </div>

//           {/* Mobile Actions (Hamburger/Close & Theme Toggle) */}
//           <div className="flex lg:hidden items-center gap-2">
//             {/* Hamburger/Close Button */}
//             {!isMobileMenuOpen ? (
//               <button
//                 onClick={toggleMobileMenu}
//                 className="p-2 text-primary dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
//                 aria-label="Open Menu"
//                 aria-expanded="false"
//               >
//                 <GiHamburgerMenu size={26} />
//               </button>
//             ) : (
//               <button
//                 onClick={closeMobileMenu} // *** CRITICAL: Ensure this calls closeMobileMenu ***
//                 className="p-1.5 text-mainheading dark:text-white hover:bg-gray-200 dark:hover:bg-primarybox rounded-full transition-colors"
//                 aria-label="Close Menu"
//                 aria-expanded="true"
//               >
//                 {/* Using IoClose as requested */}
//                 <IoClose size={26} />
//               </button>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen &&
//           !isLargeScreen && ( // Only show if open AND on small screen
//             <motion.div
//               key="mobile-menu"
//               className="fixed inset-0 z-40 lg:hidden" // Use fixed positioning
//               variants={mobileMenuVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               // Optional: Add a backdrop
//               // onClick={closeMobileMenu} // Close if backdrop is clicked
//             >
//               {/* Backdrop - uncomment if desired */}
//               {/* <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" /> */}

//               {/* The actual menu component */}
//               <MobileMenu
//                 isOpen={isMobileMenuOpen} // Pass isOpen state
//                 onClose={closeMobileMenu} // *** CRITICAL: Pass the closer function ***
//                 featureLinks={featureLinks}
//                 topContent={topContent}
//               />
//             </motion.div>
//           )}
//       </AnimatePresence>
//     </header>
//   );
// };

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation"; // <--- Import usePathname
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname(); // <--- Get the current pathname

//   // --- State Toggling Functions ---
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // --- Effects --- (Keep existing effects)

//   // Effect for screen size detection and closing menu on resize to large screen
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024; // lg breakpoint
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu(); // Close mobile menu if screen becomes large
//       }
//     };

//     checkScreenSize(); // Initial check
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // Re-run if menu state changes

//   // Effect for handling body scroll lock when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling
//     } else {
//       document.body.style.overflow = "auto"; // Allow scrolling
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]); // Dependency on menu state

//   // Effect for handling scroll position and setting sticky state
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 300); // Adjust threshold as needed
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []); // Run only on mount and unmount

//   // --- Animation Variants ---
//   const mobileMenuVariants = {
//     open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3 },
//     },
//   };

//   // --- Data for Dropdowns/Links ---
//   const featureLinks: FeatureLink[] = [
//     { href: "/dashboard", text: "Send Money" },
//     { href: "/sendlargeamount", text: "Send Large Amounts" },
//     { href: "/feature-3", text: "Another Feature" },
//   ];

//   const topContent = (
//     <div>
//       <Image
//         src="/assets/images/plane.webp" // Ensure this path is correct
//         alt="Plane"
//         width={64}
//         height={64}
//         className="size-16 mb-2"
//       />
//       <div>
//         <p className="text-gray-500 max-w-sm leading-normal dark:text-gray-300">
//           Learn how millions of customers move their money globally right.
//         </p>
//       </div>
//     </div>
//   );

//   // --- Helper function for link classes ---
//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary";
//     // Define your active classes - example: primary background, white text
//     const activeClasses =
//       "bg-gray/5  dark:bg-secondary text-main dark:text-primary"; // Added shadow for active state

//     let isActive = false;

//     if (isFeatureDropdown) {
//       // Check if the current pathname matches any of the feature links
//       isActive = featureLinks.some((link) => pathname === link.href);
//     } else {
//       isActive = pathname === href;
//     }

//     // Special case for Home link matching root path '/'
//     if (href === "/" && pathname === "/") {
//       isActive = true;
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   // --- Component Return ---
//   return (
//     <header
//       className={`w-full transition-all duration-300 ease-in-out z-50 ${
//         isSticky
//           ? "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-md"
//           : "relative bg-transparent" // Make initial background transparent or match page bg
//       }`}
//       // Add a conditional background if needed when not sticky, e.g., based on path
//       style={{
//         backgroundColor: isSticky
//           ? undefined
//           : "transparent" /* Or your page's default bg */,
//       }}
//     >
//       <div className="px-4 bg-[#f2f4f7] dark:bg-background">
//         <nav
//           className="flex items-center justify-between  gap-4 md:h-20 h-[72px] container mx-auto"
//           aria-label="Global"
//         >
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" onClick={closeMobileMenu}>
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:size-28 size-22"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2">
//             {/* --- Desktop Links with Active Styling --- */}
//             <Link href="/" className={getLinkClasses("/")}>
//               Home
//             </Link>

//             <Link href="/about-us" className={getLinkClasses("/about-us")}>
//               About
//             </Link>

//             {/* Use getLinkClasses for the Feature Dropdown trigger */}
//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               // Apply conditional classes to the button itself
//               buttonClassName={getLinkClasses("/features")} // Pass true for isFeatureDropdown check
//             />

//             <Link href="/reviews" className={getLinkClasses("/reviews")}>
//               Reviews
//             </Link>

//             <Link href="/faqs" className={getLinkClasses("/faqs")}>
//               Help
//             </Link>

//             {/* Theme Toggle */}
//             <div className="mx-2">
//               <ThemeToggle location="header"/>
//             </div>

//             {/* --- Auth Links --- */}
//             <Link
//               href="/auth/register"
//               // Apply base styling, active state usually not needed for auth actions
//               className="px-4 py-1.5 hidden lg:block dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main"
//             >
//               Register
//             </Link>

//             <Link
//               href="/auth/login"
//               // Use specific styling for login button, not the active/inactive logic
//               className="bg-primary px-4 py-1.5 hidden lg:block text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading" // Ensure text is visible
//             >
//               Log in
//             </Link>
//           </div>

//           {/* Mobile Actions (Hamburger/Close & Theme Toggle) */}
//           <div className="flex lg:hidden items-center gap-2">
//             {/* Hamburger/Close Button */}
//             {!isMobileMenuOpen ? (
//               <button
//                 onClick={toggleMobileMenu}
//                 className="p-2 text-primary dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
//                 aria-label="Open Menu"
//               >
//                 <GiHamburgerMenu size={26} />
//               </button>
//             ) : (
//               <button
//                 onClick={closeMobileMenu}
//                 className="p-1.5 text-mainheading dark:text-white hover:bg-gray-200 dark:hover:bg-primarybox rounded-full transition-colors"
//                 aria-label="Close Menu"
//               >
//                 <IoClose size={26} />
//               </button>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             className="fixed inset-0 z-40 lg:hidden"
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             {/* Pass pathname to MobileMenu if it needs to highlight active links too */}
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               topContent={topContent}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5"; // Keep this for the header bar close button
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // <--- Adjust path if needed (e.g., '../layout/MobileMenu')
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true); // Default to true or check initial size
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname();

//   // --- State Toggling Functions ---
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   // THIS is the function passed to MobileMenu as onClose
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // --- Effects ---

//   // Effect for screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024; // lg breakpoint
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu(); // Close mobile menu if screen becomes large
//       }
//     };

//     // Initial check
//     checkScreenSize();

//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // Dependency ensures check runs if menu state changes

//   // Effect for handling body scroll lock
//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       // Only lock scroll if menu is open AND screen is small
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]); // Depend on both states

//   // Effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       // Only make sticky if not on a small screen with the menu open
//       // or adjust threshold if needed
//       setIsSticky(window.scrollY > 50); // Adjust threshold as needed
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // --- Animation Variants ---
//   const mobileMenuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%", // Slide out to the left
//       opacity: 0.8, // Optional fade
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   // --- Data for Dropdowns/Links ---
//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];

//   // topContent is primarily for the desktop dropdown, might not be needed in MobileMenu
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-primary" />
//       <p className="text-gray-500 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   // --- Helper function for link classes ---
//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out"; // Added ease-in-out
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary"; // Adjusted hover backgrounds
//     const activeClasses =
//       "bg-gray/5 dark:bg-secondary text-mainheading dark:text-primary"; // Adjusted active backgrounds

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href)); // Use startsWith for features pages
//     } else if (href === "/") {
//       isActive = isRootPath; // Only active if exact match for home
//     } else {
//       // Ensure pathname is not null and handle non-root paths
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   return (
//     <>
//       {/* Use Fragment to avoid extra div */}
//       <header
//         className={`w-full transition-all duration-300 ease-in-out z-50 ${
//           isSticky
//             ? "fixed top-0 left-0 right-0 dark:bg-background bg-white" // Added backdrop blur and slight transparency
//             : "relative bg-transparent"
//         }`}
//       >
//         <div
//           className={`transition-colors duration-300 ${
//             isSticky ? "" : "bg-[#f2f4f7] dark:bg-background"
//           }`}
//         >
//           {/* Container for potential bg */}
//           <div className="px-4">
//             {/* Inner padding container */}
//             <nav
//               className="flex items-center justify-between gap-4 md:h-20 h-[72px] container mx-auto"
//               aria-label="Global"
//             >
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <Link
//                   href="/"
//                   onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//                 >
//                   {/* Close menu if clicking logo when open */}
//                   <Image
//                     src="/assets/images/wise-logo.svg"
//                     alt="Wise Logo"
//                     width={100}
//                     height={24}
//                     priority // Good for LCP
//                     className="md:w-28 md:h-auto w-20 h-auto" // Use auto height for aspect ratio
//                   />
//                 </Link>
//               </div>

//               {/* Desktop Navigation & Actions */}
//               <div className="hidden lg:flex flex-grow items-center justify-end gap-2">
//                 {/* Reduced gap slightly */}
//                 <Link href="/" className={getLinkClasses("/")}>
//                   Home
//                 </Link>
//                 <Link href="/about-us" className={getLinkClasses("/about-us")}>
//                   About
//                 </Link>
//                 <FeatureDropdown
//                   buttonText="Features"
//                   links={featureLinks}
//                   topContent={topContent}
//                   // Check if any feature link is active, or use a base path like /features
//                   buttonClassName={getLinkClasses("/features", false)} // Pass true or a base feature path
//                 />

//                 <Link href="/reviews" className={getLinkClasses("/reviews")}>
//                   Reviews
//                 </Link>
//                 <Link href="/faqs" className={getLinkClasses("/faqs")}>
//                   Help
//                 </Link>
//                 <div className="mx-2">
//                   <ThemeToggle location="header" />{" "}
//                 </div>
//                 <Link
//                   href="/auth/register"
//                   className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   href="/auth/login"
//                   className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading"
//                 >
//                   Log in
//                 </Link>
//               </div>

//               {/* Mobile Actions (Hamburger/Close & Theme Toggle) */}
//               <div className="flex lg:hidden items-center gap-2">
//                 <button
//                   onClick={toggleMobileMenu} // This button now only toggles
//                   className="p-2 bg-gray/5 dark:bg-secondary text-mainheading dark:text-primary rounded-full transition-colors "
//                   aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"} // Dynamic aria-label
//                   aria-expanded={isMobileMenuOpen} // Indicate state for accessibility
//                 >
//                   {/* Conditionally render Hamburger or Close icon based on state */}
//                   {isMobileMenuOpen ? (
//                     <IoMdClose className="size-4" />
//                   ) : (
//                     <GiHamburgerMenu className="size-4" />
//                   )}
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             className="fixed inset-0 z-40 lg:hidden" // Ensure it's behind header (z-40 vs z-50) but above content
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             {/* Pass the close function and necessary data */}
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu} // <<< Pass the closing function here
//               featureLinks={featureLinks}
//               // topContent={topContent} // Decide if you need topContent in mobile
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;

// // frontend/src/app/components/layout/Header.tsx // Or your actual path
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5"; // Keep this for the header bar close button
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // <--- Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";
// import { useAuth } from "@/app/contexts/AuthContext"; // <--- IMPORT useAuth

// // Define a type for the feature links
// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true); // Default to true or check initial size
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname();
//   const { user, logout, loading: authLoading } = useAuth(); // <--- USE AUTH CONTEXT

//   // --- State Toggling Functions ---
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // --- Effects --- (Keep existing effects)

//   // Effect for screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024; // lg breakpoint
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   // Effect for handling body scroll lock
//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]);

//   // Effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // --- Animation Variants ---
//   const mobileMenuVariants = {
//     // ... (keep existing variants)
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   // --- Data for Dropdowns/Links ---
//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-primary" />
//       <p className="text-gray-500 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   // --- Helper function for link classes --- (Keep existing function)
//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-gray/5 hover:dark:bg-secondary";
//     const activeClasses =
//       "bg-gray/5 dark:bg-secondary text-mainheading dark:text-primary"; // <-- This is the active style

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
//     } else if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   // --- Handle Logout Click ---
//   const handleLogout = () => {
//     logout(); // Call the logout function from AuthContext
//     // No need to redirect here, AuthContext handles it if configured
//   };

//   return (
//     <>
//       <header
//         className={`w-full transition-all duration-300 ease-in-out z-50 ${
//           isSticky
//             ? "fixed top-0 left-0 right-0 bg-white/80 dark:bg-background/80 backdrop-blur-sm shadow-sm" // Added shadow and adjusted bg
//             : "relative bg-transparent"
//         }`}
//       >
//         <div
//           className={`transition-colors duration-300 ${
//             isSticky ? "" : "bg-[#f2f4f7] dark:bg-background"
//           }`}
//         >
//           <div className="px-4">
//             <nav
//               className="flex items-center justify-between gap-4 md:h-20 h-[72px] container mx-auto"
//               aria-label="Global"
//             >
//               {/* Logo */}
//               <div className="flex-shrink-0">
//                 <Link
//                   href="/"
//                   onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//                 >
//                   <Image
//                     src="/assets/images/wise-logo.svg"
//                     alt="Wise Logo"
//                     width={100}
//                     height={24}
//                     priority
//                     className="md:w-28 md:h-auto w-20 h-auto"
//                   />
//                 </Link>
//               </div>

//               {/* Desktop Navigation & Actions */}
//               <div className="hidden lg:flex flex-grow items-center justify-end gap-2">
//                 {/* Core Navigation Links */}
//                 <Link href="/" className={getLinkClasses("/")}>
//                   Home
//                 </Link>
//                 <Link href="/about-us" className={getLinkClasses("/about-us")}>
//                   About
//                 </Link>
//                 <FeatureDropdown
//                   buttonText="Features"
//                   links={featureLinks}
//                   topContent={topContent}
//                   buttonClassName={getLinkClasses("/features", true)} // Check if any feature link is active
//                 />
//                 <Link href="/reviews" className={getLinkClasses("/reviews")}>
//                   Reviews
//                 </Link>
//                 <Link href="/faqs" className={getLinkClasses("/faqs")}>
//                   Help
//                 </Link>
//                 <div className="mx-2">
//                   <ThemeToggle location="header" />
//                 </div>

//                 {/* === Dynamic Auth Links (Desktop) === */}
//                 {!authLoading && ( // Render only when not in initial auth loading state
//                   <>
//                     {user ? (
//                       <>
//                         <Link
//                           href="/dashboard" // Adjust if your dashboard route is different
//                           className={getLinkClasses("/dashboard")}
//                         >
//                           Dashboard
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                         >
//                           Log out
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           href="/auth/register"
//                           className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/5 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
//                         >
//                           Register
//                         </Link>
//                         <Link
//                           href="/auth/login"
//                           className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                         >
//                           Log in
//                         </Link>
//                       </>
//                     )}
//                   </>
//                  )}
//                  {/* Optional: Show a spinner or nothing while authLoading is true */}
//                  {/* {authLoading && <div className="w-16 h-6 animate-pulse bg-gray-300 rounded-full"></div>} */}

//               </div>

//               {/* Mobile Actions (Hamburger/Close & Theme Toggle) */}
//               <div className="flex lg:hidden items-center gap-2">
//                  <button
//                    onClick={toggleMobileMenu}
//                    className="p-2 bg-gray/5 dark:bg-secondary text-mainheading dark:text-primary rounded-full transition-colors"
//                    aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//                    aria-expanded={isMobileMenuOpen}
//                  >
//                    {isMobileMenuOpen ? (
//                      <IoMdClose className="size-4" />
//                    ) : (
//                      <GiHamburgerMenu className="size-4" />
//                    )}
//                  </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             className="fixed inset-0 z-40 lg:hidden" // Ensure it's behind header (z-40 vs z-50) but above content
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             {/* === Pass auth status and logout function to MobileMenu === */}
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               isLoggedIn={!!user} // Pass boolean indicating if user is logged in
//               onLogout={handleLogout} // Pass the logout handler
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;

// // frontend/src/app/components/layout/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";
// import { useAuth } from "@/app/contexts/AuthContext";

// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname();
//   const { user, logout, loading: authLoading } = useAuth();

//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       // Update sticky state based on scroll position (e.g., > 50px)
//       setIsSticky(currentScrollY > 50);

//       lastScrollY = currentScrollY;
//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(handleScroll);
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true }); // Use passive listener

//     // Initial check in case the page loads already scrolled
//     handleScroll();

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []); // No dependencies needed if only using window.scrollY

//   const mobileMenuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-mainheading dark:text-primary " />
//       <p className="text-gray-700 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-secondary transition-colors duration-300 ease-in-out";
//     const activeClasses =
//       "bg-lightgray dark:bg-secondary text-mainheading dark:text-primary transition-colors duration-300 ease-in-out"; // Active style

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
//     } else if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//       <header
//         className={`w-full z-50 transition-[transform,background-color,box-shadow] duration-300 ease-in-out px-4 ${
//           isSticky
//             ? "fixed top-0 left-0 right-0 bg-white dark:bg-background transform shadow-md translate-y-0" // Sticky state: Fixed, blurred bg, shadow, visible
//             : "relative bg-white dark:bg-background transform translate-y-0" // Non-sticky state: Relative, initial bg, visible
//         }`}
//       >
//         <nav
//           className="flex items-center justify-between h-20 container mx-auto"
//           aria-label="Global"
//         >
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//             >
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:w-26 md:h-auto w-24 h-auto"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2.5">
//             {/* Core Navigation Links */}
//             <Link href="/" className={getLinkClasses("/")}>
//               Home
//             </Link>
//             <Link href="/about-us" className={getLinkClasses("/about-us")}>
//               About
//             </Link>
//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               buttonClassName={getLinkClasses("/features", false)}
//             />
//             <Link href="/reviews" className={getLinkClasses("/reviews")}>
//               Reviews
//             </Link>
//             <Link href="/faqs" className={getLinkClasses("/faqs")}>
//               Help
//             </Link>
//             <div className="mx-2">
//               <ThemeToggle location="header" />
//             </div>

//             {/* === Dynamic Auth Links (Desktop) === */}
//             {!authLoading && (
//               <>
//                 {user ? (
//                   <>
//                     <Link
//                       href="/dashboard"
//                       className={getLinkClasses("/dashboard")}
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                     >
//                       Log out
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       href="/auth/register"
//                       className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-gray/10 dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
//                     >
//                       Register
//                     </Link>
//                     <Link
//                       href="/auth/login"
//                       className="bg-primary ml-1 px-5 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                     >
//                       Log in
//                     </Link>
//                   </>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Mobile Actions (Hamburger/Close) */}
//           <div className="flex lg:hidden items-center gap-2">
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2.5 bg-gray/10 dark:bg-secondary text-mainheading dark:text-primary rounded-full transition-colors"
//               aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//               aria-expanded={isMobileMenuOpen}
//             >
//               {isMobileMenuOpen ? (
//                 <IoMdClose className="size-4" />
//               ) : (
//                 <GiHamburgerMenu className="size-4" />
//               )}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             className="fixed inset-0 z-40 lg:hidden" // Ensure it's behind header (z-40 vs z-50) but above content
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               isLoggedIn={!!user}
//               onLogout={handleLogout}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;



// // frontend/src/app/components/layout/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";
// import { useAuth } from "@/app/contexts/AuthContext";

// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname();
//   const { user, logout, loading: authLoading } = useAuth();

//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   // Effect for handling screen size changes and mobile menu
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // isMobileMenuOpen dependency is correct here

//   // Effect for preventing body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup function to restore scroll
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]);

//   // Effect for handling scroll and setting sticky state
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       // Update sticky state based on scroll position (e.g., scrolled > 50px)
//       setIsSticky(currentScrollY > 50);

//       lastScrollY = currentScrollY;
//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(handleScroll);
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });

//     // Initial check in case the page loads already scrolled
//     handleScroll();

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []); // No dependencies needed as it only uses window.scrollY

//   const mobileMenuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-mainheading dark:text-primary " />
//       <p className="text-gray-700 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-secondary"; // Removed redundant transition classes here
//     const activeClasses =
//       "bg-lightgray dark:bg-secondary text-mainheading dark:text-primary"; // Removed redundant transition classes here

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       // Check if current pathname starts with any feature link href
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
//     } else if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       // Ensure pathname is defined and not root before checking startsWith for other links
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   const handleLogout = () => {
//     logout();
//     // Optionally navigate the user after logout
//     // router.push('/');
//     closeMobileMenu(); // Close menu if open on logout
//   };

//   return (
//     <>
//       <header
//         className={`w-full z-50 transition-[background-color,box-shadow] duration-300 ease-in-out px-4 ${
//           // Removed 'transform' from transition here if not animating translateY
//           isSticky
//             ? "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-md" // Sticky state: Fixed, white/dark bg, shadow
//             : "relative bg-white dark:bg-background" // Non-sticky state: Relative, white/dark bg, no shadow
//         }`}
//       >
//         <nav
//           className="flex items-center justify-between h-20 container mx-auto"
//           aria-label="Global"
//         >
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//               aria-label="Wise Home"
//             >
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:w-26 md:h-auto w-24 h-auto" // Added dark:invert for visibility in dark mode if SVG is dark
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2.5">
//             {/* Core Navigation Links */}
//             <Link href="/" className={getLinkClasses("/")}>
//               Home
//             </Link>
//             <Link href="/about-us" className={getLinkClasses("/about-us")}>
//               About
//             </Link>
//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               // Pass the active state logic directly for the button styling
//               buttonClassName={getLinkClasses("/features", true)} // Check features routes for active state
//             />
//             <Link href="/reviews" className={getLinkClasses("/reviews")}>
//               Reviews
//             </Link>
//             <Link href="/faqs" className={getLinkClasses("/faqs")}>
//               Help
//             </Link>
//             <div className="mx-2">
//               <ThemeToggle location="header" />
//             </div>

//             {/* === Dynamic Auth Links (Desktop) === */}
//             {authLoading ? (
//               <div className="flex gap-2">
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//               </div>
//             ) : user ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={getLinkClasses("/dashboard")}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/register"
//                   className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-lightgray dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   href="/auth/login"
//                   className="bg-primary ml-1 px-5 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log in
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Actions (Hamburger/Close) */}
//           <div className="flex lg:hidden items-center gap-2">
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2.5 bg-gray/10 dark:bg-secondary text-mainheading dark:text-primary rounded-full transition-colors"
//               aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//               aria-expanded={isMobileMenuOpen}
//               aria-controls="mobile-menu-content" // Add aria-controls
//             >
//               {isMobileMenuOpen ? (
//                 <IoMdClose size={26}  className="text-neutral-900 dark:text-primary"/>
//               ) : (
//                 <GiHamburgerMenu size={26} className="text-neutral-900 dark:text-primary"/>
//               )}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             id="mobile-menu-content" // Match aria-controls
//             className="fixed inset-0 z-40 lg:hidden bg-white dark:bg-background" // Ensure it has a background
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             aria-modal="true" // Indicate it's a modal dialog
//           >
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               isLoggedIn={!!user} // Pass boolean directly
//               onLogout={handleLogout}
//               authLoading={authLoading} // Pass loading state to mobile menu
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;



// // frontend/src/app/components/layout/Header.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";
// import { useAuth } from "@/app/contexts/AuthContext";

// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
//   const [isSticky, setIsSticky] = useState<boolean>(false);
//   const pathname = usePathname();
//   const { user, logout, loading: authLoading } = useAuth();

//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   // Effect for handling screen size changes and mobile menu
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]); // isMobileMenuOpen dependency is correct here

//   // Effect for preventing body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup function to restore scroll
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]);

//   // Effect for handling scroll and setting sticky state
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       // Update sticky state based on scroll position (e.g., scrolled > 50px)
//       setIsSticky(currentScrollY > 50);

//       lastScrollY = currentScrollY;
//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(handleScroll);
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });

//     // Initial check in case the page loads already scrolled
//     handleScroll();

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []); // No dependencies needed as it only uses window.scrollY

//   const mobileMenuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-mainheading dark:text-primary " />
//       <p className="text-gray-700 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-secondary"; // Removed redundant transition classes here
//     const activeClasses =
//       "bg-lightgray dark:bg-secondary text-mainheading dark:text-primary"; // Removed redundant transition classes here

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       // Check if current pathname starts with any feature link href
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
//     } else if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       // Ensure pathname is defined and not root before checking startsWith for other links
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   const handleLogout = () => {
//     logout();
//     // Optionally navigate the user after logout
//     // router.push('/');
//     closeMobileMenu(); // Close menu if open on logout
//   };

//   return (
//     <>
//       <header
//         className={`w-full z-50 transition-[background-color,box-shadow] duration-300 ease-in-out px-4 ${
//           // Removed 'transform' from transition here if not animating translateY
//           isSticky
//             ? "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-sm" // Sticky state: Fixed, white/dark bg, shadow
//             : "relative bg-white dark:bg-background" // Non-sticky state: Relative, white/dark bg, no shadow
//         }`}
//       >
//         <nav
//           className="flex items-center justify-between h-20 container mx-auto"
//           aria-label="Global"
//         >
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//               aria-label="Wise Home"
//             >
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:w-26 md:h-auto w-24 h-auto" // Added dark:invert for visibility in dark mode if SVG is dark
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2.5">
//             {/* Core Navigation Links */}
//             <Link href="/" className={getLinkClasses("/")}>
//               Home
//             </Link>
//             <Link href="/about-us" className={getLinkClasses("/about-us")}>
//               About
//             </Link>
//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               buttonClassName={getLinkClasses("/features", true)} // Check features routes for active state
//             />
//             <Link href="/reviews" className={getLinkClasses("/reviews")}>
//               Reviews
//             </Link>
//             <Link href="/faqs" className={getLinkClasses("/faqs")}>
//               Help
//             </Link>
//             <div className="mx-2">
//               <ThemeToggle location="header" />
//             </div>

//             {/* === Dynamic Auth Links (Desktop) === */}
//             {authLoading ? (
//               <div className="flex gap-2">
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//               </div>
//             ) : user ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={getLinkClasses("/dashboard")}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/register"
//                   className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-lightgray dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   href="/auth/login"
//                   className="bg-primary ml-1 px-5 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log in
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Actions (Hamburger/Close) */}
//           <div className="flex lg:hidden items-center gap-2">
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2.5 bg-gray/10 dark:bg-secondary cursor-pointer text-mainheading dark:text-primary rounded-full transition-colors"
//               aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//               aria-expanded={isMobileMenuOpen}
//               aria-controls="mobile-menu-content" // Add aria-controls
//             >
//               {isMobileMenuOpen ? (
//                 <IoMdClose size={26}  className="text-neutral-900 dark:text-primary"/>
//               ) : (
//                 <GiHamburgerMenu size={24} className="text-neutral-900 dark:text-primary"/>
//               )}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             id="mobile-menu-content" // Match aria-controls
//             className="fixed inset-0 z-40 lg:hidden bg-white dark:bg-background" // Ensure it has a background
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             aria-modal="true" // Indicate it's a modal dialog
//           >
//             {/* Pass the required props to MobileMenu */}
//             <MobileMenu
//               isOpen={isMobileMenuOpen} // This prop is now managed internally by MobileMenu based on its logic, but passing it might be redundant if it uses its own state based on animation. However, the interface requires it.
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               isLoggedIn={!!user} // Pass boolean directly
//               onLogout={handleLogout}
//               authLoading={authLoading} // Pass loading state to mobile menu
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;


// // frontend/src/app/components/layout/Header.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react"; // Added useRef
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu"; // Adjust path if needed
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
// import { IoMdClose } from "react-icons/io";
// import { FaRocket } from "react-icons/fa6";
// import { useAuth } from "@/app/contexts/AuthContext";

// interface FeatureLink {
//   href: string;
//   text: string;
// }

// const HEADER_HEIGHT_THRESHOLD = 60; // Pixels - Adjust as needed

// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
//   const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
//   const [isScrolled, setIsScrolled] = useState<boolean>(false); // Is the page scrolled past the threshold?
//   const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true); // Should the header be visible (animated state)?
//   const lastScrollY = useRef<number>(0); // Use ref to store last scroll position efficiently
//   const pathname = usePathname();
//   const { user, logout, loading: authLoading } = useAuth();

//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   // Effect for handling screen size changes and mobile menu
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const large = window.innerWidth >= 1024;
//       setIsLargeScreen(large);
//       if (large && isMobileMenuOpen) {
//         closeMobileMenu();
//       }
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [isMobileMenuOpen]);

//   // Effect for preventing body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen, isLargeScreen]);

//   // Effect for handling scroll, stickiness, and visibility animation
//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Determine if scrolled past threshold (for background/shadow)
//       const scrolledPastThreshold = currentScrollY > HEADER_HEIGHT_THRESHOLD;
//       setIsScrolled(scrolledPastThreshold);

//       // Determine visibility (show/hide animation logic)
//       if (currentScrollY <= HEADER_HEIGHT_THRESHOLD) {
//         // Always show if near the top
//         setIsHeaderVisible(true);
//       } else {
//         // Scrolled down past threshold: Hide on scroll down, show on scroll up
//         if (currentScrollY > lastScrollY.current) {
//           // Scrolling Down
//           setIsHeaderVisible(false);
//         } else {
//           // Scrolling Up
//           setIsHeaderVisible(true);
//         }
//       }

//       lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY; // Update last scroll position
//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(handleScroll);
//         ticking = true;
//       }
//     };

//     // Initialize state based on initial scroll position
//     lastScrollY.current = window.scrollY;
//     handleScroll(); // Run once on mount

//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []); // No dependencies needed

//   const mobileMenuVariants = {
//     open: {
//       x: 0,
//       opacity: 1,
//       transition: { type: "tween", duration: 0.3, ease: "easeOut" },
//     },
//     closed: {
//       x: "-100%",
//       opacity: 0.8,
//       transition: { type: "tween", duration: 0.3, ease: "easeIn" },
//     },
//   };

//   const featureLinks: FeatureLink[] = [
//     { href: "/send-money", text: "Send Money" },
//     { href: "/add-money", text: "Add Money" },
//   ];
//   const topContent = (
//     <div className="space-y-4">
//       <FaRocket className="lg:size-10 size-6 text-mainheading dark:text-primary " />
//       <p className="text-gray-700 max-w-sm leading-normal dark:text-gray-300">
//         Learn how millions of customers move their money globally right.
//       </p>
//     </div>
//   );

//   const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
//     const baseClasses =
//       "px-4 py-1.5 rounded-full font-medium transition-colors duration-300 ease-in-out";
//     const inactiveClasses =
//       "text-main dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-secondary";
//     const activeClasses =
//       "bg-lightgray dark:bg-secondary text-mainheading dark:text-primary";

//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (isFeatureDropdown) {
//       isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
//     } else if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
//   };

//   const handleLogout = () => {
//     logout();
//     closeMobileMenu();
//   };

//   // --- Header Classes Logic ---
//   // Base classes applied always
//   const headerBaseClasses = "w-full z-50 transition-all duration-300 ease-in-out px-4";

//   // Classes applied when scrolled past the threshold
//   const scrolledClasses = "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-sm";

//   // Classes applied when near the top (not scrolled past threshold)
//   const notScrolledClasses = "relative bg-white dark:bg-background"; // Or make transparent if desired

//   // Classes controlling the show/hide animation (translate)
//   const visibilityClasses = isHeaderVisible ? "translate-y-0" : "-translate-y-full";

//   return (
//     <>
//       <header
//         className={`
//           ${headerBaseClasses}
//           ${isScrolled ? scrolledClasses : notScrolledClasses}
//           ${isScrolled ? visibilityClasses : 'translate-y-0'} // Apply visibility transform only when potentially sticky
//         `}
//       >
//         <nav
//           className="flex items-center justify-between h-20 container mx-auto"
//           aria-label="Global"
//         >
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link
//               href="/"
//               onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
//               aria-label="Wise Home"
//             >
//               <Image
//                 src="/assets/images/wise-logo.svg"
//                 alt="Wise Logo"
//                 width={100}
//                 height={24}
//                 priority
//                 className="md:w-26 md:h-auto w-24 h-auto"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation & Actions */}
//           <div className="hidden lg:flex flex-grow items-center justify-end gap-2.5">
//             {/* Core Navigation Links */}
//             <Link href="/" className={getLinkClasses("/")}>
//               Home
//             </Link>
//             <Link href="/about-us" className={getLinkClasses("/about-us")}>
//               About
//             </Link>
//             <FeatureDropdown
//               buttonText="Features"
//               links={featureLinks}
//               topContent={topContent}
//               buttonClassName={getLinkClasses("/features", true)}
//             />
//             <Link href="/reviews" className={getLinkClasses("/reviews")}>
//               Reviews
//             </Link>
//             <Link href="/faqs" className={getLinkClasses("/faqs")}>
//               Help
//             </Link>
//             <div className="mx-2">
//               <ThemeToggle location="header" />
//             </div>

//             {/* === Dynamic Auth Links (Desktop) === */}
//             {authLoading ? (
//               <div className="flex gap-2">
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//                 <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
//               </div>
//             ) : user ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={getLinkClasses("/dashboard")}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/register"
//                   className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-lightgray dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   href="/auth/login"
//                   className="bg-primary ml-1 px-5 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
//                 >
//                   Log in
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Actions (Hamburger/Close) */}
//           <div className="flex lg:hidden items-center gap-2">
//             <button
//               onClick={toggleMobileMenu}
//               className="p-2.5 bg-gray/10 dark:bg-secondary cursor-pointer text-mainheading dark:text-primary rounded-full transition-colors"
//               aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//               aria-expanded={isMobileMenuOpen}
//               aria-controls="mobile-menu-content"
//             >
//               {isMobileMenuOpen ? (
//                 <IoMdClose size={26} className="text-neutral-900 dark:text-primary"/>
//               ) : (
//                 <GiHamburgerMenu size={24} className="text-neutral-900 dark:text-primary"/>
//               )}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && !isLargeScreen && (
//           <motion.div
//             key="mobile-menu"
//             id="mobile-menu-content"
//             // Adjust top position calculation based on header height if header is fixed
//             className={`fixed inset-x-0 top-20 z-40 lg:hidden bg-white dark:bg-background h-[calc(100dvh-80px)]`} // 80px = h-20
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             aria-modal="true"
//           >
//             {/* MobileMenu component itself should handle its internal animations */}
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               onClose={closeMobileMenu}
//               featureLinks={featureLinks}
//               isLoggedIn={!!user}
//               onLogout={handleLogout}
//               authLoading={authLoading}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;




// frontend/src/app/components/layout/Header.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu"; // Adjust path if needed
import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Adjust path if needed
import ThemeToggle from "../../../contexts/ThemeToggle"; // Adjust path if needed
import { IoMdClose } from "react-icons/io";
import { FaRocket } from "react-icons/fa6";
import { useAuth } from "@/app/contexts/AuthContext";

interface FeatureLink {
  href: string;
  text: string;
}

const HEADER_HEIGHT_THRESHOLD = 60; // Pixels - When to start applying sticky/hiding logic
const SCROLL_UP_THRESHOLD = 20; // Pixels - How much user needs to scroll up to reveal header

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true); // Default to true for SSR/initial render maybe? Check effect.
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Is the page scrolled past the height threshold?
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true); // Should the header be visible (animated state)?
  const lastScrollY = useRef<number>(0); // Use ref to store last scroll position efficiently
  const pathname = usePathname();
  const { user, logout, loading: authLoading } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Effect for handling screen size changes and mobile menu
  useEffect(() => {
    const checkScreenSize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large && isMobileMenuOpen) {
        closeMobileMenu(); // Close mobile menu if screen becomes large
      }
    };
    // Check on mount
    checkScreenSize();
    // Add listener
    window.addEventListener("resize", checkScreenSize);
    // Cleanup listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobileMenuOpen]); // Dependency ensures it runs when menu state changes too

  // Effect for preventing body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && !isLargeScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen, isLargeScreen]); // Runs when menu or screen size changes

  // Effect for handling scroll, stickiness, and visibility animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = lastScrollY.current - currentScrollY; // Positive when scrolling up, negative when scrolling down

      // 1. Determine if scrolled past threshold (for background/shadow/stickiness)
      const scrolledPastThreshold = currentScrollY > HEADER_HEIGHT_THRESHOLD;
      setIsScrolled(scrolledPastThreshold);

      // 2. Determine header visibility based on scroll direction and threshold
      if (currentScrollY <= HEADER_HEIGHT_THRESHOLD) {
        // Always show if near the top or scrolled back to top
        setIsHeaderVisible(true);
      } else {
        // Scrolled down past the main threshold:
        if (deltaY < 0) {
          // Scrolling Down: Hide the header
          setIsHeaderVisible(false);
        } else if (deltaY >= SCROLL_UP_THRESHOLD) {
          // Scrolling Up sufficiently: Show the header
          setIsHeaderVisible(true);
        }
        // else: Scrolling up slightly (less than SCROLL_UP_THRESHOLD)
        //       Do nothing, keep the current visibility state (avoids flickering)
      }

      // Update last scroll position for the next event
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Initialize state based on initial scroll position on mount
    lastScrollY.current = window.scrollY;
    handleScroll(); // Run once immediately

    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup scroll listener on unmount
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Empty dependency array: This effect runs only once on mount and cleans up on unmount

  const mobileMenuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeOut" },
    },
    closed: {
      x: "-100%",
      opacity: 0.8,
      transition: { type: "tween", duration: 0.3, ease: "easeIn" },
    },
  };

  const featureLinks: FeatureLink[] = [
    { href: "/send-money", text: "Send Money" },
    { href: "/add-money", text: "Add Money" },
  ];
  const topContent = (
    <div className="space-y-4">
      <FaRocket className="lg:size-10 size-6 text-mainheading dark:text-primary " />
      <p className="text-gray-500 max-w-sm leading-normal dark:text-gray-300">
        Learn how millions of customers move their money globally right.
      </p>
    </div>
  );

  const getLinkClasses = (href: string, isFeatureDropdown = false): string => {
    const baseClasses =
      "px-4 py-1.5 rounded-full font-medium transition-all duration-75 ease-linear";
    const inactiveClasses =
      "text-mainheading dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-primarybox";
    const activeClasses =
      "bg-lightgray dark:bg-primarybox text-mainheading dark:text-primary";

    let isActive = false;
    const isRootPath = pathname === "/";

    if (isFeatureDropdown) {
      isActive = featureLinks.some((link) => pathname?.startsWith(link.href));
    } else if (href === "/") {
      isActive = isRootPath;
    } else {
      // Ensure pathname is not null or undefined before calling startsWith
      isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
    }

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  // --- Header Classes Logic ---
  const headerBaseClasses = "w-full z-50 transition-all duration-300 ease-in-out";
  const scrolledClasses = "fixed top-0 left-0 right-0 bg-white dark:bg-background shadow-sm";
  const notScrolledClasses = "relative bg-white dark:bg-background"; // Or make transparent if desired
  const visibilityClasses = isHeaderVisible ? "translate-y-0" : "-translate-y-full";

  return (
    <>
      <header
        className={`
          ${headerBaseClasses}
          ${isScrolled ? scrolledClasses : notScrolledClasses}
          ${
            isScrolled ? visibilityClasses : "translate-y-0"
          } // Apply visibility transform only when sticky
        `}
      >
        <div className="container mx-auto px-4">
          <nav
            className="flex items-center justify-between h-20"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={isMobileMenuOpen ? closeMobileMenu : undefined}
                aria-label="Wise Home"
              >
                <Image
                  src="/assets/images/wise-logo.svg"
                  alt="Wise Logo"
                  width={100}
                  height={24}
                  priority
                  className="w-28 h-auto"
                />
              </Link>
            </div>

            {/* START: Desktop Navigation & Actions - Conditionally Rendered */}
            {isLargeScreen && ( // <--- Added Condition Here
              <div className="lg:flex flex-grow items-center justify-end gap-2.5">
                {/* Core Navigation Links */}
                <Link href="/" className={getLinkClasses("/")}>
                  Home
                </Link>
                <Link href="/about-us" className={getLinkClasses("/about-us")}>
                  About
                </Link>
                <FeatureDropdown
                  buttonText="Features"
                  links={featureLinks}
                  topContent={topContent}
                  buttonClassName={getLinkClasses("/features", true)} // Pass `true` for feature dropdown check
                />
                <Link href="/reviews" className={getLinkClasses("/reviews")}>
                  Reviews
                </Link>
                <Link href="/faqs" className={getLinkClasses("/faqs")}>
                  Help
                </Link>
                <div className="mx-2">
                  <ThemeToggle location="header" />
                </div>

                {/* === Dynamic Auth Links (Desktop) === */}
                {authLoading ? (
                  <div className="flex gap-2">
                    <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
                    <div className="h-8 w-24 bg-lightgray dark:bg-white/5 rounded-full animate-pulse"></div>
                  </div>
                ) : user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={getLinkClasses("/dashboard")}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-primary ml-1 px-4 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      className="px-4 py-1.5 dark:text-white text-nowrap dark:hover:text-primary font-medium hover:bg-lightgray dark:hover:bg-secondary rounded-full transition-colors ease-in-out duration-300 text-main cursor-pointer"
                    >
                      Register
                    </Link>
                    <Link
                      href="/auth/login"
                      className="bg-primary ml-1 px-5 py-1.5 text-nowrap font-medium rounded-full hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading cursor-pointer"
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>
            )}
            {/* END: Desktop Navigation & Actions */}


            {/* Mobile Actions (Hamburger/Close) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleMobileMenu}
                className="size-12 flex items-center justify-center bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox cursor-pointer text-neutral-900 dark:text-primary rounded-full transition-all ease-linear duration-75"
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-content"
              >
                {isMobileMenuOpen ? (
                  <IoMdClose
                    size={26}
                    className="text-neutral-900 dark:text-primary"
                  />
                ) : (
                  <GiHamburgerMenu
                    size={26}
                    className="text-neutral-900 dark:text-primary"
                  />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {/* Condition here ensures it only renders when menu is open AND screen is not large */}
        {isMobileMenuOpen && !isLargeScreen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu-content"
            className={`fixed inset-x-0 top-20 z-40 bg-white dark:bg-background h-[calc(100dvh-80px)]`} // 80px = h-20
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-modal="true"
          >
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
              featureLinks={featureLinks}
              isLoggedIn={!!user}
              onLogout={handleLogout}
              authLoading={authLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;