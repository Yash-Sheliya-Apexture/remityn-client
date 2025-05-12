// // frontend/src/app/kyc/review/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useKyc } from '../../contexts/KycContext';
// import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react';
// import kycService from '@/app/services/kyc';
// import type { KycSubmissionPayload } from '@/app/services/kyc';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { format } from 'date-fns'; // For formatting dates

// // Helper to display data nicely
// const DetailItem = ({ label, value }: { label: string, value?: string | null | React.ReactNode }) => {
//     if (!value) return null;
//     return (
//         <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
//             <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{value}</dd>
//         </div>
//     );
// };

// // Helper function from upload page (or move to utils)
// const isDataComplete = (data: any): data is KycSubmissionPayload => {
//      return (
//         data.firstName && data.lastName && data.dateOfBirth && data.mobile?.number &&
//         data.nationality && data.idType && data.idNumber && data.idIssueDate && data.idExpiryDate &&
//         data.idFrontFile // Check if file object exists (even if transiently)
//         // Add check for idBackFile if resident permit
//         && (data.idType !== 'resident_permit' || data.idBackFile)
//     );
// };

// export default function KycReviewPage() {
//     const router = useRouter();
//     const { kycData, prevStep, goToStep, resetKycProgress } = useKyc();
//      const { refetchUser } = useAuth();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);

//     useEffect(() => {
//         goToStep('review'); // Set current step
//     }, [goToStep]);

//     // Check if data is complete before allowing review/submit
//      useEffect(() => {
//         if (!isDataComplete(kycData)) {
//              console.warn("KYC data incomplete for review, redirecting to start.");
//              router.replace('/kyc/start');
//          }
//      }, [kycData, router]);

//     const handleSubmit = async () => {
//         setIsSubmitting(true);
//         setSubmitError(null);

//          if (!isDataComplete(kycData)) {
//              setSubmitError("Incomplete information. Please go back and fill all required fields.");
//              setIsSubmitting(false);
//              return;
//          }

//          // Prepare payload
//          const submissionData: KycSubmissionPayload = {
//              firstName: kycData.firstName!, lastName: kycData.lastName!,
//              dateOfBirth: kycData.dateOfBirth!, mobile: kycData.mobile!,
//              occupation: kycData.occupation, salaryRange: kycData.salaryRange,
//              nationality: kycData.nationality!, idType: kycData.idType!,
//              idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!,
//              idExpiryDate: kycData.idExpiryDate!,
//          };

//          try {
//             await kycService.submitKyc(
//                  submissionData,
//                  kycData.idFrontFile!, // File objects should be in context state
//                  kycData.idType === 'resident_permit' ? kycData.idBackFile! : null
//              );

//              resetKycProgress();
//              await refetchUser();
//              router.push('/kyc/pending');

//          } catch (error: any) {
//              console.error("KYC Submission failed:", error);
//              setSubmitError(error.message || "An unexpected error occurred during submission.");
//          } finally {
//              setIsSubmitting(false);
//          }
//     };

//      // Display formatted date or fallback
//      const formatDate = (dateString?: string) => {
//          if (!dateString) return 'N/A';
//          try {
//              return format(new Date(dateString), 'MMMM d, yyyy');
//          } catch {
//              return dateString; // Return original if parsing fails
//          }
//      };

//     return (
//         <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-mainheading dark:text-white">Review Your Information</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Please review all the details carefully before submitting. Ensure everything matches your official documents.</p>

//             {submitError && <p className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-sm">{submitError}</p>}

//             <div className="border-t border-gray-200 dark:border-gray-700">
//                 <dl>
//                     {/* Personal Details */}
//                     <DetailItem label="First Name" value={kycData.firstName} />
//                     <DetailItem label="Last Name" value={kycData.lastName} />
//                     <DetailItem label="Date of Birth" value={formatDate(kycData.dateOfBirth)} />
//                     <DetailItem label="Mobile Number" value={`${kycData.mobile?.countryCode || ''} ${kycData.mobile?.number || ''}`} />

//                     {/* Additional Details */}
//                      <DetailItem label="Occupation" value={kycData.occupation || 'N/A'} />
//                      <DetailItem label="Salary Range" value={salaryOptions.find(o => o.value === kycData.salaryRange)?.label || 'N/A'} />
//                      <DetailItem label="Nationality" value={kycData.nationality} />

//                     {/* Identity Details */}
//                     <DetailItem label="ID Type" value={kycData.idType === 'passport' ? 'Passport' : 'Resident Permit'} />
//                     <DetailItem label="ID Number" value={kycData.idNumber} />
//                     <DetailItem label="ID Issue Date" value={formatDate(kycData.idIssueDate)} />
//                     <DetailItem label="ID Expiry Date" value={formatDate(kycData.idExpiryDate)} />

//                      {/* Uploaded Files */}
//                      <DetailItem label="Front ID Document" value={kycData.idFrontFile ? kycData.idFrontFile.name : 'Not uploaded'} />
//                      {kycData.idType === 'resident_permit' && (
//                         <DetailItem label="Back ID Document" value={kycData.idBackFile ? kycData.idBackFile.name : 'Not uploaded'} />
//                      )}
//                 </dl>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
//                 <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                     Back (Edit Uploads)
//                 </Button>
//                 <Button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                     Confirm and Submit
//                 </Button>
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/review/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter } from "next/navigation";

// // --- Context & State Types ---
// import { useKyc } from "../../contexts/KycContext";
// import type { KycProgressData, KycFileState } from "../../contexts/KycContext";

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
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Loader2,
//   AlertTriangle,
//   CheckCircle,
//   FileText,
//   UserCircle,
//   CalendarDays,
//   Phone,
//   Globe,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Edit,
//   FileWarning,
// } from "lucide-react";

// // --- API Service & Types ---
// import kycService from "@/app/services/kyc";
// import type { KycSubmissionPayload } from "@/app/services/kyc";

// // --- Other Utilities ---
// import { useAuth } from "@/app/contexts/AuthContext";
// import { format, isValid as isDateValid } from "date-fns";

// // ============================================================================
// // Helper Component & Functions (Defined OUTSIDE the main component)
// // ============================================================================

// // --- DetailItem Component ---
// interface DetailItemProps {
//   label: string;
//   value?: string | null | React.ReactNode;
//   icon?: React.ElementType;
//   onEditClick?: () => void;
// }

// // FIX: Define DetailItem as a standard functional component returning JSX
// const DetailItem: React.FC<DetailItemProps> = ({
//   label,
//   value,
//   icon: Icon,
//   onEditClick,
// }) => {
//   const isEmpty = value === null || value === undefined || value === "";

//   // FIX: Ensure this component returns JSX
//   return (
//     <div className="py-3 grid grid-cols-[auto,1fr,auto] gap-x-3 items-center group border-b border-border/50 last:border-b-0">
//       <div className="w-5 h-5 flex items-center justify-center">
//         {Icon && (
//           <Icon
//             className={`h-4 w-4 ${
//               isEmpty ? "text-muted-foreground/50" : "text-muted-foreground"
//             }`}
//           />
//         )}
//       </div>
//       <dt
//         className={`text-sm font-medium ${
//           isEmpty ? "text-muted-foreground/80" : "text-foreground/80"
//         }`}
//       >
//         {label}:
//       </dt>
//       <dd
//         className={`text-sm break-words ${
//           isEmpty
//             ? "text-muted-foreground italic"
//             : "text-foreground font-medium"
//         }`}
//       >
//         {isEmpty ? "Not Provided" : value}
//       </dd>
//       {onEditClick && (
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onEditClick}
//           className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity h-7 w-7 ml-2"
//           aria-label={`Edit ${label}`}
//         >
//           <Edit className="h-3.5 w-3.5" />
//         </Button>
//       )}
//     </div>
//   );
// };

// // --- Salary Options ---
// const salaryDisplayOptions: Record<string, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $50,000",
//   "50000-100000": "$50,000 - $100,000",
//   "100000+": "Over $100,000",
// };

// // --- Data Submission Check ---
// const checkAllDataForSubmission = (
//   data: KycProgressData,
//   files: KycFileState
// ): boolean => {
//   const requiredDataFields: (
//     | keyof KycProgressData
//     | "mobile.countryCode"
//     | "mobile.number"
//   )[] = [
//     "firstName",
//     "lastName",
//     "dateOfBirth",
//     "mobile.countryCode",
//     "mobile.number",
//     "nationality",
//     "idType",
//     "idNumber",
//     "idIssueDate",
//     "idExpiryDate",
//   ];
//   const hasRequiredData = requiredDataFields.every((field) => {
//     if (typeof field === "string" && field.startsWith("mobile.")) {
//       const subField = field.split(".")[1] as keyof NonNullable<
//         KycProgressData["mobile"]
//       >;
//       return !!data.mobile?.[subField];
//     } else if (typeof field === "string" || typeof field === "symbol") {
//       return !!data[field as keyof KycProgressData];
//     }
//     return false;
//   });
//   const hasFrontFile = !!files.idFrontFile;
//   const needsBackFile = data.idType === "resident_permit";
//   const hasBackFile = !!files.idBackFile;
//   return hasRequiredData && hasFrontFile && (!needsBackFile || hasBackFile);
// };

// // --- Date Formatter ---
// const formatDate = (dateString?: string): string | undefined => {
//   if (!dateString) return undefined;
//   try {
//     const date = new Date(dateString);
//     return isDateValid(date)
//       ? format(date, "MMMM d, yyyy")
//       : `Invalid Date (${dateString})`;
//   } catch {
//     return `Invalid Date (${dateString})`;
//   }
// };

// // --- File Name Display ---
// const displayFileName = (
//   file: File | null,
//   isRequired: boolean
// ): React.ReactNode => {
//   if (file) {
//     return (
//       /* ... JSX for file display ... */
//       <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
//         <CheckCircle className="h-4 w-4 flex-shrink-0" />
//         <span className="truncate" title={file.name}>
//           {file.name}
//         </span>
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           ({(file.size / 1024 / 1024).toFixed(2)} MB)
//         </span>
//       </span>
//     );
//   } else if (isRequired) {
//     return (
//       /* ... JSX for missing required file ... */
//       <span className="flex items-center gap-1.5 text-destructive dark:text-red-400 font-medium italic">
//         <FileWarning className="h-4 w-4 flex-shrink-0" /> Missing Required File
//       </span>
//     );
//   } else {
//     return undefined;
//   }
// };

// // ============================================================================
// // Main Component Definition
// // ============================================================================
// export default function KycReviewPage() {
//   const router = useRouter();
//   const {
//     kycData,
//     fileState,
//     prevStep,
//     goToStep,
//     updateCurrentStepId,
//     resetKycProgress,
//     isInitialized: isKycContextInitialized,
//   } = useKyc();
//   const { user, loading: authLoading, refetchUser } = useAuth();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // --- Effects ---
//   useEffect(() => {
//     updateCurrentStepId("review");
//   }, [updateCurrentStepId]);

//   const isDataReady = useMemo(() => {
//     if (!isKycContextInitialized) return false;
//     return checkAllDataForSubmission(kycData, fileState);
//   }, [isKycContextInitialized, kycData, fileState]);

//   useEffect(() => {
//     if (!isKycContextInitialized || authLoading) {
//       setIsLoading(true);
//       return;
//     }
//     if (!user) {
//       router.replace("/auth/login?redirect=/kyc/review");
//       return;
//     }

//     switch (user.kycStatus) {
//       case "pending":
//         router.replace("/kyc/pending");
//         return;
//       case "verified":
//         router.replace("/kyc/complete");
//         return;
//       case "skipped":
//       case "not_started":
//         router.replace("/kyc/start");
//         return;
//       case "rejected":
//         break; // Allow review
//       default:
//         router.replace("/dashboard");
//         return;
//     }

//     if (!isDataReady) {
//       router.replace("/kyc/start");
//       return;
//     }

//     setIsLoading(false);
//   }, [
//     isKycContextInitialized,
//     authLoading,
//     user,
//     isDataReady,
//     kycData,
//     fileState,
//     router,
//   ]); // Added isDataReady dependency

//   // --- Event Handlers ---
//   const handleSubmit = useCallback(async () => {
//     if (!isDataReady) {
//       /* ... set error ... */ return;
//     } // Use isDataReady check
//     setIsSubmitting(true);
//     setSubmitError(null);
//     const submissionData: KycSubmissionPayload = {
//       /* ... construct payload ... */ firstName: kycData.firstName!,
//       lastName: kycData.lastName!,
//       dateOfBirth: kycData.dateOfBirth!,
//       mobile: kycData.mobile!,
//       occupation: kycData.occupation || undefined,
//       salaryRange: kycData.salaryRange || null,
//       nationality: kycData.nationality!,
//       idType: kycData.idType!,
//       idNumber: kycData.idNumber!,
//       idIssueDate: kycData.idIssueDate!,
//       idExpiryDate: kycData.idExpiryDate!,
//     };
//     try {
//       if (!fileState.idFrontFile)
//         throw new Error("Internal Error: Front ID file missing.");
//       await kycService.submitKyc(
//         submissionData,
//         fileState.idFrontFile,
//         fileState.idBackFile
//       );
//       resetKycProgress();
//       await refetchUser();
//       router.push("/kyc/pending");
//     } catch (error: any) {
//       setSubmitError(error.message || "An unexpected error occurred.");
//       setIsSubmitting(false);
//       window.scrollTo(0, 0);
//     }
//   }, [isDataReady, kycData, fileState, resetKycProgress, refetchUser, router]); // Added isDataReady dependency

