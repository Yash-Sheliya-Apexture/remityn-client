// components/MobileMenu.tsx
// components/MobileMenu.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../../../public/assets/icons/plane.webp";

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   toggleFeaturesDropdown: () => void;
//   isFeaturesOpen: boolean;
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   toggleFeaturesDropdown,
//   isFeaturesOpen,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto">
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <div>
//               <button
//                 onClick={toggleFeaturesDropdown}
//                 className="block w-full text-left py-2  font-medium text-lg"
//               >
//                 Features
//               </button>
//               {isFeaturesOpen && (
//                 <div className="mt-2 pl-4">
//                   {/*  Features Dropdown Content */}

//                   <div>
//                     <div className="p-4 flex flex-col justify-start bg-green/10">
//                       <Image src={plane} alt="Plane" width={56} height={56} />

//                       <div>
//                         <p className="font-light text-gray">
//                           Learn how millions of customers move their money
//                           globally
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-4 flex flex-col gap-4">
//                       {/* Link 1 */}
//                       <Link
//                         href="/sendmoney"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send money</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                       </Link>

//                       {/* Link 2 */}
//                       <Link
//                         href="/sendlargeamount"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send large amounts</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center  py-2  font-medium text-lg">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                   alt="Indian Flag"
//                   className="h-5 w-5 rounded-full mr-1 object-cover"
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../../../public/assets/icons/plane.webp";

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   toggleFeaturesDropdown: () => void;
//   isFeaturesOpen: boolean;
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   toggleFeaturesDropdown,
//   isFeaturesOpen,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto">
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <div>
//               <button
//                 onClick={toggleFeaturesDropdown}
//                 className="block w-full text-left py-2  font-medium text-lg"
//               >
//                 Features
//               </button>
//               {isFeaturesOpen && (
//                 <div className="mt-2 pl-4">
//                   {/*  Features Dropdown Content */}

//                   <div>
//                     <div className="p-4 flex flex-col justify-start bg-green/10">
//                       <Image src={plane} alt="Plane" width={56} height={56} />

//                       <div>
//                         <p className="font-light text-gray">
//                           Learn how millions of customers move their money
//                           globally
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-4 flex flex-col gap-4">
//                       {/* Link 1 */}
//                       <Link
//                         href="/sendmoney"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send money</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                       </Link>

//                       {/* Link 2 */}
//                       <Link
//                         href="/sendlargeamount"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send large amounts</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center  py-2  font-medium text-lg">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                   alt="Indian Flag"
//                   className="h-5 w-5 rounded-full mr-1 object-cover"
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../../../public/assets/icons/plane.webp";

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   toggleFeaturesDropdown: () => void;
//   isFeaturesOpen: boolean;
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   toggleFeaturesDropdown,
//   isFeaturesOpen,
// }) => {
//   // No need for this check anymore: if (!isOpen) return null;
//     // Framer Motion handles the visibility

//   return (
//     <div className="fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto">
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <div>
//               <button
//                 onClick={toggleFeaturesDropdown}
//                 className="block w-full text-left py-2  font-medium text-lg"
//               >
//                 Features
//               </button>
//               {isFeaturesOpen && (
//                 <div className="mt-2 pl-4">
//                   {/*  Features Dropdown Content */}

//                   <div>
//                     <div className="p-4 flex flex-col justify-start bg-green/10">
//                       <Image src={plane} alt="Plane" width={56} height={56} />

//                       <div>
//                         <p className="font-light text-gray">
//                           Learn how millions of customers move their money
//                           globally
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-4 flex flex-col gap-4">
//                       {/* Link 1 */}
//                       <Link
//                         href="/sendmoney"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send money</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//                       </Link>

//                       {/* Link 2 */}
//                       <Link
//                         href="/sendlargeamount"
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                         onClick={onClose}
//                       >
//                         <p>Send large amounts</p>
//                         <IoIosArrowForward
//                           size={18}
//                           className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center  py-2  font-medium text-lg">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                   alt="Indian Flag"
//                   className="h-5 w-5 rounded-full mr-1 object-cover"
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// components/MobileMenu/MobileMenu.tsx

// "use client";
// import React, {useState} from "react";
// import Link from "next/link";
// import FeatureDropdown from "../../../components/FeatureDropdown"; // Import

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); // State for Features dropdown

//     const toggleFeaturesDropdown = () => {
//         setIsFeaturesOpen(!isFeaturesOpen);
//     };

//   return (
//     <div
//       className={`fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <FeatureDropdown
//                 buttonText="Features"
//                 buttonClassName="block w-full text-left py-2  font-medium text-lg" // Important for styling
//                 isMobile={true}                                               //  <--- Pass isMobile
//                 isOpen={isFeaturesOpen}                                       //  <--- Pass isOpen
//                 toggleDropdown={toggleFeaturesDropdown}                        //  <--- Pass toggle
//                 onLinkClick={onClose}
//             />

