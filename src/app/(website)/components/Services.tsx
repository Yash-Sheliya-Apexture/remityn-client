// import React from "react";

// const Services = () => {
//   return (
//     <section className="container mx-auto px-4 lg:my-10 my-5">
//       <h1 className="text-5xl md:text-7xl xl:text-[100px] font-mono font-black text-primary uppercase">
//         Services
//       </h1>

//       <div>
//             <div>
//               market thread
//             </div>
//       </div>

//     </section>
//   );
// };

// export default Services;

// "use client";

// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { JSX } from "react/jsx-runtime";

// // Register ScrollTrigger plugin with GSAP
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element; // Icon component
//   title: string;
//   description: string;
// }

// // --- Placeholder Icons (Replace with your actual SVGs) ---
// // You can use a library like heroicons or custom SVGs

// const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M3 13.125C3 12.504 3.504 12 4.125 12H6.875C7.496 12 8 12.504 8 13.125V20.25C8 20.871 7.496 21.375 6.875 21.375H4.125C3.504 21.375 3 20.871 3 20.25V13.125Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.125 6.375C10.125 5.754 10.629 5.25 11.25 5.25H13.875C14.496 5.25 15 5.754 15 6.375V20.25C15 20.871 14.496 21.375 13.875 21.375H11.25C10.629 21.375 10.125 20.871 10.125 20.25V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.25 10.313C17.25 9.692 17.754 9.188 18.375 9.188H21C21.621 9.188 22.125 9.692 22.125 10.313V20.25C22.125 20.871 21.621 21.375 21 21.375H18.375C17.754 21.375 17.25 20.871 17.25 20.25V10.313Z"
//     />
//   </svg>
// );

// const UserSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//     />
//     <circle cx="17.5" cy="17.5" r="2.5" strokeWidth="1.5" />
//     <line x1="19" y1="19" x2="21" y2="21" strokeWidth="1.5" />
//   </svg>
// );

// const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="10" />
//     <circle cx="12" cy="12" r="6" />
//     <circle cx="12" cy="12" r="2" />
//   </svg>
// );

// const PodiumIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.26 10.147a60.438 60.438 0 0 0-.491 0A.75.75 0 0 1 3 9.398V8.25c0-.828.75-1.5 1.5-1.5h5.25c.828 0 1.5.672 1.5 1.5v3.75c0 .828-.75 1.5-1.5 1.5h-2.25a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3v3.25c0 .828-.75 1.5-1.5 1.5h-3.25a.75.75 0 0 1-.75-.75V16.5h.75c.414 0 .75-.336.75-.75V15A.75.75 0 0 0 5.25 14.25H3.375c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h.75v2.25c0 .828.75 1.5 1.5 1.5h3.25a.75.75 0 0 0 .75-.75V13.5H9V9.75h-.75A.75.75 0 0 1 7.5 9V8.25A.75.75 0 0 0 6.75 7.5H4.5a.75.75 0 0 0-.75.75v1.147c0 .277.11.536.297.728Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12.75 6.375L12 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S10.906 2.25 10.5 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 6.375L18.75 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S17.156 2.25 16.75 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//   </svg>
// );

// const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.442 2.123-2.123M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-18 0A2.25 2.25 0 0 0 4.5 15h15a2.25 2.25 0 0 0 2.25-2.25m-18 0V12a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21.75 12v.75"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 8.25v-.75A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v.75"
//     />
//   </svg>
// );

// const DollarIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//     />
//   </svg>
// );

// const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M20.25 14.15v4.05c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V14.15M20.25 14.15v-2.475c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125V14.15m6.004-4.971-.712-7.126A8.956 8.956 0 0 0 12.004 2.25c-2.707 0-5.183.986-7.122 2.663L3.75 14.15M20.25 14.15h-1.5m-1.5 0H3.75m0 0V7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v6.65"
//     />
//   </svg>
// );

// const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//     />
//   </svg>
// );
// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: BarChartIcon,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: UserSearchIcon,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: TargetIcon,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: PodiumIcon,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FolderIcon,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: DollarIcon,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: TargetIcon,
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: BriefcaseIcon,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const ServicesSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const horizontalScrollRef = useRef<HTMLDivElement>(null); // Viewport for cards
//   const cardsContainerRef = useRef<HTMLDivElement>(null); // The element that will scroll

//   useEffect(() => {
//     if (
//       !sectionRef.current ||
//       !horizontalScrollRef.current ||
//       !cardsContainerRef.current
//     )
//       return;

//     const cardsEl = cardsContainerRef.current;
//     const horizontalEl = horizontalScrollRef.current;

//     // Calculate how much the cards container needs to scroll
//     // scrollWidth is the total width of the content (all cards + gaps)
//     // offsetWidth is the visible width of the viewport (horizontalScrollRef)
//     const amountToScroll = cardsEl.scrollWidth - horizontalEl.offsetWidth;

//     // If content fits or no overflow, no need to set up GSAP
//     if (amountToScroll <= 0) return;

