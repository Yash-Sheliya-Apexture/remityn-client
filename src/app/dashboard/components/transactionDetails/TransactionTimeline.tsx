// frontend/app/dashboard/transactions/[transactionId]/components/TransactionTimeline.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Adjust path
import { TimelineStep } from '../../../../types/transaction'; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { MdErrorOutline } from "react-icons/md";
import { FaCheck, FaRegClock } from "react-icons/fa";

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
            <p className="text-gray-500 dark:text-gray-300 text-sm py-4">
                Status updates are currently unavailable.
            </p>
        );
    }

    return (
        <div className="relative mt-2">
            <ul className="space-y-1">
                {steps.map((step, index) => (
                    <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0">
                        {/* Marker & Line */}
                        <div className="relative z-0 flex flex-col items-center flex-shrink-0 pt-1">
                            <div className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center ring-4 z-10",
                                step.status === "completed" && "bg-green-600 ring-green-600/40 text-white",
                                step.status === "active" && "bg-blue-500 ring-blue-600/30 text-white animate-pulse",
                                step.status === "pending" && "bg-gray-500  ring-gray-600/30 dark:ring-gray-600/50 text-white",
                                (step.status === "failed" || step.status === "cancelled") && "bg-red-600 ring-red-600/20 text-white"
                            )}>
                                {step.status === "completed" && <FaCheck size={12} />}
                                {step.status === "active" && <FaRegClock size={12}/>}
                                {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline size={16} />}
                                {step.status === "pending" && <div className="h-2 w-2 bg-white rounded-full"></div>}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={cn(
                                    "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5",
                                    step.status === "completed" ? "bg-green-600" :
                                    (step.status === 'failed' || step.status === 'cancelled') ? 'bg-red-600' :
                                    step.status === "active" ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-500"
                                )} aria-hidden="true"></div>
                            )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pb-1">
                            <h4 className={cn(
                                "text-sm font-medium",
                                step.status === 'pending' ? 'text-gray-500 dark:text-gray-300' :
                                step.status === 'active' ? 'text-blue-600 dark:text-blue-400 font-semibold' :
                                (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400 font-semibold' :
                                'text-neutral-900 dark:text-white'
                            )}>
                                {step.label}
                            </h4>
                            {step.date && (<p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{step.date}</p>)}
                            {step.info && (<div className={cn(
                                "mt-4 text-sm p-3 rounded-md border",
                                step.status === 'active' ? 'bg-blue-600/20 dark:border-none text-blue-600 dark:text-blue-400' :
                                step.status === 'failed' ? 'bg-rose-600/10 border-rose-600/70 text-rose-600 dark:text-rose-300' :
                                step.status === 'cancelled' ? 'bg-red-600/20 border-red-600/60 text-red-600 dark:text-red-400' :
                                'bg-lightgray dark:bg-primarybox text-gray-500 dark:text-gray-300'
                            )}>
                                <p>{step.info}</p>
                            </div>)}
                            
                            {step.showCancelAction && isPayment && status === 'pending' && (
                                <button
                                    className="mt-3 px-5 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-75 ease-linear cursor-pointer"
                                    onClick={onOpenCancelModal}
                                    disabled={isSubmitting}
                                >
                                    I haven't paid / Cancel
                                </button>
                            )}
                        </div>  
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionTimeline;