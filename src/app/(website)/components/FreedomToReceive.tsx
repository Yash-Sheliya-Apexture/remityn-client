// import React from "react";
// import { FaFingerprint, FaRocket } from "react-icons/fa6";
// import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";

// const RemittanceFeature: React.FC = () => {
//   return (
//     <section className="remittance more-feature bg-[#f2f4f7] dark:bg-background px-4 lg:py-20 py-10">
//       <div className="container mx-auto">
//         <div className="row flex justify-center">
//           <div className="col-md-7 md:w-7/12">
//             <div className="section-header text-center">
//               {/* sub-title */}
//               <p className="sub-title text-base font-medium text-gray-500 dark:text-gray-300 mb-2">
//                 Payments without borders
//               </p>
//               {/* title */}
//               <h1 className="text-4xl md:text-5xl lgt:ext-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Freedom to Received
//                 <span className="text-primary"> Money Anywhere.</span>
//               </h1>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 flex-wrap lg:mt-14 mt-5">
//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaFingerprint className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Always at Your Fingertips
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   Send money anytime, anywhere—right from your phone. With
//                   lightning-fast transfers, real-time exchange rates, and total
//                   security, global payments are now just a tap away.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaExchangeAlt className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Get the exchange rate right time
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   The cost of sending money abroad is constantly shifting. But
//                   with the Bankio app, you’ll always know the exchange rate and
//                   exactly how much remittance costs you.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaMoneyBillAlt className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   No additional fees. Ever
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   Exchange rates already make remitting money back home more
//                   expensive. Stilt will never charge you anything extra to send
//                   money to your family. Ever.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-white/5 lg:p-6 p-4 rounded-2xl">
//             <div className="flex items-center gap-6">
//               <FaRocket className="size-20 dark:text-primary text-mainheading" />
//               <div className="space-y-1">
//                 <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//                   Send with speed
//                 </h5>
//                 <p className="text-gray-500 text-xs lg:text-base dark:text-gray-300">
//                   When you send money abroad with the Bankio app’s remittance
//                   feature, your payments arrive instantly. No waiting and no
//                   instant transfer-fees. get 24/7 support.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RemittanceFeature;

// import React from "react";
// import { FaFingerprint, FaRocket } from "react-icons/fa6";
// import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
// import { FiRepeat } from "react-icons/fi";
// import { HiOutlineClock } from "react-icons/hi";

// interface FeatureItemProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const FeatureItem: React.FC<FeatureItemProps> = ({
//   icon,
//   title,
//   description,
// }) => {
//   return (
//     <div className="bg-lightgray dark:bg-white/5 p-4 rounded-2xl">
//       <div className="flex items-center md:gap-6 gap-4">
//         <span className="text-mainheading dark:text-primary">{icon}</span>
//         <div className="space-y-1">
//           <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//             {title}
//           </h5>
//           <p className="text-gray-700 text-xs lg:text-base dark:text-gray-300">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Paymentsborder: React.FC = () => {
//   return (
//     <section className="bg-white dark:bg-background px-4 lg:py-10 py-5">
//       <div className="container mx-auto">
//         <div className="flex justify-center">
//           <div className="md:w-7/12 w-full">
//             <div className="text-center space-y-2">
//               {/* sub-title */}
//               <p className="lg:text-base text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Payments without borders
//               </p>
//               {/* title */}
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Freedom to Received
//                 <span className="text-primary"> Money Anywhere.</span>
//               </h1>
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6 lg:mt-10 mt-5">
//           <FeatureItem
//             icon={<FaFingerprint className="lg:size-10 size-8" />}
//             title="Always at Your Fingertips"
//             description="Send money anytime, anywhere—right from your phone. With
//                   lightning-fast transfers, real-time exchange rates, and total
//                   security, global payments are now just a tap away."
//           />
//           <FeatureItem
//             icon={<FaExchangeAlt className="lg:size-10 size-8" />}
//             title="Get the exchange rate right time"
//             description="The cost of sending money abroad is constantly shifting. But
//                   with the Bankio app, you’ll always know the exchange rate and
//                   exactly how much remittance costs you."
//           />
//           <FeatureItem
//             icon={<FaMoneyBillAlt className="lg:size-10 size-8" />}
//             title="No additional fees. Ever"
//             description="Exchange rates already make remitting money back home more
//                   expensive working. Stilt will never charge you anything extra to send
//                   money to your family. Ever."
//           />
//           <FeatureItem
//             icon={<FaRocket className="lg:size-10 size-8" />}
//             title="Send with speed"
//             description="When you send money abroad with the Bankio app’s remittance
//                   feature, your payments arrive instantly. No waiting and no
//                   instant transfer-fees. get 24/7 support."
//           />
//           <FeatureItem
//             icon={<FiRepeat className="lg:size-10 size-8" />}
//             title="Multiple Payout Options"
//             description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//              to choose how you receive your money—straight into your bank account, picked
//              up in cash at a nearby location, or instantly into your mobile wallet."
//           />
//           <FeatureItem
//             icon={<HiOutlineClock className="lg:size-10 size-8" />}
//             title="24/7 Availability"
//             description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//              to choose how you receive your money—straight into your bank account, picked
//              up in cash at a nearby location, or instantly into your mobile wallet."
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Paymentsborder;

