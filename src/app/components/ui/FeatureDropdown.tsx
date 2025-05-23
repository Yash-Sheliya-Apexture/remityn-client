// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../public/assets/icons/plane.webp"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content (now defined *inside* the component)
//   const dropdownContent = (
//     <div>
//         {/* Part One */}
//       <div className="p-8 flex flex-col justify-start bg-green/10">
//         <Image src={plane} alt="Plane" width={56} height={56} />
//         <div>
//           <p className="font-light text-gray">
//             Learn how millions of customers move their money globally
//           </p>
//         </div>
//       </div>

//         {/* Part Two */}
//       <div className="p-8 flex flex-col gap-4">
//         {/* Link 1 */}
//         <Link
//           href="/sendmoney"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setIsOpen(false); // Close dropdown on link click
//             onLinkClick?.(); // Call optional callback
//           }}
//         >
//           <p>Send money</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//         </Link>

//         {/* Link 2 */}
//         <Link
//           href="/sendlargeamount"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setIsOpen(false); // Close dropdown on link click
//              onLinkClick?.();
//           }}
//         >
//           <p>Send large amounts</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className={`px-2.5 py-1.5 rounded-full font-medium ${
//           buttonClassName || ""
//         }`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             variants={dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={`absolute right-0 top-15 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${
//               dropdownClassName || ""
//             }`}
//           >
//             {dropdownContent} {/* Use the defined content */}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// // components/FeatureDropdown/FeatureDropdown.tsx  (Slightly Modified)

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import plane from "../../../public/assets/icons/plane.webp"; // Adjust path as needed
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
//   isOpen?: boolean;        //  <---  Add isOpen prop
//   toggleDropdown?: () => void; //  <--- Add toggleDropdown prop
//   isMobile?: boolean;       //  <--- Add isMobile prop
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
//   isOpen = false, // Default to closed, controlled by parent if provided
//   toggleDropdown,  //  Use prop for toggling
//   isMobile = false, // Add a flag for mobile styling

// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false); // Internal state
//   const dropdownRef = useRef<HTMLDivElement>(null);
//     const myIsOpen = isMobile ? isOpen : internalIsOpen;
//     const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {  // Separate variants for mobile
//     open: {
//       opacity: 1,
//       height: "auto", // Important for mobile!
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,    //  Collapse height
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//         transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content
//   const dropdownContent = (
//     <div>
//       {/* Part One */}
//       <div className="p-8 flex flex-col justify-start bg-green/10">
//         <Image src={plane} alt="Plane" width={56} height={56} />
//         <div>
//           <p className="font-light text-gray">
//             Learn how millions of customers move their money globally
//           </p>
//         </div>
//       </div>

//       {/* Part Two */}
//       <div className="p-8 flex flex-col gap-4">
//         {/* Link 1 */}
//         <Link
//           href="/sendmoney"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setInternalIsOpen(false);
//             onLinkClick?.();
//           }}
//         >
//           <p>Send money</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-32"></span>
//         </Link>

//         {/* Link 2 */}
//         <Link
//           href="/sendlargeamount"
//           passHref
//           className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//           onClick={() => {
//             setInternalIsOpen(false);
//             onLinkClick?.();
//           }}
//         >
//           <p>Send large amounts</p>
//           <IoIosArrowForward
//             size={18}
//             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//           />
//           <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-44"></span>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}  // Use the correct toggle
//         className={`rounded-full font-medium ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//             <motion.div
//                 variants={isMobile ? mobileDropdownVariants : dropdownVariants} // Choose variants
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 className={isMobile ? `mt-2 pl-4` : `absolute right-0 top-13 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${dropdownClassName || ""}`}
//             >
//                 {dropdownContent}
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// components/FeatureDropdown/FeatureDropdown.tsx

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { IoIosArrowForward } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   onLinkClick?: () => void; // Optional callback for link clicks
//   isOpen?: boolean;        //  <---  Add isOpen prop
//   toggleDropdown?: () => void; //  <--- Add toggleDropdown prop
//   isMobile?: boolean;       //  <--- Add isMobile prop
//   links: { href: string; text: string }[]; // <--- Add links prop
//   topContent?: React.ReactNode;   // <---  Add Top Content
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   onLinkClick,
//   isOpen = false, // Default to closed, controlled by parent if provided
//   toggleDropdown,  //  Use prop for toggling
//   isMobile = false, // Add a flag for mobile styling
//   links,
//   topContent

// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false); // Internal state
//   const dropdownRef = useRef<HTMLDivElement>(null);
//     const myIsOpen = isMobile ? isOpen : internalIsOpen;
//     const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {  // Separate variants for mobile
//     open: {
//       opacity: 1,
//       height: "auto", // Important for mobile!
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,    //  Collapse height
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//         transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   // Dropdown Content
//     const dropdownContent = (
//         <div>
//             {/* Top Content (Optional) */}
//             {topContent && (
//                 <div className="p-8 flex flex-col justify-start bg-green/10">
//                     {topContent}
//                 </div>
//             )}

//             {/* Links */}
//             <div className="p-8 flex flex-col gap-4">
//                 {links.map((link, index) => (
//                     <Link
//                         key={index}
//                         href={link.href}
//                         passHref
//                         className="group relative inline-flex items-center gap-2 text-green font-medium cursor-pointer"
//                          onClick={() => {
//                             if (!isMobile) { //  <--- Close only on desktop
//                                 setInternalIsOpen(false);
//                             }
//                             onLinkClick?.();
//                         }}
//                     >
//                         <p>{link.text}</p>
//                         <IoIosArrowForward
//                             size={18}
//                             className="opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green transition-all duration-300 group-hover:w-full"></span> {/* Full width on hover */}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}  // Use the correct toggle
//         className={`rounded-full font-medium ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//             <motion.div
//                 variants={isMobile ? mobileDropdownVariants : dropdownVariants} // Choose variants
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 className={isMobile ? `mt-2 pl-4` : `absolute right-0 top-13 w-md bg-white rounded-xl overflow-hidden shadow-lg z-50 ${dropdownClassName || ""}`}
//             >
//                 {dropdownContent}
//             </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { IoIosArrowForward } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   linkClassName?: string;       //  <--- Add linkClassName
//   topContentClassName?: string; // <--- Add topContentClassName
//   onLinkClick?: () => void;
//   isOpen?: boolean;
//   toggleDropdown?: () => void;
//   isMobile?: boolean;
//   links: { href: string; text: string }[];
//   topContent?: React.ReactNode;
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   linkClassName, //  <---  Use linkClassName
//   topContentClassName, // <---  Use topContentClassName
//   onLinkClick,
//   isOpen = false,
//   toggleDropdown,
//   isMobile = false,
//   links,
//   topContent,
// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const myIsOpen = isMobile ? isOpen : internalIsOpen;
//   const myToggleDropdown = isMobile ? toggleDropdown : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {
//     open: {
//       opacity: 1,
//       height: "auto",
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//     const dropdownContent = (
//         <div >
//             {/* Top Content (Optional) */}
//             {topContent && (
//                 <div className={`p-8 flex flex-col rounded-t-2xl justify-start bg-lightgray dark:bg-background mt-2 ${topContentClassName || ""}`}>
//                     {topContent}
//                 </div>
//             )}

