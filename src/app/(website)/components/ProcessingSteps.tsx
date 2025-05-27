// import React from 'react'

// const ProcessingSteps = () => {
//   return (
//     <div className='text-white'>
//         New proccing in this section
//     </div>
//   )
// }

// export default ProcessingSteps

// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register GSAP ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// // Define the structure for card data
// interface CardData {
//   id: string;
//   number: string;
//   title: string;
//   description: string;
// }

// // Sample data for the cards
// const cardsData: CardData[] = [
//   {
//     id: "card1",
//     number: "01",
//     title: "Audience Segmentation",
//     description:
//       "Segment your ideal customer audience to allow for effective targeting.",
//   },
//   {
//     id: "card2",
//     number: "02",
//     title: "Customer Analysis",
//     description:
//       "Analyze your customers' pain points and pinpoint their triggers.",
//   },
//   {
//     id: "card3",
//     number: "03",
//     title: "Custom Marketing Strategy",
//     description:
//       "Create customized marketing content for each audience segment to boost marketing efficiency and support sales efforts.",
//   },
//   {
//     id: "card4",
//     number: "04",
//     title: "Strategic Partnerships",
//     description:
//       "Find and reach out to the right strategic partners to create win-win situations for you, your partners, and your customers.",
//   },
//   {
//     id: "card5",
//     number: "05",
//     title: "Sales Support",
//     description:
//       "Prepare sales scripts and materials to boost your sales force.",
//   },
//   {
//     id: "card6",
//     number: "06",
//     title: "Key Performance Indicators",
//     description:
//       "Establish measurable KPIs that help you stay focused on what matters.",
//   },
//   {
//     id: "card7",
//     number: "07",
//     title: "LAUNCH",
//     description:
//       "It's time to put it all together, prepare your team, and start reaping the benefits!",
//   },
// ];

// // Animation Constants
// const STACK_Y_OFFSET_INCREMENT = 32; // px, vertical offset for each card in the stack.
// const FINAL_SCALE_FOR_STACKED_CARD = 0.92; // Scale of cards when they are behind another.
// const UPWARD_SHIFT_BEHIND = 24; // px, how much a card moves upwards as it goes "behind" another.
// const CARD_START_Y_PERCENT = 100; // Cards (except the first) start 100% of their height below the container's top.
// const SCROLL_DURATION_PER_TRANSITION = 250; // px of scroll required for each card transition.

// const ProcessSection: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const stickyContainerRef = useRef<HTMLDivElement>(null); // This div will be pinned
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for individual cards

//   useEffect(() => {
//     // Ensure refs array is correctly sized
//     cardRefs.current = cardRefs.current.slice(0, cardsData.length);

//     const section = sectionRef.current;
//     const pinnedContainer = stickyContainerRef.current;

//     // Exit if essential refs are not available
//     if (!section || !pinnedContainer || cardRefs.current.some((ref) => !ref)) {
//       console.warn("ProcessSection: Refs not ready for GSAP animation.");
//       return;
//     }

//     const allCardElements = cardRefs.current as HTMLDivElement[];

//     // Set initial visual states for the cards using GSAP
//     // Card 0 (the first card) starts at its "top" position in the stack.
//     gsap.set(allCardElements[0], {
//       y: 0,
//       scale: 1,
//     });

//     // Other cards (1 to N-1) start below the visible area of the pinned container.
//     gsap.set(allCardElements.slice(1), {
//       yPercent: CARD_START_Y_PERCENT,
//       scale: 1, // You could also start them scaled down, e.g., scale: 0.8
//     });

//     // Calculate the total scroll distance needed for all card animations
//     const totalScrollForAnimation =
//       (cardsData.length - 1) * SCROLL_DURATION_PER_TRANSITION;