// // Paymentsborder.tsx
// "use client"; // Add this for Framer Motion

// import React from "react";
// import { FaFingerprint, FaRocket } from "react-icons/fa6";
// import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
// import { FiRepeat } from "react-icons/fi";
// import { HiOutlineClock } from "react-icons/hi";
// import { motion } from "framer-motion"; // Import motion

// // FeatureItem component remains the same structurally
// interface FeatureItemProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const FeatureItem: React.FC<FeatureItemProps> = ({
//   icon,
//   title,
//   description,
// }) => {
//   return (
//     // Base styling remains, animation will be applied by the wrapper
//     <div className="bg-lightgray dark:bg-white/5 p-4 rounded-2xl h-full">
//       {" "}
//       {/* Added h-full for consistent height if needed */}
//       <div className="flex items-center md:gap-6 gap-4">
//         <span className="text-mainheading dark:text-primary flex-shrink-0">
//           {" "}
//           {/* Added flex-shrink-0 */}
//           {icon}
//         </span>
//         <div className="space-y-1">
//           <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//             {title}
//           </h5>
//           <p className="text-gray-700 text-xs lg:text-base dark:text-gray-300">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Animation Variants ---

// // Variant for the main section container (controls triggering and staggering)
// const sectionVariants = {
//   hidden: {}, // No initial visual state needed for the container
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the heading and grid container
//     },
//   },
// };

// // Variant for the heading section (fade in + slight slide down)
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
//   hidden: {}, // No initial visual state needed
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger each card slightly
//       delayChildren: 0.2, // Small delay after heading animation starts
//     },
//   },
// };

// // Variant for each FeatureItem card (fade in + gentle scale up + slight slide up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.95, // Start slightly smaller
//     y: 30, // Start slightly lower
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to original vertical position
//     transition: {
//       duration: 0.5, // Duration for each card's animation
//       ease: [0.25, 0.46, 0.45, 0.94], // Smooth custom easing
//     },
//   },
// };

// const Paymentsborder: React.FC = () => {
//   return (
//     // Add overflow-hidden to contain animations
//     <section className="bg-white dark:bg-background px-4 lg:py-10 py-5 overflow-hidden">
//       {/* Wrap the container with motion for triggering */}
//       <motion.div
//         className="container mx-auto"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: true }} // Trigger once when 10% visible
//       >
//         {/* Heading Section - Wrap with motion */}
//         <motion.div
//           className="flex justify-center"
//           variants={headingVariants} // Apply heading animation
//           // Inherits trigger from parent
//         >
//           <div className="md:w-7/12 w-full">
//             <div className="text-center space-y-2">
//               <p className="lg:text-base text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Payments without borders
//               </p>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Freedom to Received
//                 <span className="text-primary"> Money Anywhere.</span>
//               </h1>
//             </div>
//           </div>
//         </motion.div>

//         {/* Features Grid - Wrap grid container with motion for staggering */}
//         <motion.div
//           className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6 lg:mt-10 mt-5"
//           variants={gridContainerVariants} // Apply grid variants (staggerChildren)
//           // Inherits trigger from parent
//         >
//           {/* Map through features and wrap each FeatureItem instance */}
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaFingerprint className="lg:size-10 size-8" />}
//               title="Always at Your Fingertips"
//               description="Send money anytime, anywhere—right from your phone. With
//                     lightning-fast transfers, real-time exchange rates, and total
//                     security, global payments are now just a tap away."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaExchangeAlt className="lg:size-10 size-8" />}
//               title="Get the exchange rate right time"
//               description="The cost of sending money abroad is constantly shifting. But
//                     with the Bankio app, you’ll always know the exchange rate and
//                     exactly how much remittance costs you."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaMoneyBillAlt className="lg:size-10 size-8" />}
//               title="No additional fees. Ever"
//               description="Exchange rates already make remitting money back home more
//                     expensive working. Stilt will never charge you anything extra to send
//                     money to your family. Ever."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaRocket className="lg:size-10 size-8" />}
//               title="Send with speed"
//               description="When you send money abroad with the Bankio app’s remittance
//                     feature, your payments arrive instantly. No waiting and no
//                     instant transfer-fees. get 24/7 support."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FiRepeat className="lg:size-10 size-8" />}
//               title="Multiple Payout Options"
//               description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//                to choose how you receive your money—straight into your bank account, picked
//                up in cash at a nearby location, or instantly into your mobile wallet."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<HiOutlineClock className="lg:size-10 size-8" />}
//               title="24/7 Availability"
//               description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//                to choose how you receive your money—straight into your bank account, picked
//                up in cash at a nearby location, or instantly into your mobile wallet." // Note: Description repeated?
//             />
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Paymentsborder;