//             {/* Links */}
//             <div className="p-8 flex flex-col gap-4 dark:bg-background bg-white border-t">
//                 {links.map((link, index) => (
//                   <div className="w-fit">
//                     <Link
//                         key={index}
//                         href={link.href}
//                         passHref
//                         className={`group relative inline-flex items-center gap-2 text-primary dark:text-white font-medium cursor-pointer ${linkClassName || ""}`} // Apply linkClassName here
//                         onClick={() => {
//                             if (!isMobile) {
//                                 setInternalIsOpen(false);
//                             }
//                             onLinkClick?.();
//                         }}
//                     >
//                         <p>{link.text}</p>
//                         <IoIosArrowForward
//                             size={18}
//                             className="opacity-100 translate-x-0 transition-all duration-300  group-hover:translate-x-3"
//                         />
//                         <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
//                     </Link>
//                   </div>
//                 ))}
//             </div>
//         </div>
//     );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={myToggleDropdown}
//         className={`rounded-full font-medium  cursor-pointer px-2.5 py-1.5 hover:bg-lightgray dark:hover:bg-primarybox ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//           <motion.div
//             variants={isMobile ? mobileDropdownVariants : dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={
//               isMobile
//                 ? `mt-2 pl-4`
//                 : `absolute right-0 top-16 w-md bg-white dark:bg-background rounded-xl overflow-hidden shadow-lg z-50 ${
//                     dropdownClassName || ""
//                   }`
//             }
//           >
//             {dropdownContent}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;

// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { IoIosArrowForward } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   linkClassName?: string;
//   topContentClassName?: string;
//   onLinkClick?: () => void;
//   isOpen?: boolean;
//   toggleDropdown?: () => void;
//   isMobile?: boolean;
//   links: { href: string; text: string }[];
//   topContent?: React.ReactNode;
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   linkClassName,
//   topContentClassName,
//   onLinkClick,
//   isOpen = false,
//   toggleDropdown,
//   isMobile = false,
//   links,
//   topContent,
// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const myIsOpen = isMobile ? isOpen : internalIsOpen;
//   const myToggleDropdown = isMobile
//     ? toggleDropdown
//     : () => setInternalIsOpen(!internalIsOpen);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen]);

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const mobileDropdownVariants = {
//     open: {
//       opacity: 1,
//       height: "auto",
//       display: "block",
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//     },
//     closed: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         type: "tween",
//         duration: 0.2,
//       },
//       transitionEnd: {
//         display: "none",
//       },
//     },
//   };

//   const dropdownContent = (
//     <div className="block">
//       {/* Top Content (Optional) */}
//       {topContent && (
//         <div
//           className={`p-4 flex flex-col rounded-t-2xl justify-start bg-white dark:bg-background ${
//             topContentClassName || ""
//           }`}
//         >
//           {topContent}
//         </div>
//       )}

//       {/* Links */}
//       <div className="px-4 lg:py-6 flex flex-col gap-4 dark:bg-background bg-white">
//         {links.map((link, index) => (
//           <div key={index} className="w-fit">
//             <Link
//               href={link.href}
//               passHref
//               className={`group relative inline-flex items-center gap-1 text-sm text-mainheading dark:text-white font-medium cursor-pointer ${
//                 linkClassName || ""
//               }`}
//               onClick={() => {
//                 if (!isMobile) {
//                   setInternalIsOpen(false);
//                 }
//                 onLinkClick?.();
//               }}
//             >
//               <p>{link.text}</p>
//               <IoIosArrowForward
//                 size={18}
//                 className="opacity-100 size-4 translate-x-0 transition-all duration-300 group-hover:translate-x-3"
//               />
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-mainheading dark:bg-primary transition-all duration-300 group-hover:w-full"></span>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Feature Link */}
//       <button
//         onClick={myToggleDropdown}
//         className={`rounded-full font-medium cursor-pointer
//            text-mainheading dark:text-white ${buttonClassName || ""}`}
//       >
//         {buttonText}
//       </button>

//       <AnimatePresence>
//         {myIsOpen && (
//           <motion.div
//             variants={isMobile ? mobileDropdownVariants : dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className={
//               isMobile
//                 ? `mt-2 pl-4`
//                 : `absolute right-0 top-12 w-md bg-white border dark:bg-background rounded-xl overflow-hidden z-50 ${
//                     dropdownClassName || ""
//                   }`
//             }
//           >
//             {dropdownContent}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;



// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import {
//   IoIosArrowForward,
//   IoIosArrowDown,
//   IoIosArrowUp,
// } from "react-icons/io"; // Added Down/Up arrows
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   linkClassName?: string;
//   topContentClassName?: string;
//   onLinkClick?: () => void; // Callback when any link inside is clicked
//   // --- Mobile specific props ---
//   isMobile?: boolean;
//   isOpen?: boolean; // Controlled state for mobile
//   toggleDropdown?: () => void; // Function to toggle the controlled state
//   // --- Data ---
//   links: { href: string; text: string }[];
//   topContent?: React.ReactNode;
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   linkClassName,
//   topContentClassName,
//   onLinkClick,
//   isMobile = false,
//   isOpen = false, // Default to false if not provided
//   toggleDropdown, // Can be undefined for desktop
//   links,
//   topContent,
// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Determine which state and toggle function to use
//   const myIsOpen = isMobile ? isOpen : internalIsOpen;
//   const myToggleDropdown = isMobile
//     ? toggleDropdown
//     : () => setInternalIsOpen(!internalIsOpen);

//   // Handle closing dropdown on outside click (for desktop)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         !isMobile && // Only apply for desktop
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen && !isMobile) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen, isMobile]); // Add isMobile dependency

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: { type: "tween", duration: 0.2 },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: { type: "tween", duration: 0.2 },
//       transitionEnd: { display: "none" },
//     },
//   };

