// // frontend/src/app/dashboard/balances/[balanceId]/send/review/page.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../../hooks/useAuth'; // Adjust path
// import axios from 'axios';
// import apiConfig from '../../../../../config/apiConfig'; // Adjust path
// import Link from 'next/link';
// import { Skeleton } from "@/components/ui/skeleton"; // For loading
// import DashboardHeader from '../../../../components/layout/DashboardHeader';

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (NO FEES/ARRIVAL) ---
// interface ReviewParams {
//     balanceId: string;
// }
// interface SendSummary { // Structure from localStorage (NO FEES/ARRIVAL)
//      userId?: string;
//      sourceAccountId: string;
//      recipientId: string;
//      sendAmount: number;
//      receiveAmount: number;
//      sendCurrencyCode: string;
//      receiveCurrencyCode: string;
//      exchangeRate: number;
//      availableBalance?: number; // Optional from summary
//      reason?: string;
// }
// interface RecipientDetails { // Structure expected from /recipients/:id
//     _id: string;
//     accountHolderName: string;
//     ifscCode: string;
//     accountNumber: string;
//     bankName: string;
//     address?: string; // Address might be optional depending on backend model
//     nickname?: string;
//     currency: { code: string };
// }

// // --- Component Definition ---
// const steps = ['Recipient', 'Amount', 'Review', 'Pay']; // Steps for header

// const ReviewSendPage = () => {
//     // --- Hooks ---
//     const router = useRouter();
//     const params = useParams<ReviewParams>();
//     const searchParams = useSearchParams();
//     const { balanceId } = params;
//     const recipientId = searchParams.get('recipientId');
//     const { token } = useAuth();

//     // --- State ---
//     const [summary, setSummary] = useState<SendSummary | null>(null);
//     const [recipientDetails, setRecipientDetails] = useState<RecipientDetails | null>(null);
//     const [userReference, setUserReference] = useState(''); // Optional reference input
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for confirmation
//     const [error, setError] = useState<string | null>(null); // Error display
//     const [isLoadingDetails, setIsLoadingDetails] = useState(true); // Loading state for recipient details

//     // --- Previous Step Link Logic ---
//      const getPreviousStepLink = () => {
//          // Check if the summary indicates a reason was likely required (based on recipient currency)
//          const needsReason = summary?.receiveCurrencyCode === 'INR';
//          if (needsReason) {
//              return `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`;
//          } else {
//              return `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`;
//          }
//      };

//     // --- Effect: Load Summary from localStorage and Fetch Recipient Details ---
//     useEffect(() => {
//          // Load summary data passed from previous step
//          const storedSummary = localStorage.getItem('sendTransferSummary');
//          if (storedSummary) {
//              setSummary(JSON.parse(storedSummary));
//          } else {
//              // If summary is missing, something went wrong in the flow
//              setError("Transfer details are missing. Please start the transfer again.");
//              setIsLoadingDetails(false);
//              return; // Stop further execution
//          }

//          // Fetch full recipient details required for display on the review page
//          const fetchRecipient = async () => {
//              setIsLoadingDetails(true);
//              if (!recipientId || !token) {
//                   // Should ideally not happen if summary is present, but good check
//                   setError("Recipient ID or authentication token is missing.");
//                   setIsLoadingDetails(false);
//                   return;
//               };
//              try {
//                  const response = await axios.get<RecipientDetails>(`/recipients/${recipientId}`, { headers: { Authorization: `Bearer ${token}` } });
//                  setRecipientDetails(response.data);
//              } catch (err: any) {
//                  console.error("Error fetching recipient details for review:", err);
//                  setError(err.response?.data?.message || "Failed to load recipient details.");
//              } finally {
//                  setIsLoadingDetails(false);
//              }
//          };

//          // Only fetch recipient if summary was loaded successfully
//          if (storedSummary) {
//              fetchRecipient();
//          }

//     }, [recipientId, token]); // Dependencies: recipientId and token

//     // --- Confirm and Send Handler ---
//     const handleConfirmAndSend = async () => {
//         // Ensure all necessary data is available
//         if (!summary || !recipientDetails || !token) {
//             setError("Cannot proceed. Missing transfer or recipient information.");
//             return;
//         }
//         setIsSubmitting(true); // Indicate submission process start
//         setError(null); // Clear previous errors

//         try {
//             // Construct the payload for the backend, excluding fees/arrival
//             const payload = {
//                  userId: summary.userId, // Include if backend requires it
//                  sourceAccountId: summary.sourceAccountId,
//                  recipientId: summary.recipientId,
//                  sendAmount: summary.sendAmount,
//                  receiveAmount: summary.receiveAmount,
//                  sendCurrencyCode: summary.sendCurrencyCode,
//                  receiveCurrencyCode: summary.receiveCurrencyCode,
//                  exchangeRate: summary.exchangeRate,
//                  reason: summary.reason, // Include reason if present
//                  reference: userReference.trim() || null, // Send trimmed reference or null
//              };

//             // Make the API call to execute the transfer
//             const response = await axios.post(
//                 '/transfers/execute', // Backend endpoint
//                 payload,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             // Transfer initiated successfully
//             console.log("Transfer execution response:", response.data);
//             localStorage.removeItem('sendTransferSummary'); // Clean up stored summary
//             // Redirect to a success page or dashboard, optionally passing transfer ID
//             router.push(`/dashboard?transferSuccess=true&transferId=${response.data?._id || ''}`);

//         } catch (err: any) {
//             // Handle errors during transfer execution
//             console.error("Error executing transfer:", err);
//             setError(err.response?.data?.message || "Failed to send money. Please try again later.");
//             setIsSubmitting(false); // Allow user to retry if applicable
//         }
//         // No finally block needed here because we redirect on success
//     };

//     // --- Render Logic ---

//     // Loading State
//     if (isLoadingDetails) {
//          return (
//             <div className='ReviewSend-Page pb-10'>
//                 <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
//                 <div className="container mx-auto max-w-2xl p-4 lg:p-8">
//                    <Skeleton className="h-8 w-32 mb-6" /> {/* Back link */}
//                    <Skeleton className="h-10 w-48 mb-8" /> {/* Title */}
//                    <div className="space-y-6 border rounded-lg p-6"> {/* Main content box */}
//                        <Skeleton className="h-6 w-3/4 mb-4" /> {/* Detail line */}
//                        <Skeleton className="h-4 w-1/2" />
//                        <Skeleton className="h-4 w-1/2" />
//                        <Skeleton className="h-4 w-1/2" />
//                        <Skeleton className="h-4 w-1/2" />
//                        <hr className="my-4"/>
//                         <Skeleton className="h-6 w-3/4 mb-4" /> {/* Detail line */}
//                        <Skeleton className="h-4 w-1/2" />
//                        <Skeleton className="h-4 w-1/2" />
//                        <Skeleton className="h-4 w-1/2" />
//                        <hr className="my-4"/>
//                        <Skeleton className="h-10 w-full" /> {/* Reference Input */}
//                        <Skeleton className="h-12 w-full rounded-full mt-6" /> {/* Button */}
//                    </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error State (if initial loading failed)
//     if (error && !isSubmitting) {
//         return (
//              <div className='ReviewSend-Page pb-10'>
//                   <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
//                   <div className="container mx-auto max-w-2xl p-4 lg:p-8 text-center">
//                        <p className="text-red-600 mb-4">Error: {error}</p>
//                        <Link href={getPreviousStepLink()} className='text-blue-600 underline ml-2'>Go back</Link>
//                   </div>
//              </div>
//          );
//     }

//     // Data Missing State (Should ideally be caught by error state above)
//     if (!summary || !recipientDetails) {
//         return (
//             <div className='ReviewSend-Page pb-10'>
//                 <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
//                 <div className="container mx-auto max-w-2xl p-4 lg:p-8 text-center">
//                     <p className="text-red-500 mb-4">Error: Missing required transfer or recipient details.</p>
//                     <Link href={`/dashboard/balances/${balanceId}/send/select-recipient`} className='text-blue-600 underline ml-2'>Start Transfer Again</Link>
//                 </div>
//             </div>
//         );
//     }

//     // Main Render - Display Review Details
//     return (
//          <div className='ReviewSend-Page pb-10'>
//               <DashboardHeader title="Send Money" currentStep={3} totalSteps={steps.length} steps={steps} />
//              <div className="container mx-auto max-w-2xl p-4 lg:p-8">

//                  {/* Title */}
//                 <h1 className="text-2xl lg:text-3xl font-semibold text-main mb-6">Confirm and send</h1>

//                  {/* Submission Error Display */}
//                  {error && isSubmitting && <p className="text-red-600 text-sm mb-4 p-3 bg-red-100 rounded border border-red-200">{error}</p>}

//                  {/* Main Review Box */}
//                  <div className="border rounded-lg p-6 bg-white shadow-sm space-y-5">

//                      {/* Transfer Details Section */}
//                      <div>
//                          <h3 className='text-sm font-medium text-gray-500 mb-3'>Transfer details</h3>
//                          <div className='space-y-2 text-sm'>
//                              <div className='flex justify-between'>
//                                  <span>You send exactly</span>
//                                  <span className='font-semibold'>{summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}</span>
//                              </div>
//                              {/* Fee line is removed */}
//                              {/* Amount to convert line is removed */}
//                              <div className='flex justify-between'>
//                                  <span>Guaranteed rate</span>
//                                  <span className='font-semibold'>1 {summary.sendCurrencyCode} = {summary.exchangeRate.toFixed(5)} {summary.receiveCurrencyCode}</span>
//                              </div>
//                              <div className='flex justify-between font-bold text-base mt-1'> {/* Slightly larger font for final amount */}
//                                  <span>{recipientDetails.nickname || recipientDetails.accountHolderName} gets</span>
//                                  <span>{summary.receiveAmount.toFixed(2)} {summary.receiveCurrencyCode}</span>
//                              </div>
//                          </div>
//                      </div>
//                      <hr/>

//                      {/* Recipient Details Section */}
//                      <div>
//                           <h3 className='text-sm font-medium text-gray-500 mb-3'>Recipient details</h3>
//                           <div className='space-y-2 text-sm'>
//                               <div className='flex justify-between'>
//                                   <span>Account holder name</span>
//                                   <span className='font-semibold capitalize'>{recipientDetails.accountHolderName}</span>
//                               </div>
//                              <div className='flex justify-between'>
//                                  <span>IFSC code</span>
//                                  <span className='font-semibold'>{recipientDetails.ifscCode}</span>
//                              </div>
//                              <div className='flex justify-between'>
//                                  <span>Account number</span>
//                                  {/* Mask account number */}
//                                  <span className='font-semibold'>**** **** {recipientDetails.accountNumber.slice(-4)}</span>
//                              </div>
//                              <div className='flex justify-between'>
//                                  <span>Bank name</span>
//                                  <span className='font-semibold'>{recipientDetails.bankName}</span>
//                              </div>
//                              {/* Address can be omitted on review if not critical */}
//                              {/* {recipientDetails.address && <div className='flex justify-between'><span>Address</span><span className='font-semibold'>{recipientDetails.address}</span></div>} */}
//                          </div>
//                      </div>
//                      <hr/>

//                      {/* --- REMOVED Schedule Details Section --- */}

