// "use client"; // Required for useState and useEffect

// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// const FlagSection = () => {
//   // State to hold the rotation angle
//   const [rotation, setRotation] = useState(0);

//   useEffect(() => {
//     let animationFrameId: number | null = null;

//     const handleScroll = () => {
//       // Cancel the previous frame request if it exists
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }

//       // Request the next animation frame to update rotation smoothly
//       animationFrameId = requestAnimationFrame(() => {
//         const scrollY = window.scrollY;
//         // Adjust the multiplier (e.g., 0.1) to control the rotation speed
//         // Smaller number = slower rotation
//         const rotationSpeedFactor = 0.1;
//         setRotation(scrollY * rotationSpeedFactor);
//       });
//     };

//     // Add the scroll event listener
//     // Using { passive: true } for better scroll performance
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     // Cleanup function: remove the listener and cancel any pending frame when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

//   return (
//     // Add overflow-hidden here to contain the rotated image visually
//     <section className="Flag-section lg:py-10 py-5 relative overflow-hidden">
//       <div className="container mx-auto px-4 ">
//         {/* This negative margin might still cause layout issues depending
//             on the overall page structure. Consider adjusting if needed. */}
//         <div className="-ml-[500px] flex justify-start items-center"> {/* Added flex centering just in case */}
//           <Image
//             src='/assets/images/Flags.svg'
//             width={1000}
//             height={1000}
//             alt="flags"
//             priority // Consider adding priority if image is often visible early
//             // Apply the rotation dynamically using inline style
//             style={{
//               transform: `rotate(${rotation}deg)`,
//               transition: 'transform 0.1s linear', // Optional: smooth out slight jumps
//               willChange: 'transform', // Hint to the browser about the animation
//             }}
//           />

//           {/* Content */}
//           <div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlagSection;

// "use client"; // Required for useState and useEffect

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { FiCheckCircle } from "react-icons/fi"; // Using react-icons for checkmarks

// const FlagSection = () => {
//   // State to hold the rotation angle
//   const [rotation, setRotation] = useState(0);

//   useEffect(() => {
//     let animationFrameId: number | null = null;

//     const handleScroll = () => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//       animationFrameId = requestAnimationFrame(() => {
//         const scrollY = window.scrollY;
//         const rotationSpeedFactor = 0.08; // Slightly slower rotation
//         setRotation(scrollY * rotationSpeedFactor);
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   return (
//     // Added background color for contrast, adjust as needed
//     <section className="Flag-section lg:py-10 py-5 relative overflow-hidden bg-white dark:bg-background">
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Main Flex Container: Image on left (potentially offset), Content on right */}
//         <div className="flex flex-col lg:flex-row  gap-8">

//           {/* Image Container (adjust negative margin and width carefully) */}
//           {/* Reduced negative margin slightly */}
//           <div className="w-full lg:w-[80%] lg:-ml-[300px] xl:-ml-[500px] flex justify-center lg:justify-start mb-8 lg:mb-0">
//             <Image
//               src='/assets/images/Flags.svg'
//               width={1000} // Adjusted size slightly
//               height={1000}
//               alt="Rotating collage of international flags"
//               priority
//               style={{
//                 transform: `rotate(${rotation}deg)`,
//                 transition: 'transform 0.1s linear',
//                 willChange: 'transform',
//                 maxWidth: '100%', // Ensure image scales down if container is smaller
//                 height: 'auto',
//               }}
//             />
//           </div>

//           {/* Content Container */}
//           {/* Added padding to create space from the potentially overlapping image */}
//           <div className="xl:w-auto w-full lg:pl-8 xl:pl-0 space-y-4 text-center md:text-left lg:ml-10 ml-0">

//             {/* Small Title */}
//             <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//               <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//                 Trusted in 50+ Countries
//               </span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//             Send Money to Any<span className="text-primary"> Country, Instantly</span>

//             </h1>

//             {/* Description */}
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//               Reach family, friends, and businesses across borders. Our platform makes international money transfers fast, affordable, and hassle-free, ensuring your funds arrive safely where they're needed most.
//             </p>

