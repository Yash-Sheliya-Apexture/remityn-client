// // import Image from "next/image";
// // import Link from "next/link";
// // import React from "react";

// // const GetStartedSection: React.FC = () => {
// //   return (
// //     <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
// //       <section className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative">
// //         <div className="grid grid-cols-1">
// //           <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
// //             <div className="space-y-2 text-white lg:mb-0 lg:ml-8 ml-6 text-left">
// //               <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
// //                 Ready to <br />
// //                 <span className="text-primary">get started? </span>
// //               </h1>

// //               <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
// //                 Open your free Wise account in just minutes—fast, secure, and
// //                 ready when you are.
// //               </p>

// //               <Link
// //                 className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
// //                 href="/auth/register"
// //               >
// //                 Open an Account
// //               </Link>
// //             </div>

// //             <Image
// //               src="/assets/images/get-start.png"
// //               width={500}
// //               height={500}
// //               className="absolute xl:size-[450px] -bottom-5 right-0 lg:block hidden"
// //               alt="Picture of the author"
// //             />
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default GetStartedSection;

// "use client"; // <--- Add this line to make it a Client Component

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useAuth } from "@/app/contexts/AuthContext"; // <--- Import useAuth (adjust path if needed)

// const GetStartedSection: React.FC = () => {
//   // Get user state from AuthContext
//   const { user } = useAuth();

//   // Determine button properties based on auth state
//   const buttonText = user ? "Go to Dashboard" : "Open an Account"; // Or "Send Money" if preferred when logged in
//   const buttonLink = user ? "/dashboard" : "/auth/register";     // Link to dashboard or registration

//   return (
//     <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
//       {/* Main section container with background and rounded corners */}
//       <section className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative"> {/* Added overflow-hidden */}
//         <div className="grid grid-cols-1">
//           <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left z-10 relative"> {/* Added z-10 and relative */}
//             {/* Text and Button Content */}
//             <div className="space-y-4 lg:space-y-6 text-white lg:mb-0 lg:ml-8 ml-6 text-left px-4 lg:px-0"> {/* Added padding for mobile */}
//               <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Ready to <br />
//                 <span className="text-primary">get started? </span>
//               </h1>

//               <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
//                 {user
//                   ? "Manage your transfers, recipients, and balances easily from your dashboard." // Text for logged-in users
//                   : "Open your free Wise account in just minutes—fast, secure, and ready when you are." // Text for logged-out users
//                 }
//               </p>

//               {/* Dynamic Link/Button */}
//               <Link
//                 href={buttonLink} // <-- Use dynamic link
//                 className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
//               >
//                 {buttonText} {/* <-- Use dynamic text */}
//               </Link>
//             </div>

//             {/* Image - positioned absolutely */}
//             {/* Ensure the parent 'section' has relative positioning */}
//             <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-end justify-center mt-8 lg:mt-0 pointer-events-none"> {/* Container for positioning */}
//                <Image
//                  src="/assets/images/get-start.png" // Ensure this image exists
//                  width={600} // Adjust as needed
//                  height={600} // Adjust as needed
//                  className="lg:absolute lg:-bottom-12 lg:right-0 w-[300px] h-auto md:w-[400px] xl:w-[550px] lg:w-auto lg:h-auto" // Adjusted sizes and positioning
//                  alt="Get started illustration"
//                  style={{ objectFit: 'contain' }} // Ensure image scales nicely
//                />
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default GetStartedSection;

// "use client"; // Make it a Client Component

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { motion } from "framer-motion"; // Import motion
// import { useAuth } from "@/app/contexts/AuthContext";

// // --- Animation Variants ---

// // Variant for the main section container (controls triggering)
// const sectionVariants = {
//   hidden: {}, // No animation needed for the container itself
//   visible: {
//     transition: {
//       // Optional: slight delay before children start after triggering
//       // delayChildren: 0.1,
//       // Optional: stagger children if needed, but delay works well here
//       // staggerChildren: 0.2,
//     },
//   },
// };

// // Variant for the Left Text/Button Content (Slide from left + Fade)
// const leftContentVariants = {
//   hidden: {
//     opacity: 0,
//     x: -100, // Start 100px to the left
//   },
//   visible: {
//     opacity: 1,
//     x: 0, // Animate to original horizontal position
//     transition: {
//       duration: 0.8, // Animation duration
//       ease: "easeOut", // Smooth easing
//     },
//   },
// };

// // Variant for the Right Image (Slide from bottom + Fade)
// const imageVariants = {
//   hidden: {
//     opacity: 0,
//     y: 150, // Start 150px below its final position
//   },
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to its final vertical position (y=0 relative to its container)
//     transition: {
//       duration: 1.0, // Slightly longer for a more noticeable effect
//       ease: [0.4, 0, 0.2, 1], // Custom cubic bezier for smooth acceleration/deceleration
//       delay: 0.2, // Delay start slightly after text content
//     },
//   },
// };

// const GetStartedSection: React.FC = () => {
//   // Get user state from AuthContext
//   const { user } = useAuth();

//   // Determine button properties based on auth state
//   const buttonText = user ? "Go to Dashboard" : "Open an Account";
//   const buttonLink = user ? "/dashboard" : "/auth/register";

//   return (
//     <div className="px-4 bg-white dark:bg-background lg:py-10 py-5">
//       {/* Main section container with background and rounded corners */}
//       {/* Apply motion here to control when children animate */}
//       <motion.section
//         className="bg-lightgray dark:bg-white/5 rounded-2xl container mx-auto lg:py-10 py-5 relative overflow-hidden" // Keep overflow-hidden and relative
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
//       >
//         <div className="grid grid-cols-1">
//           {/* Flex container for layout */}
//           <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left z-10 relative">
//             {/* Text and Button Content - Wrap with motion */}
//             <motion.div
//               className="space-y-4 lg:space-y-6 text-white lg:mb-0 lg:ml-8 ml-6 text-left px-4 lg:px-0"
//               variants={leftContentVariants} // Apply left content animation
//               // Inherits trigger from parent motion.section
//             >
//               <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-mont text-mainheading dark:text-white uppercase">
//                 Ready to <br />
//                 <span className="text-primary">get started? </span>
//               </h1>

//               <p className="md:text-lg text-mainheading dark:text-white text-sm max-w-lg ">
//                 {user
//                   ? "Manage your transfers, recipients, and balances easily from your dashboard."
//                   : "Open your free Wise account in just minutes—fast, secure, and ready when you are."}
//               </p>

//               {/* Dynamic Link/Button */}
//               <Link
//                 href={buttonLink}
//                 className="inline-block bg-primary hover:bg-primaryhover text-mainheading font-medium lg:py-3 py-2.5 px-6 lg:text-lg text-sm rounded-full transition-colors duration-300"
//               >
//                 {buttonText}
//               </Link>
//             </motion.div>

//             {/* Image Container - Wrap with motion */}
//             {/* This wrapper handles positioning and animation */}
//             <motion.div
//               className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-end justify-center mt-8 lg:mt-0 pointer-events-none"
//               variants={imageVariants} // Apply image animation
//               // Inherits trigger from parent motion.section
//             >
//               <Image
//                 src="/assets/images/get-start.png"
//                 width={600}
//                 height={600}
//                 // Removed absolute positioning from image itself, handled by wrapper
//                 className="lg:absolute lg:-bottom-14 lg:right-0 w-[300px] h-auto md:w-[400px] xl:w-[500px] lg:w-auto lg:h-auto" // Allow image to potentially overflow slightly at bottom during anim
//                 alt="Get started illustration - Person using laptop" // Improved alt text
//                 style={{ objectFit: "contain" }}
//                 priority // Consider adding priority if high on page
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default GetStartedSection;



"use client"; // Make it a Client Component

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"; // Import motion
import { useAuth } from "@/app/contexts/AuthContext";

// --- Animation Variants ---

// Variant for the main section container (controls triggering)
const sectionVariants = {
  hidden: {}, // No animation needed for the container itself
  visible: {
    transition: {
      // Optional: slight delay before children start after triggering
      delayChildren: 0.1,
      // Optional: stagger children if needed, but delay works well here
      staggerChildren: 0.2,
    },
  },
};

// Variant for the Left Text/Button Content (Slide from left + Fade)
const leftContentVariants = {
  hidden: {
    opacity: 0,
    x: -100, // Start 100px to the left
  },
  visible: {
    opacity: 1,
    x: 0, // Animate to original horizontal position
    transition: {
      duration: 0.8, // Animation duration
      ease: "easeOut", // Smooth easing
    },
  },
};

// Variant for the Right Image (Slide from bottom + Fade)
const imageVariants = {
  hidden: {
    opacity: 0,
    y: 150, // Start 150px below its final position
  },
  visible: {
    opacity: 1,
    y: 0, // Animate to its final vertical position (y=0 relative to its container)
    transition: {
      duration: 1.0, // Slightly longer for a more noticeable effect
      ease: [0.4, 0, 0.2, 1], // Custom cubic bezier for smooth acceleration/deceleration
      delay: 0.2, // Delay start slightly after text content
    },
  },
};

const GetStartedSection: React.FC = () => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Go to Dashboard" : "Open an Account";
  const buttonLink = user ? "/dashboard" : "/auth/register";

  return (
    <section className="GetStartedSection bg-white dark:bg-background lg:py-10 py-5">
      {/* Main section container with background and rounded corners */}
      {/* Apply motion here to control when children animate */}
      <div className="container mx-auto px-4">
        <motion.section
          className="bg-lightgray dark:bg-primarybox rounded-3xl lg:py-10 py-5 relative" // Keep overflow-hidden and relative
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
        >
          <div className="grid grid-cols-1">
            {/* Flex container for layout */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-center lg:text-left z-10 relative">
              {/* Text and Button Content - Wrap with motion */}
              <motion.div
                className="space-y-4 text-white lg:mb-0 lg:ml-8 ml-0 lg:text-left text-center px-4 lg:px-0"
                variants={leftContentVariants} // Apply left content animation
                // Inherits trigger from parent motion.section
              >
                <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                  Ready to <br />
                  <span className="text-primary">get started? </span>
                </h1>

                <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-lg ">
                  {user
                    ? "Manage your transfers, recipients, and balances easily from your dashboard."
                    : "Open your free Wise account in just minutes—fast, secure, and ready when you are."}
                </p>

                {/* Dynamic Link/Button */}
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </motion.div>

              {/* Image Container - Wrap with motion */}
              {/* This wrapper handles positioning and animation */}
              <motion.div
                className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-end justify-center mt-8 lg:mt-0 pointer-events-none"
                variants={imageVariants} // Apply image animation
                // Inherits trigger from parent motion.section
              >
                <Image
                  src="/assets/images/get-start.png"
                  width={600}
                  height={600}
                  // Removed absolute positioning from image itself, handled by wrapper
                  className="lg:absolute lg:-bottom-12 lg:right-0 w-[300px] h-auto md:w-[400px] xl:w-[550px] lg:w-auto lg:h-auto" // Allow image to potentially overflow slightly at bottom during anim
                  alt="Get started illustration - Person using laptop" // Improved alt text
                  style={{ objectFit: "contain" }}
                  priority // Consider adding priority if high on page
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default GetStartedSection;
