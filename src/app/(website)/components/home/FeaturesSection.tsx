// // src/app/(website)/components/home/FeaturesSection.tsx (Adjust path as needed)
// 'use client';

// import React, { useRef, useState, useLayoutEffect } from 'react';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue
// } from 'framer-motion';
// import ServiceCard from './FeaturesCard'; // Adjust path
// import { FeaturesData } from './FeaturesData'; // Adjust path to your servicesData file

// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null);
//   const cardsWrapperRef = useRef<HTMLDivElement>(null);

//   const [dynamicHeight, setDynamicHeight] = useState<string | number>('100vh'); // Default to screen height
//   const [targetXRange, setTargetXRange] = useState<[number, number]>([900, 900]); // [startX, endX]

//   useLayoutEffect(() => {
//     if (cardsContainerRef.current && cardsWrapperRef.current) {
//       const containerWidth = cardsContainerRef.current.offsetWidth;
//       const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;

//       const initialX = 600; // Your desired starting offset for the cards
//       const endPadding = 300; // Desired space from the right edge at the end of scroll

//       let calculatedTargetX: number;

//       if (wrapperScrollWidth <= containerWidth - endPadding) {
//         // Content (plus end padding) fits or is smaller than the container.
//         // It means even if scrolled fully left, there's still >= 300px space or it doesn't even reach that far.
//         // In this scenario, if initialX is 900, and content fits, it will just stay at 900.
//         // No "scroll" is needed to achieve the end state.
//         calculatedTargetX = initialX;
//       } else {
//         // Content overflows and needs to scroll.
//         // Target X should be such that: wrapperScrollWidth + targetX = containerWidth - endPadding
//         // So, targetX = containerWidth - wrapperScrollWidth - endPadding
//         calculatedTargetX = containerWidth - wrapperScrollWidth - endPadding;
//       }

//       // Ensure targetX is not greater than initialX (prevents scrolling "backwards" from the intended start)
//       // This implies we only want a right-to-left scroll from the initialX position.
//       const finalTargetX = Math.min(initialX, calculatedTargetX);

//       setTargetXRange([initialX, finalTargetX]);

//       // Calculate the actual distance the cards will animate horizontally
//       const scrollDistance = Math.abs(finalTargetX - initialX);

//       if (scrollDistance > 10) { // Only set dynamic height if there's significant scroll
//         // Adjust the multiplier (e.g., 1.5 or 2) for scroll "feel".
//         // Higher multiplier = more vertical scroll needed for the horizontal animation to complete.
//         setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
//       } else {
//         // If minimal or no scroll from initialX to finalTargetX, keep height at 100vh.
//         setDynamicHeight('100vh');
//       }
//     }
//   }, [FeaturesData]); // Rerun if servicesData changes

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"] // Animate as section scrolls through viewport
//   });

//   // 1. Transform scrollYProgress (0 to 1) to the raw target x value based on the calculated range
//   const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);

//   // 2. Apply a spring to the rawX value for very smooth animation
//   // You can tweak these spring parameters for different feels:
//   // stiffness: Higher = more springy, faster response
//   // damping: Higher = less oscillation, more controlled
//   // mass: Higher = heavier feel, slower to start/stop
//   const springConfig = { stiffness: 150, damping: 60, mass: 1, restDelta: 0.001 };
//   const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

//   return (
//     <section
//       ref={sectionRef}
//       className="text-white relative"
//       style={{ height: dynamicHeight }}
//     >
//       {/* Sticky container for the "pinned" view */}
//       <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
//         {/* Title Area */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">Security, Speed, <span className="text-primary"> Savings & Support</span></h3>
//           <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">At the heart of our service is a commitment to making your money transfers seamless, secure, and cost-effective. Whether you're sending funds internationally or managing cross-border transactions, we combine cutting-edge technology with expert support to ensure speed, transparency, and peace of mind.</p>
//         </div>

//         {/* Cards Scroll Viewport */}
//         <div
//           ref={cardsContainerRef}
//           className="w-full overflow-x-hidden text-left box-border flex-grow flex items-center"
//         >
//           {/* The horizontally scrolling element */}
//           <motion.div
//             ref={cardsWrapperRef}
//             className="inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border"
//             style={{ x: smoothX }} // Apply the smoothed, spring-animated x value
//           >
//             {FeaturesData.map((Features) => (
//               <ServiceCard
//                 key={Features.id}
//                 image={Features.image}
//                 title={Features.title}
//                 description={Features.description}
//                 id={Features.id}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