//                      {/* Reason Section (Conditional) */}
//                       {summary.reason && (
//                           <>
//                              <hr/>
//                              <div>
//                                   <h3 className='text-sm font-medium text-gray-500 mb-2'>Reason for transfer</h3>
//                                  <p className='text-sm font-semibold'>{summary.reason}</p>
//                              </div>
//                          </>
//                      )}
//                     <hr/>

//                      {/* Reference Input Section */}
//                      <div>
//                          <label htmlFor="reference" className='block text-sm font-medium text-gray-500 mb-2'>Reference for recipient (optional)</label>
//                          <input
//                             type="text"
//                             id="reference"
//                             value={userReference}
//                             onChange={(e) => setUserReference(e.target.value)}
//                             maxLength={35} // Example length limit
//                             placeholder={`e.g., Invoice payment, Gift`}
//                             className="block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
//                             aria-label="Reference for recipient"
//                         />
//                      </div>

//                  </div>

//                  {/* Disclaimer Text */}
//                  <p className='text-xs text-gray-500 my-4'>
//                      You can cancel for a full refund within 30 minutes of payment, unless the funds have been picked up or deposited. Make sure you're sending money to someone you know and trust, and that their information is correct. Fraudulent transactions may result in the loss of money with no recourse.
//                  </p>

//                  {/* Confirm Button */}
//                  <button
//                      onClick={handleConfirmAndSend}
//                      disabled={isSubmitting} // Disable while submitting
//                      className="w-full bg-green-600 text-white font-semibold py-3 rounded-full disabled:opacity-50 disabled:cursor-wait hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                      data-testid="confirm-send-button"
//                  >
//                      {isSubmitting ? (
//                          // Loading indicator inside button
//                          <div className="flex justify-center items-center">
//                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                              </svg>
//                              Processing...
//                          </div>
//                      ) : (
//                         'Confirm and send' // Default button text
//                      )}
//                  </button>

//              </div>
//          </div>
//     );
// };

// export default ReviewSendPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
// import { useAuth } from "../../../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../../../config/apiConfig";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import DashboardHeader from "../../../../components/layout/DashboardHeader";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces
// interface ReviewParams {
//   balanceId: string;
// }

// interface SendSummary {
//   userId?: string;
//   sourceAccountId: string;
//   recipientId: string;
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   exchangeRate: number;
//   availableBalance?: number;
//   reason?: string;
// }

// interface RecipientDetails {
//   _id: string;
//   accountHolderName: string;
//   ifscCode: string;
//   accountNumber: string;
//   bankName: string;
//   address?: string;
//   nickname?: string;
//   currency: { code: string };
// }

// // Component Definition
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// const ReviewSendPage = () => {
//   // Hooks
//   const router = useRouter();
//   const params = useParams<ReviewParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const { token } = useAuth();

//   // State
//   const [summary, setSummary] = useState<SendSummary | null>(null);
//   const [recipientDetails, setRecipientDetails] =
//     useState<RecipientDetails | null>(null);
//   const [userReference, setUserReference] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(true);

//   // Previous Step Link Logic
//   const getPreviousStepLink = () => {
//     const needsReason = summary?.receiveCurrencyCode === "INR";
//     if (needsReason) {
//       return `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`;
//     } else {
//       return `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`;
//     }
//   };

//   // Load Summary from localStorage and Fetch Recipient Details
//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//       setSummary(JSON.parse(storedSummary));
//     } else {
//       setError(
//         "Transfer details are missing. Please start the transfer again."
//       );
//       setIsLoadingDetails(false);
//       return;
//     }

//     const fetchRecipient = async () => {
//       setIsLoadingDetails(true);
//       if (!recipientId || !token) {
//         setError("Recipient ID or authentication token is missing.");
//         setIsLoadingDetails(false);
//         return;
//       }
//       try {
//         const response = await axios.get<RecipientDetails>(
//           `/recipients/${recipientId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecipientDetails(response.data);
//       } catch (err: any) {
//         console.error("Error fetching recipient details for review:", err);
//         setError(
//           err.response?.data?.message || "Failed to load recipient details."
//         );
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };

//     if (storedSummary) {
//       fetchRecipient();
//     }
//   }, [recipientId, token]);

//   // Confirm and Send Handler
//   const handleConfirmAndSend = async () => {
//     if (!summary || !recipientDetails || !token) {
//       setError("Cannot proceed. Missing transfer or recipient information.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const payload = {
//         userId: summary.userId,
//         sourceAccountId: summary.sourceAccountId,
//         recipientId: summary.recipientId,
//         sendAmount: summary.sendAmount,
//         receiveAmount: summary.receiveAmount,
//         sendCurrencyCode: summary.sendCurrencyCode,
//         receiveCurrencyCode: summary.receiveCurrencyCode,
//         exchangeRate: summary.exchangeRate,
//         reason: summary.reason,
//         reference: userReference.trim() || null,
//       };

//       const response = await axios.post("/transfers/execute", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Transfer execution response:", response.data);
//       localStorage.removeItem("sendTransferSummary");
//       router.push(
//         `/dashboard?transferSuccess=true&transferId=${response.data?._id || ""}`
//       );
//     } catch (err: any) {
//       console.error("Error executing transfer:", err);
//       setError(
//         err.response?.data?.message ||
//           "Failed to send money. Please try again later."
//       );
//       setIsSubmitting(false);
//     }
//   };

//   // Loading State
//   if (isLoadingDetails) {
//     return (
//       <div className="min-h-screen ">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <Skeleton className="h-8 w-32 mb-6" />
//           <Skeleton className="h-10 w-48 mb-8" />
//           <div className="space-y-6 rounded-xl p-6">
//             <Skeleton className="h-6 w-3/4 mb-4" />
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-1/2" />
//             <hr className="my-4" />
//             <Skeleton className="h-6 w-3/4 mb-4" />
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-1/2" />
//             <hr className="my-4" />
//             <Skeleton className="h-10 w-full rounded-lg" />
//             <Skeleton className="h-12 w-full rounded-full mt-6" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error && !isSubmitting) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center">
//             <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4">Something went wrong</h2>
//             <p className="text-red-600 mb-6">{error}</p>
//             <Link
//               href={getPreviousStepLink()}
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <FiArrowLeft className="mr-2" /> Go back
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Data Missing State
//   if (!summary || !recipientDetails) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center">
//             <FiAlertTriangle className="text-red-500 size-10 mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4">Missing Information</h2>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">
//               Required transfer or recipient details are missing.
//             </p>
//             <Link
//               href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//               className="inline-flex items-center px-6 py-3 bg-primary  hover:bg-primaryhover text-mainheading font-medium rounded-lg transition-colors"
//             >
//               Start Transfer Again
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main Render
//   return (
//     <div className="min-h-screen ">
//       <DashboardHeader
//         title="Send Money"
//         currentStep={3}
//         totalSteps={steps.length}
//         steps={steps}
//       />
//       <div className="container mx-auto max-w-2xl px-4 py-8">

//         {/* Title */}
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
//           Confirm and send
//         </h1>

//         {/* Submission Error Display */}
//         {error && isSubmitting && (
//           <div className="border-l-4 border-red-500 p-4 mb-6 rounded-lg">
//             <div className="flex items-start">
//               <FiAlertTriangle className="text-red-500 mt-0.5 mr-3" />
//               <p className="text-red-700">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Main Review Card */}
//         <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//           {/* Summary Header */}
//           <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             <h2 className="font-medium text-lg text-mainheading dark:text-white">Transaction Summary</h2>
//           </div>

//           {/* Transfer Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//              Transfer details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">You send exactly</span>
//                 <span className="font-semibold text-mainheading">
//                   {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">Guaranteed rate</span>
//                 <span className="font-semibold text-mainheading bg-primary p-1.5 px-2 rounded-md">
//                   1 {summary.sendCurrencyCode} =
//                   {summary.exchangeRate.toFixed(5)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2 rounded-md">
//                 <span className="text-gray-500 dark:text-gray-300 capitalize">
//                   {recipientDetails.nickname ||
//                     recipientDetails.accountHolderName}
//                   gets
//                 </span>
//                 <span className="font-bold text-white dark:text-mainheading px-5 py-1.5 bg-green-500 rounded-md">
//                   {summary.receiveAmount.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Recipient Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//               Recipient details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account holder</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.accountHolderName}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">IFSC code</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   {recipientDetails.ifscCode}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account number</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   **** **** {recipientDetails.accountNumber.slice(-4)}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Bank name</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.bankName}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reason Section (Conditional) */}
//           {summary.reason && (
//             <div className="p-6 border-b ">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
//                 Reason for transfer
//               </h3>
//               <p className="font-medium text-mainheading dark:text-white p-2.5 bg-lightgray dark:bg-primarybox rounded-md">
//                 {summary.reason}
//               </p>
//             </div>
//           )}

//           {/* Reference Input Section */}
//           <div className="p-6">
//             <label
//               htmlFor="reference"
//               className="font-medium text-gray-500 dark:text-gray-300  block mb-2"
//             >
//               Reference for recipient (optional)
//             </label>
//             <input
//               type="text"
//               id="reference"
//               value={userReference}
//               onChange={(e) => setUserReference(e.target.value)}
//               maxLength={35}
//               placeholder="e.g., Invoice payment, Gift"
//               className="block w-full border hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow duration-300 ease-in-out rounded-lg p-3 text-mainheading dark:text-white"
//               aria-label="Reference for recipient"
//             />
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmAndSend}
//           disabled={isSubmitting}
//           className="w-full flex justify-center items-center cursor-pointer py-4 px-6 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out duration-300 focus:outline-none"
//           data-testid="confirm-send-button"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-3 size-5 text-mainheading"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             <>
//               <FiCheckCircle className="mr-2" size={20} />
//               Confirm and send
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewSendPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
// import { useAuth } from "../../../../../hooks/useAuth";
// import axios from "axios";
// import apiConfig from "../../../../../config/apiConfig";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import DashboardHeader from "../../../../components/layout/DashboardHeader";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces
// interface ReviewParams {
//   balanceId: string;
// }

// interface SendSummary {
//   userId?: string;
//   sourceAccountId: string;
//   recipientId: string;
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   exchangeRate: number;
//   availableBalance?: number;
//   reason?: string;
// }

// interface RecipientDetails {
//   _id: string;
//   accountHolderName: string;
//   ifscCode: string;
//   accountNumber: string;
//   bankName: string;
//   address?: string;
//   nickname?: string;
//   currency: { code: string };
// }

// // Component Definition
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// const ReviewSendPage = () => {
//   // Hooks
//   const router = useRouter();
//   const params = useParams<ReviewParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const { token } = useAuth();

//   // State
//   const [summary, setSummary] = useState<SendSummary | null>(null);
//   const [recipientDetails, setRecipientDetails] =
//     useState<RecipientDetails | null>(null);
//   const [userReference, setUserReference] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(true);

//   // Previous Step Link Logic
//   const getPreviousStepLink = () => {
//     const needsReason = summary?.receiveCurrencyCode === "INR";
//     if (needsReason) {
//       return `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`;
//     } else {
//       return `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`;
//     }
//   };

//   // Load Summary from localStorage and Fetch Recipient Details
//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//       setSummary(JSON.parse(storedSummary));
//     } else {
//       setError(
//         "Transfer details are missing. Please start the transfer again."
//       );
//       setIsLoadingDetails(false);
//       return;
//     }

