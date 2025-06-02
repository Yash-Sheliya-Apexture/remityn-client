// // src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { useKyc } from '../contexts/KycContext'; // Import the hook
// import { Check, Circle } from 'lucide-react'; // Example icons

// // Define the steps and their labels, matching the order in KycContext
// const steps = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' }, // Optional review step
// ] as const; // Use 'as const' for type safety on id

// type StepId = typeof steps[number]['id'];

// export default function KycStepper() {
//     const { currentStep } = useKyc();

//     // Determine the index of the current step
//     const currentStepIndex = steps.findIndex(step => step.id === currentStep);

//     // Don't show stepper on non-form pages like start, pending, rejected
//     if (!steps.some(step => step.id === currentStep)) {
//         return null;
//     }

//     return (
//         <nav aria-label="Progress">
//             <ol
//                 role="list"
//                 className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8"
//             >
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;

//                     return (
//                         <li key={step.label} className="relative flex-1 w-full sm:w-auto">
//                             {/* Connecting line (except for the first item) */}
//                             {stepIdx > 0 && (
//                                 <div
//                                     className={`absolute left-0 top-6 h-0.5 w-full bg-gray-300 dark:bg-gray-600 hidden sm:block ${
//                                         isCompleted || isCurrent ? 'sm:bg-primary' : ''
//                                     }`}
//                                     aria-hidden="true"
//                                 />
//                             )}
//                             {/* Vertical line for mobile */}
//                             {stepIdx < steps.length - 1 && (
//                                <div
//                                    className={`absolute left-4 top-8 -ml-px mt-1 h-[calc(100%-2rem)] w-0.5 bg-gray-300 dark:bg-gray-600 sm:hidden ${
//                                        isCompleted ? 'bg-primary' : ''
//                                    }`}
//                                    aria-hidden="true"
//                                />
//                             )}


//                             <div className="relative flex items-center space-x-3">
//                                 {/* Step Indicator Circle/Icon */}
//                                 <div
//                                     className={`flex h-8 w-8 items-center justify-center rounded-full ${
//                                         isCompleted
//                                             ? 'bg-primary text-white'
//                                             : isCurrent
//                                             ? 'border-2 border-primary bg-white dark:bg-secondary text-primary'
//                                             : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-secondary text-gray-500 dark:text-gray-400'
//                                     }`}
//                                 >
//                                     {isCompleted ? (
//                                         <Check className="h-5 w-5" aria-hidden="true" />
//                                     ) : isCurrent ? (
//                                          <span className="h-2.5 w-2.5 bg-primary rounded-full" aria-hidden="true" />
//                                     ) : (
//                                          <span className="h-2.5 w-2.5 bg-gray-300 dark:bg-gray-600 rounded-full" aria-hidden="true" />
//                                         // Or use <Circle className="h-5 w-5" />
//                                     )}
//                                 </div>

//                                 {/* Step Label */}
//                                 <span
//                                     className={`text-sm font-medium ${
//                                         isCurrent
//                                             ? 'text-primary dark:text-blue-400'
//                                             : isCompleted
//                                             ? 'text-gray-900 dark:text-gray-100'
//                                             : 'text-gray-500 dark:text-gray-400'
//                                     }`}
//                                 >
//                                     {step.label}
//                                 </span>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// // frontend/src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { useKyc } from '../contexts/KycContext';
// import { Check, CircleDot, Circle } from 'lucide-react'; // Using CircleDot for current step

// // Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
// const steps: { id: 'personal' | 'details' | 'identity' | 'upload' | 'review'; label: string }[] = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' },
// ];

// export default function KycStepper() {
//     const { currentStepId } = useKyc(); // Get the current logical step ID

//     // Find the index of the current step in our defined order
//     const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

//     // If the currentStepId isn't one of the form steps, don't render the stepper
//     if (currentStepIndex === -1) {
//         return null;
//     }

//     return (
//         <nav aria-label="Progress">
//             <ol role="list" className="flex items-center">
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;
//                     const isUpcoming = currentStepIndex < stepIdx;

