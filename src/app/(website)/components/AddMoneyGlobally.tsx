// "use client";

// import React from "react"; // useState is no longer needed
// // Link is removed as it wasn't used
// import { useAuth } from "@/app/contexts/AuthContext";
// import {
//   // FaArrowRight is removed as it wasn't used
//   FaShieldAlt,
//   FaGlobeAmericas,
//   FaClock,
// } from "react-icons/fa";
// import Image from "next/image";

// const HeroAddMoney: React.FC = () => {
//   const { user } = useAuth();

//   const benefits = [
//     { icon: <FaGlobeAmericas />, text: "50+ countries supported" },
//     { icon: <FaShieldAlt />, text: "Bank-level security" },
//     { icon: <FaClock />, text: "24/7 transfers money" },
//   ];

//   // Example of a simple navigation function you could add to the button's onClick:
//   const handleButtonClick = () => {
//     if (user) {
//       // Example: Navigate to a generic add money page if logged in
//       window.location.href = `/dashboard/add-money`;
//     } else {
//       // Example: Navigate to registration with 'add' intent if logged out
//       window.location.href = `/auth/register?intent=add`;
//     }
//   };

//   return (
//     <section className="relative lg:py-10 py-5 bg-white dark:bg-background overflow-hidden px-4">
//       <div className="max-w-8xl container mx-auto relative z-10">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           {/* Left Content Area */}
//           <div className="lg:w-1/2 text-white lg:space-y-4 space-y-2">
//             <p className="md:text-sm text-xs inline-block px-4 py-1.5 dark:bg-primary rounded-full bg-lightgray text-mainheading font-medium">
//               Trusted by over 3M+ customers worldwide
//             </p>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               Add Money Globally
//               <span className="text-primary"> With Just A Few Clicks </span>
//             </h1>

//             <p className="lg:text-lg text-sm text-gray-700 dark:text-gray-300">
//               Easily fund your wallet from anywhere in the world using secure
//               and instant payment methods. Whether you're transferring from a
//               bank, using a card, or sending via UPI, our platform makes it
//               simple, fast, and reliable — no borders, no hassle.
//             </p>

//             {/* Added onClick handler to the button */}
//             <button
//               onClick={handleButtonClick} // Added onClick
//               className="bg-primary rounded-full hover:bg-primaryhover cursor-pointer duration-300 mt-2 ease-in-out lg:text-base text-sm text-mainheading font-medium px-6 lg:py-3 py-2.5 lg:h-12.5"
//             >
//               {user ? "Add Money Now" : "Create a Account"}
//             </button>

//             <div className="flex lg:flex-row flex-col flex-wrap lg:gap-6 gap-4 lg:mt-0">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-center lg:text-base text-sm gap-2">
//                   <span className="dark:text-primary text-gray">
//                     {benefit.icon}
//                   </span>
//                   <span className="text-mainheading dark:text-white font-medium text-sm sm:text-base">
//                     {benefit.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Form Area */}
//           <div className="lg:w-5/12 w-full mt-10 lg:mt-0 flex justify-center">
//             <Image
//               src="/assets/images/secure.svg"
//               alt="Padlock symbolizing security"
//               width={500}
//               height={500}
//               priority
//               className="lg:h-full h-64"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroAddMoney;

// "use client"; // Make it a Client Component

// import React from "react";
// import { motion } from "framer-motion"; // Import motion
// import { useAuth } from "@/app/contexts/AuthContext";
// import { FaShieldAlt, FaGlobeAmericas, FaClock } from "react-icons/fa";
// import Image from "next/image";

// // --- Animation Variants ---

// // Variant for the main section container (controls triggering and overall sequence)
// const sectionVariants = {
//   hidden: {}, // No animation needed for the container itself
//   visible: {
//     transition: {
//       // Stagger direct children: Left container and Right container
//       staggerChildren: 0.2,
//     },
//   },
// };

// // Variant for the Left Content container (controls staggering of elements within it)
// const leftContainerVariants = {
//   hidden: {}, // Parent controls visibility trigger
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the text elements, button, benefits
//       delayChildren: 0.1, // Small delay after section becomes visible
//     },
//   },
// };

// // Variant for individual text elements, button, and benefits (fade + gentle slide up)
// const textElementVariants = {
//   hidden: {
//     opacity: 0,
//     y: 25, // Start slightly lower
//   },
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original position
//     transition: {
//       duration: 0.6, // Smooth duration
//       ease: "easeOut", // Standard smooth easing
//     },
//   },
// };

