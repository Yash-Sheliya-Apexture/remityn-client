// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Zap, Globe } from 'lucide-react';

// // SVG component for the BRIGHTER, TAPERED, ROTATING highlights
// const HeroHighlightSVG = ({ idSuffix }: { idSuffix: string }) => {
//   const lineGradientId = `highlightLineGradient-${idSuffix}`;
//   const glowFilterId = `highlightGlowFilter-${idSuffix}`;

//   const svgWidth = 150; // Increased width for a larger/longer segment
//   const svgHeight = 45;  // Increased height to accommodate a more pronounced arc and glow
//   const arcY = svgHeight / 2; // Vertical center for the arc's baseline
//   const arcCurvature = 18; // Increased curvature for a more noticeable arc on the larger segment

//   return (
//     <svg
//       width={svgWidth}
//       height={svgHeight}
//       viewBox={`0 0 ${svgWidth} ${svgHeight}`}
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <linearGradient id={lineGradientId} x1="0%" y1="50%" x2="100%" y2="50%">
//           <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0" />
//           <stop offset="15%" stopColor="rgba(255, 255, 255, 0.05)" stopOpacity="0.05" />
//           <stop offset="30%" stopColor="rgba(255, 255, 255, 0.7)" stopOpacity="0.7" />
//           <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" stopOpacity="1" />
//           <stop offset="70%" stopColor="rgba(255, 255, 255, 0.7)" stopOpacity="0.7" />
//           <stop offset="85%" stopColor="rgba(255, 255, 255, 0.05)" stopOpacity="0.05" />
//           <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0" />

//         </linearGradient>
//         <filter id={glowFilterId} x="-50%" y="-150%" width="200%" height="400%">
//           <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blurredAlpha" /> {/* Increased stdDeviation for larger glow area */}
//           <feFlood floodColor="rgba(180, 140, 220, 0.5)" floodOpacity="0.6" result="glowColor" />
//           <feComposite in="glowColor" in2="blurredAlpha" operator="in" result="coloredGlowBase" />
//           <feGaussianBlur in="coloredGlowBase" stdDeviation="5" result="softGlow" /> {/* Increased for softer, larger glow */}
//           <feMerge>
//             <feMergeNode in="softGlow" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>
//       <path
//         d={`M 0 ${arcY} Q ${svgWidth / 2} ${arcY - arcCurvature} ${svgWidth} ${arcY}`}
//         stroke={`url(#${lineGradientId})`}
//         strokeWidth="2" // Stroke width kept moderate, size comes from path length & glow
//         strokeLinecap="round"
//         filter={`url(#${glowFilterId})`}
//       />
//     </svg>
//   );
// };

// const HeroSection: React.FC = () => {
//   const [circleSize, setCircleSize] = React.useState(700);

//   React.useEffect(() => {
//     const updateSize = () => {
//       const vwBased = window.innerWidth * 0.8;
//       const vhBased = window.innerHeight * 0.8;
//       const smallestDim = Math.min(vwBased, vhBased);
//       setCircleSize(Math.max(550, Math.min(smallestDim, 1000)));
//     };
//     updateSize();
//     window.addEventListener('resize', updateSize);
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);

//   const radius = circleSize / 2 - 1;
//   const highlightSvgAssetWidth = 150; // Must match svgWidth in HeroHighlightSVG
//   const highlightSvgAssetHeight = 45;  // Must match svgHeight in HeroHighlightSVG

//   return (
//     <section className="relative bg-[#080410] text-white min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden">
//       <style jsx global>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.1; transform: scale(0.4); }
//           50% { opacity: 0.5; transform: scale(0.8); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 40s linear infinite;
//         }
//       `}</style>

//       {/* Star Background */}
//       <div className="absolute inset-0 pointer-events-none opacity-80">
//         {Array.from({ length: 250 }).map((_, i) => (
//           <div key={i} className="absolute rounded-full bg-white/70"
//             style={{ width: `${Math.random() * 1 + 0.2}px`, height: `${Math.random() * 1 + 0.2}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${Math.random() * 8 + 6}s infinite ease-in-out` }}
//           />
//         ))}
//       </div>