//     const ctx = gsap.context(() => {
//       gsap.to(cardsEl, {
//         x: -amountToScroll, // Move left by the calculated amount
//         ease: "none", // Linear animation, no easing
//         scrollTrigger: {
//           trigger: sectionRef.current, // Element that triggers the animation
//           pin: true, // Pin the trigger element during the animation
//           scrub: 1, // Smoothly links animation to scroll (1s to catch up)
//           start: "top top", // Animation starts when top of trigger hits top of viewport
//           end: () => `+=${amountToScroll}`, // Animation ends after scrolling vertically by 'amountToScroll' pixels
//           // You can adjust this value (e.g., `"+=${amountToScroll * 1.5}"` for slower horizontal scroll)
//           invalidateOnRefresh: true, // Recalculate on window resize
//           // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
//         },
//       });
//     }, sectionRef); // Scope GSAP context for cleanup

//     return () => ctx.revert(); // Cleanup GSAP animations on component unmount
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden" // overflow-hidden on the main section
//     >
//       {/* This div is effectively what gets pinned and takes h-screen */}
//       <div className="h-screen flex flex-col justify-center">
//         {/* Title Container - aligned with page content */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-10 sm:mb-12 md:mb-16 text-left">
//             Services
//           </h2>
//         </div>

//         {/* Horizontal Scroll Viewport */}
//         {/* This div defines the "window" through which the cards are viewed. */}
//         <div ref={horizontalScrollRef} className="w-full">
//           {/* Cards Container - This element will move horizontally */}
//           {/* pl/pr here ensures the first/last cards align with the title block's padding */}
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8" // Use same padding as title container for alignment
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               return (
//                 <div
//                   key={service.id}
//                   className="group relative bg-[#2D2D2D] hover:bg-[#BDEE63] text-white hover:text-[#1A1A1A] p-6 rounded-2xl w-72 md:w-80 lg:w-[22rem] xl:w-[24rem] flex-shrink-0 transition-colors duration-300 ease-in-out cursor-pointer"
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowUpRightIcon className="w-5 h-5 md:w-6 md:h-6" />
//                   </div>

//                   <div className="mb-4 h-10 w-10 flex items-center justify-start">
//                     <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                   </div>
//                   <h3 className="text-lg md:text-xl font-semibold mb-2">
//                     {service.title}
//                   </h3>
//                   <p className="text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                     {service.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// "use client";

// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { JSX } from "react/jsx-runtime";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
//   title: string;
//   description: string;
// }

// // --- Placeholder Icons (Replace with your actual SVGs) ---
// const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M3 13.125C3 12.504 3.504 12 4.125 12H6.875C7.496 12 8 12.504 8 13.125V20.25C8 20.871 7.496 21.375 6.875 21.375H4.125C3.504 21.375 3 20.871 3 20.25V13.125Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.125 6.375C10.125 5.754 10.629 5.25 11.25 5.25H13.875C14.496 5.25 15 5.754 15 6.375V20.25C15 20.871 14.496 21.375 13.875 21.375H11.25C10.629 21.375 10.125 20.871 10.125 20.25V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.25 10.313C17.25 9.692 17.754 9.188 18.375 9.188H21C21.621 9.188 22.125 9.692 22.125 10.313V20.25C22.125 20.871 21.621 21.375 21 21.375H18.375C17.754 21.375 17.25 20.871 17.25 20.25V10.313Z"
//     />
//   </svg>
// );
// const UserSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//     />
//     <circle cx="17.5" cy="17.5" r="2.5" strokeWidth="1.5" />
//     <line x1="19" y1="19" x2="21" y2="21" strokeWidth="1.5" />
//   </svg>
// );
// const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="10" />
//     <circle cx="12" cy="12" r="6" />
//     <circle cx="12" cy="12" r="2" />
//   </svg>
// );
// const PodiumIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.26 10.147a60.438 60.438 0 0 0-.491 0A.75.75 0 0 1 3 9.398V8.25c0-.828.75-1.5 1.5-1.5h5.25c.828 0 1.5.672 1.5 1.5v3.75c0 .828-.75 1.5-1.5 1.5h-2.25a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3v3.25c0 .828-.75 1.5-1.5 1.5h-3.25a.75.75 0 0 1-.75-.75V16.5h.75c.414 0 .75-.336.75-.75V15A.75.75 0 0 0 5.25 14.25H3.375c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h.75v2.25c0 .828.75 1.5 1.5 1.5h3.25a.75.75 0 0 0 .75-.75V13.5H9V9.75h-.75A.75.75 0 0 1 7.5 9V8.25A.75.75 0 0 0 6.75 7.5H4.5a.75.75 0 0 0-.75.75v1.147c0 .277.11.536.297.728Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12.75 6.375L12 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S10.906 2.25 10.5 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 6.375L18.75 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S17.156 2.25 16.75 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//   </svg>
// );
// const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.442 2.123-2.123M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-18 0A2.25 2.25 0 0 0 4.5 15h15a2.25 2.25 0 0 0 2.25-2.25m-18 0V12a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21.75 12v.75"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 8.25v-.75A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v.75"
//     />
//   </svg>
// );
// const DollarIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//     />
//   </svg>
// );
// const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M20.25 14.15v4.05c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V14.15M20.25 14.15v-2.475c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125V14.15m6.004-4.971-.712-7.126A8.956 8.956 0 0 0 12.004 2.25c-2.707 0-5.183.986-7.122 2.663L3.75 14.15M20.25 14.15h-1.5m-1.5 0H3.75m0 0V7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v6.65"
//     />
//   </svg>
// );
// const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//     />
//   </svg>
// );
// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: BarChartIcon,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: UserSearchIcon,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: TargetIcon,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: PodiumIcon,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FolderIcon,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: DollarIcon,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: TargetIcon,
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: BriefcaseIcon,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// // Define clip-path strings as constants to keep className shorter
// // These use the CSS path() function for clip-path.
// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//           //   markers: process.env.NODE_ENV === 'development',
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden" // Main dark bg, default light text
//     >
//       <div className="h-screen flex flex-col justify-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#BDEE63] mb-10 sm:mb-12 md:mb-16 text-left">
//             Services
//           </h2>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full">
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8"
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;

//               // Constructing clip-path classes using arbitrary values
//               // Note: Ensure your TailwindCSS version supports this syntax well for clip-path.
//               const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//               const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//               return (
//                 <div
//                   key={service.id}
//                   className={`
//                     group relative p-6
//                     w-72 md:w-80 lg:w-[22rem] xl:w-[24rem] flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     hover:bg-[#BDEE63] hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass}
//                     transition-[background-color,color,clip-path] duration-300 ease-in-out
//                   `}
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowUpRightIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
//                   </div>

//                   <div className="mb-4 h-10 w-10 flex items-center justify-start">
//                     <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                   </div>

//                   <h3 className="text-lg md:text-xl font-semibold mb-2">
//                     {/* Color inherited from parent, will transition */}
//                     {service.title}
//                   </h3>

//                   {/* Using a standard Tailwind gray for default description text */}
//                   <p className="text-xs md:text-sm text-gray-300 group-hover:text-[#1A1A1A] group-hover:opacity-70 transition-colors duration-300 ease-in-out">
//                     {service.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// "use client";

// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
//   title: string;
//   description: string;
// }

// // --- Placeholder Icons (Replace with your actual SVGs) ---
// const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M3 13.125C3 12.504 3.504 12 4.125 12H6.875C7.496 12 8 12.504 8 13.125V20.25C8 20.871 7.496 21.375 6.875 21.375H4.125C3.504 21.375 3 20.871 3 20.25V13.125Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.125 6.375C10.125 5.754 10.629 5.25 11.25 5.25H13.875C14.496 5.25 15 5.754 15 6.375V20.25C15 20.871 14.496 21.375 13.875 21.375H11.25C10.629 21.375 10.125 20.871 10.125 20.25V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.25 10.313C17.25 9.692 17.754 9.188 18.375 9.188H21C21.621 9.188 22.125 9.692 22.125 10.313V20.25C22.125 20.871 21.621 21.375 21 21.375H18.375C17.754 21.375 17.25 20.871 17.25 20.25V10.313Z"
//     />
//   </svg>
// );
// const UserSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//     />
//     <circle cx="17.5" cy="17.5" r="2.5" strokeWidth="1.5" />
//     <line x1="19" y1="19" x2="21" y2="21" strokeWidth="1.5" />
//   </svg>
// );
// const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="10" />
//     <circle cx="12" cy="12" r="6" />
//     <circle cx="12" cy="12" r="2" />
//   </svg>
// );
// const PodiumIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.26 10.147a60.438 60.438 0 0 0-.491 0A.75.75 0 0 1 3 9.398V8.25c0-.828.75-1.5 1.5-1.5h5.25c.828 0 1.5.672 1.5 1.5v3.75c0 .828-.75 1.5-1.5 1.5h-2.25a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3v3.25c0 .828-.75 1.5-1.5 1.5h-3.25a.75.75 0 0 1-.75-.75V16.5h.75c.414 0 .75-.336.75-.75V15A.75.75 0 0 0 5.25 14.25H3.375c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h.75v2.25c0 .828.75 1.5 1.5 1.5h3.25a.75.75 0 0 0 .75-.75V13.5H9V9.75h-.75A.75.75 0 0 1 7.5 9V8.25A.75.75 0 0 0 6.75 7.5H4.5a.75.75 0 0 0-.75.75v1.147c0 .277.11.536.297.728Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12.75 6.375L12 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S10.906 2.25 10.5 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 6.375L18.75 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S17.156 2.25 16.75 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//   </svg>
// );
// const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.442 2.123-2.123M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-18 0A2.25 2.25 0 0 0 4.5 15h15a2.25 2.25 0 0 0 2.25-2.25m-18 0V12a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21.75 12v.75"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 8.25v-.75A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v.75"
//     />
//   </svg>
// );
// const DollarIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//     />
//   </svg>
// );
// const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M20.25 14.15v4.05c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V14.15M20.25 14.15v-2.475c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125V14.15m6.004-4.971-.712-7.126A8.956 8.956 0 0 0 12.004 2.25c-2.707 0-5.183.986-7.122 2.663L3.75 14.15M20.25 14.15h-1.5m-1.5 0H3.75m0 0V7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v6.65"
//     />
//   </svg>
// );
// const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//     />
//   </svg>
// );
// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: BarChartIcon,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: UserSearchIcon,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: TargetIcon,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: PodiumIcon,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FolderIcon,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: DollarIcon,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: TargetIcon,
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: BriefcaseIcon,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden"
//     >
//       <div className="h-screen flex flex-col justify-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#BDEE63] mb-10 sm:mb-12 md:mb-16 text-left">
//             Services
//           </h2>
//         </div>
//         <div ref={horizontalScrollRef} className="w-full">
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8"
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//               const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//               return (
//                 <div
//                   key={service.id}
//                   className={`
//                     group relative p-6
//                     w-72 md:w-80 lg:w-[22rem] xl:w-[24rem] flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     hover:bg-[#BDEE63] hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass}
//                     transition-[background-color,color,opacity,clip-path] duration-300 ease-in-out
//                   `}
//                   // Ensure Tailwind version supports arbitrary values for clip-path and transitions well.
//                   // The smoothness of clip-path animation via CSS depends on browser and path complexity.
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                     <ArrowUpRightIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
//                   </div>

//                   <div className="mb-4 h-10 w-10 flex items-center justify-start">
//                     <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                   </div>

//                   <h3 className="text-lg md:text-xl font-semibold mb-2">
//                     {service.title}
//                   </h3>

//                   <p className="text-xs md:text-sm text-gray-300 group-hover:text-[#1A1A1A] group-hover:opacity-70 transition-colors duration-300 ease-in-out">
//                     {service.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// "use client";

// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
//   title: string;
//   description: string;
// }

// // --- Placeholder Icons (Replace with your actual SVGs) ---
// const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M3 13.125C3 12.504 3.504 12 4.125 12H6.875C7.496 12 8 12.504 8 13.125V20.25C8 20.871 7.496 21.375 6.875 21.375H4.125C3.504 21.375 3 20.871 3 20.25V13.125Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M10.125 6.375C10.125 5.754 10.629 5.25 11.25 5.25H13.875C14.496 5.25 15 5.754 15 6.375V20.25C15 20.871 14.496 21.375 13.875 21.375H11.25C10.629 21.375 10.125 20.871 10.125 20.25V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.25 10.313C17.25 9.692 17.754 9.188 18.375 9.188H21C21.621 9.188 22.125 9.692 22.125 10.313V20.25C22.125 20.871 21.621 21.375 21 21.375H18.375C17.754 21.375 17.25 20.871 17.25 20.25V10.313Z"
//     />
//   </svg>
// );
// const UserSearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//     />
//     <circle cx="17.5" cy="17.5" r="2.5" strokeWidth="1.5" />
//     <line x1="19" y1="19" x2="21" y2="21" strokeWidth="1.5" />
//   </svg>
// );
// const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="10" />
//     <circle cx="12" cy="12" r="6" />
//     <circle cx="12" cy="12" r="2" />
//   </svg>
// );
// const PodiumIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.26 10.147a60.438 60.438 0 0 0-.491 0A.75.75 0 0 1 3 9.398V8.25c0-.828.75-1.5 1.5-1.5h5.25c.828 0 1.5.672 1.5 1.5v3.75c0 .828-.75 1.5-1.5 1.5h-2.25a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3v3.25c0 .828-.75 1.5-1.5 1.5h-3.25a.75.75 0 0 1-.75-.75V16.5h.75c.414 0 .75-.336.75-.75V15A.75.75 0 0 0 5.25 14.25H3.375c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h.75v2.25c0 .828.75 1.5 1.5 1.5h3.25a.75.75 0 0 0 .75-.75V13.5H9V9.75h-.75A.75.75 0 0 1 7.5 9V8.25A.75.75 0 0 0 6.75 7.5H4.5a.75.75 0 0 0-.75.75v1.147c0 .277.11.536.297.728Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12.75 6.375L12 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S10.906 2.25 10.5 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 6.375L18.75 5.625l-.75.75m1.5 0V3.375c0-.405-.229-.772-.568-.95S17.156 2.25 16.75 2.25h-3c-.406 0-.772.138-.95.385s-.229.545-.229.95v3c0 .405.229.772.568.95.17.087.358.13.542.13h.604c.266 0 .512-.106.693-.293l.603-.603c.22-.22.538-.348.869-.348h.375c.331 0 .649.128.869.348l.603.603c.181.187.427.293.693.293h.604c.184 0 .372-.043.542-.13.339-.178.568-.545.568-.95V6.375Z"
//     />
//   </svg>
// );
// const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.442 2.123-2.123M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-18 0A2.25 2.25 0 0 0 4.5 15h15a2.25 2.25 0 0 0 2.25-2.25m-18 0V12a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21.75 12v.75"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.25 8.25v-.75A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v.75"
//     />
//   </svg>
// );
// const DollarIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//     />
//   </svg>
// );
// const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M20.25 14.15v4.05c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V14.15M20.25 14.15v-2.475c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125V14.15m6.004-4.971-.712-7.126A8.956 8.956 0 0 0 12.004 2.25c-2.707 0-5.183.986-7.122 2.663L3.75 14.15M20.25 14.15h-1.5m-1.5 0H3.75m0 0V7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v6.65"
//     />
//   </svg>
// );
// const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//     />
//   </svg>
// );
// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: BarChartIcon,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: UserSearchIcon,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: TargetIcon,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: PodiumIcon,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FolderIcon,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: DollarIcon,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: TargetIcon,
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: BriefcaseIcon,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden"
//     >
//       <div className="h-screen flex flex-col justify-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold text-[#BDEE63] text-left">
//             Services
//           </h2>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full">
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8"
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//               const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//               return (
//                 <div
//                   key={service.id}
//                   className={`
//                     group relative h-80 p-6
//                     w-72 md:w-80 flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     rounded-2xl
//                     hover:bg-[#BDEE63] hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass}
//                     transition-colors transition-[clip-path] duration-300 ease-in-out
//                   `}
//                   // The transition classes above are updated:
//                   // - 'transition-colors' handles background-color and text color.
//                   // - 'transition-[clip-path]' handles the clip-path property specifically.
//                   // - 'duration-300' and 'ease-in-out' apply to all specified transitions.
//                   // Ensure Tailwind version supports arbitrary values for clip-path and transitions well.
//                   // The smoothness of clip-path animation via CSS depends on browser and path complexity.
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                     <ArrowUpRightIcon className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
//                   </div>

//                   <div className="flex flex-col justify-between h-full">
//                     <div className="mb-4">
//                       <IconComponent className="size-16 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                     </div>

//                     <div>
//                       <h3 className="text-lg md:text-xl font-semibold mb-2">
//                         {service.title}
//                       </h3>

//                       <p className="text-xs md:text-sm text-gray-300 group-hover:text-[#1A1A1A] group-hover:opacity-70 transition-colors transition-opacity duration-300 ease-in-out">
//                         {/* Added 'transition-opacity' to animate the opacity change alongside color */}
//                         {service.description}
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

// export default ServicesSection;

// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // --- Import React Icons ---
// import {
//   FiBarChart2, // For BarChartIcon
//   FiUsers, // For UserSearchIcon (alternative) or FiUserCheck
//   FiTarget, // For TargetIcon
//   FiAward, // For PodiumIcon
//   FiFolder, // For FolderIcon
//   FiDollarSign, // For DollarIcon
//   FiBriefcase, // For BriefcaseIcon
//   FiArrowUpRight, // For ArrowUpRightIcon
// } from "react-icons/fi"; // Using Feather Icons, but you can choose others

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: React.ElementType; // Updated to React.ElementType for react-icons
//   title: string;
//   description: string;
// }

// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: FiBarChart2,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: FiUsers, // Or FiUserCheck, FiSearch (for user search)
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: FiTarget,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: FiAward,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FiFolder,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: FiDollarSign,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: FiTarget, // Reusing FiTarget, or you could use FiNavigation, FiSend etc.
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: FiBriefcase,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden"
//     >
//       <div className="h-screen flex flex-col justify-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold text-[#BDEE63] text-left">
//             Services
//           </h2>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full">
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8"
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//               const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//               return (
//                 <div
//                   key={service.id}
//                   className={`
//                     group relative h-80 p-6
//                     w-72 md:w-80 flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     rounded-2xl
//                     hover:bg-[#BDEE63] hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass}
//                     transition-colors transition-[clip-path] duration-300 ease-in-out
//                   `}
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                     {/* Using FiArrowUpRight from react-icons */}
//                     <FiArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
//                   </div>

//                   <div className="flex flex-col justify-between h-full">
//                     <div className="mb-4">
//                       {/* Using react-icons component directly */}
//                       <IconComponent className="size-16 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                     </div>

//                     {/* Content Area */}
//                     <div>
//                       <h3 className="text-lg md:text-xl font-semibold mb-2">
//                         {service.title}
//                       </h3>

//                       <p className="text-xs md:text-sm text-gray-300 group-hover:text-[#1A1A1A] group-hover:opacity-70 transition-colors transition-opacity duration-300 ease-in-out">
//                         {service.description}
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

// export default ServicesSection;

// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // --- Import React Icons ---
// import {
//   FiBarChart2, // For BarChartIcon
//   FiUsers, // For UserSearchIcon (alternative) or FiUserCheck
//   FiTarget, // For TargetIcon
//   FiAward, // For PodiumIcon
//   FiFolder, // For FolderIcon
//   FiDollarSign, // For DollarIcon
//   FiBriefcase, // For BriefcaseIcon
//   FiArrowUpRight, // For ArrowUpRightIcon
// } from "react-icons/fi"; // Using Feather Icons, but you can choose others

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: React.ElementType; // Updated to React.ElementType for react-icons
//   title: string;
//   description: string;
// }

// // --- End Placeholder Icons ---

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: FiBarChart2,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: FiUsers, // Or FiUserCheck, FiSearch (for user search)
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: FiTarget,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: FiAward,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FiFolder,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: FiDollarSign,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: FiTarget, // Reusing FiTarget, or you could use FiNavigation, FiSend etc.
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: FiBriefcase,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-[#1A1A1A] text-white py-10 overflow-hidden"
//     >
//       <div className="h-screen flex flex-col justify-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold text-[#BDEE63] text-left">
//             Services
//           </h2>
//         </div>

//         <div ref={horizontalScrollRef} className="w-full">
//           <div
//             ref={cardsContainerRef}
//             className="flex space-x-6 py-4 px-4 sm:px-6 lg:px-8"
//           >
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//               const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//               return (
//                 <div
//                   key={service.id}
//                   className={`
//                     group relative h-80 p-6
//                     w-72 md:w-80 flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     rounded-2xl
//                     hover:bg-[#BDEE63] hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass}
//                     transition-colors transition-[clip-path] duration-300 ease-in-out
//                   `}
//                 >
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                     <FiArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
//                   </div>

//                   <div className="flex flex-col justify-between h-full">
//                     {/* Icon Area */}
//                     <div className="mb-4">
//                       <IconComponent className="size-16 text-[#BDEE63] group-hover:text-[#1A1A1A] transition-colors duration-300 ease-in-out" />
//                     </div>

//                     {/* Content Area: Title always visible, Description animates on hover */}
//                     <div>
//                       <h3 className="text-lg md:text-xl font-semibold mb-1">
//                         {service.title}
//                       </h3>

//                       {/* Animated Description Container */}
//                       <div
//                         className="
//                           overflow-hidden
//                           max-h-0 opacity-0
//                           group-hover:max-h-28 group-hover:opacity-100 {/* Adjust max-h as needed, max-h-28 is 7rem/112px */}
//                           transition-all duration-300 ease-in-out
//                         "
//                       >
//                         <p
//                           className="
//                             text-xs md:text-sm text-gray-300
//                             group-hover:text-[#1A1A1A] group-hover:opacity-70
//                             transition-colors transition-opacity duration-300 ease-in-out
//                             pt-1 {/* Padding top to space it from the title when visible */}
//                           "
//                         >
//                           {service.description}
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

// export default ServicesSection;

// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // --- Import React Icons ---
// import {
//   FiBarChart2, // For BarChartIcon
//   FiUsers, // For UserSearchIcon (alternative) or FiUserCheck
//   FiTarget, // For TargetIcon
//   FiAward, // For PodiumIcon
//   FiFolder, // For FolderIcon
//   FiDollarSign, // For DollarIcon
//   FiBriefcase, // For BriefcaseIcon
//   FiArrowUpRight, // For ArrowUpRightIcon
// } from "react-icons/fi"; // Using Feather Icons, but you can choose others

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: FiBarChart2,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: FiUsers,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: FiTarget,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: FiAward,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FiFolder,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: FiDollarSign,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: FiTarget,
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: FiBriefcase,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-background text-white pt-20 overflow-hidden"
//     >
//       <div className="h-full flex flex-col justify-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold font-mono text-primary uppercase text-left">
//             Services
//           </h2>

//           <div ref={horizontalScrollRef} className="w-full">
//             <div
//               ref={cardsContainerRef}
//               className="flex space-x-6 py-4 px-4"
//             >
//               {servicesData.map((service) => {
//                 const IconComponent = service.icon;
//                 const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//                 const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//                 return (
//                   <div
//                     key={service.id}
//                     className={`
//                     group relative h-90 p-6
//                     w-72 md:w-90 flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     rounded-2xl
//                     hover:bg-primary hover:text-[#1A1A1A]
//                     ${defaultClipClass}
//                     ${hoverClipClass} duration-300 ease-in-out
//                   `}
//                   >
//                     <div className="absolute top-4 right-4 transition-opacity duration-300 ease-in-out">
//                       <FiArrowUpRight className="size-8 text-mainheading group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out" />
//                     </div>

//                     {/* Main card content: Icon at top, Text block (Title+Description) at bottom */}
//                     <div className="flex flex-col justify-between h-full">
//                       {/* Icon Area */}
//                       <div className="mb-4">
//                         {/* Ensures space below icon, pushing text content down */}
//                         <IconComponent className="size-16 text-primary group-hover:text-mainheading transition-colors duration-300 ease-in-out" />
//                       </div>

//                       {/* Text Content Block: Title and Description. This div is pushed to bottom by justify-between. */}
//                       <div>
//                         {/* Title - moves up on hover */}
//                         <h3
//                           className="text-2xl md:text-3xl font-semibold
//                                      transform transition-transform duration-300 ease-in-out
//                                      group-hover:-translate-y-2 md:group-hover:-translate-y-3"
//                         >
//                           {" "}
//                           {/* Moves title up */}
//                           {service.title}
//                         </h3>

//                         {/* Animated Description Container - Appears BELOW title on hover */}
//                         <div
//                           className="
//                           overflow-hidden
//                           max-h-0 opacity-0 translate-y-2 {/* Initial: collapsed, hidden, slightly down for its own slide-up effect */}
//                           group-hover:max-h-36 group-hover:opacity-100 group-hover:translate-y-0 {/* Expanded and visible on hover */}
//                           group-hover:mt-1 md:group-hover:mt-1.5  {/* Add margin-top for spacing from title ONLY on hover */}
//                           transition-all duration-300 ease-in-out
//                         "
//                         >
//                           <p
//                             className="
//                             text-base md:text-lg text-gray-300
//                             group-hover:text-mainheading group-hover:opacity-70
//                             duration-300 ease-in-out
//                           "
//                           >
//                             {service.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// "use client";
// // src/components/ServicesSection.tsx
// import React, { useRef, useEffect, JSX } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // --- Import React Icons ---
// import {
//   FiBarChart2, // For BarChartIcon
//   FiUsers, // For UserSearchIcon (alternative) or FiUserCheck
//   FiTarget, // For TargetIcon
//   FiAward, // For PodiumIcon
//   FiFolder, // For FolderIcon
//   FiDollarSign, // For DollarIcon
//   FiBriefcase, // For BriefcaseIcon
//   FiArrowUpRight, // For ArrowUpRightIcon
// } from "react-icons/fi"; // Using Feather Icons, but you can choose others

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface Service {
//   id: string;
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }

// const servicesData: Service[] = [
//   {
//     id: "mta",
//     icon: FiBarChart2,
//     title: "Market Trends Analysis",
//     description:
//       "Discover winning trends before everyone else and see how you can take advantage.",
//   },
//   {
//     id: "cr",
//     icon: FiUsers,
//     title: "Customer Research",
//     description:
//       "See how your customers live, think, and act and learn how to position your offering accordingly.",
//   },
//   {
//     id: "msf",
//     icon: FiTarget,
//     title: "Market Sizing and Forecasting",
//     description:
//       "Understand the potential of your market and project future growth with data-driven insights.",
//   },
//   {
//     id: "ca",
//     icon: FiAward,
//     title: "Competitive Analysis",
//     description:
//       "Learn who you're up against, what makes them tick, and how to remain one step ahead.",
//   },
//   {
//     id: "bppd",
//     icon: FiFolder,
//     title: "Business Plan & Pitch Deck",
//     description:
//       "Planning your new venture? We'll help you tell your story in a way that gets people excited to join and invest.",
//   },
//   {
//     id: "fmf",
//     icon: FiDollarSign,
//     title: "Financial Modeling and Forecasting",
//     description:
//       "Cashflow is king. We can help you model your revenue and expenses month by month so you know what to expect.",
//   },
//   {
//     id: "gtms",
//     icon: FiTarget, // Using FiTarget again, as in original
//     title: "Go-to-Market Strategy",
//     description:
//       "Craft a winning plan to launch your product or service and effectively reach your target customers.",
//   },
//   {
//     id: "bds",
//     icon: FiBriefcase,
//     title: "Business Development Strategy",
//     description:
//       "Identify new opportunities, build strategic partnerships, and expand your business reach.",
//   },
// ];

// const roundedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
// const notchedCardClipPathValue =
//   "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

// const ServicesSection: React.FC = () => {
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
//       className="relative bg-background text-white pt-20 overflow-hidden" // Assuming bg-background is a dark color
//     >
//       <div className="h-full flex flex-col justify-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold font-mono text-primary uppercase text-left">
//             Services
//           </h2>

//           <div ref={horizontalScrollRef} className="w-full">
//             <div ref={cardsContainerRef} className="flex space-x-6 py-4 px-4">
//               {servicesData.map((service) => {
//                 const IconComponent = service.icon;
//                 const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
//                 const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

//                 return (
//                   <div
//                     key={service.id}
//                     className={`
//                     group relative h-90 p-6
//                     w-72 md:w-90 flex-shrink-0
//                     cursor-pointer overflow-hidden
//                     bg-[#2D2D2D] text-white
//                     rounded-2xl
//                     hover:bg-[#adfa1c] hover:text-[#1A1A1A]  /* MODIFIED HERE */
//                     ${defaultClipClass}
//                     ${hoverClipClass} duration-300 ease-in-out
//                   `}
//                   >
//                     <div className="absolute top-4 right-4 transition-opacity duration-300 ease-in-out">
//                       {/* Assuming text-mainheading is a dark color suitable for #adfa1c background */}
//                       <FiArrowUpRight className="size-8 text-mainheading group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out" />
//                     </div>

//                     {/* Main card content: Icon at top, Text block (Title+Description) at bottom */}
//                     <div className="flex flex-col justify-between h-full">
//                       {/* Icon Area */}
//                       <div className="mb-4">
//                         {/* text-primary for default icon color, group-hover:text-mainheading for icon color on hover */}
//                         {/* Ensure text-mainheading provides good contrast on #adfa1c background */}
//                         <IconComponent className="size-16 text-primary group-hover:text-mainheading transition-colors duration-300 ease-in-out" />
//                       </div>

//                       {/* Text Content Block: Title and Description. This div is pushed to bottom by justify-between. */}
//                       <div>
//                         {/* Title - inherits hover:text-[#1A1A1A] from parent card */}
//                         <h3
//                           className="text-2xl md:text-3xl font-semibold
//                                      transform transition-transform duration-300 ease-in-out
//                                      group-hover:-translate-y-2 md:group-hover:-translate-y-3"
//                         >
//                           {service.title}
//                         </h3>

//                         {/* Animated Description Container - Appears BELOW title on hover */}
//                         <div
//                           className="
//                           overflow-hidden
//                           max-h-0 opacity-0 translate-y-2 {/* Initial: collapsed, hidden, slightly down for its own slide-up effect */}
//                           group-hover:max-h-36 group-hover:opacity-100
//                           group-hover:-translate-y-2 md:group-hover:-translate-y-3
//                           transition-all duration-300 ease-in-out
//                         "
//                         >
//                           <p
//                             className="
//                             text-base md:text-lg text-gray-300
//                             group-hover:text-mainheading group-hover:opacity-70 /* Ensure text-mainheading is dark */
//                             duration-300 ease-in-out
//                           "
//                           >
//                             {service.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

"use client";
// src/components/ServicesSection.tsx
import React, { useRef, useEffect, JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// --- Import React Icons ---
import {
  FiArrowUpRight, // For ArrowUpRightIcon
} from "react-icons/fi"; // Using Feather Icons, but you can choose others
import { FaBolt, FaGlobeAmericas, FaLock, FaMobileAlt } from "react-icons/fa";
import { MdBolt, MdOutlineReceiptLong } from "react-icons/md";
import {
  RiBankLine,
  RiCustomerService2Line,
  RiStockLine,
} from "react-icons/ri";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    id: "mta",
    icon: FaGlobeAmericas,
    title: " Global Currency Exchange",
    description:
      "Exchange currencies worldwide with real-time rates and zero hidden fees. Perfect for travelers and global shoppers.",
  },

  {
    id: "cr",
    icon: FaBolt,
    title: "Instant Money Transfers",
    description:
      "Send money across borders in seconds. Safe, secure, and lightning-fast transactions at your fingertips.",
  },
  {
    id: "msf",
    icon: RiStockLine,
    title: "Live Market Rates",
    description:
      "Access up-to-the-minute exchange rates, charts, and trends. Make informed decisions before every transaction.",
  },
  {
    id: "ca",
    icon: FaLock,
    title: "Secure Transactions",
    description:
      "Your security is our priority. We use advanced encryption and fraud protection to keep your money safe.",
  },
  {
    id: "bppd",
    icon: RiBankLine,
    title: "Bank-Level Integration",
    description:
      "Seamlessly connect your bank accounts for hassle-free deposits and withdrawals, with full transparency and speed",
  },
  {
    id: "fmf",
    icon: MdOutlineReceiptLong,
    title: "Transparent Pricing",
    description:
      "Know exactly what you're paying for. We provide clear, upfront pricing with no hidden charges.",
  },
  {
    id: "gtms",
    icon: RiCustomerService2Line, // Using FiTarget again, as in original
    title: "24/7 Customer Support",
    description:
      "Need help? Our dedicated support team is available around the clock to assist with any issue or query.",
  },
  {
    id: "bds",
    icon: FaMobileAlt,
    title: "Mobile-Friendly Experience",
    description:
      "Manage your exchanges on the go. Our mobile-optimized platform works flawlessly on any device.",
  },
];

const roundedCardClipPathValue =
  "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 16px) 0 A16,16 0 0 1 100% 16 L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";
const notchedCardClipPathValue =
  "path('M0,16 A16,16 0 0 1 16,0 L calc(100% - 48px) 0 Q 100% 0 100% 48px L 100% calc(100% - 16px) A16,16 0 0 1 calc(100% - 16px) 100% L 16,100% A16,16 0 0 1 0,calc(100% - 16px) Z')";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !horizontalScrollRef.current ||
      !cardsContainerRef.current
    )
      return;
    const cardsEl = cardsContainerRef.current;
    const horizontalEl = horizontalScrollRef.current;
    const amountToScroll = cardsEl.scrollWidth - horizontalEl.offsetWidth;
    if (amountToScroll <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(cardsEl, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-white pt-20 overflow-hidden" // Assuming bg-background is a dark color
    >
      <div className="h-full sm:flex grid grid-cols-1 justify-center">
        <div className="container mx-auto px-4 space-y-3">
          <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase max-w-2xl">
            Smart Global
            <span className="text-primary"> Money Solutions </span>
          </h1>

          <p className="text-gray-300 lg:text-lg text-base">
            Experience seamless, secure, and smart financial services—all in one
            place. From global currency exchange and real-time market rates to
            instant money transfers and bank-level integrations, we offer
            everything you need for safe, transparent, and lightning-fast
            transactions across the globe.
          </p>

          <div ref={horizontalScrollRef} className="w-full">
            <div ref={cardsContainerRef} className="flex space-x-6 py-4">
              {servicesData.map((service) => {
                const IconComponent = service.icon;
                const defaultClipClass = `[clip-path:${roundedCardClipPathValue}]`;
                const hoverClipClass = `hover:[clip-path:${notchedCardClipPathValue}]`;

                return (
                  <div
                    key={service.id}
                    className={`
                    group relative p-6
                    size-70 md:size-90 flex-shrink-0
                    cursor-pointer border overflow-hidden
                    bg-primarybox
                    text-white
                    rounded-2xl
                    hover:bg-primary hover:text-neutral-900
                    ${defaultClipClass}
                    ${hoverClipClass} duration-300 ease-in-out
                  `}
                  >
                    <div className="absolute top-5 right-5">
                      <FiArrowUpRight className="size-8 text-gray-100 opacity-0 group-hover:opacity-100 group-hover:text-neutral-900 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out" />
                    </div>

                    {/* Main card content: Icon at top, Text block (Title+Description) at bottom */}
                    <div className="flex flex-col justify-between h-full">
                      {/* Icon Area */}

                      <div className="mb-4 lg:size-16 size-12 bg-background rounded-full flex items-center justify-center">
                        <IconComponent className="md:size-8 size-6 text-primary transition-colors duration-300 ease-in-out" />
                      </div>

                      {/* Text Content Block: Title and Description. */}
                      <div>
                        {/* Title - animates independently */}
                        <h3
                          className="text-2xl md:text-3xl font-semibold
                                     transform transition-transform duration-300 ease-in-out
                                     group-hover:-translate-y-2 md:group-hover:-translate-y-3"
                        >
                          {service.title}
                        </h3>

                        {/* Animated Description Container - Appears BELOW title on hover */}
                        {/* Revealed by max-h and animates with translate-y, no opacity on container itself for reveal */}
                        <div
                          className="
                          overflow-hidden
                          max-h-0 translate-y-2 {/* Initial: collapsed, slightly down for its own slide-up effect */}
                          group-hover:max-h-36 group-hover:translate-y-0 {/* Expanded and moves to final position on hover */}
                          group-hover:mt-1 md:group-hover:mt-1.5  {/* Add margin-top for spacing from title ONLY on hover */}
                          transition-all duration-300 ease-in-out
                        "
                        >
                          <p
                            className="
                            text-base md:text-lg text-gray-300
                            group-hover:text-mainheading /* Text color and its own opacity for appearance */
                            transition-all duration-300 ease-in-out /* Transitions for text properties */
                          "
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