//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center  py-2  font-medium text-lg">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                   alt="Indian Flag"
//                   className="h-5 w-5 rounded-full mr-1 object-cover"
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // components/MobileMenu.tsx
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Import FeatureDropdown, adjust path

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: { href: string; text: string }[];
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); // State for Features dropdown

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   return (
//     <div
//       className={`fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               buttonClassName="block w-full text-left py-2  font-medium text-lg"
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={onClose}
//             />

//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center  py-2  font-medium text-lg">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
//                   alt="Indian Flag"
//                   className="h-5 w-5 rounded-full mr-1 object-cover"
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // components/MobileMenu.tsx
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image"; // Import next/image
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Import FeatureDropdown, adjust path

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: { href: string; text: string }[];
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); // State for Features dropdown

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Define image dimensions based on className w-5 h-5 (assuming default Tailwind base font size 16px, 1.25rem = 20px)
//   const flagSize = 20;

//   return (
//     <div
//       className={`fixed w-full h-[calc(100vh-5rem)] bg-white z-50 overflow-y-auto transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-6 space-y-4">
//           {/*  Navigation Links */}
//           <div className="flex items-center gap-4">
//             <Link
//               href="/personal"
//               passHref
//               className="block bg-lightgreen px-4 py-1 rounded-full font-medium"
//               onClick={onClose}
//             >
//               Personal
//             </Link>
//             <Link
//               href="/business"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Business
//             </Link>
//             <Link
//               href="/platform"
//               passHref
//               className="block px-4 py-1 rounded-full  font-medium hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Platform
//             </Link>
//           </div>

//           <div>
//             {/* Features (with dropdown) */}
//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               buttonClassName="block w-full text-left py-2  font-medium text-lg"
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={onClose}
//             />

//             <Link
//               href="/pricing"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/help"
//               passHref
//               className="block py-2  font-medium text-lg"
//               onClick={onClose}
//             >
//               Help
//             </Link>
//             <Link href="/en" passHref onClick={onClose}>
//               <div className="flex items-center py-2 font-medium text-lg">
//                 {/* Use next/image component */}
//                 <Image
//                   src="/assets/icon/flags/inr.svg" // Keep the same source
//                   alt="Indian Flag"
//                   width={flagSize} // Required prop
//                   height={flagSize} // Required prop
//                   className="rounded-full mr-1 object-cover" // Removed h-5 w-5 as dimensions are handled by props
//                 />
//                 <span>EN</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="p-6 flex sm:flex-row flex-col items-center gap-2">
//           {/*  Login and Register */}
//           <Link
//             href="/login"
//             passHref
//             className="block w-full p-2 bg-white hover:bg-green/10 border border-green rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Log in
//           </Link>
//           <Link
//             href="/register"
//             passHref
//             className="block w-full p-2 bg-lightgreen hover:bg-lightgreen-hover rounded-full font-medium text-lg text-center"
//             onClick={onClose}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // components/MobileMenu.tsx
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown"; // Import FeatureDropdown, adjust path

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: { href: string; text: string }[];
//   topContent?: React.ReactNode; // <-- Add this line (make it optional '?' or required based on need)
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks,
//   topContent, // <-- Destructure the prop here
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); // State for Features dropdown

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Handler that closes the main menu AND potentially the feature dropdown
//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false); // Close dropdown if open
//     onClose(); // *** CRITICAL: Call the passed onClose function ***
//   };

//   return (
//     <div
//       className={`fixed top-16 left-0 w-full h-[calc(100vh-3rem)] bg-[#f2f4f7] dark:bg-background z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full" // Correct transform for slide-in
//       }`}
//       // Add aria attributes for accessibility
//       aria-hidden={!isOpen}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="flex flex-col justify-between h-full">
//         <div className="p-4 space-y-4 border-t">
//           <div className="flex flex-col gap-2 w-full">
//             <Link
//               href="/"
//               className="px-4 py-1.5 w-fit rounded-full font-medium hover:bg-lightgray dark:hover:bg-primarybox"
//               onClick={handleLinkClick} // *** ADD onClick HANDLER ***
//             >
//               Home
//             </Link>

//             <Link
//               href="/about-us"
//               className="px-4 py-1.5 rounded-full w-fit font-medium hover:bg-lightgray dark:hover:bg-primarybox"
//               onClick={handleLinkClick} // *** ADD onClick HANDLER ***
//             >
//               About
//             </Link>

//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               topContent={topContent} // <-- Pass the prop down here
//               buttonClassName="block w-fit text-left py-2 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded" // Added hover and rounded
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={handleLinkClick} // Close main menu when a feature link is clicked
//             />

//             <Link
//               href="/faqs"
//               className="px-4 py-1.5 w-fit rounded-full font-medium hover:bg-lightgray dark:hover:bg-primarybox"
//               onClick={handleLinkClick} // *** ADD onClick HANDLER ***
//             >
//               Help
//             </Link>
//           </div>
//         </div>

