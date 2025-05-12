// "use client"; // <--- Add this line

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useAuth } from "@/app/contexts/AuthContext"; // <--- Import useAuth

// const RemittanceSection: React.FC = () => {
//   // Get user state from AuthContext
//   const { user } = useAuth();

//   // Determine button properties based on auth state
//   const buttonText = user ? "Send Money" : "Create A Free Account";
//   const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register"; // Link to register or send money flow

//   return (
//     <section className="lg:py-10 py-5 bg-white dark:bg-background px-4">
//       <div className="container mx-auto flex gap-6 flex-col md:flex-row items-center justify-end">
//         {/* Left Content Section */}
//         <div className="md:w-1/2 w-full text-center md:text-left space-y-2">
//           <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300 font-medium">
//             Send Money Across Borders with Confidence
//           </p>

//           {/* Main Heading */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//             Send Money Across
//             <span className="text-primary"> Borders with Confidence </span>
//           </h1>

//           {/* Description */}
//           <p className="text-sm md:text-lg text-gray-700  dark:text-gray-300">
//             Experience hassle-free money transfers to over 100 countries
//             worldwide. Whether you're supporting loved ones, paying bills, or
//             handling business payments, our platform ensures your money gets
//             where it needs to go—quickly and safely. With competitive exchange
//             rates, low fees, and 24/7 customer support, sending money has never
//             been this simple.
//           </p>

//           {/* Dynamic Button */}
//           <div className="flex justify-center md:justify-start">
//             <Link
//               href={buttonLink} // <-- Use dynamic link
//               className="inline-block mt-3"
//             >
//               <button className="bg-primary px-6 lg:py-3 py-2.5 lg:h-12.5 lg:text-base text-sm cursor-pointer hover:bg-primaryhover transition-colors ease-in-out duration-300 text-mainheading font-medium rounded-full">
//                 {buttonText} {/* <-- Use dynamic text */}
//               </button>
//             </Link>
//           </div>

//           {/* User avatars and star rating */}
//           <div className="flex items-center justify-center md:justify-start gap-2 mt-6">
//             {" "}
//             {/* Added justify-center for mobile */}
//             <div className="flex items-center -space-x-2">
//               {/* Kept only a few images for brevity, add back as needed */}
//               <Image
//                 src="/assets/images/user1.png"
//                 width={40} // Consistent smaller size
//                 height={40}
//                 alt="User avatar 1"
//                 className="rounded-full md:size-10 size-8 border-2 border-white"
//               />
//               <Image
//                 src="/assets/images/user2.png"
//                 width={40}
//                 height={40}
//                 alt="User avatar 2"
//                 className="rounded-full md:size-10 size-8 border-2 border-white"
//               />
//               <Image
//                 src="/assets/images/user3.png"
//                 width={40}
//                 height={40}
//                 alt="User avatar 3"
//                 className="rounded-full md:size-10 size-8 border-2 border-white"
//               />
//               <Image
//                 src="/assets/images/Lisa-Carter.jpg"
//                 width={40}
//                 height={40}
//                 alt="User avatar 4"
//                 className="rounded-full md:size-10 size-8 border-2 border-white"
//               />
//               <Image
//                 src="/assets/images/Emily.jpg"
//                 width={40}
//                 height={40}
//                 alt="User avatar 5"
//                 className="rounded-full md:size-10 size-8 border-2 border-white"
//               />
//             </div>
//             {/* Star rating and user count */}
//             <p className="font-normal text-mainheading lg:text-base text-xs dark:text-white capitalize">
//               <span className="text-primary font-bold"> 500K+ </span> People
//               already trusted us.
//             </p>
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="md:w-1/2 w-full flex justify-center mt-5 md:-mt-5">
//           {" "}
//           {/* Added margin-top for mobile */}
//           <Image
//             src="/assets/images/secure.svg" // Assuming this is the correct secure transfer image
//             width={500} // Adjust width/height as needed for responsiveness
//             height={500}
//             alt="Secure money transfer illustration"
//             className="lg:h-full h-64" // Adjust classes for desired size
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RemittanceSection;