//     // Create the main GSAP timeline for the scroll-triggered animations
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section, // The entire section triggers the animation
//         pin: pinnedContainer, // The `stickyContainerRef` div will be pinned
//         scrub: 1, // Smooth scrubbing (syncs animation with scroll)
//         start: "top top", // Animation starts when the top of the section hits the top of the viewport
//         end: `+=${totalScrollForAnimation}`, // Animation ends after scrolling `totalScrollForAnimation` pixels
//         pinSpacing: true, // Adds padding to the trigger element to prevent layout jumps after unpinning
//         // markers: process.env.NODE_ENV === 'development', // Uncomment for GSAP debug markers during development
//       },
//     });

//     // Loop through cards to create animations for each transition
//     allCardElements.forEach((_, index) => {
//       // The last card doesn't have another card animating over it, and it doesn't need to scale down.
//       if (index === allCardElements.length - 1) return;

//       const cardToBecomeStacked = allCardElements[index]; // The card currently on top, which will move "behind"
//       const cardToAnimateIn = allCardElements[index + 1]; // The next card that will animate into view

//       // Add a label to the timeline for synchronizing animations
//       tl.addLabel(`cardTransition-${index}`);

//       // Animate `cardToAnimateIn` (the (i+1)th card):
//       // Move it from its initial off-screen position (yPercent: CARD_START_Y_PERCENT)
//       // to its final stacked position on top of the previous cards.
//       tl.to(
//         cardToAnimateIn,
//         {
//           yPercent: 0, // Reset yPercent to allow absolute `y` to take full control
//           y: (index + 1) * STACK_Y_OFFSET_INCREMENT, // Final y position in the stack
//           // scale: 1, // If it was initially scaled down
//           duration: 1, // Relative duration within the timeline; actual speed controlled by scrub & scroll
//         },
//         `cardTransition-${index}` // Synchronize with the animation of `cardToBecomeStacked`
//       );

//       // Animate `cardToBecomeStacked` (the i-th card):
//       // Scale it down and shift it slightly upwards to create the "stacked behind" effect.
//       tl.to(
//         cardToBecomeStacked,
//         {
//           scale: FINAL_SCALE_FOR_STACKED_CARD,
//           y: index * STACK_Y_OFFSET_INCREMENT - UPWARD_SHIFT_BEHIND,
//           duration: 1,
//         },
//         `cardTransition-${index}` // Run concurrently with the animation of `cardToAnimateIn`
//       );
//     });