//             {/* Some More Content (Key Benefits) */}
//             <div className="pt-5 space-y-4 text-left max-w-md mx-auto lg:mx-0">
//               {/* Benefit 1 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-semibold text-mainheading dark:text-white">Vast Network</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Transfer funds to over 160+ countries and multiple currencies.</p>
//                 </div>
//               </div>
//               {/* Benefit 2 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-semibold text-mainheading dark:text-white">Transparent Fees</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Know exactly what you pay with clear, upfront pricing and competitive rates.</p>
//                 </div>
//               </div>
//               {/* Benefit 3 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-semibold text-mainheading dark:text-white">Speedy Delivery</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Many transfers arrive within minutes or the same business day.</p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlagSection;

// "use client"; // Required for useState and useEffect

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { FiCheckCircle } from "react-icons/fi"; // Using react-icons for checkmarks

// const FlagSection = () => {
//   // State to hold the rotation angle
//   const [rotation, setRotation] = useState(0);

//   useEffect(() => {
//     let animationFrameId: number | null = null;

//     const handleScroll = () => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//       animationFrameId = requestAnimationFrame(() => {
//         const scrollY = window.scrollY;
//         const rotationSpeedFactor = 0.08; // Slightly slower rotation
//         setRotation(scrollY * rotationSpeedFactor);
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   return (
//     // Added background color for contrast, adjust as needed
//     <section className="Flag-section lg:py-10 py-5 relative overflow-hidden bg-white dark:bg-background">
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Main Flex Container: Image on left (potentially offset), Content on right */}
//         <div className="flex items-center gap-10">
//           {/* Image Container (adjust negative margin and width carefully) */}
//           {/* Reduced negative margin slightly */}
//           <div className="sm:w-full w-auto lg:-ml-[300px] xl:-ml-[500px] lg:block justify-center lg:justify-start mb-8 lg:mb-0 lg:relative absolute z-0 lg:left-0 -left-1/2 sm:top-0 top-1/6 hidden ">
//             <Image
//               src="/assets/images/Flags.svg" // Keep the general flags image as it represents global connectivity
//               width={1000} // Adjusted size slightly
//               height={1000}
//               alt="Rotating collage of international flags representing global money transfer"
//               priority
//               className="sm:w-auto w-full"
//               style={{
//                 transform: `rotate(${rotation}deg)`,
//                 transition: "transform 0.1s linear",
//                 willChange: "transform",
//                 maxWidth: "100%", // Ensure image scales down if container is smaller
//                 height: "auto",
//               }}
//             />
//           </div>

//           {/* Content Container */}
//           {/* Added padding to create space from the potentially overlapping image */}
//           <div className=" w-full relative z-10">
//             <div className="space-y-4 text-center md:text-left">
//               {/* Small Title */}
//               <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//                 <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//                   Seamless Transfers to India {/* <-- Updated Title */}
//                 </span>
//               </div>

//               {/* Main Heading */}
//               <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//                 Send Money <span className="text-primary">to INDIA</span>{" "}
//                 {/* <-- Kept as requested */}
//               </h1>

//               {/* Description */}
//               <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//                 {/* <-- Updated Description */}
//                 Easily send funds directly to bank accounts across India.
//                 Whether you're supporting family, paying for services, or
//                 investing back home, our platform ensures your money arrives
//                 quickly, safely, and affordably with competitive INR exchange
//                 rates.
//               </p>
//             </div>

//             {/* Some More Content (Key Benefits) */}
//             <div className="pt-8 space-y-6 text-left lg:max-w-2xl mx-auto lg:mx-0">
//               {/* Benefit 1 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 1 */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Extensive Reach Across India
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Transfer funds directly to major banks and financial
//                     institutions throughout India.
//                   </p>
//                 </div>
//               </div>
//               {/* Benefit 2 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 2 */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Competitive INR Rates
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Get great value with transparent fees and favorable exchange
//                     rates for Indian Rupees.
//                   </p>
//                 </div>
//               </div>
//               {/* Benefit 3 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 3 */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Fast Delivery Options
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Funds can often arrive in Indian bank accounts within
//                     minutes or hours.
//                   </p>
//                 </div>
//               </div>
//               {/* Benefit 4 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 4 (Kept relevant) */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Secure & Reliable
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Your transfers to India are protected using
//                     industry-standard security measures.
//                   </p>
//                 </div>
//               </div>
//               {/* Benefit 5 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 5 */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Track Your Transfer
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Monitor the progress of your money transfer to India in
//                     real-time.
//                   </p>
//                 </div>
//               </div>
//               {/* Benefit 6 */}
//               <div className="flex items-start gap-3">
//                 <FiCheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   {/* <-- Updated Benefit 6 */}
//                   <h4 className="font-semibold text-mainheading dark:text-white lg:text-2xl sm:text-xl text-lg ">
//                     Flexible Payout Methods
//                   </h4>
//                   <p className="text-gray-500 dark:text-gray-300 sm:text-lg text-base">
//                     Choose convenient options like direct bank deposit, UPI
//                     payments (if supported), or cash pickup at select locations
//                     in India.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* ----- END: Updated Content ----- */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlagSection;