//         {/* Ensure bottom buttons are sticky or at the bottom */}
//         <div className="p-6 mt-auto border-t">
//           <div className="flex flex-col sm:flex-row items-center gap-4">
//             {/* Login and Register */}
//             <Link
//               href="/auth/login" // Corrected path based on Header
//               passHref
//               className="block w-full px-4 lg:py-3 py-2 bg-white dark:bg-background border rounded-full font-medium lg:text-lg text-base text-center dark:text-white text-mainheading"
//               onClick={handleLinkClick}
//             >
//               Log in
//             </Link>
//             <Link
//               href="/auth/register" // Corrected path based on Header
//               passHref
//               className="block w-full px-4 lg:py-3 border py-2 bg-primary hover:bg-primaryhover rounded-full font-medium lg:text-lg text-base text-center text-mainheading" // Assuming lightgreen requires black text
//               onClick={handleLinkClick}
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // frontend/src/app/components/layout/MobileMenu.tsx // Or your actual path
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown";
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Optional: If you want theme toggle here

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: { href: string; text: string }[];
//   topContent?: React.ReactNode;
//   isLoggedIn: boolean;
//   onLogout: () => void;
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks,
//   topContent,
//   isLoggedIn,
//   onLogout,
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Handler that closes the main menu AND potentially the feature dropdown
//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false);
//     onClose(); // Call the passed onClose function
//   };

//   // Specific handler for logout to ensure both actions happen
//   const handleLogoutClick = () => {
//     onLogout(); // Call the logout function passed from Header
//     handleLinkClick(); // Close the menu
//   };

//   return (
//     <div
//       className={`fixed top-20 left-0 w-full h-[calc(100dvh-80px)] bg-white dark:bg-background z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//       aria-hidden={!isOpen}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="flex flex-col justify-between h-full -mt-2">
//         {/* Top Navigation Links */}
//         <div className="p-4 space-y-2 border-t">
//           {/* Reduced space-y */}
//           <div className="flex flex-col gap-1 w-full">
//             {/* Reduced gap */}
//             <Link
//               href="/"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               Home
//             </Link>
//             <Link
//               href="/about-us"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               About
//             </Link>
//             {/* Mobile Feature Dropdown */}
//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               buttonClassName="inline-block w-full text-left py-2 font-medium rounded-md" // Consistent styling
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={handleLinkClick} // Close main menu when a feature link is clicked
//             />
//             <Link
//               href="/faqs"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               Help
//             </Link>
//           </div>
//         </div>

//         {/* Bottom Auth Buttons (Dynamic) */}
//         <div className="p-4 border-t">
//           {/* Optional: Theme Toggle inside Mobile Menu */}
//           <div className="mb-4 flex justify-center">
//             <ThemeToggle location="admin" />
//           </div>
//           <div className="flex flex-col sm:flex-row items-center gap-3">
//             {/* === Dynamic Auth Links (Mobile) === */}
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   href="/dashboard" // Adjust dashboard route if needed
//                   passHref
//                   className="inline-block w-full px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors"
//                   onClick={handleLinkClick} // Close menu on click
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogoutClick} // Use specific handler
//                   className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-secondary text-main dark:text-white rounded-full font-medium text-base text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   passHref
//                   className="inline-block w-full px-4 py-3 border dark:border-none bg-white dark:bg-secondary font-medium rounded-full text-base text-center dark:text-white text-mainheading hover:bg-gray-50 transition-colors"
//                   onClick={handleLinkClick}
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   href="/auth/register"
//                   passHref
//                   className="inline-block w-full px-4 py-3 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors duration-300 ease-in-out"
//                   onClick={handleLinkClick}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // ========================================================================
// // frontend/src/app/components/layout/MobileMenu.tsx // Or your actual path
// // ========================================================================
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown";
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Optional: If you want theme toggle here

// // --- Define the interface for props ---
// interface MobileMenuProps {
//   isOpen: boolean; // Reflects if the menu should be open (controlled from parent)
//   onClose: () => void; // Function to call when the menu needs to close
//   navLinks: { href: string; text: string }[]; // Array of feature links
//   topContent?: React.ReactNode; // Optional top content (not currently used in the provided code)
//   isLoggedIn: boolean; // Authentication status
//   onLogout: () => void; // Function to call for logout
//   authLoading: boolean; // <<< Added this prop
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen, // Use this prop to control visibility if needed, though animation might handle it
//   onClose,
//   navLinks,
//   topContent, // Not used in the return jsx
//   isLoggedIn,
//   onLogout,
//   authLoading, // <<< Use this prop
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Handler that closes the main menu AND potentially the feature dropdown
//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false); // Ensure feature dropdown closes
//     onClose(); // Call the passed onClose function from Header
//   };

//   // Specific handler for logout to ensure both actions happen
//   const handleLogoutClick = () => {
//     onLogout(); // Call the logout function passed from Header
//     handleLinkClick(); // Close the menu
//   };
//   return (
//     <div
//       // The className here uses `isOpen` for translate-x, which might interfere with framer-motion in Header.tsx
//       // Consider removing the translate-x logic if framer-motion handles the animation entirely.
//       className={`fixed top-20 left-0 w-full h-[calc(100dvh-80px)] bg-white dark:bg-background z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//       aria-hidden={!isOpen} // Correctly uses the prop
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="flex flex-col justify-between h-full -mt-2">
//         {/* Top Navigation Links */}
//         <div className="p-4 space-y-2 border-t">
//           {/* Reduced space-y */}
//           <div className="flex flex-col gap-1 w-full">
//             {/* Reduced gap */}
//             <Link
//               href="/"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               Home
//             </Link>
//             <Link
//               href="/about-us"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               About
//             </Link>
//             {/* Mobile Feature Dropdown */}
//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               buttonClassName="inline-block w-full text-left py-2 font-medium rounded-md" // Consistent styling
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={handleLinkClick} // Close main menu when a feature link is clicked
//             />
//             <Link
//               href="/faqs"
//               className="inline-block py-2 rounded-md font-medium"
//               onClick={handleLinkClick}
//             >
//               Help
//             </Link>
//           </div>
//         </div>