//                     return (
//                         <li key={step.id} className={`relative flex-1 ${stepIdx < steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
//                             {/* Completed Step */}
//                             {isCompleted ? (
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-primary" /> {/* Completed line */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-primary/90">
//                                         <Check className="h-5 w-5 text-white" aria-hidden="true" />
//                                         <span className="sr-only">{step.label} - Completed</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                         <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{step.label}</span>
//                                     </div>
//                                 </>
//                             ) : isCurrent ? (
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" /> {/* Line before current */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-secondary">
//                                          <CircleDot className="h-5 w-5 text-primary" aria-hidden="true" />
//                                         <span className="sr-only">{step.label} - Current</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                         <span className="text-xs font-medium text-primary">{step.label}</span>
//                                     </div>
//                                 </>
//                             ) : ( // Upcoming Step
//                                 <>
//                                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                                         <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" /> {/* Upcoming line */}
//                                     </div>
//                                     <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-secondary hover:border-gray-400 dark:hover:border-gray-500">
//                                          <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                                         <span className="sr-only">{step.label} - Upcoming</span>
//                                     </div>
//                                      <div className="absolute left-0 top-10 w-max text-center">
//                                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{step.label}</span>
//                                      </div>
//                                 </>
//                             )}
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// // frontend/src/app/kyc/components/KycStepper.tsx
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useKyc } from '../contexts/KycContext'; // Adjust path
// import { Check, CircleDot, Circle } from 'lucide-react'; // Lucide icons
// import { cn } from "@/lib/utils"; // For conditional classes

// // Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
// const steps: { id: 'personal' | 'details' | 'identity' | 'upload' | 'review'; label: string }[] = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' },
// ];

// export default function KycStepper() {
//     const { currentUiStepId } = useKyc(); // Get the current logical step ID from context

//     // Find the index of the current step in our defined order
//     const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

//     // Stepper is only relevant for form steps, handled by layout now
//     // if (currentStepIndex === -1) {
//     //     return null; // Don't render if not a form step
//     // }

//     return (
//         <nav aria-label="KYC Progress">
//             <ol role="list" className="flex items-center justify-between">
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;
//                     // const isUpcoming = currentStepIndex < stepIdx; // Not explicitly needed for styling

//                     const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';

//                     return (
//                         <li key={step.id} className={cn(
//                             "relative flex-1",
//                             // Add padding to the right for all but the last item to make space for the line
//                             stepIdx < steps.length - 1 ? 'pr-10 md:pr-16' : ''
//                         )}>
//                             {/* Connecting Line (except for the first item) */}
//                             {stepIdx > 0 && (
//                                 <div
//                                     className="absolute left-[-50%] top-4 -z-10 hidden h-0.5 w-full md:block"
//                                     aria-hidden="true"
//                                 >
//                                     <motion.div
//                                          className={cn(
//                                             "h-full rounded-full",
//                                             status === 'complete' || status === 'current' ? 'bg-primary' : 'bg-border'
//                                         )}
//                                         // Animate line completion
//                                         initial={{ scaleX: 0 }}
//                                         animate={{ scaleX: (status === 'complete' || status === 'current') ? 1 : 0 }}
//                                         transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
//                                         style={{ transformOrigin: 'left' }}
//                                     />
//                                 </div>
//                             )}

//                             {/* Step Marker (Icon + Text) */}
//                             <div className="flex flex-col items-center text-center gap-2">
//                                 <motion.div
//                                     className={cn(
//                                         "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
//                                         status === 'complete' ? 'border-primary bg-primary' :
//                                         status === 'current' ? 'border-primary bg-background dark:bg-secondary' :
//                                         'border-border bg-background dark:bg-secondary'
//                                     )}
//                                     // Animate scale/pop effect on status change
//                                     initial={{ scale: 0.8, opacity: 0.8 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                 >
//                                     {status === 'complete' && <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />}
//                                     {status === 'current' && <CircleDot className="h-5 w-5 text-primary animate-pulse" aria-hidden="true" />}
//                                     {status === 'upcoming' && <Circle className="h-5 w-5 text-muted-foreground/50" aria-hidden="true" />}
//                                     <span className="sr-only">{step.label} - {status}</span>
//                                 </motion.div>

//                                 {/* Label */}
//                                 <span className={cn(
//                                     "text-xs font-medium transition-colors duration-300",
//                                      status === 'complete' ? 'text-primary' :
//                                      status === 'current' ? 'text-primary font-semibold' :
//                                      'text-muted-foreground'
//                                 )}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }


// // frontend/src/app/kyc/components/KycStepper.tsx
// // (No changes needed)
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useKyc, formStepOrder } from '../contexts/KycContext'; // Correct relative path
// import { Check, CircleDot, Circle } from 'lucide-react'; // Lucide icons
// import { cn } from "@/lib/utils"; // For conditional classes

// // Define the steps and their IDs matching KycStepId and formStepOrder in KycContext
// const steps: { id: typeof formStepOrder[number]; label: string }[] = [
//     { id: 'personal', label: 'Personal' },
//     { id: 'details', label: 'Details' },
//     { id: 'identity', label: 'Identity' },
//     { id: 'upload', label: 'Upload' },
//     { id: 'review', label: 'Review' },
// ];

// export default function KycStepper() {
//     const { currentUiStepId } = useKyc(); // Get the current logical step ID from context

//     // Find the index of the current step in our defined order
//     const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

//     // Stepper visibility is now handled by the KycLayoutComponent based on currentUiStepId
//     // No need for a check here if the layout conditionally renders it.

//     return (
//         <nav aria-label="KYC Progress">
//             <ol role="list" className="flex items-center justify-between">
//                 {steps.map((step, stepIdx) => {
//                     const isCompleted = currentStepIndex > stepIdx;
//                     const isCurrent = currentStepIndex === stepIdx;

//                     const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';

//                     return (
//                         <li key={step.id} className={cn(
//                             "relative flex-1",
//                             // Add padding to the right for all but the last item to make space for the line
//                             stepIdx < steps.length - 1 ? 'pr-10 md:pr-16' : ''
//                         )}>
//                             {/* Connecting Line (except for the first item) */}
//                             {stepIdx > 0 && (
//                                 <div
//                                     className="absolute left-[-50%] top-4 -z-10 hidden h-0.5 w-full md:block"
//                                     aria-hidden="true"
//                                 >
//                                     <motion.div
//                                          className={cn(
//                                             "h-full rounded-full",
//                                             status === 'complete' || status === 'current' ? 'bg-primary' : 'bg-border'
//                                         )}
//                                         // Animate line completion
//                                         initial={{ scaleX: 0 }}
//                                         animate={{ scaleX: (status === 'complete' || status === 'current') ? 1 : 0 }}
//                                         transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
//                                         style={{ transformOrigin: 'left' }}
//                                     />
//                                 </div>
//                             )}

//                             {/* Step Marker (Icon + Text) */}
//                             <div className="flex flex-col items-center text-center gap-2">
//                                 <motion.div
//                                     className={cn(
//                                         "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
//                                         status === 'complete' ? 'border-primary bg-primary' :
//                                         status === 'current' ? 'border-primary bg-background dark:bg-secondary' :
//                                         'border-border bg-background dark:bg-secondary'
//                                     )}
//                                     // Animate scale/pop effect on status change
//                                     initial={{ scale: 0.8, opacity: 0.8 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                 >
//                                     {status === 'complete' && <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />}
//                                     {status === 'current' && <CircleDot className="h-5 w-5 text-primary animate-pulse" aria-hidden="true" />}
//                                     {status === 'upcoming' && <Circle className="h-5 w-5 text-muted-foreground/50" aria-hidden="true" />}
//                                     <span className="sr-only">{step.label} - {status}</span>
//                                 </motion.div>

//                                 {/* Label */}
//                                 <span className={cn(
//                                     "text-xs font-medium transition-colors duration-300",
//                                      status === 'complete' ? 'text-primary' :
//                                      status === 'current' ? 'text-primary font-semibold' :
//                                      'text-muted-foreground'
//                                 )}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }




// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { useKyc, formStepOrder } from '../contexts/KycContext';
// import { cn } from "@/lib/utils";
// import { Check, ShieldCheck, User, FileText, Camera, ClipboardCheck } from 'lucide-react';

// // Define the steps with their IDs, labels, and icons
// const steps = [
//   { id: 'personal', label: 'Personal', icon: User },
//   { id: 'details', label: 'Details', icon: FileText },
//   { id: 'identity', label: 'Identity', icon: ShieldCheck },
//   { id: 'upload', label: 'Upload', icon: Camera },
//   { id: 'review', label: 'Review', icon: ClipboardCheck },
// ];

