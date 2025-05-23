// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// // Import the image correctly
// import { FaLock } from "react-icons/fa6";
// import { FaShieldAlt, FaUniversity } from "react-icons/fa";

// const SecuritySection = () => {
//   return (
//     <section className="Security-section md:py-10 py-5 bg-white dark:bg-background px-4">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="w-full md:w-3/5 order-2 md:order-1">
//             <div className="mb-10">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//                 Secure Currency Exchange
//                 <span className="text-primary"> You Can Trust </span>
//               </h1>

//               <p className="lg:text-lg sm:text-base text-sm text-gray-700 leading-relaxed dark:text-gray-300 mt-5">
//                 Experience fast, reliable, and secure currency exchange with
//                 full transparency and top-level protection for your
//                 money—trusted by thousands worldwide
//               </p>
//             </div>
//             <div>
//               <Link
//                 href="/faqs"
//                 className="bg-primary rounded-full px-6 md:py-3 py-2.5 lg:h-12.5 lg:text-lg text-sm hover:bg-primaryhover text-mainheading font-medium cursor-pointer transition-colors duration-300 ease-in-out"
//               >
//                 <button className="text-mainheading font-medium">
//                   How we keep your money safe
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center">
//             <Image
//               src="/assets/images/secure.svg"
//               alt="Padlock symbolizing security"
//               width={500}
//               height={500}
//               className="md:w-[300px] w-[250px] lg:w-[400px] h-auto md:mb-0 mb-5"
//               priority
//             />
//           </div>
//         </div>

//         <div className="mt-10">
//           <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-8">
//             <div className="space-y-4">
//               <div className="size-12 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
//                 <FaLock className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300 leading-relaxed">
//                   We use 256-bit encryption to protect your data and
//                   transactions—just like the biggest banks
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
//                 <FaShieldAlt className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
//                   Real-time monitoring detects suspicious activity instantly to
//                   stop fraud before it happens.
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center">
//                 <FaUniversity className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
//                   Your money is stored with top-tier, FDIC-insured partner banks
//                   for added security.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SecuritySection

// // components/SecuritySection.tsx
// "use client"; // Required for Framer Motion

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion"; // Import motion
// import { FaLock, FaShieldAlt, FaUniversity } from "react-icons/fa"; // Corrected FaLock import path if needed

// // Animation Variants

// // For the main text content on the left
// const textVariants = {
//   hidden: { opacity: 0, x: -100 }, // Start invisible and 100px to the left
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position
//     transition: {
//       duration: 0.7, // Animation duration
//       ease: "easeOut", // Animation easing
//       delay: 0.2, // Small delay after section enters view
//     },
//   },
// };

// // For the image on the right
// const imageVariants = {
//   hidden: { opacity: 0, x: 100 }, // Start invisible and 100px to the right
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//       delay: 0.3, // Slightly later delay than text
//     },
//   },
// };

// // Container for the bottom feature cards (to control staggering)
// const featuresContainerVariants = {
//   hidden: {}, // No initial state needed for container itself
//   visible: {
//     transition: {
//       delayChildren: 0.5, // Start animating cards after top elements are likely in view
//       staggerChildren: 0.2, // Delay between each card animation
//     },
//   },
// };

// // For each individual feature card at the bottom
// const featureCardVariants = {
//   hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original position
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// const SecuritySection = () => {
//   return (
//     // Apply whileInView to the main section to trigger animations
//     <motion.section
//       className="Security-section md:py-10 py-5 bg-white dark:bg-background px-4 overflow-hidden" // Hide horizontal overflow during animation
//       id="security" // Added an ID for potential linking
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ amount: 0.2, once: false }} // Trigger when 20% visible, animate every time
//     >
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           {/* Left Text Block */}
//           <motion.div
//             className="w-full md:w-3/5 order-2 md:order-1"
//             variants={textVariants} // Apply text animation variants
//             // Inherits initial/whileInView timing from parent section
//           >
//             <div className="mb-10">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//                 Secure Currency Exchange
//                 <span className="text-primary"> You Can Trust </span>
//               </h1>

