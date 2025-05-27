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

const SecuritySection = () => {
  return (
    // Apply whileInView to the main section to trigger animations
    <section
      className="Security-section md:py-20 py-5 overflow-hidden" // Hide horizontal overflow during animation
      id="security"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Text Block */}
          <div
            className="w-full lg:w-1/2 order-2 md:order-1"
            // Inherits initial/whileInView timing from parent section
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="sm:inline-block hidden">
                <span className="text-subheadingWhite font-medium text-sm uppercase">
                  <span className="text-subheadingWhite/30">[</span> Built for
                  safety. Trusted worldwide{" "}
                  <span className="text-subheadingWhite/30">]</span>
                </span>
              </div>
              
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                  Secure Currency Exchange{" "}
                  <span className="text-primary">You Can Trust</span>
                </h3>
                <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
                  Exchange currency with confidence—fast, secure, and
                  dependable. Enjoy competitive rates, zero hidden fees, and
                  complete encryption for peace of mind at every step. Thousands
                  trust us for our transparency, real-time tracking, and
                  round-the-clock support. Your money, your rules—simple, safe,
                  and always secure.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-start mt-8">
                <Link
                  href="/faqs"
                  className="inline-block" // Added inline-block
                >
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    How we keep your money safe
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="w-full lg:w-1/2 order-1 md:order-2">
            <div className="sm:hidden block">
                <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
                  <span className="text-subheadingWhite/30">[</span> Built for
                  safety. Trusted worldwide{" "}
                  <span className="text-subheadingWhite/30">]</span>
                </span>
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Secure Currency Exchange{" "}
                  <span className="text-primary">You Can Trust</span>
                </h3>
              </div>
            </div>
            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/eretrtgcbvcb.png"
                width={550}
                height={800}
                alt="Padlock symbolizing security"
                className="object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecuritySection;