//         {/* Bottom Auth Buttons (Dynamic) */}
//         <div className="p-4 border-t">
//           {/* Optional: Theme Toggle inside Mobile Menu */}
//           <div className="mb-4 flex justify-center">
//             <ThemeToggle location="admin" /> {/* Changed location example */}
//           </div>
//           <div className="flex flex-col sm:flex-row items-center gap-3">
//             {/* === Dynamic Auth Links (Mobile) === */}
//             {authLoading ? (
//               // Display loading indicators for mobile
//               <div className="flex flex-col sm:flex-row w-full gap-3">
//                 <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//                 <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//               </div>
//             ) : isLoggedIn ? (
//               <>
//                 <Link
//                   href="/dashboard" // Adjust dashboard route if needed
//                   passHref
//                   className="inline-block w-full px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors"
//                   onClick={handleLinkClick} // Close menu on click
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogoutClick} // Use specific handler
//                   className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-secondary text-main dark:text-white rounded-full font-medium text-base text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   passHref
//                   className="inline-block w-full px-4 py-3 border dark:border-none bg-white dark:bg-secondary font-medium rounded-full text-base text-center dark:text-white text-mainheading hover:bg-gray-50 transition-colors"
//                   onClick={handleLinkClick}
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   href="/auth/register"
//                   passHref
//                   className="inline-block w-full px-4 py-3 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors duration-300 ease-in-out"
//                   onClick={handleLinkClick}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

// // frontend/src/app/components/layout/MobileMenu.tsx // Or your actual path
// // ========================================================================

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown";
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Optional: If you want theme toggle here
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// // --- Define the interface for props ---
// interface MobileMenuProps {
//   isOpen: boolean; // Reflects if the menu should be open (controlled from parent)
//   onClose: () => void; // Function to call when the menu needs to close
//   navLinks: { href: string; text: string }[]; // Array of feature links
//   topContent?: React.ReactNode; // Optional top content (not currently used in the provided code)
//   isLoggedIn: boolean; // Authentication status
//   onLogout: () => void; // Function to call for logout
//   authLoading: boolean;
// }

// // Variants for the container of the links to orchestrate staggering
// const listVariants = {
//   hidden: {
//     opacity: 0, // Can start hidden if you prefer a fade-in for the whole block
//     transition: {
//       when: "afterChildren", // Ensure children finish animating out before hiding container
//     },
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren", // Ensure container is ready before children animate in
//       staggerChildren: 0.08, // Stagger delay between each child (adjust as needed)
//     },
//   },
// };

// // Variants for each individual link item
// const itemVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50, // Start 30px to the left
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position
//     transition: {
//       type: "spring", // Optional: Use spring physics
//       stiffness: 200, // Optional: Adjust spring stiffness
//       damping: 15, // Optional: Adjust spring damping
//       // Or use a simple ease:
//       ease: "easeOut",
//       duration: 0.3
//     },
//   },
// };

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks,
//   topContent,
//   isLoggedIn,
//   onLogout,
//   authLoading,
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Handler that closes the main menu AND potentially the feature dropdown
//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false); // Ensure feature dropdown closes
//     onClose(); // Call the passed onClose function from Header
//   };

//   // Specific handler for logout to ensure both actions happen
//   const handleLogoutClick = () => {
//     onLogout(); // Call the logout function passed from Header
//     handleLinkClick(); // Close the menu
//   };

//   return (
//     // AnimatePresence allows exit animations if you define an 'exit' variant later
//     // For now, it helps manage the presence of the motion component based on isOpen
//     <AnimatePresence>
//       {isOpen && ( // Only render the motion component when isOpen is true
//         <motion.div
//           // Main menu container animation (optional - you can keep your CSS transition)
//           // If you want framer-motion to handle the main slide-in:
//           initial={{ x: "-100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "-100%" }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//           // --- OR --- Keep your existing CSS transition class logic:
//           // className={`fixed top-20 left-0 w-full h-[calc(100dvh-80px)] bg-white dark:bg-background z-40 overflow-y-auto ${
//           //  isOpen ? "translate-x-0" : "-translate-x-full" // Your existing class logic
//           // } transition-transform duration-300 ease-in-out`} // Your existing class logic

//           // --- Recommended if using framer-motion for the main slide: ---
//           className="fixed top-20 left-0 w-full h-[calc(100dvh-80px)] bg-white dark:bg-background z-40 overflow-y-auto"
//           // --- End Recommended ---