// // src/app/(website)/components/home/FeaturesSection.tsx
// "use client";

// import React, { useRef, useState, useLayoutEffect } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from "framer-motion";
// import ServiceCard from "./FeaturesCard"; // Adjust path
// // Import desired icons from react-icons
// import {
//   FaLock,
//   FaBolt,
//   FaHandHoldingUsd,
//   FaHeadset,
//   FaSyncAlt,
//   FaGlobeAmericas,
//   FaComments,
//   FaExchangeAlt, // For "Exchange Money Without Borders"
// } from "react-icons/fa";
// // You can choose any other icons from the library (e.g., FiShield from feather icons, etc.)

// // Updated Features interface
// export interface Features {
//   id: number;
//   icon: React.ElementType; // Changed from image: string
//   title: string;
//   description?: string;
// }

// // Updated FeaturesData
// export const FeaturesData: Features[] = [
//   {
//     id: 1,
//     icon: FaLock,
//     title: "Secure Every Step of the Way",
//     description:
//       "We prioritize your security with advanced encryption and fraud detection, keeping your money and data safe 24/7.",
//   },
//   {
//     id: 2,
//     icon: FaBolt,
//     title: "Our transfers are Speedy",
//     description:
//       "Receive your money swiftly, often within minutes, thanks to our optimized transfer network.",
//   },
//   {
//     id: 3,
//     icon: FaHandHoldingUsd,
//     title: "Save with high exchange rates",
//     description:
//       "Get the best value for your hard-earned money with our competitive, transparent exchange rates.",
//   },
//   {
//     id: 4,
//     icon: FaHeadset,
//     title: "Need Support ? We’re here!",
//     description:
//       "Our dedicated support team is available via chat, email, and phone to assist you anytime.",
//   },
//   {
//     id: 5,
//     icon: FaSyncAlt,
//     title: "Stay ahead with live exchange rates",
//     description:
//       "Stay updated with real-time currency exchange rates for informed decisions and maximum value.",
//   },
//   {
//     id: 6,
//     icon: FaGlobeAmericas,
//     title: "Worldwide Reach , Local Touch",
//     description:
//       "Our platform combines international reach with localized support for a seamless experience.",
//   },
//   {
//     id: 7,
//     icon: FaComments,
//     title: "24/7 Customer Support",
//     description:
//       "We re here for you—day or night—with reliable customer service whenever you need assistance.",
//   },
//   {
//     id: 8,
//     icon: FaExchangeAlt,
//     title: "Exchange Money Without Borders",
//     description:
//       "Seamless global money transfers made simple, connecting you financially across continents.",
//   },
// ];

// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null);
//   const cardsWrapperRef = useRef<HTMLDivElement>(null);

//   const [dynamicHeight, setDynamicHeight] = useState<string | number>("100vh");
//   const [targetXRange, setTargetXRange] = useState<[number, number]>([
//     900, 900,
//   ]);

//   useLayoutEffect(() => {
//     if (cardsContainerRef.current && cardsWrapperRef.current) {
//       const containerWidth = cardsContainerRef.current.offsetWidth;
//       const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;

//       const initialX =200;
//       const endPadding = 400;

//       let calculatedTargetX: number;

//       if (wrapperScrollWidth <= containerWidth - endPadding) {
//         calculatedTargetX = initialX;
//       } else {
//         calculatedTargetX = containerWidth - wrapperScrollWidth - endPadding;
//       }

//       const finalTargetX = Math.min(initialX, calculatedTargetX);

//       setTargetXRange([initialX, finalTargetX]);

//       const scrollDistance = Math.abs(finalTargetX - initialX);

//       if (scrollDistance > 10) {
//         setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
//       } else {
//         setDynamicHeight("100vh");
//       }
//     }
//   }, [FeaturesData]); // Rerun if FeaturesData changes (though its content doesn't usually change at runtime unless dynamic)

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);
//   const springConfig = {
//     stiffness: 150,
//     damping: 60,
//     mass: 1,
//     restDelta: 0.001,
//   };
//   const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

//   return (
//     <section
//       ref={sectionRef}
//       className="text-white relative"
//       style={{ height: dynamicHeight }}
//     >
//       <div className="sticky top-0 overflow-hidden flex flex-col  py-50">
//         {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">Security, Speed, <span className="text-primary"> Savings & Support</span></h3>
//           <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">At the heart of our service is a commitment to making your money transfers seamless, secure, and cost-effective. Whether you're sending funds internationally or managing cross-border transactions, we combine cutting-edge technology with expert support to ensure speed, transparency, and peace of mind.</p>
//         </div> */}

//         <div
//           ref={cardsContainerRef}
//           className="w-full overflow-x-hidden text-left box-border flex-grow flex items-center"
//         >
//           <motion.div
//             ref={cardsWrapperRef}
//             className="inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border"
//             style={{ x: smoothX }}
//           >
//             <div className="min-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
//               <div className="w-3xl">
//               <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                 Security, Speed,{" "}
//                 <span className="text-primary"> Savings & Support</span>
//               </h3>
//               <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">
//                 At the heart of our service is a commitment to making your money
//                 transfers seamless, secure, and cost-effective. Whether you're
//                 sending funds internationally or managing cross-border
//                 transactions, we combine cutting-edge technology with expert
//                 support to ensure speed, transparency, and peace of mind.
//               </p>
//               </div>
//             </div>
//             <div className="bg-[#394247] rounded-3xl p-[1px] inline-flex flex-row gap-1">
//             {FeaturesData.map(
//               (
//                 feature // Renamed 'Features' to 'feature' for clarity
//               ) => (
//                 <ServiceCard
//                   key={feature.id}
//                   id={feature.id}
//                   icon={feature.icon} // Pass icon component
//                   title={feature.title}
//                   description={feature.description}
//                 />
//               )
//             )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;


// // src/app/(website)/components/home/FeaturesSection.tsx
// "use client";

// import React, { useRef, useState, useLayoutEffect } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from "framer-motion";
// import ServiceCard from "./FeaturesCard"; // Adjust path
// // Import desired icons from react-icons
// import {
//   FaLock,
//   FaBolt,
//   FaHandHoldingUsd,
//   FaHeadset,
//   FaSyncAlt,
//   FaGlobeAmericas,
//   FaComments,
//   FaExchangeAlt,
// } from "react-icons/fa";

// // Updated Features interface
// export interface Features {
//   id: number;
//   icon: React.ElementType;
//   title: string;
//   description?: string;
// }

// // Updated FeaturesData
// export const FeaturesData: Features[] = [
//   {
//     id: 1,
//     icon: FaLock,
//     title: "Secure Every Step of the Way",
//     description:
//       "We prioritize your security with advanced encryption and fraud detection, keeping your money and data safe 24/7.",
//   },
//   {
//     id: 2,
//     icon: FaBolt,
//     title: "Our transfers are Speedy",
//     description:
//       "Receive your money swiftly, often within minutes, thanks to our optimized transfer network.",
//   },
//   {
//     id: 3,
//     icon: FaHandHoldingUsd,
//     title: "Save with high exchange rates",
//     description:
//       "Get the best value for your hard-earned money with our competitive, transparent exchange rates.",
//   },
//   {
//     id: 4,
//     icon: FaHeadset,
//     title: "Need Support ? We’re here!",
//     description:
//       "Our dedicated support team is available via chat, email, and phone to assist you anytime.",
//   },
//   {
//     id: 5,
//     icon: FaSyncAlt,
//     title: "Stay ahead with live exchange rates",
//     description:
//       "Stay updated with real-time currency exchange rates for informed decisions and maximum value.",
//   },
//   {
//     id: 6,
//     icon: FaGlobeAmericas,
//     title: "Worldwide Reach , Local Touch",
//     description:
//       "Our platform combines international reach with localized support for a seamless experience.",
//   },
//   {
//     id: 7,
//     icon: FaComments,
//     title: "24/7 Customer Support",
//     description:
//       "We re here for you—day or night—with reliable customer service whenever you need assistance.",
//   },
//   {
//     id: 8,
//     icon: FaExchangeAlt,
//     title: "Exchange Money Without Borders",
//     description:
//       "Seamless global money transfers made simple, connecting you financially across continents.",
//   },
// ];

// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null); // For large screens: the viewport for horizontal scroll
//   const cardsWrapperRef = useRef<HTMLDivElement>(null);   // For large screens: the horizontally scrolling content

//   // State to track if the screen width is >= 1024px
//   const [isLargeScreen, setIsLargeScreen] = useState(false); 
  
//   // Original offset for the start of the horizontal scroll animation
//   const initialHorizontalOffset = 200; 
//   const [dynamicHeight, setDynamicHeight] = useState<string | number>("auto"); // Default to 'auto' for non-animated (small screen) view
//   const [targetXRange, setTargetXRange] = useState<[number, number]>([0, 0]); // Default to no horizontal movement

//   // Effect to detect screen size
//   useLayoutEffect(() => {
//     const checkScreenSize = () => {
//       // Ensure window is defined (for SSR safety)
//       if (typeof window !== "undefined") {
//         setIsLargeScreen(window.innerWidth >= 1025);
//       }
//     };
//     checkScreenSize(); // Run on mount
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Effect to calculate dynamic height and horizontal scroll range for LARGE SCREENS
//   useLayoutEffect(() => {
//     if (isLargeScreen) {
//       // This logic is for the animated version (>= 1024px)
//       if (cardsContainerRef.current && cardsWrapperRef.current) {
//         const containerWidth = cardsContainerRef.current.offsetWidth;
//         const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;
//         const endPadding = 400; // As in your original calculation

//         let calculatedTargetXEnd: number;

//         if (wrapperScrollWidth <= containerWidth - endPadding) {
//           // If content is not wide enough to scroll meaningfully beyond its starting offset
//           calculatedTargetXEnd = initialHorizontalOffset;
//         } else {
//           // Content is wider, calculate how far left it needs to scroll
//           calculatedTargetXEnd = containerWidth - wrapperScrollWidth - endPadding;
//         }
        
//         // The final X position is the minimum of the start offset or the calculated end
//         const finalTargetX = Math.min(initialHorizontalOffset, calculatedTargetXEnd);
//         setTargetXRange([initialHorizontalOffset, finalTargetX]);

//         const scrollDistance = Math.abs(finalTargetX - initialHorizontalOffset);

//         if (scrollDistance > 10) { // Add extra height only if there's significant scroll
//           setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
//         } else {
//           // If not much to scroll, the sticky section takes 100vh
//           setDynamicHeight("100vh"); 
//         }
//       }
//     } else {
//       // For small screens (< 1024px), reset to non-animated state
//       setDynamicHeight("auto");
//       setTargetXRange([0, 0]); // No horizontal movement needed
//     }
//   }, [FeaturesData, isLargeScreen, initialHorizontalOffset]); // Rerun if these change

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     // Scroll offset for animation: active for large screens, neutral for small screens
//     offset: isLargeScreen ? ["start start", "end end"] : ["start start", "start start"], 
//   });

//   // Transform scroll progress to X position with spring physics
//   const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);
//   const springConfig = { stiffness: 150, damping: 60, mass: 1, restDelta: 0.001 };
//   const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

//   // Reusable component for the text block content
//   const TextBlockContent = () => (
//     <>
//       <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite ${!isLargeScreen ? "text-center md:text-left" : ""}`}>
//         Security, Speed,{" "}
//         <span className="text-primary"> Savings & Support</span>
//       </h3>
//       <p className={`text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full ${!isLargeScreen ? "text-center md:text-left" : ""}`}>
//         At the heart of our service is a commitment to making your money
//         transfers seamless, secure, and cost-effective. Whether you're
//         sending funds internationally or managing cross-border
//         transactions, we combine cutting-edge technology with expert
//         support to ensure speed, transparency, and peace of mind.
//       </p>
//     </>
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="text-white relative" // Relative for sticky child context
//       style={{ height: dynamicHeight }} // Dynamic height for large screens, 'auto' for small
//     >
//       {/* Outer wrapper: controls stickiness and overall padding */}
//       <div
//         className={`
//           ${isLargeScreen 
//             ? "sticky top-0 overflow-hidden flex flex-col h-screen py-10 lg:py-16" // Desktop: Sticky, full height, vertical padding
//             : "py-10 lg:py-16 container mx-auto px-4 sm:px-6" // Mobile: Normal flow, containerized with padding
//           }
//         `}
//       >
//         {/* Text Block: Rendered outside/above cards on small screens */}
//         {!isLargeScreen && (
//           <div className="mb-10 md:mb-16 max-w-3xl mx-auto"> {/* Centered text block */}
//             <TextBlockContent />
//           </div>
//         )}

