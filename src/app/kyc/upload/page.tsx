// // frontend/src/app/kyc/upload/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation'; // Changed from next/navigation
// import { useKyc } from '../../contexts/KycContext';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// // import FileUpload from '@/components/ui/FileUpload'; // Assuming a FileUpload component
// import { Loader2, UploadCloud, XCircle, CheckCircle } from 'lucide-react';
// import kycService from '@/app/services/kyc';
// import type { KycSubmissionPayload } from '@/app/services/kyc'; // Import the payload type
// import { useAuth } from '@/app/contexts/AuthContext'; // Import useAuth

// // Helper function to check if data is complete (example)
// const isDataComplete = (data: any): data is KycSubmissionPayload => {
//     return (
//         data.firstName && data.lastName && data.dateOfBirth && data.mobile?.number &&
//         data.nationality && data.idType && data.idNumber && data.idIssueDate && data.idExpiryDate
//         // Add checks for occupation/salary if they are mandatory
//     );
// };

// export default function KycUploadPage() {
//     const router = useRouter();
//     const { kycData, prevStep, goToStep, setFile, resetKycProgress } = useKyc();
//     const { refetchUser } = useAuth(); // Get refetch function from AuthContext
//     const [idFront, setIdFront] = useState<File | null>(null);
//     const [idBack, setIdBack] = useState<File | null>(null);
//     const [uploadError, setUploadError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Set file state in context when local state changes
//     useEffect(() => {
//         setFile('idFrontFile', idFront);
//     }, [idFront, setFile]);

//     useEffect(() => {
//         setFile('idBackFile', idBack);
//     }, [idBack, setFile]);

//      useEffect(() => {
//         goToStep('upload'); // Set current step
//     }, [goToStep]);

//      // Check if previous steps are complete before allowing upload
//      useEffect(() => {
//         if (!isDataComplete(kycData)) {
//              console.warn("KYC data incomplete, redirecting to start.");
//              // Optionally show a message before redirecting
//              // alert("Please complete the previous steps first.");
//              router.replace('/kyc/start'); // Or the last incomplete step
//          }
//      }, [kycData, router]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
//         const file = event.target.files?.[0];
//         if (file) {
//             // Basic validation (add more robust checks in FileUpload component)
//             if (file.size > 5 * 1024 * 1024) { // 5MB limit
//                 setUploadError(`File "${file.name}" is too large (max 5MB).`);
//                 return;
//             }
//             if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
//                  setUploadError(`Invalid file type for "${file.name}" (JPG, PNG, WEBP allowed).`);
//                 return;
//             }

//             setUploadError(null); // Clear previous error
//             if (type === 'front') {
//                 setIdFront(file);
//             } else {
//                 setIdBack(file);
//             }
//         }
//     };

//     const handleRemoveFile = (type: 'front' | 'back') => {
//         if (type === 'front') {
//             setIdFront(null);
//         } else {
//             setIdBack(null);
//         }
//         setUploadError(null); // Clear error when file removed
//     };

//     const handleSubmit = async () => {
//          setUploadError(null);
//          setIsSubmitting(true);

//          // Final Validation
//         if (!idFront) {
//              setUploadError('Please upload the front of your ID.');
//              setIsSubmitting(false);
//              return;
//         }
//         if (kycData.idType === 'resident_permit' && !idBack) {
//             setUploadError('Please upload the back of your Resident Permit.');
//             setIsSubmitting(false);
//             return;
//         }
//          if (!isDataComplete(kycData)) { // Double check data completeness
//              setUploadError("Incomplete information. Please go back and fill all required fields.");
//              setIsSubmitting(false);
//              return;
//          }

//          // Prepare payload (ensure types match KycSubmissionPayload)
//          const submissionData: KycSubmissionPayload = {
//             firstName: kycData.firstName!,
//             lastName: kycData.lastName!,
//             dateOfBirth: kycData.dateOfBirth!, // Should be ISO string from context
//             mobile: kycData.mobile!,
//             occupation: kycData.occupation,
//             salaryRange: kycData.salaryRange,
//             nationality: kycData.nationality!,
//             idType: kycData.idType!,
//             idNumber: kycData.idNumber!,
//             idIssueDate: kycData.idIssueDate!, // Should be ISO string from context
//             idExpiryDate: kycData.idExpiryDate!, // Should be ISO string from context
//          };

//          try {
//             console.log("Submitting KYC data:", submissionData);
//             console.log("With files:", idFront.name, idBack?.name);

//              await kycService.submitKyc(
//                  submissionData,
//                  idFront,
//                  kycData.idType === 'resident_permit' ? idBack : null // Only send back file if needed
//              );

//              console.log("KYC Submitted Successfully!");
//              resetKycProgress(); // Clear local storage and context state
//              await refetchUser(); // Update global user state in AuthContext
//              router.push('/kyc/pending'); // Redirect to pending page

//          } catch (error: any) {
//              console.error("KYC Submission failed:", error);
//              setUploadError(error.message || "An unexpected error occurred during submission.");
//          } finally {
//             setIsSubmitting(false);
//          }
//     };

//      // --- File Input Component (Simplified Example) ---
//      const FileInput = ({ id, label, file, onChange, onRemove, error }) => (
//          <div className="space-y-1">
//              <Label htmlFor={id} className="font-medium">{label}</Label>
//              <div className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${file ? 'bg-green-50 dark:bg-green-900/30 border-green-500' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
//                  {!file ? (
//                      <label htmlFor={id} className="flex flex-col items-center justify-center cursor-pointer text-center">
//                          <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
//                          <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag & drop</span>
//                          <span className="text-xs text-gray-400 dark:text-gray-500">(PNG, JPG, WEBP up to 5MB)</span>
//                          <input id={id} type="file" className="sr-only" onChange={onChange} accept="image/png, image/jpeg, image/webp" />
//                      </label>
//                  ) : (
//                      <div className="flex items-center justify-between w-full text-sm">
//                          <div className="flex items-center gap-2 overflow-hidden">
//                              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
//                              <span className="truncate text-green-700 dark:text-green-300 font-medium">{file.name}</span>
//                              <span className="text-gray-500 dark:text-gray-400 text-xs shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
//                          </div>
//                          <button type="button" onClick={onRemove} className="ml-2 text-red-500 hover:text-red-700 shrink-0">
//                              <XCircle className="w-5 h-5" />
//                          </button>
//                      </div>
//                  )}
//              </div>
//              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//          </div>
//      );
//      // --- End File Input Component ---

//     return (
//         <div className="space-y-5">
//              <h2 className="text-xl font-semibold mb-1 text-mainheading dark:text-white">Upload Documents</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
//                 Upload clear, colour images of your {kycData.idType === 'passport' ? 'Passport' : 'Resident Permit'}. Ensure all details are visible.
//             </p>

//              {uploadError && <p className="text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-sm">{uploadError}</p>}

//              {/* --- Replace with your actual FileUpload component --- */}
//              <FileInput
//                 id="id_front"
//                 label={`Front of ${kycData.idType === 'passport' ? 'Passport' : 'ID'}`}
//                 file={idFront}
//                 onChange={(e) => handleFileChange(e, 'front')}
//                 onRemove={() => handleRemoveFile('front')}
//                 error={!idFront && isSubmitting ? 'Front ID is required.' : null} // Show error on submit if missing
//              />

//              {/* Conditionally show back side upload for resident permit */}
//              {kycData.idType === 'resident_permit' && (
//                  <FileInput
//                     id="id_back"
//                     label="Back of ID"
//                     file={idBack}
//                     onChange={(e) => handleFileChange(e, 'back')}
//                     onRemove={() => handleRemoveFile('back')}
//                     error={!idBack && isSubmitting && kycData.idType === 'resident_permit' ? 'Back ID is required.' : null}
//                  />
//              )}
//              {/* --- End FileUpload component replacement --- */}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between items-center pt-6">
//                 <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                     Back
//                 </Button>
//                 <Button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={isSubmitting || !idFront || (kycData.idType === 'resident_permit' && !idBack)}
//                 >
//                     {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                     Submit Verification
//                 </Button>
//                  {/* Optional: Add a Review Step button */}
//                  {/* <Button type="button" variant="secondary" onClick={nextStep} disabled={isSubmitting || !idFront || (kycData.idType === 'resident_permit' && !idBack)}>Review</Button> */}
//             </div>
//         </div>
//     );
// }

