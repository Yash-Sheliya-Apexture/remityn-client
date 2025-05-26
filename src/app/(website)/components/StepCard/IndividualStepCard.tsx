// // src/components/IndividualStepCard.tsx
// import React from "react";
// import Image from "next/image";
// import { StepData, ContentBlock } from "../../../../types/step-data"; // Adjust path as needed

// // Helper function to get CSS classes (moved here as it's specific to this card's rendering)
// const getBlockClasses = (type: ContentBlock["type"]) => {
//   switch (type) {
//     case "success": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-green-600 bg-green-100 dark:bg-green-600/20 dark:text-green-400";
//     case "warning": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 dark:text-yellow-400";
//     case "secondry": return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400";
//     default: return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-gray-600 bg-gray-100 dark:bg-gray-600/20 dark:text-gray-400";
//   }
// };

// export interface IndividualStepCardProps {
//   step: StepData;
//   isFirst: boolean;
// }

// const IndividualStepCard: React.FC<IndividualStepCardProps> = ({ step, isFirst }) => {
//   return (
//     <>
//     <div
//       className="mx-auto w-[90vw] max-w-4xl
//                  min-h-[480px] md:min-h-[520px]
//                  max-h-[650px]
//                  border
//                  rounded-3xl bg-white dark:bg-neutral-900
//                  p-6 sm:p-8 shadow-2xl overflow-hidden"
//     >
//       <div className="flex flex-col lg:flex-row h-full">
//         <div className="lg:w-1/2 w-full flex flex-col pr-0 lg:pr-6">
//           <div className="space-y-3 mb-4 lg:mb-6">
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-white">
//               {step.contentTitle}
//             </h3>
//             <p className="text-neutral-600 dark:text-neutral-300 lg:text-base text-sm">
//               {step.contentSubtitle}
//             </p>
//           </div>

//           <div className="relative flex-grow flex items-center justify-center mt-4 lg:mt-0">
//             <Image
//               src={step.contentImages.light}
//               alt={`${step.title} illustration (light)`}
//               width={450}
//               height={450}
//               style={{ maxHeight: "320px", objectFit: "contain", width: "auto" }}
//               priority={isFirst}
//             />

//           </div>
//         </div>
//         <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end justify-center lg:justify-start pt-6 lg:pt-0 mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l border-neutral-300 dark:border-neutral-700 lg:pl-6">
//           {step.contentBlocks && (
//             <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
//               {step.contentBlocks.map((block, blockIndex) => (
//                 <div
//                   key={blockIndex}
//                   className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(block.type)}`}
//                 >
//                   {block.text}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     {/* This overlay seems intended for individual card interactions, not the scroll-stacking. Kept as is. */}
//     <div className="sticky-card-overlay absolute inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-300"></div>
//     </>
//   );
// };

// export default IndividualStepCard;

// src/components/IndividualStepCard.tsx
import React from "react";
import Image from "next/image";
import { StepData, ContentBlock } from "../../../../types/step-data"; // Adjust path as needed

// Helper function to get CSS classes
const getBlockClasses = (type: ContentBlock["type"]) => {
  switch (type) {
    case "success":
      return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-mainheading bg-primary ";
    case "warning":
      return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-mainheadingWhite bg-mainheading ";
    case "secondry": // Note: "secondary" is usually spelled with an 'a'
      return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-mainheading bg-[#B1C5CE] ";
    default:
      return "inline-flex justify-center items-center px-4 py-1 font-medium rounded-3xl lg:text-base text-sm capitalize text-mainheading bg-[#B1C5CE] ";
  }
};

export interface IndividualStepCardProps {
  step: StepData;
  isFirst: boolean; // To prioritize loading the first image
  index: number;    // To determine odd/even positioning
}

const IndividualStepCard: React.FC<IndividualStepCardProps> = ({
  step,
  isFirst,
  index,
}) => {
  // Determine if the card is an "even" numbered card in the sequence (2nd, 4th, etc.)
  // "Odd" cards (1st, 3rd, ...) correspond to index 0, 2, ...
  // "Even" cards (2nd, 4th, ...) correspond to index 1, 3, ...
  const isEvenSequenceCard = index % 2 !== 0;

  // Define Image Column JSX
  const ImageColumn = (
    <div className="lg:w-3/5 w-full relative bg-background rounded-[22px] overflow-hidden">
      {/* Dotted background layer */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/dot.svg')] bg-center bg-repeat"
        aria-hidden="true" // Decorative background, hide from screen readers
      />
      <div className="relative flex items-center justify-center h-full">
        <Image
          src={step.contentImages.light}
          alt={`${step.title} illustration (light)`}
          width={500}
          height={450}
          style={{ maxHeight: "360px", objectFit: "contain" }}
          priority={isFirst} // Prioritize loading for the very first card (index 0)
        />
      </div>
    </div>
  );

  // Define Text Content Column JSX
  const TextContentColumn = (
    <div
      className="lg:w-2/5 w-full flex flex-col justify-center lg:justify-start items-start sm:p-8 p-6"
    >
      {/* Title and Subtitle */}
      <div className="space-y-3 mb-4 lg:mb-6">
        <h3 className="text-xl md:text-2xl text-mainheadingWhite font-bold capitalize">
          {step.contentTitle}
        </h3>
        <p className="sm:text-xl text-base text-subheadingWhite">
          {step.contentSubtitle}
        </p>
      </div>

      {/* Content Blocks */}
      {step.contentBlocks && (
        <div className="flex flex-col items-start gap-3 w-full">
          {step.contentBlocks.map((block, blockIndex) => (
            <div
              key={blockIndex}
              className={`px-4 font-medium lg:text-base text-xs lg:py-2.5 py-2 rounded-full text-nowrap ${getBlockClasses(
                block.type
              )}`}
            >
              {block.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* You can use it :- min-h-[480px] md:min-h-[520px] max-h-[650px] */}
      <div className="mx-auto max-w-screen-md lg:max-w-screen-lg rounded-3xl bg-subheading overflow-hidden p-1">
        <div
          className={`flex flex-col ${
            isEvenSequenceCard ? "lg:flex-row-reverse" : "lg:flex-row"
          } h-full`}
        >
          {/*
            For "odd" cards (index 0, 2, ...), isEvenSequenceCard is false:
            - lg:flex-row applies.
            - ImageColumn (defined first) will be on the left, TextContentColumn on the right.

            For "even" cards (index 1, 3, ...), isEvenSequenceCard is true:
            - lg:flex-row-reverse applies.
            - ImageColumn (defined first) will be on the right, TextContentColumn on the left.
          */}
          {ImageColumn}
          {TextContentColumn}
        </div>
      </div>
      {/* This overlay seems intended for individual card interactions, not the scroll-stacking. Kept as is. */}
      <div className="sticky-card-overlay absolute inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    </>
  );
};

export default IndividualStepCard;