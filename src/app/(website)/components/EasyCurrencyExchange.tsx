// // src/components/OurSolutions.tsx
// import React from "react"; // React needs to be in scope for JSX
// import { BsShieldLock } from "react-icons/bs";
// import { HiOutlineLockClosed } from "react-icons/hi";
// import { MdOutlineMonitorHeart } from "react-icons/md";
// import { RiSecurePaymentLine } from "react-icons/ri";
// import { JSX } from "react/jsx-runtime";

// // Data structure for solution items
// interface SolutionItem {
//   id: number;
//   // Use JSX.Element for React components
//   icons: JSX.Element;
//   title: string;
//   description: string;
// }

// const solutionItems: SolutionItem[] = [
//   {
//     id: 1,
//     icons: (
//       <BsShieldLock className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Bank-Level Data Encryption",
//     description:
//       "Every step of your transaction is secured with 256-bit SSL encryption, ensuring your personal and financial information remains confidential and protected",
//   },
//   {
//     id: 2,
//     icons: (
//       <RiSecurePaymentLine className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Trusted & Certified Providers",
//     description:
//       "We use only PCI-DSS compliant payment gateways, ensuring that your funds are processed through secure and regulated financial channels",
//   },
//   {
//     id: 3,
//     icons: (
//       <MdOutlineMonitorHeart className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "24/7 Fraud Detection",
//     description:
//       "Our systems constantly monitor transactions for suspicious activity, so any unusual behavior is detected and stopped before it can cause harm.",
//   },
//   {
//     id: 4,
//     icons: (
//       <HiOutlineLockClosed className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Data Privacy by Default",
//     description:
//       "We never share your personal data without consent and comply fully with international data protection standards like GDPR and secure money.",
//   },
// ];

// const OurSolutions: React.FC = () => {
//   return (
//     <section className="our-solutions lg:py-10 py-5">
//       <div className="bg-white dark:bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center space-y-2">
//             {/* Replicates 'sub-title' styling */}
//             <h5 className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
//               Secure & Protected
//             </h5>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               Secure Payments
//               <br />
//               <span className="text-primary"> You Can Trust</span>
//             </h1>

//             <p className="lg:text-lg text-sm max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
//               When you add money to your account, your security is our top
//               priority. Every transaction is protected by advanced encryption,
//               monitored in real-time for fraud.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//             {solutionItems.map((item) => (
//               <div key={item.id} className="solution-item">
//                 <div className="md:text-center text-left dark:border-none rounded-2xl lg:p-6 p-4 space-y-3 bg-lightgray dark:bg-white/5 h-full flex flex-col">
//                   {/* Render the icon element directly */}
//                   <div className="rounded-full p-2.5 w-fit bg-gray dark:bg-white/5 flex items-center justify-center md:mx-auto">
//                     <span>{item.icons}</span>
//                   </div>
//                   <h5 className="lg:text-xl text-base font-medium text-subheading dark:text-primary">
//                     {item.title}
//                   </h5>
//                   <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm flex-grow">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSolutions;

// // src/components/OurSolutions.tsx
// "use client"; // Add this for Framer Motion
// import React from "react"; // React needs to be in scope for JSX
// import { BsShieldLock } from "react-icons/bs";
// import { HiOutlineLockClosed } from "react-icons/hi";
// import { MdOutlineMonitorHeart } from "react-icons/md";
// import { RiSecurePaymentLine } from "react-icons/ri";
// import { motion } from "framer-motion"; // Import motion
// import { JSX } from "react/jsx-runtime"; // Keep if needed for strict types

// // Data structure for solution items
// interface SolutionItem {
//   id: number;
//   icons: JSX.Element;
//   title: string;
//   description: string;
// }

// const solutionItems: SolutionItem[] = [
//   {
//     id: 1,
//     icons: (
//       <BsShieldLock className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Bank-Level Data Encryption",
//     description:
//       "Every step of your transaction is secured with 256-bit SSL encryption, ensuring your personal and financial information remains confidential and protected",
//   },
//   {
//     id: 2,
//     icons: (
//       <RiSecurePaymentLine className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Trusted & Certified Providers",
//     description:
//       "We use only PCI-DSS compliant payment gateways, ensuring that your funds are processed through secure and regulated financial channels",
//   },
//   {
//     id: 3,
//     icons: (
//       <MdOutlineMonitorHeart className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "24/7 Fraud Detection",
//     description:
//       "Our systems constantly monitor transactions for suspicious activity, so any unusual behavior is detected and stopped before it can cause harm.",
//   },
//   {
//     id: 4,
//     icons: (
//       <HiOutlineLockClosed className="lg:size-8 size-6 inline-block text-white" />
//     ),
//     title: "Data Privacy by Default",
//     description:
//       "We never share your personal data without consent and comply fully with international data protection standards like GDPR and secure money.",
//   },
// ];