//     const fetchRecipient = async () => {
//       setIsLoadingDetails(true);
//       if (!recipientId || !token) {
//         setError("Recipient ID or authentication token is missing.");
//         setIsLoadingDetails(false);
//         return;
//       }
//       try {
//         const response = await axios.get<RecipientDetails>(
//           `/recipients/${recipientId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecipientDetails(response.data);
//       } catch (err: any) {
//         console.error("Error fetching recipient details for review:", err);
//         setError(
//           err.response?.data?.message || "Failed to load recipient details."
//         );
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };

//     if (storedSummary) {
//       fetchRecipient();
//     }
//   }, [recipientId, token]);

//   // Confirm and Send Handler
//   const handleConfirmAndSend = async () => {
//     if (!summary || !recipientDetails || !token) {
//       setError("Cannot proceed. Missing transfer or recipient information.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const payload = {
//         userId: summary.userId,
//         sourceAccountId: summary.sourceAccountId,
//         recipientId: summary.recipientId,
//         sendAmount: summary.sendAmount,
//         receiveAmount: summary.receiveAmount,
//         sendCurrencyCode: summary.sendCurrencyCode,
//         receiveCurrencyCode: summary.receiveCurrencyCode,
//         exchangeRate: summary.exchangeRate,
//         reason: summary.reason,
//         reference: userReference.trim() || null,
//       };

//       const response = await axios.post("/transfers/execute", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Transfer execution response:", response.data);
//       localStorage.removeItem("sendTransferSummary");
//       router.push(
//         `/dashboard?transferSuccess=true&transferId=${response.data?._id || ""}`
//       );
//     } catch (err: any) {
//       console.error("Error executing transfer:", err);
//       setError(
//         err.response?.data?.message ||
//           "Failed to send money. Please try again later."
//       );
//       setIsSubmitting(false);
//     }
//   };

//   // Loading State with Skeletons
//   if (isLoadingDetails) {
//     return (
//       <div className="min-h-screen ">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//             <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-6 w-32" />
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-48" />
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-48" />
//                   </span>
//                   <span className="font-semibold text-mainheading">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mt-2 rounded-md">
//                   <span className="text-gray-500 dark:text-gray-300 capitalize">
//                     <Skeleton className="h-6 w-64" />
//                   </span>
//                   <span className="font-bold text-white dark:text-mainheading py-1.5 rounded-md">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-6 w-32" />
//               </h3>
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <label
//                 htmlFor="reference"
//                 className="font-medium text-gray-500 dark:text-gray-300  block mb-2"
//               >
//                 <Skeleton className="h-6 w-48" />
//               </label>
//               <Skeleton className="h-12 w-full rounded-lg" />
//             </div>
//           </div>
//           <Skeleton className="h-12 w-full rounded-full mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error && !isSubmitting) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center">
//             <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4">Something went wrong</h2>
//             <p className="text-red-600 mb-6">{error}</p>
//             <Link
//               href={getPreviousStepLink()}
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <FiArrowLeft className="mr-2" /> Go back
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Data Missing State
//   if (!summary || !recipientDetails) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center">
//             <FiAlertTriangle className="text-red-500 size-10 mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4">Missing Information</h2>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">
//               Required transfer or recipient details are missing.
//             </p>
//             <Link
//               href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//               className="inline-flex items-center px-6 py-3 bg-primary  hover:bg-primaryhover text-mainheading font-medium rounded-lg transition-colors"
//             >
//               Start Transfer Again
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main Render
//   return (
//     <div className="min-h-screen ">
//       <DashboardHeader
//         title="Send Money"
//         currentStep={3}
//         totalSteps={steps.length}
//         steps={steps}
//       />
//       <div className="container mx-auto max-w-2xl px-4 py-8">

//         {/* Title */}
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
//           Confirm and send
//         </h1>

//         {/* Submission Error Display */}
//         {error && isSubmitting && (
//           <div className="border-l-4 border-red-500 p-4 mb-6 rounded-lg">
//             <div className="flex items-start">
//               <FiAlertTriangle className="text-red-500 mt-0.5 mr-3" />
//               <p className="text-red-700">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Main Review Card */}
//         <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//           {/* Summary Header */}
//           <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             <h2 className="font-medium text-lg text-mainheading dark:text-white">Transaction Summary</h2>
//           </div>

//           {/* Transfer Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//              Transfer details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">You send exactly</span>
//                 <span className="font-semibold text-mainheading">
//                   {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">Guaranteed rate</span>
//                 <span className="font-semibold text-mainheading bg-primary p-1.5 px-2 rounded-md">
//                   1 {summary.sendCurrencyCode} =
//                   {summary.exchangeRate.toFixed(5)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2 rounded-md">
//                 <span className="text-gray-500 dark:text-gray-300 capitalize">
//                   {recipientDetails.nickname ||
//                     recipientDetails.accountHolderName}
//                   gets
//                 </span>
//                 <span className="font-bold text-white dark:text-mainheading px-5 py-1.5 bg-green-500 rounded-md">
//                   {summary.receiveAmount.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Recipient Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//               Recipient details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account holder</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.accountHolderName}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">IFSC code</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   {recipientDetails.ifscCode}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account number</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   **** **** {recipientDetails.accountNumber.slice(-4)}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Bank name</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.bankName}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reason Section (Conditional) */}
//           {summary.reason && (
//             <div className="p-6 border-b ">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
//                 Reason for transfer
//               </h3>
//               <p className="font-medium text-mainheading dark:text-white p-2.5 bg-lightgray dark:bg-primarybox rounded-md">
//                 {summary.reason}
//               </p>
//             </div>
//           )}

//           {/* Reference Input Section */}
//           <div className="p-6">
//             <label
//               htmlFor="reference"
//               className="font-medium text-gray-500 dark:text-gray-300  block mb-2"
//             >
//               Reference for recipient (optional)
//             </label>
//             <input
//               type="text"
//               id="reference"
//               value={userReference}
//               onChange={(e) => setUserReference(e.target.value)}
//               maxLength={35}
//               placeholder="e.g., Invoice payment, Gift"
//               className="block w-full border hover:shadow-darkcolor hover:dark:shadow-whitecolor transition-shadow duration-300 ease-in-out rounded-lg p-3 text-mainheading dark:text-white"
//               aria-label="Reference for recipient"
//             />
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmAndSend}
//           disabled={isSubmitting}
//           className="w-full flex justify-center items-center cursor-pointer py-4 px-6 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out duration-300 focus:outline-none"
//           data-testid="confirm-send-button"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-3 size-5 text-mainheading"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             <>
//               <FiCheckCircle className="mr-2" size={20} />
//               Confirm and send
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewSendPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
// import { useAuth } from "../../../../../contexts/AuthContext";
// // Import AxiosError for type safety in catch blocks
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../../../../config/apiConfig";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import DashboardHeader from "../../../../components/layout/DashboardHeader";

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces
// interface ReviewParams {
//   balanceId: string;
// }

// interface SendSummary {
//   userId?: string;
//   sourceAccountId: string;
//   recipientId: string;
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   exchangeRate: number;
//   availableBalance?: number;
//   reason?: string;
// }

// interface RecipientDetails {
//   _id: string;
//   accountHolderName: string;
//   ifscCode: string;
//   accountNumber: string;
//   bankName: string;
//   address?: string;
//   nickname?: string;
//   currency: { code: string };
// }

// // Define a type for the expected error structure from the API
// interface ApiErrorData {
//     message?: string;
//     // Add other potential error properties if known
// }

// // Component Definition
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// const ReviewSendPage = () => {
//   // Hooks
//   const router = useRouter();
//   const params = useParams<ReviewParams>();
//   const searchParams = useSearchParams();
//   const { balanceId } = params;
//   const recipientId = searchParams.get("recipientId");
//   const { token } = useAuth();

//   // State
//   const [summary, setSummary] = useState<SendSummary | null>(null);
//   const [recipientDetails, setRecipientDetails] =
//     useState<RecipientDetails | null>(null);
//   const [userReference, setUserReference] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(true);

//   // Previous Step Link Logic
//   const getPreviousStepLink = () => {
//     const needsReason = summary?.receiveCurrencyCode === "INR";
//     if (needsReason) {
//       return `/dashboard/balances/${balanceId}/send/reason?recipientId=${recipientId}`;
//     } else {
//       return `/dashboard/balances/${balanceId}/send/amount?recipientId=${recipientId}`;
//     }
//   };

//   // Load Summary from localStorage and Fetch Recipient Details
//   useEffect(() => {
//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     if (storedSummary) {
//       try {
//         const parsedSummary = JSON.parse(storedSummary) as SendSummary;
//          // Basic validation (optional but recommended)
//         if (!parsedSummary.sourceAccountId || !parsedSummary.recipientId) {
//              throw new Error("Stored summary is incomplete.");
//         }
//         setSummary(parsedSummary);
//       } catch(e) {
//         console.error("Failed to parse stored summary:", e);
//         setError(
//           "Invalid transfer details found. Please start the transfer again."
//         );
//         setIsLoadingDetails(false);
//         localStorage.removeItem("sendTransferSummary"); // Clean up bad data
//         return;
//       }
//     } else {
//       setError(
//         "Transfer details are missing. Please start the transfer again."
//       );
//       setIsLoadingDetails(false);
//       return;
//     }

//     const fetchRecipient = async () => {
//       setIsLoadingDetails(true);
//       setError(null); // Clear previous errors
//       if (!recipientId || !token) {
//         setError("Recipient ID or authentication token is missing.");
//         setIsLoadingDetails(false);
//         return;
//       }
//       try {
//         const response = await axios.get<RecipientDetails>(
//           `/recipients/${recipientId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecipientDetails(response.data);
//       } catch (err: unknown) { // Use unknown instead of any
//         console.error("Error fetching recipient details for review:", err);
//         // Type guard for AxiosError
//         if (axios.isAxiosError(err)) {
//            const axiosError = err as AxiosError<ApiErrorData>; // Cast to specify error data type
//            setError(
//              axiosError.response?.data?.message || // Try to get message from response data
//              axiosError.message || // Fallback to Axios error message
//              "Failed to load recipient details."
//            );
//         } else {
//             // Handle non-Axios errors
//             setError("An unexpected error occurred while fetching recipient details.");
//         }
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };

//     // Only fetch if summary was successfully loaded
//     if (storedSummary) {
//         fetchRecipient();
//     }
//   }, [recipientId, token, balanceId]); // Added balanceId to dependencies as it's used in error link

//   // Confirm and Send Handler
//   const handleConfirmAndSend = async () => {
//     if (!summary || !recipientDetails || !token) {
//       setError("Cannot proceed. Missing transfer or recipient information.");
//       return;
//     }
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // Ensure required fields are present before sending
//       if (!summary.sourceAccountId || !summary.recipientId || !summary.sendAmount || !summary.receiveAmount || !summary.sendCurrencyCode || !summary.receiveCurrencyCode || !summary.exchangeRate) {
//         setError("Critical transfer information is missing. Please restart the process.");
//         setIsSubmitting(false);
//         return;
//       }

//       const payload = {
//         // userId is typically inferred server-side from the token, unless specifically required
//         // userId: summary.userId,
//         sourceAccountId: summary.sourceAccountId,
//         recipientId: summary.recipientId,
//         sendAmount: summary.sendAmount,
//         receiveAmount: summary.receiveAmount,
//         sendCurrencyCode: summary.sendCurrencyCode,
//         receiveCurrencyCode: summary.receiveCurrencyCode,
//         exchangeRate: summary.exchangeRate,
//         reason: summary.reason, // Will be undefined if not set, backend should handle
//         reference: userReference.trim() || undefined, // Send undefined instead of null if empty
//       };