//   // --- Render Logic ---
//   if (isLoading) {
//     return (
//       /* ... Loading Spinner ... */
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         <span className="ml-3 text-lg text-muted-foreground">
//           Loading review...
//         </span>
//       </div>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <Card className="w-full max-w-3xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold tracking-tight">
//           Review Your Information
//         </CardTitle>
//         <CardDescription>
//           Please check all details carefully... Click the{" "}
//           <Edit className="inline h-3 w-3 mx-0.5" /> icon or use 'Back' to make
//           changes.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {submitError && (
//           <p className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-sm">
//             {submitError}
//           </p>
//         )}
//         <Accordion
//           type="multiple"
//           defaultValue={["personal", "identity", "documents"]}
//           className="w-full space-y-3"
//         >
//           {/* Accordion Items calling DetailItem */}
//           <AccordionItem
//             value="personal"
//             className="border rounded-md px-4 bg-background dark:bg-secondary/30"
//           >
//             <AccordionTrigger className="text-lg font-medium hover:no-underline py-3 [&[data-state=open]>svg]:rotate-180">
//               Personal & Contact Details
//             </AccordionTrigger>
//             <AccordionContent className="pt-1 pb-2 space-y-0">
//               <DetailItem
//                 label="First Name"
//                 value={kycData.firstName}
//                 icon={UserCircle}
//                 onEditClick={() => goToStep("personal")}
//               />
//               <DetailItem
//                 label="Last Name"
//                 value={kycData.lastName}
//                 onEditClick={() => goToStep("personal")}
//               />
//               <DetailItem
//                 label="Date of Birth"
//                 value={formatDate(kycData.dateOfBirth)}
//                 icon={CalendarDays}
//                 onEditClick={() => goToStep("personal")}
//               />
//               <DetailItem
//                 label="Mobile Number"
//                 value={`${kycData.mobile?.countryCode || ""} ${
//                   kycData.mobile?.number || ""
//                 }`}
//                 icon={Phone}
//                 onEditClick={() => goToStep("personal")}
//               />
//               <DetailItem
//                 label="Nationality"
//                 value={kycData.nationality}
//                 icon={Globe}
//                 onEditClick={() => goToStep("details")}
//               />
//               <DetailItem
//                 label="Occupation"
//                 value={kycData.occupation}
//                 icon={Briefcase}
//                 onEditClick={() => goToStep("details")}
//               />
//               <DetailItem
//                 label="Income Range"
//                 value={
//                   kycData.salaryRange
//                     ? salaryDisplayOptions[kycData.salaryRange]
//                     : undefined
//                 }
//                 icon={BadgeDollarSign}
//                 onEditClick={() => goToStep("details")}
//               />
//             </AccordionContent>
//           </AccordionItem>
//           {/* Other Accordion Items */}
//           <AccordionItem
//             value="identity"
//             className="border rounded-md px-4 bg-background dark:bg-secondary/30"
//           >
//             <AccordionTrigger className="text-lg font-medium hover:no-underline py-3 [&[data-state=open]>svg]:rotate-180">
//               Identity Document
//             </AccordionTrigger>
//             <AccordionContent className="pt-1 pb-2 space-y-0">
//               <DetailItem
//                 label="ID Type"
//                 value={
//                   kycData.idType === "passport"
//                     ? "Passport"
//                     : "Resident Permit / National ID"
//                 }
//                 icon={Fingerprint}
//                 onEditClick={() => goToStep("identity")}
//               />
//               <DetailItem
//                 label="ID Number"
//                 value={kycData.idNumber}
//                 onEditClick={() => goToStep("identity")}
//               />
//               <DetailItem
//                 label="Issue Date"
//                 value={formatDate(kycData.idIssueDate)}
//                 icon={CalendarDays}
//                 onEditClick={() => goToStep("identity")}
//               />
//               <DetailItem
//                 label="Expiry Date"
//                 value={formatDate(kycData.idExpiryDate)}
//                 onEditClick={() => goToStep("identity")}
//               />
//             </AccordionContent>
//           </AccordionItem>
//           <AccordionItem
//             value="documents"
//             className="border rounded-md px-4 bg-background dark:bg-secondary/30"
//           >
//             <AccordionTrigger className="text-lg font-medium hover:no-underline py-3 [&[data-state=open]>svg]:rotate-180">
//               Uploaded Documents
//             </AccordionTrigger>
//             <AccordionContent className="pt-1 pb-2 space-y-0">
//               <DetailItem
//                 label="Front ID Document"
//                 value={displayFileName(fileState.idFrontFile, true)}
//                 icon={FileText}
//                 onEditClick={() => goToStep("upload")}
//               />
//               <DetailItem
//                 label="Back ID Document"
//                 value={displayFileName(
//                   fileState.idBackFile,
//                   kycData.idType === "resident_permit"
//                 )}
//                 icon={FileText}
//                 onEditClick={() => goToStep("upload")}
//               />
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//         {/* Navigation Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-gray-700 mt-6 gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={prevStep}
//             disabled={isSubmitting}
//           >
//             {" "}
//             Back (Edit Uploads){" "}
//           </Button>
//           <Button
//             type="button"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             size="lg"
//           >
//             {isSubmitting ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : null}{" "}
//             Confirm and Submit Verification
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/app/kyc/review/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Image from 'next/image';

// // --- Context & State Types ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import type { KycProgressData, KycFileState, KycStepId } from "../../contexts/KycContext";
// import type { KycSubmissionPayload } from "@/app/services/kyc";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, CheckCircle, FileText, UserCircle, CalendarDays, Phone, Globe, Briefcase, BadgeDollarSign, Fingerprint, Edit, FileWarning, ArrowLeft, Send, Image as ImageIcon } from "lucide-react";

// // --- Utilities ---
// import { format, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";

// // ============================================================================
// // Helper Component & Functions
// // ============================================================================

// // --- DetailItem Component ---
// interface DetailItemProps {
//   label: string; value?: string | null | React.ReactNode; icon?: React.ElementType;
//   stepTarget: KycStepId; isMissing?: boolean; className?: string;
// }
// const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, stepTarget, isMissing = false, className }) => {
//   const { goToStep } = useKyc();
//   const displayValue = value === null || value === undefined || (typeof value === 'string' && value.trim() === "") ? "Not Provided" : value;
//   const isEmptyOrMissing = displayValue === "Not Provided" || isMissing;
//   const handleEditClick = useCallback(() => { goToStep(stepTarget); }, [goToStep, stepTarget]);
//   return (
//     <div className={cn("py-3 grid grid-cols-[auto,1fr,auto] gap-x-3 items-center group border-b border-border/20 dark:border-border/10 last:border-b-0", className)}>
//       <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">{Icon && <Icon className={cn("h-4 w-4", isEmptyOrMissing ? "text-muted-foreground/60" : "text-muted-foreground")} />}</div>
//       <dt className={cn("text-sm font-medium truncate", isEmptyOrMissing ? "text-muted-foreground/80" : "text-foreground/90")}>{label}:</dt>
//       <dd className="flex items-center justify-end gap-1 text-right">
//           <span className={cn("text-sm break-words", isEmptyOrMissing && !isMissing ? "text-muted-foreground italic" : "text-foreground font-medium", isMissing ? "text-destructive font-semibold italic flex items-center gap-1" : "")}>
//             {isMissing ? <><AlertTriangle className="h-3.5 w-3.5 inline-block" /> Missing</> : displayValue}
//           </span>
//           {!isMissing && (<Button variant="ghost" size="icon" onClick={handleEditClick} className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity h-7 w-7 flex-shrink-0" aria-label={`Edit ${label}`}><Edit className="h-3.5 w-3.5" /></Button>)}
//       </dd>
//     </div>
//   );
// };

// // --- Salary & Date Helpers ---
// const salaryDisplayMap: Record<string, string> = { '0-1000': 'Below $10,000', '10000-50000': '$10,000 - $49,999', '50000-100000': '$50,000 - $99,999', '100000+': '$100,000 or more' };
// const formatDateReview = (dateString?: string): string | undefined => {
//   if (!dateString) return undefined;
//   try { const date = parseISO(dateString); return isDateValid(date) ? format(date, "MMMM d, yyyy") : `Invalid Date (${dateString})`; }
//   catch { return `Invalid Date (${dateString})`; }
// };

