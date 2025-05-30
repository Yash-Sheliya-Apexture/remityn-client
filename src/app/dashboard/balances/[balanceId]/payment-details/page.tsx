// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: any; // Define more specific type if needed
//     payInCurrency: any;   // Define more specific type if needed
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string; // Mark as optional
//         iban?: string;      // Mark as optional
//         bicSwift?: string;  // Mark as optional
//         bankAddress?: string;// Mark as optional
//     };
//     createdAt: string;
//     __v: number;
// }

// const PaymentDetailsPage = () => {
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId'); // Get paymentId from query parameter
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null); // Use interface
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 if (!paymentId) {
//                     setError("Payment ID is missing.");
//                     setIsLoading(false);
//                     return;
//                 }
//                 const response = await axios.get(`/payments/${paymentId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPaymentDetails(response.data as PaymentDetails); // Type assertion
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load payment details');
//                 setIsLoading(false);
//                 console.error("Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     router.push('/dashboard'); // Redirect if payment not found
//                 }
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     if (isLoading) {
//         return <div>Loading payment details...</div>;
//     }

//     if (error || !paymentDetails) {
//         return <div className="text-red-500">Error: {error || "Payment details not found."}</div>;
//     }

//     const payInCurrencyCode = paymentDetails.payInCurrency.code;
//     const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </button>

//             <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
//                 <h2 className="text-xl font-semibold mb-6">Use your bank to make a payment to Wise</h2>
//                 <p className="text-gray-700 mb-4">Make a European (SEPA) payment — not an international one — using the details below.</p>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Details you’ll need to make this transfer</h3>
//                     <div className="grid grid-cols-1 gap-4">
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Payee name</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.payeeName || 'Wise'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Reference code</p>
//                                 <p className="font-semibold">{paymentDetails.referenceCode}</p>
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">IBAN</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.iban || 'IBAN Placeholder'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold">{paymentDetails.bankDetails?.bicSwift || 'BIC/SWIFT Placeholder'}</p> {/* Optional chaining */}
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Amount to send ({payInCurrencyCode})</p>
//                                 <p className="font-semibold">{amountToPay} {payInCurrencyCode}</p>
//                             </div>
//                             <button className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Our bank’s address</h3>
//                     <div className="bg-gray-100 p-4 rounded-md">
//                         <p className="text-gray-700 whitespace-pre-line">{paymentDetails.bankDetails?.bankAddress || 'Bank Address Placeholder'}</p> {/* Optional chaining */}
//                     </div>
//                 </div>

//                 <div className="mb-6 flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-500">Need more help?</span>
//                         <a href="#" className="text-green-500 hover:underline text-sm">Download PDF</a> {/* Placeholder for PDF download */}
//                     </div>
//                     <button className="text-green-500 hover:underline text-sm">Download PDF</button> {/* Another placeholder */}
//                 </div>

//                 <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
//                     I’ve made my bank transfer
//                 </button>
//                 <button className="w-full text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300">
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../hooks/useAuth';
// import axios from 'axios';
// import apiConfig from '../../../../config/apiConfig';

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: any;
//     payInCurrency: any;
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     __v: number;
// }

// const PaymentDetailsPage = () => {
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId');
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { token } = useAuth();

//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 if (!paymentId) {
//                     setError("Payment ID is missing.");
//                     setIsLoading(false);
//                     return;
//                 }
//                 const response = await axios.get(`/payments/${paymentId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setPaymentDetails(response.data as PaymentDetails);
//                 setIsLoading(false);
//             } catch (err: any) {
//                 setError(err.response?.data?.message || 'Failed to load payment details');
//                 setIsLoading(false);
//                 console.error("Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     router.push('/dashboard');
//                 }
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     if (isLoading) {
//         return <div>Loading payment details...</div>;
//     }

//     if (error || !paymentDetails) {
//         return <div className="text-red-500">Error: {error || "Payment details not found."}</div>;
//     }

//     const payInCurrencyCode = paymentDetails.payInCurrency.code;
//     const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);
//     const bankDetails = paymentDetails.bankDetails || {};

//     const handleCopyToClipboard = (text: string, fieldName: string) => {
//         navigator.clipboard.writeText(text).then(() => {
//             alert(`${fieldName} copied to clipboard!`); // Simple alert for feedback
//         }).catch(err => {
//             console.error('Failed to copy text: ', err);
//             alert(`Failed to copy ${fieldName}. Please copy manually.`);
//         });
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <button onClick={() => router.back()} className="mb-4 flex items-center gap-2">
//                 <IoIosArrowBack size={20} /> Pay another way
//             </button>

//             <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
//                 <h2 className="text-xl font-semibold mb-6">Use your bank to make a payment to Wise</h2>
//                 <p className="text-gray-700 mb-4">Make a European (SEPA) payment — not an international one — using the details below.</p>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Details you’ll need to make this transfer</h3>
//                     <div className="grid grid-cols-1 gap-4">
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Payee name</p>
//                                 <p className="font-semibold">{bankDetails.payeeName || 'Wise'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise', 'Payee name')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Reference code</p>
//                                 <p className="font-semibold">{paymentDetails.referenceCode}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(paymentDetails.referenceCode, 'Reference code')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">IBAN</p>
//                                 <p className="font-semibold">{bankDetails.iban || 'IBAN Placeholder'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.iban || 'IBAN Placeholder', 'IBAN')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold">{bankDetails.bicSwift || 'BIC/SWIFT Placeholder'}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(bankDetails.bicSwift || 'BIC/SWIFT Placeholder', 'BIC/SWIFT')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
//                             <div>
//                                 <p className="text-sm text-gray-500">Amount to send ({payInCurrencyCode})</p>
//                                 <p className="font-semibold">{amountToPay} {payInCurrencyCode}</p>
//                             </div>
//                             <button onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')} className="text-green-500 hover:underline text-sm">Copy</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-3">Our bank’s address</h3>
//                     <div className="bg-gray-100 p-4 rounded-md whitespace-pre-line">
//                         {bankDetails.bankAddress || 'Bank Address Placeholder'}
//                     </div>
//                 </div>

//                 <div className="mb-6 flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-500">Need more help?</span>
//                         <a href="#" className="text-green-500 hover:underline text-sm">Download PDF</a>
//                     </div>
//                     <button className="text-green-500 hover:underline text-sm">Download PDF</button>
//                 </div>

//                 <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
//                     I’ve made my bank transfer
//                 </button>
//                 <button className="w-full text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-300">
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useAuth } from '../../../../hooks/useAuth'; // Adjust path as needed
// import paymentService from '../../../../services/payment'; // Adjust path as needed
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path as needed
// import { Button } from '@/components/ui/button'; // Adjust path as needed

// // Define the structure of the Payment Details expected from the API
// interface PaymentDetails {
//     _id: string;
//     user: string; // Assuming user ID string
//     balanceCurrency: { _id: string; code: string; /* other fields */ };
//     payInCurrency: { _id: string; code: string; /* other fields */ };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt?: string; // Optional
//     __v?: number; // Optional
// }

// // Define the structure for the route parameters
// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// const PaymentDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { token } = useAuth();

//     // --- State ---
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // Extract IDs from route/query params
//     const { balanceId } = params; // Get balanceId from route params
//     const paymentId = searchParams.get('paymentId'); // Get paymentId from query params

//     // --- Data Fetching Effect ---
//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId); // Debug log

//             if (!paymentId) {
//                 setError("Payment ID is missing from URL.");
//                 setIsLoading(false);
//                 console.error("PaymentDetailsPage: No paymentId found in query parameters.");
//                 router.push('/dashboard/transactions'); // Redirect if no ID
//                 return;
//             }
//             if (!token) {
//                  setError("Authentication required.");
//                  setIsLoading(false);
//                  router.push('/auth/login'); // Redirect to login if no token
//                  return;
//             }

//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: any) {
//                 const errMsg = err.response?.data?.message || err.message || 'Failed to load payment details';
//                 setError(errMsg);
//                 console.error("PaymentDetailsPage: Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     setError(`Payment with ID ${paymentId} not found or you don't have access.`);
//                 } else if (err.response?.status === 401 || err.response?.status === 403) {
//                      setError("Unauthorized to view this payment.");
//                      // Consider redirecting if unauthorized
//                      // router.push('/dashboard');
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]); // Dependencies for the effect

//     // --- Utility Functions ---
//     const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
//          if (!text) {
//              console.warn(`PaymentDetailsPage: Attempted to copy empty field: ${fieldName}`);
//              // Optionally provide user feedback (e.g., toast notification)
//              return;
//          }
//         navigator.clipboard.writeText(text).then(() => {
//             console.log(`PaymentDetailsPage: ${fieldName} copied.`);
//             // Optionally provide user feedback
//         }).catch(err => {
//             console.error('PaymentDetailsPage: Failed to copy text: ', err);
//             // Inform user about the failure
//             alert(`Failed to copy ${fieldName}. Please copy manually.`);
//         });
//     };

//     // --- Action Handlers ---
//     const handleIvePaid = async () => {
//         console.log("PaymentDetailsPage: handleIvePaid triggered");
//         setError(null); // Clear previous errors

//         if (!paymentId || !token || !balanceId) {
//             const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
//             const errorMsg = `Cannot proceed: Missing ${missing}.`;
//             setError(errorMsg);
//             console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
//             return;
//         }

//         setIsSubmitting(true);
//         console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

//         try {
//             // Optional: Attempt to update backend status first
//             try {
//                 console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
//                 await paymentService.confirmUserTransfer(paymentId, token);
//                 console.log("PaymentDetailsPage: confirmUserTransfer successful (status updated to 'in progress')");
//             } catch (confirmErr: any) {
//                  console.error("PaymentDetailsPage: Non-critical error: Failed to update payment status via confirmUserTransfer:", confirmErr.response?.data?.message || confirmErr.message);
//                  // Continue with navigation even if status update fails
//             }

//             // Navigate to Success Page
//             const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//             console.log("PaymentDetailsPage: Navigating to success page:", successUrl);
//             router.push(successUrl);
//             // Note: State update (setIsSubmitting(false)) might not run if navigation is immediate

//         } catch (err: any) {
//             // This catch handles unexpected errors before or during navigation attempt
//             const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred while trying to proceed.';
//             setError(`Failed to proceed: ${errMsg}`);
//             console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
//             setIsSubmitting(false); // Ensure loading stops on failure *before* navigation
//         }
//     };

//     const handlePayLater = () => {
//         console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/tasks");
//         // Navigate specifically to the Tasks page where the pending payment should appear
//         router.push('/dashboard/transactions');
//     };
//     // --- END Action Handlers ---

//     // --- Render Logic ---

//     // Loading State
//     if (isLoading) {
//         return (
//              <div className="container mx-auto px-4 py-8 animate-pulse">
//                  <Skeleton className="h-8 w-32 mb-6" />
//                  <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto">
//                      <Skeleton className="h-6 w-3/4 mb-6" />
//                      <Skeleton className="h-4 w-full mb-4" />
//                      <Skeleton className="h-6 w-4/5 mb-4" />
//                      <div className="space-y-3 mb-6">
//                           <Skeleton className="h-16 w-full rounded-md" />
//                           <Skeleton className="h-16 w-full rounded-md" />
//                           <Skeleton className="h-16 w-full rounded-md" />
//                           <Skeleton className="h-16 w-full rounded-md" />
//                           <Skeleton className="h-16 w-full rounded-md" />
//                      </div>
//                       <Skeleton className="h-6 w-1/2 mb-3" />
//                       <Skeleton className="h-20 w-full rounded-md mb-6" />
//                       <div className="space-y-3 mt-6">
//                          <Skeleton className="h-12 w-full rounded-md" />
//                          <Skeleton className="h-12 w-full rounded-md" />
//                       </div>
//                  </div>
//              </div>
//          );
//     }

//     // Error State (if loading finished but error occurred preventing details display)
//      if (!isLoading && error && !paymentDetails) {
//          return (
//              <div className="container mx-auto px-4 py-8 text-center">
//                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-lg mx-auto">
//                      <p className="font-semibold">Error Loading Payment Details</p>
//                      <p className="text-sm mt-1">{error}</p>
//                  </div>
//                   <Button onClick={() => router.back()} variant="outline" className="mt-6">
//                      Go Back
//                  </Button>
//              </div>
//          );
//      }

//     // Not Found State (if loading finished, no specific error, but details are null)
//     if (!isLoading && !error && !paymentDetails) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//                 <p>Payment details could not be found.</p>
//                 <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">
//                      View Transactions
//                  </Button>
//             </div>
//         );
//     }

//     // --- Render Payment Details (paymentDetails is valid) ---
//     const payInCurrencyCode = paymentDetails.payInCurrency?.code || 'N/A';
//     const amountToPay = paymentDetails.amountToPay ? parseFloat(paymentDetails.amountToPay.toString()).toFixed(2) : 'N/A';
//     const bankDetails = paymentDetails.bankDetails || {};
//     const referenceCode = paymentDetails.referenceCode || 'N/A';

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Optional: Back link */}
//             {/* <Button variant="link" onClick={() => router.back()} className="mb-4 px-0 text-gray-600 hover:text-gray-800">
//                 <IoIosArrowBack size={18} className="mr-1" /> Go Back
//             </Button> */}

//             <div className="bg-white rounded-2xl p-6 shadow-md max-w-lg mx-auto border border-gray-200">
//                 <h2 className="text-xl font-semibold mb-2 text-gray-800">Pay using Bank Transfer</h2>
//                 <p className="text-gray-600 mb-6 text-sm">Make a standard bank transfer from your online banking using these details. Please ensure the <strong className='text-gray-700'>Reference code</strong> is included.</p>