//       {/* Central Nebula Glow */}
//       <div className="absolute inset-0 m-auto w-[100vw] h-[100vh] max-w-[1400px] max-h-[1400px] opacity-30"
//         style={{ background: 'radial-gradient(ellipse at center, rgba(170, 70, 220, 0.50) 0%, transparent 60%)', pointerEvents: 'none', transform: 'scale(1.3)' }}
//       />

//       {/* Container for the Static Full Circle and Rotating Highlights */}
//       <div
//         className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
//         style={{
//           top: '6rem', // Positioned higher on the page (adjust as needed)
//           width: `${circleSize}px`,
//           height: `${circleSize}px`
//         }}
//       >
//         {/* 1. The FAINT, STATIC, FULL CIRCULAR BORDER */}
//         <svg
//           width={circleSize}
//           height={circleSize}
//           viewBox={`0 0 ${circleSize} ${circleSize}`}
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute opacity-20" // Further reduced opacity for a very faint circle
//         >
//           <circle
//             cx={circleSize / 2}
//             cy={circleSize / 2}
//             r={radius}
//             stroke="rgba(220, 200, 255, 0.3)"
//             strokeWidth="1"
//           />
//         </svg>

//         {/* 2. The ROTATING Brighter Highlights (Now 3 of them) */}
//         <div className="animate-spin-slow w-full h-full relative"> {/* Added relative for positioning children */}
//           {/* Highlight 1 (Top) */}
//           <div
//             className="absolute left-1/2 top-0"
//             style={{
//               transform: `translateX(-${highlightSvgAssetWidth / 2}px) translateY(-${highlightSvgAssetHeight / 2}px)`,
//             }}
//           >
//             <HeroHighlightSVG idSuffix="h1" />
//           </div>

//           {/* Highlight 2 (Rotated to approx 120 deg) */}
//           <div
//             className="absolute w-full h-full" // Wrapper to apply rotation
//             style={{ transform: 'rotate(120deg)' }}
//           >
//             <div className="absolute left-1/2 top-0" // Child positioned at the "top" of this rotated wrapper
//                  style={{ transform: `translateX(-${highlightSvgAssetWidth/2}px) translateY(-${highlightSvgAssetHeight/2}px)` }}>
//               <HeroHighlightSVG idSuffix="h2" />
//             </div>
//           </div>

//           {/* Highlight 3 (Rotated to approx 240 deg) */}
//           <div
//             className="absolute w-full h-full" // Wrapper to apply rotation
//             style={{ transform: 'rotate(240deg)' }}
//           >
//             <div className="absolute left-1/2 top-0" // Child positioned at the "top" of this rotated wrapper
//                  style={{ transform: `translateX(-${highlightSvgAssetWidth/2}px) translateY(-${highlightSvgAssetHeight/2}px)` }}>
//               <HeroHighlightSVG idSuffix="h3" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Central Text Content */}
//       <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-16 sm:mt-24 md:mt-32"> {/* Added margin-top to push text down relative to higher circle */}
//         <div className="mb-6 inline-flex items-center bg-white/5 backdrop-blur-md text-purple-300 px-4 py-1.5 rounded-full text-sm sm:text-base font-medium border border-white/10 shadow-xl">
//           <Zap size={16} className="mr-2 text-purple-400" />
//           Introducing Our Latest Features
//         </div>
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
//           style={{ textShadow: `0px 0px 30px rgba(192, 132, 252, 0.4), 0px 0px 15px rgba(220, 200, 255, 0.3), 0px 1px 2px rgba(0,0,0,0.1)` }}
//         >
//           Revolutionize Your CRM Experience with Powerful Tools
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300/80 mb-10 max-w-2xl px-2">
//           Empower your business with Bester's AI-driven solutions designed to streamline operations and enhance customer relationships.
//         </p>
//         <Link href="/signup"
//           className="px-8 sm:px-10 py-3 sm:py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full text-base sm:text-lg shadow-2xl transform transition-all duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/60"
//         >
//           Start Your Free Trial
//         </Link>
//         <p className="mt-8 text-sm sm:text-base text-gray-400 flex items-center justify-center">
//           <Globe size={16} className="mr-1.5 text-gray-300/80" />
//           <span className="opacity-90">Used and helping over</span>
//           <span className="font-bold text-gray-100/95 mx-0.5">2000+</span>
//           <span className="opacity-90">Companies</span>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // app/(website)/components/Hero/HeroSection.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Globe } from "lucide-react";
// import { FiSend } from "react-icons/fi";
// import UserSuppliedHighlightSVG from "./UserSuppliedHighlightSVG"; // Import the new component