//           aria-hidden={!isOpen}
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="flex flex-col justify-between h-full -mt-2">
//             {/* Top Navigation Links - Wrap the link container */}
//             <motion.div
//               className="p-4 space-y-2 border-t"
//               initial="hidden" // Initial variant state for the list
//               animate="visible" // Animate to visible when the component mounts (or isOpen becomes true)
//               variants={listVariants} // Apply the container variants
//             >
//               <div className="flex flex-col gap-1 w-full">
//                 {/* Wrap each link/item in motion.div and apply item variants */}
//                 <motion.div variants={itemVariants}>
//                   <Link
//                     href="/"
//                     className="inline-block py-2 rounded-md font-medium"
//                     onClick={handleLinkClick}
//                   >
//                     Home
//                   </Link>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <Link
//                     href="/about-us"
//                     className="inline-block py-2 rounded-md font-medium"
//                     onClick={handleLinkClick}
//                   >
//                     About
//                   </Link>
//                 </motion.div>

//                 {/* Mobile Feature Dropdown - Also wrap it */}
//                 <motion.div variants={itemVariants}>
//                   <FeatureDropdown
//                     buttonText="Features"
//                     links={navLinks}
//                     buttonClassName="inline-block w-full text-left py-2 font-medium rounded-md" // Consistent styling
//                     isMobile={true}
//                     isOpen={isFeaturesOpen}
//                     toggleDropdown={toggleFeaturesDropdown}
//                     onLinkClick={handleLinkClick} // Close main menu when a feature link is clicked
//                   />
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <Link
//                     href="/faqs"
//                     className="inline-block py-2 rounded-md font-medium"
//                     onClick={handleLinkClick}
//                   >
//                     Help
//                   </Link>
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* Bottom Auth Buttons (Dynamic) - You could animate these too if desired */}
//             <div className="p-4 border-t">
//               {/* Optional: Theme Toggle inside Mobile Menu */}
//               <div className="mb-4 flex justify-center">
//                 <ThemeToggle location="admin" />{" "}
//                 {/* Changed location example */}
//               </div>
//               <div className="flex flex-col sm:flex-row items-center gap-3">
//                 {/* === Dynamic Auth Links (Mobile) === */}
//                 {authLoading ? (
//                   // Display loading indicators for mobile
//                   <div className="flex flex-col sm:flex-row w-full gap-3">
//                     <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//                     <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//                   </div>
//                 ) : isLoggedIn ? (
//                   <>
//                     <Link
//                       href="/dashboard" // Adjust dashboard route if needed
//                       passHref
//                       className="inline-block w-full px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors"
//                       onClick={handleLinkClick} // Close menu on click
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={handleLogoutClick} // Use specific handler
//                       className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-secondary text-main dark:text-white rounded-full font-medium text-base text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       Log out
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       href="/auth/login"
//                       passHref
//                       className="inline-block w-full px-4 py-3 h-12.5 border dark:border-none bg-white dark:bg-secondary font-medium rounded-full text-base text-center dark:text-white text-mainheading hover:bg-gray-50 transition-colors"
//                       onClick={handleLinkClick}
//                     >
//                       Log in
//                     </Link>
//                     <Link
//                       href="/auth/register"
//                       passHref
//                       className="inline-block w-full px-4 py-3 h-12.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors duration-300 ease-in-out"
//                       onClick={handleLinkClick}
//                     >
//                       Register
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MobileMenu;

// // frontend/src/app/components/layout/MobileMenu.tsx
// /* Keep the MobileMenu.tsx code exactly as you provided it in the prompt */
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown";
// import ThemeToggle from "../../../contexts/ThemeToggle"; // Optional: If you want theme toggle here
// import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

// // --- Define the interface for props ---
// interface MobileMenuProps {
//   isOpen: boolean; // Reflects if the menu should be open (controlled from parent)
//   onClose: () => void; // Function to call when the menu needs to close
//   navLinks: { href: string; text: string }[]; // Array of feature links
//   topContent?: React.ReactNode; // Optional top content (not currently used in the provided code)
//   isLoggedIn: boolean; // Authentication status
//   onLogout: () => void; // Function to call for logout
//   authLoading: boolean;
// }

// // Variants for the container of the links to orchestrate staggering
// const listVariants = {
//   hidden: {
//     opacity: 0, // Can start hidden if you prefer a fade-in for the whole block
//     transition: {
//       when: "afterChildren", // Ensure children finish animating out before hiding container
//     },
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren", // Ensure container is ready before children animate in
//       staggerChildren: 0.08, // Stagger delay between each child (adjust as needed)
//     },
//   },
// };

// // Variants for each individual link item
// const itemVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50, // Start 30px to the left
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position
//     transition: {
//       type: "spring", // Optional: Use spring physics
//       stiffness: 200, // Optional: Adjust spring stiffness
//       damping: 15, // Optional: Adjust spring damping
//       // Or use a simple ease:
//       ease: "easeOut",
//       duration: 0.3
//     },
//   },
// };

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks,
//   topContent,
//   isLoggedIn,
//   onLogout,
//   authLoading,
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   // Handler that closes the main menu AND potentially the feature dropdown
//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false); // Ensure feature dropdown closes
//     onClose(); // Call the passed onClose function from Header
//   };

//   // Specific handler for logout to ensure both actions happen
//   const handleLogoutClick = () => {
//     onLogout(); // Call the logout function passed from Header
//     handleLinkClick(); // Close the menu
//   };