//       const response = await axios.post<{_id?: string}>( // Specify expected response shape
//           "/transfers/execute",
//           payload, {
//              headers: { Authorization: `Bearer ${token}` },
//           }
//       );

//       console.log("Transfer execution response:", response.data);
//       localStorage.removeItem("sendTransferSummary");
//       // Use optional chaining for transferId in case _id is missing in response
//       router.push(
//         `/dashboard?transferSuccess=true&transferId=${response.data?._id ?? ""}`
//       );
//     } catch (err: unknown) { // Use unknown instead of any
//       console.error("Error executing transfer:", err);
//        // Type guard for AxiosError
//       if (axios.isAxiosError(err)) {
//             const axiosError = err as AxiosError<ApiErrorData>; // Cast to specify error data type
//             setError(
//               axiosError.response?.data?.message || // Try to get message from response data
//               axiosError.message || // Fallback to Axios error message
//               "Failed to send money. Please try again later."
//             );
//       } else {
//         // Handle non-Axios errors
//          setError("An unexpected error occurred during the transfer.");
//       }
//       setIsSubmitting(false);
//     }
//   };

//   // Loading State with Skeletons
//   if (isLoadingDetails) {
//     return (
//       <div className="min-h-screen ">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           {/* Skeleton structure remains the same */}
//           <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//             <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//                 <Skeleton className="h-7 w-48" />
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-5 w-32" />
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-36" />
//                   </span>
//                   <span className="font-semibold text-mainheading">
//                     <Skeleton className="h-6 w-24" />
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500 dark:text-gray-300">
//                      <Skeleton className="h-6 w-32" />
//                   </span>
//                    <span className="font-semibold text-mainheading">
//                      <Skeleton className="h-8 w-40 rounded-md" />
//                    </span>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-gray-500 dark:text-gray-300 capitalize">
//                     <Skeleton className="h-6 w-48" />
//                   </span>
//                   <span className="font-bold text-white dark:text-mainheading py-1.5 rounded-md">
//                      <Skeleton className="h-8 w-32 rounded-md" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-5 w-36" />
//               </h3>
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     <Skeleton className="h-6 w-28" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     <Skeleton className="h-6 w-36" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                      <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                      <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                      <Skeleton className="h-6 w-32" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                      <Skeleton className="h-6 w-36" />
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                      <Skeleton className="h-6 w-24" />
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                      <Skeleton className="h-6 w-32" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <label
//                 htmlFor="reference"
//                 className="font-medium text-gray-500 dark:text-gray-300  block mb-2"
//               >
//                 <Skeleton className="h-6 w-48" />
//               </label>
//               <Skeleton className="h-12 w-full rounded-lg" />
//             </div>
//           </div>
//           <Skeleton className="h-12 w-full rounded-xl mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // Error State (Display before checking for missing data if error occurred during load)
//   if (error && !isSubmitting) {
//     return (
//       <div className="min-h-screen">
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           totalSteps={steps.length}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center border border-red-200 dark:border-red-800">
//             <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4 text-neutral-900 dark:text-white">Something went wrong</h2>
//             <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
//             <Link
//               // Use a more robust way to go back if possible, otherwise use previous step logic
//               href={getPreviousStepLink()}
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <FiArrowLeft className="mr-2" /> Go back
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Data Missing State (Check after loading and initial error check)
//   if (!summary || !recipientDetails) {
//     // Don't show this if loading is still true
//     if (!isLoadingDetails) {
//         return (
//           <div className="min-h-screen">
//             <DashboardHeader
//               title="Send Money"
//               currentStep={3}
//               totalSteps={steps.length}
//               steps={steps}
//             />
//             <div className="container mx-auto max-w-2xl px-4 py-8">
//               <div className="bg-white dark:bg-background rounded-xl p-8 text-center border border-yellow-200 dark:border-yellow-800">
//                 <FiAlertTriangle className="text-yellow-500 size-10 mx-auto mb-4" />
//                 <h2 className="text-xl font-medium mb-4 text-neutral-900 dark:text-white">Missing Information</h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">
//                   Required transfer or recipient details are missing. Please start the process again.
//                 </p>
//                 <Link
//                   href={`/dashboard/balances/${balanceId}/send/select-recipient`}
//                   className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-lg transition-colors"
//                 >
//                   Start Transfer Again
//                 </Link>
//               </div>
//             </div>
//           </div>
//         );
//     }
//      // If still loading but data is null, return null or a minimal loader to avoid flicker
//      return null;
//   }

//   // Main Render
//   return (
//     <div className="min-h-screen ">
//       <DashboardHeader
//         title="Send Money"
//         currentStep={3}
//         totalSteps={steps.length}
//         steps={steps}
//       />
//       <div className="container mx-auto max-w-2xl px-4 py-8">

//         {/* Title */}
//         <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
//           Confirm and send
//         </h1>

//         {/* Submission Error Display */}
//         {error && isSubmitting && (
//           <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-md">
//             <div className="flex items-start">
//               <FiAlertTriangle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
//               <div>
//                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Transfer Failed</h3>
//                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main Review Card */}
//         <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//           {/* Summary Header */}
//           <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             <h2 className="font-medium text-lg text-mainheading dark:text-white">Transaction Summary</h2>
//           </div>

//           {/* Transfer Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//              Transfer details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">You send exactly</span>
//                 <span className="font-semibold text-mainheading dark:text-white">
//                   {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">Guaranteed rate</span>
//                 <span className="font-semibold text-mainheading dark:text-white bg-primary p-1.5 px-2 rounded-md text-sm">
//                   1 {summary.sendCurrencyCode} =
//                   {summary.exchangeRate.toFixed(5)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2 rounded-md">
//                 <span className="text-gray-500 dark:text-gray-300 capitalize">
//                   {recipientDetails.nickname ||
//                     recipientDetails.accountHolderName}
//                   gets
//                 </span>
//                 <span className="font-bold text-white px-3 py-1 bg-green-500 rounded-md text-sm">
//                   {summary.receiveAmount.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Recipient Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//               Recipient details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account holder</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.accountHolderName}
//                 </span>
//               </div>
//               {/* Conditionally render IFSC if it exists (common for INR) */}
//               {recipientDetails.ifscCode && (
//                  <div className="grid grid-cols-2 gap-2">
//                    <span className="text-gray-500 dark:text-gray-300">IFSC code</span>
//                    <span className="font-semibold text-mainheading dark:text-white text-right">
//                      {recipientDetails.ifscCode}
//                    </span>
//                  </div>
//               )}
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account number</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   **** **** {recipientDetails.accountNumber.slice(-4)}
//                 </span>
//               </div>
//                {/* Conditionally render Bank Name if it exists */}
//               {recipientDetails.bankName && (
//                 <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-500 dark:text-gray-300">Bank name</span>
//                     <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                     {recipientDetails.bankName}
//                     </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Reason Section (Conditional) */}
//           {summary.reason && (
//             <div className="p-6 border-b ">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
//                 Reason for transfer
//               </h3>
//               <p className="font-medium text-mainheading dark:text-white p-2.5 bg-lightgray dark:bg-primarybox rounded-md">
//                 {summary.reason}
//               </p>
//             </div>
//           )}

//           {/* Reference Input Section */}
//           <div className="p-6">
//             <label
//               htmlFor="reference"
//               className="font-medium text-gray-500 dark:text-gray-300  block mb-2 text-sm"
//             >
//               Reference for recipient (optional)
//             </label>
//             <input
//               type="text"
//               id="reference"
//               value={userReference}
//               onChange={(e) => setUserReference(e.target.value)}
//               maxLength={35}
//               placeholder="e.g., Invoice payment, Gift"
//               className="block w-full border bg-white dark:bg-background dark:border-gray-700 hover:shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out rounded-lg p-3 text-mainheading dark:text-white"
//               aria-label="Reference for recipient"
//             />
//              <p className="text-xs text-gray-400 mt-1">Max 35 characters. This may appear on the recipient&apos;s statement.</p>
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmAndSend}
//           disabled={isSubmitting || isLoadingDetails} // Also disable if still loading initial details
//           className="w-full flex justify-center items-center cursor-pointer py-4 px-6 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-background"
//           data-testid="confirm-send-button"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-3 size-5 text-mainheading"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             <>
//               <FiCheckCircle className="mr-2" size={20} />
//               Confirm and send
//             </>
//           )}
//         </button>
//          {/* Go Back Link */}
//          <div className="mt-6 text-center">
//             <Link
//                 href={getPreviousStepLink()}
//                 className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
//             >
//                 <FiArrowLeft className="mr-1" /> Go back
//             </Link>
//          </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewSendPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
// import { useAuth } from "../../../../../contexts/AuthContext";
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../../../../config/apiConfig";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import DashboardHeader from "../../../../components/layout/DashboardHeader"; // Assuming DashboardHeaderProps is updated here

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces (keep these as they are good practice)
// // Note: Removed ReviewParams as we'll let useParams infer
// // interface ReviewParams {
// //   balanceId: string;
// // }

// interface SendSummary {
//   userId?: string; // Optional: often derived from token server-side
//   sourceAccountId: string;
//   recipientId: string;
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   exchangeRate: number;
//   availableBalance?: number; // Keep if used elsewhere, not directly used here
//   reason?: string;
// }

// interface RecipientDetails {
//   _id: string;
//   accountHolderName: string;
//   ifscCode?: string; // Make optional if not always present
//   accountNumber: string;
//   bankName?: string; // Make optional if not always present
//   address?: string;
//   nickname?: string;
//   currency: { code: string }; // Assuming currency object has a code property
// }

// // Define a type for the expected error structure from the API
// interface ApiErrorData {
//   message?: string;
//   // Add other potential error properties if known
// }

// // Component Definition
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// const ReviewSendPage = () => {
//   // Hooks
//   const router = useRouter();
//   // Remove the explicit generic type here
//   const params = useParams();
//   const searchParams = useSearchParams();
//   // Extract balanceId - it will be string | string[] | undefined, handle appropriately
//   // Usually, for route params like [balanceId], it will be a string if present.
//   const balanceId = typeof params.balanceId === 'string' ? params.balanceId : undefined;
//   const recipientId = searchParams.get("recipientId");
//   const { token } = useAuth();

//   // State
//   const [summary, setSummary] = useState<SendSummary | null>(null);
//   const [recipientDetails, setRecipientDetails] =
//     useState<RecipientDetails | null>(null);
//   const [userReference, setUserReference] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(true);

//   // Previous Step Link Logic
//   const getPreviousStepLink = () => {
//     // Ensure balanceId is available before constructing the link
//     if (!balanceId || !recipientId) {
//         // Fallback link or handle error appropriately
//         return "/dashboard"; // Or maybe '/dashboard/balances'
//     }
//     const needsReason = summary?.receiveCurrencyCode === "INR";
//     const baseLink = `/dashboard/balances/${balanceId}/send`;
//     if (needsReason) {
//       return `${baseLink}/reason?recipientId=${recipientId}`;
//     } else {
//       return `${baseLink}/amount?recipientId=${recipientId}`;
//     }
//   };

