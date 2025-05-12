// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, Clock } from 'lucide-react'; // Removed unused CheckCircle, AlertTriangle
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();

//     // Effect to redirect if the user's status is not 'pending'
//     useEffect(() => {
//         if (authLoading) return; // Wait for user data

//         // Redirect if user is not logged in
//         if (!user) {
//             router.replace('/auth/login?redirect=/kyc/pending');
//             return;
//         }

//         // Redirect if status is NOT pending
//         if (user.kycStatus !== 'pending') {
//             console.log(`KYC Pending Page: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/dashboard?kyc=verified'); // Add query param if needed
//                     break;
//                 case 'rejected':
//                     router.replace('/kyc/rejected');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS pending, stay on this page.

//     }, [user, authLoading, router]);

//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state while checking auth/user status
//     if (authLoading || !user) { // Show loader if auth is loading OR user is null (before redirect effect runs)
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2">Checking verification status...</span>
//             </div>
//         );
//     }

//      // If the effect hasn't redirected yet but status is not pending, show loading briefly
//      // This prevents flashing the pending content if redirection is needed
//      if (user.kycStatus !== 'pending') {
//           return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                   <span className="ml-2">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed pending
//     return (
//          <Card className="w-full max-w-md mx-auto shadow-md mt-10"> {/* Added margin top */}
//             <CardHeader className="text-center">
//                 <Clock className="mx-auto h-12 w-12 text-blue-500 mb-3" />
//                 <CardTitle className="text-2xl md:text-3xl font-semibold">
//                     Verification Pending
//                 </CardTitle>
//                 <CardDescription>Your documents are under review.</CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6">
//                 <p className="text-gray-600 dark:text-gray-300">
//                     We've received your information. Our team is reviewing it, which usually takes 1-2 business days (sometimes longer).
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-300">
//                     We'll notify you by email once the review is complete. You can proceed to your dashboard in the meantime.
//                 </p>

//                 <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto">
//                     Go to Dashboard
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext'; // Adjust path if needed
// import { Loader2, Clock, LayoutDashboard } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useKyc } from '../../contexts/KycContext'; // Adjust path if needed

// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get context state for initialization check and setting step
//     const { updateCurrentStepId, isInitialized } = useKyc();

//     // Effect to set the current logical step in the context
//     // This helps if the user directly navigates here or refreshes
//     useEffect(() => {
//         updateCurrentStepId('pending');
//     }, [updateCurrentStepId]);

//     // Effect to handle redirection based on actual user status
//     useEffect(() => {
//         // Wait for both authentication and KYC context initialization
//         if (authLoading || !isInitialized) {
//             // console.log("PendingPage: Waiting for auth or context init...");
//             return; // Don't check status until everything is loaded
//         }

//         // If no user, redirect to login
//         if (!user) {
//             console.log("KYC Pending Page: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/pending'); // Redirect to login, asking to come back
//             return;
//         }

//         // If user exists, check their KYC status and redirect if it's not 'pending'
//         if (user.kycStatus !== 'pending') {
//             console.log(`KYC Pending Page: Status is '${user.kycStatus}', redirecting appropriately...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/kyc/complete'); // Go to the success page
//                     break;
//                 case 'rejected':
//                     router.replace('/kyc/rejected'); // Go to the rejection page
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start'); // Go back to the start if status is unexpected or not started/skipped
//                     break;
//             }
//         }
//         // If status IS 'pending', no redirect is needed, stay on this page.
//         // console.log("PendingPage: User status is 'pending'. Staying on page.");

//     }, [user, authLoading, isInitialized, router]); // Dependencies for the effect

//     // Handler for the dashboard button
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Loading state: Shown while auth is loading OR context is initializing OR user data isn't available yet
//     if (authLoading || !isInitialized || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Checking verification status...</span>
//             </div>
//         );
//     }

//     // Intermediate state: If the effect determines a redirect is needed but hasn't completed yet
//     // This prevents flashing the 'Pending' content if the status is actually different.
//      if (user.kycStatus !== 'pending') {
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Loading status...</span>
//              </div>
//          );
//      }

//     // Main content: Render only if status is confirmed 'pending'
//     return (
//          <Card className="w-full max-w-lg mx-auto shadow-lg border border-blue-200 dark:border-blue-800/50 mt-10 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn">
//             <CardHeader className="text-center items-center pt-8">
//                 {/* Icon */}
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
//                     <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" />
//                 </div>
//                 {/* Title */}
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-300">
//                     Verification Pending
//                 </CardTitle>
//                 {/* Description */}
//                 <CardDescription className="text-base text-muted-foreground pt-1 px-4">
//                     Your submitted documents are currently under review by our team.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8 px-6 md:px-8">
//                 {/* Informational Text */}
//                 <p className="text-foreground/90 dark:text-foreground/80">
//                     Thank you for submitting your information! This review process typically takes 1-2 business days, although it may occasionally take longer.
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                     We appreciate your patience. We'll notify you via email as soon as the review is complete. You can proceed to your dashboard in the meantime.
//                 </p>
//                 {/* Action Button */}
//                 <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white mt-4">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     Go to Dashboard
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext'; // Keep for login check
// import { Loader2, Clock, LayoutDashboard } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useKyc } from '../../contexts/KycContext'; // Adjust path if needed

// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get KYC context state and the CORRECT function name
//     const {
//         backendStatus,      // Get status from KYC context
//         isLoadingStatus,    // Check if KYC status is loading
//         isInitialized,      // Check if KYC context is initialized
//         updateCurrentUiStepId // *** CORRECT FUNCTION NAME ***
//     } = useKyc();

//     // Effect to set the current logical UI step in the context
//     useEffect(() => {
//         // Use the correct function name from the context
//         updateCurrentUiStepId('pending');
//     }, [updateCurrentUiStepId]); // Dependency is the function itself

//     // Effect to handle redirection based *primarily* on auth state
//     useEffect(() => {
//         // Wait for authentication to finish loading
//         if (authLoading) {
//             return; // Don't redirect before knowing if user is logged in
//         }

//         // If no user is logged in after auth check, redirect to login
//         if (!user) {
//             console.log("KYC Pending Page: No user found, redirecting to login.");
//             // Redirect to login, asking to come back here after login
//             router.replace('/auth/login?redirect=/kyc/pending');
//             return;
//         }

//         // Note: Redirection based on *KYC status* (e.g., if it changes from pending)
//         // is now handled by the useEffect within KycContext itself.
//         // This page just needs to ensure the user is logged in.

//     }, [user, authLoading, router]); // Dependencies for the effect

//     // Handler for the dashboard button
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // 1. Show loading state while Auth or KYC context is initializing/loading
//     if (authLoading || !isInitialized || isLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Loading verification status...</span>
//             </div>
//         );
//     }

//     // 2. Handle case where user is logged out (should be caught by effect, but defensive check)
//      if (!user) {
//          return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//                  <span className="ml-3 text-base text-muted-foreground">Redirecting to login...</span>
//              </div>
//          );
//      }

//     // 3. Handle case where KYC status is NOT pending (KycContext redirection might still be running)
//     // Show a generic loader while the context redirects.
//     if (backendStatus !== 'pending') {
//          console.warn(`PendingPage: Rendering loader because backendStatus is ${backendStatus}. KycContext should redirect shortly.`);
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Updating status...</span>
//              </div>
//          );
//      }

//     // 4. Main content: Render only if initialized, user exists, and backendStatus is 'pending'
//     return (
//          <Card className="w-full max-w-lg mx-auto shadow-lg border border-blue-200 dark:border-blue-800/50 mt-10 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn">
//             <CardHeader className="text-center items-center pt-8">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
//                     <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" />
//                 </div>
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-300">
//                     Verification Pending
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1 px-4">
//                     Your submitted documents are currently under review by our team.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8 px-6 md:px-8">
//                 <p className="text-foreground/90 dark:text-foreground/80">
//                     Thank you for submitting your information! This review process typically takes 1-2 business days, although it may occasionally take longer.
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                     We appreciate your patience. We'll notify you via email as soon as the review is complete. You can proceed to your dashboard in the meantime.
//                 </p>
//                 <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white mt-4">
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     Go to Dashboard
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext'; // Keep for login check
// import { Loader2, Clock, LayoutDashboard } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useKyc } from '../../contexts/KycContext'; // Adjust path if needed

// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get KYC context state and the CORRECT function name
//     const {
//         backendStatus,      // Get status from KYC context
//         isLoadingStatus,    // Check if KYC status is loading
//         isInitialized,      // Check if KYC context is initialized
//         updateCurrentUiStepId // *** CORRECT FUNCTION NAME ***
//     } = useKyc();

//     // Effect to set the current logical UI step in the context
//     useEffect(() => {
//         // Use the correct function name from the context
//         updateCurrentUiStepId('pending');
//     }, [updateCurrentUiStepId]); // Dependency is the function itself

//     // Effect to handle redirection based *primarily* on auth state
//     useEffect(() => {
//         // Wait for authentication to finish loading
//         if (authLoading) {
//             return; // Don't redirect before knowing if user is logged in
//         }

//         // If no user is logged in after auth check, redirect to login
//         if (!user) {
//             console.log("KYC Pending Page: No user found, redirecting to login.");
//             // Redirect to login, asking to come back here after login
//             router.replace('/auth/login?redirect=/kyc/pending');
//             return;
//         }

//         // Note: Redirection based on *KYC status* (e.g., if it changes from pending)
//         // is now handled by the useEffect within KycContext itself.
//         // This page just needs to ensure the user is logged in.

//     }, [user, authLoading, router]); // Dependencies for the effect

//     // Handler for the dashboard button
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // 1. Show loading state while Auth or KYC context is initializing/loading
//     if (authLoading || !isInitialized || isLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Loading verification status...</span>
//             </div>
//         );
//     }

//     // 2. Handle case where user is logged out (should be caught by effect, but defensive check)
//      if (!user) {
//          return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//                  <span className="ml-3 text-base text-muted-foreground">Redirecting to login...</span>
//              </div>
//          );
//      }

//     // 3. Handle case where KYC status is NOT pending (KycContext redirection might still be running)
//     // Show a generic loader while the context redirects.
//     if (backendStatus !== 'pending') {
//          console.warn(`PendingPage: Rendering loader because backendStatus is ${backendStatus}. KycContext should redirect shortly.`);
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Updating status...</span>
//              </div>
//          );
//      }

//     // 4. Main content: Render only if initialized, user exists, and backendStatus is 'pending'
//     return (
//          <Card className="w-full max-w-lg mx-auto shadow-lg border border-blue-200 dark:border-blue-800/50 mt-10 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn">
//             <CardHeader className="text-center items-center pt-8">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
//                     <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" />
//                 </div>
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-blue-800 dark:text-blue-300">
//                     Verification Pending
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1 px-4">
//                     Your submitted documents are currently under review by our team.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8 px-6 md:px-8">
//                 <p className="text-foreground/90 dark:text-foreground/80">
//                     Thank you for submitting your information! This review process typically takes 1-2 business days, although it may occasionally take longer.
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                     We appreciate your patience. We'll notify you via email as soon as the review is complete. You can proceed to your dashboard in the meantime.
//                 </p>
//                 <Button onClick={handleGoToDashboard} size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white mt-4">
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
// import { Loader2, Clock, LayoutDashboard, Mail, Info, RefreshCw } from 'lucide-react'; // Use RefreshCw for refresh icon
// import { cn } from '@/lib/utils'; // Import cn utility

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus, // Use context's loading state
//         isInitialized: kycInitialized,
//         updateCurrentUiStepId,
//         fetchKycStatus // Function to trigger a status refresh
//     } = useKyc();