// RemittanceSection.tsx
"use client"; // <--- Add this line

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"; // Import motion
import { useAuth } from "@/app/contexts/AuthContext";

// --- Animation Variants ---

// Variants for the overall container (mainly for triggering children)
const containerVariants = {
  hidden: {}, // No initial animation for the container itself
  visible: {
    transition: {
      // Optional: stagger children if needed later
      staggerChildren: 0.1,
    },
  },
};

// Variants for the left content block (slide in from left + fade)
const leftContentVariants = {
  hidden: { opacity: 0, x: -100 }, // Start off-screen left and invisible
  visible: {
    opacity: 1,
    x: 0, // Animate to original position and full opacity
    transition: {
      duration: 0.8, // Slightly longer duration for smoothness
      ease: "easeOut", // Smooth easing
    },
  },
};

// Variants for the right image block (slide in from right + fade + slight scale)
const rightImageVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 }, // Start off-screen right, slightly smaller, invisible
  visible: {
    opacity: 1,
    x: 0, // Animate to original position
    scale: 1, // Animate to full size
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.15, // Start slightly after the left content
    },
  },
};

const CrossBorderMoneyTransfer: React.FC = () => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Send Money" : "Create A Free Account";
  const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register";

  return (
    // Add overflow-hidden to prevent scrollbars during animation
    <section className="CrossBorderMoneyTransferSection lg:py-10 py-5 bg-white dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Wrap the main flex container with motion for triggering */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
        >
          {/* Left Content Section - Wrap with motion */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={leftContentVariants} // Apply left slide animation
            // Inherits trigger from parent motion.div
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Secure Global Money Transfers You Can Trust
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Send Money Across
                <span className="text-primary"> Borders with Confidence </span>
              </h1>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                Experience hassle-free money transfers to over 100 countries
                worldwide. Whether you're supporting loved ones, paying bills,
                or handling business payments, our platform ensures your money
                gets where it needs to go—quickly and safely. With competitive
                exchange rates, low fees, and 24/7 customer support, sending
                money has never been this simple.
              </p>

              {/* Dynamic Button */}
              <div className="flex justify-center md:justify-start">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>

              {/* User avatars and star rating */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-6">
                <div className="flex items-center -space-x-2">
                  <Image
                    src="/assets/images/user1.png"
                    width={40}
                    height={40}
                    alt="User avatar 1"
                    className="rounded-full size-10 border-2 border-white"
                  />
                  <Image
                    src="/assets/images/user2.png"
                    width={40}
                    height={40}
                    alt="User avatar 2"
                    className="rounded-full size-10 border-2 border-white"
                  />
                  <Image
                    src="/assets/images/user3.png"
                    width={40}
                    height={40}
                    alt="User avatar 3"
                    className="rounded-full size-10 border-2 border-white"
                  />
                  <Image
                    src="/assets/images/Lisa-Carter.jpg"
                    width={40}
                    height={40}
                    alt="User avatar 4"
                    className="rounded-full size-10 border-2 border-white"
                  />
                  <Image
                    src="/assets/images/Emily.jpg"
                    width={40}
                    height={40}
                    alt="User avatar 5"
                    className="rounded-full size-10 border-2 border-white"
                  />
                </div>

                <p className="font-normal text-neutral-900 lg:text-base text-sm dark:text-white capitalize">
                  <span className="text-primary font-bold"> 500K+ </span> People
                  already trusted us.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Section - Wrap with motion */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={rightImageVariants} 
          >
            <div className="relative xl:aspect-[3/2] lg:aspect-square sm:aspect-[3/2] aspect-square overflow-hidden">
              <Image
                src="/assets/images/Business-vision-amico-light.svg"
                fill
                alt="Secure money transfer illustration"
                className="object-contain block dark:hidden"
                priority 
              />

              {/* Dark Mode Image */}
              <Image
                src="/assets/images/Business-vision-amico-dark.svg"
                fill
                alt="Secure money transfer illustration"
                className="object-contain hidden dark:block"
                priority 
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CrossBorderMoneyTransfer;