//   // Load Summary from localStorage and Fetch Recipient Details
//   useEffect(() => {
//     // Ensure balanceId is valid before proceeding
//     if (!balanceId) {
//         setError("Balance ID is missing from the URL.");
//         setIsLoadingDetails(false);
//         return;
//     }

//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     let parsedSummary: SendSummary | null = null; // Keep track of parsed summary

//     if (storedSummary) {
//       try {
//         parsedSummary = JSON.parse(storedSummary) as SendSummary;
//         // Basic validation (recommended)
//         if (
//           !parsedSummary?.sourceAccountId ||
//           !parsedSummary?.recipientId ||
//           !parsedSummary?.sendAmount || // Add other essential fields
//           !parsedSummary?.receiveAmount ||
//           !parsedSummary?.sendCurrencyCode ||
//           !parsedSummary?.receiveCurrencyCode
//         ) {
//           throw new Error("Stored summary data is incomplete or invalid.");
//         }
//         setSummary(parsedSummary);
//       } catch (e) {
//         console.error("Failed to parse or validate stored summary:", e);
//         setError(
//           "Invalid transfer details found. Please start the transfer again."
//         );
//         setIsLoadingDetails(false);
//         localStorage.removeItem("sendTransferSummary"); // Clean up bad data
//         return; // Stop execution if summary is invalid
//       }
//     } else {
//       setError(
//         "Transfer details are missing. Please start the transfer again."
//       );
//       setIsLoadingDetails(false);
//       return; // Stop execution if no summary found
//     }

//     // Fetch recipient only if summary was successfully loaded and validated
//     const fetchRecipient = async () => {
//       // No need to set loading again if already true
//       // setIsLoadingDetails(true);
//       setError(null); // Clear previous errors before fetch
//       if (!recipientId || !token) {
//         setError("Recipient ID or authentication token is missing.");
//         setIsLoadingDetails(false);
//         return;
//       }
//       try {
//         const response = await axios.get<RecipientDetails>(
//           `/recipients/${recipientId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecipientDetails(response.data);
//       } catch (err: unknown) {
//         console.error("Error fetching recipient details for review:", err);
//         if (axios.isAxiosError(err)) {
//           const axiosError = err as AxiosError<ApiErrorData>;
//           setError(
//             axiosError.response?.data?.message ||
//               axiosError.message ||
//               "Failed to load recipient details."
//           );
//         } else {
//           setError(
//             "An unexpected error occurred while fetching recipient details."
//           );
//         }
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };

//     // Only fetch if summary was successfully loaded and parsed
//     if (parsedSummary) {
//       fetchRecipient();
//     }
//      // If summary wasn't parsed successfully, loading should already be false from above checks
//      // else {
//      //    setIsLoadingDetails(false); // Ensure loading stops if summary fails
//      // }

//   }, [recipientId, token, balanceId]); // Keep balanceId in dependencies

//   // Confirm and Send Handler
//   const handleConfirmAndSend = async () => {
//     if (!summary || !recipientDetails || !token) {
//       setError("Cannot proceed. Missing critical transfer or recipient information, or authentication token.");
//       setIsSubmitting(false); // Ensure submitting state is reset
//       return;
//     }

//     // Additional check for balanceId consistency (optional but good)
//     if (balanceId !== summary.sourceAccountId) {
//         setError("Mismatch between current balance and transfer details. Please restart.");
//         setIsSubmitting(false);
//         return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // No need for extra validation here if validation in useEffect is robust
//       // if (!summary.sourceAccountId || ...)

//       const payload = {
//         sourceAccountId: summary.sourceAccountId,
//         recipientId: summary.recipientId,
//         sendAmount: summary.sendAmount,
//         receiveAmount: summary.receiveAmount,
//         sendCurrencyCode: summary.sendCurrencyCode,
//         receiveCurrencyCode: summary.receiveCurrencyCode,
//         exchangeRate: summary.exchangeRate,
//         reason: summary.reason, // Will be undefined if not set
//         reference: userReference.trim() || undefined, // Send undefined if empty/whitespace
//       };

//       const response = await axios.post<{_id?: string}>(
//         "/transfers/execute",
//         payload, {
//            headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Transfer execution response:", response.data);
//       localStorage.removeItem("sendTransferSummary"); // Clean up on success
//       const transferId = response.data?._id ?? ""; // Use empty string as fallback
//       router.push(
//         `/dashboard?transferSuccess=true&transferId=${transferId}`
//       );
//     } catch (err: unknown) {
//       console.error("Error executing transfer:", err);
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorData>;
//         setError(
//           axiosError.response?.data?.message ||
//             axiosError.message ||
//             "Failed to send money. Please try again later."
//         );
//       } else {
//         setError("An unexpected error occurred during the transfer.");
//       }
//       setIsSubmitting(false); // Ensure submitting state is reset on error
//     }
//   };

//   // --- Loading State ---
//   if (isLoadingDetails) {
//     return (
//       <div className="min-h-screen ">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           {/* Skeleton structure */}
//           <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//             <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//                 <Skeleton className="h-7 w-48" />
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-5 w-32" />
//               </h3>
//               <div className="space-y-3">
//                 {/* Simplified skeleton structure */}
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-8 w-3/4 mb-2" />
//                  <Skeleton className="h-8 w-full mb-2" />
//               </div>
//             </div>
//              <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                  <Skeleton className="h-5 w-36" />
//               </h3>
//               <div className="space-y-3">
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-6 w-3/4 mb-2" />
//               </div>
//             </div>
//              <div className="p-6">
//                <Skeleton className="h-6 w-48 mb-2" />
//                <Skeleton className="h-12 w-full rounded-lg" />
//             </div>
//           </div>
//           <Skeleton className="h-12 w-full rounded-xl mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // --- Error State (Post-Loading) ---
//   // Display specific errors encountered during loading or if critical data is missing after loading finished
//   if (error && !isSubmitting) {
//     return (
//       <div className="min-h-screen">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
//         <div className="container mx-auto max-w-2xl">
//           {/* Card container with subtle tint and border */}
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl sm:p-8 p-4 text-center border border-red-200 dark:border-red-700/50">
//             {/* Icon */}
//             <FiAlertTriangle
//               className="text-red-500 dark:text-red-400 text-4xl mx-auto mb-4"
//               aria-hidden="true"
//             />

//             <h2 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
//               Something went wrong
//             </h2>

//             <p className="text-red-700 dark:text-red-300 mb-8 text-base">
//               {error || "An unexpected error occurred. Please try again."}
//             </p>

//             {balanceId && recipientId ? (
//               <Link
//                 href={getPreviousStepLink()}
//                 className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center  cursor-pointer transition-all duration-75 ease-linear" // Adjusted button color to match theme
//               >
//                 <FiArrowLeft
//                   className="-ml-1 mr-2 h-5 w-5"
//                   aria-hidden="true"
//                 />
//                 Go back and try again
//               </Link>
//             ) : (
//               <Link
//                 href="/dashboard/balances" // Fallback link
//                 className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-6 py-3 h-12.5 text-center  cursor-pointer transition-all duration-75 ease-linear" // Neutral button for fallback
//               >
//                 <FiArrowLeft
//                   className="-ml-1 mr-2 h-5 w-5"
//                   aria-hidden="true"
//                 />
//                 Return to Balances
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // --- Data Missing State (Post-Loading, No Error Yet) ---
//   // This state should ideally be caught by the error state above if loading failed,
//   // but as a fallback, check if data is null after loading is complete.
//   if (!summary || !recipientDetails) {
//      // This condition should theoretically not be hit if error handling in useEffect is correct,
//      // but kept as a safeguard.
//      console.warn("Review page rendered without summary or recipient details after loading.");
//      return (
//       <div className="min-h-screen">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           <div className="bg-white dark:bg-background rounded-xl p-8 text-center border border-yellow-200 dark:border-yellow-800">
//             <FiAlertTriangle className="text-yellow-500 size-10 mx-auto mb-4" />
//             <h2 className="text-xl font-medium mb-4 text-neutral-900 dark:text-white">Missing Information</h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Could not load the necessary transfer details. Please start the process again.
//             </p>
//             <Link
//                 // Use balanceId if available for a more specific starting point
//                 href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard/balances'}
//                 className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-lg transition-colors"
//             >
//               Start Transfer Again
//             </Link>
//           </div>
//         </div>
//       </div>
//      );
//   }

//   // --- Main Render ---
//   return (
//     <div className="min-h-screen ">
//        {/* Make sure DashboardHeaderProps includes totalSteps */}
//       <DashboardHeader
//         title="Send Money"
//         currentStep={3}
//         steps={steps}
//       />
//       <div className="container mx-auto max-w-2xl px-4 py-8">

//         <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
//           Review details of your transfer
//         </h1>

//         {/* Submission Error Display */}
//         {error && isSubmitting && (
//           <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-md">
//             <div className="flex items-start">
//               <FiAlertTriangle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
//               <div>
//                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Transfer Failed</h3>
//                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main Review Card */}
//         <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//           {/* Summary Header */}
//           <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             <h2 className="font-medium text-lg text-mainheading dark:text-white">Transaction Summary</h2>
//           </div>

//           {/* Transfer Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//              Transfer details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">You send exactly</span>
//                 <span className="font-semibold text-mainheading dark:text-white">
//                   {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">Guaranteed rate</span>
//                 <span className="font-semibold text-mainheading dark:text-white bg-primary p-1.5 px-2 rounded-md text-sm">
//                   1 {summary.sendCurrencyCode} =
//                   {summary.exchangeRate.toFixed(5)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2 rounded-md">
//                 <span className="text-gray-500 dark:text-gray-300 capitalize">
//                   {recipientDetails.nickname ||
//                     recipientDetails.accountHolderName}
//                   gets
//                 </span>
//                 <span className="font-bold text-white px-3 py-1 bg-green-500 rounded-md text-sm">
//                   {summary.receiveAmount.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Recipient Details Section */}
//           <div className="p-6 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//               Recipient details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account holder</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.accountHolderName}
//                 </span>
//               </div>
//               {/* Conditionally render IFSC if it exists */}
//               {recipientDetails.ifscCode && (
//                  <div className="grid grid-cols-2 gap-2">
//                    <span className="text-gray-500 dark:text-gray-300">IFSC code</span>
//                    <span className="font-semibold text-mainheading dark:text-white text-right">
//                      {recipientDetails.ifscCode}
//                    </span>
//                  </div>
//               )}
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">Account number</span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   **** **** {recipientDetails.accountNumber.slice(-4)}
//                 </span>
//               </div>
//                {/* Conditionally render Bank Name if it exists */}
//               {recipientDetails.bankName && (
//                 <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-500 dark:text-gray-300">Bank name</span>
//                     <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                     {recipientDetails.bankName}
//                     </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Reason Section (Conditional) */}
//           {summary.reason && (
//             <div className="p-6 border-b ">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
//                 Reason for transfer
//               </h3>
//               <p className="font-medium text-mainheading dark:text-white p-2.5 bg-lightgray dark:bg-primarybox rounded-md">
//                 {summary.reason}
//               </p>
//             </div>
//           )}

//           {/* Reference Input Section */}
//           <div className="p-6">
//             <label
//               htmlFor="reference"
//               className="font-medium text-gray-500 dark:text-gray-300  block mb-2 text-sm"
//             >
//               Reference for recipient (optional)
//             </label>
//             <input
//               type="text"
//               id="reference"
//               value={userReference}
//               onChange={(e) => setUserReference(e.target.value)}
//               maxLength={35}
//               placeholder="e.g., Invoice payment, Gift"
//               className="block w-full border bg-white dark:bg-background dark:border-gray-700 hover:shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out rounded-lg p-3 text-mainheading dark:text-white"
//               aria-label="Reference for recipient (optional)" // Enhanced label
//             />
//              <p className="text-xs text-gray-400 mt-1">Max 35 characters. This may appear on the recipient's statement.</p>
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmAndSend}
//           // Disable button if submitting, or if required data isn't loaded (double check)
//           disabled={isSubmitting || !summary || !recipientDetails}
//           className="w-full flex justify-center items-center cursor-pointer py-4 px-6 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-background"
//           data-testid="confirm-send-button"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-3 size-5 text-mainheading"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             <>
//               <FiCheckCircle className="mr-2" size={20} />
//               Confirm and send
//             </>
//           )}
//         </button>

//          {/* Go Back Link */}
//          <div className="mt-6 text-center">
//             <Link
//                 href={getPreviousStepLink()} // Uses the dynamic link function
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-xl px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//             >
//                 <FiArrowLeft className="mr-1" /> Go back
//             </Link>
//          </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewSendPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
// import { useAuth } from "../../../../../contexts/AuthContext";
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../../../../config/apiConfig";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import DashboardHeader from "../../../../components/layout/DashboardHeader"; // Assuming DashboardHeaderProps is updated here

// axios.defaults.baseURL = apiConfig.baseUrl;

// // Interfaces (keep these as they are good practice)
// // Note: Removed ReviewParams as we'll let useParams infer
// // interface ReviewParams {
// //   balanceId: string;
// // }

// interface SendSummary {
//   userId?: string; // Optional: often derived from token server-side
//   sourceAccountId: string;
//   recipientId: string;
//   sendAmount: number;
//   receiveAmount: number;
//   sendCurrencyCode: string;
//   receiveCurrencyCode: string;
//   exchangeRate: number;
//   availableBalance?: number; // Keep if used elsewhere, not directly used here
//   reason?: string;
// }

// interface RecipientDetails {
//   _id: string;
//   accountHolderName: string;
//   ifscCode?: string; // Make optional if not always present
//   accountNumber: string;
//   bankName?: string; // Make optional if not always present
//   address?: string;
//   nickname?: string;
//   currency: { code: string }; // Assuming currency object has a code property
// }

// // Define a type for the expected error structure from the API
// interface ApiErrorData {
//   message?: string;
//   // Add other potential error properties if known
// }

// // Component Definition
// const steps = ["Recipient", "Amount", "Review", "Pay"];

// const ReviewSendPage = () => {
//   // Hooks
//   const router = useRouter();
//   // Remove the explicit generic type here
//   const params = useParams();
//   const searchParams = useSearchParams();
//   // Extract balanceId - it will be string | string[] | undefined, handle appropriately
//   // Usually, for route params like [balanceId], it will be a string if present.
//   const balanceId = typeof params.balanceId === 'string' ? params.balanceId : undefined;
//   const recipientId = searchParams.get("recipientId");
//   const { token } = useAuth();

//   // State
//   const [summary, setSummary] = useState<SendSummary | null>(null);
//   const [recipientDetails, setRecipientDetails] =
//     useState<RecipientDetails | null>(null);
//   const [userReference, setUserReference] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(true);

//   // Previous Step Link Logic
//   const getPreviousStepLink = () => {
//     // Ensure balanceId is available before constructing the link
//     if (!balanceId || !recipientId) {
//         // Fallback link or handle error appropriately
//         return "/dashboard"; // Or maybe '/dashboard/balances'
//     }
//     const needsReason = summary?.receiveCurrencyCode === "INR";
//     const baseLink = `/dashboard/balances/${balanceId}/send`;
//     if (needsReason) {
//       return `${baseLink}/reason?recipientId=${recipientId}`;
//     } else {
//       return `${baseLink}/amount?recipientId=${recipientId}`;
//     }
//   };

//   // Load Summary from localStorage and Fetch Recipient Details
//   useEffect(() => {
//     // Ensure balanceId is valid before proceeding
//     if (!balanceId) {
//         setError("Balance ID is missing from the URL.");
//         setIsLoadingDetails(false);
//         return;
//     }

//     const storedSummary = localStorage.getItem("sendTransferSummary");
//     let parsedSummary: SendSummary | null = null; // Keep track of parsed summary

//     if (storedSummary) {
//       try {
//         parsedSummary = JSON.parse(storedSummary) as SendSummary;
//         // Basic validation (recommended)
//         if (
//           !parsedSummary?.sourceAccountId ||
//           !parsedSummary?.recipientId ||
//           !parsedSummary?.sendAmount || // Add other essential fields
//           !parsedSummary?.receiveAmount ||
//           !parsedSummary?.sendCurrencyCode ||
//           !parsedSummary?.receiveCurrencyCode
//         ) {
//           throw new Error("Stored summary data is incomplete or invalid.");
//         }
//         setSummary(parsedSummary);
//       } catch (e) {
//         console.error("Failed to parse or validate stored summary:", e);
//         setError(
//           "Invalid transfer details found. Please start the transfer again."
//         );
//         setIsLoadingDetails(false);
//         localStorage.removeItem("sendTransferSummary"); // Clean up bad data
//         return; // Stop execution if summary is invalid
//       }
//     } else {
//       setError(
//         "Transfer details are missing. Please start the transfer again."
//       );
//       setIsLoadingDetails(false);
//       return; // Stop execution if no summary found
//     }

//     // Fetch recipient only if summary was successfully loaded and validated
//     const fetchRecipient = async () => {
//       // No need to set loading again if already true
//       // setIsLoadingDetails(true);
//       setError(null); // Clear previous errors before fetch
//       if (!recipientId || !token) {
//         setError("Recipient ID or authentication token is missing.");
//         setIsLoadingDetails(false);
//         return;
//       }
//       try {
//         const response = await axios.get<RecipientDetails>(
//           `/recipients/${recipientId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecipientDetails(response.data);
//       } catch (err: unknown) {
//         console.error("Error fetching recipient details for review:", err);
//         if (axios.isAxiosError(err)) {
//           const axiosError = err as AxiosError<ApiErrorData>;
//           setError(
//             axiosError.response?.data?.message ||
//               axiosError.message ||
//               "Failed to load recipient details."
//           );
//         } else {
//           setError(
//             "An unexpected error occurred while fetching recipient details."
//           );
//         }
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };

//     // Only fetch if summary was successfully loaded and parsed
//     if (parsedSummary) {
//       fetchRecipient();
//     }
//      // If summary wasn't parsed successfully, loading should already be false from above checks
//      // else {
//      //    setIsLoadingDetails(false); // Ensure loading stops if summary fails
//      // }

//   }, [recipientId, token, balanceId]); // Keep balanceId in dependencies

//   // Confirm and Send Handler
//   const handleConfirmAndSend = async () => {
//     if (!summary || !recipientDetails || !token) {
//       setError("Cannot proceed. Missing critical transfer or recipient information, or authentication token.");
//       setIsSubmitting(false); // Ensure submitting state is reset
//       return;
//     }

//     // Additional check for balanceId consistency (optional but good)
//     if (balanceId !== summary.sourceAccountId) {
//         setError("Mismatch between current balance and transfer details. Please restart.");
//         setIsSubmitting(false);
//         return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // No need for extra validation here if validation in useEffect is robust
//       // if (!summary.sourceAccountId || ...)

//       const payload = {
//         sourceAccountId: summary.sourceAccountId,
//         recipientId: summary.recipientId,
//         sendAmount: summary.sendAmount,
//         receiveAmount: summary.receiveAmount,
//         sendCurrencyCode: summary.sendCurrencyCode,
//         receiveCurrencyCode: summary.receiveCurrencyCode,
//         exchangeRate: summary.exchangeRate,
//         reason: summary.reason, // Will be undefined if not set
//         reference: userReference.trim() || undefined, // Send undefined if empty/whitespace
//       };

//       const response = await axios.post<{_id?: string}>(
//         "/transfers/execute",
//         payload, {
//            headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Transfer execution response:", response.data);
//       localStorage.removeItem("sendTransferSummary"); // Clean up on success
//       const transferId = response.data?._id ?? ""; // Use empty string as fallback
//       // UPDATED LINE:
//       router.push(
//         `/dashboard/transactions/${transferId}?transferSuccess=true&transferId=${transferId}`
//       );
//     } catch (err: unknown) {
//       console.error("Error executing transfer:", err);
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<ApiErrorData>;
//         setError(
//           axiosError.response?.data?.message ||
//             axiosError.message ||
//             "Failed to send money. Please try again later."
//         );
//       } else {
//         setError("An unexpected error occurred during the transfer.");
//       }
//       setIsSubmitting(false); // Ensure submitting state is reset on error
//     }
//   };

//   // --- Loading State ---
//   if (isLoadingDetails) {
//     return (
//       <div className="min-h-screen ">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           steps={steps}
//         />
//         <div className="container mx-auto max-w-2xl px-4 py-8">
//           {/* Skeleton structure */}
//           <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//             <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//                 <Skeleton className="h-7 w-48" />
//             </div>
//             <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                 <Skeleton className="h-5 w-32" />
//               </h3>
//               <div className="space-y-3">
//                 {/* Simplified skeleton structure */}
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-8 w-3/4 mb-2" />
//                  <Skeleton className="h-8 w-full mb-2" />
//               </div>
//             </div>
//              <div className="p-6 border-b">
//               <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
//                  <Skeleton className="h-5 w-36" />
//               </h3>
//               <div className="space-y-3">
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-6 w-full mb-2" />
//                  <Skeleton className="h-6 w-3/4 mb-2" />
//               </div>
//             </div>
//              <div className="p-6">
//                <Skeleton className="h-6 w-48 mb-2" />
//                <Skeleton className="h-12 w-full rounded-lg" />
//             </div>
//           </div>
//           <Skeleton className="h-12 w-full rounded-xl mt-6" />
//         </div>
//       </div>
//     );
//   }

//   // --- Error State (Post-Loading) ---
//   // Display specific errors encountered during loading or if critical data is missing after loading finished
//   if (error && !isSubmitting) {
//     return (
//       <div className="min-h-screen">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader title="Send Money" currentStep={3} steps={steps} />

//         {/* Card container with subtle tint and border */}
//         <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//           {/* Icon */}
//           <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
//             <FiAlertTriangle
//               className="lg:size-8 size-6 mx-auto text-white dark:text-red-400"
//               aria-hidden="true"
//             />
//           </div>

//           <h2 className="lg:text-3xl text-2xl font-medium mt-1 text-red-800 dark:text-red-200 ">
//             Something went wrong
//           </h2>

//           <p className="text-red-700 dark:text-red-300/90 max-w-lg mx-auto">
//             {error || "An unexpected error occurred. Please try again."}
//           </p>

