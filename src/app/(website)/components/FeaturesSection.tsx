// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// }

// const featuresData: Feature[] = [
//   {
//     id: "mta",
//     title: " Global Currency Exchange",
//     description:
//       "Exchange currencies worldwide with real-time rates and zero hidden fees. Perfect for travelers and global shoppers.",
//     image: '/assets/images/lock.jpg'
//   },

//   {
//     id: "cr",
//     title: "Instant Money Transfers",
//     description:
//       "Send money across borders in seconds. Safe, secure, and lightning-fast transactions at your fingertips.",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "msf",
//     title: "Live Market Rates",
//     description:
//       "Access up-to-the-minute exchange rates, charts, and trends. Make informed decisions before every transaction.",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "ca",
//     title: "Secure Transactions",
//     description:
//       "Your security is our priority. We use advanced encryption and fraud protection to keep your money safe.",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "bppd",
//     title: "Bank-Level Integration",
//     description:
//       "Seamlessly connect your bank accounts for hassle-free deposits and withdrawals, with full transparency and speed",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "fmf",
//     title: "Transparent Pricing",
//     description:
//       "Know exactly what you're paying for. We provide clear, upfront pricing with no hidden charges.",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "gtms",
//     title: "24/7 Customer Support",
//     description:
//       "Need help? Our dedicated support team is available around the clock to assist with any issue or query.",
//     image: '/assets/images/lock.jpg'

//   },
//   {
//     id: "bds",
//     title: "Mobile-Friendly Experience",
//     description:
//       "Manage your exchanges on the go. Our mobile-optimized platform works flawlessly on any device.",
//     image: '/assets/images/lock.jpg'

//   },
// ];


// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const horizontalScrollRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (
//       !sectionRef.current ||
//       !horizontalScrollRef.current ||
//       !cardsContainerRef.current
//     )
//       return;
//     const cardsEl = cardsContainerRef.current;
//     const horizontalEl = horizontalScrollRef.current;
//     const amountToScroll = cardsEl.scrollWidth - horizontalEl.offsetWidth;
//     if (amountToScroll <= 0) return;

//     const ctx = gsap.context(() => {
//       gsap.to(cardsEl, {
//         x: -amountToScroll,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           pin: true,
//           scrub: 1,
//           start: "top top",
//           end: () => `+=${amountToScroll}`,
//           invalidateOnRefresh: true,
//         },
//       });
//     }, sectionRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-20 overflow-hidden" // Assuming bg-background is a dark color
//     >
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Smart Global <span className="text-primary">Money Solutions</span>
//           </h3>
//           <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//             Experience seamless, secure, and smart financial services—all in one
//             place. From global currency exchange and real-time market rates to
//             instant money transfers and bank-level integrations, we offer
//             everything you need for safe, transparent, and lightning-fast
//             transactions across the globe.
//           </p>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full sm:mt-25 mt-16">
//           <div ref={cardsContainerRef} className="flex items-center gap-10">
//             {featuresData.map((feature) => {
//               return (
//                 <div
//                   key={feature.id}
//                   className={`group relative size-70 md:size-90 flex-shrink-0 cursor-pointer border overflow-hidden bg-primarybox text-white rounded-2xl hover:bg-primary hover:text-neutral-900 duration-300 ease-in-out `}
//                 >
                  
//                   {/* Main card content: image at top, Text block (Title+Description) at bottom */}
//                   <div className="flex flex-col justify-between h-full">

//                     <div className="relative  w-full">
//                       <Image src={feature.image} alt={'Feature image'} width={200} height={150} className="w-full h-72 object-cover" />
//                     </div>

//                     {/* Text Content Block: Title and Description. */}
//                     <div>
//                       {/* Title - animates independently */}
//                       <h3 className="text-2xl md:text-3xl font-semibold transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2 md:group-hover:-translate-y-3">
//                         {feature.title}
//                       </h3>

//                       {/* Animated Description Container - Appears BELOW title on hover */}
//                       {/* Revealed by max-h and animates with translate-y, no opacity on container itself for reveal */}
//                       <div className=" overflow-hidden max-h-0 translate-y-2 group-hover:max-h-36 group-hover:translate-y-0 group-hover:mt-1 md:group-hover:mt-1.5 transition-all duration-300 ease-in-out">
//                         <p className="text-base md:text-lg text-gray-300 group-hover:text-mainheading transition-all duration-300 ease-in-out ">
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;



// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// }

// const featuresData: Feature[] = [
//   {
//     id: "mta",
//     title: "Global Currency Exchange", // Removed leading space
//     description:
//       "Exchange currencies worldwide with real-time rates and zero hidden fees. Perfect for travelers and global shoppers.",
//     image: "/assets/images/lock.jpg", // Placeholder - use relevant images
//   },
//   {
//     id: "cr",
//     title: "Instant Money Transfers",
//     description:
//       "Send money across borders in seconds. Safe, secure, and lightning-fast transactions at your fingertips.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "msf",
//     title: "Live Market Rates",
//     description:
//       "Access up-to-the-minute exchange rates, charts, and trends. Make informed decisions before every transaction.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "ca",
//     title: "Secure Transactions",
//     description:
//       "Your security is our priority. We use advanced encryption and fraud protection to keep your money safe.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "bppd",
//     title: "Bank-Level Integration",
//     description:
//       "Seamlessly connect your bank accounts for hassle-free deposits and withdrawals, with full transparency and speed.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "fmf",
//     title: "Transparent Pricing",
//     description:
//       "Know exactly what you're paying for. We provide clear, upfront pricing with no hidden charges.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "gtms",
//     title: "24/7 Customer Support",
//     description:
//       "Need help? Our dedicated support team is available around the clock to assist with any issue or query.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
//   {
//     id: "bds",
//     title: "Mobile-Friendly Experience",
//     description:
//       "Manage your exchanges on the go. Our mobile-optimized platform works flawlessly on any device.",
//     image: "/assets/images/lock.jpg", // Placeholder
//   },
// ];

// const FeaturesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const horizontalScrollRef = useRef<HTMLDivElement>(null);
//   const cardsContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (
//       !sectionRef.current ||
//       !horizontalScrollRef.current ||
//       !cardsContainerRef.current
//     )
//       return;

//     const cardsEl = cardsContainerRef.current;
//     const horizontalEl = horizontalScrollRef.current;

//     // Debounce or delay calculation slightly to ensure layout is stable
//     const timer = setTimeout(() => {
//       const amountToScroll = cardsEl.scrollWidth - horizontalEl.offsetWidth;
//       if (amountToScroll <= 0) return;

//       const ctx = gsap.context(() => {
//         gsap.to(cardsEl, {
//           x: -amountToScroll,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             pin: true,
//             scrub: 1,
//             start: "top top",
//             end: () => `+=${amountToScroll}`,
//             invalidateOnRefresh: true,
//           },
//         });
//       }, sectionRef); // scope the context to sectionRef for cleanup

//       return () => {
//         ctx.revert();
//       };
//     }, 100); // Small delay

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-20 bg-background overflow-hidden" // Assuming bg-background is a dark color
//     >
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left mb-16 md:mb-24">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-mainheadingWhite">
//             Smart Global <span className="text-primary">Money Solutions</span>
//           </h3>
//           <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//             Experience seamless, secure, and smart financial services—all in one
//             place. From global currency exchange and real-time market rates to
//             instant money transfers and bank-level integrations, we offer
//             everything you need for safe, transparent, and lightning-fast
//             transactions across the globe.
//           </p>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full">
//           <div ref={cardsContainerRef} className="flex items-stretch gap-6 md:gap-8"> {/* Use items-stretch if cards have different content affecting height */}
//             {featuresData.map((feature) => {
//               return (
//                 <div
//                   key={feature.id}
//                   // Increased width, defined height. `bg-neutral-800` or similar as a base if images don't load.
//                   className={`group relative w-[28rem] h-[24rem] md:w-[36rem] md:h-[28rem] flex-shrink-0 cursor-pointer overflow-hidden bg-neutral-800 text-white rounded-2xl shadow-xl`}
//                 >
//                   {/* Background Image: Fills the card, slight zoom on hover */}
//                   <Image
//                     src={feature.image}
//                     alt={feature.title} // More descriptive alt text
//                     layout="fill"
//                     objectFit="cover"
//                     className="absolute inset-0 transition-transform duration-500 ease-in-out"
//                   />
                  
//                   {/* Content Overlay: Gradient from bottom, positions text */}
//                   <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    
//                     {/* Initial Title Display: Visible by default, fades/moves on hover */}
//                     <div className="p-4 md:p-6 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:-translate-y-10">
//                       <h3 className="text-xl md:text-2xl font-semibold line-clamp-2">
//                         {feature.title}
//                       </h3>
//                     </div>

