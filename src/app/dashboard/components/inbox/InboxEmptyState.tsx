// // frontend/src/components/inbox/InboxEmptyState.tsx
// import { Inbox } from 'lucide-react';

// export const InboxEmptyState: React.FC = () => {
//     return (
//         <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg">
//             <Inbox className="size-12 mx-auto mb-4 text-gray-400" />
//             <p className="font-medium">Your inbox is empty.</p>
//             <p className="text-sm">Messages from the platform will appear here.</p>
//         </div>
//     );
// };

import React from 'react';
import { Inbox, MailCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export const InboxEmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Decorative elements */}
            <div className="relative mb-8">
                {/* Background shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-primary/5 blur-xl" />
                
                {/* Icon container with gradient border */}
                <div className={cn(
                    "relative flex h-24 w-24 items-center justify-center rounded-full",
                    "bg-gradient-to-b from-background to-background/80",
                    "before:absolute before:inset-0 before:rounded-full",
                    "before:p-[2px] before:bg-gradient-to-tr from-primary to-primary/30",
                    "before:content-[''] before:-z-10"
                )}>
                    <Inbox className="h-12 w-12 text-primary" />
                </div>
            </div>
            
            {/* Text content */}
            <h3 className="text-xl font-semibold mb-2 text-foreground">Your inbox is empty</h3>
            <p className="text-muted-foreground max-w-md mb-6">
                You currently don't have any messages. When you receive notifications and updates, they'll appear here.
            </p>
            
            {/* Animation of mail icon moving */}
            <div className="flex items-center justify-center w-full max-w-xs mx-auto mb-8 relative h-12">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
                
                <div className="absolute animate-bounce-slow">
                    <div className="flex items-center justify-center h-8 w-8 bg-primary/10 rounded-full">
                        <MailCheck className="h-4 w-4 text-primary" />
                    </div>
                </div>
            </div>
            
            {/* Optional button - could link to a help section or settings */}
            <Button variant="outline" size="sm" className="group">
                <span>Check message settings</span>
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
        </div>
    );
};

// Add this to your global CSS or tailwind config to support the animation
// @keyframes bounce-slow {
//   0%, 100% { transform: translateY(-8%); }
//   50% { transform: translateY(8%); }
// }
// .animate-bounce-slow {
//   animation: bounce-slow 3s infinite ease-in-out;
// }