// import React from "react";
// import Image from "next/image";

// const RightChoiceSection: React.FC = () => {
//   return (
//     <section className="lg:py-10 py-5 bg-white dark:bg-background px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center">
//           <div className="lg:w-1/2 w-full lg:order-1 order-2 flex justify-center">
//             <Image
//               alt="image"
//               src="/assets/images/right-choice-Illus.webp"
//               width={600}
//               height={600}
//               className="lg:h-full lg:w-2/3 w-full size-76" // Equivalent to max-un class to remove max-width
//             />
//           </div>

//           <div className="lg:w-1/2 w-full lg:order-2 order-1">
//             <div className="top-section md:text-left text-center space-y-2.5">
//               <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300 font-medium">
//                 {/* Example sub-title styling */}
//                 Learn why Wise is the right choice for you
//               </p>

//               {/* title */}
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Send money from
//                 <span className="text-primary"> the comfort of home.</span>
//               </h1>

//               <p className="text-gray-700 lg:text-lg text-sm dark:text-gray-300">
//                 Send money from the comfort of your home with ease and
//                 confidence. Our fast and secure online transfer service allows
//                 you to send funds to your loved ones anytime, anywhere—no need
//                 to visit a physical location. Whether it's for family support,
//                 emergency needs, or personal transactions, we make the process
//                 simple, transparent, and reliable.
//               </p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RightChoiceSection;

// RightChoiceSection.tsx
"use client"; // Add this for Framer Motion

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion

// --- Animation Variants ---

// Variant for the main section container (controls triggering)
const sectionVariants = {
  hidden: {}, // No initial animation needed for the container itself
  visible: {
    transition: {
      // Optional: Delay children slightly after container enters view
      delayChildren: 0.1,
      // Optional: Stagger children if needed, but delay works well here
      staggerChildren: 0.2,
    },
  },
};

// Variant for the Image (Left side on large screens)
// Unique animation: Gentle scale-up, fade-in, and slight slide from left
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85, // Start smaller
    x: -80, // Start slightly to the left
  },
  visible: {
    opacity: 1,
    scale: 1, // Animate to full size
    x: 0, // Animate to original horizontal position
    transition: {
      duration: 0.9, // Slightly longer duration for a smoother feel
      ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic bezier for a nice bounce/overshoot effect
      // Example alternative: ease: "easeOut"
    },
  },
};

// Variant for the Text Content (Right side on large screens)
// Unique animation: Fade-in with a staggered slide-up effect for each text element (more complex)
// Simpler approach shown here: Fade-in and slide from right for the whole block
const textBlockVariants = {
  hidden: {
    opacity: 0,
    x: 80, // Start slightly to the right
  },
  visible: {
    opacity: 1,
    x: 0, // Animate to original horizontal position
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2, // Delay slightly after the image starts animating
    },
  },
};

const ComfortSendMoney: React.FC = () => {
  return (
    // Add overflow-hidden to contain animations
    <section className="ComfortSendMoneySection lg:py-10 py-5 bg-white dark:bg-background overflow-hidden">
      {/* Wrap container with motion for triggering */}
      <motion.div
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image Area - Wrap with motion */}
          <motion.div
            className="w-full lg:w-1/2 lg:order-1 order-2"
            variants={imageVariants} // Apply image animation
            // Inherits trigger from parent
          >
            <div className="relative xl:aspect-[3/2] lg:aspect-square sm:aspect-[3/2] aspect-square overflow-hidden">
              <Image
                alt="Woman smiling and using a laptop for easy money transfers" // More descriptive alt text
                src="/assets/images/Sponsor-amico-light.svg"
                fill
                className="object-contain block dark:hidden"
                priority // Consider adding priority if often above the fold
              />
              <Image
                alt="Woman smiling and using a laptop for easy money transfers" // More descriptive alt text
                src="/assets/images/Sponsor-amico-dark.svg"
                fill
                className="object-contain hidden dark:block"
                priority // Consider adding priority if often above the fold
              />
            </div>
          </motion.div>

          {/* Text Content Area - Wrap with motion */}
          <motion.div
            className="lg:w-1/2 w-full lg:order-2 order-1"
            variants={textBlockVariants} // Apply text block animation
            // Inherits trigger from parent
          >
            <div className="top-section space-y-4 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Convenient Home-Based Money Transfers
                </span>
              </div>

              {/* title */}
              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Send money from
                <span className="text-primary"> the comfort of home.</span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                Send money from the comfort of your home with ease and
                confidence. Our fast and secure online transfer service allows
                you to send funds to your loved ones anytime, anywhere—no need
                to visit a physical location. Whether it's for family support,
                emergency needs, or personal transactions, we make the process
                simple, transparent, and reliable.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ComfortSendMoney;