//   // No need to wrap the entire component in AnimatePresence here,
//   // as the parent component (Header) already handles the mounting/unmounting
//   // based on isMobileMenuOpen using AnimatePresence.

//   // We only need the motion.div if isOpen is true.
//   if (!isOpen) return null;

//   return (
//     // The parent's motion.div handles the main slide-in animation.
//     // This div is just the container for the content.
//     <div
//         className="flex flex-col justify-between h-full"
//         aria-hidden={!isOpen}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Top Navigation Links - Wrap the link container */}
//         <motion.div
//           className="px-4 space-y-2 overflow-y-auto border-t" // Removed border-t
//           initial="hidden" // Initial variant state for the list
//           animate="visible" // Animate to visible when the component mounts (or isOpen becomes true)
//           variants={listVariants} // Apply the container variants
//         >
//           <div className="flex flex-col gap-1 w-full">
//             {/* Wrap each link/item in motion.div and apply item variants */}
//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/"
//                 // CHANGED: inline-block -> block w-full
//                 className="block w-full py-2 rounded-md font-medium"
//                 onClick={handleLinkClick}
//               >
//                 Home
//               </Link>
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/about-us"
//                 // CHANGED: inline-block -> block w-full
//                 className="block w-full py-2 rounded-md font-medium"
//                 onClick={handleLinkClick}
//               >
//                 About
//               </Link>
//             </motion.div>

//             {/* Mobile Feature Dropdown - Also wrap it */}
//             <motion.div variants={itemVariants}>
//               <FeatureDropdown
//                 buttonText="Features"
//                 links={navLinks}
//                 // CHANGED: inline-block -> block w-full
//                 buttonClassName="block w-full text-left py-2 font-medium rounded-md" // Consistent styling
//                 isMobile={true}
//                 isOpen={isFeaturesOpen}
//                 toggleDropdown={toggleFeaturesDropdown}
//                 onLinkClick={handleLinkClick} // Close main menu when a feature link is clicked
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/faqs"
//                 // CHANGED: inline-block -> block w-full
//                 className="block w-full py-2 rounded-md font-medium"
//                 onClick={handleLinkClick}
//               >
//                 Help
//               </Link>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Bottom Auth Buttons (Dynamic) - You could animate these too if desired */}
//         <div className="p-4 border-t">
//           {/* Theme Toggle moved to Header for mobile */}
//           <div className="mb-4 flex justify-center">
//             <ThemeToggle location="admin" />
//           </div>
//           <div className="flex flex-col sm:flex-row items-center gap-3">
//             {/* === Dynamic Auth Links (Mobile) === */}
//             {authLoading ? (
//               // Display loading indicators for mobile
//               <div className="flex flex-col sm:flex-row w-full gap-3">
//                 <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//                 <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//               </div>
//             ) : isLoggedIn ? (
//               <>
//                 <Link
//                   href="/dashboard" // Adjust dashboard route if needed
//                   passHref
//                   className="inline-block w-full px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors"
//                   onClick={handleLinkClick} // Close menu on click
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogoutClick} // Use specific handler
//                   className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-secondary text-main dark:text-white rounded-full font-medium text-base text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   passHref
//                   className="inline-block w-full px-4 py-3 h-12.5 border dark:border-none bg-white dark:bg-secondary font-medium rounded-full text-base text-center dark:text-white text-mainheading hover:bg-gray-50 transition-colors"
//                   onClick={handleLinkClick}
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   href="/auth/register"
//                   passHref
//                   className="inline-block w-full px-4 py-3 h-12.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors duration-300 ease-in-out"
//                   onClick={handleLinkClick}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//   );
// };

// export default MobileMenu;

// // frontend/src/app/components/layout/MobileMenu.tsx
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Import usePathname
// import FeatureDropdown from "@/app/components/ui/FeatureDropdown";
// import ThemeToggle from "../../../contexts/ThemeToggle";
// import { motion } from "framer-motion";

// // --- Define the interface for props ---
// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: { href: string; text: string }[];
//   topContent?: React.ReactNode;
//   isLoggedIn: boolean;
//   onLogout: () => void;
//   authLoading: boolean;
// }

// // Variants for the container of the links to orchestrate staggering
// const listVariants = {
//   hidden: {
//     opacity: 0, // Can start hidden if you prefer a fade-in for the whole block
//     transition: {
//       when: "afterChildren", // Ensure children finish animating out before hiding container
//     },
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren", // Ensure container is ready before children animate in
//       staggerChildren: 0.08, // Stagger delay between each child (adjust as needed)
//     },
//   },
// };

// // Variants for each individual link item
// const itemVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50, // Start 30px to the left
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position
//     transition: {
//       type: "spring", // Optional: Use spring physics
//       stiffness: 200, // Optional: Adjust spring stiffness
//       damping: 15, // Optional: Adjust spring damping
//       // Or use a simple ease:
//       ease: "easeOut",
//       duration: 0.3
//     },
//   },
// };

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   onClose,
//   navLinks,
//   topContent,
//   isLoggedIn,
//   onLogout,
//   authLoading,
// }) => {
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const pathname = usePathname(); // Get the current pathname

