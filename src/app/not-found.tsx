// // src/components/Error404Page.tsx
// "use client"; // <--- ADD THIS LINE AT THE VERY TOP

// import Image from "next/image";
// import React from "react";
// import { FiHelpCircle, FiSend } from "react-icons/fi";
// import { MdLockOutline } from "react-icons/md";
// import { motion } from "framer-motion"; // Import motion
// import { RiShieldCheckLine } from "react-icons/ri";
// import { FaArrowLeft } from "react-icons/fa";
// import  Link  from "next/link";

// // Define animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.3, // Start animating children after 0.3s
//       staggerChildren: 0.2, // Stagger child animations by 0.2s
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring", // Optional: adds a little bounce
//       stiffness: 100,
//       duration: 0.5, // Can use duration instead of spring
//     },
//   },
// };

// const imageVariants = {
//   // Slide in from the right and fade in
//   hidden: { x: 200, opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 50,
//       damping: 20,
//       delay: 0.5, // Delay image slightly after text starts
//       duration: 0.7, // Alternative timing
//     },
//   },
// };

// const Error404Page: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4">
//       {/* Use motion.section for the main container */}
//       <motion.section
//         className="Error-Page flex items-center justify-center min-h-screen bg-white dark:bg-background py-10"
//         // Apply container variants for overall page load animation (optional, can be on inner div too)
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants} // You could apply stagger here too
//       >
//         {/* Inner container for layout and staggering */}
//         <motion.div
//           className="overflow-hidden max-w-6xl w-full flex flex-col md:flex-row gap-10"
//           // Apply variants here to control stagger within this container
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {/* Left Column: Content */}
//           {/* Wrap the content container for its own entrance (optional but good for structure) */}
//           {/* No extra variants needed here if containerVariants handles stagger */}
//           <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
//             {/* Apply itemVariants to individual animated elements */}
//             <motion.h1
//               variants={itemVariants}
//               className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase"
//             >
//               Oops! <span className="text-primary">Something Went Wrong!</span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="text-gray-500 dark:text-gray-300 lg:text-lg text-base"
//             >
//               Looks like this page missed the currency route! But don’t worry —
//               your funds and support are just a click away.
//             </motion.p>

//             {/* Apply itemVariants to the UL to animate it as one block, or to each LI */}
//             {/* Animating UL as one block is simpler */}
//             <motion.ul variants={itemVariants} className="space-y-4">
//               {/* You could also wrap each LI in motion.li with itemVariants if you want finer control */}
//               <li className="flex items-center gap-2.5">
//                 <FiHelpCircle
//                   size={20}
//                   className="text-neutral-900 dark:text-primary"
//                 />
//                 <Link href="/faqs" className="hover:underline">
//                   Question and answers
//                 </Link>
//               </li>
//               <li className="flex items-center gap-2.5">
//                 <MdLockOutline
//                   size={20}
//                   className="text-neutral-900 dark:text-primary"
//                 />
//                 <Link href="/privacy-policy" className="hover:underline">
//                   Privacy & Policy
//                 </Link>
//               </li>
//               <li className="flex items-center gap-2.5">
//                 <RiShieldCheckLine
//                   size={20}
//                   className="text-neutral-900 dark:text-primary"
//                 />
//                 <Link href="/terms-and-conditions" className="hover:underline">
//                   Terms-and-conditions
//                 </Link>
//               </li>
//             </motion.ul>

//             {/* Condition Render Button */}
//             <motion.div variants={itemVariants} className="inline-block group">
//               <Link
//                 href="/" // Change link as needed
//                 className="bg-primary hover:bg-primaryhover gap-2 capitalize text-neutral-900 w-fit cursor-pointer font-medium text-sm lg:text-base py-3 px-10 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center"
//               >
//                 <FaArrowLeft className="size-5 opacity-0 group-hover:opacity-100 ease-linear transition-all duration-200 group-hover:-translate-x-5 " />
//                 go to homepage
//               </Link>
//             </motion.div>

//           </div>

//           {/* Right Column: Illustration */}
//           {/* Use a motion.div wrapper for the image animation */}
//           <motion.div
//             className="w-full md:w-1/2 justify-center flex items-center"
//             variants={imageVariants} // Apply image specific animation
//             initial="hidden" // Ensure these are set if not inherited
//             animate="visible" // Ensure these are set if not inherited
//           >
//             {/* Use the regular Image component inside the animated div */}
//             <Image
//               src="/assets/images/Group 8.png"
//               width={500}
//               height={500}
//               alt="404 Error Illustration Light"
//               className="max-w-full object-contain sm:aspect-square max-h-[500px] dark:hidden block"
//               priority // Good practice for LCP images
//             />