// export default function KycStepper() {
//   const { currentUiStepId } = useKyc();
//   const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

//   return (
//     <div className="w-full mb-8">
//       {/* Floating card design */}
//       <div className="p-3 sm:p-6 relative overflow-hidden">

//         {/* Mobile stepper - visible only on extra small screens */}
//         <div className="block sm:hidden relative z-10 mb-4">
//           <div className="flex justify-between items-center">
//             <span className="text-sm font-medium text-primary">
//               Step {currentStepIndex + 1} of {steps.length}
//             </span>
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               {steps[currentStepIndex].label}
//             </span>
//           </div>
//           <div className="mt-3 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
//             <motion.div 
//               className="h-full bg-primary"
//               initial={{ width: '0%' }}
//               animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//             />
//           </div>
//         </div>
        
//         {/* Main stepper container - hidden on extra small screens */}
//         <nav aria-label="KYC Progress" className="relative z-10 hidden sm:block">
//           <ol className="flex items-center justify-between gap-1 md:gap-0">
//             {steps.map((step, stepIdx) => {
//               const isCompleted = currentStepIndex > stepIdx;
//               const isCurrent = currentStepIndex === stepIdx;
//               const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';
//               const IconComponent = step.icon;
              
//               return (
//                 <li 
//                   key={step.id} 
//                   className={cn(
//                     "relative flex-1 flex flex-col items-center"
//                   )}
//                 >
//                   {/* Connection line */}
//                   {stepIdx < steps.length - 1 && (
//                     <div 
//                       className="absolute top-8 h-1 w-full left-1/2 -z-0"
//                       aria-hidden="true"
//                     >
//                       <div className="h-full w-full flex items-center">
//                         <motion.div
//                           className={cn(
//                             "h-0.5 w-full",
//                             status === 'complete' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
//                           )}
//                           initial={{ scaleX: 0 }}
//                           animate={{ scaleX: status === 'complete' ? 1 : 0 }}
//                           transition={{ duration: 0.5, ease: "easeInOut" }}
//                           style={{ transformOrigin: 'left' }}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Step bubble with animated transitions */}
//                   <motion.div 
//                     className="flex flex-col items-center space-y-2"
//                     initial={{ y: 10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: stepIdx * 0.1 }}
//                   >
//                     {/* Animated outer circle */}
//                     <motion.div
//                       className={cn(
//                         "relative flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full",
//                         status === 'complete' ? 'bg-primary/10' : 
//                         status === 'current' ? 'bg-primary/10' : 
//                         'bg-primarybox'
//                       )}
//                       animate={{ 
//                         scale: isCurrent ? [1, 1.05, 1] : 1,
//                         boxShadow: isCurrent ? 
//                           '0 0 0 8px #adfa1c24' : 
//                           '0 0 0 0px #adfa1c00'
//                       }}
//                       transition={{ 
//                         scale: { repeat: Infinity, duration: 2 },
//                         boxShadow: { repeat: Infinity, duration: 2 }
//                       }}
//                     >
//                       {/* Inner circle with icon */}
//                       <motion.div
//                         className={cn(
//                           "flex h-8 w-8 md:h-12 md:w-12 items-center justify-center text-subheadingWhite rounded-full border-2",
//                           status === 'complete' ? 'border-primary bg-primary text-mainheading' :
//                           status === 'current' ? 'border-primary text-mainheading bg-primary' :
//                           ''
//                         )}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {status === 'complete' ? (
//                           <Check className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
//                         ) : (
//                           <IconComponent className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
//                         )}
//                       </motion.div>
//                     </motion.div>

//                     {/* Step label */}
//                     <span className={cn(
//                       "text-xs md:text-sm font-medium mt-1 md:mt-2 text-center",
//                       status === 'complete' ? 'text-primary' :
//                       status === 'current' ? 'text-primary font-semibold' : 
//                       'text-subheadingWhite'
//                     )}>
//                       {step.label}
//                     </span>
//                   </motion.div>
//                 </li>
//               );
//             })}
//           </ol>
//         </nav>
        