// // --- FileDisplay Component ---
// const FileDisplay: React.FC<{ file: File | null }> = ({ file }) => {
//     if (!file) return <span className="text-muted-foreground italic">Not Uploaded</span>;
//     const isPdf = file.type === 'application/pdf';
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     useEffect(() => {
//         let objectUrl: string | null = null;
//         if (file && !isPdf) { objectUrl = URL.createObjectURL(file); setPreviewUrl(objectUrl); } else { setPreviewUrl(null); }
//         return () => { if (objectUrl) { URL.revokeObjectURL(objectUrl); setPreviewUrl(null); } };
//     }, [file, isPdf]);
//     return (
//         <div className="flex items-center justify-end gap-2 text-sm max-w-[250px] sm:max-w-xs md:max-w-sm">
//             <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
//                 {previewUrl && (<Image src={previewUrl} alt="Preview" width={24} height={24} className="rounded object-cover border" />)}
//                 {isPdf && <FileText className="h-5 w-5 text-red-600" />}
//                 {!previewUrl && !isPdf && <ImageIcon className="h-5 w-5 text-muted-foreground" />}
//             </div>
//             <div className="flex-grow overflow-hidden">
//                  <span className="font-medium truncate text-foreground block" title={file.name}>{file.name}</span>
//                  <span className="text-xs text-muted-foreground whitespace-nowrap block">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
//             </div>
//         </div>
//     );
// };

// // --- Data Validation Check ---
// const checkRequiredDataPresent = (data: KycProgressData, files: KycFileState): string[] => {
//   const missing: string[] = [];
//   const requiredDataFields: (keyof KycSubmissionPayload)[] = [ 'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate' ];
//   requiredDataFields.forEach(field => {
//     if (field === 'mobile') { if (!data.mobile || !data.mobile.countryCode || !data.mobile.number) missing.push("Mobile Number"); }
//     else { const value = data[field as keyof KycProgressData]; if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) { const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()); missing.push(label); } }
//   });
//   if (!files.idFrontFile) { missing.push("Front ID Document"); }
//   if (data.idType === 'resident_permit' && !files.idBackFile) { missing.push("Back ID Document"); }
//   return missing;
// };

// // ============================================================================
// // Main Component: KycReviewPage
// // ============================================================================
// export default function KycReviewPage() {
//   const {
//       kycData, fileState, goToStep, updateCurrentUiStepId, submitKycData,
//       isInitialized: kycInitialized, isSubmitting, backendStatus
//     } = useKyc();

//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [missingFields, setMissingFields] = useState<string[]>([]);

//   // Effect 1: Set UI step
//   useEffect(() => { if (kycInitialized) updateCurrentUiStepId('review'); }, [kycInitialized, updateCurrentUiStepId]);

//    // Effect 2: Check data readiness
//    useEffect(() => {
//     if (!kycInitialized) { setIsPageLoading(true); return; }
//      if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { setIsPageLoading(false); return; }
//     const missing = checkRequiredDataPresent(kycData, fileState);
//     setMissingFields(missing);
//     if (missing.length > 0) console.warn("ReviewPage: Initial check found missing fields:", missing);
//     setIsPageLoading(false);
//   }, [kycInitialized, backendStatus, kycData, fileState]); // Re-check if files change

//   // Handle Submission Attempt
//   const handleSubmit = useCallback(async () => {
//     setSubmitError(null);
//     const currentMissing = checkRequiredDataPresent(kycData, fileState); // Re-check with latest state
//     setMissingFields(currentMissing);
//     if (currentMissing.length > 0) {
//          const errorMsg = `Cannot submit. Please go back and complete the following: ${currentMissing.join(', ')}.`;
//          setSubmitError(errorMsg); window.scrollTo({ top: 0, behavior: 'smooth' });
//          console.error("ReviewPage: Submission blocked due to missing fields:", currentMissing); return;
//     }
//     console.log("ReviewPage: All checks passed. Calling context submitKycData...");
//     try {
//       const success = await submitKycData(); // Context handles API call and state updates
//       if (!success) { setSubmitError(prev => prev || "Submission failed. Please check details or try again."); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//       // Success navigation is handled by submitKycData
//     } catch (error: any) { console.error("ReviewPage: Unexpected error during submitKycData call:", error); setSubmitError(error.message || "An unexpected error occurred."); window.scrollTo({ top: 0, behavior: 'smooth' }); }
//   }, [kycData, fileState, submitKycData]); // Add fileState dependency

//   // --- Render Logic ---
//   if (isPageLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//   if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//   const idTypeDisplayName = kycData.idType === 'passport' ? 'Passport' : 'Resident Permit / National ID';

//   return (
//     <Card className="w-full max-w-3xl mx-auto shadow-xl border border-border/40 animate-fadeIn mb-10">
//       <CardHeader className="border-b dark:border-border/50 p-6">
//          <div className="flex items-center gap-3 mb-1"> <CheckCircle className="h-6 w-6 text-primary" /> <CardTitle className="text-2xl font-semibold tracking-tight">Review & Submit (Step {formStepOrder.indexOf('review') + 1} of {formStepOrder.length})</CardTitle> </div>
//          <CardDescription>Please carefully review all details and documents. Click <Edit className="inline h-3 w-3 mx-1 text-muted-foreground" /> to make corrections.</CardDescription>
//       </CardHeader>
//       <CardContent className="p-6 md:p-8 space-y-6">
//         {submitError && ( <Alert variant="destructive" className="mb-4"><AlertTriangle className="h-4 w-4" /><AlertTitle>Submission Problem</AlertTitle><AlertDescription>{submitError}</AlertDescription></Alert> )}
//         {/* FIX: Removed variant="warning" as it's not a standard variant */}
//         {missingFields.length > 0 && !submitError && (
//           <Alert className="mb-4 border-yellow-500/50 text-yellow-700 dark:border-yellow-500/30 dark:text-yellow-300 [&>svg]:text-yellow-500 dark:[&>svg]:text-yellow-400">
//             <AlertTriangle className="h-4 w-4" />
//             <AlertTitle className="font-semibold">Incomplete Information</AlertTitle>
//             <AlertDescription>Before submitting, please go back and provide: <span className="font-medium">{missingFields.join(', ')}</span>.</AlertDescription>
//           </Alert>
//         )}

//         <Accordion type="multiple" defaultValue={["personal", "identity", "documents"]} className="w-full space-y-3">
//           {/* Personal Details Section */}
//           <AccordionItem value="personal" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//              <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Personal & Contact Details</AccordionTrigger>
//              <AccordionContent className="px-4 pt-0 pb-0">
//                 <DetailItem label="First Name" value={kycData.firstName} icon={UserCircle} stepTarget='personal' isMissing={!kycData.firstName || kycData.firstName.trim() === ''} />
//                 <DetailItem label="Last Name" value={kycData.lastName} stepTarget='personal' isMissing={!kycData.lastName || kycData.lastName.trim() === ''} />
//                 <DetailItem label="Date of Birth" value={formatDateReview(kycData.dateOfBirth)} icon={CalendarDays} stepTarget='personal' isMissing={!kycData.dateOfBirth} />
//                 <DetailItem label="Mobile Number" value={kycData.mobile ? `${kycData.mobile.countryCode} ${kycData.mobile.number}` : undefined} icon={Phone} stepTarget='personal' isMissing={!kycData.mobile?.countryCode || !kycData.mobile?.number} />
//                 <DetailItem label="Nationality" value={kycData.nationality} icon={Globe} stepTarget='details' isMissing={!kycData.nationality || kycData.nationality.trim() === ''} />
//                 <DetailItem label="Occupation" value={kycData.occupation} icon={Briefcase} stepTarget='details' />
//                 <DetailItem label="Income Range" value={kycData.salaryRange ? salaryDisplayMap[kycData.salaryRange] : undefined} icon={BadgeDollarSign} stepTarget='details' />
//              </AccordionContent>
//           </AccordionItem>
//            {/* Identity Document Section */}
//            <AccordionItem value="identity" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//               <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Identity Document Details</AccordionTrigger>
//               <AccordionContent className="px-4 pt-0 pb-0">
//                  <DetailItem label="ID Type" value={idTypeDisplayName} icon={Fingerprint} stepTarget='identity' isMissing={!kycData.idType}/>
//                  <DetailItem label="ID Number" value={kycData.idNumber} stepTarget='identity' isMissing={!kycData.idNumber || kycData.idNumber.trim() === ''}/>
//                  <DetailItem label="Issue Date" value={formatDateReview(kycData.idIssueDate)} icon={CalendarDays} stepTarget='identity' isMissing={!kycData.idIssueDate}/>
//                  <DetailItem label="Expiry Date" value={formatDateReview(kycData.idExpiryDate)} stepTarget='identity' isMissing={!kycData.idExpiryDate}/>
//               </AccordionContent>
//            </AccordionItem>
//            {/* Uploaded Documents Section */}
//            <AccordionItem value="documents" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//               <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Uploaded Documents</AccordionTrigger>
//               <AccordionContent className="px-4 pt-0 pb-0">
//                   <DetailItem label={`Front of ${idTypeDisplayName}`} value={<FileDisplay file={fileState.idFrontFile} />} icon={FileText} stepTarget='upload' isMissing={!fileState.idFrontFile} className="items-center" />
//                   {kycData.idType === 'resident_permit' && ( <DetailItem label={`Back of ${idTypeDisplayName}`} value={<FileDisplay file={fileState.idBackFile} />} icon={FileText} stepTarget='upload' isMissing={!fileState.idBackFile} className="items-center" /> )}
//               </AccordionContent>
//            </AccordionItem>
//         </Accordion>

//         {/* Navigation / Submission Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t dark:border-border/50 mt-8 gap-4">
//           <Button type="button" variant="outline" onClick={() => goToStep('upload')} disabled={isSubmitting}><ArrowLeft className="mr-2 h-4 w-4" /> Back (Edit Uploads)</Button>
//           <Button type="button" onClick={handleSubmit} disabled={isSubmitting || missingFields.length > 0} size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"> {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Confirm and Submit KYC </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/app/kyc/review/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Image from 'next/image';

// // --- Context & State Types ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import type { KycProgressData, KycFileState, KycStepId } from "../../contexts/KycContext";
// import type { KycSubmissionPayload } from "@/app/services/kyc";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, AlertTriangle, CheckCircle, FileText, UserCircle, CalendarDays, Phone, Globe, Briefcase, BadgeDollarSign, Fingerprint, Edit, FileWarning, ArrowLeft, Send, Image as ImageIcon } from "lucide-react";

// // --- Utilities ---
// import { format, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";

// // ============================================================================
// // Helper Component & Functions
// // ============================================================================

// // --- DetailItem Component ---
// interface DetailItemProps {
//   label: string; value?: string | null | React.ReactNode; icon?: React.ElementType;
//   stepTarget: KycStepId; isMissing?: boolean; className?: string;
// }
// const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, stepTarget, isMissing = false, className }) => {
//   const { goToStep } = useKyc();
//   const displayValue = value === null || value === undefined || (typeof value === 'string' && value.trim() === "") ? "Not Provided" : value;
//   const isEmptyOrMissing = displayValue === "Not Provided" || isMissing;
//   const handleEditClick = useCallback(() => { goToStep(stepTarget); }, [goToStep, stepTarget]);
//   return (
//     <div className={cn("py-3 grid grid-cols-[auto,1fr,auto] gap-x-3 items-center group border-b border-border/20 dark:border-border/10 last:border-b-0", className)}>
//       <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">{Icon && <Icon className={cn("h-4 w-4", isEmptyOrMissing ? "text-muted-foreground/60" : "text-muted-foreground")} />}</div>
//       <dt className={cn("text-sm font-medium truncate", isEmptyOrMissing ? "text-muted-foreground/80" : "text-foreground/90")}>{label}:</dt>
//       <dd className="flex items-center justify-end gap-1 text-right">
//           <span className={cn("text-sm break-words", isEmptyOrMissing && !isMissing ? "text-muted-foreground italic" : "text-foreground font-medium", isMissing ? "text-destructive font-semibold italic flex items-center gap-1" : "")}>
//             {isMissing ? <><AlertTriangle className="h-3.5 w-3.5 inline-block" /> Missing</> : displayValue}
//           </span>
//           {!isMissing && (<Button variant="ghost" size="icon" onClick={handleEditClick} className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity h-7 w-7 flex-shrink-0" aria-label={`Edit ${label}`}><Edit className="h-3.5 w-3.5" /></Button>)}
//       </dd>
//     </div>
//   );
// };

// // --- Salary & Date Helpers ---
// const salaryDisplayMap: Record<string, string> = { '0-1000': 'Below $10,000', '10000-50000': '$10,000 - $49,999', '50000-100000': '$50,000 - $99,999', '100000+': '$100,000 or more' };
// const formatDateReview = (dateString?: string): string | undefined => {
//   if (!dateString) return undefined;
//   try { const date = parseISO(dateString); return isDateValid(date) ? format(date, "MMMM d, yyyy") : `Invalid Date (${dateString})`; }
//   catch { return `Invalid Date (${dateString})`; }
// };

// // --- FileDisplay Component (Corrected) ---
// const FileDisplay: React.FC<{ file: File | null }> = ({ file }) => {
//     // --- Hooks MUST be called at the top level ---
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//     useEffect(() => {
//         let objectUrl: string | null = null;
//         // Perform checks *inside* the effect
//         if (file && file.type !== 'application/pdf') {
//              objectUrl = URL.createObjectURL(file);
//              setPreviewUrl(objectUrl);
//         } else {
//              // Reset preview if file is null or PDF
//              setPreviewUrl(null);
//         }

//         // Cleanup function: runs when effect re-runs or component unmounts
//         return () => {
//             if (objectUrl) {
//                 URL.revokeObjectURL(objectUrl);
//             }
//         };
//     // Dependency: Re-run effect only when the file prop itself changes
//     }, [file]);

//     // --- Conditional return *after* Hooks ---
//     if (!file) {
//         return <span className="text-muted-foreground italic">Not Uploaded</span>;
//     }

//     // --- Derived state/variables for rendering (can be calculated after null check) ---
//     const isPdf = file.type === 'application/pdf';

//     // --- Render logic ---
//     return (
//         <div className="flex items-center justify-end gap-2 text-sm max-w-[250px] sm:max-w-xs md:max-w-sm">
//             <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
//                 {/* Use the state variable 'previewUrl' */}
//                 {previewUrl && (<Image src={previewUrl} alt="Preview" width={24} height={24} className="rounded object-cover border" />)}
//                 {/* Use the calculated 'isPdf' variable */}
//                 {isPdf && <FileText className="h-5 w-5 text-red-600" />}
//                 {/* Use both for the fallback icon */}
//                 {!previewUrl && !isPdf && <ImageIcon className="h-5 w-5 text-muted-foreground" />}
//             </div>
//             <div className="flex-grow overflow-hidden">
//                  <span className="font-medium truncate text-foreground block" title={file.name}>{file.name}</span>
//                  <span className="text-xs text-muted-foreground whitespace-nowrap block">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
//             </div>
//         </div>
//     );
// };

// // --- Data Validation Check ---
// const checkRequiredDataPresent = (data: KycProgressData, files: KycFileState): string[] => {
//   const missing: string[] = [];
//   const requiredDataFields: (keyof KycSubmissionPayload)[] = [ 'firstName', 'lastName', 'dateOfBirth', 'mobile', 'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate' ];
//   requiredDataFields.forEach(field => {
//     if (field === 'mobile') { if (!data.mobile || !data.mobile.countryCode || !data.mobile.number) missing.push("Mobile Number"); }
//     else { const value = data[field as keyof KycProgressData]; if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) { const label = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()); missing.push(label); } }
//   });
//   if (!files.idFrontFile) { missing.push("Front ID Document"); }
//   // Check if idType is resident_permit before checking for back file
//   if (data.idType === 'resident_permit' && !files.idBackFile) { missing.push("Back ID Document"); }
//   return missing;
// };

// // ============================================================================
// // Main Component: KycReviewPage
// // ============================================================================
// export default function KycReviewPage() {
//   const {
//       kycData, fileState, goToStep, updateCurrentUiStepId, submitKycData,
//       isInitialized: kycInitialized, isSubmitting, backendStatus
//     } = useKyc();

//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [missingFields, setMissingFields] = useState<string[]>([]);

//   // Effect 1: Set UI step
//   useEffect(() => { if (kycInitialized) updateCurrentUiStepId('review'); }, [kycInitialized, updateCurrentUiStepId]);

//    // Effect 2: Check data readiness
//    useEffect(() => {
//     if (!kycInitialized) { setIsPageLoading(true); return; }
//      // Check backend status first - no need to check fields if already submitted/approved/etc.
//      if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//         setIsPageLoading(false); // Don't show loading if already submitted/in progress
//         return;
//      }
//     const missing = checkRequiredDataPresent(kycData, fileState);
//     setMissingFields(missing);
//     if (missing.length > 0 && isPageLoading) { // Only log initial check
//         console.warn("ReviewPage: Initial check found missing fields:", missing);
//     }
//     setIsPageLoading(false);
//   }, [kycInitialized, backendStatus, kycData, fileState, isPageLoading]); // Added isPageLoading to deps for initial log

//   // Handle Submission Attempt
//   const handleSubmit = useCallback(async () => {
//     setSubmitError(null);
//     const currentMissing = checkRequiredDataPresent(kycData, fileState); // Re-check with latest state
//     setMissingFields(currentMissing);
//     if (currentMissing.length > 0) {
//          const errorMsg = `Cannot submit. Please go back and complete the following: ${currentMissing.join(', ')}.`;
//          setSubmitError(errorMsg); window.scrollTo({ top: 0, behavior: 'smooth' });
//          console.error("ReviewPage: Submission blocked due to missing fields:", currentMissing); return;
//     }
//     console.log("ReviewPage: All checks passed. Calling context submitKycData...");
//     try {
//       const success = await submitKycData(); // Context handles API call and state updates
//       if (!success) {
//         // Set a generic error message if the context didn't provide a more specific one
//         // (Potentially enhance context to return error messages)
//         setSubmitError(prev => prev || "Submission failed. Please check details or try again.");
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//       // Success navigation is handled by submitKycData within the context
//     } catch (error: any) {
//       console.error("ReviewPage: Unexpected error during submitKycData call:", error);
//       setSubmitError(error.message || "An unexpected error occurred during submission.");
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [kycData, fileState, submitKycData]); // Add fileState dependency

//   // --- Render Logic ---
//   if (isPageLoading || !kycInitialized) {
//       return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> );
//   }

//   // Handle cases where submission is already done or in progress (should ideally redirect or show status)
//   // Redirect logic might be better handled in the KycContext based on backendStatus changes
//   if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//       // Instead of a spinner, maybe show a message or redirect
//       // For now, keep spinner as per original code, but add context
//       return (
//           <div className="flex flex-col justify-center items-center min-h-[400px]">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//               <span className="mt-3 text-muted-foreground">Checking KYC status ({backendStatus})...</span>
//               {/* Optionally add a button to go to status page if applicable */}
//           </div>
//        );
//   }

//   const idTypeDisplayName = kycData.idType === 'passport' ? 'Passport' : kycData.idType === 'resident_permit' ? 'Resident Permit / National ID' : 'ID'; // Handle potential null/undefined idType

//   return (
//     <Card className="w-full max-w-3xl mx-auto shadow-xl border border-border/40 animate-fadeIn mb-10">
//       <CardHeader className="border-b dark:border-border/50 p-6">
//          <div className="flex items-center gap-3 mb-1"> <CheckCircle className="h-6 w-6 text-primary" /> <CardTitle className="text-2xl font-semibold tracking-tight">Review & Submit (Step {formStepOrder.indexOf('review') + 1} of {formStepOrder.length})</CardTitle> </div>
//          <CardDescription>Please carefully review all details and documents. Click <Edit className="inline h-3 w-3 mx-1 text-muted-foreground" /> to make corrections.</CardDescription>
//       </CardHeader>
//       <CardContent className="p-6 md:p-8 space-y-6">
//         {submitError && (
//             <Alert variant="destructive" className="mb-4">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertTitle>Submission Problem</AlertTitle>
//                 <AlertDescription>{submitError}</AlertDescription>
//             </Alert>
//         )}
//         {missingFields.length > 0 && !submitError && (
//           <Alert className="mb-4 border-yellow-500/50 text-yellow-700 dark:border-yellow-500/30 dark:text-yellow-300 [&>svg]:text-yellow-500 dark:[&>svg]:text-yellow-400">
//             <AlertTriangle className="h-4 w-4" />
//             <AlertTitle className="font-semibold">Incomplete Information</AlertTitle>
//             <AlertDescription>Before submitting, please go back and provide: <span className="font-medium">{missingFields.join(', ')}</span>.</AlertDescription>
//           </Alert>
//         )}

//         <Accordion type="multiple" defaultValue={["personal", "identity", "documents"]} className="w-full space-y-3">
//           {/* Personal Details Section */}
//           <AccordionItem value="personal" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//              <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Personal & Contact Details</AccordionTrigger>
//              <AccordionContent className="px-4 pt-0 pb-0">
//                 <DetailItem label="First Name" value={kycData.firstName} icon={UserCircle} stepTarget='personal' isMissing={!kycData.firstName || kycData.firstName.trim() === ''} />
//                 <DetailItem label="Last Name" value={kycData.lastName} stepTarget='personal' isMissing={!kycData.lastName || kycData.lastName.trim() === ''} />
//                 <DetailItem label="Date of Birth" value={formatDateReview(kycData.dateOfBirth)} icon={CalendarDays} stepTarget='personal' isMissing={!kycData.dateOfBirth} />
//                 <DetailItem label="Mobile Number" value={kycData.mobile ? `${kycData.mobile.countryCode} ${kycData.mobile.number}` : undefined} icon={Phone} stepTarget='personal' isMissing={!kycData.mobile?.countryCode || !kycData.mobile?.number} />
//                 <DetailItem label="Nationality" value={kycData.nationality} icon={Globe} stepTarget='details' isMissing={!kycData.nationality || kycData.nationality.trim() === ''} />
//                 <DetailItem label="Occupation" value={kycData.occupation} icon={Briefcase} stepTarget='details' />
//                 <DetailItem label="Income Range" value={kycData.salaryRange ? salaryDisplayMap[kycData.salaryRange] : undefined} icon={BadgeDollarSign} stepTarget='details' />
//              </AccordionContent>
//           </AccordionItem>
//            {/* Identity Document Section */}
//            <AccordionItem value="identity" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//               <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Identity Document Details</AccordionTrigger>
//               <AccordionContent className="px-4 pt-0 pb-0">
//                  <DetailItem label="ID Type" value={idTypeDisplayName} icon={Fingerprint} stepTarget='identity' isMissing={!kycData.idType}/>
//                  <DetailItem label="ID Number" value={kycData.idNumber} stepTarget='identity' isMissing={!kycData.idNumber || kycData.idNumber.trim() === ''}/>
//                  <DetailItem label="Issue Date" value={formatDateReview(kycData.idIssueDate)} icon={CalendarDays} stepTarget='identity' isMissing={!kycData.idIssueDate}/>
//                  <DetailItem label="Expiry Date" value={formatDateReview(kycData.idExpiryDate)} stepTarget='identity' isMissing={!kycData.idExpiryDate}/>
//               </AccordionContent>
//            </AccordionItem>
//            {/* Uploaded Documents Section */}
//            <AccordionItem value="documents" className="border rounded-lg overflow-hidden shadow-sm bg-background dark:bg-secondary/30">
//               <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-3 bg-secondary/50 dark:bg-secondary/40 [&[data-state=open]>svg]:rotate-180">Uploaded Documents</AccordionTrigger>
//               <AccordionContent className="px-4 pt-0 pb-0">
//                   <DetailItem label={`Front of ${idTypeDisplayName}`} value={<FileDisplay file={fileState.idFrontFile} />} icon={FileText} stepTarget='upload' isMissing={!fileState.idFrontFile} className="items-center" />
//                   {kycData.idType === 'resident_permit' && ( <DetailItem label={`Back of ${idTypeDisplayName}`} value={<FileDisplay file={fileState.idBackFile} />} icon={FileText} stepTarget='upload' isMissing={!fileState.idBackFile} className="items-center" /> )}
//               </AccordionContent>
//            </AccordionItem>
//         </Accordion>

//         {/* Navigation / Submission Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t dark:border-border/50 mt-8 gap-4">
//           <Button type="button" variant="outline" onClick={() => goToStep('upload')} disabled={isSubmitting}><ArrowLeft className="mr-2 h-4 w-4" /> Back (Edit Uploads)</Button>
//           <Button
//             type="button"
//             onClick={handleSubmit}
//             disabled={isSubmitting || missingFields.length > 0} // Disable if submitting OR if fields are missing
//             size="lg"
//             className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
//             Confirm and Submit KYC
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// frontend/src/app/kyc/review/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// --- Context & State Types ---
import { useKyc, formStepOrder } from "../../contexts/KycContext";
import type {
  KycProgressData,
  KycFileState,
  KycStepId,
} from "../../contexts/KycContext";
import type { KycSubmissionPayload } from "@/app/services/kyc";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  FileText,
  UserCircle,
  CalendarDays,
  Phone,
  Globe,
  Briefcase,
  BadgeDollarSign,
  Fingerprint,
  Edit,
  FileWarning,
  ArrowLeft,
  Send,
  Image as ImageIcon,
} from "lucide-react";