//   const toggleFeaturesDropdown = () => {
//     setIsFeaturesOpen(!isFeaturesOpen);
//   };

//   const handleLinkClick = () => {
//     setIsFeaturesOpen(false);
//     onClose();
//   };

//   const handleLogoutClick = () => {
//     onLogout();
//     handleLinkClick();
//   };

//   // --- Define reusable class strings ---
//   const baseMobileLinkClasses =
//     "block w-full px-4 py-1.5 rounded-full font-medium transition-all duration-75 ease-linear"; // Base mobile link style
//   const inactiveMobileLinkClasses =
//     "text-mainheading dark:text-white dark:hover:text-primary hover:bg-lightgray hover:dark:bg-primarybox"; // Style for inactive links + hover
//   const activeMobileLinkClasses =
//     "bg-lightgray dark:bg-primarybox text-mainheading dark:text-primary"; // Style for active links

//   // --- Function to determine link classes for standard Mobile Menu Links ---
//   const getMobileLinkClasses = (href: string): string => {
//     let isActive = false;
//     const isRootPath = pathname === "/";

//     if (href === "/") {
//       isActive = isRootPath;
//     } else {
//       // Ensure pathname is not null or undefined before calling startsWith
//       // Also check that the href is not just "/" to avoid activating non-home links on the homepage
//       isActive = !!pathname && pathname !== "/" && pathname.startsWith(href);
//     }

//     return `${baseMobileLinkClasses} ${isActive ? activeMobileLinkClasses : inactiveMobileLinkClasses}`;
//   };
//   // --- End of function ---

//   // --- Determine if any feature link is currently active ---
//   const isAnyFeatureLinkActive = navLinks.some(link =>
//       !!pathname && pathname !== "/" && pathname.startsWith(link.href)
//   );

//   // --- Construct the classes for the Feature Dropdown button ---
//   const featureDropdownButtonClasses = `${baseMobileLinkClasses} ${isAnyFeatureLinkActive ? activeMobileLinkClasses : inactiveMobileLinkClasses} text-left`; // Add text-left explicitly

//   if (!isOpen) return null;

//   return (
//     <div
//       className="flex flex-col justify-between h-full"
//       aria-hidden={!isOpen}
//       role="dialog"
//       aria-modal="true"
//     >
//       {/* Top Navigation Links */}
//       <motion.div
//         className="p-4 space-y-2 border-t overflow-x-hidden overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3  sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox"
//         initial="hidden"
//         animate="visible"
//         variants={listVariants}
//       >
//         <div className="flex flex-col gap-2 w-full">
//           {/* Home Link */}
//           <motion.div variants={itemVariants}>
//             <Link
//               href="/"
//               className={getMobileLinkClasses("/")}
//               onClick={handleLinkClick}
//             >
//               Home
//             </Link>
//           </motion.div>

//           {/* About Link */}
//           <motion.div variants={itemVariants}>
//             <Link
//               href="/about-us"
//               className={getMobileLinkClasses("/about-us")}
//               onClick={handleLinkClick}
//             >
//               About
//             </Link>
//           </motion.div>

//           {/* Mobile Feature Dropdown */}
//           <motion.div variants={itemVariants}>
//             <FeatureDropdown
//               buttonText="Features"
//               links={navLinks}
//               // Apply the calculated classes based on feature link activity
//               buttonClassName={featureDropdownButtonClasses}
//               isMobile={true}
//               isOpen={isFeaturesOpen}
//               toggleDropdown={toggleFeaturesDropdown}
//               onLinkClick={handleLinkClick}
//               // Pass active status to potentially style the arrow differently if needed
//               isActive={isAnyFeatureLinkActive}
//             />
//           </motion.div>

//           {/* Reviews Link */}
//            <motion.div variants={itemVariants}>
//             <Link
//                 href="/reviews"
//                 className={getMobileLinkClasses("/reviews")}
//                 onClick={handleLinkClick}
//             >
//                 Reviews
//             </Link>
//           </motion.div>

//           {/* Help Link */}
//           <motion.div variants={itemVariants}>
//             <Link
//               href="/faqs"
//               className={getMobileLinkClasses("/faqs")}
//               onClick={handleLinkClick}
//             >
//               Help
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Bottom Auth Buttons & Theme Toggle */}
//       <div className="p-4 border-t">
//         <div className="mb-4 flex justify-center">
//            <ThemeToggle location="admin" /> {/* Changed location */}
//         </div>
//         <div className="flex flex-col sm:flex-row items-center gap-3">
//           {authLoading ? (
//             // Loading Skeleton
//             <div className="flex flex-col sm:flex-row w-full gap-3">
//               <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//               <div className="h-11 w-full bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
//             </div>
//           ) : isLoggedIn ? (
//             // Logged In Buttons
//             <>
//               <Link
//                 href="/dashboard"
//                 // Keep specific button styling for Dashboard as it's a primary action
//                 className="inline-block w-full px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors"
//                 onClick={handleLinkClick}
//               >
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogoutClick}
//                 className="inline-block w-full px-4 py-2.5 bg-gray-100 dark:bg-secondary text-main dark:text-white rounded-full font-medium text-base text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Log out
//               </button>
//             </>
//           ) : (
//             // Logged Out Buttons
//             <>
//               <Link
//                 href="/auth/login"
//                 passHref
//                 className="inline-block w-full px-4 py-3 h-12.5 border dark:border-gray-600 dark:border-none bg-white dark:bg-secondary font-medium rounded-full text-base text-center dark:text-white text-mainheading hover:bg-gray-50 transition-colors"
//                 onClick={handleLinkClick}
//               >
//                 Log in
//               </Link>
//               <Link
//                 href="/auth/register"
//                 passHref
//                 className="inline-block w-full px-4 py-3 h-12.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-center text-mainheading transition-colors duration-300 ease-in-out"
//                 onClick={handleLinkClick}
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