//                     {/* Description Block: Slides up from bottom on hover */}
//                     <div 
//                       className="absolute bottom-0 left-0 w-full p-4 md:p-6
//                                  bg-black/70 backdrop-blur-sm rounded-t-xl  /* Semi-transparent bg for readability */
//                                  opacity-0 transform translate-y-[30%] group-hover:translate-y-0 group-hover:opacity-100
//                                  transition-all duration-400 ease-in-out"
//                     >
//                       <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 line-clamp-2">
//                         {feature.title} {/* Title repeated for context when description is shown */}
//                       </h3>
//                       <p className="text-sm md:text-base text-gray-200 max-h-[10rem] md:max-h-[12rem] overflow-y-auto custom-scrollbar">
//                         {/* max-h and overflow-y-auto for longer descriptions */}
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;



// "use client";
// import React from "react";
// import Image from "next/image";

// interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// }

// const featuresData: Feature[] = [
//   {
//     id: "mta",
//     title: "Global Currency Exchange",
//     description:
//       "Exchange currencies worldwide with real-time rates and zero hidden fees. Perfect for travelers and global shoppers.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "cr",
//     title: "Instant Money Transfers",
//     description:
//       "Send money across borders in seconds. Safe, secure, and lightning-fast transactions at your fingertips.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "msf",
//     title: "Live Market Rates",
//     description:
//       "Access up-to-the-minute exchange rates, charts, and trends. Make informed decisions before every transaction.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "ca",
//     title: "Secure Transactions",
//     description:
//       "Your security is our priority. We use advanced encryption and fraud protection to keep your money safe.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "bppd",
//     title: "Bank-Level Integration",
//     description:
//       "Seamlessly connect your bank accounts for hassle-free deposits and withdrawals, with full transparency and speed.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "fmf",
//     title: "Transparent Pricing",
//     description:
//       "Know exactly what you're paying for. We provide clear, upfront pricing with no hidden charges.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "gtms",
//     title: "24/7 Customer Support",
//     description:
//       "Need help? Our dedicated support team is available around the clock to assist with any issue or query.",
//     image: "/assets/images/lock.jpg",
//   },
//   {
//     id: "bds",
//     title: "Mobile-Friendly Experience",
//     description:
//       "Manage your exchanges on the go. Our mobile-optimized platform works flawlessly on any device.",
//     image: "/assets/images/lock.jpg",
//   },
// ];

// const FeaturesSection: React.FC = () => {
//   return (
//     <section className="relative py-20 ">
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//             Smart Global <span className="text-primary">Money Solutions</span>
//           </h3>
//           <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
//             Experience seamless, secure, and smart financial services—all in one
//             place. From global currency exchange and real-time market rates to
//             instant money transfers and bank-level integrations, we offer
//             everything you need for safe, transparent, and lightning-fast
//             transactions across the globe.
//           </p>
//         </div>

//         <div className="w-full overflow-x-auto pb-4">
//           <div className="flex items-stretch gap-6 md:gap-8">
//             {featuresData.map((feature) => {
//               return (
//                 <div
//                   key={feature.id}
//                   className={`group relative w-[28rem] h-[24rem] md:w-[36rem] md:h-[28rem] flex-shrink-0 cursor-pointer overflow-hidden bg-neutral-800 text-white rounded-2xl shadow-xl`}
//                 >
//                   <Image
//                     src={feature.image}
//                     alt={feature.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="absolute inset-0 transition-transform duration-500 ease-in-out"
//                   />

//                   <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">
//                     <div className="p-4 md:p-6 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:-translate-y-10">
//                       <h3 className="text-xl md:text-2xl font-semibold line-clamp-2">
//                         {feature.title}
//                       </h3>
//                     </div>

//                     <div
//                       className="absolute bottom-0 left-0 w-full p-4 md:p-6
//                                  bg-black/70 backdrop-blur-sm rounded-t-xl  /* Semi-transparent bg for readability */
//                                  opacity-0 transform translate-y-[30%] group-hover:translate-y-0 group-hover:opacity-100
//                                  transition-all duration-400 ease-in-out"
//                     >
//                       <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 line-clamp-2">
//                         {feature.title}
//                       </h3>
//                       <p className="text-sm md:text-base text-gray-200 max-h-[10rem] md:max-h-[12rem] overflow-y-auto custom-scrollbar">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ScrollTrigger should be imported for types if needed

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

