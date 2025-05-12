// src/components/Payment/DetailItem.tsx (Example file path)
// Or keep it within PaymentDetailsPage.tsx if you prefer

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Shadcn Button
import { Copy, Check } from 'lucide-react'; // Icons
import { toast } from 'sonner'; // Still use toast for accessibility and confirmation

interface DetailItemProps {
    label: string;
    value: string | undefined | null;
    fieldName: string;
    isMono?: boolean;
    className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, fieldName, isMono = false, className = '' }) => {
    const displayValue = value || 'N/A';
    const [isCopied, setIsCopied] = useState(false); // State for button change

    const handleCopyToClipboard = (text: string) => {
        if (!text || text === 'N/A') {
            toast.error(`Cannot copy empty ${fieldName}.`);
            return;
        }
        // Prevent re-triggering if already in "Copied!" state during the timeout
        if (isCopied) return;

        navigator.clipboard.writeText(text).then(() => {
            toast.success(`${fieldName} copied to clipboard!`);
            setIsCopied(true); // Trigger button state change

            // Reset button state after a short delay
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 1500); // 1.5 second visual confirmation

            // Optional: Clear timeout if component unmounts during the delay
            // return () => clearTimeout(timer); // Only needed if using useEffect

        }).catch(err => {
            console.error('DetailItem: Failed to copy text: ', err);
            toast.error(`Failed to copy ${fieldName}. Please copy manually.`);
            setIsCopied(false); // Ensure state is reset on error too
        });
    };

    return (
        <div className={`bg-muted/30 dark:bg-zinc-800 p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}>
            {/* Text Content */}
            <div className="flex-1 min-w-0"> {/* Added flex-1 and min-w-0 for better wrapping */}
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className={`font-semibold text-foreground break-words ${isMono ? 'font-mono' : ''}`}> {/* Use break-words for long strings */}
                    {displayValue}
                </p>
            </div>

            {/* Copy Button - Updated Style with Text and State Change */}
            {value && value !== 'N/A' && (
                <Button
                    // variant="secondary" // A slightly darker, contained button style
                    // Use a style closer to the image: dark background, light text
                    variant="default" // Start with default, customize below
                    size="sm"        // Small size seems appropriate
                    onClick={() => handleCopyToClipboard(displayValue)}
                    aria-label={`Copy ${fieldName}`}
                    // Custom classes for the specific dark button look
                    className={`
                        shrink-0 h-8 px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                        ${isCopied
                            ? 'bg-green-600/90 hover:bg-green-700/90 text-white dark:bg-green-700/90 dark:hover:bg-green-800/90 dark:text-primary-foreground' // Success state style
                            : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100' // Default dark button style
                        }
                    `}
                    // Disable briefly while showing "Copied!" to prevent spam and give visual feedback
                    disabled={isCopied}
                >
                    {isCopied ? (
                        <Check className="h-3.5 w-3.5 mr-1.5" />
                    ) : (
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {isCopied ? 'Copied!' : 'Copy'}
                </Button>
            )}
        </div>
    );
};

// If DetailItem is in its own file, export it:
// export { DetailItem };