// // --- Animation Variants ---

// // Variant for the main section container (controls triggering and overall sequence)
// const sectionVariants = {
//   hidden: {}, // No initial animation on the section itself
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the heading and grid container
//     },
//   },
// };

// // Variant for the heading block (fade in + slight slide down)
// const headingVariants = {
//   hidden: { opacity: 0, y: -40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// // Variant for the grid container (staggers the cards inside)
// const gridContainerVariants = {
//   hidden: {}, // Visibility controlled by sectionVariants
//   visible: {
//     transition: {
//       staggerChildren: 0.12, // Stagger each card slightly
//       delayChildren: 0.2, // Small delay after heading animation starts
//     },
//   },
// };

// // Variant for each solution item card (fade in + zoom in slightly + gentle rotate)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8, // Start smaller
//     rotateY: 30, // Start slightly rotated on Y-axis
//     // y: 40 // Optional: Add vertical slide if desired
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     rotateY: 0, // Animate to straight rotation
//     // y: 0 // Animate to final vertical position if y is used in hidden
//     transition: {
//       duration: 0.6, // Card animation duration
//       ease: [0.175, 0.885, 0.32, 1.275], // Ease-out-back like effect (overshoots slightly)
//       // Example alternative ease: "circOut"
//     },
//   },
// };

// const OurSolutions: React.FC = () => {
//   return (
//     // Add overflow-hidden to contain animations
//     <section className="our-solutions lg:py-10 py-5 overflow-hidden">
//       <div className="bg-white dark:bg-background">
//         {/* Wrap container with motion for triggering */}
//         <motion.div
//           className="container mx-auto px-4"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.5, once: true }} // Trigger once when 10% visible
//         >
//           {/* Heading Section - Wrap with motion */}
//           <motion.div
//             className="text-center space-y-2"
//             variants={headingVariants} // Apply heading animation
//             // Inherits trigger from parent
//           >
//             <h5 className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
//               Secure & Protected
//             </h5>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               Secure Payments
//               <br />
//               <span className="text-primary"> You Can Trust</span>
//             </h1>

//             <p className="lg:text-lg text-sm max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
//               When you add money to your account, your security is our top
//               priority. Every transaction is protected by advanced encryption,
//               monitored in real-time for fraud.
//             </p>
//           </motion.div>

//           {/* Grid Container - Wrap with motion for staggering */}
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
//             variants={gridContainerVariants} // Apply grid variants (staggerChildren)
//             // Inherits trigger from parent
//           >
//             {solutionItems.map((item) => (
//               // Wrap each card with motion
//               <motion.div
//                 key={item.id} // Key on the motion component
//                 variants={cardVariants} // Apply card animation variants
//                 className="solution-item h-full" // Added h-full to ensure consistent height for flex container
//               >
//                 {/* Card content remains the same */}
//                 <div className="md:text-center text-left dark:border-none rounded-2xl lg:p-6 p-4 space-y-3 bg-lightgray dark:bg-white/5 h-full flex flex-col">
//                   <div className="rounded-full p-2.5 w-fit bg-gray dark:bg-white/5 flex items-center justify-center md:mx-auto mb-2">
//                     {" "}
//                     {/* Added mb-2 */}
//                     <span>{item.icons}</span>
//                   </div>
//                   <h5 className="lg:text-xl text-base font-medium text-subheading dark:text-primary">
//                     {item.title}
//                   </h5>
//                   <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm flex-grow">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default OurSolutions;

// "use client";
// import React from "react";
// import { BiShieldAlt2 } from "react-icons/bi";
// import { HiOutlineGlobeAlt } from "react-icons/hi";
// import { MdOutlineSwapHoriz, MdOutlineSpeed } from "react-icons/md";
// import { motion } from "framer-motion";

