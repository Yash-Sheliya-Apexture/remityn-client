// // src/app/kyc/components/KycHeader.tsx
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image'; // Assuming you use Next/Image for logo

// const KycHeader: React.FC = () => {
//     return (
//         <header className="bg-white dark:bg-secondary shadow-sm">
//             <div className="container mx-auto px-4 py-4">
//                 <div className="flex justify-between items-center">
//                     {/* Logo */}
//                     <Link href="/" className="flex items-center space-x-2">
//                         {/* Replace with your actual logo */}
//                         <Image
//                             src="/assets/images/wise-logo.svg" // Adjust path to your logo
//                             alt="Wise Clone Logo"
//                             width={32}
//                             height={32}
//                             className="h-8 w-auto"
//                         />
//                         <span className="text-xl font-semibold text-mainheading dark:text-white hidden sm:inline">
//                             Wise Clone {/* Or your app name */}
//                         </span>
//                     </Link>

//                     {/* Optional: Help Link */}
//                     <Link
//                         href="/help/kyc" // Example help link
//                         className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
//                     >
//                         Need help?
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default KycHeader;

// // frontend/src/app/kyc/components/KycHeader.tsx
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { HelpCircle } from 'lucide-react'; // Import an icon

// const KycHeader: React.FC = () => {
//     return (
//         <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border/60">
//             <div className="container mx-auto h-16 flex items-center justify-between px-4">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="Go to homepage">
//                     <Image
//                         src="/assets/images/wise-logo.svg" // Ensure this path is correct
//                         alt="Logo"
//                         width={32}
//                         height={32}
//                         className="h-8 w-auto"
//                         priority // Prioritize logo loading
//                     />
//                 </Link>

//                 {/* Optional: Help Link */}
//                 <Link
//                     href="/help#kyc" // Link to specific help section if available
//                     className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//                 >
//                     <HelpCircle className="h-4 w-4" />
//                     Need Help?
//                 </Link>
//             </div>
//         </header>
//     );
// };

// export default KycHeader;

// frontend/src/app/kyc/components/KycHeader.tsx
// (No changes needed)
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react"; // Import an icon

const KycHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container mx-auto sm:h-20 h-16 flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="Go to homepage">
                    <Image
                        src="/assets/images/main_logo.svg" // Ensure this path is correct
                        alt="Logo"
                        width={150}
                        height={30}
                        className="h-auto"
                        priority // Prioritize logo loading
                    />
                </Link>

                {/* Optional: Help Link */}
                <Link
                    href="/help#kyc" // Link to specific help section if available
                    className="flex items-center gap-1.5 text-sm font-medium text-mainheadingWhite hover:text-primary transition-colors"
                >
                    <HelpCircle className="h-4 w-4" />
                    Need Help?
                </Link>
            </div>
        </header>
    );
};

export default KycHeader;