//     // Cleanup function to kill GSAP animations and ScrollTriggers when the component unmounts
//     return () => {
//       tl.kill(); // Kill the timeline
//       // Kill specific ScrollTrigger instances associated with this component
//       // This is safer than ScrollTrigger.getAll().forEach(st => st.kill()) if other STs exist.
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (
//           trigger.vars.trigger === section ||
//           trigger.vars.pin === pinnedContainer
//         ) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-[#2A332F] text-white py-10"
//       // Ensure the section has enough height for the entire scroll animation.
//       // 100vh for initial view + scroll distance for animation + some buffer.
//       style={{
//         minHeight: `calc(100vh + ${
//           (cardsData.length - 1) * SCROLL_DURATION_PER_TRANSITION
//         }px + 50vh)`,
//       }}
//     >
//       <div className="container mx-auto flex h-full">
//         {/* Left Panel: "The Process" Title */}
//         <div className="w-1/3 flex-shrink-0">
//           {/* This container makes the title sticky relative to the viewport's scroll */}
//           <div className="sticky top-0 h-screen flex items-center justify-center">
//             <h2 className="text-6xl font-bold transform -rotate-90 origin-center whitespace-nowrap">
//               The Process
//             </h2>
//           </div>
//         </div>

//         {/* Right Panel: Animated Cards */}
//         <div className="w-2/3 pl-8">
//           {/* This is the container that will be pinned.
//               It's positioned down a bit using mt-[25vh] for aesthetic reasons. */}
//           <div
//             ref={stickyContainerRef}
//             className="relative h-[400px] w-full mt-[25vh]"
//           >
//             {cardsData.map((card, index) => (
//               <div
//                 key={card.id}
//                 ref={(el) => (cardRefs.current[index] = el)}
//                 // Base card styling
//                 className="card absolute top-0 left-0 w-full h-full bg-[#3B4A44] rounded-xl p-8 shadow-xl"
//                 // zIndex ensures cards stack correctly initially. Higher index = more on top.
//                 // GSAP animations will handle visual layering during transitions.
//                 style={{ zIndex: cardsData.length - index }}
//               >
//                 {/* Card Content */}
//                 <span className="text-5xl font-bold text-[#A3E635]">
//                   {card.number}
//                 </span>
//                 <h3 className="text-2xl font-semibold mt-3 mb-2 text-white">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm">{card.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProcessSection;


// import React from "react";

// // Define the structure for card data
// interface CardData {
//   id: string;
//   number: string;
//   title: string;
//   description: string;
// }

// // Sample data for the cards
// const cardsData: CardData[] = [
//   {
//     id: "card1",
//     number: "01",
//     title: "Audience Segmentation",
//     description:
//       "Segment your ideal customer audience to allow for effective targeting.",
//   },
//   {
//     id: "card2",
//     number: "02",
//     title: "Customer Analysis",
//     description:
//       "Analyze your customers' pain points and pinpoint their triggers.",
//   },
//   {
//     id: "card3",
//     number: "03",
//     title: "Custom Marketing Strategy",
//     description:
//       "Create customized marketing content for each audience segment to boost marketing efficiency and support sales efforts.",
//   },
//   {
//     id: "card4",
//     number: "04",
//     title: "Strategic Partnerships",
//     description:
//       "Find and reach out to the right strategic partners to create win-win situations for you, your partners, and your customers.",
//   },
//   {
//     id: "card5",
//     number: "05",
//     title: "Sales Support",
//     description:
//       "Prepare sales scripts and materials to boost your sales force.",
//   },
//   {
//     id: "card6",
//     number: "06",
//     title: "Key Performance Indicators",
//     description:
//       "Establish measurable KPIs that help you stay focused on what matters.",
//   },
//   {
//     id: "card7",
//     number: "07",
//     title: "LAUNCH",
//     description:
//       "It's time to put it all together, prepare your team, and start reaping the benefits!",
//   },
// ];

// const ProcessSection: React.FC = () => {
//   return (
//     <section
//       className="bg-[#2A332F] text-white py-10"
//       // The section height will be determined by its content.
//       // For the sticky title to have a scroll range, the content (especially cards)
//       // should make the section taller than the viewport.
//     >
//       <div className="container mx-auto flex">
//         {/* Left Panel: "The Process" Title */}
//         <div className="w-1/3 flex-shrink-0">
//           {/* This container uses CSS sticky positioning.
//               Its parent <section> needs to be scrollable for the sticky effect. */}
//           <div className="sticky top-0 h-screen flex items-center justify-center">
//             <h2 className="text-6xl font-bold transform -rotate-90 origin-center whitespace-nowrap">
//               The Process
//             </h2>
//           </div>
//         </div>

//         {/* Right Panel: Cards */}
//         <div className="w-2/3 pl-8">
//           {/* This div vertically lays out the cards.
//               mt-[25vh] pushes the block of cards down from the top of this panel. */}
//           <div className="w-full mt-[25vh]">
//             {cardsData.map((card) => (
//               <div
//                 key={card.id}
//                 // Card styling for a static vertical list
//                 className="card w-full bg-[#3B4A44] rounded-xl p-8 shadow-xl mb-6" // Added mb-6 for spacing
//               >
//                 {/* Card Content */}
//                 <span className="text-5xl font-bold text-[#A3E635]">
//                   {card.number}
//                 </span>
//                 <h3 className="text-2xl font-semibold mt-3 mb-2 text-white">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm">{card.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProcessSection;


// import React from "react";

// // Define the structure for card data
// interface CardData {
//   id: string;
//   number: string;
//   title: string;
//   description: string;
// }

// // Sample data for the cards
// const cardsData: CardData[] = [
//   {
//     id: "card1",
//     number: "01",
//     title: "Audience Segmentation",
//     description:
//       "Segment your ideal customer audience to allow for effective targeting.",
//   },
//   {
//     id: "card2",
//     number: "02",
//     title: "Customer Analysis",
//     description:
//       "Analyze your customers' pain points and pinpoint their triggers.",
//   },
//   {
//     id: "card3",
//     number: "03",
//     title: "Custom Marketing Strategy",
//     description:
//       "Create customized marketing content for each audience segment to boost marketing efficiency and support sales efforts.",
//   },
//   {
//     id: "card4",
//     number: "04",
//     title: "Strategic Partnerships",
//     description:
//       "Find and reach out to the right strategic partners to create win-win situations for you, your partners, and your customers.",
//   },
//   {
//     id: "card5",
//     number: "05",
//     title: "Sales Support",
//     description:
//       "Prepare sales scripts and materials to boost your sales force.",
//   },
//   {
//     id: "card6",
//     number: "06",
//     title: "Key Performance Indicators",
//     description:
//       "Establish measurable KPIs that help you stay focused on what matters.",
//   },
//   {
//     id: "card7",
//     number: "07",
//     title: "LAUNCH",
//     description:
//       "It's time to put it all together, prepare your team, and start reaping the benefits!",
//   },
// ];

// const ProcessSection: React.FC = () => {
//   // Base 'top' value for sticky positioning, using '14em' from your CSS.
//   const baseStickyTopEm = "14em";
//   // Increment for each subsequent card's 'top' value to create the stacking effect.
//   // A small pixel value like 10px often works well for a tight stack.
//   const stackingIncrementPx = 10; 

//   return (
//     <section
//       className="bg-[#2A332F] text-white py-10"
//       // The section height will be determined by its content.
//       // For the sticky title and cards to have a scroll range, the content
//       // should make the section taller than the viewport.
//     >
//       <div className="container mx-auto flex">
//         {/* Left Panel: "The Process" Title */}
//         <div className="w-1/3 flex-shrink-0">
//           <div className="sticky top-0 h-screen flex items-center justify-center">
//             <h2 className="text-6xl font-bold transform  origin-center whitespace-nowrap">
//               The Process
//             </h2>
//           </div>
//         </div>

//         {/* Right Panel: Cards */}
//         <div className="w-2/3 pl-8">
//           {/* This div vertically lays out the cards.
//               mt-[25vh] pushes the block of cards down, providing initial scroll space
//               before the first card reaches its sticky position.
//           */}
//           <div className="w-full mt-[25vh]">
//             {cardsData.map((card, index) => (
//               <div
//                 key={card.id}
//                 className="card w-full bg-[#3B4A44] rounded-xl p-8 shadow-xl mb-6" // mb-6 provides spacing in normal flow
//                 style={{
//                   position: "sticky",
//                   // Calculate the 'top' value for each card.
//                   // The first card (index 0) sticks at 'baseStickyTopEm'.
//                   // Subsequent cards stick 'stackingIncrementPx' lower than the previous one.
//                   top: `calc(${baseStickyTopEm} + ${index * stackingIncrementPx}px)`,
//                   // Note: `width: 100%` and `display: block` are effectively handled by `w-full` (Tailwind)
//                   // and the div's default display property.
//                   // zIndex can be used for explicit stacking control if needed, but DOM order
//                   // usually suffices for sticky elements (later elements stack on top).
//                 }}
//               >
//                 {/* Card Content */}
//                 <span className="text-5xl font-bold text-[#A3E635]">
//                   {card.number}
//                 </span>
//                 <h3 className="text-2xl font-semibold mt-3 mb-2 text-white">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm">{card.description}</p>
//               </div>
//             ))}
//             {/*
//               Optional: If the last card doesn't have enough room to scroll up and stick
//               for a noticeable duration, you might need to add a spacer div here or
//               increase padding-bottom on a parent container.
//               Example: <div style={{ height: "50vh" }} />
//             */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProcessSection;



import React from "react";

// Define the structure for card data
interface CardData {
  id: string;
  number: string;
  title: string;
  description: string;
}

// Sample data for the cards
const cardsData: CardData[] = [
  {
    id: "card1",
    number: "01",
    title: "Audience Segmentation",
    description:
      "Segment your ideal customer audience to allow for effective targeting.",
  },
  {
    id: "card2",
    number: "02",
    title: "Customer Analysis",
    description:
      "Analyze your customers' pain points and pinpoint their triggers.",
  },
  {
    id: "card3",
    number: "03",
    title: "Custom Marketing Strategy",
    description:
      "Create customized marketing content for each audience segment to boost marketing efficiency and support sales efforts.",
  },
  {
    id: "card4",
    number: "04",
    title: "Strategic Partnerships",
    description:
      "Find and reach out to the right strategic partners to create win-win situations for you, your partners, and your customers.",
  },
  {
    id: "card5",
    number: "05",
    title: "Sales Support",
    description:
      "Prepare sales scripts and materials to boost your sales force.",
  },
  {
    id: "card6",
    number: "06",
    title: "Key Performance Indicators",
    description:
      "Establish measurable KPIs that help you stay focused on what matters.",
  },
  {
    id: "card7",
    number: "07",
    title: "LAUNCH",
    description:
      "It's time to put it all together, prepare your team, and start reaping the benefits!",
  },
];

const ProcessSection: React.FC = () => {
  // Base 'top' value for sticky positioning of cards.
  const baseStickyTopEm = "14em"; // Or adjust as needed, e.g., "calc(25vh + 2rem)" if you want it relative to viewport height
  // Increment for each subsequent card's 'top' value to create the stacking effect.
  const stackingIncrementPx = 10; // e.g., 10px or 0.5rem

  return (
    <section
      className="bg-[#2A332F] text-white py-10"
      // This section is the primary scroll container for its content.
      // Its height needs to be sufficient for all sticky effects to play out.
    >
      <div className="container mx-auto flex">
        {/* Left Panel: "The Process" Title */}
        <div className="w-1/3 flex-shrink-0">
          {/* 
            This div is configured to be sticky.
            - `sticky`: Applies `position: sticky`.
            - `top-0`: Makes it stick to the top of its scrolling container.
            - `h-screen`: Makes its height equal to the viewport height.
            - `flex items-center justify-center`: Centers the h2 title within this full-height sticky div.
            As you scroll the page, this div (and thus "The Process" title) should remain
            fixed in the viewport once it reaches the top.
          */}
          <div className="sticky top-[40vh] flex items-center">
            <h2 className="text-6xl font-bold transform origin-center whitespace-nowrap">
              The Process
            </h2>
          </div>
        </div>

        {/* Right Panel: Cards */}
        <div className="w-2/3 pl-8">
          {/* 
            This div vertically lays out the cards.
            `mt-[25vh]` pushes the block of cards down, providing initial scroll space
            before the first card reaches its sticky position. This value might need
            to be coordinated with `baseStickyTopEm` if you want precise alignment.
          */}
          <div className="w-full mt-[25vh]">
            {cardsData.map((card, index) => (
              <div
                key={card.id}
                className="card w-full bg-[#3B4A44] rounded-xl p-8 shadow-xl mb-6"
                style={{
                  position: "sticky",
                  // Calculate the 'top' value for each card to create the stacking effect.
                  top: `calc(${baseStickyTopEm} + ${index * stackingIncrementPx}px)`,
                  // z-index can be used for more explicit stacking control if DOM order isn't sufficient,
                  // though for simple sticky stacking, DOM order (later elements on top) usually works.
                  // zIndex: cardsData.length - index, // Higher z-index for cards appearing earlier in the list if needed
                }}
              >
                {/* Card Content */}
                <span className="text-5xl font-bold text-[#A3E635]">
                  {card.number}
                </span>
                <h3 className="text-2xl font-semibold mt-3 mb-2 text-white">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;