//   const mobileDropdownVariants = {
//     open: {
//       opacity: 1,
//       height: "auto", // Animate height
//       display: "block", // Ensure it's block for layout
//       marginTop: "8px", // Add some space when open
//       transition: { type: "tween", duration: 0.3, ease: "easeInOut" }, // Smoother animation
//     },
//     closed: {
//       opacity: 0,
//       height: 0, // Animate height to 0
//       marginTop: "0px",
//       transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
//       transitionEnd: { display: "none" }, // Hide completely after animation
//     },
//   };

//   const dropdownContent = (
//     <div className="block">
//       {/* Top Content (Optional) */}
//       {topContent && (
//         <div
//           className={`p-4 flex flex-col rounded-t-lg justify-start bg-white dark:bg-background ${
//             // Use neutral for background consistency
//             topContentClassName || ""
//           }`}
//         >
//           {topContent}
//         </div>
//       )}

//       {/* Links */}
//       <div
//         className={`flex flex-col gap-4 dark:bg-background bg-white ${
//           isMobile ? "pb-4" : "p-4"
//         }`}
//       >
//         {links.map((link, index) => (
//           <div key={index} className="w-fit">
//             <Link
//               href={link.href}
//               passHref
//               className={`group relative inline-flex items-center gap-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium cursor-pointer ${
//                 linkClassName || ""
//               }`}
//               onClick={() => {
//                 if (!isMobile) {
//                   setInternalIsOpen(false); // Close desktop dropdown on link click
//                 }
//                 onLinkClick?.(); // Call parent callback (e.g., close mobile menu)
//               }}
//             >
//               <p>{link.text}</p>
//               <IoIosArrowForward
//                 size={18} // Slightly smaller
//                 className="opacity-100 translate-x-0 transition-all duration-300 group-hover:translate-x-2" // Adjust hover effect
//               />
//               {/* Underline effect (optional) */}
//               <span className="absolute left-0 lg:-bottom-1 -bottom-0.5 w-0 h-[2px] bg-neutral-900 dark:bg-primary transition-all duration-300 group-hover:w-full"></span>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
//       <div className="flex items-center justify-between cursor-pointer" onClick={myToggleDropdown}>
//         <button
//           // onClick={myToggleDropdown}
//           // Added flex, items-center, gap-1 for icon alignment
//           className={`flex items-center gap-1 cursor-pointer rounded-full font-medium
//            text-neutral-900 transition-colors duration-200 dark:text-white hover:text-mainheading ${
//              isMobile ? "w-full" : ""
//            } ${buttonClassName || ""}`}
//         >
//           {buttonText}
//         </button>