// // frontend/src/app/kyc/upload/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { useKyc } from '../../contexts/KycContext';
// import { Button } from '@/components/ui/button';
// import { Loader2, UploadCloud, FileCheck, XCircle, AlertTriangle } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Label } from '@/components/ui/label'; // Using Shadcn Label

// // Reusable File Input Component (using Shadcn styles)
// interface FileInputProps {
//     id: string;
//     label: string;
//     file: File | null;
//     onFileChange: (file: File | null) => void;
//     accept?: string;
//     required?: boolean;
//     isSubmitted?: boolean; // To show validation error after trying to proceed
// }

// const FileInputComponent: React.FC<FileInputProps> = ({
//     id, label, file, onFileChange, accept = "image/png, image/jpeg, image/webp", required = false, isSubmitted = false
// }) => {
//     const [dragOver, setDragOver] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const MAX_SIZE_MB = 5;
//     const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

//     const handleFileSelect = (selectedFile: File | null) => {
//         setError(null); // Clear previous error
//         if (selectedFile) {
//             // Validation
//             if (selectedFile.size > MAX_SIZE_BYTES) {
//                 setError(`File size exceeds ${MAX_SIZE_MB}MB.`);
//                 onFileChange(null); // Clear invalid file
//                 return;
//             }
//             const allowedTypes = accept.split(',').map(t => t.trim());
//             if (!allowedTypes.includes(selectedFile.type)) {
//                 setError(`Invalid file type. Allowed: ${accept}.`);
//                 onFileChange(null); // Clear invalid file
//                 return;
//             }
//             onFileChange(selectedFile);
//         } else {
//             onFileChange(null);
//         }
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         handleFileSelect(event.target.files?.[0] ?? null);
//          // Reset input value to allow re-uploading the same file name
//          event.target.value = '';
//     };

//     const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//         event.preventDefault();
//         setDragOver(false);
//         handleFileSelect(event.dataTransfer.files?.[0] ?? null);
//     };

//     const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//         event.preventDefault();
//         setDragOver(true);
//     };

//     const handleDragLeave = () => {
//         setDragOver(false);
//     };

//     const handleRemove = () => {
//         onFileChange(null);
//         setError(null);
//     };

//      const showRequiredError = required && isSubmitted && !file;

//     return (
//         <div className="space-y-2">
//             <Label htmlFor={id} className={cn("font-medium", showRequiredError && "text-destructive")}>{label}{required && '*'}</Label>
//             <div className={cn(
//                 "flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md transition-colors",
//                 dragOver && "border-primary bg-primary/10",
//                 file && !error && "border-green-500 bg-green-50 dark:bg-green-900/30",
//                 error && "border-destructive bg-destructive/10",
//                 showRequiredError && "border-destructive",
//                 !file && !error && !dragOver && "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500"
//             )}>
//                 {!file ? (
//                     <label
//                         htmlFor={id}
//                         className="flex flex-col items-center justify-center cursor-pointer text-center w-full py-4"
//                         onDrop={handleDrop}
//                         onDragOver={handleDragOver}
//                         onDragLeave={handleDragLeave}
//                     >
//                         <UploadCloud className={cn("w-10 h-10 mb-2", dragOver ? "text-primary" : "text-gray-400")} />
//                         <span className={cn("text-sm font-medium", dragOver ? "text-primary" : "text-gray-600 dark:text-gray-300")}>
//                              {dragOver ? 'Drop file here' : 'Click or drag & drop'}
//                          </span>
//                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//                              {accept.toUpperCase().replaceAll(',', ', ')} (Max {MAX_SIZE_MB}MB)
//                          </span>
//                         <input id={id} type="file" className="sr-only" onChange={handleChange} accept={accept} />
//                     </label>
//                 ) : (
//                     <div className="flex items-center justify-between w-full text-sm">
//                         <div className="flex items-center gap-2 overflow-hidden">
//                             <FileCheck className="w-5 h-5 text-green-600 shrink-0" />
//                             <span className="truncate text-green-700 dark:text-green-300 font-medium">{file.name}</span>
//                             <span className="text-gray-500 dark:text-gray-400 text-xs shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
//                         </div>
//                         <button type="button" onClick={handleRemove} title="Remove file" className="ml-2 text-red-500 hover:text-red-700 shrink-0 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
//                             <XCircle className="w-5 h-5" />
//                         </button>
//                     </div>
//                 )}
//             </div>
//             {(error || showRequiredError) && <p className="text-sm text-destructive">{error || (showRequiredError && `${label} is required.`)}</p>}
//         </div>
//     );
// };

// // --- Helper function to check if essential previous data exists ---
// const checkPreviousData = (data: any): boolean => {
//     return !!(data.firstName && data.lastName && data.dateOfBirth && data.mobile?.number &&
//            data.nationality && data.idType && data.idNumber && data.idIssueDate && data.idExpiryDate);
// };

// export default function KycUploadPage() {
//     const router = useRouter();
//     const { kycData, fileState, setFile, nextStep, prevStep, goToStep } = useKyc();
//     const [formError, setFormError] = useState<string | null>(null);
//     const [hasTriedProceed, setHasTriedProceed] = useState(false); // Track if user clicked Continue

//     // Effect to set the current step in the context
//      useEffect(() => {
//         goToStep('upload');
//     }, [goToStep]);

//     // Effect to check if previous steps data exists, redirect if not
//      useEffect(() => {
//         if (!checkPreviousData(kycData)) {
//              console.warn("KYC data from previous steps is incomplete. Redirecting to start.");
//              // Consider showing a toast message here before redirecting
//              router.replace('/kyc/start');
//          }
//      }, [kycData, router]);

//     const handleProceedToReview = () => {
//         setHasTriedProceed(true); // Mark that the user attempted to proceed
//         setFormError(null);

//         // Validation: Check if required files are uploaded
//         const isFrontUploaded = !!fileState.idFrontFile;
//         const isBackRequired = kycData.idType === 'resident_permit';
//         const isBackUploaded = !!fileState.idBackFile;

//         if (!isFrontUploaded) {
//             setFormError('Please upload the front of your ID.');
//             return;
//         }
//         if (isBackRequired && !isBackUploaded) {
//             setFormError('Please upload the back of your ID.');
//             return;
//         }

//         // If validation passes, navigate to the next step (Review)
//         nextStep();
//     };

//     // If previous data check is still loading or redirecting, show nothing
//     if (!checkPreviousData(kycData)) {
//         return <div className="flex justify-center items-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-md">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold">Upload Documents</CardTitle>
//                 <CardDescription>
//                     Upload clear, colour images of your chosen ID ({kycData.idType === 'passport' ? 'Passport' : 'Resident Permit/National ID'}). Ensure all details are visible and not blurry.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="space-y-6">
//                  {formError && (
//                      <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
//                         <AlertTriangle className="h-5 w-5 shrink-0" />
//                         <span>{formError}</span>
//                      </div>
//                  )}

//                 {/* Front ID Upload */}
//                 <FileInputComponent
//                     id="id_front"
//                     label="Front of ID"
//                     file={fileState.idFrontFile}
//                     onFileChange={(file) => setFile('idFrontFile', file)}
//                     required={true}
//                     isSubmitted={hasTriedProceed}
//                 />

//                  {/* Back ID Upload (Conditional) */}
//                  {kycData.idType === 'resident_permit' && (
//                      <FileInputComponent
//                         id="id_back"
//                         label="Back of ID"
//                         file={fileState.idBackFile}
//                         onFileChange={(file) => setFile('idBackFile', file)}
//                         required={true}
//                         isSubmitted={hasTriedProceed}
//                     />
//                  )}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                     <Button type="button" variant="outline" onClick={prevStep}>
//                         Back
//                     </Button>
//                     <Button
//                         type="button"
//                         onClick={handleProceedToReview}
//                         // Basic check: disable if required files definitely aren't selected yet
//                         disabled={!fileState.idFrontFile || (kycData.idType === 'resident_permit' && !fileState.idBackFile)}
//                     >
//                         Continue to Review
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/review/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useKyc } from '../../contexts/KycContext';
// import { Button } from '@/components/ui/button';
// import { Loader2, AlertTriangle, CheckCircle, FileText, UserCircle, CalendarDays, Phone, Globe, Briefcase, BadgeDollarSign, Fingerprint } from 'lucide-react';
// import kycService from '@/app/services/kyc';
// import type { KycSubmissionPayload } from '@/app/services/kyc';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { format } from 'date-fns'; // For formatting dates
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // For collapsing sections