//         {/* 
//           cardsContainerRef:
//           - Large Screens: This is the "viewport" for the horizontal scroll. Its width is measured.
//           - Small Screens: A simple wrapper; its ref isn't actively used for calculations here.
//         */}
//         <div
//           ref={cardsContainerRef}
//           className={`w-full text-left box-border ${
//             isLargeScreen 
//               ? "flex-grow flex items-center overflow-x-hidden" // For horizontal scroll layout
//               : "" // Normal block for small screen grid
//           }`}
//         >
//           {/* 
//             cardsWrapperRef (motion.div):
//             - Large Screens: Contains horizontally scrolling items (text + cards group).
//             - Small Screens: Contains cards in a grid.
//           */}
//           <motion.div
//             ref={cardsWrapperRef}
//             className={
//               isLargeScreen
//                 ? "inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border" // LG: Layout for horizontal scroll
//                 : "grid grid-cols-1 sm:grid-cols-2 gap-6" // SM: Grid layout for cards
//             }
//             style={{ x: isLargeScreen ? smoothX : 0 }} // Apply animated 'x' only on large screens
//           >
//             {/* Text Block: Included in horizontal scroll ONLY on large screens */}
//             {isLargeScreen && (
//               <div className="min-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 flex-shrink-0"> {/* Original styling for width and padding */}
//                 <div className="w-3xl"> {/* Inner div to control text width within the scroll item */}
//                   <TextBlockContent />
//                 </div>
//               </div>
//             )}

//             {/* Feature Cards */}
//             {isLargeScreen ? (
//               // Large Screens: Cards grouped for horizontal scroll, as per original design
//               <div className="bg-[#394247] rounded-3xl p-[1px] inline-flex flex-row gap-1 flex-shrink-0">
//                 {FeaturesData.map((feature) => (
//                   <ServiceCard
//                     key={feature.id}
//                     id={feature.id}
//                     icon={feature.icon}
//                     title={feature.title}
//                     description={feature.description}
//                   />
//                 ))}
//               </div>
//             ) : (
//               // Small Screens: Cards rendered directly into the grid
//               FeaturesData.map((feature) => (
//                 <ServiceCard
//                   key={feature.id}
//                   id={feature.id}
//                   icon={feature.icon}
//                   title={feature.title}
//                   description={feature.description}
//                 />
//               ))
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import ServiceCard from "./FeaturesCard"; // Adjust path if necessary, assuming it's correct
// Import desired icons from react-icons
import {
  FaLock,
  FaBolt,
  FaHandHoldingUsd,
  FaHeadset,
  FaSyncAlt,
  FaGlobeAmericas,
  FaComments,
  FaExchangeAlt,
} from "react-icons/fa";

// Updated Features interface
export interface Features {
  id: number;
  icon: React.ElementType;
  title: string;
  description?: string;
  iconBgColor: string; // Added icon background color
}