// // Interface for solution items
// interface SolutionItem {
//   id: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// // Data structure for currency exchange solutions
// const exchangeSolutions: SolutionItem[] = [
//   {
//     id: 1,
//     icon: <BiShieldAlt2 className="lg:size-8 size-6 inline-block dark:text-primary text-white" />,
//     title: "Secure Transactions",
//     description:
//       "Every exchange is protected with bank-grade encryption and secure payment protocols, ensuring your money transfers remain private and protected",
//   },
//   {
//     id: 2,
//     icon: (
//       <MdOutlineSwapHoriz className="lg:size-8 size-6 inline-block dark:text-primary text-white" />
//     ),
//     title: "Competitive Exchange Rates",
//     description:
//       "We offer real-time market rates with minimal spreads, providing you better value for your money compared to traditional banks and exchange services",
//   },
//   {
//     id: 3,
//     icon: (
//       <MdOutlineSpeed className="lg:size-8 size-6 inline-block dark:text-primary text-white" />
//     ),
//     title: "Fast Processing",
//     description:
//       "Experience lightning-fast currency conversions with most transactions completed within minutes, not days, regardless of the transaction size",
//   },
//   {
//     id: 4,
//     icon: (
//       <HiOutlineGlobeAlt className="lg:size-8 size-6 inline-block dark:text-primary text-white" />
//     ),
//     title: "Global Coverage",
//     description:
//       "Exchange between multiple currencies across 190+ countries with full transparency on fees and competitive rates for both major and exotic currencies",
//   },
// ];

// // Animation variants
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.2,
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//     rotateY: 30,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     rotateY: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.175, 0.885, 0.32, 1.275],
//     },
//   },
// };

// const CurrencyExchangeSolutions: React.FC = () => {
//   return (
//     <section className="exchange-solutions lg:py-10 py-5 overflow-hidden bg-white dark:bg-background">
//       <motion.div
//         className="container mx-auto px-4"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: true }}
//       >
//         {/* Heading Section */}
//         <motion.div
//           className="text-center lg:space-y-4 space-y-2 lg:mb-12 mb-8"
//           variants={headingVariants}
//         >
//           <h5 className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
//             Why Choose Our Exchange
//           </h5>

//           <h1 className="text-4xl md:text-5xl uppercase lg:text-6xl font-black font-mont  text-mainheading dark:text-white tracking-tight">
//             Currency Exchange
//             <br />
//             <span className="text-primary"> Made Simple</span>
//           </h1>

//           <p className="lg:text-lg text-base max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
//             Convert currencies with confidence using our secure, fast, and
//             transparent exchange platform. Benefit from real-time rates and
//             minimal fees on every transaction.
//           </p>
//         </motion.div>

//         {/* Solutions Grid */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
//           variants={gridContainerVariants}
//         >
//           {exchangeSolutions.map((item) => (
//             <motion.div
//               key={item.id}
//               variants={cardVariants}
//               whileHover={{
//                 y: -10,
//                 transition: { duration: 0.2 },
//               }}
//               className="solution-item h-full"
//             >
//               <div className="rounded-2xl lg:p-6 p-4 space-y-4 bg-white dark:bg-white/5 h-full flex flex-col ">
//                 <div className="rounded-full p-3 w-fit bg-primary dark:bg-white/5 flex items-center justify-center mb-4">
//                   {item.icon}
//                 </div>
//                 <h3 className="lg:text-xl text-lg font-semibold text-neutral-900 dark:text-white">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 lg:text-base text-sm flex-grow">
//                   {item.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>        
//       </motion.div>
//     </section>
//   );
// };

// export default CurrencyExchangeSolutions;





// "use client";
// import React from "react";
// import { BiShieldAlt2 } from "react-icons/bi";
// import { HiOutlineGlobeAlt } from "react-icons/hi";
// import { MdOutlineSwapHoriz, MdOutlineSpeed } from "react-icons/md";
// import { motion } from "framer-motion";

// // Interface for solution items
// interface SolutionItem {
//   id: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// // Data structure for currency exchange solutions
// const exchangeSolutions: SolutionItem[] = [
//   {
//     id: 1,
//     icon: <BiShieldAlt2 className="lg:size-8 size-6 text-neutral-900" />,
//     title: "Secure Transactions",
//     description:
//       "Every exchange is protected with bank-grade encryption and secure payment protocols, ensuring your money transfers remain private and protected",
//   },
//   {
//     id: 2,
//     icon: (
//       <MdOutlineSwapHoriz className="lg:size-8 size-6 text-neutral-900" />
//     ),
//     title: "Competitive Exchange Rates",
//     description:
//       "We offer real-time market rates with minimal spreads, providing you better value for your money compared to traditional banks and exchange services",
//   },
//   {
//     id: 3,
//     icon: (
//       <MdOutlineSpeed className="lg:size-8 size-6 text-neutral-900" />
//     ),
//     title: "Fast Processing",
//     description:
//       "Experience lightning-fast currency conversions with most transactions completed within minutes, not days, regardless of the transaction size",
//   },
//   {
//     id: 4,
//     icon: (
//       <HiOutlineGlobeAlt className="lg:size-8 size-6 text-neutral-900" />
//     ),
//     title: "Global Coverage",
//     description:
//       "Exchange between multiple currencies across 190+ countries with full transparency on fees and competitive rates for both major and exotic currencies",
//   },
// ];