//         {isMobile && ( // <-- Condition now wraps the entire div
//           <div className="pr-3">
//             {myIsOpen ? (
//               <IoIosArrowUp size={24} />
//             ) : (
//               <IoIosArrowDown size={24} />
//             )}
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {myIsOpen && (
//           <motion.div
//             // Key prop can help framer-motion differentiate elements if needed
//             key={buttonText}
//             variants={isMobile ? mobileDropdownVariants : dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             // Apply styles based on mobile/desktop
//             className={
//               isMobile
//                 ? `overflow-hidden pl-4 pt-1` // Mobile: relative positioning, controlled by parent layout, pl for indent
//                 : `absolute left-0 lg:right-auto top-14 w-64 border rounded-2xl overflow-hidden z-50 ${
//                     // Desktop: absolute, wider, specific positioning
//                     dropdownClassName || ""
//                   }`
//             }
//           >
//             {/* Render content only when needed, helps with animation */}
//             {dropdownContent}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;





// // components/FeatureDropdown/FeatureDropdown.tsx
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import {
//   IoIosArrowForward,
//   IoIosArrowDown,
//   IoIosArrowUp,
// } from "react-icons/io"; // Added Down/Up arrows
// import { motion, AnimatePresence } from "framer-motion";

// interface FeatureDropdownProps {
//   buttonText: string;
//   buttonClassName?: string;
//   dropdownClassName?: string;
//   linkClassName?: string;
//   topContentClassName?: string;
//   onLinkClick?: () => void; // Callback when any link inside is clicked
//   // --- Mobile specific props ---
//   isMobile?: boolean;
//   isOpen?: boolean; // Controlled state for mobile
//   toggleDropdown?: () => void; // Function to toggle the controlled state
//   // --- Data ---
//   links: { href: string; text: string }[];
//   topContent?: React.ReactNode;
//   isActive?: boolean;
// }

// const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
//   buttonText,
//   buttonClassName,
//   dropdownClassName,
//   linkClassName,
//   topContentClassName,
//   onLinkClick,
//   isMobile = false,
//   isOpen = false, // Default to false if not provided
//   toggleDropdown, // Can be undefined for desktop
//   links,
//   topContent,
// }) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Determine which state and toggle function to use
//   const myIsOpen = isMobile ? isOpen : internalIsOpen;
//   const myToggleDropdown = isMobile
//     ? toggleDropdown
//     : () => setInternalIsOpen(!internalIsOpen);

//   // Handle closing dropdown on outside click (for desktop)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         !isMobile && // Only apply for desktop
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setInternalIsOpen(false);
//       }
//     };

//     if (myIsOpen && !isMobile) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [myIsOpen, isMobile]); // Add isMobile dependency

//   const dropdownVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       display: "block",
//       transition: { type: "tween", duration: 0.2 },
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: { type: "tween", duration: 0.2 },
//       transitionEnd: { display: "none" },
//     },
//   };

//   const mobileDropdownVariants = {
//     open: {
//       opacity: 1,
//       height: "auto", // Animate height
//       display: "block", // Ensure it's block for layout
//       marginTop: "8px", // Add some space when open
//       transition: { type: "tween", duration: 0.3, ease: "easeInOut" }, // Smoother animation
//     },
//     closed: {
//       opacity: 0,
//       height: 0, // Animate height to 0
//       marginTop: "0px",
//       transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
//       transitionEnd: { display: "none" }, // Hide completely after animation
//     },
//   };

//   const dropdownContent = (
//     <div className="block">
//       {/* Top Content (Optional) */}
//       {topContent && (
//         <div
//           className={`p-4 flex flex-col rounded-t-lg justify-start bg-white dark:bg-background ${
//             // Use neutral for background consistency
//             topContentClassName || ""
//           }`}
//         >
//           {topContent}
//         </div>
//       )}

//       {/* Links */}
//       <div
//         className={`flex flex-col gap-4 dark:bg-background bg-white ${
//           isMobile ? "pb-4" : "p-4"
//         }`}
//       >
//         {links.map((link, index) => (
//           <div key={index} className="w-fit">
//             <Link
//               href={link.href}
//               passHref
//               className={`group relative inline-flex items-center gap-1 text-sm text-neutral-900 dark:text-white font-medium cursor-pointer ${
//                 linkClassName || ""
//               }`}
//               onClick={() => {
//                 if (!isMobile) {
//                   setInternalIsOpen(false); // Close desktop dropdown on link click
//                 }
//                 onLinkClick?.(); // Call parent callback (e.g., close mobile menu)
//               }}
//             >
//               <p>{link.text}</p>
//               <IoIosArrowForward
//                 size={18} // Slightly smaller
//                 className="opacity-100 translate-x-0 transition-all duration-300 group-hover:translate-x-2" // Adjust hover effect
//               />
//               {/* Underline effect (optional) */}
//               <span className="absolute left-0 lg:-bottom-1 -bottom-0.5 w-0 h-[2px] bg-neutral-900 dark:bg-primary transition-all duration-300 group-hover:w-full"></span>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
//       <div onClick={myToggleDropdown}>
//         <button
//           // Added flex, items-center, gap-1 for icon alignment
//           className={`flex items-center justify-between cursor-pointer ${
//             isMobile ? "w-full" : ""
//           } ${buttonClassName || ""}`}
//         >
//           {buttonText}

//           {isMobile && ( // <-- Condition now wraps the entire div
//             <div className="">
//               {myIsOpen ? (
//                 <IoIosArrowUp size={24} />
//               ) : (
//                 <IoIosArrowDown size={24} />
//               )}
//             </div>
//           )}
//         </button>
//       </div>

//       <AnimatePresence>
//         {myIsOpen && (
//           <motion.div
//             // Key prop can help framer-motion differentiate elements if needed
//             key={buttonText}
//             variants={isMobile ? mobileDropdownVariants : dropdownVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             // Apply styles based on mobile/desktop
//             className={
//               isMobile
//                 ? `overflow-hidden pl-8 pt-1` // Mobile: relative positioning, controlled by parent layout, pl for indent
//                 : `absolute left-0 lg:right-auto top-14 w-64 border rounded-2xl overflow-hidden z-50 ${
//                     // Desktop: absolute, wider, specific positioning
//                     dropdownClassName || ""
//                   }`
//             }
//           >
//             {/* Render content only when needed, helps with animation */}
//             {dropdownContent}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FeatureDropdown;


// frontend/src/app/components/ui/FeatureDropdown.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface FeatureDropdownProps {
  buttonText: string;
  buttonClassName?: string; // Base classes for the button, active state will be appended
  dropdownClassName?: string;
  linkClassName?: string;
  topContentClassName?: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  toggleDropdown?: () => void;
  links: { href: string; text: string }[];
  topContent?: React.ReactNode;
  isActive?: boolean; // <<<< ADDED THIS PROP for the button's active state
}

const FeatureDropdown: React.FC<FeatureDropdownProps> = ({
  buttonText,
  buttonClassName, // This will be the base class for the button
  dropdownClassName,
  linkClassName,
  topContentClassName,
  onLinkClick,
  isMobile = false,
  isOpen = false,
  toggleDropdown,
  links,
  topContent,
  isActive, // <<<< DESTRUCTURED THE PROP
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const myIsOpen = isMobile ? isOpen : internalIsOpen;
  const myToggleDropdown = isMobile
    ? toggleDropdown
    : () => setInternalIsOpen(!internalIsOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isMobile &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInternalIsOpen(false);
      }
    };
    if (myIsOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myIsOpen, isMobile]);

  const dropdownVariants = {
    open: { opacity: 1, y: 0, display: "block", transition: { type: "tween", duration: 0.2 } },
    closed: { opacity: 0, y: -10, transition: { type: "tween", duration: 0.2 }, transitionEnd: { display: "none" } },
  };

  const mobileDropdownVariants = {
    open: { opacity: 1, height: "auto", display: "block", marginTop: "8px", transition: { type: "tween", duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, height: 0, marginTop: "0px", transition: { type: "tween", duration: 0.3, ease: "easeInOut" }, transitionEnd: { display: "none" } },
  };

  const getLinkDropdownClasses = (href: string): string => {
    const base = `group relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer ${linkClassName || ""}`;
    const activeLinkColor = "text-primary"; // Active color for link text
    const inactiveLinkColor = "text-neutral-900 dark:text-white";
    const isLinkActive = pathname?.startsWith(href);
    return `${base} ${isLinkActive ? activeLinkColor : inactiveLinkColor}`;
  };
  
  const dropdownContent = (
    <div className="block">
      {topContent && (
        <div
          className={`p-4 flex flex-col rounded-t-lg justify-start bg-white dark:bg-background ${
            topContentClassName || ""
          }`}
        >
          {topContent}
        </div>
      )}
      <div
        className={`flex flex-col gap-4 dark:bg-background bg-white ${
          isMobile ? "pb-4" : "p-4"
        }`}
      >
        {links.map((link, index) => {
          const isLinkActive = pathname?.startsWith(link.href);
          return (
            <div key={index} className="w-fit">
              <Link
                href={link.href}
                passHref
                className={getLinkDropdownClasses(link.href)}
                onClick={() => {
                  if (!isMobile) {
                    setInternalIsOpen(false);
                  }
                  onLinkClick?.();
                }}
              >
                <p>{link.text}</p>
                <IoIosArrowForward
                  size={18}
                  className={cn(
                    "opacity-100 translate-x-0 transition-all duration-300 group-hover:translate-x-2",
                    isLinkActive && "text-primary dark:text-primary" 
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 lg:-bottom-1 -bottom-0.5 h-[2px] transition-all duration-300",
                    isLinkActive
                      ? "w-full bg-primary dark:bg-primary" 
                      : "w-0 group-hover:w-full bg-neutral-900 dark:bg-primary" 
                  )}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Combine the base buttonClassName with conditional active styles
  // The parent (Header or MobileMenu) will pass its calculated active/inactive classes as buttonClassName.
  // So, no need to recalculate active state for the button here if the parent handles it.
  // If the parent *doesn't* handle it, you would use the `isActive` prop here.
  // For now, assuming parent provides the full className including active state.

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button // Changed from div to button for better accessibility if it acts like one
        onClick={myToggleDropdown}
        className={`flex items-center justify-between cursor-pointer ${
          isMobile ? "w-full" : ""
        } ${buttonClassName || ""}`} // Use the passed buttonClassName directly
        aria-expanded={myIsOpen}
        aria-haspopup="true"
      >
        {buttonText}
        {isMobile && (
          <div>
            {myIsOpen ? (
              <IoIosArrowUp size={24} />
            ) : (
              <IoIosArrowDown size={24} />
            )}
          </div>
        )}
      </button>
      <AnimatePresence>
        {myIsOpen && (
          <motion.div
            key={buttonText}
            variants={isMobile ? mobileDropdownVariants : dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={
              isMobile
                ? `overflow-hidden pl-8 pt-1`
                : `absolute left-0 lg:right-auto top-14 w-64 border rounded-2xl overflow-hidden z-50 ${
                    dropdownClassName || ""
                  }`
            }
          >
            {dropdownContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureDropdown;