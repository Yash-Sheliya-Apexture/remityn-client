// // src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// 'use client'; // <<<--- ADD THIS DIRECTIVE AT THE VERY TOP

// import React from "react"; // No longer strictly needed in new React/Next.js but harmless
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import TransactionsSection from "./TransactionsSection";
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Adjust path if needed
// import { Loader2 } from "lucide-react";

// const MainDashBoard = () => {
//   // Now it's safe to call useAuth because this is a Client Component
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-10">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-2">Loading dashboard...</span>
//       </div>
//     );
//   }

//   if (!user) {
//     return <p className="text-center p-10 text-red-600">Error: User data not available.</p>;
//   }

//   const needsVerification = user.kycStatus !== 'verified' && user.kycStatus !== 'pending';
//   const isRejected = user.kycStatus === 'rejected';
//   const rejectionReason = user.kycRejectionReason;

//   return (
//     <>
//       {needsVerification && (
//         <AccountVerification
//             isRejected={isRejected}
//             reason={rejectionReason}
//         />
//        )}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </>
//   )
// }
// export default MainDashBoard;

// // frontend/src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// "use client"; // Required because it uses hooks (useAuth)

// import React from "react";
// import CountryCard from "./CountryCard"; // Assume these components exist
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if needed
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Adjust path
// import { Loader2 } from "lucide-react";

// const MainDashBoard = () => {
//   // Hooks can be called because it's a Client Component
//   const { user, loading } = useAuth();

//   // Show loading state while authentication context is loading
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-10 min-h-[200px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
//           Loading dashboard...
//         </span>
//       </div>
//     );
//   }

//   // Handle case where user data isn't available after loading (should ideally not happen if protected)
//   if (!user) {
//     return (
//       <div className="text-center p-10 bg-red-100 dark:bg-red-900/30 rounded-lg">
//         <p className="text-red-700 dark:text-red-200 font-semibold">
//           Error: User data not available.
//         </p>
//         <p className="text-sm text-red-600 dark:text-red-300 mt-2">
//           Please try logging in again.
//         </p>
//       </div>
//     );
//   }

//   const needsVerification = ["not_started", "skipped", "rejected"].includes(
//     user.kycStatus
//   );
//   const isRejected = user.kycStatus === "rejected";
//   const rejectionReason = user.kycRejectionReason; // Get reason from context

//   return (
//     <div className="space-y-6 md:space-y-8">
//       {needsVerification && (
//         <AccountVerification isRejected={isRejected} reason={rejectionReason} />
//       )}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };
// export default MainDashBoard;

// "use client";

// import React from "react";
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";

// const MainDashBoard = () => {
//   const { user, loading: authLoading } = useAuth(); // Use authLoading flag

//   // --- Loading State ---
//   if (authLoading) {
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" />
//       </div>
//     );
//   }

//   // --- Error State: User data not available after loading ---
//   if (!user) {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try logging out and logging back in. Contact support if the problem persists.
//             </p>
//         </div>
//     );
//   }

//   // --- Determine KYC Status and Need for Verification ---
//   // Explicitly check for statuses requiring user action for the banner
//   const needsVerificationBanner =
//         user.kycStatus === 'not_started' ||
//         user.kycStatus === 'skipped' ||
//         user.kycStatus === 'rejected';

//   // Check if status is specifically 'rejected' to pass to the banner
//   const isRejected = user.kycStatus === 'rejected';
//   // Get rejection reason directly from the user context state
//   const rejectionReason = user.kycRejectionReason; // Make sure kycRejectionReason is available in AuthContext user state

//   console.log(`Dashboard - User: ${user.email}, KYC Status from AuthContext: ${user.kycStatus}, Needs Verification Banner: ${needsVerificationBanner}, Is Rejected: ${isRejected}`);

//   return (
//     <div className="space-y-6 md:space-y-8 p-1 md:p-0">
//       {needsVerificationBanner && (
//         <AccountVerification
//           isRejected={isRejected}
//           reason={rejectionReason} // Pass the reason if rejected
//         />
//       )}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />

//     </div>
//   );
// };

// export default MainDashBoard;

// // frontend/src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// "use client";

// import React from "react";
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type

// const MainDashBoard = () => {
//   const { user, loading: authLoading } = useAuth(); // Use authLoading flag

//   // --- Loading State ---
//   if (authLoading) {
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          {/* Skeletons remain the same */}
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" />
//       </div>
//     );
//   }

//   // --- Error State: User data not available after loading ---
//   if (!user) {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             {/* Error display remains the same */}
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try logging out and logging back in. Contact support if the problem persists.
//             </p>
//         </div>
//     );
//   }

//   // --- Get KYC Status and Reason ---
//   // Assume kycStatus and kycRejectionReason are part of the user object from AuthContext
//   const kycStatus: KycStatus | undefined | null = user.kycStatus; // Explicitly type this
//   const rejectionReason = user.kycRejectionReason;

//   // Determine if the banner should be shown at all
//   // Show banner unless status is explicitly 'verified'
//   const showVerificationBanner = kycStatus && kycStatus !== 'verified';

//   console.log(`Dashboard - User: ${user.email}, KYC Status from AuthContext: ${kycStatus}, Show Banner: ${showVerificationBanner}`);

//   return (
//     <div className="space-y-6 md:space-y-8 p-1 md:p-0">
//       {/* --- Account Verification Banner --- */}
//       {/* Render ONLY if status is NOT 'verified' */}
//       {showVerificationBanner && (
//         <AccountVerification
//           status={kycStatus} // Pass the actual status
//           reason={rejectionReason} // Pass the reason
//         />
//       )}

//       {/* Other Dashboard Sections */}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };

// export default MainDashBoard;

// // frontend/src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// "use client";

// import React from "react";
// import CountryCard from "./CountryCard"; // Implement this
// import TasksPage from "./Tasks";         // Implement this
// import TransactionsSection from "./TransactionsSection"; // Implement this
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type

// const MainDashBoard = () => {
//   const { user, loading: authLoading } = useAuth(); // Use authLoading flag

//   // --- Loading State ---
//   if (authLoading) {
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          {/* Skeletons */}
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" />
//       </div>
//     );
//   }

//   // --- Error State: User data not available after loading ---
//   if (!user) {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             {/* Error display */}
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try logging out and logging back in. Contact support if the problem persists.
//             </p>
//         </div>
//     );
//   }

//   // --- Get KYC Status and Reason ---
//   const kycStatus: KycStatus | undefined | null = user.kycStatus;
//   const rejectionReason = user.kycRejectionReason;

//   // Determine if the banner should be shown
//   const showVerificationBanner = kycStatus && kycStatus !== 'verified';

//   console.log(`Dashboard - User: ${user.email}, KYC Status from AuthContext: ${kycStatus}, Show Banner: ${showVerificationBanner}`);

//   return (
//     <div className="space-y-6 md:space-y-8 p-1 md:p-0">
//       {/* --- Account Verification Banner --- */}
//       {showVerificationBanner && (
//         <AccountVerification
//           status={kycStatus} // Pass the actual status
//           reason={rejectionReason} // Pass the reason
//         />
//       )}

//       {/* Other Dashboard Sections */}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };

// export default MainDashBoard;

// // frontend/src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// "use client";

// import React from "react";
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type

// const MainDashBoard = () => {
//   const { user, loading: authLoading } = useAuth(); // Use authLoading flag

//   // --- Loading State ---
//   if (authLoading) {
//     // console.log("Dashboard: Auth is loading, showing skeleton.");
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" />
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" />
//       </div>
//     );
//   }

//   // --- Error State: User data not available after loading ---
//   if (!user) {
//     console.error("Dashboard: Auth loaded but user data is null.");
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try logging out and logging back in. Contact support if the problem persists.
//             </p>
//         </div>
//     );
//   }

//   // --- Get KYC Status and Reason ---
//   const kycStatus: KycStatus | undefined | null = user.kycStatus;
//   const rejectionReason = user.kycRejectionReason;

//   // Determine if the banner should be shown (only for non-verified states)
//   const showVerificationBanner = kycStatus && kycStatus !== 'verified';

//   console.log(`Dashboard Render - User: ${user.email}, KYC Status from AuthContext: ${kycStatus}, Show Banner: ${showVerificationBanner}`);

//   return (
//     <div className="space-y-6 md:space-y-8 p-1 md:p-0">
//       {/* --- Account Verification Banner --- */}
//       {showVerificationBanner && (
//         <AccountVerification
//           status={kycStatus} // Pass the actual status from AuthContext
//           reason={rejectionReason} // Pass the reason
//         />
//       )}

//       {/* Other Dashboard Sections */}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };

// export default MainDashBoard;

// // frontend/src/app/dashboard/components/MainDashBoardSection/MainSection.tsx
// "use client";

// import React from "react";
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type

// const MainDashBoard = () => {
//   // Use AuthContext as the single source of truth for user data on the dashboard
//   const { user, loading: authLoading } = useAuth();

//   // --- Loading State ---
//   // Show skeleton while AuthContext is determining the user state
//   if (authLoading) {
//     // console.log("Dashboard: Auth is loading, showing skeleton.");
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          {/* Mimic layout with skeletons */}
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Banner/Verification */}
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for CountryCard */}
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Tasks */}
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Transactions */}
//       </div>
//     );
//   }

