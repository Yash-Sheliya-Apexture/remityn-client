// // frontend/src/components/DashboardSection/KycVerificationCard.tsx
// "use client";

// import React from 'react';
// import Link from 'next/link';
// import { Skeleton } from '@/components/ui/skeleton';
// import { BsShieldLock } from 'react-icons/bs';

// interface KycVerificationCardProps {
//     loading: boolean;
//     error: string | null;
//     notStartedCount?: number;
//     pendingCount?: number;
//     verifiedCount?: number;
//     rejectedCount?: number;
//     skippedCount?: number;
// }

// export default function KycVerificationCard({
//     loading,
//     error,
//     notStartedCount,
//     pendingCount,
//     verifiedCount,
//     rejectedCount,
//     skippedCount
// }: KycVerificationCardProps) {

//     // Skeleton Loader
//     if (loading) {
//         return (
//             <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl border animate-pulse">
//                 <div className="flex justify-between items-center mb-4">
//                     <Skeleton className="h-6 w-3/5 rounded" />
//                     <Skeleton className="h-5 w-5 rounded-full" />
//                 </div>
//                 <div className="space-y-3 mb-4">
//                     <Skeleton className="h-4 w-full rounded" /> {/* Not Started */}
//                     <Skeleton className="h-4 w-3/4 rounded" /> {/* Pending */}
//                     <Skeleton className="h-4 w-2/3 rounded" /> {/* Verified */}
//                     <Skeleton className="h-4 w-3/5 rounded" /> {/* Rejected */}
//                     <Skeleton className="h-4 w-1/2 rounded" /> {/* Skipped */}
//                 </div>
//                 <Skeleton className="h-5 w-1/3 mt-6 rounded" />
//             </div>
//         );
//     }

//     // Error display
//     if (error) {
//         return (
//              <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative h-full flex flex-col justify-center" role="alert">
//                  <p className='text-sm font-medium'>Error loading KYC Stats:</p>
//                  <p className='text-xs mt-1'>{error}</p>
//              </div>
//          );
//      }

//     // Helper function for conditional dot rendering
//     const renderDot = (count: number | undefined | null, colorClass: string, animate: boolean = false) => {
//         // Explicitly check if count is greater than 0 after handling null/undefined
//         if ((count ?? 0) > 0) {
//             return <div className={`ml-2 h-2 w-2 rounded-full ${colorClass} ${animate ? 'animate-pulse' : ''}`}></div>;
//         }
//         return null; // Render nothing if count is 0 or less (or null/undefined)
//     };

//     // Actual Card Content
//     return (
//         <div className="w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border h-full flex flex-col justify-between">
//             <div> {/* Content Wrapper */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//                         KYC Verifications
//                     </h4>
//                     <BsShieldLock  className="size-5 text-primary" />
//                 </div>

//                 <div className="space-y-3">
//                     {/* Not Started */}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">Not Started</p>
//                         <div className="flex items-center">
//                             <p className="text-sm font-semibold text-neutral-900 dark:text-white">{notStartedCount ?? '0'}</p> {/* Show 0 instead of N/A */}
//                             {/* Use helper function */}
//                             {renderDot(notStartedCount, 'bg-blue-400')}
//                         </div>
//                     </div>
//                     {/* Pending */}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">Pending</p>
//                         <div className="flex items-center">
//                             <p className="text-sm font-semibold text-neutral-900 dark:text-white">{pendingCount ?? '0'}</p>
//                             {/* Use helper function, enable animation */}
//                             {renderDot(pendingCount, 'bg-yellow-500', true)}
//                         </div>
//                     </div>
//                     {/* Verified */}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">Verified</p>
//                         <div className="flex items-center">
//                             <p className="text-sm font-semibold text-neutral-900 dark:text-white">{verifiedCount ?? '0'}</p>
//                             {renderDot(verifiedCount, 'bg-green-500')}
//                         </div>
//                     </div>
//                     {/* Rejected */}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">Rejected</p>
//                         <div className="flex items-center">
//                             <p className="text-sm font-semibold text-neutral-900 dark:text-white">{rejectedCount ?? '0'}</p>
//                             {renderDot(rejectedCount, 'bg-red-500')}
//                         </div>
//                     </div>
//                     {/* Skipped */}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-neutral-900 dark:text-white">Skipped</p>
//                         <div className="flex items-center">
//                             <p className="text-sm font-semibold text-neutral-900 dark:text-white">{skippedCount ?? '0'}</p>
//                             {renderDot(skippedCount, 'bg-gray-400')}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer Link */}
//             <div>
//                 <Link href="/admin/kyc-management" className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer">
//                     Manage KYC Verifications →
//                 </Link>
//             </div>
//         </div>
//     );
// }

// // frontend/src/components/DashboardSection/KycVerificationCard.tsx
// "use client";

// import React from "react";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import { BsShieldLock } from "react-icons/bs";

// interface KycVerificationCardProps {
//   loading: boolean;
//   error: string | null;
//   notStartedCount?: number;
//   pendingCount?: number;
//   verifiedCount?: number;
//   rejectedCount?: number;
//   skippedCount?: number;
// }

// export default function KycVerificationCard({
//   loading,
//   error,
//   notStartedCount,
//   pendingCount,
//   verifiedCount,
//   rejectedCount,
//   skippedCount,
// }: KycVerificationCardProps) {
//   // Skeleton Loader
//   if (loading) {
//     return (
//       <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl border">
//         {/* Header Skeleton */}
//         <div className="flex justify-between items-center mb-4">
//           <Skeleton className="h-6 w-1/3 rounded" />{" "}
//           {/* Title: "KYC Verifications" */}
//           <Skeleton className="h-5 w-5 rounded" /> {/* Icon */}
//         </div>
//         {/* Content Rows Skeleton */}
//         <div className="space-y-3 mb-4">
//           {/* Row 1 Skeleton (e.g., Not Started) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-2/5 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 h-2 w-2 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 2 Skeleton (e.g., Pending) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-1/3 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-6 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 h-2 w-2 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 3 Skeleton (e.g., Verified) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-1/3 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-10 rounded" />{" "}
//               {/* Count (can be wider for larger numbers) */}
//               <Skeleton className="ml-2 h-2 w-2 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 4 Skeleton (e.g., Rejected) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-1/3 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-6 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 h-2 w-2 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 5 Skeleton (e.g., Skipped) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-1/4 rounded" />{" "}
//             {/* Label (shorter label like "Skipped") */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-6 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 h-2 w-2 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//         </div>
//         {/* Footer Link Skeleton */}
//         <Skeleton className="h-6 w-1/2 mt-20 rounded" />{" "}
//         {/* Link: "Manage KYC Verifications ->" */}
//       </div>
//     );
//   }

//   // Error display
//   if (error) {
//     return (
//       <div
//         className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative h-full flex flex-col justify-center"
//         role="alert"
//       >
//         <p className="text-sm font-medium">Error loading KYC Stats:</p>
//         <p className="text-xs mt-1">{error}</p>
//       </div>
//     );
//   }

//   // Helper function for conditional dot rendering
//   const renderDot = (
//     count: number | undefined | null,
//     colorClass: string,
//     options?: { animate?: boolean; showOnZero?: boolean }
//   ) => {
//     const actualCount = count ?? 0;
//     const wantsAnimation = options?.animate ?? false;
//     const shouldShowOnZero = options?.showOnZero ?? false;

//     const showDot = actualCount > 0 || (actualCount === 0 && shouldShowOnZero);

//     if (showDot) {
//       const applyAnimation = actualCount > 0 && wantsAnimation;
//       return (
//         <div
//           className={`ml-2 h-2 w-2 rounded-full ${colorClass} ${
//             applyAnimation ? "animate-pulse" : ""
//           }`}
//         ></div>
//       );
//     }
//     return null;
//   };

//   // Actual Card Content
//   return (
//     <div className="w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border h-full flex flex-col justify-between">
//       <div>
//         {" "}
//         {/* Content Wrapper */}
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//             KYC Verifications
//           </h4>
//           <BsShieldLock className="size-5 text-primary" />
//         </div>
//         <div className="space-y-3">
//           {/* Not Started */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Not Started
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {notStartedCount ?? "0"}
//               </p>
//               {renderDot(notStartedCount, "bg-blue-400")}
//             </div>
//           </div>

//           {/* Pending */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Pending
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {pendingCount ?? "0"}
//               </p>
//               {renderDot(pendingCount, "bg-yellow-500", {
//                 animate: true,
//                 showOnZero: true,
//               })}
//             </div>
//           </div>

//           {/* Verified */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Verified
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {verifiedCount ?? "0"}
//               </p>
//               {renderDot(verifiedCount, "bg-green-500")}
//             </div>
//           </div>
//           {/* Rejected */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Rejected
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {rejectedCount ?? "0"}
//               </p>
//               {renderDot(rejectedCount, "bg-red-500")}
//             </div>
//           </div>
//           {/* Skipped */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Skipped
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {skippedCount ?? "0"}
//               </p>
//               {renderDot(skippedCount, "bg-gray-400")}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Link */}
//       <div>
//         <Link
//           href="/admin/kyc-management"
//           className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer"
//         >
//           Manage KYC Verifications →
//         </Link>
//       </div>
//     </div>
//   );
// }

// // frontend/src/components/DashboardSection/KycVerificationCard.tsx
// "use client";

// import React from "react";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import { BsShieldLock } from "react-icons/bs";

// interface KycVerificationCardProps {
//   loading: boolean;
//   error: string | null;
//   notStartedCount?: number;
//   pendingCount?: number;
//   verifiedCount?: number;
//   rejectedCount?: number;
//   skippedCount?: number;
// }

// export default function KycVerificationCard({
//   loading,
//   error,
//   notStartedCount,
//   pendingCount,
//   verifiedCount,
//   rejectedCount,
//   skippedCount,
// }: KycVerificationCardProps) {
//   // Skeleton Loader
//   if (loading) {
//     return (
//       <div className="w-full bg-white dark:bg-white/5 sm:p-6 p-4 rounded-xl border">
//         {/* Header Skeleton */}
//         <div className="flex justify-between items-center">
//           <Skeleton className="h-6 w-1/4 rounded" />{" "}
//           {/* Title: "KYC Verifications" */}
//           <Skeleton className="h-5 w-5 rounded" /> {/* Icon */}
//         </div>
//         {/* Content Rows Skeleton */}
//         <div className="space-y-3.5 mt-2">
//           {/* Row 1 Skeleton (e.g., Not Started) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-28 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 size-4 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 2 Skeleton (e.g., Pending) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-28 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 size-4 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 3 Skeleton (e.g., Verified) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-28 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" />{" "}
//               {/* Count (can be wider for larger numbers) */}
//               <Skeleton className="ml-2 size-4 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 4 Skeleton (e.g., Rejected) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-28 rounded" /> {/* Label */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 size-4 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//           {/* Row 5 Skeleton (e.g., Skipped) */}
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-4 w-28 rounded" />{" "}
//             {/* Label (shorter label like "Skipped") */}
//             <div className="flex items-center">
//               <Skeleton className="h-4 w-8 rounded" /> {/* Count */}
//               <Skeleton className="ml-2 size-4 rounded-full" /> {/* Dot */}
//             </div>
//           </div>
//         </div>
//         {/* Footer Link Skeleton */}
//         <Skeleton className="h-6 w-1/2 mt-6 rounded" />{" "}
//       </div>
//     );
//   }

//   // Error display
//   if (error) {
//     return (
//       <div
//         className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative h-full flex flex-col justify-center"
//         role="alert"
//       >
//         <p className="text-sm font-medium">Error loading KYC Stats:</p>
//         <p className="text-xs mt-1">{error}</p>
//       </div>
//     );
//   }

//   // Helper function for conditional dot rendering
//   const renderDot = (
//     count: number | undefined | null,
//     colorClass: string,
//     options?: { animate?: boolean; showOnZero?: boolean }
//   ) => {
//     const actualCount = count ?? 0;
//     const wantsAnimation = options?.animate ?? false;
//     const shouldShowOnZero = options?.showOnZero ?? false;

//     const showDot = actualCount > 0 || (actualCount === 0 && shouldShowOnZero);

//     if (showDot) {
//       const applyAnimation = actualCount > 0 && wantsAnimation;
//       return (
//         <div
//           className={`ml-2 h-2 w-2 rounded-full ${colorClass} ${
//             applyAnimation ? "animate-pulse" : ""
//           }`}
//         ></div>
//       );
//     }
//     return null;
//   };

//   // Actual Card Content
//   return (
//     <div className="w-full bg-white dark:bg-primarybox sm:p-6 p-4 rounded-xl border h-full flex flex-col justify-between">
//       <div>
//         {" "}
//         {/* Content Wrapper */}
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
//             KYC Verifications
//           </h4>
//           <BsShieldLock className="size-5 text-primary" />
//         </div>
//         <div className="space-y-3">
//           {/* Not Started */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Not Started
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {notStartedCount ?? "0"}
//               </p>
//               {renderDot(notStartedCount, "bg-blue-400", {
//                 showOnZero: true,
//               })}
//             </div>
//           </div>

//           {/* Pending */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Pending
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {pendingCount ?? "0"}
//               </p>
//               {renderDot(pendingCount, "bg-yellow-500", {
//                 animate: true,
//                 showOnZero: true,
//               })}
//             </div>
//           </div>

//           {/* Verified */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Verified
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {verifiedCount ?? "0"}
//               </p>
//               {renderDot(verifiedCount, "bg-green-500", {
//                 showOnZero: true,
//               })}
//             </div>
//           </div>
//           {/* Rejected */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Rejected
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {rejectedCount ?? "0"}
//               </p>
//               {renderDot(rejectedCount, "bg-red-500", {
//                 showOnZero: true,
//               })}
//             </div>
//           </div>
//           {/* Skipped */}
//           <div className="flex justify-between items-center">
//             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//               Skipped
//             </p>
//             <div className="flex items-center">
//               <p className="text-sm font-semibold text-neutral-900 dark:text-white">
//                 {skippedCount ?? "0"}
//               </p>
//               {renderDot(skippedCount, "bg-gray-400", {
//                 showOnZero: true,
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Link */}
//       <div>
//         <Link
//           href="/admin/kyc-management"
//           className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover transition-all duration-75 ease-linear cursor-pointer"
//         >
//           Manage KYC Verifications →
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { BsShieldLock } from "react-icons/bs"; // Keep import as it's used in the final view
import { AlertCircle } from "lucide-react";

interface KycVerificationCardProps {
  loading: boolean;
  error: string | null;
  notStartedCount?: number;
  pendingCount?: number;
  verifiedCount?: number;
  rejectedCount?: number;
  skippedCount?: number;
}

export default function KycVerificationCard({
  loading,
  error,
  notStartedCount,
  pendingCount,
  verifiedCount,
  rejectedCount,
  skippedCount,
}: KycVerificationCardProps) {
  // Skeleton Loader - Adjusted to match final layout more closely
  if (loading) {
    return (
      // Outer container matches the actual card's padding, border, etc.
      <div className="w-full bg-primarybox sm:p-6 p-4 rounded-xl h-full flex flex-col justify-between">
        {" "}
        {/* Added h-full and flex column layout */}
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-4">
          {" "}
          {/* Added mb-4 to match actual header spacing */}
          <Skeleton className="h-6 w-1/3 rounded-md bg-background/50" />{" "}
          {/* Title: "KYC Verifications", slightly wider w-1/3 */}
          <Skeleton className="size-12 rounded-full bg-background/50" />{" "}
          {/* Icon, rounded-full to match dot style */}
        </div>
        {/* Content Rows Skeleton */}
        {/* space-y-3 matches the actual content's spacing */}
        <div className="space-y-4 flex-grow">
          {" "}
          {/* Use flex-grow to fill available space like the actual content wrapper */}
          {/* Row Skeletons (5 rows matching Not Started, Pending, etc.) */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <Skeleton className="h-4 w-28 rounded-md bg-background/50" />{" "}
              {/* Label */}
              <div className="flex items-center">
                <Skeleton className="h-4 w-8 rounded-md bg-background/50" />{" "}
                {/* Count */}
                {/* Dot Skeleton: size-2 matches the actual dot size */}
                <Skeleton className="ml-2 size-2 rounded-full bg-background/50" />
              </div>
            </div>
          ))}
        </div>
        {/* Footer Link Skeleton */}
        {/* mt-6 matches the margin before the actual link */}
        <div className="mt-6">
          {" "}
          {/* Wrap in a div to match the footer structure */}
          <Skeleton className="h-5 w-1/3 rounded-md bg-background/50" />{" "}
          {/* Adjusted height to h-5 for link appearance */}
        </div>
      </div>
    );
  }

  // Error display
  if (error) {
    return (
      <div
        className="w-full flex relative justify-center items-center  bg-red-900/25 border sm:order-1 order-2 border-red-500 px-5 py-4 rounded-xl"
        role="alert"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
            <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
          </div>

          <div className="flex-1">
            <h4 className="font-medium sm:text-2xl text-xl text-red-600 capitalize">
              Error loading KYC Stats
            </h4>

            <p className="text-sm mt-2 text-red-300/90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function for conditional dot rendering
  const renderDot = (
    count: number | undefined | null,
    colorClass: string,
    options?: { animate?: boolean; showOnZero?: boolean }
  ) => {
    const actualCount = count ?? 0;
    const wantsAnimation = options?.animate ?? false;
    const shouldShowOnZero = options?.showOnZero ?? false;

    const showDot = actualCount > 0 || (actualCount === 0 && shouldShowOnZero);

    if (showDot) {
      const applyAnimation = actualCount > 0 && wantsAnimation;
      return (
        <div
          className={`ml-2 size-2 rounded-full ${colorClass} ${
            applyAnimation ? "animate-pulse" : ""
          }`}
        ></div>
      );
    }
    return null;
  };

  // Actual Card Content
  return (
    <div className="w-full bg-primarybox sm:p-6 p-4 rounded-xl h-full flex flex-col justify-between">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium text-mainheadingWhite">
            KYC Verifications
          </h1>

          <div className="size-12 shrink-0 bg-primary rounded-full flex items-center justify-center">
            <BsShieldLock className="size-6 text-mainheading" />
          </div>
        </div>

        <div className="space-y-4">
          {" "}
          {/* space-y-3 matches skeleton */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-mainheadingWhite">
              Not Started
            </p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-subheadingWhite">
                {notStartedCount ?? "0"}
              </p>
              {renderDot(notStartedCount, "bg-blue-400", {
                showOnZero: true,
              })}
            </div>
          </div>
          {/* Pending */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-mainheadingWhite">Pending</p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-subheadingWhite">
                {pendingCount ?? "0"}
              </p>
              {renderDot(pendingCount, "bg-yellow-500", {
                animate: true,
                showOnZero: true,
              })}
            </div>
          </div>
          {/* Verified */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-mainheadingWhite">
              Verified
            </p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-subheadingWhite">
                {verifiedCount ?? "0"}
              </p>
              {renderDot(verifiedCount, "bg-green-500", {
                showOnZero: true,
              })}
            </div>
          </div>
          {/* Rejected */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-mainheadingWhite">
              Rejected
            </p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-subheadingWhite">
                {rejectedCount ?? "0"}
              </p>
              {renderDot(rejectedCount, "bg-red-500", {
                showOnZero: true,
              })}
            </div>
          </div>
          {/* Skipped */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-mainheadingWhite">Skipped</p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-subheadingWhite">
                {skippedCount ?? "0"}
              </p>
              {renderDot(skippedCount, "bg-gray-400", {
                showOnZero: true,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div>
        {" "}
        {/* Wrapper div matches skeleton */}
        <Link
          href="/admin/kyc-management"
          className="mt-6 inline-block text-primary text-sm font-medium hover:text-primaryhover hover:underline underline-offset-2 transition-all duration-75 ease-linear cursor-pointer" // mt-6 matches skeleton
        >
          Manage KYC Verifications →
        </Link>
      </div>
    </div>
  );
}