//               <p className="lg:text-lg sm:text-base text-sm text-gray-700 leading-relaxed dark:text-gray-300 mt-5">
//                 Experience fast, reliable, and secure currency exchange with
//                 full transparency and top-level protection for your
//                 money—trusted by thousands worldwide
//               </p>
//             </div>
//             <div>
//               <Link
//                 href="/faqs"
//                 className="bg-primary rounded-full px-6 md:py-3 py-2.5 lg:h-12.5 lg:text-lg text-sm hover:bg-primaryhover text-mainheading font-medium cursor-pointer transition-colors duration-300 ease-in-out inline-block" // Added inline-block
//               >
//                 {/* Button tag removed, Link acts as the button */}
//                 How we keep your money safe
//               </Link>
//             </div>
//           </motion.div>

//           {/* Right Image Block */}
//           <motion.div
//             className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center"
//             variants={imageVariants} // Apply image animation variants
//             // Inherits initial/whileInView timing from parent section
//           >
//             <Image
//               src="/assets/images/secure.svg"
//               alt="Padlock symbolizing security"
//               width={500}
//               height={500}
//               className="md:w-[300px] w-[250px] lg:w-[400px] h-auto md:mb-0 mb-5"
//               priority
//             />
//           </motion.div>
//         </div>

//         {/* Bottom Feature Cards Section */}
//         <motion.div
//           className="mt-10"
//           variants={featuresContainerVariants} // Apply container variants for staggering
//           // Inherits initial/whileInView timing from parent section
//         >
//           <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-8">
//             {/* Feature Card 1 */}
//             <motion.div
//               className="space-y-4"
//               variants={featureCardVariants} // Apply individual card variants
//               // Timing controlled by parent's staggerChildren
//             >
//               <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
//                 <FaLock className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300 leading-relaxed">
//                   We use 256-bit encryption to protect your data and
//                   transactions—just like the biggest banks
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 2 */}
//             <motion.div
//               className="space-y-4"
//               variants={featureCardVariants} // Apply individual card variants
//             >
//               <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center ">
//                 <FaShieldAlt className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
//                   Real-time monitoring detects suspicious activity instantly to
//                   stop fraud before it happens.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Feature Card 3 */}
//             <motion.div
//               className="space-y-4"
//               variants={featureCardVariants} // Apply individual card variants
//             >
//               <div className="lg:p-3 p-2.5 bg-gray dark:bg-white/5 dark:text-primary text-white rounded-full inline-flex items-center">
//                 <FaUniversity className="lg:size-8 size-6" aria-hidden="true" />
//               </div>
//               <div>
//                 <p className="font-medium lg:text-lg text-base text-gray-700 dark:text-gray-300">
//                   Your money is stored with top-tier, FDIC-insured partner banks
//                   for added security.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };
// export default SecuritySection;

// components/SecuritySection.tsx
"use client"; // Required for Framer Motion

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion
import { FaLock, FaShieldAlt, FaUniversity } from "react-icons/fa"; // Corrected FaLock import path if needed

// Animation Variants

// For the main text content on the left
const textVariants = {
  hidden: { opacity: 0, x: -100 }, // Start invisible and 100px to the left
  visible: {
    opacity: 1,
    x: 0, // Animate to original position
    transition: {
      duration: 0.7, // Animation duration
      ease: "easeOut", // Animation easing
      delay: 0.2, // Small delay after section enters view
    },
  },
};

// For the image on the right
const imageVariants = {
  hidden: { opacity: 0, x: 100 }, // Start invisible and 100px to the right
  visible: {
    opacity: 1,
    x: 0, // Animate to original position
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.3, // Slightly later delay than text
    },
  },
};

