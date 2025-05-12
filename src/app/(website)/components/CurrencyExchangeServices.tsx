// import Image from "next/image";
// import React from "react";

// interface EasymoneyProps {}

// const Easymoney: React.FC<EasymoneyProps> = () => {
//   return (
//     <section className="bg-white dark:bg-background lg:py-10 py-5 px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <div className="lg:space-y-4 space-y-2 text-center md:text-left w-full md:w-1/2 lg:order-2 order-1">
//             <p className="font-semibold uppercase tracking-wider text-xs md:text-base text-gray-700 dark:text-gray-300">
//               Our mission
//             </p>

//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-mainheading dark:text-white">
//               Trusted & Transparent Currency &nbsp;
//               <span className="text-primary">Exchange Services Worldwide </span>
//             </h1>

//             <p className="text-gray-700 dark:text-gray-300 md:text-lg text-base">
//               We provide fast, secure, and transparent currency exchange
//               services to individuals and businesses across the globe—offering
//               competitive rates and reliable support you can count on.
//             </p>
//           </div>

//           <div className="w-full md:w-1/2 md:mt-8 mt-0 lg:order-1 order-2">
//             <div className="relative rounded-2xl overflow-hidden border group transition-all duration-500">
//               <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-lime-400/30 z-10"></div>
//               {/* Image with aspect ratio */}
//               <div className="relative aspect-[3/2] overflow-hidden">
//                 <Image
//                   src="/assets/images/mobile.webp"
//                   alt="about misson image"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Easymoney;

// Easymoney.tsx
"use client"; // <--- Add this line

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; // Import motion

interface CurrencyExchangeServicesProps {}

// --- Animation Variants (Copied from AboutSection) ---

// Variants for the parent container (optional, mainly for triggering)
const containerVariants = {
  hidden: {}, // No visual change for the container itself initially
  visible: {
    // Target state for children when container is in view
    transition: {
      // Optional: Add staggerChildren if you had more elements to animate sequentially
      // staggerChildren: 0.2,
    },
  },
};

// Variants for sliding in from the left
const leftBlockVariants = {
  hidden: { opacity: 0, x: -80 }, // Start off-screen left, invisible
  visible: {
    opacity: 1,
    x: 0, // Animate to original position, fully visible
    transition: {
      duration: 0.7, // Animation duration
      ease: "easeOut", // Animation easing function
    },
  },
};

// Variants for sliding in from the right
const rightBlockVariants = {
  hidden: { opacity: 0, x: 80 }, // Start off-screen right, invisible
  visible: {
    opacity: 1,
    x: 0, // Animate to original position, fully visible
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.1, // Optional: Slight delay after the other side starts
    },
  },
};

const CurrencyExchangeServices: React.FC<CurrencyExchangeServicesProps> = () => {
  return (
    // Keep overflow-hidden on the main section wrapper
    <section className="CurrencyExchangeServicesSection bg-white dark:bg-background lg:py-10 py-5 overflow-hidden">
      <div className="container mx-auto  px-4">
        {/* Wrap the flex container with motion */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
        >
          {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2) */}
          {/* Apply RIGHT slide animation */}
          <motion.div
            className="w-full lg:w-1/2 lg:order-2 order-1"
            variants={rightBlockVariants} // Slide in from right
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Our mission
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Trusted & Transparent Currency  
                <span className="text-primary">
                  Exchange Services Worldwide{" "}
                </span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                We provide fast, secure, and transparent currency exchange
                services to individuals and businesses across the globe—offering
                competitive rates and reliable support you can count on.
              </p>
            </div>
          </motion.div>

          {/* Image Area - Appears on the LEFT on large screens (lg:order-1) */}
          {/* Apply LEFT slide animation */}
          <motion.div
            className="w-full lg:w-1/2 lg:order-1 order-2"
            variants={leftBlockVariants} // Slide in from left
          >
            <div className="relative rounded-2xl overflow-hidden border group transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-lime-400/30 z-10"></div>
              {/* Image with aspect ratio */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/assets/images/mobile.webp"
                  alt="about mission image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrencyExchangeServices;