// // Variant for the Right Image (fade + scale + gentle rotation reveal)
// const rightImageVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.85, // Start slightly smaller
//     rotate: -8, // Start slightly rotated counter-clockwise
//   },
//   visible: {
//     opacity: 1,
//     scale: 1, // Animate to full size
//     rotate: 0, // Animate to straight rotation
//     transition: {
//       duration: 0.9, // Make it feel substantial
//       ease: [0.4, 0, 0.2, 1], // Smooth cubic bezier for a refined feel
//       // Example alternative: ease: "circOut"
//     },
//   },
// };

// const HeroAddMoney: React.FC = () => {
//   const { user } = useAuth();

//   const benefits = [
//     { icon: <FaGlobeAmericas />, text: "50+ countries supported" },
//     { icon: <FaShieldAlt />, text: "Bank-level security" },
//     { icon: <FaClock />, text: "24/7 transfers money" },
//   ];

//   const handleButtonClick = () => {
//     if (user) {
//       window.location.href = `/dashboard/add-money`;
//     } else {
//       window.location.href = `/auth/register?intent=add`;
//     }
//   };

//   return (
//     // Add overflow-hidden to the parent section
//     <section className="relative lg:py-10 py-5 bg-white dark:bg-background overflow-hidden px-4">
//       {/* Wrap the container with motion to trigger animations */}
//       <motion.div
//         className="max-w-8xl container mx-auto relative z-10"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.15, once: true }} // Trigger when 15% visible, run once
//       >
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           {/* Left Content Area - Wrap with motion for staggering internal elements */}
//           <motion.div
//             className="lg:w-1/2 text-white lg:space-y-4 space-y-2"
//             variants={leftContainerVariants} // This will stagger its children
//             // Inherits initial/visible trigger from parent
//           >
//             {/* Apply animation to each element */}
//             <motion.p
//               variants={textElementVariants}
//               className="md:text-sm text-xs inline-block px-4 py-1.5 dark:bg-primary rounded-full bg-lightgray text-mainheading font-medium"
//             >
//               Trusted by over 3M+ customers worldwide
//             </motion.p>

//             <motion.h1
//               variants={textElementVariants}
//               className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight"
//             >
//               Add Money Globally
//               <span className="text-primary"> With Just A Few Clicks </span>
//             </motion.h1>

//             <motion.p
//               variants={textElementVariants}
//               className="lg:text-lg text-sm text-gray-700 dark:text-gray-300"
//             >
//               Easily fund your wallet from anywhere in the world using secure
//               and instant payment methods. Whether you're transferring from a
//               bank, using a card, or sending via UPI, our platform makes it
//               simple, fast, and reliable — no borders, no hassle.
//             </motion.p>

//             <motion.button
//               variants={textElementVariants}
//               onClick={handleButtonClick}
//               className="bg-primary rounded-full hover:bg-primaryhover cursor-pointer duration-300 mt-2 ease-in-out lg:text-base text-sm text-mainheading font-medium px-6 lg:py-3 py-2.5 lg:h-12.5"
//             >
//               {user ? "Add Money Now" : "Create a Account"}
//             </motion.button>

//             {/* Wrap benefits container for animation */}
//             <motion.div
//               variants={textElementVariants} // Animate the whole block together after button
//               className="flex lg:flex-row flex-col flex-wrap lg:gap-6 gap-4 pt-4" // Added pt-4 for spacing
//             >
//               {benefits.map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center lg:text-base text-sm gap-2"
//                 >
//                   <span className="dark:text-primary text-gray">
//                     {benefit.icon}
//                   </span>
//                   <span className="text-mainheading dark:text-white font-medium text-sm sm:text-base">
//                     {benefit.text}
//                   </span>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right Image Area - Wrap with motion */}
//           <motion.div
//             className="lg:w-5/12 w-full mt-10 lg:mt-0 flex justify-center"
//             variants={rightImageVariants} // Apply image reveal animation
//             // Inherits initial/visible trigger from parent
//           >
//             <Image
//               src="/assets/images/secure.svg"
//               alt="Padlock symbolizing secure money adding" // Improved alt text
//               width={500}
//               height={500}
//               priority
//               className="lg:h-full h-64"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroAddMoney;



// "use client"; // Make it a Client Component
// import React from "react";
// import { motion } from "framer-motion"; // Import motion
// import { useAuth } from "@/app/contexts/AuthContext";
// import { FaShieldAlt, FaGlobeAmericas, FaClock } from "react-icons/fa";
// import Image from "next/image";

// // --- NEW Animation Variants ---

