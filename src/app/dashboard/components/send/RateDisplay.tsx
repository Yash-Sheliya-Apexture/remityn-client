// // src/app/dashboard/components/send/RateDisplay.tsx
// import React from 'react';
// import { FaLock, FaInfoCircle } from 'react-icons/fa';
// import { AlertTriangle } from 'lucide-react';
// import { SendSummary } from '@/app/hooks/useSendAmountLogic'; // Adjust path

// interface RateDisplayProps {
//     rateContext: SendSummary | null;
//     apiError: string | null; // Specifically for rate loading errors
// }

// // Keep formatting functions outside or in utils if used elsewhere
// const formatRate = (rate: number | null | undefined, precision = 6): string => {
//     if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//     return rate.toFixed(precision);
// };
// const formatComparisonRate = (rate: number | null | undefined, precision = 4): string => {
//     if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//     return rate.toFixed(precision);
// };

// const RateDisplay: React.FC<RateDisplayProps> = ({ rateContext, apiError }) => {
//     const showRates = !!rateContext && !(apiError && apiError === "Failed to load initial exchange rates.");

//     const adjustedRateDisplay = rateContext ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(rateContext.exchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const liveRateDisplay = rateContext?.liveExchangeRate ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(rateContext.liveExchangeRate)} ${rateContext.receiveCurrencyCode}` : null;
//     const rateAdjustmentDisplay = rateContext?.rateAdjustmentApplied?.toFixed(2) ?? '0';

//     return (
//         <div className="text-right mb-4 min-h-[50px] space-y-1 flex flex-col items-end">
//             {showRates && rateContext && (
//                 <>
//                     {adjustedRateDisplay && (
//                         <div className="text-xs sm:text-sm font-medium p-1.5 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 inline-flex items-center gap-1.5 cursor-default" title={`Rate includes adjustment of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}>
//                             <FaLock size={10} /> Our Rate: {adjustedRateDisplay}
//                         </div>
//                     )}
//                     {liveRateDisplay && (
//                         <div className="text-xs font-normal p-1.5 px-2.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
//                             <FaInfoCircle size={10} /> Market Rate: {liveRateDisplay}
//                         </div>
//                     )}
//                 </>
//             )}
//             {apiError && apiError === "Failed to load initial exchange rates." && !rateContext && (
//                 <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//                     <AlertTriangle size={12} /> Error loading rates.
//                 </div>
//             )}
//             {!showRates && !(apiError === "Failed to load initial exchange rates.") && (
//                 <div className="h-[50px]"></div> // Placeholder for consistent spacing
//             )}
//         </div>
//     );
// };

// export default RateDisplay;

// // src/app/dashboard/components/send/RateDisplay.tsx
// import React from "react";
// import { FaLock, FaInfoCircle } from "react-icons/fa";
// import { AlertTriangle } from "lucide-react";
// import { SendSummary } from "@/app/hooks/useSendAmountLogic"; // Adjust path

// interface RateDisplayProps {
//   rateContext: SendSummary | null;
//   apiError: string | null; // Specifically for rate loading errors
// }

// // Keep formatting functions outside or in utils if used elsewhere
// const formatRate = (rate: number | null | undefined, precision = 2): string => {
//   if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//   return rate.toFixed(precision);
// };
// const formatComparisonRate = (
//   rate: number | null | undefined,
//   precision = 2
// ): string => {
//   if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
//   return rate.toFixed(precision);
// };

// const RateDisplay: React.FC<RateDisplayProps> = ({ rateContext, apiError }) => {
//   const showRates =
//     !!rateContext &&
//     !(apiError && apiError === "Failed to load initial exchange rates.");

//   const adjustedRateDisplay = rateContext
//     ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(
//         rateContext.exchangeRate
//       )} ${rateContext.receiveCurrencyCode}`
//     : null;
//   const liveRateDisplay = rateContext?.liveExchangeRate
//     ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(
//         rateContext.liveExchangeRate
//       )} ${rateContext.receiveCurrencyCode}`
//     : null;
//   const rateAdjustmentDisplay =
//     rateContext?.rateAdjustmentApplied?.toFixed(2) ?? "0";

//   return (
//     <div className="text-right mb-4 min-h-[50px] space-y-2 flex flex-col items-end">
//       {showRates && rateContext && (
//         <>
//           {/* Our Rate:  */}
//           {adjustedRateDisplay && (
//             <div
//               className="font-semibold p-2 px-8 rounded-full bg-primary text-mainheading inline-flex items-center gap-1.5 cursor-default"
//               title={`Rate includes our rates  of ${rateAdjustmentDisplay}%. This is the rate applied to your transfer.`}
//             >
//               <FaLock size={16} /> Our Rate: {adjustedRateDisplay}
//             </div>
//           )}

//           {/* Market Rate:  */}
//           {liveRateDisplay && (
//             <div
//               className="font-medium text-sm p-2 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white inline-flex items-center gap-1.5 cursor-help"
//               title="Current market rate for comparison only."
//             >
//               <FaInfoCircle size={16} /> Market Rate: {liveRateDisplay}
//             </div>
//           )}
//         </>
//       )}

//       {apiError &&
//         apiError === "Failed to load initial exchange rates." &&
//         !rateContext && (
//           <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
//             <AlertTriangle size={12} /> Error loading rates.
//           </div>
//         )}

//       {!showRates &&
//         !(apiError === "Failed to load initial exchange rates.") && (
//           <div className="h-[50px]"></div> // Placeholder for consistent spacing
//         )}
//     </div>
//   );
// };

// export default RateDisplay;

// src/app/dashboard/components/send/RateDisplay.tsx
import React from "react";
import { FaLock, FaInfoCircle } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";
import { SendSummary } from "@/app/hooks/useSendAmountLogic"; // Adjust path if needed
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, // Import TooltipProvider
} from "@/components/ui/tooltip"; // Adjust path as needed

interface RateDisplayProps {
  rateContext: SendSummary | null;
  apiError: string | null; // Specifically for rate loading errors
}

// Helper formatting functions (keep or move to utils)
const formatRate = (rate: number | null | undefined, precision = 2): string => {
  if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
  return rate.toFixed(precision);
};
const formatComparisonRate = (
  rate: number | null | undefined,
  precision = 2
): string => {
  if (rate === null || rate === undefined || isNaN(rate)) return "N/A";
  return rate.toFixed(precision);
};

const RateDisplay: React.FC<RateDisplayProps> = ({ rateContext, apiError }) => {
  // Determine if rates should be shown (similar logic as before)
  const showRates =
    !!rateContext &&
    !(apiError && apiError === "Failed to load initial exchange rates.");

  // Calculate display strings
  const adjustedRateDisplay = rateContext
    ? `1 ${rateContext.sendCurrencyCode} = ${formatRate(
        rateContext.exchangeRate
      )} ${rateContext.receiveCurrencyCode}`
    : null;
  const liveRateDisplay = rateContext?.liveExchangeRate
    ? `1 ${rateContext.sendCurrencyCode} ≈ ${formatComparisonRate(
        rateContext.liveExchangeRate
      )} ${rateContext.receiveCurrencyCode}`
    : null;
  const rateAdjustmentDisplay =
    rateContext?.rateAdjustmentApplied?.toFixed(2) ?? "0";

  return (
    // Wrap the component content with TooltipProvider
    <TooltipProvider>
      <div className="text-right mb-4 min-h-[50px] space-y-2 flex flex-col items-end">
        {/* Show rates only if available and no critical API error */}
        {showRates && rateContext && (
          <>
            {/* Our Rate with Tooltip */}
            {adjustedRateDisplay && (
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* The element that triggers the tooltip */}
                  <div className="font-semibold sm:text-base text-sm p-2 sm:px-8 px-4 rounded-full bg-primary text-mainheading inline-flex items-center gap-1.5 cursor-default">
                    <FaLock size={16} /> Our Rate: {adjustedRateDisplay}
                  </div>
                </TooltipTrigger>
                {/* Tooltip Content - Styled like HeroSection */}
                <TooltipContent
                  side="bottom"
                  sideOffset={5}
                  className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-60" // Copied styling
                >
                  <p className="font-medium dark:text-white text-neutral-900 text-xs">
                    {" "}
                    {/* Copied styling */}
                    Rate includes Our Rate of {rateAdjustmentDisplay}%. This is
                    the rate applied to your transfer.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Market Rate with Tooltip */}
            {liveRateDisplay && (
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* The element that triggers the tooltip */}
                  <div className="font-medium sm:text-sm text-13px p-2 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white inline-flex items-center gap-1.5 cursor-help">
                    <FaInfoCircle size={16} /> Market Rate: {liveRateDisplay}
                  </div>
                </TooltipTrigger>
                {/* Tooltip Content - Styled like HeroSection */}
                <TooltipContent
                  side="bottom"
                  sideOffset={5}
                  className="bg-[#e4e4e4] dark:bg-secondarybox text-white p-2 px-3 rounded-2xl max-w-47" // Copied styling
                >
                  <p className="font-medium dark:text-white text-neutral-900 text-xs">
                    {" "}
                    {/* Copied styling */}
                    Current mid-market rate. For comparison purposes only.
                  </p>
                </TooltipContent> 
              </Tooltip>
            )}
          </>
        )}

        {/* Display API error if it's the specific rate loading error */}
        {apiError &&
          apiError === "Failed to load initial exchange rates." &&
          !rateContext && ( // Only show if rateContext is truly null due to this error
            <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
              <AlertTriangle size={12} /> Error loading rates.
            </div>
          )}

        {/* Placeholder for spacing when rates are not shown (and it's not the specific API error) */}
        {!showRates &&
          !(apiError === "Failed to load initial exchange rates.") && (
            <div className="h-[50px]"></div> // Maintain consistent height
          )}
      </div>
    </TooltipProvider>
  );
};

export default RateDisplay;
