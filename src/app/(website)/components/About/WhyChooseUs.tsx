// // XeFeaturesSection.tsx
// "use client"; // Add this for Framer Motion client-side hooks

// import React, { JSX } from "react";
// import { BsCashStack, BsEmojiSmile } from "react-icons/bs";
// import { FaGlobe } from "react-icons/fa6";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { motion } from "framer-motion"; // Import motion

// // Interface for the feature data structure
// interface FeatureItem {
//   title: string;
//   description: string;
//   icons: JSX.Element;
// }

// // Array containing the data for the feature boxes
// const featuresData: FeatureItem[] = [
//   {
//     title: "Global reach",
//     description:
//       "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
//     icons: <FaGlobe className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Transparent prices",
//     description:
//       "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
//     icons: <BsCashStack className="size-6 lg:size-8 text-primary" />,
//   },
//   {
//     title: "Fast Money transfers",
//     description:
//       "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
//     icons: <RiMoneyDollarCircleLine className="size-6 lg:size-8 text-primary" />,
//   },
// ];

// // --- Animation Variants ---

// // Variant for the main section container to control overall triggering and stagger children
// const sectionVariants = {
//   hidden: {}, // No initial visual state needed for the container itself
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the animation of direct children (heading container and grid container)
//     },
//   },
// };

// // Variant for the heading section (fade in + slight slide down)
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

// // Variant for the grid container (to stagger the cards inside)
// const gridContainerVariants = {
//   hidden: {}, // No initial visual state needed
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the animation of each card
//       delayChildren: 0.2, // Small delay after the heading likely appears
//     },
//   },
// };

// // Variant for each individual feature card (fade + scale + slide up)
// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9, // Start slightly smaller
//     y: 50, // Start 50px down
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     y: 0, // Animate to original vertical position
//     transition: {
//       duration: 0.5, // Animation duration for each card
//       ease: "easeOut", // Smooth easing
//     },
//   },
// };

// // --- Component ---
// const WhyChooseUs: React.FC = () => {
//   return (
//     // Add overflow-hidden to prevent scrollbars during card animation
//     <section className="WhyChooseUsSection md:py-20 py-5 overflow-hidden">
//       {/* Wrap the main container with motion to trigger animations on view */}
//       <motion.div
//         className="mx-auto container px-4"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.1, once: true }} // Trigger when 10% visible, run only once
//       >
//         {/* Heading Section - Wrap with motion */}
//         <motion.div
//           className="mx-auto max-w-2xl text-center space-y-4"
//           variants={headingVariants} // Apply heading animation
//           // Inherits trigger from parent motion.div
//         >
//           <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheadingWhite uppercase">
//             Find out why
//             <span className="text-primary">millions choose Remityn</span>
//           </h1>

//           <p className="lg:text-lg text-base text-subheadingWhite">
//             For over 10 years, Remityn Corporation Inc. customers have been
//             trusting us to manage and send international money transfers. It's
//             what we do.
//           </p>
//         </motion.div>

//         {/* Features Grid - Wrap grid container with motion for staggering cards */}
//         <motion.div
//           className="lg:mt-20 mt-10 flex gap-6"
//           variants={gridContainerVariants} // Apply grid container variants (staggerChildren)
//           // Inherits trigger from parent motion.div
//         >
//           {featuresData.map((feature) => (
//             // Wrap EACH feature card with motion
//             <motion.div
//               key={feature.title} // Key goes on the motion component
//               variants={cardVariants} // Apply card animation variants
//               // Individual card timing controlled by parent's staggerChildren
//               className="sm:p-6 p-4 text-center space-y-6"
//             >
//               {/* Icon */}
//               <div className="flex justify-center">
//                 <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
//                   <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
//                     {feature.icons}
//                   </div>
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl text-mainheadingWhite font-semibold">
//                 {feature.title}
//               </h3>

//               {/* Description */}
//               <p className="text-subheadingWhite lg:text-lg text-base">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default WhyChooseUs;

// XeFeaturesSection.tsx
"use client"; // This can be kept or removed, doesn't strictly affect functionality without client-side hooks like motion

import React, { JSX } from "react";
import { BsCashStack, BsEmojiSmile } from "react-icons/bs"; // BsEmojiSmile is imported but not used, can be removed if not needed elsewhere
import { FaGlobe } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

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
    icons: <FaGlobe className="size-6 lg:size-8 text-primary" />,
  },
  {
    title: "Transparent prices",
    description:
      "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
    icons: <BsCashStack className="size-6 lg:size-8 text-primary" />,
  },
  {
    title: "Fast Money transfers",
    description:
      "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
    icons: (
      <RiMoneyDollarCircleLine className="size-6 lg:size-8 text-primary" />
    ),
  },
];

// --- Component ---
const WhyChooseUs: React.FC = () => {

  const currentProducts = featuresData;


  return (
    // Add overflow-hidden to prevent scrollbars during card animation (can be kept or removed based on static layout needs)
    <section className="WhyChooseUsSection md:py-20 py-5 overflow-hidden ">
      <div className="mx-auto container px-4">
        {/* Heading Section */}
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl capitalize font-bold mb-6 leading-tight text-mainheadingWhite">
            Find out why{" "}
            <span className="text-primary">millions choose Remityn</span>
          </h1>

          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
            For over 10 years, Remityn Corporation Inc. Trusted by travelers and
            expats worldwide, Remityn offers fast, secure, and affordable money
            transfers—anytime, anywhere. Join the global community that moves
            money with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:mt-25 mt-16" // Added flex-col for small screens, md:flex-row for medium and up
        >
          {featuresData.map((product, index) => {
            const isLast = index === currentProducts.length - 1;
            let conditionalClasses = "";

            if (!isLast) {
              // Original border and padding logic for non-last items
              conditionalClasses =
                "lg:border-r border-r-gray-600/50 lg:border-b-0 border-b border-b-gray-600/50 lg:pr-10 lg:pb-0 pb-10";
            } else {
              if (
                currentProducts.length === 1 ||
                currentProducts.length % 2 !== 0
              ) {
                conditionalClasses = "sm:col-span-2 lg:col-span-1"; // lg:col-span-1 ensures it takes 1/3 on large screens
              } else {
                conditionalClasses = "lg:col-span-1";
              }
            }

            return (
            <div
              key={index} // Key goes on the outer div
              className={`text-center space-y-6${conditionalClasses ? ' ' + conditionalClasses.trim() : ''}`}// Added md:w-1/3 for equal width on medium screens and up
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full icon-outer-wrapper flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full icon-inner-background flex items-center justify-center">
                    {product.icons}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl text-mainheadingWhite font-semibold">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-subheadingWhite lg:text-lg text-base">
                {product.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
