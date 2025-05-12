// // components/ProtectionSection.tsx
// import { FaClock, FaGlobe } from "react-icons/fa6";
// import { MdSyncAlt } from "react-icons/md";
// import { RiCustomerService2Fill } from "react-icons/ri";

// const ProtectionSection = () => {
//   return (
//     <section
//       className="Protection-Section md:py-10 py-5 bg-white dark:bg-background px-4"
//       id="protect"
//     >
//       <div className="container mx-auto">
//         <div className="md:pt-10 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-8">

//           {/* Real-Time Exchange Rates */}
//           <div className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5">
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <MdSyncAlt className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Real-Time Exchange Rates
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Get the most accurate and up-to-date exchange rates sourced from
//               global financial markets.
//             </p>
//           </div>

//           {/* Multi-Currency Support */}
//           <div className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5">
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <FaGlobe className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Multi-Currency Support
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Exchange between dozens of global currencies including USD, EUR,
//               GBP, JPY, INR, and more.
//             </p>
//           </div>

//           {/* Fast Processing */}
//           <div className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5">
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <FaClock className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Fast Processing
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Instant conversions with real-time confirmation — no more waiting
//               hours for currency updates.
//             </p>
//           </div>

//           {/* 24/7 Customer Support */}
//           <div className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5">
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <RiCustomerService2Fill className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               24/7 Customer Support
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Round-the-clock support to help you with your currency-related
//               queries and transactions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProtectionSection;

// // components/ProtectionSection.tsx
// "use client"; // Required for Framer Motion

// import { motion } from "framer-motion"; // Import motion
// import { FaClock, FaGlobe } from "react-icons/fa6";
// import { MdSyncAlt } from "react-icons/md";
// import { RiCustomerService2Fill } from "react-icons/ri";

// // Variants for the container (the grid) to control staggering
// const containerVariants = {
//   hidden: { opacity: 0 }, // Can start hidden if desired, but main purpose is transition
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.1, // Optional: Small delay before the first child starts
//       staggerChildren: 0.2, // Delay between each child animation starting (in seconds)
//     },
//   },
// };

// // Variants for the individual cards (how each card animates)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 50, // Start 50px down
//   },
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original position
//     transition: {
//       duration: 0.5, // How long each card's individual animation takes
//       ease: "easeOut",
//     },
//   },
// };

// const ProtectionSection = () => {
//   return (
//     <section
//       className="Protection-Section md:py-10 py-5 bg-white dark:bg-background px-4 overflow-y-hidden" // Prevent vertical scroll jump from y:50
//       id="protect"
//     >
//       <div className="container mx-auto">
//         {/* Wrap the grid in a motion.div to control staggering */}
//         <motion.div
//           className="md:pt-10 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-8"
//           variants={containerVariants}
//           initial="hidden" // Start the container (and thus children initially) as hidden
//           whileInView="visible" // Trigger the 'visible' variant when the container scrolls into view
//           viewport={{ amount: 0.1, once: false }} // Trigger when 10% is visible, run EVERY time (once: false)
//         >
//           {/* Apply motion and variants to EACH card */}

//           {/* Real-Time Exchange Rates */}
//           <motion.div
//             className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5"
//             variants={cardVariants} // Use the SAME variants for all cards
//             // No initial/whileInView needed here; parent controls timing
//           >
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <MdSyncAlt className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Real-Time Exchange Rates
//             </h3>
//             <p className="text-gray-700 md:base text-sm dark:text-gray-300 leading-relaxed">
//               Get the most accurate and up-to-date exchange rates sourced from
//               global financial markets.
//             </p>
//           </motion.div>

//           {/* Multi-Currency Support */}
//           <motion.div
//             className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5"
//             variants={cardVariants} // Use the SAME variants for all cards
//           >
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <FaGlobe className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Multi-Currency Support
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Exchange between dozens of global currencies including USD, EUR,
//               GBP, JPY, INR, and more.
//             </p>
//           </motion.div>

//           {/* Fast Processing */}
//           <motion.div
//             className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5"
//             variants={cardVariants} // Use the SAME variants for all cards
//           >
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <FaClock className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               Fast Processing
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Instant conversions with real-time confirmation — no more waiting
//               hours for currency updates.
//             </p>
//           </motion.div>