//           {balanceId && recipientId ? (
//             <Link
//               href={getPreviousStepLink()}
//               className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear" // Adjusted button color to match theme
//             >
//               <FiArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
//               Go back and try again
//             </Link>
//           ) : (
//             <Link
//               href="/dashboard/balances" // Fallback link
//               className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear" // Neutral button for fallback
//             >
//               <FiArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
//               Return to Balances
//             </Link>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // --- Data Missing State (Post-Loading, No Error Yet) ---
//   // This state should ideally be caught by the error state above if loading failed,
//   // but as a fallback, check if data is null after loading is complete.
//   if (!summary || !recipientDetails) {
//      // This condition should theoretically not be hit if error handling in useEffect is correct,
//      // but kept as a safeguard.
//      console.warn("Review page rendered without summary or recipient details after loading.");
//      return (
//       <div className="min-h-screen">
//         {/* Make sure DashboardHeaderProps includes totalSteps */}
//         <DashboardHeader
//           title="Send Money"
//           currentStep={3}
//           steps={steps}
//         />
//         <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//           <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
//             <FiAlertTriangle className="lg:size-8 size-6 mx-auto text-neutral-900 dark:text-primary" />
//           </div>
//             <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white mt-1">Missing Information</h2>
//             <p className="text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//               Could not load the necessary transfer details. Please start the process again.
//             </p>
//             <Link
//                 // Use balanceId if available for a more specific starting point
//                 href={balanceId ? `/dashboard/balances/${balanceId}/send/select-recipient` : '/dashboard/balances'}
//                 className="inline-flex justify-center items-center px-8 py-3 bg-primary hover:bg-primaryhover text-neutral-900 font-medium rounded-full sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
//             >
//               Start Transfer Again
//             </Link>
//           </div>

//       </div>
//      );
//   }

//   // --- Main Render ---
//   return (
//     <div className="min-h-screen ">
//       {/* Make sure DashboardHeaderProps includes totalSteps */}
//       <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
//       <div className="mx-auto lg:max-w-2xl mt-5">
//         <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center text-left capitalize font-semibold text-mainheading pb-4 dark:text-white">
//           Review details of your transfer
//         </h1>

//         {/* Submission Error Display */}
//         {error && isSubmitting && (
//           <div className="bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-xl p-4 flex items-center gap-4 mb-3">
//             <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//               <FiAlertTriangle size={20} className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//             </div>
//             <div>
//               <h3 className="font-medium text-red-800 dark:text-red-200 text-base">
//                 Transfer Failed
//               </h3>
//               <p className="text-red-700 dark:text-red-300/90">
//                 {error}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Main Review Card */}
//         <div className="bg-white dark:bg-background border rounded-xl overflow-hidden mb-6">
//           {/* Summary Header */}
//           <div className="px-6 py-4 bg-lightborder dark:bg-primarybox">
//             <h2 className="font-medium text-lg text-mainheading dark:text-white">
//               Transaction Summary
//             </h2>
//           </div>

//           {/* Transfer Details Section */}
//           <div className="sm:p-6 p-4 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-white uppercase tracking-wider mb-4">
//               Transfer details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">
//                   You send exactly
//                 </span>
//                 <span className="font-semibold text-mainheading dark:text-white">
//                   {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 dark:text-gray-300">
//                   Guaranteed rate
//                 </span>
//                 <span className="font-semibold p-2 px-5 rounded-full bg-primary text-mainheading cursor-default">
//                   1 {summary.sendCurrencyCode} =
//                   {summary.exchangeRate.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2 rounded-md">
//                 <span className="text-gray-500 dark:text-gray-300 capitalize">
//                   {recipientDetails.nickname ||
//                     recipientDetails.accountHolderName}
//                   gets
//                 </span>
//                 <span className="font-medium text-sm p-1.5 px-4 rounded-full bg-lightgray dark:bg-primarybox text-mainheading dark:text-white cursor-default">
//                   {summary.receiveAmount.toFixed(2)}
//                   {summary.receiveCurrencyCode}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Recipient Details Section */}
//           <div className="sm:p-6 p-4 border-b">
//             <h3 className="text-sm font-medium text-mainheading dark:text-white uppercase tracking-wider mb-4">
//               Recipient details
//             </h3>
//             <div className="space-y-3">
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">
//                   Account holder
//                 </span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                   {recipientDetails.accountHolderName}
//                 </span>
//               </div>
//               {/* Conditionally render IFSC if it exists */}
//               {recipientDetails.ifscCode && (
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     IFSC code
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right">
//                     {recipientDetails.ifscCode}
//                   </span>
//                 </div>
//               )}
//               <div className="grid grid-cols-2 gap-2">
//                 <span className="text-gray-500 dark:text-gray-300">
//                   Account number
//                 </span>
//                 <span className="font-semibold text-mainheading dark:text-white text-right">
//                   {recipientDetails.accountNumber}
//                 </span>
//               </div>
//               {/* Conditionally render Bank Name if it exists */}
//               {recipientDetails.bankName && (
//                 <div className="grid grid-cols-2 gap-2">
//                   <span className="text-gray-500 dark:text-gray-300">
//                     Bank name
//                   </span>
//                   <span className="font-semibold text-mainheading dark:text-white text-right capitalize">
//                     {recipientDetails.bankName}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Reason Section (Conditional) */}
//           {summary.reason && (
//             <div className="sm:p-6 p-4 border-b ">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">
//                 Reason for transfer
//               </h3>
//               <p className="font-medium text-mainheading dark:text-white p-2.5 bg-lightgray dark:bg-primarybox rounded-md">
//                 {summary.reason}
//               </p>
//             </div>
//           )}

//           {/* Reference Input Section */}
//           <div className="sm:p-6 p-4">
//             <label
//               htmlFor="reference"
//               className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
//             >
//               Reference for recipient (optional)
//             </label>
//             <input
//               type="text"
//               id="reference"
//               value={userReference}
//               onChange={(e) => setUserReference(e.target.value)}
//               maxLength={35}
//               placeholder="e.g., Invoice payment, Gift"
//               className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]"
//               aria-label="Reference for recipient (optional)" // Enhanced label
//             />
//             <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
//               Max 35 characters. This may appear on the recipient's statement.
//             </p>
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmAndSend}
//           // Disable button if submitting, or if required data isn't loaded (double check)
//           disabled={isSubmitting || !summary || !recipientDetails}
//           className="flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//           data-testid="confirm-send-button"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 2V6"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12 18V22"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M4.93 4.93L7.76 7.76"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M16.24 16.24L19.07 19.07"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 12H6"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M18 12H22"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M4.93 19.07L7.76 16.24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M16.24 7.76L19.07 4.93"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span>Processing...</span>
//             </>
//           ) : (
//             <>
//               <FiCheckCircle className="mr-2" size={20} />
//               Confirm and send
//             </>
//           )}
//         </button>

//         {/* Go Back Link */}
//         <div className="mt-3">
//           <Link
//             href={getPreviousStepLink()} // Uses the dynamic link function
//             className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
//           >
//             <FiArrowLeft className="mr-1" /> Go back
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewSendPage;

"use client";
import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { useAuth } from "../../../../../contexts/AuthContext";
import axios, { AxiosError } from "axios";
import apiConfig from "../../../../../config/apiConfig";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from "../../../../components/layout/DashboardHeader";

// Import react-toastify and CustomToast
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Adjust the path to your CustomToast component if necessary
import CustomToast, {
  CustomToastProps,
} from "../../../../../components/CustomToast";
// Assuming CustomToast is in frontend/src/app/components/CustomToast.tsx
// If it's in frontend/src/components/CustomToast.tsx, then it would be:
// import CustomToast, { CustomToastProps } from "../../../../../components/CustomToast";

axios.defaults.baseURL = apiConfig.baseUrl;

// Interfaces
interface SendSummary {
  userId?: string;
  sourceAccountId: string;
  recipientId: string;
  sendAmount: number;
  receiveAmount: number;
  sendCurrencyCode: string;
  receiveCurrencyCode: string;
  exchangeRate: number;
  availableBalance?: number;
  reason?: string;
}

interface RecipientDetails {
  _id: string;
  accountHolderName: string;
  ifscCode?: string;
  accountNumber: string;
  bankName?: string;
  address?: string;
  nickname?: string;
  currency: { code: string };
}

interface ApiErrorData {
  message?: string;
}

// Component Definition
const steps = ["Recipient", "Amount", "Review", "Pay"];