"use client";
import React from "react"; // Removed useState as isFeaturesOpen is no longer needed
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";

// --- Define the interface for props ---
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; text: string }[];
  isLoggedIn: boolean;
  onLogout: () => void;
  authLoading: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  isLoggedIn,
  onLogout,
  authLoading,
}) => {
  const pathname = usePathname();

  const handleLinkClick = () => {
    onClose(); // Close menu on any link click
  };

  const handleLogoutClick = () => {
    onLogout();
    handleLinkClick(); // Also close menu
  };

  const baseMobileLinkClasses =
    "block w-full text-left px-4 py-3 rounded-full font-medium text-lg transition-all duration-75 ease-linear"; // Increased py, rounded-lg, text-lg
  const inactiveMobileLinkClasses =
    "text-gray-300 hover:bg-background/30 hover:text-white"; // Adjusted colors for dark theme
  const activeMobileLinkClasses = "bg-primary text-mainheading"; // Adjusted active state

  const getMobileLinkClasses = (href: string): string => {
    let isActive = false;
    const isRootPath = pathname === "/";

    if (href === "/") {
      isActive = isRootPath;
    } else {
      isActive = !!pathname && pathname.startsWith(href) && href !== "/";
    }
    return `${baseMobileLinkClasses} ${
      isActive ? activeMobileLinkClasses : inactiveMobileLinkClasses
    }`;
  };

  // Prepare ordered links for the mobile menu
  const mobileNavLinksConfig = [
    ...navLinks.filter((link) =>
      ["/", "/about-us", "/features"].includes(link.href)
    ), // Home, About, Features
    { href: "/reviews", text: "Reviews" }, // Add Reviews link
    ...navLinks.filter((link) => link.href === "/faqs"), // Add Help link
  ];

  // Filter out any potential undefined items if navLinks prop is manipulated unexpectedly
  const finalMobileLinks = navLinks
    .map((link) => {
      if (link.href === "/features") {
        return [link, { href: "/reviews", text: "Reviews" }];
      }
      return link;
    })
    .flat()
    .filter(Boolean) as { href: string; text: string }[];

  // A more robust way to create the ordered list for the mobile menu:
  const orderedMobileLinks: { href: string; text: string }[] = [];
  const linksOrder = ["/", "/about-us", "/features", "/reviews", "/faqs"];
  const tempNavLinks = [...navLinks, { href: "/reviews", text: "Reviews" }]; // Combine and add reviews

  linksOrder.forEach((href) => {
    const link = tempNavLinks.find((l) => l.href === href);
    if (link) {
      orderedMobileLinks.push(link);
    }
  });

  if (!isOpen) return null;

  return (
    <div
      className="flex flex-col justify-between h-full mx-4 mb-4 bg-primary-foreground rounded-[35px] overflow-hidden"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="p-4 space-y-2.5 overflow-y-auto flex-grow"
      >
        {orderedMobileLinks.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              className={getMobileLinkClasses(link.href)}
              onClick={handleLinkClick}
            >
              {link.text}
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom Auth Buttons */}
      <div className="p-4 border-t border-gray-600/50">
        {/* ThemeToggle was here, now removed */}
        <div className="flex sm:flex-row items-center gap-3 pt-4">
          {authLoading ? (
            <div className="flex sm:flex-row w-full gap-3">
              <div className="h-12 w-full bg-gray-700/50 rounded-full animate-pulse"></div>
              <div className="h-12 w-full bg-gray-700/50 rounded-full animate-pulse"></div>
            </div>
          ) : !isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="inline-block w-[calc(100%-52px)] text-center px-4 py-2.5 bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-mainheading transition-all duration-75 ease-linear"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogoutClick}
                title="Logout"
                className="border border-gray-600 hover:border-gray-500 size-10 flex justify-center items-center rounded-full transition-all ease-linear duration-75 text-subheadingWhite hover:text-white cursor-pointer"
              >
                <HiOutlineLogout className="text-xl" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="inline-block w-full text-center px-4 py-2.5 border border-gray-600 hover:border-gray-500 rounded-full font-medium text-base text-subheadingWhite transition-all ease-linear duration-75"
                onClick={handleLinkClick}
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="inline-block w-full text-center px-4 py-2.5 border border-primary bg-primary hover:bg-primaryhover rounded-full font-medium text-base text-mainheading transition-all ease-linear duration-75"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
