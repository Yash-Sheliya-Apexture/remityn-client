// "use client"; // Required for Framer Motion

// import Image from "next/image";
// import React from "react";
// import { FaStarHalfAlt, FaStar } from "react-icons/fa";
// import { motion } from "framer-motion"; // Import motion

// // --- Animation Variants ---

// // Variants for the main section container (mainly for triggering)
// const sectionVariants = {
//   hidden: {},
//   visible: {},
// };

// // Variants for the left text/content block (Slide from Left)
// const leftBlockVariants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//       delay: 0.1,
//     },
//   },
// };

// // Variants for the right container (Aside - Simple Fade In)
// const rightContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.5, // Faster fade for the container
//       delay: 0.25, // Start slightly after the left block
//     },
//   },
// };

// // Variants ONLY for the phone images (Slide from Bottom)
// const imageSlideUpVariants = {
//   hidden: { opacity: 0, y: 100 }, // Start invisible and 100px below
//   visible: {
//     opacity: 1,
//     y: 0, // Animate to original Y position (slide up)
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//       // Delay this slightly more so the container fades in first
//       delay: 0.4,
//     },
//   },
// };

// // --- Component Definition ---
// const MobileDownloadSection: React.FC = () => {
//   return (
//     // Add overflow-hidden to prevent scrollbars during animation
//     <div className="lg:py-10 py-5 bg-white dark:bg-background px-4 overflow-hidden">
//       {/* Wrap the main section content with motion for triggering */}
//       <motion.section
//         className="flex flex-col gap-8 md:gap-6 lg:flex-row lg:items-center lg:justify-between container mx-auto"
//         id="mobile-download"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ amount: 0.2, once: false }}
//       >
//         {/* Left Column: Text Content - Wrap with motion */}
//         <motion.article
//           className="flex flex-col gap-4 md:gap-10 lg:w-1/2"
//           variants={leftBlockVariants} // Apply slide-from-left animation
//         >
//           {/* ... (User avatars, star rating, text content remain the same) ... */}
//           {/* User avatars and star rating */}
//           <div className="flex items-center gap-4">
//             <div className="flex items-center -space-x-2">
//               <Image
//                 src="/assets/images/Tom.jpg"
//                 width={40}
//                 height={40}
//                 alt="User Avatar 1"
//                 className="md:size-10 size-7 rounded-full border-2 border-white dark:border-neutral-800"
//               />
//               <Image
//                 src="/assets/images/Lisa-Carter.jpg"
//                 width={40}
//                 height={40}
//                 alt="User Avatar 2"
//                 className="md:size-10 size-7 rounded-full border-2 border-white dark:border-neutral-800"
//               />
//               <Image
//                 src="/assets/images/Amelia.jpg"
//                 width={40}
//                 height={40}
//                 alt="User Avatar 3"
//                 className="md:size-10 size-7 rounded-full border-2 border-white dark:border-neutral-800"
//               />
//               <Image
//                 src="/assets/images/Hannah.jpg"
//                 width={40}
//                 height={40}
//                 alt="User Avatar 4"
//                 className="md:size-10 size-7 rounded-full border-2 border-white dark:border-neutral-800"
//               />
//               <Image
//                 src="/assets/images/Jake.jpg"
//                 width={40}
//                 height={40}
//                 alt="User Avatar 5"
//                 className="md:size-10 size-7 rounded-full border-2 border-white dark:border-neutral-800"
//               />
//             </div>

//             {/* Star rating and user count */}
//             <div className="space-y-1">
//               <div className="flex">
//                 <FaStar className="lg:size-5 size-3 text-yellow-500 dark:text-yellow-400" />
//                 <FaStar className="lg:size-5 size-3 text-yellow-500 dark:text-yellow-400" />
//                 <FaStar className="lg:size-5 size-3 text-yellow-500 dark:text-yellow-400" />
//                 <FaStar className="lg:size-5 size-3 text-yellow-500 dark:text-yellow-400" />
//                 <FaStarHalfAlt className="lg:size-5 size-3 text-yellow-500 dark:text-yellow-400" />
//               </div>
//               <p className="text-xs font-normal text-mainheading dark:text-white capitalize">
//                 Join +500 happy users
//               </p>
//             </div>
//           </div>

