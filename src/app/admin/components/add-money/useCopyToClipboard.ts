// components/admin/payments/useCopyToClipboard.ts
import { useState } from 'react';

export const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text: string) => {
        if (!navigator?.clipboard) {
            console.error('Clipboard API not available');
            return false;
        }
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard', error);
            setIsCopied(false);
            return false;
        }
    };

    return { copy, isCopied };
};