const ReviewSendPage = () => {
  // Hooks
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const balanceId =
    typeof params.balanceId === "string" ? params.balanceId : undefined;
  const recipientId = searchParams.get("recipientId");
  const { token } = useAuth();

  // State
  const [summary, setSummary] = useState<SendSummary | null>(null);
  const [recipientDetails, setRecipientDetails] =
    useState<RecipientDetails | null>(null);
  const [userReference, setUserReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null); // For persistent on-page errors
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // For ToastContainer styling

  // --- Mobile Detection Effect (for ToastContainer) ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        case "default":
        default:
          progressClassName = "toast-progress-default";
          break;
      }
      reactToastifyToast(
        <CustomToast message={message} type={effectiveType} />,
        {
          progressClassName: progressClassName,
          type: effectiveType as TypeOptions,
          icon: false,
          ...toastSpecificOptions,
        }
      );
    },
    []
  );

  // --- ToastContainer Props and Style ---
  const toastContainerProps: ToastContainerProps = {
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
    if (isMobile) {
      return {
        ...baseStyle,
        top: "1rem",
        left: "1rem",
        right: "1rem",
        width: "auto",
      };
    } else {
      return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
    }
  };

  // Previous Step Link Logic
  const getPreviousStepLink = () => {
    if (!balanceId || !recipientId) {
      return "/dashboard";
    }
    const needsReason = summary?.receiveCurrencyCode === "INR"; // Check summary if available
    const baseLink = `/dashboard/balances/${balanceId}/send`;
    if (needsReason) {
      return `${baseLink}/reason?recipientId=${recipientId}`;
    } else {
      return `${baseLink}/amount?recipientId=${recipientId}`;
    }
  };

  // Load Summary and Fetch Recipient
  useEffect(() => {
    if (!balanceId) {
      setError("Balance ID is missing from the URL."); // Set persistent error
      showToast("Balance ID is missing. Please go back.", "error");
      setIsLoadingDetails(false);
      return;
    }

    const storedSummary = localStorage.getItem("sendTransferSummary");
    let parsedSummary: SendSummary | null = null;

    if (storedSummary) {
      try {
        parsedSummary = JSON.parse(storedSummary) as SendSummary;
        if (
          !parsedSummary?.sourceAccountId ||
          !parsedSummary?.recipientId ||
          !parsedSummary?.sendAmount ||
          !parsedSummary?.receiveAmount ||
          !parsedSummary?.sendCurrencyCode ||
          !parsedSummary?.receiveCurrencyCode
        ) {
          throw new Error("Stored summary data is incomplete or invalid.");
        }
        setSummary(parsedSummary);
      } catch (e) {
        console.error("Failed to parse or validate stored summary:", e);
        setError(
          "Invalid transfer details found. Please start the transfer again."
        );
        showToast("Invalid transfer details. Please restart.", "error");
        setIsLoadingDetails(false);
        localStorage.removeItem("sendTransferSummary");
        return;
      }
    } else {
      setError(
        "Transfer details are missing. Please start the transfer again."
      );
      showToast("Transfer details missing. Please restart.", "error");
      setIsLoadingDetails(false);
      return;
    }

    const fetchRecipient = async () => {
      setError(null); // Clear previous on-page errors
      if (!recipientId || !token) {
        setError("Recipient ID or authentication token is missing.");
        showToast("Recipient ID or token missing.", "error");
        setIsLoadingDetails(false);
        return;
      }
      try {
        const response = await axios.get<RecipientDetails>(
          `/recipients/${recipientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecipientDetails(response.data);
      } catch (err: unknown) {
        console.error("Error fetching recipient details for review:", err);
        const apiErrorMsg =
          (axios.isAxiosError(err) &&
            (err as AxiosError<ApiErrorData>).response?.data?.message) ||
          (err instanceof Error
            ? err.message
            : "Failed to load recipient details.");
        setError(apiErrorMsg); // Set persistent error for on-page display
        showToast(apiErrorMsg, "error");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (parsedSummary) {
      fetchRecipient();
    }
  }, [recipientId, token, balanceId, showToast, router]); // Added showToast & router

  // Confirm and Send Handler
  const handleConfirmAndSend = async () => {
    if (!summary || !recipientDetails || !token) {
      showToast(
        "Cannot proceed. Missing critical transfer or recipient information, or authentication token.",
        "error"
      );
      setError(
        "Cannot proceed. Missing critical transfer or recipient information, or authentication token."
      ); // For on-page display
      setIsSubmitting(false);
      return;
    }

    if (balanceId !== summary.sourceAccountId) {
      showToast(
        "Mismatch between current balance and transfer details. Please restart.",
        "error"
      );
      setError(
        "Mismatch between current balance and transfer details. Please restart."
      ); // For on-page display
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setError(null); // Clear previous on-page submission errors

    try {
      const payload = {
        sourceAccountId: summary.sourceAccountId,
        recipientId: summary.recipientId,
        sendAmount: summary.sendAmount,
        receiveAmount: summary.receiveAmount,
        sendCurrencyCode: summary.sendCurrencyCode,
        receiveCurrencyCode: summary.receiveCurrencyCode,
        exchangeRate: summary.exchangeRate,
        reason: summary.reason,
        reference: userReference.trim() || undefined,
      };

      const response = await axios.post<{ _id?: string }>(
        "/transfers/execute",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("Transfer execution response:", response.data);
      localStorage.removeItem("sendTransferSummary");
      const transferId = response.data?._id ?? "";

      showToast("Transfer initiated successfully!", "success", {
        onClose: () => {
          router.push(
            `/dashboard/transactions/${transferId}?transferSuccess=true&transferId=${transferId}`
          );
        },
      });
      // setIsSubmitting will remain true until navigation or further error
    } catch (err: unknown) {
      console.error("Error executing transfer:", err);
      const apiErrorMsg =
        (axios.isAxiosError(err) &&
          (err as AxiosError<ApiErrorData>).response?.data?.message) ||
        (err instanceof Error
          ? err.message
          : "Failed to send money. Please try again later.");
      setError(apiErrorMsg); // Set error for on-page display
      showToast(apiErrorMsg, "error");
      setIsSubmitting(false); // Reset submitting state on error
    }
  };

  // --- Loading State ---
  if (isLoadingDetails) {
    return (
      <div className="min-h-screen relative">
        {/* Added relative for ToastContainer */}
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="bg-background border rounded-xl overflow-hidden mb-6">
            <div className="px-6 py-4 bg-primarybox/30">
              <Skeleton className="h-7 w-48" />
            </div>
            <div className="p-6 border-b">
              <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
                <Skeleton className="h-5 w-32" />
              </h3>
              <div className="space-y-3">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
              </div>
            </div>
            <div className="p-6 border-b">
              <h3 className="text-sm font-medium text-mainheading dark:text-gray-500 uppercase tracking-wider mb-4">
                <Skeleton className="h-5 w-36" />
              </h3>
              <div className="space-y-3">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
              </div>
            </div>
            <div className="p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-xl mt-6" />
        </div>
      </div>
    );
  }

  // --- Error State (Post-Loading, for critical loading errors) ---
  // This error state is primarily for when loading fails and we cannot proceed to show review details.
  // Submission errors are handled within the main render.
  if (error && !summary && !recipientDetails && !isSubmitting) {
    // Check if critical data is missing due to error
    return (
      <div className="min-h-screen relative">
        {/* Added relative for ToastContainer */}
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="bg-red-900/25 border border-red-500 rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-red-600 dark:bg-transparent dark:bg-gradient-to-t dark:from-red-600 rounded-full mb-2">
              <FiAlertTriangle
                className="lg:size-8 size-6 mx-auto text-white"
                aria-hidden="true"
              />
            </div>
            <h2 className="lg:text-3xl text-2xl font-medium mt-1 text-red-100 ">
              Something went wrong
            </h2>
            <p className="text-red-300/90 max-w-lg mx-auto">
              {error || "An unexpected error occurred. Please try again."}
            </p>
            {balanceId && recipientId ? (
              <Link
                href={getPreviousStepLink()}
                className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear"
              >
                <FiArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                Go back and try again
              </Link>
            ) : (
              <Link
                href="/dashboard/balances"
                className="inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700 font-medium rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear"
              >
                <FiArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                Return to Balances
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Data Missing State (Post-Loading, No specific error yet but data is null) ---
  if (!summary || !recipientDetails) {
    console.warn(
      "Review page rendered without summary or recipient details after loading."
    );
    // This usually indicates an issue caught by the error state, but as a fallback.
    // The useEffect should have set an error or redirected if data couldn't be loaded.
    // If we reach here, it implies a logic flaw or an uncaught edge case.
    // A generic "missing info" message is appropriate.
    return (
      <div className="min-h-screen relative">
        {/* Added relative for ToastContainer */}
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
            <div className="lg:size-16 size-14 flex items-center justify-center bg-primary dark:bg-transparent dark:bg-gradient-to-t dark:from-primary rounded-full mb-2">
              <FiAlertTriangle className="lg:size-8 size-6 mx-auto text-mainheading" />
            </div>
            <h2 className="lg:text-3xl text-2xl font-medium text-mainheadingWhite mt-1">
              Missing Information
            </h2>
            <p className="text-subheadingWhite max-w-lg mx-auto">
              Could not load the necessary transfer details. Please start the
              process again.
            </p>
            <Link
              href={
                balanceId
                  ? `/dashboard/balances/${balanceId}/send/select-recipient`
                  : "/dashboard/balances"
              }
              className="inline-flex justify-center items-center px-8 py-3 bg-primary hover:bg-primaryhover text-mainheading font-medium rounded-full sm:w-auto w-full transition-all duration-75 ease-linear cursor-pointer"
            >
              Start Transfer Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen relative">
      {/* Added relative for ToastContainer */}
      <ToastContainer
        {...toastContainerProps}
        style={getToastContainerStyle()}
      />
      <DashboardHeader title="Send Money" currentStep={3} steps={steps} />
      <div className="mx-auto lg:max-w-2xl mt-5">
        {/* Added px-4 for container padding */}
        <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center text-left capitalize font-semibold text-mainheadingWhite pb-4">
          Review details of your transfer
        </h1>
        {/* Submission Error Display - This is for errors during the 'Confirm and Send' action */}
        {error && isSubmitting && (
          <div className="bg-red-900/25 border border-red-500 rounded-xl p-4 flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
              <FiAlertTriangle
                size={20}
                className="text-red-500 size-5 sm:size-6 flex-shrink-0"
              />
            </div>
            <div>
              <h3 className="font-medium text-red-200 text-base">
                Transfer Failed
              </h3>
              <p className="text-red-300/90">
                {error}
                {/* This 'error' state is specifically for submission errors now */}
              </p>
            </div>
          </div>
        )}

        <div className="bg-background border rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 bg-primarybox">
            <h2 className="font-medium text-lg text-mainheadingWhite">
              Transaction Summary
            </h2>
          </div>
          <div className="sm:p-6 p-4 border-b">
            <h3 className="text-sm font-medium text-mainheadingWhite uppercase tracking-wider mb-4">
              Transfer details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-subheadingWhite">
                  You send exactly
                </span>
                <span className="font-semibold text-mainheadingWhite">
                  {summary.sendAmount.toFixed(2)} {summary.sendCurrencyCode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-subheadingWhite">
                  Guaranteed rate
                </span>
                <span className="font-semibold p-2 px-4 rounded-full bg-primary text-mainheading cursor-default">
                  1 {summary.sendCurrencyCode} =
                  {summary.exchangeRate.toFixed(2)}
                  {summary.receiveCurrencyCode}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 rounded-md">
                <span className="text-subheadingWhite capitalize">
                  {recipientDetails.nickname ||
                    recipientDetails.accountHolderName}
                  gets
                </span>
                <span className="font-medium text-sm p-1.5 px-4 rounded-full bg-primarybox text-mainheadingWhite cursor-default">
                  {summary.receiveAmount.toFixed(2)}
                  {summary.receiveCurrencyCode}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:p-6 p-4 border-b">
            <h3 className="text-sm font-medium text-mainheadingWhite uppercase tracking-wider mb-4">
              Recipient details
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-subheadingWhite">
                  Account holder
                </span>
                <span className="font-semibold text-mainheadingWhite text-right capitalize">
                  {recipientDetails.accountHolderName}
                </span>
              </div>
              {recipientDetails.ifscCode && (
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-subheadingWhite">
                    IFSC code
                  </span>
                  <span className="font-semibold text-mainheadingWhite text-right">
                    {recipientDetails.ifscCode}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <span className="text-subheadingWhite">
                  Account number
                </span>
                <span className="font-semibold text-mainheadingWhite text-right">
                  {recipientDetails.accountNumber}
                </span>
              </div>
              {recipientDetails.bankName && (
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-subheadingWhite">
                    Bank name
                  </span>
                  <span className="font-semibold text-mainheadingWhite text-right capitalize">
                    {recipientDetails.bankName}
                  </span>
                </div>
              )}
            </div>
          </div>
          {summary.reason && (
            <div className="sm:p-6 p-4 border-b ">
              <h3 className="text-sm font-medium text-mainheadingWhite uppercase tracking-wider mb-2">
                Reason for transfer
              </h3>
              <p className="font-medium text-mainheadingWhite dark:text-white p-2.5 bg-primarybox rounded-md">
                {summary.reason}
              </p>
            </div>
          )}
          <div className="sm:p-6 p-4">
            <label
              htmlFor="reference"
              className="text-mainheadingWhite block capitalize text-sm lg:text-base mb-1"
            >
              Reference for recipient (optional)
            </label>
            <input
              type="text"
              id="reference"
              value={userReference}
              onChange={(e) => setUserReference(e.target.value)}
              maxLength={35}
              placeholder="e.g., Invoice payment, Gift"
              className="w-full rounded-2xl h-14.5 p-3 focus:outline-0 transition-all duration-75 ease-in-out placeholder:text-gray-400 border border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white bg-primarybox/50"
              aria-label="Reference for recipient (optional)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
              Max 35 characters. This may appear on the recipient's statement.
            </p>
          </div>
        </div>
        <button
          onClick={handleConfirmAndSend}
          disabled={isSubmitting || !summary || !recipientDetails}
          className="flex items-center justify-center bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="confirm-send-button"
        >
          {isSubmitting ? (
            <>
              <svg
                /* SVG spinner */ className="h-5 w-5 text-mainheading animate-spin mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FiCheckCircle className="mr-2" size={20} />
              Confirm and send
            </>
          )}
        </button>
        <div className="mt-3 mb-8">
          {/* Added mb-8 for spacing */}
          <Link
            href={getPreviousStepLink()}
            className="inline-flex items-center justify-center bg-primarybox hover:bg-secondarybox text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear"
          >
            <FiArrowLeft className="mr-1" /> Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewSendPage;