// "use client"; // Required for useState and useEffect

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// // Import icons that represent the concepts
// import { FiZap, FiShield, FiTrendingUp, FiNavigation } from "react-icons/fi"; // Using react-icons

// const FlagSection = () => {
//   // State to hold the rotation angle
//   const [rotation, setRotation] = useState(0);

//   useEffect(() => {
//     let animationFrameId: number | null = null;

//     const handleScroll = () => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//       animationFrameId = requestAnimationFrame(() => {
//         const scrollY = window.scrollY;
//         const rotationSpeedFactor = 0.08; // Slightly slower rotation
//         setRotation(scrollY * rotationSpeedFactor);
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   // Define the benefit data (matches the original image content)
//   const benefits = [
//     {
//       icon: FiZap, // Represents Speed
//       title: "Lightning-Fast Transfers",
//       description:
//         "Send money to India in minutes. Our streamlined process ensures your funds arrive quickly when they're needed most.",
//     },
//     {
//       icon: FiShield, // Represents Security
//       title: "Safe & Secure Transactions",
//       description:
//         "Your security is our priority. We use bank-level encryption and security protocols to protect every transfer.",
//     },
//     {
//       icon: FiTrendingUp, // Represents Competitive Rates
//       title: "Competitive INR Rates",
//       description:
//         "Get more rupees for your money. We offer highly competitive exchange rates and transparent, low fees.",
//     },
//     {
//       icon: FiNavigation, // Represents Direct Deposit / Convenience
//       title: "Direct to Bank Accounts",
//       description:
//         "Funds are deposited directly into your recipient's bank account anywhere in India for ultimate convenience.",
//     },
//   ];

//   return (
//     <section className="Flag-section lg:py-10 py-5 relative overflow-hidden">
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Main Flex Container: Image on left (potentially offset), Content on right */}
//         {/* --- THIS PART REMAINS UNCHANGED --- */}
//         <div className="flex items-center gap-8">
//           {/* Image Container */}
//           <div className="sm:w-full w-auto lg:-ml-[300px] xl:-ml-[500px] lg:block justify-center lg:justify-start mb-8 lg:mb-0 lg:relative absolute z-0 lg:left-0 -left-1/2 sm:top-0 top-1/6 hidden ">
//             <Image
//               src="/assets/images/Flags.svg"
//               width={1000}
//               height={1000}
//               alt="Rotating collage of international flags representing global money transfer"
//               priority
//               className="sm:w-auto w-full"
//               style={{
//                 transform: `rotate(${rotation}deg)`,
//                 transition: "transform 0.1s linear",
//                 willChange: "transform",
//                 maxWidth: "100%",
//                 height: "auto",
//               }}
//             />
//           </div>

//           {/* Content Container */}
//           <div className="w-full relative z-10">
//              {/* --- THIS PART (TITLE, HEADING AND DESC) --- */}
//             <div className="space-y-4 text-center md:text-left pl-6">
//               <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//                 <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//                   Seamless Transfers to India
//                 </span>
//               </div>
//               <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//                 Send Money to <span className="text-primary"> INDIA With Wise</span>
//               </h1>
//               <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//                 Easily send funds directly to bank accounts across India.
//                 Whether you're supporting family, paying for services, or
//                 investing back home, our platform ensures your money arrives
//                 quickly, safely, and affordably with competitive INR exchange
//                 rates.
//               </p>
//             </div>
//              {/* ----- END: Unchanged Content ----- */}

//             {/* ----- START: New 2x2 Grid for Benefits ----- */}
//             <div className="pt-5 md:pt-10">
//               {/* Grid Container */}
//               <div className="grid grid-cols-1 md:grid-cols-2">

