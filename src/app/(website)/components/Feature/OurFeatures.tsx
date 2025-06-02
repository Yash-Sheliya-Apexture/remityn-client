// import React from "react";

// import Image from "next/image";
// import { FaChartLine, FaHeadset } from "react-icons/fa6";
// import { FiGlobe } from "react-icons/fi";
// import { FaFastForward } from "react-icons/fa";

// const FeaturesSection: React.FC = () => {
//   return (
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4">
//       <section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//       >
//         {/* Heading Section */}
//         <div className="flex flex-col gap-5">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </div>

//         {/* Features Grid */}
//         <div className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8">
//           {/* Feature Card 1: Security (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security. Our advanced encryption and
//                 rigorous verification process protect your funds and personal
//                 information. Your peace of mind is our top priority.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 2: Speed (Small) */}
//           <div className="row-span-2 flex flex-col lg:gap-6 border dark:border-none shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly. Enjoy fast processing times and
//                 real-time tracking to know when your funds arrive.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 3: Support (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need{" "}
//                   <span className="text-primary font-bold">Support &nbsp;</span>
//                   ? We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available to answer all your
//                 questions and provide guidance throughout your transfer journey.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 4: Savings (Small) */}
//           <div className="row-span-2 flex flex-col lg:gap-6 border dark:border-none shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaChartLine className="lg:size-8 size-6 text-mainheading  dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money, so that more
//                 makes it back to your loved ones.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 5: Support (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live &nbsp;
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates. &nbsp;
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates. Track
//                 fluctuations and compare global currencies instantly to make
//                 informed financial decisions.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 6: Reach (Small) */}
//           <div className="row-span-2 flex flex-col border dark:border-none shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach with personalized
//                 service, making currency exchange feel just right—no matter
//                 where you are.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 7: Money (Large) */}
//           <div className="row-span-4 flex flex-col border dark:border-none shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5">
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={500}
//               alt="Picture of the author"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />

//             <div className="flex flex-col gap-3 p-4">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange &nbsp;
//                   <span className="text-primary font-bold capitalize">
//                     Money &nbsp;
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple. Instantly exchange
//                 currency across countries with transparent rates, no hidden
//                 fees, and total peace of mind.
//               </p>
//             </div>
//           </div>

//           {/* Feature Card 8: Reach (Small) */}
//           <div className="row-span-2 flex flex-col border dark:border-none shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-white/5 lg:p-6 p-4">
//             <FaHeadset className="lg:size-8 size-6 text-mainheading  dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night. Our dedicated support team is
//                 available 24/7 to assist with any questions, concerns, or
//                 issues, ensuring a smooth and stress-free currency exchange
//                 experience anytime, anywhere.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FeaturesSection;

// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // --- Animation Variants ---

// // Variants for the overall section container (to trigger animations)
// const sectionVariants = {
//   hidden: {}, // Container doesn't need its own visual animation
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the direct children (heading container, grid container)
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 }, // Start invisible and slightly above
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original position
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {}, // Grid container itself doesn't need visual animation
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Delay between each card animation starting
//       delayChildren: 0.2, // Start card animations slightly after heading appears
//     },
//   },
// };

