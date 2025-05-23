// import React, { JSX } from "react";
// import { BsCashStack, BsEmojiSmile } from "react-icons/bs";
// import { FaGlobe } from "react-icons/fa6";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";

// // Define an interface for the feature data structure for type safety
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: JSX.Element; // <--- Changed type from string to JSX.Element
// }

// // Array containing the data for the feature boxes
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global reach",
//     description:
//       "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
//     icons: <FaGlobe />,
//   },
//   {
//     title: "Transparent prices",
//     description:
//       "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
//     icons: <BsCashStack />,
//   },
//   {
//     title: "Fast Money transfers",
//     description:
//       "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
//     icons: <RiMoneyDollarCircleLine />,
//   },
//   {
//     title: "Easy to use",
//     description:
//       "Our app and website are designed with your financial needs in mind. Our currency tools and resources assist you in managing your money. Need extra help? Our customer service team is here to support you.",
//     icons: <BsEmojiSmile />,
//   },
// ];

// const XeFeaturesSection: React.FC = () => {
//   return (
//     // Added dummy class names for styling context, replace with your actual ones
//     <div className="bg-white dark:bg-background px-4 lg:py-10 py-5">
//       <div className="mx-auto container max-w-5xl">
//         <div className="mx-auto max-w-2xl text-center lg:space-y-6 space-y-4">
//           <h2 className="text-3xl sm:text-5xl lg:text-6xl capitalize font-black text-mainheading dark:text-white">
//             Find out why &nbsp;
//             <span className="text-primary">millions choose Apexture</span>
//           </h2>

//           <p className="lg:text-lg text-base text-gray-700 dark:text-gray-300">
//             For over 10 years, Apexture Corporation Inc. customers have been
//             trusting us to manage and send international money transfers. It's
//             what we do.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="lg:mt-10 mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {featuresData.map((feature) => (
//             <div
//               key={feature.title}
//               // Added some potential styling classes
//               className="bg-white dark:bg-white/5 shadow-md border rounded-lg lg:p-6 p-4 lg:space-y-4 space-y-2.5 h-full transition-shadow duration-300"
//             >
//               {/* Ensure text-mainheading works correctly, consider icon size */}
//               <div className="bg-primary p-2 rounded-full inline-block">
//                 <span className="text-mainheading text-2xl flex items-center justify-center lg:size-8 size-6">
//                   {feature.icons}
//                 </span>
//               </div>
//               <h3 className="lg:text-xl text-lg font-medium dark:text-primary text-mainheading capitalize">
//                 {feature.title}
//               </h3>
//               <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default XeFeaturesSection;

// XeFeaturesSection.tsx
"use client"; // Add this for Framer Motion client-side hooks

import React, { JSX } from "react";
import { BsCashStack, BsEmojiSmile } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion"; // Import motion

// Interface for the feature data structure
interface FeatureItem {
  title: string;
  description: string;
  icons: JSX.Element;
}

// Array containing the data for the feature boxes
const featuresData: FeatureItem[] = [
  {
    title: "Global reach",
    description:
      "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
    icons: <FaGlobe className="size-6 lg:size-8"/>,
  },
  {
    title: "Transparent prices",
    description:
      "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
    icons: <BsCashStack className="size-6 lg:size-8"/>,
  },
  {
    title: "Fast Money transfers",
    description:
      "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
    icons: <RiMoneyDollarCircleLine className="size-6 lg:size-8"/>,
  },
  {
    title: "Easy to use",
    description:
      "Our app and website are designed with your financial needs in mind. Our currency tools and resources assist you in managing your money. Need extra help? Our customer service team is here to support you.",
    icons: <BsEmojiSmile className="size-6 lg:size-8"/>,
  },
];

// --- Animation Variants ---

// Variant for the main section container to control overall triggering and stagger children
const sectionVariants = {
  hidden: {}, // No initial visual state needed for the container itself
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger the animation of direct children (heading container and grid container)
    },
  },
};

// Variant for the heading section (fade in + slight slide down)
const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Variant for the grid container (to stagger the cards inside)
const gridContainerVariants = {
  hidden: {}, // No initial visual state needed
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger the animation of each card
      delayChildren: 0.2, // Small delay after the heading likely appears
    },
  },
};

// Variant for each individual feature card (fade + scale + slide up)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9, // Start slightly smaller
    y: 50, // Start 50px down
  },
  visible: {
    opacity: 1,
    scale: 1, // Animate to full size
    y: 0, // Animate to original vertical position
    transition: {
      duration: 0.5, // Animation duration for each card
      ease: "easeOut", // Smooth easing
    },
  },
};

// --- Component ---
const WhyChooseUs: React.FC = () => {
  return (
    // Add overflow-hidden to prevent scrollbars during card animation
    <section className="WhyChooseUsSection bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
      {/* Wrap the main container with motion to trigger animations on view */}
      <motion.div
        className="mx-auto container px-4 max-w-5xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }} // Trigger when 10% visible, run only once
      >
        {/* Heading Section - Wrap with motion */}
        <motion.div
          className="mx-auto max-w-2xl text-center space-y-4"
          variants={headingVariants} // Apply heading animation
          // Inherits trigger from parent motion.div
        >
          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
            Find out why 
            <span className="text-primary">millions choose Remityn</span>
          </h1>

          <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300">
            For over 10 years, Remityn Corporation Inc. customers have been
            trusting us to manage and send international money transfers. It's
            what we do.
          </p>
        </motion.div>

        {/* Features Grid - Wrap grid container with motion for staggering cards */}
        <motion.div
          className="lg:mt-10 mt-5 grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={gridContainerVariants} // Apply grid container variants (staggerChildren)
          // Inherits trigger from parent motion.div
        >
          {featuresData.map((feature) => (
            // Wrap EACH feature card with motion
            <motion.div
              key={feature.title} // Key goes on the motion component
              variants={cardVariants} // Apply card animation variants
              // Individual card timing controlled by parent's staggerChildren
              className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 lg:space-y-4 space-y-2.5 h-full"
            >
              {/* Icon */}
              <div className=" lg:size-14 size-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-neutral-900">
                  {feature.icons}
                </span>
              </div>
              {/* Title */}
              <h3 className="sm:text-xl text-lg font-medium dark:text-white text-neutral-900 capitalize">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="sm:text-lg text-base text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
