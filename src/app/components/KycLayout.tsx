// // frontend/src/app/kyc/components/KycLayout.tsx
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import KycHeader from './KycHeader';
// import KycStepper from './KycStepper'; // Corrected import path

// interface KycLayoutProps {
//     children: React.ReactNode;
// }

// const pageVariants = {
//     initial: {
//         opacity: 0,
//         y: 20,
//     },
//     in: {
//         opacity: 1,
//         y: 0,
//     },
//     out: {
//         opacity: 0,
//         y: -20,
//     },
// };

// const pageTransition = {
//     type: 'tween', // Smoother transition
//     ease: 'anticipate', // Or 'easeInOut'
//     duration: 0.4,
// };

// const KycLayout: React.FC<KycLayoutProps> = ({ children }) => {
//     return (
//         <div className="flex flex-col min-h-screen bg-background dark:bg-background">
//             <KycHeader />
//             <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
//                 {/* Stepper Section */}
//                 <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
//                     <KycStepper />
//                 </div>

//                 {/* Animated Page Content */}
//                 <motion.div
//                     key={React.useId()} // Use a changing key based on route or step if needed for re-animation
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                     className="w-full" // Ensure motion div takes full width
//                 >
//                     {children}
//                 </motion.div>
//             </main>
//         </div>
//     );
// };

// export default KycLayout;

// // frontend/src/app/kyc/components/KycLayout.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
// import { motion, AnimatePresence } from 'framer-motion';
// import KycHeader from './KycHeader';
// import KycStepper from './KycStepper';
// import { useKyc } from '../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext'; // <-- Import useAuth
// import { Loader2 } from 'lucide-react'; // <-- Import Loader

// interface KycLayoutProps {
//     children: React.ReactNode;
// }

// // Animation variants (keep as they are)
// const pageVariants = {
//     initial: { opacity: 0, y: 20, scale: 0.98 },
//     in: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
//     out: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
// };

// // --- Loading Component ---
// const KycLayoutLoading = () => (
//     <div className="fixed inset-0 z-[150] flex justify-center items-center bg-background/90 backdrop-blur-sm">
//         <div className="text-center">
//             <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
//             <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p>
//         </div>
//     </div>
// );

// // --- Redirecting Component ---
// const KycRedirectingToLogin = () => (
//      <div className="fixed inset-0 z-[150] flex justify-center items-center bg-background/90 backdrop-blur-sm">
//         <div className="text-center">
//             <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-3 mx-auto" />
//             <p className="text-lg font-semibold text-muted-foreground">Redirecting to Login...</p>
//         </div>
//     </div>
// );

// const KycLayoutComponent: React.FC<KycLayoutProps> = ({ children }) => {
//     const pathname = usePathname();
//     const router = useRouter(); // <-- Get router instance
//     const { currentUiStepId } = useKyc();
//     const { user, loading: authLoading } = useAuth(); // <-- Get user and loading state

//     // Determine if the stepper should be visible
//     const showStepper = ['personal', 'details', 'identity', 'upload', 'review'].includes(currentUiStepId);

//     // --- Authentication Check Effect ---
//     useEffect(() => {
//         // Don't do anything while authentication is loading
//         if (authLoading) {
//             return;
//         }

//         // If loading is finished and there's no user, redirect to login
//         if (!user) {
//             console.log(`KycLayout: No user found (path: ${pathname}). Redirecting to login.`);
//             const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
//             router.replace(loginUrl); // Use replace to avoid adding the KYC page to history before login
//         }
//         // If user exists, the component will proceed to render the layout below
//         else {
//             // console.log(`KycLayout: User found (path: ${pathname}). Rendering KYC content.`);
//         }

//     }, [user, authLoading, router, pathname]); // Dependencies for the effect

//     // --- Render Logic ---

//     // 1. Show loader while authentication is in progress
//     if (authLoading) {
//         return <KycLayoutLoading />;
//     }

//     // 2. Show redirecting message if loading is done but user is null
//     // (The useEffect above will handle the actual redirect very quickly)
//     if (!user) {
//          return <KycRedirectingToLogin />;
//     }

//     // 3. Render the actual KYC layout if authenticated
//     return (
//         <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-black/20">
//             <KycHeader />
//             <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
//                 {showStepper && (
//                     <div className="w-full max-w-3xl mb-8 md:mb-12 px-4">
//                         <KycStepper />
//                     </div>
//                 )}
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={pathname}
//                         initial="initial"
//                         animate="in"
//                         exit="out"
//                         variants={pageVariants}
//                         className="w-full flex justify-center"
//                     >
//                         {/* Render children (the actual page) only if authenticated */}
//                         {children}
//                     </motion.div>
//                 </AnimatePresence>
//             </main>
//         </div>
//     );
// };

// export default KycLayoutComponent;

// frontend/src/app/kyc/components/KycLayout.tsx
"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import KycHeader from "./KycHeader";
import KycStepper from "./KycStepper";
import { useKyc } from "../contexts/KycContext"; // Use correct relative path
import { useAuth } from "@/app/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface KycLayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    out: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

// --- Loading Component ---
const KycLayoutLoading = () => (
  <div className="fixed inset-0 z-[150] flex justify-center items-center bg-background/90 backdrop-blur-sm">
    <div className="text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" />
      <p className="text-lg font-medium text-mainheadingWhite">
        Loading Session...
      </p>
    </div>
  </div>
);

const KycLayoutComponent: React.FC<KycLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  // Get state from KycContext for stepper visibility
  const { currentUiStepId, isInitialized: kycInitialized } = useKyc();
  // Get auth state for loading and user check
  const { user, loading: authLoading } = useAuth();

  // Determine if the stepper should be visible based on KycContext UI step
  const showStepper =
    kycInitialized &&
    ["personal", "details", "identity", "upload", "review"].includes(
      currentUiStepId
    );

  // --- Authentication Check Effect ---
  useEffect(() => {
    // If auth is still loading, wait.
    if (authLoading) return;

    // If auth finished and NO user, redirect to login.
    // This ensures unauthenticated users are immediately sent away from /kyc/* routes.
    if (!user) {
      // console.log(`KycLayout: No user detected after auth load (path: ${pathname}). Redirecting to login.`);
      const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(loginUrl); // Use replace to avoid pushing KYC page to history
    }
    // If user exists, proceed to render content below.
  }, [user, authLoading, router, pathname]);

  // --- Render Logic ---

  // 1. Show global loader ONLY while AuthContext is loading.
  if (authLoading) {
    return <KycLayoutLoading />;
  }

  // 2. If Auth is done loading, but there's no user,
  // render a minimal loading/redirect state while the effect redirects.
  // This prevents rendering the layout briefly before the redirect happens.
  if (!user) {
    return (
      <div className="fixed inset-0 z-[150] flex justify-center items-center bg-background/90 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 3. Render the actual KYC layout ONLY if authenticated.
  // The KycProvider's internal logic will handle redirection based on KYC status if needed.
  return (
    <div className="flex flex-col min-h-screen">
      <KycHeader />
      <main className="flex-grow container mx-auto px-4 py-5 md:py-10 flex flex-col items-center">
        {/* Show stepper only if KYC context is initialized and on a form step */}
        {showStepper && (
          <div className="w-full max-w-3xl ">
            <KycStepper />
          </div>
        )}

        {/* AnimatePresence helps with page transitions within the layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname} // Key based on path for animation
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="w-full flex justify-center"
          >
            {/* Render the specific KYC page content passed as children */}
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default KycLayoutComponent;
