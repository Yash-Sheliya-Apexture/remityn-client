// // src/app/components/ui/AccountVerification.tsx
// import Link from "next/link";
// import React from "react";
// // Import MdWarningAmber for rejected status
// import { MdOutlineError, MdWarningAmber } from "react-icons/md";

// // --- Define Props Interface ---
// interface AccountVerificationProps {
//     isRejected?: boolean; // Make optional, default to false
//     reason?: string | null; // Allow null or undefined
// }

// // --- Use Props Interface ---
// export default function AccountVerification({
//     isRejected = false, // Default value if prop not passed
//     reason
// }: AccountVerificationProps) { // Apply the interface

//     // --- Dynamic Content Based on Props ---
//     const title = isRejected ? "Verification Required" : "Verify Your Account";
//     const message = isRejected
//         ? `Your previous verification attempt was rejected.${reason ? ` Reason: ${reason}` : ''} Please review and resubmit.`
//         : "Verify your account to start receiving money and access all features.";
//     const linkText = isRejected ? "Resubmit Verification" : "Verify Now";
//     // Choose icon and colors based on isRejected
//     const IconComponent = isRejected ? MdWarningAmber : MdOutlineError;
//     const iconColor = isRejected ? "text-red-500" : "text-yellow-500";
//     const bgColor = isRejected ? "bg-red-100 dark:bg-red-900/30" : "bg-lightgray dark:bg-primarybox";
//     const linkPath = "/kyc/start"; // Always start the flow again

//   return (
//     // Consider adding margin if needed, e.g., mb-4 or mb-6
//     <div className="Verify-Banner mb-6">
//       {/* Container removed previously, assuming layout handles it */}
//       {/* <div className="container mx-auto"> */}
//         <div className={`${bgColor} rounded-2xl p-4 w-full`}> {/* Ensure it takes available width */}
//           <div className="flex items-start gap-3">
//             {/* Icon */}
//             <div className="rounded-full flex items-center justify-center shrink-0"> {/* Added shrink-0 */}
//               <IconComponent size={40} className={iconColor}/>
//             </div>

//             {/* Text and Button */}
//             <div className="flex flex-col items-start gap-2 flex-grow"> {/* Added flex-grow */}
//                 <p className="font-medium text-neutral-900 dark:text-white">{title}</p>
//               <p className="text-sm text-neutral-700 dark:text-gray-300">
//                 {message}
//               </p>
//               <Link
//                  href={linkPath}
//                  className="text-green dark:text-primary font-semibold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-green dark:after:bg-primary after:mt-0.5"
//                >
//                 {linkText}
//               </Link>
//             </div>
//           </div>
//         </div>
//       {/* </div> */}
//     </div>
//   );
// }

// // src/app/components/ui/AccountVerification.tsx
// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Props Interface ---
// interface AccountVerificationProps {
//     isRejected?: boolean; // If KYC status is 'rejected'
//     reason?: string | null; // Rejection reason (only relevant if isRejected is true)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ isRejected = false, reason }: AccountVerificationProps) {

//     // Determine content based on props
//     const title = isRejected ? "Verification Action Required" : "Verify Your Account";
//     const message = isRejected
//         ? `Your previous verification attempt requires attention.${reason ? ` Reason: ${reason}` : ' Please review common issues and try again.'}`
//         : "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//     const linkText = isRejected ? "Retry Verification" : "Start Verification";
//     const linkPath = "/kyc/start"; // Link to the start of the KYC flow

//     // Determine styles based on rejection status
//     const IconComponent = isRejected ? AlertTriangle : AlertCircle;
//     const iconColor = isRejected ? "text-destructive" : "text-yellow-600 dark:text-yellow-400";
//     const bgColor = isRejected ? "bg-destructive/10 dark:bg-destructive/20 border-destructive/30" : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40";
//     const titleColor = isRejected ? "text-destructive dark:text-red-300" : "text-yellow-800 dark:text-yellow-200";
//     const messageColor = isRejected ? "text-destructive/90 dark:text-red-300/80" : "text-yellow-700 dark:text-yellow-300/90";
//     const linkColor = isRejected ? "text-destructive hover:text-destructive/80" : "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300";

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", bgColor)} role="alert"> {/* Added shadow */}
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{isRejected ? 'Warning' : 'Info'}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", messageColor)}>
//                     {message}
//                 </p>
//                 <Link
//                      href={linkPath}
//                      className={cn(
//                         "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                         linkColor
//                     )}
//                  >
//                     {linkText}
//                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                 </Link>
//             </div>
//         </div>
//     </div>
//   );
// }

// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Props Interface ---
// interface AccountVerificationProps {
//     isRejected?: boolean; // If KYC status is 'rejected'
//     reason?: string | null; // Rejection reason (only relevant if isRejected is true)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ isRejected = false, reason }: AccountVerificationProps) {

//     // Determine content based on props
//     const title = isRejected ? "Verification Action Required" : "Verify Your Account";
//     // Provide a more specific default message if reason is null/undefined when rejected
//     const defaultRejectionMessage = 'Please review common issues (e.g., document clarity, validity) and try again.';
//     const message = isRejected
//         ? `Your previous verification attempt requires attention.${reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`}`
//         : "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//     const linkText = isRejected ? "Retry Verification" : "Start Verification";
//     const linkPath = "/kyc/start"; // Link to the start of the KYC flow

//     // Determine styles based on rejection status
//     const IconComponent = isRejected ? AlertTriangle : AlertCircle;
//     const iconColor = isRejected ? "text-destructive" : "text-yellow-600 dark:text-yellow-400";
//     const bgColor = isRejected ? "bg-destructive/10 dark:bg-destructive/20 border-destructive/30" : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40";
//     const titleColor = isRejected ? "text-destructive dark:text-red-300" : "text-yellow-800 dark:text-yellow-200";
//     const messageColor = isRejected ? "text-destructive/90 dark:text-red-300/80" : "text-yellow-700 dark:text-yellow-300/90";
//     const linkColor = isRejected ? "text-destructive hover:text-destructive/80" : "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300";

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", bgColor)} role="alert"> {/* Added shadow */}
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{isRejected ? 'Warning' : 'Info'}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", messageColor)}>
//                     {message}
//                 </p>
//                 <Link
//                      href={linkPath}
//                      className={cn(
//                         "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                         linkColor
//                     )}
//                  >
//                     {linkText}
//                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                 </Link>
//             </div>
//         </div>
//     </div>
//   );
// }

// // src/app/components/ui/AccountVerification.tsx
// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight, Clock, Info, RefreshCw } from "lucide-react"; // Added Clock, Info, RefreshCw
// import { cn } from "@/lib/utils";
// import type { KycStatus } from "@/app/services/kyc"; // Import the type

// // --- Props Interface ---
// interface AccountVerificationProps {
//     status: KycStatus | null | undefined; // Receive the actual status
//     reason?: string | null; // Rejection reason (only relevant if rejected)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ status, reason }: AccountVerificationProps) {

//     let title = "Account Verification";
//     let message = "Complete account verification to unlock all features.";
//     let linkText = "Start Verification";
//     let linkPath = "/kyc/start";
//     let IconComponent: React.ElementType = AlertCircle;
//     let variant: 'warning' | 'destructive' | 'info' | 'pending' = 'warning'; // Default to warning

//     // --- Determine content based on status ---
//     switch (status) {
//         case 'not_started':
//             title = "Verify Your Account";
//             message = "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = AlertCircle;
//             variant = 'warning';
//             break;

//         case 'skipped':
//             title = "Complete Verification";
//             message = "You skipped verification earlier. Complete it now to access all account features and enhance security.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = Info; // Use Info icon
//             variant = 'info';
//             break;

//         case 'pending':
//             title = "Verification Pending";
//             message = "Your documents are under review. This usually takes 1-2 business days. We'll notify you upon completion.";
//             linkText = "Check Status"; // Or "View Details" maybe?
//             linkPath = "/kyc/pending"; // Link to pending page
//             IconComponent = Clock; // Use Clock icon
//             variant = 'pending';
//             break;