// // Variants for each individual feature card
// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.9, y: 20 }, // Start invisible, slightly smaller, and down
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to original vertical position
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     // Add overflow-hidden to the main container if needed
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
//       {/* Wrap the section content with motion for triggering */}
//       <motion.section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }} // Trigger when 10% visible, animate every time
//       >
//         {/* Heading Section - Apply motion */}
//         <motion.div
//           className="flex flex-col gap-5"
//           variants={headingVariants} // Apply heading animation
//         >
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </motion.div>
//         {/* Features Grid - Apply motion container for staggering */}
//         <motion.div
//           className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
//           variants={gridContainerVariants} // Apply grid container variants for staggering
//         >
//           {/* Feature Card 1: Security (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-white/5" // Adjusted dark bg/border
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={384} // Adjust height based on aspect ratio if known
//               alt="Secure padlock illustration"
//               className="w-full object-cover lg:h-96 md:h-60 h-42" // h-42 seems small, maybe h-48?
//               priority // If above the fold
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               {" "}
//               {/* Added lg:p-6 */}
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security. Our advanced encryption and
//                 rigorous verification process protect your funds and personal
//                 information. Your peace of mind is our top priority.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 2: Speed (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly. Enjoy fast processing times and
//                 real-time tracking to know when your funds arrive.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 3: Support (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={384}
//               alt="Friendly customer support agent"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need <span className="text-primary font-bold">Support </span>?
//                   We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available to answer all your
//                 questions and provide guidance throughout your transfer journey.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 4: Savings (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money, so that more
//                 makes it back to your loved ones.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 5: Rates (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={384}
//               alt="Graph showing dynamic exchange rates"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates. Track
//                 fluctuations and compare global currencies instantly to make
//                 informed financial decisions.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 6: Reach (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col border dark:border-neutral-700/50 shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach with personalized
//                 service, making currency exchange feel just right—no matter
//                 where you are.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 7: Money (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply card animation
//           >
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={384}
//               alt="Illustration of money exchange without borders"
//               className="w-full object-cover lg:h-96 md:h-60 h-42"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange
//                   <span className="text-primary font-bold capitalize">
//                     Money
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple. Instantly exchange
//                 currency across countries with transparent rates, no hidden
//                 fees, and total peace of mind.
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 8: 24/7 Support (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col border dark:border-neutral-700/50 shadow-sm lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply card animation
//           >
//             <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night. Our dedicated support team is
//                 available 24/7 to assist with any questions, concerns, or
//                 issues, ensuring a smooth and stress-free currency exchange
//                 experience anytime, anywhere.
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>{" "}
//       </motion.section>
//     </div>
//   );
// };

// export default FeaturesSection; // Ensure export name matches component name

// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // Variants for the overall section container
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Increase stagger slightly for flip effect
//       delayChildren: 0.2,
//     },
//   },
// };

// // NEW Variants for each individual feature card (3D Flip)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     rotateY: -90, // Start rotated 90 degrees back on Y-axis
//     scale: 0.9, // Start slightly smaller
//     transformOrigin: "center left", // Rotate from the left edge (adjust if needed)
//   },
//   visible: {
//     opacity: 1,
//     rotateY: 0, // Animate to normal rotation
//     scale: 1, // Animate to full size
//     transition: {
//       duration: 0.6, // Give the flip some time
//       ease : "easeOut"
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     <div className="bg-white lg:py-10 py-5 dark:bg-background px-4 overflow-hidden">
//       {/* Wrap the section content with motion for triggering */}
//       <motion.section
//         className="flex flex-col lg:gap-10 gap-8 container mx-auto"
//         id="features"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: false }}
//       >
//         {/* Heading Section - Apply motion */}
//         <motion.div className="flex flex-col gap-5" variants={headingVariants}>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Security, Speed,
//             <span className="text-primary"> Savings & Support </span>
//           </h1>
//         </motion.div>
//         {/* Features Grid - Apply motion container for staggering */}
//         <motion.div
//           className="grid gap-y-4 gap-x-4 md:grid-cols-2 md:grid-rows-6 lg:gap-x-8 lg:gap-y-8"
//           variants={gridContainerVariants}
//         >
//           {/* --- Apply motion to EACH feature card --- */}

//           {/* Feature Card 1: Security (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/colorful-illustration-colorful-padlock-with-colorful-leaves-flowers_1122354-15513.jpg"
//               width={500}
//               height={384}
//               alt="Secure padlock illustration"
//               className="w-full object-cover lg:h-96 md:h-60 h-48" // Increased min height slightly
//               priority
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span className="text-primary font-bold">Secure</span> Every
//                 Step of the Way
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We prioritize your security...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 2: Speed (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4" // Added justify-center
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaFastForward className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Our transfers are{" "}
//                   <span className="text-primary font-bold">Speedy</span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Receive your money swiftly...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 3: Support (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/friendly-customer.jpg"
//               width={500}
//               height={384}
//               alt="Friendly customer support agent"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Need <span className="text-primary font-bold">Support </span>?
//                   We’re here!
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our dedicated support team is available...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 4: Savings (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaChartLine className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">Save</span> with high
//                   exchange rates
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Get the best value for your hard-earned money...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 5: Rates (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/dynamicRate.png"
//               width={500}
//               height={384}
//               alt="Graph showing dynamic exchange rates"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Stay ahead with live
//                   <span className="text-primary font-bold capitalize">
//                     exchange rates
//                   </span>
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Stay updated with real-time currency exchange rates...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 6: Reach (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FiGlobe className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">
//                     Worldwide Reach
//                   </span>{" "}
//                   , Local Touch
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Our platform combines international reach...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 7: Money (Large) */}
//           <motion.div
//             className="row-span-4 flex flex-col border dark:border-neutral-700/50 shadow-sm overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <Image
//               src="/assets/images/withoutborder.png"
//               width={500}
//               height={384}
//               alt="Illustration of money exchange without borders"
//               className="w-full object-cover lg:h-96 md:h-60 h-48"
//             />
//             <div className="flex flex-col gap-3 p-4 lg:p-6">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   Exchange
//                   <span className="text-primary font-bold capitalize">
//                     Money
//                   </span>
//                   Without Borders
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 Seamless global money transfers made simple...
//               </p>
//             </div>
//           </motion.div>

//           {/* Feature Card 8: 24/7 Support (Small) */}
//           <motion.div
//             className="row-span-2 flex flex-col justify-center lg:gap-6 border dark:border-neutral-700/50 shadow-sm gap-3 overflow-hidden rounded-3xl bg-white dark:bg-neutral-800/30 lg:p-6 p-4"
//             variants={cardVariants} // Apply NEW card animation
//             style={{ perspective: 1000 }} // Add perspective for 3D
//           >
//             <FaHeadset className="lg:size-8 size-6 text-mainheading dark:text-primary" />
//             <div className="flex flex-col gap-3">
//               <h3 className="lg:text-2xl text-base font-medium text-mainheading dark:text-white">
//                 <span>
//                   <span className="text-primary font-bold">24/7 Customer </span>
//                   Support
//                 </span>
//               </h3>
//               <p className="lg:text-lg text-sm font-medium text-mainheading dark:text-gray-300">
//                 We're here for you—day or night...
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>{" "}
//         {/* End Features Grid */}
//       </motion.section>
//     </div>
//   );
// };

// export default FeaturesSection;

// "use client"; // Required for Framer Motion
// import React from "react";
// import Image from "next/image";
// import { FaChartLine, FaHeadset, FaFastForward } from "react-icons/fa";
// import { FiGlobe } from "react-icons/fi";
// import { motion } from "framer-motion"; // Import motion

// // --- Animation Variants ---

// // Variants for the overall section container
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.25, // Stagger heading and grid container slightly more
//     },
//   },
// };

// // Variants for the heading section
// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (to stagger the cards within)
// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger each card
//       delayChildren: 0.2, // Delay after heading starts
//     },
//   },
// };

// // Variants for each individual feature card (Gentle Spring Slide-Up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 60, // Start 60px below
//   },
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to final position
//     transition: {
//       type: "spring", // Spring physics
//       damping: 15, // Adjust damping (bounce)
//       stiffness: 100, // Adjust stiffness (speed)
//       duration: 0.5, // Can provide a hint, but spring controls timing mostly
//       ease: "easeOut", // Fallback ease if needed
//     },
//   },
// };

// // --- FeaturesSection Component ---
// const FeaturesSection: React.FC = () => {
//   return (
//     <motion.section
//       className="Features-Section bg-white lg:py-10 py-5 dark:bg-background overflow-hidden"
//       id="features"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       // viewport={{ amount: 0.2, once: false }} // <-- OLD: Repeat animation
//       viewport={{ amount: 0.2, once: true }} // <-- NEW: Animate only once
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col gap-8">
//           {/* Heading Section - Apply motion */}
//           <motion.div
//             className="space-y-4 text-center md:text-left"
//             variants={headingVariants}
//             // Inherits trigger from parent section
//           >
//             <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//               Security, Speed,
//               <span className="text-primary"> Savings & Support </span>
//             </h1>

//             {/* Description */}
//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-5xl max-w-full">
//               At the heart of our service is a commitment to making your money
//               transfers seamless, secure, and cost-effective. Whether you're
//               sending funds internationally or managing cross-border
//               transactions, we combine cutting-edge technology with expert
//               support to ensure speed, transparency, and peace of mind.
//             </p>
//           </motion.div>

//           {/* Features Grid - Apply motion container for staggering */}
//           <motion.div
//             className="grid gap-6 grid-cols-1 md:grid-cols-2 md:grid-rows-0"
//             variants={gridContainerVariants}
//           >
//             {/* Feature Card 1: Security (Large) */}
//             <motion.div
//               className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//               // Timing controlled by parent stagger
//             >
//               <Image
//                 src="/assets/images/lock.jpg"
//                 width={500}
//                 height={500}
//                 alt="Secure padlock illustration"
//                 className="w-full object-cover lg:h-96 md:h-60 h-46"
//                 priority
//               />

//               <div className="flex flex-col space-y-3 p-4 lg:p-6">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span className="text-primary font-bold ">Secure</span> Every
//                   Step of the Way
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   We prioritize your security with advanced encryption and fraud
//                   detection, keeping your money and data safe 24/7.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 2: Speed (Small) */}
//             <motion.div
//               className="row-span-2 flex flex-col justify-center lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox lg:p-6 p-4"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <FaFastForward className="lg:size-10 size-8 text-neutral-900 dark:text-primary" />
//               <div className="flex flex-col gap-3">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     Our transfers are{" "}
//                     <span className="text-primary font-bold">Speedy</span>
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Receive your money swiftly, often within minutes, thanks to
//                   our optimized transfer network.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 3: Support (Large) */}
//             <motion.div
//               className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <Image
//                 src="/assets/images/friendly-customer.jpg"
//                 width={500}
//                 height={500}
//                 alt="Friendly customer support agent"
//                 className="w-full object-cover lg:h-96 md:h-60 h-46"
//               />
//               <div className="flex flex-col gap-3 p-4 lg:p-6">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     Need{" "}
//                     <span className="text-primary font-bold">Support </span>?
//                     We’re here!
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Our dedicated support team is available via chat, email, and
//                   phone to assist you anytime.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 4: Savings (Small) */}
//             <motion.div
//               className="row-span-2 flex flex-col justify-center lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox lg:p-6 p-4"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <FaChartLine className="lg:size-10 size-8 text-neutral-900 dark:text-primary" />
//               <div className="flex flex-col gap-3">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     <span className="text-primary font-bold">Save</span> with
//                     high exchange rates
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Get the best value for your hard-earned money with our
//                   competitive, transparent exchange rates.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 5: Rates (Large) */}
//             <motion.div
//               className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <Image
//                 src="/assets/images/dynamicRate.png"
//                 width={500}
//                 height={500}
//                 alt="Graph showing dynamic exchange rates"
//                 className="w-full object-cover lg:h-96 md:h-60 h-46"
//               />
//               <div className="flex flex-col gap-3 p-4 lg:p-6">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     Stay ahead with live{" "}
//                     <span className="text-primary font-bold capitalize">
//                       exchange rates
//                     </span>
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Stay updated with real-time currency exchange rates for
//                   informed decisions and maximum value.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 6: Reach (Small) */}
//             <motion.div
//               className="row-span-2 flex flex-col justify-center lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox lg:p-6 p-4"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <FiGlobe className="lg:size-10 size-8 text-neutral-900 dark:text-primary" />
//               <div className="flex flex-col gap-3">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     <span className="text-primary font-bold">
//                       Worldwide Reach
//                     </span>{" "}
//                     , Local Touch
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Our platform combines international reach with localized
//                   support for a seamless experience.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 7: Money (Large) */}
//             <motion.div
//               className="row-span-4 flex flex-col overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <Image
//                 src="/assets/images/withoutborder.png"
//                 width={500}
//                 height={500}
//                 alt="Illustration of money exchange without borders"
//                 className="w-full object-cover lg:h-96 md:h-60 h-46"
//               />
//               <div className="flex flex-col gap-3 p-4 lg:p-6">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     Exchange{" "}
//                     <span className="text-primary font-bold capitalize">
//                       Money{" "}
//                     </span>
//                     Without Borders
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   Seamless global money transfers made simple, connecting you
//                   financially across continents.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 8: 24/7 Support (Small) */}
//             <motion.div
//               className="row-span-2 flex flex-col justify-center lg:gap-6 gap-3 overflow-hidden rounded-3xl bg-lightgray dark:bg-primarybox lg:p-6 p-4"
//               variants={cardVariants} // Apply Spring Slide-Up animation
//             >
//               <FaHeadset className="lg:size-10 size-8 text-mainheading dark:text-primary" />
//               <div className="flex flex-col gap-3">
//                 <h3 className="lg:text-2xl text-base font-medium text-neutral-900 dark:text-white">
//                   <span>
//                     <span className="text-primary font-bold">
//                       24/7 Customer{" "}
//                     </span>
//                     Support
//                   </span>
//                 </h3>
//                 <p className="lg:text-lg text-sm font-medium text-gray-500 dark:text-gray-300">
//                   We're here for you—day or night—with reliable customer service
//                   whenever you need assistance.
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default FeaturesSection;



// import React from "react";
// // Import appropriate icons from react-icons
// import {
//   FaUserPlus,      // For Account Setup
//   FaWallet,        // For Fund Your Account
//   FaPaperPlane,    // For Direct Transfers
//   FaExchangeAlt,   // For Exchange Rates
//   FaShieldAlt,     // For Security
//   FaReceipt,       // For Transparent Fees
//   FaHeadset,       // For Customer Support (new Card 7)
// } from "react-icons/fa";
// // Removed: import { icons } from 'lucide-react'; as it's not used

// interface Feature {
//   id: number;
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   colSpanLarge: string; // To define column span on large screens (lg:)
//   iconBgColor: string;
// }

// const features: Feature[] = [
//   {
//     id: 1,
//     icon: FaUserPlus,
//     title: "Quick & Easy Account Setup",
//     description: "Get started in minutes. Create your secure account and begin your journey to hassle-free money transfers.",
//     colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
//     iconBgColor: "#e3ffd1", // Light green
//   },
//   {
//     id: 2,
//     icon: FaWallet,
//     title: "Fund Your Account Your Way",
//     description: "Easily add funds to your account balance using your local currency through various secure payment methods.",
//     colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
//     iconBgColor: "#9bf7ff", // Light blue
//   },
//   {
//     id: 3,
//     icon: FaPaperPlane,
//     title: "Direct Transfers to India",
//     description: "Send money directly to any bank account or UPI ID in India. Our specialized service ensures your funds reach their destination efficiently.",
//     colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
//     iconBgColor: "#e2c9fb", // Light pink
//   },
//   {
//     id: 4,
//     icon: FaExchangeAlt,
//     title: "Competitive Exchange Rates",
//     description: "Enjoy exchange rates that are better than the market average. Get more INR for your currency, maximizing value for your recipient.",
//     colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
//     iconBgColor: "#fbcdcd", // Light orange
//   },
//   {
//     id: 5,
//     icon: FaShieldAlt,
//     title: "Bank-Grade Security",
//     description: "Your security is our priority. We use advanced encryption and security protocols to protect your funds and personal data.",
//     colSpanLarge: "lg:col-span-2", // Spans 2 of 6 columns on large screens
//     iconBgColor: "#fee09f", // Light purple
//   },
//   {
//     id: 6,
//     icon: FaReceipt,
//     title: "Transparent Fees & Process",
//     description: "No hidden charges. See all fees upfront before you send. Track your transfer every step of the way.",
//     colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
//     iconBgColor: "#98FB98", // Light cyan
//   },
//   {
//     id: 7,
//     icon: FaHeadset,
//     title: "24/7 Customer Support",
//     description: "Get help anytime with our dedicated support team, ready to assist you with any queries or issues.",
//     colSpanLarge: "lg:col-span-3", // Spans 3 of 6 columns on large screens
//     iconBgColor: "#FFA07A", // Light yellow
//   },
// ];

// interface FeatureCardProps {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   iconBgColor: string;
// }

// // Corrected this component
// const FeatureCard: React.FC<FeatureCardProps> = ({
//   icon: Icon,
//   title,
//   description,
//   iconBgColor,
// }) => {
//   // Added iconBgColor to destructuring
//   return (
//     // Card styling updated for new image
//     <div className="bg-background relative w-full h-full xl:h-[20rem] rounded-3xl p-4 md:p-6 flex flex-col ">
//       <div className="mb-4">

//         <div
//           className="xl:w-20 lg:w-18 w-14 xl:h-20 lg:h-18 h-14 xl:rounded-2xl rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: iconBgColor }} 
//         >
         
//           <Icon className="text-mainheading transition-colors duration-300 ease-in-out xl:size-6 size-5" />
//         </div>
//       </div>
//       <div className="flex flex-col flex-grow xl:justify-end">
  
//         <h3 className=" text-mainheadingWhite group-hover:text-primary text-2xl font-semibold line-clamp-2 mb-2">
//           {title}
//         </h3>
//         <p className="text-subheadingWhite lg:text-lg text-base">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// const OurFeatures: React.FC = () => {
//   return (
//     <section className="FeatureSection sm:py-16 py-10">
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Our Core{" "}
//             <span className="text-primary">Features</span>
//           </h3>
//           <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
//             Experience seamless international transfers with fast setup,
//             transparent fees, and secure delivery. Our in-house security
//             protects your data, backed by 24/7 support for complete peace of
//             mind.
//           </p>
//         </div>
//         {/*
//           Grid setup:
//           - Default: 1 column
//           - sm (small screens, 640px+): 2 columns. Items will naturally flow.
//             An item that is lg:col-span-3 will still only take up 1 of 2 columns here.
//             An item that is lg:col-span-2 will also take up 1 of 2 columns here.
//             This provides a simpler 2-column layout on medium devices.
//           - lg (large screens, 1024px+): 6 columns. Items use their specific colSpanLarge.
//         */}
//         <div className="w-full box-border lg:mt-16 mt-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[3] bg-[#394247] rounded-3xl border-3 border-[#394247]">
//             {features.map((feature) => (
//               <div key={feature.id} className={feature.colSpanLarge}>
//                 <FeatureCard
//                   icon={feature.icon}
//                   title={feature.title}
//                   description={feature.description}
//                   iconBgColor={feature.iconBgColor}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurFeatures;



// src/components/OurFeatures.tsx
import React from "react";
// Import FeatureCard component, features data, and Feature interface from FeatureCard.tsx
import FeatureCard, { features, Feature } from "../FeatureCard"; // Adjust path if necessary


const OurFeatures: React.FC = () => {
  return (
    <section className="FeatureSection sm:py-16 py-10">
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Our Core <span className="text-primary">Features</span>
          </h3>
          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            Experience seamless international transfers with fast setup,
            transparent fees, and secure delivery. Our in-house security
            protects your data, backed by 24/7 support for complete peace of
            mind.
          </p>
        </div>
        <div className="w-full box-border lg:mt-16 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[3] bg-[#394247] rounded-3xl border-3 border-[#394247]">
            {/* Use the imported features array */}
            {features.map((feature: Feature) => ( // Explicitly typing feature here is optional but good practice
              <div key={feature.id} className={feature.colSpanLarge}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBgColor={feature.iconBgColor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;