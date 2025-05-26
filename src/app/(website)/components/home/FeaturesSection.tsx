// // src/app/(website)/components/home/FeaturesSection.tsx (Adjust path as needed)
// 'use client';

// import React, { useRef, useState, useLayoutEffect } from 'react';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue
// } from 'framer-motion';
// import ServiceCard from './FeaturesCard'; // Adjust path
// import { FeaturesData } from './FeaturesData'; // Adjust path to your servicesData file

// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null);
//   const cardsWrapperRef = useRef<HTMLDivElement>(null);

//   const [dynamicHeight, setDynamicHeight] = useState<string | number>('100vh'); // Default to screen height
//   const [targetXRange, setTargetXRange] = useState<[number, number]>([900, 900]); // [startX, endX]

//   useLayoutEffect(() => {
//     if (cardsContainerRef.current && cardsWrapperRef.current) {
//       const containerWidth = cardsContainerRef.current.offsetWidth;
//       const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;

//       const initialX = 600; // Your desired starting offset for the cards
//       const endPadding = 300; // Desired space from the right edge at the end of scroll

//       let calculatedTargetX: number;

//       if (wrapperScrollWidth <= containerWidth - endPadding) {
//         // Content (plus end padding) fits or is smaller than the container.
//         // It means even if scrolled fully left, there's still >= 300px space or it doesn't even reach that far.
//         // In this scenario, if initialX is 900, and content fits, it will just stay at 900.
//         // No "scroll" is needed to achieve the end state.
//         calculatedTargetX = initialX;
//       } else {
//         // Content overflows and needs to scroll.
//         // Target X should be such that: wrapperScrollWidth + targetX = containerWidth - endPadding
//         // So, targetX = containerWidth - wrapperScrollWidth - endPadding
//         calculatedTargetX = containerWidth - wrapperScrollWidth - endPadding;
//       }

//       // Ensure targetX is not greater than initialX (prevents scrolling "backwards" from the intended start)
//       // This implies we only want a right-to-left scroll from the initialX position.
//       const finalTargetX = Math.min(initialX, calculatedTargetX);

//       setTargetXRange([initialX, finalTargetX]);

//       // Calculate the actual distance the cards will animate horizontally
//       const scrollDistance = Math.abs(finalTargetX - initialX);

//       if (scrollDistance > 10) { // Only set dynamic height if there's significant scroll
//         // Adjust the multiplier (e.g., 1.5 or 2) for scroll "feel".
//         // Higher multiplier = more vertical scroll needed for the horizontal animation to complete.
//         setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
//       } else {
//         // If minimal or no scroll from initialX to finalTargetX, keep height at 100vh.
//         setDynamicHeight('100vh');
//       }
//     }
//   }, [FeaturesData]); // Rerun if servicesData changes

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"] // Animate as section scrolls through viewport
//   });

//   // 1. Transform scrollYProgress (0 to 1) to the raw target x value based on the calculated range
//   const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);

//   // 2. Apply a spring to the rawX value for very smooth animation
//   // You can tweak these spring parameters for different feels:
//   // stiffness: Higher = more springy, faster response
//   // damping: Higher = less oscillation, more controlled
//   // mass: Higher = heavier feel, slower to start/stop
//   const springConfig = { stiffness: 150, damping: 60, mass: 1, restDelta: 0.001 };
//   const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

//   return (
//     <section
//       ref={sectionRef}
//       className="text-white relative"
//       style={{ height: dynamicHeight }}
//     >
//       {/* Sticky container for the "pinned" view */}
//       <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
//         {/* Title Area */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">Security, Speed, <span className="text-primary"> Savings & Support</span></h3>
//           <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">At the heart of our service is a commitment to making your money transfers seamless, secure, and cost-effective. Whether you're sending funds internationally or managing cross-border transactions, we combine cutting-edge technology with expert support to ensure speed, transparency, and peace of mind.</p>
//         </div>

//         {/* Cards Scroll Viewport */}
//         <div
//           ref={cardsContainerRef}
//           className="w-full overflow-x-hidden text-left box-border flex-grow flex items-center"
//         >
//           {/* The horizontally scrolling element */}
//           <motion.div
//             ref={cardsWrapperRef}
//             className="inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border"
//             style={{ x: smoothX }} // Apply the smoothed, spring-animated x value
//           >
//             {FeaturesData.map((Features) => (
//               <ServiceCard
//                 key={Features.id}
//                 image={Features.image}
//                 title={Features.title}
//                 description={Features.description}
//                 id={Features.id}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

// src/app/(website)/components/home/FeaturesSection.tsx
"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import ServiceCard from "./FeaturesCard"; // Adjust path
// Import desired icons from react-icons
import {
  FaLock,
  FaBolt,
  FaHandHoldingUsd,
  FaHeadset,
  FaSyncAlt,
  FaGlobeAmericas,
  FaComments,
  FaExchangeAlt, // For "Exchange Money Without Borders"
} from "react-icons/fa";
// You can choose any other icons from the library (e.g., FiShield from feather icons, etc.)