// // Helper to display data nicely within sections
// const DetailItem = ({ label, value, icon: Icon }: { label: string, value?: string | null | React.ReactNode, icon?: React.ElementType }) => {
//     // No change needed here, handles undefined/null values correctly
//     if (value === null || value === undefined || value === '') return null;
//     return (
//         <div className="py-2 grid grid-cols-[auto,1fr] gap-x-3 items-center">
//              {Icon && <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
//              {!Icon && <div className="w-4"></div>} {/* Placeholder for alignment */}
//             <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}:</dt>
//             <dd className="text-sm text-gray-900 dark:text-gray-100 break-words">{value}</dd>
//         </div>
//     );
// };

// // Salary range options for display label lookup
// const salaryDisplayOptions: Record<string, string> = {
//     '0-1000': 'Below $10,000',
//     '10000-50000': '$10,000 - $50,000',
//     '50000-100000': '$50,000 - $100,000',
//     '100000+': 'Over $100,000',
// };

// // --- Helper function to check if all required data for submission is present ---
// // This logic remains the same - only checks for back file if idType requires it
// const checkAllDataForSubmission = (data: any, files: any): boolean => {
//     const requiredDataFields: (keyof KycSubmissionPayload)[] = [
//         'firstName', 'lastName', 'dateOfBirth', 'mobile',
//         'nationality', 'idType', 'idNumber', 'idIssueDate', 'idExpiryDate'
//     ];
//     // Check that all required fields exist and mobile object has content
//     const hasRequiredData = requiredDataFields.every(field => {
//         const value = data[field];
//         if (field === 'mobile') {
//             return !!(value && value.countryCode && value.number);
//         }
//         return !!value; // Check for truthiness for other fields
//     });

//     const hasFrontFile = !!files.idFrontFile;
//     const needsBackFile = data.idType === 'resident_permit';
//     const hasBackFile = !!files.idBackFile;

//     // Log checks for debugging
//     // console.log('Data check:', hasRequiredData, 'Front file:', hasFrontFile, 'Needs back:', needsBackFile, 'Has back:', hasBackFile);

//     return hasRequiredData && hasFrontFile && (!needsBackFile || hasBackFile);
// };

// export default function KycReviewPage() {
//     const router = useRouter();
//     const { kycData, fileState, prevStep, goToStep, resetKycProgress } = useKyc();
//     const { refetchUser } = useAuth();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);

//     // Effect to set the current step in the context
//     useEffect(() => {
//         goToStep('review');
//     }, [goToStep]);

//      // Check if data is complete before allowing review/submit, redirect if not
//      const isDataReady = useMemo(() => checkAllDataForSubmission(kycData, fileState), [kycData, fileState]);
//      useEffect(() => {
//         // Redirect immediately if data isn't ready on mount or change
//         if (!isDataReady) {
//              console.warn("KYC data incomplete for review, redirecting to start.");
//              // Use replace to prevent adding the review page to history
//              router.replace('/kyc/start');
//          }
//      }, [isDataReady, router]); // Depend on isDataReady and router

//     // Handle the final submission
//     const handleSubmit = async () => {
//         // Re-check data readiness right before submitting
//         if (!checkAllDataForSubmission(kycData, fileState)) { // Use the check function directly
//              setSubmitError("Incomplete information or missing files. Please go back and complete all steps.");
//              return;
//          }

//         setIsSubmitting(true);
//         setSubmitError(null);

//         // Prepare the submission payload
//          const submissionData: KycSubmissionPayload = {
//              firstName: kycData.firstName!, lastName: kycData.lastName!,
//              dateOfBirth: kycData.dateOfBirth!, mobile: kycData.mobile!,
//              occupation: kycData.occupation,
//              salaryRange: kycData.salaryRange,
//              nationality: kycData.nationality!, idType: kycData.idType!,
//              idNumber: kycData.idNumber!, idIssueDate: kycData.idIssueDate!,
//              idExpiryDate: kycData.idExpiryDate!,
//          };

//          try {
//             console.log("Submitting KYC data:", submissionData);
//             console.log("With files:", fileState.idFrontFile?.name, fileState.idBackFile?.name);

//             // Ensure files are not null before passing (should be guaranteed by checkAllDataForSubmission)
//             if (!fileState.idFrontFile) {
//                 throw new Error("Front ID file is missing unexpectedly.");
//             }

//             // Call the service function with data and files
//             await kycService.submitKyc(
//                  submissionData,
//                  fileState.idFrontFile,
//                  // Send back file only if it exists (it might exist even for passport if user uploaded it)
//                  fileState.idBackFile ? fileState.idBackFile : null
//              );

//              console.log("KYC Submitted Successfully!");
//              resetKycProgress();
//              await refetchUser();
//              router.push('/kyc/pending');

//          } catch (error: any) {
//              console.error("KYC Submission failed in Review Page:", error);
//              // Use the message from the thrown error in kycService, which should be detailed
//              setSubmitError(error.message || "An unexpected error occurred during submission.");
//              setIsSubmitting(false);
//          }
//     };

//      // Helper to format date strings safely
//      const formatDate = (dateString?: string) => {
//          if (!dateString) return 'N/A';
//          try { return format(new Date(dateString), 'MMMM d, yyyy'); }
//          catch { return dateString; }
//      };

//      // Display file name or 'Not Uploaded'
//      const displayFileName = (file: File | null) => {
//          return file ? (
//              <span className="flex items-center gap-1 text-green-700 dark:text-green-300">
//                  <CheckCircle className="h-4 w-4" /> {file.name}
//              </span>
//          ) : (
//              // Display consistent message if file is null
//              <span className="text-gray-500 dark:text-gray-400">Not provided</span>
//          );
//      };

//      // If data isn't ready yet (effect is redirecting), show loading
//      // This check is important to prevent rendering before redirection happens
//      if (!isDataReady) {
//          return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//              </div>
//             );
//      }

//     return (
//          <Card className="w-full max-w-2xl mx-auto shadow-md">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold">Review Your Information</CardTitle>
//                 <CardDescription>Please check all details carefully. Ensure everything matches your official documents before submitting.</CardDescription>
//             </CardHeader>
//              <CardContent className="space-y-6">

//                  {submitError && (
//                       <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/30">
//                         <AlertTriangle className="h-5 w-5 shrink-0" />
//                         <span>{submitError}</span>
//                      </div>
//                  )}

//                 <Accordion type="multiple" defaultValue={['personal', 'identity', 'documents']} className="w-full">
//                     {/* Personal & Details Section */}
//                     <AccordionItem value="personal">
//                         <AccordionTrigger className="text-lg font-medium hover:no-underline">Personal & Contact Details</AccordionTrigger>
//                         <AccordionContent className="pt-2 space-y-1">
//                              <DetailItem label="First Name" value={kycData.firstName} icon={UserCircle}/>
//                              <DetailItem label="Last Name" value={kycData.lastName} />
//                              <DetailItem label="Date of Birth" value={formatDate(kycData.dateOfBirth)} icon={CalendarDays}/>
//                              <DetailItem label="Mobile Number" value={`${kycData.mobile?.countryCode || ''} ${kycData.mobile?.number || ''}`} icon={Phone}/>
//                              <DetailItem label="Nationality" value={kycData.nationality} icon={Globe}/>
//                              <DetailItem label="Occupation" value={kycData.occupation || 'Not Specified'} icon={Briefcase}/>
//                              <DetailItem label="Income Range" value={kycData.salaryRange ? salaryDisplayOptions[kycData.salaryRange] : 'Not Specified'} icon={BadgeDollarSign}/>
//                         </AccordionContent>
//                     </AccordionItem>

//                     {/* Identity Document Section */}
//                     <AccordionItem value="identity">
//                         <AccordionTrigger className="text-lg font-medium hover:no-underline">Identity Document</AccordionTrigger>
//                         <AccordionContent className="pt-2 space-y-1">
//                             <DetailItem label="ID Type" value={kycData.idType === 'passport' ? 'Passport' : 'Resident Permit / National ID'} icon={Fingerprint}/>
//                             <DetailItem label="ID Number" value={kycData.idNumber} />
//                             <DetailItem label="Issue Date" value={formatDate(kycData.idIssueDate)} icon={CalendarDays}/>
//                             <DetailItem label="Expiry Date" value={formatDate(kycData.idExpiryDate)} />
//                         </AccordionContent>
//                     </AccordionItem>