// --- Utilities ---
import { format, isValid as isDateValid, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

// ============================================================================
// Helper Component & Functions (Includes corrected FileDisplay)
// ============================================================================

// --- DetailItem Component (Remains the same) ---
interface DetailItemProps {
  label: string;
  value?: string | null | React.ReactNode;
  icon?: React.ElementType;
  stepTarget: KycStepId;
  isMissing?: boolean;
  className?: string;
}
const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  icon: Icon,
  stepTarget,
  isMissing = false,
  className,
}) => {
  /* ... (No changes needed) ... */
  const { goToStep } = useKyc();
  const displayValue =
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
      ? "Not Provided"
      : value;
  const isEmptyOrMissing = displayValue === "Not Provided" || isMissing;
  const handleEditClick = useCallback(() => {
    goToStep(stepTarget);
  }, [goToStep, stepTarget]);
  return (
    <div
      className={cn(
        "py-3 flex flex-wrap justify-between items-center group border-b last:border-b-0 gap-4",
        className
      )}
    >
      <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
          {Icon && (
            <Icon
              className={cn(
                "size-4.5",
                isEmptyOrMissing
                  ? "text-muted-foreground/60"
                  : ""
              )}
            />
          )}
        </div>
        <dt
          className={cn(
            "text-sm font-medium truncate",
            isEmptyOrMissing ? "text-muted-foreground" : ""
          )}
        >
          {label}:
        </dt>
      </div>

      <dd className="flex items-center justify-end gap-1.5 text-neutral-900 dark:text-white">
        <span
          className={cn(
            "text-sm break-words",
            isEmptyOrMissing && !isMissing
              ? "text-muted-foreground italic"
              : "font-medium",
            isMissing
              ? "text-red-400 font-semibold italic flex items-center gap-1.5"
              : ""
          )}
        >
          {" "}
          {isMissing ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5 inline-block" /> Missing
            </>
          ) : (
            displayValue
          )}{" "}
        </span>
        {!isMissing && (
          <button
            onClick={handleEditClick}
            className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity h-7 w-7 flex-shrink-0 text-neutral-900 dark:text-white cursor-pointer"
            aria-label={`Edit ${label}`}
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
      </dd>
    </div>
  );
};

// --- Salary & Date Helpers (Remain the same) ---
const salaryDisplayMap: Record<string, string> = {
  "0-1000": "Below $10,000",
  "10000-50000": "$10,000 - $49,999",
  "50000-100000": "$50,000 - $99,999",
  "100000+": "$100,000 or more",
};
const formatDateReview = (dateString?: string): string | undefined => {
  if (!dateString) return undefined;
  try {
    const date = parseISO(dateString);
    return isDateValid(date)
      ? format(date, "MMMM d, yyyy")
      : `Invalid Date (${dateString})`;
  } catch {
    return `Invalid Date (${dateString})`;
  }
};

// --- FileDisplay Component (Corrected) ---
const FileDisplay: React.FC<{ file: File | null }> = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    let objectUrl: string | null = null;
    if (file && file.type !== "application/pdf") {
      objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!file)
    return <span className="text-muted-foreground italic">Not Uploaded</span>;
  const isPdf = file.type === "application/pdf";

  return (
    <div className="flex items-center justify-end gap-2 text-sm max-w-[250px] sm:max-w-xs md:max-w-sm">
      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={24}
            height={24}
            className="rounded object-cover border"
          />
        )}
        {isPdf && <FileText className="h-5 w-5 text-red-600" />}
        {!previewUrl && !isPdf && (
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <div className="flex-grow overflow-hidden">
        <span
          className="font-medium truncate text-foreground block"
          title={file.name}
        >
          {file.name}
        </span>
        <span className="text-xs text-muted-foreground whitespace-nowrap block">
          ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </span>
      </div>
    </div>
  );
};

// --- Data Validation Check (Remains the same) ---
const checkRequiredDataPresent = (
  data: KycProgressData,
  files: KycFileState
): string[] => {
  /* ... (No changes needed) ... */
  const missing: string[] = [];
  const requiredDataFields: (keyof KycSubmissionPayload)[] = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "mobile",
    "nationality",
    "idType",
    "idNumber",
    "idIssueDate",
    "idExpiryDate",
  ];
  requiredDataFields.forEach((field) => {
    if (field === "mobile") {
      if (!data.mobile || !data.mobile.countryCode || !data.mobile.number)
        missing.push("Mobile Number");
    } else {
      const value = data[field as keyof KycProgressData];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        const label = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        missing.push(label);
      }
    }
  });
  if (!files.idFrontFile) {
    missing.push("Front ID Document");
  }
  if (data.idType === "resident_permit" && !files.idBackFile) {
    missing.push("Back ID Document");
  }
  return missing;
};

// ============================================================================
// Main Component: KycReviewPage
// ============================================================================
export default function KycReviewPage() {
  const {
    kycData,
    fileState,
    goToStep,
    updateCurrentUiStepId,
    submitKycData,
    isInitialized: kycInitialized,
    isSubmitting,
    backendStatus,
    isLoadingStatus: kycLoadingStatus, // Get context loading status
    submissionError: contextSubmissionError, // Get error from context
  } = useKyc();

  const [localSubmitError, setLocalSubmitError] = useState<string | null>(null); // Local error for missing fields
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/review") {
      updateCurrentUiStepId("review");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Check data readiness and status
  useEffect(() => {
    if (!kycInitialized) {
      setIsPageLoading(true);
      return;
    }
    if (
      !["not_started", "rejected", "skipped", "loading"].includes(
        backendStatus as string
      )
    ) {
      setIsPageLoading(false);
      return; // Context handles redirect
    }
    const missing = checkRequiredDataPresent(kycData, fileState);
    setMissingFields(missing);
    setIsPageLoading(false);
  }, [kycInitialized, backendStatus, kycData, fileState]);

  // Handle Submission Attempt
  const handleSubmit = useCallback(async () => {
    setLocalSubmitError(null); // Clear local error first
    const currentMissing = checkRequiredDataPresent(kycData, fileState);
    setMissingFields(currentMissing);
    if (currentMissing.length > 0) {
      const errorMsg = `Cannot submit. Please complete: ${currentMissing.join(
        ", "
      )}.`;
      setLocalSubmitError(errorMsg);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Don't need try-catch here, context handles API errors and sets isSubmitting
    await submitKycData();
    // Context will update status and trigger redirection via its effects
    // Context also sets submissionError if API fails
  }, [kycData, fileState, submitKycData]);

  // --- Render Logic ---
  // Simplified Loading
  if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  // Waiting for Redirect
  if (
    !["not_started", "rejected", "skipped", "loading"].includes(
      backendStatus as string
    )
  ) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const idTypeDisplayName =
    kycData.idType === "passport"
      ? "Passport"
      : kycData.idType === "resident_permit"
      ? "Resident Permit / National ID"
      : "ID";
  const displayError = localSubmitError || contextSubmissionError; // Show local validation error first, then context API error

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn mb-10 p-4 md:p-8 ">
      <CardHeader className="border-b pb-6 mb-6 space-y-2">
        <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
          <CheckCircle className="h-6 w-6 text-primary mt-1" />
          Review & Submit&nbsp;(Step {formStepOrder.indexOf("review") + 1}
          &nbsp;of&nbsp;{formStepOrder.length})
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-300">
          Please carefully review all details. Click{" "}
          <Edit className="inline h-3 w-3 mx-1 text-muted-foreground" /> to make
          corrections.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display combined error */}
        {displayError && (
          <Alert className="bg-red-100 border-red-300 dark:bg-red-600/20 dark:border-red-700 rounded-lg p-4 mb-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-700 dark:text-red-400" />
            <div>
              <AlertTitle className="font-medium tracking-normal text-red-700 dark:text-red-400 text-base">
                Submission Problem
              </AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-300">
                {displayError}
              </AlertDescription>
            </div>
          </Alert>
        )}
        {/* Show missing fields warning only if no other error is present */}
        {missingFields.length > 0 && !displayError && (
          <Alert className="mb-4 border-yellow-600 text-yellow-600 bg-yellow-100 dark:bg-yellow-600/20 rounded-lg items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <AlertTitle className="font-semibold text-base">
              Incomplete Information
            </AlertTitle>
            <AlertDescription className="text-neutral-900 dark:text-white">
              Before submitting, please provide:
              <span className="font-light">{missingFields.join(", ")}.</span>
            </AlertDescription>
          </Alert>
        )}

        <Accordion
          type="multiple"
          defaultValue={["personal", "identity", "documents"]}
          className="w-full space-y-3"
        >
          {/* Personal Details Section */}
          <AccordionItem
            value="personal"
            className="border rounded-lg overflow-hidden bg-white dark:bg-background "
          >
            <AccordionTrigger className="text-base font-semibold text-neutral-900 dark:text-white hover:no-underline px-4 py-3 bg-accent [&[data-state=open]>svg]:rotate-180 rounded-none cursor-pointer">
              Personal & Contact Details
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-0">
              <DetailItem
                label="First Name"
                value={kycData.firstName}
                icon={UserCircle}
                stepTarget="personal"
                isMissing={!kycData.firstName}
              />
              <DetailItem
                label="Last Name"
                value={kycData.lastName}
                icon={UserCircle}
                stepTarget="personal"
                isMissing={!kycData.lastName}
              />
              <DetailItem
                label="Date of Birth"
                value={formatDateReview(kycData.dateOfBirth)}
                icon={CalendarDays}
                stepTarget="personal"
                isMissing={!kycData.dateOfBirth}
              />
              <DetailItem
                label="Mobile Number"
                value={
                  kycData.mobile
                    ? `${kycData.mobile.countryCode} ${kycData.mobile.number}`
                    : undefined
                }
                icon={Phone}
                stepTarget="personal"
                isMissing={
                  !kycData.mobile?.countryCode || !kycData.mobile?.number
                }
              />
              <DetailItem
                label="Nationality"
                value={kycData.nationality}
                icon={Globe}
                stepTarget="details"
                isMissing={!kycData.nationality}
              />
              <DetailItem
                label="Occupation"
                value={kycData.occupation}
                icon={Briefcase}
                stepTarget="details"
              />
              <DetailItem
                label="Income Range"
                value={
                  kycData.salaryRange
                    ? salaryDisplayMap[kycData.salaryRange]
                    : undefined
                }
                icon={BadgeDollarSign}
                stepTarget="details"
              />
            </AccordionContent>
          </AccordionItem>
          {/* Identity Document Section */}
          <AccordionItem
            value="identity"
            className="border rounded-lg overflow-hidden bg-white dark:bg-background"
          >
            <AccordionTrigger className="text-base font-semibold text-neutral-900 dark:text-white hover:no-underline px-4 py-3 bg-accent [&[data-state=open]>svg]:rotate-180 rounded-none cursor-pointer">
              Identity Document Details
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-0">
              <DetailItem
                label="ID Type"
                value={idTypeDisplayName}
                icon={Fingerprint}
                stepTarget="identity"
                isMissing={!kycData.idType}
              />
              <DetailItem
                label="ID Number"
                value={kycData.idNumber}
                icon={Fingerprint}
                stepTarget="identity"
                isMissing={!kycData.idNumber}
              />
              <DetailItem
                label="Issue Date"
                value={formatDateReview(kycData.idIssueDate)}
                icon={CalendarDays}
                stepTarget="identity"
                isMissing={!kycData.idIssueDate}
              />
              <DetailItem
                label="Expiry Date"
                value={formatDateReview(kycData.idExpiryDate)}
                icon={CalendarDays}
                stepTarget="identity"
                isMissing={!kycData.idExpiryDate}
              />
            </AccordionContent>
          </AccordionItem>
          {/* Uploaded Documents Section */}
          <AccordionItem
            value="documents"
            className="border rounded-lg overflow-hidden bg-white dark:bg-background"
          >
            <AccordionTrigger className="text-base font-semibold text-neutral-900 dark:text-white hover:no-underline px-4 py-3 bg-accent [&[data-state=open]>svg]:rotate-180 rounded-none cursor-pointer">
              Uploaded Documents
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-0">
              <DetailItem
                label={`Front of ${idTypeDisplayName}`}
                value={<FileDisplay file={fileState.idFrontFile} />}
                icon={FileText}
                stepTarget="upload"
                isMissing={!fileState.idFrontFile}
                className="items-center"
              />
              {kycData.idType === "resident_permit" && (
                <DetailItem
                  label={`Back of ${idTypeDisplayName}`}
                  value={<FileDisplay file={fileState.idBackFile} />}
                  icon={FileText}
                  stepTarget="upload"
                  isMissing={!fileState.idBackFile}
                  className="items-center"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Navigation / Submission Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
            onClick={() => goToStep("upload")}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 size-4.5" /> Back
          </button>
          {/* Go back to upload */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || missingFields.length > 0}
            className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
          >
            {isSubmitting ? (
              // ----- Loading State -----
              <>
                <svg
                  className="h-5 w-5 text-neutral-900 animate-spin mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true" // Hide decorative icon from screen readers
                >
                  <path
                    d="M12 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 4.93L7.76 7.76"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.24 16.24L19.07 19.07"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12H22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 19.07L7.76 16.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.24 7.76L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Confirm and Submit KYC</span>
              </>
            ) : (
              // ----- End Loading State -----
              // ----- Normal State -----
              <>
                <span>Confirm and Submit KYC</span>
                <Send className="ml-2 size-5" aria-hidden="true" />{" "}
                {/* Use ml-2 for margin before the icon */}
              </>
              // ----- End Normal State -----
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
