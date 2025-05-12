// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle } from 'lucide-react';

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();

//     // Redirect if status is not rejected or user not loaded
//     useEffect(() => {
//         if (!authLoading && user && user.kycStatus !== 'rejected') {
//             // Redirect based on actual status
//              if (user.kycStatus === 'verified') router.replace('/dashboard');
//              else if (user.kycStatus === 'not_started' || user.kycStatus === 'skipped') router.replace('/kyc/start');
//              else if (user.kycStatus === 'pending') router.replace('/kyc/pending');
//              else router.replace('/dashboard'); // Fallback
//         }
//     }, [user, authLoading, router]);

//     const handleRetryVerification = () => {
//         // Might want to reset context/localstorage here if needed before restart
//         // resetKycProgress(); // If using context reset
//         router.push('/kyc/start'); // Send back to the start page
//     };

//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     if (authLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//         );
//     }

//      // Don't render if redirecting
//      if (!user || user.kycStatus !== 'rejected') {
//          return null;
//      }

//     return (
//         <div className="text-center max-w-md mx-auto">
//             <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
//             <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-mainheading dark:text-white">
//                 Verification Required
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 Unfortunately, we couldn't verify your identity based on the information provided.
//             </p>

//             {user.kycRejectionReason && (
//                 <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-red-700 dark:text-red-200 text-sm">
//                     <p className="font-medium">Reason:</p>
//                     <p>{user.kycRejectionReason}</p>
//                 </div>
//             )}

//             <p className="text-gray-600 dark:text-gray-300 mb-8">
//                 Please review the requirements, ensure your documents are clear and valid, and try submitting again.
//             </p>

//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//                  <Button onClick={handleRetryVerification} size="lg">
//                     Retry Verification
//                 </Button>
//                 <Button onClick={handleGoToDashboard} variant="outline" size="lg">
//                     Go to Dashboard
//                 </Button>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard } from 'lucide-react'; // Import icons
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useKyc } from '../../contexts/KycContext'; // Import to reset progress

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const { resetKycProgress } = useKyc(); // Get reset function

//     // Effect to redirect if the user's status is not 'rejected'
//     useEffect(() => {
//         if (authLoading) return; // Wait for user data

//         // Redirect if user is not logged in
//         if (!user) {
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/dashboard');
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay on this page.

//     }, [user, authLoading, router]);

//     // Action to retry verification: reset progress and go to start
//     const handleRetryVerification = () => {
//         resetKycProgress(); // Clear any old data
//         router.push('/kyc/start'); // Navigate to the start page
//     };

//      // Action to go to the dashboard
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state while checking auth/user status
//      if (authLoading || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-2">Checking verification status...</span>
//             </div>
//         );
//     }

//      // If the effect hasn't redirected yet but status is not rejected, show loading
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-md mx-auto shadow-md border-destructive/50">
//             <CardHeader className="text-center">
//                 <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-3" />
//                 <CardTitle className="text-2xl md:text-3xl font-semibold text-destructive">
//                     Verification Required
//                 </CardTitle>
//                 <CardDescription>
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
//                         <p className="font-semibold mb-1">Reason for Rejection:</p>
//                         <p>{user.kycRejectionReason}</p>
//                     </div>
//                 )}

//                 <p className="text-gray-600 dark:text-gray-300">
//                     Please review the requirements, ensure your documents are clear, valid, and match your profile details, then try submitting again.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning } from 'lucide-react'; // Added FileWarning
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Use Alert component
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get reset function and context state
//     const { resetKycProgress, updateCurrentStepId, isInitialized } = useKyc();

//      // Set current step in context
//     useEffect(() => {
//         updateCurrentStepId('rejected');
//     }, [updateCurrentStepId]);

//     // Effect to redirect if status changes or user logs out
//     useEffect(() => {
//         // Wait for auth context AND KycContext initialization
//         if (authLoading || !isInitialized) return;

//         if (!user) {
//             console.log("KYC Rejected Page: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected Page: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/kyc/complete'); // Use complete page
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay.

//     }, [user, authLoading, isInitialized, router]);

//     // Action to retry verification
//     const handleRetryVerification = () => {
//         console.log("Retrying verification, resetting progress...");
//         resetKycProgress(); // Clear local storage, files, and context state, then navigates to 'start'
//         // No need to router.push here, resetKycProgress handles it via goToStep('start')
//     };

//      // Action to go to the dashboard (no change)
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state
//      if (authLoading || !isInitialized || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                 <span className="ml-3 text-lg text-muted-foreground">Checking status...</span>
//             </div>
//         );
//     }

//      // Brief loading if redirect is needed
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-lg border border-destructive/50 mt-10 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20">
//             <CardHeader className="text-center items-center pt-8">
//                 <AlertTriangle className="mx-auto h-14 w-14 text-destructive mb-4 stroke-[1.5]" />
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                     Action Required
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1">
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle>Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {user.kycRejectionReason}
//                         </AlertDescription>
//                     </Alert>
//                 )}

//                 <p className="text-foreground/90 dark:text-foreground/80 px-4">
//                     Please review the reason above (if provided) and ensure your documents are clear, valid, and match the details you entered. You can restart the verification process.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning } from 'lucide-react'; // Added FileWarning
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Use Alert component
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     // Get reset function and context state
//     const { resetKycProgress, updateCurrentStepId, isInitialized } = useKyc();

//      // Set current step in context
//     useEffect(() => {
//         updateCurrentStepId('rejected');
//     }, [updateCurrentStepId]);

//     // Effect to redirect if status changes or user logs out
//     useEffect(() => {
//         // Wait for auth context AND KycContext initialization
//         if (authLoading || !isInitialized) return;

//         if (!user) {
//             console.log("KYC Rejected Page: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//             return;
//         }

//         // Redirect if status is NOT rejected
//         if (user.kycStatus !== 'rejected') {
//             console.log(`KYC Rejected Page: Status is ${user.kycStatus}, redirecting...`);
//             switch (user.kycStatus) {
//                 case 'verified':
//                     router.replace('/kyc/complete'); // Use complete page
//                     break;
//                 case 'pending':
//                     router.replace('/kyc/pending');
//                     break;
//                 case 'not_started':
//                 case 'skipped':
//                 default:
//                     router.replace('/kyc/start');
//                     break;
//             }
//         }
//         // If status IS rejected, stay.

//     }, [user, authLoading, isInitialized, router]);

//     // Action to retry verification
//     const handleRetryVerification = () => {
//         console.log("Retrying verification, resetting progress...");
//         resetKycProgress(); // Clear local storage, files, and context state, then navigates to 'start'
//         // No need to router.push here, resetKycProgress handles it via goToStep('start')
//     };

//      // Action to go to the dashboard (no change)
//      const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // Loading state
//      if (authLoading || !isInitialized || !user) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                 <span className="ml-3 text-lg text-muted-foreground">Checking status...</span>
//             </div>
//         );
//     }

//      // Brief loading if redirect is needed
//       if (user.kycStatus !== 'rejected') {
//           return (
//              <div className="flex justify-center items-center min-h-[400px]">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
//                  <span className="ml-3 text-lg text-muted-foreground">Redirecting...</span>
//              </div>
//          );
//      }

//     // Render content only if status is confirmed rejected
//     return (
//         <Card className="w-full max-w-lg mx-auto shadow-lg border border-destructive/50 mt-10 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20">
//             <CardHeader className="text-center items-center pt-8">
//                 <AlertTriangle className="mx-auto h-14 w-14 text-destructive mb-4 stroke-[1.5]" />
//                 <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                     Action Required
//                 </CardTitle>
//                 <CardDescription className="text-base text-muted-foreground pt-1">
//                     Unfortunately, we couldn't verify your identity.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="text-center space-y-6 pb-8">
//                 {/* Display rejection reason if available */}
//                 {user.kycRejectionReason && (
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle>Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {user.kycRejectionReason}
//                         </AlertDescription>
//                     </Alert>
//                 )}

//                 <p className="text-foreground/90 dark:text-foreground/80 px-4">
//                     Please review the reason above (if provided) and ensure your documents are clear, valid, and match the details you entered. You can restart the verification process.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                      <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto">
//                          <RotateCcw className="mr-2 h-4 w-4" />
//                         Retry Verification
//                     </Button>
//                     <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto">
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Go to Dashboard
//                     </Button>
//                 </div>
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
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Function to clear state and navigate to start
//         updateCurrentUiStepId,
//         goToStep, // Potentially useful if we want to jump to a specific edit step later
//         backendStatus,
//         rejectionReason, // Get rejection reason from context
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             console.log("KYC Rejected: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'rejected' (handled by KycContext provider now)

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // Reset progress and navigate to the 'start' page using the context function
//         // This ensures context state is clean before restarting the flow.
//         resetKycProgress(true); // `true` should navigate to the start page '/kyc/start'
//     };

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

//     // If status is being checked or is not yet 'rejected'
//     if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'rejected'
//     if (backendStatus !== 'rejected') {
//          console.warn(`KYC Rejected Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity with the information provided.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';

// // --- App Specific Imports ---
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext';

// // --- Component ---
// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Function to clear state and navigate to start
//         updateCurrentUiStepId,
//         // goToStep, // Keep commented unless needed for specific step navigation
//         backendStatus,
//         rejectionReason, // Get rejection reason from context
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status and redirect if necessary
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             console.log("KYC Rejected: No user found, redirecting to login.");
//             router.replace('/auth/login?redirect=/kyc/rejected');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Redirect if status changes away from 'rejected' (handled by KycContext provider now)

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // Reset progress and navigate to the 'start' page using the context function
//         resetKycProgress(true); // `true` ensures navigation to '/kyc/start' after reset
//     };

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

//     // If status is being checked or is not yet 'rejected'
//     if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
//         return (
//             <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                 <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                 <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//             </div>
//         );
//     }

//     // Render only if status is definitively 'rejected'
//     if (backendStatus !== 'rejected') {
//          console.warn(`KYC Rejected Page: Render attempted with status ${backendStatus}. Waiting for context redirect.`);
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8"> {/* Added padding and vertical centering */}
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity with the information provided.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <a href="/support" className="underline hover:text-primary">Contact support</a> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext'; // Correct path
// import Link from 'next/link';

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Use this for retry
//         updateCurrentUiStepId,
//         backendStatus,
//         rejectionReason,
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized) {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             router.replace('/auth/login?redirect=/kyc/rejected');
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Rely on KycContext provider for redirection if status changes

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // *** Call resetKycProgress with true to navigate to start ***
//         resetKycProgress(true);
//     };

//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---
//     if (authLoading || !kycInitialized) {
//         return ( /* ... Loading indicator ... */
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Initializing...</p>
//              </div>
//         );
//     }
//     if (!user) {
//         return ( /* ... Redirecting to login indicator ... */
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                  <p className="text-muted-foreground">Redirecting to login...</p>
//              </div>
//         );
//     }
//     if (kycLoadingStatus || (backendStatus !== 'rejected' && backendStatus !== 'error')) {
//         return ( /* ... Checking status indicator ... */
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//              </div>
//         );
//     }
//     if (backendStatus !== 'rejected') {
//         // Should be redirected by KycContext, show loading as fallback
//         return ( /* ... Updating status indicator ... */
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext'; // Correct path
// import Link from 'next/link';

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Use this for retry
//         updateCurrentUiStepId,
//         backendStatus,
//         rejectionReason, // Get reason from context
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step if initialized and on the correct page
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/rejected') {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status (context provider handles main redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) {
//             // console.log("KYC Rejected: No user, context should redirect to login.");
//             // Let KycProvider handle redirect to login
//         }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Rely on KycContext provider (Effect 2) for redirection if status changes *away* from 'rejected'

//     // --- Action Handlers ---
//     const handleRetryVerification = () => {
//         console.log("KYC Rejected: Retrying verification...");
//         // Call resetKycProgress with true to clear state AND navigate to start page
//         resetKycProgress(true);
//     };

//     const handleGoToDashboard = () => {
//         router.push('/dashboard');
//     };

//     // --- Render Logic ---

//     // Show loading if Auth or KYC context is not ready
//     if (authLoading || !kycInitialized) {
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Initializing...</p>
//              </div>
//         );
//     }

//     // Show loading if status is being checked actively
//     if (kycLoadingStatus) {
//          return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Checking Verification Status...</p>
//              </div>
//          );
//     }

//     // If user is logged in, but status is NOT rejected, context should redirect. Show loading briefly.
//     if (user && backendStatus !== 'rejected') {
//         // This state should be temporary as KycContext Effect 2 redirects
//         // console.log(`KYC Rejected Page: Status is ${backendStatus}, waiting for context redirect.`);
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//                  <p className="text-muted-foreground text-lg">Updating Status...</p>
//              </div>
//          );
//     }

//     // If user is not logged in (and auth check is complete), show loading/redirecting message
//     if (!user) {
//         return (
//              <div className="flex flex-col justify-center items-center min-h-[400px] w-full">
//                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
//                  <p className="text-muted-foreground">Redirecting to login...</p>
//              </div>
//         );
//     }

//     // --- Main Rejected Content (Render only if user exists and status is 'rejected') ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner">
//                         <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" />
//                     </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">
//                         Verification Action Required
//                     </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto">
//                         Unfortunately, we couldn't verify your identity.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     {/* Display rejection reason from context */}
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {rejectionReason || "No specific reason provided. Common issues include unclear images, expired documents, or mismatched information. Please ensure your documents are valid and uploaded clearly."}
//                         </AlertDescription>
//                     </Alert>

//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base">
//                         Please review the reason above. You can restart the verification process with updated information or corrected documents.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
//                         </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1">
//                             <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
//                         </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4">
//                         Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/>
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // frontend/src/app/kyc/rejected/page.tsx
// 'use client';

// import React, { useEffect, useCallback } from 'react'; // Added useCallback
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, RotateCcw, LayoutDashboard, FileWarning, HelpCircle } from 'lucide-react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { useKyc } from '../../contexts/KycContext'; // Correct path
// import Link from 'next/link';

// export default function KycRejectedPage() {
//     const router = useRouter();
//     const { user, loading: authLoading } = useAuth();
//     const {
//         resetKycProgress, // Use this for retry
//         updateCurrentUiStepId,
//         backendStatus,
//         rejectionReason, // Get reason directly from KycContext
//         isInitialized: kycInitialized,
//         isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/rejected') {
//             updateCurrentUiStepId('rejected');
//         }
//     }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check login status (context handles redirection)
//     useEffect(() => {
//         if (!authLoading && !user && kycInitialized) { /* Let context redirect */ }
//     }, [user, authLoading, kycInitialized, router]);

//     // Effect 3: Rely on KycContext for redirection if status changes

//     // --- Action Handlers ---
//     const handleRetryVerification = useCallback(async () => { // Make async
//         console.log("KYC Rejected: Retrying verification via resetKycProgress...");
//         // Call resetKycProgress with true to clear state AND navigate to start page
//         await resetKycProgress(true);
//     }, [resetKycProgress]); // Dependency

//     const handleGoToDashboard = useCallback(() => {
//         router.push('/dashboard');
//     }, [router]);

//     // --- Render Logic ---

//     // Primary Loading
//     if (authLoading || !kycInitialized) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }

//     // Context Status Loading
//     if (kycLoadingStatus) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }

//     // Waiting for Redirect (if status is not 'rejected')
//     if (user && backendStatus !== 'rejected') {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }

//     // Not Logged In
//     if (!user) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /> </div> );
//     }

//     // --- Main Rejected Content ---
//     return (
//         <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
//             <Card className="w-full max-w-lg mx-auto shadow-xl border border-destructive/50 bg-gradient-to-br from-background to-red-50 dark:from-secondary dark:to-red-900/20 animate-fadeIn overflow-hidden">
//                 <CardHeader className="text-center items-center p-6 md:p-8 bg-destructive/10 dark:bg-destructive/20 border-b border-destructive/20 dark:border-red-800/60">
//                     {/* ... Header content ... */}
//                     <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full mb-4 border border-destructive/30 dark:border-red-800/50 shadow-inner"> <AlertTriangle className="h-10 w-10 text-destructive stroke-[1.5]" /> </div>
//                     <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-destructive"> Verification Action Required </CardTitle>
//                     <CardDescription className="text-base text-destructive/90 dark:text-red-300/90 pt-1 max-w-md mx-auto"> Unfortunately, we couldn't verify your identity. </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-6 md:p-8 text-center space-y-6">
//                     <Alert variant="destructive" className="text-left">
//                         <FileWarning className="h-4 w-4" />
//                         <AlertTitle className="font-semibold">Reason for Rejection</AlertTitle>
//                         <AlertDescription>
//                             {/* Display reason from KycContext state */}
//                             {rejectionReason || "No specific reason provided. Please review common issues like document clarity or validity and try again."}
//                         </AlertDescription>
//                     </Alert>
//                     <p className="text-foreground/90 dark:text-foreground/80 px-2 text-base"> Please review the reason above. You can restart the verification process. </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//                         <Button onClick={handleRetryVerification} size="lg" className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1"> <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification </Button>
//                         <Button onClick={handleGoToDashboard} variant="outline" size="lg" className="w-full sm:w-auto flex-1"> <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground pt-4"> Need help? <Link href="/support" className="underline hover:text-primary">Contact support</Link> <HelpCircle className="inline h-3 w-3 ml-0.5"/> </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// frontend/src/app/kyc/rejected/page.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- UI Components ---
// Removed Button from shadcn/ui as we'll use custom styled <button>
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
  AlertTriangle, // Good icon for general warning
  RotateCcw,
  LayoutDashboard,
  FileWarning, // Specific for document issues
  HelpCircle,
  XCircle, // Explicit rejection icon
} from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure cn is imported

// --- App Specific Imports ---
import { useAuth } from "@/app/contexts/AuthContext";
import { useKyc } from "../../contexts/KycContext";

// --- Component ---
export default function KycRejectedPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    resetKycProgress,
    updateCurrentUiStepId,
    backendStatus,
    rejectionReason,
    isInitialized: kycInitialized,
    isLoadingStatus: kycLoadingStatus,
  } = useKyc();

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/rejected") {
      updateCurrentUiStepId("rejected");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Check login (context handles redirection)
  useEffect(() => {
    if (!authLoading && !user && kycInitialized) {
      /* Context redirects */
    }
  }, [user, authLoading, kycInitialized]);

  // Effect 3: Rely on context for redirection if status changes from 'rejected'

  const handleRetryVerification = useCallback(async () => {
    console.log("KYC Rejected: Retrying verification via resetKycProgress...");
    await resetKycProgress(true); // Clear state and navigate
  }, [resetKycProgress]);

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
  // Context Status Loading
   if (kycLoadingStatus && !user) {
     return (
        <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  // Waiting for Redirect (if status not 'rejected' or not logged in after initial check)
  if (user && backendStatus !== "rejected") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
   if (!user) {
      return (
          <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      );
  }


  // --- Main Rejected Content ---
  return (
    // Adopt layout and max-width from other pages
    <div className="mx-auto max-w-2xl py-8 px-4">
      {/* Adopt Card styling from other pages - standard border, shadow, animation */}
      <Card className="w-full border-border/50 shadow-none animate-fadeIn overflow-hidden">
        {/* Adopt Header structure and styling, use Accent background */}
        <CardHeader className="items-center text-center p-4 md:p-8 bg-accent">
          {/* Icon Container - styled with Destructive theme */}
          <div className="mb-4 w-full inline-flex justify-center">
            {/* Use destructive colors */}
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 text-destructive dark:text-red-400 border border-red-200 dark:border-red-700 shadow-inner">
              {/* <AlertTriangle className="h-8 w-8" /> */}
              <XCircle className="h-8 w-8" /> {/* More explicit rejection */}
            </div>
          </div>
          {/* Title - Adopt font styling */}
          <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight text-mainheading dark:text-white">
            Verification Action Required
          </CardTitle>
          {/* Description - Adopt styling */}
          <CardDescription className="sm:text-base text-sm text-gray-500 dark:text-gray-300 mt-1 px-4">
            Unfortunately, we couldn't verify your identity based on the
            information provided.
          </CardDescription>
          {/* Badge - Adopt structure/styling, use Destructive theme */}
          <Badge
            variant="destructive" // Use destructive variant for styling
            className="mt-3 text-sm border-0 rounded-full font-medium text-red-700 bg-red-100 dark:bg-red-600/20 dark:text-red-400 px-4 py-2 w-28"
          >
            Rejected
          </Badge>
        </CardHeader>

        {/* Adopt Content structure */}
        <CardContent className="p-4 md:p-8 space-y-6">
          {/* Rejection Reason Alert - Crucial information */}
          <Alert className="bg-red-100 border-red-300 dark:bg-red-600/20 dark:border-red-700 rounded-lg p-4">
            <FileWarning className="h-5 w-5 flex-shrink-0 mt-1 text-red-700 dark:text-red-400 " />
            <div>
              <AlertTitle className="font-medium tracking-normal text-red-700 dark:text-red-400  text-base">
                Reason for Rejection
              </AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-300">
                {rejectionReason ||
                  "No specific reason provided. Common issues include unclear document images, expired documents, or mismatched information. Please review your submission carefully."}
              </AlertDescription>
            </div>
          </Alert>

          {/* Optional: Add separator for visual structure */}
          <Separator className="my-6" />

          {/* Introductory Text - Guide user */}
          <div className="text-center text-gray-500 dark:text-gray-300 sm:text-lg text-base">
            <p className="">Please review the feedback above.</p>
            <p className="mt-1">
              You can{" "}
              <span className="font-semibold text-primary">
                retry the verification
              </span>{" "}
              process with corrected information or documents.
            </p>
          </div>

          {/* Optional: Second Alert for Guidance */}
          {/*
          <Alert>
             <HelpCircle className="h-5 w-5" />
             <AlertTitle className="font-medium text-neutral-900 dark:text-white">Need Assistance?</AlertTitle>
             <AlertDescription className="text-gray-500 dark:text-gray-300">
                 If you're unsure how to proceed or believe this is an error, please <Link href="/support" className="font-medium underline text-primary hover:text-primary/80">contact our support team</Link>.
             </AlertDescription>
          </Alert>
          */}
        </CardContent>

        {/* Adopt Footer structure */}
        <CardFooter className="flex flex-col gap-3 p-4 md:p-8 bg-bg-accent border-t">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Dashboard Button - Secondary Action (Dark Style) */}
            <button
              onClick={handleGoToDashboard}
              // Use secondary button style from KycPendingPage
              className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
            </button>

            {/* Retry Button - Primary Action (Destructive Style) */}
            <button
              onClick={handleRetryVerification}
              // Use destructive color scheme, similar structure to other primary buttons
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Retry Verification
            </button>
          </div>
          {/* Support Link - Moved to footer */}
          <div className="w-full text-center pt-4">
            <p className="text-sm text-neutral-900 dark:text-white">
              Need help?{" "}
              <Link href="/support" className="underline hover:text-primary">
                Contact support{" "}
              </Link>
              <HelpCircle className="inline h-4 w-4 ml-1" />
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}