// // Removed the old HeroHighlightSVG component

// const HeroSection: React.FC = () => {
//   const [circleSize, setCircleSize] = React.useState(1200);

//   React.useEffect(() => {
//     const updateSize = () => {
//       const vwBased = window.innerWidth * 0.8;
//       const vhBased = window.innerHeight * 0.8;
//       const smallestDim = Math.min(vwBased, vhBased);
//       setCircleSize(Math.max(1000, Math.min(smallestDim, 1600)));
//     };
//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   const radius = circleSize / 2 - 1;

//   return (
//     <section className="relative text-white flex pt-24 pb-10 px-4 overflow-hidden -mt-28">
//       <style jsx global>{`
//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.1;
//             transform: scale(0.4);
//           }
//           50% {
//             opacity: 0.5;
//             transform: scale(0.8);
//           }
//         }
//         @keyframes spin-slow {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 40s linear infinite;
//         }
//       `}</style>

//       {/* Star Background */}
//       <div className="absolute inset-0 pointer-events-none opacity-80">
//         {Array.from({ length: 250 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white/70"
//             style={{
//               width: `${Math.random() * 1 + 0.2}px`,
//               height: `${Math.random() * 1 + 0.2}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `twinkle ${
//                 Math.random() * 8 + 6
//               }s infinite ease-in-out`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Container for the Static Full Circle and Rotating Highlights */}
//       <div
//         className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
//         style={{
//           top: "3rem",
//           width: `${circleSize}px`,
//           height: `${circleSize}px`,
//         }}
//       >
//         {/* 1. The FAINT, STATIC, FULL CIRCULAR BORDER */}
//         <svg
//           width={circleSize}
//           height={circleSize}
//           viewBox={`0 0 ${circleSize} ${circleSize}`}
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute opacity-20"
//         >
//           <circle
//             cx={circleSize / 2}
//             cy={circleSize / 2}
//             r={radius}
//             stroke="rgba(220, 200, 255, 0.3)"
//             strokeWidth="1"
//           />
//         </svg>

//         {/* 2. The ROTATING Brighter Highlights */}
//         <div className="animate-spin-slow w-full h-full relative">
//           {[0, 120, 240].map((angle, index) => (
//             <div
//               key={`highlight-wrapper-${index}`}
//               className="absolute w-full h-full"
//               style={{ transform: `rotate(${angle}deg)` }}
//             >
//               <div
//                 className="absolute left-1/2 top-0"
//                 style={{
//                   width: `100%`,
//                   height: `100%`,
//                   transform: `translateX(-50%)`,
//                 }}
//               >
//                 <UserSuppliedHighlightSVG
//                   idSuffix={`h${index + 1}`}
//                   style={{ width: "100%", height: "100%" }} // SVG scales to fit this div
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Central Text Content (remains the same) */}
//       <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-16 sm:mt-24 md:mt-20">
//         <div className="mb-6 inline-flex items-center bg-primarybox backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm sm:text-base border">
//           <FiSend size={18} className="mr-2 text-primary" />
//           All Time Letters Rates
//         </div>
//         <h1
//           className="text-4xl font-SatoshiVariable sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
//         >
//           Easy Global Money Exchange at <span className="text-primary font-SatoshiVariableItalic">0% Fees</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl px-2">
//           Experience global money exchange with 0% fees and instant transfers. Our platform offers secure, transparent transactions with real-time exchange rates.
//         </p>
//         <Link
//           href="/signup"
//           className="px-8 sm:px-10 py-3 sm:py-3.5 bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full text-base sm:text-lg transform transition-all duration-200 ease-out"
//         >
//           Start Your Free Trial
//         </Link>
//         <p className="mt-8 text-sm sm:text-base text-gray-400 flex items-center justify-center">
//           <Globe size={16} className="mr-1.5 text-text-gray-400" />
//           <span className="opacity-90">use and helping over </span>
//           <span className="font-bold text-gray-100/95 mx-0.5">2000+</span>
//           <span className="opacity-90">clients</span>
//         </p>
//       </div>
//       <div className="left-right-lighting -z-1">
//         <div className="absolute -left-10 -top-10">
//           <img src="/assets/images/sdfsfd.png" width={600} alt="" />
//         </div>
//         <div className="absolute -right-10 -top-10">
//           <img src="/assets/images/sadasdasdasd.png" width={600} alt="" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// app/(website)/components/Hero/HeroSection.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { FiSend } from "react-icons/fi";
import UserSuppliedHighlightSVG from "../Hero/UserSuppliedHighlightSVG";
import { IoTrendingUp } from "react-icons/io5";