//           {/* Text Content: Heading and Paragraph */}
//           <div className="flex flex-col md:gap-5">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//               Send Money to India
//               <span className="text-primary"> with Wise </span>
//             </h1>

//             <p className="lg:text-lg sm:text-base text-sm font-medium text-gray-700 leading-relaxed dark:text-gray-300 mt-5">
//               Wise makes sending money to India simple, reliable, and
//               stress-free. Whether you're supporting your family, paying for
//               education, or managing personal commitments, we ensure your money
//               reaches where it matters most — quickly and securely
//             </p>
//           </div>
//         </motion.article>

//         {/* Right Column: Container for Phone Image - Wrap with motion for FADE IN */}
//         <motion.aside
//           className="flex flex-1 items-center justify-center lg:pl-10"
//           variants={rightContainerVariants} // Apply simple fade-in animation
//         >
//           {/* Container for phone image and SVG waves - THIS needs overflow:hidden */}
//           <div className="relative flex aspect-square w-full max-w-md lg:max-w-none flex-shrink-0 justify-center overflow-hidden rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gray/30 dark:bg-white/5 dark:border pt-12 md:h-[572px] md:w-[500px] md:rounded-bl-[30px] md:rounded-br-[120px] md:rounded-tl-[120px] md:rounded-tr-[30px]">
//             {/* === Motion Wrapper for ONLY the Images === */}
//             <motion.div
//               className="relative z-10 w-[70%] h-auto md:h-[550px] md:w-[450px]" // Position wrapper
//               variants={imageSlideUpVariants} // Apply slide-up animation HERE
//             >
//               {/* Image components are INSIDE the sliding wrapper */}
//               <Image
//                 src="/assets/images/send-money-light.svg"
//                 layout="fill" // Use fill layout within the motion wrapper
//                 objectFit="contain" // Adjust object fit as needed
//                 alt="Send money app screenshot - Light mode"
//                 className="block dark:hidden" // Removed absolute positioning
//                 priority
//               />
//               <Image
//                 src="/assets/images/send-money-dark.svg"
//                 layout="fill"
//                 objectFit="contain"
//                 alt="Send money app screenshot - Dark mode"
//                 className="hidden dark:block"
//                 priority
//               />
//             </motion.div>
//             {/* === End Motion Wrapper for Images === */}

//             {/* SVG Waves (Outside the sliding motion.div, inside the aside) */}
//             <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 1440 320"
//                 className="fill-gray-300 dark:fill-neutral-800"
//               >
//                 <path
//                   fillOpacity="1"
//                   d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,144C672,149,768,235,864,256C960,277,1056,235,1152,192C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//                 ></path>
//               </svg>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 1440 320"
//                 className="fill-gray-200 dark:fill-neutral-700"
//               >
//                 <path
//                   fillOpacity="1"
//                   d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,128C672,96,768,64,864,69.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//         </motion.aside>
//       </motion.section>
//     </div>
//   );
// };

// export default MobileDownloadSection;

"use client"; // Required for Framer Motion
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; // Import motion
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

// --- Animation Variants (No changes needed) ---

// Variants for the main section container (mainly for triggering)
const sectionVariants = {
  hidden: {},
  visible: {},
};

// Variants for the left text/content block (Slide from Left)
const leftBlockVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.1,
    },
  },
};

// Variants for the right container (Aside - Simple Fade In)
const rightContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5, // Faster fade for the container
      delay: 0.25, // Start slightly after the left block
    },
  },
};

// Variants ONLY for the phone images (Slide from Bottom)
const imageSlideUpVariants = {
  hidden: { opacity: 0, y: 100 }, // Start invisible and 100px below
  visible: {
    opacity: 1,
    y: 0, // Animate to original Y position (slide up)
    transition: {
      duration: 0.7,
      ease: "easeOut",
      // Delay this slightly more so the container fades in first
      delay: 0.4,
    },
  },
};

