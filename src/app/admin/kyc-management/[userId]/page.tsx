// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import kycAdminService from '../../../services/admin/kyc.admin';
// import type { AdminKycUserResponse, KycDetails } from '../../../services/admin/kyc.admin';

// // Icons (Keep using react-icons or similar)
// import {  LuArrowLeft, LuExternalLink } from 'react-icons/lu';
// import { FiAlertCircle ,FiCheckCircle ,FiXCircle } from "react-icons/fi";
// import { TbLoader2 } from "react-icons/tb";

// // --- Helper Functions (Keep as they are utility functions) ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         if (isNaN(date.getTime())) return 'Invalid Date';
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'long', day: 'numeric',
//             ...(includeTime && { hour: 'numeric', minute: '2-digit', hour12: true })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) { return 'Invalid Date'; }
// };

// const formatMobile = (mobile?: KycDetails['mobile']): string => {
//     if (!mobile || !mobile.countryCode || !mobile.number) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// // --- Custom Button Styling (Example) ---
// // Base styles can be applied directly or via a utility function/component if preferred
// const buttonBaseStyle = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
// const primaryButtonStyle = `${buttonBaseStyle} text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`; // Example primary
// const successButtonStyle = `${buttonBaseStyle} text-white bg-green-600 hover:bg-green-700 focus:ring-green-500`;
// const dangerButtonStyle = `${buttonBaseStyle} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`;
// const outlineButtonStyle = `${buttonBaseStyle} text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-indigo-500`;

// const KycUserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const userId = params.userId as string;

//     // --- State Management (Keep as is) ---
//     const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [actionError, setActionError] = useState<string | null>(null);
//     const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
//     const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//     const [rejectionReason, setRejectionReason] = useState<string>('');

//     // --- Fetching and Action Logic (Keep as is) ---
//     const fetchUserDetails = useCallback(async () => {
//         if (!userId) return;
//         setIsLoading(true);
//         setError(null);
//         setActionError(null);
//         try {
//             const data = await kycAdminService.getKycDetailsAdmin(userId);
//             setUserData(data);
//         } catch (err: any) {
//             setError(err.message || 'An unknown error occurred while fetching user details.');
//             setUserData(null);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [userId]);

//     useEffect(() => {
//         fetchUserDetails();
//     }, [fetchUserDetails]);

//     const handleApprove = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending') return;
//         setIsProcessingAction(true);
//         setActionError(null);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             setActionError(err.message || 'Failed to approve KYC.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     const openRejectModal = () => {
//         setRejectionReason('');
//         setActionError(null);
//         setShowRejectionModal(true);
//     };

//     const submitRejection = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending') return;
//         if (!rejectionReason.trim()) {
//             setActionError("Rejection reason cannot be empty.");
//             return;
//         }
//         setIsProcessingAction(true);
//         setActionError(null);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'rejected', rejectionReason: rejectionReason.trim() });
//             setShowRejectionModal(false);
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             setActionError(err.message || 'Failed to reject KYC.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     // --- Custom Render Functions ---

//     // --- Custom Loading Skeleton ---
//     const renderLoading = () => (
//         <div className="space-y-6 animate-pulse">
//             {/* Back button area */}
//             <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
//             {/* Main content block */}
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//                 {/* Header */}
//                 <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
//                 <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
//                 {/* Content Sections */}
//                 <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>)}
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                        {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>)}
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     </div>
//                     <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-6 mb-2"></div> {/* Section header */}
//                      <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div> {/* Status area */}
//                 </div>
//             </div>
//         </div>
//     );

//     // --- Custom Error Message Display ---
//     const renderError = (message: string | null, isActionError = false) => {
//         if (!message) return null;
//         return (
//             <div className={`border-l-4 p-4 mb-4 ${isActionError ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'}`} role="alert">
//                 <div className="flex items-center">
//                     <FiAlertCircle className={`h-5 w-5 mr-3 ${isActionError ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
//                     <div>
//                         <p className={`text-sm font-medium ${isActionError ? 'text-red-800 dark:text-red-300' : 'text-yellow-800 dark:text-yellow-300'}`}>
//                             {isActionError ? 'Action Failed' : 'Error Loading Details'}
//                         </p>
//                         <p className={`text-sm ${isActionError ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'}`}>{message}</p>
//                         {!isActionError && (
//                              <button onClick={fetchUserDetails} className={`${outlineButtonStyle} mt-3 text-xs px-3 py-1`}>
//                                 Retry
//                             </button>
//                          )}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // --- Custom Rejection Modal ---
//     const renderRejectionModal = () => {
//         if (!showRejectionModal) return null;

//         return (
//             // Modal Wrapper (Overlay + Content)
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-labelledby="rejection-modal-title" role="dialog" aria-modal="true">
//                 {/* Overlay */}
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={() => !isProcessingAction && setShowRejectionModal(false)}></div>

//                 {/* Modal Content */}
//                 <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
//                     {/* Header */}
//                     <h2 id="rejection-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">Reject KYC Application</h2>
//                     <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
//                         Please provide a reason for rejecting this user's KYC application. This reason will be visible to the user.
//                     </p>

//                     {/* Body - Form */}
//                     <div className="mt-4 space-y-2">
//                         <label htmlFor="rejectionReasonInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Reason <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                             id="rejectionReasonInput"
//                             rows={4}
//                             value={rejectionReason}
//                             onChange={(e) => setRejectionReason(e.target.value)}
//                             placeholder="Enter reason for rejection..."
//                             className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                             aria-describedby="rejection-error"
//                         ></textarea>
//                          {/* Display modal-specific error */}
//                          {actionError && (
//                               <p id="rejection-error" className="text-sm text-red-600 dark:text-red-400">{actionError}</p>
//                           )}
//                     </div>

//                     {/* Footer - Actions */}
//                     <div className="mt-6 flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={() => setShowRejectionModal(false)}
//                             className={outlineButtonStyle}
//                             disabled={isProcessingAction}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             onClick={submitRejection}
//                             className={dangerButtonStyle}
//                             disabled={isProcessingAction || !rejectionReason.trim()}
//                         >
//                             {isProcessingAction && <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />}
//                             Confirm Rejection
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // --- Render User Details (Main Content) ---
//     const renderUserDetails = () => {
//         if (!userData) return <p className="text-center text-gray-500 dark:text-gray-400">No user data available.</p>;
//         const kyc = userData.kyc;

//         // Function to render a section
//         const renderSection = (title: string, children: React.ReactNode) => (
//             <section className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">{title}</h3>
//                 {children}
//             </section>
//         );

//         // Function to render key-value pairs
//         const renderDetailItem = (label: string, value: React.ReactNode) => (
//             <div>
//                 <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
//                 <p className="mt-1 text-sm text-gray-900 dark:text-white">{value || 'N/A'}</p>
//             </div>
//         );

//         return (
//             // Replaces Card
//             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//                 {/* Replaces CardHeader */}
//                 <div className="mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Details: {userData.fullName}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Review submitted information for {userData.email}.</p>
//                 </div>

//                 {/* Replaces CardContent - Sections */}
//                  {renderError(actionError, true)} {/* Display action errors prominently */}

//                 {renderSection("Personal Information", (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//                         {renderDetailItem("First Name", kyc?.firstName)}
//                         {renderDetailItem("Last Name", kyc?.lastName)}
//                         {renderDetailItem("Date of Birth", formatDate(kyc?.dateOfBirth))}
//                         {renderDetailItem("Mobile", formatMobile(kyc?.mobile))}
//                         {renderDetailItem("Nationality", kyc?.nationality)}
//                         {renderDetailItem("Occupation", kyc?.occupation)}
//                         {renderDetailItem("Salary Range", kyc?.salaryRange)}
//                     </div>
//                 ))}

//                 {renderSection("Identification", (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//                         {renderDetailItem("ID Type", <span className="capitalize">{kyc?.idType?.replace('_', ' ')}</span>)}
//                         {renderDetailItem("ID Number", kyc?.idNumber)}
//                         {renderDetailItem("ID Issue Date", formatDate(kyc?.idIssueDate))}
//                         {renderDetailItem("ID Expiry Date", formatDate(kyc?.idExpiryDate))}
//                     </div>
//                 ))}

//                 {renderSection("Submitted Documents", (
//                     kyc?.documents && kyc.documents.length > 0 ? (
//                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             {kyc.documents.map((doc) => (
//                                 <a
//                                     key={doc.public_id}
//                                     href={doc.url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-indigo-600 dark:text-indigo-400 font-medium"
//                                 >
//                                      <span className="capitalize">{doc.docType === 'id_front' ? 'ID Front' : 'ID Back'}</span>
//                                      <LuExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                                  </a>
//                              ))}
//                          </div>
//                      ) : (
//                          <p className="text-sm text-gray-500 dark:text-gray-400">No documents submitted.</p>
//                      )
//                 ))}