// // Variant for the main section container (controls triggering and overall sequence)
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger left and right main sections
//     },
//   },
// };

// // Variant for the Left Content container (controls sequence within the left side)
// const leftContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger elements like badge, title, p, button, benefits group
//     },
//   },
// };

// // Variant for the Badge (Quick Fade)
// const badgeVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.4, ease: "linear" } },
// };

// // Variant for the Headline (Slide in from left, slight skew correction)
// const headingVariants = {
//   hidden: {
//     opacity: 0,
//     x: -100, // Start further left
//     // skewX: -8, // Optional: slight initial skew
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     // skewX: 0, // Correct skew
//     transition: {
//       duration: 0.8,
//       ease: [0.25, 0.46, 0.45, 0.94], // Smooth custom ease
//     },
//   },
// };

// // Variant for Paragraph (Fade in, slide up)
// const paragraphVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// // Variant for Button (Scale up + Fade in)
// const buttonVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.4,
//       ease: [0.6, -0.05, 0.01, 0.99], // Spring-like ease
//     },
//   },
// };

// // Variant for the Benefits container (staggers individual benefits)
// const benefitsContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger each benefit item
//     },
//   },
// };

// // Variant for each Benefit Item (Fade in + slight scale)
// const benefitItemVariants = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   },
// };

// // Variant for the Right Image (Clip-path reveal + Fade)
// const rightImageVariants = {
//   hidden: {
//     opacity: 0,
//     // Start clipped from the right edge (reveals left-to-right)
//     clipPath: "inset(0 100% 0 0)",
//   },
//   visible: {
//     opacity: 1,
//     // Animate to full visibility (no clipping)
//     clipPath: "inset(0 0% 0 0)",
//     transition: {
//       duration: 1.1, // Make reveal smooth and noticeable
//       ease: [0.22, 1, 0.36, 1], // Smooth ease-out style cubic bezier
//     },
//   },
// };

// const HeroAddMoney: React.FC = () => {
//   const { user } = useAuth();

//   const benefits = [
//     { icon: <FaGlobeAmericas />, text: "10+ countries supported" },
//     { icon: <FaShieldAlt />, text: "Bank-level security" },
//     { icon: <FaClock />, text: "24/7 transfers money" },
//   ];

//   const handleButtonClick = () => {
//     if (user) {
//       window.location.href = `/dashboard/add-money`;
//     } else {
//       window.location.href = `/auth/register?intent=add`;
//     }
//   };

//   return (
//     // Keep overflow-hidden
//     <section className="relative lg:py-10 py-5 bg-white dark:bg-background overflow-hidden px-4">
//       {/* Main Trigger Container */}
//       <motion.div
//         className="max-w-8xl container mx-auto relative z-10"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.15, once: true }}
//       >
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           {/* Left Content Area - Stagger Container */}
//           <motion.div
//             className="lg:w-1/2 text-white lg:space-y-4 space-y-2"
//             variants={leftContainerVariants} // Staggers children
//           >
//             {/* Apply specific variants to each child */}
//             <motion.p
//               variants={badgeVariants}
//               className="md:text-sm text-xs inline-block px-4 py-1.5 dark:bg-primary rounded-full bg-lightgray text-mainheading font-medium"
//             >
//               Trusted by 50K customers worldwide
//             </motion.p>

//             <motion.h1
//               variants={headingVariants}
//               className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight"
//             >
//               Add Money Globally
//               <span className="text-primary"> With Just A Few Clicks </span>
//             </motion.h1>

//             <motion.p
//               variants={paragraphVariants}
//               className="lg:text-lg text-sm text-gray-700 dark:text-gray-300"
//             >
//               Easily fund your wallet from anywhere in the world using secure
//               and instant payment methods. Whether you're transferring from a
//               bank, using a card, or sending via UPI, our platform makes it
//               simple, fast, and reliable — no borders, no hassle.
//             </motion.p>

//             <motion.button
//               variants={buttonVariants}
//               onClick={handleButtonClick}
//               className="bg-primary rounded-full hover:bg-primaryhover cursor-pointer duration-300 mt-2 ease-in-out lg:text-base text-sm text-mainheading font-medium px-6 lg:py-3 py-2.5 lg:h-12.5"
//             >
//               {user ? "Add Money Now" : "Create a Account"}
//             </motion.button>