//         case 'rejected':
//             title = "Verification Action Required";
//             const defaultRejectionMessage = 'Please review common issues (e.g., document clarity, validity) and try again.';
//             message = `Your previous verification attempt requires attention.${reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`}`;
//             linkText = "Retry Verification";
//             linkPath = "/kyc/start"; // Still links to start for retry
//             IconComponent = AlertTriangle;
//             variant = 'destructive';
//             break;

//         case 'verified':
//              // Should not happen as parent component prevents rendering if verified
//              console.warn("AccountVerification rendered with status 'verified'. This should not happen.");
//              return null; // Render nothing if somehow called with 'verified'

//         default:
//              // Handle null, undefined, or unexpected status
//              console.warn(`AccountVerification rendered with unexpected status: ${status}`);
//              // Optionally show a generic message or nothing
//              title = "Verification Status Unknown";
//              message = "Could not determine verification status. Please check your profile or contact support.";
//              linkText = "Contact Support";
//              linkPath = "/support"; // Example link
//              IconComponent = AlertCircle;
//              variant = 'warning';
//              break; // Or return null
//     }

//     // --- Determine styles based on variant ---
//     const styles = {
//         warning: {
//             iconColor: "text-yellow-600 dark:text-yellow-400",
//             bgColor: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40",
//             titleColor: "text-yellow-800 dark:text-yellow-200",
//             messageColor: "text-yellow-700 dark:text-yellow-300/90",
//             linkColor: "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
//         },
//         destructive: {
//             iconColor: "text-destructive",
//             bgColor: "bg-destructive/10 dark:bg-destructive/20 border-destructive/30",
//             titleColor: "text-destructive dark:text-red-300",
//             messageColor: "text-destructive/90 dark:text-red-300/80",
//             linkColor: "text-destructive hover:text-destructive/80"
//         },
//         info: { // Styles for 'skipped'
//             iconColor: "text-blue-600 dark:text-blue-400",
//             bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/40",
//             titleColor: "text-blue-800 dark:text-blue-200",
//             messageColor: "text-blue-700 dark:text-blue-300/90",
//             linkColor: "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//         },
//         pending: { // Styles for 'pending'
//             iconColor: "text-cyan-600 dark:text-cyan-400",
//             bgColor: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700/40",
//             titleColor: "text-cyan-800 dark:text-cyan-200",
//             messageColor: "text-cyan-700 dark:text-cyan-300/90",
//             linkColor: "text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
//         }
//     };

//     const currentStyles = styles[variant];

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", currentStyles.bgColor)} role="alert">
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", currentStyles.iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{variant.charAt(0).toUpperCase() + variant.slice(1)}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", currentStyles.titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", currentStyles.messageColor)}>
//                     {message}
//                 </p>
//                 {/* Only show link if status is not 'pending' or has a specific action */}
//                  {(status !== 'pending' || linkPath === '/kyc/pending') && (
//                     <Link
//                          href={linkPath}
//                          className={cn(
//                             "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                             currentStyles.linkColor
//                         )}
//                     >
//                         {linkText}
//                          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                     </Link>
//                  )}
//                  {/* Optionally add a refresh button for pending status */}
//                  {/* {status === 'pending' && <Button variant="link" size="sm" className={cn("p-0 h-auto mt-1", currentStyles.linkColor)}><RefreshCw className="h-3 w-3 mr-1"/>Refresh</Button>} */}
//             </div>
//         </div>
//     </div>
//   );
// }

// // src/app/components/ui/AccountVerification.tsx
// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight, Clock, Info, RefreshCw } from "lucide-react"; // Added Clock, Info, RefreshCw
// import { cn } from "@/lib/utils";
// import type { KycStatus } from "@/app/services/kyc"; // Import the type

// // --- Props Interface ---
// interface AccountVerificationProps {
//     status: KycStatus | null | undefined; // Receive the actual status
//     reason?: string | null; // Rejection reason (only relevant if rejected)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ status, reason }: AccountVerificationProps) {

