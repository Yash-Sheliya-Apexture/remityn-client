// "use client";
// import React from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion } from "framer-motion";

// // --- Interface definitions (remain the same) ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentImage2?: string;
//   contentBlocks?: ContentBlock[];
// }

// // --- Data (internal to this component - remains the same) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];

// // --- Animation Durations (remain the same) ---
// const ANIMATION_DURATION_CONTENT = 0.6;
// const ANIMATION_DURATION_IMAGE = 0.7;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.4;

// // --- Animation Variants (remain the same) ---
// const leftContentVariants = {
//   initial: { opacity: 0, x: "-50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" },
//   },
// };

// const imageVariants = {
//   initial: { opacity: 0, y: "50%" },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: ANIMATION_DURATION_IMAGE, ease: "easeOut", delay: 0.1 },
//   },
// };

// const rightContentVariants = {
//   initial: { opacity: 0, x: "50%" },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut", delay: 0.1 },
//   },
// };

// const blockContainerVariants = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: ANIMATION_DURATION_CONTENT * 0.4,
//     },
//   },
// };

// const blockItemVariants = {
//   initial: { opacity: 0, x: 30 },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" },
//   },
// };

// // --- Helper function to get CSS classes (remain the same) ---
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success":
//       return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning":
//       return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry":
//       return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     case "default":
//     default:
//       return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// // Individual Card Component
// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <motion.div
//       className="flex flex-col h-[500px] md:h-[550px] lg:h-[600px] min-h-[500px] md:min-h-[550px] lg:min-h-[600px] border dark:border-none rounded-3xl bg-white dark:bg-primarybox sm:p-6 p-4 shadow-xl overflow-hidden"
//       initial="initial"
//       animate="animate"
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         {/* Left Side Content */}
//         <div className="lg:w-1/2 w-full flex flex-col">
//           <motion.div
//             className="space-y-2 mb-4 lg:mb-6"
//             variants={leftContentVariants}
//           >
//             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-white">
//               {step.contentTitle}
//             </h3>
//             <p className="text-gray-500 dark:text-gray-300 lg:text-base text-sm">
//               {step.contentSubtitle}
//             </p>
//           </motion.div>

//           <motion.div
//             className="relative flex-grow flex items-center justify-center mt-4"
//             variants={imageVariants}
//           >
//             <Image
//               src={step.contentImages.light}
//               alt={`${step.title} illustration (light)`}
//               width={600}
//               height={600}
//               style={{ maxHeight: "500px", maxWidth: "100%" }}
//               priority={isFirst}
//               className="object-contain block dark:hidden w-full"
//             />
//             <Image
//               src={step.contentImages.dark}
//               alt={`${step.title} illustration (dark)`}
//               width={600}
//               height={600}
//               style={{ maxHeight: "500px", maxWidth: "100%" }}
//               priority={isFirst}
//               className="object-contain hidden dark:block w-full"
//             />
//           </motion.div>
//         </div>

//         {/* Right Side Content */}
//         <motion.div
//           className="lg:w-1/2 w-full mdflex flex-col items-center lg:items-end justify-center lg:justify-start lg:pt-0 pt-10"
//           variants={rightContentVariants}
//         >
//           {step.contentBlocks && (
//             <motion.div
//               className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//               variants={blockContainerVariants}
//               initial="initial"
//               animate="animate"
//             >
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <motion.div
//                   key={blockIndex}
//                   className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
//                     block.type
//                   )}`}
//                   variants={blockItemVariants}
//                 >
//                   {block.text}
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };


// // Main StepCardContent component to display all cards in a grid
// const StepCardContent: React.FC = () => {
//   return (
//     <section className="StepCardContent py-20"> {/* Example section styling */}
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col gap-6 lg:gap-8">
//           {stepsData.map((step, index) => (
//             <IndividualStepCard key={step.id} step={step} isFirst={index === 0} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;



// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion } from "framer-motion"; // For internal card content animations
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // --- Interface definitions (remain the same) ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentBlocks?: ContentBlock[];
// }

// // --- Data (remain the same) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];