//     // Effect 1: Set UI step in context
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('pending');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) { // Check kycInitialized too
//             console.log("KYC Pending: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/pending');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'pending' (handled by KycContext provider now)
//     // The KycContext provider should handle navigation when backendStatus changes from 'pending'

//     // --- Event Handlers ---
//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     const handleRefreshStatus = () => {
//         console.log("KYC Pending: Manual status refresh triggered.");
//         fetchKycStatus(); // Call the context function to refresh
//     };

//     // --- Render Logic ---

//     // Primary loading state: Waiting for auth or KYC context initialization
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//     // If user is definitely not logged in after loading
//     if (!user) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                 <p className="text-muted-foreground">Redirecting to login...</p>
//             </div>
//         );
//     }

//     // If status is currently being checked or is not yet 'pending'
//     if (kycLoadingStatus || (backendStatus !== 'pending' && backendStatus !== 'error')) {
//          // Show loading indicator while status is being fetched or updated
//          // The context will handle redirection if status becomes verified/rejected etc.
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'pending'
//     // We check for 'error' state explicitly handled by provider if needed
//     if (backendStatus !== 'pending') {
//        // This case should ideally be handled by the KycProvider redirecting,
//        // but act as a failsafe or indicate potential state inconsistency.
//        console.warn(`KYC Pending Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//         );
//     }

//     // --- Main Pending Content ---
//     return (
//          <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//              <Card className="w-full max-w-lg mx-auto shadow-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/60">
//                      <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4 border border-blue-200 dark:border-blue-800 shadow-inner">
//                          <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" />
//                      </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
//                          Verification in Progress
//                      </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto">
//                          Your documents are under review. Thank you for your patience!
//                      </CardDescription>
//                 </CardHeader>
//                  <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <p className="text-foreground/90 dark:text-foreground/80 text-base">
//                         Reviews typically take <span className="font-semibold text-primary">1-2 business days</span>, but may occasionally take longer.
//                     </p>
//                     <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
//                         <Mail className="h-4 w-4 flex-shrink-0"/> We'll notify you by email once the review is complete.
//                     </p>
//                     <p className="text-muted-foreground text-sm pt-2 flex items-center justify-center gap-1.5">
//                         <Info className="h-4 w-4 flex-shrink-0"/> Some account features may be limited until verification is successful.
//                     </p>
//                      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                          <Button onClick={handleGoToDashboard} size="lg" className="flex-1">
//                              <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                          </Button>
//                          <Button
//                             onClick={handleRefreshStatus}
//                             variant="outline"
//                             size="lg"
//                             disabled={kycLoadingStatus} // Disable button while already refreshing
//                             className="flex-1"
//                           >
//                             <RefreshCw className={cn("mr-2 h-4 w-4", kycLoadingStatus ? "animate-spin" : "")} />
//                              Refresh Status
//                         </Button>
//                      </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, Clock, LayoutDashboard, Mail, Info, RefreshCw } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus, // Use context's loading state
//         isInitialized: kycInitialized,
//         updateCurrentUiStepId,
//         fetchKycStatus // Function to trigger a status refresh
//     } = useKyc();

//     // Effect 1: Set UI step in context
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/pending') {
//             updateCurrentUiStepId('pending');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status (context handles main redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             // console.log("KYC Pending: No user found, context should redirect to login.");
//             // Let KycProvider handle redirect to login
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Rely on KycContext provider for redirection if status changes *away* from 'pending'

//     // --- Event Handlers ---
//     const handleGoToDashboard = useCallback(() => {
//         router.push('/dashboard');
//     }, [router]);

//     const handleRefreshStatus = useCallback(() => {
//         // console.log("KYC Pending: Manual status refresh triggered.");
//         if (!kycLoadingStatus) { // Prevent multiple clicks while already loading
//             fetchKycStatus(true); // Call the context function to refresh (force retry)
//         }
//     }, [fetchKycStatus, kycLoadingStatus]); // Add kycLoadingStatus dependency

//     // --- Render Logic ---

//     // Primary loading state: Waiting for auth or KYC context initialization
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Initializing...</p>
//             </div>
//         );
//     }

//      // Show loading if status is being checked actively
//      if (kycLoadingStatus) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//    }

//     // If user is logged in, but status is NOT pending, context should redirect. Show loading briefly.
//     if (user && backendStatus !== 'pending') {
//         // console.log(`KYC Pending Page: Status is ${backendStatus}, waiting for context redirect.`);
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

//     // --- Main Pending Content (Render only if user exists and status is 'pending') ---
//     return (
//          <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//              <Card className="w-full max-w-lg mx-auto shadow-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/60">
//                      <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4 border border-blue-200 dark:border-blue-800 shadow-inner">
//                          <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" />
//                      </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
//                          Verification in Progress
//                      </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto">
//                          Your documents are under review. Thank you for your patience!
//                      </CardDescription>
//                 </CardHeader>
//                  <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <p className="text-foreground/90 dark:text-foreground/80 text-base">
//                         Reviews typically take <span className="font-semibold text-primary">1-2 business days</span>, but may occasionally take longer.
//                     </p>
//                     <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
//                         <Mail className="h-4 w-4 flex-shrink-0"/> We'll notify you by email once the review is complete.
//                     </p>
//                     <p className="text-muted-foreground text-sm pt-2 flex items-center justify-center gap-1.5">
//                         <Info className="h-4 w-4 flex-shrink-0"/> Some account features may be limited until verification is successful.
//                     </p>
//                      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                          <Button onClick={handleGoToDashboard} size="lg" className="flex-1">
//                              <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                          </Button>
//                          <Button
//                             onClick={handleRefreshStatus}
//                             variant="outline"
//                             size="lg"
//                             disabled={kycLoadingStatus} // Disable button while already refreshing
//                             className="flex-1"
//                           >
//                             <RefreshCw className={cn("mr-2 h-4 w-4", kycLoadingStatus ? "animate-spin" : "")} />
//                              Refresh Status
//                         </Button>
//                      </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/pending/page.tsx
// 'use client';

// import React, { useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, Clock, LayoutDashboard, Mail, Info, RefreshCw } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycPendingPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         backendStatus, isLoadingStatus: kycLoadingStatus,
//         isInitialized: kycInitialized, updateCurrentUiStepId,
//         fetchKycStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/pending') {
//             updateCurrentUiStepId('pending');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login (context handles redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) { /* Context redirects */ }
//     }, [user, authLoading, kycInitialized]);

//     // Effect 3: Rely on context for redirection if status changes from 'pending'

//     const handleGoToDashboard = useCallback(() => { router.push('/dashboard'); }, [router]);
//     const handleRefreshStatus = useCallback(() => { if (!kycLoadingStatus) fetchKycStatus(true); }, [fetchKycStatus, kycLoadingStatus]);

//     // --- Render Logic ---
//     // Primary Loading
//     if (authLoading || !kycInitialized) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Context Status Loading
//     if (kycLoadingStatus) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Waiting for Redirect (if status not 'pending')
//     if (user && backendStatus !== 'pending') {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Not Logged In
//     if (!user) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /> </div> );
//     }

//     // --- Main Pending Content ---
//     return (
//          <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//              <Card className="w-full max-w-lg mx-auto shadow-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-background to-blue-50 dark:from-secondary dark:to-blue-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/60">
//                      <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4 border border-blue-200 dark:border-blue-800 shadow-inner"> <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400 stroke-[1.5]" /> </div>
//                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"> Verification in Progress </CardTitle>
//                      <CardDescription className="text-base text-muted-foreground pt-1 px-4 max-w-md mx-auto"> Your documents are under review. Thank you! </CardDescription>
//                 </CardHeader>
//                  <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <p className="text-foreground/90 dark:text-foreground/80 text-base"> Reviews typically take <span className="font-semibold text-primary">1-2 business days</span>. </p>
//                     <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5"> <Mail className="h-4 w-4 flex-shrink-0"/> We'll notify you by email upon completion. </p>
//                     <p className="text-muted-foreground text-sm pt-2 flex items-center justify-center gap-1.5"> <Info className="h-4 w-4 flex-shrink-0"/> Some features may be limited until verified. </p>
//                      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                          <Button onClick={handleGoToDashboard} size="lg" className="flex-1"> <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard </Button>
//                          <Button onClick={handleRefreshStatus} variant="outline" size="lg" disabled={kycLoadingStatus} className="flex-1" > <RefreshCw className={cn("mr-2 h-4 w-4", kycLoadingStatus ? "animate-spin" : "")} /> Refresh Status </Button>
//                      </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// frontend/src/app/kyc/pending/page.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// --- UI Components ---
import { Button } from "@/components/ui/button";
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
  Clock,
  LayoutDashboard,
  MailCheck, // Changed from Mail for slightly different semantic meaning
  Info,
  RefreshCw,
  Hourglass, // Alternative icon option
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- App Specific Imports ---
import { useAuth } from "@/app/contexts/AuthContext";
import { useKyc } from "../../contexts/KycContext";

// --- Component ---
export default function KycPendingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    backendStatus,
    isLoadingStatus: kycLoadingStatus,
    isInitialized: kycInitialized,
    updateCurrentUiStepId,
    fetchKycStatus,
  } = useKyc();

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/pending") {
      updateCurrentUiStepId("pending");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Check login (context handles redirection)
  useEffect(() => {
    if (!authLoading && !user && kycInitialized) {
      /* Context redirects */
    }
  }, [user, authLoading, kycInitialized]);

  // Effect 3: Rely on context for redirection if status changes from 'pending'

  const handleGoToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);
  const handleRefreshStatus = useCallback(() => {
    if (!kycLoadingStatus) fetchKycStatus(true);
  }, [fetchKycStatus, kycLoadingStatus]);

  // --- Render Logic ---
  // Primary Loading
  if (authLoading || !kycInitialized) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  // Context Status Loading
  if (kycLoadingStatus && !user) { // Show loading only if also fetching status for the first time maybe?
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  // Waiting for Redirect (if status not 'pending' or not logged in after initial check)
  if (user && backendStatus !== "pending") {
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
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      );
  }


  // --- Main Pending Content ---
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="w-full border-border/50 shadow-none animate-fadeIn overflow-hidden">
        <CardHeader className="items-center text-center p-4 md:p-8 bg-accent">
          <div className="mb-4 w-full inline-flex justify-center">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/20 text-primaryhover border border-primary/30 ">
              {/* <Clock className="h-8 w-8" /> */}
              <Hourglass className="h-8 w-8" /> {/* Alternative Icon */}
            </div>
          </div>
          <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight text-mainheading dark:text-white">
            Verification Pending
          </CardTitle>
          <CardDescription className="sm:text-base text-sm text-gray-500 dark:text-gray-300 mt-1 px-4">
            Your submitted information is currently under review.
          </CardDescription>
          <Badge
            variant="outline"
            className="mt-3 text-sm border-0 rounded-full font-medium text-blue-600 bg-blue-100 dark:bg-blue-600/20 dark:text-blue-400 px-4 py-2 w-28"
          >
            Pending
          </Badge>
        </CardHeader>

        <CardContent className="p-4 md:p-8 space-y-6">
          <div className="text-center text-gray-500 dark:text-gray-300 sm:text-lg text-base">
            <p className="">Thank you for your patience!</p>
            <p className="mt-1">
              Reviews typically take{" "}
              <span className="font-semibold text-primary">
                1-2 business days
              </span>
              .
            </p>
          </div>

          <Separator className="my-6" />

          <Alert className="p-4 rounded-lg">
            <MailCheck className="h-5 w-5 flex-shrink-0 mt-1 text-neutral-900 dark:text-white" />
            <div>

            <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
              Email Notification
            </AlertTitle>
            <AlertDescription className="text-gray-500 dark:text-gray-300">
              We will notify you via email as soon as the review process is
              complete.
            </AlertDescription>
            </div>
          </Alert>

          <Alert className="p-4 rounded-lg">
            <Info className="h-5 w-5 flex-shrink-0 mt-1 text-neutral-900 dark:text-white" />
            <div>
              <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
                Account Access
              </AlertTitle>
              <AlertDescription className="text-gray-500 dark:text-gray-300">
                While your verification is pending, some account features might
                be limited. You can still access your dashboard.
              </AlertDescription>
            </div>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 md:p-8 bg-bg-accent border-t">
          <button
            onClick={handleGoToDashboard}
            className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
          </button>
          <button
            onClick={handleRefreshStatus}
            disabled={kycLoadingStatus}
            className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
          >
            <RefreshCw
              className={cn(
                "mr-2 h-4 w-4",
                kycLoadingStatus ? "animate-spin" : ""
              )}
            />
            {kycLoadingStatus ? "Checking..." : "Refresh Status"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
