// // frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
// import React from 'react';
// import { cn } from "@/lib/utils"; // Adjust path
// import { TimelineStep } from '../../../../types/transaction'; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { MdErrorOutline } from "react-icons/md";
// import { FaCheck, FaRegClock } from "react-icons/fa";

// interface TransactionTimelineProps {
//     steps: TimelineStep[];
//     isPayment: boolean;
//     status: string;
//     isSubmitting: boolean;
//     onOpenCancelModal: () => void;
// }

// const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
//     steps,
//     isPayment,
//     status,
//     isSubmitting,
//     onOpenCancelModal
// }) => {
//     if (!steps || steps.length === 0) {
//         return (
//             <p className="text-gray-500 dark:text-gray-300 text-sm py-4">
//                 Status updates are currently unavailable.
//             </p>
//         );
//     }

//     return (
//         <div className="relative mt-2">
//             <ul className="space-y-1">
//                 {steps.map((step, index) => (
//                     <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0">
//                         {/* Marker & Line */}
//                         <div className="relative z-0 flex flex-col items-center flex-shrink-0 pt-1">
//                             <div className={cn(
//                                 "h-6 w-6 rounded-full flex items-center justify-center ring-4 z-10",
//                                 step.status === "completed" && "bg-green-600 ring-green-600/40 text-white",
//                                 step.status === "active" && "bg-blue-500 ring-blue-600/30 text-white animate-pulse",
//                                 step.status === "pending" && "bg-gray-500  ring-gray-600/30 dark:ring-gray-600/50 text-white",
//                                 (step.status === "failed" || step.status === "cancelled") && "bg-red-600 ring-red-600/20 text-white"
//                             )}>
//                                 {step.status === "completed" && <FaCheck size={12} />}
//                                 {step.status === "active" && <FaRegClock size={12}/>}
//                                 {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline size={16} />}
//                                 {step.status === "pending" && <div className="h-2 w-2 bg-white rounded-full"></div>}
//                             </div>
//                             {index < steps.length - 1 && (
//                                 <div className={cn(
//                                     "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
//                                     step.status === "completed" ? "bg-green-600" :
//                                     (step.status === 'failed' || step.status === 'cancelled') ? 'bg-red-600' :
//                                     step.status === "active" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-500"
//                                 )} aria-hidden="true"></div>
//                             )}
//                         </div>

//                         {/* Step Content */}
//                         <div className="flex-1 min-w-0 pb-1">
//                             <h4 className={cn(
//                                 "text-sm font-medium",
//                                 step.status === 'pending' ? 'text-gray-500 dark:text-gray-300' :
//                                 step.status === 'active' ? 'text-blue-600 dark:text-blue-400 font-semibold' :
//                                 (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400 font-semibold' :
//                                 'text-neutral-900 dark:text-white'
//                             )}>
//                                 {step.label}
//                             </h4>
//                             {step.date && (<p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{step.date}</p>)}
//                             {step.info && (<div className={cn(
//                                 "mt-4 text-sm p-3 rounded-md border",
//                                 step.status === 'active' ? 'bg-blue-600/20 dark:border-none text-blue-600 dark:text-blue-400' :
//                                 step.status === 'failed' ? 'bg-rose-600/10 border-rose-600/70 text-rose-600 dark:text-rose-300' :
//                                 step.status === 'cancelled' ? 'bg-red-600/20 border-red-600/60 text-red-600 dark:text-red-400' :
//                                 'bg-lightgray dark:bg-primarybox text-gray-500 dark:text-gray-300'
//                             )}>
//                                 <p>{step.info}</p>
//                             </div>)}
                            
//                             {step.showCancelAction && isPayment && status === 'pending' && (
//                                 <button
//                                     className="mt-3 px-5 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-75 ease-linear cursor-pointer"
//                                     onClick={onOpenCancelModal}
//                                     disabled={isSubmitting}
//                                 >
//                                     I haven't paid / Cancel
//                                 </button>
//                             )}
//                         </div>  
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TransactionTimeline;


// frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
import React from 'react';
import { cn } from "@/lib/utils";
import { TimelineStep } from '../../../../types/transaction';
import { Button } from "@/components/ui/button";
import { MdErrorOutline } from "react-icons/md";
import { FaCheck, FaRegClock } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { motion } from "framer-motion";

interface TransactionTimelineProps {
    steps: TimelineStep[];
    isPayment: boolean;
    status: string;
    isSubmitting: boolean;
    onOpenCancelModal: () => void;
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
    steps,
    isPayment,
    status,
    isSubmitting,
    onOpenCancelModal
}) => {
    if (!steps || steps.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center">
                    <IoMdTime className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                    <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status updates are currently unavailable
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative mt-6">
            <div className="relative">
                {/* Continuous vertical line running through all steps */}
                <div className="absolute left-4 top-4 bottom-4 w-1 bg-gray-300 dark:bg-gray-600 -z-10"></div>
                
                <ul className="relative z-0">
                    {steps.map((step, index) => (
                        <motion.li 
                            key={step.id || index} 
                            className="flex items-start space-x-5 pb-8 relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            {/* Individual step connector line */}
                            {index < steps.length - 1 && (
                                <div 
                                    className={cn(
                                        "absolute left-[7px] top-0 h-full w-[2px] -z-10",
                                        "bg-lightgray dark:bg-secondarybox"
                                    )}
                                    aria-hidden="true"
                                ></div>
                            )}

                            {/* Marker */}
                            <div className="relative flex-shrink-0 z-10">
                                <div className={cn(
                                    "h-4 w-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                                    step.status === "completed" && "bg-primary text-white",
                                    step.status === "active" && "bg-blue-600  text-white",
                                    step.status === "pending" && "bg-gray-500 ring-gray-600/20 text-white",
                                    (step.status === "failed" || step.status === "cancelled") && "bg-red-600 text-white"
                                )}>
                                </div>
                                {step.status === "active" && (
                                            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50"></div>
                                    )}
                            </div>

                            {/* Step Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center mb-1">
                                    <h4 className={cn(
                                        "text-sm font-semibold tracking-wide",
                                        step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' :
                                        step.status === 'active' ? 'text-blue-600 dark:text-blue-400' :
                                        (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400' :
                                        'text-gray-900 dark:text-white'
                                    )}>
                                        {step.label}
                                    </h4>
                                </div>
                                
                                {step.date && (
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                        {step.date}
                                    </p>
                                )}
                                
                                {step.info && (
                                    <motion.div 
                                        className={cn(
                                            "mt-3 text-sm p-4 rounded-lg border backdrop-blur-sm transition-all duration-300",
                                            step.status === 'active' ? 'bg-blue-50/90 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300' :
                                            step.status === 'failed' ? 'bg-rose-50/90 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300' :
                                            step.status === 'cancelled' ? 'bg-red-50/90 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300' :
                                            step.status === 'completed' ? 'bg-green-50/90 dark:bg-green-900/20 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-300' :
                                            'bg-gray-50/90 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                        )}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                    >
                                        <p>{step.info}</p>
                                    </motion.div>
                                )}
                                
                                {step.showCancelAction && isPayment && status === 'pending' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.2 }}
                                        className="mt-4"
                                    >
                                        <button
                                            className="mt-3 px-5 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-75 ease-linear cursor-pointer"
                                            onClick={onOpenCancelModal}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                "I haven't paid / Cancel"
                                            )}
                                        </button>
                                    </motion.div>
                                )}
                            </div>  
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TransactionTimeline;