// // --- Framer Motion Animation Variants for *internal* card content (remain the same) ---
// const ANIMATION_DURATION_CONTENT = 0.5;
// const ANIMATION_DURATION_IMAGE = 0.6;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.3;
// const leftContentVariants = { initial: { opacity: 0, x: "-20px" }, animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" } } };
// const imageVariants = { initial: { opacity: 0, y: "20px" }, animate: { opacity: 1, y: "0px", transition: { duration: ANIMATION_DURATION_IMAGE, ease: "easeOut", delay: 0.1 } } };
// const rightContentVariants = { initial: { opacity: 0, x: "20px" }, animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut", delay: 0.1 } } };
// const blockContainerVariants = { initial: {}, animate: { transition: { staggerChildren: 0.1, delayChildren: ANIMATION_DURATION_CONTENT * 0.3 } } };
// const blockItemVariants = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0, transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" } } };
// const getBlockClasses = (type: ContentBlock["type"]) => { /* ... same as before ... */
//     switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   // This div is the visual card. GSAP will target it via the .gsap-step-card class
//   // inside its wrapper.
//   return (
//     <div className="gsap-step-card flex flex-col w-[90vw] max-w-4xl h-[70vh] max-h-[600px] border border-neutral-300 dark:border-neutral-700 rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl overflow-hidden">
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <motion.div className="space-y-3 mb-4 lg:mb-6" variants={leftContentVariants} initial="initial" animate="animate">
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">{step.contentTitle}</h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">{step.contentSubtitle}</p>
//           </motion.div>
//           <motion.div className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0" variants={imageVariants} initial="initial" animate="animate">
//             <Image src={step.contentImages.light} alt={`${step.title} illustration (light)`} width={450} height={450} style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }} priority={isFirst} className="block dark:hidden" />
//             <Image src={step.contentImages.dark} alt={`${step.title} illustration (dark)`} width={450} height={450} style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }} priority={isFirst} className="hidden dark:block" />
//           </motion.div>
//         </div>
//         <motion.div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6" variants={rightContentVariants} initial="initial" animate="animate">
//           {step.contentBlocks && (
//             <motion.div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto" variants={blockContainerVariants} initial="initial" animate="animate">
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <motion.div key={blockIndex} className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(block.type)}`} variants={blockItemVariants}>
//                   {block.text}
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const StepCardContent: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const cardsPinContainerRef = useRef<HTMLDivElement>(null); // This is the element that gets pinned

//   useEffect(() => {
//     if (!sectionRef.current || !cardsPinContainerRef.current) return;

//     // Query for the wrappers, not the cards directly, as GSAP will animate the wrappers/cards within them.
//     const cardWrappers = gsap.utils.toArray<HTMLDivElement>(".gsap-card-wrapper", cardsPinContainerRef.current);

//     if (cardWrappers.length === 0) {
//       console.warn("GSAP StepCardContent: No card wrappers found.");
//       return;
//     }

//     // Calculate total scroll height needed for the section
//     // Each card transition needs some scroll distance.
//     // (Number of transitions) * (scroll per transition) + (initial view for first card)
//     const scrollPerCardTransition = window.innerHeight * 0.8; // Adjust as needed
//     const totalScrollHeight = (cardWrappers.length -1) * scrollPerCardTransition + window.innerHeight;
//     gsap.set(sectionRef.current, { height: `${totalScrollHeight}px` });

//     // Master timeline for all card animations, controlled by the pinning ScrollTrigger
//     const masterTimeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom", // Pin for the entire calculated height of the section
//         pin: cardsPinContainerRef.current,
//         pinSpacing: false, // We've manually set section height
//         scrub: 1, // Smooth scrubbing
//         markers: process.env.NODE_ENV === "development" ? { startColor: "green", endColor: "red", indent: 0 } : false,
//         invalidateOnRefresh: true, // Recalculate on resize
//       }
//     });

//     // Set initial states for all cards
//     cardWrappers.forEach((wrapper, index) => {
//       const card = wrapper.querySelector<HTMLDivElement>(".gsap-step-card");
//       if (!card) return;

//       if (index === 0) {
//         // First card is visible and at full scale from the start
//         gsap.set(card, { autoAlpha: 1, scale: 1, yPercent: 0 });
//       } else {
//         // Subsequent cards start invisible, scaled down, and slightly offset
//         gsap.set(card, { autoAlpha: 0, scale: 0.8, yPercent: 15 });
//       }
//     });

//     // Add animations for each card transition to the masterTimeline
//     // Each transition (animating out the old, animating in the new) will happen sequentially.
//     for (let i = 0; i < cardWrappers.length - 1; i++) {
//       const currentCardWrapper = cardWrappers[i];
//       const nextCardWrapper = cardWrappers[i + 1];
//       const currentCard = currentCardWrapper.querySelector<HTMLDivElement>(".gsap-step-card");
//       const nextCard = nextCardWrapper.querySelector<HTMLDivElement>(".gsap-step-card");

//       if (!currentCard || !nextCard) continue;

//       // Add a segment to the master timeline for this transition
//       masterTimeline
//         // Animate OUT the current card
//         .to(currentCard, {
//           autoAlpha: 0,       // Fade out
//           scale: 0.8,         // Scale down
//           yPercent: -10,      // Move up slightly
//           ease: "power1.in",
//           duration: 0.35       // Duration relative to master timeline's scrub
//         }, i === 0 ? ">" : ">-=0.15") // Position in master timeline. ">" for after previous, "-=0.15" for overlap
//         // Animate IN the next card
//         .to(nextCard, {
//           autoAlpha: 1,
//           scale: 1,
//           yPercent: 0,
//           ease: "power2.out",
//           duration: 0.5
//         }, "-=0.2"); // Start slightly before the previous one finishes for smoother transition
//     }
//     // The last card will remain visible after its "IN" animation.

//     return () => {
//       // Kill the master timeline and its ScrollTrigger
//       if (masterTimeline.scrollTrigger) {
//         masterTimeline.scrollTrigger.kill();
//       }
//       masterTimeline.kill();

//       // Optional: More aggressive cleanup if other ST instances might be created by this component
//       ScrollTrigger.getAll().forEach(trigger => {
//         if (trigger.vars.trigger === sectionRef.current || trigger.vars.trigger === cardsPinContainerRef.current) {
//           trigger.kill();
//         }
//       });

//       // Clear inline styles set by GSAP
//       gsap.set(sectionRef.current, { clearProps: "height" });
//       cardWrappers.forEach(wrapper => {
//         const card = wrapper.querySelector<HTMLDivElement>(".gsap-step-card");
//         if (card) gsap.set(card, { clearProps: "autoAlpha,scale,yPercent,transform,opacity,visibility" });
//       });
//     };
//   }, []); // Empty dependency array, runs once on mount

//   return (
//     <section ref={sectionRef} className="StepCardContent-GSAP relative bg-neutral-100 dark:bg-black overflow-x-hidden">
//       {/* This container is pinned and holds the stacked cards */}
//       <div ref={cardsPinContainerRef} className="cards-sticky-container h-screen w-full flex items-center justify-center">
//         {/* Each card is wrapped for absolute positioning and z-index stacking */}
//         {stepsData.map((step, index) => (
//           <div
//             key={step.id}
//             className="gsap-card-wrapper absolute inset-0 flex items-center justify-center"
//             // Higher z-index for cards earlier in the array (top of the stack initially)
//             // The actual visibility and prominence is controlled by GSAP's autoAlpha.
//             style={{ zIndex: stepsData.length - index }}
//           >
//             <IndividualStepCard step={step} isFirst={index === 0} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;


// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion } from "framer-motion"; // For internal card content animations
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // --- Interface definitions ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentBlocks?: ContentBlock[];
// }

// // --- Data ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];


// // --- Framer Motion Animation Variants for *internal* card content ---
// const ANIMATION_DURATION_CONTENT = 0.5;
// const ANIMATION_DURATION_IMAGE = 0.6;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.3;

// const leftContentVariants = {
//   initial: { opacity: 0, x: "-20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" } },
// };
// const imageVariants = {
//   initial: { opacity: 0, y: "20px" },
//   animate: { opacity: 1, y: "0px", transition: { duration: ANIMATION_DURATION_IMAGE, ease: "easeOut", delay: 0.1 } },
// };
// const rightContentVariants = {
//   initial: { opacity: 0, x: "20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut", delay: 0.1 } },
// };
// const blockContainerVariants = {
//   initial: {},
//   animate: { transition: { staggerChildren: 0.1, delayChildren: ANIMATION_DURATION_CONTENT * 0.3 } },
// };
// const blockItemVariants = {
//   initial: { opacity: 0, x: 20 },
//   animate: { opacity: 1, x: 0, transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" } },
// };

// // --- Helper function to get CSS classes ---
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <div
//       className="gsap-step-card mx-auto flex flex-col w-[90vw] max-w-4xl min-h-[65vh] md:min-h-[70vh] max-h-[600px] border border-neutral-300 dark:border-neutral-700 rounded-3xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
//       // transform-origin is set by GSAP in useEffect
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <motion.div className="space-y-3 mb-4 lg:mb-6" variants={leftContentVariants} initial="initial" animate="animate">
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">{step.contentTitle}</h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">{step.contentSubtitle}</p>
//           </motion.div>
//           <motion.div className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0" variants={imageVariants} initial="initial" animate="animate">
//             <Image src={step.contentImages.light} alt={`${step.title} illustration (light)`} width={450} height={450} style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }} priority={isFirst} className="block dark:hidden" />
//             <Image src={step.contentImages.dark} alt={`${step.title} illustration (dark)`} width={450} height={450} style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }} priority={isFirst} className="hidden dark:block" />
//           </motion.div>
//         </div>
//         <motion.div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6" variants={rightContentVariants} initial="initial" animate="animate">
//           {step.contentBlocks && (
//             <motion.div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto" variants={blockContainerVariants} initial="initial" animate="animate">
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <motion.div key={blockIndex} className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(block.type)}`} variants={blockItemVariants}>
//                   {block.text}
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };


// const StepCardContent: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     // This ensures CSS is loaded before GSAP tries to read computed styles like 'top'
//     // A small delay can sometimes help in complex layouts or when CSS might take a moment.
//     // For production, you might rely on CSS being loaded or use window.onload if necessary.
//     const initGSAP = () => {
//       const cardWrappers = gsap.utils.toArray<HTMLDivElement>(".gsap-card-wrapper", sectionRef.current);
//       const cards = cardWrappers.map(wrapper => wrapper.querySelector<HTMLDivElement>(".gsap-step-card"));

//       if (cards.length === 0 || cards.some(c => !c)) {
//         console.warn("GSAP: Not all cards or wrappers found for sticky stack animation.");
//         return;
//       }

//       // Set transform-origin on all cards explicitly via GSAP
//       cards.forEach(card => {
//         if (card) gsap.set(card, { transformOrigin: "50% 0" }); // Top center
//       });

//       const timelines: gsap.core.Timeline[] = [];
//       const stickyTopValue = "6em"; // Define sticky top value

//       // Apply sticky CSS to wrappers via GSAP to ensure it's set
//       cardWrappers.forEach((wrapper, index) => {
//         gsap.set(wrapper, {
//           position: "sticky",
//           top: stickyTopValue,
//           zIndex: index + 1, // Ensure correct stacking
//         });
//       });

//       cards.forEach((currentCard, index) => {
//         if (!currentCard) return;

//         if (index < cards.length - 1) { // If there's a next card
//           const nextCardWrapper = cardWrappers[index + 1];

//           const tl = gsap.timeline({
//             scrollTrigger: {
//               trigger: nextCardWrapper,
//               start: "top bottom-=10%", // Start when next card is 10% from bottom of viewport
//               end: `top ${stickyTopValue}`,    // End when next card reaches its sticky top
//               scrub: 0.5,
//               invalidateOnRefresh: true,
//               markers: process.env.NODE_ENV === "development" ? {startColor: `hsl(${index*90}, 100%, 60%)`, endColor: "white", indent: index * 30} : false,
//             }
//           });

//           tl.to(currentCard, {
//             scale: 0.9,    // Scale down previous card
//             yPercent: -2,  // Optional: slight upward movement of scaled card
//             ease: "power1.inOut"
//           });
//           timelines.push(tl);
//         }
//       });

//       // Add padding at the bottom of the section to ensure the last card can fully "settle"
//       // and the user can scroll past it.
//       if (sectionRef.current) {
//         // Calculate a reasonable paddingBottom.
//         // It should be at least the height of a card plus the sticky offset.
//         const lastCardHeight = cards[cards.length - 1]?.offsetHeight || window.innerHeight * 0.7;
//         const topOffsetPx = parseFloat(getComputedStyle(document.documentElement).fontSize) * 6; // Approx 6em in px
//         sectionRef.current.style.paddingBottom = `${lastCardHeight + topOffsetPx + 100}px`; // 100px extra buffer
//       }


//       return () => {
//         timelines.forEach(tl => {
//           if (tl.scrollTrigger) tl.scrollTrigger.kill();
//           tl.kill();
//         });
//         ScrollTrigger.refresh(); // Refresh to clear out any state
//         cards.forEach(card => {
//           if (card) gsap.set(card, { clearProps: "transformOrigin,scale,yPercent,transform" });
//         });
//         cardWrappers.forEach(wrapper => {
//           gsap.set(wrapper, { clearProps: "position,top,zIndex" });
//         });
//         if (sectionRef.current) {
//           gsap.set(sectionRef.current, { clearProps: "paddingBottom" });
//         }
//       };
//     }

//     // Wait for the next animation frame to ensure layout is stable, or a small timeout
//     requestAnimationFrame(initGSAP);
//     // Alternatively, a small timeout:
//     // const timerId = setTimeout(initGSAP, 100);
//     // return () => clearTimeout(timerId); // Clear timeout if component unmounts

//   }, []); // Empty dependency array ensures this runs once on mount

//   return (
//     <section ref={sectionRef} className="StepCardContent-GSAP relative bg-neutral-100 dark:bg-black py-20 min-h-[200vh]"> {/* Ensure min-height for scroll */}
//       <div className="container mx-auto px-4">
//         <div className="relative"> {/* This div contains the card wrappers */}
//           {stepsData.map((step, index) => (
//             <div
//               key={step.id}
//               className="gsap-card-wrapper flex justify-center" // Added flex justify-center to center the card within the sticky wrapper
//               // The margin-bottom creates the scroll distance needed for each card's transition.
//               // No margin for the last card.
//               style={{
//                  marginBottom: index < stepsData.length - 1 ? "25vh" : "0", // Adjust this "overlap" space
//                  // zIndex is now set by GSAP for consistency
//               }}
//             >
//               <IndividualStepCard step={step} isFirst={index === 0} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;




// "use client";
// import React from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion } from "framer-motion";

// // --- Interface definitions ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentBlocks?: ContentBlock[];
// }

// // --- Data ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];


// // --- Framer Motion Animation Variants for *internal* card content ---
// const ANIMATION_DURATION_CONTENT = 0.5;
// const ANIMATION_DURATION_IMAGE = 0.6;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.3;

// const leftContentVariants = {
//   initial: { opacity: 0, x: "-20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" } },
// };
// const imageVariants = {
//   initial: { opacity: 0, y: "20px" },
//   animate: { opacity: 1, y: "0px", transition: { duration: ANIMATION_DURATION_IMAGE, ease: "easeOut", delay: 0.1 } },
// };
// const rightContentVariants = {
//   initial: { opacity: 0, x: "20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut", delay: 0.1 } },
// };
// const blockContainerVariants = {
//   initial: {},
//   animate: { transition: { staggerChildren: 0.1, delayChildren: ANIMATION_DURATION_CONTENT * 0.3 } },
// };
// const blockItemVariants = {
//   initial: { opacity: 0, x: 20 },
//   animate: { opacity: 1, x: 0, transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" } },
// };

// // --- Helper function to get CSS classes ---
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <>
//     <div
//       className="mx-auto w-[90vw] max-w-4xl
//                  min-h-[480px] md:min-h-[520px]
//                  max-h-[650px]
//                  border border-neutral-300 dark:border-neutral-700
//                  rounded-3xl bg-white dark:bg-neutral-900
//                  p-6 sm:p-8 shadow-2xl overflow-hidden"
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <motion.div
//             className="space-y-3 mb-4 lg:mb-6"
//             variants={leftContentVariants}
//             initial="initial"
//             animate="animate"
//           >
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">
//               {step.contentTitle}
//             </h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">
//               {step.contentSubtitle}
//             </p>
//           </motion.div>
//           <motion.div
//             className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0"
//             variants={imageVariants}
//             initial="initial"
//             animate="animate"
//           >
//             <Image
//               src={step.contentImages.light}
//               alt={`${step.title} illustration (light)`}
//               width={450}
//               height={450}
//               style={{
//                 maxHeight: "320px",
//                 objectFit: "contain",
//                 width: "auto",
//               }}
//               priority={isFirst}
//               className="block dark:hidden"
//             />
//             <Image
//               src={step.contentImages.dark}
//               alt={`${step.title} illustration (dark)`}
//               width={450}
//               height={450}
//               style={{
//                 maxHeight: "320px",
//                 objectFit: "contain",
//                 width: "auto",
//               }}
//               priority={isFirst}
//               className="hidden dark:block"
//             />
//           </motion.div>
//         </div>
//         <motion.div
//           className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6"
//           variants={rightContentVariants}
//           initial="initial"
//           animate="animate"
//         >
//           {step.contentBlocks && (
//             <motion.div
//               className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//               variants={blockContainerVariants}
//               initial="initial"
//               animate="animate"
//             >
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <motion.div
//                   key={blockIndex}
//                   className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
//                     block.type
//                   )}`}
//                   variants={blockItemVariants}
//                 >
//                   {block.text}
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//     <div className="sticky-card-overlay absolute inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-300"></div>
//     </>

//   );
// };


// const StepCardContent: React.FC = () => {
//   return (
//     <section className="relative bg-neutral-100 dark:bg-black py-20">
//       <div className="container mx-auto px-4">
//         <div className="relative flex flex-col gap-20">
//           {stepsData.map((step, index) => (
//             <div
//               key={step.id}
//               className="sticky-card sticky top-24 origin-top"
//             >
//               <IndividualStepCard step={step} isFirst={index === 0} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;


// // Proper Code 
// "use client";
// import React, { useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { motion, useScroll, useTransform, MotionStyle, MotionValue } from "framer-motion";

// // --- Interface definitions ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentBlocks?: ContentBlock[];
// }

// // --- Data ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];


// // --- Framer Motion Animation Variants for *internal* card content ---
// const ANIMATION_DURATION_CONTENT = 0.5;
// const ANIMATION_DURATION_IMAGE = 0.6;
// const ANIMATION_DURATION_BLOCK_ITEM = 0.3;

// const leftContentVariants = {
//   initial: { opacity: 0, x: "-20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut" } },
// };
// const imageVariants = {
//   initial: { opacity: 0, y: "20px" },
//   animate: { opacity: 1, y: "0px", transition: { duration: ANIMATION_DURATION_IMAGE, ease: "easeOut", delay: 0.1 } },
// };
// const rightContentVariants = {
//   initial: { opacity: 0, x: "20px" },
//   animate: { opacity: 1, x: "0px", transition: { duration: ANIMATION_DURATION_CONTENT, ease: "easeOut", delay: 0.1 } },
// };
// const blockContainerVariants = {
//   initial: {},
//   animate: { transition: { staggerChildren: 0.1, delayChildren: ANIMATION_DURATION_CONTENT * 0.3 } },
// };
// const blockItemVariants = {
//   initial: { opacity: 0, x: 20 },
//   animate: { opacity: 1, x: 0, transition: { duration: ANIMATION_DURATION_BLOCK_ITEM, ease: "easeOut" } },
// };

// // --- Helper function to get CSS classes ---
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <>
//     <div
//       className="mx-auto w-[90vw] max-w-4xl
//                  min-h-[480px] md:min-h-[520px]
//                  max-h-[650px]
//                  border border-neutral-300 dark:border-neutral-700
//                  rounded-3xl bg-white dark:bg-neutral-900
//                  p-6 sm:p-8 shadow-2xl overflow-hidden"
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <motion.div
//             className="space-y-3 mb-4 lg:mb-6"
//             variants={leftContentVariants}
//             initial="initial"
//             animate="animate" // This will trigger on mount
//             // If you want to trigger animation when card becomes "active" (e.g. in view or selected),
//             // you might need to change `animate` prop dynamically.
//             // For now, keeping it as is, which means content animates once on initial render.
//           >
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">
//               {step.contentTitle}
//             </h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">
//               {step.contentSubtitle}
//             </p>
//           </motion.div>
//           <motion.div
//             className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0"
//             variants={imageVariants}
//             initial="initial"
//             animate="animate"
//           >
//             <Image
//               src={step.contentImages.light}
//               alt={`${step.title} illustration (light)`}
//               width={450}
//               height={450}
//               style={{
//                 maxHeight: "320px",
//                 objectFit: "contain",
//                 width: "auto",
//               }}
//               priority={isFirst}
//               className="block dark:hidden"
//             />
//             <Image
//               src={step.contentImages.dark}
//               alt={`${step.title} illustration (dark)`}
//               width={450}
//               height={450}
//               style={{
//                 maxHeight: "320px",
//                 objectFit: "contain",
//                 width: "auto",
//               }}
//               priority={isFirst}
//               className="hidden dark:block"
//             />
//           </motion.div>
//         </div>
//         <motion.div
//           className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6"
//           variants={rightContentVariants}
//           initial="initial"
//           animate="animate"
//         >
//           {step.contentBlocks && (
//             <motion.div
//               className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto"
//               variants={blockContainerVariants}
//               initial="initial"
//               animate="animate"
//             >
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <motion.div
//                   key={blockIndex}
//                   className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
//                     block.type
//                   )}`}
//                   variants={blockItemVariants}
//                 >
//                   {block.text}
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//     {/* This overlay seems intended for individual card interactions, not the scroll-stacking. Kept as is. */}
//     <div className="sticky-card-overlay absolute inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-300"></div>
//     </>
//   );
// };

// // Constants for the sticky scroll animation
// const TARGET_SCALE = 0.92; // How much the card below scales down
// const TARGET_TRANSLATE_Y_PX = -40; // How much the card below translates up (in pixels)

// const StepCardContent: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress: overallScrollYProgress } = useScroll({
//     target: containerRef,
//     // offset: ["start start", "end end"], // For when entire container scrolls through viewport
//     // To make it more sensitive to early content, let's adjust:
//     // Start when top of container hits top of viewport
//     // End when top of container hits bottom of viewport (or a bit earlier to finish effect before container is fully scrolled past)
//     offset: ["start start", "end start"], // This means progress from 0 to 1 as the container's top scrolls from viewport top to viewport bottom. Adjust if needed.
//     // A common setup is "start start", "end end" if the container itself is scrollable.
//     // If window is scrollable: "start start" for container top @ viewport top,
//     // "end end" for container bottom @ viewport bottom.
//     // Let's use "start start" and "end end" assuming the container has enough height.
//     // offset: ["start start", "end end"],
//     // The choice of offset depends on when you want the animation to start and end relative to the container's visibility.
//     // For full stacking effect within the container's scroll, "start start" and "end end" is standard.
//     // If the container is very tall, "end start" might complete animations too early.
//     // Let's stick to a common one:
//     offset: ["start start", "end end"],
//   });

//   const numSteps = stepsData.length;
//   // numTransitions is the number of "gaps" between cards where a transition occurs.
//   // If numSteps is 1, numTransitions should be 1 to avoid division by zero and to make ranges work.
//   const numTransitions = numSteps > 1 ? numSteps - 1 : 1;