//                 {/* Benefit 1: Top Left */}
//                 <div className="sm:p-6 p-4 border-b md:border-r border-r-0">
//                   {(() => { // Use an IIFE or assign to variable outside
//                       const IconComponent = benefits[0].icon; // Assign to PascalCase variable
//                       return (
//                         <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center mb-4">
//                             <IconComponent size={24} className="lg:size-8 size-6 text-neutral-900 dark:text-primary" /> {/* Render the variable */}
//                         </div>
//                       );
//                   })()}
//                    {/* Title */}
//                    <h3 className="text-xl lg:text-xl font-bold mb-2 text-neutral-900 dark:text-white">
//                      {benefits[0].title}
//                    </h3>
//                    {/* Description */}
//                    <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
//                      {benefits[0].description}
//                    </p>
//                 </div>

//                 {/* Benefit 2: Top Right */}
//                 <div className="sm:p-6 p-4 border-b ">
//                   {(() => {
//                       const IconComponent = benefits[1].icon; // Assign to PascalCase variable
//                       return (
//                         <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center mb-4">
//                             <IconComponent size={24} className="lg:size-8 size-6 text-neutral-900 dark:text-primary" /> {/* Render the variable */}
//                         </div>
//                       );
//                   })()}
//                    {/* Title */}
//                    <h3 className="text-xl lg:text-xl font-bold mb-2 text-neutral-900 dark:text-white">
//                      {benefits[1].title}
//                    </h3>
//                    {/* Description */}
//                    <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
//                      {benefits[1].description}
//                    </p>
//                 </div>

//                 {/* Benefit 3: Bottom Left */}
//                 <div className="sm:p-6 p-4 md:border-r border-r-0 md:border-b-0 border-b">
//                    {(() => {
//                       const IconComponent = benefits[2].icon; // Assign to PascalCase variable
//                       return (
//                         <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center mb-4">
//                             <IconComponent size={24} className="lg:size-8 size-6 text-neutral-900 dark:text-primary" /> {/* Render the variable */}
//                         </div>
//                       );
//                    })()}
//                    {/* Title */}
//                    <h3 className="text-xl lg:text-xl font-bold mb-2 text-neutral-900 dark:text-white">
//                      {benefits[2].title}
//                    </h3>
//                    {/* Description */}
//                    <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
//                      {benefits[2].description}
//                    </p>
//                 </div>

//                 {/* Benefit 4: Bottom Right */}
//                 <div className="sm:p-6 p-4 md:border-b-0 border-b">
//                    {(() => {
//                       const IconComponent = benefits[3].icon; // Assign to PascalCase variable
//                       return (
//                         <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center mb-4">
//                             <IconComponent size={24} className="lg:size-8 size-6 text-neutral-900 dark:text-primary" /> {/* Render the variable */}
//                         </div>
//                       );
//                    })()}
//                    {/* Title */}
//                    <h3 className="text-xl lg:text-xl font-bold mb-2 text-neutral-900 dark:text-white">
//                      {benefits[3].title}
//                    </h3>
//                    {/* Description */}
//                    <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
//                      {benefits[3].description}
//                    </p>
//                 </div>
//               </div>
//             </div>
//             {/* ----- END: New 2x2 Grid for Benefits ----- */}

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FlagSection;

"use client"; // Required for useState, useEffect, and framer-motion

import Image from "next/image";
import React, { useState, useEffect } from "react";
// Import icons
import { FiZap, FiShield, FiTrendingUp, FiNavigation } from "react-icons/fi";
// Import framer-motion
import { motion, Variants } from "framer-motion";

// --- Animation Variants ---

// Container variant for staggering children (applied to main text and grid)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Adjust time between children animating
      delayChildren: 0.2, // Optional delay before first child starts
    },
  },
};

// Item variant for fade in + slight slide up (used for text and benefit cards)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, // Start invisible and slightly down
  visible: {
    opacity: 1,
    y: 0, // End at original position and fully visible
    transition: {
      duration: 0.4, // Slightly longer duration for a smoother feel
      ease: "easeOut"
    },
  },
};

// --- Component ---