//             {/* Benefits Container - Staggers individual benefits */}
//             <motion.div
//               variants={benefitsContainerVariants}
//               className="flex lg:flex-row flex-col flex-wrap lg:gap-6 gap-4 pt-4" // Added pt-4
//             >
//               {benefits.map((benefit, index) => (
//                 // Apply animation to each benefit item
//                 <motion.div
//                   key={index}
//                   variants={benefitItemVariants}
//                   className="flex items-center lg:text-base text-sm gap-2"
//                 >
//                   <span className="dark:text-primary text-gray">
//                     {benefit.icon}
//                   </span>
//                   <span className="text-mainheading dark:text-white font-medium text-sm sm:text-base">
//                     {benefit.text}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right Image Area - Wrap with motion */}
//           <motion.div
//             className="lg:w-5/12 w-full mt-10 lg:mt-0 flex lg:justify-start justify-center"
//             variants={rightImageVariants} // Apply image reveal animation
//           >
//             <Image
//               src="/assets/images/Refund-pana-light.svg"
//               alt="Padlock symbolizing secure money adding"
//               width={600}
//               height={600}
//               priority
//               className="lg:h-full h-64 block dark:hidden"
//             />
//             <Image
//               src="/assets/images/Refund-pana-dark.svg"
//               alt="Padlock symbolizing secure money adding"
//               width={600}
//               height={600}
//               priority
//               className="lg:h-full h-64 hidden dark:block"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroAddMoney;





"use client"; // Make it a Client Component
import React from "react";
import { motion } from "framer-motion"; // Import motion
import { useAuth } from "@/app/contexts/AuthContext";
import { FaShieldAlt, FaGlobeAmericas, FaClock } from "react-icons/fa";
import Image from "next/image";

// --- NEW Animation Variants ---

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

// Variant for the Right Image (Clip-path reveal + Fade)
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

// Variant for the Benefits container (staggers individual benefits)
const benefitsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger each benefit item
    },
  },
};

// Variant for each Benefit Item (Fade in + slight scale)
const benefitItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const AddMoneyGlobally: React.FC = () => {
  const { user } = useAuth();

  const benefits = [
    { icon: <FaGlobeAmericas className="size-5"/>, text: "10+ countries supported" },
    { icon: <FaShieldAlt className="size-5"/>, text: "Bank-level security" },
    { icon: <FaClock className="size-5"/>, text: "24/7 transfers money" },
  ];

  const handleButtonClick = () => {
    if (user) {
      window.location.href = `dashboard/add-money/select-balance`;
    } else {
      window.location.href = `/auth/register?intent=add`;
    }
  };

  return (
    // Keep overflow-hidden
    <section className="AddMoneyGloballySection relative lg:py-10 py-5 bg-white dark:bg-background overflow-hidden">
      {/* Main Trigger Container */}
      <div className="container mx-auto relative px-4 z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }} // Trigger once when 20% visible
        >
          {/* Left Content Area - Stagger Container */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={leftContentVariants} // Staggers children
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
                <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                  Effortless Global Money Top-Ups in Seconds
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Add Money Globally
                <span className="text-primary"> With Just A Few Clicks </span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                Easily fund your wallet from anywhere in the world using secure
                and instant payment methods. Whether you're transferring from a
                bank, using a card, or sending via UPI, our platform makes it
                simple, fast, and reliable — no borders, no hassle.
              </p>
              <div className="flex sm:justify-start justify-center">

              <button
                onClick={handleButtonClick}
                className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center"
              >
                {user ? "Add Money Now" : "Create a Account"}
              </button>
              </div>
            </div>

            {/* Benefits Container - Staggers individual benefits */}
            <motion.div
              variants={benefitsContainerVariants}
              className="flex flex-row flex-wrap gap-6 pt-4" // Added pt-4
            >
              {benefits.map((benefit, index) => (
                // Apply animation to each benefit item
                <motion.div
                  key={index}
                  variants={benefitItemVariants}
                  className="flex items-center lg:text-base text-sm gap-2"
                >
                  <span className="dark:text-primary text-secondarybox">
                    {benefit.icon}
                  </span>
                  <span className="text-neutral-900 dark:text-white font-medium text-sm sm:text-base">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Area - Wrap with motion */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={rightImageVariants} // Apply image reveal animation
          >
            <div className="relative xl:aspect-[3/2] lg:aspect-square sm:aspect-[3/2] aspect-3/2 overflow-hidden">
            <Image
              src="/assets/images/Refund-pana-light.svg"
              alt="Padlock symbolizing secure money adding"
              fill
              priority
              className="object-contain block dark:hidden"
            />
            
            <Image
              src="/assets/images/Refund-pana-dark.svg"
              alt="Padlock symbolizing secure money adding"
              fill
              priority
              className="object-contain hidden dark:block"
            />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddMoneyGlobally;