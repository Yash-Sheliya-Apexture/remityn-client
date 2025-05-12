// src/app/(website)/components/Hero/HeroRateDisplay.tsx
import React from 'react';
import { SlLock } from 'react-icons/sl'; // Use SlLock instead of FaLock if preferred
import { IoIosInformationCircleOutline } from 'react-icons/io'; // Use IoIosInformationCircleOutline instead of FaInfoCircle
import { Loader2, AlertTriangle } from 'lucide-react'; // For loading/error

interface HeroRateDisplayProps {
    ourRate: number | null;
    marketRate: number | null;
    sendCode: string;
    receiveCode: string; // Always INR in this case
    isLoading: boolean;
    error: string | null;
}

const formatRate = (rate: number | null, precision = 4): string => {
    if (rate === null || isNaN(rate) || rate <= 0) return "---"; // Handle invalid/zero rates
    return rate.toFixed(precision);
};

const HeroRateDisplay: React.FC<HeroRateDisplayProps> = ({
    ourRate,
    marketRate,
    sendCode,
    receiveCode,
    isLoading,
    error,
}) => {
    const ourRateDisplay = `1 ${sendCode} = ${formatRate(ourRate)} ${receiveCode}`;
    const marketRateDisplay = `1 ${sendCode} = ${formatRate(marketRate)} ${receiveCode}`;

    return (
        <div className="text-center mb-4 min-h-[70px] space-y-1.5 flex flex-col items-center">
            {isLoading && (
                <div className="flex justify-center items-center text-sm text-gray-500">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Loading rates...
                </div>
            )}

            {!isLoading && error && (
                <div className="text-xs p-1.5 px-2.5 rounded-md bg-red-50 border border-red-200 text-red-700 inline-flex items-center gap-1.5">
                    <AlertTriangle size={12} /> {error}
                </div>
            )}

            {!isLoading && !error && ourRate && (
                <div className="font-semibold p-2 px-4 rounded-md bg-primary/10 text-primary inline-flex items-center gap-1.5 text-sm cursor-default" title="This is the rate applied to your transfer.">
                    <SlLock size={14} /> Our Rate: {ourRateDisplay}
                </div>
            )}

            {!isLoading && !error && marketRate && (
                <div className="font-medium text-xs p-1.5 px-3 rounded-md bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 inline-flex items-center gap-1.5 cursor-help" title="Current market rate for comparison only.">
                    <IoIosInformationCircleOutline size={14} /> Market Rate: {marketRateDisplay}
                </div>
            )}

            {/* Placeholder if rates aren't ready and no error/loading */}
            {!isLoading && !error && (!ourRate || !marketRate) && (
                 <div className="h-[50px] flex items-center justify-center text-sm text-gray-400">Calculating rates...</div>
            )}
        </div>
    );
};

export default HeroRateDisplay;