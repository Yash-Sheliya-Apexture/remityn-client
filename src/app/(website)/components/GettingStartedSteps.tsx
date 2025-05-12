// import React from "react";
// import { BiTransfer } from "react-icons/bi";
// import { FaUniversity } from "react-icons/fa";
// import { FiEdit } from "react-icons/fi";
// import { MdReceiptLong } from "react-icons/md";

// const AddMoneyMethods = () => {
//   const methods = [
//     {
//       step: 1,
//       icon: <FiEdit className="text-white" />,
//       title: "Enter Amount to Add Money",
//       description:
//         "In this step, you can securely enter the amount you wish to add to your account. Simply type in the desired value, ensuring it meets any applicable minimum or maximum limits.",
//     },
//     {
//       step: 2,
//       icon: <FaUniversity className="text-white" />,
//       title: "Choose a Payment Method",
//       description:
//         "In this step, select your preferred payment method to continue with the transaction. We offer a variety of secure and convenient options, including bank transfers.",
//     },
//     {
//       step: 3,
//       icon: <MdReceiptLong className="text-white" />,
//       title: "Review Your Payment Summary",
//       description:
//         "Before finalizing your transaction, take a moment to carefully review your payment summary. This section provides a clear breakdown of the amount you’re adding now's.",
//     },
//     {
//       step: 4,
//       icon: <BiTransfer className="text-white" />,
//       title: "Make a Bank Transfer Free",
//       description:
//         "Use the provided account details to complete your transfer. You can copy and paste the IBAN, reference code , and bank details to your online banking platform use money.",
//     },
//   ];

//   return (
//     <section className="lg:py-10 py-5 px-4 bg-background">
//       <div className="container mx-auto max-w-6xl">
//         {/* Heading section */}
//         <div className="text-center mb-10 space-y-2">
//           <p className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
//             How it works?
//           </p>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Just few
//             <span className="text-primary"> steps to start</span>
//           </h1>
//           <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
//             It's easier than you think. Follow 4 simple easy steps
//           </p>
//         </div>

//         {/* Steps timeline */}
//         <div className="relative">
//           {/* Steps */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {methods.map((method, index) => (
//               <div key={index}>
//                 {/* Step number circle */}
//                 <div className="flex flex-col items-center">
//                   {/* Card */}
//                   <div className="bg-white dark:bg-white/5 rounded-2xl border lg:p-6 p-4 lg:h-[350px] w-full hover:transform lg:hover:scale-105 transition-transform ease-in-out duration-300">
//                     <div className="flex flex-col lg:items-center lg:text-center text-left space-y-3">
//                       <div className="p-2.5 w-fit bg-gray lg:text-2xl text-xl dark:bg-white/5 rounded-full">
//                         {method.icon}
//                       </div>
//                       <h3 className="lg:text-xl text-base font-medium text-subheading dark:text-primary">
//                         {method.title}
//                       </h3>
//                       <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm flex-grow">
//                         {method.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddMoneyMethods;

// "use client"; // Add this for Framer Motion
// import React from "react";
// import { BiTransfer } from "react-icons/bi";
// import { FaUniversity } from "react-icons/fa";
// import { FiEdit } from "react-icons/fi";
// import { MdReceiptLong } from "react-icons/md";
// import { motion } from "framer-motion"; // Import motion

// // Interface for method data remains the same
// interface Method {
//   step: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }
// // --- Animation Variants ---

// // Variants for the main section (controls triggering and overall stagger)
// const sectionVariants = {
//   hidden: {}, // No initial animation on the section itself
//   visible: {
//     transition: {
//       staggerChildren: 0.2, // Stagger the heading and the grid
//     },
//   },
// };

// // Variants for the heading block (fade in + slide down slightly)
// const headingVariants = {
//   hidden: { opacity: 0, y: -50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// // Variants for the grid container (staggers the cards within)
// const gridContainerVariants = {
//   hidden: {}, // Visibility controlled by sectionVariants
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger each card's animation
//       // Optional: delayChildren if needed after heading is fully done
//       delayChildren: 0.3,
//     },
//   },
// };

// // Variants for each individual method card (fade in + scale up + gentle slide up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.85, // Start slightly smaller
//     y: 60, // Start further down
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to final vertical position
//     transition: {
//       duration: 0.6, // Card animation duration
//       ease: [0.4, 0, 0.2, 1], // Smooth custom cubic bezier
//     },
//   },
// };

// const AddMoneySteps = () => {
//   const methods: Method[] = [
//     // Explicitly type the array
//     {
//       step: 1,
//       icon: <FiEdit className="text-white lg:size-6 size-5" />, // Adjusted size slightly
//       title: "Enter Amount to Add Money",
//       description:
//         "In this step, you can securely enter the amount you wish to add to your account. Simply type in the desired value, ensuring it meets any applicable minimum or maximum limits.",
//     },
//     {
//       step: 2,
//       icon: <FaUniversity className="text-white lg:size-6 size-5" />,
//       title: "Choose a Payment Method",
//       description:
//         "In this step, select your preferred payment method to continue with the transaction. We offer a variety of secure and convenient options, including bank transfers.",
//     },
//     {
//       step: 3,
//       icon: <MdReceiptLong className="text-white lg:size-6 size-5" />,
//       title: "Review Your Payment Summary",
//       description:
//         "Before finalizing your transaction, take a moment to carefully review your payment summary. This section provides a clear breakdown of the amount you’re adding now's.",
//     },
//     {
//       step: 4,
//       icon: <BiTransfer className="text-white lg:size-6 size-5" />,
//       title: "Make a Bank Transfer Free",
//       description:
//         "Use the provided account details to complete your transfer. You can copy and paste the IBAN, reference code , and bank details to your online banking platform use money.",
//     },
//   ];

//   return (
//     // Add overflow-hidden to contain animations
//     <section className="lg:py-10 py-5 px-4 bg-background overflow-hidden">
//       {/* Wrap container with motion for triggering animations */}
//       <motion.div
//         className="container mx-auto max-w-6xl"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: true }} // Trigger once when 10% visible
//       >
//         {/* Heading section - Wrap with motion */}
//         <motion.div
//           className="text-center mb-10 space-y-2"
//           variants={headingVariants} // Apply heading animation
//         >
//           <p className="text-gray dark:text-gray-300 md:text-base text-sm font-medium">
//             How it works?
//           </p>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Just few
//             <span className="text-primary"> steps to start</span>
//           </h1>
//           <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300">
//             It's easier than you think. Follow 4 simple easy steps
//           </p>
//         </motion.div>

//         {/* Steps timeline container - Wrap grid with motion for staggering */}
//         <div className="relative">
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             variants={gridContainerVariants} // Apply grid variants (staggerChildren)
//           >
//             {methods.map((method, index) => (
//               // Wrap each card container with motion
//               <motion.div
//                 key={index} // Key must be on the motion component
//                 variants={cardVariants} // Apply card animation variants
//                 className="flex flex-col items-center" // Keep original layout structure
//               >
//                 {/* Card content */}
//                 {/* Removed hover transforms as Framer Motion handles entrance */}
//                 <div className="bg-white dark:bg-white/5 rounded-2xl border lg:p-6 p-4 lg:h-[350px] w-full ">
//                   {" "}
//                   {/* Removed hover classes */}
//                   <div className="flex flex-col lg:items-center lg:text-center text-left space-y-3 h-full">
//                     {" "}
//                     {/* Added h-full */}
//                     <div className="p-2.5 w-fit bg-gray lg:text-2xl text-xl dark:bg-white/5 rounded-full mb-2">
//                       {" "}
//                       {/* Added margin-bottom */}
//                       {method.icon}
//                     </div>
//                     <h3 className="lg:text-xl text-base font-medium text-subheading dark:text-primary">
//                       {method.title}
//                     </h3>
//                     <p className="text-gray-700 dark:text-gray-300 lg:text-base text-sm flex-grow">
//                       {method.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default AddMoneySteps;


// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { FiEdit } from "react-icons/fi";
// import { FaUniversity } from "react-icons/fa";
// import { MdReceiptLong } from "react-icons/md";
// import { BiTransfer } from "react-icons/bi";

// // Interface for step data
// interface Step {
//   step: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   color: string;
// }

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.3,
//       delayChildren: 0.2,
//     },
//   },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// const stepVariants = {
//   hidden: { opacity: 0, x: -50, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.4, 0, 0.2, 1],
//     },
//   },
// };

// const GettingStartedSteps: React.FC = () => {
//   const steps: Step[] = [
//     {
//       step: 1,
//       icon: <FiEdit className="w-8 h-8 text-white" />,
//       title: "Enter Amount to Add Money",
//       description:
//         "Securely input the amount you wish to add, ensuring it aligns with any minimum or maximum limits.",
//       color: "bg-gradient-to-r from-pink-500 to-purple-600",
//     },
//     {
//       step: 2,
//       icon: <FaUniversity className="w-8 h-8 text-white" />,
//       title: "Choose a Payment Method",
//       description:
//         "Select your preferred payment method from a variety of secure options, including bank transfers.",
//       color: "bg-gradient-to-r from-blue-500 to-teal-600",
//     },
//     {
//       step: 3,
//       icon: <MdReceiptLong className="w-8 h-8 text-white" />,
//       title: "Review Your Payment Summary",
//       description:
//         "Take a moment to review your payment details before finalizing the transaction.",
//       color: "bg-gradient-to-r from-green-500 to-lime-600",
//     },
//     {
//       step: 4,
//       icon: <BiTransfer className="w-8 h-8 text-white" />,
//       title: "Make a Bank Transfer Free",
//       description:
//         "Use the provided details to complete your transfer via your online banking platform.",
//       color: "bg-gradient-to-r from-orange-500 to-red-600",
//     },
//   ];

//   return (
//     <section className="relative py-16 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

//       <motion.div
//         className="container mx-auto px-4"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: true }}
//       >
//         {/* Heading */}
//         <motion.div className="text-center mb-12" variants={headingVariants}>
//           <span className="inline-block px-4 py-1.5 bg-gray-800 rounded-full text-sm font-semibold text-white tracking-wide shadow-lg shadow-pink-500/20">
//             Get Started
//           </span>
//           <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
//             Your Journey in{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
//               4 Simple Steps
//             </span>
//           </h1>
//           <p className="mt-2 text-lg text-gray-400">
//             Follow these steps to kickstart your experience with ease.
//           </p>
//         </motion.div>

//         {/* Vertical Timeline */}
//         <div className="relative max-w-3xl mx-auto">
//           {/* Timeline Line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-700 to-transparent" />

//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               className={`relative flex items-center mb-12 ${
//                 index % 2 === 0 ? "justify-start" : "justify-end"
//               }`}
//               variants={stepVariants}
//             >
//               {/* Card */}
//               <div
//                 className={`relative w-full max-w-md p-6 rounded-xl shadow-xl ${
//                   step.color
//                 } transform transition-all duration-300 hover:shadow-2xl hover:shadow-${
//                   step.color.split("-")[2]
//                 }-500/50 group`}
//               >
//                 {/* Step Number Circle */}
//                 <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold text-lg shadow-md">
//                   {step.step}
//                 </div>

//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="p-3 rounded-full bg-black/20 group-hover:bg-white/20 transition-colors">
//                     {step.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-white">
//                     {step.title}
//                   </h3>
//                   <p className="text-sm text-gray-100">{step.description}</p>
//                 </div>
//               </div>

//               {/* Connector Dot */}
//               <div
//                 className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${step.color} border-4 border-gray-900 shadow-lg`}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default GettingStartedSteps;



"use client"; // Add this for Framer Motion
import React from "react";
import { BiTransfer } from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdReceiptLong } from "react-icons/md";
import { motion } from "framer-motion"; // Import motion

// Interface for method data remains the same
interface Method {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}
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

// Variants for the heading block (fade in + slide down slightly)
const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Variants for the grid container (staggers the cards within)
const gridContainerVariants = {
  hidden: {}, // Visibility controlled by sectionVariants
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger each card's animation
      // Optional: delayChildren if needed after heading is fully done
      delayChildren: 0.3,
    },
  },
};

// Variants for each individual method card (fade in + scale up + gentle slide up)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85, // Start slightly smaller
    y: 60, // Start further down
  },
  visible: {
    opacity: 1,
    scale: 1, // Animate to full size
    y: 0, // Animate to final vertical position
    transition: {
      duration: 0.6, // Card animation duration
      ease: [0.4, 0, 0.2, 1], // Smooth custom cubic bezier
    },
  },
};

const GettingStartedSteps = () => {
  const methods: Method[] = [
    // Explicitly type the array
    {
      step: 1,
      icon: <FiEdit className=" lg:size-8 size-6 text-white dark:text-primary" />, // Adjusted size slightly
      title: "Enter Amount to Add Money",
      description:
        "In this step, you can securely enter the amount you wish to add to your account. Simply type in the desired value, ensuring it meets any applicable minimum or maximum limits.",
    },
    {
      step: 2,
      icon: <FaUniversity className=" lg:size-8 size-6 text-white dark:text-primary" />,
      title: "Choose a Payment Method",
      description:
        "In this step, select your preferred payment method to continue with the transaction. We offer a variety of secure and convenient options, including bank transfers.",
    },
    {
      step: 3,
      icon: <MdReceiptLong className=" lg:size-8 size-6 text-white dark:text-primary" />,
      title: "Review Your Payment Summary",
      description:
        "Before finalizing your transaction, take a moment to carefully review your payment summary. This section provides a clear breakdown of the amount you’re adding now's.",
    },
    {
      step: 4,
      icon: <BiTransfer className=" lg:size-8 size-6 text-white dark:text-primary" />,
      title: "Make a Bank Transfer Free",
      description:
        "Use the provided account details to complete your transfer. You can copy and paste the IBAN, reference code , and bank details to your online banking platform use money.",
    },
  ];

  return (
    // Add overflow-hidden to contain animations
    <section className="GettingStartedSection lg:py-10 py-5 bg-background overflow-hidden">
      {/* Wrap container with motion for triggering animations */}
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }} // Trigger once when 10% visible
      >
        {/* Heading section - Wrap with motion */}
        <motion.div
          className="text-center space-y-4"
          variants={headingVariants} // Apply heading animation
        >
          <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
            <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
              How it works?
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
            Just few
            <span className="text-primary"> steps to start</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
            It's easier than you think. Follow 4 simple easy steps
          </p>
        </motion.div>

        {/* Steps timeline container - Wrap grid with motion for staggering */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:mt-10 mt-5"
          variants={gridContainerVariants} // Apply grid variants (staggerChildren)
        >
          {methods.map((method, index) => (
            <motion.div
              key={index} // Key must be on the motion component
              variants={cardVariants} // Apply card animation variants
            >
              <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 border border-lightgray dark:border-primarybox">
                <div className="flex flex-col lg:items-center lg:text-center text-left space-y-4 h-full">
                  <div className="lg:size-14 size-12 rounded-full bg-secondarybox dark:bg-primarybox flex items-center justify-center">
                    {method.icon}
                  </div>
                  <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
                    {method.title}
                  </h3>
                  <p className="sm:text-base text-sm text-gray-500 dark:text-gray-300">
                    {method.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GettingStartedSteps;


