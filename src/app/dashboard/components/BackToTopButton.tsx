// "use client"; // Essential for using hooks like useState, useEffect

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const BackToTopButton: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Show button when page is scrolled down more than 800px
//   const toggleVisibility = () => {
//     if (window.scrollY > 200) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   // Set up scroll listener
//   useEffect(() => {
//     window.addEventListener('scroll', toggleVisibility);

//     // Clean up the listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', toggleVisibility);
//     };
//   }, []);

//   // Scroll smoothly to top
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth', // Provides the smooth scrolling effect
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ y: 100, opacity: 0 }} // Start 100px below its final position and invisible
//           animate={{ y: 0, opacity: 1 }}   // Animate to final position (y=0) and fully visible
//           exit={{ y: 100, opacity: 0 }}     // Animate back down 100px and fade out
//           transition={{ duration: 0.3 }}    // Animation speed
//           className="fixed cursor-pointer bottom-5 right-5 p-1.5 px-4 rounded-full bg-primary text-neutral-900 shadow-md hover:bg-primaryhover focus:outline-none z-50 font-medium sm:block hidden"
//           onClick={scrollToTop}
//         >
//           Back to top
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BackToTopButton;

// "use client"; // Essential for using hooks like useState, useEffect, useRef

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const BackToTopButton: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   // Use useRef to store the last scroll position without triggering re-renders
//   const lastScrollY = useRef(0);
//   // Define the threshold after which the button might appear
//   const scrollThreshold = 200; // Show/hide logic applies below this point

//   // Function to handle scroll events
//   const handleScroll = useCallback(() => {
//     const currentScrollY = window.scrollY;

//     // Determine scroll direction but only act if past the threshold
//     if (currentScrollY > scrollThreshold) {
//       // Scrolling Down: Show the button
//       if (currentScrollY > lastScrollY.current) {
//         setIsVisible(true);
//       }
//       // Scrolling Up: Hide the button
//       else if (currentScrollY < lastScrollY.current) {
//         setIsVisible(false);
//       }
//       // If currentScrollY === lastScrollY.current, state remains unchanged
//     } else {
//       // Always hide the button if near the top
//       setIsVisible(false);
//     }

//     // Update the last scroll position *after* comparison
//     lastScrollY.current = currentScrollY;

//     // Add a small buffer for scroll stop detection (optional, more complex)
//     // You could add a timeout here to hide the button if scrolling stops
//     // for a certain period, but the current logic hides on scroll up,
//     // which usually covers the intent.
//   }, []); // No dependencies needed as it uses useRef and stable setIsVisible

//   // Set up scroll listener
//   useEffect(() => {
//     // Set initial scroll position when the component mounts
//     lastScrollY.current = window.scrollY;

//     // Add passive listener for better performance as we don't preventDefault
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     // Clean up the listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]); // Depend on handleScroll (which is memoized by useCallback)

//   // Scroll smoothly to top function (remains the same)
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Provides the smooth scrolling effect
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ y: 100, opacity: 0 }} // Start below and invisible
//           animate={{ y: 0, opacity: 1 }} // Animate to final position and visible
//           exit={{ y: 100, opacity: 0 }} // Animate down and fade out when hiding
//           transition={{ duration: 0.3 }} // Animation speed
//           className="fixed cursor-pointer bottom-5 right-5 p-1.5 px-4 lg:text-base text-sm rounded-full bg-primary text-neutral-900  hover:bg-primaryhover focus:outline-none z-50 font-medium sm:block hidden" // Added 'hidden' initially for SSR/no-JS, adjusted sm:block
//           onClick={scrollToTop}
//           aria-label="Back to top" // Added for accessibility
//         >
//           Back to top
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BackToTopButton;





// components/ui/BackToTopButton.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the possible positions
type ButtonPosition = 'center' | 'right';
// Define the possible mobile behaviors
type MobileBehavior = 'visible' | 'hidden';

// Define the props interface
interface BackToTopButtonProps {
  /**
   * Determines the horizontal position of the button.
   * 'center': Positions the button horizontally centered at the bottom.
   * 'right': Positions the button on the bottom right (default).
   */
  position?: ButtonPosition;
  /**
   * Determines if the button should be visible on small (mobile) screens.
   * 'visible': Button is visible on mobile screens.
   * 'hidden': Button is hidden on mobile screens (default).
   * The button will always attempt to be visible on 'sm' screens and larger if scroll conditions are met.
   */
  mobileBehavior?: MobileBehavior;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  position = 'right', // Default position
  mobileBehavior = 'hidden', // Default mobile behavior
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 200;

  // --- Scroll Handling Logic (remains the same) ---
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollThreshold) {
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      }
    } else {
      setIsVisible(false);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // --- End Scroll Handling Logic ---


  // --- Define Base, Positional, and Mobile Visibility Classes ---
  const baseClasses =
    "fixed cursor-pointer bottom-5 p-1.5 px-4 lg:text-base text-sm rounded-full bg-primary text-neutral-900 hover:bg-primaryhover focus:outline-none z-30 font-medium"; // Base styles, removed hidden/sm:block

  // Determine position-specific classes
  let positionClasses = "";
  if (position === 'center') {
    positionClasses = "left-1/2 -translate-x-1/2 transform";
  } else {
    positionClasses = "right-5";
  }

  // Determine mobile visibility class - this applies *before* the sm breakpoint
  // We always want sm:block (or rather, sm:flex/sm:inline-flex if using icons later)
  // The 'hidden'/'block' here controls the *initial* state for mobile
  const mobileVisibilityClass = mobileBehavior === 'visible' ? 'block' : 'hidden';

  // Combine all classes
  // Add sm:block to ensure it becomes visible on small screens and up, overriding the initial mobile state if needed
  const combinedClasses = `${mobileVisibilityClass} sm:block ${baseClasses} ${positionClasses}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          // Apply the combined classes here
          className={combinedClasses}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          Back to top
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;