//                     {/* Uploaded Documents Section */}
//                      <AccordionItem value="documents">
//                         <AccordionTrigger className="text-lg font-medium hover:no-underline">Uploaded Documents</AccordionTrigger>
//                         <AccordionContent className="pt-2 space-y-1">
//                              {/* Front ID is always shown */}
//                              <DetailItem label="Front ID Document" value={displayFileName(fileState.idFrontFile)} icon={FileText} />
//                              {/* Back ID Document is always shown */}
//                              <DetailItem label="Back ID Document" value={displayFileName(fileState.idBackFile)} icon={FileText} />
//                         </AccordionContent>
//                     </AccordionItem>
//                 </Accordion>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
//                     <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                         Back (Edit Uploads)
//                     </Button>
//                     <Button
//                         type="button"
//                         onClick={handleSubmit}
//                         // Disable button based on the *actual* submission requirements check
//                         disabled={isSubmitting || !isDataReady}
//                     >
//                         {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                         Confirm and Submit Verification
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/upload/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, UploadCloud, FileCheck, AlertTriangle, FileX, CheckCircle, ArrowLeft, ArrowRight, Image as ImageIcon, File as FileIcon } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { KycFileState } from '../../contexts/KycContext';

// // --- Constants ---
// const MAX_FILE_SIZE_MB = 5;
// const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, application/pdf";
// const ACCEPTED_FILE_TYPES_STRING = ".jpg, .png, .pdf";

// // ============================================================================
// // Helper Component: FileInput
// // ============================================================================
// interface FileInputProps {
//     id: string; label: string; required: boolean; file: File | null;
//     onFileChange: (file: File | null) => void;
//     accept?: string; maxSizeMB?: number; disabled?: boolean;
// }

// const FileInput: React.FC<FileInputProps> = ({
//     id, label, required, file, onFileChange,
//     accept = ACCEPTED_FILE_TYPES, maxSizeMB = MAX_FILE_SIZE_MB, disabled
// }) => {
//     const [preview, setPreview] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isPdf, setIsPdf] = useState(false);

//     useEffect(() => {
//         let objectUrl: string | null = null;
//         if (file) {
//             const fileType = file.type;
//             setIsPdf(fileType === 'application/pdf');
//             if (fileType.startsWith('image/')) {
//                 objectUrl = URL.createObjectURL(file); setPreview(objectUrl);
//             } else { setPreview(null); }
//         } else { setPreview(null); setIsPdf(false); }
//         return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//     }, [file]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setError(null);
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             const acceptedTypesArray = accept.split(',').map(t => t.trim());
//             if (!acceptedTypesArray.includes(selectedFile.type)) {
//                  setError(`Invalid file type. Please upload ${ACCEPTED_FILE_TYPES_STRING}.`);
//                  onFileChange(null); event.target.value = ''; return;
//             }
//             const maxSizeBytes = maxSizeMB * 1024 * 1024;
//              if (selectedFile.size > maxSizeBytes) {
//                  setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
//                  onFileChange(null); event.target.value = ''; return;
//             }
//             onFileChange(selectedFile);
//         } else { onFileChange(null); }
//     };

//     const handleRemoveFile = () => {
//         onFileChange(null); setError(null);
//         const inputElement = document.getElementById(id) as HTMLInputElement;
//         if (inputElement) inputElement.value = '';
//     };

//     return (
//         <div className="space-y-2">
//             <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
//                 {label} {required && <span className="text-destructive ml-1">*</span>}
//             </label>
//             {file ? (
//                 <div className={cn("p-3 border rounded-md flex flex-col sm:flex-row items-center gap-3", "border-green-500 bg-green-50 dark:bg-green-900/20")}>
//                     <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded border">
//                         {preview ? (<Image src={preview} alt="Preview" width={64} height={64} className="object-contain h-full w-full rounded" />)
//                         : isPdf ? (<FileIcon className="h-8 w-8 text-red-600" />)
//                         : (<FileCheck className="h-8 w-8 text-green-600" />)}
//                     </div>
//                     <div className="flex-grow text-sm text-center sm:text-left overflow-hidden">
//                         <p className="font-medium text-green-800 dark:text-green-200 truncate" title={file.name}>{file.name}</p>
//                         <p className="text-xs text-muted-foreground">{file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <Button type="button" variant="ghost" size="sm" onClick={handleRemoveFile} className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0" disabled={disabled} aria-label={`Remove ${label}`}><FileX className="h-4 w-4 mr-1" /> Remove</Button>
//                 </div>
//             ) : (
//                 <div className="flex items-center justify-center w-full">
//                     <label htmlFor={id} className={cn("flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors", "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600", "hover:bg-gray-100 hover:border-primary/50 dark:hover:bg-gray-800 dark:hover:border-primary/70", disabled ? "opacity-50 cursor-not-allowed" : "", error ? "border-destructive bg-destructive/5 hover:border-destructive" : "")}>
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
//                             <UploadCloud className={cn("w-8 h-8 mb-3", error ? "text-destructive/80" : "text-gray-400")} />
//                             <p className={cn("mb-2 text-sm", error ? "text-destructive" : "text-gray-500 dark:text-gray-400")}><span className="font-semibold">Click to upload</span> or drag & drop</p>
//                             <p className={cn("text-xs", error ? "text-destructive/90" : "text-gray-500 dark:text-gray-400")}>{ACCEPTED_FILE_TYPES_STRING} (MAX. {maxSizeMB}MB)</p>
//                         </div>
//                         <input id={id} type="file" className="hidden" onChange={handleFileChange} accept={accept} disabled={disabled} />
//                     </label>
//                 </div>
//             )}
//             {error && (<p className="text-sm text-destructive flex items-center gap-1 pt-1"><AlertTriangle className="h-4 w-4 flex-shrink-0"/>{error}</p>)}
//         </div>
//     );
// };

// // ============================================================================
// // Main Component: KycUploadPage
// // ============================================================================
// export default function KycUploadPage() {
//     const router = useRouter(); // Keep for potential future redirects if context fails
//     const {
//         kycData, fileState, setFile, nextStep, prevStep, updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isProcessing, setIsProcessing] = useState(false); // Local state for "Continue" click
//     const [isPageLoading, setIsPageLoading] = useState(true);

//     // Effect 1: Set UI step
//     useEffect(() => { if (kycInitialized) updateCurrentUiStepId('upload'); }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check prerequisites (ID Type must be selected)
//     useEffect(() => {
//         if (!kycInitialized) { setIsPageLoading(true); return; }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             // console.log("UploadPage: Skipping render due to backend status:", backendStatus);
//             setIsPageLoading(false); return;
//         }

//         // CRITICAL CHECK: Ensure idType is present
//         if (!kycData.idType) {
//             console.warn("UploadPage: Prerequisite 'idType' missing. Redirecting to identity step.");
//             goToStep('identity'); // Redirect back
//             return; // Stop further processing as we are navigating away
//         }
//         setIsPageLoading(false); // Prerequisites met

//     }, [kycInitialized, kycData.idType, backendStatus, goToStep]);

//     // Determine if back side is required
//     const isBackRequired = useMemo(() => kycData.idType === 'resident_permit', [kycData.idType]);

//     // Check if form is currently valid (all required files present)
//     const isFormValid = useMemo(() => {
//         const frontOk = !!fileState.idFrontFile;
//         const backOk = isBackRequired ? !!fileState.idBackFile : true;
//         return frontOk && backOk;
//     }, [fileState.idFrontFile, fileState.idBackFile, isBackRequired]);

//     // Handle "Continue" button click
//     const handleContinue = () => {
//         setFormError(null); setIsProcessing(true);
//         if (!isFormValid) {
//             const missing = [];
//             if (!fileState.idFrontFile) missing.push("Front ID Document");
//             if (isBackRequired && !fileState.idBackFile) missing.push("Back ID Document");
//             const errorMsg = `Please upload required documents: ${missing.join(', ')}.`;
//             console.error("UploadPage: Continue blocked, missing files.");
//             setFormError(errorMsg); setIsProcessing(false); return;
//         }
//         // console.log("UploadPage: Form valid, proceeding to review step.");
//         nextStep(); // Navigate via context
//     };

//      // Callback for FileInput component
//      const handleFileUpdate = useCallback((type: keyof KycFileState, file: File | null) => {
//         setFile(type, file); setFormError(null); // Update context and clear local error
//     }, [setFile]);

//     // --- Render Logic ---
//     if (isPageLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//      const idTypeDisplayName = kycData.idType === 'passport' ? 'Passport' : 'Resident Permit / National ID';

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <UploadCloud className="h-6 w-6 text-primary" />
//                     Upload Documents (Step {formStepOrder.indexOf('upload') + 1} of {formStepOrder.length})
//                 </CardTitle>
//                 <CardDescription>
//                     Upload clear images or PDFs of your selected <span className='font-medium'>{idTypeDisplayName}</span>.
//                     Ensure all text and photo are readable. Avoid glare or cropping.
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 p-6 md:p-8">
//                  {formError && ( <Alert variant="destructive"> {/* ... error display ... */} </Alert> )}

//                 {/* Front ID Upload */}
//                 <FileInput id="idFrontFile" label={`Front of ${idTypeDisplayName}`} required={true} file={fileState.idFrontFile} onFileChange={(file) => handleFileUpdate('idFrontFile', file)} disabled={isProcessing} />

//                 {/* Back ID Upload (Conditional) */}
//                 {kycData.idType === 'resident_permit' && (
//                     <FileInput id="idBackFile" label={`Back of ${idTypeDisplayName}`} required={true} file={fileState.idBackFile} onFileChange={(file) => handleFileUpdate('idBackFile', file)} disabled={isProcessing} />
//                 )}

//                 {/* Info for Passport */}
//                  {kycData.idType === 'passport' && (
//                      <Alert variant="info" className="mt-4"> <CheckCircle className="h-4 w-4" /> <AlertTitle>Passport Upload</AlertTitle> <AlertDescription>Only the main photo page is required.</AlertDescription> </Alert>
//                   )}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center pt-6 border-t dark:border-border/50 mt-8">
//                     <Button type="button" variant="outline" onClick={prevStep} disabled={isProcessing}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
//                     <Button type="button" onClick={handleContinue} disabled={isProcessing || !isFormValid}>{isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue to Review</Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/upload/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Loader2, UploadCloud, FileCheck, AlertTriangle, FileX, CheckCircle, ArrowLeft, ArrowRight, Image as ImageIcon, File as FileIcon } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { KycFileState } from '../../contexts/KycContext';

// // --- Constants ---
// const MAX_FILE_SIZE_MB = 5;
// const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, application/pdf";
// const ACCEPTED_FILE_TYPES_STRING = ".jpg, .png, .pdf";

// // ============================================================================
// // Helper Component: FileInput
// // ============================================================================
// interface FileInputProps {
//     id: string; label: string; required: boolean; file: File | null;
//     onFileChange: (file: File | null) => void;
//     accept?: string; maxSizeMB?: number; disabled?: boolean;
// }

// const FileInput: React.FC<FileInputProps> = ({
//     id, label, required, file, onFileChange,
//     accept = ACCEPTED_FILE_TYPES, maxSizeMB = MAX_FILE_SIZE_MB, disabled
// }) => {
//     const [preview, setPreview] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isPdf, setIsPdf] = useState(false);

//     useEffect(() => {
//         let objectUrl: string | null = null;
//         if (file) {
//             const fileType = file.type;
//             setIsPdf(fileType === 'application/pdf');
//             if (fileType.startsWith('image/')) {
//                 objectUrl = URL.createObjectURL(file); setPreview(objectUrl);
//             } else { setPreview(null); }
//         } else { setPreview(null); setIsPdf(false); }
//         return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//     }, [file]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setError(null);
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             const acceptedTypesArray = accept.split(',').map(t => t.trim());
//             if (!acceptedTypesArray.includes(selectedFile.type)) {
//                  setError(`Invalid file type. Please upload ${ACCEPTED_FILE_TYPES_STRING}.`);
//                  onFileChange(null); event.target.value = ''; return;
//             }
//             const maxSizeBytes = maxSizeMB * 1024 * 1024;
//              if (selectedFile.size > maxSizeBytes) {
//                  setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
//                  onFileChange(null); event.target.value = ''; return;
//             }
//             onFileChange(selectedFile);
//         } else { onFileChange(null); }
//     };

//     const handleRemoveFile = () => {
//         onFileChange(null); setError(null);
//         const inputElement = document.getElementById(id) as HTMLInputElement;
//         if (inputElement) inputElement.value = '';
//     };

//     return (
//         <div className="space-y-2">
//             <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
//                 {label} {required && <span className="text-destructive ml-1">*</span>}
//             </label>
//             {file ? (
//                 <div className={cn("p-3 border rounded-md flex flex-col sm:flex-row items-center gap-3", "border-green-500 bg-green-50 dark:bg-green-900/20")}>
//                     <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded border">
//                         {preview ? (<Image src={preview} alt="Preview" width={64} height={64} className="object-contain h-full w-full rounded" />)
//                         : isPdf ? (<FileIcon className="h-8 w-8 text-red-600" />)
//                         : (<FileCheck className="h-8 w-8 text-green-600" />)}
//                     </div>
//                     <div className="flex-grow text-sm text-center sm:text-left overflow-hidden">
//                         <p className="font-medium text-green-800 dark:text-green-200 truncate" title={file.name}>{file.name}</p>
//                         <p className="text-xs text-muted-foreground">{file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <Button type="button" variant="ghost" size="sm" onClick={handleRemoveFile} className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0" disabled={disabled} aria-label={`Remove ${label}`}><FileX className="h-4 w-4 mr-1" /> Remove</Button>
//                 </div>
//             ) : (
//                 <div className="flex items-center justify-center w-full">
//                     <label htmlFor={id} className={cn("flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors", "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600", "hover:bg-gray-100 hover:border-primary/50 dark:hover:bg-gray-800 dark:hover:border-primary/70", disabled ? "opacity-50 cursor-not-allowed" : "", error ? "border-destructive bg-destructive/5 hover:border-destructive" : "")}>
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
//                             <UploadCloud className={cn("w-8 h-8 mb-3", error ? "text-destructive/80" : "text-gray-400")} />
//                             <p className={cn("mb-2 text-sm", error ? "text-destructive" : "text-gray-500 dark:text-gray-400")}><span className="font-semibold">Click to upload</span> or drag & drop</p>
//                             <p className={cn("text-xs", error ? "text-destructive/90" : "text-gray-500 dark:text-gray-400")}>{ACCEPTED_FILE_TYPES_STRING} (MAX. {maxSizeMB}MB)</p>
//                         </div>
//                         <input id={id} type="file" className="hidden" onChange={handleFileChange} accept={accept} disabled={disabled} />
//                     </label>
//                 </div>
//             )}
//             {error && (<p className="text-sm text-destructive flex items-center gap-1 pt-1"><AlertTriangle className="h-4 w-4 flex-shrink-0"/>{error}</p>)}
//         </div>
//     );
// };

// // ============================================================================
// // Main Component: KycUploadPage
// // ============================================================================
// export default function KycUploadPage() {
//     const router = useRouter(); // Keep for potential future redirects if context fails
//     const {
//         kycData, fileState, setFile, nextStep, prevStep, updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isProcessing, setIsProcessing] = useState(false); // Local state for "Continue" click
//     const [isPageLoading, setIsPageLoading] = useState(true);

//     // Effect 1: Set UI step
//     useEffect(() => { if (kycInitialized) updateCurrentUiStepId('upload'); }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Check prerequisites (ID Type must be selected)
//     useEffect(() => {
//         if (!kycInitialized) { setIsPageLoading(true); return; }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             // console.log("UploadPage: Skipping render due to backend status:", backendStatus);
//             setIsPageLoading(false); return;
//         }

//         // CRITICAL CHECK: Ensure idType is present
//         if (!kycData.idType) {
//             console.warn("UploadPage: Prerequisite 'idType' missing. Redirecting to identity step.");
//             goToStep('identity'); // Redirect back
//             return; // Stop further processing as we are navigating away
//         }
//         setIsPageLoading(false); // Prerequisites met

//     }, [kycInitialized, kycData.idType, backendStatus, goToStep]);

//     // Determine if back side is required
//     const isBackRequired = useMemo(() => kycData.idType === 'resident_permit', [kycData.idType]);

//     // Check if form is currently valid (all required files present)
//     const isFormValid = useMemo(() => {
//         const frontOk = !!fileState.idFrontFile;
//         const backOk = isBackRequired ? !!fileState.idBackFile : true;
//         return frontOk && backOk;
//     }, [fileState.idFrontFile, fileState.idBackFile, isBackRequired]);