//                 {/* Bank Details Section */}
//                 <div className="mb-6">
//                     <h3 className="text-base font-semibold mb-3 text-gray-700">Recipient Details (Wise)</h3>
//                     <div className="space-y-3">
//                         {/* Payee Name */}
//                         <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
//                             <div>
//                                 <p className="text-xs text-gray-500 mb-0.5">Payee name</p>
//                                 <p className="font-semibold text-gray-800">{bankDetails.payeeName || 'Wise Europe SA'}</p>
//                             </div>
//                             <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise Europe SA', 'Payee name')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
//                         </div>
//                         {/* Reference */}
//                         <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-md flex justify-between items-center text-sm">
//                             <div>
//                                 <p className="text-xs text-yellow-800 font-medium mb-0.5">Reference code (Include this)</p>
//                                 <p className="font-semibold text-gray-900 font-mono">{referenceCode}</p>
//                             </div>
//                              <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(referenceCode, 'Reference code')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
//                         </div>
//                          {/* IBAN */}
//                         <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
//                             <div>
//                                 <p className="text-xs text-gray-500 mb-0.5">IBAN</p>
//                                 <p className="font-semibold text-gray-800 font-mono break-all">{bankDetails.iban || 'N/A'}</p>
//                             </div>
//                              <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.iban, 'IBAN')} className="text-green-600 hover:text-green-700 px-2 h-auto ml-2">Copy</Button>
//                         </div>
//                          {/* BIC */}
//                         <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
//                             <div>
//                                 <p className="text-xs text-gray-500 mb-0.5">Bank code (BIC/SWIFT)</p>
//                                 <p className="font-semibold text-gray-800 font-mono">{bankDetails.bicSwift || 'N/A'}</p>
//                             </div>
//                             <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(bankDetails.bicSwift, 'BIC/SWIFT')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
//                         </div>
//                          {/* Amount */}
//                         <div className="bg-gray-50 border border-gray-200 p-3 rounded-md flex justify-between items-center text-sm">
//                             <div>
//                                 <p className="text-xs text-gray-500 mb-0.5">Amount to send ({payInCurrencyCode})</p>
//                                 <p className="font-semibold text-gray-800">{amountToPay} {payInCurrencyCode}</p>
//                             </div>
//                             <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')} className="text-green-600 hover:text-green-700 px-2 h-auto">Copy</Button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bank Address */}
//                 <div className="mb-6">
//                     <h3 className="text-base font-semibold mb-3 text-gray-700">Wise Bank Address</h3>
//                     <div className="bg-gray-50 border border-gray-200 p-4 rounded-md whitespace-pre-line text-sm text-gray-800">
//                         {bankDetails.bankAddress || 'Wise Europe SA\nAvenue Louise 54, Room S52\n1050 Brussels\nBelgium'}
//                     </div>
//                 </div>

//                  {/* Display general submission error if any */}
//                  {error && !isLoading && (
//                      <p className="text-red-600 text-sm mb-4 text-center bg-red-50 p-2 rounded border border-red-200">{error}</p>
//                  )}

//                 {/* Action Buttons */}
//                 <div className='space-y-3'>
//                     <Button
//                         onClick={handleIvePaid}
//                         disabled={isSubmitting}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 h-auto text-base rounded-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
//                         size="lg" // Make button larger
//                     >
//                         {isSubmitting ? (
//                             <div className="flex items-center justify-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing...
//                             </div>
//                         ) : 'I’ve made my bank transfer'}
//                     </Button>
//                     <Button
//                         onClick={handlePayLater}
//                         disabled={isSubmitting} // Also disable if the other action is in progress
//                         variant="outline" // Use outline style
//                         className="w-full text-gray-700 font-medium py-3 px-4 h-auto text-base rounded-md border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out disabled:opacity-60"
//                         size="lg" // Make button larger
//                     >
//                         I’ll transfer my money later
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { ChevronLeft, Copy, AlertCircle, CheckCircle2 } from "lucide-react";
// import { useAuth } from '../../../../hooks/useAuth';
// import paymentService from '../../../../services/payment';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { toast } from "sonner";

// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: { _id: string; code: string; };
//     payInCurrency: { _id: string; code: string; };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt?: string;
//     __v?: number;
// }

// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// const PaymentDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { token } = useAuth();

//     // --- State ---
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [copiedField, setCopiedField] = useState<string | null>(null);

//     // Extract IDs from route/query params
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId');

//     // --- Data Fetching Effect ---
//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);

//             if (!paymentId) {
//                 setError("Payment ID is missing from URL.");
//                 setIsLoading(false);
//                 router.push('/dashboard/transactions');
//                 return;
//             }
//             if (!token) {
//                 setError("Authentication required.");
//                 setIsLoading(false);
//                 router.push('/auth/login');
//                 return;
//             }

//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: any) {
//                 const errMsg = err.response?.data?.message || err.message || 'Failed to load payment details';
//                 setError(errMsg);
//                 if (err.response?.status === 404) {
//                     setError(`Payment with ID ${paymentId} not found or you don't have access.`);
//                 } else if (err.response?.status === 401 || err.response?.status === 403) {
//                     setError("Unauthorized to view this payment.");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     // --- Utility Functions ---
//     const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
//         if (!text) {
//             toast.error(`Nothing to copy for ${fieldName}`);
//             return;
//         }

//         navigator.clipboard.writeText(text).then(() => {
//             setCopiedField(fieldName);
//             toast.success(`${fieldName} copied to clipboard`);

//             // Reset copied field after 2 seconds
//             setTimeout(() => setCopiedField(null), 2000);
//         }).catch(err => {
//             toast.error(`Please copy ${fieldName} manually`);
//         });
//     };

//     // --- Action Handlers ---
//     const handleIvePaid = async () => {
//         setError(null);