//   // --- Error State: User data not available after loading ---
//   if (!user) {
//     // This indicates an issue with authentication or data fetching in AuthContext
//     console.error("Dashboard: Auth loaded but user data is null. Cannot render dashboard sections.");
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user session data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try refreshing the page or logging out and logging back in. Contact support if the problem persists.
//             </p>
//             {/* Maybe add logout button here */}
//         </div>
//     );
//   }

//   // --- Get KYC Status and Reason DIRECTLY from AuthContext ---
//   // This ensures the dashboard reflects the most recently fetched status via refetchUser
//   const kycStatus: KycStatus | undefined | null = user.kycStatus;
//   const rejectionReason = user.kycRejectionReason;

//   // Determine if the banner should be shown (only for non-verified states)
//   const showVerificationBanner = kycStatus && kycStatus !== 'verified';

//   // console.log(`Dashboard Render - User: ${user.email}, KYC Status from AuthContext: ${kycStatus}, Show Banner: ${showVerificationBanner}`);

//   return (
//     // Add padding consistent with loading state or remove if parent provides padding
//     <div className="space-y-6 md:space-y-8 p-4 md:p-0">
//       {/* --- Account Verification Banner --- */}
//       {/* Render the banner based on the status derived from AuthContext */}
//       {showVerificationBanner && (
//         <AccountVerification
//           status={kycStatus} // Pass the actual status from AuthContext
//           reason={rejectionReason} // Pass the reason
//         />
//       )}

//       {/* --- Other Dashboard Sections --- */}
//       {/* These components likely don't depend directly on KYC status, but might use user info */}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };

// export default MainDashBoard;

// "use client";

// import React from "react";
// import CountryCard from "./CountryCard";
// import TasksPage from "./Tasks";
// import TransactionsSection from "./TransactionsSection";
// import { useAuth } from "../../../contexts/AuthContext"; // Correct path
// import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type

// const MainDashBoard = () => {
//   // Use AuthContext as the single source of truth for user data on the dashboard
//   const { user, loading: authLoading } = useAuth();

//   // --- Loading State ---
//   // Show skeleton while AuthContext is determining the user state
//   if (authLoading) {
//     // console.log("Dashboard: Auth is loading, showing skeleton.");
//     return (
//       <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
//          {/* Mimic layout with skeletons */}
//          <Skeleton className="h-24 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Banner/Verification */}
//          <Skeleton className="h-32 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for CountryCard */}
//          <Skeleton className="h-48 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Tasks */}
//          <Skeleton className="h-64 w-full rounded-lg bg-muted dark:bg-muted/60" /> {/* Placeholder for Transactions */}
//       </div>
//     );
//   }
//   if (!user) {
//     // This indicates an issue with authentication or data fetching in AuthContext
//     console.error("Dashboard: Auth loaded but user data is null. Cannot render dashboard sections.");
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
//             <AlertCircle className="h-12 w-12 text-destructive mb-4" />
//             <p className="text-destructive dark:text-red-300 font-semibold text-lg">
//                 Error: Could not load user session data.
//             </p>
//             <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
//                 Please try refreshing the page or logging out and logging back in. Contact support if the problem persists.
//             </p>
//         </div>
//     );
//   }

//   const kycStatus: KycStatus | undefined | null = user.kycStatus; // Assuming kycStatus is directly on user object
//   const rejectionReason = user.kycRejectionReason; // Assuming rejection reason is on user object
//   console.log(kycStatus);
//   const showVerificationBanner = kycStatus !== 'verified';

//   return (
//     // Add padding consistent with loading state or remove if parent provides padding
//     <div className="space-y-6 md:space-y-8 p-4 md:p-0">
//       {showVerificationBanner && (
//         <AccountVerification
//           status={kycStatus} // Pass the actual status (or null/undefined) from AuthContext
//           reason={rejectionReason} // Pass the reason
//         />
//       )}
//       <CountryCard />
//       <TasksPage />
//       <TransactionsSection />
//     </div>
//   );
// };

// export default MainDashBoard;

"use client";

import React from "react";
import CountryCard from "./CountryCard";
import TasksPage from "./Tasks";
import TransactionsSection from "./TransactionsSection";
import { useAuth } from "../../../contexts/AuthContext"; // Correct path
import AccountVerification from "@/app/components/ui/AccountVerification"; // Correct path
import { Skeleton } from "@/components/ui/skeleton"; // Ensure Skeleton is correctly imported
import { AlertCircle } from "lucide-react";
import type { KycStatus } from "@/app/services/kyc"; // Import the KycStatus type
import Link from "next/link";
import { TbMoneybag } from "react-icons/tb";
import { BsSend } from "react-icons/bs";

const MainDashBoard = () => {
  // Use AuthContext as the SINGLE SOURCE OF TRUTH for user data on the dashboard
  const { user, loading: authLoading } = useAuth();

  // --- Loading State ---
  // Show skeleton ONLY while AuthContext is determining the user state
  if (authLoading) {
    // console.log("Dashboard: Auth is loading, showing skeleton.");
    return (
      <div className="space-y-6 md:space-y-8 animate-pulse p-4 md:p-0">
        {/* Mimic layout with skeletons */}
        <Skeleton className="h-24 w-full rounded-lg" />
        {/* Placeholder for Banner/Verification */}
        <Skeleton className="h-32 w-full rounded-lg" />
        {/* Placeholder for CountryCard */}
        <Skeleton className="h-48 w-full rounded-lg" />
        {/* Placeholder for Tasks */}
        <Skeleton className="h-64 w-full rounded-lg" />
        {/* Placeholder for Transactions */}
      </div>
    );
  }

  // --- Error State ---
  // This happens if AuthContext finishes loading but user is null (e.g., token invalid, API error during fetch)
  if (!user) {
    console.error(
      "Dashboard: Auth loaded but user data is null. Cannot render dashboard sections."
    );
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-destructive/10 dark:bg-destructive/20 rounded-lg border border-destructive/30 dark:border-destructive/50">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-destructive dark:text-red-300 font-semibold text-lg">
          Error: Could not load user session data.
        </p>
        <p className="text-sm text-destructive/80 dark:text-red-300/80 mt-2">
          Please try refreshing the page or logging out and logging back in.
          Contact support if the problem persists.
        </p>
      </div>
    );
  }

  // --- Render Dashboard Content ---
  // User data is available and guaranteed to be non-null here
  const kycStatus: KycStatus = user.kyc.status; // Get status from user.kyc.status
  const rejectionReason: string | null | undefined = user.kyc.rejectionReason; // Get reason from user.kyc.rejectionReason
  // console.log("Dashboard: Rendering with KYC Status from AuthContext:", kycStatus);

  const showVerificationBanner = kycStatus !== "verified";

  return (
    // Add padding consistent with loading state or remove if parent provides padding
    <div className="space-y-6 md:space-y-8 pb-0 md:pb-5 mt-2">
      {/* Show banner based on the authoritative status from AuthContext */}
      {showVerificationBanner && (
        <AccountVerification
          status={kycStatus} // Pass the actual status (or null/undefined) from AuthContext
          reason={rejectionReason} // Pass the reason
        />
      )}

      <div className="flex items-center gap-2">
       
        <Link href={"/dashboard/send/select-balance"}>
          {/* Added icon, added `gap-1.5` for spacing */}
          <button className="flex items-center justify-center gap-1.5 bg-primary text-neutral-900 hover:bg-primaryhover py-1 px-4 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer">
            <BsSend size={18} /> {/* Adjust size as needed */}
            Send
          </button>
        </Link>

        <Link href={"/dashboard/add-money/select-balance"}>
          {/* Added icon, added `gap-1.5` for spacing */}
          <button className="flex items-center justify-center gap-1.5 bg-primarybox text-primary hover:bg-primaryhover hover:text-neutral-900 py-1 px-4 font-medium rounded-full transition-all duration-75 ease-linear cursor-pointer">
            <TbMoneybag size={18} /> {/* Adjust size as needed */}
            Add
          </button>
        </Link>
      </div>
      
      <CountryCard />
      <TasksPage />
      <TransactionsSection />
    </div>
  );
};

export default MainDashBoard;