//   return (
//     <section className="relative bg-neutral-100 dark:bg-black py-20">
//       {/* The containerRef is on the direct parent of the sticky cards */}
//       <div ref={containerRef} className="container mx-auto px-4">
//         <div className="relative flex flex-col gap-20" style={{ minHeight: `${numSteps * 70}vh` /* Ensure enough scroll height */ }}>
//           {stepsData.map((step, index) => {
//             // For card `i` (index):
//             // It starts scaling/translating when overallScrollYProgress is at `index / numTransitions`
//             // It finishes scaling/translating when overallScrollYProgress is at `(index + 1) / numTransitions`
//             const currentCardTransformStart = index / numTransitions;
//             const currentCardTransformEnd = (index + 1) / numTransitions;

//             // It starts fading out when overallScrollYProgress is at `(index + 1) / numTransitions`
//             // It finishes fading out when overallScrollYProgress is at `(index + 1.5) / numTransitions` (fades over half a slot)
//             const currentCardFadeOutStart = (index + 1) / numTransitions;
//             const currentCardFadeOutEnd = (index + 1.5) / numTransitions; // Adjust for quicker/slower fade

//             let scale: MotionValue<number> | number = 1;
//             let translateY: MotionValue<number> | number = 0;
//             let opacity: MotionValue<number> | number = 1;

//             if (index < numSteps - 1) { // Not the last card, so it can be transformed
//               scale = useTransform(
//                 overallScrollYProgress,
//                 [currentCardTransformStart, currentCardTransformEnd],
//                 [1, TARGET_SCALE],
//                 { clamp: true }
//               );
//               translateY = useTransform(
//                 overallScrollYProgress,
//                 [currentCardTransformStart, currentCardTransformEnd],
//                 [0, TARGET_TRANSLATE_Y_PX],
//                 { clamp: true }
//               );
//             }

//             // Cards that are not the last two can fade out
//             // The last card (index === numSteps - 1) always opacity 1
//             // The second to last card (index === numSteps - 2) always opacity 1
//             if (index < numSteps - 2) {
//               opacity = useTransform(
//                 overallScrollYProgress,
//                 [currentCardFadeOutStart, currentCardFadeOutEnd],
//                 [1, 0],
//                 { clamp: true }
//               );
//             }
            
//             const cardStyle: MotionStyle = {
//               scale,
//               translateY,
//               opacity,
//               zIndex: index, // Card 0 at z=0, Card 1 at z=1, etc. Higher index on top.
//               // transformOrigin: "top", // Already applied by `origin-top` class
//               // Add will-change for performance, but use sparingly if many elements
//               // willChange: "transform, opacity",
//             };

//             return (
//               <motion.div
//                 key={step.id}
//                 className="sticky-card sticky top-24 origin-top" // top-24 is 6rem (96px if 1rem=16px)
//                 style={cardStyle}
//               >
//                 <IndividualStepCard step={step} isFirst={index === 0} />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;


// // Proper Code with GSAP Animation 
// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { IconType } from "react-icons";
// import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // --- Register GSAP Plugin ---
// gsap.registerPlugin(ScrollTrigger);

// // --- Interface definitions (same as before) ---
// interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   title: string;
//   subtitle: string;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     light: string;
//     dark: string;
//   };
//   contentBlocks?: ContentBlock[];
// }

// // --- Data (same as before) ---
// const stepsData: StepData[] = [
//   {
//     id: 0,
//     iconDefault: FaCheckCircle,
//     iconActive: FaCheckCircle,
//     title: "Register and verify",
//     subtitle: "Complete verification process",
//     contentTitle: "Register & Verify",
//     contentSubtitle: (
//       <>
//         Get started in minutes with a secure and simple sign-up process. We use
//         top-level identity verification to protect your account and ensure
//         compliance with international money transfer regulations.
//       </>
//     ),
//     contentImages: {
//       light: "/assets/images/Register-and-verify-light.png",
//       dark: "/assets/images/Register-and-verify-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Account Setup", type: "success" },
//       { text: "Seamless KYC Verification", type: "secondry" },
//       { text: "Enhanced Security with Passkeys", type: "warning" },
//     ],
//   },
//   {
//     id: 1,
//     iconDefault: FaWallet,
//     iconActive: FaWallet,
//     title: "Create a Digital Wallet",
//     subtitle: "Add transfer amount",
//     contentTitle: "Create Your Digital Wallet with Passkey",
//     contentSubtitle:
//       "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
//     contentImages: {
//       light: "/assets/images/Create-a-Digital-Wallet-light.png",
//       dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
//     },
//     contentBlocks: [
//       { text: "Passkeys: The Future of Security", type: "success" },
//       { text: "Defends Against Online Threats", type: "secondry" },
//       { text: "Peace of Mind, Always", type: "warning" },
//     ],
//   },
//   {
//     id: 2,
//     iconDefault: FaUserFriends,
//     iconActive: FaUserFriends,
//     title: "Add Recipients",
//     subtitle: "Who do we send to?",
//     contentTitle: "Add Recipients",
//     contentSubtitle:
//       "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
//     contentImages: {
//       light: "/assets/images/Add-Recipients-light.png",
//       dark: "/assets/images/Add-Recipients-dark.png",
//     },
//     contentBlocks: [
//       { text: "Multiple Recipient Support", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "Quick Add Feature", type: "warning" },
//     ],
//   },
//   {
//     id: 3,
//     iconDefault: FaMoneyBillTransfer,
//     iconActive: FaMoneyBillTransfer,
//     title: "Transfer Money",
//     subtitle: "Complete transfer process",
//     contentTitle: "Transfer Money Seamlessly",
//     contentSubtitle:
//       "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
//     contentImages: {
//       light: "/assets/images/Transfer-Money-light.png",
//       dark: "/assets/images/Transfer-Money-dark.png",
//     },
//     contentBlocks: [
//       { text: "Instant Transfers", type: "success" },
//       { text: "Secure Data Handling", type: "secondry" },
//       { text: "24/7 Secure Transactions", type: "warning" },
//     ],
//   },
// ];