// Updated Features interface
export interface Features {
  id: number;
  icon: React.ElementType; // Changed from image: string
  title: string;
  description?: string;
}

// Updated FeaturesData
export const FeaturesData: Features[] = [
  {
    id: 1,
    icon: FaLock,
    title: "Secure Every Step of the Way",
    description:
      "We prioritize your security with advanced encryption and fraud detection, keeping your money and data safe 24/7.",
  },
  {
    id: 2,
    icon: FaBolt,
    title: "Our transfers are Speedy",
    description:
      "Receive your money swiftly, often within minutes, thanks to our optimized transfer network.",
  },
  {
    id: 3,
    icon: FaHandHoldingUsd,
    title: "Save with high exchange rates",
    description:
      "Get the best value for your hard-earned money with our competitive, transparent exchange rates.",
  },
  {
    id: 4,
    icon: FaHeadset,
    title: "Need Support ? We’re here!",
    description:
      "Our dedicated support team is available via chat, email, and phone to assist you anytime.",
  },
  {
    id: 5,
    icon: FaSyncAlt,
    title: "Stay ahead with live exchange rates",
    description:
      "Stay updated with real-time currency exchange rates for informed decisions and maximum value.",
  },
  {
    id: 6,
    icon: FaGlobeAmericas,
    title: "Worldwide Reach , Local Touch",
    description:
      "Our platform combines international reach with localized support for a seamless experience.",
  },
  {
    id: 7,
    icon: FaComments,
    title: "24/7 Customer Support",
    description:
      "We re here for you—day or night—with reliable customer service whenever you need assistance.",
  },
  {
    id: 8,
    icon: FaExchangeAlt,
    title: "Exchange Money Without Borders",
    description:
      "Seamless global money transfers made simple, connecting you financially across continents.",
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const [dynamicHeight, setDynamicHeight] = useState<string | number>("100vh");
  const [targetXRange, setTargetXRange] = useState<[number, number]>([
    900, 900,
  ]);

  useLayoutEffect(() => {
    if (cardsContainerRef.current && cardsWrapperRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      const wrapperScrollWidth = cardsWrapperRef.current.scrollWidth;

      const initialX =200;
      const endPadding = 400;

      let calculatedTargetX: number;

      if (wrapperScrollWidth <= containerWidth - endPadding) {
        calculatedTargetX = initialX;
      } else {
        calculatedTargetX = containerWidth - wrapperScrollWidth - endPadding;
      }

      const finalTargetX = Math.min(initialX, calculatedTargetX);

      setTargetXRange([initialX, finalTargetX]);

      const scrollDistance = Math.abs(finalTargetX - initialX);

      if (scrollDistance > 10) {
        setDynamicHeight(`calc(100vh + ${scrollDistance * 1.5}px)`);
      } else {
        setDynamicHeight("100vh");
      }
    }
  }, [FeaturesData]); // Rerun if FeaturesData changes (though its content doesn't usually change at runtime unless dynamic)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], targetXRange);
  const springConfig = {
    stiffness: 150,
    damping: 60,
    mass: 1,
    restDelta: 0.001,
  };
  const smoothX: MotionValue<number> = useSpring(rawX, springConfig);

  return (
    <section
      ref={sectionRef}
      className="text-white relative"
      style={{ height: dynamicHeight }}
    >
      <div className="sticky top-0 overflow-hidden flex flex-col  py-50">
        {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">Security, Speed, <span className="text-primary"> Savings & Support</span></h3>
          <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">At the heart of our service is a commitment to making your money transfers seamless, secure, and cost-effective. Whether you're sending funds internationally or managing cross-border transactions, we combine cutting-edge technology with expert support to ensure speed, transparency, and peace of mind.</p>
        </div> */}

        <div
          ref={cardsContainerRef}
          className="w-full overflow-x-hidden text-left box-border flex-grow flex items-center"
        >
          <motion.div
            ref={cardsWrapperRef}
            className="inline-flex flex-row gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 box-border"
            style={{ x: smoothX }}
          >
            <div className="min-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
              <div className="w-3xl">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
                Security, Speed,{" "}
                <span className="text-primary"> Savings & Support</span>
              </h3>
              <p className="text-subheadingWhite lg:text-lg text-base lg:max-w-5xl max-w-full">
                At the heart of our service is a commitment to making your money
                transfers seamless, secure, and cost-effective. Whether you're
                sending funds internationally or managing cross-border
                transactions, we combine cutting-edge technology with expert
                support to ensure speed, transparency, and peace of mind.
              </p>
              </div>
            </div>
            <div className="bg-[#394247] rounded-3xl p-[1px] inline-flex flex-row gap-1">
            {FeaturesData.map(
              (
                feature // Renamed 'Features' to 'feature' for clarity
              ) => (
                <ServiceCard
                  key={feature.id}
                  id={feature.id}
                  icon={feature.icon} // Pass icon component
                  title={feature.title}
                  description={feature.description}
                />
              )
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