//         {/* Bottom progress indicator - visible only on larger screens */}
//         <div className="mt-4 sm:mt-6 w-full bg-primarybox h-1.5 rounded-full overflow-hidden hidden sm:block">
//           <motion.div 
//             className="h-full bg-primary"
//             initial={{ width: '0%' }}
//             animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useKyc } from '../contexts/KycContext';
import { cn } from "@/lib/utils";
import { Check, ShieldCheck, User, FileText, Camera, ClipboardCheck } from 'lucide-react';

// Define the steps with their IDs, labels, and icons
const steps = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'identity', label: 'Identity', icon: ShieldCheck },
  { id: 'upload', label: 'Upload', icon: Camera },
  { id: 'review', label: 'Review', icon: ClipboardCheck },
];

export default function KycStepper() {
  const { currentUiStepId } = useKyc();
  const currentStepIndex = steps.findIndex(step => step.id === currentUiStepId);

  // Handle case where currentUiStepId might not be found, defaulting to the first step for display
  const displayStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;
  const displayStep = steps[displayStepIndex];


  return (
    <div className="w-full mb-8">
      {/* Floating card design */}
      <div className="p-3 sm:p-6 relative overflow-hidden">

        {/* Mobile stepper - visible only on extra small screens */}
        <div className="block sm:hidden relative z-10 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary">
              Step {displayStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-subheadingWhite">
              {displayStep.label}
            </span>
          </div>
          <div className="mt-3 w-full bg-primarybox h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(displayStepIndex / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* Main stepper container - hidden on extra small screens */}
        <nav aria-label="KYC Progress" className="relative z-10 hidden sm:block">
          <ol className="flex items-center justify-between gap-1 md:gap-0">
            {steps.map((step, stepIdx) => {
              const isCompleted = currentStepIndex > stepIdx;
              const isCurrent = currentStepIndex === stepIdx;
              const status = isCompleted ? 'complete' : isCurrent ? 'current' : 'upcoming';
              const IconComponent = step.icon;
              
              return (
                <li 
                  key={step.id} 
                  className={cn(
                    "relative flex-1 flex flex-col items-center"
                  )}
                >
                  {/* Connection line */}
                  {stepIdx < steps.length - 1 && (
                    <div 
                      className="absolute top-8 h-1 w-full left-1/2 -z-0" 
                      aria-hidden="true"
                    >
                      <div className="h-full w-full flex items-center">
                        <motion.div
                          className={cn(
                            "h-0.5 w-full",
                            isCompleted ? 'bg-primary' : 'bg-primarybox' 
                          )}
                          initial={{ scaleX: 0 }}
                          animate={{ 
                            scaleX: isCompleted ? 1 : 0,
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step bubble with animated transitions */}
                  <motion.div 
                    className="flex flex-col items-center space-y-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: stepIdx * 0.1 }}
                  >
                    {/* Single Step circle */}
                    <motion.div
                      className={cn(
                        "relative flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full",
                        (status === 'complete' || status === 'current') ? 
                          'bg-primary text-mainheading ' :
                          'bg-primarybox text-white/90'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated ping for the current step - MODIFIED */}
                      {status === 'current' && (
                        <div 
                          className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", // Center the smaller ping
                            "h-10 w-10 md:h-14 md:w-14", // Smaller base size for the ping element
                            "rounded-full bg-primary animate-ping opacity-50"
                          )}
                        ></div>
                      )}
                      
                      {/* Icon - wrapped in relative span to ensure it's on top of the ping */}
                      <span className="relative">
                        {status === 'complete' ? (
                          <Check className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
                        ) : (
                          <IconComponent className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
                        )}
                      </span>
                    </motion.div>

                    {/* Step label */}
                    <span className={cn(
                      "text-xs md:text-sm font-medium mt-1 md:mt-2 text-center",
                      status === 'complete' ? 'text-primary' :
                      status === 'current' ? 'text-primary font-semibold' : 
                      'text-subheadingWhite'
                    )}>
                      {step.label}
                    </span>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </nav>
        
        {/* Bottom progress indicator - visible only on larger screens */}
        <div className="mt-4 sm:mt-6 w-full bg-primarybox h-1.5 rounded-full overflow-hidden hidden sm:block">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${(displayStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}