// // --- Helper function to get CSS classes (same as before) ---
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
//   // No Framer Motion variants needed here for the card itself
// }

// // IndividualStepCard remains mostly the same structurally,
// // but without Framer Motion for its root if those animations were for stacking.
// // Internal content animations (if any, using Framer or other) can be kept separate.
// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <>
//     <div
//       className="mx-auto w-[90vw] max-w-4xl
//                  min-h-[480px] md:min-h-[520px]
//                  max-h-[650px]
//                  border border-neutral-300 dark:border-neutral-700
//                  rounded-3xl bg-white dark:bg-neutral-900
//                  p-6 sm:p-8 shadow-2xl overflow-hidden"
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <div className="space-y-3 mb-4 lg:mb-6">
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">
//               {step.contentTitle}
//             </h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">
//               {step.contentSubtitle}
//             </p>
//           </div>
//           <div className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0">
//             <Image
//               src={step.contentImages.light}
//               alt={`${step.title} illustration (light)`}
//               width={450}
//               height={450}
//               style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }}
//               priority={isFirst}
//               className="block dark:hidden"
//             />
//             <Image
//               src={step.contentImages.dark}
//               alt={`${step.title} illustration (dark)`}
//               width={450}
//               height={450}
//               style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }}
//               priority={isFirst}
//               className="hidden dark:block"
//             />
//           </div>
//         </div>
//         <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6">
//           {step.contentBlocks && (
//             <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <div
//                   key={blockIndex}
//                   className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(block.type)}`}
//                 >
//                   {block.text}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     <div className="sticky-card-overlay absolute inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-300"></div>
//     </>
//   );
// };

// // Constants for the sticky scroll animation
// const TARGET_SCALE = 0.92;
// const TARGET_TRANSLATE_Y_PX = -40; // GSAP uses 'y' for transform: translateY
// const STICKY_CARD_TOP_OFFSET_REM = 6; // from "top-24"

// const StepCardContent: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null); // Ref for the main section
//   const cardsContainerRef = useRef<HTMLDivElement>(null); // Ref for the direct container of cards (with minHeight)
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs for each card

//   const numSteps = stepsData.length;

//   useEffect(() => {
//     // Ensure refs are populated
//     cardRefs.current = cardRefs.current.slice(0, numSteps);
//     if (!sectionRef.current || !cardsContainerRef.current || cardRefs.current.length !== numSteps || cardRefs.current.some(ref => !ref)) {
//       // console.warn("GSAP setup: Refs not ready or mismatched.");
//       return;
//     }

//     const stickyOffsetPx = STICKY_CARD_TOP_OFFSET_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

//     const ctx = gsap.context(() => {
//       // Master timeline for all card animations
//       const masterTimeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current, // Entire section triggers the timeline
//           pin: false, // We are not pinning the section itself
//           scrub: 1,   // Smoothly link animation progress to scroll (1s smoothing)
//           start: "top top", // Timeline starts when top of section hits top of viewport
//           // End when the bottom of the section hits the bottom of the viewport.
//           // This requires the section to have enough height for all transitions.
//           // The `minHeight` on `cardsContainerRef` is crucial for this.
//           end: "bottom bottom",
//           // invalidateOnRefresh: true, // Good for responsive adjustments
//         },
//         defaults: { ease: "none", duration: 1 } // Default duration for segments in timeline
//       });

//       // Add animations to the master timeline
//       // The timeline's total duration will effectively be `numSteps - 1` "units"
//       // where each unit corresponds to one card transition.
//       cardRefs.current.forEach((cardEl, index) => {
//         if (!cardEl) return;

//         // Set initial zIndex for correct stacking order
//         gsap.set(cardEl, { zIndex: index });

//         // Scale and Translate animation for card[index]
//         // This happens as card[index+1] "takes over" card[index]
//         // Corresponds to the time slot `index` to `index+1` in the master timeline
//         if (index < numSteps - 1) { // Not the last card
//           masterTimeline.to(
//             cardEl,
//             {
//               scale: TARGET_SCALE,
//               y: TARGET_TRANSLATE_Y_PX,
//             },
//             index // Animation starts at time 'index' in the master timeline
//           );
//         }

//         // Opacity animation for card[index]
//         // This happens as card[index+2] "takes over" card[index+1] (card[index] is now two steps behind)
//         // Corresponds to the time slot `index+1` to `index+2` in the master timeline
//         if (index < numSteps - 2) { // Not the last two cards
//           masterTimeline.to(
//             cardEl,
//             {
//               opacity: 0,
//             },
//             index + 1 // Animation starts at time 'index+1' in the master timeline
//           );
//         }
//       });
//     }, sectionRef); // Scope GSAP context to the section for easier cleanup

//     return () => {
//       ctx.revert(); // Cleanup GSAP animations and ScrollTriggers on component unmount
//     };
//   }, [numSteps]); // Rerun effect if numSteps changes

//   return (
//     <section ref={sectionRef} className="relative bg-neutral-100 dark:bg-black py-20">
//       <div className="container mx-auto px-4">
//         {/* This div needs enough height for the scroll effect. minHeight is important. */}
//         <div
//           ref={cardsContainerRef}
//           className="relative flex flex-col gap-20"
          
//         >
//           {stepsData.map((step, index) => (
//             <div
//               key={step.id}
//               ref={el => { cardRefs.current[index] = el; }} // Assign ref to the array
//               className="sticky-card sticky top-24 origin-top"
//               // GSAP will set zIndex
//             >
//               <IndividualStepCard step={step} isFirst={index === 0} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepCardContent;