//     let title = "Account Verification";
//     let message = "Complete account verification to unlock all features.";
//     let linkText = "Start Verification";
//     let linkPath = "/kyc/start";
//     let IconComponent: React.ElementType = AlertCircle;
//     let variant: 'warning' | 'destructive' | 'info' | 'pending' = 'warning'; // Default to warning

//     // --- Determine content based on status ---
//     switch (status) {
//         case 'not_started':
//             title = "Verify Your Account";
//             message = "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = AlertCircle;
//             variant = 'warning';
//             break;

//         case 'skipped':
//             title = "Complete Verification";
//             message = "You skipped verification earlier. Complete it now to access all account features and enhance security.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = Info;
//             variant = 'info';
//             break;

//         case 'pending':
//             title = "Verification Pending";
//             message = "Your documents are under review. This usually takes 1-2 business days. We'll notify you upon completion.";
//             linkText = "Check Status";
//             linkPath = "/kyc/pending";
//             IconComponent = Clock;
//             variant = 'pending';
//             break;

//         case 'rejected':
//             title = "Verification Action Required";
//             const defaultRejectionMessage = 'Please review common issues (e.g., document clarity, validity) and try again.';
//             message = `Your previous verification attempt requires attention.${reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`}`;
//             linkText = "Retry Verification";
//             linkPath = "/kyc/start"; // Links to start for retry
//             IconComponent = AlertTriangle;
//             variant = 'destructive';
//             break;

//         case 'verified':
//              console.warn("AccountVerification rendered with status 'verified'. This should not happen.");
//              return null; // Render nothing if somehow called with 'verified'

//         default:
//              console.warn(`AccountVerification rendered with unexpected status: ${status}`);
//              title = "Verification Status Unknown";
//              message = "Could not determine verification status. Please check your profile or contact support.";
//              linkText = "Contact Support";
//              linkPath = "/support";
//              IconComponent = AlertCircle;
//              variant = 'warning';
//              // return null; // Or render a generic message as above
//              break;
//     }

//     // --- Determine styles based on variant ---
//     const styles = {
//         warning: { iconColor: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40", titleColor: "text-yellow-800 dark:text-yellow-200", messageColor: "text-yellow-700 dark:text-yellow-300/90", linkColor: "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300" },
//         destructive: { iconColor: "text-destructive", bgColor: "bg-destructive/10 dark:bg-destructive/20 border-destructive/30", titleColor: "text-destructive dark:text-red-300", messageColor: "text-destructive/90 dark:text-red-300/80", linkColor: "text-destructive hover:text-destructive/80" },
//         info: { iconColor: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/40", titleColor: "text-blue-800 dark:text-blue-200", messageColor: "text-blue-700 dark:text-blue-300/90", linkColor: "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" },
//         pending: { iconColor: "text-cyan-600 dark:text-cyan-400", bgColor: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700/40", titleColor: "text-cyan-800 dark:text-cyan-200", messageColor: "text-cyan-700 dark:text-cyan-300/90", linkColor: "text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300" }
//     };
//     const currentStyles = styles[variant];

//     // Don't render if status is null/undefined and it's not explicitly handled as 'unknown'
//     if (!status && variant !== 'warning') return null;

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", currentStyles.bgColor)} role="alert">
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", currentStyles.iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{variant.charAt(0).toUpperCase() + variant.slice(1)}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", currentStyles.titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", currentStyles.messageColor)}>
//                     {message}
//                 </p>
//                 {/* Only show link if not pending OR link points to pending page */}
//                  {(status !== 'pending' || linkPath === '/kyc/pending') && (
//                     <Link
//                          href={linkPath}
//                          className={cn(
//                             "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                             currentStyles.linkColor
//                         )}
//                     >
//                         {linkText}
//                          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                     </Link>
//                  )}
//             </div>
//         </div>
//     </div>
//   );
// }