// Paymentsborder.tsx
"use client"; // Add this for Framer Motion

import React from "react";
import { FaFingerprint, FaRocket } from "react-icons/fa6";
import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import { motion } from "framer-motion"; // Import motion

// FeatureItem component remains the same structurally
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    // Base styling remains, animation will be applied by the wrapper
    <div className="bg-lightgray dark:bg-primarybox p-4 rounded-2xl h-full">
      {" "}
      {/* Added h-full for consistent height if needed */}
      <div className="flex items-center md:gap-6 gap-4">
        <span className="text-mainheading dark:text-primary flex-shrink-0">
          {icon}
        </span>
        <div className="space-y-2">
          <h5 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
            {title}
          </h5>
          <p className="sm:text-lg text-base text-gray-500 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Animation Variants ---

// Variant for the main section container (controls triggering and staggering)
const sectionVariants = {
  hidden: {}, // No initial visual state needed for the container
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger the heading and grid container
    },
  },
};

// Variant for the heading section (fade in + slight slide down)
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

// Variant for the grid container (staggers the cards inside)
const gridContainerVariants = {
  hidden: {}, // No initial visual state needed
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger each card slightly
      delayChildren: 0.2, // Small delay after heading animation starts
    },
  },
};

// Variant for each FeatureItem card (fade in + gentle scale up + slight slide up)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Start slightly smaller
    y: 30, // Start slightly lower
  },
  visible: {
    opacity: 1,
    scale: 1, // Animate to full size
    y: 0, // Animate to original vertical position
    transition: {
      duration: 0.5, // Duration for each card's animation
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth custom easing
    },
  },
};

const FreedomToReceive: React.FC = () => {
  return (
    // Add overflow-hidden to contain animations
    <section className="FreedomToReceiveSection bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
      {/* Wrap the container with motion for triggering */}
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }} // Trigger once when 10% visible
      >
        {/* Heading Section - Wrap with motion */}
        <motion.div
          className="mx-auto max-w-4xl text-center space-y-4"
          variants={headingVariants}
        >
          <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
            <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
              Receive Funds Anywhere, Anytime – With Total Flexibility
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
            Freedom to Received
            <span className="text-primary"> Money Anywhere.</span>
          </h1>
        </motion.div>

        {/* Features Grid - Wrap grid container with motion for staggering */}
        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6 lg:mt-10 mt-5"
          variants={gridContainerVariants} // Apply grid variants (staggerChildren)
          // Inherits trigger from parent
        >
          {/* Map through features and wrap each FeatureItem instance */}
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<FaFingerprint className="size-8" />}
              title="Always at Your Fingertips"
              description="Send money anytime, anywhere—right from your phone. With
                    lightning-fast transfers, real-time exchange rates, and total
                    security, global payments are now just a tap away."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<FaExchangeAlt className="size-8" />}
              title="Get the exchange rate right time"
              description="The cost of sending money abroad is constantly shifting. But
                    with the Bankio app, you’ll always know the exchange rate and
                    exactly how much remittance costs you."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<FaMoneyBillAlt className="size-8" />}
              title="No additional fees. Ever"
              description="Exchange rates already make remitting money back home more
                    expensive working. Stilt will never charge you anything extra to send
                    money to your family. Ever."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<FaRocket className="size-8" />}
              title="Send with speed"
              description="When you send money abroad with the Bankio app’s remittance
                    feature, your payments arrive instantly. No waiting and no
                    instant transfer-fees. get 24/7 support."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<FiRepeat className="size-8" />}
              title="Multiple Payout Options"
              description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
               to choose how you receive your money—straight into your bank account, picked
               up in cash at a nearby location, or instantly into your mobile wallet."
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <FeatureItem
              icon={<HiOutlineClock className="size-8" />}
              title="24/7 Availability"
              description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
               to choose how you receive your money—straight into your bank account, picked
               up in cash at a nearby location, or instantly into your mobile wallet." // Note: Description repeated?
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FreedomToReceive;