// Updated FeaturesData with iconBgColor
export const FeaturesData: Features[] = [
  {
    id: 1,
    icon: FaLock,
    title: "Secure Every Step of the Way",
    description:
      "We prioritize your security with advanced encryption and fraud detection, keeping your money and data safe 24/7.",
    iconBgColor: "#e3ffd1", // Card 1
  },
  {
    id: 2,
    icon: FaBolt,
    title: "Our transfers are Speedy",
    description:
      "Receive your money swiftly, often within minutes, thanks to our optimized transfer network.",
    iconBgColor: "#9bf7ff", // Card 2
  },
  {
    id: 3,
    icon: FaHandHoldingUsd,
    title: "Save with high exchange rates",
    description:
      "Get the best value for your hard-earned money with our competitive, transparent exchange rates.",
    iconBgColor: "#e2c9fb", // Card 3
  },
  {
    id: 4,
    icon: FaHeadset,
    title: "Need Support ? We’re here!",
    description:
      "Our dedicated support team is available via chat, email, and phone to assist you anytime.",
    iconBgColor: "#fbcdcd", // Card 4
  },
  {
    id: 5,
    icon: FaSyncAlt,
    title: "Stay ahead with live exchange rates",
    description:
      "Stay updated with real-time currency exchange rates for informed decisions and maximum value.",
    iconBgColor: "#fee09f", // Card 5 (matches default)
  },
  {
    id: 6,
    icon: FaGlobeAmericas,
    title: "Worldwide Reach , Local Touch",
    description:
      "Our platform combines international reach with localized support for a seamless experience.",
    iconBgColor: "#e3ffd1", // Card 6
  },
  {
    id: 7,
    icon: FaComments,
    title: "24/7 Customer Support",
    description:
      "We re here for you—day or night—with reliable customer service whenever you need assistance.",
    iconBgColor: "#9bf7ff", // Card 7
  },
  {
    id: 8,
    icon: FaExchangeAlt,
    title: "Exchange Money Without Borders",
    description:
      "Seamless global money transfers made simple, connecting you financially across continents.",
    iconBgColor: "#e2c9fb", // Card 8
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const initialHorizontalOffset = 200;
  const [dynamicHeight, setDynamicHeight] = useState<string | number>("auto");
  const [targetXRange, setTargetXRange] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsLargeScreen(window.innerWidth >= 1025);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useLayoutEffect(() => {
    if (isLargeScreen) {
      if (cardsContainerRef.current && cardsWrapperRef.current) {
        const containerWidth = cardsContainerRef.current.offsetWidth;
        const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;
        const endPadding = 400;

        let calculatedTargetXEnd: number;

        if (wrapperScrollWidth <= containerWidth - endPadding) {
          calculatedTargetXEnd = initialHorizontalOffset;
        } else {
          calculatedTargetXEnd = containerWidth - wrapperScrollWidth - endPadding;
        }
        
        const finalTargetX = Math.min(initialHorizontalOffset, calculatedTargetXEnd);
        setTargetXRange([initialHorizontalOffset, finalTargetX]);

        const scrollDistance = Math.abs(finalTargetX - initialHorizontalOffset);

        if (scrollDistance > 10) {
          setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
        } else {
          setDynamicHeight("100vh"); 
        }
      }
    } else {
      setDynamicHeight("auto");
      setTargetXRange([0, 0]);
    }
  }, [FeaturesData, isLargeScreen, initialHorizontalOffset]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isLargeScreen ? ["start start", "end end"] : ["start start", "start start"], 
  });

  const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);
  const springConfig = { stiffness: 150, damping: 60, mass: 1, restDelta: 0.001 };
  const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

  const TextBlockContent = () => (
    <>
      <h3 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite ${!isLargeScreen ? "md:text-left" : ""}`}>
        Security, Speed,{" "}
        <span className="text-primary"> Savings & Support</span>
      </h3>
      <p className={`text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full ${!isLargeScreen ? "md:text-left" : ""}`}>
        At the heart of our service is a commitment to making your money
        transfers seamless, secure, and cost-effective. Whether you're
        sending funds internationally or managing cross-border
        transactions, we combine cutting-edge technology with expert
        support to ensure speed, transparency, and peace of mind.
      </p>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="text-white relative"
      style={{ height: dynamicHeight }}
    >
      <div
        className={`
          ${isLargeScreen 
            ? "sticky top-0 overflow-hidden flex flex-col h-screen py-10 lg:py-16"
            : "py-10 lg:py-16 container mx-auto px-4"
          }
        `}
      >
        {!isLargeScreen && (
          <div className="mb-10 md:mb-16 xl:max-w-3xl mx-auto">
            <TextBlockContent />
          </div>
        )}

        <div
          ref={cardsContainerRef}
          className={`w-full text-left box-border ${
            isLargeScreen 
              ? "flex-grow flex items-center overflow-x-hidden"
              : ""
          }`}
        >
          <motion.div
            ref={cardsWrapperRef}
            className={
              isLargeScreen
                ? "inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border"
                : "grid grid-cols-1 sm:grid-cols-2 gap-[2] bg-[#394247] rounded-3xl p-[1px]"
            }
            style={{ x: isLargeScreen ? smoothX : 0 }}
          >
            {isLargeScreen && (
              <div className="min-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 flex-shrink-0">
                <div className="w-3xl">
                  <TextBlockContent />
                </div>
              </div>
            )}

            {isLargeScreen ? (
              <div className="bg-[#394247] rounded-3xl border-3 border-[#394247] inline-flex flex-row gap-[3] flex-shrink-0 h-full relative">
                {FeaturesData.map((feature) => (
                  <ServiceCard
                    key={feature.id}
                    id={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    iconBgColor={feature.iconBgColor} // Pass the prop here
                  />
                ))}
              </div>
            ) : (
              FeaturesData.map((feature) => (
                <ServiceCard
                  key={feature.id}
                  id={feature.id}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBgColor={feature.iconBgColor} // Pass the prop here
                />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;