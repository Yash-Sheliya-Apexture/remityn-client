// // frontend/src/components/Easymoney.tsx
// "use client";

// import Image from "next/image";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// interface CurrencyExchangeServicesProps {}

// // --- Animation Variants (Copied and adapted from AboutSection.tsx logic) ---
// const containerVariants = {
//   hidden: {}, // No visual change for the container itself initially
//   visible: {
//     transition: {
//       staggerChildren: 0.2, // Children will animate sequentially
//     },
//   },
// };

// // Variants for sliding in from the left (for the image)
// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -100 }, // Start off-screen left, invisible
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position, fully visible
//     transition: {
//       duration: 0.7, // Animation duration
//       ease: "easeOut", // Animation easing function
//     },
//   },
// };

// // Variants for sliding in from the right (for the text content)
// const rightBlockVariants = {
//   hidden: { opacity: 0, x: 100 }, // Start off-screen right, invisible
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original position, fully visible
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//       // The staggerChildren in containerVariants will handle the delay
//     },
//   },
// };

// const CurrencyExchangeServices: React.FC<
//   CurrencyExchangeServicesProps
// > = () => {
//   return (
//     <section className="CurrencyExchangeServicesSection md:py-20 py-5 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <motion.div
//           className="flex flex-col lg:flex-row items-center gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
//         >
//           {/* Image Area - Appears on the LEFT on large screens (lg:order-1), FIRST on small screens (order-1) */}
//           <motion.div
//             className="w-full lg:w-1/2 order-1 md:order-1" // Image first on SM, left on LG
//             variants={leftBlockVariants} // Slide in from left
//           >
//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/women.png" // Original image path
//                 alt="Currency exchange services illustration" // Updated alt text for clarity
//                 width={550}
//                 height={800}
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>
//           </motion.div>

//           {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2), SECOND on small screens (order-2) */}
//           <motion.div
//             className="w-full lg:w-1/2 order-2 lg:order-2" // Text second on SM, right on LG
//             variants={rightBlockVariants} // Slide in from right
//           >
//             <div className="space-y-4 text-center lg:text-left">
//               <div className="inline-block">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> Our mission{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Empowering Transparent{" "}
//                   <span className="text-primary">Global Exchange</span>
//                 </h2>

//                 <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//                   We are committed to making global currency exchange simple and
//                   clear. Our platform ensures transparency with honest rates and
//                   no hidden fees. Trust and reliability are at the heart of
//                   every transaction we facilitate. We empower travelers and
//                   businesses to exchange money confidently worldwide. With us,
//                   your currency exchange experience is secure, fast, and
//                   hassle-free.
//                 </p>
//               </div>

//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link href="/auth/register" className="inline-block">
//                   <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     Create A Free Account
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CurrencyExchangeServices;

// frontend/src/components/Easymoney.tsx
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

interface CurrencyExchangeServicesProps {}

const CurrencyExchangeServices: React.FC<
  CurrencyExchangeServicesProps
> = () => {
  return (
    <section className="CurrencyExchangeServicesSection sm:py-16 py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image Area - Appears on the LEFT on large screens (lg:order-1), FIRST on small screens (order-1) */}
          <div
            className="w-full lg:w-1/2 lg:order-1 order-2" // Image first on SM, left on LG
          >
            <div className="sm:hidden block">
              <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
                <span className="text-subheadingWhite/30">[</span> Our mission
                <span className="text-subheadingWhite/30">]</span>
              </span>
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Empowering Transparent{" "}
                  <span className="text-primary"> lobal Exchange</span>
                </h3>
              </div>
            </div>

            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/women.png" // Original image path
                alt="Currency exchange services illustration" // Updated alt text for clarity
                width={550}
                height={800}
                className="object-contain rounded-3xl"
                priority
              />
            </div>

            <div className="block md:hidden">
              <p className="text-subheadingWhite md:text-lg text-base max-w-5xl pt-8 text-center">
                We are committed to making global currency exchange simple and
                clear. Our platform ensures transparency with honest rates and
                no hidden fees. Trust and reliability are at the heart of every
                transaction we facilitate. We empower travelers and businesses
                to exchange money confidently worldwide. With us, your currency
                exchange experience is secure, fast, and hassle-free.
              </p>

              <div className="flex justify-center md:justify-start mt-8">
                <Link href="/auth/register" className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    Create A Free Account
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Text Content Area - Appears on the RIGHT on large screens (lg:order-2), SECOND on small screens (order-2) */}
          <div
            className="w-full lg:w-1/2 lg:order-2 order-1 hidden md:block" // Text second on SM, right on LG
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="sm:inline-block hidden">
                <span className="text-subheadingWhite font-medium text-sm uppercase">
                  <span className="text-subheadingWhite/30">[</span> Our mission
                  <span className="text-subheadingWhite/30">]</span>
                </span>
              </div>

              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                  Empowering Transparent{" "}
                  <span className="text-primary">Global Exchange </span>
                </h3>
                <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
                  We are committed to making global currency exchange simple and
                  clear. Our platform ensures transparency with honest rates and
                  no hidden fees. Trust and reliability are at the heart of
                  every transaction we facilitate. We empower travelers and
                  businesses to exchange money confidently worldwide. With us,
                  your currency exchange experience is secure, fast, and
                  hassle-free.
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start mt-8">
              <Link href="/auth/register" className="inline-block">
                <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                  Create A Free Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyExchangeServices;