const featuresData: Feature[] = [
  {
    id: "mta",
    title: "Global Currency Exchange",
    description:
      "Exchange currencies worldwide with real-time rates and zero hidden fees. Perfect for travelers and global shoppers.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "cr",
    title: "Instant Money Transfers",
    description:
      "Send money across borders in seconds. Safe, secure, and lightning-fast transactions at your fingertips.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "msf",
    title: "Live Market Rates",
    description:
      "Access up-to-the-minute exchange rates, charts, and trends. Make informed decisions before every transaction.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "ca",
    title: "Secure Transactions",
    description:
      "Your security is our priority. We use advanced encryption and fraud protection to keep your money safe.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "bppd",
    title: "Bank-Level Integration",
    description:
      "Seamlessly connect your bank accounts for hassle-free deposits and withdrawals, with full transparency and speed.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "fmf",
    title: "Transparent Pricing",
    description:
      "Know exactly what you're paying for. We provide clear, upfront pricing with no hidden charges.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "gtms",
    title: "24/7 Customer Support",
    description:
      "Need help? Our dedicated support team is available around the clock to assist with any issue or query.",
    image: "/assets/images/lock.jpg",
  },
  {
    id: "bds",
    title: "Mobile-Friendly Experience",
    description:
      "Manage your exchanges on the go. Our mobile-optimized platform works flawlessly on any device.",
    image: "/assets/images/lock.jpg",
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sliderContainer = sliderContainerRef.current;
    const sliderTrack = sliderTrackRef.current;

    if (!section || !sliderTrack || !sliderContainer) return;


    const setupScrollTrigger = () => {
      const amountToScroll = sliderTrack.scrollWidth - sliderContainer.offsetWidth;

      if (amountToScroll <= 0) {
        gsap.set(sliderTrack, { x: 0 });
        // If there was a ScrollTrigger, kill it
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger === section && st.vars.pin === section) {
                st.kill();
            }
        });
        return null; // Indicate no ScrollTrigger was created
      }

      return gsap.to(sliderTrack, {
        x: () => -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: section,
          pinType: "sticky" as ScrollTrigger.PinType | "sticky", //  <-- TYPE ASSERTION HERE
          start: "top top",
          end: () => `+=${amountToScroll}`,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: process.env.NODE_ENV === "development",
        },
      });
    };

    let ctx = gsap.context(() => {
        setupScrollTrigger();
    }, section);


    const handleResize = () => {
      // Revert the context to kill old ScrollTriggers and animations
      ctx.revert();
      // Re-setup within a new context
      ctx = gsap.context(() => {
          setupScrollTrigger();
      }, section);
      // ScrollTrigger.refresh() might be needed if not using invalidateOnRefresh effectively
      // or if other calculations outside GSAP depend on new sizes
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 py-20 overflow-hidden z-10">
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Smart Global <span className="text-primary">Money Solutions</span>
          </h3>
          <p className="text-lg md:text-xl text-subheadingWhite max-w-5xl">
            Experience seamless, secure, and smart financial services—all in one
            place. From global currency exchange and real-time market rates to
            instant money transfers and bank-level integrations, we offer
            everything you need for safe, transparent, and lightning-fast
            transactions across the globe.
          </p>
        </div>

        <div ref={sliderContainerRef} className="w-full mt-12 md:mt-16 pb-4">
          <div
            ref={sliderTrackRef}
            className="flex items-stretch gap-6 md:gap-8"
          >
            {featuresData.map((feature) => {
              return (
                <div
                  key={feature.id}
                  className={`group relative w-[28rem] h-[24rem] md:w-[36rem] md:h-[28rem] flex-shrink-0 cursor-pointer overflow-hidden bg-neutral-800 text-white rounded-2xl shadow-xl`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div className="p-4 md:p-6 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:-translate-y-10">
                      <h3 className="text-xl md:text-2xl font-semibold line-clamp-2">
                        {feature.title}
                      </h3>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 w-full p-4 md:p-6
                                 bg-black/70 backdrop-blur-sm rounded-t-xl
                                 opacity-0 transform translate-y-[30%] group-hover:translate-y-0 group-hover:opacity-100
                                 transition-all duration-400 ease-in-out"
                    >
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 line-clamp-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-200 max-h-[10rem] md:max-h-[12rem] overflow-y-auto custom-scrollbar">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;