const FlagSection = () => {
  // State and Effect for Flag Rotation (Kept Exactly As Is)
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    let animationFrameId: number | null = null;
    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const rotationSpeedFactor = 0.2;
        setRotation(scrollY * rotationSpeedFactor);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Benefit Data (Kept Exactly As Is)
  const benefits = [
    {
      icon: FiZap,
      title: "Lightning-Fast Transfers",
      description:
        "Send money to India in minutes. Our streamlined process ensures your funds arrive quickly when they're needed most.",
    },
    {
      icon: FiShield,
      title: "Safe & Secure Transactions",
      description:
        "Your security is our priority. We use bank-level encryption and security protocols to protect every transfer.",
    },
    {
      icon: FiTrendingUp,
      title: "Competitive INR Rates",
      description:
        "Get more rupees for your money. We offer highly competitive exchange rates and transparent, low fees.",
    },
    {
      icon: FiNavigation,
      title: "Direct to Bank Accounts",
      description:
        "Funds are deposited directly into your recipient's bank account anywhere in India for ultimate convenience.",
    },
  ];

  return (
    // Section Structure (Kept Exactly As Is)
    <section className="Flag-section lg:py-10 py-5 relative overflow-hidden bg-white dark:bg-background">
      {" "}
      {/* Added bg colors */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-8">
          {" "}
          {/* Main Flex Container */}
          {/* Image Container (Kept Exactly As Is, including rotation style) */}
          <div className="sm:w-full w-auto lg:-ml-[300px] xl:-ml-[500px] lg:block justify-center lg:justify-start mb-8 lg:mb-0 lg:relative absolute z-0 lg:left-0 -left-1/2 sm:top-0 top-1/6 hidden ">
            <Image
              src="/assets/images/Flags.svg"
              width={1000}
              height={1000}
              alt="Rotating collage of international flags representing global money transfer"
              priority
              className="sm:w-auto w-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.1s linear", // Kept original transition
                willChange: "transform",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          {/* Content Container - Applying Animations Here */}
          <div
            className="w-full relative z-10"
            // No outer motion wrapper needed here if we animate text block and grid separately
          >
            {/* Animated Title, Heading, Desc */}
            <motion.div // Animate the text block as one container
              className="space-y-4 text-center md:text-left pl-6"
              variants={containerVariants} // Stagger the children (badge, h1, p)
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
            >
              <motion.div
                variants={itemVariants}
                className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full"
              >
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Seamless Transfers to India
                </span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase"
              >
                Send Money to{" "}
                <span className="text-primary"> INDIA With Wise</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-500 dark:text-gray-300 lg:text-lg text-base"
              >
                Easily send funds directly to bank accounts across India.
                Whether you're supporting family, paying for services, or
                investing back home, our platform ensures your money arrives
                quickly, safely, and affordably with competitive INR exchange
                rates.
              </motion.p>
            </motion.div>
            {/* Benefits Grid Container - Animate this container */}
            <div className="pt-5 md:pt-10">
              <motion.div // Wrap the grid itself to orchestrate its children
                className="grid grid-cols-1 md:grid-cols-2"
                variants={containerVariants} // Use container variants to stagger the grid items
                initial="hidden"
                whileInView="visible" // Trigger animation when the grid scrolls into view
                viewport={{ once: true, amount: 0.2 }} // Trigger once, when 15% of the grid is visible
              >
                {/* Map through benefits, applying ONLY entrance animation */}
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  // Determine border classes based on index (Kept Exactly As Is)
                  const borderClasses = [
                    "sm:p-6 p-4 border-b md:border-r border-r-0 border-lightborder dark:border-primarybox", // Top-Left (added border color)
                    "sm:p-6 p-4 border-b border-lightborder dark:border-primarybox", // Top-Right (added border color)
                    "sm:p-6 p-4 md:border-r border-r-0 md:border-b-0 border-b border-lightborder dark:border-primarybox", // Bottom-Left (added border color)
                    "sm:p-6 p-4 md:border-b-0", // Bottom-Right (no border needed)
                  ][index];

                  return (
                    <motion.div // Wrap each benefit item
                      key={benefit.title}
                      className={borderClasses}
                      variants={itemVariants} // Apply the fade-in/slide-up animation
                      // No whileHover or hover variants needed
                    >
                      {/* Content remains the same */}
                      <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center mb-4">
                        <IconComponent
                          size={24}
                          className="lg:size-8 size-6 text-neutral-900 dark:text-primary"
                        />
                      </div>
                      <h3 className="text-xl lg:text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>{" "}
            {/* End pt-5 md:pt-10 */}
          </div>{" "}
          {/* End Content Container */}
        </div>{" "}
        {/* End Main Flex Container */}
      </div>{" "}
      {/* End container */}
    </section> // End section
  );
};

export default FlagSection;