// src/app/StepCardContent.tsx (or your component's location)
"use client";
import React, { useEffect, useRef } from "react";
// Import IconType if it's not already in types.ts, or directly use from react-icons
import { IconType } from "react-icons";
import { FaCheckCircle, FaWallet, FaUserFriends } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Import shared types ---
import { StepData } from "../../../../types/step-data"; // Adjust path as needed

// --- Import the new component ---
import IndividualStepCard from "../StepCard/IndividualStepCard"; // Adjust path as needed

// --- Register GSAP Plugin ---
gsap.registerPlugin(ScrollTrigger);


// --- Data (remains here or could be moved to a separate data file) ---
const stepsData: StepData[] = [
  {
    id: 0,
    iconDefault: FaCheckCircle,
    iconActive: FaCheckCircle,
    title: "Register and verify",
    subtitle: "Complete verification process",
    contentTitle: "Register & Verify",
    contentSubtitle: (
      <>
        Get started in minutes with a secure and simple sign-up process. We use
        top-level identity verification to protect your account and ensure
        compliance with international money transfer regulations.
      </>
    ),
    contentImages: {
      light: "/assets/images/Register-and-verify-light.png",
      dark: "/assets/images/Register-and-verify-dark.png",
    },
    contentBlocks: [
      { text: "Instant Account Setup", type: "success" },
      { text: "Seamless KYC Verification", type: "secondry" },
      { text: "Enhanced Security with Passkeys", type: "warning" },
    ],
  },
  {
    id: 1,
    iconDefault: FaWallet,
    iconActive: FaWallet,
    title: "Create a Digital Wallet",
    subtitle: "Add transfer amount",
    contentTitle: "Create Your Digital Wallet with Passkey",
    contentSubtitle:
      "Set up your secure digital wallet in seconds. With integrated passkey protection, your funds and personal details are safeguarded from the start.",
    contentImages: {
      light: "/assets/images/Create-a-Digital-Wallet-light.png",
      dark: "/assets/images/Create-a-Digital-Wallet-dark.png",
    },
    contentBlocks: [
      { text: "Passkeys: The Future of Security", type: "success" },
      { text: "Defends Against Online Threats", type: "secondry" },
      { text: "Peace of Mind, Always", type: "warning" },
    ],
  },
  {
    id: 2,
    iconDefault: FaUserFriends,
    iconActive: FaUserFriends,
    title: "Add Recipients",
    subtitle: "Who do we send to?",
    contentTitle: "Add Recipients",
    contentSubtitle:
      "Easily link the bank accounts or digital wallets of the people you wish to send money to. Manage recipients securely and send funds with confidence.",
    contentImages: {
      light: "/assets/images/Add-Recipients-light.png",
      dark: "/assets/images/Add-Recipients-dark.png",
    },
    contentBlocks: [
      { text: "Multiple Recipient Support", type: "success" },
      { text: "Secure Data Handling", type: "secondry" },
      { text: "Quick Add Feature", type: "warning" },
    ],
  },
  {
    id: 3,
    iconDefault: FaMoneyBillTransfer,
    iconActive: FaMoneyBillTransfer,
    title: "Transfer Money",
    subtitle: "Complete transfer process",
    contentTitle: "Transfer Money Seamlessly",
    contentSubtitle:
      "Complete your money transfer in just a few taps. Enjoy real-time processing, transparent fees, and secure delivery to your recipients in India.",
    contentImages: {
      light: "/assets/images/Transfer-Money-light.png",
      dark: "/assets/images/Transfer-Money-dark.png",
    },
    contentBlocks: [
      { text: "Instant Transfers", type: "success" },
      { text: "Secure Data Handling", type: "secondry" },
      { text: "24/7 Secure Transactions", type: "warning" },
    ],
  },
];

// Constants for the sticky scroll animation
const TARGET_SCALE = 0.92;
const TARGET_TRANSLATE_Y_PX = -40; // GSAP uses 'y' for transform: translateY
const STICKY_CARD_TOP_OFFSET_REM = 6; // from "top-24"

const StepCardContent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const numSteps = stepsData.length;

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, numSteps);
    if (!sectionRef.current || !cardsContainerRef.current || cardRefs.current.length !== numSteps || cardRefs.current.some(ref => !ref)) {
      return;
    }

    // const stickyOffsetPx = STICKY_CARD_TOP_OFFSET_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const ctx = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: false,
          scrub: 1,
          start: "top top",
          end: "bottom bottom",
        },
        defaults: { ease: "none", duration: 1 }
      });

      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        gsap.set(cardEl, { zIndex: index });

        if (index < numSteps - 1) {
          masterTimeline.to(
            cardEl,
            {
              scale: TARGET_SCALE,
              y: TARGET_TRANSLATE_Y_PX,
            },
            index
          );
        }

        if (index < numSteps - 2) {
          masterTimeline.to(
            cardEl,
            {
              opacity: 0,
            },
            index + 1
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [numSteps]);

  return (
    <section ref={sectionRef} className="StePCardSection relative py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center ">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            4 easy steps to<span className="text-primary"> Transfer to India </span>
          </h3>
          <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl mx-auto">
            Transfer funds internationally to India with ease, speed, and
            security. We offer competitive exchange rates and a seamless
            experience for your INR remittances.
          </p>
        </div>
        <div
          ref={cardsContainerRef}
          className="relative flex flex-col gap-20 sm:mt-25 mt-16"
        >
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="sticky-card sticky top-24 origin-top"
            >
              {/* Use the imported component */}
              <IndividualStepCard 
                step={step} 
                isFirst={index === 0} 
                index={index} // <-- ADD THIS LINE
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepCardContent;