// // frontend/src/app/kyc/complete/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext'; // Adjust path if needed
// import { Loader2, CheckCircle, PartyPopper, LayoutDashboard } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // Import useKyc hook
// import { useKyc } from '../../contexts/KycContext'; // Adjust path if needed

// export default function KycCompletePage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get context state ONLY for initialization check
//     const { isInitialized, backendStatus } = useKyc(); // Get backendStatus for final check

//     // Remove the useEffect that called updateCurrentUiStepId - not needed here

//     // --- Simplified Redirection Logic ---
//     // Effect to handle PRE-REQUISITES: Authentication
//     useEffect(() => {
//         // Wait for auth loading
//         if (authLoading) {
//             return;
//         }
//         // If no user after loading, redirect to login
//         if (!user) {
//             console.log("KYC Complete Page: No user found, redirecting to login.");
//             // Use replace to avoid adding this page to history if user isn't logged in
//             router.replace('/auth/login?redirect=/kyc/complete');
//         }
//     }, [user, authLoading, router]);

//     // Handler for the dashboard button
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Loading state: Shown while auth is loading OR KycContext is initializing
//     // Add a check specifically for backendStatus being loading AFTER initialization
//     if (authLoading || !isInitialized || backendStatus === 'loading') {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                 <span className="ml-3 text-lg text-muted-foreground">Loading verification status...</span>
//             </div>
//         );
//     }

//     // Edge case: If somehow user lands here but isn't authenticated (should be caught by useEffect)
//     if (!user) {
//          return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Redirecting to login...</span>
//              </div>
//          );
//     }

//     // IMPORTANT: Render the "Complete" content ONLY if the provider's status is definitively 'verified'.
//     // The provider should handle redirecting away if the status changes.
//     if (backendStatus !== 'verified') {
//          // This case should ideally be handled by the KycProvider's redirection logic.
//          // Showing a loader here prevents flashing content if the provider redirects immediately.
//          return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Verifying status...</span>
//              </div>
//          );
//     }

//     // Main content: Render only if status is confirmed 'verified' by the provider
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-xl border border-green-200 dark:border-green-800/50 mt-10 bg-gradient-to-br from-background to-green-50 dark:from-secondary dark:to-green-900/20 animate-fadeIn">
//             <CardHeader className="text-center items-center pt-8">
//                 <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-full mb-4">
//                     <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 stroke-[1.5]" />
//                  </div>
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-green-800 dark:text-green-300">
//                     Verification Complete!
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1 px-4">
//                     Congratulations, your identity has been successfully verified.
//                     <PartyPopper className="inline h-5 w-5 ml-1.5 mb-1"/>
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="text-center space-y-6 pb-8 px-6 md:px-8">
//                  <p className="text-foreground/90 dark:text-foreground/80">
//                     You now have full access to all account features and services. Thank you for completing the verification process.
//                  </p>
//                 <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white mt-4">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     Go to Dashboard
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// }
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, CheckCircle, PartyPopper, LayoutDashboard } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycCompletePage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         isInitialized: kycInitialized,
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus,
//         updateCurrentUiStepId
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('complete');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             console.log("KYC Complete: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/complete');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'verified' (handled by KycContext provider now)

//     // --- Event Handlers ---
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Primary loading state
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//     // If user is definitely not logged in
//     if (!user) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                 <p className="text-muted-foreground">Redirecting to login...</p>
//             </div>
//         );
//     }

//     // If status is being checked or is not yet 'verified'
//     if (kycLoadingStatus || (backendStatus !== 'verified' && backendStatus !== 'error')) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Confirming Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'verified'
//     if (backendStatus !== 'verified') {
//          console.warn(`KYC Complete Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Complete Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-green-200 dark:border-green-800/50 bg-gradient-to-br from-background to-green-50 dark:from-secondary dark:to-green-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/60">
//                      <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full mb-4 border border-green-200 dark:border-green-700 shadow-inner">
//                          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 stroke-[1.5]" />
//                      </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-green-800 dark:text-green-300">
//                          Verification Successful!
//                          <PartyPopper className="inline-block h-7 w-7 ml-2 mb-1 text-yellow-500 animate-bounce"/>
//                      </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto">
//                          Congratulations{user.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}! Your identity is verified.
//                      </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                      <p className="text-foreground/90 dark:text-foreground/80 text-base">
//                          You now have full access to all account features. Thank you for completing the verification process.
//                      </p>
//                      <Button
//                         onClick={handleGoToDashboard}
//                         size="lg"
//                         className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 mt-4"
//                       >
//                           <LayoutDashboard className="mr-2 h-4 w-4" /> Proceed to Dashboard
//                      </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/complete/page.tsx
// 'use client';

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, CheckCircle, PartyPopper, LayoutDashboard } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycCompletePage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         isInitialized: kycInitialized,
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus,
//         updateCurrentUiStepId
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/complete') {
//             updateCurrentUiStepId('complete');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status (context handles main redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             // console.log("KYC Complete: No user found, context should redirect to login.");
//              // Let KycProvider handle redirect to login
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Rely on KycContext provider for redirection if status changes *away* from 'verified'

//     // --- Event Handlers ---
//     const handleGoToDashboard = useCallback(() => {
//         router.push('/dashboard');
//     }, [router]);

//     // --- Render Logic ---

//     // Primary loading state
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//     // Show loading if status is being checked actively
//     if (kycLoadingStatus) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Confirming Verification Status...</p>
//             </div>
//         );
//     }

//     // If user is logged in, but status is NOT verified, context should redirect.
//     if (user && backendStatus !== 'verified') {
//         // console.log(`KYC Complete Page: Status is ${backendStatus}, waiting for context redirect.`);
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // If user is not logged in (and auth check is complete)
//     if (!user) {
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                  <p className="text-muted-foreground">Redirecting to login...</p>
//              </div>
//         );
//     }

//     // --- Main Complete Content (Render only if user exists and status is 'verified') ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-green-200 dark:border-green-800/50 bg-gradient-to-br from-background to-green-50 dark:from-secondary dark:to-green-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/60">
//                      <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full mb-4 border border-green-200 dark:border-green-700 shadow-inner">
//                          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 stroke-[1.5]" />
//                      </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-green-800 dark:text-green-300">
//                          Verification Successful!
//                          <PartyPopper className="inline-block h-7 w-7 ml-2 mb-1 text-yellow-500 animate-bounce"/>
//                      </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto">
//                          Congratulations{user.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}! Your identity is verified.
//                      </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                      <p className="text-foreground/90 dark:text-foreground/80 text-base">
//                          You now have full access to all account features. Thank you for completing the verification process.
//                      </p>
//                      <Button
//                         onClick={handleGoToDashboard}
//                         size="lg"
//                         className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 mt-4"
//                       >
//                           <LayoutDashboard className="mr-2 h-4 w-4" /> Proceed to Dashboard
//                      </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/complete/page.tsx
// 'use client';

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, CheckCircle, PartyPopper, LayoutDashboard } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycCompletePage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         isInitialized: kycInitialized, backendStatus,
//         isLoadingStatus: kycLoadingStatus, updateCurrentUiStepId
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/complete') {
//             updateCurrentUiStepId('complete');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login (context handles redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) { /* Context redirects */ }
//     }, [user, authLoading, kycInitialized]);

//     // Effect 3: Rely on context for redirection if status changes from 'verified'

//     const handleGoToDashboard = useCallback(() => { router.push('/dashboard'); }, [router]);

//     // --- Render Logic ---
//     // Primary Loading
//     if (authLoading || !kycInitialized) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Context Status Loading
//     if (kycLoadingStatus) {
//          return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Waiting for Redirect (if status not 'verified')
//     if (user && backendStatus !== 'verified') {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Not Logged In
//     if (!user) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /> </div> );
//     }

//     // --- Main Complete Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-green-200 dark:border-green-800/50 bg-gradient-to-br from-background to-green-50 dark:from-secondary dark:to-green-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/60">
//                      <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full mb-4 border border-green-200 dark:border-green-700 shadow-inner"> <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 stroke-[1.5]" /> </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-green-800 dark:text-green-300"> Verification Successful! <PartyPopper className="inline-block h-7 w-7 ml-2 mb-1 text-yellow-500 animate-bounce"/> </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto"> Congratulations{user.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}! Your identity is verified. </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                      <p className="text-foreground/90 dark:text-foreground/80 text-base"> You now have full access to all account features. </p>
//                      <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 mt-4" > <LayoutDashboard className="mr-2 h-4 w-4" /> Proceed to Dashboard </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// frontend/src/app/kyc/complete/page.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// --- UI Components ---
// Button is needed for the custom styled button now
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  CheckCircle,
  PartyPopper,
  LayoutDashboard,
  ShieldCheck, // Icon suggesting security/completion
  Star, // Icon suggesting achievement/full access
} from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure cn is imported

// --- App Specific Imports ---
import { useAuth } from "@/app/contexts/AuthContext";
import { useKyc } from "../../contexts/KycContext";

// --- Component ---
export default function KycCompletePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    isInitialized: kycInitialized,
    backendStatus,
    isLoadingStatus: kycLoadingStatus,
    updateCurrentUiStepId,
  } = useKyc();

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/complete") {
      updateCurrentUiStepId("complete");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Check login (context handles redirection)
  useEffect(() => {
    if (!authLoading && !user && kycInitialized) {
      /* Context redirects */
    }
  }, [user, authLoading, kycInitialized]);

  // Effect 3: Rely on context for redirection if status changes from 'verified'
  // (No explicit code needed here, KycContext handles this)

  const handleGoToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  // --- Render Logic ---
  // Primary Loading
  if (authLoading || !kycInitialized) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  // Context Status Loading (show spinner briefly if status is loading initially)
  if (kycLoadingStatus && !user) {
     return (
        <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  // Waiting for Redirect (if status not 'verified' or not logged in after initial check)
  if (user && backendStatus !== "verified") {
    // Context should redirect, show spinner while waiting
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
   if (!user) {
      // If definitely not logged in after checks
      return (
          <div className="flex justify-center items-center min-h-[400px]">
              {/* Use muted color if definitely not logged in */}
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  // --- Main Complete Content ---
  return (
    // Adopt layout and max-width from Pending page
    <div className="mx-auto lg:max-w-2xl w-full">
      {/* Adopt Card styling from Pending page - standard border, shadow, animation */}
      <Card className="bg-background w-full border shadow-none animate-fadeIn overflow-hidden">
        {/* Adopt Header structure and styling from Pending page */}
        <CardHeader className="items-center text-center p-4 md:p-8 bg-primarybox">
          {/* Icon Container - styled with Green theme */}
          <div className="mb-4 w-full inline-flex justify-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-600/25 text-green-600 border border-green-600 ">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          {/* Title - Adopt font styling from Pending */}
          <CardTitle className="text-2xl font-semibold tracking-tight text-mainheadingWhite">
            Verification Successful!{" "}
            <PartyPopper className="inline-block h-6 w-6 ml-1 mb-1 text-yellow-500 animate-bounce" />
          </CardTitle>
          {/* Description - Adopt styling from Pending */}
          <CardDescription className="text-base text-subheadingWhite mt-1">
            Congratulations
            {user.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}! Your
            identity has been verified.
          </CardDescription>
          {/* Badge - Adopt structure/styling from Pending, use Green theme */}
          <Badge
            variant="outline"
            className="mt-3 text-sm border-0 rounded-full font-medium bg-green-600/25 text-green-500 px-4 py-2 w-28"
          >
            Verified
          </Badge>
        </CardHeader>

        {/* Adopt Content structure from Pending page */}
        <CardContent className="p-4 md:p-8 space-y-6">
          {/* Introductory Text - Adopt styling from Pending */}
          <div className="text-center text-mainheadingWhite sm:text-lg text-base">
            <p className="">Welcome aboard!</p>
            <p className="mt-1">
              You now have{" "}
              <span className="font-semibold text-primary">full access</span> to
              all account features.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Alerts - Adopt structure/styling from Pending, adapt content */}
          <div className="p-4 border flex gap-4 rounded-lg">
            <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-1 text-green-500" />{" "}
            {/* Success Icon */}
            <div>
              <AlertTitle className="font-medium text-mainheadingWhite tracking-normal text-base mb-1">
                Verification Complete
              </AlertTitle>
              <AlertDescription className="text-subheadingWhite">
                Your identity documents have been successfully reviewed and
                approved.
              </AlertDescription>
            </div>
          </div>

          <div className="p-4 border flex gap-4 rounded-lg">
            <Star className="h-5 w-5 flex-shrink-0 mt-1 text-yellow-500" />{" "}
            {/* Feature/Access Icon */}
            <div>
              <AlertTitle className="font-medium text-mainheadingWhite tracking-normal text-base mb-1">
                Full Access Unlocked
              </AlertTitle>
              <AlertDescription className="text-subheadingWhite">
                Explore your dashboard and utilize all the features available to
                verified users.
              </AlertDescription>
            </div>
          </div>
        </CardContent>

        {/* Adopt Footer structure from Pending page */}
        <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 md:p-8 border-t">
          {/* Adopt button styling from Pending, but use green gradient for primary action */}
          <button
            onClick={handleGoToDashboard}
            // Combine custom styles from Pending's button with the gradient from original Complete button
            className="inline-flex items-center justify-center bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Proceed to Dashboard
          </button>
          {/* No second button needed for the complete page */}
        </CardFooter>
      </Card>
    </div>
  );
}