//           {/* 24/7 Customer Support */}
//           <motion.div
//             className="flex flex-col items-center text-center lg:space-y-3.5 space-y-2.5"
//             variants={cardVariants} // Use the SAME variants for all cards
//           >
//             <div className="lg:size-14 size-10 rounded-full bg-gray dark:bg-primarybox flex items-center justify-center">
//               <RiCustomerService2Fill className=" size-6 lg:size-8 text-white dark:text-primary" />
//             </div>
//             <h3 className="lg:text-xl text-lg font-medium text-mainheading dark:text-white">
//               24/7 Customer Support
//             </h3>
//             <p className="text-gray-700 md:text-base text-sm dark:text-gray-300 leading-relaxed">
//               Round-the-clock support to help you with your currency-related
//               queries and transactions.
//             </p>
//           </motion.div>
//         </motion.div>{" "}
//         {/* End grid motion container */}
//       </div>
//     </section>
//   );
// };

// export default ProtectionSection;

// components/ProtectionSection.tsx
"use client"; // Required for Framer Motion

import { motion } from "framer-motion"; // Import motion
import { FaClock, FaGlobe } from "react-icons/fa6";
import { MdSyncAlt } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

// Variants for the container (the grid) to control staggering
const containerVariants = {
  hidden: { opacity: 0 }, // Can start hidden if desired, but main purpose is transition
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // Optional: Small delay before the first child starts
      staggerChildren: 0.2, // Delay between each child animation starting (in seconds)
    },
  },
};

// Variants for the individual cards (how each card animates)
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Start 50px down
  },
  visible: {
    opacity: 1,
    y: 0, // Animate to original position
    transition: {
      duration: 0.5, // How long each card's individual animation takes
      ease: "easeOut",
    },
  },
};

const ProtectionSection = () => {
  return (
    <section
      className="Protection-Section lg:py-10 py-5 bg-white dark:bg-background overflow-y-hidden"
      id="protect"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden" // Start the container (and thus children initially) as hidden
          whileInView="visible" // Trigger the 'visible' variant when the container scrolls into view
          viewport={{ amount: 0.2, once: true }} // <-- NEW: Trigger when 10% is visible, run ONLY ONCE
        >

          {/* Real-Time Exchange Rates */}
          <motion.div 
            className="flex flex-col items-center text-center lg:space-y-3 space-y-2.5"
            variants={cardVariants} // Use the SAME variants for all cards
          >
            <div className="lg:size-14 size-12 rounded-full bg-secondarybox dark:bg-primarybox flex items-center justify-center">
              <MdSyncAlt className="lg:size-8 size-6 text-white dark:text-primary" />
            </div>
            <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
              Real-Time Exchange Rates
            </h3>
            <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
              Get the most accurate and up-to-date exchange rates sourced from
              global financial markets.
            </p>
          </motion.div>

          {/* Multi-Currency Support */}
          <motion.div
            className="flex flex-col items-center text-center lg:space-y-3 space-y-2.5"
            variants={cardVariants} // Use the SAME variants for all cards
          >
            <div className="lg:size-14 size-12 rounded-full bg-secondarybox dark:bg-primarybox flex items-center justify-center">
              <FaGlobe className=" lg:size-8 size-6 text-white dark:text-primary" />
            </div>
            <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
              Multi-Currency Support
            </h3>
            <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
              Exchange between dozens of global currencies including USD, EUR,
              GBP, JPY, INR, and more.
            </p>
          </motion.div>

          {/* Fast Processing */}
          <motion.div
            className="flex flex-col items-center text-center lg:space-y-3 space-y-2.5"
            variants={cardVariants} // Use the SAME variants for all cards
          >
            <div className="lg:size-14 size-12 rounded-full bg-secondarybox dark:bg-primarybox flex items-center justify-center">
              <FaClock className=" lg:size-8 size-6 text-white dark:text-primary" />
            </div>
            <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
              Fast Processing
            </h3>
            <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
              Instant conversions with real-time confirmation — no more waiting
              hours for currency updates.
            </p>
          </motion.div>

          {/* 24/7 Customer Support */}
          <motion.div
            className="flex flex-col items-center text-center lg:space-y-3 space-y-2.5"
            variants={cardVariants} // Use the SAME variants for all cards
          >
            <div className="lg:size-14 size-12 rounded-full bg-secondarybox dark:bg-primarybox flex items-center justify-center">
              <RiCustomerService2Fill className=" lg:size-8 size-6 text-white dark:text-primary" />
            </div>
            <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
              24/7 Customer Support
            </h3>
            <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
              Round-the-clock support to help you with your currency-related
              queries and transactions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProtectionSection;
