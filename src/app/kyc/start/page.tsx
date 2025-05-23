// // frontend/src/app/kyc/start/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button'; // Assuming Shadcn UI
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc'; // Adjust path
// import { Loader2 } from 'lucide-react'; // Example loading icon

// export default function KycStartPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const [isLoading, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);

//     // Redirect verified users away from start page
//     useEffect(() => {
//         if (!authLoading && user?.kycStatus === 'verified') {
//             router.replace('/dashboard');
//         }
//          // Redirect pending users
//          if (!authLoading && user?.kycStatus === 'pending') {
//             router.replace('/kyc/pending');
//         }
//         // Rejected users might land here, handled by buttons below
//     }, [user, authLoading, router]);

//     const handleStartVerification = () => {
//         router.push('/kyc/personal'); // Navigate to the first step
//     };

//      const handleSkip = async () => {
//         if (!confirm("Are you sure you want to skip verification for now? You'll need to complete it later to use all features.")) {
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         try {
//             await kycService.skipKyc();
//             await refetchUser(); // Update user status in context
//             router.push('/dashboard'); // Redirect to dashboard
//         } catch (err: any) {
//             console.error("Error skipping KYC:", err);
//             setError(err.message || "Could not skip verification. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (authLoading || isLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//         );
//     }

//      // Don't render content if redirecting
//      if (user?.kycStatus === 'verified' || user?.kycStatus === 'pending') {
//          return null;
//      }

//     return (
//         <div className="text-center">
//             <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-mainheading dark:text-white">
//                 Verify your identity
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
//                 To comply with regulations and keep your account secure, we need to verify your identity.
//                 This usually takes just a few minutes. You'll need a valid government-issued photo ID.
//             </p>

//             {user?.kycStatus === 'rejected' && (
//                  <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-200">
//                     <p className="font-medium">Verification Required</p>
//                     <p className="text-sm">Your previous verification attempt was rejected.</p>
//                      {user.kycRejectionReason && <p className="text-sm mt-1">Reason: {user.kycRejectionReason}</p>}
//                     <p className="text-sm mt-2">Please review the requirements and start the process again.</p>
//                 </div>
//             )}

//              {error && (
//                  <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-200 text-sm">
//                     {error}
//                 </div>
//              )}

//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <Button
//                     onClick={handleStartVerification}
//                     size="lg"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                     {user?.kycStatus === 'rejected' ? 'Start Verification Again' : 'Start Verification'}
//                 </Button>
//                 {/* Only allow skipping if not started or rejected */}
//                 {(user?.kycStatus === 'not_started' || user?.kycStatus === 'rejected') && (
//                      <Button
//                         onClick={handleSkip}
//                         variant="outline"
//                         size="lg"
//                         disabled={isLoading}
//                     >
//                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                         Skip for Now
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/start/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext'; // Import context
// import kycService from '@/app/services/kyc'; // For skip action

// // --- Component ---
// export default function KycStartPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         resetKycProgress, // To clear any stale data before starting
//         goToStep,         // To navigate to the first form step
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized, // Check if KYC context is ready
//         backendStatus, // Get status directly from KYC context
//         isLoadingStatus: kycLoadingStatus, // Check if KYC status is loading
//         rejectionReason // Get rejection reason from context
//     } = useKyc();

//     // Local loading state for actions initiated on this page (Skip)
//     const [isSkipping, setIsSkipping] = useState(false);
//     const [actionError, setActionError] = useState<string | null>(null); // Errors from skip action

//     // Effect 1: Set the current UI step in context
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('start');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Handle redirection based on initial context status
//     // The KycContext provider handles ongoing status changes.
//     useEffect(() => {
//         if (authLoading || !kycInitialized || kycLoadingStatus) return; // Still loading, wait...
//         if (!user) {
//             // console.log("KYC Start: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/start');
//             return;
//         }

//         // Redirect based on the definitive status from KycContext
//         // console.log("KYC Start: Auth/KYC ready. Backend Status:", backendStatus);
//         switch (backendStatus) {
//             case 'verified':
//                 // console.log("KYC Start: Status is verified, redirecting to dashboard.");
//                 router.replace('/dashboard');
//                 break;
//             case 'pending':
//                 //  console.log("KYC Start: Status is pending, redirecting to pending page.");
//                 router.replace('/kyc/pending');
//                 break;
//             case 'rejected':
//                 // console.log("KYC Start: Status is rejected. Redirecting to rejected page.");
//                  // **Correction:** Rejected users should go to /kyc/rejected page
//                  router.replace('/kyc/rejected');
//                  break;
//              case 'skipped':
//                 // console.log("KYC Start: Status is skipped. Staying on start page.");
//                  // Stay here, show start verification option
//                 break;
//              case 'not_started':
//                 // console.log("KYC Start: Status is not_started. Staying on start page.");
//                  // Stay here, allow starting/skipping
//                 break;
//             case 'loading':
//             case 'error':
//                  // console.log("KYC Start: Status is loading/error, waiting for context resolution.");
//                  break; // Let context handle display/redirect
//             default:
//                  console.warn(`KYC Start: Unknown backend status "${backendStatus}", redirecting to dashboard as failsafe.`);
//                  router.replace('/dashboard');
//         }
//     // Only run when contexts/status initially stabilize or change
//     }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router]);

//     // --- Action Handlers ---

//     const handleStartVerification = () => {
//         setActionError(null);
//         console.log("KYC Start: Initiating verification flow...");
//         resetKycProgress(false); // Reset state but don't navigate yet
//         goToStep('personal');    // Navigate to the first form step
//     };

//      const handleSkip = async () => {
//         if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

//         setIsSkipping(true);
//         setActionError(null);
//         try {
//             console.log("KYC Start: Attempting to skip KYC via service...");
//             await kycService.skipKyc();
//             await refetchUser(); // Update AuthContext -> triggers KycContext update & redirect
//              console.log("KYC Start: Skip successful. Waiting for context status update and redirection.");
//              // Let context handle redirection
//         } catch (err: any) {
//             console.error("KYC Start: Error skipping KYC:", err);
//             setActionError(err.message || "Could not skip verification. Please try again later or start the verification process.");
//              setIsSkipping(false);
//         }
//     };

//     // --- Render Logic ---

//     if (authLoading || !kycInitialized || kycLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
//             </div>
//         );
//     }

//      if (backendStatus === 'error') return null; // Provider handles the UI

//      // Prevent flicker if redirection is expected based on status
//      if (!user || backendStatus === 'verified' || backendStatus === 'pending' || backendStatus === 'rejected') {
//           return (
//               <div className="flex justify-center items-center min-h-[400px]">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                   <span className="ml-3 text-muted-foreground">Checking Status...</span>
//              </div>
//          );
//      }

//     // --- Content specific to user status (not_started, skipped) ---
//      let title = 'Verify Your Identity';
//      let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
//      let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//      let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//      let statusMessage = null;

//      if (backendStatus === 'skipped') {
//          title = 'Complete Your Verification';
//          description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
//          icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//          statusMessage = (
//              // FIX: Removed variant="info" as it's not a standard variant for shadcn Alert.
//              // The default variant is suitable for informational messages.
//              <Alert className="text-left">
//                  <Info className="h-4 w-4"/>
//                  <AlertTitle>Verification Recommended</AlertTitle>
//                  <AlertDescription>
//                      Complete verification now to access all account features and enhance security.
//                  </AlertDescription>
//              </Alert>
//          );
//      }
//       // Note: 'rejected' status is handled by redirecting to /kyc/rejected page now

//     return (
//          <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn">
//              <CardHeader className="text-center items-center p-6 md:p-8">
//                  {icon}
//                 <CardTitle className="text-2xl md:text-3xl font-semibold">
//                     {title}
//                 </CardTitle>
//                 <CardDescription className="mt-2 text-base">
//                     {description}
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//                 {statusMessage}

//                  <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//                       <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
//                  </div>

//                  {actionError && (
//                      <Alert variant="destructive">
//                          <AlertTriangle className="h-4 w-4"/>
//                          <AlertTitle>Action Failed</AlertTitle>
//                          <AlertDescription>{actionError}</AlertDescription>
//                      </Alert>
//                  )}

//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                     <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="flex-1">
//                         {/* Icon only for retry, which is now on rejected page */}
//                         {/* {backendStatus === 'rejected' ? <RotateCcw className="mr-2 h-4 w-4" /> : null} */}
//                         Start Verification
//                     </Button>

//                      {/* Show Skip button only if not_started */}
//                      {(backendStatus === 'not_started') && (
//                          <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1">
//                              {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                             Skip for Now
//                         </Button>
//                     )}
//                 </div>
//                  {/* Optional: Link to support */}
//                  <p className="text-xs text-muted-foreground pt-4">
//                      Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                  </p>
//             </CardContent>
//         </Card>
//     );
// }

//  // frontend/src/app/kyc/start/page.tsx
//  'use client';

//  import React, { useEffect, useState } from 'react';
//  import { useRouter } from 'next/navigation';

//  // --- UI Components ---
//  import { Button } from '@/components/ui/button';
//  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
//  import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
//  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

//  // --- App Specific Imports ---
//  import { useAuth } from '@/app/contexts/AuthContext';
//  import { useKyc } from '../../contexts/KycContext';
//  import kycService from '@/app/services/kyc';
// import Link from 'next/link';

//  // --- Component ---
//  export default function KycStartPage() {
//      const router = useRouter();
//      const { user, loading: authLoading, refetchUser } = useAuth();
//      const {
//          resetKycProgress,
//          goToStep,
//          updateCurrentUiStepId,
//          isInitialized: kycInitialized,
//          backendStatus,
//          isLoadingStatus: kycLoadingStatus,
//          rejectionReason, // Keep for potential future use, though handled by redirect now
//          fetchKycStatus // Explicitly fetch if needed, although context should handle it
//      } = useKyc();

//      const [isSkipping, setIsSkipping] = useState(false);
//      const [actionError, setActionError] = useState<string | null>(null);

//      // Effect 1: Set the current UI step in context
//      useEffect(() => {
//          if (kycInitialized) {
//              updateCurrentUiStepId('start');
//          }
//      }, [kycInitialized, updateCurrentUiStepId]);

//      // Effect 2: Handle redirection based on context status
//      useEffect(() => {
//          // Wait until all contexts are ready and status isn't actively loading
//          if (authLoading || !kycInitialized || kycLoadingStatus) {
//              // console.log("KYC Start Effect: Waiting for loading states.");
//              return;
//          }

//          // If no user, redirect to login
//          if (!user) {
//              // console.log("KYC Start Effect: No user, redirecting to login.");
//              router.replace('/auth/login?redirect=/kyc/start');
//              return;
//          }

//          // console.log("KYC Start Effect: Ready. Backend Status:", backendStatus);

//          // Handle redirections for states that should NOT be on this page
//          switch (backendStatus) {
//              case 'verified':
//                  // console.log("KYC Start Effect: Redirecting verified to dashboard.");
//                  router.replace('/dashboard');
//                  break;
//              case 'pending':
//                  // console.log("KYC Start Effect: Redirecting pending to /kyc/pending.");
//                  router.replace('/kyc/pending');
//                  break;
//              case 'rejected':
//                  // console.log("KYC Start Effect: Redirecting rejected to /kyc/rejected.");
//                  router.replace('/kyc/rejected');
//                  break;
//              // --- Cases where we explicitly STAY on this page ---
//              case 'skipped':
//              case 'not_started':
//                  // console.log(`KYC Start Effect: Status is ${backendStatus}. Staying on page.`);
//                  // No redirection needed, the component's render logic will adapt
//                  break;
//              // --- Cases handled elsewhere or representing loading/error states ---
//              case 'loading': // Should be caught by the initial guard, but handle defensively
//              case 'error':   // The KycProvider or this component's render handles the UI
//                  // console.log(`KYC Start Effect: Status is ${backendStatus}. No redirect.`);
//                  break;
//              default:
//                  // This case should ideally not be reached if KycContext is robust.
//                  // Avoid aggressive redirection. Log a warning.
//                  console.warn(`KYC Start Effect: Encountered unexpected backend status "${backendStatus}". Staying on page as failsafe.`);
//                  // **REMOVED**: router.replace('/dashboard'); // Avoid default redirect
//          }
//      // Rerun whenever status or loading states change
//      }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router]);

//      // --- Action Handlers ---

//      const handleStartVerification = () => {
//          setActionError(null);
//          console.log("KYC Start: Initiating verification flow...");
//          resetKycProgress(false);
//          goToStep('personal');
//      };

//      const handleSkip = async () => {
//          if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

//          setIsSkipping(true);
//          setActionError(null);
//          try {
//              console.log("KYC Start: Attempting to skip KYC via service...");
//              await kycService.skipKyc();
//              // Refetch user data, which will trigger KycContext update
//              await refetchUser();
//               console.log("KYC Start: Skip successful via API. Waiting for context update and useEffect to handle state.");
//               // No explicit redirect here - let the useEffect handle it based on the NEW 'skipped' status
//          } catch (err: any) {
//              console.error("KYC Start: Error skipping KYC:", err);
//              setActionError(err.message || "Could not skip verification. Please try again later or start the verification process.");
//          } finally {
//              // Only set skipping false if there was an error, otherwise let the page re-render handle the button state
//               if (actionError) {
//                   setIsSkipping(false);
//               }
//               // If successful, the component will re-render with backendStatus='skipped',
//               // the skip button won't be rendered anymore, so no need to set isSkipping=false
//          }
//      };

//      // --- Render Logic ---

//      // Show loader while essential contexts are loading
//      if (authLoading || !kycInitialized || (kycLoadingStatus && !backendStatus)) { // Show loader if KYC status is loading AND we don't have a previous status to display
//          return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
//              </div>
//          );
//      }

//       // If KycContext encountered an error, let its provider handle the display (or show generic error)
//       if (backendStatus === 'error') {
//           // Optionally, render a specific error message here if the provider doesn't
//           return (
//               <Alert variant="destructive" className="max-w-lg mx-auto">
//                   <AlertTriangle className="h-4 w-4"/>
//                   <AlertTitle>Error</AlertTitle>
//                   <AlertDescription>
//                       Could not load verification status. Please try again later or contact support.
//                   </AlertDescription>
//               </Alert>
//           );
//       }

//       // Prevent flicker during pending redirects for states that shouldn't be on this page
//       // Only show loader if we are certain a redirect is pending based on status
//       if (!user || ['verified', 'pending', 'rejected'].includes(backendStatus as string)) {
//            return (
//                <div className="flex justify-center items-center min-h-[400px]">
//                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                    <span className="ml-3 text-muted-foreground">Checking Status...</span>
//               </div>
//           );
//       }

//      // --- Content specific to user status (not_started, skipped) ---
//       let title = 'Verify Your Identity';
//       let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
//       let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//       let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//       let statusMessage = null;

//       if (backendStatus === 'skipped') {
//           title = 'Complete Your Verification';
//           description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
//           icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//           statusMessage = (
//               <Alert className="text-left"> {/* Removed non-standard variant="info" */}
//                   <Info className="h-4 w-4"/>
//                   <AlertTitle>Verification Recommended</AlertTitle>
//                   <AlertDescription>
//                       Complete verification now to access all account features and enhance security.
//                   </AlertDescription>
//               </Alert>
//           );
//       }

//      return (
//           <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn">
//               <CardHeader className="text-center items-center p-6 md:p-8">
//                   {icon}
//                  <CardTitle className="text-2xl md:text-3xl font-semibold">
//                      {title}
//                  </CardTitle>
//                  <CardDescription className="mt-2 text-base">
//                      {description}
//                  </CardDescription>
//              </CardHeader>
//               <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//                  {statusMessage}

//                   <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//                        <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
//                   </div>

//                   {actionError && (
//                       <Alert variant="destructive">
//                           <AlertTriangle className="h-4 w-4"/>
//                           <AlertTitle>Action Failed</AlertTitle>
//                           <AlertDescription>{actionError}</AlertDescription>
//                       </Alert>
//                   )}

//                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      {/* Start button always shown if on this page */}
//                      <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="cursor-pointer flex-1">
//                          Start Verification
//                      </Button>

//                       {/* Show Skip button ONLY if status is 'not_started' */}
//                       {(backendStatus === 'not_started') && (
//                         <Link href='/dashboard' className='block'>
//                           <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1 cursor-pointer ">
//                               {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                              Skip for Now
//                          </Button>
//                         </Link>
//                      )}
//                  </div>
//                   <p className="text-xs text-muted-foreground pt-4">
//                       Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                   </p>
//              </CardContent>
//          </Card>
//      );
//  }

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link'; // Import Link

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext'; // Get user and loading state
// import { useKyc } from '../../contexts/KycContext'; // Get KYC state
// import kycService from '@/app/services/kyc';

// // --- Component ---
// export default function KycStartPage() {
//     const router = useRouter();
//     // Get auth state
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     // Get KYC state
//     const {
//         resetKycProgress,
//         goToStep,
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized,
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus,
//         rejectionReason,
//         fetchKycStatus,
//         startKycFlow
//     } = useKyc();

//     const [isSkipping, setIsSkipping] = useState(false);
//     const [actionError, setActionError] = useState<string | null>(null);

//     // Effect 1: Update UI Step ID (only if KYC context is ready)
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('start');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Handle Redirection Logic (Auth Check FIRST, then KYC status)
//     useEffect(() => {
//         // --- Wait for contexts to be ready ---
//         // Don't do anything until auth isn't loading AND KYC context is initialized.
//         if (authLoading || !kycInitialized) {
//            // console.log("KYC Start Effect: Waiting for loading states (Auth/KYC Init).");
//             return;
//         }

//         // --- AUTH CHECK ---
//         // If contexts are ready BUT there's no user, redirect to login.
//         if (!user) {
//             console.log("KYC Start Effect: No user found after loading. Redirecting to login.");
//             // Construct the redirect URL to come back here after login
//             const redirectUrl = `/auth/login?redirect=${encodeURIComponent('/kyc/start')}`;
//             router.replace(redirectUrl); // Use replace to not add this page to history before login
//             return; // Stop further checks in this effect run
//         }

//         // --- KYC STATUS CHECK (Only if user is logged in) ---
//         // Don't redirect while KYC status itself is loading, wait for a definitive status.
//         if (kycLoadingStatus) {
//             // console.log("KYC Start Effect: Waiting for KYC status to load.");
//             return;
//         }

//         // console.log("KYC Start Effect: User logged in. Checking backendStatus:", backendStatus);

//         // Handle redirections for states that should NOT be on this page
//         switch (backendStatus) {
//             case 'verified':
//                 // console.log("KYC Start Effect: Redirecting verified user to dashboard.");
//                 router.replace('/dashboard');
//                 break;
//             case 'pending':
//                 // console.log("KYC Start Effect: Redirecting pending user to /kyc/pending.");
//                 router.replace('/kyc/pending');
//                 break;
//             case 'rejected':
//                 // console.log("KYC Start Effect: Redirecting rejected user to /kyc/rejected.");
//                 router.replace('/kyc/rejected');
//                 break;
//             // --- Cases where we explicitly STAY on this page ---
//             case 'skipped':
//             case 'not_started':
//                 // console.log(`KYC Start Effect: Status is ${backendStatus}. Staying on page.`);
//                 // No redirection needed, the component's render logic will adapt
//                 break;
//             // --- Error/Loading states handled by render logic or KycProvider ---
//             case 'loading': // Should be caught by kycLoadingStatus guard, but handle defensively
//             case 'error':
//                 // console.log(`KYC Start Effect: Status is ${backendStatus}. No redirect needed here.`);
//                 break;
//             default:
//                 console.warn(`KYC Start Effect: Encountered unexpected backend status "${backendStatus}". Staying on page as failsafe.`);
//         }
//     // Rerun whenever key states change
//     }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router]);

//     // --- Action Handlers ---

//     const handleStartVerification = () => {
//         // User MUST be logged in to reach here due to the useEffect check
//         setActionError(null);
//         console.log("KYC Start: Initiating verification flow...");
//         resetKycProgress(false); // Reset progress but don't navigate yet
//         goToStep('personal');     // Explicitly navigate to the first form step
//     };

//     const handleSkip = async () => {
//         // User MUST be logged in to reach here
//         if (backendStatus !== 'not_started') {
//             console.warn("Skip button clicked but status is not 'not_started'. This shouldn't happen.");
//             setActionError("Cannot skip verification at this stage.");
//             return;
//         }
//         if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

//         setIsSkipping(true);
//         setActionError(null);
//         try {
//             console.log("KYC Start: Attempting to skip KYC via service...");
//             await kycService.skipKyc();
//             // Refetch user data (which might update the context implicitly via AuthProvider)
//             // AND explicitly refetch KYC status to ensure the KycContext gets the update quickly.
//             await refetchUser();
//             await fetchKycStatus(true); // Force fetch KYC status
//             console.log("KYC Start: Skip successful via API. Waiting for context update and useEffect to handle state change.");
//             // The useEffect above will now detect the change to 'skipped' (or maybe 'verified' if backend logic allows skipping to verified)
//             // and redirect appropriately (likely staying here if skipped, or to dashboard if verified).
//             // No explicit router.push needed here anymore.
//         } catch (err: any) {
//             console.error("KYC Start: Error skipping KYC:", err);
//             setActionError(err.message || "Could not skip verification. Please try again later.");
//             setIsSkipping(false); // Reset loading state only on error
//         }
//         // On success, the useEffect will handle the redirection based on the new status,
//         // so we don't reset isSkipping here. The component might unmount or re-render.
//     };

//     // --- Render Logic ---

//     // 1. Initial Loading (Auth or KYC context not ready)
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Session...</span>
//             </div>
//         );
//     }

//     // 2. Redirecting to Login (Auth ready, but no user)
//     // This state might be brief as the useEffect handles the actual redirect.
//     if (!user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Redirecting to Login...</span>
//             </div>
//         );
//     }

//     // 3. Loading KYC Status (User is logged in, but KYC status is loading)
//     if (kycLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
//             </div>
//         );
//     }

//     // 4. KYC Error State
//     if (backendStatus === 'error') {
//         return (
//             <Alert variant="destructive" className="max-w-lg mx-auto">
//                 <AlertTriangle className="h-4 w-4"/>
//                 <AlertTitle>Error Loading Status</AlertTitle>
//                 <AlertDescription>
//                     Could not load your verification status. Please <button onClick={() => fetchKycStatus(true)} className="underline">try again</button> or contact support.
//                 </AlertDescription>
//             </Alert>
//         );
//     }

//     // 5. Redirecting based on KYC Status (e.g., verified, pending)
//     // This state might be brief as the useEffect handles the actual redirect.
//     if (['verified', 'pending', 'rejected'].includes(backendStatus as string)) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Checking Status...</span>
//             </div>
//         );
//     }

//     // 6. Render Main Content (Only if user is logged in AND status is 'not_started' or 'skipped')
//     let title = 'Verify Your Identity';
//     let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
//     let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//     let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//     let statusMessage = null;

//     if (backendStatus === 'skipped') {
//         title = 'Complete Your Verification';
//         description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
//         icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//         statusMessage = (
//             <Alert className="text-left">
//                 <Info className="h-4 w-4"/>
//                 <AlertTitle>Verification Recommended</AlertTitle>
//                 <AlertDescription>
//                     Complete verification now to access all account features and enhance security.
//                 </AlertDescription>
//             </Alert>
//         );
//     } else if (backendStatus !== 'not_started') {
//        // Fallback for unexpected status - should be caught earlier, but good defense
//        console.warn("KycStartPage rendering with unexpected status:", backendStatus);
//        return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Updating status...</span>
//             </div>
//        )
//     }

//     // --- Render the Card ---
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn">
//             <CardHeader className="text-center items-center p-6 md:p-8">
//                 {icon}
//                 <CardTitle className="text-2xl md:text-3xl font-semibold">
//                     {title}
//                 </CardTitle>
//                 <CardDescription className="mt-2 text-base">
//                     {description}
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//                 {statusMessage}

//                 <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//                     <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
//                 </div>

//                 {actionError && (
//                     <Alert variant="destructive">
//                         <AlertTriangle className="h-4 w-4"/>
//                         <AlertTitle>Action Failed</AlertTitle>
//                         <AlertDescription>{actionError}</AlertDescription>
//                     </Alert>
//                 )}

//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                     {/* Start button always shown if on this page */}
//                     <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="cursor-pointer flex-1">
//                         Start Verification
//                     </Button>

//                     {/* Show Skip button ONLY if status is 'not_started' */}
//                     {backendStatus === 'not_started' && (
//                         // Using a Button that triggers skip logic, not linking directly
//                         <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1 cursor-pointer">
//                             {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                             Skip for Now
//                         </Button>
//                         // If you absolutely want a link *behavior* after skipping,
//                         // the useEffect redirect logic should handle going to dashboard or elsewhere.
//                         // The button itself just initiates the 'skip' action.
//                     )}
//                 </div>
//                 <p className="text-xs text-muted-foreground pt-4">
//                     Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                 </p>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/start/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation'; // Import usePathname here
// import Link from 'next/link'; // Import Link

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, AlertTriangle, Info, UserCheck, UserX, UserPlus, RotateCcw, LayoutDashboard, ShieldCheck, HelpCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext'; // Get user and loading state
// import { useKyc } from '../../contexts/KycContext'; // Get KYC state and actions
// import kycService from '@/app/services/kyc';

// // --- Component ---
// export default function KycStartPage() {
//     const router = useRouter();
//     const pathname = usePathname(); // <-- Call usePathname to get the current path
//     // Get auth state
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     // Get KYC state and necessary actions
//     const {
//         goToStep,
//         updateCurrentUiStepId,
//         isInitialized: kycInitialized,
//         backendStatus,
//         isLoadingStatus: kycLoadingStatus, // Use this from context
//         rejectionReason,
//         fetchKycStatus,
//         startKycFlow // Use the dedicated action for starting
//         // resetKycProgress is not needed here for starting flow
//     } = useKyc();

//     const [isSkipping, setIsSkipping] = useState(false);
//     const [actionError, setActionError] = useState<string | null>(null);

//     // Effect 1: Update UI Step ID (only if KYC context is ready and on correct page)
//     useEffect(() => {
//         // Ensure we only update if the context is ready and status allows being on start
//         if (kycInitialized && (backendStatus === 'not_started' || backendStatus === 'skipped' || backendStatus === 'loading' || backendStatus === 'unauthenticated' || backendStatus === 'error')) {
//              // Only update if the current path IS the start page
//             if (pathname === '/kyc/start') {
//                 updateCurrentUiStepId('start');
//             }
//         }
//     }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]); // Add backendStatus and pathname dependency

//     // Effect 2: Handle Redirection Logic (Auth Check FIRST, then KYC status)
//     // This relies heavily on the KycProvider's redirection logic, but keeps a local check for robustness.
//     useEffect(() => {
//         // Wait for contexts to be ready
//         if (authLoading || !kycInitialized) {
//            return; // Wait for initialization
//         }

//         // If auth done but no user, redirect (KycProvider/Layout also handle this)
//         if (!user) {
//            // Use the pathname obtained from the hook
//             if (pathname && !pathname.startsWith('/auth/login')) { // Avoid loop if already redirecting
//                console.log("KYC Start Effect: No user detected, ensuring redirect to login.");
//                // Redirect back to the current page (start page) after login
//                const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
//                router.replace(redirectUrl);
//             }
//             return;
//         }

//         // If KYC status is loading, wait for it to resolve before potentially redirecting
//         if (kycLoadingStatus) {
//             return;
//         }

//         // Redirect based on FINALIZED KYC status (verified, pending, rejected)
//         // Let KycProvider primarily handle this, but included here as safety
//         switch (backendStatus) {
//             case 'verified':
//                 console.log("KYC Start Effect: Status verified, replacing route to /dashboard.");
//                 router.replace('/dashboard'); // Or user profile / verified page
//                 break;
//             case 'pending':
//                  console.log("KYC Start Effect: Status pending, replacing route to /kyc/pending.");
//                 router.replace('/kyc/pending');
//                 break;
//             case 'rejected':
//                 console.log("KYC Start Effect: Status rejected, replacing route to /kyc/rejected.");
//                 router.replace('/kyc/rejected');
//                 break;
//             // Stay on this page for 'not_started', 'skipped', 'error', 'loading'
//             // 'unauthenticated' case handled above
//         }
//     // Add pathname to dependency array
//     }, [user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router, pathname]);

//     // --- Action Handlers ---

//     /** Handles the click on the "Start Verification" button */
//     const handleStartVerification = () => {
//         // Should only be clickable if user exists and status is appropriate
//         if (!user || (backendStatus !== 'not_started' && backendStatus !== 'skipped')) {
//            console.warn("Start verification clicked in unexpected state:", backendStatus);
//            setActionError("Cannot start verification at this time.");
//            return;
//         }
//         setActionError(null);
//         console.log("KYC Start: Initiating verification flow...");
//         // 1. Call context action to prepare state (sets status to 'not_started' and UI step to 'personal')
//         startKycFlow();
//         // 2. Navigate to the first form step
//         goToStep('personal');
//     };

//     /** Handles the click on the "Skip for Now" button */
//     const handleSkip = async () => {
//         // Should only be clickable if user exists and status is 'not_started'
//         if (!user || backendStatus !== 'not_started') {
//             console.warn("Skip button clicked in unexpected state:", backendStatus);
//             setActionError("Cannot skip verification at this stage.");
//             return;
//         }
//         if (!confirm("Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?")) return;

//         setIsSkipping(true);
//         setActionError(null);
//         try {
//             // console.log("KYC Start: Attempting to skip KYC via service...");
//             await kycService.skipKyc();
//             // Refetch user data AND KYC status to ensure contexts update
//             await refetchUser();
//             await fetchKycStatus(true); // Force fetch KYC status
//             console.log("KYC Start: Skip successful. Context useEffect will handle state change.");
//             // No explicit redirect here; Effect 2 will react to the new 'skipped' status and keep the user here.
//             // Reset skipping state AFTER status has been fetched and processed by effects
//             setIsSkipping(false);
//         } catch (err: any) {
//             console.error("KYC Start: Error skipping KYC:", err);
//             const message = err?.response?.data?.message || err.message || "Could not skip verification. Please try again later.";
//             setActionError(message);
//             setIsSkipping(false); // Reset loading state on error
//         }
//     };

//     // --- Render Logic ---

//     // 1. Initial Loading State (Waiting for Auth or KYC Context)
//     if (authLoading || !kycInitialized) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Session...</span>
//             </div>
//         );
//     }

//     // 2. Redirecting to Login State (Auth done, but no user)
//     // This is brief as the useEffect or Layout redirects quickly.
//     if (!user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Redirecting to Login...</span>
//             </div>
//         );
//     }

//     // 3. Loading KYC Status State (User logged in, but fetching KYC status)
//     if (kycLoadingStatus && !['not_started', 'skipped'].includes(backendStatus as string)) { // Only show if status isn't already known resumable
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Loading Verification Status...</span>
//             </div>
//         );
//     }

//     // 4. KYC Error State
//     if (backendStatus === 'error') {
//         return (
//             <Alert variant="destructive" className="max-w-lg mx-auto my-8">
//                 <AlertTriangle className="h-4 w-4"/>
//                 <AlertTitle>Error Loading Status</AlertTitle>
//                 <AlertDescription>
//                     Could not load your verification status. Please{' '}
//                     <button
//                        onClick={() => fetchKycStatus(true)} // Allow retry
//                        className="underline font-medium text-destructive hover:text-destructive/80"
//                    >
//                        try again
//                    </button>
//                    {' '}or contact support.
//                 </AlertDescription>
//             </Alert>
//         );
//     }

//     // 5. Redirecting based on inappropriate KYC Status (e.g., verified, pending)
//     // This is brief as the useEffect or Provider redirects quickly.
//     if (['verified', 'pending', 'rejected'].includes(backendStatus as string)) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-3 text-muted-foreground">Checking Status...</span>
//             </div>
//         );
//     }

//     // 6. Render Main Content (Only if user is logged in AND status is 'not_started' or 'skipped')
//     if (backendStatus === 'not_started' || backendStatus === 'skipped') {
//        let title = 'Verify Your Identity';
//        let description = 'To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.';
//        let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//        let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//        let statusMessage = null;

//        if (backendStatus === 'skipped') {
//            title = 'Complete Your Verification';
//            description = 'You previously skipped identity verification. Complete it now to unlock full account features.';
//            icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//            statusMessage = (
//                <Alert className="text-left border-blue-500/50 text-blue-800 dark:text-blue-200 dark:border-blue-500/30 [&>svg]:text-blue-500">
//                    <Info className="h-4 w-4"/>
//                    <AlertTitle className="font-semibold">Verification Recommended</AlertTitle>
//                    <AlertDescription>
//                        Complete verification now to access all account features and enhance security.
//                    </AlertDescription>
//                </Alert>
//            );
//        }

//        // --- Render the Card ---
//        return (
//            <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn my-8">
//                <CardHeader className="text-center items-center p-6 md:p-8">
//                    {icon}
//                    <CardTitle className="text-2xl md:text-3xl font-semibold">
//                        {title}
//                    </CardTitle>
//                    <CardDescription className="mt-2 text-base">
//                        {description}
//                    </CardDescription>
//                </CardHeader>
//                <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//                    {statusMessage}

//                    <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//                        <p className='flex items-center justify-center gap-2'><ShieldCheck className='h-4 w-4 text-green-600' /> {requirements}</p>
//                    </div>

//                    {actionError && (
//                        <Alert variant="destructive">
//                            <AlertTriangle className="h-4 w-4"/>
//                            <AlertTitle>Action Failed</AlertTitle>
//                            <AlertDescription>{actionError}</AlertDescription>
//                        </Alert>
//                    )}

//                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                        {/* Start button always shown if status is not_started or skipped */}
//                        <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="cursor-pointer flex-1">
//                            Start Verification
//                        </Button>

//                        {/* Show Skip button ONLY if status is 'not_started' */}
//                        {backendStatus === 'not_started' && (
//                         <Link href="/dashboard">
//                            <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1 cursor-pointer">
//                                {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                Skip for Now
//                            </Button>
//                         </Link>
//                        )}
//                    </div>
//                    <p className="text-xs text-muted-foreground pt-4">
//                        Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                    </p>
//                </CardContent>
//            </Card>
//        );
//     }

//     // Fallback if none of the above conditions are met (should be rare)
//     console.warn("KycStartPage reached unexpected render state. Status:", backendStatus);
//     return (
//         <div className="flex justify-center items-center min-h-[400px]">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             <span className="ml-3 text-muted-foreground">Loading...</span>
//         </div>
//     );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Loader2,
//   AlertTriangle,
//   Info,
//   UserCheck,
//   UserX,
//   UserPlus,
//   RotateCcw,
//   LayoutDashboard,
//   ShieldCheck,
//   HelpCircle,
// } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // --- App Specific Imports ---
// import { useAuth } from "@/app/contexts/AuthContext";
// import { useKyc } from "../../contexts/KycContext";
// import kycService from "@/app/services/kyc";

// // --- Component ---
// export default function KycStartPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     goToStep,
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//     rejectionReason,
//     fetchKycStatus, // KycContext status fetch
//     startKycFlow,
//     resetKycProgress, // Use reset if retrying from rejected
//   } = useKyc();

//   const [isSkipping, setIsSkipping] = useState(false);
//   const [actionError, setActionError] = useState<string | null>(null);

//   // Effect 1: Update UI Step ID based on path and context readiness
//   useEffect(() => {
//     // Only update if context is ready and the path is correct
//     if (kycInitialized && pathname === "/kyc/start") {
//       // Ensure UI step reflects 'start' if status allows being here
//       if (
//         [
//           "not_started",
//           "skipped",
//           "loading",
//           "unauthenticated",
//           "error",
//         ].includes(backendStatus as string)
//       ) {
//         updateCurrentUiStepId("start");
//       }
//     }
//   }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]); // Add pathname dependency

//   // Effect 2: Handle Redirection (Auth Check FIRST, then KYC status)
//   // Primarily relies on KycProvider's redirection logic, but keeps local check
//   useEffect(() => {
//     // Wait for contexts to be ready
//     if (authLoading || !kycInitialized || kycLoadingStatus) {
//       return; // Wait for initialization and status loading
//     }

//     // If auth done but no user, KycProvider/Layout should redirect
//     if (!user) {
//       // console.log("KYC Start Effect: No user detected, context should handle redirect.");
//       return;
//     }

//     // If user is logged in, but status is final (verified, pending, rejected),
//     // KycProvider/Layout should redirect away from start page.
//     if (["verified", "pending", "rejected"].includes(backendStatus as string)) {
//       // console.log(`KYC Start Effect: Status is ${backendStatus}, context should handle redirect away from start.`);
//       return;
//     }

//     // If status is error, KycProvider should redirect to error page
//     if (backendStatus === "error") {
//       // console.log("KYC Start Effect: Status is error, context should handle redirect to error page.");
//       return;
//     }

//     // If status is not_started or skipped, stay here. UI step updated by Effect 1.

//     // Dependencies reflect conditions needed for redirection logic
//   }, [
//     user,
//     authLoading,
//     kycInitialized,
//     backendStatus,
//     kycLoadingStatus,
//     router,
//     pathname,
//   ]);

//   // --- Action Handlers ---

//   /** Handles the click on the "Start Verification" button */
//   const handleStartVerification = () => {
//     // Check if user exists and status allows starting
//     if (
//       !user ||
//       !["not_started", "skipped", "rejected"].includes(backendStatus as string)
//     ) {
//       console.warn(
//         "Start verification clicked in unexpected state:",
//         backendStatus
//       );
//       setActionError("Cannot start verification at this time.");
//       // Consider fetching status again if state seems inconsistent
//       // fetchKycStatus(true);
//       return;
//     }
//     setActionError(null);
//     console.log("KYC Start: Initiating verification flow...");

//     // If status was rejected, use resetKycProgress to clear old data fully
//     if (backendStatus === "rejected") {
//       console.log(
//         "KYC Start: Resetting progress for rejected status before starting."
//       );
//       // resetKycProgress(false) resets state but doesn't navigate away immediately,
//       // allowing startKycFlow to navigate to 'personal'
//       resetKycProgress(false); // Reset state locally, don't navigate yet
//     }
//     // Use startKycFlow to set state and navigate to the first step
//     startKycFlow(); // This handles state reset and navigation to 'personal'
//   };

//   /** Handles the click on the "Skip for Now" button */
//   const handleSkip = async () => {
//     // Should only be clickable if user exists and status is 'not_started'
//     if (!user || backendStatus !== "not_started") {
//       console.warn("Skip button clicked in unexpected state:", backendStatus);
//       setActionError("Cannot skip verification at this stage.");
//       return;
//     }
//     if (
//       !confirm(
//         "Skipping verification will limit access to certain features. You can complete it later from your profile. Are you sure?"
//       )
//     )
//       return;

//     setIsSkipping(true);
//     setActionError(null);
//     try {
//       console.log("KYC Start: Attempting to skip KYC via service...");
//       await kycService.skipKyc();
//       console.log(
//         "KYC Start: Skip API call successful. Refetching contexts..."
//       );

//       // --- CRITICAL: Refetch BOTH Auth user and KYC status ---
//       await refetchUser(); // Update AuthContext immediately
//       await fetchKycStatus(true); // Force fetch KycContext status (will become 'skipped')
//       // --- End Refetch ---

//       console.log(
//         "KYC Start: Contexts refetched. Status should now be 'skipped'."
//       );
//       // No explicit redirect here; Effect 2 and KycProvider logic will handle staying on 'start' or moving if needed.
//       // Or redirect explicitly to dashboard after skip?
//       // router.push('/dashboard'); // Option: Redirect after successful skip
//     } catch (err: any) {
//       console.error("KYC Start: Error skipping KYC:", err);
//       const message =
//         err?.response?.data?.message ||
//         err.message ||
//         "Could not skip verification. Please try again later.";
//       setActionError(message);
//     } finally {
//       setIsSkipping(false); // Reset loading state
//     }
//   };

//   // --- Render Logic ---

//   // 1. Initial Loading State (Waiting for Auth or KYC Context)
//   if (authLoading || !kycInitialized) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-3 text-muted-foreground">Loading Session...</span>
//       </div>
//     );
//   }

//   // 2. User exists, but KYC status is still loading
//   // Show only if not already in a state where content can be shown ('not_started', 'skipped')
//   if (
//     user &&
//     kycLoadingStatus &&
//     !["not_started", "skipped"].includes(backendStatus as string)
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-3 text-muted-foreground">
//           Loading Verification Status...
//         </span>
//       </div>
//     );
//   }

//   // 3. Redirecting States (Handled by Effects/Provider, show minimal loading)
//   // This covers unauthenticated, or final statuses (verified, pending, rejected) where context should navigate away
//   if (
//     !user ||
//     (user &&
//       ["verified", "pending", "rejected", "error"].includes(
//         backendStatus as string
//       ))
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-3 text-muted-foreground">Checking Status...</span>
//       </div>
//     );
//   }

//   // 4. Render Main Content (Only if user is logged in AND status is 'not_started' or 'skipped')
//   if (
//     user &&
//     (backendStatus === "not_started" || backendStatus === "skipped")
//   ) {
//     let title = "Verify Your Identity";
//     let description =
//       "To comply with regulations and ensure account security, please complete identity verification. It usually takes just a few minutes.";
//     let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//     let requirements =
//       "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//     let statusMessage = null;

//     if (backendStatus === "skipped") {
//       title = "Complete Your Verification";
//       description =
//         "You previously skipped identity verification. Complete it now to unlock full account features.";
//       icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//       statusMessage = (
//         <Alert className="text-left border-blue-500/50 text-blue-800 dark:text-blue-200 dark:border-blue-500/30 [&>svg]:text-blue-500">
//           <Info className="h-4 w-4" />
//           <AlertTitle className="font-semibold">
//             Verification Recommended
//           </AlertTitle>
//           <AlertDescription>
//             Complete verification now to access all account features and enhance
//             security.
//           </AlertDescription>
//         </Alert>
//       );
//     }

//     // --- Render the Card ---
//     return (
//       <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn my-8">
//         <CardHeader className="text-center items-center p-6 md:p-8">
//           {icon}
//           <CardTitle className="text-2xl md:text-3xl font-semibold">
//             {title}
//           </CardTitle>
//           <CardDescription className="mt-2 text-base text-muted-foreground">
//             {description}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//           {statusMessage}

//           <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30">
//             <p className="flex items-center justify-center gap-2">
//               <ShieldCheck className="h-4 w-4 text-green-600" /> {requirements}
//             </p>
//           </div>

//           {actionError && (
//             <Alert variant="destructive">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertTitle>Action Failed</AlertTitle>
//               <AlertDescription>{actionError}</AlertDescription>
//             </Alert>
//           )}

//           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//             {/* Start button always shown if status allows starting */}
//             <Button
//               onClick={handleStartVerification}
//               size="lg"
//               disabled={isSkipping}
//               className="cursor-pointer flex-1"
//             >
//               Start Verification
//             </Button>

//             {/* Show Skip button ONLY if status is 'not_started' */}
//             {backendStatus === "not_started" && (
//               <Link href="/dashboard">
//                 <Button
//                   onClick={handleSkip}
//                   variant="outline"
//                   size="lg"
//                   disabled={isSkipping}
//                   className="flex-1 cursor-pointer"
//                 >
//                   {isSkipping ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </Button>
//               </Link>
//             )}
//           </div>
//           <p className="text-xs text-muted-foreground pt-4">
//             Need help?{" "}
//             <Link href="/support" className="underline hover:text-primary">
//               Contact support
//             </Link>{" "}
//             <HelpCircle className="inline h-3 w-3 ml-0.5" />
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Fallback if none of the above conditions are met (should be rare)
//   console.warn(
//     "KycStartPage reached unexpected render state. Status:",
//     backendStatus
//   );
//   return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       <span className="ml-3 text-muted-foreground">Loading...</span>
//     </div>
//   );
// }

// // frontend/src/app/kyc/start/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Loader2, AlertTriangle, Info, UserCheck, UserPlus, ShieldCheck, HelpCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // --- App Specific Imports ---
// import { useAuth } from "@/app/contexts/AuthContext";
// import { useKyc } from "../../contexts/KycContext";
// import kycService from "@/app/services/kyc"; // Keep service for skip

// // --- Component ---
// export default function KycStartPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     goToStep, // Use for explicit navigation if needed
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus, // Use context's view of status
//     isLoadingStatus: kycLoadingStatus, // Context's internal loading
//     rejectionReason, // Not usually needed here, but available
//     fetchKycStatus, // Context status fetch
//     startKycFlow, // Use this to start/restart the flow
//     resetKycProgress // Needed if retrying from rejected status
//   } = useKyc();

//   const [isSkipping, setIsSkipping] = useState(false);
//   const [actionError, setActionError] = useState<string | null>(null);

//   // Effect 1: Update UI Step ID based on path and context readiness
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/start") {
//       // Only set UI step to 'start' if context status allows being here
//       if ( ["not_started", "skipped", "rejected", "loading", "unauthenticated", "error"].includes(backendStatus as string) ) {
//         updateCurrentUiStepId("start");
//       }
//     }
//   }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]);

//   // Effect 2: Handle Redirection (Now primarily relies on KycProvider's logic)
//   // This effect can be simplified or removed if KycProvider handles all redirects correctly.
//   // Kept for robustness / double-check.
//   useEffect(() => {
//     // Wait for contexts to be ready
//     if (authLoading || !kycInitialized || kycLoadingStatus) return;
//     if (!user) return; // AuthProvider/Layout handles redirect

//     // If status is final (verified, pending, rejected), context should redirect away
//     if (["verified", "pending", "rejected"].includes(backendStatus as string)) return;

//     // If status is error, context should redirect to error page
//     if (backendStatus === "error") return;

//     // Otherwise, stay on the start page.

//   }, [ user, authLoading, kycInitialized, backendStatus, kycLoadingStatus, router, pathname ]);

//   // --- Action Handlers ---

//   /** Handles the click on the "Start/Retry Verification" button */
//   const handleStartVerification = useCallback(async () => { // Make async if needed
//     if (!user || !["not_started", "skipped", "rejected"].includes(backendStatus as string) ) {
//       console.warn("Start verification clicked in unexpected state:", backendStatus);
//       setActionError("Cannot start verification at this time."); return;
//     }
//     setActionError(null);
//     console.log("KYC Start: Initiating verification flow...");

//     // No need to call resetKycProgress here anymore if status is 'rejected'.
//     // startKycFlow will handle resetting state and clearing localStorage.
//     await startKycFlow(); // This handles state reset and navigation to 'personal'

//   }, [user, backendStatus, startKycFlow]); // Include dependencies

//   /** Handles the click on the "Skip for Now" button */
//   const handleSkip = useCallback(async () => { // Make async
//     if (!user || backendStatus !== "not_started") {
//       console.warn("Skip button clicked in unexpected state:", backendStatus);
//       setActionError("Cannot skip verification at this stage."); return;
//     }
//     if (!confirm("Skipping verification limits access to certain features. Continue later?")) return;

//     setIsSkipping(true); setActionError(null);
//     try {
//       console.log("KYC Start: Attempting to skip KYC via service...");
//       await kycService.skipKyc();
//       console.log("KYC Start: Skip API call successful. Refetching contexts...");
//       await refetchUser(); // Update AuthContext (status becomes 'skipped')
//       await fetchKycStatus(true); // Force fetch KycContext status
//       console.log("KYC Start: Contexts refetched. Redirecting to dashboard.");
//       router.push('/dashboard'); // Explicitly redirect after skip
//     } catch (err: any) {
//       console.error("KYC Start: Error skipping KYC:", err);
//       setActionError(err?.response?.data?.message || err.message || "Could not skip verification.");
//     } finally {
//       setIsSkipping(false);
//     }
//   }, [user, backendStatus, refetchUser, fetchKycStatus, router]); // Add dependencies

//   // --- Render Logic ---

//   // 1. Primary Loading State (Auth or KYC Context not ready)
//   if (authLoading || !kycInitialized) {
//     return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//   }

//   // 2. Intermediate Loading (Checking status, user exists but status unknown)
//   // Show only if status is actively loading AND not in a showable state yet
//   if (user && kycLoadingStatus && !["not_started", "skipped", "rejected"].includes(backendStatus as string)) {
//      return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//   }

//   // 3. Waiting for Redirect (User exists, but status is final/error, context should handle)
//   if (user && ["verified", "pending", "rejected", "error"].includes(backendStatus as string) ) {
//     return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//   }

//   // 4. Render Main Content (User logged in AND status allows starting/resuming)
//   if (user && ["not_started", "skipped", "rejected"].includes(backendStatus as string)) {
//     let title = "Verify Your Identity";
//     let description = "Complete identity verification to comply with regulations and ensure account security. It usually takes just a few minutes.";
//     let icon = <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />;
//     let requirements = "You'll need a valid government-issued photo ID (like a Passport or Resident Permit/National ID).";
//     let statusMessage = null;
//     let startButtonText = "Start Verification";

//     if (backendStatus === "skipped") {
//       title = "Complete Your Verification";
//       description = "You previously skipped identity verification. Complete it now to unlock full account features.";
//       icon = <UserCheck className="mx-auto h-12 w-12 text-blue-600 mb-4" />;
//       statusMessage = ( <Alert className="text-left border-blue-500/50 text-blue-800 dark:text-blue-200 dark:border-blue-500/30 [&>svg]:text-blue-500"> <Info className="h-4 w-4" /> <AlertTitle className="font-semibold">Verification Recommended</AlertTitle> <AlertDescription>Complete verification to access all features.</AlertDescription> </Alert> );
//     } else if (backendStatus === "rejected") {
//         title = "Retry Verification";
//         description = "Your previous verification attempt was unsuccessful. Please review the requirements and try again.";
//         icon = <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />;
//         startButtonText = "Retry Verification"; // Change button text
//          // Optionally show rejection reason here too, or rely on rejected page
//          if (rejectionReason) {
//              statusMessage = ( <Alert variant="destructive" className="text-left"> <AlertTriangle className="h-4 w-4" /> <AlertTitle className="font-semibold">Previous Attempt Failed</AlertTitle> <AlertDescription>Reason: {rejectionReason}</AlertDescription> </Alert> );
//          }
//     }

//     return (
//       <Card className="w-full max-w-lg mx-auto shadow-md border border-border/30 animate-fadeIn my-8">
//         <CardHeader className="text-center items-center p-6 md:p-8"> {icon} <CardTitle className="text-2xl md:text-3xl font-semibold">{title}</CardTitle> <CardDescription className="mt-2 text-base text-muted-foreground">{description}</CardDescription> </CardHeader>
//         <CardContent className="text-center space-y-6 px-6 md:px-8 pb-8">
//           {statusMessage}
//           <div className="text-sm text-muted-foreground p-3 border rounded-md bg-secondary/30"> <p className="flex items-center justify-center gap-2"><ShieldCheck className="h-4 w-4 text-green-600" /> {requirements}</p> </div>
//           {actionError && ( <Alert variant="destructive"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Action Failed</AlertTitle> <AlertDescription>{actionError}</AlertDescription> </Alert> )}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//             <Button onClick={handleStartVerification} size="lg" disabled={isSkipping} className="cursor-pointer flex-1"> {startButtonText} </Button>
//             {/* Show Skip button ONLY if status is 'not_started' */}
//             {backendStatus === "not_started" && (
//                 <Button onClick={handleSkip} variant="outline" size="lg" disabled={isSkipping} className="flex-1 cursor-pointer"> {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Skip for Now </Button>
//             )}
//              {/* Redirect to dashboard directly if skipped or rejected */}
//              {(backendStatus === "skipped" || backendStatus === "rejected") && (
//                  <Link href="/dashboard" className='flex-1'>
//                      <Button variant="outline" size="lg" className="w-full cursor-pointer"> Go to Dashboard </Button>
//                  </Link>
//              )}
//           </div>
//           <p className="text-xs text-muted-foreground pt-4"> Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5" /> </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Fallback if none of the above conditions are met
//   console.warn("KycStartPage reached unexpected render state. Status:", backendStatus);
//   return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
// }

// // frontend/src/app/kyc/start/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// // --- UI Components ---
// // Removed Button from shadcn/ui as we'll use custom styled <button>
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator"; // Added Separator
// import {
//   Loader2,
//   AlertTriangle,
//   Info,
//   UserCheck,
//   UserPlus,
//   ShieldCheck,
//   HelpCircle,
//   FileText, // For requirements
//   ArrowRight, // For start button
//   RotateCcw, // For retry button
//   LogIn, // Or DoorOpen for dashboard access
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Ensure cn is imported

// // --- App Specific Imports ---
// import { useAuth } from "@/app/contexts/AuthContext";
// import { useKyc } from "../../contexts/KycContext";
// import kycService from "@/app/services/kyc";

// // --- Component ---
// export default function KycStartPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     goToStep,
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//     rejectionReason,
//     fetchKycStatus,
//     startKycFlow,
//     resetKycProgress,
//   } = useKyc();

//   const [isSkipping, setIsSkipping] = useState(false);
//   const [actionError, setActionError] = useState<string | null>(null);

//   // --- Effects (Keep existing logic) ---
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/start") {
//       if (
//         [
//           "not_started",
//           "skipped",
//           "rejected",
//           "loading",
//           "unauthenticated",
//           "error",
//         ].includes(backendStatus as string)
//       ) {
//         updateCurrentUiStepId("start");
//       }
//     }
//   }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]);

//   useEffect(() => {
//     if (authLoading || !kycInitialized || kycLoadingStatus) return;
//     if (!user) return;
//     if (["verified", "pending"].includes(backendStatus as string)) return; // KycProvider handles verified/pending redirect
//     // KycProvider should handle redirect for 'rejected' if intended to go straight there
//     // If we want the user to *land* on 'start' when rejected, this check is fine.
//     if (backendStatus === "error") return; // KycProvider handles error redirect
//   }, [
//     user,
//     authLoading,
//     kycInitialized,
//     backendStatus,
//     kycLoadingStatus,
//     router,
//     pathname,
//   ]);


//   // --- Action Handlers (Keep existing logic) ---
//   const handleStartVerification = useCallback(async () => {
//     if (
//       !user ||
//       !["not_started", "skipped", "rejected"].includes(backendStatus as string)
//     ) {
//       console.warn("Start verification clicked in unexpected state:", backendStatus);
//       setActionError("Cannot start verification at this time.");
//       return;
//     }
//     setActionError(null);
//     console.log("KYC Start: Initiating verification flow...");
//     await startKycFlow();
//   }, [user, backendStatus, startKycFlow]);

//   const handleSkip = useCallback(async () => {
//     if (!user || backendStatus !== "not_started") {
//       console.warn("Skip button clicked in unexpected state:", backendStatus);
//       setActionError("Cannot skip verification at this stage.");
//       return;
//     }
//     if (!confirm("Skipping verification may limit access to certain features. You can complete it later. Continue?")) return;

//     setIsSkipping(true);
//     setActionError(null);
//     try {
//       console.log("KYC Start: Attempting to skip KYC via service...");
//       await kycService.skipKyc();
//       console.log("KYC Start: Skip API call successful. Refetching contexts...");
//       await refetchUser();
//       await fetchKycStatus(true);
//       console.log("KYC Start: Contexts refetched. Redirecting to dashboard.");
//       router.push("/dashboard");
//     } catch (err: any) {
//       console.error("KYC Start: Error skipping KYC:", err);
//       setActionError(err?.response?.data?.message || err.message || "Could not skip verification.");
//     } finally {
//       setIsSkipping(false);
//     }
//   }, [user, backendStatus, refetchUser, fetchKycStatus, router]);


//   // --- Render Logic ---

//   // 1. Primary Loading
//   if (authLoading || !kycInitialized) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // 2. Intermediate Loading
//   if ( user && kycLoadingStatus && !["not_started", "skipped", "rejected"].includes(backendStatus as string)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // 3. Waiting for Redirect (Handled by Context now)
//   if (user && ["verified", "pending", "error"].includes(backendStatus as string)) {
//      // Show spinner while context redirects
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//    // 4. Explicitly Not Logged In (after initial checks)
//   if (!user) {
//      return (
//         <div className="flex justify-center items-center min-h-[400px]">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         </div>
//     );
//   }


//   // 5. Render Main Content (User logged in AND status allows starting/resuming)
//   if ( user && ["not_started", "skipped", "rejected"].includes(backendStatus as string) ) {
//     // --- Dynamic Content Setup ---
//     let title = "Verify Your Identity";
//     let description = "Complete identity verification to comply with regulations, enhance security, and unlock all account features.";
//     let headerIcon = <UserPlus className="h-8 w-8" />;
//     let iconBgColor = "bg-primary/20 text-primaryhover border-primary/30"; // Default blue theme
//     let startButtonText = "Start Verification";
//     let startButtonIcon = <ArrowRight className="ml-2 size-4.5" />;
//     let primaryButtonClasses = "bg-primary text-neutral-900 hover:bg-primaryhover"; // Default blue button

//     if (backendStatus === "skipped") {
//       title = "Complete Your Verification";
//       description = "You previously skipped identity verification. Complete it now to access full account features.";
//       headerIcon = <UserCheck className="h-8 w-8" />;
//       iconBgColor = "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700"; // Blue theme
//       startButtonText = "Complete Verification";
//     } else if (backendStatus === "rejected") {
//       title = "Retry Verification";
//       description = "Your previous verification attempt requires attention. Please review the feedback and submit again.";
//       headerIcon = <AlertTriangle className="h-8 w-8" />;
//       iconBgColor = "bg-red-100 text-destructive border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700"; // Red theme
//       startButtonText = "Retry Verification";
//       startButtonIcon = <RotateCcw className="mr-2 size-4.5" />;
//       primaryButtonClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90"; // Red button
//     }

//     // --- JSX ---
//     return (
//       // Adopt layout and max-width from other pages
//       <div className="mx-auto max-w-2xl py-8 px-4">
//          {/* Adopt Card styling from other pages */}
//         <Card className="w-full border-border/50 shadow animate-fadeIn overflow-hidden">
//           {/* Adopt Header structure and styling */}
//           <CardHeader className="items-center text-center p-4 md:p-8 bg-accent">
//              {/* Icon Container */}
//             <div className="mb-4 w-full inline-flex justify-center">
//               <div className={cn("h-16 w-16 flex items-center justify-center rounded-full border shadow-inner", iconBgColor)}>
//                 {headerIcon}
//               </div>
//             </div>
//             {/* Title - Adopt font styling */}
//             <CardTitle className="text-2xl font-semibold tracking-tight text-mainheading dark:text-white">
//               {title}
//             </CardTitle>
//             {/* Description - Adopt styling */}
//             <CardDescription className="text-base text-gray-500 dark:text-gray-300 mt-1 px-4">
//               {description}
//             </CardDescription>
//              {/* No Badge needed here generally */}
//           </CardHeader>

//           {/* Adopt Content structure */}
//           <CardContent className="p-4 md:p-8 space-y-6">

//             {/* Conditional Alert for Skipped */}
//             {backendStatus === 'skipped' && (
//                  <Alert className="text-left border-blue-500/50 text-blue-800 dark:text-blue-200 dark:border-blue-500/30 [&>svg]:text-blue-500">
//                     <Info className="h-5 w-5" />
//                     <AlertTitle className="font-medium text-neutral-900 dark:text-white">Verification Pending</AlertTitle>
//                     <AlertDescription className="text-gray-500 dark:text-gray-300">
//                        Complete verification now to unlock full account features.
//                     </AlertDescription>
//                  </Alert>
//             )}

//              {/* Conditional Alert for Rejected */}
//             {backendStatus === 'rejected' && (
//                  <Alert variant="destructive" className="text-left">
//                     <AlertTriangle className="h-5 w-5" />
//                     <AlertTitle className="font-semibold">Previous Attempt Failed</AlertTitle>
//                     <AlertDescription>
//                         {rejectionReason || "Please review the requirements carefully and ensure your documents are clear and valid."}
//                     </AlertDescription>
//                  </Alert>
//             )}

//             {/* Requirements Info */}
//             <Alert>
//                 <FileText className="h-5 w-5" />
//                 <AlertTitle className="font-medium text-neutral-900 dark:text-white">What You'll Need</AlertTitle>
//                 <AlertDescription className="text-gray-500 dark:text-gray-300">
//                     Have a valid government-issued photo ID ready (e.g., Passport, National ID, Resident Permit). Ensure it's not expired and the image is clear.
//                 </AlertDescription>
//             </Alert>

//              {/* Security Info */}
//             <Alert>
//                 <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-500" />
//                 <AlertTitle className="font-medium text-neutral-900 dark:text-white">Secure Process</AlertTitle>
//                 <AlertDescription className="text-gray-500 dark:text-gray-300">
//                     Your information is handled securely and used solely for identity verification purposes.
//                 </AlertDescription>
//             </Alert>


//             {/* Action Error Message */}
//             {actionError && (
//                 <Alert variant="destructive">
//                     <AlertTriangle className="h-4 w-4" />
//                     <AlertTitle>Action Failed</AlertTitle>
//                     <AlertDescription>{actionError}</AlertDescription>
//                 </Alert>
//             )}

//           </CardContent>

//            {/* Adopt Footer structure */}
//           <CardFooter className="flex flex-col gap-3 p-4 md:p-8 bg-bg-accent border-t">

//             <div className="flex flex-col sm:flex-row gap-3 w-full">

            
//             {/* Skip Button - Secondary Action (Only for not_started) */}
//             {backendStatus === "not_started" && (
//                 <button
//                     onClick={handleSkip}
//                     disabled={isSkipping}
//                     // Use secondary button style
//                     className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 >
//                     {isSkipping ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
//                     Skip for Now
//                 </button>
//             )}

//              {/* Go to Dashboard Button (Only for skipped/rejected) */}
//             {(backendStatus === "skipped" || backendStatus === "rejected") && (
//                  <button
//                     onClick={() => router.push('/dashboard')}
//                     // Use secondary button style
//                     className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 >
//                     <LogIn className="mr-2 h-4 w-4" /> {/* Or LayoutDashboard */}
//                     Go to Dashboard
//                 </button>
//             )}

//              {/* Start/Retry Button - Primary Action */}
//              <button
//                 onClick={handleStartVerification}
//                 disabled={isSkipping} // Disable if skipping is in progress
//                 // Apply base button styles + dynamic primary color
//                 className={cn(
//                     "inline-flex items-center justify-center font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-150 ease-linear focus:outline-none",
//                     primaryButtonClasses // Applies blue or red background
//                 )}
//             >
//                  {startButtonText} {startButtonIcon} 
//             </button>

//             </div>

//              {/* Support Link - Common Footer Element */}
//            <div className="w-full text-center pt-4 sm:pt-2">
//                <p className="text-sm text-neutral-900 dark:text-white">
//                    Need help?{' '}
//                    <Link href="/support" className="underline hover:text-primary">
//                        Contact support
//                    </Link>{' '}
//                    <HelpCircle className="inline h-3 w-3 ml-0.5" />
//                </p>
//            </div>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   // Fallback if none of the above conditions are met (should not happen ideally)
//   console.warn("KycStartPage reached unexpected render state. Status:", backendStatus, "User:", !!user);
//   return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//     </div>
//   );
// }



// // last code
// // frontend/src/app/kyc/start/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// // --- UI Components ---
// // Removed Button from shadcn/ui as we'll use custom styled <button>
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator"; // Added Separator
// import {
//   Loader2,
//   AlertTriangle,
//   Info,
//   UserCheck,
//   UserPlus,
//   ShieldCheck,
//   HelpCircle,
//   FileText, // For requirements
//   ArrowRight, // For start button
//   RotateCcw, // For retry button
//   LogIn, // Or DoorOpen for dashboard access
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // Ensure cn is imported

// // --- App Specific Imports ---
// import { useAuth } from "@/app/contexts/AuthContext";
// import { useKyc } from "../../contexts/KycContext";
// import kycService from "@/app/services/kyc";

// // --- Component ---
// export default function KycStartPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     goToStep,
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//     rejectionReason,
//     fetchKycStatus,
//     startKycFlow,
//     resetKycProgress,
//   } = useKyc();

//   const [isSkipping, setIsSkipping] = useState(false);
//   const [actionError, setActionError] = useState<string | null>(null);

//   // --- Effects (Keep existing logic) ---
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/start") {
//       if (
//         [
//           "not_started",
//           "skipped",
//           "rejected",
//           "loading",
//           "unauthenticated",
//           "error",
//         ].includes(backendStatus as string)
//       ) {
//         updateCurrentUiStepId("start");
//       }
//     }
//   }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]);

//   useEffect(() => {
//     if (authLoading || !kycInitialized || kycLoadingStatus) return;
//     if (!user) return;
//     if (["verified", "pending"].includes(backendStatus as string)) return; // KycProvider handles verified/pending redirect
//     // KycProvider should handle redirect for 'rejected' if intended to go straight there
//     // If we want the user to *land* on 'start' when rejected, this check is fine.
//     if (backendStatus === "error") return; // KycProvider handles error redirect
//   }, [
//     user,
//     authLoading,
//     kycInitialized,
//     backendStatus,
//     kycLoadingStatus,
//     router,
//     pathname,
//   ]);


//   // --- Action Handlers (Keep existing logic) ---
//   const handleStartVerification = useCallback(async () => {
//     if (
//       !user ||
//       !["not_started", "skipped", "rejected"].includes(backendStatus as string)
//     ) {
//       console.warn("Start verification clicked in unexpected state:", backendStatus);
//       setActionError("Cannot start verification at this time.");
//       return;
//     }
//     setActionError(null);
//     console.log("KYC Start: Initiating verification flow...");
//     await startKycFlow();
//   }, [user, backendStatus, startKycFlow]);

//   const handleSkip = useCallback(async () => {
//     if (!user || backendStatus !== "not_started") {
//       console.warn("Skip button clicked in unexpected state:", backendStatus);
//       setActionError("Cannot skip verification at this stage.");
//       return;
//     }
//     if (!confirm("Skipping verification may limit access to certain features. You can complete it later. Continue?")) return;

//     setIsSkipping(true);
//     setActionError(null);
//     try {
//       console.log("KYC Start: Attempting to skip KYC via service...");
//       await kycService.skipKyc();
//       console.log("KYC Start: Skip API call successful. Refetching contexts...");
//       await refetchUser();
//       await fetchKycStatus(true);
//       console.log("KYC Start: Contexts refetched. Redirecting to dashboard.");
//       router.push("/dashboard");
//     } catch (err: any) {
//       console.error("KYC Start: Error skipping KYC:", err);
//       setActionError(err?.response?.data?.message || err.message || "Could not skip verification.");
//     } finally {
//       setIsSkipping(false);
//     }
//   }, [user, backendStatus, refetchUser, fetchKycStatus, router]);


//   // --- Render Logic ---

//   // 1. Primary Loading
//   if (authLoading || !kycInitialized) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // 2. Intermediate Loading
//   if ( user && kycLoadingStatus && !["not_started", "skipped", "rejected"].includes(backendStatus as string)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // 3. Waiting for Redirect (Handled by Context now)
//   if (user && ["verified", "pending", "error"].includes(backendStatus as string)) {
//      // Show spinner while context redirects
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//    // 4. Explicitly Not Logged In (after initial checks)
//   if (!user) {
//      return (
//         <div className="flex justify-center items-center min-h-[400px]">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         </div>
//     );
//   }


//   // 5. Render Main Content (User logged in AND status allows starting/resuming)
//   if ( user && ["not_started", "skipped", "rejected"].includes(backendStatus as string) ) {
//     // --- Dynamic Content Setup ---
//     let title = "Verify Your Identity";
//     let description = "Complete identity verification to comply with regulations, enhance security, and unlock all account features.";
//     let headerIcon = <UserPlus className="h-8 w-8" />;
//     let iconBgColor = "bg-primary/20 text-primary border-primary/30"; // Default blue theme
//     let startButtonText = "Start Verification";
//     let startButtonIcon = <ArrowRight className="ml-2 size-4.5" />;
//     let primaryButtonClasses = "bg-primary text-neutral-900 hover:bg-primaryhover"; // Default blue button

//     if (backendStatus === "skipped") {
//       title = "Complete Your Verification";
//       description = "You previously skipped identity verification. Complete it now to access full account features.";
//       headerIcon = <UserCheck className="h-8 w-8" />;
//       iconBgColor = "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700"; // Blue theme
//       startButtonText = "Complete Verification";
//     } else if (backendStatus === "rejected") {
//       title = "Retry Verification";
//       description = "Your previous verification attempt requires attention. Please review the feedback and submit again.";
//       headerIcon = <AlertTriangle className="h-8 w-8" />;
//       iconBgColor = "bg-red-100 text-destructive border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700"; // Red theme
//       startButtonText = "Retry Verification";
//       startButtonIcon = <RotateCcw className="ml-2 size-4.5" />;
//       primaryButtonClasses = "bg-red-600 hover:bg-red-700 text-white"; // Red button
//     }

//     // --- JSX ---
//     return (
//       // Adopt layout and max-width from other pages
//       <div className="mx-auto max-w-2xl">
//         {/* Adopt Card styling from other pages */}
//         <Card className="bg-white dark:bg-background w-full border shadow-none animate-fadeIn overflow-hidden">
//           {/* Adopt Header structure and styling */}
//           <CardHeader className="items-center text-center p-4 md:p-8 bg-lightgray dark:bg-primarybox">
//             {/* Icon Container */}
//             <div className="mb-4 w-full inline-flex justify-center">
//               <div
//                 className={cn(
//                   "h-16 w-16 flex items-center justify-center rounded-full border shadow-inner",
//                   iconBgColor
//                 )}
//               >
//                 {headerIcon}
//               </div>
//             </div>
//             {/* Title - Adopt font styling */}
//             <CardTitle className="text-2xl font-semibold tracking-tight text-mainheading dark:text-white">
//               {title}
//             </CardTitle>
//             {/* Description - Adopt styling */}
//             <CardDescription className="text-base text-gray-500 dark:text-gray-300 mt-1">
//               {description}
//             </CardDescription>
//             {/* No Badge needed here generally */}
//           </CardHeader>

//           {/* Adopt Content structure */}
//           <CardContent className="p-4 md:p-8 space-y-6">
//             {/* Conditional Alert for Skipped */}
//             {backendStatus === "skipped" && (
//               <Alert className="bg-blue-50 dark:bg-blue-900/25 border-blue-500 rounded-lg p-4 gap-3">
//                 <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-blue-600/20">

//                   <Info className="text-blue-600 dark:text-blue-500 size-5 sm:size-6 flex-shrink-0" />
//                 </div>
//                 <div>
//                   <AlertTitle className="font-medium text-blue-800 dark:text-blue-200 tracking-normal text-base">
//                     Verification Pending
//                   </AlertTitle>
//                   <AlertDescription className="text-blue-700 dark:text-blue-300/90">
//                     Complete verification now to unlock full account features.
//                   </AlertDescription>
//                 </div>
//               </Alert>
//             )}

//             {/* Conditional Alert for Rejected */}
//             {backendStatus === 'rejected' && (
//               <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3">
//                 <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">

//                 <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                 </div>
//                 <div>
//                   <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
//                     Previous Attempt Failed
//                   </AlertTitle>
//                   <AlertDescription className="text-red-700 dark:text-red-300/90">
//                     {rejectionReason ||
//                       "Please review the requirements carefully and ensure your documents are clear and valid."}
//                   </AlertDescription>
//                 </div>
//               </Alert>
//             )}

//             {/* Requirements Info */}
//             <Alert className="p-4 rounded-lg">
//               <FileText className="h-5 w-5 flex-shrink-0 mt-1 text-neutral-900 dark:text-white" />
//               <div>
//                 <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
//                   What You'll Need
//                 </AlertTitle>
//                 <AlertDescription className="text-gray-500 dark:text-gray-300">
//                   Have a valid government-issued photo ID ready (e.g., Passport,
//                   National ID, Resident Permit). Ensure it's not expired and the
//                   image is clear.
//                 </AlertDescription>
//               </div>
//             </Alert>

//             {/* Security Info */}
//             <Alert className="p-4 rounded-lg">
//               <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-1 text-green-600 dark:text-green-500" />
//               <div>
//                 <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
//                   Secure Process
//                 </AlertTitle>
//                 <AlertDescription className="text-gray-500 dark:text-gray-300">
//                   Your information is handled securely and used solely for
//                   identity verification purposes.
//                 </AlertDescription>
//               </div>
//             </Alert>

//             {/* Action Error Message */}
//             {actionError && (
//               <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3">
//                 <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//                   <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//                 </div>
//                 <div>
//                   <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
//                     Action Failed
//                   </AlertTitle>
//                   <AlertDescription className="text-red-700 dark:text-red-300/90">
//                     {actionError}
//                   </AlertDescription>
//                 </div>
//               </Alert>
//             )}
//           </CardContent>

//           {/* Adopt Footer structure */}
//           <CardFooter className="flex flex-col gap-3 p-4 md:p-8 border-t">
//             <div className="flex flex-col sm:flex-row gap-3 w-full">
//               {/* Skip Button - Secondary Action (Only for not_started) */}
//               {backendStatus === "not_started" && (
//                 <button
//                   onClick={handleSkip}
//                   disabled={isSkipping}
//                   // Use secondary button style
//                   className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 >
//                   {isSkipping ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </button>
//               )}

//               {/* Go to Dashboard Button (Only for skipped/rejected) */}
//               {(backendStatus === "skipped" ||
//                 backendStatus === "rejected") && (
//                 <button
//                   onClick={() => router.push("/dashboard")}
//                   // Use secondary button style
//                   className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 >
//                   <LogIn className="mr-2 h-4 w-4" /> {/* Or LayoutDashboard */}
//                   Go to Dashboard
//                 </button>
//               )}

//               {/* Start/Retry Button - Primary Action */}
//               <button
//                 onClick={handleStartVerification}
//                 disabled={isSkipping} // Disable if skipping is in progress
//                 // Apply base button styles + dynamic primary color
//                 className={cn(
//                   "inline-flex items-center justify-center font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none",
//                   primaryButtonClasses // Applies blue or red background
//                 )}
//               >
//                 {startButtonText} {startButtonIcon}
//               </button>
//             </div>

//             {/* Support Link - Common Footer Element */}
//             <div className="w-full text-center pt-4 sm:pt-2">
//               <p className="text-sm text-neutral-900 dark:text-white">
//                 Need help?{" "}
//                 <Link href="/support" className="underline hover:text-primary">
//                   Contact support
//                 </Link>{" "}
//                 <HelpCircle className="inline h-4 w-4 ml-0.5" />
//               </p>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   // Fallback if none of the above conditions are met (should not happen ideally)
//   console.warn("KycStartPage reached unexpected render state. Status:", backendStatus, "User:", !!user);
//   return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <Loader2 className="h-8 w-8 animate-spin text-primary" />
//     </div>
//   );
// }


// frontend/src/app/kyc/start/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// --- UI Components ---
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  AlertTriangle,
  Info,
  UserCheck,
  UserPlus,
  ShieldCheck,
  HelpCircle,
  FileText,
  ArrowRight,
  RotateCcw,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- App Specific Imports ---
import { useAuth } from "@/app/contexts/AuthContext";
import { useKyc } from "../../contexts/KycContext";
import kycService from "@/app/services/kyc";

// --- Component ---
export default function KycStartPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading, refetchUser } = useAuth();
  const {
    // goToStep, // Not used in this component
    updateCurrentUiStepId,
    isInitialized: kycInitialized,
    backendStatus,
    isLoadingStatus: kycLoadingStatus,
    rejectionReason,
    fetchKycStatus,
    startKycFlow,
    // resetKycProgress, // Not used in this component
  } = useKyc();

  const [isSkipping, setIsSkipping] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // --- Effects ---
  useEffect(() => {
    if (kycInitialized && pathname === "/kyc/start") {
      if (
        [
          "not_started",
          "skipped",
          "rejected",
          "loading", // "loading" might be too broad, KycProvider may handle better
          "unauthenticated",
          "error",
        ].includes(backendStatus as string)
      ) {
        updateCurrentUiStepId("start");
      }
    }
  }, [kycInitialized, backendStatus, updateCurrentUiStepId, pathname]);

  useEffect(() => {
    // This effect's main purpose seems to be covered by KycProvider's redirect logic.
    // Keeping it for now but ensuring it doesn't conflict.
    if (authLoading || !kycInitialized || kycLoadingStatus) return;
    if (!user) return; // KycProvider should handle redirect if auth changes
    // KycProvider handles verified/pending/error redirects.
    // If backendStatus is rejected, user should stay on this page to see options.
  }, [
    user,
    authLoading,
    kycInitialized,
    backendStatus,
    kycLoadingStatus,
    // router, // router not used here, KycProvider handles redirects
    // pathname, // pathname not strictly needed if KycProvider handles conditional UI
  ]);


  // --- Action Handlers ---
  const handleStartVerification = useCallback(async () => {
    if (
      !user ||
      !["not_started", "skipped", "rejected"].includes(backendStatus as string)
    ) {
      console.warn("KYC Start: Start verification clicked in unexpected state:", backendStatus);
      setActionError("Cannot start verification at this time. Current status: " + backendStatus);
      return;
    }
    setActionError(null);
    console.log("KYC Start: Initiating verification flow...");
    await startKycFlow(); // This should navigate to the appropriate KYC step
  }, [user, backendStatus, startKycFlow, setActionError]);

  const handleSkip = useCallback(async () => {
    if (!user) {
      console.warn("KYC Start: Skip attempt without authenticated user.");
      setActionError("You must be logged in to perform this action.");
      return;
    }

    // If KYC status is already 'skipped', redirect to dashboard immediately.
    if (backendStatus === "skipped") {
      console.log("KYC Start: KYC status is already 'skipped'. Redirecting to dashboard.");
      router.push("/dashboard");
      return;
    }

    // Only allow the actual skip API call if status is 'not_started'.
    if (backendStatus !== "not_started") {
      console.warn("KYC Start: Skip button clicked in an unexpected state for API call:", backendStatus);
      setActionError("Cannot skip verification at this stage. Your current status is: " + backendStatus);
      return;
    }

    // Confirmation dialog
    if (!confirm("Skipping verification may limit access to certain features. You can complete it later. Continue?")) {
      return;
    }

    setIsSkipping(true);
    setActionError(null);
    try {
      console.log("KYC Start: Attempting to skip KYC via service (status was 'not_started')...");
      await kycService.skipKyc();
      console.log("KYC Start: Skip API call successful. Refetching user and KYC status...");
      await refetchUser(); // Refetch user data
      await fetchKycStatus(true); // Force refetch KYC status
      // After refetch, KycContext's backendStatus should update to 'skipped'.
      console.log("KYC Start: Contexts refetched. Redirecting to dashboard.");
      router.push("/dashboard"); // Redirect after successful skip and refetch
    } catch (err: any) {
      console.error("KYC Start: Error skipping KYC:", err);
      const errorMessage = err?.response?.data?.message || err.message || "An unexpected error occurred while trying to skip verification.";
      setActionError(errorMessage);
      // User stays on page to see the error.
    } finally {
      setIsSkipping(false);
    }
  }, [user, backendStatus, router, refetchUser, fetchKycStatus, setActionError, setIsSkipping]);


  // --- Render Logic ---

  // 1. Primary Loading (Auth or KycContext not ready)
  if (authLoading || !kycInitialized) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. User not logged in (after initial auth check)
  // This should ideally be handled by a higher-level redirect or page guard in KycProvider or layout.
  // If KycProvider sets backendStatus to 'unauthenticated', that's handled by redirect logic below.
  if (!user && backendStatus !== 'unauthenticated') { // If user is gone but status hasn't updated yet
     return (
        <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-muted-foreground">Authenticating...</p>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground ml-2" />
        </div>
    );
  }

  // 3. Waiting for Redirect based on KycContext status (verified, pending, error, unauthenticated)
  // KycProvider is expected to handle these redirects. This component shows a spinner while that happens.
  if (user && (kycLoadingStatus || ["verified", "pending", "error", "unauthenticated"].includes(backendStatus as string))) {
    // KycProvider should redirect from these states. Show spinner during transition.
    // "loading" is also a state where we might be waiting for status resolution.
    // "unauthenticated" should also lead to redirect by KycProvider.
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-muted-foreground">Loading KYC status...</p>
        <Loader2 className="h-8 w-8 animate-spin text-primary ml-2" />
      </div>
    );
  }


  // 4. Render Main Content (User logged in AND status allows starting/resuming: not_started, skipped, rejected)
  if ( user && ["not_started", "skipped", "rejected"].includes(backendStatus as string) ) {
    let title = "Verify Your Identity";
    let description = "Complete identity verification to comply with regulations, enhance security, and unlock all account features.";
    let headerIcon = <UserPlus className="h-8 w-8" />;
    let iconBgColor = "bg-primary/20 text-primary border-primary/30";
    let startButtonText = "Start Verification";
    let startButtonIcon = <ArrowRight className="ml-2 size-4.5" />;
    let primaryButtonClasses = "bg-primary text-neutral-900 hover:bg-primaryhover";

    if (backendStatus === "skipped") {
      title = "Complete Your Verification";
      description = "You previously skipped identity verification. Complete it now to access full account features.";
      headerIcon = <UserCheck className="h-8 w-8" />;
      iconBgColor = "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700";
      startButtonText = "Complete Verification";
    } else if (backendStatus === "rejected") {
      title = "Retry Verification";
      description = "Your previous verification attempt requires attention. Please review the feedback and submit again.";
      headerIcon = <AlertTriangle className="h-8 w-8" />;
      iconBgColor = "bg-red-100 text-destructive border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700";
      startButtonText = "Retry Verification";
      startButtonIcon = <RotateCcw className="ml-2 size-4.5" />;
      primaryButtonClasses = "bg-red-600 hover:bg-red-700 text-white";
    }

    return (
      <div className="mx-auto max-w-2xl">
        <Card className="bg-white dark:bg-background w-full border shadow-none animate-fadeIn overflow-hidden">
          <CardHeader className="items-center text-center p-4 md:p-8 bg-lightgray dark:bg-primarybox">
            <div className="mb-4 w-full inline-flex justify-center">
              <div
                className={cn(
                  "h-16 w-16 flex items-center justify-center rounded-full border shadow-inner",
                  iconBgColor
                )}
              >
                {headerIcon}
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-mainheading dark:text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-gray-500 dark:text-gray-300 mt-1">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 md:p-8 space-y-6">
            {backendStatus === "skipped" && (
              <Alert className="bg-blue-50 dark:bg-blue-900/25 border-blue-500 rounded-lg p-4 gap-3">
                <div className="flex-shrink-0 sm:size-12 size-10 rounded-full flex items-center justify-center bg-blue-600/20">
                  <Info className="text-blue-600 dark:text-blue-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <div>
                  <AlertTitle className="font-medium text-blue-800 dark:text-blue-200 tracking-normal text-base">
                    Verification Pending
                  </AlertTitle>
                  <AlertDescription className="text-blue-700 dark:text-blue-300/90">
                    Complete verification now to unlock full account features.
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {backendStatus === 'rejected' && (
              <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3">
                <div className="flex-shrink-0 sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20">
                  <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <div>
                  <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
                    Previous Attempt Failed
                  </AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-300/90">
                    {rejectionReason ||
                      "Please review the requirements carefully and ensure your documents are clear and valid."}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <Alert className="p-4 rounded-lg">
              <FileText className="h-5 w-5 flex-shrink-0 mt-1 text-neutral-900 dark:text-white" />
              <div>
                <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
                  What You'll Need
                </AlertTitle>
                <AlertDescription className="text-gray-500 dark:text-gray-300">
                  Have a valid government-issued photo ID ready (e.g., Passport,
                  National ID, Resident Permit). Ensure it's not expired and the
                  image is clear.
                </AlertDescription>
              </div>
            </Alert>

            <Alert className="p-4 rounded-lg">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-1 text-green-600 dark:text-green-500" />
              <div>
                <AlertTitle className="font-medium text-neutral-900 dark:text-white tracking-normal text-base">
                  Secure Process
                </AlertTitle>
                <AlertDescription className="text-gray-500 dark:text-gray-300">
                  Your information is handled securely and used solely for
                  identity verification purposes.
                </AlertDescription>
              </div>
            </Alert>

            {actionError && (
              <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3">
                <div className="flex-shrink-0 sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20">
                  <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>
                <div>
                  <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
                    Action Failed
                  </AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-300/90">
                    {actionError}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 p-4 md:p-8 border-t">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {backendStatus === "not_started" && (
                <button
                  onClick={handleSkip}
                  disabled={isSkipping}
                  className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                >
                  {isSkipping ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Skip for Now
                </button>
              )}

              {(backendStatus === "skipped" ||
                backendStatus === "rejected") && (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </button>
              )}

              <button
                onClick={handleStartVerification}
                disabled={isSkipping} 
                className={cn(
                  "inline-flex items-center justify-center font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none",
                  primaryButtonClasses
                )}
              >
                {startButtonText} {startButtonIcon}
              </button>
            </div>

            <div className="w-full text-center pt-4 sm:pt-2">
              <p className="text-sm text-neutral-900 dark:text-white">
                Need help?{" "}
                <Link href="/support" className="underline hover:text-primary">
                  Contact support
                </Link>{" "}
                <HelpCircle className="inline h-4 w-4 ml-0.5" />
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Fallback if none of the above conditions are met
  console.warn("KycStartPage reached unexpected render state. Backend Status:", backendStatus, "User Authenticated:", !!user, "Auth Loading:", authLoading, "KYC Initialized:", kycInitialized, "KYC Loading:", kycLoadingStatus);
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Preparing KYC process...</p>
      <p className="text-xs text-muted-foreground mt-2">If this persists, please try refreshing the page or contact support.</p>
    </div>
  );
}