// Container for the bottom feature cards (to control staggering)
const featuresContainerVariants = {
  hidden: {}, // No initial state needed for container itself
  visible: {
    transition: {
      delayChildren: 0.5, // Start animating cards after top elements are likely in view
      staggerChildren: 0.2, // Delay between each card animation
    },
  },
};

// For each individual feature card at the bottom
const featureCardVariants = {
  hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
  visible: {
    opacity: 1,
    y: 0, // Animate to original position
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SecuritySection = () => {
  return (
    // Apply whileInView to the main section to trigger animations
    <motion.section
      className="Security-section md:py-10 py-5 bg-white dark:bg-background overflow-hidden" // Hide horizontal overflow during animation
      id="security"
      initial="hidden"
      whileInView="visible"
      // viewport={{ amount: 0.2, once: false }} // <-- OLD: Animate every time
      viewport={{ amount: 0.2, once: true }} // <-- NEW: Trigger when 20% visible, animate ONLY ONCE
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text Block */}
          <motion.div
            className="w-full lg:w-1/2 order-2 md:order-1"
            variants={textVariants} // Apply text animation variants
            // Inherits initial/whileInView timing from parent section
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Built for safety. Trusted worldwide
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Secure Currency Exchange
                <span className="text-primary"> You Can Trust </span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                Experience fast, secure, and reliable currency exchange services
                you can trust. With competitive exchange rates, no hidden fees,
                and end-to-end encryption, your transactions are protected at
                every step. Join thousands of satisfied customers who rely on us
                for transparent service, real-time updates, and 24/7 support.
                Your money, your way—safe, simple, and secure.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link
                  href="/faqs"
                  className="inline-block" // Added inline-block
                >
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    How we keep your money safe
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Image Block */}
          <motion.div
            className="w-full lg:w-1/2 order-1 md:order-2"
            variants={imageVariants} // Apply image animation variants
          >
            <div className="relative xl:aspect-[3/2] lg:aspect-square sm:aspect-[3/2] aspect-square overflow-hidden">
              <Image
                src="/assets/images/secure.svg"
                fill
                alt="Padlock symbolizing security"
                className="object-contain"
              />

              
            </div>


          </motion.div>
        </div>

        {/* Bottom Feature Cards Section */}
        <motion.div
          className="mt-10"
          variants={featuresContainerVariants} // Apply container variants for staggering
          // Inherits initial/whileInView timing from parent section
        >
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {/* Feature Card 1 */}
            <motion.div
              className="lg:space-y-3 space-y-2.5"
              variants={featureCardVariants} // Apply individual card variants
            >
              <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center ">
                <FaLock className="lg:size-8 size-6 text-neutral-900 dark:text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="sm:text-lg text-base text-gray-500 dark:text-gray-300">
                  We use 256-bit encryption to protect your data and
                  transactions — the same standard trusted by leading global
                  banks. Your information stays confidential and secure at every
                  step.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              className="lg:space-y-3 space-y-2.5"
              variants={featureCardVariants} // Apply individual card variants
            >
              <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center ">
                <FaShieldAlt className="lg:size-8 size-6 text-neutral-900 dark:text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="sm:text-lg text-base text-gray-500 dark:text-gray-300">
                  Our intelligent monitoring systems track every transaction in
                  real-time to instantly detect and stop suspicious activity —
                  keeping you safe from fraud before it happens.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              className="lg:space-y-3 space-y-2.5"
              variants={featureCardVariants} // Apply individual card variants
            >
              <div className="lg:size-14 size-12 bg-lightgray dark:bg-primarybox dark:text-primary text-neutral-900 rounded-full flex items-center justify-center">
                <FaUniversity className="lg:size-8 size-6 text-neutral-900 dark:text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="sm:text-lg text-base text-gray-500 dark:text-gray-300">
                  Your money is held with top-tier, FDIC-insured banking
                  partners to ensure maximum protection and peace of mind — even
                  in the rarest events.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default SecuritySection;
