// // frontend/src/components/AboutSection.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const rightBlockVariants = {
//   hidden: { opacity: 0, x: 100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const TrustedCurrencyPartner = () => {
//   return (
//     <section
//       className="TrustedCurrencySection md:py-20 py-5 overflow-hidden"
//       id="about-us"
//     >
//       <div className="container mx-auto px-4">
//         <motion.div
//           className="flex flex-col lg:flex-row items-center gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2, once: true }}
//         >
//           <motion.div
//             className="w-full lg:w-1/2 order-2 lg:order-1"
//             variants={leftBlockVariants}
//           >
//             <div className="space-y-4 text-center lg:text-left">
//               <div className="inline-block">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> About us{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>

//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//                   Exchange with Confidence,{" "}
//                   <span className="text-primary">Worldwide</span>
//                 </h2>

//                 <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//                   At Remityn, Experience seamless and secure currency exchange
//                   services no matter where you are. Whether you're traveling for
//                   business or leisure, our trusted global network ensures fast,
//                   transparent, and competitive rates—without hidden fees. Join
//                   thousands of satisfied customers who rely on us for safe,
//                   reliable money exchange solutions across borders.
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

//           <motion.div
//             className="w-full lg:w-1/2 order-1 md:order-2"
//             variants={rightBlockVariants}
//           >
//             <div className="relative w-full flex justify-center">
//               <Image
//                 src="/assets/images/TrustedPartner.png"
//                 width={550}
//                 height={800}
//                 alt="Person smiling while using a laptop and wearing headphones"
//                 className="object-contain rounded-3xl"
//                 priority
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TrustedCurrencyPartner;



// frontend/src/components/AboutSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrustedCurrencyPartner = () => {
  return (
    <section
      className="TrustedCurrencySection sm:py-16 py-10 overflow-hidden"
      id="about-us"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 order-2 md:order-1">
            <div className="space-y-4 text-center md:text-left">
              <div className="sm:inline-block hidden">
                <span className="text-subheadingWhite font-medium text-sm uppercase">
                  <span className="text-subheadingWhite/30">[</span> About us{" "}
                  <span className="text-subheadingWhite/30">]</span>
                </span>
              </div>

              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite sm:block hidden">
                  Exchange with Confidence,{" "}
                  <span className="text-primary">Worldwide</span>
                </h2>

                <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
                  At Remityn, Experience seamless and secure currency exchange
                  services no matter where you are. Whether you're traveling for
                  business or leisure, our trusted global network ensures fast,
                  transparent, and competitive rates—without hidden fees. Join
                  thousands of satisfied customers who rely on us for safe,
                  reliable money exchange solutions across borders.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-8">
                <Link href="/auth/register" className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-mainheading cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    Create A Free Account
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:order-2 order-1">
            <div className="sm:hidden block">
              <span className="text-subheadingWhite font-medium text-sm mb-1 text-center md:text-left block uppercase">
                <span className="text-subheadingWhite/30">[</span> About us
                <span className="text-subheadingWhite/30">]</span>
              </span>
              <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
                  Exchange with Confidence{" "}
                  <span className="text-primary">Worldwide</span>
                </h3>
              </div>
            </div>

            <div className="relative w-full flex justify-center">
              <Image
                src="/assets/images/TrustedPartner.png"
                width={550}
                height={800}
                alt="Person smiling while using a laptop and wearing headphones"
                className="object-contain rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCurrencyPartner;