// --- Component Definition ---
const MobileDownloadSection: React.FC = () => {
  // Get user state from AuthContext
  const { user } = useAuth();

  // Determine button properties based on auth state
  const buttonText = user ? "Send Money" : "Create A Free Account";
  const buttonLink = user ? "/dashboard/send/select-balance" : "/auth/register";

  return (
    <motion.section
      className="AddMoney-Mobail lg:py-10 py-5 bg-white dark:bg-background overflow-hidden"
      id="mobile-download"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }} // <-- NEW: Animate only once
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Text Content - Wrap with motion */}
          <motion.article
            className="flex flex-col gap-4 w-full lg:w-1/2"
            variants={leftBlockVariants} // Apply slide-from-left animation
            // Inherits trigger from parent section
          >
            {/* User avatars and star rating */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
              <div className="flex items-center -space-x-2">
                <Image
                  src="/assets/images/Sofia.png"
                  width={50}
                  height={50}
                  alt="User Avatar 1"
                  className="rounded-full size-10 border-2 border-white"
                />
                <Image
                  src="/assets/images/Lisa-Carter.jpg"
                  width={50}
                  height={50}
                  alt="User Avatar 2"
                  className="rounded-full size-10 border-2 border-white"
                />
                <Image
                  src="/assets/images/Liam.jpg"
                  width={50}
                  height={50}
                  alt="User Avatar 3"
                  className="rounded-full size-10 border-2 border-white"
                />
                <Image
                  src="/assets/images/Hannah.jpg"
                  width={50}
                  height={50}
                  alt="User Avatar 4"
                  className="rounded-full size-10 border-2 border-white"
                />
                <Image
                  src="/assets/images/Emily.avif"
                  width={50}
                  height={50}
                  alt="User Avatar 5"
                  className="rounded-full size-10 border-2 border-white"
                />
              </div>

              <p className="font-normal text-neutral-900 dark:text-white capitalize">
                <span className="text-primary font-bold"> 500K+ </span> happy
                users
              </p>
            </div>

            {/* Text Content: Heading and Paragraph */}
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
                Send Money to India Instantly –
                <span className="text-primary"> Trusted, Fast & Secure </span>
              </h1>

              <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
                Easily transfer money to India with unbeatable exchange rates
                and zero hidden fees. Whether you're supporting loved ones,
                paying tuition, or handling business, our platform ensures fast,
                transparent, and secure transfers—anytime, anywhere.
              </p>

              <div className="flex justify-center md:justify-start">
                <Link href={buttonLink} className="inline-block">
                  <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-sm lg:text-base py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
                    {buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </motion.article>

          {/* Right Column: Container for Phone Image - Wrap with motion for FADE IN */}
          <motion.aside
            className="flex flex-1 items-center justify-center"
            variants={rightContainerVariants} // Apply simple fade-in animation
            // Inherits trigger from parent section
          >
            {/* Container for phone image and SVG waves - THIS needs overflow:hidden */}
            <div className="relative flex aspect-square w-full max-w-md lg:max-w-none flex-shrink-0 justify-center overflow-hidden rounded-bl-3xl rounded-br-[100px] rounded-tl-[100px] rounded-tr-3xl bg-lightgray dark:bg-primarybox sm:pt-12 pt-6 md:h-[570px] md:w-[500px] md:rounded-bl-[30px] md:rounded-br-[120px] md:rounded-tl-[120px] md:rounded-tr-[30px]">
              {/* === Motion Wrapper for ONLY the Images === */}
              <motion.div
                className="relative z-10 w-full h-88 sm:h-[550px] md:w-[450px]" // Position wrapper
                variants={imageSlideUpVariants} // Apply slide-up animation HERE
                // Inherits trigger from parent section
              >
                {/* Image components are INSIDE the sliding wrapper */}
                <Image
                  src="/assets/images/send-money-light.png"
                  layout="fill" // Use fill layout within the motion wrapper
                  objectFit="contain" // Adjust object fit as needed
                  alt="Send money app screenshot - Light mode"
                  className="block dark:hidden object-contain" // Removed absolute positioning
                  priority
                />

                <Image
                  src="/assets/images/send-money-dark.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Send money app screenshot - Dark mode"
                  className="hidden dark:block object-contain"
                  priority
                />
              </motion.div>
              {/* === End Motion Wrapper for Images === */}

              {/* SVG Waves (Outside the sliding motion.div, inside the aside) */}
              <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                  className="fill-gray-300 dark:fill-neutral-800"
                >
                  <path
                    fillOpacity="1"
                    d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,144C672,149,768,235,864,256C960,277,1056,235,1152,192C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                  className="fill-gray-200 dark:fill-neutral-700"
                >
                  <path
                    fillOpacity="1"
                    d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,128C672,96,768,64,864,69.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
};

export default MobileDownloadSection;