//     // Handle "Continue" button click
//     const handleContinue = () => {
//         setFormError(null); setIsProcessing(true);
//         if (!isFormValid) {
//             const missing = [];
//             if (!fileState.idFrontFile) missing.push("Front ID Document");
//             if (isBackRequired && !fileState.idBackFile) missing.push("Back ID Document");
//             const errorMsg = `Please upload required documents: ${missing.join(', ')}.`;
//             console.error("UploadPage: Continue blocked, missing files.");
//             setFormError(errorMsg); setIsProcessing(false); return;
//         }
//         // console.log("UploadPage: Form valid, proceeding to review step.");
//         nextStep(); // Navigate via context
//     };

//      // Callback for FileInput component
//      const handleFileUpdate = useCallback((type: keyof KycFileState, file: File | null) => {
//         setFile(type, file); setFormError(null); // Update context and clear local error
//     }, [setFile]);

//     // --- Render Logic ---
//     if (isPageLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//      const idTypeDisplayName = kycData.idType === 'passport' ? 'Passport' : 'Resident Permit / National ID';

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <UploadCloud className="h-6 w-6 text-primary" />
//                     Upload Documents (Step {formStepOrder.indexOf('upload') + 1} of {formStepOrder.length})
//                 </CardTitle>
//                 <CardDescription>
//                     Upload clear images or PDFs of your selected <span className='font-medium'>{idTypeDisplayName}</span>.
//                     Ensure all text and photo are readable. Avoid glare or cropping.
//                 </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 p-6 md:p-8">
//                  {formError && (
//                     <Alert variant="destructive">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertTitle>Missing Documents</AlertTitle>
//                         <AlertDescription>{formError}</AlertDescription>
//                     </Alert>
//                  )}

//                 {/* Front ID Upload */}
//                 <FileInput id="idFrontFile" label={`Front of ${idTypeDisplayName}`} required={true} file={fileState.idFrontFile} onFileChange={(file) => handleFileUpdate('idFrontFile', file)} disabled={isProcessing} />

//                 {/* Back ID Upload (Conditional) */}
//                 {kycData.idType === 'resident_permit' && (
//                     <FileInput id="idBackFile" label={`Back of ${idTypeDisplayName}`} required={true} file={fileState.idBackFile} onFileChange={(file) => handleFileUpdate('idBackFile', file)} disabled={isProcessing} />
//                 )}

//                 {/* Info for Passport */}
//                 {kycData.idType === 'passport' && (
//                      // FIX: Removed invalid variant="info". Default variant with appropriate icon works.
//                      <Alert className="mt-4 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
//                          <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                          <AlertTitle className="text-blue-800 dark:text-blue-200 font-semibold">Passport Upload</AlertTitle>
//                          <AlertDescription className="text-blue-700 dark:text-blue-300">
//                              Only the main photo page is required.
//                          </AlertDescription>
//                      </Alert>
//                   )}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center pt-6 border-t dark:border-border/50 mt-8">
//                     <Button type="button" variant="outline" onClick={prevStep} disabled={isProcessing}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
//                     <Button type="button" onClick={handleContinue} disabled={isProcessing || !isFormValid}>{isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue to Review</Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/upload/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Loader2,
//   UploadCloud,
//   FileCheck,
//   AlertTriangle,
//   FileX,
//   CheckCircle,
//   ArrowLeft,
//   ArrowRight,
//   Image as ImageIcon,
//   File as FileIcon,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import type { KycFileState } from "../../contexts/KycContext";

// // --- Constants ---
// const MAX_FILE_SIZE_MB = 5;
// const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, application/pdf";
// const ACCEPTED_FILE_TYPES_STRING = ".jpg, .png, .pdf";

// // ============================================================================
// // Helper Component: FileInput (Remains the same)
// // ============================================================================
// interface FileInputProps {
//   id: string;
//   label: string;
//   required: boolean;
//   file: File | null;
//   onFileChange: (file: File | null) => void;
//   accept?: string;
//   maxSizeMB?: number;
//   disabled?: boolean;
// }
// const FileInput: React.FC<FileInputProps> = ({
//   id,
//   label,
//   required,
//   file,
//   onFileChange,
//   accept = ACCEPTED_FILE_TYPES,
//   maxSizeMB = MAX_FILE_SIZE_MB,
//   disabled,
// }) => {
//   /* ... (No changes needed in FileInput component itself) ... */
//   const [preview, setPreview] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isPdf, setIsPdf] = useState(false);

//   useEffect(() => {
//     let objectUrl: string | null = null;
//     if (file) {
//       const fileType = file.type;
//       setIsPdf(fileType === "application/pdf");
//       if (fileType.startsWith("image/")) {
//         objectUrl = URL.createObjectURL(file);
//         setPreview(objectUrl);
//       } else {
//         setPreview(null);
//       }
//     } else {
//       setPreview(null);
//       setIsPdf(false);
//     }
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [file]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setError(null);
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       const acceptedTypesArray = accept.split(",").map((t) => t.trim());
//       if (!acceptedTypesArray.includes(selectedFile.type)) {
//         setError(
//           `Invalid file type. Please upload ${ACCEPTED_FILE_TYPES_STRING}.`
//         );
//         onFileChange(null);
//         event.target.value = "";
//         return;
//       }
//       const maxSizeBytes = maxSizeMB * 1024 * 1024;
//       if (selectedFile.size > maxSizeBytes) {
//         setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
//         onFileChange(null);
//         event.target.value = "";
//         return;
//       }
//       onFileChange(selectedFile);
//     } else {
//       onFileChange(null);
//     }
//   };

//   const handleRemoveFile = () => {
//     onFileChange(null);
//     setError(null);
//     const inputElement = document.getElementById(id) as HTMLInputElement;
//     if (inputElement) inputElement.value = "";
//   };

//   return (
//     <div className="space-y-2">
//       <label
//         htmlFor={id}
//         className="text-sm text-neutral-900 dark:text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
//       >
//         {" "}
//         {label} {required && <span className="text-red-500 ml-1">*</span>}{" "}
//       </label>
//       {file ? (
//         <div
//           className={cn(
//             "p-3 border rounded-md flex flex-col sm:flex-row items-center gap-3",
//             "border-green-600 bg-green-100 dark:bg-green-600/20"
//           )}
//         >
//           <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-white dark:bg-background rounded border">
//             {" "}
//             {preview ? (
//               <Image
//                 src={preview}
//                 alt="Preview"
//                 width={64}
//                 height={64}
//                 className="object-contain h-full w-full rounded"
//               />
//             ) : isPdf ? (
//               <FileIcon className="h-8 w-8 text-red-600" />
//             ) : (
//               <FileCheck className="h-8 w-8 text-green-600" />
//             )}{" "}
//           </div>
//           <div className="flex-grow text-sm text-center sm:text-left overflow-hidden space-y-1">
//             {" "}
//             <p
//               className="font-medium text-green-800 dark:text-green-200 truncate text-wrap"
//               title={file.name}
//             >
//               {file.name}
//             </p>{" "}
//             <p className="text-xs text-gray-500 dark:text=gray-300">
//               {file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB
//             </p>{" "}
//           </div>
//           <button
//             type="button"
//             onClick={handleRemoveFile}
//             className="inline-flex items-center text-red-600 bg-red-100 dark:bg-red-600/20 hover ml-2 py-1.5 px-4 cursor-pointer rounded-full text-sm"
//             disabled={disabled}
//             aria-label={`Remove ${label}`}
//           >
//             <FileX className="h-4 w-4 mr-1" /> Remove
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center w-full">
//           <label
//             htmlFor={id}
//             className={cn(
//               "flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-input hover:border-primary rounded-lg cursor-pointer transition-colors",
//               "hover:bg-accent bg-popover",
//               disabled ? "opacity-50 cursor-not-allowed" : "",
//               error
//                 ? "border-destructive bg-destructive/5 hover:border-destructive"
//                 : ""
//             )}
//           >
//             <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
//               {" "}
//               <UploadCloud
//                 className={cn(
//                   "w-8 h-8 mb-3",
//                   error ? "text-red-400" : "text-gray-500 dark:text-gray-300"
//                 )}
//               />{" "}
//               <p
//                 className={cn(
//                   "mb-2 text-sm",
//                   error
//                     ? "text-destructive"
//                     : "text-gray-500 dark:text-gray-300"
//                 )}
//               >
//                 <span className="font-semibold">Click to upload</span> or drag &
//                 drop
//               </p>{" "}
//               <p
//                 className={cn(
//                   "text-xs",
//                   error
//                     ? "text-destructive/90"
//                     : "text-gray-500 dark:text-gray-300"
//                 )}
//               >
//                 {ACCEPTED_FILE_TYPES_STRING} (MAX. {maxSizeMB}MB)
//               </p>{" "}
//             </div>
//             <input
//               id={id}
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//               accept={accept}
//               disabled={disabled}
//             />
//           </label>
//         </div>
//       )}
//       {error && (
//         <p className="text-sm text-destructive flex items-center gap-1 pt-1">
//           <AlertTriangle className="h-4 w-4 flex-shrink-0" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };
// // ============================================================================
// // Main Component: KycUploadPage
// // ============================================================================
// export default function KycUploadPage() {
//   const {
//     kycData,
//     fileState,
//     setFile,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     goToStep,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [formError, setFormError] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false); // Local state for "Continue" click
//   const [isPageLoading, setIsPageLoading] = useState(true); // Local loading for prerequisite check

//   // Effect 1: Set UI step
//   useEffect(() => {
//     if (kycInitialized && window.location.pathname === "/kyc/upload") {
//       updateCurrentUiStepId("upload");
//     }
//   }, [kycInitialized, updateCurrentUiStepId]);

//   // Effect 2: Check prerequisites (ID Type) and Status
//   useEffect(() => {
//     if (!kycInitialized) {
//       setIsPageLoading(true);
//       return;
//     }
//     // If status not suitable, context handles redirect
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//       setIsPageLoading(false);
//       return;
//     }

//     // CRITICAL CHECK: Ensure idType is present before allowing upload page access
//     if (!kycData.idType) {
//       console.warn(
//         "UploadPage: Prerequisite 'idType' missing. Redirecting to identity step."
//       );
//       goToStep("identity"); // Redirect back if idType not set
//       return; // Stop further processing
//     }
//     setIsPageLoading(false); // Prerequisites met
//   }, [kycInitialized, kycData.idType, backendStatus, goToStep]);

//   const isBackRequired = useMemo(
//     () => kycData.idType === "resident_permit",
//     [kycData.idType]
//   );
//   const isFormValid = useMemo(() => {
//     const frontOk = !!fileState.idFrontFile;
//     const backOk = isBackRequired ? !!fileState.idBackFile : true;
//     return frontOk && backOk;
//   }, [fileState.idFrontFile, fileState.idBackFile, isBackRequired]);

//   const handleContinue = useCallback(() => {
//     setFormError(null);
//     setIsProcessing(true);
//     if (!isFormValid) {
//       const missing = [];
//       if (!fileState.idFrontFile) missing.push("Front ID Document");
//       if (isBackRequired && !fileState.idBackFile)
//         missing.push("Back ID Document");
//       setFormError(`Please upload required documents: ${missing.join(", ")}.`);
//       setIsProcessing(false);
//       return;
//     }
//     nextStep(); // Navigate via context
//     // isProcessing will reset on page unmount
//   }, [isFormValid, nextStep, fileState, isBackRequired]); // Dependencies

//   const handleFileUpdate = useCallback(
//     (type: keyof KycFileState, file: File | null) => {
//       setFile(type, file);
//       setFormError(null);
//     },
//     [setFile]
//   );

//   // --- Render Logic ---
//   // Simplified Loading
//   if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         {" "}
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />{" "}
//       </div>
//     );
//   }
//   // Waiting for Redirect
//   if (
//     !["not_started", "rejected", "skipped", "loading"].includes(
//       backendStatus as string
//     )
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   const idTypeDisplayName =
//     kycData.idType === "passport"
//       ? "Passport"
//       : "Resident Permit / National ID";

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg border animate-fadeIn sm:p-8 p-4">
//       <CardHeader className="border-b mb-6 pb-6 space-y-2">
//         <CardTitle className="text-2xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
//           <UploadCloud className="h-6 w-6 text-primary mt-1" /> Upload Documents&nbsp;(Step {formStepOrder.indexOf("upload") + 1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Upload clear images or PDFs of your selected&nbsp;
//           <span className="font-semibold">{idTypeDisplayName}</span>. Ensure all
//           text and photo are readable.{" "}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {formError && (
//           <Alert variant="destructive">
//             <AlertTriangle className="h-4 w-4" />
//             <AlertTitle>Missing Documents</AlertTitle>
//             <AlertDescription>{formError}</AlertDescription>
//           </Alert>
//         )}
//         {/* Front ID Upload */}
//         <FileInput
//           id="idFrontFile"
//           label={`Front of ${idTypeDisplayName}`}
//           required={true}
//           file={fileState.idFrontFile}
//           onFileChange={(file) => handleFileUpdate("idFrontFile", file)}
//           disabled={isProcessing}
//         />
//         {/* Back ID Upload (Conditional) */}
//         {isBackRequired && (
//           <FileInput
//             id="idBackFile"
//             label={`Back of ${idTypeDisplayName}`}
//             required={true}
//             file={fileState.idBackFile}
//             onFileChange={(file) => handleFileUpdate("idBackFile", file)}
//             disabled={isProcessing}
//           />
//         )}
//         {/* Info for Passport */}
//         {kycData.idType === "passport" && (
//           <Alert className="mt-4 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
            
//             <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//             <AlertTitle className="text-blue-800 dark:text-blue-200 font-semibold">
//               Passport Upload
//             </AlertTitle>
//             <AlertDescription className="text-blue-700 dark:text-blue-300">
              
//               Only the main photo page is required.
//             </AlertDescription>
//           </Alert>
//         )}
//         {/* Navigation Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//             onClick={prevStep}
//             disabled={isProcessing}
//           >
//             <ArrowLeft className="mr-2 size-4.5" /> Back
//           </button>
//           <button
//             type="button"
//             className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//             onClick={handleContinue}
//             disabled={isProcessing || !isFormValid}
//           >
//             Continue to Review
//             {isProcessing ? (
//               <Loader2 className="ml-2 size-4.5 animate-spin" />
//             ) : (
//               <ArrowRight className="ml-2 size-4.5" />
//             )}
//           </button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }






// frontend/src/app/kyc/upload/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation"; // Keep if needed elsewhere, not used directly here
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  FileX,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  File as FileIcon,
} from "lucide-react";

// --- App Specific Imports ---
import { useKyc, formStepOrder } from "../../contexts/KycContext";
import type { KycFileState } from "../../contexts/KycContext";

// --- Constants ---
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, application/pdf";
const ACCEPTED_FILE_TYPES_STRING = ".jpg, .png, .pdf";

// ============================================================================
// Helper Component: FileInput
// ============================================================================
interface FileInputProps {
  id: string;
  label: string;
  required: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
}
const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  required,
  file,
  onFileChange,
  accept = ACCEPTED_FILE_TYPES,
  maxSizeMB = MAX_FILE_SIZE_MB,
  disabled,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (file) {
      const fileType = file.type;
      setIsPdf(fileType === "application/pdf");
      if (fileType.startsWith("image/")) {
        objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        setPreview(null); // Don't show preview for non-image files (like PDF)
      }
      setError(null); // Clear error when a file is successfully set
    } else {
      setPreview(null);
      setIsPdf(false);
      // Don't clear error here, let it persist until a *valid* file is chosen or removed
    }
    // Cleanup function to revoke the object URL
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]); // Rerun effect only when the file prop changes

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear previous errors on new selection attempt
    const inputElement = event.target; // Keep reference to input element
    const selectedFile = inputElement.files?.[0];

    if (selectedFile) {
      // Validate Type
      const acceptedTypesArray = accept.split(",").map((t) => t.trim());
      if (!acceptedTypesArray.includes(selectedFile.type)) {
        setError(
          `Invalid file type. Please upload ${ACCEPTED_FILE_TYPES_STRING}.`
        );
        onFileChange(null); // Reset file state in parent
        inputElement.value = ""; // Clear the input value
        return;
      }
      // Validate Size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (selectedFile.size > maxSizeBytes) {
        setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
        onFileChange(null); // Reset file state in parent
        inputElement.value = ""; // Clear the input value
        return;
      }
      // If valid, update parent state
      onFileChange(selectedFile);
    } else {
      // No file selected (e.g., user cancelled)
      onFileChange(null);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null); // Reset file state in parent
    setError(null); // Clear any errors
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) inputElement.value = ""; // Clear the input value
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm text-neutral-900 dark:text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
      >
        {label} {/* Add red asterisk if required */}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {file ? (
        // Display when file is selected
        <div
          className={cn(
            "p-4 border rounded-lg flex flex-col sm:flex-row items-center gap-3 relative", // Added relative for potential absolute positioning inside
            "border-green-600 bg-green-50 dark:bg-green-900/20 dark:border-green-700" // Adjusted colors
          )}
        >
          {/* Preview Area */}
          <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-background dark:bg-muted rounded border overflow-hidden">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={64}
                height={64}
                className="object-contain h-full w-full" // Use object-contain
              />
            ) : isPdf ? (
              <FileIcon className="h-8 w-8 text-red-600" /> // PDF icon
            ) : (
              <FileCheck className="h-8 w-8 text-green-600" /> // Generic file icon
            )}
          </div>
          {/* File Info */}
          <div className="flex-grow text-sm text-center sm:text-left overflow-hidden space-y-1">
            <p
              className="font-medium text-green-800 dark:text-green-400 break-words" // Use break-words
              title={file.name}
            >
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemoveFile}
            className={cn(
              "inline-flex items-center justify-center text-red-600",
              "bg-red-100 dark:bg-red-600/20 hover:bg-red-200 dark:hover:bg-red-600/30",
              "ml-0 mt-2 sm:mt-0 sm:ml-2 py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-75 ease-linear", // Adjusted padding/size
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
            disabled={disabled}
            aria-label={`Remove ${label}`}
          >
            <FileX className="h-4 w-4 mr-1" /> Remove
          </button>
        </div>
      ) : (
        // Display when no file is selected (upload area)
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={id}
            className={cn(
              "flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
              disabled
                ? "opacity-50 cursor-not-allowed bg-muted/50 border-gray-300 dark:border-gray-700"
                : "",
              error
                ? "bg-red-100 dark:bg-red-600/10 border-red-600 hover:bg-red-500/20 dark:hover:bg-red-500/20"
                : "bg-background hover:bg-accent border-input hover:border-primary dark:border-input dark:hover:border-primary"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
              <UploadCloud
                className={cn(
                  "w-8 h-8 mb-3",
                  error
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-400 dark:text-gray-500"
                )}
                aria-hidden="true"
              />
              <p
                className={cn(
                  "mb-1 text-sm",
                  error
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <span className="font-semibold">Click to upload</span> or drag &
                drop
              </p>
              <p
                className={cn(
                  "text-xs",
                  error
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {ACCEPTED_FILE_TYPES_STRING} (MAX. {maxSizeMB}MB)
              </p>
            </div>
            <input
              id={id}
              type="file"
              className="hidden" // Keep hidden
              onChange={handleFileChange}
              accept={accept}
              disabled={disabled}
              aria-label={`Upload ${label}`} // Add aria-label
            />
          </label>
        </div>
      )}
      {/* Error Message Area */}
      {error && !file && ( // Only show error if there's an error *and* no file is currently selected
        <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-1 pt-1">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// Main Component: KycUploadPage
// ============================================================================
export default function KycUploadPage() {
  const {
    kycData,
    fileState,
    setFile,
    nextStep,
    prevStep,
    updateCurrentUiStepId,
    goToStep,
    isInitialized: kycInitialized,
    backendStatus,
    isLoadingStatus: kycLoadingStatus,
  } = useKyc();

  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/upload") {
      updateCurrentUiStepId("upload");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Check prerequisites and status
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
      // Context handles redirect based on status usually
      setIsPageLoading(false);
      return;
    }
    if (!kycData.idType) {
      console.warn(
        "UploadPage: Prerequisite 'idType' missing. Redirecting to identity step."
      );
      goToStep("identity");
      return;
    }
    setIsPageLoading(false);
  }, [kycInitialized, kycData.idType, backendStatus, goToStep]);

  // Determine if back side is needed based on ID type
  const isBackRequired = useMemo(
    () => kycData.idType === "resident_permit",
    [kycData.idType]
  );

  // Determine form validity based on required files
  const isFormValid = useMemo(() => {
    const frontOk = !!fileState.idFrontFile;
    const backOk = isBackRequired ? !!fileState.idBackFile : true; // Back only required if isBackRequired is true
    return frontOk && backOk;
  }, [fileState.idFrontFile, fileState.idBackFile, isBackRequired]);

  // Handler for updating file state in context
  const handleFileUpdate = useCallback(
    (type: keyof KycFileState, file: File | null) => {
      setFile(type, file);
      setFormError(null); // Clear form-level error when a file is updated
    },
    [setFile]
  );

  // Handler for the "Continue" button click
  const handleContinue = useCallback(() => {
    setFormError(null); // Clear previous errors
    if (!isFormValid) {
      // This check is technically redundant because the button is disabled,
      // but good as a safeguard or if button state logic changes.
      const missing = [];
      if (!fileState.idFrontFile) missing.push(`Front of ${idTypeDisplayName}`);
      if (isBackRequired && !fileState.idBackFile)
        missing.push(`Back of ${idTypeDisplayName}`);
      setFormError(`Please upload required document(s): ${missing.join(", ")}.`);
      return;
    }
    setIsProcessing(true); // Set processing state
    // Simulate async operation if needed, then navigate
    // For now, just navigate
    nextStep();
    // isProcessing will be reset on component unmount or could be reset after async operation
  }, [isFormValid, nextStep, fileState, isBackRequired, kycData.idType]); // Added idType dependency for idTypeDisplayName

  // Display name for the selected ID type
  const idTypeDisplayName = useMemo(() =>
    kycData.idType === "passport"
      ? "Passport"
      : "Resident Permit / National ID"
  , [kycData.idType]);

  // --- Render Logic ---
  if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (
    !["not_started", "rejected", "skipped", "loading"].includes(
      backendStatus as string
    )
  ) {
    // This state likely means the context is about to redirect or show a status page
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4">
      <CardHeader className="border-b mb-6 pb-6 space-y-2">
        <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
          <UploadCloud className="h-6 w-6 text-primary mt-1" />
          Upload Documents (Step {formStepOrder.indexOf("upload") + 1} of{" "}
          {formStepOrder.length})
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-300">
          Upload clear images or PDFs of your selected 
          <span className="font-semibold">{idTypeDisplayName}</span>. Ensure all
          text and photo are readable. Fields marked with{" "}
          <span className="text-red-600">*</span> are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {" "}
        {/* Increased spacing */}
        {formError && (
          <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
            <div className="flex-shrink-0 sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20">
              <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
            <div>
              <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
                Missing Documents
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300/90">
                {formError}
              </AlertDescription>
            </div>
          </Alert>
        )}
        {/* Front ID Upload */}
        <FileInput
          id="idFrontFile"
          label={`Front of ${idTypeDisplayName}`}
          required={true} // Always required
          file={fileState.idFrontFile}
          onFileChange={(file) => handleFileUpdate("idFrontFile", file)}
          disabled={isProcessing}
        />
        {/* Back ID Upload (Conditional) */}
        {isBackRequired && (
          <FileInput
            id="idBackFile"
            label={`Back of ${idTypeDisplayName}`}
            required={true} // Required only when isBackRequired is true
            file={fileState.idBackFile}
            onFileChange={(file) => handleFileUpdate("idBackFile", file)}
            disabled={isProcessing}
          />
        )}
        {/* Info for Passport */}
        {kycData.idType === "passport" && (
          <Alert className="bg-blue-50 dark:bg-blue-900/25 border-blue-500 rounded-lg p-4 gap-3">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-blue-600/20">
              <CheckCircle className="text-blue-600 dark:text-blue-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
            <div>
              <AlertTitle className="font-medium text-blue-800 dark:text-blue-200 tracking-normal text-base">
                Passport Upload
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-300/90">
                Only the main photo page (the page with your photo and personal
                details) is required.
              </AlertDescription>
            </div>
          </Alert>
        )}
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-8 gap-4">
          {" "}
          {/* Increased margin-top */}
          <button
            type="button"
            className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevStep}
            disabled={isProcessing} // Disable back button while processing next step
          >
            <ArrowLeft className="mr-2 size-4.5" /> Back
          </button>
          <button
            type="button"
            className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
            onClick={handleContinue}
            disabled={isProcessing || !isFormValid} // Disable if processing OR if required files are missing
          >
            {isProcessing ? (
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
                <span>Continue to Review...</span>
              </>
            ) : (
              // ----- End Loading State -----
              // ----- Normal State -----
              <>
                <span>Continue to Review</span>
                <ArrowRight className="ml-2 size-5" aria-hidden="true" />{" "}
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