//         if (!paymentId || !token || !balanceId) {
//             const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
//             const errorMsg = `Cannot proceed: Missing ${missing}.`;
//             setError(errorMsg);
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             try {
//                 await paymentService.confirmUserTransfer(paymentId, token);
//             } catch (confirmErr: any) {
//                 console.error("Failed to update payment status:", confirmErr);
//             }

//             // Navigate to Success Page
//             const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//             router.push(successUrl);

//         } catch (err: any) {
//             const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred while trying to proceed.';
//             setError(`Failed to proceed: ${errMsg}`);
//             setIsSubmitting(false);
//         }
//     };

//     const handlePayLater = () => {
//         router.push('/dashboard/transactions');
//     };

//     // --- Render Logic ---

//     // Loading State
//     if (isLoading) {
//         return (
//             <div className="container max-w-xl mx-auto p-4 sm:p-6">
//                 <div className="space-y-2 mb-6">
//                     <Skeleton className="h-8 w-40" />
//                     <Skeleton className="h-4 w-full max-w-sm" />
//                 </div>

//                 <Card>
//                     <CardHeader>
//                         <Skeleton className="h-6 w-3/4" />
//                         <Skeleton className="h-4 w-full" />
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         {Array(5).fill(0).map((_, i) => (
//                             <div key={i} className="border rounded-lg p-4 space-y-2">
//                                 <Skeleton className="h-4 w-24" />
//                                 <Skeleton className="h-5 w-48" />
//                             </div>
//                         ))}

//                         <div className="pt-4 space-y-3">
//                             <Skeleton className="h-12 w-full rounded-md" />
//                             <Skeleton className="h-12 w-full rounded-md" />
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     }

//     // Error State (if loading finished but error occurred preventing details display)
//     if (!isLoading && error && !paymentDetails) {
//         return (
//             <div className="container max-w-xl mx-auto p-6 text-center">
//                 <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg mb-6">
//                     <AlertCircle className="h-6 w-6 mx-auto mb-2" />
//                     <p className="font-medium">Error Loading Payment Details</p>
//                     <p className="text-sm mt-1">{error}</p>
//                 </div>
//             </div>
//         );
//     }

//     // Not Found State
//     if (!isLoading && !error && !paymentDetails) {
//         return (
//             <div className="container max-w-xl mx-auto p-6 text-center">
//                 <Card>
//                     <CardContent className="pt-6 pb-6">
//                         <p className="text-muted-foreground mb-4">Payment details could not be found.</p>
//                         <Button onClick={() => router.push('/dashboard/transactions')} variant="outline">
//                             View Transactions
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     }

//     // --- Render Payment Details (paymentDetails is valid) ---
//     const payInCurrencyCode = paymentDetails.payInCurrency?.code || 'N/A';
//     const amountToPay = paymentDetails.amountToPay ? parseFloat(paymentDetails.amountToPay.toString()).toFixed(2) : 'N/A';
//     const bankDetails = paymentDetails.bankDetails || {};
//     const referenceCode = paymentDetails.referenceCode || 'N/A';

//     return (
//         <div className="container max-w-xl mx-auto p-4 sm:p-6">
//             <Card className="border shadow-sm">
//                 <CardHeader className="pb-2">
//                     <CardTitle className="text-xl">Bank Transfer Details</CardTitle>
//                     <CardDescription>
//                         Make a standard bank transfer using these details. Ensure the reference code is included.
//                     </CardDescription>
//                 </CardHeader>

//                 <CardContent className="space-y-6">
//                     {/* Bank Details Section */}
//                     <div>
//                         <h3 className="text-sm font-medium text-muted-foreground mb-3">Payment details</h3>

//                         <div className="space-y-3">
//                             {/* Payee Name */}
//                             <div className="bg-background border rounded-lg p-3 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-xs text-muted-foreground mb-1">Payee name</p>
//                                     <p className="font-medium">{bankDetails.payeeName || 'Wise Europe SA'}</p>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleCopyToClipboard(bankDetails.payeeName || 'Wise Europe SA', 'Payee name')}
//                                     className="text-primary h-8 px-2"
//                                 >
//                                     {copiedField === 'Payee name' ? (
//                                         <CheckCircle2 size={18} className="text-green-500" />
//                                     ) : (
//                                         <Copy size={14} />
//                                     )}
//                                 </Button>
//                             </div>

//                             {/* Reference Code */}
//                             <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex justify-between items-center">
//                                 <div>
//                                     <div className="flex items-center mb-1">
//                                         <p className="text-xs text-amber-800 dark:text-amber-500 font-medium">Reference code</p>
//                                         <Badge variant="outline" className="ml-2 text-[10px] bg-amber-100 dark:bg-amber-900 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300">
//                                             Required
//                                         </Badge>
//                                     </div>
//                                     <p className="font-medium font-mono">{referenceCode}</p>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleCopyToClipboard(referenceCode, 'Reference code')}
//                                     className="text-primary h-8 px-2"
//                                 >
//                                     {copiedField === 'Reference code' ? (
//                                         <CheckCircle2 size={18} className="text-green-500" />
//                                     ) : (
//                                         <Copy size={14} />
//                                     )}
//                                 </Button>
//                             </div>

//                             {/* IBAN */}
//                             <div className="bg-background border rounded-lg p-3 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-xs text-muted-foreground mb-1">IBAN</p>
//                                     <p className="font-medium font-mono">{bankDetails.iban || 'N/A'}</p>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleCopyToClipboard(bankDetails.iban, 'IBAN')}
//                                     className="text-primary h-8 px-2"
//                                 >
//                                     {copiedField === 'IBAN' ? (
//                                         <CheckCircle2 size={18} className="text-green-500" />
//                                     ) : (
//                                         <Copy size={14} />
//                                     )}
//                                 </Button>
//                             </div>

//                             {/* BIC/SWIFT */}
//                             <div className="bg-background border rounded-lg p-3 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-xs text-muted-foreground mb-1">Bank code (BIC/SWIFT)</p>
//                                     <p className="font-medium font-mono">{bankDetails.bicSwift || 'N/A'}</p>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleCopyToClipboard(bankDetails.bicSwift, 'BIC/SWIFT')}
//                                     className="text-primary h-8 px-2"
//                                 >
//                                     {copiedField === 'BIC/SWIFT' ? (
//                                         <CheckCircle2 size={18} className="text-green-500" />
//                                     ) : (
//                                         <Copy size={14} />
//                                     )}
//                                 </Button>
//                             </div>

//                             {/* Amount */}
//                             <div className="bg-background border rounded-lg p-3 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-xs text-muted-foreground mb-1">Amount to send</p>
//                                     <p className="font-medium">
//                                         {amountToPay} <span className="text-muted-foreground">{payInCurrencyCode}</span>
//                                     </p>
//                                 </div>
//                                 <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleCopyToClipboard(`${amountToPay} ${payInCurrencyCode}`, 'Amount to send')}
//                                     className="text-primary h-8 px-2"
//                                 >
//                                     {copiedField === 'Amount to send' ? (
//                                         <CheckCircle2 size={18} className="text-green-500" />
//                                     ) : (
//                                         <Copy size={14} />
//                                     )}
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bank Address */}
//                     <div>
//                         <h3 className="text-sm font-medium text-muted-foreground mb-3">Bank address</h3>
//                         <div className="bg-background border rounded-lg p-4 text-sm whitespace-pre-line">
//                             {bankDetails.bankAddress || 'Wise Europe SA\nAvenue Louise 54, Room S52\n1050 Brussels\nBelgium'}
//                         </div>
//                     </div>

//                     {/* Display error if any */}
//                     {error && (
//                         <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive flex items-center gap-2">
//                             <AlertCircle size={16} />
//                             <p>{error}</p>
//                         </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="pt-2 space-y-3">
//                         <Button
//                             onClick={handleIvePaid}
//                             disabled={isSubmitting}
//                             className="w-full h-12 text-base font-medium"
//                         >
//                             {isSubmitting ? (
//                                 <div className="flex items-center justify-center">
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Processing...
//                                 </div>
//                             ) : 'I ve made my bank transfer'}
//                         </Button>
//                         <Button
//                             onClick={handlePayLater}
//                             disabled={isSubmitting}
//                             variant="outline"
//                             className="w-full h-12 text-base font-medium"
//                         >
//                             I'll transfer my money later
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '../../../../hooks/useAuth'; // Adjust path
// import paymentService from '../../../../services/payment'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
// import { Button } from '@/components/ui/button'; // Adjust path
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Optional Card structure
// import { Copy, HelpCircle, Download, AlertTriangle, Loader2, Check } from 'lucide-react'; // Added Check icon
// import { Toaster, toast } from 'sonner'; // Toast notifications

// // --- PaymentDetails Interface (keep as before) ---
// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: { _id: string; code: string; };
//     payInCurrency: { _id: string; code: string; };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt?: string;
//     __v?: number;
// }

// // --- PaymentDetailsPageParams Interface (keep as before) ---
// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// // --- DetailItem Component (Updated as above) ---
// interface DetailItemProps {
//     label: string;
//     value: string | undefined | null;
//     fieldName: string;
//     isMono?: boolean;
//     className?: string;
// }

// const DetailItem: React.FC<DetailItemProps> = ({ label, value, fieldName, isMono = false, className = '' }) => {
//     const displayValue = value || 'N/A';
//     const [isCopied, setIsCopied] = useState(false); // State for button change

//     const handleCopyToClipboard = (text: string) => {
//         if (!text || text === 'N/A') {
//             return;
//         }
//         if (isCopied) return;

//         navigator.clipboard.writeText(text).then(() => {
//             setIsCopied(true);
//             const timer = setTimeout(() => {
//                 setIsCopied(false);
//             }, 1500);
//             // If using in useEffect, return () => clearTimeout(timer);
//         }).catch(err => {
//             console.error('DetailItem: Failed to copy text: ', err);
//             setIsCopied(false);
//         });
//     };

//     return (
//         <div className={`bg-lightgray dark:bg-primarybox p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}>
//             <div className="flex-1 min-w-0">
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
//                 <p className={`font-semibold text-foreground break-words ${isMono ? 'font-mono' : ''}`}>
//                     {displayValue}
//                 </p>
//             </div>
//             {value && value !== 'N/A' && (
//                  <button
//                     onClick={() => handleCopyToClipboard(displayValue)}
//                     aria-label={`Copy ${fieldName}`}
//                     // Custom classes for the specific dark button look
//                     className={`
//                         flex justify-center items-center shrink-0 h-8 px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
//                         ${isCopied
//                             ? 'bg-secondarybox/26 hover:bg-secondarybox/50 text-neutral-700 dark:bg-secondarybox dark:hover:bg-[#727272] dark:text-zinc-100 cursor-pointer' // Success state style
//                             : 'bg-secondarybox/26 hover:bg-secondarybox/50 text-neutral-700 dark:bg-secondarybox dark:hover:bg-[#727272] dark:text-zinc-100 cursor-pointer' // Default dark button style
//                         }
//                     `}
//                     disabled={isCopied} // Disable briefly during "Copied!" state
//                 >
//                     {isCopied ? (
//                         <Check className="h-3.5 w-3.5 mr-1.5" />
//                     ) : (
//                         <Copy className="h-3.5 w-3.5 mr-1.5" />
//                     )}
//                     {isCopied ? 'Copied!' : 'Copy'}
//                 </button>
//             )}
//         </div>
//     );
// };
// // --- End DetailItem Component ---

// const PaymentDetailsPage = () => {
//     // --- Hooks (keep as before) ---
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { token } = useAuth();

//     // --- State (keep as before) ---
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // --- Vars (keep as before) ---
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId');

//     // --- Data Fetching Effect (keep as before) ---
//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId);

//             if (!paymentId) {
//                 setError("Payment ID is missing from URL.");
//                 setIsLoading(false);
//                 console.error("PaymentDetailsPage: No paymentId found.");
//                 router.push('/dashboard/transactions');
//                 return;
//             }
//             if (!token) {
//                  setError("Authentication required. Please log in.");
//                  setIsLoading(false);
//                  router.push('/auth/login');
//                  return;
//             }

//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: any) {
//                 const errMsg = err.response?.data?.message || err.message || 'Failed to load payment details';
//                 setError(errMsg);
//                 console.error("PaymentDetailsPage: Error fetching payment details:", err);
//                 if (err.response?.status === 404) {
//                     setError(`Payment with ID ${paymentId} not found or you don't have access.`);
//                 } else if (err.response?.status === 401 || err.response?.status === 403) {
//                      setError("Unauthorized to view this payment.");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     // --- Action Handlers (keep as before) ---
//      const handleIvePaid = async () => {
//         console.log("PaymentDetailsPage: handleIvePaid triggered");
//         setError(null);

//         if (!paymentId || !token || !balanceId) {
//             const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
//             const errorMsg = `Cannot proceed: Missing ${missing}.`;
//             setError(errorMsg);
//             console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
//             toast.error(errorMsg);
//             return;
//         }

//         setIsSubmitting(true);
//         console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

//         try {
//             try {
//                 console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
//                 await paymentService.confirmUserTransfer(paymentId, token);
//                 console.log("PaymentDetailsPage: confirmUserTransfer successful");
//             } catch (confirmErr: any) {
//                  const confirmErrMsg = confirmErr.response?.data?.message || confirmErr.message;
//                  console.error("PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:", confirmErrMsg);
//                  toast.warning(`Couldn't immediately confirm payment initiation${confirmErrMsg ? `: ${confirmErrMsg}`: '.'} Redirecting...`);
//             }

//             const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//             console.log("PaymentDetailsPage: Navigating to success page:", successUrl);
//             router.push(successUrl);

//         } catch (err: any) {
//             const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred.';
//             setError(`Failed to proceed: ${errMsg}`);
//             console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
//             toast.error(`Failed to proceed: ${errMsg}`);
//             setIsSubmitting(false);
//         }
//     };

//     const handlePayLater = () => {
//         console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions");
//         toast.info("You can find this payment later in your transactions list.");
//         router.push('/dashboard/transactions');
//     };
//     // --- END Action Handlers ---

//     // --- Render Logic ---

//     // Loading State (Skeleton - adjusted slightly for new button height)
//     if (isLoading) {
//         return (
//              <div className="container mx-auto px-4 py-8 max-w-lg">
//                  <Skeleton className="h-8 w-3/5 mb-2" />
//                  <Skeleton className="h-4 w-4/5 mb-6" />
//                  <Skeleton className="h-6 w-1/3 mb-5" />
//                  <div className="space-y-4 mb-6">
//                       <Skeleton className="h-[72px] w-full rounded-lg" /> {/* Approx height with p-4 and sm button */}
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[90px] w-full rounded-lg" />
//                  </div>
//                  <Skeleton className="h-6 w-1/4 mb-4" />
//                  <Skeleton className="h-[88px] w-full rounded-lg mb-8" />
//                  <div className="space-y-3">
//                     <Skeleton className="h-12 w-full rounded-md" />
//                     <Skeleton className="h-12 w-full rounded-md" />
//                  </div>
//              </div>
//          );
//     }

//     // Error State (keep as before)
//      if (!isLoading && error && !paymentDetails) {
//          return (
//              <div className="container mx-auto px-4 py-8 text-center max-w-lg">
//                  <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2">
//                      <AlertTriangle className="w-6 h-6" />
//                      <p className="font-semibold">Error Loading Payment Details</p>
//                      <p className="text-sm">{error}</p>
//                  </div>
//                   <Button onClick={() => router.back()} variant="outline" className="mt-6">
//                      Go Back
//                  </Button>
//              </div>
//          );
//      }

//     // Not Found State (keep as before)
//     if (!isLoading && !error && !paymentDetails) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center text-muted-foreground max-w-lg">
//                 <p className="mb-4">Payment details could not be found or are no longer valid.</p>
//                 <Button onClick={() => router.push('/dashboard/transactions')} variant="outline">
//                      View Transactions
//                  </Button>
//             </div>
//         );
//     }

//     // --- Render Payment Details (Main Structure - keep as before) ---
//     const payInCurrencyCode = paymentDetails.payInCurrency?.code || 'N/A';
//     const amountValue = typeof paymentDetails.amountToPay === 'number'
//         ? paymentDetails.amountToPay
//         : parseFloat(paymentDetails.amountToPay?.toString() || '0');
//     const amountToPayFormatted = isNaN(amountValue) ? 'N/A' : amountValue.toFixed(2);

//     const bankDetails = paymentDetails.bankDetails || {};
//     const referenceCode = paymentDetails.referenceCode || 'N/A';
//     const defaultBankAddress = 'Wise Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium';
//     const bankAddress = bankDetails.bankAddress || defaultBankAddress;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Header */}
//             <h1 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">Use your bank to make a payment to Wise</h1>
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-8 text-center">Make a {`${payInCurrencyCode}`} payment — not an international one — using the details below.</p>

//             {/* Details Section */}
//             <div className="mb-8 border p-6 rounded-xl">
//                 <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Details you'll need to make this transfer</h2>
//                 {/* Use the updated DetailItem component */}
//                 <div className="space-y-4">
//                     <DetailItem label="Payee name" value={bankDetails.payeeName || 'Wise Europe SA'} fieldName="Payee name" />

//                     <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"> {/* Adjusted alignment */}
//                         <div className="flex-1 w-full sm:w-auto"> {/* Ensure DetailItem takes space */}
//                             <DetailItem label="Reference code" value={referenceCode} fieldName="Reference code" isMono={true} />
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 sm:max-w-65 flex-shrink-0 mt-1 sm:mt-0"> {/* Prevent text from pushing button */}
//                             To ensure Wise is able to link this transfer please enter <strong className="text-foreground">{referenceCode}</strong> in the field for the transfer's reason.
//                         </p>
//                     </div>

//                     <DetailItem label="IBAN" value={bankDetails.iban} fieldName="IBAN" isMono={true} />
//                     <DetailItem label="Bank code (BIC/SWIFT)" value={bankDetails.bicSwift} fieldName="BIC/SWIFT" isMono={true} />
//                     <DetailItem
//                         label={`Amount to send (${payInCurrencyCode})`}
//                         value={amountToPayFormatted === 'N/A' ? 'N/A' : `${amountToPayFormatted}`}
//                         fieldName="Amount to send"
//                     />
//                      <div className="bg-lightgray dark:bg-primarybox p-4 rounded-lg">
//                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Our bank's address</p>
//                          <p className="text-foreground break-words">
//                             {bankAddress}
//                          </p>
//                      </div>
//                 </div>
//             </div>

//             {/* Need more help? Section (keep as before) */}
//             <div className="border border-border rounded-lg p-4 mb-8 flex items-start gap-4 bg-card">
//                 <HelpCircle className="h-6 w-6 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
//                 <div>
//                     <h3 className="font-medium text-neutral-900 dark:text-white mb-1">Need more help?</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
//                         To make things easy, you can download these instructions as a PDF document. Then simply print the document out and hand it to your advisor at the bank.
//                     </p>
//                     <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700" onClick={() => toast.info("PDF download not implemented yet.")}>
//                          Download PDF <Download className="h-4 w-4 ml-1" />
//                      </Button>
//                 </div>
//             </div>

//             {/* Non-critical Error Display (keep as before) */}
//             {error && !isLoading && paymentDetails && (
//                  <div className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
//                     <AlertTriangle className="h-5 w-5" />
//                     <span>{error}</span>
//                 </div>
//              )}

//             {/* Action Buttons (keep as before) */}
//             <div className='space-y-3'>
//                 <button
//                     onClick={handleIvePaid}
//                     disabled={isSubmitting || isLoading}
//                     className="w-full bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70"
//                 >
//                     {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
//                     {isSubmitting ? 'Processing...' : 'I’ve made my bank transfer'}
//                 </button>
//                 <button
//                     onClick={handlePayLater}
//                     disabled={isSubmitting || isLoading}
//                     className="w-full bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70"
//                 >
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '../../../../contexts/AuthContext'; // Adjust path
// import paymentService from '../../../../services/payment'; // Adjust path
// import { Skeleton } from '@/components/ui/skeleton'; // Adjust path
// import { Button } from '@/components/ui/button'; // Adjust path
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Optional Card structure
// import { Copy, HelpCircle, Download, AlertTriangle, Loader2, Check } from 'lucide-react'; // Added Check icon
// import { Toaster, toast } from 'sonner'; // Toast notifications - Keep Toaster import

// // --- PaymentDetails Interface ---
// interface PaymentDetails {
//     _id: string;
//     user: string;
//     balanceCurrency: { _id: string; code: string; };
//     payInCurrency: { _id: string; code: string; };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode: string;
//     paymentMethod: string;
//     status: string;
//     bankDetails: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt?: string;
//     __v?: number;
// }

// // --- PaymentDetailsPageParams Interface ---
// interface PaymentDetailsPageParams {
//     balanceId: string;
// }

// // --- DetailItem Component ---
// interface DetailItemProps {
//     label: string;
//     value: string | undefined | null;
//     fieldName: string;
//     isMono?: boolean;
//     className?: string;
// }

// const DetailItem: React.FC<DetailItemProps> = ({ label, value, fieldName, isMono = false, className = '' }) => {
//     const displayValue = value || 'N/A';
//     const [isCopied, setIsCopied] = useState(false); // State for button change

//     const handleCopyToClipboard = (text: string) => {
//         if (!text || text === 'N/A') {
//             return;
//         }
//         if (isCopied) return;

//         navigator.clipboard.writeText(text).then(() => {
//             setIsCopied(true);
//             // No need to store timer if not clearing it
//             setTimeout(() => {
//                 setIsCopied(false);
//             }, 1500);
//         }).catch(err => {
//             console.error('DetailItem: Failed to copy text: ', err);
//             toast.error("Could not copy to clipboard."); // Add user feedback
//             setIsCopied(false); // Ensure state resets on error
//         });
//     };

//     return (
//         <div className={`bg-lightgray dark:bg-primarybox p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}>
//             <div className="flex-1 min-w-0">
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
//                 <p className={`font-semibold text-foreground break-words ${isMono ? 'font-mono' : ''}`}>
//                     {displayValue}
//                 </p>
//             </div>
//             {value && value !== 'N/A' && (
//                  <button
//                     onClick={() => handleCopyToClipboard(displayValue)}
//                     aria-label={`Copy ${fieldName}`}
//                     className={`
//                         flex justify-center items-center shrink-0 h-8 px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
//                         ${isCopied
//                             ? 'bg-secondarybox/26 hover:bg-secondarybox/50 text-neutral-700 dark:bg-secondarybox dark:hover:bg-[#727272] dark:text-zinc-100 cursor-pointer' // Success state style
//                             : 'bg-secondarybox/26 hover:bg-secondarybox/50 text-neutral-700 dark:bg-secondarybox dark:hover:bg-[#727272] dark:text-zinc-100 cursor-pointer' // Default dark button style
//                         }
//                     `}
//                     disabled={isCopied} // Disable briefly during "Copied!" state
//                 >
//                     {isCopied ? (
//                         <Check className="h-3.5 w-3.5 mr-1.5" />
//                     ) : (
//                         <Copy className="h-3.5 w-3.5 mr-1.5" />
//                     )}
//                     {isCopied ? 'Copied!' : 'Copy'}
//                 </button>
//             )}
//         </div>
//     );
// };
// // --- End DetailItem Component ---

// const PaymentDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<PaymentDetailsPageParams>();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { token } = useAuth();

//     // --- State ---
//     const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // --- Vars ---
//     const { balanceId } = params;
//     const paymentId = searchParams.get('paymentId');

//     // --- Data Fetching Effect ---
//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             setIsLoading(true);
//             setError(null);
//             console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId);

//             if (!paymentId) {
//                 setError("Payment ID is missing from URL.");
//                 setIsLoading(false);
//                 console.error("PaymentDetailsPage: No paymentId found.");
//                 toast.error("Payment ID missing. Redirecting...");
//                 router.push('/dashboard/transactions');
//                 return;
//             }
//             if (!token) {
//                  setError("Authentication required. Please log in.");
//                  setIsLoading(false);
//                  toast.error("Authentication required. Redirecting to login...");
//                  router.push('/auth/login');
//                  return;
//             }

//             try {
//                 const details = await paymentService.getPaymentDetails(paymentId, token);
//                 setPaymentDetails(details);
//             } catch (err: unknown) { // Use unknown instead of any
//                 let errMsg = 'Failed to load payment details';
//                 let statusCode: number | undefined;

//                 // Type guard for Axios-like error structure
//                 if (typeof err === 'object' && err !== null && 'response' in err) {
//                     const response = (err as { response?: { data?: { message?: string }, status?: number } }).response;
//                     errMsg = response?.data?.message || errMsg;
//                     statusCode = response?.status;
//                 } else if (err instanceof Error) {
//                     errMsg = err.message;
//                 }

//                 setError(errMsg);
//                 console.error("PaymentDetailsPage: Error fetching payment details:", err);

//                 if (statusCode === 404) {
//                     setError(`Payment with ID ${paymentId} not found or you don't have access.`);
//                 } else if (statusCode === 401 || statusCode === 403) {
//                      setError("Unauthorized to view this payment.");
//                      toast.error("Unauthorized. Redirecting...");
//                      router.push('/dashboard'); // Or login
//                 } else {
//                     toast.error(`Error: ${errMsg}`);
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPaymentDetails();
//     }, [paymentId, token, router]);

//     // --- Action Handlers ---
//      const handleIvePaid = async () => {
//         console.log("PaymentDetailsPage: handleIvePaid triggered");
//         setError(null);

//         if (!paymentId || !token || !balanceId) {
//             const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
//             const errorMsg = `Cannot proceed: Missing ${missing}.`;
//             setError(errorMsg);
//             console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
//             toast.error(errorMsg);
//             return;
//         }

//         setIsSubmitting(true);
//         console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

//         try {
//             try {
//                 console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
//                 await paymentService.confirmUserTransfer(paymentId, token);
//                 console.log("PaymentDetailsPage: confirmUserTransfer successful");
//                 // Toast for immediate feedback, even though redirecting
//                 toast.success("Payment marked as initiated!");
//             } catch (confirmErr: unknown) { // Use unknown
//                  let confirmErrMsg = 'Could not confirm payment initiation';
//                  // Type guard for Axios-like error structure
//                  if (typeof confirmErr === 'object' && confirmErr !== null && 'response' in confirmErr) {
//                      const response = (confirmErr as { response?: { data?: { message?: string } } }).response;
//                      confirmErrMsg = response?.data?.message || confirmErrMsg;
//                  } else if (confirmErr instanceof Error) {
//                     confirmErrMsg = confirmErr.message;
//                  }
//                  console.error("PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:", confirmErrMsg, confirmErr);
//                  // Use warning toast as it's non-blocking for redirection
//                  toast.warning(`Couldn't immediately confirm payment status: ${confirmErrMsg}. Redirecting...`);
//             }

//             // Proceed with redirection regardless of the confirmUserTransfer outcome (as per original logic)
//             const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//             console.log("PaymentDetailsPage: Navigating to success page:", successUrl);
//             router.push(successUrl);

//         } catch (err: unknown) { // Use unknown
//             let errMsg = 'An unexpected error occurred.';
//              // Type guard for Axios-like error structure
//              if (typeof err === 'object' && err !== null && 'response' in err) {
//                  const response = (err as { response?: { data?: { message?: string } } }).response;
//                  errMsg = response?.data?.message || errMsg;
//              } else if (err instanceof Error) {
//                 errMsg = err.message;
//              }
//             setError(`Failed to proceed: ${errMsg}`);
//             console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
//             toast.error(`Failed to proceed: ${errMsg}`);
//             setIsSubmitting(false); // Only set submitting false on outer catch failure
//         }
//         // Do not set setIsSubmitting(false) here if redirecting successfully
//     };

//     const handlePayLater = () => {
//         console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions");
//         toast.info("You can find this payment later in your transactions list.");
//         router.push('/dashboard/transactions');
//     };
//     // --- END Action Handlers ---

//     // --- Render Logic ---

//     // Loading State
//     if (isLoading) {
//         return (
//              <div className="container mx-auto px-4 py-8 max-w-lg">
//                  <Skeleton className="h-8 w-3/5 mb-2" />
//                  <Skeleton className="h-4 w-4/5 mb-6" />
//                  <Skeleton className="h-6 w-1/3 mb-5" />
//                  <div className="space-y-4 mb-6">
//                       <Skeleton className="h-[72px] w-full rounded-lg" /> {/* Adjusted height */}
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[72px] w-full rounded-lg" />
//                       <Skeleton className="h-[90px] w-full rounded-lg" /> {/* Bank address */}
//                  </div>
//                  <Skeleton className="h-6 w-1/4 mb-4" />
//                  <Skeleton className="h-[88px] w-full rounded-lg mb-8" /> {/* Help section */}
//                  <div className="space-y-3">
//                     <Skeleton className="h-12 w-full rounded-md" />
//                     <Skeleton className="h-12 w-full rounded-md" />
//                  </div>
//              </div>
//          );
//     }

//     // Error State (when details couldn't be fetched at all)
//      if (!isLoading && error && !paymentDetails) {
//          return (
//              <div className="container mx-auto px-4 py-8 text-center max-w-lg">
//                 <Toaster richColors position="top-center" /> {/* Add Toaster for errors */}
//                  <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2">
//                      <AlertTriangle className="w-6 h-6" />
//                      <p className="font-semibold">Error Loading Payment Details</p>
//                      <p className="text-sm">{error}</p>
//                  </div>
//                   <Button onClick={() => router.back()} variant="outline" className="mt-6">
//                      Go Back
//                  </Button>
//              </div>
//          );
//      }

//     // Not Found State
//     if (!isLoading && !error && !paymentDetails) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center text-muted-foreground max-w-lg">
//                 <Toaster richColors position="top-center" /> {/* Add Toaster */}
//                 <p className="mb-4">Payment details could not be found or are no longer valid.</p>
//                 <Button onClick={() => router.push('/dashboard/transactions')} variant="outline">
//                      View Transactions
//                  </Button>
//             </div>
//         );
//     }

//     // --- Render Payment Details (Main Structure) ---
//     // Ensure paymentDetails is not null before accessing properties
//     if (!paymentDetails) {
//         // This case should theoretically be covered by the checks above, but added for safety
//         return (
//              <div className="container mx-auto px-4 py-8 text-center text-muted-foreground max-w-lg">
//                  <p>Something went wrong. Please try again later.</p>
//                   <Button onClick={() => router.push('/dashboard/transactions')} variant="outline">
//                      View Transactions
//                  </Button>
//              </div>
//         );
//     }

//     const payInCurrencyCode = paymentDetails.payInCurrency?.code || 'N/A';
//     // Safely parse amountToPay, handle potential string values
//     const amountValue = typeof paymentDetails.amountToPay === 'number'
//         ? paymentDetails.amountToPay
//         : parseFloat(paymentDetails.amountToPay?.toString() || '0');
//     const amountToPayFormatted = isNaN(amountValue) ? 'N/A' : amountValue.toFixed(2);

//     const bankDetails = paymentDetails.bankDetails || {};
//     const referenceCode = paymentDetails.referenceCode || 'N/A';
//     const defaultBankAddress = 'Wise Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium';
//     const bankAddress = bankDetails.bankAddress || defaultBankAddress;

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-2xl"> {/* Adjusted max-width */}
//             <Toaster richColors position="top-center" /> {/* Add Toaster for general use */}
//             {/* Header */}
//             <h1 className="sm:text-3xl text-2xl text-center font-semibold text-mainheading mb-6 dark:text-white">Use your bank to make a payment to Wise</h1>
//             <p className="text-sm text-gray-500 dark:text-gray-300 mb-8 text-center">Make a {`${payInCurrencyCode}`} payment — not an international one — using the details below.</p>

//             {/* Details Section */}
//             <div className="mb-8 border p-4 sm:p-6 rounded-xl bg-card"> {/* Added bg-card */}
//                 {/* Escaped apostrophe */}
//                 <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">Details you&apos;ll need to make this transfer</h2>
//                 <div className="space-y-4">
//                     <DetailItem label="Payee name" value={bankDetails.payeeName || 'Wise Europe SA'} fieldName="Payee name" />

//                     {/* Reference Code Row */}
//                     <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//                         <div className="flex-1 w-full sm:w-auto">
//                             <DetailItem label="Reference code" value={referenceCode} fieldName="Reference code" isMono={true} />
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 sm:max-w-[200px] flex-shrink-0 mt-1 sm:mt-0"> {/* Adjusted max-width */}
//                              {/* Escaped apostrophe */}
//                             Include <strong className="text-foreground">{referenceCode}</strong> as the reference or reason for your transfer.
//                         </p>
//                     </div>

//                     <DetailItem label="IBAN" value={bankDetails.iban} fieldName="IBAN" isMono={true} />
//                     <DetailItem label="Bank code (BIC/SWIFT)" value={bankDetails.bicSwift} fieldName="BIC/SWIFT" isMono={true} />
//                     <DetailItem
//                         label={`Amount to send (${payInCurrencyCode})`}
//                         value={amountToPayFormatted === 'N/A' ? 'N/A' : `${amountToPayFormatted}`}
//                         fieldName="Amount to send"
//                     />
//                      {/* Bank Address Block */}
//                      <div className="bg-lightgray dark:bg-primarybox p-4 rounded-lg">
//                          {/* Escaped apostrophe */}
//                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Our bank&apos;s address</p>
//                          <p className="text-foreground break-words whitespace-pre-line"> {/* Use pre-line for newlines */}
//                             {bankAddress}
//                          </p>
//                      </div>
//                 </div>
//             </div>

//             {/* Need more help? Section */}
//             <div className="border border-border rounded-lg p-4 mb-8 flex items-start gap-4 bg-card">
//                 <HelpCircle className="h-6 w-6 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
//                 <div>
//                     <h3 className="font-medium text-neutral-900 dark:text-white mb-1">Need more help?</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
//                         You can download these instructions as a PDF. Print it out and show it to your bank teller if you need assistance.
//                     </p>
//                     <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-600" onClick={() => toast.info("PDF download feature coming soon!")}>
//                          Download PDF <Download className="h-4 w-4 ml-1" />
//                      </Button>
//                 </div>
//             </div>

//             {/* Non-critical Error Display (e.g., if confirmUserTransfer failed but page loaded) */}
//             {error && !isLoading && paymentDetails && (
//                  <div className="bg-warning/10 border border-warning/30 text-warning-foreground p-3 rounded-lg mb-6 text-sm flex items-center gap-2"> {/* Use warning variant */}
//                     <AlertTriangle className="h-5 w-5" />
//                     <span>{error}</span> {/* Display non-critical error here */}
//                 </div>
//              )}

//             {/* Action Buttons */}
//             <div className='space-y-3'>
//                 <button
//                     onClick={handleIvePaid}
//                     disabled={isSubmitting || isLoading}
//                     className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed" // Adjusted styling to match Button component feel
//                 >
//                     {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
//                     {isSubmitting ? 'Processing...' : 'I’ve made my bank transfer'}
//                 </button>
//                 <button
//                     onClick={handlePayLater}
//                     disabled={isSubmitting || isLoading}
//                      className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed" // Adjusted styling
//                 >
//                     I’ll transfer my money later
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetailsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../../services/payment"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Optional Card structure
// import {
//   Copy,
//   HelpCircle,
//   Download,
//   AlertTriangle,
//   Loader2,
//   Check,
// } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import { IoMdCopy } from "react-icons/io";
// import { FaCheck, FaCopy } from "react-icons/fa6";

// // --- PaymentDetails Interface ---
// interface PaymentDetails {
//   _id: string;
//   user: string; // Ensure this matches API response structure
//   balanceCurrency: { _id: string; code: string };
//   payInCurrency: { _id: string; code: string };
//   amountToAdd: number;
//   amountToPay: number | string; // Allow string type for amountToPay
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode: string;
//   paymentMethod: string;
//   status: string;
//   bankDetails: {
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
//   __v?: number;
// }

// // --- DetailItem Component (Keep as is) ---
// interface DetailItemProps {
//   label: string;
//   value: string | undefined | null;
//   fieldName: string;
//   isMono?: boolean;
//   className?: string;
// }

// const DetailItem: React.FC<DetailItemProps> = ({
//   label,
//   value,
//   fieldName,
//   isMono = false,
//   className = "",
// }) => {
//   const displayValue = value || "N/A";
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopyToClipboard = (text: string) => {
//     if (!text || text === "N/A") {
//       return;
//     }
//     if (isCopied) return;

//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => {
//           setIsCopied(false);
//         }, 1500);
//       })
//       .catch((err) => {
//         console.error(`DetailItem (${fieldName}): Failed to copy text: `, err);
//         toast.error("Could not copy to clipboard.");
//         setIsCopied(false);
//       });
//   };

//   return (
//     <div
//       className={`bg-gray/10 dark:bg-white/5 p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}
//     >
//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">{label}</p>
//         <p
//           className={`font-semibold text-foreground break-words ${
//             isMono ? "font-mono" : ""
//           }`}
//         >
//           {displayValue}
//         </p>
//       </div>
//       {value && value !== "N/A" && (
//         <button
//           onClick={() => handleCopyToClipboard(displayValue)}
//           aria-label={`Copy ${fieldName}`}
//           className={`
//                         bg-white/50 dark:bg-primarybox text-sm hover:dark:bg-secondarybox transition-all duration-75 ease-linear cursor-pointer rounded-lg px-4 py-2 font-medium text-neutral-900 dark:text-primary focus:outline-none flex items-center
//                     `}
//           disabled={isCopied}
//         >
//           {isCopied ? (
//             <FaCheck  className="size-4 mr-1.5" />
//           ) : (
//             <FaCopy className="size-4 mr-1.5" />
//           )}
//           {isCopied ? "Copied!" : "Copy"}
//         </button>
//       )}
//     </div>
//   );
// };
// // --- End DetailItem Component ---

// const PaymentDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { token } = useAuth();

//   // --- State ---
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // --- Vars ---
//   const balanceId = params.balanceId as string | undefined;
//   const paymentId = searchParams.get("paymentId");

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       console.log(
//         "PaymentDetailsPage: Fetching details for paymentId:",
//         paymentId,
//         "balanceId:",
//         balanceId
//       );

//       // Validation... (keep as before)
//       if (!paymentId) {
//         setError("Payment ID is missing from URL.");
//         setIsLoading(false);
//         console.error("PaymentDetailsPage: No paymentId found.");
//         toast.error("Payment ID missing. Redirecting...");
//         router.push(
//           balanceId
//             ? `/dashboard/balances/${balanceId}`
//             : "/dashboard/transactions"
//         );
//         return;
//       }
//       if (!balanceId) {
//         setError("Balance context is missing from URL.");
//         setIsLoading(false);
//         console.error(
//           "PaymentDetailsPage: No balanceId found in route params."
//         );
//         toast.error("Balance context missing. Redirecting...");
//         router.push("/dashboard/balances");
//         return;
//       }
//       if (!token) {
//         setError("Authentication required. Please log in.");
//         setIsLoading(false);
//         toast.error("Authentication required. Redirecting to login...");
//         router.push("/auth/login");
//         return;
//       }

//       try {
//         const details = await paymentService.getPaymentDetails(
//           paymentId,
//           token
//         );
//         // <-- FIX: Use 'unknown' assertion (Workaround - ideally fix service typing)
//         setPaymentDetails(details as unknown as PaymentDetails);
//         // console.log("Fetched Details:", details);
//       } catch (err: unknown) {
//         let errMsg = "Failed to load payment details";
//         let statusCode: number | undefined;

//         if (typeof err === "object" && err !== null && "response" in err) {
//           const response = (
//             err as {
//               response?: { data?: { message?: string }; status?: number };
//             }
//           ).response;
//           errMsg = response?.data?.message || errMsg;
//           statusCode = response?.status;
//         } else if (err instanceof Error) {
//           errMsg = err.message;
//         }

//         setError(errMsg);
//         console.error(
//           "PaymentDetailsPage: Error fetching payment details:",
//           err
//         );

//         if (statusCode === 404) {
//           setError(
//             `Payment with ID ${paymentId} not found or you don't have access.`
//           );
//         } else if (statusCode === 401 || statusCode === 403) {
//           setError("Unauthorized to view this payment.");
//           toast.error("Unauthorized. Redirecting...");
//           router.push("/dashboard");
//         } else {
//           toast.error(`Error: ${errMsg}`);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId, balanceId, token, router]);

//   // --- Action Handlers (Keep as is) ---
//   const handleIvePaid = async () => {
//     console.log("PaymentDetailsPage: handleIvePaid triggered");
//     setError(null);

//     if (!paymentId || !token || !balanceId) {
//       const missing = [
//         !paymentId && "Payment ID",
//         !token && "Token",
//         !balanceId && "Balance ID",
//       ]
//         .filter(Boolean)
//         .join(", ");
//       const errorMsg = `Cannot proceed: Missing ${missing}. Please refresh or go back.`;
//       setError(errorMsg);
//       console.error(
//         "PaymentDetailsPage: Missing critical data for handleIvePaid:",
//         { paymentId, token, balanceId }
//       );
//       toast.error(errorMsg);
//       return;
//     }

//     setIsSubmitting(true);
//     console.log(
//       "PaymentDetailsPage: Submitting... paymentId:",
//       paymentId,
//       "balanceId:",
//       balanceId
//     );

//     try {
//       try {
//         console.log(
//           "PaymentDetailsPage: Attempting paymentService.confirmUserTransfer"
//         );
//         await paymentService.confirmUserTransfer(paymentId, token);
//         console.log("PaymentDetailsPage: confirmUserTransfer successful");
//         toast.success("Payment marked as initiated!");
//       } catch (confirmErr: unknown) {
//         let confirmErrMsg = "Could not confirm payment initiation";
//         if (
//           typeof confirmErr === "object" &&
//           confirmErr !== null &&
//           "response" in confirmErr
//         ) {
//           const response = (
//             confirmErr as { response?: { data?: { message?: string } } }
//           ).response;
//           confirmErrMsg = response?.data?.message || confirmErrMsg;
//         } else if (confirmErr instanceof Error) {
//           confirmErrMsg = confirmErr.message;
//         }
//         console.error(
//           "PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:",
//           confirmErrMsg,
//           confirmErr
//         );
//         setError(
//           `Note: Couldn't automatically update status: ${confirmErrMsg}. Redirecting anyway...`
//         );
//         toast.warning(
//           `Couldn't confirm payment status: ${confirmErrMsg}. Proceeding...`
//         );
//       }

//       const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//       console.log(
//         "PaymentDetailsPage: Navigating to success page:",
//         successUrl
//       );
//       router.push(successUrl);
//     } catch (err: unknown) {
//       let errMsg = "An unexpected error occurred while trying to proceed.";
//       if (typeof err === "object" && err !== null && "response" in err) {
//         const response = (err as { response?: { data?: { message?: string } } })
//           .response;
//         errMsg = response?.data?.message || errMsg;
//       } else if (err instanceof Error) {
//         errMsg = err.message;
//       }
//       setError(`Failed to proceed: ${errMsg}`);
//       console.error(
//         "PaymentDetailsPage: Error during handleIvePaid (outer catch):",
//         err
//       );
//       toast.error(`Failed to proceed: ${errMsg}`);
//       setIsSubmitting(false);
//     }
//   };

//   const handlePayLater = () => {
//     console.log(
//       "PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions"
//     );
//     toast.info("You can find this payment later in your transactions list.");
//     router.push("/dashboard/transactions");
//   };
//   // --- END Action Handlers ---

//   // --- Render Logic ---

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-8 max-w-2xl">
//         {/* Skeleton structure remains the same */}
//         <Skeleton className="h-8 w-3/5 mb-2 mx-auto" />
//         <Skeleton className="h-4 w-4/5 mb-6 mx-auto" />
//         <div className="border p-4 sm:p-6 rounded-xl mb-8">
//           <Skeleton className="h-6 w-1/2 mb-5" />
//           <div className="space-y-4 mb-6">
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[90px] w-full rounded-lg" />
//           </div>
//         </div>
//         <div className="border p-4 rounded-lg mb-8">
//           <Skeleton className="h-6 w-1/4 mb-4" />
//           <Skeleton className="h-4 w-full mb-3" />
//           <Skeleton className="h-4 w-3/4 mb-3" />
//           <Skeleton className="h-5 w-1/3" />
//         </div>
//         <div className="space-y-3">
//           <Skeleton className="h-12 w-full rounded-full" />
//           <Skeleton className="h-12 w-full rounded-full" />
//         </div>
//       </div>
//     );
//   }

//   // Error State (when details couldn't be fetched at all)
//   if (!isLoading && error && !paymentDetails) {
//     return (
//       <div className="container mx-auto py-8 text-center max-w-lg">
//         <Toaster richColors position="top-center" />
//         <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2 mb-6">
//           <AlertTriangle className="w-6 h-6" />
//           <p className="font-semibold">Error Loading Payment Details</p>
//           <p className="text-sm">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline">
//           Go Back
//         </Button>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="link"
//           className="ml-4"
//         >
//           View Transactions
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State or Invalid State (includes !paymentDetails check)
//   if (!isLoading && (!paymentDetails || !balanceId)) {
//     console.warn(
//       "Rendering 'Not Found' state because paymentDetails or balanceId is missing after loading.",
//       { hasPaymentDetails: !!paymentDetails, hasBalanceId: !!balanceId }
//     );
//     return (
//       <div className="container mx-auto py-8 text-center text-muted-foreground max-w-lg">
//         <Toaster richColors position="top-center" />
//         <p className="mb-4">
//           Payment details could not be found, are no longer valid, or the page
//           context is incorrect.
//         </p>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="outline"
//         >
//           View Transactions
//         </Button>
//       </div>
//     );
//   }

//   if (!paymentDetails) {
//     console.error(
//       "PaymentDetailsPage: Reached render section unexpectedly with null paymentDetails."
//     );
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-muted-foreground max-w-lg">
//         <p>Something went wrong loading payment details. Please try again.</p>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="outline"
//           className="mt-4"
//         >
//           View Transactions
//         </Button>
//       </div>
//     );
//   }

//   const payInCurrencyCode = paymentDetails.payInCurrency?.code || "N/A";

//   // Robust amount parsing logic (keep as before)
//   const amountRaw = paymentDetails.amountToPay;
//   let amountValue: number;
//   if (typeof amountRaw === "number") {
//     amountValue = amountRaw;
//   } else if (typeof amountRaw === "string") {
//     amountValue = parseFloat(amountRaw.replace(/,/g, ""));
//     if (isNaN(amountValue)) {
//       console.error("Failed to parse amountToPay string:", amountRaw);
//     }
//   } else {
//     amountValue = NaN;
//     console.error("Unexpected type for amountToPay:", typeof amountRaw);
//   }
//   const amountToPayFormatted = isNaN(amountValue)
//     ? "N/A"
//     : amountValue.toFixed(2);

//   const bankDetails = paymentDetails.bankDetails || {};
//   const referenceCode = paymentDetails.referenceCode || "N/A";
//   const defaultBankAddress =
//     "Wise Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium";
//   const bankAddress = bankDetails.bankAddress || defaultBankAddress;

//   return (
//     <div className="container mx-auto py-5 max-w-2xl">
//       <Toaster richColors position="top-center" />
//       {/* Header */}
//       <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center font-semibold text-mainheading mb-2.5 dark:text-white">
//         Use your bank to make a payment to Wise
//       </h1>
//       <p className="text-sm text-gray-500 dark:text-gray-300 lg:mb-10 mb-5 text-left lg:text-center">
//         Make a {`${payInCurrencyCode}`} payment — not an international one —
//         using the details below.
//       </p>

//       {/* Details Section */}
//       <div className="rounded-xl bg-lightgray dark:bg-background p-4">
//         <h2 className="lg:ext-lg font-medium mb-4 text-neutral-900 dark:text-white">
//           Details you'll need to make this transfer
//         </h2>
//         <div className="lg:space-y-4 space-y-2.5">
//           <DetailItem
//             label="Payee name"
//             value={bankDetails.payeeName || "Wise Europe SA"}
//             fieldName="Payee name"
//           />
//           <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//             <div className="flex-1 w-full sm:w-auto">
//               <DetailItem
//                 label="Reference code"
//                 value={referenceCode}
//                 fieldName="Reference code"
//                 isMono={true}
//               />
//             </div>
//             <p className="text-xs text-gray-700 dark:text-gray-300 sm:max-w-[200px] flex-shrink-0 mt-1 sm:mt-0">
//               Include <strong className="text-primary">{referenceCode}</strong>{" "}
//               as the reference or reason for your transfer.
//             </p>
//           </div>
//           <DetailItem
//             label="IBAN"
//             value={bankDetails.iban}
//             fieldName="IBAN"
//             isMono={true}
//           />
//           <DetailItem
//             label="Bank code (BIC/SWIFT)"
//             value={bankDetails.bicSwift}
//             fieldName="BIC/SWIFT"
//             isMono={true}
//           />
//           <DetailItem
//             label={`Amount to send (${payInCurrencyCode})`}
//             value={
//               amountToPayFormatted === "N/A" ? "N/A" : `${amountToPayFormatted}`
//             }
//             fieldName="Amount to send"
//           />
//           <div className="bg-gray/10 dark:bg-white/5 p-4 rounded-lg">
//             <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
//               Our bank's address
//             </p>
//             <p className="text-foreground break-words text-sm max-w-xs">
//               {bankAddress}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Need more help? Section */}
//       <div className="rounded-lg p-4 my-5 flex items-start gap-4 bg-[#E2E2E2] dark:bg-white/5">
//         <HelpCircle className="size-6 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
//         <div>
//           <h3 className="font-medium text-neutral-900 dark:text-white mb-1">
//             Need more help?
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
//             You can download these instructions as a PDF. Print it out and show
//             it to your bank teller if you need assistance.
//           </p>
//           <Button
//             variant="link"
//             className="p-0 h-auto text-subheading dark:text-primary font-medium"
//             onClick={() => toast.info("PDF download feature coming soon!")}
//           >
//             Download PDF <Download className="ml-1" size={28} />
//           </Button>
//         </div>
//       </div>

//       {/* Non-critical Error Display */}
//       {error &&
//         !isLoading && ( // No need to check paymentDetails here as it's guaranteed non-null
//           <div className="bg-red-700/20  text-red-500 p-3 rounded-lg mb-6 flex items-center gap-4">
//             <AlertTriangle size={28} />
//             <span>{error}</span>
//           </div>
//         )}

//       {/* Action Buttons */}
//       <div className="space-y-3">
//         <button
//           onClick={handleIvePaid}
//           disabled={isSubmitting || isLoading}
//           className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Processing..." : "I’ve made my bank transfer"}
//         </button>
//         <button
//           onClick={handlePayLater}
//           disabled={isSubmitting || isLoading}
//           className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           I’ll transfer my money later
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetailsPage;

// Last code
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../../services/payment"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Optional Card structure
// import {
//   Copy,
//   HelpCircle,
//   Download,
//   AlertTriangle,
//   Loader2,
//   Check,
// } from "lucide-react";
// import { Toaster, toast } from "sonner";

// // --- PaymentDetails Interface ---
// interface PaymentDetails {
//   _id: string;
//   user: string; // Ensure this matches API response structure
//   balanceCurrency: { _id: string; code: string };
//   payInCurrency: { _id: string; code: string };
//   amountToAdd: number;
//   amountToPay: number | string; // Allow string type for amountToPay
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode: string;
//   paymentMethod: string;
//   status: string;
//   bankDetails: {
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
//   __v?: number;
// }

// // --- DetailItem Component (Keep as is) ---
// interface DetailItemProps {
//   label: string;
//   value: string | undefined | null;
//   fieldName: string;
//   className?: string;
// }

// const DetailItem: React.FC<DetailItemProps> = ({
//   label,
//   value,
//   fieldName,
//   className = "",
// }) => {
//   const displayValue = value !== undefined && value !== null ? String(value) : "N/A";
//   const canCopy = displayValue && displayValue !== "N/A";

//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopyToClipboard = () => {
//     if (!canCopy || isCopied) {
//       return;
//     }

//     navigator.clipboard
//       .writeText(displayValue)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => {
//           setIsCopied(false);
//         }, 1500);
//       })
//       .catch((err) => {
//         console.error(`DetailItem (${fieldName}): Failed to copy text: `, err);
//         toast.error("Could not copy to clipboard.");
//         setIsCopied(false);
//       });
//   };

//   // --- Icon classes matching the reference ---
//   const iconClasses = "size-3.5 mr-1 text-neutral-900 dark:text-white";

//   return (
//     <div
//       className={`bg-lightgray dark:bg-white/5 p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}
//     >
//       {/* Label and Value Section */}
//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">{label}</p>
//         <p className="font-semibold text-neutral-900 dark:text-white break-words">
//           {displayValue}
//         </p>
//       </div>

//       {/* Conditional Copy Button with Lucide Icons */}
//       {canCopy && (
//         <button
//           type="button"
//           onClick={handleCopyToClipboard}
//           aria-label={`Copy ${label}`}
//           // --- Classes exactly matching the user's reference Button ---
//           // NOTE: Removed base shadcn classes like border, bg-background etc.
//           // to *strictly* use the reference classes provided.
//           className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
//             ${
//               isCopied ? "cursor-default" : "cursor-pointer"
//             }
//             ${
//               isCopied ? "" : ""
//             }
//           `}
//           // --- End reference classes ---
//           disabled={isCopied}
//         >
//           {isCopied ? (
//             // Use Check icon from lucide-react
//             <Check className={iconClasses} aria-hidden="true" />
//           ) : (
//             // Use Copy icon from lucide-react
//             <Copy className={iconClasses} aria-hidden="true" />
//           )}
//           {/* Text changes based on state */}
//           {isCopied ? "Copied!" : "Copy"}
//         </button>
//       )}
//     </div>
//   );
// };
// // --- End DetailItem Component ---

// const PaymentDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { token } = useAuth();

//   // --- State ---
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // --- Vars ---
//   const balanceId = params.balanceId as string | undefined;
//   const paymentId = searchParams.get("paymentId");

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       console.log(
//         "PaymentDetailsPage: Fetching details for paymentId:",
//         paymentId,
//         "balanceId:",
//         balanceId
//       );

//       // Validation... (keep as before)
//       if (!paymentId) {
//         setError("Payment ID is missing from URL.");
//         setIsLoading(false);
//         console.error("PaymentDetailsPage: No paymentId found.");
//         toast.error("Payment ID missing. Redirecting...");
//         router.push(
//           balanceId
//             ? `/dashboard/balances/${balanceId}`
//             : "/dashboard/transactions"
//         );
//         return;
//       }
//       if (!balanceId) {
//         setError("Balance context is missing from URL.");
//         setIsLoading(false);
//         console.error(
//           "PaymentDetailsPage: No balanceId found in route params."
//         );
//         toast.error("Balance context missing. Redirecting...");
//         router.push("/dashboard/balances");
//         return;
//       }
//       if (!token) {
//         setError("Authentication required. Please log in.");
//         setIsLoading(false);
//         toast.error("Authentication required. Redirecting to login...");
//         router.push("/auth/login");
//         return;
//       }

//       try {
//         const details = await paymentService.getPaymentDetails(
//           paymentId,
//           token
//         );
//         // <-- FIX: Use 'unknown' assertion (Workaround - ideally fix service typing)
//         setPaymentDetails(details as unknown as PaymentDetails);
//         // console.log("Fetched Details:", details);
//       } catch (err: unknown) {
//         let errMsg = "Failed to load payment details";
//         let statusCode: number | undefined;

//         if (typeof err === "object" && err !== null && "response" in err) {
//           const response = (
//             err as {
//               response?: { data?: { message?: string }; status?: number };
//             }
//           ).response;
//           errMsg = response?.data?.message || errMsg;
//           statusCode = response?.status;
//         } else if (err instanceof Error) {
//           errMsg = err.message;
//         }

//         setError(errMsg);
//         console.error(
//           "PaymentDetailsPage: Error fetching payment details:",
//           err
//         );

//         if (statusCode === 404) {
//           setError(
//             `Payment with ID ${paymentId} not found or you don't have access.`
//           );
//         } else if (statusCode === 401 || statusCode === 403) {
//           setError("Unauthorized to view this payment.");
//           toast.error("Unauthorized. Redirecting...");
//           router.push("/dashboard");
//         } else {
//           toast.error(`Error: ${errMsg}`);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId, balanceId, token, router]);

//   // --- Action Handlers (Keep as is) ---
//   const handleIvePaid = async () => {
//     console.log("PaymentDetailsPage: handleIvePaid triggered");
//     setError(null);

//     if (!paymentId || !token || !balanceId) {
//       const missing = [
//         !paymentId && "Payment ID",
//         !token && "Token",
//         !balanceId && "Balance ID",
//       ]
//         .filter(Boolean)
//         .join(", ");
//       const errorMsg = `Cannot proceed: Missing ${missing}. Please refresh or go back.`;
//       setError(errorMsg);
//       console.error(
//         "PaymentDetailsPage: Missing critical data for handleIvePaid:",
//         { paymentId, token, balanceId }
//       );
//       toast.error(errorMsg);
//       return;
//     }

//     setIsSubmitting(true);
//     console.log(
//       "PaymentDetailsPage: Submitting... paymentId:",
//       paymentId,
//       "balanceId:",
//       balanceId
//     );

//     try {
//       try {
//         console.log(
//           "PaymentDetailsPage: Attempting paymentService.confirmUserTransfer"
//         );
//         await paymentService.confirmUserTransfer(paymentId, token);
//         console.log("PaymentDetailsPage: confirmUserTransfer successful");
//         toast.success("Payment marked as initiated!");
//       } catch (confirmErr: unknown) {
//         let confirmErrMsg = "Could not confirm payment initiation";
//         if (
//           typeof confirmErr === "object" &&
//           confirmErr !== null &&
//           "response" in confirmErr
//         ) {
//           const response = (
//             confirmErr as { response?: { data?: { message?: string } } }
//           ).response;
//           confirmErrMsg = response?.data?.message || confirmErrMsg;
//         } else if (confirmErr instanceof Error) {
//           confirmErrMsg = confirmErr.message;
//         }
//         console.error(
//           "PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:",
//           confirmErrMsg,
//           confirmErr
//         );
//         setError(
//           `Note: Couldn't automatically update status: ${confirmErrMsg}. Redirecting anyway...`
//         );
//         toast.warning(
//           `Couldn't confirm payment status: ${confirmErrMsg}. Proceeding...`
//         );
//       }

//       const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//       console.log(
//         "PaymentDetailsPage: Navigating to success page:",
//         successUrl
//       );
//       router.push(successUrl);
//     } catch (err: unknown) {
//       let errMsg = "An unexpected error occurred while trying to proceed.";
//       if (typeof err === "object" && err !== null && "response" in err) {
//         const response = (err as { response?: { data?: { message?: string } } })
//           .response;
//         errMsg = response?.data?.message || errMsg;
//       } else if (err instanceof Error) {
//         errMsg = err.message;
//       }
//       setError(`Failed to proceed: ${errMsg}`);
//       console.error(
//         "PaymentDetailsPage: Error during handleIvePaid (outer catch):",
//         err
//       );
//       toast.error(`Failed to proceed: ${errMsg}`);
//       setIsSubmitting(false);
//     }
//   };

//   const handlePayLater = () => {
//     console.log(
//       "PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions"
//     );
//     toast.info("You can find this payment later in your transactions list.");
//     router.push("/dashboard/transactions");
//   };
//   // --- END Action Handlers ---

//   // --- Render Logic ---

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-8 max-w-2xl">
//         {/* Skeleton structure remains the same */}
//         <Skeleton className="h-8 w-3/5 mb-2 mx-auto" />
//         <Skeleton className="h-4 w-4/5 mb-6 mx-auto" />
//         <div className="border p-4 sm:p-6 rounded-xl mb-8">
//           <Skeleton className="h-6 w-1/2 mb-5" />
//           <div className="space-y-4 mb-6">
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[90px] w-full rounded-lg" />
//           </div>
//         </div>
//         <div className="border p-4 rounded-lg mb-8">
//           <Skeleton className="h-6 w-1/4 mb-4" />
//           <Skeleton className="h-4 w-full mb-3" />
//           <Skeleton className="h-4 w-3/4 mb-3" />
//           <Skeleton className="h-5 w-1/3" />
//         </div>
//         <div className="space-y-3">
//           <Skeleton className="h-12 w-full rounded-full" />
//           <Skeleton className="h-12 w-full rounded-full" />
//         </div>
//       </div>
//     );
//   }

//   // Error State (when details couldn't be fetched at all)
//   if (!isLoading && error && !paymentDetails) {
//     return (
//       <div className="mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-300 md:max-w-lg">
//         <Toaster richColors position="top-center" />
//         <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2 mb-6">
//           <AlertTriangle className="w-6 h-6" />
//           <p className="font-semibold">Error Loading Payment Details</p>
//           <p className="text-sm">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline">
//           Go Back
//         </Button>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="link"
//           className="mt-4 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear"
//         >
//           View Transactions
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State or Invalid State (includes !paymentDetails check)
//   if (!isLoading && (!paymentDetails || !balanceId)) {
//     console.warn(
//       "Rendering 'Not Found' state because paymentDetails or balanceId is missing after loading.",
//       { hasPaymentDetails: !!paymentDetails, hasBalanceId: !!balanceId }
//     );
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//         <Toaster richColors position="top-center" />
//         <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//           Payment details could not be found, are no longer valid, or the page
//           context is incorrect.
//         </p>
//         <button
//           onClick={() => router.push("/dashboard/transactions")}
//           className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//         >
//           View Transactions
//         </button>
//       </div>
//     );
//   }

//   if (!paymentDetails) {
//     console.error(
//       "PaymentDetailsPage: Reached render section unexpectedly with null paymentDetails."
//     );
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//         <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">Something went wrong loading payment details. Please try again.</p>
//         <button
//           onClick={() => router.push("/dashboard/transactions")}
//           className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//         >
//           View Transactions
//         </button>
//       </div>
//     );
//   }

//   const payInCurrencyCode = paymentDetails.payInCurrency?.code || "N/A";

//   // Robust amount parsing logic (keep as before)
//   const amountRaw = paymentDetails.amountToPay;
//   let amountValue: number;
//   if (typeof amountRaw === "number") {
//     amountValue = amountRaw;
//   } else if (typeof amountRaw === "string") {
//     amountValue = parseFloat(amountRaw.replace(/,/g, ""));
//     if (isNaN(amountValue)) {
//       console.error("Failed to parse amountToPay string:", amountRaw);
//     }
//   } else {
//     amountValue = NaN;
//     console.error("Unexpected type for amountToPay:", typeof amountRaw);
//   }
//   const amountToPayFormatted = isNaN(amountValue)
//     ? "N/A"
//     : amountValue.toFixed(2);

//   const bankDetails = paymentDetails.bankDetails || {};
//   const referenceCode = paymentDetails.referenceCode || "N/A";
//   const defaultBankAddress =
//     "Wise Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium";
//   const bankAddress = bankDetails.bankAddress || defaultBankAddress;

//   return (
//     <section className="Payment-Details">
//       <div className="mx-auto lg:max-w-2xl">
//         <Toaster richColors position="top-center" />
//         {/* Header */}
//         <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center font-semibold text-mainheading mb-2.5 dark:text-white">
//           Use your bank to make a payment to Wise
//         </h1>
//         <p className="lg:text-base text-sm text-gray-500 dark:text-gray-300 lg:mb-10 mb-5 text-left lg:text-center">
//           Make a {`${payInCurrencyCode}`} payment — not an international one —
//           using the details below.
//         </p>

//         {/* Details Section */}
//         <div className="rounded-xl bg-white dark:bg-background border p-4">
//           <h2 className="lg:text-lg text-base font-medium mb-4 text-neutral-900 dark:text-white">
//             Details you'll need to make this transfer
//           </h2>
//           <div className="lg:space-y-4 space-y-2.5">
//             <DetailItem
//               label="Payee name"
//               value={bankDetails.payeeName || "Wise Europe SA"}
//               fieldName="Payee name"
//             />
//             <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//               <div className="flex-1 w-full sm:w-auto">
//                 <DetailItem
//                   label="Reference code"
//                   value={referenceCode}
//                   fieldName="Reference code"
//                 />
//               </div>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white sm:max-w-[200px] flex-shrink-0 mt-1 sm:mt-0">
//                 Include{" "}
//                 <strong className="text-primary font-bold">{referenceCode}</strong> as the
//                 reference or reason for your transfer.
//               </p>
//             </div>
//             <DetailItem
//               label="IBAN"
//               value={bankDetails.iban}
//               fieldName="IBAN"
//             />
//             <DetailItem
//               label="Bank code (BIC/SWIFT)"
//               value={bankDetails.bicSwift}
//               fieldName="BIC/SWIFT"
//             />
//             <DetailItem
//               label={`Amount to send (${payInCurrencyCode})`}
//               value={
//                 amountToPayFormatted === "N/A"
//                   ? "N/A"
//                   : `${amountToPayFormatted}`
//               }
//               fieldName="Amount to send"
//             />
//             <div className="bg-lightgray dark:bg-white/5 p-4 rounded-lg">
//               <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
//                 Our bank's address
//               </p>
//               <p className="font-semibold text-neutral-900 dark:text-white break-words">
//                 {bankAddress}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Non-critical Error Display */}
//         {error &&
//           !isLoading && ( // No need to check paymentDetails here as it's guaranteed non-null
//             <div className="my-4 bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
//               <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
//                 <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//               </div>
//               <span className="text-red-700 dark:text-red-300/90">{error}</span>
//             </div>
//           )}

//         {/* Action Buttons */}
//         <div className="space-y-3 mt-5">
//           <button
//             onClick={handleIvePaid}
//             disabled={isSubmitting || isLoading}
//             className="flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M12 2V6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M12 18V22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M4.93 4.93L7.76 7.76"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M16.24 16.24L19.07 19.07"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M2 12H6"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M18 12H22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M4.93 19.07L7.76 16.24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M16.24 7.76L19.07 4.93"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <span>Processing...</span>
//               </>
//             ) : (
//               "I’ve made my bank transfer"
//             )}
//           </button>
//           <button
//             onClick={handlePayLater}
//             disabled={isSubmitting || isLoading}
//             className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             I’ll transfer my money later
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PaymentDetailsPage;

// // frontend/src/app/dashboard/balances/[balanceId]/payment-details/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "../../../../contexts/AuthContext"; // Adjusted path
// import paymentService from "../../../../services/payment"; // Adjusted path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import {
//   Copy,
//   // HelpCircle, // Not used in provided code
//   // Download, // Not used in provided code
//   AlertTriangle,
//   // Loader2, // Not used in provided code for Button
//   Check,
// } from "lucide-react";

// // Import react-toastify and CustomToast
// import { ToastContainer, toast as reactToastifyToast, Slide, ToastContainerProps, TypeOptions } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CustomToast, { CustomToastProps } from "../../../../../app/components/CustomToast"; // Adjusted path

// // --- PaymentDetails Interface ---
// interface PaymentDetails {
//   _id: string;
//   user: string;
//   balanceCurrency: { _id: string; code: string };
//   payInCurrency: { _id: string; code: string };
//   amountToAdd: number;
//   amountToPay: number | string;
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode: string;
//   paymentMethod: string;
//   status: string;
//   bankDetails: {
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
//   __v?: number;
// }

// // --- DetailItem Component ---
// interface DetailItemProps {
//   label: string;
//   value: string | undefined | null;
//   fieldName: string;
//   className?: string;
//   showToast: (message: string, type?: CustomToastProps['type']) => void; // Added showToast prop
// }

// const DetailItem: React.FC<DetailItemProps> = ({
//   label,
//   value,
//   fieldName,
//   className = "",
//   showToast, // Destructure showToast
// }) => {
//   const displayValue = value !== undefined && value !== null ? String(value) : "N/A";
//   const canCopy = displayValue && displayValue !== "N/A";

//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopyToClipboard = () => {
//     if (!canCopy || isCopied) {
//       return;
//     }

//     navigator.clipboard
//       .writeText(displayValue)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => {
//           setIsCopied(false);
//         }, 1500);
//       })
//       .catch((err) => {
//         console.error(`DetailItem (${fieldName}): Failed to copy text: `, err);
//         showToast("Could not copy to clipboard.", 'error'); // Use showToast
//         setIsCopied(false);
//       });
//   };

//   const iconClasses = "size-3.5 mr-1 text-neutral-900 dark:text-white";

//   return (
//     <div
//       className={`bg-lightgray dark:bg-white/5 p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}
//     >
//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">{label}</p>
//         <p className="font-semibold text-neutral-900 dark:text-white break-words">
//           {displayValue}
//         </p>
//       </div>
//       {canCopy && (
//         <button
//           type="button"
//           onClick={handleCopyToClipboard}
//           aria-label={`Copy ${label}`}
//           className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-neutral-900 bg-white hover:bg-lightborder dark:text-white dark:bg-neutral-900 dark:hover:bg-primarybox
//             ${isCopied ? "cursor-default" : "cursor-pointer"}
//           `}
//           disabled={isCopied}
//         >
//           {isCopied ? (
//             <Check className={iconClasses} aria-hidden="true" />
//           ) : (
//             <Copy className={iconClasses} aria-hidden="true" />
//           )}
//           {isCopied ? "Copied!" : "Copy"}
//         </button>
//       )}
//     </div>
//   );
// };
// // --- End DetailItem Component ---

// const PaymentDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { token } = useAuth();

//   // --- State ---
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false); // For ToastContainer styling

//   // --- Vars ---
//   const balanceId = params.balanceId as string | undefined;
//   const paymentId = searchParams.get("paymentId");

//   // --- Mobile Detection Effect (for ToastContainer) ---
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // --- Custom Toast Invocation ---
//   const showToast = useCallback((
//     message: string,
//     type?: CustomToastProps['type']
//   ) => {
//     const effectiveType = type || 'default';
//     let progressClassName: string;
//     switch(effectiveType) {
//       case 'success': progressClassName = "toast-progress-success"; break;
//       case 'error': progressClassName = "toast-progress-error"; break;
//       case 'info': progressClassName = "toast-progress-info"; break;
//       case 'warning': progressClassName = "toast-progress-warning"; break;
//       case 'default': default: progressClassName = "toast-progress-default"; break;
//     }
//     reactToastifyToast(<CustomToast message={message} type={effectiveType} />, {
//       progressClassName: progressClassName,
//       type: effectiveType as TypeOptions,
//       icon: false,
//     });
//   }, []);

//   // --- ToastContainer Props and Style ---
//   const toastContainerProps: ToastContainerProps = {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: true,
//     closeOnClick: false,
//     closeButton: false,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//     transition: Slide,
//     toastClassName: () => "p-0 shadow-none rounded-md bg-transparent w-full relative mb-3",
//   };

//   const getToastContainerStyle = (): React.CSSProperties & { [key: `--${string}`]: string | number } => {
//     const baseStyle = { zIndex: 99999 };
//     if (isMobile) {
//       return { ...baseStyle, top: "1rem", left: "1rem", right: "1rem", width: "auto" };
//     } else {
//       return { ...baseStyle, top: "0.75rem", right: "0.75rem", width: "320px" };
//     }
//   };

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId, "balanceId:", balanceId);

//       if (!paymentId) {
//         setError("Payment ID is missing from URL.");
//         setIsLoading(false);
//         console.error("PaymentDetailsPage: No paymentId found.");
//         showToast("Payment ID missing. Redirecting...", 'error');
//         router.push(balanceId ? `/dashboard/balances/${balanceId}` : "/dashboard/transactions");
//         return;
//       }
//       if (!balanceId) {
//         setError("Balance context is missing from URL.");
//         setIsLoading(false);
//         console.error("PaymentDetailsPage: No balanceId found in route params.");
//         showToast("Balance context missing. Redirecting...", 'error');
//         router.push("/dashboard/balances");
//         return;
//       }
//       if (!token) {
//         setError("Authentication required. Please log in.");
//         setIsLoading(false);
//         showToast("Authentication required. Redirecting to login...", 'error');
//         router.push("/auth/login");
//         return;
//       }

//       try {
//         const details = await paymentService.getPaymentDetails(paymentId, token);
//         setPaymentDetails(details as unknown as PaymentDetails);
//       } catch (err: unknown) {
//         let errMsg = "Failed to load payment details";
//         let statusCode: number | undefined;

//         if (typeof err === "object" && err !== null && "response" in err) {
//           const response = (err as { response?: { data?: { message?: string }; status?: number } }).response;
//           errMsg = response?.data?.message || errMsg;
//           statusCode = response?.status;
//         } else if (err instanceof Error) {
//           errMsg = err.message;
//         }

//         setError(errMsg);
//         console.error("PaymentDetailsPage: Error fetching payment details:", err);

//         if (statusCode === 404) {
//           setError(`Payment with ID ${paymentId} not found or you don't have access.`);
//           showToast(`Payment with ID ${paymentId} not found.`, 'error'); // More user-friendly
//         } else if (statusCode === 401 || statusCode === 403) {
//           setError("Unauthorized to view this payment.");
//           showToast("Unauthorized. Redirecting...", 'error');
//           router.push("/dashboard");
//         } else {
//           showToast(`Error: ${errMsg}`, 'error');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId, balanceId, token, router, showToast]); // Added showToast to dependencies

//   // --- Action Handlers ---
//   const handleIvePaid = async () => {
//     console.log("PaymentDetailsPage: handleIvePaid triggered");
//     setError(null);

//     if (!paymentId || !token || !balanceId) {
//       const missing = [!paymentId && "Payment ID", !token && "Token", !balanceId && "Balance ID"].filter(Boolean).join(", ");
//       const errorMsg = `Cannot proceed: Missing ${missing}. Please refresh or go back.`;
//       setError(errorMsg);
//       console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
//       showToast(errorMsg, 'error');
//       return;
//     }

//     setIsSubmitting(true);
//     console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

//     try {
//       try {
//         console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
//         await paymentService.confirmUserTransfer(paymentId, token);
//         console.log("PaymentDetailsPage: confirmUserTransfer successful");
//         showToast("Payment marked as initiated!", 'success');
//       } catch (confirmErr: unknown) {
//         let confirmErrMsg = "Could not confirm payment initiation";
//         if (typeof confirmErr === "object" && confirmErr !== null && "response" in confirmErr) {
//           const response = (confirmErr as { response?: { data?: { message?: string } } }).response;
//           confirmErrMsg = response?.data?.message || confirmErrMsg;
//         } else if (confirmErr instanceof Error) {
//           confirmErrMsg = confirmErr.message;
//         }
//         console.error("PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:", confirmErrMsg, confirmErr);
//         setError(`Note: Couldn't automatically update status: ${confirmErrMsg}. Redirecting anyway...`);
//         showToast(`Couldn't confirm payment status: ${confirmErrMsg}. Proceeding...`, 'warning');
//       }

//       const successUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;
//       console.log("PaymentDetailsPage: Navigating to success page:", successUrl);
//       router.push(successUrl);
//     } catch (err: unknown) {
//       let errMsg = "An unexpected error occurred while trying to proceed.";
//       if (typeof err === "object" && err !== null && "response" in err) {
//         const response = (err as { response?: { data?: { message?: string } } }).response;
//         errMsg = response?.data?.message || errMsg;
//       } else if (err instanceof Error) {
//         errMsg = err.message;
//       }
//       setError(`Failed to proceed: ${errMsg}`);
//       console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
//       showToast(`Failed to proceed: ${errMsg}`, 'error');
//       setIsSubmitting(false);
//     }
//   };

//   const handlePayLater = () => {
//     console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions");
//     showToast("You can find this payment later in your transactions list.", 'info');
//     router.push("/dashboard/transactions");
//   };
//   // --- END Action Handlers ---

//   // --- Render Logic ---

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-8 max-w-2xl relative">
//          <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />
//         <Skeleton className="h-8 w-3/5 mb-2 mx-auto" />
//         <Skeleton className="h-4 w-4/5 mb-6 mx-auto" />
//         <div className="border p-4 sm:p-6 rounded-xl mb-8">
//           <Skeleton className="h-6 w-1/2 mb-5" />
//           <div className="space-y-4 mb-6">
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[72px] w-full rounded-lg" />
//             <Skeleton className="h-[90px] w-full rounded-lg" />
//           </div>
//         </div>
//         <div className="border p-4 rounded-lg mb-8">
//           <Skeleton className="h-6 w-1/4 mb-4" />
//           <Skeleton className="h-4 w-full mb-3" />
//           <Skeleton className="h-4 w-3/4 mb-3" />
//           <Skeleton className="h-5 w-1/3" />
//         </div>
//         <div className="space-y-3">
//           <Skeleton className="h-12 w-full rounded-full" />
//           <Skeleton className="h-12 w-full rounded-full" />
//         </div>
//       </div>
//     );
//   }

//   if (!isLoading && error && !paymentDetails) {
//     return (
//       <div className="mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-300 md:max-w-lg relative">
//         <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />
//         <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2 mb-6">
//           <AlertTriangle className="w-6 h-6" />
//           <p className="font-semibold">Error Loading Payment Details</p>
//           <p className="text-sm">{error}</p>
//         </div>
//         <Button onClick={() => router.back()} variant="outline">
//           Go Back
//         </Button>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="link"
//           className="mt-4 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear"
//         >
//           View Transactions
//         </Button>
//       </div>
//     );
//   }

//   if (!isLoading && (!paymentDetails || !balanceId)) {
//     console.warn("Rendering 'Not Found' state because paymentDetails or balanceId is missing after loading.", { hasPaymentDetails: !!paymentDetails, hasBalanceId: !!balanceId });
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center relative">
//         <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />
//         <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
//           Payment details could not be found, are no longer valid, or the page context is incorrect.
//         </p>
//         <button
//           onClick={() => router.push("/dashboard/transactions")}
//           className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//         >
//           View Transactions
//         </button>
//       </div>
//     );
//   }

//   if (!paymentDetails) {
//     console.error("PaymentDetailsPage: Reached render section unexpectedly with null paymentDetails.");
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center relative">
//         <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />
//         <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">Something went wrong loading payment details. Please try again.</p>
//         <button
//           onClick={() => router.push("/dashboard/transactions")}
//           className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//         >
//           View Transactions
//         </button>
//       </div>
//     );
//   }

//   const payInCurrencyCode = paymentDetails.payInCurrency?.code || "N/A";
//   const amountRaw = paymentDetails.amountToPay;
//   let amountValue: number;
//   if (typeof amountRaw === "number") {
//     amountValue = amountRaw;
//   } else if (typeof amountRaw === "string") {
//     amountValue = parseFloat(amountRaw.replace(/,/g, ""));
//     if (isNaN(amountValue)) console.error("Failed to parse amountToPay string:", amountRaw);
//   } else {
//     amountValue = NaN;
//     console.error("Unexpected type for amountToPay:", typeof amountRaw);
//   }
//   const amountToPayFormatted = isNaN(amountValue) ? "N/A" : amountValue.toFixed(2);

//   const bankDetails = paymentDetails.bankDetails || {};
//   const referenceCode = paymentDetails.referenceCode || "N/A";
//   const defaultBankAddress = "Wise Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium";
//   const bankAddress = bankDetails.bankAddress || defaultBankAddress;

//   return (
//     <section className="Payment-Details relative"> {/* Added relative for ToastContainer positioning context */}
//       <ToastContainer {...toastContainerProps} style={getToastContainerStyle()} />
//       <div className="mx-auto lg:max-w-2xl">
//         <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center font-semibold text-mainheading mb-2.5 dark:text-white">
//           Use your bank to make a payment to Wise
//         </h1>
//         <p className="lg:text-base text-sm text-gray-500 dark:text-gray-300 lg:mb-10 mb-5 text-left lg:text-center">
//           Make a {`${payInCurrencyCode}`} payment — not an international one — using the details below.
//         </p>

//         <div className="rounded-xl bg-white dark:bg-background border p-4">
//           <h2 className="lg:text-lg text-base font-medium mb-4 text-neutral-900 dark:text-white">
//             Details you'll need to make this transfer
//           </h2>
//           <div className="lg:space-y-4 space-y-2.5">
//             <DetailItem
//               label="Payee name"
//               value={bankDetails.payeeName || "Wise Europe SA"}
//               fieldName="Payee name"
//               showToast={showToast}
//             />
//             <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//               <div className="flex-1 w-full sm:w-auto">
//                 <DetailItem
//                   label="Reference code"
//                   value={referenceCode}
//                   fieldName="Reference code"
//                   showToast={showToast}
//                 />
//               </div>
//               <p className="text-sm font-medium text-neutral-900 dark:text-white sm:max-w-[200px] flex-shrink-0 mt-1 sm:mt-0">
//                 Include <strong className="text-primary font-bold">{referenceCode}</strong> as the reference or reason for your transfer.
//               </p>
//             </div>
//             <DetailItem
//               label="IBAN"
//               value={bankDetails.iban}
//               fieldName="IBAN"
//               showToast={showToast}
//             />
//             <DetailItem
//               label="Bank code (BIC/SWIFT)"
//               value={bankDetails.bicSwift}
//               fieldName="BIC/SWIFT"
//               showToast={showToast}
//             />
//             <DetailItem
//               label={`Amount to send (${payInCurrencyCode})`}
//               value={amountToPayFormatted === "N/A" ? "N/A" : `${amountToPayFormatted}`}
//               fieldName="Amount to send"
//               showToast={showToast}
//             />
//             <div className="bg-lightgray dark:bg-white/5 p-4 rounded-lg">
//               <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
//                 Our bank's address
//               </p>
//               <p className="font-semibold text-neutral-900 dark:text-white break-words">
//                 {bankAddress}
//               </p>
//             </div>
//           </div>
//         </div>

//         {error && !isLoading && (
//           <div className="my-4 bg-red-50 dark:bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
//             <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
//               <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//             </div>
//             <span className="text-red-700 dark:text-red-300/90">{error}</span>
//           </div>
//         )}

//         <div className="space-y-3 mt-5">
//           <button
//             onClick={handleIvePaid}
//             disabled={isSubmitting || isLoading}
//             className="flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 <span>Processing...</span>
//               </>
//             ) : (
//               "I’ve made my bank transfer"
//             )}
//           </button>
//           <button
//             onClick={handlePayLater}
//             disabled={isSubmitting || isLoading}
//             className="bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             I’ll transfer my money later
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PaymentDetailsPage;

// frontend/src/app/dashboard/balances/[balanceId]/payment-details/page.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext"; // Adjusted path
import paymentService from "../../../../services/payment"; // Adjusted path
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { Copy, AlertTriangle, Check } from "lucide-react";

// Import react-toastify and CustomToast
import {
  ToastContainer,
  toast as reactToastifyToast,
  Slide,
  ToastContainerProps,
  TypeOptions,
  ToastOptions,
} from "react-toastify"; // Added ToastOptions
import "react-toastify/dist/ReactToastify.css";
import CustomToast, {
  CustomToastProps,
} from "../../../../../app/components/CustomToast"; // Adjusted path

// --- PaymentDetails Interface ---
interface PaymentDetails {
  _id: string;
  user: string;
  balanceCurrency: { _id: string; code: string };
  payInCurrency: { _id: string; code: string };
  amountToAdd: number;
  amountToPay: number | string;
  exchangeRate: number;
  wiseFee: number;
  bankTransferFee: number;
  referenceCode: string;
  paymentMethod: string;
  status: string;
  bankDetails: {
    payeeName?: string;
    iban?: string;
    bicSwift?: string;
    bankAddress?: string;
  };
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

// --- DetailItem Component ---
interface DetailItemProps {
  label: string;
  value: string | undefined | null;
  fieldName: string;
  className?: string;
  showToast: (
    message: string,
    type?: CustomToastProps["type"],
    toastSpecificOptions?: Partial<ToastOptions>
  ) => void;
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  fieldName,
  className = "",
  showToast,
}) => {
  const displayValue =
    value !== undefined && value !== null ? String(value) : "N/A";
  const canCopy = displayValue && displayValue !== "N/A";

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (!canCopy || isCopied) {
      return;
    }

    navigator.clipboard
      .writeText(displayValue)
      .then(() => {
        setIsCopied(true);
        // No toast on successful copy as per original logic, only on error.
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error(`DetailItem (${fieldName}): Failed to copy text: `, err);
        showToast("Could not copy to clipboard.", "error");
        setIsCopied(false);
      });
  };

  const iconClasses = "size-3.5 mr-1 text-subheadingWhite";

  return (
    <div
      className={`bg-primarybox p-4 rounded-lg flex justify-between items-center gap-4 ${className}`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs text-subheadingWhite mb-1">{label}</p>
        <p className="font-semibold text-mainheadingWhite break-words">
          {displayValue}
        </p>
      </div>
      {canCopy && (
        <button
          type="button"
          onClick={handleCopyToClipboard}
          aria-label={`Copy ${label}`}
          className={`shrink-0 h-8 px-2.5 text-xs font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none rounded-md flex items-center justify-center text-subheadingWhite bg-secondarybox hover:bg-secondaryboxhover
            ${isCopied ? "cursor-default" : "cursor-pointer"}
          `}
          disabled={isCopied}
        >
          {isCopied ? (
            <Check className={iconClasses} aria-hidden="true" />
          ) : (
            <Copy className={iconClasses} aria-hidden="true" />
          )}
          {isCopied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
};
// --- End DetailItem Component ---

const PaymentDetailsPage = () => {
  // --- Hooks ---
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuth();

  // --- State ---
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Vars ---
  const balanceId = params.balanceId as string | undefined;
  const paymentId = searchParams.get("paymentId");

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
      toastSpecificOptions?: Partial<ToastOptions> // MODIFIED: Added toastSpecificOptions
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
          ...toastSpecificOptions, // MODIFIED: Spread additional options
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

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      setIsLoading(true);
      setError(null);
      // console.log("PaymentDetailsPage: Fetching details for paymentId:", paymentId, "balanceId:", balanceId);

      if (!paymentId) {
        setError("Payment ID is missing from URL.");
        setIsLoading(false);
        // console.error("PaymentDetailsPage: No paymentId found.");
        showToast("Payment ID missing. Redirecting...", "error");
        router.push(
          balanceId
            ? `/dashboard/balances/${balanceId}`
            : "/dashboard/transactions"
        );
        return;
      }
      if (!balanceId) {
        setError("Balance context is missing from URL.");
        setIsLoading(false);
        // console.error("PaymentDetailsPage: No balanceId found in route params.");
        showToast("Balance context missing. Redirecting...", "error");
        router.push("/dashboard/balances");
        return;
      }
      if (!token) {
        setError("Authentication required. Please log in.");
        setIsLoading(false);
        showToast("Authentication required. Redirecting to login...", "error");
        router.push("/auth/login");
        return;
      }

      try {
        const details = await paymentService.getPaymentDetails(
          paymentId,
          token
        );
        setPaymentDetails(details as unknown as PaymentDetails);
      } catch (err: unknown) {
        let errMsg = "Failed to load payment details";
        let statusCode: number | undefined;

        if (typeof err === "object" && err !== null && "response" in err) {
          const response = (
            err as {
              response?: { data?: { message?: string }; status?: number };
            }
          ).response;
          errMsg = response?.data?.message || errMsg;
          statusCode = response?.status;
        } else if (err instanceof Error) {
          errMsg = err.message;
        }

        setError(errMsg);
        // console.error("PaymentDetailsPage: Error fetching payment details:", err);

        if (statusCode === 404) {
          // setError(`Payment with ID ${paymentId} not found or you don't have access.`); // setError is still useful for on-page persistent errors
          showToast(`Payment with ID ${paymentId} not found.`, "error");
        } else if (statusCode === 401 || statusCode === 403) {
          // setError("Unauthorized to view this payment.");
          showToast("Unauthorized. Redirecting...", "error", {
            onClose: () => router.push("/dashboard"),
          });
          // router.push("/dashboard"); // Navigation handled by toast onClose
        } else {
          showToast(`Error: ${errMsg}`, "error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId, balanceId, token, router, showToast]);

  // --- Action Handlers ---
  const handleIvePaid = async () => {
    // console.log("PaymentDetailsPage: handleIvePaid triggered");
    setError(null);

    if (!paymentId || !token || !balanceId) {
      const missing = [
        !paymentId && "Payment ID",
        !token && "Token",
        !balanceId && "Balance ID",
      ]
        .filter(Boolean)
        .join(", ");
      const errorMsg = `Cannot proceed: Missing ${missing}. Please refresh or go back.`;
      setError(errorMsg); // Keep for on-page error display if needed
      // console.error("PaymentDetailsPage: Missing critical data for handleIvePaid:", { paymentId, token, balanceId });
      showToast(errorMsg, "error");
      return;
    }

    setIsSubmitting(true);
    // console.log("PaymentDetailsPage: Submitting... paymentId:", paymentId, "balanceId:", balanceId);

    let toastData: { message: string; type: CustomToastProps["type"] } | null =
      null;
    let shouldRedirect = false;
    const finalSuccessUrl = `/dashboard/balances/${balanceId}/payment-success?paymentId=${paymentId}`;

    try {
      try {
        // console.log("PaymentDetailsPage: Attempting paymentService.confirmUserTransfer");
        await paymentService.confirmUserTransfer(paymentId, token);
        // console.log("PaymentDetailsPage: confirmUserTransfer successful");
        toastData = {
          message: "Payment marked as initiated!",
          type: "success",
        };
        shouldRedirect = true;
      } catch (confirmErr: unknown) {
        let confirmErrMsg = "Could not confirm payment initiation";
        if (
          typeof confirmErr === "object" &&
          confirmErr !== null &&
          "response" in confirmErr
        ) {
          const response = (
            confirmErr as { response?: { data?: { message?: string } } }
          ).response;
          confirmErrMsg = response?.data?.message || confirmErrMsg;
        } else if (confirmErr instanceof Error) {
          confirmErrMsg = confirmErr.message;
        }
        // console.error("PaymentDetailsPage: Failed to update payment status via confirmUserTransfer:", confirmErrMsg, confirmErr);
        setError(
          `Note: Couldn't automatically update status: ${confirmErrMsg}. Redirecting anyway...`
        );
        toastData = {
          message: `Couldn't confirm payment status: ${confirmErrMsg}. Proceeding...`,
          type: "warning",
        };
        shouldRedirect = true;
      }

      if (toastData) {
        if (shouldRedirect) {
          showToast(toastData.message, toastData.type, {
            onClose: () => router.push(finalSuccessUrl),
            // autoClose will use the default from ToastContainer (5000ms)
          });
          // setIsSubmitting will remain true until navigation occurs via toast onClose
        } else {
          // This path might not be hit if toastData always implies redirection in current logic
          showToast(toastData.message, toastData.type);
          setIsSubmitting(false);
        }
      } else {
        // Fallback if no toastData was set (should not happen with current logic)
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      // Outer catch for unexpected errors during the process
      let errMsg = "An unexpected error occurred while trying to proceed.";
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        errMsg = response?.data?.message || errMsg;
      } else if (err instanceof Error) {
        errMsg = err.message;
      }
      setError(`Failed to proceed: ${errMsg}`);
      // console.error("PaymentDetailsPage: Error during handleIvePaid (outer catch):", err);
      showToast(`Failed to proceed: ${errMsg}`, "error");
      setIsSubmitting(false); // Error, so reset submit state, no redirect from here
    }
  };

  const handlePayLater = () => {
    // console.log("PaymentDetailsPage: handlePayLater triggered, navigating to /dashboard/transactions");
    showToast(
      "You can find this payment later in your transactions list.",
      "info",
      {
        onClose: () => router.push("/dashboard/transactions"),
      }
    );
    // router.push("/dashboard/transactions"); // Navigation handled by toast onClose
  };
  // --- END Action Handlers ---

  // --- Render Logic ---

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-2xl relative">
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        {/* Skeleton structure remains the same */}
        <Skeleton className="h-8 w-3/5 mb-2 mx-auto" />
        <Skeleton className="h-4 w-4/5 mb-6 mx-auto" />
        <div className="border p-4 sm:p-6 rounded-xl mb-8">
          <Skeleton className="h-6 w-1/2 mb-5" />
          <div className="space-y-4 mb-6">
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[90px] w-full rounded-lg" />
          </div>
        </div>
        <div className="border p-4 rounded-lg mb-8">
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-3/4 mb-3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    );
  }

  if (!isLoading && error && !paymentDetails) {
    return (
      <div className="mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-300 md:max-w-lg relative">
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg flex flex-col items-center space-y-2 mb-6">
          <AlertTriangle className="w-6 h-6" />
          <p className="font-semibold">Error Loading Payment Details</p>
          <p className="text-sm">{error}</p>{" "}
          {/* This 'error' state is for persistent on-page error messages */}
        </div>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
        <Button
          onClick={() => router.push("/dashboard/transactions")}
          variant="link"
          className="mt-4 bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center cursor-pointer transition-all duration-75 ease-linear"
        >
          View Transactions
        </Button>
      </div>
    );
  }

  if (!isLoading && (!paymentDetails || !balanceId)) {
    // console.warn("Rendering 'Not Found' state because paymentDetails or balanceId is missing after loading.", { hasPaymentDetails: !!paymentDetails, hasBalanceId: !!balanceId });
    return (
      <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center relative">
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
          Payment details could not be found, are no longer valid, or the page
          context is incorrect.
        </p>
        <button
          onClick={() => router.push("/dashboard/transactions")}
          className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
        >
          View Transactions
        </button>
      </div>
    );
  }

  if (!paymentDetails) {
    // console.error("PaymentDetailsPage: Reached render section unexpectedly with null paymentDetails.");
    return (
      <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center relative">
        <ToastContainer
          {...toastContainerProps}
          style={getToastContainerStyle()}
        />
        <p className="lg:text-xl text-lg text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
          Something went wrong loading payment details. Please try again.
        </p>
        <button
          onClick={() => router.push("/dashboard/transactions")}
          className="bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 sm:w-auto w-full text-center cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
        >
          View Transactions
        </button>
      </div>
    );
  }

  const payInCurrencyCode = paymentDetails.payInCurrency?.code || "N/A";
  const amountRaw = paymentDetails.amountToPay;
  let amountValue: number;
  if (typeof amountRaw === "number") {
    amountValue = amountRaw;
  } else if (typeof amountRaw === "string") {
    amountValue = parseFloat(amountRaw.replace(/,/g, ""));
    if (isNaN(amountValue))
      console.error("Failed to parse amountToPay string:", amountRaw);
  } else {
    amountValue = NaN;
    console.error("Unexpected type for amountToPay:", typeof amountRaw);
  }
  const amountToPayFormatted = isNaN(amountValue)
    ? "N/A"
    : amountValue.toFixed(2);

  const bankDetails = paymentDetails.bankDetails || {};
  const referenceCode = paymentDetails.referenceCode || "N/A";
  const defaultBankAddress =
    "Remityn Europe SA/NV\nRue du Trône 100, box 3\nBrussels 1050\nBelgium";
  const bankAddress = bankDetails.bankAddress || defaultBankAddress;

  return (
    <section className="Payment-Details relative">
      <ToastContainer
        {...toastContainerProps}
        style={getToastContainerStyle()}
      />
      <div className="mx-auto lg:max-w-2xl">
        <h1 className="lg:text-3xl md:text-2xl text-xl lg:text-center font-semibold text-mainheadingWhite mb-2.5">
          Use your bank to make a payment to Remityn
        </h1>
        <p className="lg:text-base text-sm text-subheadingWhite lg:mb-10 mb-5 text-left lg:text-center">
          Make a {`${payInCurrencyCode}`} payment — not an international one —
          using the details below.
        </p>

        <div className="rounded-xl bg-background border p-4">
          <h2 className="lg:text-lg text-base font-medium mb-4 text-mainheadingWhite">
            Details you'll need to make this transfer
          </h2>
          <div className="lg:space-y-4 space-y-2.5">
            <DetailItem
              label="Payee name"
              value={bankDetails.payeeName || "Remityn Europe SA"}
              fieldName="Payee name"
              showToast={showToast}
            />
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex-1 w-full sm:w-auto">
                <DetailItem
                  label="Reference code"
                  value={referenceCode}
                  fieldName="Reference code"
                  showToast={showToast}
                />
              </div>
              <p className="text-sm font-medium text-mainheadingWhite sm:max-w-[200px] flex-shrink-0 mt-1 sm:mt-0">
                Include{" "}
                <strong className="text-primary font-bold">
                  {referenceCode}
                </strong>{" "}
                as the reference or reason for your transfer.
              </p>
            </div>
            <DetailItem
              label="IBAN"
              value={bankDetails.iban}
              fieldName="IBAN"
              showToast={showToast}
            />
            <DetailItem
              label="Bank code (BIC/SWIFT)"
              value={bankDetails.bicSwift}
              fieldName="BIC/SWIFT"
              showToast={showToast}
            />
            <DetailItem
              label={`Amount to send (${payInCurrencyCode})`}
              value={
                amountToPayFormatted === "N/A"
                  ? "N/A"
                  : `${amountToPayFormatted}`
              }
              fieldName="Amount to send"
              showToast={showToast}
            />
            <div className="bg-primarybox p-4 rounded-lg">
              <p className="text-xs text-subheadingWhite mb-1">
                Our bank's address
              </p>
              <p className="font-semibold text-mainheadingWhite break-words">
                {bankAddress}
              </p>
            </div>
          </div>
        </div>

        {error &&
          !isLoading && ( // For persistent on-page errors, if any, set by setError()
            <div className="my-4 bg-red-900/25 border border-red-500 rounded-lg p-3 flex items-center gap-3">
              <div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-red-600/20">
                <AlertTriangle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
              </div>
              <span className="text-red-300/90">{error}</span>
            </div>
          )}

        <div className="space-y-3 mt-5">
          <button
            onClick={handleIvePaid}
            disabled={isSubmitting || isLoading}
            className="flex items-center justify-center bg-primary text-mainheading hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-5 w-5 text-neutral-900 animate-spin mr-2"
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
              "I’ve made my bank transfer"
            )}
          </button>
          <button
            onClick={handlePayLater}
            disabled={isSubmitting || isLoading}
            className="text-primary bg-primarybox hover:bg-secondarybox font-medium rounded-full px-8 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
          >
            I’ll transfer my money later
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetailsPage;