// // src/app/components/ui/AccountVerification.tsx
// // No changes needed here. It correctly displays based on the props received.
// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight, Clock, Info, RefreshCw } from "lucide-react"; // Added Clock, Info, RefreshCw
// import { cn } from "@/lib/utils";
// import type { KycStatus } from "@/app/services/kyc"; // Import the type

// // --- Props Interface ---
// interface AccountVerificationProps {
//     status: KycStatus | null | undefined; // Receive the actual status
//     reason?: string | null; // Rejection reason (only relevant if rejected)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ status, reason }: AccountVerificationProps) {

//     let title = "Account Verification";
//     let message = "Complete account verification to unlock all features.";
//     let linkText = "Start Verification";
//     let linkPath = "/kyc/start";
//     let IconComponent: React.ElementType = AlertCircle;
//     let variant: 'warning' | 'destructive' | 'info' | 'pending' = 'warning'; // Default to warning

//     // --- Determine content based on status ---
//     switch (status) {
//         case 'not_started':
//             title = "Verify Your Account";
//             message = "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = AlertCircle;
//             variant = 'warning';
//             break;

//         case 'skipped':
//             title = "Complete Verification";
//             message = "You skipped verification earlier. Complete it now to access all account features and enhance security.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = Info;
//             variant = 'info';
//             break;

//         case 'pending':
//             title = "Verification Pending";
//             message = "Your documents are under review. This usually takes 1-2 business days. We'll notify you upon completion.";
//             linkText = "Check Status"; // Link still relevant for pending
//             linkPath = "/kyc/pending";
//             IconComponent = Clock;
//             variant = 'pending';
//             break;

//         case 'rejected':
//             title = "Verification Action Required";
//             const defaultRejectionMessage = 'Please review common issues (e.g., document clarity, validity) and try again.';
//             message = `Your previous verification attempt requires attention.${reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`}`;
//             linkText = "Retry Verification";
//             linkPath = "/kyc/start"; // Links to start for retry
//             IconComponent = AlertTriangle;
//             variant = 'destructive';
//             break;

//         case 'verified':
//              // This component should not be rendered if status is verified (handled in MainDashboard)
//              // console.warn("AccountVerification rendered with status 'verified'. Should be hidden by parent.");
//              return null; // Render nothing

//         default:
//              console.warn(`AccountVerification rendered with unexpected status: ${status}`);
//              // Provide a generic message but keep it distinct
//              title = "Verification Status Unknown";
//              message = "We couldn't determine your current verification status. Please refresh or contact support if this persists.";
//              linkText = "Contact Support"; // Make link actionable
//              linkPath = "/support"; // Or relevant support page
//              IconComponent = AlertCircle;
//              variant = 'warning'; // Use warning for unknown/error state
//              // Decide if you want to show this generic banner or return null
//              // return null; // Option to hide completely
//              break;
//     }

//     // --- Determine styles based on variant ---
//     const styles = {
//         warning: { iconColor: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40", titleColor: "text-yellow-800 dark:text-yellow-200", messageColor: "text-yellow-700 dark:text-yellow-300/90", linkColor: "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300" },
//         destructive: { iconColor: "text-destructive", bgColor: "bg-destructive/10 dark:bg-destructive/20 border-destructive/30", titleColor: "text-destructive dark:text-red-300", messageColor: "text-destructive/90 dark:text-red-300/80", linkColor: "text-destructive hover:text-destructive/80" },
//         info: { iconColor: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/40", titleColor: "text-blue-800 dark:text-blue-200", messageColor: "text-blue-700 dark:text-blue-300/90", linkColor: "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" },
//         pending: { iconColor: "text-cyan-600 dark:text-cyan-400", bgColor: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700/40", titleColor: "text-cyan-800 dark:text-cyan-200", messageColor: "text-cyan-700 dark:text-cyan-300/90", linkColor: "text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300" }
//     };
//     const currentStyles = styles[variant];

//     // Don't render if status is invalid and not handled as 'unknown'
//     if (!status && variant !== 'warning') return null;

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", currentStyles.bgColor)} role="alert">
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", currentStyles.iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{variant.charAt(0).toUpperCase() + variant.slice(1)}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", currentStyles.titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", currentStyles.messageColor)}>
//                     {message}
//                 </p>
//                 {/* Link logic remains the same */}
//                  <Link
//                      href={linkPath}
//                      className={cn(
//                         "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                         currentStyles.linkColor
//                     )}
//                  >
//                     {linkText}
//                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                  </Link>
//             </div>
//         </div>
//     </div>
//   );
// }

// // frontend/src/app/components/ui/AccountVerification.tsx
// import Link from "next/link";
// import React from "react";
// import { AlertCircle, AlertTriangle, ArrowRight, Clock, Info, RefreshCw } from "lucide-react"; // Added Clock, Info, RefreshCw
// import { cn } from "@/lib/utils";
// import type { KycStatus } from "@/app/services/kyc"; // Import the type

// // --- Props Interface ---
// interface AccountVerificationProps {
//     status: KycStatus | null | undefined; // Receive the actual status
//     reason?: string | null; // Rejection reason (only relevant if rejected)
// }

// // --- Account Verification Banner Component ---
// export default function AccountVerification({ status, reason }: AccountVerificationProps) {

//     let title = "Account Verification";
//     let message = "Complete account verification to unlock all features.";
//     let linkText = "Start Verification";
//     let linkPath = "/kyc/start";
//     let IconComponent: React.ElementType = AlertCircle;
//     let variant: 'warning' | 'destructive' | 'info' | 'pending' = 'warning'; // Default to warning

//     // --- Determine content based on status ---
//     switch (status) {
//         case 'not_started':
//             title = "Verify Your Account";
//             message = "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start";
//             IconComponent = AlertCircle;
//             variant = 'warning';
//             break;

//         case 'skipped':
//             title = "Complete Verification";
//             message = "You skipped verification earlier. Complete it now to access all account features and enhance security.";
//             linkText = "Start Verification";
//             linkPath = "/kyc/start"; // Go to start page to initiate
//             IconComponent = Info;
//             variant = 'info';
//             break;

//         case 'pending':
//             title = "Verification Pending";
//             message = "Your documents are under review. This usually takes 1-2 business days. We'll notify you upon completion.";
//             linkText = "Check Status"; // Link to pending page
//             linkPath = "/kyc/pending";
//             IconComponent = Clock;
//             variant = 'pending';
//             break;

//         case 'rejected':
//             title = "Verification Action Required";
//             const defaultRejectionMessage = 'Please review common issues (e.g., document clarity, validity) and try again.';
//             // Construct message including the reason if available
//             message = `Your verification attempt requires attention.${reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`}`;
//             linkText = "Retry Verification";
//             linkPath = "/kyc/start"; // Links to start page for retry flow
//             IconComponent = AlertTriangle;
//             variant = 'destructive';
//             break;

//         case 'verified':
//              // This component should not be rendered if status is verified
//              // This is handled by the parent component (MainDashboard)
//              // console.warn("AccountVerification rendered with status 'verified'. Should be hidden by parent.");
//              return null; // Render nothing

//         default:
//              // Handle null, undefined, or unexpected status values
//              console.warn(`AccountVerification rendered with unexpected or missing status: ${status}`);
//              title = "Verification Status Unknown";
//              message = "We couldn't determine your current verification status. Please refresh or contact support if this persists.";
//              linkText = "Contact Support"; // Actionable link
//              linkPath = "/support";
//              IconComponent = AlertCircle;
//              variant = 'warning'; // Use warning for unknown/error state
//              // Decide whether to show this generic banner or hide completely
//              // return null; // Option to hide completely if status is truly unknown/invalid
//              break;
//     }

//     // --- Determine styles based on variant ---
//     const styles = {
//         warning: { iconColor: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/40", titleColor: "text-yellow-800 dark:text-yellow-200", messageColor: "text-yellow-700 dark:text-yellow-300/90", linkColor: "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300" },
//         destructive: { iconColor: "text-destructive", bgColor: "bg-destructive/10 dark:bg-destructive/20 border-destructive/30", titleColor: "text-destructive dark:text-red-300", messageColor: "text-destructive/90 dark:text-red-300/80", linkColor: "text-destructive hover:text-destructive/80" },
//         info: { iconColor: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/40", titleColor: "text-blue-800 dark:text-blue-200", messageColor: "text-blue-700 dark:text-blue-300/90", linkColor: "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" },
//         pending: { iconColor: "text-cyan-600 dark:text-cyan-400", bgColor: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700/40", titleColor: "text-cyan-800 dark:text-cyan-200", messageColor: "text-cyan-700 dark:text-cyan-300/90", linkColor: "text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300" }
//     };
//     const currentStyles = styles[variant];

//     // Don't render if status is null/undefined and not handled as 'unknown' warning
//     // if (!status && variant !== 'warning') return null; // Already handled by switch default potentially returning null or rendering warning

//   return (
//     <div className={cn("Verify-Banner rounded-lg border p-4 shadow-sm", currentStyles.bgColor)} role="alert">
//         <div className="flex items-start gap-3 sm:gap-4">
//             {/* Icon */}
//             <div className={cn("flex-shrink-0 mt-0.5", currentStyles.iconColor)}>
//                 <IconComponent aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">{variant.charAt(0).toUpperCase() + variant.slice(1)}</span>
//             </div>

//             {/* Text and Link */}
//             <div className="flex-grow">
//                  <h3 className={cn("text-sm sm:text-base font-semibold", currentStyles.titleColor)}>
//                     {title}
//                 </h3>
//                 <p className={cn("text-xs sm:text-sm mt-1", currentStyles.messageColor)}>
//                     {message}
//                 </p>
//                 {/* Link */}
//                  <Link
//                      href={linkPath}
//                      className={cn(
//                         "inline-flex items-center gap-1 text-sm font-semibold mt-2 group transition-colors duration-150",
//                         currentStyles.linkColor
//                     )}
//                  >
//                     {linkText}
//                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
//                  </Link>
//             </div>
//         </div>
//     </div>
//   );
// }

// frontend/src/app/components/ui/AccountVerification.tsx
import Link from "next/link";
import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Clock,
  Info,
  RefreshCw,
} from "lucide-react"; // Added Clock, Info, RefreshCw
import { cn } from "@/lib/utils";
import type { KycStatus } from "@/app/services/kyc"; // Import the type

// --- Props Interface ---
interface AccountVerificationProps {
  status: KycStatus | null | undefined; // Receive the actual status
  reason?: string | null; // Rejection reason (only relevant if rejected)
}

// --- Account Verification Banner Component ---
export default function AccountVerification({
  status,
  reason,
}: AccountVerificationProps) {
  let title = "Account Verification";
  let message = "Complete account verification to unlock all features.";
  let linkText = "Start Verification";
  let linkPath = "/kyc/start"; // Default start path
  let IconComponent: React.ElementType = AlertCircle;
  let variant: "warning" | "destructive" | "info" | "pending" = "warning"; // Default to warning

  // --- Determine content based on status ---
  switch (status) {
    case "not_started":
      title = "Verify Your Account";
      message =
        "Complete account verification to unlock all features, including sending higher amounts and receiving money in different currencies.";
      linkText = "Start Verification";
      linkPath = "/kyc/start";
      IconComponent = AlertCircle;
      variant = "warning";
      break;

    case "skipped":
      title = "Complete Verification";
      message =
        "You skipped verification earlier. Complete it now to access all account features and enhance security.";
      linkText = "Start Verification";
      linkPath = "/kyc/start"; // Go to start page to initiate
      IconComponent = Info;
      variant = "info";
      break;

    case "pending":
      title = "Verification Pending";
      message =
        "Your documents are under review. This usually takes 1-2 business days. We'll notify you upon completion.";
      linkText = "Check Status"; // Link to pending page (optional, could also be disabled)
      linkPath = "/kyc/pending"; // Link to pending status page
      IconComponent = Clock;
      variant = "pending";
      break;

    case "rejected":
      title = "Verification Action Required";
      const defaultRejectionMessage =
        "Please review common issues (e.g., document clarity, validity) and try again.";
      // Construct message including the reason if available
      message = `Your verification attempt requires attention.${
        reason ? ` Reason: ${reason}` : ` ${defaultRejectionMessage}`
      }`;
      linkText = "Retry Verification";
      linkPath = "/kyc/start"; // CRITICAL: Link to start page for retry flow
      IconComponent = AlertTriangle;
      variant = "destructive";
      break;

    case "verified":
      // This component should not be rendered if status is verified
      // This is handled by the parent component (MainDashboard) checking kycStatus !== 'verified'
      // console.warn("AccountVerification rendered with status 'verified'. Should be hidden by parent.");
      return null; // Render nothing

    default:
      // Handle null, undefined, or unexpected status values gracefully
      console.warn(
        `AccountVerification rendered with unexpected or missing status: '${status}'`
      );
      title = "Verification Status Unavailable";
      message =
        "We couldn't determine your current verification status at the moment. Please try refreshing later.";
      linkText = "Go to Dashboard"; // Provide a neutral action
      linkPath = "/dashboard";
      IconComponent = AlertCircle;
      variant = "warning"; // Use warning for unknown/error state
      // Decide whether to show this generic banner or hide completely
      // return null; // Option to hide completely if status is truly unknown/invalid
      break;
  }

  // --- Determine styles based on variant ---
  const styles = {
    warning: {
      iconColor: "text-yellow-600 dark:text-yellow-500",
      iconbg: "bg-yellow-600/20",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/25  border-yellow-500",
      titleColor: "text-yellow-800 dark:text-yellow-200",
      messageColor: "text-yellow-700 dark:text-yellow-300/90",
      linkColor:
        "text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300",
    },
    destructive: {
        iconColor: "text-red-600 dark:text-red-500",
        iconbg: "bg-red-600/20",
        bgColor:
          "bg-red-50 dark:bg-red-900/25 border-red-500",
        titleColor: "text-red-800 dark:text-red-200",
        messageColor: "text-red/700 dark:text-red-300/90",
        linkColor:
          "text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300",
    },
    info: {
        iconColor: "text-blue-600 dark:text-blue-500",
        iconbg : "bg-blue-600/20",
        bgColor:
          "bg-blue-50 dark:bg-blue-900/25 border-blue border-blue-500",
        titleColor: "text-blue-800 dark:text-blue-200",
        messageColor: "text-blue-700 dark:text-blue-300/90",
        linkColor:
          "text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
    },
    pending: {
      iconColor: "text-cyan-600 dark:text-cyan-500",
      iconbg: "bg-cyan-600/20",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/25 border-cyan-500",
      titleColor: "text-cyan-800 dark:text-cyan-200",
      messageColor: "text-cyan-700 dark:text-cyan-300/90",
      linkColor:
        "text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300",
    },
  };
  const currentStyles = styles[variant];


  return (
    <div
      className={cn(
        "Verify-Banner rounded-xl sm:p-6 p-4 border",
        currentStyles.bgColor
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}

        <div
          className={cn(
            `flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center`,
            currentStyles.iconColor,
            currentStyles.iconbg
          )}
        >
          <IconComponent aria-hidden="true" className="size-5 sm:size-6" />
          <span className="sr-only">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </span>
        </div>

        {/* Text and Link */}
        <div className="flex-grow space-y-1">
          <h3
            className={cn(
              "text-base sm:text-lg font-semibold",
              currentStyles.titleColor
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "text-sm sm:text-base mb-2",
              currentStyles.messageColor
            )}
          >
            {message}
          </p>

          {/* Link */}
          <Link
            href={linkPath}
            className={cn(
              "inline-flex items-center sm:text-base text-sm group transition-all ease-linear duration-200",
              currentStyles.linkColor
            )}
          >
            {linkText}
            <ArrowRight
              aria-hidden="true"
              className="transition-transform size-4 duration-200 ease-linear group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