//             <Image
//               src="/assets/images/Group 7.png"
//               width={500}
//               height={500}
//               alt="404 Error Illustration Dark"
//               className="max-w-full object-contain sm:aspect-square max-h-[500px] hidden dark:block"
//               priority // Good practice for LCP images
//             />
//           </motion.div>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// };

// export default Error404Page;

// src/components/Error404Page.tsx
"use client"; // <--- THIS LINE IS CORRECTLY AT THE VERY TOP

import Image from "next/image";
import React from "react";
import { FiHelpCircle } from "react-icons/fi"; // FiSend was imported but not used, removed for tidiness. You can add it back if needed.
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion"; // Import motion
import { RiShieldCheckLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // Start animating children after 0.3s
      staggerChildren: 0.2, // Stagger child animations by 0.2s
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Optional: adds a little bounce
      stiffness: 100,
      duration: 0.5, // Can use duration instead of spring
    },
  },
};

const imageVariants = {
  // Slide in from the right and fade in
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      delay: 0.5, // Delay image slightly after text starts
      duration: 0.7, // Alternative timing
    },
  },
};

const Error404Page: React.FC = () => {
  const pathname = usePathname();

  let buttonText = "go to homepage";
  let buttonHref = "/";

  if (pathname) {
    if (pathname.startsWith("/admin")) {
      buttonText = "go to admin panel";
      buttonHref = "/admin"; // URL for admin section
    } else if (pathname.startsWith("/dashboard")) {
      buttonText = "go to dashboard";
      buttonHref = "/dashboard"; // URL for dashboard section
    }
    // Default is homepage, set initially
  }

  return (
    <div className="container mx-auto px-4">
      {/* Use motion.section for the main container */}
      <motion.section
        className="Error-Page flex items-center justify-center min-h-screen bg-white dark:bg-background py-10"
        // Apply container variants for overall page load animation (optional, can be on inner div too)
        initial="hidden"
        animate="visible"
        variants={containerVariants} // You could apply stagger here too
      >
        {/* Inner container for layout and staggering */}
        <motion.div
          className="overflow-hidden max-w-6xl w-full flex flex-col md:flex-row md:gap-10 gap-0 "
          // Apply variants here to control stagger within this container
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Column: Content */}
          {/* Wrap the content container for its own entrance (optional but good for structure) */}
          {/* No extra variants needed here if containerVariants handles stagger */}
          <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
            {/* Apply itemVariants to individual animated elements */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase"
            >
              Oops! <span className="text-primary">Something Went Wrong!</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-300 lg:text-lg text-base"
            >
              Looks like this page missed the currency route! But don’t worry —
              your funds and support are just a click away.
            </motion.p>

            {/* Apply itemVariants to the UL to animate it as one block, or to each LI */}
            {/* Animating UL as one block is simpler */}
            <motion.ul variants={itemVariants} className="space-y-4">
              {/* You could also wrap each LI in motion.li with itemVariants if you want finer control */}
              <li className="flex items-center gap-2.5">
                <FiHelpCircle
                  size={20}
                  className="text-neutral-900 dark:text-primary"
                />
                <Link href="/faqs" className="hover:underline">
                  Question and answers
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <MdLockOutline
                  size={20}
                  className="text-neutral-900 dark:text-primary"
                />
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy & Policy
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <RiShieldCheckLine
                  size={20}
                  className="text-neutral-900 dark:text-primary"
                />
                <Link href="/terms-and-conditions" className="hover:underline">
                  Terms-and-conditions
                </Link>
              </li>
            </motion.ul>

            {/* Condition Render Button */}
            <motion.div variants={itemVariants} className="inline-block group">
              <Link
                href={buttonHref} // Use the dynamic href
                className="bg-primary hover:bg-primaryhover gap-2 capitalize text-neutral-900 w-fit cursor-pointer font-medium text-sm lg:text-base py-3 px-10 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center"
              >
                {buttonText}{" "}
                {/* Use the dynamic text. 'capitalize' class will style it */}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Illustration */}
          {/* Use a motion.div wrapper for the image animation */}
          <motion.div
            className="w-full md:w-1/2 justify-center flex items-center"
            variants={imageVariants} // Apply image specific animation
            initial="hidden" // Ensure these are set if not inherited
            animate="visible" // Ensure these are set if not inherited
          >
            {/* Use the regular Image component inside the animated div */}
            <Image
              src="/assets/images/Group 8.png"
              width={500}
              height={500}
              alt="404 Error Illustration Light"
              className="max-w-full object-contain sm:aspect-square max-h-[500px] dark:hidden block "
              priority // Good practice for LCP images
            />

            <Image
              src="/assets/images/Group 7.png"
              width={500}
              height={500}
              alt="404 Error Illustration Dark"
              className="max-w-full object-contain sm:aspect-square max-h-[500px] hidden dark:block"
              priority // Good practice for LCP images
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Error404Page;