//                 {renderSection("Status & Actions", (
//                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
//                          {/* Status Display */}
//                          <div>
//                             <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Status</span>
//                             <p className={`mt-1 text-lg font-semibold capitalize ${
//                                 kyc?.status === 'verified' ? 'text-green-600 dark:text-green-400' :
//                                 kyc?.status === 'rejected' ? 'text-red-600 dark:text-red-400' :
//                                 kyc?.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
//                                 kyc?.status === 'skipped' ? 'text-blue-600 dark:text-blue-400' :
//                                 'text-gray-500 dark:text-gray-300'
//                             }`}>
//                                 {kyc?.status?.replace('_', ' ') || 'Not Started'}
//                             </p>
//                             {/* Timestamps and Reason */}
//                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
//                                 {kyc?.status === 'verified' && kyc?.verifiedAt && <p>Verified on: {formatDate(kyc.verifiedAt, true)}</p>}
//                                 {kyc?.status === 'rejected' && kyc?.rejectedAt && <p>Rejected on: {formatDate(kyc.rejectedAt, true)}</p>}
//                                 {kyc?.submittedAt && !['verified', 'rejected'].includes(kyc?.status || '') && <p>Submitted on: {formatDate(kyc.submittedAt, true)}</p>}
//                                 {kyc?.status === 'rejected' && kyc?.rejectionReason && <p className="text-red-600 dark:text-red-400 font-medium">Reason: {kyc.rejectionReason}</p>}
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         {kyc?.status === 'pending' && (
//                              <div className="flex gap-3 flex-shrink-0 mt-4 sm:mt-0">
//                                 <button
//                                     type="button"
//                                     onClick={openRejectModal}
//                                     className={dangerButtonStyle}
//                                     disabled={isProcessingAction}
//                                 >
//                                      {isProcessingAction ? <TbLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <FiXCircle className="mr-2 h-4 w-4" />}
//                                      Reject
//                                  </button>
//                                  <button
//                                      type="button"
//                                      onClick={handleApprove}
//                                      className={successButtonStyle}
//                                      disabled={isProcessingAction}
//                                  >
//                                      {isProcessingAction ? <TbLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <FiCheckCircle className="mr-2 h-4 w-4" />}
//                                      Approve
//                                  </button>
//                              </div>
//                          )}
//                     </div>
//                 ))}
//             </div> // End main content div
//         );
//     };

//     // --- Main Component Return ---
//     return (
//         // Use Tailwind for overall page layout and padding
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-4xl mx-auto"> {/* Center content */}
//                  {/* Back Button */}
//                  <Link href="/admin/kyc-management" className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 font-medium">
//                     <LuArrowLeft className="h-4 w-4" />
//                     Back to KYC List
//                 </Link>

//                  {/* Main Content Area - Render based on state */}
//                  {isLoading ? renderLoading() : error ? renderError(error) : renderUserDetails()}

//                  {/* Modal */}
//                  {renderRejectionModal()}
//             </div>
//         </div>
//     );
// };

// export default KycUserDetailPage;

// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback, Fragment } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image'; // For potential image previews
// import kycAdminService from '@/app/services/admin/kyc.admin'; // Corrected import path assuming standard structure
// import type { AdminKycUserResponse, KycDetails, SalaryRange } from '@/app/services/admin/kyc.admin'; // Corrected import path and added SalaryRange

// // Icons
// import {
//     ArrowLeft, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle,
//     FileText, User, CalendarDays, Phone, Mail, Briefcase, BadgeDollarSign,
//     Fingerprint, Eye, Loader2, Globe
// } from 'lucide-react';
// import { cn } from '@/lib/utils'; // For conditional classes
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
// import { Textarea } from '@/components/ui/textarea'; // Import Textarea
// import { Label } from '@/components/ui/label'; // Import Label

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//     if (!dateInput) return 'N/A';
//     try {
//         const date = new Date(dateInput);
//         // Check if the date is valid after parsing
//         if (isNaN(date.getTime())) {
//              console.warn("formatDate received invalid dateInput:", dateInput);
//              return 'Invalid Date';
//         }
//         const options: Intl.DateTimeFormatOptions = {
//             year: 'numeric', month: 'long', day: 'numeric',
//             ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true /* Adjust timezone as needed */ })
//         };
//         return date.toLocaleDateString('en-US', options);
//     } catch (e) {
//         console.error("Error formatting date:", e, "Input:", dateInput);
//         return 'Invalid Date';
//     }
// };

// const formatMobile = (mobile?: KycDetails['mobile']): string => {
//     if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//     return `${mobile.countryCode} ${mobile.number}`;
// };

// // Ensure SalaryRange type is correctly imported or defined if not exported from kyc.admin.ts
// const salaryDisplayMap: Record<SalaryRange, string> = {
//   '0-1000': 'Below $10,000',
//   '10000-50000': '$10,000 - $49,999',
//   '50000-100000': '$50,000 - $99,999',
//   '100000+': '$100,000 or more',
// };

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//     const params = useParams();
//     const router = useRouter();
//     const userId = params.userId as string; // Get userId from URL parameters

//     const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null); // For data fetching errors
//     const [actionError, setActionError] = useState<string | null>(null); // For approve/reject action errors
//     const [isProcessingAction, setIsProcessingAction] = useState<false | 'approve' | 'reject'>(false); // Track which action is processing
//     const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//     const [rejectionReason, setRejectionReason] = useState<string>('');

//     // --- Fetching Logic ---
//     const fetchUserDetails = useCallback(async () => {
//         if (!userId) {
//             setError("User ID is missing from the URL.");
//             setIsLoading(false);
//             return;
//         };
//         console.log(`Fetching details for user: ${userId}`);
//         setIsLoading(true);
//         setError(null);
//         setActionError(null); // Clear previous action errors on refetch
//         try {
//             const data = await kycAdminService.getKycDetailsAdmin(userId);
//             setUserData(data);
//              console.log("User data fetched:", data);
//         } catch (err: any) {
//             console.error("Error fetching user details:", err);
//             setError(err.message || 'An unknown error occurred while fetching user details.');
//             setUserData(null); // Clear potentially stale data
//         } finally {
//             setIsLoading(false);
//         }
//     }, [userId]); // Dependency: userId ensures refetch if navigating between user pages

//     useEffect(() => {
//         fetchUserDetails();
//     }, [fetchUserDetails]); // Fetch on mount and if fetchUserDetails changes (due to userId change)

//     // --- Action Handlers ---
//     const handleApprove = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//         setIsProcessingAction('approve');
//         setActionError(null);
//         console.log(`Attempting to approve KYC for user: ${userId}`);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//             console.log(`Successfully approved KYC for user: ${userId}`);
//             await fetchUserDetails(); // Refresh data to show updated status
//         } catch (err: any) {
//              console.error("Error approving KYC:", err);
//             setActionError(err.message || 'Failed to approve KYC status.');
//         } finally {
//             setIsProcessingAction(false);
//         }
//     };

//     const openRejectModal = () => {
//         setRejectionReason(''); // Clear previous reason
//         setActionError(null); // Clear previous modal errors
//         setShowRejectionModal(true);
//     };

//     const submitRejection = async () => {
//         if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//         if (!rejectionReason.trim()) {
//             setActionError("Rejection reason cannot be empty."); // Show error within modal
//             return;
//         }
//         setIsProcessingAction('reject');
//         setActionError(null); // Clear previous error before new attempt
//         console.log(`Attempting to reject KYC for user: ${userId} with reason: ${rejectionReason}`);
//         try {
//             await kycAdminService.updateKycStatusAdmin(userId, { status: 'rejected', rejectionReason: rejectionReason.trim() });
//             console.log(`Successfully rejected KYC for user: ${userId}`);
//             setShowRejectionModal(false); // Close modal on success
//             await fetchUserDetails(); // Refresh data
//         } catch (err: any) {
//             console.error("Error rejecting KYC:", err);
//             // Show error within the modal for immediate feedback
//             setActionError(err.message || 'Failed to reject KYC status.');
//         } finally {
//             // Ensure processing state is reset even if error occurs
//             setIsProcessingAction(false);
//         }
//     };

//     // --- Render Functions ---

//     // Loading Skeleton
//     const renderLoading = () => (
//         <div className="space-y-8 animate-pulse">
//             <div className="h-5 w-36 bg-muted rounded mb-6"></div>
//             <Card className="shadow-sm">
//                 <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
//                      <div className="h-8 w-24 bg-muted rounded"></div>
//                      <div className="flex gap-3">
//                         <div className="h-9 w-24 bg-muted rounded"></div>
//                         <div className="h-9 w-24 bg-muted rounded"></div>
//                      </div>
//                 </CardHeader>
//             </Card>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <Card className="lg:col-span-2 shadow-sm">
//                     <CardHeader className="p-5 border-b"> <div className="h-6 w-1/3 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//                         {[...Array(7)].map((_, i) => <div key={`detail-skel-${i}`}><div className="h-4 w-1/4 bg-muted rounded mb-1"></div><div className="h-5 w-3/4 bg-muted rounded"></div></div>)}
//                     </CardContent>
//                     <CardHeader className="p-5 border-t"> <div className="h-6 w-1/3 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//                         {[...Array(4)].map((_, i) => <div key={`id-skel-${i}`}><div className="h-4 w-1/4 bg-muted rounded mb-1"></div><div className="h-5 w-3/4 bg-muted rounded"></div></div>)}
//                     </CardContent>
//                 </Card>
//                 <Card className="shadow-sm">
//                     <CardHeader className="p-5 border-b"> <div className="h-6 w-1/2 bg-muted rounded"></div> </CardHeader>
//                     <CardContent className="p-5 space-y-4">
//                          <div className="border border-muted rounded-md p-3">
//                             <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                             <div className="h-4 w-1/2 bg-muted rounded"></div>
//                          </div>
//                         <div className="border border-muted rounded-md p-3">
//                             <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                             <div className="h-4 w-1/2 bg-muted rounded"></div>
//                          </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );

//     // Error Message Display
//     const renderErrorDisplay = (message: string | null, isActionError = false) => {
//         if (!message) return null;
//         return (
//             <div className={cn("border-l-4 p-4 rounded-md mb-6", isActionError ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20")} role="alert">
//                 <div className="flex items-center">
//                     <AlertCircle className={cn("h-5 w-5 mr-3 flex-shrink-0", isActionError ? "text-destructive" : "text-yellow-600 dark:text-yellow-400")} />
//                     <div>
//                         <p className={cn("text-sm font-medium", isActionError ? "text-destructive/90 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300")}>
//                             {isActionError ? "Action Error" : "Error"}
//                         </p>
//                         <p className={cn("text-sm", isActionError ? "text-destructive/80 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400")}>
//                             {message}
//                         </p>
//                         {!isActionError && message.toLowerCase().includes("fetching") && // Only show retry for fetch errors
//                             <button onClick={fetchUserDetails} className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline">Retry Fetch</button>
//                         }
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // Rejection Modal
//     const renderRejectionModal = () => {
//          if (!showRejectionModal) return null;
//          return (
//              // Modal backdrop
//              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" aria-labelledby="rejection-modal-title" role="dialog" aria-modal="true">
//                  {/* Modal content */}
//                  <Card className="relative w-full max-w-lg shadow-xl border-border" onClick={(e) => e.stopPropagation()}>
//                     <CardHeader>
//                         <CardTitle id="rejection-modal-title" className="text-lg">Reject KYC Application</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <p className="text-sm text-muted-foreground">
//                              Provide a clear reason for rejection. This will be shown to the user.
//                         </p>
//                         {/* Modal-specific Action Error */}
//                         {actionError && (
//                             <p className="text-sm text-destructive font-medium flex items-center gap-1.5"><AlertCircle className="h-4 w-4"/> {actionError}</p>
//                         )}
//                         <div className="space-y-1">
//                             <Label htmlFor="rejectionReasonInput" className="text-sm">
//                                 Reason <span className="text-destructive">*</span>
//                             </Label>
//                             <Textarea
//                                 id="rejectionReasonInput"
//                                 rows={4}
//                                 value={rejectionReason}
//                                 onChange={(e) => {
//                                     setRejectionReason(e.target.value);
//                                     // Clear error when user starts typing
//                                     if(actionError && e.target.value.trim()) setActionError(null);
//                                 }}
//                                 placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                                 className="w-full text-sm"
//                                 aria-describedby="rejection-error"
//                             />
//                         </div>
//                         <div className="mt-6 flex justify-end gap-3">
//                             <Button variant="outline" onClick={() => setShowRejectionModal(false)} disabled={isProcessingAction === 'reject'}>Cancel</Button>
//                             <Button
//                                 variant="destructive"
//                                 onClick={submitRejection}
//                                 disabled={isProcessingAction === 'reject' || !rejectionReason.trim()}
//                             >
//                                 {isProcessingAction === 'reject' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                                 Confirm Rejection
//                             </Button>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//          );
//     };

//     // Detail Item Renderer
//     const DetailItem = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon?: React.ElementType }) => (
//         <div className="py-2">
//             <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
//                 {Icon && <Icon className="h-3.5 w-3.5" />} {label}
//             </dt>
//             <dd className="text-sm font-medium text-foreground break-words min-h-[20px]"> {/* Ensure minimum height */}
//                 {value || <span className="italic text-muted-foreground/80">Not Provided</span>}
//             </dd>
//         </div>
//     );

//     // --- Main Content ---
//     if (isLoading) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderLoading()}</div>;
//     // Render fetch error prominently if it occurred
//     if (error) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderErrorDisplay(error)}</div>;
//     if (!userData) return <div className="max-w-6xl mx-auto text-center py-16 text-muted-foreground">User data could not be loaded or user not found.</div>;

//     const { kyc } = userData; // Destructure kyc for easier access, handle potential null/undefined
//     const canTakeAction = kyc?.status === 'pending';

//     return (
//         <div className="min-h-screen bg-muted/30 dark:bg-background p-4 sm:p-6 lg:p-8">
//              {renderRejectionModal()}

//              <div className="max-w-6xl mx-auto space-y-6">
//                  {/* Back Navigation */}
//                  <div>
//                      <Link href="/admin/kyc-management" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back to KYC Management List
//                     </Link>
//                  </div>

//                  {/* Status Bar & Actions Card */}
//                  <Card className="shadow-sm overflow-hidden">
//                     <CardHeader className="bg-card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b">
//                         <div>
//                             <span className="block text-xs text-muted-foreground font-medium">Verification Status</span>
//                              <span className={cn(
//                                  "text-lg font-bold capitalize px-2 py-0.5 rounded inline-flex items-center gap-1.5 mt-1", // Use inline-flex for icon alignment
//                                  kyc?.status === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
//                                  kyc?.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
//                                  kyc?.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
//                                  kyc?.status === 'skipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
//                                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                              )}>
//                                 {kyc?.status === 'verified' && <CheckCircle className="h-4 w-4" />}
//                                 {kyc?.status === 'rejected' && <XCircle className="h-4 w-4" />}
//                                 {kyc?.status === 'pending' && <Clock className="h-4 w-4" />}
//                                 {kyc?.status === 'skipped' && <ArrowLeft className="h-4 w-4" />} {/* Example icon for skipped */}
//                                 {!kyc?.status && <AlertCircle className="h-4 w-4" />} {/* Icon for not started/null */}
//                                 {kyc?.status?.replace('_', ' ') || 'Not Started'}
//                             </span>
//                              {/* Display Timestamps */}
//                               <div className="mt-2 text-xs text-muted-foreground space-y-0.5 sm:space-y-0 sm:space-x-3">
//                                  {kyc?.submittedAt && <span>Submitted: {formatDate(kyc.submittedAt, true)}</span>}
//                                  {kyc?.verifiedAt && <span>Verified: {formatDate(kyc.verifiedAt, true)}</span>}
//                                  {kyc?.rejectedAt && <span>Rejected: {formatDate(kyc.rejectedAt, true)}</span>}
//                              </div>
//                         </div>
//                          {/* Action Buttons */}
//                          {canTakeAction && (
//                              <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
//                                  <Button
//                                      variant="destructive"
//                                      size="sm" // Smaller buttons might fit better
//                                      onClick={openRejectModal}
//                                      disabled={!!isProcessingAction}
//                                      className="flex-1 sm:flex-none"
//                                  >
//                                      {isProcessingAction === 'reject' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
//                                      Reject
//                                  </Button>
//                                  <Button
//                                      variant="default" // Use standard button, but style it green
//                                      size="sm"
//                                      onClick={handleApprove}
//                                      disabled={!!isProcessingAction}
//                                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800" // Explicit green styling
//                                  >
//                                      {isProcessingAction === 'approve' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
//                                      Approve
//                                  </Button>
//                              </div>
//                          )}
//                      </CardHeader>
//                     {/* Display general action errors below the header within the card */}
//                      {actionError && !showRejectionModal && (
//                          <CardContent className="p-4 border-t border-border">
//                             {renderErrorDisplay(actionError, true)}
//                          </CardContent>
//                      )}
//                  </Card>

//                  {/* Main Details Grid */}
//                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                      {/* Column 1 & 2: User and ID Details */}
//                      <Card className="lg:col-span-2 shadow-sm overflow-hidden">
//                          <CardHeader className="p-5 border-b">
//                              <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary" /> User Information</CardTitle>
//                          </CardHeader>
//                          <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                             <DetailItem label="Full Name" value={userData.fullName} />
//                             <DetailItem label="Email Address" value={userData.email} icon={Mail}/>
//                             <DetailItem label="Date of Birth" value={formatDate(kyc?.dateOfBirth)} icon={CalendarDays}/>
//                             <DetailItem label="Mobile Number" value={formatMobile(kyc?.mobile)} icon={Phone}/>
//                             <DetailItem label="Nationality" value={kyc?.nationality} icon={Globe}/>
//                             <DetailItem label="Occupation" value={kyc?.occupation} icon={Briefcase}/>
//                             <DetailItem label="Salary Range" value={kyc?.salaryRange ? salaryDisplayMap[kyc.salaryRange] : undefined} icon={BadgeDollarSign}/>
//                          </CardContent>

//                          <CardHeader className="p-5 border-t">
//                              <CardTitle className="text-lg flex items-center gap-2"><Fingerprint className="h-5 w-5 text-primary" /> Identity Document</CardTitle>
//                          </CardHeader>
//                           <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                              <DetailItem label="ID Type" value={<span className="capitalize">{kyc?.idType?.replace('_', ' ')}</span>}/>
//                              <DetailItem label="ID Number" value={kyc?.idNumber} />
//                              <DetailItem label="Date of Issue" value={formatDate(kyc?.idIssueDate)} icon={CalendarDays}/>
//                              <DetailItem label="Date of Expiry" value={formatDate(kyc?.idExpiryDate)} icon={CalendarDays}/>
//                              {/* Show rejection reason if applicable */}
//                              {kyc?.status === 'rejected' && kyc.rejectionReason && (
//                                  <div className="md:col-span-2 mt-2">
//                                       <DetailItem label="Rejection Reason" value={<span className="text-destructive font-medium">{kyc.rejectionReason}</span>} icon={AlertCircle}/>
//                                  </div>
//                              )}
//                          </CardContent>
//                      </Card>

//                      {/* Column 3: Submitted Documents */}
//                      <Card className="shadow-sm">
//                           <CardHeader className="p-5 border-b">
//                              <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Submitted Documents</CardTitle>
//                          </CardHeader>
//                          <CardContent className="p-5 space-y-4">
//                             {kyc?.documents && kyc.documents.length > 0 ? (
//                                 kyc.documents.map((doc) => (
//                                     <div key={doc.public_id} className="border border-border rounded-md p-3 hover:bg-muted/30 transition-colors">
//                                         <p className="text-sm font-medium text-foreground capitalize mb-2">{doc.docType === 'id_front' ? 'ID Front' : 'ID Back'}</p>
//                                         <a
//                                             href={doc.url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
//                                             title="View document in new tab"
//                                         >
//                                             <Eye className="h-3.5 w-3.5" /> View Document <ExternalLink className="h-3 w-3 opacity-70"/>
//                                         </a>
//                                         {/* Optional: Add simple image preview for image types */}
//                                         {doc.url && !doc.url.toLowerCase().endsWith('.pdf') && (
//                                              <div className="mt-2 aspect-video relative overflow-hidden rounded bg-muted border">
//                                                 <Image src={doc.url} alt={`${doc.docType} preview`} layout="fill" objectFit="contain" unoptimized />
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-sm text-muted-foreground italic p-3 text-center">No documents were submitted or found.</p>
//                             )}
//                          </CardContent>
//                      </Card>
//                  </div>
//              </div>
//         </div>
//     );
// };

// export default KycUserDetailPage;

// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import kycAdminService from '@/app/services/admin/kyc.admin';
// import type { AdminKycUserResponse, KycDetails, SalaryRange } from '@/app/services/admin/kyc.admin';

// // Icons
// import {
//   ArrowLeft, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle,
//   FileText, User, CalendarDays, Phone, Mail, Briefcase, BadgeDollarSign,
//   Fingerprint, Eye, Loader2, Globe, FileCheck, Info, Shield
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// // --- Helper Functions ---
// const formatDate = (dateInput?: string | Date | null, includeTime = false): string => {
//   if (!dateInput) return 'N/A';
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return 'Invalid Date';
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric', month: 'long', day: 'numeric',
//       ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
//     };
//     return date.toLocaleDateString('en-US', options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return 'Invalid Date';
//   }
// };

// const formatMobile = (mobile?: KycDetails['mobile']): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   '0-1000': 'Below $10,000',
//   '10000-50000': '$10,000 - $49,999',
//   '50000-100000': '$50,000 - $99,999',
//   '100000+': '$100,000 or more',
// };

// const getStatusConfig = (status?: string) => {
//   const statusMap = {
//     verified: {
//       color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
//       icon: CheckCircle,
//       label: 'Verified'
//     },
//     rejected: {
//       color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
//       icon: XCircle,
//       label: 'Rejected'
//     },
//     pending: {
//       color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
//       icon: Clock,
//       label: 'Pending'
//     },
//     skipped: {
//       color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
//       icon: ArrowLeft,
//       label: 'Skipped'
//     },
//     default: {
//       color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
//       icon: AlertCircle,
//       label: 'Not Started'
//     }
//   };

//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   if (!name) return '??';
//   return name
//     .split(' ')
//     .map(part => part[0])
//     .join('')
//     .substring(0, 2)
//     .toUpperCase();
// };

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<false | 'approve' | 'reject'>(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [rejectionReason, setRejectionReason] = useState<string>('');

//   // --- Fetching Logic ---
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setActionError(null);
//     try {
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(err.message || 'An unknown error occurred while fetching user details.');
//       setUserData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   // --- Action Handlers ---
//   const handleApprove = async () => {
//     if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//     setIsProcessingAction('approve');
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//       await fetchUserDetails();
//     } catch (err: any) {
//       setActionError(err.message || 'Failed to approve KYC status.');
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   const openRejectModal = () => {
//     setRejectionReason('');
//     setActionError(null);
//     setShowRejectionModal(true);
//   };

//   const submitRejection = async () => {
//     if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//     if (!rejectionReason.trim()) {
//       setActionError("Rejection reason cannot be empty.");
//       return;
//     }
//     setIsProcessingAction('reject');
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: 'rejected',
//         rejectionReason: rejectionReason.trim()
//       });
//       setShowRejectionModal(false);
//       await fetchUserDetails();
//     } catch (err: any) {
//       setActionError(err.message || 'Failed to reject KYC status.');
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---
//   const renderLoading = () => (
//     <div className="space-y-8 animate-pulse">
//       <div className="h-5 w-36 bg-muted rounded mb-6"></div>
//       <Card className="shadow-sm">
//         <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
//           <div className="h-8 w-24 bg-muted rounded"></div>
//           <div className="flex gap-3">
//             <div className="h-9 w-24 bg-muted rounded"></div>
//             <div className="h-9 w-24 bg-muted rounded"></div>
//           </div>
//         </CardHeader>
//       </Card>
//       <div className="space-y-6">
//         <Card className="shadow-sm">
//           <CardHeader className="p-5 border-b"><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader>
//           <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={`detail-skel-${i}`}>
//                 <div className="h-4 w-1/4 bg-muted rounded mb-1"></div>
//                 <div className="h-5 w-3/4 bg-muted rounded"></div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//         <Card className="shadow-sm">
//           <CardHeader className="p-5 border-b"><div className="h-6 w-1/2 bg-muted rounded"></div></CardHeader>
//           <CardContent className="p-5 space-y-4">
//             {[...Array(2)].map((_, i) => (
//               <div key={`doc-skel-${i}`} className="border border-muted rounded-md p-3">
//                 <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                 <div className="h-4 w-1/2 bg-muted rounded"></div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   const renderErrorDisplay = (message: string | null, isActionError = false) => {
//     if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isActionError ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle className={cn(
//             "h-5 w-5 mr-3 flex-shrink-0",
//             isActionError ? "text-destructive" : "text-yellow-600 dark:text-yellow-400"
//           )} />
//           <div>
//             <p className={cn(
//               "text-sm font-medium",
//               isActionError ? "text-destructive/90 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300"
//             )}>
//               {isActionError ? "Action Error" : "Error"}
//             </p>
//             <p className={cn(
//               "text-sm",
//               isActionError ? "text-destructive/80 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"
//             )}>
//               {message}
//             </p>
//             {!isActionError && message.toLowerCase().includes("fetching") && (
//               <button
//                 onClick={fetchUserDetails}
//                 className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline"
//               >
//                 Retry Fetch
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRejectionModal = () => {
//     if (!showRejectionModal) return null;

//     return (
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
//         aria-labelledby="rejection-modal-title"
//         role="dialog"
//         aria-modal="true"
//       >
//         <Card className="relative w-full max-w-lg shadow-xl border-border" onClick={(e) => e.stopPropagation()}>
//           <CardHeader>
//             <CardTitle id="rejection-modal-title" className="text-lg">Reject KYC Application</CardTitle>
//             <CardDescription>
//               Provide a clear reason for rejection. This will be visible to the user.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {actionError && (
//               <p className="text-sm text-destructive font-medium flex items-center gap-1.5">
//                 <AlertCircle className="h-4 w-4"/> {actionError}
//               </p>
//             )}
//             <div className="space-y-1">
//               <Label htmlFor="rejectionReasonInput" className="text-sm">
//                 Reason <span className="text-destructive">*</span>
//               </Label>
//               <Textarea
//                 id="rejectionReasonInput"
//                 rows={4}
//                 value={rejectionReason}
//                 onChange={(e) => {
//                   setRejectionReason(e.target.value);
//                   if(actionError && e.target.value.trim()) setActionError(null);
//                 }}
//                 placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                 className="w-full text-sm"
//                 aria-describedby="rejection-error"
//               />
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-end gap-3 pt-2">
//             <Button
//               variant="outline"
//               onClick={() => setShowRejectionModal(false)}
//               disabled={isProcessingAction === 'reject'}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={submitRejection}
//               disabled={isProcessingAction === 'reject' || !rejectionReason.trim()}
//             >
//               {isProcessingAction === 'reject' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               Confirm Rejection
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   };

//   const DetailItem = ({
//     label,
//     value,
//     icon: Icon,
//     isImportant = false
//   }: {
//     label: string,
//     value: React.ReactNode,
//     icon?: React.ElementType,
//     isImportant?: boolean
//   }) => (
//     <div className="py-2 space-y-2">
//       <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
//         {Icon && <Icon className="h-3.5 w-3.5" />} {label}
//       </dt>
//       <dd className={cn(
//         "text-sm break-words min-h-[20px]",
//         isImportant ? "font-semibold text-foreground" : "font-medium text-foreground"
//       )}>
//         {value || <span className="italic text-muted-foreground/80">Not Provided</span>}
//       </dd>
//     </div>
//   );

//   // --- Main Content ---
//   if (isLoading) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderLoading()}</div>;
//   if (error) return <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{renderErrorDisplay(error)}</div>;
//   if (!userData) return (
//     <div className="max-w-6xl mx-auto text-center py-16 text-muted-foreground">
//       User data could not be loaded or user not found.
//     </div>
//   );

//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === 'pending';
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-muted/30 dark:bg-background p-4 sm:p-6 lg:p-8">
//       {renderRejectionModal()}

//       <div className="container mx-auto space-y-6">
//         {/* Back Navigation */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>

//           <span className="text-xs text-right sm:w-auto w-full text-gray-500 dark:text-gray-300">
//             User ID:{" "}
//             <code className="bg-muted px-1 py-0.5 rounded">{userId}</code>
//           </span>
//         </div>

//         {/* User Profile Card */}
//         <Card className="shadow-sm overflow-hidden">
//           <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//             <div className="flex sm:flex-row flex-col sm:items-center gap-4">
//               <Avatar className="h-16 w-16 flex-shrink-0">
//                 <AvatarFallback
//                   className={cn(
//                     "text-lg font-medium", // Base styles
//                     statusConfig.color // Dynamic status color from config
//                   )}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>
//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="h-5 w-5" /> {userData.email}
//                   </span>
//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="h-5 w-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>

//             {/* Status Badge */}
//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" />
//               {statusConfig.label}
//             </Badge>
//           </CardHeader>

//           {/* Status Timeline */}
//           <CardContent className="sm:p-6 p-4">
//             <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 sm:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-1">
//                   <Clock className="size-5" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}
//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}
//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>
//           </CardContent>

//           {/* Action Buttons for Pending Applications */}
//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 <Button
//                   onClick={openRejectModal}
//                   disabled={!!isProcessingAction}
//                   className="gap-0 text-base bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 md:h-12.5 h-10 text-center cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center"
//                 >
//                   {isProcessingAction === "reject" ? (
//                     <Loader2 className="mr-2 size-5 animate-spin" />
//                   ) : (
//                     <XCircle className="mr-2 size-5" />
//                   )}
//                   Reject Application
//                 </Button>
//                 <Button
//                   onClick={handleApprove}
//                   disabled={!!isProcessingAction}
//                   className="gap-0 text-base bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 md:h-12.5 h-10 text-center cursor-pointer transition-all duration-75 ease-linear flex justify-center items-center"
//                 >
//                   {isProcessingAction === "approve" ? (
//                     <Loader2 className="mr-2 size-5 animate-spin" />
//                   ) : (
//                     <CheckCircle className="mr-2 size-5 " />
//                   )}
//                   Approve Application
//                 </Button>
//               </div>
//             </CardFooter>
//           )}

//           {/* Display action errors */}
//           {actionError && !showRejectionModal && (
//             <div className="px-4 pb-4">
//               {renderErrorDisplay(actionError, true)}
//             </div>
//           )}
//         </Card>

//         <div className="flex xl:flex-row flex-col justify-between gap-4">
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {/* Rejection Reason (if applicable) */}
//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 px-5 py-4">
//                 <CardHeader>
//                   <CardTitle className="text-sm flex items-center gap-1.5 text-red-700 dark:text-red-400">
//                     <AlertCircle className="h-4 w-4" /> Rejection Reason
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-red-700 dark:text-red-400 font-light mt-2">
//                     {kyc.rejectionReason}
//                   </p>
//                 </CardContent>
//               </Card>
//              )}

//             {/* Personal Information */}
//             <Card className="shadow-sm gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-secondarybox px-5 py-4 h-[81px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <User className="h-6 w-6 text-primary" /> Personal Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             {/* Identity Information */}
//             <Card className="shadow-sm gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-secondarybox px-5 py-4 h-[81px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="h-6 w-6 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Submitted Documents */}
//           <Card className="shadow-sm w-full xl:w-1/3 h-fit gap-0  overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-secondarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="h-6 w-6 text-primary" /> Submitted
//                 Documents
//               </CardTitle>
//               <CardDescription className="text-gray-500 dark:text-gray-300">
//                 Review identification documents submitted by the user
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-5">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="border overflow-hidden w-full"
//                     >
//                       <CardHeader className="bg-muted/50 p-5 border-b">
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           <FileText className="h-4 w-4" />
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative bg-muted">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain"
//                             unoptimized
//                           />
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                           <FileText className="h-12 w-12 text-muted-foreground/50" />
//                         </CardContent>
//                       )}

//                       <CardFooter className="justify-center items-center w-full">
//                         <Link
//                           href={doc.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <Button className="w-full cursor-pointer border text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:hover:bg-neutral-700 dark:bg-neutral-900">
//                             <Eye className="h-3.5 w-3.5" />
//                             View Full Document
//                             <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4">
//                   <Info className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
//                   <p className="text-muted-foreground">
//                     No documents were submitted or found for this user.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import kycAdminService from "@/app/services/admin/kyc.admin";
// import type {
//   AdminKycUserResponse,
//   KycDetails,
//   SalaryRange,
// } from "@/app/services/admin/kyc.admin";

// // ** NEW IMPORTS **
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// // Icons
// import {
//   ArrowLeft,
//   ExternalLink,
//   CheckCircle,
//   XCircle, // Keep for buttons/status
//   Clock,
//   AlertCircle, // Keep for errors/status
//   FileText,
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Eye,
//   Loader2,
//   Globe,
//   FileCheck,
//   Info,
//   Shield,
//   AlertTriangle, // ** NEW: For modal icon **
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button"; // Still use for button styling base if desired
// import {
//   Card, // Keep for main page structure
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// // --- Helper Functions (Keep as they are) ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   // ... (implementation unchanged)
//    if (!dateInput) return 'N/A';
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return 'Invalid Date';
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric', month: 'long', day: 'numeric',
//       ...(includeTime && { hour: '2-digit', minute: '2-digit', hour12: true })
//     };
//     return date.toLocaleDateString('en-US', options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return 'Invalid Date';
//   }
// };

// const formatMobile = (mobile?: KycDetails["mobile"]): string => {
//   // ... (implementation unchanged)
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim()) return 'N/A';
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// const getStatusConfig = (status?: string) => {
//   // ... (implementation unchanged)
//    const statusMap = {
//     verified: {
//       color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
//       icon: CheckCircle,
//       label: 'Verified'
//     },
//     rejected: {
//       color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
//       icon: XCircle,
//       label: 'Rejected'
//     },
//     pending: {
//       color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
//       icon: Clock,
//       label: 'Pending'
//     },
//     skipped: {
//       color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
//       icon: ArrowLeft,
//       label: 'Skipped'
//     },
//     default: {
//       color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
//       icon: AlertCircle,
//       label: 'Not Started'
//     }
//   };

//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   // ... (implementation unchanged)
//    if (!name) return '??';
//   return name
//     .split(' ')
//     .map(part => part[0])
//     .join('')
//     .substring(0, 2)
//     .toUpperCase();
// };
// // --- DetailItem Component (Keep as is) ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
// }) => (
//   // ... (implementation unchanged)
//    <div className="py-2 space-y-2">
//       <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
//         {Icon && <Icon className="h-3.5 w-3.5" />} {label}
//       </dt>
//       <dd className={cn(
//         "text-sm break-words min-h-[20px]",
//         isImportant ? "font-semibold text-foreground" : "font-medium text-foreground"
//       )}>
//         {value || <span className="italic text-muted-foreground/80">Not Provided</span>}
//       </dd>
//     </div>
// );

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<
//     false | "approve" | "reject"
//   >(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [rejectionReason, setRejectionReason] = useState<string>("");

//   // ** NEW: Add isMobile state and effect **
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640); // sm breakpoint
//     };
//     if (typeof window !== "undefined") {
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // --- Fetching Logic (Keep as is) ---
//   const fetchUserDetails = useCallback(async () => {
//     // ... (implementation unchanged)
//      if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setActionError(null);
//     try {
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(err.message || 'An unknown error occurred while fetching user details.');
//       setUserData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   // --- Action Handlers (Keep as is, except openRejectModal) ---
//   const handleApprove = async () => {
//     // ... (implementation unchanged)
//      if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//     setIsProcessingAction('approve');
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, { status: 'verified' });
//       await fetchUserDetails();
//     } catch (err: any) {
//       setActionError(err.message || 'Failed to approve KYC status.');
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   const openRejectModal = () => {
//     setRejectionReason(''); // Reset reason when opening
//     setActionError(null); // Clear previous errors
//     setShowRejectionModal(true);
//   };

//   const submitRejection = async () => {
//     // ... (implementation unchanged)
//      if (!userId || !userData || userData.kyc?.status !== 'pending' || isProcessingAction) return;
//     if (!rejectionReason.trim()) {
//       setActionError("Rejection reason cannot be empty.");
//       return;
//     }
//     setIsProcessingAction('reject');
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: 'rejected',
//         rejectionReason: rejectionReason.trim()
//       });
//       setShowRejectionModal(false); // Close modal on success
//       await fetchUserDetails(); // Refresh data
//     } catch (err: any) {
//       // Keep error displayed in the modal
//       setActionError(err.message || 'Failed to reject KYC status.');
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---
//   const renderLoading = () => (
//     // ... (implementation unchanged)
//      <div className="space-y-8 animate-pulse">
//       <div className="h-5 w-36 bg-muted rounded mb-6"></div>
//       <Card className="shadow-sm">
//         <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
//           <div className="h-8 w-24 bg-muted rounded"></div>
//           <div className="flex gap-3">
//             <div className="h-9 w-24 bg-muted rounded"></div>
//             <div className="h-9 w-24 bg-muted rounded"></div>
//           </div>
//         </CardHeader>
//       </Card>
//       <div className="space-y-6">
//         <Card className="shadow-sm">
//           <CardHeader className="p-5 border-b"><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader>
//           <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={`detail-skel-${i}`}>
//                 <div className="h-4 w-1/4 bg-muted rounded mb-1"></div>
//                 <div className="h-5 w-3/4 bg-muted rounded"></div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//         <Card className="shadow-sm">
//           <CardHeader className="p-5 border-b"><div className="h-6 w-1/2 bg-muted rounded"></div></CardHeader>
//           <CardContent className="p-5 space-y-4">
//             {[...Array(2)].map((_, i) => (
//               <div key={`doc-skel-${i}`} className="border border-muted rounded-md p-3">
//                 <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
//                 <div className="h-4 w-1/2 bg-muted rounded"></div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   const renderErrorDisplay = (message: string | null, isActionError = false) => {
//     // ... (implementation unchanged)
//      if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isActionError ? "border-destructive bg-destructive/10" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle className={cn(
//             "h-5 w-5 mr-3 flex-shrink-0",
//             isActionError ? "text-destructive" : "text-yellow-600 dark:text-yellow-400"
//           )} />
//           <div>
//             <p className={cn(
//               "text-sm font-medium",
//               isActionError ? "text-destructive/90 dark:text-red-300" : "text-yellow-700 dark:text-yellow-300"
//             )}>
//               {isActionError ? "Action Error" : "Error"}
//             </p>
//             <p className={cn(
//               "text-sm",
//               isActionError ? "text-destructive/80 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"
//             )}>
//               {message}
//             </p>
//             {!isActionError && message.toLowerCase().includes("fetching") && (
//               <button
//                 onClick={fetchUserDetails}
//                 className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline"
//               >
//                 Retry Fetch
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ** NEW: Define animation variants **
//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };

//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   // ** REFACTORED: renderRejectionModal **
//   const renderRejectionModal = () => {
//     const modalVariants = isMobile ? mobileVariants : desktopVariants;

//     return (
//       <AnimatePresence>
//         {showRejectionModal && (
//           <motion.div
//             className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center" // z-50 is fine here
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => {
//               if (isProcessingAction) return; // Prevent closing while processing
//               setShowRejectionModal(false);
//             }} // Close on overlay click
//             aria-labelledby="rejection-modal-title"
//             role="dialog"
//             aria-modal="true"
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center" // Style like target
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//             >
//               {/* Close Button */}
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={() => setShowRejectionModal(false)}
//                   disabled={!!isProcessingAction}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>

//               {/* Icon Container */}
//               <div className="flex justify-center w-20 h-20 mx-auto mb-4 relative">
//                 <div
//                   className="w-full h-full bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 dark:text-red-400 border-4 border-red-200 dark:border-red-700/50"
//                   aria-hidden="true"
//                 >
//                   {/* Using AlertTriangle for rejection */}
//                   <AlertTriangle strokeWidth={1.5} className="w-10 h-10" />
//                 </div>
//               </div>

//               {/* Title */}
//               <h3
//                 id="rejection-modal-title"
//                 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white my-6"
//               >
//                 Reject KYC Application
//               </h3>

//               {/* Description */}
//               <p className="text-gray dark:text-gray-300 font-medium mb-6 px-4 sm:px-0">
//                 Provide a clear reason for rejection. This will be visible to
//                 the user.
//               </p>

//               {/* Rejection Reason Input Area */}
//               <div className="space-y-2 text-left mb-6">
//                 <Label
//                   htmlFor="rejectionReasonInput"
//                   className="text-neutral-900 dark:text-white font-medium px-0.5" // Adjusted alignment
//                 >
//                   Reason <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="rejectionReasonInput"
//                   rows={4}
//                   value={rejectionReason}
//                   onChange={(e) => {
//                     setRejectionReason(e.target.value);
//                     if (actionError && e.target.value.trim())
//                       setActionError(null); // Clear error on typing
//                   }}
//                   placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                   className="w-full text-sm focus:ring-primary" // Added focus style consistency
//                   aria-describedby="rejection-error"
//                   disabled={!!isProcessingAction}
//                 />
//                 {/* Action Error Display */}
//                 {actionError && (
//                   <p
//                     id="rejection-error"
//                     className="text-sm text-destructive font-medium flex items-center gap-1.5 pt-1 px-0.5" // Adjusted alignment
//                   >
//                     <AlertCircle className="h-4 w-4" /> {actionError}
//                   </p>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row justify-center gap-3">
//                  {/* Cancel Button (Styled like "Got It") */}
//                  <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => setShowRejectionModal(false)}
//                   disabled={!!isProcessingAction}
//                 >
//                   Cancel
//                 </button>
//                 {/* Confirm Rejection Button (Styled like "Add Money" but red) */}
//                 <button
//                   className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   onClick={submitRejection}
//                   disabled={isProcessingAction === 'reject' || !rejectionReason.trim()}
//                 >
//                   {isProcessingAction === "reject" && (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   )}
//                   Confirm Rejection
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // --- Main Content Render (Keep as is) ---
//   if (isLoading)
//     return (
//       <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
//         {renderLoading()}
//       </div>
//     );
//   if (error)
//     return (
//       <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
//         {renderErrorDisplay(error)}
//       </div>
//     );
//   if (!userData)
//     return (
//       <div className="max-w-6xl mx-auto text-center py-16 text-muted-foreground">
//         User data could not be loaded or user not found.
//       </div>
//     );

//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === "pending";
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-muted/30 dark:bg-background">
//       {/* *** Call the refactored modal render function *** */}
//       {renderRejectionModal()}

//       <div className="container mx-auto px-4 py-8">
//         {/* Back Navigation */}
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           {/* ... other elements ... */}
//             <span className="text-xs text-right sm:w-auto w-full text-gray-500 dark:text-gray-300">
//             User ID:{" "}
//             <code className="bg-muted px-1 py-0.5 rounded">{userId}</code>
//           </span>
//         </div>

//         {/* User Profile Card */}
//         <Card className="shadow-none overflow-hidden mt-6">
//           <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//             {/* ... Avatar, Title, Description ... */}
//                <div className="flex sm:flex-row flex-col sm:items-center gap-4">
//               <Avatar className="h-16 w-16 flex-shrink-0">
//                 <AvatarFallback
//                   className={cn(
//                     "text-lg font-medium", // Base styles
//                     statusConfig.color // Dynamic status color from config
//                   )}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>
//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="h-5 w-5" /> {userData.email}
//                   </span>
//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="h-5 w-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>
//             {/* Status Badge */}
//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" />
//               {statusConfig.label}
//             </Badge>
//           </CardHeader>

//           {/* Status Timeline */}
//           <CardContent className="sm:p-6 p-4">
//              {/* ... Timeline content ... */}
//               <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-1">
//                   <Clock className="size-5" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}
//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}
//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>
//           </CardContent>

//           {/* Action Buttons for Pending Applications */}
//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 {/* Use regular Buttons here, styled as needed */}
//                 <Button
//                   onClick={openRejectModal}
//                   disabled={!!isProcessingAction}
//                   className="gap-2 text-base bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer" // Add common styles
//                 >
//                   {isProcessingAction === "reject" ? ( // Note: This loader won't show as the modal opens first
//                     <Loader2 className="mr-2 size-5 animate-spin" />
//                   ) : (
//                     <XCircle className="size-5" /> // Adjusted icon placement for consistency
//                   )}
//                   Reject Application
//                 </Button>
//                 <Button
//                   onClick={handleApprove}
//                   disabled={!!isProcessingAction}
//                   className="gap-2 text-base bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer" // Use specific primary styles
//                 >
//                   {isProcessingAction === "approve" ? (
//                     <Loader2 className="size-5 animate-spin" />
//                   ) : (
//                     <CheckCircle className="size-5" />
//                   )}
//                   Approve Application
//                 </Button>
//               </div>
//             </CardFooter>
//           )}

//           {/* Display action errors (outside modal) */}
//           {actionError && !showRejectionModal && (
//             <div className="px-4 sm:px-6 pb-4">
//               {renderErrorDisplay(actionError, true)}
//             </div>
//           )}
//         </Card>

//         {/* Rest of the page content (Personal Info, ID Info, Documents) */}
//         <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6"> {/* Adjusted gap */}
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {/* Rejection Reason Card */}
//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 p-4">
//                  <CardHeader> {/* Adjusted padding */}
//                    <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400"> {/* Adjusted size */}
//                      <AlertCircle className="h-5 w-5" /> Rejection Reason {/* Adjusted size */}
//                    </CardTitle>
//                  </CardHeader>
//                  <CardContent> {/* Adjusted padding */}
//                    <p className="text-sm text-red-600 dark:text-red-300 font-normal pt-2"> {/* Adjusted colors/weight */}
//                      {kyc.rejectionReason}
//                    </p>
//                  </CardContent>
//               </Card>
//             )}

//             {/* Personal Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               {/* ... Personal Info Header/Content ... */}
//                <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-secondarybox px-5 py-4 h-[81px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <User className="h-6 w-6 text-primary" /> Personal Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                  <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             {/* Identity Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               {/* ... Identity Info Header/Content ... */}
//                 <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-secondarybox px-5 py-4 h-[81px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="h-6 w-6 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Submitted Documents */}
//           <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0  overflow-hidden">
//             {/* ... Documents Header/Content ... */}
//              <CardHeader className="bg-lightgray dark:bg-secondarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="h-6 w-6 text-primary" /> Submitted
//                 Documents
//               </CardTitle>
//               <CardDescription className="text-gray-500 dark:text-gray-300">
//                 Review identification documents submitted by the user
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="border overflow-hidden w-full"
//                     >
//                       <CardHeader className="bg-muted/50 p-3 border-b"> {/* Reduced padding */}
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           <FileCheck className="h-4 w-4" /> {/* Changed icon slightly */}
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative bg-muted group">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain p-1" // Added slight padding
//                             unoptimized
//                           />
//                            <Link
//                              href={doc.url}
//                              target="_blank"
//                              rel="noopener noreferrer"
//                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
//                              aria-label={`View full ${doc.docType === "id_front" ? "ID Front" : "ID Back"} document`}
//                             >
//                               <Eye className="h-8 w-8 text-white" />
//                            </Link>
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                            <Link
//                             href={doc.url || '#'}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={cn(
//                               "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
//                               !doc.url && "pointer-events-none opacity-50"
//                             )}
//                             aria-label={`View ${doc.docType === "id_front" ? "ID Front" : "ID Back"} document`}
//                            >
//                               <FileText className="h-12 w-12 mb-2" />
//                               <span className="text-xs font-medium">View PDF</span>
//                               <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
//                             </Link>
//                         </CardContent>
//                       )}

//                       <CardFooter className="p-2 border-t bg-muted/30"> {/* Adjusted styling */}
//                         <Link
//                           href={doc.url || '#'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={cn(
//                             "w-full",
//                              !doc.url && "pointer-events-none opacity-50"
//                           )}
//                         >
//                           {/* Simplified the button to just text link */}
//                           <Button
//                             variant="link"
//                             size="sm"
//                             className="w-full text-xs justify-center items-center gap-1 text-primary"
//                              disabled={!doc.url}
//                           >
//                             View Full Document
//                             <ExternalLink className="h-3 w-3 opacity-80" />
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4 border border-dashed rounded-lg">
//                   <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-sm text-muted-foreground">
//                     No documents submitted.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import kycAdminService from "@/app/services/admin/kyc.admin";
// import type {
//   AdminKycUserResponse,
//   KycDetails,
//   SalaryRange,
// } from "@/app/services/admin/kyc.admin";
// import KycDetailHeader from "@/app/admin/components/kyc/KycDetailHeader"; // Adjust path if necessary

// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// // Icons
// import {
//   ArrowLeft,
//   ExternalLink,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   FileText,
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Eye,
//   Loader2,
//   Globe,
//   FileCheck,
//   Info,
//   AlertTriangle,
//   Image as ImageIcon, // Use a different name to avoid conflict
//   RefreshCw,
//   IdCard,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// // --- Helper Functions ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycDetails["mobile"]): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// const getStatusConfig = (status?: string) => {
//   const statusMap = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     default: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Not Started",
//     },
//   };
//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// // --- DetailItem Component ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
// }) => (
//   <div className="py-2 space-y-2">
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />} {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant
//           ? "font-semibold"
//           : ""
//       )}
//     >
//       {value || (
//         <span className="italic">Not Provided</span>
//       )}

//     </dd>
//   </div>
// );

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<
//     false | "approve" | "reject"
//   >(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [rejectionReason, setRejectionReason] = useState<string>("");
//   const [isMobile, setIsMobile] = useState(false);

//   // --- Responsive Check ---
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     if (typeof window !== "undefined") {
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // --- Fetching Logic ---
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     // Don't reset loading if already loaded (for retries)
//     if (!userData) {
//       setIsLoading(true);
//     }
//     setError(null);
//     setActionError(null);
//     try {
//       // Simulate loading
//       // await new Promise(resolve => setTimeout(resolve, 1500));
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(
//         err.message || "An unknown error occurred while fetching user details."
//       );
//       setUserData(null); // Clear data on fetch error
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId, userData]); // Added userData dependency

//   useEffect(() => {
//     fetchUserDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]); // Fetch only when userId changes initially

//   // --- Action Handlers ---
//   const handleApprove = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;
//     setIsProcessingAction("approve");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "verified",
//       });
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to approve KYC status.");
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   const openRejectModal = () => {
//     setRejectionReason("");
//     setActionError(null);
//     setShowRejectionModal(true);
//   };

//   const submitRejection = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;
//     if (!rejectionReason.trim()) {
//       setActionError("Rejection reason cannot be empty.");
//       return;
//     }
//     setIsProcessingAction("reject");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "rejected",
//         rejectionReason: rejectionReason.trim(),
//       });
//       setShowRejectionModal(false);
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to reject KYC status.");
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---

//   // ** ENHANCED renderLoading function **
//   const renderLoading = () => (
//     <div className="space-y-8">
//       {/* User Profile Card Skeleton */}
//       <Card className="shadow-none overflow-hidden">
//         <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//           <div className="flex sm:flex-row flex-col sm:items-center gap-4 flex-1">
//             <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//             <div className="flex-1 space-y-2">
//               <Skeleton className="h-6 w-1/2 rounded" /> {/* Name */}
//               <Skeleton className="h-4 w-3/4 rounded" /> {/* Email/Phone */}
//             </div>
//           </div>
//           <Skeleton className="h-8 w-24 rounded-full" /> {/* Status Badge */}
//         </CardHeader>
//         <CardContent className="sm:p-6 p-4">
//           <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//           </div>
//         </CardContent>
//        <div className="flex justify-end items-center p-4 border-t gap-3">
//         <Skeleton className="h-12 w-52 rounded-full" /> {/* Timeline Item */}
//         <Skeleton className="h-12 w-52 rounded-full" /> {/* Timeline Item */}
//        </div>
//       </Card>

//       {/* Info Sections Skeleton */}
//       <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//         <div className="w-full xl:w-2/3 flex flex-col gap-6">
//           {/* Personal Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70]">
//               <Skeleton className="h-6 w-48 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(6)].map(
//                 (
//                   _,
//                   i // Adjust count as needed
//                 ) => (
//                   <div key={`personal-skel-${i}`} className="py-2 space-y-2">
//                     <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                     <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                   </div>
//                 )
//               )}
//             </CardContent>
//           </Card>

//           {/* Identity Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//               <Skeleton className="h-6 w-56 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                   <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Submitted Documents Skeleton */}
//         <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//           <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//             <Skeleton className="h-6 w-40 rounded mb-2" />
//             <Skeleton className="h-4 w-full rounded" />
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//               {[...Array(2)].map(
//                 (
//                   _,
//                   i // Simulate 2 documents
//                 ) => (
//                   <Card
//                     key={`doc-skel-${i}`}
//                     className="border overflow-hidden w-full"
//                   >
//                     <CardHeader className="p-3">
//                       <Skeleton className="h-4 w-1/3 rounded" />
//                     </CardHeader>
//                     <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
//                       {/* Icon Skeleton (Optional) */}
//                       {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
//                       <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
//                     </div>
//                     <CardFooter className="p-2">
//                       <Skeleton className="h-6 w-3/4 mx-auto rounded" />
//                     </CardFooter>
//                   </Card>
//                 )
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   const renderErrorDisplay = (
//     message: string | null,
//     isActionError = false
//   ) => {
//     if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isActionError
//             ? "border-destructive bg-destructive/10"
//             : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle
//             className={cn(
//               "h-5 w-5 mr-3 flex-shrink-0",
//               isActionError
//                 ? "text-destructive"
//                 : "text-yellow-600 dark:text-yellow-400"
//             )}
//           />
//           <div>
//             <p
//               className={cn(
//                 "text-sm font-medium",
//                 isActionError
//                   ? "text-destructive/90 dark:text-red-300"
//                   : "text-yellow-700 dark:text-yellow-300"
//               )}
//             >
//               {isActionError ? "Action Error" : "Error"}
//             </p>
//             <p
//               className={cn(
//                 "text-sm",
//                 isActionError
//                   ? "text-destructive/80 dark:text-red-400"
//                   : "text-yellow-600 dark:text-yellow-400"
//               )}
//             >
//               {message}
//             </p>
//             {!isActionError &&
//               (message.includes("fetching") || message.includes("details")) && (
//                 <button
//                   onClick={fetchUserDetails}
//                   className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline flex items-center gap-1"
//                   disabled={isLoading}
//                 >
//                   <RefreshCw
//                     className={cn("h-3 w-3", isLoading && "animate-spin")}
//                   />{" "}
//                   Retry Fetch
//                 </button>
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Rejection Modal ---
//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };
//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   const renderRejectionModal = () => {
//     const modalVariants = isMobile ? mobileVariants : desktopVariants;
//     return (

//       /* Reject KYC Application Model */
//       <AnimatePresence>
//         {showRejectionModal && (
//           <motion.div
//             className="fixed inset-0 w-full h-full bg-black/40 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => {
//               if (!isProcessingAction) setShowRejectionModal(false);
//             }}
//             aria-labelledby="rejection-modal-title"
//             role="dialog"
//             aria-modal="true"
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center"
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={() => setShowRejectionModal(false)}
//                   disabled={!!isProcessingAction}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>

//               <h3
//                 id="rejection-modal-title"
//                 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-left my-6"
//               >
//                 Reject KYC Application
//               </h3>

//               <p className="text-gray dark:text-gray-300 font-medium mb-6 px-4 sm:px-0 text-left">
//                 Provide a clear reason for rejection. This will be visible to
//                 the user.
//               </p>

//               <div className="space-y-2 text-left mb-6">
//                 <Label
//                   htmlFor="rejectionReasonInput"
//                   className="text-neutral-900 dark:text-white font-medium px-0.5"
//                 >
//                   Reason <span className="text-destructive">*</span>
//                 </Label>

//                 <div className="mt-1 overflow-y-auto rounded-lg">
//                   <textarea
//                     id="rejectionReasonInput"
//                     rows={4}
//                     value={rejectionReason}
//                     onChange={(e) => {
//                       setRejectionReason(e.target.value);
//                       if (actionError && e.target.value.trim())
//                         setActionError(null);
//                     }}
//                     placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                     className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                     aria-describedby="rejection-error"
//                     disabled={!!isProcessingAction}
//                   />
//                 </div>
//                 {actionError && (
//                   <p
//                     id="rejection-error"
//                     className="text-sm text-destructive font-medium flex items-center gap-1.5 pt-1 px-0.5"
//                   >
//                     <AlertCircle className="h-4 w-4" /> {actionError}
//                   </p>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row justify-center gap-3">
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => setShowRejectionModal(false)}
//                   disabled={!!isProcessingAction}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   onClick={submitRejection}
//                   disabled={
//                     isProcessingAction === "reject" || !rejectionReason.trim()
//                   }
//                 >
//                   {isProcessingAction === "reject" && (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   )}{" "}
//                   Confirm Rejection
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // --- Main Render Logic ---
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           {/* Header Skeleton */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <Skeleton className="h-4 w-64 mb-3 rounded " />{" "}
//               {/* Breadcrumbs */}
//               <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//             </div>
//             <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}

//           </div>
//           {renderLoading()} {/* Render the rest of the skeleton */}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           {renderErrorDisplay(error)}
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8 text-center">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           <p className="py-16 text-muted-foreground">
//             User data could not be loaded or user not found.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- Actual Content Render (if not loading/error/not found) ---
//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === "pending";
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-white dark:bg-background">
//       {renderRejectionModal()}

//       <div className="container mx-auto px-4 py-8">
//         {/* ** Use the new KycDetailHeader component ** */}
//         <KycDetailHeader userId={userId} />

//         {/* User Profile Card */}
//         <Card className="overflow-hidden border shadow-none">
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback
//                   className={cn("text-xl font-semibold text-neutral-900 dark:text-white", statusConfig.color)}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>

//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="text-primary size-5" /> {userData.email}
//                   </span>

//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="text-primary size-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>

//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" /> {statusConfig.label}
//             </Badge>

//           </CardHeader>

//           <CardContent className="sm:p-6 p-4">
//             <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-2">
//                   <Clock className="size-5 text-primary" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}

//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}

//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>

//           </CardContent>

//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 <Button
//                   onClick={openRejectModal}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer" // Add common styles
//                 >
//                   {isProcessingAction === "reject" ? ( // Note: This loader won't show as the modal opens first
//                      <>
//                      <svg
//                        className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                        viewBox="0 0 24 24"
//                        fill="none"
//                        xmlns="http://www.w3.org/2000/svg"
//                      >
//                        <path
//                          d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                        /> <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                      </svg>
//                    </>
//                   ) : (
//                     <XCircle className="size-5" /> // Adjusted icon placement for consistency
//                   )}
//                   Reject Application
//                 </Button>

//                 <Button
//                   onClick={handleApprove}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer" // Use specific primary styles
//                 >
//                   {isProcessingAction === "approve" ? (
//                      <>
//                      <svg
//                        className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                        viewBox="0 0 24 24"
//                        fill="none"
//                        xmlns="http://www.w3.org/2000/svg"
//                      >
//                        <path
//                          d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                        /> <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                      </svg>
//                    </>
//                   ) : (
//                     <CheckCircle className="size-5 " />
//                   )}
//                   Approve Application
//                 </Button>
//               </div>
//             </CardFooter>
//           )}

//           {actionError && !showRejectionModal && (
//             <div className="px-4 sm:px-6 pb-4">
//               {renderErrorDisplay(actionError, true)}
//             </div>
//           )}
//         </Card>

//         {/* Info Sections */}
//         <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {/* Rejection Reason Card */}

//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400">
//                     <AlertCircle className="h-5 w-5" /> Rejection Reason
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-sm text-red-600 dark:text-red-300 font-normal">
//                     {kyc.rejectionReason}
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Personal Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <IdCard className="size-5 text-primary" /> Personal Information
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                   icon={User}

//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             {/* Identity Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4  h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="size-5 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                   icon={IdCard}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Submitted Documents */}
//           <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="size-5 text-primary" /> Submitted
//                 Documents
//               </CardTitle>

//               <CardDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Review identification documents submitted by the user
//               </CardDescription>

//             </CardHeader>
//             <CardContent className="p-4 sm:p-6">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="overflow-hidden w-full bg-muted/30 dark:bg-muted/20"
//                     >
//                       <CardHeader className="p-3">
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative  group bg-white dark:bg-background">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain p-1"
//                             unoptimized
//                           />
//                           <Link
//                             href={doc.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="absolute inset-0 bg-black/50 opacity-0 flex-col group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
//                             aria-label={`View full ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <Eye className="size-5" />
//                               <span className="text-xs font-medium">
//                                       View Full
//                                     </span>
//                           </Link>
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                           <Link
//                             href={doc.url || "#"}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={cn(
//                               "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
//                               !doc.url && "pointer-events-none opacity-50"
//                             )}
//                             aria-label={`View ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <FileText className="h-12 w-12 mb-2" />
//                             <span className="text-xs font-medium">
//                               View PDF
//                             </span>
//                             <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
//                           </Link>
//                         </CardContent>
//                       )}
//                       <CardFooter className="p-2">
//                         <Link
//                           href={doc.url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={cn(
//                             "w-full",
//                             !doc.url && "pointer-events-none opacity-50"
//                           )}
//                         >
//                           <Button
//                             variant="link"
//                             size="sm"
//                             className="w-full text-xs justify-center items-center gap-1 text-primary"
//                             disabled={!doc.url}
//                           >
//                             View Full Document{" "}
//                             <ExternalLink className="size-4.5" />
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4 border border-dashed rounded-lg">
//                   <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-sm text-muted-foreground">
//                     No documents submitted.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// frontend/src/app/admin/kyc-management/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import kycAdminService from "@/app/services/admin/kyc.admin";
// import type {
//   AdminKycUserResponse,
//   KycDetails,
//   SalaryRange,
// } from "@/app/services/admin/kyc.admin";
// import KycDetailHeader from "@/app/admin/components/kyc/KycDetailHeader"; // Adjust path if necessary

// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// // Icons
// import {
//   ArrowLeft,
//   ExternalLink,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   FileText,
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Eye,
//   Globe,
//   Info,
//   Image as ImageIcon, // Use a different name to avoid conflict
//   RefreshCw,
//   IdCard,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// // --- Helper Functions --- (Keep these as they are)
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycDetails["mobile"]): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// const getStatusConfig = (status?: string) => {
//   const statusMap = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     default: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Not Started",
//     },
//   };
//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// // --- DetailItem Component --- (Keep as is)
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
// }) => (
//   <div className="py-2 space-y-2">
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />} {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">Not Provided</span>}
//     </dd>
//   </div>
// );

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<
//     false | "approve" | "reject"
//   >(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false); // <-- New state for approval modal
//   const [rejectionReason, setRejectionReason] = useState<string>("");
//   const [isMobile, setIsMobile] = useState(false);

//   // --- Responsive Check --- (Keep as is)
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     if (typeof window !== "undefined") {
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // --- Fetching Logic --- (Keep as is)
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     if (!userData) {
//       setIsLoading(true);
//     }
//     setError(null);
//     setActionError(null); // Clear action errors on refetch
//     try {
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(
//         err.message || "An unknown error occurred while fetching user details."
//       );
//       setUserData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId, userData]);

//   useEffect(() => {
//     fetchUserDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // --- Action Handlers ---

//   // Opens the rejection modal
//   const openRejectModal = () => {
//     setRejectionReason("");
//     setActionError(null); // Clear previous errors
//     setShowRejectionModal(true);
//   };

//   // Submits the rejection
//   const submitRejection = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;
//     if (!rejectionReason.trim()) {
//       setActionError("Rejection reason cannot be empty.");
//       return;
//     }
//     setIsProcessingAction("reject");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "rejected",
//         rejectionReason: rejectionReason.trim(),
//       });
//       setShowRejectionModal(false);
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to reject KYC status.");
//       // Keep modal open to show error
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // Opens the approval modal
//   const openApproveModal = () => {
//     setActionError(null); // Clear previous errors
//     setShowApprovalModal(true);
//   };

//   // Submits the approval
//   const submitApproval = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;

//     setIsProcessingAction("approve");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "verified",
//       });
//       setShowApprovalModal(false); // Close modal on success
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to approve KYC status.");
//       // Keep modal open to show error
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---

//   // ** renderLoading function ** (Keep as is)
//   const renderLoading = () => (
//     <div className="space-y-8">
//       {/* User Profile Card Skeleton */}
//       <Card className="shadow-none overflow-hidden">
//         <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//           <div className="flex sm:flex-row flex-col sm:items-center gap-4 flex-1">
//             <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//             <div className="flex-1 space-y-2">
//               <Skeleton className="h-6 w-1/2 rounded" /> {/* Name */}
//               <Skeleton className="h-4 w-3/4 rounded" /> {/* Email/Phone */}
//             </div>
//           </div>
//           <Skeleton className="h-8 w-24 rounded-full" /> {/* Status Badge */}
//         </CardHeader>
//         <CardContent className="sm:p-6 p-4">
//           <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//           </div>
//         </CardContent>
//         <div className="flex justify-end items-center p-4 border-t gap-3">
//           <Skeleton className="h-12 w-52 rounded-full" /> {/* Timeline Item */}
//           <Skeleton className="h-12 w-52 rounded-full" /> {/* Timeline Item */}
//         </div>
//       </Card>

//       {/* Info Sections Skeleton */}
//       <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//         <div className="w-full xl:w-2/3 flex flex-col gap-6">
//           {/* Personal Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70]">
//               <Skeleton className="h-6 w-48 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div key={`personal-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                   <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Identity Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//               <Skeleton className="h-6 w-56 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                   <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Submitted Documents Skeleton */}
//         <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//           <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//             <Skeleton className="h-6 w-40 rounded mb-2" />
//             <Skeleton className="h-4 w-full rounded" />
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//               {[...Array(2)].map((_, i) => (
//                 <Card
//                   key={`doc-skel-${i}`}
//                   className="border overflow-hidden w-full"
//                 >
//                   <CardHeader className="p-3">
//                     <Skeleton className="h-4 w-1/3 rounded" />
//                   </CardHeader>
//                   <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
//                     <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
//                   </div>
//                   <CardFooter className="p-2">
//                     <Skeleton className="h-6 w-3/4 mx-auto rounded" />
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   // ** renderErrorDisplay function ** (Keep as is)
//   const renderErrorDisplay = (
//     message: string | null,
//     isActionError = false,
//     isModalError = false // Added flag for modal errors
//   ) => {
//     if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isModalError
//             ? "border-destructive bg-destructive/10"
//             : isActionError
//             ? "border-destructive bg-destructive/10"
//             : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle
//             className={cn(
//               "h-5 w-5 mr-3 flex-shrink-0",
//               isActionError || isModalError
//                 ? "text-destructive"
//                 : "text-yellow-600 dark:text-yellow-400"
//             )}
//           />
//           <div>
//             <p
//               className={cn(
//                 "text-sm font-medium",
//                 isActionError || isModalError
//                   ? "text-destructive/90 dark:text-red-300"
//                   : "text-yellow-700 dark:text-yellow-300"
//               )}
//             >
//               {isActionError || isModalError ? "Action Error" : "Error"}
//             </p>
//             <p
//               className={cn(
//                 "text-sm",
//                 isActionError || isModalError
//                   ? "text-destructive/80 dark:text-red-400"
//                   : "text-yellow-600 dark:text-yellow-400"
//               )}
//             >
//               {message}
//             </p>
//             {!isActionError &&
//               !isModalError &&
//               (message.includes("fetching") || message.includes("details")) && (
//                 <button
//                   onClick={fetchUserDetails}
//                   className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline flex items-center gap-1"
//                   disabled={isLoading}
//                 >
//                   <RefreshCw
//                     className={cn("h-3 w-3", isLoading && "animate-spin")}
//                   />{" "}
//                   Retry Fetch
//                 </button>
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Modal Animation Variants --- (Keep as is)
//   const mobileVariants = {
//     initial: { y: 50, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { stiffness: 100 } },
//     exit: { y: 50, opacity: 0 },
//   };
//   const desktopVariants = {
//     initial: { y: -30, opacity: 0, scale: 0.95 },
//     animate: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 },
//     },
//     exit: { y: -30, opacity: 0, scale: 0.95 },
//   };

//   // --- Rejection Modal --- (Keep as is, but ensure actionError is handled)
//   const renderRejectionModal = () => {
//     const modalVariants = isMobile ? mobileVariants : desktopVariants;
//     return (
//       /* Reject KYC Application Modal */
//       <AnimatePresence>
//         {showRejectionModal && (
//           <motion.div
//             className="fixed inset-0 w-full h-full bg-black/40 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => {
//               if (!isProcessingAction) setShowRejectionModal(false);
//             }}
//             aria-labelledby="rejection-modal-title"
//             role="dialog"
//             aria-modal="true"
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg relative"
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 sm:p-6 rounded-t-2xl flex items-center justify-between border-b">
//                 <h2
//                   id="rejection-modal-title"
//                   className="lg:text-2xl text-xl font-semibold text-mainheading dark:text-white"
//                 >
//                   Reject KYC Application
//                 </h2>

//                 <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                   <button
//                     className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                     onClick={() => setShowRejectionModal(false)}
//                     disabled={!!isProcessingAction}
//                     aria-label="Close modal"
//                   >
//                     <IoClose
//                       size={28}
//                       className="text-neutral-900 dark:text-primary"
//                     />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 sm:p-6 space-y-4">
//                   <p className="text-sm text-gray-500 dark:text-gray-300">
//                 Provide a clear reason for rejection. This will be visible to
//                 the user.
//               </p>

//                 <Label
//                   htmlFor="rejectionReasonInput"
//                   className="text-gray-500 dark:text-gray-300 inline-block capitalize text-sm lg:text-base"
//                 >
//                   Reason <span className="text-red-600">*</span>
//                 </Label>

//                 <div className="overflow-y-auto rounded-lg">
//                   <textarea
//                     id="rejectionReasonInput"
//                     rows={4}
//                     value={rejectionReason}
//                     onChange={(e) => {
//                       setRejectionReason(e.target.value);
//                       if (actionError && e.target.value.trim())
//                         setActionError(null); // Clear error when typing
//                     }}
//                     placeholder="E.g., ID document blurry, Information mismatch, Expired document..."
//                     className="min-h-[150px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
//                     aria-describedby="rejection-error-message" // Link error message
//                     disabled={!!isProcessingAction}
//                   />
//                 </div>
//                 {/* Display action error specific to this modal action */}
//                 {actionError && isProcessingAction === "reject" && (
//                   <p
//                     id="rejection-error-message"
//                     className="text-sm text-destructive font-medium flex items-center gap-1.5 pt-1 px-0.5"
//                     role="alert"
//                   >
//                     <AlertCircle className="h-4 w-4" /> {actionError}
//                   </p>
//                 )}
//               </div>

//               <div className="flex sm:flex-row flex-col items-center justify-end sm:p-6 p-4 gap-4 border-t">
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => setShowRejectionModal(false)}
//                   disabled={!!isProcessingAction}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   onClick={submitRejection}
//                   disabled={
//                     isProcessingAction === "reject" || !rejectionReason.trim()
//                   }
//                 >
//                   {isProcessingAction === "reject" && (
//                     // <Loader2 className="h-5 w-5 animate-spin" />
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M12 18V22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 4.93L7.76 7.76"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 16.24L19.07 19.07"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M2 12H6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M18 12H22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 19.07L7.76 16.24"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 7.76L19.07 4.93"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span>Confirm In...</span>
//                     </>
//                   )}{" "}
//                   Confirm Rejection
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // --- *** NEW Approval Modal *** ---
//   const renderApprovalModal = () => {
//     const modalVariants = isMobile ? mobileVariants : desktopVariants;
//     return (
//       /* Approve KYC Application Modal */
//       <AnimatePresence>
//         {showApprovalModal && (
//           <motion.div
//             className="fixed inset-0 w-full h-full bg-black/50 dark:bg-white/30 z-50 flex sm:items-center items-end justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => {
//               if (!isProcessingAction) setShowApprovalModal(false);
//             }}
//             aria-labelledby="approval-modal-title"
//             role="dialog"
//             aria-modal="true"
//           >
//             <motion.div
//               className="bg-white dark:bg-background sm:rounded-3xl rounded-t-3xl sm:p-8 p-4 w-full sm:max-w-lg relative text-center"
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="absolute sm:top-2 sm:right-2 top-1 right-1">
//                 <button
//                   className="p-3 bg-lightborder hover:bg-neutral-300 dark:bg-primarybox dark:hover:bg-secondarybox rounded-full transition-all duration-75 ease-linear cursor-pointer"
//                   onClick={() => setShowApprovalModal(false)}
//                   disabled={!!isProcessingAction}
//                   aria-label="Close modal"
//                 >
//                   <IoClose
//                     size={28}
//                     className="text-neutral-900 dark:text-primary"
//                   />
//                 </button>
//               </div>

//               <div className="flex justify-center mb-4">
//                 <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
//                   <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
//                 </div>
//               </div>

//               <h3
//                 id="approval-modal-title"
//                 className="sm:text-3xl text-2xl font-semibold text-mainheading dark:text-white text-center mb-3"
//               >
//                 Approve KYC Application
//               </h3>

//               <p className="text-gray dark:text-gray-300 font-medium mb-6 text-center">
//                 Are you sure you want to mark this KYC application as verified?
//               </p>

//               {/* Display action error specific to this modal action */}
//               {actionError && isProcessingAction === "approve" && (
//                 <div className="mb-4 px-4 sm:px-0">
//                   {" "}
//                   {/* Added margin bottom */}
//                   <p
//                     id="approval-error-message"
//                     className="text-sm text-destructive font-medium flex items-center justify-center gap-1.5 pt-1 px-0.5"
//                     role="alert"
//                   >
//                     <AlertCircle className="h-4 w-4" /> {actionError}
//                   </p>
//                 </div>
//               )}

//               <div className="flex flex-col sm:flex-row justify-center gap-3">
//                 <button
//                   className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => setShowApprovalModal(false)}
//                   disabled={!!isProcessingAction}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   // Use primary button styles, similar to the original approve button
//                   className="bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   onClick={submitApproval} // Call the new submit function
//                   disabled={isProcessingAction === "approve"}
//                 >
//                   {isProcessingAction === "approve" && (
//                     <>
//                       <svg
//                         className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M12 2V6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M12 18V22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 4.93L7.76 7.76"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 16.24L19.07 19.07"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M2 12H6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M18 12H22"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M4.93 19.07L7.76 16.24"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M16.24 7.76L19.07 4.93"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span>Confirmation...</span>
//                     </>
//                   )}{" "}
//                   Confirm Approval
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // --- Main Render Logic ---
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           {/* Header Skeleton */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <Skeleton className="h-4 w-64 mb-3 rounded " />{" "}
//               {/* Breadcrumbs */}
//               <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//             </div>
//             <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//           </div>
//           {renderLoading()} {/* Render the rest of the skeleton */}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           {renderErrorDisplay(error)}
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8 text-center">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           <p className="py-16 text-muted-foreground">
//             User data could not be loaded or user not found.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- Actual Content Render (if not loading/error/not found) ---
//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === "pending";
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-white dark:bg-background">
//       {renderRejectionModal()}
//       {renderApprovalModal()} {/* <-- Render the new approval modal */}
//       <div className="container mx-auto px-4 py-8">
//         <KycDetailHeader userId={userId} />

//         {/* User Profile Card */}
//         <Card className="overflow-hidden border shadow-none">
//           {/* CardHeader (Keep as is) */}
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback
//                   className={cn(
//                     "text-xl font-semibold text-neutral-900 dark:text-white",
//                     statusConfig.color
//                   )}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>

//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="text-primary size-5" /> {userData.email}
//                   </span>

//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="text-primary size-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>

//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" /> {statusConfig.label}
//             </Badge>
//           </CardHeader>

//           {/* CardContent (Keep as is) */}
//           <CardContent className="sm:p-6 p-4">
//             <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-2">
//                   <Clock className="size-5 text-primary" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}

//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}

//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>
//           </CardContent>

//           {/* --- UPDATED CardFooter for Action Buttons --- */}
//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 {/* Reject Button - Opens Reject Modal */}
//                 <button
//                   onClick={openRejectModal} // Opens the rejection modal
//                   disabled={!!isProcessingAction} // Disable if any action is processing
//                   className="text-base bg-red-600 gap-2 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer"
//                 >
//                   <XCircle className="size-5" />
//                   Reject Application
//                 </button>

//                 {/* Approve Button - Opens Approve Modal */}
//                 <Button
//                   onClick={openApproveModal} // Opens the approval modal
//                   disabled={!!isProcessingAction} // Disable if any action is processing
//                   className="text-base bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center gap-2"
//                 >
//                   <CheckCircle className="size-5" />
//                   Approve Application
//                 </Button>
//               </div>
//             </CardFooter>
//           )}

//           {/* General Action Error Display (outside modals) */}
//           {actionError && !showRejectionModal && !showApprovalModal && (
//             <div className="px-4 sm:px-6 pb-4">
//               {renderErrorDisplay(actionError, true)}
//             </div>
//           )}
//         </Card>

//         {/* Info Sections (Keep the rest of the content as is) */}
//         <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {/* Rejection Reason Card */}
//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400">
//                     <AlertCircle className="h-5 w-5" /> Rejection Reason
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-sm text-red-600 dark:text-red-300 font-normal">
//                     {kyc.rejectionReason}
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Personal Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <IdCard className="size-5 text-primary" /> Personal
//                   Information
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                   icon={User}
//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             {/* Identity Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4  h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="size-5 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                   icon={IdCard}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                   icon={Phone} // Note: Maybe IdCard icon is better here? Reusing Phone from original.
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Submitted Documents */}
//           <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="size-5 text-primary" /> Submitted Documents
//               </CardTitle>

//               <CardDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Review identification documents submitted by the user
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="overflow-hidden w-full bg-muted/30 dark:bg-muted/20"
//                     >
//                       <CardHeader className="p-3">
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative  group bg-white dark:bg-background">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain p-1"
//                             unoptimized
//                           />
//                           <Link
//                             href={doc.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="absolute inset-0 bg-black/50 opacity-0 flex-col group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white" // Added text-white
//                             aria-label={`View full ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <Eye className="size-5 mb-1" /> {/* Added margin */}
//                             <span className="text-xs font-medium">
//                               View Full
//                             </span>
//                           </Link>
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                           <Link
//                             href={doc.url || "#"}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={cn(
//                               "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
//                               !doc.url && "pointer-events-none opacity-50"
//                             )}
//                             aria-label={`View ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <FileText className="h-12 w-12 mb-2" />
//                             <span className="text-xs font-medium flex items-center">
//                               {" "}
//                               {/* Flex container for text + icon */}
//                               View PDF
//                               <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
//                             </span>
//                           </Link>
//                         </CardContent>
//                       )}
//                       <CardFooter className="p-2">
//                         <Link
//                           href={doc.url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={cn(
//                             "w-full",
//                             !doc.url && "pointer-events-none opacity-50"
//                           )}
//                         >
//                           <Button
//                             variant="link"
//                             size="sm"
//                             className="w-full text-xs justify-center items-center gap-1 text-primary"
//                             disabled={!doc.url}
//                           >
//                             View Full Document{" "}
//                             <ExternalLink className="size-3.5" />{" "}
//                             {/* Adjusted size slightly */}
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4 border border-dashed rounded-lg">
//                   <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-sm text-muted-foreground">
//                     No documents submitted.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import kycAdminService from "@/app/services/admin/kyc.admin";
// import type {
//   AdminKycUserResponse,
//   KycDetails,
//   SalaryRange,
// } from "@/app/services/admin/kyc.admin";
// import KycDetailHeader from "@/app/admin/components/kyc/KycDetailHeader";
// import KycRejectModal from "@/app/components/KycRejectModal"; // <-- Import new modal
// import KycApproveModal from "@/app/components/KycApproveModal"; // <-- Import new modal

// // Icons
// import {
//   ArrowLeft,
//   ExternalLink,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   FileText,
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Eye,
//   Globe,
//   Info,
//   Image as ImageIcon,
//   RefreshCw,
//   IdCard,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// // Textarea and Label are now used within the modal components
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";

// // --- Helper Functions --- (Keep these as they are)
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycDetails["mobile"]): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// const getStatusConfig = (status?: string) => {
//   const statusMap = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     default: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Not Started",
//     },
//   };
//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// // --- DetailItem Component --- (Keep as is)
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
// }) => (
//   <div className="py-2 space-y-2">
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />} {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">Not Provided</span>}
//     </dd>
//   </div>
// );

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<
//     false | "approve" | "reject"
//   >(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
//   const [rejectionReasonForModal, setRejectionReasonForModal] =
//     useState<string>(""); // For prepopulating modal if needed
//   const [isMobile, setIsMobile] = useState(false);

//   // --- Responsive Check --- (Keep as is)
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     if (typeof window !== "undefined") {
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // --- Fetching Logic --- (Keep as is)
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     if (!userData) {
//       // Only show full page loading skeleton if userData is not yet fetched
//       setIsLoading(true);
//     }
//     setError(null);
//     setActionError(null); // Clear action errors on refetch
//     try {
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(
//         err.message || "An unknown error occurred while fetching user details."
//       );
//       setUserData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId, userData]); // userData added to dependencies to avoid re-fetch if only action occurs

//   useEffect(() => {
//     fetchUserDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]); // Only refetch when userId changes, fetchUserDetails handles its own conditions

//   // --- Action Handlers ---

//   // Opens the rejection modal
//   const openRejectModal = () => {
//     setRejectionReasonForModal(""); // Clear any previous reason when opening
//     setActionError(null); // Clear previous errors
//     setShowRejectionModal(true);
//   };

//   // Submits the rejection
//   const submitRejection = async (reason: string) => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;

//     setIsProcessingAction("reject");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "rejected",
//         rejectionReason: reason,
//       });
//       setShowRejectionModal(false);
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to reject KYC status.");
//       // Error will be displayed in the modal
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // Opens the approval modal
//   const openApproveModal = () => {
//     setActionError(null); // Clear previous errors
//     setShowApprovalModal(true);
//   };

//   // Submits the approval
//   const submitApproval = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;

//     setIsProcessingAction("approve");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "verified",
//       });
//       setShowApprovalModal(false);
//       await fetchUserDetails(); // Refetch after action
//     } catch (err: any) {
//       setActionError(err.message || "Failed to approve KYC status.");
//       // Error will be displayed in the modal
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---

//   // ** renderLoading function ** (Keep as is)
//   const renderLoading = () => (
//     <div className="space-y-8">
//       {/* User Profile Card Skeleton */}
//       <Card className="shadow-none overflow-hidden">
//         <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//           <div className="flex sm:flex-row flex-col sm:items-center gap-4 flex-1">
//             <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//             <div className="flex-1 space-y-2">
//               <Skeleton className="h-6 w-1/2 rounded" /> {/* Name */}
//               <Skeleton className="h-4 w-3/4 rounded" /> {/* Email/Phone */}
//             </div>
//           </div>
//           <Skeleton className="h-8 w-24 rounded-full" /> {/* Status Badge */}
//         </CardHeader>
//         <CardContent className="sm:p-6 p-4">
//           <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//             <Skeleton className="h-5 w-48 rounded" /> {/* Timeline Item */}
//           </div>
//         </CardContent>
//         <div className="flex justify-end items-center p-4 border-t gap-3">
//           <Skeleton className="h-12 w-52 rounded-full" /> {/* Action Button */}
//           <Skeleton className="h-12 w-52 rounded-full" /> {/* Action Button */}
//         </div>
//       </Card>

//       {/* Info Sections Skeleton */}
//       <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//         <div className="w-full xl:w-2/3 flex flex-col gap-6">
//           {/* Personal Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70]">
//               <Skeleton className="h-6 w-48 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div key={`personal-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                   <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Identity Info Skeleton */}
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//               <Skeleton className="h-6 w-56 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" /> {/* Label */}
//                   <Skeleton className="h-5 w-3/4 rounded" /> {/* Value */}
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Submitted Documents Skeleton */}
//         <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//           <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//             <Skeleton className="h-6 w-40 rounded mb-2" />
//             <Skeleton className="h-4 w-full rounded" />
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//               {[...Array(2)].map((_, i) => (
//                 <Card
//                   key={`doc-skel-${i}`}
//                   className="border overflow-hidden w-full"
//                 >
//                   <CardHeader className="p-3">
//                     <Skeleton className="h-4 w-1/3 rounded" />
//                   </CardHeader>
//                   <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
//                     <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
//                   </div>
//                   <CardFooter className="p-2">
//                     <Skeleton className="h-6 w-3/4 mx-auto rounded" />
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   // ** renderErrorDisplay function ** (Keep as is)
//   const renderErrorDisplay = (
//     message: string | null,
//     isActionErrorType = false, // Renamed to avoid conflict with component state
//     isModalError = false
//   ) => {
//     if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isModalError
//             ? "border-destructive bg-destructive/10" // This specific styling might be handled by modal itself now
//             : isActionErrorType
//             ? "border-destructive bg-destructive/10"
//             : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle
//             className={cn(
//               "h-5 w-5 mr-3 flex-shrink-0",
//               isActionErrorType || isModalError
//                 ? "text-destructive"
//                 : "text-yellow-600 dark:text-yellow-400"
//             )}
//           />
//           <div>
//             <p
//               className={cn(
//                 "text-sm font-medium",
//                 isActionErrorType || isModalError
//                   ? "text-destructive/90 dark:text-red-300"
//                   : "text-yellow-700 dark:text-yellow-300"
//               )}
//             >
//               {isActionErrorType || isModalError ? "Action Error" : "Error"}
//             </p>
//             <p
//               className={cn(
//                 "text-sm",
//                 isActionErrorType || isModalError
//                   ? "text-destructive/80 dark:text-red-400"
//                   : "text-yellow-600 dark:text-yellow-400"
//               )}
//             >
//               {message}
//             </p>
//             {!isActionErrorType &&
//               !isModalError &&
//               (message.includes("fetching") || message.includes("details")) && (
//                 <button
//                   onClick={fetchUserDetails}
//                   className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline flex items-center gap-1"
//                   disabled={isLoading || isProcessingAction !== false} // Disable if main page is loading or an action is processing
//                 >
//                   <RefreshCw
//                     className={cn(
//                       "h-3 w-3",
//                       (isLoading || isProcessingAction !== false) &&
//                         "animate-spin"
//                     )}
//                   />{" "}
//                   Retry Fetch
//                 </button>
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Main Render Logic ---
//   if (isLoading && !userData) {
//     // Show full page skeleton only on initial load
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           {/* Header Skeleton */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <Skeleton className="h-4 w-64 mb-3 rounded " />{" "}
//               {/* Breadcrumbs */}
//               <Skeleton className="h-8 w-48 rounded " /> {/* Title */}
//             </div>
//             <Skeleton className="h-9 w-32 rounded-md " /> {/* Back Button */}
//           </div>
//           {renderLoading()} {/* Render the rest of the skeleton */}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           {renderErrorDisplay(error)}
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-muted/30 dark:bg-background">
//         <div className="container mx-auto px-4 py-8 text-center">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           <p className="py-16 text-muted-foreground">
//             User data could not be loaded or user not found.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- Actual Content Render (if not loading/error/not found) ---
//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === "pending";
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-white dark:bg-background">
//       {/* Render Modals */}

//       <KycRejectModal
//         isOpen={showRejectionModal}
//         onClose={() => setShowRejectionModal(false)}
//         onSubmit={submitRejection}
//         isProcessing={isProcessingAction === "reject"}
//         processingError={isProcessingAction === "reject" ? actionError : null}
//         initialReason={rejectionReasonForModal}
//         isMobileView={isMobile}
//       />

//       <KycApproveModal
//         isOpen={showApprovalModal}
//         onClose={() => setShowApprovalModal(false)}
//         onSubmit={submitApproval}
//         isProcessing={isProcessingAction === "approve"}
//         processingError={isProcessingAction === "approve" ? actionError : null}
//         isMobileView={isMobile}
//       />

//       <div className="container mx-auto px-4 py-8">
//         <KycDetailHeader userId={userId} />

//         {/* User Profile Card */}
//         <Card className="overflow-hidden border shadow-none">
//           {/* CardHeader (Keep as is) */}
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback
//                   className={cn(
//                     "text-xl font-semibold text-neutral-900 dark:text-white",
//                     statusConfig.color
//                   )}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>

//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="text-primary size-5" /> {userData.email}
//                   </span>

//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="text-primary size-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>

//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" /> {statusConfig.label}
//             </Badge>
//           </CardHeader>

//           {/* CardContent (Keep as is) */}
//           <CardContent className="sm:p-6 p-4">
//             <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-2">
//                   <Clock className="size-5 text-primary" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}

//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}

//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>
//           </CardContent>

//           {/* CardFooter for Action Buttons */}
//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 <button
//                   onClick={openRejectModal}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-red-600 gap-2 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   <XCircle className="size-5" />
//                   Reject Application
//                 </button>

//                 <Button
//                   onClick={openApproveModal}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 md:h-12.5 h-10 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   <CheckCircle className="size-5" />
//                   Approve Application
//                 </Button>
//               </div>
//             </CardFooter>
//           )}

//           {/* General Action Error Display (outside modals and not for fetching errors) */}
//           {actionError &&
//             !showRejectionModal &&
//             !showApprovalModal &&
//             isProcessingAction === false && ( // Show general action error if modals are closed and no action is currently processing (i.e., after a failed action that closed the modal)
//               <div className="px-4 sm:px-6 pb-4">
//                 {renderErrorDisplay(actionError, true)}
//               </div>
//             )}
//         </Card>

//         {/* Info Sections (Keep the rest of the content as is) */}
//         <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {/* Rejection Reason Card */}
//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400">
//                     <AlertCircle className="h-5 w-5" /> Rejection Reason
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-sm text-red-600 dark:text-red-300 font-normal">
//                     {kyc.rejectionReason}
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Personal Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <IdCard className="size-5 text-primary" /> Personal
//                   Information
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                   icon={User}
//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             {/* Identity Information */}
//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4  h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="size-5 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                   icon={IdCard}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Submitted Documents */}
//           <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="size-5 text-primary" /> Submitted Documents
//               </CardTitle>

//               <CardDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Review identification documents submitted by the user
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="overflow-hidden w-full bg-muted/30 dark:bg-muted/20"
//                     >
//                       <CardHeader className="p-3">
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative  group bg-white dark:bg-background">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain p-1"
//                             unoptimized
//                           />
//                           <Link
//                             href={doc.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="absolute inset-0 bg-black/50 opacity-0 flex-col group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white"
//                             aria-label={`View full ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <Eye className="size-5 mb-1" />
//                             <span className="text-xs font-medium">
//                               View Full
//                             </span>
//                           </Link>
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                           <Link
//                             href={doc.url || "#"}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={cn(
//                               "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
//                               !doc.url && "pointer-events-none opacity-50"
//                             )}
//                             aria-label={`View ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <FileText className="h-12 w-12 mb-2" />
//                             <span className="text-xs font-medium flex items-center">
//                               View PDF
//                               <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
//                             </span>
//                           </Link>
//                         </CardContent>
//                       )}
//                       <CardFooter className="p-2">
//                         <Link
//                           href={doc.url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={cn(
//                             "w-full",
//                             !doc.url && "pointer-events-none opacity-50"
//                           )}
//                         >
//                           <Button
//                             variant="link"
//                             size="sm"
//                             className="w-full text-xs justify-center items-center gap-1 text-primary"
//                             disabled={!doc.url}
//                           >
//                             View Full Document{" "}
//                             <ExternalLink className="size-3.5" />
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4 border border-dashed rounded-lg">
//                   <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-sm text-muted-foreground">
//                     No documents submitted.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// // last code
// // frontend/src/app/admin/kyc-management/[userId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import kycAdminService from "@/app/services/admin/kyc.admin";
// import type {
//   AdminKycUserResponse,
//   KycDetails,
//   SalaryRange,
// } from "@/app/services/admin/kyc.admin";
// import KycDetailHeader from "@/app/admin/components/kyc/KycDetailHeader";
// import KycRejectModal from "@/app/components/KycRejectModal";
// import KycApproveModal from "@/app/components/KycApproveModal";

// // Icons
// import {
//   ArrowLeft,
//   ExternalLink,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   FileText,
//   User,
//   CalendarDays,
//   Phone,
//   Mail,
//   Briefcase,
//   BadgeDollarSign,
//   Fingerprint,
//   Eye,
//   Globe,
//   Info,
//   Image as ImageIcon,
//   RefreshCw,
//   IdCard,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";

// // --- Helper Functions ---
// const formatDate = (
//   dateInput?: string | Date | null,
//   includeTime = false
// ): string => {
//   if (!dateInput) return "N/A";
//   try {
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) {
//       console.warn("formatDate received invalid dateInput:", dateInput);
//       return "Invalid Date";
//     }
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
//     };
//     return date.toLocaleDateString("en-US", options);
//   } catch (e) {
//     console.error("Error formatting date:", e, "Input:", dateInput);
//     return "Invalid Date";
//   }
// };

// const formatMobile = (mobile?: KycDetails["mobile"]): string => {
//   if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
//     return "N/A";
//   return `${mobile.countryCode} ${mobile.number}`;
// };

// const salaryDisplayMap: Record<SalaryRange, string> = {
//   "0-1000": "Below $10,000",
//   "10000-50000": "$10,000 - $49,999",
//   "50000-100000": "$50,000 - $99,999",
//   "100000+": "$100,000 or more",
// };

// const getStatusConfig = (status?: string) => {
//   const statusMap = {
//     verified: {
//       color:
//         "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
//       icon: CheckCircle,
//       label: "Verified",
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       icon: XCircle,
//       label: "Rejected",
//     },
//     pending: {
//       color:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
//       icon: Clock,
//       label: "Pending",
//     },
//     skipped: {
//       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
//       icon: ArrowLeft,
//       label: "Skipped",
//     },
//     default: {
//       color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//       icon: AlertCircle,
//       label: "Not Started",
//     },
//   };
//   return statusMap[status as keyof typeof statusMap] || statusMap.default;
// };

// const getInitials = (name?: string): string => {
//   if (!name) return "??";
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
// };

// // --- DetailItem Component ---
// const DetailItem = ({
//   label,
//   value,
//   icon: Icon,
//   isImportant = false,
// }: {
//   label: string;
//   value: React.ReactNode;
//   icon?: React.ElementType;
//   isImportant?: boolean;
// }) => (
//   <div className="py-2 space-y-2">
//     <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
//       {Icon && <Icon className="flex-shrink-0 text-primary size-4" />} {label}
//     </dt>
//     <dd
//       className={cn(
//         "text-sm break-words text-gray-500 dark:text-gray-300",
//         isImportant ? "font-semibold" : ""
//       )}
//     >
//       {value || <span className="italic">Not Provided</span>}
//     </dd>
//   </div>
// );

// // --- Main Detail Page Component ---
// const KycUserDetailPage: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.userId as string;

//   const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [isProcessingAction, setIsProcessingAction] = useState<
//     false | "approve" | "reject"
//   >(false);
//   const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
//   const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
//   const [rejectionReasonForModal, setRejectionReasonForModal] =
//     useState<string>("");
//   const [isMobile, setIsMobile] = useState(false);

//   // --- Responsive Check ---
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     if (typeof window !== "undefined") {
//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // --- Fetching Logic ---
//   const fetchUserDetails = useCallback(async () => {
//     if (!userId) {
//       setError("User ID is missing from the URL.");
//       setIsLoading(false);
//       return;
//     }
//     if (!userData) {
//       setIsLoading(true);
//     }
//     setError(null);
//     setActionError(null);
//     try {
//       const data = await kycAdminService.getKycDetailsAdmin(userId);
//       setUserData(data);
//     } catch (err: any) {
//       console.error("Error fetching user details:", err);
//       setError(
//         err.message || "An unknown error occurred while fetching user details."
//       );
//       setUserData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId, userData]);

//   useEffect(() => {
//     fetchUserDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // --- Prevent body scroll when modal is open ---
//   useEffect(() => {
//     const body = document.body;
//     const originalOverflow = body.style.overflow;

//     if (showRejectionModal || showApprovalModal) {
//       body.style.overflow = "hidden";
//     } else {
//       body.style.overflow = originalOverflow; // Restore original or set to default
//     }

//     return () => {
//       // Ensure scroll is restored if component unmounts while modal is open
//       body.style.overflow = originalOverflow;
//     };
//   }, [showRejectionModal, showApprovalModal]);

//   // --- Action Handlers ---
//   const openRejectModal = () => {
//     setRejectionReasonForModal("");
//     setActionError(null);
//     setShowRejectionModal(true);
//   };

//   const submitRejection = async (reason: string) => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;

//     setIsProcessingAction("reject");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "rejected",
//         rejectionReason: reason,
//       });
//       setShowRejectionModal(false);
//       await fetchUserDetails();
//     } catch (err: any) {
//       setActionError(err.message || "Failed to reject KYC status.");
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   const openApproveModal = () => {
//     setActionError(null);
//     setShowApprovalModal(true);
//   };

//   const submitApproval = async () => {
//     if (
//       !userId ||
//       !userData ||
//       userData.kyc?.status !== "pending" ||
//       isProcessingAction
//     )
//       return;

//     setIsProcessingAction("approve");
//     setActionError(null);
//     try {
//       await kycAdminService.updateKycStatusAdmin(userId, {
//         status: "verified",
//       });
//       setShowApprovalModal(false);
//       await fetchUserDetails();
//     } catch (err: any) {
//       setActionError(err.message || "Failed to approve KYC status.");
//     } finally {
//       setIsProcessingAction(false);
//     }
//   };

//   // --- Render Functions ---
//   const renderLoading = () => (
//     <div className="space-y-8">
//       <Card className="shadow-none overflow-hidden">
//         <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
//           <div className="flex sm:flex-row flex-col sm:items-center gap-4 flex-1">
//             <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
//             <div className="flex-1 space-y-2">
//               <Skeleton className="h-6 w-1/2 rounded" />
//               <Skeleton className="h-4 w-3/4 rounded" />
//             </div>
//           </div>
//           <Skeleton className="h-8 w-24 rounded-full" />
//         </CardHeader>
//         <CardContent className="sm:p-6 p-4">
//           <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
//             <Skeleton className="h-5 w-48 rounded" />
//             <Skeleton className="h-5 w-48 rounded" />
//           </div>
//         </CardContent>
//         <div className="flex justify-end items-center p-4 border-t gap-3">
//           <Skeleton className="h-12 w-52 rounded-full" />
//           <Skeleton className="h-12 w-52 rounded-full" />
//         </div>
//       </Card>

//       <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//         <div className="w-full xl:w-2/3 flex flex-col gap-6">
//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70]">
//               <Skeleton className="h-6 w-48 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(6)].map((_, i) => (
//                 <div key={`personal-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" />
//                   <Skeleton className="h-5 w-3/4 rounded" />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <Card className="shadow-none gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//               <Skeleton className="h-6 w-56 rounded" />
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={`id-skel-${i}`} className="py-2 space-y-2">
//                   <Skeleton className="h-3 w-1/4 rounded" />
//                   <Skeleton className="h-5 w-3/4 rounded" />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//           <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//             <Skeleton className="h-6 w-40 rounded mb-2" />
//             <Skeleton className="h-4 w-full rounded" />
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//               {[...Array(2)].map((_, i) => (
//                 <Card
//                   key={`doc-skel-${i}`}
//                   className="border overflow-hidden w-full"
//                 >
//                   <CardHeader className="p-3">
//                     <Skeleton className="h-4 w-1/3 rounded" />
//                   </CardHeader>
//                   <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
//                     <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
//                   </div>
//                   <CardFooter className="p-2">
//                     <Skeleton className="h-6 w-3/4 mx-auto rounded" />
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );

//   const renderErrorDisplay = (
//     message: string | null,
//     isActionErrorType = false,
//     isModalError = false
//   ) => {
//     if (!message) return null;
//     return (
//       <div
//         className={cn(
//           "border-l-4 p-4 rounded-md mb-6",
//           isModalError
//             ? "border-destructive bg-destructive/10"
//             : isActionErrorType
//             ? "border-destructive bg-destructive/10"
//             : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//         )}
//         role="alert"
//       >
//         <div className="flex items-center">
//           <AlertCircle
//             className={cn(
//               "h-5 w-5 mr-3 flex-shrink-0",
//               isActionErrorType || isModalError
//                 ? "text-destructive"
//                 : "text-yellow-600 dark:text-yellow-400"
//             )}
//           />
//           <div>
//             <p
//               className={cn(
//                 "text-sm font-medium",
//                 isActionErrorType || isModalError
//                   ? "text-destructive/90 dark:text-red-300"
//                   : "text-yellow-700 dark:text-yellow-300"
//               )}
//             >
//               {isActionErrorType || isModalError ? "Action Error" : "Error"}
//             </p>
//             <p
//               className={cn(
//                 "text-sm",
//                 isActionErrorType || isModalError
//                   ? "text-destructive/80 dark:text-red-400"
//                   : "text-yellow-600 dark:text-yellow-400"
//               )}
//             >
//               {message}
//             </p>
//             {!isActionErrorType &&
//               !isModalError &&
//               (message.includes("fetching") || message.includes("details")) && (
//                 <button
//                   onClick={fetchUserDetails}
//                   className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline flex items-center gap-1"
//                   disabled={isLoading || isProcessingAction !== false}
//                 >
//                   <RefreshCw
//                     className={cn(
//                       "h-3 w-3",
//                       (isLoading || isProcessingAction !== false) &&
//                         "animate-spin"
//                     )}
//                   />{" "}
//                   Retry Fetch
//                 </button>
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Main Render Logic ---
//   if (isLoading && !userData) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <Skeleton className="h-4 w-64 mb-3 rounded " />
//               <Skeleton className="h-8 w-48 rounded " />
//             </div>
//             <Skeleton className="h-9 w-32 rounded-md " />
//           </div>
//           {renderLoading()}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           {renderErrorDisplay(error)}
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-background">
//         <div className="container mx-auto px-4 py-8 text-center">
//           <Link
//             href="/admin/kyc-management"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to KYC Management
//           </Link>
//           <p className="py-16 text-muted-foreground">
//             User data could not be loaded or user not found.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { kyc } = userData;
//   const canTakeAction = kyc?.status === "pending";
//   const statusConfig = getStatusConfig(kyc?.status);

//   return (
//     <div className="min-h-screen bg-white dark:bg-background">

//       <KycRejectModal
//         isOpen={showRejectionModal}
//         onClose={() => setShowRejectionModal(false)}
//         onSubmit={submitRejection}
//         isProcessing={isProcessingAction === "reject"}
//         processingError={isProcessingAction === "reject" ? actionError : null}
//         initialReason={rejectionReasonForModal}
//         isMobileView={isMobile}
//       />

//       <KycApproveModal
//         isOpen={showApprovalModal}
//         onClose={() => setShowApprovalModal(false)}
//         onSubmit={submitApproval}
//         isProcessing={isProcessingAction === "approve"}
//         processingError={isProcessingAction === "approve" ? actionError : null}
//         isMobileView={isMobile}
//       />

//       <div className="container mx-auto px-4 py-5">
//         <KycDetailHeader userId={userId} />

//         <Card className="overflow-hidden border shadow-none">
//           <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
//             <div className="flex items-center gap-4">
//               <Avatar className="size-14 sm:size-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
//                 <AvatarFallback
//                   className={cn(
//                     "text-xl font-semibold text-neutral-900 dark:text-white",
//                     statusConfig.color
//                   )}
//                 >
//                   {getInitials(userData.fullName)}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex-1 space-y-2">
//                 <CardTitle className="text-xl text-neutral-900 dark:text-white">
//                   {userData.fullName || "Unnamed User"}
//                 </CardTitle>

//                 <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
//                   <span className="flex items-center gap-2">
//                     <Mail className="text-primary size-5" /> {userData.email}
//                   </span>

//                   {kyc?.mobile && (
//                     <span className="flex items-center gap-2">
//                       <Phone className="text-primary size-5" />
//                       {formatMobile(kyc?.mobile)}
//                     </span>
//                   )}
//                 </CardDescription>
//               </div>
//             </div>

//             <Badge
//               className={cn(
//                 "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
//                 statusConfig.color
//               )}
//             >
//               <statusConfig.icon className="h-4 w-4" /> {statusConfig.label}
//             </Badge>
//           </CardHeader>

//           <CardContent className="sm:p-6 p-4">
//             <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
//               {kyc?.submittedAt && (
//                 <span className="flex items-center gap-2">
//                   <Clock className="size-5 text-primary" /> Submitted:{" "}
//                   {formatDate(kyc.submittedAt, true)}
//                 </span>
//               )}

//               {kyc?.verifiedAt && (
//                 <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
//                   <CheckCircle className="size-5" /> Verified:{" "}
//                   {formatDate(kyc.verifiedAt, true)}
//                 </span>
//               )}

//               {kyc?.rejectedAt && (
//                 <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
//                   <XCircle className="size-5" /> Rejected:{" "}
//                   {formatDate(kyc.rejectedAt, true)}
//                 </span>
//               )}
//             </div>
//           </CardContent>

//           {canTakeAction && (
//             <CardFooter className="border-t sm:p-6 p-4">
//               <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
//                 <button
//                   onClick={openRejectModal}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-red-600 gap-2 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   <XCircle className="size-5"/>
//                   Reject Application
//                 </button>

//                 <Button
//                   onClick={openApproveModal}
//                   disabled={!!isProcessingAction}
//                   className="text-base bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   <CheckCircle className="size-5"/>
//                   Approve Application
//                 </Button>

//               </div>
//             </CardFooter>
//           )}

//           {actionError &&
//             !showRejectionModal &&
//             !showApprovalModal &&
//             isProcessingAction === false && (
//               <div className="px-4 sm:px-6 pb-4">
//                 {renderErrorDisplay(actionError, true)}
//               </div>
//             )}
//         </Card>

//         <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
//           <div className="w-full xl:w-2/3 flex flex-col gap-6">
//             {kyc?.status === "rejected" && kyc.rejectionReason && (
//               <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400">
//                     <AlertCircle className="h-5 w-5" /> Rejection Reason
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-sm text-red-600 dark:text-red-300 font-normal">
//                     {kyc.rejectionReason}
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <IdCard className="size-5 text-primary" /> Personal
//                   Information
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="Full Name"
//                   value={userData.fullName}
//                   isImportant={true}
//                   icon={User}
//                 />
//                 <DetailItem
//                   label="Email Address"
//                   value={userData.email}
//                   icon={Mail}
//                   isImportant={true}
//                 />
//                 <DetailItem
//                   label="Date of Birth"
//                   value={formatDate(kyc?.dateOfBirth)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Mobile Number"
//                   value={formatMobile(kyc?.mobile)}
//                   icon={Phone}
//                 />
//                 <DetailItem
//                   label="Nationality"
//                   value={kyc?.nationality}
//                   icon={Globe}
//                 />
//                 <DetailItem
//                   label="Occupation"
//                   value={kyc?.occupation}
//                   icon={Briefcase}
//                 />
//                 <DetailItem
//                   label="Salary Range"
//                   value={
//                     kyc?.salaryRange
//                       ? salaryDisplayMap[kyc.salaryRange]
//                       : undefined
//                   }
//                   icon={BadgeDollarSign}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="shadow-none gap-0 overflow-hidden">
//               <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4  h-[70px]">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Fingerprint className="size-5 text-primary" /> Identity
//                   Document Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
//                 <DetailItem
//                   label="ID Type"
//                   value={
//                     <span className="capitalize">
//                       {kyc?.idType?.replace("_", " ")}
//                     </span>
//                   }
//                   isImportant={true}
//                   icon={IdCard}
//                 />
//                 <DetailItem
//                   label="ID Number"
//                   value={kyc?.idNumber}
//                   isImportant={true}
//                   icon={
//                     Phone
//                   } /* Should this be a different icon? like Fingerprint or IdCard? */
//                 />
//                 <DetailItem
//                   label="Date of Issue"
//                   value={formatDate(kyc?.idIssueDate)}
//                   icon={CalendarDays}
//                 />
//                 <DetailItem
//                   label="Date of Expiry"
//                   value={formatDate(kyc?.idExpiryDate)}
//                   icon={CalendarDays}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
//             <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <FileText className="size-5 text-primary" /> Submitted Documents
//               </CardTitle>

//               <CardDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Review identification documents submitted by the user
//               </CardDescription>

//             </CardHeader>
//             <CardContent className="p-4 sm:p-6">
//               {kyc?.documents && kyc.documents.length > 0 ? (
//                 <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
//                   {kyc.documents.map((doc) => (
//                     <Card
//                       key={doc.public_id}
//                       className="overflow-hidden w-full bg-muted/30 dark:bg-muted/20"
//                     >
//                       <CardHeader className="p-3">
//                         <CardTitle className="text-sm capitalize flex items-center gap-1.5">
//                           {doc.docType === "id_front" ? "ID Front" : "ID Back"}
//                         </CardTitle>
//                       </CardHeader>
//                       {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
//                         <div className="aspect-[16/10] relative group bg-white dark:bg-background">
//                           <Image
//                             src={doc.url}
//                             alt={`${doc.docType} preview`}
//                             fill
//                             className="object-contain p-1"
//                             unoptimized
//                           />
//                           <Link
//                             href={doc.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="absolute inset-0 bg-black/50 opacity-0 flex-col group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white"
//                             aria-label={`View full ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <Eye className="size-5 mb-1" />
//                             <span className="text-xs font-medium">
//                               View Full
//                             </span>
//                           </Link>
//                         </div>
//                       ) : (
//                         <CardContent className="flex items-center justify-center py-8">
//                           <Link
//                             href={doc.url || "#"}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={cn(
//                               "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
//                               !doc.url && "pointer-events-none opacity-50"
//                             )}
//                             aria-label={`View ${
//                               doc.docType === "id_front"
//                                 ? "ID Front"
//                                 : "ID Back"
//                             } document`}
//                           >
//                             <FileText className="h-12 w-12 mb-2" />
//                             <span className="text-xs font-medium flex items-center">
//                               View PDF
//                               <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
//                             </span>
//                           </Link>
//                         </CardContent>
//                       )}
//                       <CardFooter className="p-2">
//                         <Link
//                           href={doc.url || "#"}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={cn(
//                             "w-full",
//                             !doc.url && "pointer-events-none opacity-50"
//                           )}
//                         >
//                           <Button
//                             variant="link"
//                             size="sm"
//                             className="w-full text-xs justify-center items-center gap-1 text-primary"
//                             disabled={!doc.url}
//                           >
//                             View Full Document{" "}
//                             <ExternalLink className="size-3.5" />
//                           </Button>
//                         </Link>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4 border border-dashed rounded-lg">
//                   <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-sm text-muted-foreground">
//                     No documents submitted.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycUserDetailPage;

// frontend/src/app/admin/kyc-management/[userId]/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import kycAdminService from "@/app/services/admin/kyc.admin";
import type {
  AdminKycUserResponse,
  KycDetails,
  SalaryRange,
} from "@/app/services/admin/kyc.admin";
import KycDetailHeader from "@/app/admin/components/kyc/KycDetailHeader";
import KycRejectModal from "@/app/components/KycRejectModal"; // Assuming correct path from /admin/kyc-management/[userId]/
import KycApproveModal from "@/app/components/KycApproveModal"; // Assuming correct path

// Icons
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  CalendarDays,
  Phone,
  Mail,
  Briefcase,
  BadgeDollarSign,
  Fingerprint,
  Eye,
  Globe,
  Info,
  Image as ImageIcon,
  RefreshCw,
  IdCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// --- Import Custom Toast and react-toastify components ---
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// **IMPORTANT**: Adjust this path if your CustomToast component is elsewhere
import CustomToast, { CustomToastProps } from "../../../components/CustomToast";
// Example: if CustomToast.tsx is in frontend/src/app/components/
// import CustomToast, { CustomToastProps } from "../../../components/CustomToast";

// --- Helper Functions (Keep as is) ---
const formatDate = (
  dateInput?: string | Date | null,
  includeTime = false
): string => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.warn("formatDate received invalid dateInput:", dateInput);
      return "Invalid Date";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    return date.toLocaleDateString("en-US", options);
  } catch (e) {
    console.error("Error formatting date:", e, "Input:", dateInput);
    return "Invalid Date";
  }
};
const formatMobile = (mobile?: KycDetails["mobile"]): string => {
  if (!mobile || !mobile.countryCode?.trim() || !mobile.number?.trim())
    return "N/A";
  return `${mobile.countryCode} ${mobile.number}`;
};
const salaryDisplayMap: Record<SalaryRange, string> = {
  "0-1000": "Below $10,000",
  "10000-50000": "$10,000 - $49,999",
  "50000-100000": "$50,000 - $99,999",
  "100000+": "$100,000 or more",
};
const getStatusConfig = (status?: string) => {
  const statusMap = {
    verified: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      icon: CheckCircle,
      label: "Verified",
    },
    rejected: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      icon: XCircle,
      label: "Rejected",
    },
    pending: {
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      icon: Clock,
      label: "Pending",
    },
    skipped: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      icon: ArrowLeft,
      label: "Skipped",
    },
    default: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      icon: AlertCircle,
      label: "Not Started",
    },
  };
  return statusMap[status as keyof typeof statusMap] || statusMap.default;
};
const getInitials = (name?: string): string => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// --- DetailItem Component (Keep as is) ---
const DetailItem = ({
  label,
  value,
  icon: Icon,
  isImportant = false,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  isImportant?: boolean;
}) => (
  <div className="py-2 space-y-2">
    <dt className="text-sm font-medium text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
      {" "}
      {Icon && <Icon className="flex-shrink-0 text-primary size-4" />} {label}{" "}
    </dt>
    <dd
      className={cn(
        "text-sm break-words text-gray-500 dark:text-gray-300",
        isImportant ? "font-semibold" : ""
      )}
    >
      {" "}
      {value || <span className="italic">Not Provided</span>}{" "}
    </dd>
  </div>
);

// --- Main Detail Page Component ---
const KycUserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [userData, setUserData] = useState<AdminKycUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // For page load errors
  const [actionError, setActionError] = useState<string | null>(null); // For modal action errors
  const [isProcessingAction, setIsProcessingAction] = useState<
    false | "approve" | "reject"
  >(false);
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [rejectionReasonForModal, setRejectionReasonForModal] =
    useState<string>("");
  const [isMobile, setIsMobile] = useState(false); // For ToastContainer

  // --- Mobile Detection Effect (for ToastContainer & Modals) ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // --- Custom Toast Invocation ---
  const showToast = useCallback(
    (
      message: string,
      type?: CustomToastProps["type"],
      toastSpecificOptions?: Partial<ToastOptions>
    ) => {
      const effectiveType = type || "default";
      let progressClassName: string;
      switch (effectiveType) {
        case "success":
          progressClassName = "toast-progress-success";
          break;
        case "error":
          progressClassName = "toast-progress-error";
          break;
        case "info":
          progressClassName = "toast-progress-info";
          break;
        case "warning":
          progressClassName = "toast-progress-warning";
          break;
        default:
          progressClassName = "toast-progress-default";
          break;
      }
      reactToastifyToast(
        <CustomToast message={message} type={effectiveType} />,
        {
          progressClassName,
          type: effectiveType as TypeOptions,
          icon: false,
          ...toastSpecificOptions,
        }
      );
    },
    []
  );

  // --- ToastContainer Props and Style ---
  const customToastContainerProps: ToastContainerProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: false,
    closeButton: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    transition: Slide,
    toastClassName: () =>
      "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
  };

  const getToastContainerStyle = (): React.CSSProperties & {
    [key: `--${string}`]: string | number;
  } => {
    const baseStyle = { zIndex: 30 };
    if (isMobile)
      return {
        ...baseStyle,
        top: "1rem",
        left: "1rem",
        right: "1rem",
        width: "auto",
      };
    return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
  };

  // --- Fetching Logic ---
  const fetchUserDetails = useCallback(
    async (showLoadingIndicator = true) => {
      if (!userId) {
        setError("User ID is missing from the URL.");
        showToast("User ID is missing from the URL.", "error");
        setIsLoading(false);
        return;
      }
      if (showLoadingIndicator || !userData) setIsLoading(true); // Show loading if explicitly asked or no data yet

      setError(null);
      setActionError(null);
      try {
        const data = await kycAdminService.getKycDetailsAdmin(userId);
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user details:", err);
        const errorMsg =
          err.message ||
          "An unknown error occurred while fetching user details.";
        setError(errorMsg);
        showToast(errorMsg, "error");
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, showToast, userData]
  ); // Added showToast and userData to dependencies

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Initial fetch only on userId change, fetchUserDetails will handle its own deps

  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    if (showRejectionModal || showApprovalModal) body.style.overflow = "hidden";
    else body.style.overflow = originalOverflow;
    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [showRejectionModal, showApprovalModal]);

  // --- Action Handlers ---
  const openRejectModal = () => {
    setRejectionReasonForModal("");
    setActionError(null);
    setShowRejectionModal(true);
  };

  const submitRejection = async (reason: string) => {
    if (
      !userId ||
      !userData ||
      userData.kyc?.status !== "pending" ||
      isProcessingAction
    )
      return;
    setIsProcessingAction("reject");
    setActionError(null);
    try {
      await kycAdminService.updateKycStatusAdmin(userId, {
        status: "rejected",
        rejectionReason: reason,
      });
      showToast("KYC application rejected.", "success"); // SUCCESS TOAST
      setShowRejectionModal(false);
      await fetchUserDetails(false); // Fetch without full page loading indicator
    } catch (err: any) {
      const errorMsg = err.message || "Failed to reject KYC status.";
      setActionError(errorMsg); // For modal display
      showToast(errorMsg, "error"); // For page level display
    } finally {
      setIsProcessingAction(false);
    }
  };

  const openApproveModal = () => {
    setActionError(null);
    setShowApprovalModal(true);
  };

  const submitApproval = async () => {
    if (
      !userId ||
      !userData ||
      userData.kyc?.status !== "pending" ||
      isProcessingAction
    )
      return;
    setIsProcessingAction("approve");
    setActionError(null);
    try {
      await kycAdminService.updateKycStatusAdmin(userId, {
        status: "verified",
      });
      showToast("KYC application approved successfully!", "success"); // SUCCESS TOAST
      setShowApprovalModal(false);
      await fetchUserDetails(false); // Fetch without full page loading indicator
    } catch (err: any) {
      const errorMsg = err.message || "Failed to approve KYC status.";
      setActionError(errorMsg); // For modal display
      showToast(errorMsg, "error"); // For page level display
    } finally {
      setIsProcessingAction(false);
    }
  };

  // --- Render Functions ---
  const renderLoading = () => (
    /* Skeleton remains the same */
    <div className="space-y-8">
      <Card className="shadow-none overflow-hidden">
        <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:p-6 p-4 gap-4">
          <div className="flex sm:flex-row flex-col sm:items-center gap-4 flex-1">
            <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-full" />
        </CardHeader>
        <CardContent className="sm:p-6 p-4">
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-5 w-48 rounded" />
          </div>
        </CardContent>
        <div className="flex justify-end items-center p-4 border-t gap-3">
          <Skeleton className="h-12 w-52 rounded-full" />
          <Skeleton className="h-12 w-52 rounded-full" />
        </div>
      </Card>
      <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
        <div className="w-full xl:w-2/3 flex flex-col gap-6">
          <Card className="shadow-none gap-0 overflow-hidden">
            <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70]">
              <Skeleton className="h-6 w-48 rounded" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={`personal-skel-${i}`} className="py-2 space-y-2">
                  <Skeleton className="h-3 w-1/4 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-none gap-0 overflow-hidden">
            <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
              <Skeleton className="h-6 w-56 rounded" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={`id-skel-${i}`} className="py-2 space-y-2">
                  <Skeleton className="h-3 w-1/4 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
          <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
            <Skeleton className="h-6 w-40 rounded mb-2" />
            <Skeleton className="h-4 w-full rounded" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
              {[...Array(2)].map((_, i) => (
                <Card
                  key={`doc-skel-${i}`}
                  className="border overflow-hidden w-full"
                >
                  <CardHeader className="p-3">
                    <Skeleton className="h-4 w-1/3 rounded" />
                  </CardHeader>
                  <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <CardFooter className="p-2">
                    <Skeleton className="h-6 w-3/4 mx-auto rounded" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderErrorDisplay = (
    message: string | null,
    isActionErrorType = false,
    isModalError = false
  ) => {
    /* Remains the same */
    if (!message) return null;
    return (
      <div
        className={cn(
          "border-l-4 p-4 rounded-md mb-6",
          isModalError
            ? "border-destructive bg-destructive/10"
            : isActionErrorType
            ? "border-destructive bg-destructive/10"
            : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
        role="alert"
      >
        <div className="flex items-center">
          <AlertCircle
            className={cn(
              "h-5 w-5 mr-3 flex-shrink-0",
              isActionErrorType || isModalError
                ? "text-destructive"
                : "text-yellow-600 dark:text-yellow-400"
            )}
          />
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                isActionErrorType || isModalError
                  ? "text-destructive/90 dark:text-red-300"
                  : "text-yellow-700 dark:text-yellow-300"
              )}
            >
              {isActionErrorType || isModalError ? "Action Error" : "Error"}
            </p>
            <p
              className={cn(
                "text-sm",
                isActionErrorType || isModalError
                  ? "text-destructive/80 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              )}
            >
              {message}
            </p>
            {!isActionErrorType &&
              !isModalError &&
              (message.includes("fetching") || message.includes("details")) && (
                <button
                  onClick={() => fetchUserDetails()}
                  className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline flex items-center gap-1"
                  disabled={isLoading || isProcessingAction !== false}
                >
                  <RefreshCw
                    className={cn(
                      "h-3 w-3",
                      (isLoading || isProcessingAction !== false) &&
                        "animate-spin"
                    )}
                  />{" "}
                  Retry Fetch
                </button>
              )}
          </div>
        </div>
      </div>
    );
  };

  // --- Main Render Logic ---
  if (isLoading && !userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-background relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <Skeleton className="h-4 w-64 mb-3 rounded " />
              <Skeleton className="h-8 w-48 rounded " />
            </div>
            <Skeleton className="h-9 w-32 rounded-md " />
          </div>
          {renderLoading()}
        </div>
      </div>
    );
  }

  if (error && !isLoading) {
    // Show error if loading is complete and error exists
    return (
      <div className="min-h-screen bg-white dark:bg-background relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/admin/kyc-management"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to KYC Management
          </Link>
          {renderErrorDisplay(error)}
        </div>
      </div>
    );
  }

  if (!userData && !isLoading) {
    // If no data and not loading (implies an earlier error or user not found)
    return (
      <div className="min-h-screen bg-white dark:bg-background relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <Link
            href="/admin/kyc-management"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to KYC Management
          </Link>
          <p className="py-16 text-muted-foreground">
            User data could not be loaded or user not found.
          </p>
        </div>
      </div>
    );
  }

  // Fallback if userData is somehow still null after checks (should ideally not be hit)
  if (!userData)
    return (
      <div className="min-h-screen bg-white dark:bg-background relative">
        <ToastContainer
          {...customToastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          Loading or unexpected state...
        </div>
      </div>
    );

  const { kyc } = userData;
  const canTakeAction = kyc?.status === "pending";
  const statusConfig = getStatusConfig(kyc?.status);

  return (
    <div className="min-h-screen bg-white dark:bg-background relative">
      <ToastContainer
        {...customToastContainerProps}
        style={getToastContainerStyle()}
      />
      <KycRejectModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onSubmit={submitRejection}
        isProcessing={isProcessingAction === "reject"}
        processingError={isProcessingAction === "reject" ? actionError : null}
        initialReason={rejectionReasonForModal}
        isMobileView={isMobile}
      />
      <KycApproveModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onSubmit={submitApproval}
        isProcessing={isProcessingAction === "approve"}
        processingError={isProcessingAction === "approve" ? actionError : null}
        isMobileView={isMobile}
      />

      <div className="container mx-auto px-4 py-5">
        <KycDetailHeader userId={userId} />
        <Card className="overflow-hidden border shadow-none">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 sm:size-16 flex-shrink-0 bg-lightgray dark:bg-primarybox">
                <AvatarFallback
                  className={cn(
                    "text-xl font-semibold text-neutral-900 dark:text-white",
                    statusConfig.color
                  )}
                >
                  {getInitials(userData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <CardTitle className="text-xl text-neutral-900 dark:text-white">
                  {userData.fullName || "Unnamed User"}
                </CardTitle>
                <CardDescription className="flex flex-wrap flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Mail className="text-primary size-5" /> {userData.email}
                  </span>
                  {kyc?.mobile && (
                    <span className="flex items-center gap-2">
                      <Phone className="text-primary size-5" />
                      {formatMobile(kyc?.mobile)}
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>
            <Badge
              className={cn(
                "px-4 py-2 text-sm flex items-center rounded-full gap-1.5",
                statusConfig.color
              )}
            >
              <statusConfig.icon className="h-4 w-4" /> {statusConfig.label}
            </Badge>
          </CardHeader>
          <CardContent className="sm:p-6 p-4">
            <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:text-base text-sm text-gray-500 dark:text-gray-300">
              {kyc?.submittedAt && (
                <span className="flex items-center gap-2">
                  <Clock className="size-5 text-primary" /> Submitted:{" "}
                  {formatDate(kyc.submittedAt, true)}
                </span>
              )}
              {kyc?.verifiedAt && (
                <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="size-5" /> Verified:{" "}
                  {formatDate(kyc.verifiedAt, true)}
                </span>
              )}
              {kyc?.rejectedAt && (
                <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <XCircle className="size-5" /> Rejected:{" "}
                  {formatDate(kyc.rejectedAt, true)}
                </span>
              )}
            </div>
          </CardContent>
          {canTakeAction && (
            <CardFooter className="border-t sm:p-6 p-4">
              <div className="flex sm:flex-row flex-col gap-3 w-full sm:justify-end">
                <button
                  onClick={openRejectModal}
                  disabled={!!isProcessingAction}
                  className="text-base bg-red-600 gap-2 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 flex justify-center items-center transition-all duration-75 ease-linear cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <XCircle className="size-5" />
                  Reject Application
                </button>
                <Button
                  onClick={openApproveModal}
                  disabled={!!isProcessingAction}
                  className="text-base bg-primary text-neutral-900 hover:bg-primaryhover dark:bg-primary dark:hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="size-5" />
                  Approve Application
                </Button>
              </div>
            </CardFooter>
          )}
          {actionError &&
            !showRejectionModal &&
            !showApprovalModal &&
            isProcessingAction === false && (
              <div className="px-4 sm:px-6 pb-4">
                {renderErrorDisplay(actionError, true)}
              </div>
            )}
        </Card>
        <div className="flex xl:flex-row flex-col justify-between gap-6 mt-6">
          <div className="w-full xl:w-2/3 flex flex-col gap-6">
            {kyc?.status === "rejected" && kyc.rejectionReason && (
              <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-1.5 text-red-700 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" /> Rejection Reason
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-red-600 dark:text-red-300 font-normal">
                    {kyc.rejectionReason}
                  </p>
                </CardContent>
              </Card>
            )}
            <Card className="shadow-none gap-0 overflow-hidden">
              <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4 h-[70px]">
                <CardTitle className="text-lg flex items-center gap-2">
                  <IdCard className="size-5 text-primary" /> Personal
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
                <DetailItem
                  label="Full Name"
                  value={userData.fullName}
                  isImportant={true}
                  icon={User}
                />
                <DetailItem
                  label="Email Address"
                  value={userData.email}
                  icon={Mail}
                  isImportant={true}
                />
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(kyc?.dateOfBirth)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Mobile Number"
                  value={formatMobile(kyc?.mobile)}
                  icon={Phone}
                />
                <DetailItem
                  label="Nationality"
                  value={kyc?.nationality}
                  icon={Globe}
                />
                <DetailItem
                  label="Occupation"
                  value={kyc?.occupation}
                  icon={Briefcase}
                />
                <DetailItem
                  label="Salary Range"
                  value={
                    kyc?.salaryRange
                      ? salaryDisplayMap[kyc.salaryRange]
                      : undefined
                  }
                  icon={BadgeDollarSign}
                />
              </CardContent>
            </Card>
            <Card className="shadow-none gap-0 overflow-hidden">
              <CardHeader className="inline-flex items-center w-full bg-lightgray dark:bg-primarybox px-5 py-4  h-[70px]">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Fingerprint className="size-5 text-primary" /> Identity
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
                <DetailItem
                  label="ID Type"
                  value={
                    <span className="capitalize">
                      {kyc?.idType?.replace("_", " ")}
                    </span>
                  }
                  isImportant={true}
                  icon={IdCard}
                />
                <DetailItem
                  label="ID Number"
                  value={kyc?.idNumber}
                  isImportant={true}
                  icon={IdCard}
                />
                <DetailItem
                  label="Date of Issue"
                  value={formatDate(kyc?.idIssueDate)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Date of Expiry"
                  value={formatDate(kyc?.idExpiryDate)}
                  icon={CalendarDays}
                />
              </CardContent>
            </Card>
          </div>
          <Card className="shadow-none w-full xl:w-1/3 h-fit gap-0 overflow-hidden">
            <CardHeader className="bg-lightgray dark:bg-primarybox px-5 py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="size-5 text-primary" /> Submitted Documents
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300 pt-1">
                Review identification documents submitted by the user
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {kyc?.documents && kyc.documents.length > 0 ? (
                <div className="flex xl:flex-col sm:flex-row flex-col gap-4">
                  {kyc.documents.map((doc) => (
                    <Card
                      key={doc.public_id}
                      className="overflow-hidden w-full bg-muted/30 dark:bg-muted/20"
                    >
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm capitalize flex items-center gap-1.5">
                          {doc.docType === "id_front" ? "ID Front" : "ID Back"}
                        </CardTitle>
                      </CardHeader>
                      {doc.url && !doc.url.toLowerCase().endsWith(".pdf") ? (
                        <div className="aspect-[16/10] relative group bg-white dark:bg-background">
                          <Image
                            src={doc.url}
                            alt={`${doc.docType} preview`}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                          <Link
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-black/50 opacity-0 flex-col group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white"
                            aria-label={`View full ${
                              doc.docType === "id_front"
                                ? "ID Front"
                                : "ID Back"
                            } document`}
                          >
                            <Eye className="size-5 mb-1" />
                            <span className="text-xs font-medium">
                              View Full
                            </span>
                          </Link>
                        </div>
                      ) : (
                        <CardContent className="flex items-center justify-center py-8">
                          <Link
                            href={doc.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "flex flex-col items-center text-muted-foreground hover:text-primary transition-colors",
                              !doc.url && "pointer-events-none opacity-50"
                            )}
                            aria-label={`View ${
                              doc.docType === "id_front"
                                ? "ID Front"
                                : "ID Back"
                            } document`}
                          >
                            <FileText className="h-12 w-12 mb-2" />
                            <span className="text-xs font-medium flex items-center">
                              View PDF
                              <ExternalLink className="h-3 w-3 ml-1 opacity-70 inline-block" />
                            </span>
                          </Link>
                        </CardContent>
                      )}
                      <CardFooter className="p-2">
                        <Link
                          href={doc.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "w-full",
                            !doc.url && "pointer-events-none opacity-50"
                          )}
                        >
                          <Button
                            variant="link"
                            size="sm"
                            className="w-full text-xs justify-center items-center gap-1 text-primary"
                            disabled={!doc.url}
                          >
                            View Full Document{" "}
                            <ExternalLink className="size-3.5" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4 border border-dashed rounded-lg">
                  <Info className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No documents submitted.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KycUserDetailPage;