// // Animation variants
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.2,
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//     rotateY: 30,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     rotateY: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.175, 0.885, 0.32, 1.275],
//     },
//   },
// };

// const EasyCurrencyExchange: React.FC = () => {
//   return (
//     <section className="EasyCurrencyExchangeSection lg:py-10 py-5 overflow-hidden bg-white dark:bg-background">
//       <motion.div
//         className="container mx-auto px-4"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: true }}
//       >
//         {/* Heading Section */}
//         <motion.div
//           className="text-center space-y-4 max-w-3xl mx-auto"
//           variants={headingVariants}
//         >
//           <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//             <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//               Simple, Fast & Secure Currency Exchange
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//             Currency Exchange
//             <span className="text-primary"> Made Simple</span>
//           </h1>

//           <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//             Convert currencies with confidence using our secure, fast, and
//             transparent exchange platform. Benefit from real-time rates and
//             minimal fees on every transaction.
//           </p>
//         </motion.div>

//         {/* Solutions Grid */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:mt-10 mt-5"
//           variants={gridContainerVariants}
//         >
//           {exchangeSolutions.map((item) => (
//             <motion.div
//               key={item.id}
//               variants={cardVariants}
//               whileHover={{
//                 y: -10,
//                 transition: { duration: 0.2 },
//               }}
//               className="solution-item h-full"
//             >
//               <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 lg:space-y-4 space-y-2.5 h-full">
//                 <div className="lg:size-14 size-12 rounded-full bg-primary flex items-center justify-center">
//                   {item.icon}
//                 </div>
//                 <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
//                   {item.title}
//                 </h3>
//                 <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
//                   {item.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default EasyCurrencyExchange;




"use client";
import React from "react";
import { BiShieldAlt2 } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdOutlineSwapHoriz, MdOutlineSpeed } from "react-icons/md";
import { motion } from "framer-motion";

// Interface for solution items
interface SolutionItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Data structure for currency exchange solutions
const exchangeSolutions: SolutionItem[] = [
  {
    id: 1,
    icon: <BiShieldAlt2 className="lg:size-8 size-6 text-neutral-900" />,
    title: "Secure Transactions",
    description:
      "Every exchange is protected with bank-grade encryption and secure payment protocols, ensuring your money transfers remain private and protected",
  },
  {
    id: 2,
    icon: (
      <MdOutlineSwapHoriz className="lg:size-8 size-6 text-neutral-900" />
    ),
    title: "Competitive Exchange Rates",
    description:
      "We offer real-time market rates with minimal spreads, providing you better value for your money compared to traditional banks and exchange services",
  },
  {
    id: 3,
    icon: (
      <MdOutlineSpeed className="lg:size-8 size-6 text-neutral-900" />
    ),
    title: "Fast Processing",
    description:
      "Experience lightning-fast currency conversions with most transactions completed within minutes, not days, regardless of the transaction size",
  },
  {
    id: 4,
    icon: (
      <HiOutlineGlobeAlt className="lg:size-8 size-6 text-neutral-900" />
    ),
    title: "Global Coverage",
    description:
      "Exchange between multiple currencies across 190+ countries with full transparency on fees and competitive rates for both major and exotic currencies",
  },
];

// Animation variants
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

const EasyCurrencyExchange: React.FC = () => {
  return (
    <section className="EasyCurrencyExchangeSection lg:pt-10 pt-5 sm:pb-12 pb-5 bg-white dark:bg-background">
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
      >
        {/* Heading Section */}
        <motion.div
          className="text-center space-y-4 max-w-3xl mx-auto"
          variants={headingVariants}
        >
          <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
            <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
              Simple, Fast & Secure Currency Exchange
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
            Currency Exchange
            <span className="text-primary"> Made Simple</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
            Convert currencies with confidence using our secure, fast, and
            transparent exchange platform. Benefit from real-time rates and
            minimal fees on every transaction.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:mt-10 mt-5"
          variants={gridContainerVariants}
        >
          {exchangeSolutions.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              // Apply margin-top to odd-indexed items (2nd, 4th, etc.) on md screens and up
              // This makes them appear "lower" than the even-indexed items
              className={`solution-item h-full ${
                index % 2 !== 0 ? "md:mt-8 lg:mt-12" : "" // You can adjust the margin value (e.g., mt-8, mt-10, mt-12)
              }`}
            >
              <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 lg:space-y-4 space-y-2.5 h-full">
                <div className="lg:size-14 size-12 rounded-full bg-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
                  {item.title}
                </h3>
                <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EasyCurrencyExchange;