const HeroSection: React.FC = () => {
  const [circleSize, setCircleSize] = React.useState(1200); // Initial default

  React.useEffect(() => {
    const updateSize = () => {
      // Determine a base size dynamically
      // Make it proportional to viewport dimensions, allowing it to bleed off-screen
      const widthBasedSize = window.innerWidth * 1.4; // e.g., 140% of viewport width
      const heightBasedSize = window.innerHeight * 1.1; // e.g., 110% of viewport height

      // Use the smaller of these two to ensure it's not excessively large based on one dimension
      let dynamicSize = Math.min(widthBasedSize, heightBasedSize);

      // Apply clamps: a minimum size for small screens and a maximum for large screens
      const minSize = 260; // Smallest size for mobile
      const maxSize = 1500; // Largest size for desktop

      setCircleSize(Math.max(minSize, Math.min(dynamicSize, maxSize)));
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = circleSize / 2 - 1; // -1 for stroke width consideration

  return (
    <section className="relative text-white flex pt-24 pb-20 px-4 overflow-hidden -mt-28">
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.4);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>

      {/* Container for the Static Full Circle and Rotating Highlights */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        style={{
          top: "3rem", // Adjust if needed based on new circle sizes
          width: `${circleSize}px`,
          height: `${circleSize}px`,
        }}
      >
        {/* 1. The FAINT, STATIC, FULL CIRCULAR BORDER */}
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute opacity-20"
        >
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius > 0 ? radius : 0} // Ensure radius is not negative if circleSize is very small
            stroke="rgba(220, 200, 255, 0.3)"
            strokeWidth="1"
          />
        </svg>

        {/* 2. The ROTATING Brighter Highlights */}
        <div className="animate-spin-slow w-full h-full relative">
          {[0, 120, 240].map((angle, index) => (
            <div
              key={`highlight-wrapper-${index}`}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                className="absolute left-1/2 top-0"
                style={{
                  width: `100%`,
                  height: `100%`,
                  transform: `translateX(-50%)`,
                }}
              >
                <UserSuppliedHighlightSVG
                  idSuffix={`h${index + 1}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Text Content (remains the same) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-16 sm:mt-24 md:mt-20">
        <div className="mb-6 inline-flex items-center bg-primarybox backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm sm:text-base border">
          <IoTrendingUp  size={20} className="mr-2 text-primary" />
          All Time Latest Rates
        </div>

        <h1 className="text-4xl font-SatoshiVariable sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
          Easy Global Money Exchange at{" "}
          <span className="text-primary font-SatoshiVariableItalic">
            0% Fees
          </span>
        </h1>

        <p className="text-lg md:text-xl text-subheadingWhite mb-10 max-w-3xl px-2">
          Experience global money exchange with 0% fees and instant transfers.
          Our platform offers secure, transparent transactions with real-time
          exchange rates.
        </p>

        <Link
          href="/signup"
          className="px-8 sm:px-10 py-3 sm:py-3.5 bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full text-base sm:text-lg transform transition-all duration-200 ease-out"
        >
          Start Your Free Trial
        </Link>
        
        <p className="mt-8 text-sm sm:text-base text-subheadingWhite flex items-center justify-center">
          <Globe size={20} className="mr-1.5 text-primary" />
          <span className="opacity-90">use and helping over </span> {" "}
          {/* Changed to   for consistent spacing */}
          <span className="font-bold text-white mx-0.5">2000+</span>
          <span className="opacity-90">clients</span>
        </p>
      </div>

      {/* Responsive Decorative Lighting */}
      <div className="left-right-lighting -z-1">
        <div className="absolute -left-10 -top-10">
          <img src="/assets/images/sdfsfd.png" width={600} alt="" />
        </div>
        <div className="absolute -right-10 -top-10">
          <img src="/assets/images/sadasdasdasd.png" width={600} alt="" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