// // Paymentsborder.tsx
// "use client"; // Add this for Framer Motion

// import React from "react";
// import { FaFingerprint, FaRocket } from "react-icons/fa6";
// import { FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
// import { FiRepeat } from "react-icons/fi";
// import { HiOutlineClock } from "react-icons/hi";
// import { motion } from "framer-motion"; // Import motion

// // FeatureItem component remains the same structurally
// interface FeatureItemProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const FeatureItem: React.FC<FeatureItemProps> = ({
//   icon,
//   title,
//   description,
// }) => {
//   return (
//     // Base styling remains, animation will be applied by the wrapper
//     <div className="bg-lightgray dark:bg-white/5 p-4 rounded-2xl h-full">
//       {" "}
//       {/* Added h-full */}
//       <div className="flex items-center md:gap-6 gap-4">
//         <span className="text-mainheading dark:text-primary flex-shrink-0">
//           {" "}
//           {/* Added flex-shrink-0 */}
//           {icon}
//         </span>
//         <div className="space-y-1">
//           <h5 className="lg:text-lg text-sm font-medium text-mainheading dark:text-white">
//             {title}
//           </h5>
//           <p className="text-gray-700 text-xs lg:text-base dark:text-gray-300">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Animation Variants (Remain the same) ---

// const sectionVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 30 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
//   },
// };

// const Paymentsborder: React.FC = () => {
//   return (
//     // Add overflow-hidden to contain animations
//     <section className="bg-white dark:bg-background px-4 lg:py-10 py-5 overflow-hidden">
//       {/*
//         THIS is the main motion wrapper for the whole section.
//         - initial="hidden": Starts the animations in their 'hidden' state.
//         - whileInView="visible": Tells Framer Motion to transition to the 'visible' state
//                                  WHEN this element enters the browser's viewport.
//         - viewport={{ amount: 0.1, once: true }}:
//           - amount: 0.1 = Trigger when 10% of the element is visible.
//           - once: true = Ensures the animation ONLY runs the FIRST time it enters the viewport.
//                          It won't re-animate if you scroll away and back.
//       */}
//       <motion.div
//         className="container mx-auto"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible" // <--- Triggers animation when component is shown
//         viewport={{ amount: 0.1, once: true }} // <--- Ensures it happens only once
//       >
//         {/* Heading Section - Inherits the trigger from the parent */}
//         <motion.div className="flex justify-center" variants={headingVariants}>
//           <div className="md:w-7/12 w-full">
//             <div className="text-center space-y-2">
//               <p className="lg:text-base text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Payments without borders
//               </p>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Freedom to Received
//                 <span className="text-primary"> Money Anywhere.</span>
//               </h1>
//             </div>
//           </div>
//         </motion.div>

//         {/* Features Grid - Inherits the trigger from the parent */}
//         <motion.div
//           className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6 lg:mt-10 mt-5"
//           variants={gridContainerVariants}
//         >
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaFingerprint className="lg:size-10 size-8" />}
//               title="Always at Your Fingertips"
//               description="Send money anytime, anywhere—right from your phone. With
//                     lightning-fast transfers, real-time exchange rates, and total
//                     security, global payments are now just a tap away."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaExchangeAlt className="lg:size-10 size-8" />}
//               title="Get the exchange rate right time"
//               description="The cost of sending money abroad is constantly shifting. But
//                     with the Bankio app, you’ll always know the exchange rate and
//                     exactly how much remittance costs you."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaMoneyBillAlt className="lg:size-10 size-8" />}
//               title="No additional fees. Ever"
//               description="Exchange rates already make remitting money back home more
//                     expensive working. Stilt will never charge you anything extra to send
//                     money to your family. Ever."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FaRocket className="lg:size-10 size-8" />}
//               title="Send with speed"
//               description="When you send money abroad with the Bankio app’s remittance
//                     feature, your payments arrive instantly. No waiting and no
//                     instant transfer-fees. get 24/7 support."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<FiRepeat className="lg:size-10 size-8" />}
//               title="Multiple Payout Options"
//               description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//                to choose how you receive your money—straight into your bank account, picked
//                up in cash at a nearby location, or instantly into your mobile wallet."
//             />
//           </motion.div>
//           <motion.div variants={cardVariants}>
//             <FeatureItem
//               icon={<HiOutlineClock className="lg:size-10 size-8" />}
//               title="24/7 Availability"
//               description="Cash Pickup, Bank Deposit, Mobile Wallets Enjoy the flexibility
//                to choose how you receive your money—straight into your bank account, picked
//                up in cash at a nearby location, or instantly into your mobile wallet."
//             />
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Paymentsborder;
