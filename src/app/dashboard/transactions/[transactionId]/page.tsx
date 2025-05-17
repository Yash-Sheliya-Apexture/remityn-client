// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import { useAuth } from "../../../hooks/useAuth";
// import axios, { AxiosError } from "axios"; // Import AxiosError
// import apiConfig from "../../../config/apiConfig";
// import { cn } from "@/lib/utils";

// axios.defaults.baseURL = apiConfig.baseUrl;

// interface PaymentDetailsPageParams {
//   transactionId: string;
// }

// interface PaymentDetails {
//   _id: string;
//   user: {
//     _id: string;
//     email: string;
//   };
//   balanceCurrency: any;
//   payInCurrency: any;
//   amountToAdd: number;
//   amountToPay: number;
//   exchangeRate: number;
//   wiseFee: number;
//   bankTransferFee: number;
//   referenceCode: string;
//   transactionNumber?: string;
//   paymentMethod: string;
//   status: string;
//   bankDetails: {
//     payeeName?: string;
//     iban?: string;
//     bicSwift?: string;
//     bankAddress?: string;
//   };
//   createdAt: string;
//   __v: number;
//   note?: string;
// }

// const PaymentDetailsPage = () => {
//   const params = useParams<PaymentDetailsPageParams>();
//   const router = useRouter();
//   const { transactionId } = params;

//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//   const [noteText, setNoteText] = useState("");
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         if (!transactionId) {
//           setError("Payment ID is missing.");
//           setIsLoading(false);
//           return;
//         }
//         const response = await axios.get(`/payments/${transactionId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = response.data as PaymentDetails;
//         setPaymentDetails(data);
//         setNoteText(data.note || "");
//         setIsLoading(false);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Failed to load payment details"
//         );
//         setIsLoading(false);
//         console.error("Error fetching payment details:", err);
//         if (err.response?.status === 404) {
//           router.push("/dashboard");
//         }
//       }
//     };

//     fetchPaymentDetails();
//   }, [transactionId, token, router]);

//   useEffect(() => {
//     if (paymentDetails) {
//       setNoteText(paymentDetails.note || "");
//     }
//   }, [paymentDetails]);

//   if (isLoading) {
//     return <div>Loading payment details...</div>;
//   }

//   if (error || !paymentDetails) {
//     return (
//       <div className="text-red-500">
//         Error: {error || "Payment details not found."}
//       </div>
//     );
//   }

//   const payInCurrencyCode = paymentDetails.payInCurrency.code;
//   const amountToPay = parseFloat(paymentDetails.amountToPay).toFixed(2);
//   const bankDetails = paymentDetails.bankDetails || {};
//   const balanceCurrencyCode = paymentDetails.balanceCurrency.code;
//   const amountToAdd = parseFloat(paymentDetails.amountToAdd).toFixed(2);
//   const wiseFee = parseFloat(paymentDetails.wiseFee).toFixed(2);
//   const createdAtDate = paymentDetails.createdAt
//     ? new Date(paymentDetails.createdAt)
//     : null;
//   const formattedDate = createdAtDate
//     ? createdAtDate.toLocaleDateString("en-US", {
//         month: "long",
//         day: "numeric",
//       }) +
//       " at " +
//       createdAtDate.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//       })
//     : "Date not available";
//   const userEmail = paymentDetails.user.email || "Recipient Email Placeholder";

//   const handleCopyToClipboard = (text: string, fieldName: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert(`${fieldName} copied to clipboard!`);
//       })
//       .catch((err) => {
//         console.error("Failed to copy text: ", err);
//         alert(`Failed to copy ${fieldName}. Please copy manually.`);
//       });
//   };

//   const handleCancelPayment = async () => {
//     if (!transactionId) {
//       alert("Payment ID is missing, cannot cancel.");
//       return;
//     }

//     if (
//       paymentDetails?.status !== "pending" &&
//       paymentDetails?.status !== "in progress"
//     ) {
//       alert(
//         "This payment cannot be cancelled as it is not in 'pending' or 'in progress' status."
//       );
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       await axios.post(`/payments/${transactionId}/cancel`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Payment successfully cancelled.");
//       router.push("/dashboard");
//     } catch (err: any) {
//       // Improved error handling for Axios errors
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError;
//         if (axiosError.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           setError(
//             `Failed to cancel payment: ${
//               axiosError.response.data.message || "Request failed"
//             } (Status ${axiosError.response.status})`
//           );
//           console.error(
//             "Error cancelling payment (server response):",
//             axiosError.response.data
//           );
//         } else if (axiosError.request) {
//           // The request was made but no response was received
//           setError(
//             "Failed to cancel payment: No response from server. Please check your network."
//           );
//           console.error("Error cancelling payment (no response):", axiosError.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           setError(
//             `Failed to cancel payment: ${axiosError.message}. Please try again.`
//           );
//           console.error(
//             "Error cancelling payment (request setup):",
//             axiosError.message
//           );
//         }
//       } else {
//         // Non-Axios error
//         setError("Failed to cancel payment: An unexpected error occurred.");
//         console.error("Error cancelling payment (non-axios error):", err);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNoteText(e.target.value);
//   };

//   const timelineSteps = [
//     {
//       label: "You set up your transfer",
//       status: "completed",
//       date: formattedDate,
//     },
//     {
//       label: "We’re waiting for your money",
//       status:
//         paymentDetails.status === "pending" ||
//         paymentDetails.status === "in progress"
//           ? "active"
//           : "pending",
//     },
//     { label: `We receive your ${balanceCurrencyCode}`, status: "pending" },
//     { label: `We pay out your ${payInCurrencyCode}`, status: "pending" },
//     {
//       label: `${userEmail} receives your ${balanceCurrencyCode}`,
//       status: "pending",
//       recipientEmail: userEmail,
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-2"
//       >
//         <IoIosArrowBack size={20} /> Back
//       </button>

//       <div className="bg-white rounded-2xl border  mx-auto">
//         <div className="px-6 pt-6 pb-2 flex items-start gap-4 border-b">
//           <div className="rounded-full bg-gray-100 p-2 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-plus"
//             >
//               <path d="M12 5v14" />
//               <path d="M5 12h14" />
//             </svg>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">
//               To your {balanceCurrencyCode} balance
//             </h2>
//             <p className="text-sm text-gray-500">Waiting for your money</p>
//           </div>
//           <div className="ml-auto font-semibold">
//             {amountToAdd} {balanceCurrencyCode}
//           </div>
//         </div>

//         <div className="border-b border-gray-200 px-6">
//           <nav className="-mb-px flex justify-between" aria-label="Tabs">
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setActiveTab("Updates")}
//                 className={cn(
//                   "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700",
//                   activeTab === "Updates"
//                     ? "border-indigo-500 text-indigo-600"
//                     : ""
//                 )}
//                 aria-current={activeTab === "Updates" ? "page" : undefined}
//               >
//                 Updates
//               </button>
//               <button
//                 onClick={() => setActiveTab("Details")}
//                 className={cn(
//                   "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700",
//                   activeTab === "Details"
//                     ? "border-indigo-500 text-indigo-600"
//                     : ""
//                 )}
//                 aria-current={activeTab === "Details" ? "page" : undefined}
//               >
//                 Details
//               </button>
//             </div>
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === "Updates" && (
//             <div>
//               <div className="flex items-center mb-4">
//                 <span className="text-sm text-gray-500">Reference Code</span>
//                 <span className="ml-2 text-sm font-medium">
//                   {paymentDetails.referenceCode}
//                 </span>
//               </div>
//               <div className="relative mt-6">
//                 <ul className="space-y-6">
//                   {timelineSteps.map((step, index) => (
//                     <li key={index} className="flex space-x-3">
//                       <div className="relative">
//                         <div
//                           className={cn(
//                             "h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center",
//                             step.status === "completed" && "bg-gray-200",
//                             step.status === "active" && "bg-indigo-600"
//                           )}
//                         >
//                           {step.status === "completed" && (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="14"
//                               height="14"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               className="lucide lucide-check"
//                             >
//                               <path d="M20 6 9 17l-5-5" />
//                             </svg>
//                           )}
//                         </div>
//                         {index < timelineSteps.length - 1 && (
//                           <div
//                             className="absolute top-0 left-2 h-full w-0.5 bg-gray-200"
//                             aria-hidden="true"
//                           ></div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         {step.date && (
//                           <p className="text-sm text-gray-500">{step.date}</p>
//                         )}
//                         <h4
//                           className={cn(
//                             "text-sm font-semibold",
//                             step.status === "pending" && "text-gray-500"
//                           )}
//                         >
//                           {step.label}
//                         </h4>
//                         {step.status === "active" &&
//                           step.label === "We’re waiting for your money" && (
//                             <div className="mt-1">
//                               <p className="text-sm text-gray-500">
//                                 If you’ve already sent the money from your bank
//                                 to Wise, it’s on its way to us. We’ll let you
//                                 know when it’s arrived.
//                               </p>
//                               <button className="bg-white border border-gray-300 rounded-md py-2 px-3 mt-4 text-sm font-medium">
//                                 I’ve not paid
//                               </button>
//                             </div>
//                           )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="mt-8 flex justify-end">
//                 <button
//                   onClick={handleCancelPayment}
//                   className="bg-white text-red-500 border border-red-500 rounded-md py-2 px-4 text-sm font-medium"
//                 >
//                   Cancel transfer
//                 </button>
//               </div>
//             </div>
//           )}
//           {activeTab === "Details" && (
//             <div>
//               <div>
//                 <h3 className="text-sm font-semibold mb-4">
//                   Transaction details
//                 </h3>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">You're sending</span>
//                   <span className="font-medium text-sm">
//                     {amountToAdd} {balanceCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">Wise fees</span>
//                   <span className="font-medium text-sm">
//                     {wiseFee} {payInCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-gray-500 text-sm">
//                     You will receive
//                   </span>
//                   <span className="font-medium text-sm">
//                     {amountToAdd} {balanceCurrencyCode}
//                   </span>
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <span className="text-gray-500 text-sm">Reference Code</span>
//                   <span className="font-medium text-sm">
//                     {paymentDetails.referenceCode}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <h3 className="text-sm font-semibold mb-4 mr-8">Note</h3>
//                   <textarea
//                     id="note"
//                     className="bg-gray-100 rounded-md p-3 text-sm text-gray-700 w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-200"
//                     placeholder="Add a few notes to help you later"
//                     value={noteText}
//                     onChange={handleNoteChange}
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { IoIosArrowBack } from "react-icons/io";
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if necessary
// import axios, { AxiosError } from "axios";
// import apiConfig from "../../../config/apiConfig"; // Adjust path if necessary
// import { cn } from "@/lib/utils"; // Adjust path if necessary
// import paymentService from "../../../services/payment"; // Adjust path if necessary
// import transferService from "../../../services/transfer"; // Adjust path if necessary
// import { format, parseISO } from 'date-fns';
// import CancelTransferModal from "../../components/CancelTransferModal"; // <-- Import the modal

// axios.defaults.baseURL = apiConfig.baseUrl;

// // --- Interfaces (Keep existing PaymentDetails, TransferDetails, TransactionDetails, TransactionDetailsPageParams) ---
// // Interface for Payment Details
// interface PaymentDetails {
//     _id: string;
//     type: 'payment';
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string };
//     payInCurrency: { _id: string; code: string; flagImage?: string };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode?: string;
//     transactionNumber?: string;
//     paymentMethod: string;
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled';
//     bankDetails?: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }

// // Interface for Transfer Details
// interface TransferDetails {
//     _id: string;
//     type: 'transfer';
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: {
//         _id: string;
//         currency: { _id: string; code: string; flagImage?: string };
//     };
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string };
//         accountNumber: string;
//         bankName: string;
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number;
//     reason?: string;
//     reference?: string;
//     // Ensure 'processing' is a valid status if used
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
//     transactionId?: string;
//     failureReason?: string;
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }

// // Union type
// type TransactionDetails = PaymentDetails | TransferDetails;

// // Params interface
// interface TransactionDetailsPageParams {
//     transactionId: string;
// }

// // --- Component ---
// const TransactionDetailsPage = () => {
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params;
//     const { token } = useAuth();

//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false); // State for button loading

//     // --- State for Cancel Modal ---
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

//     // --- Data Fetching (keep existing fetchTransactionDetails) ---
//      const fetchTransactionDetails = useCallback(async () => {
//         // ... (keep existing fetch logic for both transfers and payments) ...
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         setTransactionDetails(null); // Reset details on fetch

//         try {
//             // Try fetching as a Transfer first
//             try {
//                 console.log(`Attempting to fetch Transfer details for ID: ${transactionId}`);
//                 const transferData = await transferService.getTransferDetails(transactionId, token);
//                 console.log("Fetched Transfer Data:", transferData);
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || "");
//                 setIsLoading(false);
//                 return;
//             } catch (transferErr: any) {
//                  console.warn(`Failed to fetch as Transfer (ID: ${transactionId}):`, transferErr.response?.data?.message || transferErr.message);
//                  if (transferErr.response?.status !== 404 && transferErr.message !== 'Transfer not found or access denied.' && !transferErr.message?.includes('Invalid transfer ID format')) {
//                      throw transferErr;
//                  }
//             }

//             // If not found as Transfer, try fetching as Payment
//             try {
//                  console.log(`Attempting to fetch Payment details for ID: ${transactionId}`);
//                  const paymentData = await paymentService.getPaymentDetails(transactionId, token);
//                  console.log("Fetched Payment Data:", paymentData);
//                  setTransactionDetails({ ...paymentData, type: 'payment' });
//                  setNoteText(paymentData.note || "");
//                  setIsLoading(false);
//                  return;
//             } catch (paymentErr: any) {
//                  console.error(`Failed to fetch as Payment (ID: ${transactionId}):`, paymentErr.response?.data?.message || paymentErr.message);
//                  if (paymentErr.response?.status === 404 || paymentErr.message === 'Payment not found.') {
//                      setError(`Transaction with ID ${transactionId} not found.`);
//                  } else {
//                      throw paymentErr;
//                  }
//             }

//             // If neither fetch worked and no error was thrown previously
//             if (!transactionDetails && !error) {
//                  setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//             }

//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || "Failed to load transaction details";
//             setError(message);
//             console.error("Error fetching transaction details:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [transactionId, token]);

//     useEffect(() => {
//         fetchTransactionDetails();
//     }, [fetchTransactionDetails]);

//     // --- Loading & Error States (keep existing) ---
//     if (isLoading) {
//         // ... loading JSX ...
//          return <div className="container mx-auto px-4 py-8 text-center">Loading transaction details...</div>;
//     }
//     if (error || !transactionDetails) {
//         // ... error JSX ...
//         return (
//             <div className="container mx-auto px-4 py-8">
//                  <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                     <IoIosArrowBack size={20} /> Back
//                 </button>
//                 <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//                     Error: {error || "Transaction details not found or could not be loaded."}
//                 </div>
//             </div>
//         );
//     }

//     // --- Helper Functions & Derived Data (keep existing) ---
//     const isPayment = transactionDetails.type === 'payment';
//     const isTransfer = transactionDetails.type === 'transfer';
//     const formatDisplayDate = (dateString: string | undefined): string => {
//          // ... (keep existing date formatting logic) ...
//          if (!dateString) return "Date not available";
//         try {
//             return format(parseISO(dateString), "MMMM d 'at' h:mm a");
//         } catch (e) {
//             console.error("Date formatting error:", e);
//             const date = new Date(dateString);
//             if (isNaN(date.getTime())) return "Invalid Date";
//             return date.toLocaleDateString("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
//         }
//     };
//      const getTimelineSteps = () => {
//         // ... (keep existing timeline logic) ...
//          if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(payment.createdAt);
//              const isWaiting = payment.status === 'pending' || payment.status === 'in progress';
//              const isComplete = payment.status === 'completed';
//              const isCancelled = payment.status === 'canceled';
//              const hasFailed = payment.status === 'failed';

//              return [
//                  { label: "You set up your transfer", status: 'completed', date: createdDate },
//                  { label: "We’re waiting for your money", status: isWaiting ? 'active' : (isComplete || isCancelled || hasFailed ? 'completed' : 'pending') },
//                  { label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isCancelled || hasFailed || isWaiting ? 'pending' : 'pending') },
//                  { label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: isComplete ? 'completed' : 'pending' },
//                  { label: "All done!", status: isComplete ? 'completed' : 'pending' },
//              ];
//         } else if (isTransfer) {
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(transfer.createdAt);
//             const updatedDate = formatDisplayDate(transfer.updatedAt);

//              const isSetup = true;
//              // Define cancellable statuses here for consistency
//              const isCancellable = transfer.status === 'pending' || transfer.status === 'processing';
//              const isProcessing = transfer.status === 'processing'; // Might be the same as cancellable
//              const isComplete = transfer.status === 'completed';
//              const isCancelled = transfer.status === 'canceled';
//              const hasFailed = transfer.status === 'failed';

//              return [
//                  { label: "You set up your transfer", status: 'completed', date: createdDate },
//                  { label: `We've taken the funds from your ${transfer.sendCurrency?.code || ''} account`, status: isSetup && !isCancelled && !hasFailed ? 'completed' : 'pending', date: createdDate },
//                  { label: `We paid out your ${transfer.receiveCurrency?.code || ''}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : (isCancelled || hasFailed ? 'pending' : 'pending')), date: isComplete || isProcessing ? updatedDate : undefined },
//                  { label: `Transfer successfully sent to your recipient's bank`, status: isComplete ? 'completed' : (isProcessing ? 'active' : 'pending'), date: isComplete ? updatedDate : undefined },
//              ];
//         }
//         return [];
//     };
//     const timelineSteps = getTimelineSteps();

//     // --- Event Handlers ---

//     // Keep existing handleCancelPayment
//     const handleCancelPayment = async () => {
//         if (!isPayment || !transactionId) return;
//         const payment = transactionDetails as PaymentDetails;
//         if (payment.status !== "pending" && payment.status !== "in progress") {
//             alert("This payment cannot be cancelled in its current status."); return;
//         }
//         const confirmCancel = window.confirm("Are you sure you want to cancel this payment?");
//         if (!confirmCancel) return;
//         setIsSubmitting(true); setError(null);
//         try {
//             await paymentService.cancelPayment(transactionId, token);
//             alert("Payment successfully cancelled.");
//             fetchTransactionDetails();
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || "Failed to cancel payment";
//             setError(message); console.error("Error cancelling payment:", err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // --- Handler for Confirming Transfer Cancellation ---
//     const handleConfirmCancelTransfer = async () => {
//         if (!isTransfer || !transactionId) return;

//         setIsSubmitting(true); // Indicate loading
//         setError(null);
//         try {
//             // Assuming transferService.cancelTransfer exists and takes (id, token)
//             await transferService.cancelTransfer(transactionId, token);
//             setIsCancelModalOpen(false); // Close modal on success
//             alert("Transfer successfully cancelled."); // Simple feedback
//             fetchTransactionDetails(); // Refresh details
//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || "Failed to cancel transfer";
//             setError(message); // Show error to user
//             console.error("Error cancelling transfer:", err);
//             // Optionally close modal on error too, or keep open to show error message nearby
//             setIsCancelModalOpen(false);
//         } finally {
//             setIsSubmitting(false); // Reset loading state
//         }
//     };

//     // Keep existing handleNoteChange
//      const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNoteText(e.target.value);
//          console.warn("Note editing UI enabled, but saving is not implemented yet.");
//     };

//     // --- Determine if Transfer is Cancellable ---
//     const isTransferCancellable = isTransfer &&
//         (transactionDetails.status === 'pending' || transactionDetails.status === 'processing');

//     // --- Determine if Payment is Cancellable ---
//      const isPaymentCancellable = isPayment &&
//         (transactionDetails.status === 'pending' || transactionDetails.status === 'in progress');

//     // --- Render Logic ---
//     // Keep existing headerIcon, headerTitle, etc. definitions
//     const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
//     const headerTitle = isPayment
//         ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code} balance`
//         : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
//     const headerAmount = isPayment
//         ? `${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`
//         : `${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`;
//     const headerAmountSign = isPayment ? "+" : "-";
//     const headerStatusText =
//         transactionDetails.status === 'pending' ? (isPayment ? "Waiting for your money" : "Transfer initiated") :
//         transactionDetails.status === 'in progress' ? (isPayment ? "Processing payment" : "Transfer in progress") : // Use generic "in progress" if backend doesn't have "processing"
//         transactionDetails.status === 'processing' ? "Transfer processing" :
//         transactionDetails.status === 'completed' ? (isPayment ? "Money added" : "Transfer completed") :
//         transactionDetails.status === 'canceled' ? "Transaction canceled" :
//         transactionDetails.status === 'failed' ? "Transaction failed" : "Status unknown";

//     return (
//         <> {/* Use Fragment to wrap page and modal */}
//             <div className="container mx-auto px-4 py-8">
//                 <button
//                     onClick={() => router.back()}
//                     className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
//                 >
//                     <IoIosArrowBack size={20} /> Back
//                 </button>

//                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto max-w-4xl">
//                     {/* --- Header (keep existing) --- */}
//                     <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200">
//                          <div className={`rounded-full p-2 flex items-center justify-center ${isPayment ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
//                              {headerIcon}
//                          </div>
//                          <div className="flex-grow">
//                              <h2 className="text-lg font-semibold text-gray-800">{headerTitle}</h2>
//                               <p className={cn("text-sm", transactionDetails.status === 'completed' ? 'text-green-600' : transactionDetails.status === 'canceled' || transactionDetails.status === 'failed' ? 'text-red-600' : 'text-gray-500')}>
//                                  {headerStatusText}
//                              </p>
//                          </div>
//                          <div className={cn("ml-auto font-semibold whitespace-nowrap", isPayment ? 'text-green-600' : 'text-gray-800')}>
//                              {headerAmountSign} {headerAmount}
//                          </div>
//                     </div>

//                     {/* --- Tabs (keep existing) --- */}
//                     <div className="border-b border-gray-200 px-6">
//                         <nav className="-mb-px flex justify-between" aria-label="Tabs">
//                              <div className="flex space-x-4">
//                                 <button onClick={() => setActiveTab("Updates")} className={cn( "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Updates" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700")} aria-current={activeTab === "Updates" ? "page" : undefined}> Updates </button>
//                                 <button onClick={() => setActiveTab("Details")} className={cn( "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Details" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700")} aria-current={activeTab === "Details" ? "page" : undefined}> Details </button>
//                             </div>
//                         </nav>
//                     </div>

//                     {/* --- Tab Content --- */}
//                     <div className="p-6">
//                         {/* --- Updates Tab --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference (keep existing) */}
//                                  <div className="flex items-center mb-6 text-sm">
//                                     <span className="text-gray-500 w-28"> {isPayment ? "Reference Code" : "Transfer ID"} </span>
//                                     <span className="ml-2 font-medium text-gray-700"> {isPayment ? (transactionDetails as PaymentDetails).referenceCode : transactionDetails._id} </span>
//                                 </div>

//                                 {/* Timeline (keep existing) */}
//                                  <div className="relative mt-6">
//                                     {/* ... timelineSteps mapping ... */}
//                                      {timelineSteps.length > 0 ? (
//                                         <ul className="space-y-6">
//                                             {timelineSteps.map((step, index) => (
//                                                 <li key={index} className="flex items-start space-x-3">
//                                                      {/* Marker */}
//                                                     <div className="relative flex flex-col items-center">
//                                                         <div className={cn("h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white", step.status === "completed" && "bg-green-500 text-white", step.status === "active" && "bg-indigo-600 text-white", step.status === "pending" && "bg-gray-300")}>
//                                                              {step.status === "completed" && (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /> </svg>)}
//                                                              {step.status === "active" && (<div className="h-2 w-2 bg-white rounded-full"></div>)}
//                                                          </div>
//                                                          {/* Line */}
//                                                          {index < timelineSteps.length - 1 && (<div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%-1.25rem+1.5rem)] w-0.5 bg-gray-200" aria-hidden="true"></div>)}
//                                                     </div>
//                                                      {/* Content */}
//                                                      <div className="flex-1 pb-6">
//                                                         <h4 className={cn("text-sm font-semibold", step.status === 'pending' ? 'text-gray-500' : 'text-gray-800')}>{step.label}</h4>
//                                                          {step.date && (<p className="text-xs text-gray-500 mt-0.5">{step.date}</p>)}
//                                                          {/* Specific messages */}
//                                                          {step.status === 'active' && isPayment && step.label === "We’re waiting for your money" && ( <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200"> <p> Please send exactly <strong className="font-medium">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</strong> to the bank details provided in the 'Details' tab using the reference <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong>. </p> <p className="mt-1">We'll notify you once received.</p> </div> )}
//                                                          {step.status === 'active' && isTransfer && step.label.includes("paid out") && ( <div className="mt-1 text-sm text-gray-500"> <p>We're processing the payment to your recipient's bank. This can take up to 2 working days.</p> </div> )}
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     ) : ( <p className="text-gray-500 text-sm">Status updates will appear here.</p> )}
//                                 </div>

//                                 {/* --- Action Buttons --- */}
//                                 <div className="mt-8 flex justify-end space-x-3">
//                                     {/* Show Cancel Payment Button */}
//                                     {isPaymentCancellable && (
//                                         <button
//                                             onClick={handleCancelPayment}
//                                             disabled={isSubmitting} // Use isSubmitting state
//                                             className="bg-white text-red-600 border border-red-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             {isSubmitting ? 'Cancelling...' : 'Cancel Payment'}
//                                         </button>
//                                     )}
//                                     {/* Show Cancel Transfer Button */}
//                                     {isTransferCancellable && (
//                                         <button
//                                             onClick={() => setIsCancelModalOpen(true)} // Open the modal
//                                             disabled={isSubmitting}
//                                             className="bg-white text-red-600 border border-red-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             Cancel Transfer
//                                         </button>
//                                     )}
//                                 </div>
//                                 {/* Display general submission error if any */}
//                                 {error && !isLoading && activeTab === 'Updates' && <p className="mt-4 text-sm text-red-600 text-right">{error}</p>}
//                             </div>
//                         )}

//                         {/* --- Details Tab (keep existing) --- */}
//                          {activeTab === "Details" && (
//                             <div className="space-y-6">
//                                 {/* Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2">Transaction details</h3>
//                                      <dl className="space-y-2 text-sm">
//                                         {isPayment && ( <> <div className="flex justify-between"> <dt className="text-gray-500">Amount to add</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).amountToAdd.toFixed(2)} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Wise fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).wiseFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div> {(transactionDetails as PaymentDetails).bankTransferFee > 0 && <div className="flex justify-between"> <dt className="text-gray-500">Bank transfer fee</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as PaymentDetails).bankTransferFee.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>} <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Total to pay</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as PaymentDetails).amountToPay.toFixed(2)} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Reference Code</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).referenceCode}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Payment Method</dt> <dd className="font-medium text-gray-800 capitalize">{(transactionDetails as PaymentDetails).paymentMethod.replace('_', ' ')}</dd> </div> </> )}
//                                         {isTransfer && ( <> <div className="flex justify-between"> <dt className="text-gray-500">You sent</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).sendAmount.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Exchange rate</dt> <dd className="font-medium text-gray-800">{`1 ${(transactionDetails as TransferDetails).sendCurrency?.code} = ${(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Fees</dt> <dd className="font-medium text-gray-800">{`${(transactionDetails as TransferDetails).fees.toFixed(2)} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div> <div className="flex justify-between border-t pt-2 mt-2"> <dt className="text-gray-600 font-medium">Recipient gets</dt> <dd className="font-bold text-gray-900">{`${(transactionDetails as TransferDetails).receiveAmount.toFixed(2)} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div> {(transactionDetails as TransferDetails).reason && <div className="flex justify-between"> <dt className="text-gray-500">Reason</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reason}</dd> </div>} {(transactionDetails as TransferDetails).reference && <div className="flex justify-between"> <dt className="text-gray-500">Reference</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).reference}</dd> </div>} </> )}
//                                           <div className="flex justify-between"> <dt className="text-gray-500">Date Initiated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                           <div className="flex justify-between"> <dt className="text-gray-500">Last Updated</dt> <dd className="font-medium text-gray-800">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                     </dl>
//                                 </div>
//                                 {/* Pay-in / Recipient Details */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2"> {isPayment ? 'Pay-in Bank Details' : 'Recipient Details'} </h3>
//                                      {isPayment && (transactionDetails as PaymentDetails).bankDetails && ( <dl className="space-y-2 text-sm"> {(transactionDetails as PaymentDetails).bankDetails?.payeeName && <div className="flex justify-between"> <dt className="text-gray-500">Payee Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.payeeName}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.iban && <div className="flex justify-between"> <dt className="text-gray-500">IBAN</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.iban}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.bicSwift && <div className="flex justify-between"> <dt className="text-gray-500">BIC/SWIFT</dt> <dd className="font-mono text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift}</dd> </div>} {(transactionDetails as PaymentDetails).bankDetails?.bankAddress && <div className="flex justify-between"> <dt className="text-gray-500">Bank Address</dt> <dd className="font-medium text-gray-800">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress}</dd> </div>} <p className="text-xs text-gray-500 pt-2">Please ensure you use the Reference Code <strong className="font-medium">{(transactionDetails as PaymentDetails).referenceCode}</strong> when making the payment from your bank.</p> </dl> )}
//                                      {isTransfer && (transactionDetails as TransferDetails).recipient && ( <dl className="space-y-2 text-sm"> <div className="flex justify-between"> <dt className="text-gray-500">Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div> {(transactionDetails as TransferDetails).recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500">Nickname</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.nickname}</dd> </div>} <div className="flex justify-between"> <dt className="text-gray-500">Bank Name</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Account Number</dt> <dd className="font-mono text-gray-800">{(transactionDetails as TransferDetails).recipient.accountNumber}</dd> </div> <div className="flex justify-between"> <dt className="text-gray-500">Receiving Currency</dt> <dd className="font-medium text-gray-800">{(transactionDetails as TransferDetails).recipient.currency.code}</dd> </div> </dl> )}
//                                 </div>
//                                 {/* Note Section */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-2 text-gray-700">Note</h3>
//                                     <textarea id="note" className="w-full bg-gray-50 rounded-md p-3 text-sm text-gray-700 border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Add a few notes to help you later (saving not yet implemented)" value={noteText} onChange={handleNoteChange} rows={3} />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* --- Render the Modal --- */}
//             {/* It's outside the main content div but inside the page fragment */}
//             <CancelTransferModal
//                 isOpen={isCancelModalOpen}
//                 onClose={() => setIsCancelModalOpen(false)} // Close action
//                 transferNumber={transactionId} // Pass the ID
//                 onConfirmCancel={handleConfirmCancelTransfer} // Action on confirm
//             />
//         </>
//     );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx

// "use client"; // Essential for client-side hooks and interactivity

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
// import Link from 'next/link'; // Import Link
// import { format, parseISO } from 'date-fns'; // For date formatting

// // Icons
// import { IoIosArrowBack } from "react-icons/io"; // Back arrow icon
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
// import { FaCheck, FaRegClock } from "react-icons/fa"; // Checkmark and Clock icons

// // Custom Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if necessary
// import apiConfig from "../../../config/apiConfig"; // API base URL configuration (adjust path)
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- TypeScript Interfaces ---
// interface PaymentDetails {
//     _id: string;
//     type: 'payment';
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string };
//     payInCurrency: { _id: string; code: string; flagImage?: string };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode?: string;
//     paymentMethod: string;
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Allow other strings for robustness
//     bankDetails?: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
//     failureReason?: string;
// }
// interface TransferDetails {
//     _id: string;
//     type: 'transfer';
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } };
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string };
//         accountNumber: string; // Assuming required for transfer display
//         bankName: string; // Assuming required for transfer display
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number; // Even if 0, keep for consistency
//     reason?: string;
//     reference?: string;
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string;
//     failureReason?: string;
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }
// type TransactionDetails = PaymentDetails | TransferDetails;
// interface TransactionDetailsPageParams { transactionId: string; }
// type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// interface TimelineStep {
//     id: string;
//     label: string;
//     status: TimelineStatus;
//     date?: string;
//     info?: string | null;
//     showCancelAction?: boolean; // Flag for inline cancel button
// }
// // --- End Interfaces ---

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params;
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // General page error
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState(""); // Note state
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Modal visibility
//     const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag
//     const [copySuccess, setCopySuccess] = useState<string | null>(null); // Copy feedback state

//     // --- Data Fetching ---
//     const fetchTransactionDetails = useCallback(async (showLoading = true) => {
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         if (showLoading) setIsLoading(true);
//         setError(null); setSubmissionError(null);
//         console.log("Fetching details for:", transactionId);

//         try {
//             let found = false;
//             // Try fetching Transfer first
//             try {
//                 const transferData = await transferService.getTransferDetails(transactionId, token);
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || "");
//                 setShowAwaitingVerificationView(false); // Reset custom view if it was a transfer
//                 found = true;
//                 console.log("Found as Transfer");
//             } catch (transferErr: any) {
//                 const isNotFoundError = transferErr.response?.status === 404 || transferErr.message?.toLowerCase().includes('not found') || transferErr.message?.toLowerCase().includes('invalid id');
//                 if (!isNotFoundError) throw transferErr;
//                 console.warn(`Transfer ${transactionId} not found or error:`, transferErr.message);
//             }

//             // If not found as Transfer, try fetching Payment
//             if (!found) {
//                 try {
//                     const paymentData = await paymentService.getPaymentDetails(transactionId, token);
//                     setTransactionDetails({ ...paymentData, type: 'payment' });
//                     setNoteText(paymentData.note || "");
//                     // Don't reset custom view if status is pending after clicking "I've paid"
//                     if (paymentData.status !== 'pending') {
//                         setShowAwaitingVerificationView(false);
//                     }
//                     found = true;
//                     console.log("Found as Payment with status:", paymentData.status);
//                 } catch (paymentErr: any) {
//                     if (paymentErr.response?.status === 404 || paymentErr.message?.toLowerCase().includes('not found')) {
//                         setError(`Transaction with ID ${transactionId} not found.`);
//                         setTransactionDetails(null);
//                     } else { throw paymentErr; }
//                     console.error(`Payment ${transactionId} not found or error:`, paymentErr.message);
//                 }
//             }
//              if (!found && !error) {
//                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//                 setTransactionDetails(null);
//              }
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || "Failed to load transaction details";
//              setError(message);
//              setTransactionDetails(null);
//              console.error("Unhandled error fetching transaction details:", err);
//         } finally { if (showLoading) setIsLoading(false); }
//     }, [transactionId, token]); // Dependencies for useCallback

//     // Effect to run fetch data on mount and when ID/token change
//     useEffect(() => { fetchTransactionDetails(); }, [fetchTransactionDetails]); // Now depends on the stable useCallback version

//     // --- Helper Functions & Derived Data ---
//     const isPayment = transactionDetails?.type === 'payment';
//     const isTransfer = transactionDetails?.type === 'transfer';

//     const formatDisplayDate = (dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try { return format(parseISO(dateString), "MMM d 'at' h:mm a"); }
//         catch (e) { console.error("Date formatting error:", e, "Input:", dateString); return "Invalid Date"; }
//     };

//     // --- Timeline Logic ---
//     const getTimelineSteps = (): TimelineStep[] => {
//         if (!transactionDetails) return [];

//         if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(payment.createdAt);
//             const finalDate = formatDisplayDate(payment.updatedAt);
//             const isPending = payment.status === 'pending';
//             const isInProgress = payment.status === 'in progress';
//             const isComplete = payment.status === 'completed';
//             const isCancelled = payment.status === 'canceled';
//             const hasFailed = payment.status === 'failed';

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null, showCancelAction: false },
//                 { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false },
//                 { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null, showCancelAction: false },
//             ];

//             if (isPending) {
//                 steps[1].status = 'active';
//                 steps[1].showCancelAction = true; // Show inline "I've not paid" button
//             } else if (isInProgress) {
//                  steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null;
//                  steps[2].status = 'active'; steps[2].date = finalDate; // Use update time for receive step
//                  steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
//             } else if (isComplete) {
//                 steps = steps.map((step, index) => ({ ...step, status: 'completed', date: index === 0 ? createdDate : finalDate, info: null, showCancelAction: false }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
//                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${payment.failureReason || 'Unknown reason'}`;
//                  const failedStepIndex = steps.findIndex(step => step.status !== 'completed');
//                 if (failedStepIndex >= 0) {
//                      for(let i = 1; i < failedStepIndex; i++) { steps[i].status = 'completed'; steps[i].date = finalDate; steps[i].info = null; }
//                      steps[failedStepIndex].status = finalStatus; steps[failedStepIndex].date = finalDate; steps[failedStepIndex].info = finalInfo;
//                      for(let i = failedStepIndex + 1; i < steps.length; i++){ steps[i].status = 'pending'; steps[i].date = undefined; steps[i].info = null; }
//                  } else { steps[steps.length - 1].status = finalStatus; steps[steps.length - 1].date = finalDate; steps[steps.length - 1].info = finalInfo; }
//                  steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;
//         }
//         else if (isTransfer) {
//              // Keep existing transfer timeline logic
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(transfer.createdAt); const updatedDate = formatDisplayDate(transfer.updatedAt); const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; const isComplete = transfer.status === 'completed'; const isCancelled = transfer.status === 'canceled'; const hasFailed = transfer.status === 'failed'; const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending');
//             let steps: TimelineStep[] = [ { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null, showCancelAction: false }, { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: (isComplete || isProcessing) ? 'completed' : 'pending', date: (isComplete || isProcessing) ? createdDate : undefined, info: null, showCancelAction: false }, { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : finalStepStatus), date: isComplete ? updatedDate : (isProcessing ? updatedDate : undefined), info: isProcessing ? `We're processing the payment to your recipient's bank.` : (hasFailed ? `Failed to pay out: ${transfer.failureReason || 'Unknown reason'}` : (isCancelled ? 'Transfer cancelled.' : null)), showCancelAction: false }, { id: 'delivered', label: `Sent to recipient's bank`, status: isComplete ? 'completed' : 'pending', date: isComplete ? updatedDate : undefined, info: null, showCancelAction: false }, ];
//             if (isCancelled || hasFailed) { const failedStepIndex = steps.findIndex(step => step.id === 'paid_out'); if (failedStepIndex > 0) { steps[failedStepIndex].status = finalStepStatus; steps[failedStepIndex].date = updatedDate; for (let i = failedStepIndex + 1; i < steps.length; i++) { steps[i].status = 'pending'; } } steps = steps.map(step => ({ ...step, showCancelAction: false })); }
//             return steps;
//         }
//         return [];
//     };
//     const timelineSteps = getTimelineSteps();

//     // --- Event Handlers ---

//     // Handles clicking the main "I've now paid" button for PENDING payments
//     const handleConfirmPaymentSubmit = async () => {
//         if (!transactionId || !token || !isPayment) return;
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             await paymentService.confirmUserTransfer(transactionId, token);
//             setShowAwaitingVerificationView(true); // Show the custom view
//             // Do not refresh data immediately
//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || `Failed to confirm payment`;
//             if (message.includes('not in pending state') || err.response?.status === 400) {
//                  setError("Payment status may have already updated. Refreshing...");
//                  await fetchTransactionDetails(false); // Refresh without main loading indicator
//             } else { setSubmissionError(message); } // Show specific error
//             console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//         } finally { setIsSubmitting(false); }
//     };

//     // Handles clicking the cancel button in the modal
//     const handleConfirmCancel = async () => {
//         if (!transactionId || !token || !transactionDetails) { setSubmissionError("Cannot proceed."); return; }
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             let cancelPromise;
//             if (isPayment) { cancelPromise = paymentService.cancelPayment(transactionId, token); }
//             else if (isTransfer) { cancelPromise = transferService.cancelTransfer(transactionId, token); }
//             else { throw new Error("Unknown transaction type."); }
//             await cancelPromise;
//             setIsCancelModalOpen(false);
//             await fetchTransactionDetails(); // Refresh data after successful cancel
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
//              setSubmissionError(message);
//              console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
//              setIsCancelModalOpen(false); // Close modal even on error
//         } finally { setIsSubmitting(false); }
//     };

//     const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setNoteText(e.target.value); };

//      const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
//         if (!text) { console.warn(`Attempted to copy empty field: ${fieldName}`); return; }
//         navigator.clipboard.writeText(text).then(() => {
//             setCopySuccess(`${fieldName} copied!`);
//             setTimeout(() => setCopySuccess(null), 1500); // Clear message after 1.5s
//         }).catch(err => { console.error('Failed to copy text: ', err); alert(`Failed to copy ${fieldName}.`); });
//     };

//     // --- Determine Cancel Button Visibility ---
//     const canCancelTransaction = useMemo(() => {
//         if (!transactionDetails) return false;
//         if (isPayment) return transactionDetails.status === 'pending' || transactionDetails.status === 'in progress';
//         if (isTransfer) return transactionDetails.status === 'pending' || transactionDetails.status === 'processing';
//         return false;
//     }, [transactionDetails, isPayment, isTransfer]);

//     // --- Render Logic ---
//     if (isLoading && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-40 mb-4" />
//              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
//                  <Skeleton className="h-20 w-full" /> {/* Header */}
//                  <Skeleton className="h-12 w-full border-y border-gray-200 dark:border-gray-700" /> {/* Tabs */}
//                  <div className="p-6 space-y-6">
//                      <Skeleton className="h-6 w-1/2" /> {/* Ref/ID */}
//                      <Skeleton className="h-40 w-full" /> {/* Timeline */}
//                      <Skeleton className="h-12 w-full" /> {/* Button Area */}
//                  </div>
//              </div>
//          </div>
//      ); }
//     if (error && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center">
//              <p className="text-red-600 bg-red-100 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">Error: {error}</p>
//              <Button onClick={() => router.back()} variant="outline" className="mt-4">Go Back</Button>
//          </div>
//     ); }
//     if (!transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//              Transaction details not found.
//              <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">View Transactions</Button>
//          </div>
//      ); }

//     // Header details calculation
//     const headerIcon = isPayment ? <LuPlus size={24} /> : <GoArrowUp size={24} />;
//     const headerTitle = isPayment ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? ''} balance` : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
//     const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
//     const headerCurrencyCode = isPayment ? (transactionDetails as PaymentDetails).balanceCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code;
//     const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
//     const headerAmountSign = isPayment ? "+" : "-";
//     let headerStatusText = "Status unknown"; let headerStatusColorClass = 'text-gray-600 dark:text-gray-400';
//     // Determine header status text and color based on the *actual* transaction status
//     switch (transactionDetails.status) {
//         case 'pending': headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated"; headerStatusColorClass = 'text-orange-600 dark:text-orange-400'; break;
//         case 'in progress': headerStatusText = "Processing payment"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'processing': headerStatusText = "Transfer processing"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'completed': headerStatusText = isPayment ? "Money added" : "Transfer completed"; headerStatusColorClass = 'text-green-600 dark:text-green-400'; break;
//         case 'canceled': headerStatusText = "Transaction cancelled"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//         case 'failed': headerStatusText = "Transaction failed"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//     }
//     // Override header status text if showing the custom view
//     if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
//         headerStatusText = "Verifying Payment";
//         headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; // Use 'in progress' color visually
//     }

//     return (
//         <> {/* Fragment for page and modal */}
//             <div className="container mx-auto px-4 py-8">
//                 {/* Back Button */}
//                 <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
//                     <IoIosArrowBack size={20} /> Back to Transactions
//                 </button>

//                 {/* Main Content Card */}
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
//                     {/* Card Header */}
//                     <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-gray-200 dark:border-gray-700">
//                          <div className={cn("rounded-full p-2 flex items-center justify-center flex-shrink-0", isPayment ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' )}> {headerIcon} </div>
//                          <div className="flex-grow min-w-0"> <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{headerTitle}</h2> <p className={cn("text-sm capitalize font-medium", headerStatusColorClass)}> {headerStatusText} </p> </div>
//                          <div className={cn("ml-auto font-semibold whitespace-nowrap text-lg flex-shrink-0", isPayment ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100' )}> {headerAmountSign} {headerAmount} </div>
//                     </div>

//                     {/* Tabs Navigation */}
//                     <div className="border-b border-gray-200 dark:border-gray-700 px-6">
//                         <nav className="-mb-px flex space-x-4" aria-label="Tabs">
//                              <button onClick={() => setActiveTab("Updates")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Updates" ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Updates" ? "page" : undefined}> Updates </button>
//                              <button onClick={() => setActiveTab("Details")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Details" ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Details" ? "page" : undefined}> Details </button>
//                         </nav>
//                     </div>

//                     {/* Tab Content Area */}
//                     <div className="p-6">
//                         {/* --- Updates Tab Content --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference Code */}
//                                 <div className="flex items-center mb-6 text-sm">
//                                     <span className="text-gray-500 dark:text-gray-400 w-28 flex-shrink-0">
//                                         {isPayment ? "Reference Code" : "Transfer ID"}
//                                     </span>
//                                     <span className="ml-2 font-medium text-gray-700 dark:text-gray-300 break-all">
//                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                     </span>
//                                 </div>

//                                 {/* --- Conditional Rendering based on showAwaitingVerificationView --- */}
//                                 {isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView ? (
//                                     // --- Render Awaiting Verification View ---
//                                     <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
//                                         <FaRegClock className="text-4xl text-blue-500 mx-auto mb-4 animate-pulse" />
//                                         <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Thanks! We're checking your payment</h3>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
//                                             We received your confirmation and are now verifying the bank transfer. This usually takes a few hours, but can sometimes take up to 19 hours depending on your bank. We'll update the status here automatically once confirmed.
//                                         </p>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                                             Reference: {transactionDetails.referenceCode || 'N/A'}
//                                         </p>
//                                          <Button variant="outline" size="sm" onClick={() => fetchTransactionDetails(false)} className="mt-6" disabled={isSubmitting}>
//                                              Refresh Status
//                                          </Button>
//                                     </div>
//                                 ) : (
//                                     // --- Render Standard Timeline and Actions ---
//                                     <>
//                                         {/* Timeline Visualization */}
//                                         <div className="relative mt-6">
//                                             {timelineSteps.length > 0 ? (
//                                                 <ul className="space-y-0">
//                                                     {timelineSteps.map((step, index) => (
//                                                         <li key={step.id || index} className="flex items-start space-x-3 pb-6 last:pb-0">
//                                                             {/* Marker & Line */}
//                                                             <div className="relative flex flex-col items-center flex-shrink-0">
//                                                                 <div className={cn( "h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800 z-10", step.status === "completed" && "bg-green-500 text-white", step.status === "active" && "bg-indigo-600 text-white", step.status === "pending" && "bg-gray-300 dark:bg-gray-600", step.status === "failed" && "bg-red-500 text-white", step.status === "cancelled" && "bg-gray-500 text-white" )}>
//                                                                     {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
//                                                                     {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
//                                                                     {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3 text-white"/>}
//                                                                     {step.status === "pending" && <div className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>}
//                                                                 </div>
//                                                                 {index < timelineSteps.length - 1 && ( <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.5rem)] w-0.5 bg-gray-200 dark:bg-gray-600" aria-hidden="true"></div> )}
//                                                             </div>
//                                                             {/* Step Content */}
//                                                             <div className="flex-1 pt-px min-w-0">
//                                                                 <h4 className={cn("text-sm font-semibold", step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : step.status === 'failed' ? 'text-red-600 dark:text-red-400' : step.status === 'cancelled' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100' )}> {step.label} </h4>
//                                                                 {step.date && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>)}
//                                                                 {step.info && (<div className={cn( "mt-2 text-sm p-3 rounded-md border", step.status === 'active' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/40 dark:text-blue-300' : step.status === 'failed' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700/40 dark:text-red-300' : step.status === 'cancelled' ? 'bg-gray-100 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' )}> <p>{step.info}</p> </div>)}
//                                                                 {/* Inline "I've not paid" Button (for pending payments) */}
//                                                                 {step.showCancelAction && (
//                                                                     <Button variant="outline" size="sm" className="mt-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300 h-8 px-3" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}> I've not paid </Button>
//                                                                 )}
//                                                             </div>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : ( <p className="text-gray-500 dark:text-gray-400 text-sm">Status updates could not be loaded.</p> )}
//                                         </div>

//                                         {/* Conditional Bottom Action Area for PENDING Payments */}
//                                         {isPayment && transactionDetails.status === 'pending' && !showAwaitingVerificationView && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                                                 <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Ready to pay?</h3>
//                                                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                                                     Find the bank details in the <button onClick={() => setActiveTab('Details')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Details tab</button>. Once you've sent the money from your bank, click below.
//                                                 </p>
//                                                 {submissionError && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
//                                                 <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
//                                                     <Button variant="outline" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting} className="order-2 sm:order-1"> Cancel transfer </Button>
//                                                     <Button onClick={handleConfirmPaymentSubmit} disabled={isSubmitting} className="order-1 sm:order-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"> {isSubmitting ? 'Processing...' : "I've now paid"} </Button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* General Cancel Button (if cancelable and NOT the pending payment case handled above) */}
//                                         {canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
//                                                 <Button variant="destructive" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}>
//                                                     {isSubmitting ? 'Processing...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
//                                                 </Button>
//                                             </div>
//                                         )}
//                                         {/* Display general submission error if needed */}
//                                         {submissionError && activeTab === 'Updates' && !(isPayment && transactionDetails.status === 'pending') && <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>}
//                                     </>
//                                 )}
//                                 {/* --- End Conditional Rendering --- */}
//                             </div>
//                         )}

//                         {/* --- Details Tab Content --- */}
//                         {activeTab === "Details" && (
//                              <div className="space-y-6">
//                                 {/* Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2">Transaction details</h3>
//                                     <dl className="space-y-2 text-sm">
//                                          {/* Payment Specific Details */}
//                                         {isPayment && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Amount to add</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as PaymentDetails).amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Total fees included</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${((transactionDetails as PaymentDetails).wiseFee + (transactionDetails as PaymentDetails).bankTransferFee).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Total amount to pay</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as PaymentDetails).amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Exchange rate</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">1 {(transactionDetails as PaymentDetails).payInCurrency?.code} = {(transactionDetails as PaymentDetails).exchangeRate.toFixed(6)} {(transactionDetails as PaymentDetails).balanceCurrency?.code}</dd> </div>
//                                                 {(transactionDetails as PaymentDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as PaymentDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Transfer Specific Details */}
//                                         {isTransfer && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">You sent</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Fees</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Exchange rate</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">1 {(transactionDetails as TransferDetails).sendCurrency?.code} = {(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} {(transactionDetails as TransferDetails).receiveCurrency?.code}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Recipient gets</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{`${(transactionDetails as TransferDetails).receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
//                                                 {(transactionDetails as TransferDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as TransferDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Common Details */}
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Date Initiated</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt> <dd className="font-medium text-gray-800 dark:text-gray-100 break-all">{isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}</dd> </div>
//                                     </dl>
//                                 </div>

//                                 {/* Pay-in Bank Details / Recipient Details */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2">
//                                         {isPayment ? 'Pay-in Bank Details (Wise)' : 'Recipient Details'}
//                                     </h3>
//                                      {/* Payment Bank Details */}
//                                     {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
//                                         <div className="space-y-3 text-sm">
//                                             <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Payee name</p> <p className="font-semibold text-gray-800 dark:text-gray-100">{(transactionDetails as PaymentDetails).bankDetails?.payeeName || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.payeeName, 'Payee name')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
//                                             <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">IBAN</p> <p className="font-semibold text-gray-800 dark:text-gray-100 font-mono break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.iban, 'IBAN')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
//                                             <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Bank code (BIC/SWIFT)</p> <p className="font-semibold text-gray-800 dark:text-gray-100 font-mono">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 h-auto">Copy</Button> </div>
//                                             <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 p-3 rounded-md"> <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bank address</p> <p className="font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress || 'N/A'}</p> </div>
//                                         </div>
//                                      )}
//                                      {/* Transfer Recipient Details */}
//                                     {isTransfer && (transactionDetails as TransferDetails).recipient && (
//                                         <dl className="space-y-2 text-sm">
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Name</dt> <dd className="font-medium text-gray-800 dark:text-gray-100 capitalize">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Account Number</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">**** {(transactionDetails as TransferDetails).recipient.accountNumber?.slice(-4)}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Bank</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
//                                              {/* Add other recipient details like BIC/IFSC if relevant */}
//                                         </dl>
//                                      )}
//                                      {/* Message if no details applicable */}
//                                      {!isPayment && !isTransfer && <p className="text-sm text-gray-500 dark:text-gray-400">Details not applicable for this transaction type.</p>}

//                                      {/* Copy Feedback */}
//                                      {copySuccess && activeTab === 'Details' && <p className="text-sm text-center text-green-600 dark:text-green-400 mt-3">{copySuccess}</p>}
//                                 </div>

//                                 {/* Note Section */}
//                                 <div>
//                                      <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Note (for your reference)</h3>
//                                      <textarea id="note" className="w-full bg-gray-50 dark:bg-gray-700 rounded-md p-3 text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400" placeholder="Add notes about this transaction..." value={noteText} onChange={handleNoteChange} rows={3} aria-label="Transaction Note" />
//                                      {/* TODO: Add save note functionality if needed */}
//                                 </div>
//                              </div>
//                          )}
//                     </div> {/* End Tab Content Area */}
//                 </div> {/* End Main Content Card */}
//             </div> {/* End Container */}

//             {/* --- Cancellation Modal --- */}
//             {transactionDetails && (
//                 <CancelTransferModal
//                     isOpen={isCancelModalOpen}
//                     onClose={() => setIsCancelModalOpen(false)}
//                     transactionId={transactionId}
//                     transactionType={transactionDetails.type}
//                     onConfirmCancel={handleConfirmCancel}
//                     isSubmitting={isSubmitting}
//                 />
//             )}
//         </> // End Fragment
//     );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx

// "use client"; // Essential for client-side hooks and interactivity

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
// import Link from 'next/link'; // Import Link
// import { format, parseISO } from 'date-fns'; // For date formatting

// // Icons
// import { IoIosArrowBack } from "react-icons/io"; // Back arrow icon
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
// import { FaCheck, FaRegClock } from "react-icons/fa"; // Checkmark and Clock icons

// // Custom Hooks & Services
// import { useAuth } from "../../../hooks/useAuth"; // Adjust path if necessary
// import apiConfig from "../../../config/apiConfig"; // API base URL configuration (adjust path)
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- TypeScript Interfaces ---
// interface PaymentDetails {
//     _id: string;
//     type: 'payment';
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string };
//     payInCurrency: { _id: string; code: string; flagImage?: string };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode?: string;
//     paymentMethod: string;
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Allow other strings for robustness
//     bankDetails?: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
//     failureReason?: string;
// }
// interface TransferDetails {
//     _id: string;
//     type: 'transfer';
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } };
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string };
//         accountNumber: string; // Assuming required for transfer display
//         bankName: string; // Assuming required for transfer display
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number; // Even if 0, keep for consistency
//     reason?: string;
//     reference?: string;
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string;
//     failureReason?: string;
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }
// type TransactionDetails = PaymentDetails | TransferDetails;
// interface TransactionDetailsPageParams { transactionId: string; }
// type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// interface TimelineStep {
//     id: string;
//     label: string;
//     status: TimelineStatus;
//     date?: string;
//     info?: string | null;
//     showCancelAction?: boolean; // Flag for inline cancel button
// }
// // --- End Interfaces ---

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params;
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // General page error
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState(""); // Note state
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Modal visibility
//     const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag
//     const [copySuccess, setCopySuccess] = useState<string | null>(null); // Copy feedback state

//     // --- Data Fetching ---
//     const fetchTransactionDetails = useCallback(async (showLoading = true) => {
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         if (showLoading) setIsLoading(true);
//         setError(null); setSubmissionError(null);
//         console.log("Fetching details for:", transactionId);

//         try {
//             let found = false;
//             // Try fetching Transfer first
//             try {
//                 const transferData = await transferService.getTransferDetails(transactionId, token);
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || "");
//                 setShowAwaitingVerificationView(false); // Reset custom view if it was a transfer
//                 found = true;
//                 console.log("Found as Transfer");
//             } catch (transferErr: any) {
//                 const isNotFoundError = transferErr.response?.status === 404 || transferErr.message?.toLowerCase().includes('not found') || transferErr.message?.toLowerCase().includes('invalid id');
//                 if (!isNotFoundError) throw transferErr;
//                 console.warn(`Transfer ${transactionId} not found or error:`, transferErr.message);
//             }

//             // If not found as Transfer, try fetching Payment
//             if (!found) {
//                 try {
//                     const paymentData = await paymentService.getPaymentDetails(transactionId, token);
//                     setTransactionDetails({ ...paymentData, type: 'payment' });
//                     setNoteText(paymentData.note || "");
//                     // Don't reset custom view if status is pending after clicking "I've paid"
//                     if (paymentData.status !== 'pending') {
//                         setShowAwaitingVerificationView(false);
//                     }
//                     found = true;
//                     console.log("Found as Payment with status:", paymentData.status);
//                 } catch (paymentErr: any) {
//                     if (paymentErr.response?.status === 404 || paymentErr.message?.toLowerCase().includes('not found')) {
//                         setError(`Transaction with ID ${transactionId} not found.`);
//                         setTransactionDetails(null);
//                     } else { throw paymentErr; }
//                     console.error(`Payment ${transactionId} not found or error:`, paymentErr.message);
//                 }
//             }
//              if (!found && !error) {
//                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//                 setTransactionDetails(null);
//              }
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || "Failed to load transaction details";
//              setError(message);
//              setTransactionDetails(null);
//              console.error("Unhandled error fetching transaction details:", err);
//         } finally { if (showLoading) setIsLoading(false); }
//     }, [transactionId, token]); // Dependencies for useCallback

//     // Effect to run fetch data on mount and when ID/token change
//     useEffect(() => { fetchTransactionDetails(); }, [fetchTransactionDetails]); // Now depends on the stable useCallback version

//     // --- Helper Functions & Derived Data ---
//     const isPayment = transactionDetails?.type === 'payment';
//     const isTransfer = transactionDetails?.type === 'transfer';

//     const formatDisplayDate = (dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try { return format(parseISO(dateString), "MMM d 'at' h:mm a"); }
//         catch (e) { console.error("Date formatting error:", e, "Input:", dateString); return "Invalid Date"; }
//     };

//     // --- Timeline Logic ---
//     const getTimelineSteps = (): TimelineStep[] => {
//         if (!transactionDetails) return [];

//         if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(payment.createdAt);
//             const finalDate = formatDisplayDate(payment.updatedAt);
//             const isPending = payment.status === 'pending';
//             const isInProgress = payment.status === 'in progress';
//             const isComplete = payment.status === 'completed';
//             const isCancelled = payment.status === 'canceled';
//             const hasFailed = payment.status === 'failed';

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null, showCancelAction: false },
//                 { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false },
//                 { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null, showCancelAction: false },
//             ];

//             if (isPending) {
//                 steps[1].status = 'active';
//                 steps[1].showCancelAction = true; // Show inline "I've not paid" button
//             } else if (isInProgress) {
//                  steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null;
//                  steps[2].status = 'active'; steps[2].date = finalDate; // Use update time for receive step
//                  steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
//             } else if (isComplete) {
//                 steps = steps.map((step, index) => ({ ...step, status: 'completed', date: index === 0 ? createdDate : finalDate, info: null, showCancelAction: false }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
//                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${payment.failureReason || 'Unknown reason'}`;
//                  const failedStepIndex = steps.findIndex(step => step.status !== 'completed');
//                 if (failedStepIndex >= 0) {
//                      for(let i = 1; i < failedStepIndex; i++) { steps[i].status = 'completed'; steps[i].date = finalDate; steps[i].info = null; }
//                      steps[failedStepIndex].status = finalStatus; steps[failedStepIndex].date = finalDate; steps[failedStepIndex].info = finalInfo;
//                      for(let i = failedStepIndex + 1; i < steps.length; i++){ steps[i].status = 'pending'; steps[i].date = undefined; steps[i].info = null; }
//                  } else { steps[steps.length - 1].status = finalStatus; steps[steps.length - 1].date = finalDate; steps[steps.length - 1].info = finalInfo; }
//                  steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;
//         }
//         else if (isTransfer) {
//              // Keep existing transfer timeline logic
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(transfer.createdAt); const updatedDate = formatDisplayDate(transfer.updatedAt); const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; const isComplete = transfer.status === 'completed'; const isCancelled = transfer.status === 'canceled'; const hasFailed = transfer.status === 'failed'; const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending');
//             let steps: TimelineStep[] = [ { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null, showCancelAction: false }, { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: (isComplete || isProcessing) ? 'completed' : 'pending', date: (isComplete || isProcessing) ? createdDate : undefined, info: null, showCancelAction: false }, { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : finalStepStatus), date: isComplete ? updatedDate : (isProcessing ? updatedDate : undefined), info: isProcessing ? `We're processing the payment to your recipient's bank.` : (hasFailed ? `Failed to pay out: ${transfer.failureReason || 'Unknown reason'}` : (isCancelled ? 'Transfer cancelled.' : null)), showCancelAction: false }, { id: 'delivered', label: `Sent to recipient's bank`, status: isComplete ? 'completed' : 'pending', date: isComplete ? updatedDate : undefined, info: null, showCancelAction: false }, ];
//             if (isCancelled || hasFailed) { const failedStepIndex = steps.findIndex(step => step.id === 'paid_out'); if (failedStepIndex > 0) { steps[failedStepIndex].status = finalStepStatus; steps[failedStepIndex].date = updatedDate; for (let i = failedStepIndex + 1; i < steps.length; i++) { steps[i].status = 'pending'; } } steps = steps.map(step => ({ ...step, showCancelAction: false })); }
//             return steps;
//         }
//         return [];
//     };
//     const timelineSteps = getTimelineSteps();

//     // --- Event Handlers ---

//     // Handles clicking the main "I've now paid" button for PENDING payments
//     const handleConfirmPaymentSubmit = async () => {
//         if (!transactionId || !token || !isPayment) return;
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             await paymentService.confirmUserTransfer(transactionId, token);
//             setShowAwaitingVerificationView(true); // Show the custom view
//             // Do not refresh data immediately
//         } catch (err: any) {
//             const message = err.response?.data?.message || err.message || `Failed to confirm payment`;
//             if (message.includes('not in pending state') || err.response?.status === 400) {
//                  setError("Payment status may have already updated. Refreshing...");
//                  await fetchTransactionDetails(false); // Refresh without main loading indicator
//             } else { setSubmissionError(message); } // Show specific error
//             console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//         } finally { setIsSubmitting(false); }
//     };

//     // Handles clicking the cancel button in the modal
//     const handleConfirmCancel = async () => {
//         if (!transactionId || !token || !transactionDetails) { setSubmissionError("Cannot proceed."); return; }
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             let cancelPromise;
//             if (isPayment) { cancelPromise = paymentService.cancelPayment(transactionId, token); }
//             else if (isTransfer) { cancelPromise = transferService.cancelTransfer(transactionId, token); }
//             else { throw new Error("Unknown transaction type."); }
//             await cancelPromise;
//             setIsCancelModalOpen(false);
//             await fetchTransactionDetails(); // Refresh data after successful cancel
//         } catch (err: any) {
//              const message = err.response?.data?.message || err.message || `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
//              setSubmissionError(message);
//              console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
//              setIsCancelModalOpen(false); // Close modal even on error
//         } finally { setIsSubmitting(false); }
//     };

//     const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setNoteText(e.target.value); };

//      const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
//         if (!text) { console.warn(`Attempted to copy empty field: ${fieldName}`); return; }
//         navigator.clipboard.writeText(text).then(() => {
//             setCopySuccess(`${fieldName} copied!`);
//             setTimeout(() => setCopySuccess(null), 1500); // Clear message after 1.5s
//         }).catch(err => { console.error('Failed to copy text: ', err); alert(`Failed to copy ${fieldName}.`); });
//     };

//     // --- Determine Cancel Button Visibility ---
//     const canCancelTransaction = useMemo(() => {
//         if (!transactionDetails) return false;
//         if (isPayment) return transactionDetails.status === 'pending' || transactionDetails.status === 'in progress';
//         if (isTransfer) return transactionDetails.status === 'pending' || transactionDetails.status === 'processing';
//         return false;
//     }, [transactionDetails, isPayment, isTransfer]);

//     // --- Render Logic ---
//     if (isLoading && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-40 mb-4" />
//              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
//                  <Skeleton className="h-20 w-full" /> {/* Header */}
//                  <Skeleton className="h-12 w-full border-y border-gray-200 dark:border-gray-700" /> {/* Tabs */}
//                  <div className="p-6 space-y-6">
//                      <Skeleton className="h-6 w-1/2" /> {/* Ref/ID */}
//                      <Skeleton className="h-40 w-full" /> {/* Timeline */}
//                      <Skeleton className="h-12 w-full" /> {/* Button Area */}
//                  </div>
//              </div>
//          </div>
//      ); }
//     if (error && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center">
//              <p className="text-red-600 bg-red-100 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">Error: {error}</p>
//              <Button onClick={() => router.back()} variant="outline" className="mt-4">Go Back</Button>
//          </div>
//     ); }
//     if (!transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//              Transaction details not found.
//              <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">View Transactions</Button>
//          </div>
//      ); }

//     // Header details calculation
//     const headerIcon = isPayment ? <LuPlus size={24} className="text-neutral-900 dark:text-white"/> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white"/>;
//     const headerTitle = isPayment ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? ''} balance` : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
//     const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
//     const headerCurrencyCode = isPayment ? (transactionDetails as PaymentDetails).balanceCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code;
//     const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
//     const headerAmountSign = isPayment ? "+" : "-";
//     let headerStatusText = "Status unknown"; let headerStatusColorClass = 'text-gray-600 dark:text-gray-400';
//     // Determine header status text and color based on the *actual* transaction status
//     switch (transactionDetails.status) {
//         case 'pending': headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated"; headerStatusColorClass = 'text-orange-600 dark:text-orange-400'; break;
//         case 'in progress': headerStatusText = "Processing payment"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'processing': headerStatusText = "Transfer processing"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'completed': headerStatusText = isPayment ? "Money added" : "Transfer completed"; headerStatusColorClass = 'text-green-600 dark:text-green-400'; break;
//         case 'canceled': headerStatusText = "Transaction cancelled"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//         case 'failed': headerStatusText = "Transaction failed"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//     }
//     // Override header status text if showing the custom view
//     if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
//         headerStatusText = "Verifying Payment";
//         headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; // Use 'in progress' color visually
//     }

//     return (
//         <> {/* Fragment for page and modal */}
//             <div className="container mx-auto">
//                 {/* Back Button */}
//                 <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
//                     <IoIosArrowBack size={20} /> Back to Transactions
//                 </button>

//                 {/* Main Content Card */}
//                 <div className="bg-white dark:bg-background rounded-2xl border shadow-sm mx-auto max-w-4xl">
//                     {/* Card Header */}
//                     <div className="sm:p-6 p-4 flex items-start gap-4 border-b">
//                          <div className={cn("p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center", isPayment ? '' : '' )}> {headerIcon} </div>

//                          <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">

//                          <div className="text-wrap">
//                             <h2 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">{headerTitle}</h2>
//                             <p className={cn("text-sm mt-1", headerStatusColorClass)}> {headerStatusText} </p> </div>
//                          <div className={cn("font-medium whitespace-nowrap", isPayment ? 'text-green-600 dark:text-green-500' : 'text-neutral-900  dark:text-white' )}> {headerAmountSign} {headerAmount} </div>
//                          </div>

//                     </div>

//                     {/* Tabs Navigation */}
//                     <div className="border-b px-6">
//                         <nav className="-mb-px flex gap-4" aria-label="Tabs">
//                              <button onClick={() => setActiveTab("Updates")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Updates" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Updates" ? "page" : undefined}> Updates </button>
//                              <button onClick={() => setActiveTab("Details")} className={cn("whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium", activeTab === "Details" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-300" )} aria-current={activeTab === "Details" ? "page" : undefined}> Details </button>
//                         </nav>
//                     </div>

//                     {/* Tab Content Area */}
//                     <div className="p-6">
//                         {/* --- Updates Tab Content --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference Code */}
//                                 <div className="flex items-center mb-6 text-sm gap-2">
//                                     <span className="text-neutral-900 dark:text-white w-28 flex-shrink-0">
//                                         {isPayment ? "Reference Code" : "Transfer ID"}
//                                     </span>
//                                     <span className="font-medium text-gray-500 dark:text-gray-300 break-all">
//                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                     </span>
//                                 </div>

//                                 {/* --- Conditional Rendering based on showAwaitingVerificationView --- */}
//                                 {isPayment && transactionDetails.status === 'cancle' && showAwaitingVerificationView ? (
//                                     // --- Render Awaiting Verification View ---
//                                     <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
//                                         <FaRegClock className="text-4xl text-blue-500 mx-auto mb-4 animate-pulse" />
//                                         <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Thanks! We're checking your payment</h3>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
//                                             We received your confirmation and are now verifying the bank transfer. This usually takes a few hours, but can sometimes take up to 19 hours depending on your bank. We'll update the status here automatically once confirmed.
//                                         </p>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                                             Reference: {transactionDetails.referenceCode || 'N/A'}
//                                         </p>
//                                          <Button variant="outline" size="sm" onClick={() => fetchTransactionDetails(false)} className="mt-6" disabled={isSubmitting}>
//                                              Refresh Status
//                                          </Button>
//                                     </div>
//                                 ) : (
//                                     // --- Render Standard Timeline and Actions ---
//                                     <>
//                                         {/* Timeline Visualization */}
//                                         <div className="relative mt-6">
//                                             {timelineSteps.length > 0 ? (
//                                                 <ul className="space-y-0">
//                                                     {timelineSteps.map((step, index) => (
//                                                         <li key={step.id || index} className="flex items-start space-x-3 pb-6 last:pb-0">
//                                                             {/* Marker & Line */}
//                                                             <div className="relative flex flex-col items-center flex-shrink-0">
//                                                                 <div className={cn( "h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800 z-10", step.status === "completed" && "bg-green-500 text-white", step.status === "active" && "bg-indigo-600 text-white", step.status === "pending" && "bg-gray-300 dark:bg-gray-600", step.status === "failed" && "bg-red-500 text-white", step.status === "cancelled" && "bg-gray-500 text-white" )}>
//                                                                     {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
//                                                                     {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
//                                                                     {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3 text-white"/>}
//                                                                     {step.status === "pending" && <div className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>}
//                                                                 </div>
//                                                                 {index < timelineSteps.length - 1 && ( <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.5rem)] w-0.5 bg-gray-200 dark:bg-gray-600" aria-hidden="true"></div> )}
//                                                             </div>
//                                                             {/* Step Content */}
//                                                             <div className="flex-1 pt-px min-w-0">
//                                                                 <h4 className={cn("text-sm font-semibold", step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : step.status === 'failed' ? 'text-red-600 dark:text-red-400' : step.status === 'cancelled' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100' )}> {step.label} </h4>
//                                                                 {step.date && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>)}
//                                                                 {step.info && (<div className={cn( "mt-2 text-sm p-3 rounded-md border", step.status === 'active' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/40 dark:text-blue-300' : step.status === 'failed' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-700/40 dark:text-red-300' : step.status === 'cancelled' ? 'bg-gray-100 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-700/30 dark:border-gray-600/40 dark:text-gray-300' )}> <p>{step.info}</p> </div>)}
//                                                                 {/* Inline "I've not paid" Button (for pending payments) */}
//                                                                 {step.showCancelAction && (
//                                                                     <Button variant="outline" size="sm" className="mt-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300 h-8 px-3" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}> I've not paid </Button>
//                                                                 )}
//                                                             </div>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : ( <p className="text-gray-500 dark:text-gray-400 text-sm">Status updates could not be loaded.</p> )}
//                                         </div>

//                                         {/* Conditional Bottom Action Area for PENDING Payments */}
//                                         {isPayment && transactionDetails.status === 'pending' && !showAwaitingVerificationView && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                                                 <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Ready to pay?</h3>
//                                                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                                                     Find the bank details in the <button onClick={() => setActiveTab('Details')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Details tab</button>. Once you've sent the money from your bank, click below.
//                                                 </p>
//                                                 {submissionError && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
//                                                 <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
//                                                     <Button variant="outline" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting} className="order-2 sm:order-1"> Cancel transfer </Button>
//                                                     <Button onClick={handleConfirmPaymentSubmit} disabled={isSubmitting} className="order-1 sm:order-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"> {isSubmitting ? 'Processing...' : "I've now paid"} </Button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* General Cancel Button (if cancelable and NOT the pending payment case handled above) */}
//                                         {canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
//                                                 <Button variant="destructive" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}>
//                                                     {isSubmitting ? 'Processing...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
//                                                 </Button>
//                                             </div>
//                                         )}
//                                         {/* Display general submission error if needed */}
//                                         {submissionError && activeTab === 'Updates' && !(isPayment && transactionDetails.status === 'pending') && <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>}
//                                     </>
//                                 )}
//                                 {/* --- End Conditional Rendering --- */}
//                             </div>
//                         )}

//                         {/* --- Details Tab Content --- */}
//                         {activeTab === "Details" && (
//                              <div className="space-y-6">
//                                 {/* Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-neutral-900 dark:text-white border-b pb-2">Transaction details</h3>
//                                     <dl className="space-y-3 text-sm">
//                                          {/* Payment Specific Details */}
//                                         {isPayment && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Amount to add</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as PaymentDetails).amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Total fees included</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${((transactionDetails as PaymentDetails).wiseFee + (transactionDetails as PaymentDetails).bankTransferFee).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Total amount to pay</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as PaymentDetails).amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Exchange rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {(transactionDetails as PaymentDetails).payInCurrency?.code} = {(transactionDetails as PaymentDetails).exchangeRate.toFixed(6)} {(transactionDetails as PaymentDetails).balanceCurrency?.code}</dd> </div>
//                                                 {(transactionDetails as PaymentDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as PaymentDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Transfer Specific Details */}
//                                         {isTransfer && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">You sent</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Fees</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Exchange rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {(transactionDetails as TransferDetails).sendCurrency?.code} = {(transactionDetails as TransferDetails).exchangeRate.toFixed(6)} {(transactionDetails as TransferDetails).receiveCurrency?.code}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Recipient gets</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
//                                                 {(transactionDetails as TransferDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as TransferDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Common Details */}
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Date Initiated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Last Updated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt> <dd className="font-medium text-neutral-900 dark:text-white break-all">{isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}</dd> </div>
//                                     </dl>
//                                 </div>

//                                 {/* Pay-in Bank Details / Recipient Details */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-neutral-900 dark:text-white border-b pb-2">
//                                         {isPayment ? 'Pay-in Bank Details (Wise)' : 'Recipient Details'}
//                                     </h3>
//                                      {/* Payment Bank Details */}
//                                     {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
//                                         <div className="space-y-3 text-sm">
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Payee name</p> <p className="font-semibold text-neutral-900 dark:text-white">{(transactionDetails as PaymentDetails).bankDetails?.payeeName || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.payeeName, 'Payee name')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">IBAN</p> <p className="font-semibold text-neutral-900 dark:text-white break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.iban, 'IBAN')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank code (BIC/SWIFT)</p> <p className="font-semibold text-neutral-900 dark:text-white">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md"> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank address</p> <p className="font-semibold text-neutral-900 dark:text-white whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress || 'N/A'}</p> </div>
//                                         </div>
//                                      )}
//                                      {/* Transfer Recipient Details */}
//                                     {isTransfer && (transactionDetails as TransferDetails).recipient && (
//                                         <dl className="space-y-2 text-sm">
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Name</dt> <dd className="font-medium text-gray-800 dark:text-gray-100 capitalize">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Account Number</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">**** {(transactionDetails as TransferDetails).recipient.accountNumber?.slice(-4)}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Bank</dt> <dd className="font-medium text-gray-800 dark:text-gray-100">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
//                                              {/* Add other recipient details like BIC/IFSC if relevant */}
//                                         </dl>
//                                      )}
//                                      {/* Message if no details applicable */}
//                                      {!isPayment && !isTransfer && <p className="text-sm text-gray-500 dark:text-gray-400">Details not applicable for this transaction type.</p>}

//                                      {/* Copy Feedback */}
//                                      {copySuccess && activeTab === 'Details' && <p className="text-sm text-center text-green-600 dark:text-green-400 mt-3">{copySuccess}</p>}
//                                 </div>

//                                 {/* Note Section */}
//                                 <div>
//                                      <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Note (for your reference)</h3>
//                                      <textarea id="note" className="w-full bg-gray-50 dark:bg-gray-700 rounded-md p-3 text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400" placeholder="Add notes about this transaction..." value={noteText} onChange={handleNoteChange} rows={3} aria-label="Transaction Note" />
//                                      {/* TODO: Add save note functionality if needed */}
//                                 </div>
//                              </div>
//                          )}
//                     </div> {/* End Tab Content Area */}
//                 </div> {/* End Main Content Card */}
//             </div> {/* End Container */}

//             {/* --- Cancellation Modal --- */}
//             {transactionDetails && (
//                 <CancelTransferModal
//                     isOpen={isCancelModalOpen}
//                     onClose={() => setIsCancelModalOpen(false)}
//                     transactionId={transactionId}
//                     transactionType={transactionDetails.type}
//                     onConfirmCancel={handleConfirmCancel}
//                     isSubmitting={isSubmitting}
//                 />
//             )}
//         </> // End Fragment
//     );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx

// "use client"; // Essential for client-side hooks and interactivity

// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
// import { format, parseISO } from 'date-fns'; // For date formatting

// // Icons
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
// import { FaCheck, FaRegClock } from "react-icons/fa"; // Checkmark and Clock icons

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if necessary
// // apiConfig import removed as it was unused
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- TypeScript Interfaces ---
// interface PaymentDetails {
//     _id: string;
//     type: 'payment';
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string };
//     payInCurrency: { _id: string; code: string; flagImage?: string };
//     amountToAdd: number;
//     amountToPay: number;
//     exchangeRate: number;
//     wiseFee: number;
//     bankTransferFee: number;
//     referenceCode?: string;
//     paymentMethod: string;
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Allow other strings for robustness
//     bankDetails?: {
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
//     failureReason?: string;
// }
// interface TransferDetails {
//     _id: string;
//     type: 'transfer';
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } };
//     recipient: {
//         _id: string;
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string };
//         accountNumber: string; // Assuming required for transfer display
//         bankName: string; // Assuming required for transfer display
//     };
//     sendAmount: number;
//     receiveAmount: number;
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number; // Even if 0, keep for consistency
//     reason?: string;
//     reference?: string;
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string;
//     failureReason?: string;
//     createdAt: string;
//     updatedAt: string;
//     note?: string;
// }
// type TransactionDetails = PaymentDetails | TransferDetails;
// interface TransactionDetailsPageParams { transactionId: string; }
// type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// interface TimelineStep {
//     id: string;
//     label: string;
//     status: TimelineStatus;
//     date?: string;
//     info?: string | null;
//     showCancelAction?: boolean; // Flag for inline cancel button
// }
// // --- End Interfaces ---

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//     // --- Hooks ---
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params;
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // General page error
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState(""); // Note state
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Modal visibility
//     const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag
//     const [copySuccess, setCopySuccess] = useState<string | null>(null); // Copy feedback state

//     // --- Refs ---
//     const updatesTabRef = useRef<HTMLButtonElement>(null);
//     const detailsTabRef = useRef<HTMLButtonElement>(null);
//     const underlineRef = useRef<HTMLSpanElement>(null);

//     // --- Data Fetching ---
//     const fetchTransactionDetails = useCallback(async (showLoading = true) => {
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         if (showLoading) setIsLoading(true);
//         setError(null); setSubmissionError(null);
//         console.log("Fetching details for:", transactionId);

//         try {
//             let found = false;
//             // Try fetching Transfer first
//             try {
//                 const transferData = await transferService.getTransferDetails(transactionId, token);
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || "");
//                 setShowAwaitingVerificationView(false); // Reset custom view if it was a transfer
//                 found = true;
//                 console.log("Found as Transfer");
//             } catch (transferErr: unknown) { // Changed from 'any' to 'unknown'
//                 // Type guard or assertion needed to access properties safely
//                 let message = 'Unknown error fetching transfer details';
//                 let status = 0;
//                  if (typeof transferErr === 'object' && transferErr !== null) {
//                      // Check for common error structures (like AxiosError)
//                     const errObj = transferErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                     message = errObj.response?.data?.message || errObj.message || message;
//                     status = errObj.response?.status || 0;
//                  } else if (transferErr instanceof Error) {
//                      message = transferErr.message;
//                  }

//                 const isNotFoundError = status === 404 || message?.toLowerCase().includes('not found') || message?.toLowerCase().includes('invalid id');
//                 if (!isNotFoundError) throw transferErr; // Rethrow if it's not a 'not found' error
//                 console.warn(`Transfer ${transactionId} not found or error:`, message);
//             }

//             // If not found as Transfer, try fetching Payment
//             if (!found) {
//                 try {
//                     const paymentData = await paymentService.getPaymentDetails(transactionId, token);
//                     setTransactionDetails({ ...paymentData, type: 'payment' });
//                     setNoteText(paymentData.note || "");
//                     // Don't reset custom view if status is pending after clicking "I've paid"
//                     if (paymentData.status !== 'pending') {
//                         setShowAwaitingVerificationView(false);
//                     }
//                     found = true;
//                     console.log("Found as Payment with status:", paymentData.status);
//                 } catch (paymentErr: unknown) { // Changed from 'any' to 'unknown'
//                     let message = 'Unknown error fetching payment details';
//                     let status = 0;
//                      if (typeof paymentErr === 'object' && paymentErr !== null) {
//                         const errObj = paymentErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                         message = errObj.response?.data?.message || errObj.message || message;
//                         status = errObj.response?.status || 0;
//                     } else if (paymentErr instanceof Error) {
//                         message = paymentErr.message;
//                     }

//                     if (status === 404 || message?.toLowerCase().includes('not found')) {
//                         setError(`Transaction with ID ${transactionId} not found.`);
//                         setTransactionDetails(null);
//                     } else { throw paymentErr; } // Rethrow other errors
//                     console.error(`Payment ${transactionId} not found or error:`, message);
//                 }
//             }
//              if (!found && !error) { // Added error to dependency array, so it's safe to use here
//                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//                 setTransactionDetails(null);
//              }
//         } catch (err: unknown) { // Changed from 'any' to 'unknown'
//              let message = "Failed to load transaction details";
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) {
//                  message = err.message;
//              }
//              setError(message);
//              setTransactionDetails(null);
//              console.error("Unhandled error fetching transaction details:", err);
//         } finally { if (showLoading) setIsLoading(false); }
//     }, [transactionId, token, error]); // Added 'error' to dependency array

//     // Effect to run fetch data on mount and when ID/token change
//     useEffect(() => { fetchTransactionDetails(); }, [fetchTransactionDetails]); // Now depends on the stable useCallback version

//     // --- Tab Underline Animation Effect ---
//     useEffect(() => {
//         const updatesTab = updatesTabRef.current;
//         const detailsTab = detailsTabRef.current;
//         const underline = underlineRef.current;

//         if (underline && updatesTab && detailsTab) {
//             const updateUnderlinePosition = () => {
//                 if (activeTab === "Updates") {
//                     underline.style.width = `${updatesTab.offsetWidth}px`;
//                     underline.style.transform = `translateX(${updatesTab.offsetLeft}px)`;
//                 } else if (activeTab === "Details") {
//                     underline.style.width = `${detailsTab.offsetWidth}px`;
//                     underline.style.transform = `translateX(${detailsTab.offsetLeft}px)`;
//                 }
//             };

//             updateUnderlinePosition();
//             window.addEventListener('resize', updateUnderlinePosition); // Update on window resize

//             return () => window.removeEventListener('resize', updateUnderlinePosition); // Cleanup on unmount
//         }
//     }, [activeTab]);

//     // --- Helper Functions & Derived Data ---
//     const isPayment = transactionDetails?.type === 'payment';
//     const isTransfer = transactionDetails?.type === 'transfer';

//     const formatDisplayDate = (dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try { return format(parseISO(dateString), "MMM d 'at' h:mm a"); }
//         catch (e) { console.error("Date formatting error:", e, "Input:", dateString); return "Invalid Date"; }
//     };

//     // --- Timeline Logic ---
//     const getTimelineSteps = (): TimelineStep[] => {
//         if (!transactionDetails) return [];

//         if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(payment.createdAt);
//             const finalDate = formatDisplayDate(payment.updatedAt);
//             const isPending = payment.status === 'pending';
//             const isInProgress = payment.status === 'in progress';
//             const isComplete = payment.status === 'completed';
//             const isCancelled = payment.status === 'canceled';
//             const hasFailed = payment.status === 'failed';

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null, showCancelAction: false },
//                 { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false },
//                 { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null, showCancelAction: false },
//                 { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null, showCancelAction: false },
//             ];

//             if (isPending) {
//                 steps[1].status = 'active';
//                 steps[1].showCancelAction = true; // Show inline "I've not paid" button
//             } else if (isInProgress) {
//                  steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null;
//                  steps[2].status = 'active'; steps[2].date = finalDate; // Use update time for receive step
//                  steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
//             } else if (isComplete) {
//                 steps = steps.map((step, index) => ({ ...step, status: 'completed', date: index === 0 ? createdDate : finalDate, info: null, showCancelAction: false }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
//                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${payment.failureReason || 'Unknown reason'}`;
//                  const failedStepIndex = steps.findIndex(step => step.status !== 'completed');
//                 if (failedStepIndex >= 0) {
//                      for(let i = 1; i < failedStepIndex; i++) { steps[i].status = 'completed'; steps[i].date = finalDate; steps[i].info = null; }
//                      steps[failedStepIndex].status = finalStatus; steps[failedStepIndex].date = finalDate; steps[failedStepIndex].info = finalInfo;
//                      for(let i = failedStepIndex + 1; i < steps.length; i++){ steps[i].status = 'pending'; steps[i].date = undefined; steps[i].info = null; }
//                  } else { steps[steps.length - 1].status = finalStatus; steps[steps.length - 1].date = finalDate; steps[steps.length - 1].info = finalInfo; }
//                  steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;
//         }
//         else if (isTransfer) {
//              // Keep existing transfer timeline logic
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(transfer.createdAt); const updatedDate = formatDisplayDate(transfer.updatedAt); const isProcessing = transfer.status === 'processing' || transfer.status === 'pending'; const isComplete = transfer.status === 'completed'; const isCancelled = transfer.status === 'canceled'; const hasFailed = transfer.status === 'failed'; const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending');
//             let steps: TimelineStep[] = [ { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null, showCancelAction: false }, { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: (isComplete || isProcessing) ? 'completed' : 'pending', date: (isComplete || isProcessing) ? createdDate : undefined, info: null, showCancelAction: false }, { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: isComplete ? 'completed' : (isProcessing ? 'active' : finalStepStatus), date: isComplete ? updatedDate : (isProcessing ? updatedDate : undefined), info: isProcessing ? `We're processing the payment to your recipient's bank.` : (hasFailed ? `Failed to pay out: ${transfer.failureReason || 'Unknown reason'}` : (isCancelled ? 'Transfer cancelled.' : null)), showCancelAction: false }, { id: 'delivered', label: `Sent to recipient's bank`, status: isComplete ? 'completed' : 'pending', date: isComplete ? updatedDate : undefined, info: null, showCancelAction: false }, ];
//             if (isCancelled || hasFailed) { const failedStepIndex = steps.findIndex(step => step.id === 'paid_out'); if (failedStepIndex > 0) { steps[failedStepIndex].status = finalStepStatus; steps[failedStepIndex].date = updatedDate; for (let i = failedStepIndex + 1; i < steps.length; i++) { steps[i].status = 'pending'; } } steps = steps.map(step => ({ ...step, showCancelAction: false })); }
//             return steps;
//         }
//         return [];
//     };
//     const timelineSteps = getTimelineSteps();

//     // --- Event Handlers ---

//     // Handles clicking the main "I've now paid" button for PENDING payments
//     const handleConfirmPaymentSubmit = async () => {
//         if (!transactionId || !token || !isPayment) return;
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             await paymentService.confirmUserTransfer(transactionId, token);
//             setShowAwaitingVerificationView(true); // Show the custom view
//             // Do not refresh data immediately
//         } catch (err: unknown) { // Changed from 'any' to 'unknown'
//             let message = `Failed to confirm payment`;
//             let status = 0;
//             if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//                 status = errObj.response?.status || 0;
//             } else if (err instanceof Error) {
//                 message = err.message;
//             }

//             if (message.includes('not in pending state') || status === 400) {
//                  setError("Payment status may have already updated. Refreshing...");
//                  await fetchTransactionDetails(false); // Refresh without main loading indicator
//             } else { setSubmissionError(message); } // Show specific error
//             console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//         } finally { setIsSubmitting(false); }
//     };

//     // Handles clicking the cancel button in the modal
//     const handleConfirmCancel = async () => {
//         if (!transactionId || !token || !transactionDetails) { setSubmissionError("Cannot proceed."); return; }
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             let cancelPromise;
//             if (isPayment) { cancelPromise = paymentService.cancelPayment(transactionId, token); }
//             else if (isTransfer) { cancelPromise = transferService.cancelTransfer(transactionId, token); }
//             else { throw new Error("Unknown transaction type."); }
//             await cancelPromise;
//             setIsCancelModalOpen(false);
//             await fetchTransactionDetails(); // Refresh data after successful cancel
//         } catch (err: unknown) { // Changed from 'any' to 'unknown'
//              let message = `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) {
//                  message = err.message;
//              }
//              setSubmissionError(message);
//              console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
//              setIsCancelModalOpen(false); // Close modal even on error
//         } finally { setIsSubmitting(false); }
//     };

//     const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setNoteText(e.target.value); };

//      const handleCopyToClipboard = (text: string | undefined, fieldName: string) => {
//         if (!text) { console.warn(`Attempted to copy empty field: ${fieldName}`); return; }
//         navigator.clipboard.writeText(text).then(() => {
//             setCopySuccess(`${fieldName} copied!`);
//             setTimeout(() => setCopySuccess(null), 1500); // Clear message after 1.5s
//         }).catch(err => { console.error('Failed to copy text: ', err); alert(`Failed to copy ${fieldName}.`); });
//     };

//     // --- Determine Cancel Button Visibility ---
//     const canCancelTransaction = useMemo(() => {
//         if (!transactionDetails) return false;
//         if (isPayment) return transactionDetails.status === 'pending' || transactionDetails.status === 'in progress';
//         if (isTransfer) return transactionDetails.status === 'pending' || transactionDetails.status === 'processing';
//         return false;
//     }, [transactionDetails, isPayment, isTransfer]);

//     // --- Render Logic ---
//     if (isLoading && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-40 mb-4" />
//              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
//                  <Skeleton className="h-20 w-full" /> {/* Header */}
//                  <Skeleton className="h-12 w-full border-y border-gray-200 dark:border-gray-700" /> {/* Tabs */}
//                  <div className="p-6 space-y-6">
//                      <Skeleton className="h-6 w-1/2" /> {/* Ref/ID */}
//                      <Skeleton className="h-40 w-full" /> {/* Timeline */}
//                      <Skeleton className="h-12 w-full" /> {/* Button Area */}
//                  </div>
//              </div>
//          </div>
//      ); }
//     if (error && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center">
//              <p className="text-red-600 bg-red-100 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-700/40">Error: {error}</p>
//              <Button onClick={() => router.back()} variant="outline" className="mt-4">Go Back</Button>
//          </div>
//     ); }
//     if (!transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
//              Transaction details not found.
//              <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-4">View Transactions</Button>
//          </div>
//      ); }

//     // Header details calculation
//     const headerIcon = isPayment ? <LuPlus size={24} className="text-neutral-900 dark:text-white"/> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white"/>;
//     const headerTitle = isPayment ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? ''} balance` : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Recipient";
//     const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
//     const headerCurrencyCode = isPayment ? (transactionDetails as PaymentDetails).balanceCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code;
//     const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
//     const headerAmountSign = isPayment ? "+" : "-";
//     let headerStatusText = "Status unknown"; let headerStatusColorClass = 'text-gray-600 dark:text-gray-400';
//     // Determine header status text and color based on the *actual* transaction status
//     switch (transactionDetails.status) {
//         case 'pending': headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated"; headerStatusColorClass = 'text-orange-600 dark:text-orange-400'; break;
//         case 'in progress': headerStatusText = "Processing payment"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'processing': headerStatusText = "Transfer processing"; headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; break;
//         case 'completed': headerStatusText = isPayment ? "Money added" : "Transfer completed"; headerStatusColorClass = 'text-green-600 dark:text-green-400'; break;
//         case 'canceled': headerStatusText = "Transaction cancelled"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//         case 'failed': headerStatusText = "Transaction failed"; headerStatusColorClass = 'text-red-600 dark:text-red-400'; break;
//     }
//     // Override header status text if showing the custom view
//     if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
//         headerStatusText = "Verifying Payment";
//         headerStatusColorClass = 'text-blue-600 dark:text-blue-400'; // Use 'in progress' color visually
//     }

//     return (
//         <> {/* Fragment for page and modal */}
//             <div className="container mx-auto">
//                 {/* Main Content Card */}
//                 <div className="bg-white dark:bg-background rounded-2xl border shadow-sm mx-auto max-w-4xl">
//                     {/* Card Header */}
//                     <div className="sm:p-6 p-4 flex items-start gap-4 border-b">
//                          <div className={cn("p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center", isPayment ? '' : '' )}> {headerIcon} </div>

//                          <div className="flex-grow flex flex-row justify-between sm:items-center gap-1 sm:gap-4">

//                          <div className="text-wrap">
//                             <h2 className="font-medium leading-relaxed text-neutral-900 dark:text-white sm:text-lg">{headerTitle}</h2>
//                             <p className={cn("text-sm mt-1", headerStatusColorClass)}> {headerStatusText} </p> </div>
//                          <div className={cn("font-medium whitespace-nowrap", isPayment ? 'text-green-600 dark:text-green-500' : 'text-neutral-900  dark:text-white' )}> {headerAmountSign} {headerAmount} </div>
//                          </div>

//                     </div>

//                     {/* Tabs Navigation */}
//                     <div className="border-b px-6">
//                         <nav className="-mb-px flex gap-4 relative" aria-label="Tabs">
//                              <button
//                                 ref={updatesTabRef}
//                                 onClick={() => setActiveTab("Updates")}
//                                 className={cn(
//                                     "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
//                                     activeTab === "Updates" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-300"
//                                 )}
//                                 aria-current={activeTab === "Updates" ? "page" : undefined}
//                             >
//                                 Updates
//                             </button>
//                             <button
//                                 ref={detailsTabRef}
//                                 onClick={() => setActiveTab("Details")}
//                                 className={cn(
//                                     "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
//                                     activeTab === "Details" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-300"
//                                 )}
//                                 aria-current={activeTab === "Details" ? "page" : undefined}
//                             >
//                                 Details
//                             </button>
//                             <span ref={underlineRef} className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 block" />
//                         </nav>
//                     </div>

//                     {/* Tab Content Area */}
//                     <div className="p-6">
//                         {/* --- Updates Tab Content --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference Code */}
//                                 <div className="flex items-center mb-6 text-sm gap-2">
//                                     <span className="text-neutral-900 dark:text-white w-28 flex-shrink-0">
//                                         {isPayment ? "Reference Code" : "Transfer ID"}
//                                     </span>
//                                     <span className="font-medium text-gray-500 dark:text-gray-300 break-all">
//                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                     </span>
//                                 </div>

//                                 {/* --- Conditional Rendering based on showAwaitingVerificationView --- */}
//                                 {isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView ? ( // Fixed typo: 'cancle' to 'pending'
//                                     // --- Render Awaiting Verification View ---
//                                     <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
//                                         <FaRegClock className="text-4xl text-blue-500 mx-auto mb-4 animate-pulse" />
//                                         <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Thanks! We&apos;re checking your payment</h3>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
//                                             We received your confirmation and are now verifying the bank transfer. This usually takes a few hours, but can sometimes take up to 19 hours depending on your bank. We&apos;ll update the status here automatically once confirmed.
//                                         </p>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                                             Reference: {transactionDetails.referenceCode || 'N/A'}
//                                         </p>
//                                          <Button variant="outline" size="sm" onClick={() => fetchTransactionDetails(false)} className="mt-6" disabled={isSubmitting}>
//                                              Refresh Status
//                                          </Button>
//                                     </div>
//                                 ) : (
//                                     // --- Render Standard Timeline and Actions ---
//                                     <>
//                                         {/* Timeline Visualization */}
//                                         <div className="relative mt-6">
//                                             {timelineSteps.length > 0 ? (
//                                                 <ul className="space-y-2"> {/* Increased vertical spacing between steps */}
//                                                     {timelineSteps.map((step, index) => (
//                                                         <li key={step.id || index} className="flex items-start space-x-4 pb-6 last:pb-0"> {/* Increased horizontal spacing, vertical padding */}
//                                                             {/* Marker & Line - Redesigned */}
//                                                             <div className="relative flex flex-col items-center flex-shrink-0">
//                                                                 <div className={cn(
//                                                                     "h-6 w-6 rounded-full flex items-center justify-center ring-4 z-10", // Refined ring appearance
//                                                                     step.status === "completed" && "bg-green-600 ring-green-600/40 text-white",
//                                                                     step.status === "active" && "bg-green-500 ring-green-600/30 text-white animate-pulse", // Active with pulse
//                                                                     step.status === "pending" && "bg-green-400  ring-green-600/20 text-white", // Pending state styling
//                                                                     step.status === "failed" && "bg-rose-600 ring-rose-600/20 text-white",
//                                                                     step.status === "cancelled" && "bg-red-600 ring-red-600/20 text-white"
//                                                                 )}>
//                                                                     {step.status === "completed" && <FaCheck className="h-3 w-3" />}
//                                                                     {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full"></div>}
//                                                                     {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-4 w-4 text-white" />}
//                                                                     {step.status === "pending" && <div className="h-2 w-2 bg-white rounded-full"></div>}
//                                                                 </div>
//                                                                 {index < timelineSteps.length - 1 && (
//                                                                     <div className={cn(
//                                                                         "absolute top-6 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.75rem)] w-0.5", // Adjusted line height
//                                                                         step.status === "completed" ? "bg-green-600" : "bg-gray-300 dark:bg-gray-500" // Line color based on step status
//                                                                     )} aria-hidden="true"></div>
//                                                                 )}
//                                                             </div>

//                                                             {/* Step Content */}
//                                                             <div className="flex-1 pt-px min-w-0">
//                                                                 <h4 className={cn(
//                                                                     "text-sm font-semibold",
//                                                                     step.status === 'pending' ? 'text-gray-500 dark:text-gray-300' : step.status === 'failed' ? 'text-rose-600 dark:text-rose-400' : step.status === 'cancelled' ? 'text-red-600' : 'text-neutral-900 dark:text-white'
//                                                                 )}> {step.label} </h4>
//                                                                 {step.date && (<p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{step.date}</p>)} {/* Increased margin-top for date */}
//                                                                 {step.info && (<div className={cn(
//                                                                     "mt-2 text-sm p-3 rounded-md border",
//                                                                     step.status === 'active' ? 'bg-blue-600/20 border-blue-600/80 text-blue-600 dark:text-blue-400' : step.status === 'failed' ? 'bg-rose-600/10 border-rose-600/80 text-rose-600 dark:text-rose-300' : step.status === 'cancelled' ? 'bg-red-600/20 border-red-600/60 text-red-600 dark:text-red-400' : 'bg-gray-600/20 border-gray-600/60 text-gray-600 dark:text-gray-300'
//                                                                 )}> <p>{step.info}</p> </div>)}
//                                                                 {/* Inline "I've not paid" Button (for pending payments) */}
//                                                                 {step.showCancelAction && (
//                                                                     <Button variant="outline" size="sm" className="mt-3 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300 h-8 px-3" onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting}> I&apos;ve not paid </Button>
//                                                                 )}
//                                                             </div>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : ( <p className="text-gray-500 dark:text-gray-400 text-sm">Status updates could not be loaded.</p> )}
//                                         </div>

//                                         {/* Conditional Bottom Action Area for PENDING Payments */}
//                                         {isPayment && transactionDetails.status === 'pending' && !showAwaitingVerificationView && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                                                 <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Ready to pay?</h3>
//                                                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                                                     Find the bank details in the <button onClick={() => setActiveTab('Details')} className="text-primary hover:underline font-medium">Details tab</button>. Once you&apos;ve sent the money from your bank, click below.
//                                                 </p>
//                                                 {submissionError && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
//                                                 <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
//                                                     <button onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting} className="order-2 sm:order-1 px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary rounded-full transition-all duration-75 ease-linear"> Cancel transfer </button>
//                                                     <button onClick={handleConfirmPaymentSubmit} disabled={isSubmitting} className="order-1 sm:order-2 px-4 py-2 w-full sm:w-auto bg-primary text-neutral-900 hover:bg-primaryhover rounded-full transition-all duration-75 ease-linear"> {isSubmitting ? 'Processing...' : "I've now paid"} </button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* General Cancel Button (if cancelable and NOT the pending payment case handled above) */}
//                                         {canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
//                                                 <button onClick={() => setIsCancelModalOpen(true)} disabled={isSubmitting} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-75 ease-linear">
//                                                     {isSubmitting ? 'Processing...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
//                                                 </button>
//                                             </div>
//                                         )}
//                                         {/* Display general submission error if needed */}
//                                         {submissionError && activeTab === 'Updates' && !(isPayment && transactionDetails.status === 'pending') && <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>}
//                                     </>
//                                 )}
//                                 {/* --- End Conditional Rendering --- */}
//                             </div>
//                         )}

//                         {/* --- Details Tab Content --- */}
//                         {activeTab === "Details" && (
//                              <div className="space-y-6">
//                                 {/* Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-neutral-900 dark:text-white border-b pb-2">Transaction details</h3>
//                                     <dl className="space-y-3 text-sm">
//                                          {/* Payment Specific Details */}
//                                         {isPayment && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Amount to add</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as PaymentDetails).amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Total fees included</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${((transactionDetails as PaymentDetails).wiseFee + (transactionDetails as PaymentDetails).bankTransferFee).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Total amount to pay</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as PaymentDetails).amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Exchange rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {(transactionDetails as PaymentDetails).payInCurrency?.code} = {(transactionDetails as PaymentDetails).exchangeRate.toFixed(2)} {(transactionDetails as PaymentDetails).balanceCurrency?.code}</dd> </div>
//                                                 {(transactionDetails as PaymentDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as PaymentDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Transfer Specific Details */}
//                                         {isTransfer && (
//                                              <>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">You sent</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Fees</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Exchange rate</dt> <dd className="font-medium text-neutral-900 dark:text-white">1 {(transactionDetails as TransferDetails).sendCurrency?.code} = {(transactionDetails as TransferDetails).exchangeRate.toFixed(2)} {(transactionDetails as TransferDetails).receiveCurrency?.code}</dd> </div>
//                                                 <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Recipient gets</dt> <dd className="font-medium text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
//                                                 {(transactionDetails as TransferDetails).failureReason && <div className="flex justify-between text-red-600 dark:text-red-400"> <dt>Failure Reason</dt> <dd>{(transactionDetails as TransferDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Common Details */}
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Date Initiated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Last Updated</dt> <dd className="font-medium text-neutral-900 dark:text-white">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                         <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt> <dd className="font-medium text-neutral-900 dark:text-white break-all">{isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}</dd> </div>
//                                     </dl>
//                                 </div>

//                                 {/* Pay-in Bank Details / Recipient Details */}
//                                 <div>
//                                     <h3 className="text-md font-semibold mb-3 text-neutral-900 dark:text-white border-b pb-2">
//                                         {isPayment ? 'Pay-in Bank Details (Wise)' : 'Recipient Details'}
//                                     </h3>
//                                      {/* Payment Bank Details */}
//                                     {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
//                                         <div className="space-y-3 text-sm">
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Payee name</p> <p className="font-semibold text-neutral-900 dark:text-white">{(transactionDetails as PaymentDetails).bankDetails?.payeeName || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.payeeName, 'Payee name')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">IBAN</p> <p className="font-semibold text-neutral-900 dark:text-white break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.iban, 'IBAN')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md flex justify-between items-center"> <div> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank code (BIC/SWIFT)</p> <p className="font-semibold text-neutral-900 dark:text-white">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift || 'N/A'}</p> </div> <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/20 px-2 py-0.5 h-auto">Copy</Button> </div>
//                                             <div className="bg-white dark:bg-white/5 border p-3 rounded-md"> <p className="text-xs text-gray-500 dark:text-gray-300 mb-0.5">Bank address</p> <p className="font-semibold text-neutral-900 dark:text-white whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress || 'N/A'}</p> </div>
//                                         </div>
//                                      )}

//                                      {/* Transfer Recipient Details */}
//                                     {isTransfer && (transactionDetails as TransferDetails).recipient && (
//                                         <dl className="space-y-2 text-sm">
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Name</dt> <dd className="font-medium text-neutral-900 dark:text-white">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Account Number</dt> <dd className="font-medium text-neutral-900 dark:text-white">**** {(transactionDetails as TransferDetails).recipient.accountNumber?.slice(-4)}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-300">Bank</dt> <dd className="font-medium text-neutral-900 dark:text-white">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
//                                              {/* Add other recipient details like BIC/IFSC if relevant */}
//                                         </dl>
//                                      )}
//                                      {/* Message if no details applicable */}
//                                      {!isPayment && !isTransfer && <p className="text-sm text-gray-500 dark:text-gray-300">Details not applicable for this transaction type.</p>}

//                                      {/* Copy Feedback */}
//                                      {copySuccess && activeTab === 'Details' && <p className="text-sm text-center text-green-600 dark:text-green-400 mt-3">{copySuccess}</p>}
//                                 </div>

//                                 {/* Note Section */}
//                                 <div>
//                                      <h3 className="text-md font-semibold mb-2 text-neutral-900 dark:text-white">Note (for your reference)</h3>
//                                      <textarea id="note" className="w-full bg-white dark:bg-white/5 rounded-md p-3 text-sm text-neutral-600 focus:ring-0 focus:outline-2 focus:outline-neutral-600 dark:focus:outline-white dark:text-gray-300 border dark:placeholder-gray-300" placeholder="Add notes about this transaction..." value={noteText} onChange={handleNoteChange} rows={3} aria-label="Transaction Note" />
//                                      {/* TODO: Add save note functionality if needed */}
//                                 </div>
//                              </div>
//                          )}
//                     </div> {/* End Tab Content Area */}
//                 </div> {/* End Main Content Card */}
//             </div> {/* End Container */}

//             {/* --- Cancellation Modal --- */}
//             {transactionDetails && (
//                 <CancelTransferModal
//                     isOpen={isCancelModalOpen}
//                     onClose={() => setIsCancelModalOpen(false)}
//                     transactionId={transactionId}
//                     transactionType={transactionDetails.type}
//                     onConfirmCancel={handleConfirmCancel}
//                     isSubmitting={isSubmitting}
//                 />
//             )}
//         </> // End Fragment
//     );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx

// "use client"; // Essential for client-side hooks and interactivity

// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// // useParams type issue might require specific handling based on Next.js/React versions
// // Using explicit type with index signature to satisfy constraint, or assertion later.
// import { useParams, useRouter } from "next/navigation"; // Hooks for routing and params
// import { format, parseISO } from 'date-fns'; // For date formatting

// // Icons
// import { LuPlus } from "react-icons/lu"; // Icon for Add Money
// import { GoArrowUp } from "react-icons/go"; // Icon for Send Money
// import { MdErrorOutline } from "react-icons/md"; // Error/Warning icon for timeline
// import { FaCheck, FaRegClock } from "react-icons/fa"; // Checkmark and Clock icons

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path if necessary
// // apiConfig import removed as it was unused
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path

// // --- TypeScript Interfaces ---

// // Interface for route parameters, ensuring compatibility with useParams constraint
// interface TransactionDetailsPageParams extends Record<string, string | string[] | undefined> {
//     transactionId: string;
// }

// // Define the structure for Payment details
// interface PaymentDetails {
//     _id: string;
//     type: 'payment'; // Discriminator property
//     user: { _id: string; email?: string; fullName?: string };
//     balanceCurrency: { _id: string; code: string; flagImage?: string }; // Currency being added to
//     payInCurrency: { _id: string; code: string; flagImage?: string }; // Currency user pays with
//     amountToAdd: number; // Amount credited to balance
//     amountToPay: number; // Amount user needs to send
//     exchangeRate: number;
//     wiseFee: number; // Fee charged by Wise
//     bankTransferFee: number; // Any specific fee for the bank transfer method
//     referenceCode?: string; // Reference for the bank transfer
//     paymentMethod: string; // e.g., 'bank_transfer', 'card'
//     status: 'pending' | 'completed' | 'failed' | 'in progress' | 'canceled' | string; // Robust status handling
//     bankDetails?: { // Details of the bank account to pay into (e.g., Wise's account)
//         payeeName?: string;
//         iban?: string;
//         bicSwift?: string;
//         bankAddress?: string;
//     };
//     createdAt: string; // ISO Date string
//     updatedAt: string; // ISO Date string
//     note?: string; // User-added note
//     failureReason?: string; // Reason if status is 'failed'
// }

// // Define the structure for Transfer details
// interface TransferDetails {
//     _id: string;
//     type: 'transfer'; // Discriminator property
//     user: { _id: string; email?: string; fullName?: string };
//     sourceAccount: { _id: string; currency: { _id: string; code: string; flagImage?: string } }; // Account money is sent FROM
//     recipient: { // Details of the recipient
//         _id: string; // Recipient ID in the system
//         accountHolderName: string;
//         nickname?: string;
//         currency: { _id: string; code: string; flagImage?: string }; // Currency recipient receives
//         accountNumber: string; // Essential for display/verification
//         bankName: string; // Essential for display/verification
//         // Potentially add other details like IBAN, BIC/SWIFT if needed for display
//     };
//     sendAmount: number; // Amount debited from source account
//     receiveAmount: number; // Amount recipient gets after conversion/fees
//     sendCurrency: { _id: string; code: string; flagImage?: string };
//     receiveCurrency: { _id: string; code: string; flagImage?: string };
//     exchangeRate: number;
//     fees: number; // Total fees for the transfer
//     reason?: string; // Purpose of the transfer
//     reference?: string; // Reference for the recipient
//     status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | string; // Robust status handling
//     failureReason?: string; // Reason if status is 'failed'
//     createdAt: string; // ISO Date string
//     updatedAt: string; // ISO Date string
//     note?: string; // User-added note
// }

// // Union type for any transaction
// type TransactionDetails = PaymentDetails | TransferDetails;

// // Define timeline step structure
// type TimelineStatus = 'completed' | 'active' | 'pending' | 'failed' | 'cancelled';
// interface TimelineStep {
//     id: string;
//     label: string;
//     status: TimelineStatus;
//     date?: string; // Formatted display date
//     info?: string | null; // Additional context for the step
//     showCancelAction?: boolean; // Flag for inline cancel button (e.g., "I've not paid")
// }
// // --- End Interfaces ---

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//     // --- Hooks ---
//     // Use the corrected interface for params
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params; // transactionId is guaranteed by the interface
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // General page error
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error (e.g., confirm payment, cancel)
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState(""); // State for the user note textarea
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions like confirm/cancel
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Controls the cancel confirmation modal
//     const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag after clicking "I've paid"
//     const [copySuccess, setCopySuccess] = useState<string | null>(null); // Feedback message after copying details

//     // --- Refs ---
//     const updatesTabRef = useRef<HTMLButtonElement>(null);
//     const detailsTabRef = useRef<HTMLButtonElement>(null);
//     const underlineRef = useRef<HTMLSpanElement>(null);

//     // --- Data Fetching ---
//     const fetchTransactionDetails = useCallback(async (showLoading = true) => {
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         if (showLoading) setIsLoading(true);
//         setError(null); setSubmissionError(null);
//         console.log("Fetching details for:", transactionId);

//         try {
//             let found = false;
//             // Try fetching Transfer first
//             try {
//                 // Assert the type returned by the service matches the expected structure (excluding 'type')
//                 const transferData = await transferService.getTransferDetails(transactionId, token) as Omit<TransferDetails, 'type'>;
//                 setTransactionDetails({ ...transferData, type: 'transfer' });
//                 setNoteText(transferData.note || ""); // Access note safely
//                 setShowAwaitingVerificationView(false); // Reset custom view for transfers
//                 found = true;
//                 console.log("Found as Transfer");
//             } catch (transferErr: unknown) {
//                 let message = 'Unknown error fetching transfer details';
//                 let status = 0;
//                  if (typeof transferErr === 'object' && transferErr !== null) {
//                     const errObj = transferErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                     message = errObj.response?.data?.message || errObj.message || message;
//                     status = errObj.response?.status || 0;
//                  } else if (transferErr instanceof Error) {
//                      message = transferErr.message;
//                  }

//                 const isNotFoundError = status === 404 || message?.toLowerCase().includes('not found') || message?.toLowerCase().includes('invalid id');
//                 if (!isNotFoundError) {
//                     console.error("Error fetching transfer details:", transferErr); // Log non-404 errors
//                     // Don't throw here, allow falling back to payment check unless it's a critical error
//                 } else {
//                     console.warn(`Transfer ${transactionId} not found or error:`, message);
//                 }
//                  // Only throw if it's definitely not a 404, otherwise let it try payment
//                  if (!isNotFoundError && status !== 0 && status !== 404) {
//                      throw transferErr;
//                  }
//             }

//             // If not found as Transfer, try fetching Payment
//             if (!found) {
//                 try {
//                     // Assert the type returned by the service matches the expected structure (excluding 'type')
//                     const paymentData = await paymentService.getPaymentDetails(transactionId, token) as unknown as Omit<PaymentDetails, 'type'>;
//                     setTransactionDetails({ ...paymentData, type: 'payment' });
//                     setNoteText(paymentData.note || ""); // Access note safely

//                     // Maintain custom view if status is still pending after a refresh
//                     if (paymentData.status !== 'pending') {
//                         setShowAwaitingVerificationView(false);
//                     }
//                     found = true;
//                     console.log("Found as Payment with status:", paymentData.status);
//                 } catch (paymentErr: unknown) {
//                     let message = 'Unknown error fetching payment details';
//                     let status = 0;
//                      if (typeof paymentErr === 'object' && paymentErr !== null) {
//                         const errObj = paymentErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                         message = errObj.response?.data?.message || errObj.message || message;
//                         status = errObj.response?.status || 0;
//                     } else if (paymentErr instanceof Error) {
//                         message = paymentErr.message;
//                     }

//                     // If transfer wasn't found AND payment wasn't found, set the error.
//                     if (status === 404 || message?.toLowerCase().includes('not found')) {
//                         setError(`Transaction with ID ${transactionId} not found.`);
//                         setTransactionDetails(null);
//                     } else {
//                         // If transfer attempt failed for other reasons, and payment fails, throw payment error.
//                         console.error(`Error fetching payment details (ID: ${transactionId}):`, paymentErr);
//                         throw paymentErr; // Rethrow the payment error
//                     }
//                     console.error(`Payment ${transactionId} not found or error:`, message);
//                 }
//             }

//             // If neither attempt succeeded and no specific error was set (e.g. both 404'd)
//             if (!found && !error) {
//                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//                 setTransactionDetails(null);
//             }

//         } catch (err: unknown) { // Catch errors re-thrown from inner blocks
//              let message = "Failed to load transaction details";
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) {
//                  message = err.message;
//              }
//              setError(message);
//              setTransactionDetails(null);
//              console.error("Unhandled error fetching transaction details:", err);
//         } finally {
//             if (showLoading) setIsLoading(false);
//         }
//     // Include 'error' in dependency array if decisions depend on it, but be cautious of loops. Here it seems safe.
//     }, [transactionId, token, error]);

//     // Effect to run fetch data on mount and when ID/token change
//     useEffect(() => {
//         fetchTransactionDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [transactionId, token]); // fetchTransactionDetails is memoized with useCallback

//     // --- Tab Underline Animation Effect ---
//     useEffect(() => {
//         const updatesTab = updatesTabRef.current;
//         const detailsTab = detailsTabRef.current;
//         const underline = underlineRef.current;

//         if (underline && updatesTab && detailsTab) {
//             const updateUnderlinePosition = () => {
//                  // Ensure elements are still mounted before accessing properties
//                  const currentUpdatesTab = updatesTabRef.current;
//                  const currentDetailsTab = detailsTabRef.current;
//                  const currentUnderline = underlineRef.current;

//                  if (!currentUpdatesTab || !currentDetailsTab || !currentUnderline) return;

//                 if (activeTab === "Updates") {
//                     currentUnderline.style.width = `${currentUpdatesTab.offsetWidth}px`;
//                     currentUnderline.style.transform = `translateX(${currentUpdatesTab.offsetLeft}px)`;
//                 } else if (activeTab === "Details") {
//                     currentUnderline.style.width = `${currentDetailsTab.offsetWidth}px`;
//                     currentUnderline.style.transform = `translateX(${currentDetailsTab.offsetLeft}px)`;
//                 }
//             };

//             // Use requestAnimationFrame for smoother updates, especially during resize
//             let rafId: number | null = null;
//             const handleResize = () => {
//                 if (rafId) cancelAnimationFrame(rafId);
//                 rafId = requestAnimationFrame(updateUnderlinePosition);
//             };

//             updateUnderlinePosition(); // Initial position
//             window.addEventListener('resize', handleResize); // Update on window resize

//             // Cleanup function
//             return () => {
//                 window.removeEventListener('resize', handleResize);
//                 if (rafId) cancelAnimationFrame(rafId);
//             };
//         }
//     }, [activeTab]); // Re-run effect when activeTab changes

//     // --- Helper Functions & Derived Data ---
//     const isPayment = transactionDetails?.type === 'payment';
//     const isTransfer = transactionDetails?.type === 'transfer';

//     // Safely format dates, handling potential invalid input
//     const formatDisplayDate = (dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try {
//             const parsedDate = parseISO(dateString);
//             // Check if parsing was successful before formatting
//             if (isNaN(parsedDate.getTime())) {
//                 throw new Error("Invalid date value after parsing");
//             }
//             return format(parsedDate, "MMM d 'at' h:mm a");
//         } catch (e) {
//             console.error("Date formatting error:", e, "Input:", dateString);
//             return "Invalid Date";
//         }
//     };

//     // --- Timeline Logic ---
//     // Using useMemo to prevent recalculating timeline steps on every render unless dependencies change
//     const timelineSteps = useMemo((): TimelineStep[] => {
//         if (!transactionDetails) return [];

//         const createdAt = transactionDetails.createdAt;
//         const updatedAt = transactionDetails.updatedAt;
//         const status = transactionDetails.status;
//         const failureReason = transactionDetails.failureReason;

//         if (isPayment) {
//             const payment = transactionDetails as PaymentDetails;
//             const createdDate = formatDisplayDate(createdAt);
//             const finalDate = formatDisplayDate(updatedAt); // Use updatedAt for steps completed after creation
//             const isPending = status === 'pending';
//             const isInProgress = status === 'in progress';
//             const isComplete = status === 'completed';
//             const isCancelled = status === 'canceled';
//             const hasFailed = status === 'failed';

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null },
//                 { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false }, // Initial status pending
//                 { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null },
//                 { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null },
//             ];

//             // Update statuses based on the actual transaction status
//             if (isPending) {
//                 steps[1].status = 'active'; // This is the current active step
//                 steps[1].showCancelAction = true; // Allow cancelling from this step if user hasn't paid
//             } else if (isInProgress) {
//                 steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null; // Assumed user paid if 'in progress'
//                 steps[2].status = 'active'; steps[2].date = finalDate; // Receiving is now active
//                 steps[2].info = `We're processing your payment of ${payment.amountToPay.toFixed(2)} ${payment.payInCurrency?.code}.`;
//             } else if (isComplete) {
//                 // Mark all steps as completed
//                 steps = steps.map((step, index) => ({
//                     ...step,
//                     status: 'completed',
//                     date: index === 0 ? createdDate : finalDate, // Use created for setup, final for others
//                     info: null,
//                     showCancelAction: false
//                 }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
//                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${failureReason || 'Unknown reason'}`;

//                 // Find the first step that wasn't completed before failure/cancellation
//                 const failedStepIndex = steps.findIndex(step => step.status !== 'completed' && step.id !== 'setup'); // Start check from step 1

//                 if (failedStepIndex > 0) { // If failure happened after setup
//                     // Mark steps before the failed one as completed (if applicable, e.g., maybe 'waiting' was completed)
//                     // This logic might need refinement based on exact state transitions
//                     for (let i = 1; i < failedStepIndex; i++) {
//                         steps[i].status = 'completed';
//                         steps[i].date = finalDate; // Use final date for intermediate steps too
//                         steps[i].info = null;
//                     }
//                     // Mark the step where it failed/was cancelled
//                     steps[failedStepIndex].status = finalStatus;
//                     steps[failedStepIndex].date = finalDate;
//                     steps[failedStepIndex].info = finalInfo;
//                     // Keep subsequent steps as pending (or potentially remove them)
//                     for (let i = failedStepIndex + 1; i < steps.length; i++) {
//                         steps[i].status = 'pending'; // Or maybe a different status like 'skipped'?
//                         steps[i].date = undefined;
//                         steps[i].info = null;
//                     }
//                 } else { // If it failed/cancelled very early (e.g., right after setup, maybe at 'waiting')
//                     steps[1].status = finalStatus; // Mark the 'waiting' step
//                     steps[1].date = finalDate;
//                     steps[1].info = finalInfo;
//                     // Keep subsequent steps pending
//                     for (let i = 2; i < steps.length; i++) {
//                        steps[i].status = 'pending';
//                        steps[i].date = undefined;
//                        steps[i].info = null;
//                     }
//                 }
//                 // Ensure no cancel actions are shown on failed/cancelled transactions
//                 steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;

//         } else if (isTransfer) {
//             const transfer = transactionDetails as TransferDetails;
//             const createdDate = formatDisplayDate(createdAt);
//             const updatedDate = formatDisplayDate(updatedAt); // Use updatedAt for subsequent steps
//             const isPendingOrProcessing = status === 'pending' || status === 'processing';
//             const isComplete = status === 'completed';
//             const isCancelled = status === 'canceled';
//             const hasFailed = status === 'failed';
//             const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending'); // Fallback shouldn't happen

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null },
//                 { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'delivered', label: `Sent to recipient's bank`, status: 'pending', date: undefined, info: null },
//             ];

//             if (isPendingOrProcessing) {
//                 steps[1].status = 'completed'; // Funded assumed complete if processing
//                 steps[1].date = updatedDate; // Or potentially createdAt if funding is instant? Use updated for safety.
//                 steps[2].status = 'active'; // Payout is the active step
//                 steps[2].date = updatedDate;
//                 steps[2].info = `We're processing the payment to your recipient's bank.`;
//             } else if (isComplete) {
//                 steps = steps.map((step, index) => ({
//                     ...step,
//                     status: 'completed',
//                     date: index === 0 ? createdDate : updatedDate, // Use created for setup, updated for others
//                     info: null
//                 }));
//             } else if (isCancelled || hasFailed) {
//                 const finalInfo = isCancelled ? 'Transfer cancelled.' : `Failed to pay out: ${failureReason || 'Unknown reason'}`;
//                 // Determine where it failed
//                 // Simple approach: assume failure happens at 'paid_out' step if not completed
//                 steps[1].status = 'completed'; // Assume funded if it got to this state
//                 steps[1].date = updatedDate;
//                 steps[2].status = finalStepStatus;
//                 steps[2].date = updatedDate;
//                 steps[2].info = finalInfo;
//                 // Keep 'delivered' as pending
//                 steps[3].status = 'pending';
//             }
//              // Ensure no cancel actions are shown on completed/failed/cancelled transfers in timeline
//              steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             return steps;
//         }
//         return []; // Should not happen if transactionDetails is valid
//     }, [transactionDetails, isPayment, isTransfer]); // Dependencies for recalculating timeline

//     // --- Event Handlers ---

//     // Handles clicking the main "I've now paid" button for PENDING payments
//     const handleConfirmPaymentSubmit = async () => {
//         if (!transactionId || !token || !isPayment || transactionDetails?.status !== 'pending') return;
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             // Call the API endpoint that marks the payment as 'user has paid'
//             await paymentService.confirmUserTransfer(transactionId, token);
//             setShowAwaitingVerificationView(true); // Show the custom "awaiting verification" view immediately
//             // Optionally, refetch details after a short delay or let the user refresh manually
//             // await fetchTransactionDetails(false); // Or maybe not refetch immediately to show the custom view first
//         } catch (err: unknown) {
//             let message = `Failed to confirm payment`;
//             let status = 0;
//             if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//                 status = errObj.response?.status || 0;
//             } else if (err instanceof Error) {
//                 message = err.message;
//             }

//             // Handle specific errors, e.g., if payment is no longer pending
//             if (message.includes('not in pending state') || status === 400) {
//                  setError("Payment status may have already updated. Refreshing...");
//                  await fetchTransactionDetails(false); // Refresh data without showing main loading spinner
//             } else {
//                 // Show error specific to this action
//                 setSubmissionError(message);
//             }
//             console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Handles clicking the confirm button in the cancellation modal
//     const handleConfirmCancel = async () => {
//         if (!transactionId || !token || !transactionDetails) {
//              setSubmissionError("Cannot proceed: Missing required information.");
//              return;
//         }
//         // Double check if cancellable based on current status before proceeding
//         if (!canCancelTransaction) {
//             setSubmissionError("This transaction can no longer be cancelled. Refreshing...");
//             await fetchTransactionDetails(false);
//             setIsCancelModalOpen(false);
//             return;
//         }

//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             let cancelPromise;
//             if (isPayment) {
//                 cancelPromise = paymentService.cancelPayment(transactionId, token);
//             } else if (isTransfer) {
//                 cancelPromise = transferService.cancelTransfer(transactionId, token);
//             } else {
//                 // Should not happen with current logic, but good practice
//                 throw new Error("Cannot cancel: Unknown transaction type.");
//             }
//             await cancelPromise;
//             setIsCancelModalOpen(false); // Close modal on success
//             await fetchTransactionDetails(false); // Refresh data to show 'cancelled' status without full page reload
//             // Optionally show a success message toast/notification here
//         } catch (err: unknown) {
//              let message = `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) {
//                  message = err.message;
//              }
//              // Display error message within the modal or on the page
//              setSubmissionError(message); // Show error near the action area
//              console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
//              // Keep modal open on error? Or close and show error on page? Closing is simpler.
//              setIsCancelModalOpen(false);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Handles changes in the note textarea
//     const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNoteText(e.target.value);
//         // TODO: Implement auto-save or a save button for the note if needed
//         // Example: Debounce saving or add a button
//     };

//     // Handles copying text to clipboard and showing feedback
//     const handleCopyToClipboard = (text: string | undefined | null, fieldName: string) => {
//         if (!text) {
//             console.warn(`Attempted to copy empty field: ${fieldName}`);
//             // Optionally show a different message like "Nothing to copy"
//             setCopySuccess(`${fieldName} is empty.`);
//              setTimeout(() => setCopySuccess(null), 1500);
//             return;
//         }
//         navigator.clipboard.writeText(text).then(() => {
//             setCopySuccess(`${fieldName} copied!`);
//             setTimeout(() => setCopySuccess(null), 1500); // Clear message after 1.5 seconds
//         }).catch(err => {
//             console.error('Failed to copy text: ', err);
//             // Provide user feedback if copy fails (e.g., due to browser restrictions)
//             alert(`Could not copy ${fieldName}. You may need to copy it manually.`);
//         });
//     };

//     // --- Determine Cancel Button Visibility ---
//     // Use useMemo for this derived state based on transactionDetails
//     const canCancelTransaction = useMemo(() => {
//         if (!transactionDetails) return false;
//         // Allow cancellation only in specific pending/processing states
//         if (isPayment) {
//             return transactionDetails.status === 'pending' || transactionDetails.status === 'in progress';
//         }
//         if (isTransfer) {
//             // Typically transfers are only cancellable very early
//             return transactionDetails.status === 'pending' || transactionDetails.status === 'processing';
//         }
//         return false; // Unknown type cannot be cancelled
//     }, [transactionDetails, isPayment, isTransfer]);

//     // --- Render Logic ---

//     // Loading State (Initial Load)
//     if (isLoading && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 animate-pulse">
//              <Skeleton className="h-6 w-1/3 mb-4" /> {/* Page title placeholder */}
//              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mx-auto max-w-4xl">
//                  <Skeleton className="h-24 sm:h-20 w-full rounded-t-2xl" /> {/* Header */}
//                  <Skeleton className="h-14 w-full border-y border-gray-200 dark:border-gray-700" /> {/* Tabs */}
//                  <div className="p-6 space-y-8"> {/* Increased spacing */}
//                      <Skeleton className="h-6 w-3/4" /> {/* Ref/ID placeholder */}
//                      <Skeleton className="h-48 w-full" /> {/* Timeline placeholder */}
//                      <Skeleton className="h-12 w-full" /> {/* Button Area placeholder */}
//                  </div>
//              </div>
//          </div>
//      ); }

//     // Error State (Failed to load initial data)
//     if (error && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center">
//              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-md shadow-sm max-w-md mx-auto">
//                 <p className="font-medium">Error Loading Transaction</p>
//                 <p className="text-sm mt-1">{error}</p>
//              </div>
//              <Button onClick={() => router.back()} variant="outline" className="mt-6">Go Back</Button>
//              <Button onClick={() => fetchTransactionDetails()} variant="secondary" className="mt-6 ml-2">Try Again</Button>
//          </div>
//     ); }

//     // Not Found State (API returned 404 or similar)
//     if (!transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//              <p className="text-lg">Transaction details not found.</p>
//              <p className="text-sm mt-1">The transaction ID might be incorrect, or it may no longer exist.</p>
//              <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-6">View All Transactions</Button>
//          </div>
//      ); }

//     // --- Derived Data for Rendering (Ensure transactionDetails is non-null here) ---
//     const headerIcon = isPayment ? <LuPlus size={24} className="text-neutral-900 dark:text-white"/> : <GoArrowUp size={24} className="text-neutral-900 dark:text-white"/>;
//     const headerTitle = isPayment
//         ? `To your ${(transactionDetails as PaymentDetails).balanceCurrency?.code ?? 'Balance'}`
//         : (transactionDetails as TransferDetails).recipient?.accountHolderName || "Outgoing Transfer";
//     const headerAmountRaw = isPayment ? (transactionDetails as PaymentDetails).amountToAdd : (transactionDetails as TransferDetails).sendAmount;
//     const headerCurrencyCode = isPayment ? (transactionDetails as PaymentDetails).balanceCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code;
//     const headerAmount = `${headerAmountRaw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'} ${headerCurrencyCode ?? ''}`;
//     const headerAmountSign = isPayment ? "+" : "-";

//     // Determine header status text and color based on the *actual* transaction status
//     let headerStatusText = "Status Unknown";
//     let headerStatusColorClass = 'text-gray-500 dark:text-gray-400'; // Default color

//     // Special handling for the "Awaiting Verification" custom UI state
//     if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
//         headerStatusText = "Verifying Payment";
//         headerStatusColorClass = 'text-blue-600 dark:text-blue-400 animate-pulse'; // Use 'in progress' color + pulse
//     } else {
//         // Standard status mapping
//         switch (transactionDetails.status) {
//             case 'pending':
//                 headerStatusText = isPayment ? "Waiting for you to pay" : "Transfer initiated";
//                 headerStatusColorClass = 'text-orange-600 dark:text-orange-400';
//                 break;
//             case 'in progress': // Payment specific
//                 headerStatusText = "Processing Payment";
//                 headerStatusColorClass = 'text-blue-600 dark:text-blue-400';
//                 break;
//             case 'processing': // Transfer specific
//                 headerStatusText = "Transfer Processing";
//                 headerStatusColorClass = 'text-blue-600 dark:text-blue-400';
//                 break;
//             case 'completed':
//                 headerStatusText = isPayment ? "Money Added" : "Transfer Completed";
//                 headerStatusColorClass = 'text-green-600 dark:text-green-400';
//                 break;
//             case 'canceled':
//                 headerStatusText = "Transaction Cancelled";
//                 headerStatusColorClass = 'text-red-600 dark:text-red-400';
//                 break;
//             case 'failed':
//                 headerStatusText = "Transaction Failed";
//                 headerStatusColorClass = 'text-red-600 dark:text-red-400';
//                 break;
//             default: // Handle any unexpected status strings gracefully
//                 headerStatusText = `Status: ${transactionDetails.status}`;
//                 headerStatusColorClass = 'text-gray-500 dark:text-gray-400';
//                 break;
//         }
//     }

//     // --- Main Component Return ---
//     return (
//         <> {/* Fragment wrapping page content and modal */}
//             <div className="container mx-auto px-4 py-8">
//                 {/* Main Content Card */}
//                 <div className="bg-white dark:bg-background rounded-2xl border dark:border-border shadow-sm mx-auto max-w-4xl">
//                     {/* Card Header */}
//                     <div className="sm:p-6 p-4 flex items-start gap-4 border-b dark:border-border">
//                          {/* Icon container */}
//                          <div className={cn(
//                             "p-3 bg-lightborder dark:bg-secondarybox rounded-full flex items-center justify-center shrink-0",
//                             isPayment ? 'text-green-600' : 'text-blue-600' // Example coloring
//                          )}>
//                             {headerIcon}
//                          </div>

//                          {/* Text content container */}
//                          <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4">
//                             {/* Left side: Title and Status */}
//                             <div className="text-wrap mr-2">
//                                 <h2 className="font-medium leading-tight text-neutral-900 dark:text-white sm:text-lg break-words">
//                                     {headerTitle}
//                                 </h2>
//                                 <p className={cn("text-sm mt-0.5", headerStatusColorClass)}>
//                                     {headerStatusText}
//                                 </p>
//                             </div>
//                             {/* Right side: Amount */}
//                             <div className={cn(
//                                 "font-medium text-lg sm:text-xl whitespace-nowrap text-right sm:text-left",
//                                 isPayment ? 'text-green-600 dark:text-green-500' : 'text-neutral-900 dark:text-white'
//                             )}>
//                                 {headerAmountSign} {headerAmount}
//                             </div>
//                          </div>
//                     </div>

//                     {/* Tabs Navigation */}
//                     <div className="border-b dark:border-border px-4 sm:px-6">
//                         <nav className="-mb-px flex gap-4 sm:gap-6 relative" aria-label="Tabs">
//                              <button
//                                 ref={updatesTabRef}
//                                 onClick={() => setActiveTab("Updates")}
//                                 className={cn(
//                                     "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-200 ease-in-out",
//                                     activeTab === "Updates"
//                                         ? "border-primary text-primary"
//                                         : "border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                                 )}
//                                 aria-current={activeTab === "Updates" ? "page" : undefined}
//                             >
//                                 Updates
//                             </button>
//                             <button
//                                 ref={detailsTabRef}
//                                 onClick={() => setActiveTab("Details")}
//                                 className={cn(
//                                     "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-200 ease-in-out",
//                                     activeTab === "Details"
//                                         ? "border-primary text-primary"
//                                         : "border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                                 )}
//                                 aria-current={activeTab === "Details" ? "page" : undefined}
//                             >
//                                 Details
//                             </button>
//                             {/* Animated underline */}
//                             <span
//                                 ref={underlineRef}
//                                 className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out block"
//                                 style={{ width: 0, transform: 'translateX(0px)' }} // Initial state set by JS effect
//                             />
//                         </nav>
//                     </div>

//                     {/* Tab Content Area */}
//                     <div className="p-4 sm:p-6">
//                         {/* --- Updates Tab Content --- */}
//                         {activeTab === "Updates" && (
//                             <div>
//                                 {/* Transaction ID / Reference Code (Consistent placement) */}
//                                 <div className="flex items-center mb-6 text-sm gap-2">
//                                     <span className="text-gray-500 dark:text-gray-400 w-28 flex-shrink-0">
//                                         {isPayment ? "Reference Code" : "Transfer ID"}
//                                     </span>
//                                     <span className="font-medium text-gray-700 dark:text-gray-300 break-all">
//                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                     </span>
//                                     {/* Optional: Add copy button here */}
//                                 </div>

//                                 {/* --- Conditional Rendering: Awaiting Verification View vs. Standard Timeline --- */}
//                                 {isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView ? (
//                                     // --- Render Awaiting Verification View ---
//                                     <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
//                                         <FaRegClock className="text-5xl text-blue-500 mx-auto mb-5 animate-spin-slow" /> {/* Slower spin */}
//                                         <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Thanks! We're checking your payment</h3>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
//                                             We received your confirmation and are now verifying the bank transfer. This usually takes a few hours, but can sometimes take up to 1-2 business days depending on your bank and the payment method. We'll update the status here automatically once confirmed.
//                                         </p>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
//                                             Reference Code: {(transactionDetails as PaymentDetails).referenceCode || 'N/A'}
//                                         </p>
//                                          <Button
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={() => fetchTransactionDetails(false)} // Refresh without full spinner
//                                             className="mt-2"
//                                             disabled={isSubmitting} // Disable if any submission is in progress? Maybe not needed here.
//                                          >
//                                              Check for Updates
//                                          </Button>
//                                     </div>
//                                 ) : (
//                                     // --- Render Standard Timeline and Actions ---
//                                     <>
//                                         {/* Timeline Visualization */}
//                                         <div className="relative mt-2"> {/* Reduced top margin */}
//                                             {timelineSteps.length > 0 ? (
//                                                 <ul className="space-y-1"> {/* Reduced vertical space between items slightly */}
//                                                     {timelineSteps.map((step, index) => (
//                                                         <li key={step.id || index} className="flex items-start space-x-4 py-3 last:pb-0"> {/* Adjusted padding */}
//                                                             {/* Marker & Line */}
//                                                             <div className="relative flex flex-col items-center flex-shrink-0 pt-1"> {/* Align marker better */}
//                                                                 <div className={cn(
//                                                                     "h-5 w-5 rounded-full flex items-center justify-center ring-4 z-10", // Smaller marker
//                                                                     step.status === "completed" && "bg-green-600 ring-green-100 dark:ring-green-900/50 text-white",
//                                                                     step.status === "active" && "bg-blue-500 ring-blue-100 dark:ring-blue-900/50 text-white animate-pulse", // Use blue for active
//                                                                     step.status === "pending" && "bg-gray-300 dark:bg-gray-600 ring-gray-100 dark:ring-gray-700/50 text-gray-600 dark:text-gray-300", // Gray for pending
//                                                                     (step.status === "failed" || step.status === "cancelled") && "bg-red-600 ring-red-100 dark:ring-red-900/50 text-white"
//                                                                 )}>
//                                                                     {/* Icons inside marker */}
//                                                                     {step.status === "completed" && <FaCheck className="h-2.5 w-2.5" />}
//                                                                     {step.status === "active" && <FaRegClock className="h-2.5 w-2.5" />}
//                                                                     {(step.status === "failed" || step.status === "cancelled") && <MdErrorOutline className="h-3 w-3" />}
//                                                                     {step.status === "pending" && <div className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"></div>} {/* Small dot for pending */}
//                                                                 </div>
//                                                                 {/* Connecting Line */}
//                                                                 {index < timelineSteps.length - 1 && (
//                                                                     <div className={cn(
//                                                                         "absolute top-5 left-1/2 transform -translate-x-1/2 h-[calc(100%_+_0.25rem)] w-0.5", // Adjusted line height/pos
//                                                                         step.status === "completed" || step.status === "active" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600" // Line color based on step completion/active status
//                                                                     )} aria-hidden="true"></div>
//                                                                 )}
//                                                             </div>

//                                                             {/* Step Content */}
//                                                             <div className="flex-1 min-w-0 pb-1"> {/* Ensure content aligns well */}
//                                                                 <h4 className={cn(
//                                                                     "text-sm font-medium", // Slightly reduced font weight for non-active
//                                                                     step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' :
//                                                                     step.status === 'active' ? 'text-blue-600 dark:text-blue-400 font-semibold' : // Highlight active
//                                                                     (step.status === 'failed' || step.status === 'cancelled') ? 'text-red-600 dark:text-red-400 font-semibold' : // Highlight failure
//                                                                     'text-neutral-800 dark:text-neutral-200' // Default completed/other text
//                                                                 )}>
//                                                                     {step.label}
//                                                                 </h4>
//                                                                 {step.date && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>)}
//                                                                 {/* Step Info Box */}
//                                                                 {step.info && (<div className={cn(
//                                                                     "mt-2 text-sm p-3 rounded-md border",
//                                                                     step.status === 'active' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300' :
//                                                                     step.status === 'failed' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300' :
//                                                                     step.status === 'cancelled' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300' : // Same style for cancelled
//                                                                     'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-300' // Default info box style
//                                                                 )}>
//                                                                     <p>{step.info}</p>
//                                                                 </div>)}
//                                                                 {/* Inline "I've not paid" Button (only for specific step in pending payments) */}
//                                                                 {step.showCancelAction && isPayment && transactionDetails.status === 'pending' && (
//                                                                     <Button
//                                                                         variant="link" // Use link style for less emphasis
//                                                                         size="sm"
//                                                                         className="mt-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 h-auto px-0 py-0" // Minimal styling
//                                                                         onClick={() => setIsCancelModalOpen(true)}
//                                                                         disabled={isSubmitting}
//                                                                     >
//                                                                         I haven't paid / Cancel
//                                                                     </Button>
//                                                                 )}
//                                                             </div>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 <p className="text-gray-500 dark:text-gray-400 text-sm py-4">
//                                                     Status updates are currently unavailable.
//                                                 </p>
//                                             )}
//                                         </div>

//                                         {/* --- Action Area at the bottom --- */}

//                                         {/* Action: Confirm Payment (Only for PENDING payments, not in 'awaiting' view) */}
//                                         {isPayment && transactionDetails.status === 'pending' && !showAwaitingVerificationView && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                                                 <h3 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-100">Have you sent the payment?</h3>
//                                                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                                                     Please find the bank details in the <button onClick={() => setActiveTab('Details')} className="text-primary hover:underline font-medium">Details tab</button>. Once you've completed the bank transfer, click the button below to let us know.
//                                                 </p>
//                                                 {/* Error message specifically for this action */}
//                                                 {submissionError && activeTab === 'Updates' && <p className="mb-4 text-sm text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/40">{submissionError}</p>}
//                                                 <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
//                                                      {/* Cancel button is always an option if pending */}
//                                                      <Button
//                                                         variant="outline"
//                                                         onClick={() => setIsCancelModalOpen(true)}
//                                                         disabled={isSubmitting}
//                                                         className="order-2 sm:order-1"
//                                                      >
//                                                          Cancel Payment
//                                                      </Button>
//                                                      <Button
//                                                         onClick={handleConfirmPaymentSubmit}
//                                                         disabled={isSubmitting}
//                                                         className="order-1 sm:order-2 w-full sm:w-auto" // Full width on mobile
//                                                      >
//                                                         {isSubmitting ? 'Processing...' : "Yes, I've Paid"}
//                                                      </Button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Action: General Cancel Button (If cancelable and NOT the pending payment case handled above) */}
//                                         {/* This applies to 'in progress' payments or 'pending'/'processing' transfers */}
//                                         {canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
//                                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
//                                                 {/* General Submission Error (e.g., from failed cancel) */}
//                                                 {submissionError && activeTab === 'Updates' && <p className="text-sm text-red-600 dark:text-red-400 mr-4 self-center">{submissionError}</p>}
//                                                 <Button
//                                                     variant="destructive" // Use destructive variant for cancel
//                                                     onClick={() => setIsCancelModalOpen(true)}
//                                                     disabled={isSubmitting}
//                                                 >
//                                                     {isSubmitting ? 'Cancelling...' : `Cancel ${isPayment ? 'Payment' : 'Transfer'}`}
//                                                 </Button>
//                                             </div>
//                                         )}

//                                         {/* Display general submission error if it occurred but wasn't shown elsewhere */}
//                                         {submissionError && activeTab === 'Updates' && !canCancelTransaction && !(isPayment && transactionDetails.status === 'pending') && (
//                                              <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-right">{submissionError}</p>
//                                         )}
//                                     </>
//                                 )}
//                                 {/* --- End Conditional Rendering --- */}
//                             </div>
//                         )} {/* End Updates Tab */}

//                         {/* --- Details Tab Content --- */}
//                         {activeTab === "Details" && (
//                              <div className="space-y-8"> {/* Increased spacing */}
//                                 {/* Section 1: Transaction Breakdown */}
//                                 <div>
//                                     <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b dark:border-border pb-2">
//                                         Transaction Breakdown
//                                     </h3>
//                                     <dl className="space-y-3 text-sm">
//                                          {/* Payment Specific Details */}
//                                         {isPayment && (
//                                              <>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Amount to Add</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${(transactionDetails as PaymentDetails).amountToAdd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).balanceCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Wise Fee</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${(transactionDetails as PaymentDetails).wiseFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Bank Transfer Fee</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${(transactionDetails as PaymentDetails).bankTransferFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-400 font-semibold">Total Amount to Pay</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${(transactionDetails as PaymentDetails).amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as PaymentDetails).payInCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center mt-2"> <dt className="text-gray-500 dark:text-gray-400">Guaranteed Rate</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">1 {(transactionDetails as PaymentDetails).payInCurrency?.code} = {(transactionDetails as PaymentDetails).exchangeRate.toFixed(4)} {(transactionDetails as PaymentDetails).balanceCurrency?.code}</dd> </div>
//                                                 {(transactionDetails as PaymentDetails).failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-400 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{(transactionDetails as PaymentDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Transfer Specific Details */}
//                                         {isTransfer && (
//                                              <>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">You Sent</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${(transactionDetails as TransferDetails).sendAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Total Fees</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${(transactionDetails as TransferDetails).fees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Amount Converted</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{`${((transactionDetails as TransferDetails).sendAmount - (transactionDetails as TransferDetails).fees).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).sendCurrency?.code}`}</dd> </div>
//                                                 <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Guaranteed Rate</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">1 {(transactionDetails as TransferDetails).sendCurrency?.code} = {(transactionDetails as TransferDetails).exchangeRate.toFixed(4)} {(transactionDetails as TransferDetails).receiveCurrency?.code}</dd> </div>
//                                                 <div className="flex justify-between items-center border-t dark:border-border pt-3 mt-2"> <dt className="text-gray-500 dark:text-gray-400 font-semibold">Recipient Gets</dt> <dd className="font-semibold text-neutral-900 dark:text-white">{`${(transactionDetails as TransferDetails).receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${(transactionDetails as TransferDetails).receiveCurrency?.code}`}</dd> </div>
//                                                 {(transactionDetails as TransferDetails).failureReason && <div className="flex justify-between items-start text-red-600 dark:text-red-400 pt-3 border-t dark:border-border mt-3"> <dt className="font-medium">Failure Reason</dt> <dd className="text-right ml-4">{(transactionDetails as TransferDetails).failureReason}</dd> </div>}
//                                              </>
//                                          )}
//                                          {/* Common Details */}
//                                         <div className="flex justify-between items-center pt-3 border-t dark:border-border mt-3"> <dt className="text-gray-500 dark:text-gray-400">Date Initiated</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{formatDisplayDate(transactionDetails.createdAt)}</dd> </div>
//                                         <div className="flex justify-between items-center"> <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{formatDisplayDate(transactionDetails.updatedAt)}</dd> </div>
//                                         <div className="flex justify-between items-center">
//                                             <dt className="text-gray-500 dark:text-gray-400">{isPayment ? 'Reference Code' : 'Transfer ID'}</dt>
//                                             <dd className="font-medium text-neutral-800 dark:text-neutral-200 break-all text-right ml-4">
//                                                 {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                             </dd>
//                                         </div>
//                                         {/* Optional: Show user who initiated if relevant */}
//                                         {/* <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">User</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200">{transactionDetails.user?.email || transactionDetails.user?._id}</dd> </div> */}
//                                     </dl>
//                                 </div>

//                                 {/* Section 2: Pay-in Bank Details (for Payments) / Recipient Details (for Transfers) */}
//                                 <div>
//                                     <h3 className="text-base font-semibold mb-4 text-neutral-900 dark:text-white border-b dark:border-border pb-2">
//                                         {isPayment ? 'Pay-in Bank Details (Send Payment Here)' : 'Recipient Details'}
//                                     </h3>
//                                      {/* Payment Bank Details Section */}
//                                     {isPayment && (transactionDetails as PaymentDetails).bankDetails && (
//                                         <div className="space-y-3 text-sm">
//                                             {/* Payee Name */}
//                                             <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
//                                                 <div>
//                                                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Payee Name</p>
//                                                     <p className="font-semibold text-neutral-800 dark:text-neutral-200">{(transactionDetails as PaymentDetails).bankDetails?.payeeName || 'N/A'}</p>
//                                                 </div>
//                                                 <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.payeeName, 'Payee name')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/10 px-2 py-1 h-auto text-xs shrink-0">Copy</Button>
//                                             </div>
//                                             {/* IBAN */}
//                                             <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
//                                                 <div>
//                                                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">IBAN</p>
//                                                     <p className="font-semibold text-neutral-800 dark:text-neutral-200 break-all">{(transactionDetails as PaymentDetails).bankDetails?.iban || 'N/A'}</p>
//                                                 </div>
//                                                 <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.iban, 'IBAN')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/10 px-2 py-1 h-auto text-xs shrink-0">Copy</Button>
//                                             </div>
//                                             {/* BIC/SWIFT */}
//                                             <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md flex justify-between items-center gap-2">
//                                                 <div>
//                                                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Bank code (BIC/SWIFT)</p>
//                                                     <p className="font-semibold text-neutral-800 dark:text-neutral-200">{(transactionDetails as PaymentDetails).bankDetails?.bicSwift || 'N/A'}</p>
//                                                 </div>
//                                                 <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).bankDetails?.bicSwift, 'BIC/SWIFT')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/10 px-2 py-1 h-auto text-xs shrink-0">Copy</Button>
//                                             </div>
//                                             {/* Reference Code - CRUCIAL for Payments */}
//                                             {(transactionDetails as PaymentDetails).referenceCode && (
//                                                 <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 p-3 rounded-md flex justify-between items-center gap-2">
//                                                     <div>
//                                                         <p className="text-xs text-blue-600 dark:text-blue-300 mb-0.5 font-semibold">IMPORTANT: Reference Code</p>
//                                                         <p className="font-bold text-blue-800 dark:text-blue-200 text-base break-all">{(transactionDetails as PaymentDetails).referenceCode}</p>
//                                                         <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">You MUST include this code as the payment reference/description when sending money from your bank.</p>
//                                                     </div>
//                                                     <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard((transactionDetails as PaymentDetails).referenceCode, 'Reference Code')} className="text-primary hover:text-primaryhover dark:hover:bg-primaryhover/10 px-2 py-1 h-auto text-xs shrink-0 self-start mt-1">Copy</Button>
//                                                 </div>
//                                             )}
//                                             {/* Bank Address */}
//                                             <div className="bg-gray-50 dark:bg-white/5 border dark:border-border p-3 rounded-md">
//                                                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Bank Address</p>
//                                                 <p className="font-semibold text-neutral-800 dark:text-neutral-200 whitespace-pre-line">{(transactionDetails as PaymentDetails).bankDetails?.bankAddress || 'N/A'}</p>
//                                             </div>
//                                         </div>
//                                      )}
//                                      {/* Message if Payment Details are missing */}
//                                      {isPayment && !(transactionDetails as PaymentDetails).bankDetails && (
//                                          <p className="text-sm text-gray-500 dark:text-gray-400">Bank details for payment are not available for this transaction.</p>
//                                      )}

//                                      {/* Transfer Recipient Details Section */}
//                                     {isTransfer && (transactionDetails as TransferDetails).recipient && (
//                                         <dl className="space-y-2 text-sm">
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Name</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right">{(transactionDetails as TransferDetails).recipient.accountHolderName}</dd> </div>
//                                              {(transactionDetails as TransferDetails).recipient.nickname && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Nickname</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right">{(transactionDetails as TransferDetails).recipient.nickname}</dd> </div>}
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Receiving Currency</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right">{(transactionDetails as TransferDetails).recipient.currency?.code}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Account Number</dt> <dd className="font-mono text-neutral-800 dark:text-neutral-200 text-right">**** **** {(transactionDetails as TransferDetails).recipient.accountNumber?.slice(-4)}</dd> </div>
//                                              <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Bank Name</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right">{(transactionDetails as TransferDetails).recipient.bankName}</dd> </div>
//                                              {/* TODO: Add other relevant recipient details if available in TransferDetails (e.g., BIC/SWIFT, Sort Code, IFSC) */}
//                                              {(transactionDetails as TransferDetails).reference && <div className="flex justify-between pt-2 border-t dark:border-border mt-2"> <dt className="text-gray-500 dark:text-gray-400">Reference for Recipient</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right ml-4">{(transactionDetails as TransferDetails).reference}</dd> </div>}
//                                              {(transactionDetails as TransferDetails).reason && <div className="flex justify-between"> <dt className="text-gray-500 dark:text-gray-400">Reason for Transfer</dt> <dd className="font-medium text-neutral-800 dark:text-neutral-200 text-right ml-4">{(transactionDetails as TransferDetails).reason}</dd> </div>}
//                                         </dl>
//                                      )}
//                                      {/* Message if Recipient Details are missing */}
//                                       {isTransfer && !(transactionDetails as TransferDetails).recipient && (
//                                          <p className="text-sm text-gray-500 dark:text-gray-400">Recipient details are not available for this transfer.</p>
//                                      )}

//                                      {/* Copy Feedback Message Area */}
//                                      <div className="h-5 mt-2 text-center"> {/* Reserve space to prevent layout shifts */}
//                                         {copySuccess && activeTab === 'Details' && (
//                                             <p className="text-sm text-green-600 dark:text-green-400 transition-opacity duration-300 ease-in-out">
//                                                 {copySuccess}
//                                             </p>
//                                         )}
//                                      </div>
//                                 </div>

//                                 {/* Section 3: Note Section */}
//                                 <div>
//                                      <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-white">Note (for your reference only)</h3>
//                                      <textarea
//                                         id="transactionNote"
//                                         className="w-full bg-white dark:bg-white/5 rounded-md p-3 text-sm text-neutral-700 dark:text-gray-300 border dark:border-border focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary dark:placeholder-gray-500 transition duration-150 ease-in-out"
//                                         placeholder="Add personal notes about this transaction..."
//                                         value={noteText}
//                                         onChange={handleNoteChange}
//                                         rows={3}
//                                         aria-label="Transaction Note"
//                                     />
//                                      {/* Consider adding a small 'Save Note' button if auto-saving isn't implemented */}
//                                      {/* <Button size="sm" variant="outline" className="mt-2">Save Note</Button> */}
//                                 </div>
//                              </div>
//                          )} {/* End Details Tab */}
//                     </div> {/* End Tab Content Area */}
//                 </div> {/* End Main Content Card */}
//             </div> {/* End Container */}

//             {/* --- Cancellation Modal --- */}
//             {/* Render modal only if transaction details are loaded */}
//             {transactionDetails && (
//                 <CancelTransferModal
//                     isOpen={isCancelModalOpen}
//                     onClose={() => setIsCancelModalOpen(false)}
//                     transactionId={transactionId} // Pass the ID
//                     // Provide more context to the modal based on type
//                     transactionType={transactionDetails.type} // 'payment' or 'transfer'
//                     // Pass amount/currency if needed for display in modal
//                     // amount={isPayment ? (transactionDetails as PaymentDetails).amountToPay : (transactionDetails as TransferDetails).sendAmount}
//                     // currency={isPayment ? (transactionDetails as PaymentDetails).payInCurrency?.code : (transactionDetails as TransferDetails).sendCurrency?.code}
//                     onConfirmCancel={handleConfirmCancel} // The function to call when user confirms
//                     isSubmitting={isSubmitting} // Pass loading state
//                 />
//             )}
//         </> // End Fragment
//     );
// };

// export default TransactionDetailsPage;

// frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { format, parseISO } from 'date-fns';

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path

// // Transaction Specific Components & Types
// import {
//     TransactionDetailsPageParams,
//     PaymentDetails,
//     TransferDetails,
//     TransactionDetails,
//     TimelineStatus,
//     TimelineStep
// } from '../../../../types/transaction'; // Adjust path
// import TransactionHeader from "../../components/transactionDetails/TransactionHeader"; // Adjust path
// import TransactionTabs from "../../components/transactionDetails/TransactionTabs"; // Adjust path
// import TransactionTimeline from "../../components/transactionDetails/TransactionTimeline"; // Adjust path
// import TransactionDetailsContent from "../../components/transactionDetails/TransactionDetailsContent"; // Adjust path
// import AwaitingVerificationView from "../../components/transactionDetails/AwaitingVerificationView"; // Adjust path
// import TransactionUpdateActions from "../../components/transactionDetails/TransactionUpdateActions"; // Adjust path

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//     // --- Hooks ---
//     // Use the corrected interface for params
//     const params = useParams<TransactionDetailsPageParams>();
//     const router = useRouter();
//     const { transactionId } = params; // transactionId is guaranteed by the interface
//     const { token } = useAuth();

//     // --- State Variables ---
//     const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // General page error
//     const [submissionError, setSubmissionError] = useState<string | null>(null); // Action-specific error (e.g., confirm payment, cancel)
//     const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//     const [noteText, setNoteText] = useState(""); // State for the user note textarea
//     const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions like confirm/cancel
//     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Controls the cancel confirmation modal
//     const [showAwaitingVerificationView, setShowAwaitingVerificationView] = useState(false); // Custom view flag after clicking "I've paid"

//     // --- Data Fetching ---
//     // Define fetchTransactionDetails using useCallback
//     const fetchTransactionDetails = useCallback(async (showLoading = true) => {
//         if (!transactionId || !token) {
//             setError("Missing transaction ID or authentication token.");
//             setIsLoading(false);
//             return;
//         }
//         if (showLoading) setIsLoading(true);
//         setError(null); setSubmissionError(null);
//         console.log("Fetching details for:", transactionId);

//         try {
//             let found = false;
//             // Try fetching Transfer first
//             try {
//                 // Assert the type returned by the service matches the expected structure (excluding 'type')
//                 const transferData = await transferService.getTransferDetails(transactionId, token) as Omit<TransferDetails, 'type'>;
//                 const fullTransferData = { ...transferData, type: 'transfer' } as TransferDetails; // Add type discriminator
//                 setTransactionDetails(fullTransferData);
//                 setNoteText(fullTransferData.note || ""); // Access note safely
//                 setShowAwaitingVerificationView(false); // Reset custom view for transfers
//                 found = true;
//                 console.log("Found as Transfer");
//             } catch (transferErr: unknown) {
//                 let message = 'Unknown error fetching transfer details';
//                 let status = 0;
//                  if (typeof transferErr === 'object' && transferErr !== null) {
//                     const errObj = transferErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                     message = errObj.response?.data?.message || errObj.message || message;
//                     status = errObj.response?.status || 0;
//                  } else if (transferErr instanceof Error) { message = transferErr.message; }

//                 const isNotFoundError = status === 404 || message?.toLowerCase().includes('not found') || message?.toLowerCase().includes('invalid id');

//                 // Only throw if it's definitely not a 404, otherwise let it try payment
//                 if (!isNotFoundError && status !== 0 && status !== 404) {
//                     console.error("Non-404 error fetching transfer details:", transferErr);
//                     throw transferErr;
//                 } else if (!isNotFoundError) {
//                     // Log non-404 errors but allow fallback (e.g., could be permission issue sometimes?)
//                     console.error("Error fetching transfer details (but allowing fallback):", transferErr);
//                 } else {
//                     // Log expected 404s or similar
//                     console.warn(`Transfer ${transactionId} not found or error:`, message);
//                 }
//             }

//             // If not found as Transfer, try fetching Payment
//             if (!found) {
//                 try {
//                     // Assert the type returned by the service matches the expected structure (excluding 'type')
//                     const paymentData = await paymentService.getPaymentDetails(transactionId, token) as unknown as Omit<PaymentDetails, 'type'>;
//                     const fullPaymentData = { ...paymentData, type: 'payment' } as PaymentDetails; // Add type discriminator
//                     setTransactionDetails(fullPaymentData);
//                     setNoteText(fullPaymentData.note || ""); // Access note safely

//                     // Maintain custom view if status is still pending after a refresh
//                     if (fullPaymentData.status !== 'pending') {
//                         setShowAwaitingVerificationView(false);
//                     } else {
//                         // Potentially check if the user *had* previously confirmed payment
//                         // This logic might need refinement based on how 'showAwaitingVerificationView' is persisted or managed
//                         // For now, keep it simple: if status is pending, don't automatically show the await view on refresh unless explicitly set
//                     }
//                     found = true;
//                     console.log("Found as Payment with status:", fullPaymentData.status);
//                 } catch (paymentErr: unknown) {
//                     let message = 'Unknown error fetching payment details';
//                     let status = 0;
//                      if (typeof paymentErr === 'object' && paymentErr !== null) {
//                         const errObj = paymentErr as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                         message = errObj.response?.data?.message || errObj.message || message;
//                         status = errObj.response?.status || 0;
//                     } else if (paymentErr instanceof Error) { message = paymentErr.message; }

//                     // If transfer wasn't found AND payment wasn't found, set the error.
//                     if (status === 404 || message?.toLowerCase().includes('not found')) {
//                         setError(`Transaction with ID ${transactionId} not found.`);
//                         setTransactionDetails(null); // Explicitly clear details
//                     } else {
//                         // If transfer attempt failed for other reasons, and payment fails, throw payment error.
//                         console.error(`Error fetching payment details (ID: ${transactionId}):`, paymentErr);
//                         throw paymentErr; // Rethrow the payment error
//                     }
//                     console.error(`Payment ${transactionId} not found or error:`, message);
//                 }
//             }

//             // If neither attempt succeeded and no specific error was set (e.g. both 404'd)
//             if (!found && !error) { // Check if error was already set by payment catch block
//                 setError(`Transaction with ID ${transactionId} could not be found or accessed.`);
//                 setTransactionDetails(null);
//             }

//         } catch (err: unknown) { // Catch errors re-thrown from inner blocks
//              let message = "Failed to load transaction details";
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) { message = err.message; }
//              setError(message);
//              setTransactionDetails(null); // Clear details on unhandled error
//              console.error("Unhandled error fetching transaction details:", err);
//         } finally {
//             if (showLoading) setIsLoading(false);
//         }
//     }, [transactionId, token, error]); // Keep 'error' here cautiously, if error logic depends on previous error state

//     // Effect to run fetch data on mount and when ID/token change
//     useEffect(() => {
//         fetchTransactionDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [transactionId, token]); // fetchTransactionDetails is memoized with useCallback

//     // --- Helper Functions & Derived Data ---
//     const isPayment = useMemo(() => transactionDetails?.type === 'payment', [transactionDetails]);
//     const isTransfer = useMemo(() => transactionDetails?.type === 'transfer', [transactionDetails]);

//     // Safely format dates, handling potential invalid input
//     const formatDisplayDate = useCallback((dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try {
//             const parsedDate = parseISO(dateString);
//             // Check if parsing was successful before formatting
//             if (isNaN(parsedDate.getTime())) {
//                 throw new Error("Invalid date value after parsing");
//             }
//             return format(parsedDate, "MMM d 'at' h:mm a");
//         } catch (e) {
//             console.error("Date formatting error:", e, "Input:", dateString);
//             return "Invalid Date";
//         }
//     }, []);

//     // --- Timeline Logic ---
//     // Using useMemo to prevent recalculating timeline steps on every render unless dependencies change
//     const timelineSteps = useMemo((): TimelineStep[] => {
//         if (!transactionDetails) return [];

//         const { createdAt, updatedAt, status, failureReason, type } = transactionDetails;

//         // Use the validated/memoized helper function
//         const createdDate = formatDisplayDate(createdAt);
//         const finalDate = formatDisplayDate(updatedAt); // Use updatedAt for steps completed after creation

//         if (type === 'payment') {
//             const payment = transactionDetails as PaymentDetails;
//             const isPending = status === 'pending';
//             const isInProgress = status === 'in progress';
//             const isComplete = status === 'completed';
//             const isCancelled = status === 'canceled';
//             const hasFailed = status === 'failed';

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up this payment", status: 'completed', date: createdDate, info: null },
//                 { id: 'waiting', label: `We're waiting for you to pay`, status: 'pending', date: undefined, info: `Check the 'Details' tab for bank information.`, showCancelAction: false }, // Initial status pending
//                 { id: 'receive', label: `We receive your ${payment.payInCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'add_balance', label: `We add it to your ${payment.balanceCurrency?.code || ''} balance`, status: 'pending', date: undefined, info: null },
//                 { id: 'done', label: "All done!", status: 'pending', date: undefined, info: null },
//             ];

//             // Update statuses based on the actual transaction status
//             if (isPending) {
//                 steps[1].status = 'active'; // This is the current active step
//                 steps[1].showCancelAction = true; // Allow cancelling from this step if user hasn't paid
//             } else if (isInProgress) {
//                 steps[1].status = 'completed'; steps[1].date = finalDate; steps[1].info = null; // Assumed user paid if 'in progress'
//                 steps[2].status = 'active'; steps[2].date = finalDate; // Receiving is now active
//                 steps[2].info = `We're processing your payment of ${payment.amountToPay?.toFixed(2) ?? 'N/A'} ${payment.payInCurrency?.code ?? ''}.`;
//             } else if (isComplete) {
//                 // Mark all steps as completed
//                 steps = steps.map((step, index) => ({
//                     ...step,
//                     status: 'completed',
//                     date: index === 0 ? createdDate : finalDate, // Use created for setup, final for others
//                     info: null,
//                     showCancelAction: false
//                 }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? 'cancelled' : 'failed';
//                 const finalInfo = isCancelled ? 'This payment was cancelled.' : `This payment failed. ${failureReason || 'Unknown reason'}`;

//                 // Find the first step that wasn't completed before failure/cancellation
//                 const failedStepIndex = steps.findIndex((step, index) => index > 0 && step.status !== 'completed'); // Start check from step 1

//                 if (failedStepIndex > 0) { // If failure happened after setup
//                     for (let i = 1; i < failedStepIndex; i++) {
//                         steps[i].status = 'completed';
//                         steps[i].date = finalDate; // Use final date for intermediate steps too
//                         steps[i].info = null;
//                     }
//                     // Mark the step where it failed/was cancelled
//                     steps[failedStepIndex].status = finalStatus;
//                     steps[failedStepIndex].date = finalDate;
//                     steps[failedStepIndex].info = finalInfo;
//                     // Keep subsequent steps as pending
//                     for (let i = failedStepIndex + 1; i < steps.length; i++) {
//                         steps[i].status = 'pending';
//                         steps[i].date = undefined;
//                         steps[i].info = null;
//                     }
//                 } else { // If it failed/cancelled very early (e.g., right after setup, maybe at 'waiting')
//                     steps[1].status = finalStatus; // Mark the 'waiting' step
//                     steps[1].date = finalDate;
//                     steps[1].info = finalInfo;
//                     // Keep subsequent steps pending
//                     for (let i = 2; i < steps.length; i++) {
//                        steps[i].status = 'pending';
//                        steps[i].date = undefined;
//                        steps[i].info = null;
//                     }
//                 }
//                 // Ensure no cancel actions are shown on failed/cancelled transactions
//                 steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;

//         } else if (type === 'transfer') {
//             const transfer = transactionDetails as TransferDetails;
//             const updatedDate = formatDisplayDate(updatedAt); // Use updatedAt for subsequent steps
//             const isPendingOrProcessing = status === 'pending' || status === 'processing';
//             const isComplete = status === 'completed';
//             const isCancelled = status === 'canceled';
//             const hasFailed = status === 'failed';
//             const finalStepStatus: TimelineStatus = isCancelled ? 'cancelled' : (hasFailed ? 'failed' : 'pending'); // Fallback shouldn't happen

//             let steps: TimelineStep[] = [
//                 { id: 'setup', label: "You set up your transfer", status: 'completed', date: createdDate, info: null },
//                 { id: 'funded', label: `We've taken funds from your ${transfer.sendCurrency?.code || 'account'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'paid_out', label: `We pay out your ${transfer.receiveCurrency?.code || 'money'}`, status: 'pending', date: undefined, info: null },
//                 { id: 'delivered', label: `Sent to recipient's bank`, status: 'pending', date: undefined, info: null },
//             ];

//             if (isPendingOrProcessing) {
//                 steps[1].status = 'completed'; // Funded assumed complete if processing
//                 steps[1].date = updatedDate; // Or potentially createdAt if funding is instant? Use updated for safety.
//                 steps[2].status = 'active'; // Payout is the active step
//                 steps[2].date = updatedDate;
//                 steps[2].info = `We're processing the payment to your recipient's bank.`;
//             } else if (isComplete) {
//                 steps = steps.map((step, index) => ({
//                     ...step,
//                     status: 'completed',
//                     date: index === 0 ? createdDate : updatedDate, // Use created for setup, updated for others
//                     info: null
//                 }));
//             } else if (isCancelled || hasFailed) {
//                 const finalInfo = isCancelled ? 'Transfer cancelled.' : `Failed to pay out: ${failureReason || 'Unknown reason'}`;
//                 // Determine where it failed
//                 // Simple approach: assume failure happens at 'paid_out' step if not completed
//                 steps[1].status = 'completed'; // Assume funded if it got to this state
//                 steps[1].date = updatedDate;
//                 steps[2].status = finalStepStatus;
//                 steps[2].date = updatedDate;
//                 steps[2].info = finalInfo;
//                 // Keep 'delivered' as pending
//                 steps[3].status = 'pending';
//             }
//              // Ensure no cancel actions are shown on completed/failed/cancelled transfers in timeline
//              steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             return steps;
//         }
//         return []; // Should not happen if transactionDetails is valid
//     }, [transactionDetails, formatDisplayDate]); // Dependencies for recalculating timeline

//     // --- Determine Cancel Button Visibility (Defined BEFORE usage in callbacks) ---
//     const canCancelTransaction = useMemo(() => {
//         if (!transactionDetails) return false;
//         // Allow cancellation only in specific pending/processing states
//         if (isPayment) {
//             // Check the specific status from transactionDetails
//             const paymentStatus = (transactionDetails as PaymentDetails).status;
//             return paymentStatus === 'pending' || paymentStatus === 'in progress';
//         }
//         if (isTransfer) {
//             // Check the specific status from transactionDetails
//             const transferStatus = (transactionDetails as TransferDetails).status;
//             // Typically transfers are only cancellable very early
//             return transferStatus === 'pending' || transferStatus === 'processing';
//         }
//         return false; // Unknown type cannot be cancelled
//     }, [transactionDetails, isPayment, isTransfer]); // Correct dependencies

//     // --- Event Handlers ---

//     // Handles clicking the main "I've now paid" button for PENDING payments
//     const handleConfirmPaymentSubmit = useCallback(async () => {
//         if (!transactionId || !token || !isPayment || transactionDetails?.status !== 'pending') return;
//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             // Call the API endpoint that marks the payment as 'user has paid'
//             await paymentService.confirmUserTransfer(transactionId, token);
//             setShowAwaitingVerificationView(true); // Show the custom "awaiting verification" view immediately
//             // Optionally, refetch details after a short delay or let the user refresh manually
//             // await fetchTransactionDetails(false); // Or maybe not refetch immediately to show the custom view first
//         } catch (err: unknown) {
//             let message = `Failed to confirm payment`;
//             let status = 0;
//             if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//                 status = errObj.response?.status || 0;
//             } else if (err instanceof Error) { message = err.message; }

//             // Handle specific errors, e.g., if payment is no longer pending
//             if (message.includes('not in pending state') || status === 400) {
//                  setError("Payment status may have already updated. Refreshing...");
//                  await fetchTransactionDetails(false); // Refresh data without showing main loading spinner
//                  setShowAwaitingVerificationView(false); // Hide the awaiting view if status changed
//             } else {
//                 // Show error specific to this action
//                 setSubmissionError(message);
//             }
//             console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }, [transactionId, token, isPayment, transactionDetails?.status, fetchTransactionDetails]); // Include dependencies

//     // Handles clicking the confirm button in the cancellation modal
//     const handleConfirmCancel = useCallback(async () => {
//         if (!transactionId || !token || !transactionDetails) {
//              setSubmissionError("Cannot proceed: Missing required information."); return;
//         }
//         // Double check if cancellable based on current status before proceeding
//         // Use the memoized `canCancelTransaction` which is now defined above
//         if (!canCancelTransaction) {
//             setSubmissionError("This transaction can no longer be cancelled. Refreshing...");
//             await fetchTransactionDetails(false);
//             setIsCancelModalOpen(false); return;
//         }

//         setIsSubmitting(true); setSubmissionError(null);
//         try {
//             let cancelPromise;
//             if (isPayment) {
//                 cancelPromise = paymentService.cancelPayment(transactionId, token);
//             } else if (isTransfer) {
//                 cancelPromise = transferService.cancelTransfer(transactionId, token);
//             } else {
//                 // Should not happen with current logic, but good practice
//                 throw new Error("Cannot cancel: Unknown transaction type.");
//             }
//             await cancelPromise;
//             setIsCancelModalOpen(false); // Close modal on success
//             await fetchTransactionDetails(false); // Refresh data to show 'cancelled' status without full page reload
//             // Optionally show a success message toast/notification here
//         } catch (err: unknown) {
//              let message = `Failed to cancel ${isPayment ? 'payment' : 'transfer'}`;
//              if (typeof err === 'object' && err !== null) {
//                 const errObj = err as { response?: { data?: { message?: string } }; message?: string };
//                 message = errObj.response?.data?.message || errObj.message || message;
//              } else if (err instanceof Error) { message = err.message; }
//              // Display error message within the modal or on the page
//              setSubmissionError(message); // Show error near the action area
//              console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, err);
//              // Keep modal open on error? Or close and show error on page? Closing is simpler.
//              setIsCancelModalOpen(false);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }, [transactionId, token, transactionDetails, isPayment, isTransfer, canCancelTransaction, fetchTransactionDetails]); // Correct dependency array

//     // Handles changes in the note textarea
//     const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNoteText(e.target.value);
//         // TODO: Implement auto-save or a save button for the note if needed
//         // Example: Debounce saving or add a button
//     }, []); // No dependencies needed if only setting local state

//     // --- Header Status Logic ---
//     const { headerStatusText, headerStatusColorClass } = useMemo(() => {
//         if (!transactionDetails) return { headerStatusText: "Loading...", headerStatusColorClass: 'text-gray-500 dark:text-gray-400' };

//         // Special handling for the "Awaiting Verification" custom UI state
//         if (isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView) {
//             return { headerStatusText: "Verifying Payment", headerStatusColorClass: 'text-blue-600 dark:text-blue-400 animate-pulse' };
//         }

//         // Standard status mapping
//         switch (transactionDetails.status) {
//             case 'pending': return { headerStatusText: isPayment ? "Waiting for you to pay" : "Transfer initiated", headerStatusColorClass: 'text-orange-600 dark:text-orange-400' };
//             case 'in progress': return { headerStatusText: "Processing Payment", headerStatusColorClass: 'text-blue-600 dark:text-blue-400' };
//             case 'processing': return { headerStatusText: "Transfer Processing", headerStatusColorClass: 'text-blue-600 dark:text-blue-400' };
//             case 'completed': return { headerStatusText: isPayment ? "Money Added" : "Transfer Completed", headerStatusColorClass: 'text-green-600 dark:text-green-400' };
//             case 'canceled': return { headerStatusText: "Transaction Cancelled", headerStatusColorClass: 'text-red-600 dark:text-red-400' };
//             case 'failed': return { headerStatusText: "Transaction Failed", headerStatusColorClass: 'text-red-600 dark:text-red-400' };
//             default: // Handle any unexpected status strings gracefully
//                 return { headerStatusText: `Status: ${transactionDetails.status}`, headerStatusColorClass: 'text-gray-500 dark:text-gray-400' };
//         }
//     }, [transactionDetails, isPayment, showAwaitingVerificationView]);

//     // --- Render Logic ---

//     // Loading State (Initial Load)
//     if (isLoading && !transactionDetails) { return (
//          <div className="bg-white dark:bg-background rounded-2xl mx-auto lg:max-w-5xl">
//              <div className="rounded-2xl">
//                  <Skeleton className="h-24 sm:h-20 w-full rounded-md" /> {/* Header */}
//                  <Skeleton className="h-14 w-full mt-2 rounded-md" /> {/* Tabs */}
//                  <div className="space-y-6  mt-6"> {/* Increased spacing */}
//                      <Skeleton className="h-6 w-3/4" /> {/* Ref/ID placeholder */}
//                      <Skeleton className="h-20 w-full" /> {/* Timeline placeholder */}
//                      <Skeleton className="h-20 w-full" /> {/* Timeline placeholder */}
//                      <Skeleton className="h-20 w-full" /> {/* Timeline placeholder */}
//                      <Skeleton className="h-20 w-full" /> {/* Timeline placeholder */}
//                      <Skeleton className="h-12 w-fu ll" /> {/* Button Area placeholder */}
//                  </div>
//              </div>
//          </div>
//      ); }

//     // Error State (Failed to load initial data)
//     if (error && !transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center">
//              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-md shadow-sm max-w-md mx-auto">
//                 <p className="font-medium">Error Loading Transaction</p>
//                 <p className="text-sm mt-1">{error}</p>
//              </div>
//              <Button onClick={() => router.back()} variant="outline" className="mt-6">Go Back</Button>
//              <Button onClick={() => fetchTransactionDetails()} variant="secondary" className="mt-6 ml-2">Try Again</Button>
//          </div>
//     ); }

//     // Not Found State (API returned 404 or similar)
//     if (!transactionDetails) { return (
//          <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//              <p className="text-lg">Transaction details not found.</p>
//              <p className="text-sm mt-1">The transaction ID might be incorrect, or it may no longer exist.</p>
//              <Button onClick={() => router.push('/dashboard/transactions')} variant="outline" className="mt-6">View All Transactions</Button>
//          </div>
//      ); }

//     // --- Main Component Return ---
//     return (
//         <section className="Transaction-Detial-Page-Wrapper py-5"> {/* Fragment wrapping page content and modal */}
//             <div className="Transaction-Detial">
//                 {/* Main Content Card */}
//                 <div className="bg-white dark:bg-background rounded-2xl border mx-auto lg:max-w-5xl">
//                     {/* Card Header */}
//                     <TransactionHeader
//                         transaction={transactionDetails}
//                         statusText={headerStatusText}
//                         statusColorClass={headerStatusColorClass}
//                     />

//                     {/* Tabs Navigation */}
//                     <TransactionTabs
//                         activeTab={activeTab}
//                         onTabChange={setActiveTab}
//                     />

//                     {/* Tab Content Area */}
//                     <div className="p-4 sm:p-6">
//                         {/* --- Updates Tab Content --- */}
//                         {activeTab === "Updates" &&  (
//                             <div>
//                                 {/* Transaction ID / Reference Code (Consistent placement) */}
//                                 <div className="flex items-center mb-6 text-sm gap-2">
//                                     <span className="text-gray-500 dark:text-gray-300 flex-shrink-0">
//                                         {isPayment ? "Reference Code :" : "Transfer ID :"}
//                                     </span>
//                                     <span className="font-medium text-neutral-900 dark:text-white break-all">
//                                         {isPayment ? (transactionDetails as PaymentDetails).referenceCode || 'N/A' : transactionDetails._id}
//                                     </span>
//                                 </div>

//                                 {/* --- Conditional Rendering: Awaiting Verification View vs. Standard Timeline --- */}
//                                 {isPayment && transactionDetails.status === 'pending' && showAwaitingVerificationView ? (
//                                     // --- Render Awaiting Verification View ---
//                                     <AwaitingVerificationView
//                                         transaction={transactionDetails as PaymentDetails}
//                                         onRefresh={() => fetchTransactionDetails(false)} // Refresh without full spinner
//                                         isSubmitting={isSubmitting} // Pass if needed to disable refresh
//                                     />
//                                 ) : (
//                                     // --- Render Standard Timeline and Actions ---
//                                     <>
//                                         {/* Timeline Visualization */}
//                                         <TransactionTimeline
//                                             steps={timelineSteps}
//                                             isPayment={isPayment}
//                                             status={transactionDetails.status}
//                                             isSubmitting={isSubmitting}
//                                             onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                                         />

//                                         {/* Action Area at the bottom */}
//                                         <TransactionUpdateActions
//                                             transaction={transactionDetails}
//                                             canCancel={canCancelTransaction}
//                                             isSubmitting={isSubmitting}
//                                             showAwaitingVerificationView={showAwaitingVerificationView} // Pass this to conditionally render buttons
//                                             submissionError={submissionError}
//                                             onConfirmPayment={handleConfirmPaymentSubmit}
//                                             onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                                             onSwitchToDetailsTab={() => setActiveTab('Details')} // Pass handler to switch tab
//                                         />
//                                     </>
//                                 )}
//                                 {/* --- End Conditional Rendering --- */}
//                             </div>
//                         )} {/* End Updates Tab */}

//                         {/* --- Details Tab Content --- */}
//                         {activeTab === "Details" && (
//                              <TransactionDetailsContent
//                                 transaction={transactionDetails}
//                                 note={noteText}
//                                 onNoteChange={handleNoteChange}
//                                 formatDisplayDate={formatDisplayDate} // Pass the memoized formatter
//                             />
//                          )} {/* End Details Tab */}
//                     </div> {/* End Tab Content Area */}
//                 </div> {/* End Main Content Card */}
//             </div> {/* End Container */}

//             {/* --- Cancellation Modal --- */}
//             {/* Render modal only if transaction details are loaded */}
//             {transactionDetails && (
//                 <CancelTransferModal
//                     isOpen={isCancelModalOpen}
//                     onClose={() => setIsCancelModalOpen(false)}
//                     transactionId={transactionId} // Pass the ID
//                     transactionType={transactionDetails.type} // 'payment' or 'transfer'
//                     onConfirmCancel={handleConfirmCancel} // The function to call when user confirms
//                     isSubmitting={isSubmitting} // Pass loading state
//                 />
//             )}
//         </section> // End Fragment
//     );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { format, parseISO } from "date-fns";

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// // --- REMOVE Skeleton import from here ---
// // import { Skeleton } from "@/components/ui/skeleton"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path

// // Transaction Specific Components & Types
// import {
//   TransactionDetailsPageParams,
//   PaymentDetails,
//   TransferDetails,
//   TransactionDetails,
//   TimelineStatus,
//   TimelineStep,
// } from "../../../../types/transaction"; // Adjust path
// import TransactionHeader from "../../components/transactionDetails/TransactionHeader"; // Adjust path
// import TransactionTabs from "../../components/transactionDetails/TransactionTabs"; // Adjust path
// import TransactionTimeline from "../../components/transactionDetails/TransactionTimeline"; // Adjust path
// import TransactionDetailsContent from "../../components/transactionDetails/TransactionDetailsContent"; // Adjust path
// import AwaitingVerificationView from "../../components/transactionDetails/AwaitingVerificationView"; // Adjust path
// import TransactionUpdateActions from "../../components/transactionDetails/TransactionUpdateActions"; // Adjust path

// // --- IMPORT the new Skeleton Component ---
// import TransactionDetailsPageSkeleton from "../../components/TransactionPageSection/TransactionDetailsPageSkeleton"; // Adjust path

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams<TransactionDetailsPageParams>();
//   const router = useRouter();
//   const { transactionId } = params;
//   const { token } = useAuth();

//   // --- State Variables ---
//   const [transactionDetails, setTransactionDetails] =
//     useState<TransactionDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionError, setSubmissionError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//   const [noteText, setNoteText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [showAwaitingVerificationView, setShowAwaitingVerificationView] =
//     useState(false);

//   // --- Data Fetching (fetchTransactionDetails - keep as is) ---
//   const fetchTransactionDetails = useCallback(
//     async (showLoading = true) => {
//       // ... (your existing fetch logic remains unchanged) ...
//       if (!transactionId || !token) {
//         setError("Missing transaction ID or authentication token.");
//         setIsLoading(false);
//         return;
//       }
//       if (showLoading) setIsLoading(true);
//       setError(null);
//       setSubmissionError(null);
//       console.log("Fetching details for:", transactionId);

//       try {
//         let found = false;
//         // Try fetching Transfer first
//         try {
//           const transferData = (await transferService.getTransferDetails(
//             transactionId,
//             token
//           )) as Omit<TransferDetails, "type">;
//           const fullTransferData = {
//             ...transferData,
//             type: "transfer",
//           } as TransferDetails;
//           setTransactionDetails(fullTransferData);
//           setNoteText(fullTransferData.note || "");
//           setShowAwaitingVerificationView(false);
//           found = true;
//           console.log("Found as Transfer");
//         } catch (transferErr: unknown) {
//           let message = "Unknown error fetching transfer details";
//           let status = 0;
//           if (typeof transferErr === "object" && transferErr !== null) {
//             const errObj = transferErr as {
//               response?: { status?: number; data?: { message?: string } };
//               message?: string;
//             };
//             message =
//               errObj.response?.data?.message || errObj.message || message;
//             status = errObj.response?.status || 0;
//           } else if (transferErr instanceof Error) {
//             message = transferErr.message;
//           }

//           const isNotFoundError =
//             status === 404 ||
//             message?.toLowerCase().includes("not found") ||
//             message?.toLowerCase().includes("invalid id");

//           if (!isNotFoundError && status !== 0 && status !== 404) {
//             console.error(
//               "Non-404 error fetching transfer details:",
//               transferErr
//             );
//             throw transferErr;
//           } else if (!isNotFoundError) {
//             console.error(
//               "Error fetching transfer details (but allowing fallback):",
//               transferErr
//             );
//           } else {
//             console.warn(
//               `Transfer ${transactionId} not found or error:`,
//               message
//             );
//           }
//         }

//         // If not found as Transfer, try fetching Payment
//         if (!found) {
//           try {
//             const paymentData = (await paymentService.getPaymentDetails(
//               transactionId,
//               token
//             )) as unknown as Omit<PaymentDetails, "type">;
//             const fullPaymentData = {
//               ...paymentData,
//               type: "payment",
//             } as PaymentDetails;
//             setTransactionDetails(fullPaymentData);
//             setNoteText(fullPaymentData.note || "");

//             if (fullPaymentData.status !== "pending") {
//               setShowAwaitingVerificationView(false);
//             } else {
//               // If already confirmed and still pending, maybe keep the view? (Needs state management)
//               // For now, simple logic: don't show await view on refresh unless explicitly set by action.
//             }
//             found = true;
//             console.log(
//               "Found as Payment with status:",
//               fullPaymentData.status
//             );
//           } catch (paymentErr: unknown) {
//             let message = "Unknown error fetching payment details";
//             let status = 0;
//             if (typeof paymentErr === "object" && paymentErr !== null) {
//               const errObj = paymentErr as {
//                 response?: { status?: number; data?: { message?: string } };
//                 message?: string;
//               };
//               message =
//                 errObj.response?.data?.message || errObj.message || message;
//               status = errObj.response?.status || 0;
//             } else if (paymentErr instanceof Error) {
//               message = paymentErr.message;
//             }

//             if (
//               status === 404 ||
//               message?.toLowerCase().includes("not found")
//             ) {
//               setError(`Transaction with ID ${transactionId} not found.`);
//               setTransactionDetails(null);
//             } else {
//               console.error(
//                 `Error fetching payment details (ID: ${transactionId}):`,
//                 paymentErr
//               );
//               throw paymentErr;
//             }
//             console.error(
//               `Payment ${transactionId} not found or error:`,
//               message
//             );
//           }
//         }

//         if (!found && !error) {
//           setError(
//             `Transaction with ID ${transactionId} could not be found or accessed.`
//           );
//           setTransactionDetails(null);
//         }
//       } catch (err: unknown) {
//         let message = "Failed to load transaction details";
//         if (typeof err === "object" && err !== null) {
//           const errObj = err as {
//             response?: { data?: { message?: string } };
//             message?: string;
//           };
//           message = errObj.response?.data?.message || errObj.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         setTransactionDetails(null);
//         console.error("Unhandled error fetching transaction details:", err);
//       } finally {
//         if (showLoading) setIsLoading(false);
//       }
//     },
//     [transactionId, token, error]
//   ); // Keep error dependency

//   // --- Effect (keep as is) ---
//   useEffect(() => {
//     fetchTransactionDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [transactionId, token]);

//   // --- Helper Functions & Derived Data (keep as is) ---
//   const isPayment = useMemo(
//     () => transactionDetails?.type === "payment",
//     [transactionDetails]
//   );
//   const isTransfer = useMemo(
//     () => transactionDetails?.type === "transfer",
//     [transactionDetails]
//   );
//   const formatDisplayDate = useCallback(
//     /* ... */ (dateString: string | undefined): string => {
//       if (!dateString) return "Date not available";
//       try {
//         const parsedDate = parseISO(dateString);
//         if (isNaN(parsedDate.getTime())) {
//           throw new Error("Invalid date value after parsing");
//         }
//         return format(parsedDate, "MMM d 'at' h:mm a");
//       } catch (e) {
//         console.error("Date formatting error:", e, "Input:", dateString);
//         return "Invalid Date";
//       }
//     },
//     []
//   );
//   const timelineSteps = useMemo(
//     /* ... */ (): TimelineStep[] => {
//       // ... (your existing timeline logic remains unchanged) ...
//       if (!transactionDetails) return [];

//       const { createdAt, updatedAt, status, failureReason, type } =
//         transactionDetails;

//       const createdDate = formatDisplayDate(createdAt);
//       const finalDate = formatDisplayDate(updatedAt);

//       if (type === "payment") {
//         const payment = transactionDetails as PaymentDetails;
//         const isPending = status === "pending";
//         const isInProgress = status === "in progress";
//         const isComplete = status === "completed";
//         const isCancelled = status === "canceled";
//         const hasFailed = status === "failed";

//         let steps: TimelineStep[] = [
//           {
//             id: "setup",
//             label: "You set up this payment",
//             status: "completed",
//             date: createdDate,
//             info: null,
//           },
//           {
//             id: "waiting",
//             label: `Your money's on its way to us`,
//             status: "pending",
//             date: undefined,
//             info: `your bank might take up to 4 hours to get it to us. we'll let you know when it arrives.`,
//             showCancelAction: false,
//           },
//           {
//             id: "receive",
//             label: `We receive your ${payment.payInCurrency?.code || "money"}`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "add_balance",
//             label: `We add it to your ${
//               payment.balanceCurrency?.code || ""
//             } balance`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "done",
//             label: "All done!",
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//         ];

//         if (isPending) {
//           steps[1].status = "active";
//           steps[1].showCancelAction = true;
//         } else if (isInProgress) {
//           steps[1].status = "completed";
//           steps[1].date = finalDate;
//           steps[1].info = null;
//           steps[2].status = "active";
//           steps[2].date = finalDate;
//           steps[2].info = `We're processing your payment of ${
//             payment.amountToPay?.toFixed(2) ?? "N/A"
//           } ${payment.payInCurrency?.code ?? ""}.`;
//         } else if (isComplete) {
//           steps = steps.map((step, index) => ({
//             ...step,
//             status: "completed",
//             date: index === 0 ? createdDate : finalDate,
//             info: null,
//             showCancelAction: false,
//           }));
//         } else if (isCancelled || hasFailed) {
//           const finalStatus: TimelineStatus = isCancelled
//             ? "cancelled"
//             : "failed";
//           const finalInfo = isCancelled
//             ? "This payment was cancelled."
//             : `This payment failed. ${failureReason || "Unknown reason"}`;
//           const failedStepIndex = steps.findIndex(
//             (step, index) => index > 0 && step.status !== "completed"
//           );

//           if (failedStepIndex > 0) {
//             for (let i = 1; i < failedStepIndex; i++) {
//               steps[i].status = "completed";
//               steps[i].date = finalDate;
//               steps[i].info = null;
//             }
//             steps[failedStepIndex].status = finalStatus;
//             steps[failedStepIndex].date = finalDate;
//             steps[failedStepIndex].info = finalInfo;
//             for (let i = failedStepIndex + 1; i < steps.length; i++) {
//               steps[i].status = "pending";
//               steps[i].date = undefined;
//               steps[i].info = null;
//             }
//           } else {
//             steps[1].status = finalStatus;
//             steps[1].date = finalDate;
//             steps[1].info = finalInfo;
//             for (let i = 2; i < steps.length; i++) {
//               steps[i].status = "pending";
//               steps[i].date = undefined;
//               steps[i].info = null;
//             }
//           }
//           steps = steps.map((step) => ({ ...step, showCancelAction: false }));
//         }
//         return steps;
//       } else if (type === "transfer") {
//         const transfer = transactionDetails as TransferDetails;
//         const updatedDate = formatDisplayDate(updatedAt);
//         const isPendingOrProcessing =
//           status === "pending" || status === "processing";
//         const isComplete = status === "completed";
//         const isCancelled = status === "canceled";
//         const hasFailed = status === "failed";
//         const finalStepStatus: TimelineStatus = isCancelled
//           ? "cancelled"
//           : hasFailed
//           ? "failed"
//           : "pending";

//         let steps: TimelineStep[] = [
//           {
//             id: "setup",
//             label: "You set up your transfer",
//             status: "completed",
//             date: createdDate,
//             info: null,
//           },
//           {
//             id: "funded",
//             label: `We've taken funds from your ${
//               transfer.sendCurrency?.code || "account"
//             }`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "paid_out",
//             label: `Your money's being processed ${
//               transfer.receiveCurrency?.code || "money"
//             }`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "delivered",
//             label: `Sent to recipient's bank`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//         ];

//         if (isPendingOrProcessing) {
//           steps[1].status = "completed";
//           steps[1].date = updatedDate;
//           steps[2].status = "active";
//           steps[2].date = updatedDate;
//           steps[2].info = `We're processing the payment to your recipient's bank.`;
//         } else if (isComplete) {
//           steps = steps.map((step, index) => ({
//             ...step,
//             status: "completed",
//             date: index === 0 ? createdDate : updatedDate,
//             info: null,
//           }));
//         } else if (isCancelled || hasFailed) {
//           const finalInfo = isCancelled
//             ? "Transfer cancelled."
//             : `Failed to pay out: ${failureReason || "Unknown reason"}`;
//           steps[1].status = "completed";
//           steps[1].date = updatedDate;
//           steps[2].status = finalStepStatus;
//           steps[2].date = updatedDate;
//           steps[2].info = finalInfo;
//           steps[3].status = "pending";
//         }
//         steps = steps.map((step) => ({ ...step, showCancelAction: false }));
//         return steps;
//       }
//       return [];
//     },
//     [transactionDetails, formatDisplayDate]
//   );
//   const canCancelTransaction = useMemo(
//     /* ... */ () => {
//       // ... (your existing cancel logic remains unchanged) ...
//       if (!transactionDetails) return false;
//       if (isPayment) {
//         const paymentStatus = (transactionDetails as PaymentDetails).status;
//         return paymentStatus === "pending" || paymentStatus === "in progress";
//       }
//       if (isTransfer) {
//         const transferStatus = (transactionDetails as TransferDetails).status;
//         return transferStatus === "pending" || transferStatus === "processing";
//       }
//       return false;
//     },
//     [transactionDetails, isPayment, isTransfer]
//   );

//   // --- Event Handlers (keep as is) ---
//   const handleConfirmPaymentSubmit = useCallback(
//     /* ... */ async () => {
//       // ... (your existing handler logic remains unchanged) ...
//       if (
//         !transactionId ||
//         !token ||
//         !isPayment ||
//         transactionDetails?.status !== "pending"
//       )
//         return;
//       setIsSubmitting(true);
//       setSubmissionError(null);
//       try {
//         await paymentService.confirmUserTransfer(transactionId, token);
//         setShowAwaitingVerificationView(true);
//         // Optionally delay refresh: setTimeout(() => fetchTransactionDetails(false), 3000);
//       } catch (err: unknown) {
//         let message = `Failed to confirm payment`;
//         let status = 0;
//         if (typeof err === "object" && err !== null) {
//           const errObj = err as {
//             response?: { status?: number; data?: { message?: string } };
//             message?: string;
//           };
//           message = errObj.response?.data?.message || errObj.message || message;
//           status = errObj.response?.status || 0;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }

//         if (message.includes("not in pending state") || status === 400) {
//           setError("Payment status may have already updated. Refreshing...");
//           await fetchTransactionDetails(false);
//           setShowAwaitingVerificationView(false);
//         } else {
//           setSubmissionError(message);
//         }
//         console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [
//       transactionId,
//       token,
//       isPayment,
//       transactionDetails?.status,
//       fetchTransactionDetails,
//     ]
//   );
//   const handleConfirmCancel = useCallback(
//     /* ... */ async () => {
//       // ... (your existing handler logic remains unchanged) ...
//       if (!transactionId || !token || !transactionDetails) {
//         setSubmissionError("Cannot proceed: Missing required information.");
//         return;
//       }
//       if (!canCancelTransaction) {
//         setSubmissionError(
//           "This transaction can no longer be cancelled. Refreshing..."
//         );
//         await fetchTransactionDetails(false);
//         setIsCancelModalOpen(false);
//         return;
//       }

//       setIsSubmitting(true);
//       setSubmissionError(null);
//       try {
//         let cancelPromise;
//         if (isPayment) {
//           cancelPromise = paymentService.cancelPayment(transactionId, token);
//         } else if (isTransfer) {
//           cancelPromise = transferService.cancelTransfer(transactionId, token);
//         } else {
//           throw new Error("Cannot cancel: Unknown transaction type.");
//         }
//         await cancelPromise;
//         setIsCancelModalOpen(false);
//         await fetchTransactionDetails(false);
//       } catch (err: unknown) {
//         let message = `Failed to cancel ${isPayment ? "payment" : "transfer"}`;
//         if (typeof err === "object" && err !== null) {
//           const errObj = err as {
//             response?: { data?: { message?: string } };
//             message?: string;
//           };
//           message = errObj.response?.data?.message || errObj.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setSubmissionError(message);
//         console.error(
//           `Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`,
//           err
//         );
//         setIsCancelModalOpen(false);
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [
//       transactionId,
//       token,
//       transactionDetails,
//       isPayment,
//       isTransfer,
//       canCancelTransaction,
//       fetchTransactionDetails,
//     ]
//   );
//   const handleNoteChange = useCallback(
//     /* ... */ (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       // ... (your existing handler logic remains unchanged) ...
//       setNoteText(e.target.value);
//     },
//     []
//   );

//   // --- Header Status Logic (keep as is) ---
//   const { headerStatusText, headerStatusColorClass } = useMemo(
//     /* ... */ () => {
//       // ... (your existing status logic remains unchanged) ...
//       if (!transactionDetails)
//         return {
//           headerStatusText: "Loading...",
//           headerStatusColorClass: "text-gray-500 dark:text-gray-400",
//         };

//       if (
//         isPayment &&
//         transactionDetails.status === "pending" &&
//         showAwaitingVerificationView
//       ) {
//         return {
//           headerStatusText: "Verifying Payment",
//           headerStatusColorClass:
//             "text-blue-600 dark:text-blue-400 animate-pulse",
//         };
//       }

//       switch (transactionDetails.status) {
//         case "pending":
//           return {
//             headerStatusText: isPayment
//               ? "Waiting for you to pay"
//               : "Transfer initiated",
//             headerStatusColorClass: "text-orange-600 dark:text-orange-400",
//           };
//         case "in progress":
//           return {
//             headerStatusText: "Processing Payment",
//             headerStatusColorClass: "text-blue-600 dark:text-blue-400",
//           };
//         case "processing":
//           return {
//             headerStatusText: "Transfer Processing",
//             headerStatusColorClass: "text-blue-600 dark:text-blue-400",
//           };
//         case "completed":
//           return {
//             headerStatusText: isPayment ? "Money Added" : "Transfer Completed",
//             headerStatusColorClass: "text-green-600 dark:text-green-400",
//           };
//         case "canceled":
//           return {
//             headerStatusText: "Transaction Cancelled",
//             headerStatusColorClass: "text-red-600 dark:text-red-400",
//           };
//         case "failed":
//           return {
//             headerStatusText: "Transaction Failed",
//             headerStatusColorClass: "text-red-600 dark:text-red-400",
//           };
//         default:
//           return {
//             headerStatusText: `Status: ${transactionDetails.status}`,
//             headerStatusColorClass: "text-gray-500 dark:text-gray-400",
//           };
//       }
//     },
//     [transactionDetails, isPayment, showAwaitingVerificationView]
//   );

//   // --- Render Logic ---

//   // Loading State (Initial Load) - USE THE NEW SKELETON
//   if (isLoading && !transactionDetails) {
//     return <TransactionDetailsPageSkeleton />; // <-- Use the new skeleton component
//   }

//   // Error State (Failed to load initial data) - Keep as is
//   if (error && !transactionDetails) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-md shadow-sm max-w-md mx-auto">
//           <p className="font-medium">Error Loading Transaction</p>
//           <p className="text-sm mt-1">{error}</p>
//         </div>
//         <Button
//           onClick={() => router.back()}
//           variant="outline"
//           className="mt-6"
//         >
//           Go Back
//         </Button>
//         <Button
//           onClick={() => fetchTransactionDetails()}
//           variant="secondary"
//           className="mt-6 ml-2"
//         >
//           Try Again
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State - Keep as is
//   if (!transactionDetails) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//         <p className="text-lg">Transaction details not found.</p>
//         <p className="text-sm mt-1">
//           The transaction ID might be incorrect, or it may no longer exist.
//         </p>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="outline"
//           className="mt-6"
//         >
//           View All Transactions
//         </Button>
//       </div>
//     );
//   }

//   // --- Main Component Return (keep the rest as is) ---
//   return (
//     <section className="Transaction-Detial-Page-Wrapper py-5">
//       <div className="Transaction-Detial">
//         {/* Main Content Card */}
//         <div className="bg-white dark:bg-background rounded-2xl border mx-auto lg:max-w-5xl">
//           {/* Card Header */}
//           <TransactionHeader
//             transaction={transactionDetails}
//             statusText={headerStatusText}
//             statusColorClass={headerStatusColorClass}
//           />
//           {/* Tabs Navigation */}
//           <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />
//           {/* Tab Content Area */}
//           <div className="p-4 sm:p-6">
//             {/* --- Updates Tab Content --- */}
//             {activeTab === "Updates" && (
//               <div>
//                 {/* Transaction ID / Reference Code */}
//                 <div className="flex items-center mb-6 text-sm gap-2">
//                   <span className="text-gray-500 dark:text-gray-300 flex-shrink-0">
//                     {isPayment ? "Reference Code :" : "Transfer ID :"}
//                   </span>
//                   <span className="font-medium text-neutral-900 dark:text-white break-all">
//                     {isPayment
//                       ? (transactionDetails as PaymentDetails).referenceCode ||
//                         "N/A"
//                       : transactionDetails._id}
//                   </span>
//                 </div>

//                 {/* Conditional Rendering: Awaiting Verification vs. Standard */}
//                 {isPayment &&
//                 transactionDetails.status === "pending" &&
//                 showAwaitingVerificationView ? (
//                   <AwaitingVerificationView
//                     transaction={transactionDetails as PaymentDetails}
//                     onRefresh={() => fetchTransactionDetails(false)}
//                     isSubmitting={isSubmitting}
//                   />
//                 ) : (
//                   <>
//                     {/* Timeline */}
//                     <TransactionTimeline
//                       steps={timelineSteps}
//                       isPayment={isPayment}
//                       status={transactionDetails.status}
//                       isSubmitting={isSubmitting}
//                       onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                     />

//                     {/* Actions */}
//                     <TransactionUpdateActions
//                       transaction={transactionDetails}
//                       canCancel={canCancelTransaction}
//                       isSubmitting={isSubmitting}
//                       showAwaitingVerificationView={
//                         showAwaitingVerificationView
//                       }
//                       submissionError={submissionError}
//                       onConfirmPayment={handleConfirmPaymentSubmit}
//                       onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                       onSwitchToDetailsTab={() => setActiveTab("Details")}
//                     />
//                   </>
//                 )}
//               </div>
//             )}
//             {/* End Updates Tab */}
//             {/* --- Details Tab Content --- */}
//             {activeTab === "Details" && (
//               <TransactionDetailsContent
//                 transaction={transactionDetails}
//                 note={noteText}
//                 onNoteChange={handleNoteChange}
//                 formatDisplayDate={formatDisplayDate}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- Cancellation Modal --- */}
//       {transactionDetails && (
//         <CancelTransferModal
//           isOpen={isCancelModalOpen}
//           onClose={() => setIsCancelModalOpen(false)}
//           transactionId={transactionId}
//           transactionType={transactionDetails.type}
//           onConfirmCancel={handleConfirmCancel}
//           isSubmitting={isSubmitting}
//         />
//       )}
//     </section>
//   );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { format, parseISO } from "date-fns";

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path

// // Transaction Specific Components & Types
// import {
//   TransactionDetailsPageParams,
//   PaymentDetails,
//   TransferDetails,
//   TransactionDetails,
//   TimelineStatus,
//   TimelineStep,
// } from "../../../../types/transaction"; // Adjust path
// import TransactionHeader from "../../components/transactionDetails/TransactionHeader"; // Adjust path
// import TransactionTabs from "../../components/transactionDetails/TransactionTabs"; // Adjust path
// import TransactionTimeline from "../../components/transactionDetails/TransactionTimeline"; // Adjust path
// import TransactionDetailsContent from "../../components/transactionDetails/TransactionDetailsContent"; // Adjust path
// import AwaitingVerificationView from "../../components/transactionDetails/AwaitingVerificationView"; // Adjust path
// import TransactionUpdateActions from "../../components/transactionDetails/TransactionUpdateActions"; // Adjust path
// import TransactionDetailsPageSkeleton from "../../components/TransactionPageSection/TransactionDetailsPageSkeleton"; // Adjust path

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams<TransactionDetailsPageParams>();
//   const router = useRouter();
//   const { transactionId } = params;
//   const { token } = useAuth();

//   // --- State Variables ---
//   const [transactionDetails, setTransactionDetails] =
//     useState<TransactionDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionError, setSubmissionError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//   const [noteText, setNoteText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [showAwaitingVerificationView, setShowAwaitingVerificationView] =
//     useState(false);

//   // --- Data Fetching ---
//   const fetchTransactionDetails = useCallback(
//     async (showLoading = true) => {
//       if (!transactionId || !token) {
//         setError("Missing transaction ID or authentication token.");
//         setIsLoading(false);
//         return;
//       }
//       if (showLoading) setIsLoading(true);
//       setError(null);
//       setSubmissionError(null);
//       console.log("Fetching details for:", transactionId);

//       try {
//         let found = false;
//         // Try fetching Transfer first
//         try {
//           const transferData = (await transferService.getTransferDetails(
//             transactionId,
//             token
//           )) as Omit<TransferDetails, "type">;
//           const fullTransferData = {
//             ...transferData,
//             type: "transfer",
//           } as TransferDetails;
//           setTransactionDetails(fullTransferData);
//           setNoteText(fullTransferData.note || "");
//           setShowAwaitingVerificationView(false); // Reset this view for transfers
//           found = true;
//           console.log("Found as Transfer");
//         } catch (transferErr: unknown) {
//           let message = "Unknown error fetching transfer details";
//           let status = 0;
//           if (typeof transferErr === "object" && transferErr !== null) {
//             const errObj = transferErr as {
//               response?: { status?: number; data?: { message?: string } };
//               message?: string;
//             };
//             message =
//               errObj.response?.data?.message || errObj.message || message;
//             status = errObj.response?.status || 0;
//           } else if (transferErr instanceof Error) {
//             message = transferErr.message;
//           }

//           const isNotFoundError =
//             status === 404 ||
//             message?.toLowerCase().includes("not found") ||
//             message?.toLowerCase().includes("invalid id");

//           if (!isNotFoundError && status !== 0 && status !== 404) {
//             console.error(
//               "Non-404 error fetching transfer details:",
//               transferErr
//             );
//             throw transferErr;
//           } else if (!isNotFoundError) {
//             console.error(
//               "Error fetching transfer details (but allowing fallback):",
//               transferErr
//             );
//           } else {
//             console.warn(
//               `Transfer ${transactionId} not found or error:`,
//               message
//             );
//           }
//         }

//         // If not found as Transfer, try fetching Payment
//         if (!found) {
//           try {
//             const paymentData = (await paymentService.getPaymentDetails(
//               transactionId,
//               token
//             )) as unknown as Omit<PaymentDetails, "type">;
//             const fullPaymentData = {
//               ...paymentData,
//               type: "payment",
//             } as PaymentDetails;
//             setTransactionDetails(fullPaymentData);
//             setNoteText(fullPaymentData.note || "");

//             // Reset awaiting view unless it was explicitly triggered just before refresh
//             if (fullPaymentData.status !== "pending") {
//               setShowAwaitingVerificationView(false);
//             } else {
//                 // Keep awaiting view if it was just set, otherwise reset it
//                 // The state `showAwaitingVerificationView` handles this persistence
//             }
//             found = true;
//             console.log(
//               "Found as Payment with status:",
//               fullPaymentData.status
//             );
//           } catch (paymentErr: unknown) {
//             let message = "Unknown error fetching payment details";
//             let status = 0;
//             if (typeof paymentErr === "object" && paymentErr !== null) {
//               const errObj = paymentErr as {
//                 response?: { status?: number; data?: { message?: string } };
//                 message?: string;
//               };
//               message =
//                 errObj.response?.data?.message || errObj.message || message;
//               status = errObj.response?.status || 0;
//             } else if (paymentErr instanceof Error) {
//               message = paymentErr.message;
//             }

//             if (
//               status === 404 ||
//               message?.toLowerCase().includes("not found")
//             ) {
//               setError(`Transaction with ID ${transactionId} not found.`);
//               setTransactionDetails(null);
//             } else {
//               console.error(
//                 `Error fetching payment details (ID: ${transactionId}):`,
//                 paymentErr
//               );
//               throw paymentErr;
//             }
//             console.error(
//               `Payment ${transactionId} not found or error:`,
//               message
//             );
//           }
//         }

//         if (!found && !error) {
//           setError(
//             `Transaction with ID ${transactionId} could not be found or accessed.`
//           );
//           setTransactionDetails(null);
//         }
//       } catch (err: unknown) {
//         let message = "Failed to load transaction details";
//         if (typeof err === "object" && err !== null) {
//           const errObj = err as {
//             response?: { data?: { message?: string } };
//             message?: string;
//           };
//           message = errObj.response?.data?.message || errObj.message || message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }
//         setError(message);
//         setTransactionDetails(null);
//         console.error("Unhandled error fetching transaction details:", err);
//       } finally {
//         if (showLoading) setIsLoading(false);
//       }
//     },
//     [transactionId, token, error] // Keep error dependency
//   );

//   // --- Effect ---
//   useEffect(() => {
//     fetchTransactionDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [transactionId, token]); // Fetch only when ID or token changes initially

//   // --- Helper Functions & Derived Data ---
//   const isPayment = useMemo(
//     () => transactionDetails?.type === "payment",
//     [transactionDetails]
//   );
//   const isTransfer = useMemo(
//     () => transactionDetails?.type === "transfer",
//     [transactionDetails]
//   );

//   const formatDisplayDate = useCallback(
//     (dateString: string | undefined): string => {
//       if (!dateString) return "Date not available";
//       try {
//         const parsedDate = parseISO(dateString);
//         if (isNaN(parsedDate.getTime())) {
//           throw new Error("Invalid date value after parsing");
//         }
//         return format(parsedDate, "MMM d 'at' h:mm a");
//       } catch (e) {
//         console.error("Date formatting error:", e, "Input:", dateString);
//         return "Invalid Date";
//       }
//     },
//     []
//   );

//   const timelineSteps = useMemo((): TimelineStep[] => {
//       if (!transactionDetails) return [];

//       const { createdAt, updatedAt, status, failureReason, type } =
//         transactionDetails;

//       const createdDate = formatDisplayDate(createdAt);
//       const finalDate = formatDisplayDate(updatedAt); // Usually updatedAt reflects the last status change

//       if (type === "payment") {
//         const payment = transactionDetails as PaymentDetails;
//         const isPending = status === "pending";
//         const isInProgress = status === "in progress";
//         const isComplete = status === "completed";
//         const isCancelled = status === "canceled";
//         const hasFailed = status === "failed";

//         let steps: TimelineStep[] = [
//           {
//             id: "setup",
//             label: "You set up this payment",
//             status: "completed",
//             date: createdDate,
//             info: null,
//           },
//           {
//             id: "waiting",
//             label: `Your money's on its way to us`,
//             status: "pending",
//             date: undefined,
//             info: `your bank might take up to 4 hours to get it to us. we'll let you know when it arrives.`,
//             showCancelAction: false, // Controlled below
//           },
//           {
//             id: "receive",
//             label: `We receive your ${payment.payInCurrency?.code || "money"}`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "add_balance",
//             label: `We add it to your ${
//               payment.balanceCurrency?.code || ""
//             } balance`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "done",
//             label: "All done!",
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//         ];

//         if (isPending) {
//           steps[1].status = "active";
//           // Show cancel action *only* if truly pending and not awaiting verification view
//           steps[1].showCancelAction = !showAwaitingVerificationView;
//         } else if (isInProgress) {
//           steps[1].status = "completed";
//           steps[1].date = finalDate; // Or a specific 'funds received' date if available
//           steps[1].info = null;
//           steps[2].status = "active";
//           steps[2].date = finalDate; // Or a specific 'processing started' date
//           steps[2].info = `We're processing your payment of ${
//             payment.amountToPay?.toFixed(2) ?? "N/A"
//           } ${payment.payInCurrency?.code ?? ""}.`;
//           // Typically cannot cancel once 'in progress' starts on payment side
//           steps[1].showCancelAction = false; // Ensure it's off
//         } else if (isComplete) {
//           steps = steps.map((step, index) => ({
//             ...step,
//             status: "completed",
//             date: index === 0 ? createdDate : finalDate,
//             info: null,
//             showCancelAction: false,
//           }));
//         } else if (isCancelled || hasFailed) {
//           const finalStatus: TimelineStatus = isCancelled
//             ? "cancelled"
//             : "failed";
//           const finalInfo = isCancelled
//             ? "This payment was cancelled."
//             : `This payment failed. ${failureReason || "Unknown reason"}`;
//           const failedStepIndex = steps.findIndex(
//             (step, index) => index > 0 && step.status !== "completed"
//           );

//           if (failedStepIndex >= 1) { // Make sure it's not the 'setup' step
//               // Mark previous steps as completed (if applicable)
//               for (let i = 1; i < failedStepIndex; i++) {
//                   steps[i].status = "completed";
//                   steps[i].date = finalDate; // Use final date as approximation
//                   steps[i].info = null;
//               }
//               // Mark the step where it failed/was cancelled
//               steps[failedStepIndex].status = finalStatus;
//               steps[failedStepIndex].date = finalDate;
//               steps[failedStepIndex].info = finalInfo;
//               // Reset subsequent steps
//               for (let i = failedStepIndex + 1; i < steps.length; i++) {
//                   steps[i].status = "pending"; // Or perhaps 'not_reached'? Pending works visually.
//                   steps[i].date = undefined;
//                   steps[i].info = null;
//               }
//           } else {
//               // If it failed/cancelled immediately after setup (unlikely for payments but handle)
//               steps[1].status = finalStatus;
//               steps[1].date = finalDate;
//               steps[1].info = finalInfo;
//               for (let i = 2; i < steps.length; i++) {
//                   steps[i].status = "pending";
//                   steps[i].date = undefined;
//                   steps[i].info = null;
//               }
//           }
//           steps = steps.map((step) => ({ ...step, showCancelAction: false }));
//         }
//         return steps;
//       } else if (type === "transfer") {
//         const transfer = transactionDetails as TransferDetails;
//         const updatedDate = formatDisplayDate(updatedAt); // Last status update time
//         const isPending = status === "pending";
//         const isProcessing = status === "processing";
//         const isComplete = status === "completed";
//         const isCancelled = status === "canceled";
//         const hasFailed = status === "failed";

//         const finalStepStatus: TimelineStatus = isCancelled
//           ? "cancelled"
//           : hasFailed
//           ? "failed"
//           : "pending"; // Default for steps not reached

//         let steps: TimelineStep[] = [
//           {
//             id: "setup",
//             label: "You set up your transfer",
//             status: "completed",
//             date: createdDate,
//             info: null,
//           },
//           {
//             id: "funded",
//             label: `We've taken funds from your ${
//               transfer.sendCurrency?.code || "account"
//             }`,
//             status: "pending",
//             date: undefined,
//             info: null,
//             // Don't show cancel action here for transfers by default
//             showCancelAction: false,
//           },
//           {
//             id: "paid_out",
//             label: `Your money's being processed`,
//             status: "pending",
//             date: undefined,
//             info: null,
//           },
//           {
//             id: "delivered",
//             label: `Sent to recipient's bank`,
//             status: "pending",
//             date: undefined,
//             info: null, // Estimated delivery might go here if available
//           },
//         ];

//         if (isPending) {
//            // If pending, often means funds haven't been taken yet or just initiated
//            steps[1].status = 'active'; // Indicate this is the current focus
//            // Explicitly no date yet for 'funded'
//         } else if (isProcessing) {
//           steps[1].status = "completed";
//           steps[1].date = updatedDate; // Assume funded when processing starts
//           steps[2].status = "active";
//           steps[2].date = updatedDate;
//           steps[2].info = `We're processing the payment to your recipient's bank.`;
//         } else if (isComplete) {
//           steps = steps.map((step, index) => ({
//             ...step,
//             status: "completed",
//             date: index === 0 ? createdDate : updatedDate,
//             info: null,
//           }));
//         } else if (isCancelled || hasFailed) {
//           const finalInfo = isCancelled
//             ? "Transfer cancelled."
//             : `Failed to pay out: ${failureReason || "Unknown reason"}`;
//           // Determine where it failed
//           if(isPending) { // Cancelled/failed while pending
//             steps[1].status = finalStepStatus;
//             steps[1].date = updatedDate;
//             steps[1].info = finalInfo;
//           } else { // Cancelled/failed during/after processing attempt
//             steps[1].status = "completed";
//             steps[1].date = updatedDate;
//             steps[2].status = finalStepStatus; // Failed at processing/payout stage
//             steps[2].date = updatedDate;
//             steps[2].info = finalInfo;
//             steps[3].status = "pending"; // Not reached
//           }
//         }
//         // Ensure no cancel action shown in timeline for transfers regardless of state
//         steps = steps.map((step) => ({ ...step, showCancelAction: false }));
//         return steps;
//       }
//       return [];
//     },
//     [transactionDetails, formatDisplayDate, showAwaitingVerificationView] // Added showAwaitingVerificationView dependency
//   );

//   const canCancelTransaction = useMemo(() => {
//     if (!transactionDetails) return false;

//     if (isPayment) {
//       const paymentStatus = (transactionDetails as PaymentDetails).status;
//       // Allow cancellation only if truly pending AND not in the 'awaiting verification' UI state
//       return paymentStatus === "pending" && !showAwaitingVerificationView;
//     }
//     if (isTransfer) {
//       const transferStatus = (transactionDetails as TransferDetails).status;
//       // *** FIX: Only allow cancelling transfers if they are strictly 'pending' ***
//       // Once 'processing' starts, money is likely moving and cancellation is complex/impossible.
//       return transferStatus === "pending";
//     }
//     return false;
//   }, [transactionDetails, isPayment, isTransfer, showAwaitingVerificationView]); // Added showAwaitingVerificationView dependency

//   // --- Event Handlers ---
//   const handleConfirmPaymentSubmit = useCallback(async () => {
//     if (
//       !transactionId ||
//       !token ||
//       !isPayment ||
//       transactionDetails?.status !== "pending" ||
//       showAwaitingVerificationView // Prevent double submission
//     )
//       return;
//     setIsSubmitting(true);
//     setSubmissionError(null);
//     try {
//       await paymentService.confirmUserTransfer(transactionId, token);
//       // Set the state to show the awaiting view immediately
//       setShowAwaitingVerificationView(true);
//       // Optionally, trigger a refresh after a delay or rely on user refreshing
//       // setTimeout(() => fetchTransactionDetails(false), 5000); // Example: refresh after 5s
//     } catch (err: unknown) {
//       let message = `Failed to confirm payment`;
//       let status = 0;
//       if (typeof err === "object" && err !== null) {
//         const errObj = err as {
//           response?: { status?: number; data?: { message?: string } };
//           message?: string;
//         };
//         message = errObj.response?.data?.message || errObj.message || message;
//         status = errObj.response?.status || 0;
//       } else if (err instanceof Error) {
//         message = err.message;
//       }

//       // If error indicates state changed (e.g., already processed/cancelled)
//       if (message.includes("not in pending state") || status === 400 || status === 409) {
//         setError("Payment status may have changed. Refreshing...");
//         await fetchTransactionDetails(false); // Refresh immediately
//         setShowAwaitingVerificationView(false); // Reset awaiting view as status changed
//       } else {
//         setSubmissionError(message);
//       }
//       console.error(`Error confirming payment (ID: ${transactionId}):`, err);
//     } finally {
//       setIsSubmitting(false); // Stop loading indicator for the confirm button
//     }
//   }, [
//     transactionId,
//     token,
//     isPayment,
//     transactionDetails?.status,
//     fetchTransactionDetails,
//     showAwaitingVerificationView,
//   ]);

//   const handleConfirmCancel = useCallback(async () => {
//     if (!transactionId || !token || !transactionDetails) {
//       setSubmissionError("Cannot proceed: Missing required information.");
//       return;
//     }
//     // Re-check cancellability right before executing
//     if (!canCancelTransaction) {
//       setSubmissionError(
//         "This transaction can no longer be cancelled. Refreshing..."
//       );
//       await fetchTransactionDetails(false); // Refresh data
//       setIsCancelModalOpen(false); // Close modal
//       return;
//     }

//     setIsSubmitting(true); // Indicate loading state (applies to modal buttons)
//     setSubmissionError(null);
//     try {
//       let cancelPromise;
//       if (isPayment) {
//         cancelPromise = paymentService.cancelPayment(transactionId, token);
//       } else if (isTransfer) {
//         cancelPromise = transferService.cancelTransfer(transactionId, token);
//       } else {
//         throw new Error("Cannot cancel: Unknown transaction type.");
//       }
//       await cancelPromise;
//       setIsCancelModalOpen(false);
//       await fetchTransactionDetails(false); // Refresh data after successful cancellation
//     } catch (err: unknown) {
//       let message = `Failed to cancel ${isPayment ? "payment" : "transfer"}`;
//       if (typeof err === "object" && err !== null) {
//         const errObj = err as {
//           response?: { data?: { message?: string } };
//           message?: string;
//         };
//         message = errObj.response?.data?.message || errObj.message || message;
//       } else if (err instanceof Error) {
//         message = err.message;
//       }
//       // Set error message to be potentially displayed in the modal or main page
//       setSubmissionError(message);
//       console.error(
//         `Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`,
//         err
//       );
//       // Keep modal open on error so user sees the message, maybe add error display in modal?
//       // setIsCancelModalOpen(false); // Or close it anyway? User decision. Closing for now.
//        setIsCancelModalOpen(false);
//        // Optionally refresh even on error, as status might have changed anyway
//        await fetchTransactionDetails(false);

//     } finally {
//       setIsSubmitting(false); // Stop loading state
//     }
//   }, [
//     transactionId,
//     token,
//     transactionDetails,
//     isPayment,
//     isTransfer,
//     canCancelTransaction, // Use the memoized value
//     fetchTransactionDetails,
//   ]);

//   const handleNoteChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       setNoteText(e.target.value);
//       // Debounce API call here if saving note automatically
//     },
//     []
//   );

//   // --- Header Status Logic ---
//   const { headerStatusText, headerStatusColorClass } = useMemo(() => {
//     if (!transactionDetails)
//       return {
//         headerStatusText: "Loading...",
//         headerStatusColorClass: "text-gray-500 dark:text-gray-400",
//       };

//     // Prioritize Awaiting Verification view status if active
//     if (
//       isPayment &&
//       transactionDetails.status === "pending" &&
//       showAwaitingVerificationView
//     ) {
//       return {
//         headerStatusText: "Verifying Payment",
//         headerStatusColorClass: "text-blue-600 dark:text-blue-400 animate-pulse",
//       };
//     }

//     // Regular status display
//     switch (transactionDetails.status) {
//       case "pending":
//         return {
//           headerStatusText: isPayment
//             ? "Waiting for you to pay"
//             : "Transfer Pending", // Changed for clarity
//           headerStatusColorClass: "text-orange-600 dark:text-orange-400",
//         };
//       case "in progress": // Specific to Payment
//         return {
//           headerStatusText: "Processing Payment",
//           headerStatusColorClass: "text-blue-600 dark:text-blue-400",
//         };
//       case "processing": // Specific to Transfer
//         return {
//           headerStatusText: "Transfer Processing",
//           headerStatusColorClass: "text-blue-600 dark:text-blue-400",
//         };
//       case "completed":
//         return {
//           headerStatusText: isPayment ? "Money Added" : "Transfer Completed",
//           headerStatusColorClass: "text-green-600 dark:text-green-400",
//         };
//       case "canceled":
//         return {
//           headerStatusText: "Transaction Cancelled",
//           headerStatusColorClass: "text-red-600 dark:text-red-400",
//         };
//       case "failed":
//         return {
//           headerStatusText: "Transaction Failed",
//           headerStatusColorClass: "text-red-600 dark:text-red-400",
//         };
//       default:
//         return {
//           headerStatusText: `Status: ${transactionDetails.status}`,
//           headerStatusColorClass: "text-gray-500 dark:text-gray-400",
//         };
//     }
//   }, [transactionDetails, isPayment, showAwaitingVerificationView]);

//   // --- Render Logic ---

//   // Loading State (Initial Load)
//   if (isLoading && !transactionDetails) {
//     return <TransactionDetailsPageSkeleton />;
//   }

//   // Error State (Failed to load initial data)
//   if (error && !transactionDetails) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-md shadow-sm max-w-md mx-auto">
//           <p className="font-medium">Error Loading Transaction</p>
//           <p className="text-sm mt-1">{error}</p>
//         </div>
//         <Button
//           onClick={() => router.back()}
//           variant="outline"
//           className="mt-6"
//         >
//           Go Back
//         </Button>
//         <Button
//           onClick={() => fetchTransactionDetails()}
//           variant="secondary"
//           className="mt-6 ml-2"
//           disabled={isLoading} // Prevent multiple clicks while retrying
//         >
//           {isLoading ? 'Retrying...' : 'Try Again'}
//         </Button>
//       </div>
//     );
//   }

//   // Not Found State
//   if (!transactionDetails) {
//     // This case handles when fetch completed but didn't find the transaction (error state might have been cleared)
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
//         <p className="text-lg">Transaction details not found.</p>
//         <p className="text-sm mt-1">
//           The transaction ID might be incorrect, or it may no longer exist.
//         </p>
//         <Button
//           onClick={() => router.push("/dashboard/transactions")}
//           variant="outline"
//           className="mt-6"
//         >
//           View All Transactions
//         </Button>
//       </div>
//     );
//   }

//   // --- Main Component Return ---
//   return (
//     <section className="Transaction-Detial-Page-Wrapper py-5">
//       <div className="Transaction-Detial">
//         {/* Main Content Card */}
//         <div className="bg-white dark:bg-background rounded-2xl border mx-auto lg:max-w-5xl">
//           {/* Card Header */}
//           <TransactionHeader
//             transaction={transactionDetails}
//             statusText={headerStatusText}
//             statusColorClass={headerStatusColorClass}
//           />
//           {/* Tabs Navigation */}
//           <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />
//           {/* Tab Content Area */}
//           <div className="p-4 sm:p-6">
//             {/* --- Updates Tab Content --- */}
//             {activeTab === "Updates" && (
//               <div>
//                 {/* Transaction ID / Reference Code */}
//                 <div className="flex items-center mb-6 text-sm gap-2">
//                   <span className="text-gray-500 dark:text-gray-300 flex-shrink-0">
//                     {isPayment ? "Reference Code :" : "Transfer ID :"}
//                   </span>
//                   <span className="font-medium text-neutral-900 dark:text-white break-all">
//                     {isPayment
//                       ? (transactionDetails as PaymentDetails).referenceCode ||
//                         "N/A"
//                       : transactionDetails._id}
//                   </span>
//                 </div>

//                 {/* Conditional Rendering: Awaiting Verification vs. Standard */}
//                 {isPayment &&
//                 transactionDetails.status === "pending" &&
//                 showAwaitingVerificationView ? (
//                   <AwaitingVerificationView
//                     transaction={transactionDetails as PaymentDetails}
//                     onRefresh={() => fetchTransactionDetails(false)}
//                     isSubmitting={isLoading} // Use main isLoading for refresh button
//                   />
//                 ) : (
//                   <>
//                     {/* Timeline */}
//                     <TransactionTimeline
//                       steps={timelineSteps}
//                       isPayment={isPayment}
//                       status={transactionDetails.status}
//                       isSubmitting={isSubmitting && isCancelModalOpen} // Show timeline spinner only during cancel action
//                       onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                       // Pass canCancelTransaction explicitly if timeline needs it
//                     />

//                     {/* Actions Area */}
//                     <TransactionUpdateActions
//                       transaction={transactionDetails}
//                       canCancel={canCancelTransaction} // Use the refined logic here
//                       isSubmitting={isSubmitting} // General submission state
//                       showAwaitingVerificationView={
//                         showAwaitingVerificationView
//                       }
//                       submissionError={submissionError}
//                       onConfirmPayment={handleConfirmPaymentSubmit}
//                       onOpenCancelModal={() => setIsCancelModalOpen(true)}
//                       onSwitchToDetailsTab={() => setActiveTab("Details")}
//                     />
//                   </>
//                 )}
//                  {/* Display general submission errors here if not handled by specific components */}
//                  {submissionError && !isCancelModalOpen && (
//                   <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
//                     Error: {submissionError}
//                   </p>
//                 )}
//               </div>
//             )}
//             {/* End Updates Tab */}

//             {/* --- Details Tab Content --- */}
//             {activeTab === "Details" && (
//               <TransactionDetailsContent
//                 transaction={transactionDetails}
//                 note={noteText}
//                 onNoteChange={handleNoteChange}
//                 formatDisplayDate={formatDisplayDate}
//                 // Add props for saving note if needed
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- Cancellation Modal --- */}
//       {transactionDetails && (
//         <CancelTransferModal
//           isOpen={isCancelModalOpen}
//           onClose={() => {
//               if (!isSubmitting) { // Prevent closing while submitting
//                   setIsCancelModalOpen(false);
//                   setSubmissionError(null); // Clear error when closing manually
//               }
//           }}
//           transactionId={transactionId}
//           transactionType={transactionDetails.type}
//           onConfirmCancel={handleConfirmCancel}
//           isSubmitting={isSubmitting} // Pass submitting state to modal
//           // Pass submissionError to display inside the modal if desired
//           // error={submissionError}
//         />
//       )}
//     </section>
//   );
// };

// export default TransactionDetailsPage;

// // frontend/app/dashboard/transactions/[transactionId]/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { format, parseISO } from "date-fns";
// import axios from 'axios'; // Import axios for error checking

// // Custom Hooks & Services
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
// import paymentService from "../../../services/payment"; // Adjust path
// import transferService from "../../../services/transfer"; // Adjust path

// // UI Components & Utils
// import { cn } from "@/lib/utils"; // Adjust path
// import { Button } from "@/components/ui/button"; // Adjust path
// import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path

// // Transaction Specific Components & Types
// import {
//   TransactionDetailsPageParams,
//   PaymentDetails,
//   TransferDetails,
//   TransactionDetails,
//   TimelineStatus,
//   TimelineStep,
// } from "../../../../types/transaction"; // Adjust path
// import TransactionHeader from "../../components/transactionDetails/TransactionHeader"; // Adjust path
// import TransactionTabs from "../../components/transactionDetails/TransactionTabs"; // Adjust path
// import TransactionTimeline from "../../components/transactionDetails/TransactionTimeline"; // Adjust path
// import TransactionDetailsContent from "../../components/transactionDetails/TransactionDetailsContent"; // Adjust path
// import AwaitingVerificationView from "../../components/transactionDetails/AwaitingVerificationView"; // Adjust path
// import TransactionUpdateActions from "../../components/transactionDetails/TransactionUpdateActions"; // Adjust path
// import TransactionDetailsPageSkeleton from "../../components/TransactionPageSection/TransactionDetailsPageSkeleton"; // Adjust path

// // --- Component Definition ---
// const TransactionDetailsPage = () => {
//   // --- Hooks ---
//   const params = useParams<TransactionDetailsPageParams>();
//   const router = useRouter();
//   const { transactionId } = params;
//   const { token } = useAuth();

//   // --- State Variables ---
//   const [transactionDetails, setTransactionDetails] =
//     useState<TransactionDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null); // General loading error
//   const [submissionError, setSubmissionError] = useState<string | null>(null); // Specific action error (e.g., cancellation failed)
//   const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
//   const [noteText, setNoteText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for actions like confirm/cancel
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [showAwaitingVerificationView, setShowAwaitingVerificationView] =
//     useState(false); // Special UI state for pending payments after user confirmation

//   // --- Data Fetching ---
//   const fetchTransactionDetails = useCallback(
//     async (showLoadingSpinner = true) => {
//          if (!transactionId || !token) {
//              setError("Missing transaction ID or authentication token.");
//              setIsLoading(false);
//              return;
//          }
//          if (showLoadingSpinner) setIsLoading(true);
//          setError(null);
//          setSubmissionError(null); // Clear submission errors on refresh too
//          console.log("Fetching details for:", transactionId);

//          try {
//              let found = false;
//              // Try Transfer
//              try {
//                  const transferData = (await transferService.getTransferDetails(
//                      transactionId,
//                      token
//                  )) as Omit<TransferDetails, "type">;
//                  const fullTransferData: TransferDetails = { ...transferData, type: "transfer" };
//                  setTransactionDetails(fullTransferData);
//                  setNoteText(fullTransferData.note || "");
//                  setShowAwaitingVerificationView(false);
//                  found = true;
//                  console.log("Found as Transfer. Status:", fullTransferData.status);
//              } catch (transferErr: unknown) {
//                  let message = "Unknown error fetching transfer";
//                  let status = 0;
//                  if (axios.isAxiosError(transferErr) && transferErr.response) {
//                      message = transferErr.response.data?.message || message;
//                      status = transferErr.response.status;
//                  } else if (transferErr instanceof Error) { message = transferErr.message; }
//                  const isNotFoundError = status === 404 || message?.toLowerCase().includes("not found");
//                  if (isNotFoundError) { console.warn(`Transfer ${transactionId} not found (status ${status}). Trying Payment.`); }
//                  else if (status !== 0) { console.error(`Error fetching transfer ${transactionId} (status ${status}):`, message); throw transferErr; }
//                  else { console.error("Non-API error fetching transfer details (allowing fallback):", transferErr); }
//              }
//              // Try Payment if not found as Transfer
//              if (!found) {
//                  try {
//                      const paymentData = (await paymentService.getPaymentDetails(
//                          transactionId,
//                          token
//                      )) as unknown as Omit<PaymentDetails, "type">;
//                      const fullPaymentData: PaymentDetails = { ...paymentData, type: "payment" };
//                      setTransactionDetails(fullPaymentData);
//                      setNoteText(fullPaymentData.note || "");
//                      if (fullPaymentData.status !== "pending") { setShowAwaitingVerificationView(false); }
//                      found = true;
//                      console.log("Found as Payment. Status:", fullPaymentData.status);
//                  } catch (paymentErr: unknown) {
//                      let message = "Unknown error fetching payment";
//                      let status = 0;
//                      if (axios.isAxiosError(paymentErr) && paymentErr.response) {
//                          message = paymentErr.response.data?.message || message;
//                          status = paymentErr.response.status;
//                      } else if (paymentErr instanceof Error) { message = paymentErr.message; }
//                      if (status === 404 || message?.toLowerCase().includes("not found")) {
//                          setError(`Transaction with ID ${transactionId} not found.`);
//                          setTransactionDetails(null);
//                      } else { console.error(`Error fetching payment ${transactionId} (status ${status}):`, message); throw paymentErr; }
//                  }
//              }
//              if (!found && !error) { setError(`Transaction ${transactionId} could not be found or accessed.`); setTransactionDetails(null); }
//          } catch (err: unknown) {
//              let message = "Failed to load transaction details";
//              if (axios.isAxiosError(err) && err.response) { message = err.response.data?.message || err.message || message; }
//              else if (err instanceof Error) { message = err.message; }
//              setError(message); setTransactionDetails(null); console.error("Unhandled error during transaction fetch:", err);
//          } finally {
//              if (showLoadingSpinner) setIsLoading(false);
//          }
//     },
//     [transactionId, token] // Dependencies: refetch if ID or token changes
//   );

//   // --- Effect: Initial Data Load ---
//   useEffect(() => {
//     fetchTransactionDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [transactionId, token]); // Run only when transactionId or token changes

//   // --- Memoized Derived Data ---
//   const isPayment = useMemo(
//     () => transactionDetails?.type === "payment",
//     [transactionDetails]
//   );
//   const isTransfer = useMemo(
//     () => transactionDetails?.type === "transfer",
//     [transactionDetails]
//   );

//   // Memoized check if the transaction can currently be cancelled by the user
//   const canCancelTransaction = useMemo(() => {
//     if (!transactionDetails) return false;
//     const { type, status } = transactionDetails;
//     if (type === "payment") {
//       // Payments can be cancelled ONLY if PENDING and user has NOT yet clicked "I've Paid"
//       return status === "pending" && !showAwaitingVerificationView;
//     } else if (type === "transfer") {
//       // Transfers can be cancelled ONLY if status is strictly 'pending'
//       return status === "pending";
//     }
//     return false; // Default: cannot cancel unknown types
//   }, [transactionDetails, showAwaitingVerificationView]); // Dependencies: recalculate if details or awaiting view changes

//   // --- Helper Functions ---
//   const formatDisplayDate = useCallback(
//     (dateString: string | undefined): string => {
//         if (!dateString) return "Date not available";
//         try {
//             const parsedDate = parseISO(dateString);
//             if (isNaN(parsedDate.getTime())) throw new Error("Invalid date value");
//             // Example format: "Apr 30 at 2:22 PM"
//             return format(parsedDate, "MMM d 'at' h:mm a");
//         } catch (e) {
//             console.error("Date formatting error:", e, "Input:", dateString);
//             return "Invalid Date";
//         }
//     },
//     [] // No dependencies, format function is stable
//   );

//   // Memoized timeline steps based on transaction details
//   const timelineSteps = useMemo((): TimelineStep[] => {
//         // Return empty array if no details are loaded
//         if (!transactionDetails) return [];

//         const { createdAt, updatedAt, status, failureReason, type } = transactionDetails;
//         const createdDate = formatDisplayDate(createdAt);
//         // Use updatedAt for most recent steps, specific timestamps if available later
//         const finalDate = formatDisplayDate(updatedAt);

//         // --- Payment Timeline Logic ---
//         if (type === "payment") {
//             const payment = transactionDetails as PaymentDetails;
//             const isPending = status === "pending";
//             const isInProgress = status === "in progress";
//             const isComplete = status === "completed";
//             const isCancelled = status === "canceled";
//             const hasFailed = status === "failed";

//             // Define base steps for a payment
//             let steps: TimelineStep[] = [
//                  { id: "setup", label: "You set up this payment", status: "completed", date: createdDate },
//                  { id: "waiting", label: "Your money's on its way to us", status: "pending", date: undefined, info: `your bank might take up to 4 hours to get it to us. we'll let you know when it arrives.`, showCancelAction: false /* Determined below */ },
//                  { id: "receive", label: `We receive your ${payment.payInCurrency?.code || "money"}`, status: "pending", date: undefined },
//                  { id: "add_balance", label: `We add it to your ${payment.balanceCurrency?.code || ""} balance`, status: "pending", date: undefined },
//                  { id: "done", label: "All done!", status: "pending", date: undefined },
//             ];

//             // Adjust steps based on current status
//             if (isPending) {
//                  steps[1].status = "active"; // 'Waiting' is the active step
//                  // Show cancel action only if truly pending AND not awaiting verification
//                  steps[1].showCancelAction = !showAwaitingVerificationView;
//             } else if (isInProgress) {
//                  steps[1] = { ...steps[1], status: "completed", date: finalDate, info: null, showCancelAction: false }; // Mark waiting as done
//                  steps[2] = { ...steps[2], status: "active", date: finalDate, info: `We're checking your payment of ${payment.amountToPay?.toFixed(2) ?? "N/A"} ${payment.payInCurrency?.code ?? ""}.` }; // Receive is active
//             } else if (isComplete) {
//                  // All steps completed
//                  steps = steps.map((step, index) => ({
//                      ...step,
//                      status: "completed",
//                      date: index === 0 ? createdDate : finalDate, // Use final date for all but setup
//                      info: null,
//                      showCancelAction: false,
//                  }));
//             } else if (isCancelled || hasFailed) {
//                  const finalStatus: TimelineStatus = isCancelled ? "cancelled" : "failed";
//                  const finalInfo = isCancelled
//                      ? "This payment was cancelled."
//                      : `This payment failed. ${failureReason || "Check details tab or contact support."}`;

//                  // Find the first non-completed step after setup to mark as failed/cancelled
//                  let failedStepIndex = steps.findIndex((step, index) => index > 0 && step.status !== "completed");
//                  if (failedStepIndex === -1) failedStepIndex = steps.length -1; // If all seem complete, mark last step

//                  // Mark steps before failure/cancellation as completed (if applicable)
//                  for (let i = 1; i < failedStepIndex; i++) {
//                       if(steps[i].status !== 'completed') { // Only update if not already marked complete
//                         steps[i] = {...steps[i], status: "completed", date: finalDate, info: null};
//                       }
//                  }
//                  // Mark the step where it failed/was cancelled
//                  if (failedStepIndex >= 1) {
//                    steps[failedStepIndex] = {...steps[failedStepIndex], status: finalStatus, date: finalDate, info: finalInfo };
//                  }
//                  // Reset subsequent steps to pending (or hide them)
//                  for (let i = failedStepIndex + 1; i < steps.length; i++) {
//                      steps[i] = {...steps[i], status: "pending", date: undefined, info: null};
//                  }
//                  // Ensure no cancel action shown on final states
//                  steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             }
//             return steps;

//         // --- Transfer Timeline Logic ---
//         } else if (type === "transfer") {
//             const transfer = transactionDetails as TransferDetails;
//             const isPending = status === "pending";
//             const isProcessing = status === "processing";
//             const isComplete = status === "completed";
//             const isCancelled = status === "canceled";
//             const hasFailed = status === "failed";

//             // Define base steps for a transfer
//             let steps: TimelineStep[] = [
//                 { id: "setup", label: "You set up your transfer", status: "completed", date: createdDate },
//                 { id: "funded", label: `We've taken funds from your ${transfer.sendCurrency?.code || "account"}`, status: "pending", date: undefined },
//                 { id: "processing", label: `Your money's being processed`, status: "pending", date: undefined },
//                 { id: "delivered", label: `Your money's been sent out to ${transfer.recipient?.accountHolderName || 'recipient'}'s bank`, status: "pending", date: undefined, info: `The recipient’s bank should receive the funds shortly. However, please note that some banks may take up to 2 hours to process the transaction.` }, // Add estimate if available
//                 { id: "received", label: `${transfer.recipient?.accountHolderName || 'Recipient'} received your ${transfer.receiveCurrency?.code || 'money'}`, status: "pending", date: undefined },
//             ];

//             // Adjust steps based on current status
//             if (isPending) {
//                 steps[1].status = "active"; // 'Funded' step is typically next after setup
//             } else if (isProcessing) {
//                 steps[1] = { ...steps[1], status: "completed", date: finalDate }; // Funded done
//                 steps[2] = { ...steps[2], status: "active", date: finalDate, info: "We're converting and sending the funds." }; // Processing active
//             } else if (isComplete) {
//                 // All steps completed
//                 steps = steps.map((step, index) => ({
//                     ...step,
//                     status: "completed",
//                     date: index === 0 ? createdDate : finalDate,
//                     info: index === 3 ? `Sent on ${finalDate}` : index === 4 ? `Received around ${finalDate}` : null, // Example info update
//                 }));
//             } else if (isCancelled || hasFailed) {
//                 const finalStatus: TimelineStatus = isCancelled ? "cancelled" : "failed";
//                 const finalInfo = isCancelled
//                     ? "Transfer cancelled."
//                     : `Transfer failed: ${failureReason || "Check details or contact support."}`;

//                  // Determine failure point (simplified: assume failure during processing if not pending)
//                 if (isPending) { // Failed/cancelled while pending (before funds taken?) - Defensively handle although backend should prevent cancellation
//                     steps[1] = {...steps[1], status: finalStatus, date: finalDate, info: finalInfo };
//                     // Mark subsequent steps as pending/not reached
//                      for (let i = 2; i < steps.length; i++) steps[i] = {...steps[i], status: "pending", date: undefined, info: null};
//                 } else { // Failed/cancelled during processing or later
//                      steps[1] = {...steps[1], status: "completed", date: finalDate }; // Assume funded
//                      // Find first step after 'funded' that wasn't completed
//                      let failedStepIndex = steps.findIndex((step, index) => index > 1 && step.status !== "completed");
//                      if (failedStepIndex === -1) failedStepIndex = 2; // Default to processing if others seem complete

//                      steps[failedStepIndex] = {...steps[failedStepIndex], status: finalStatus, date: finalDate, info: finalInfo };
//                      // Mark subsequent steps as pending/not reached
//                      for (let i = failedStepIndex + 1; i < steps.length; i++) steps[i] = {...steps[i], status: "pending", date: undefined, info: null};
//                 }
//             }
//             // Ensure no cancel action is shown in timeline for transfers
//             steps = steps.map(step => ({ ...step, showCancelAction: false }));
//             return steps;
//         }

//         return []; // Return empty array for unknown types
//   }, [transactionDetails, formatDisplayDate, showAwaitingVerificationView]); // Dependencies for timeline calculation

//   // --- Event Handlers ---

//   // Handler for when user clicks "Yes, I've Paid" for a pending payment
//   const handleConfirmPaymentSubmit = useCallback(async () => {
//     if (!transactionId || !token || !isPayment || transactionDetails?.status !== "pending" || showAwaitingVerificationView) {
//       console.warn("Confirm payment aborted. Conditions not met:", { transactionId, token, isPayment, status: transactionDetails?.status, showAwaitingVerificationView });
//       return;
//     }
//     setIsSubmitting(true);
//     setSubmissionError(null);
//     try {
//       console.log(`Confirming payment transfer for ID: ${transactionId}`);
//       await paymentService.confirmUserTransfer(transactionId, token);
//       // Immediately switch UI to awaiting verification state
//       setShowAwaitingVerificationView(true);
//       console.log(`Payment ${transactionId} confirmed by user. Showing awaiting view.`);
//       // No automatic refresh needed here, status update comes from admin/backend process
//     } catch (err: unknown) {
//       let message = `Failed to confirm payment`;
//       let status = 0;
//        if (axios.isAxiosError(err) && err.response) {
//           message = err.response.data?.message || message;
//           status = err.response.status;
//        } else if (err instanceof Error) {
//           message = err.message;
//        }

//       console.error(`Error confirming payment (ID: ${transactionId}, Status: ${status}):`, message);
//       // If error suggests state changed (e.g., already processed/cancelled by admin)
//       if (message.includes("not in pending state") || status === 400 || status === 409) {
//         setSubmissionError("Payment status may have changed. Refreshing...");
//         await fetchTransactionDetails(false); // Refresh immediately without spinner
//         setShowAwaitingVerificationView(false); // Reset awaiting view as status is no longer pending
//       } else {
//         // Show other errors (e.g., network issue, server error)
//         setSubmissionError(message);
//       }
//     } finally {
//       setIsSubmitting(false); // Stop loading indicator for the confirm button
//     }
//   }, [
//     transactionId,
//     token,
//     isPayment,
//     transactionDetails?.status,
//     fetchTransactionDetails,
//     showAwaitingVerificationView,
//   ]); // Dependencies for payment confirmation

//   // Handler for confirming cancellation in the modal
//   const handleConfirmCancel = useCallback(async () => {
//     if (!transactionId || !token || !transactionDetails) {
//       setSubmissionError("Cannot proceed: Missing required information.");
//       return;
//     }
//     // Re-check cancellability using the memoized value right before executing
//     if (!canCancelTransaction) {
//       setSubmissionError("This transaction can no longer be cancelled. Refreshing status...");
//       await fetchTransactionDetails(false); // Refresh data to show current status
//       setIsCancelModalOpen(false); // Close modal
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionError(null); // Clear previous errors specifically for submission
//     try {
//       console.log(`Attempting to cancel ${transactionDetails.type} ID: ${transactionId}`);
//       let cancelPromise;
//       if (isPayment) {
//         cancelPromise = paymentService.cancelPayment(transactionId, token);
//       } else if (isTransfer) {
//         // Call the service which now throws specific errors
//         cancelPromise = transferService.cancelTransfer(transactionId, token);
//       } else {
//         throw new Error("Cannot cancel: Unknown transaction type.");
//       }
//       await cancelPromise;
//       console.log(`${transactionDetails.type} ${transactionId} cancelled successfully.`);
//       setIsCancelModalOpen(false);
//       await fetchTransactionDetails(false); // Refresh data to show 'canceled' status
//     } catch (err: unknown) {
//       // Catch errors, including specific ones thrown by the service
//       let message = `Failed to cancel ${isPayment ? "payment" : "transfer"}`;
//       if (err instanceof Error) {
//         message = err.message; // This should contain the specific backend message
//       }
//       console.error(`Error cancelling ${transactionDetails.type} (ID: ${transactionId}):`, message);
//       // Set the specific error message to be displayed to the user
//       setSubmissionError(message);
//       setIsCancelModalOpen(false); // Close modal even on error
//       // Optional: Refresh data on error to ensure UI consistency
//       // await fetchTransactionDetails(false);
//     } finally {
//       setIsSubmitting(false); // Stop loading state for modal buttons
//     }
//   }, [
//     transactionId,
//     token,
//     transactionDetails,
//     isPayment,
//     isTransfer,
//     canCancelTransaction, // Use the memoized value
//     fetchTransactionDetails,
//   ]); // Dependencies for cancellation

//   // Handler for note text changes (if applicable)
//   const handleNoteChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       setNoteText(e.target.value);
//       // TODO: Implement debounced save if auto-save is desired
//     },
//     [] // No dependencies
//   );

//   // --- Header Status Logic ---
//   const { headerStatusText, headerStatusColorClass } = useMemo(() => {
//     if (!transactionDetails) return { headerStatusText: "Loading...", headerStatusColorClass: "text-gray-500 dark:text-gray-400" };

//     // Special state display for payments awaiting verification
//     if (isPayment && transactionDetails.status === "pending" && showAwaitingVerificationView) {
//       return { headerStatusText: "Verifying Payment", headerStatusColorClass: "text-blue-600 dark:text-blue-400 animate-pulse" };
//     }

//     // Standard status display logic
//     switch (transactionDetails.status) {
//       case "pending":
//         return { headerStatusText: isPayment ? "Waiting for payment" : "Transfer Pending", headerStatusColorClass: "text-orange-600 dark:text-orange-400" };
//       case "in progress": // Specific to Payment (backend uses this)
//         return { headerStatusText: "Processing Payment", headerStatusColorClass: "text-blue-600 dark:text-blue-400" };
//       case "processing": // Specific to Transfer (backend uses this)
//         return { headerStatusText: "Transfer Processing", headerStatusColorClass: "text-blue-600 dark:text-blue-400" };
//       case "completed":
//         return { headerStatusText: isPayment ? "Money Added" : "Transfer Completed", headerStatusColorClass: "text-green-600 dark:text-green-400" };
//       case "canceled":
//         return { headerStatusText: "Transaction Cancelled", headerStatusColorClass: "text-red-600 dark:text-red-400" };
//       case "failed":
//         return { headerStatusText: "Transaction Failed", headerStatusColorClass: "text-red-600 dark:text-red-400" };
//       default: // Fallback for any unexpected status values
//         return { headerStatusText: `Status: ${transactionDetails.status}`, headerStatusColorClass: "text-gray-500 dark:text-gray-400" };
//     }
//   }, [transactionDetails, isPayment, showAwaitingVerificationView]); // Dependencies for header display

//   // Custom SVG Loader Component
// const SvgLoader = () => (
//   <svg
//     className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

//   // --- Render Logic ---

//   // 1. Initial Loading State
//   if (isLoading && !transactionDetails) {
//     return <TransactionDetailsPageSkeleton />;
//   }

//   // 2. Error State (Failed to load initial data)
//   if (error && !transactionDetails) {
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//         <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white">Error Loading Transaction</h2>
//         <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">{error}</p>
//         <div className="flex sm:flex-row flex-col items-center justify-center gap-3 w-full">
//           <button
//             onClick={() => router.back()}
//             className="inline-flex justify-center items-center font-medium cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={() => fetchTransactionDetails()}
//             className="inline-flex justify-center items-center font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear cursor-pointer"
//             disabled={isLoading}
//           >
//             {isLoading && <SvgLoader />}
//             {isLoading ? "Retrying..." : "Try Again"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 3. Not Found State (Fetch completed, but no data and no error set previously)
//   if (!transactionDetails) {
//     return (
//       <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
//         <p className="lg:text-lg text-base text-neutral-900 dark:text-white max-w-lg mx-auto">Transaction details could not be loaded.</p>
//         <button onClick={() => router.push("/dashboard/transactions")} className="inline-flex justify-center items-center font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear cursor-pointer">
//           View All Transactions
//         </button>
//       </div>
//     );
//   }

//   // 4. Main Content Render
//   return (
//     <section className="Transaction-Detial-Page-Wrapper py-5">
//       <div className="Transaction-Detial">
//         {/* Main Content Card */}
//         <div className="bg-white dark:bg-background rounded-2xl border mx-auto lg:max-w-5xl">
//           {/* Card Header */}
//           <TransactionHeader
//             transaction={transactionDetails}
//             statusText={headerStatusText}
//             statusColorClass={headerStatusColorClass}
//           />
//           {/* Tabs Navigation */}
//           <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />

//           {/* Tab Content Area */}
//           <div className="p-4 sm:p-6">
//             {/* --- Updates Tab --- */}
//             {activeTab === "Updates" && (
//               <div>
//                 {/* Transaction ID / Reference Code */}
//                 <div className="flex items-center mb-6 text-sm gap-2">
//                   <span className="text-gray-500 dark:text-gray-300 flex-shrink-0">
//                     {isPayment ? "Reference Code:" : "Transfer ID:"}
//                   </span>
//                   <span className="font-medium text-neutral-900 dark:text-white break-all">
//                     {isPayment
//                       ? (transactionDetails as PaymentDetails).referenceCode || "N/A"
//                       : transactionDetails._id}
//                   </span>
//                 </div>

//                 {/* Conditional View: Awaiting Verification or Standard */}
//                 {isPayment && transactionDetails.status === "pending" && showAwaitingVerificationView ? (
//                   <AwaitingVerificationView
//                     transaction={transactionDetails as PaymentDetails}
//                     onRefresh={() => fetchTransactionDetails(false)} // Refresh without main spinner
//                     isSubmitting={isLoading} // Disable refresh button if main load is happening
//                   />
//                 ) : (
//                   // Standard Timeline and Actions View
//                   <>
//                     <TransactionTimeline
//                       steps={timelineSteps}
//                       isPayment={isPayment}
//                       status={transactionDetails.status}
//                       // Show spinner in timeline *only* if cancel modal is open and submitting
//                       isSubmitting={isSubmitting && isCancelModalOpen}
//                       onOpenCancelModal={() => {
//                            setSubmissionError(null); // Clear previous errors when opening modal
//                            setIsCancelModalOpen(true);
//                         }
//                       }
//                     />
//                     {/* --- Pass the refresh handler to TransactionUpdateActions --- */}
//                     <TransactionUpdateActions
//                       transaction={transactionDetails}
//                       canCancel={canCancelTransaction} // Pass the correct value
//                       isSubmitting={isSubmitting}
//                       showAwaitingVerificationView={showAwaitingVerificationView}
//                       submissionError={submissionError} // Pass error state
//                       onConfirmPayment={handleConfirmPaymentSubmit}
//                       onOpenCancelModal={() => { setSubmissionError(null); setIsCancelModalOpen(true); }}
//                       onSwitchToDetailsTab={() => setActiveTab("Details")}
//                       onRefresh={() => fetchTransactionDetails(false)} // Pass refresh handler (without spinner)
//                     />
//                   </>
//                 )}
//                 {/* Removed redundant fallback error display here */}
//               </div>
//             )}
//             {/* End Updates Tab */}

//             {/* --- Details Tab --- */}
//             {activeTab === "Details" && (
//               <TransactionDetailsContent
//                 transaction={transactionDetails}
//                 note={noteText}
//                 onNoteChange={handleNoteChange}
//                 formatDisplayDate={formatDisplayDate}
//               />
//             )}
//             {/* End Details Tab */}
//           </div>
//         </div>
//       </div>

//       {/* --- Cancellation Modal --- */}
//       {/* Render modal only if transactionDetails exist */}
//       {transactionDetails && (
//         <CancelTransferModal
//           isOpen={isCancelModalOpen}
//           onClose={() => {
//               // Prevent closing modal while a submission is in progress
//               if (!isSubmitting) {
//                   setIsCancelModalOpen(false);
//                   setSubmissionError(null); // Clear any errors shown in modal when closed manually
//               }
//           }}
//           transactionId={transactionId}
//           transactionType={transactionDetails.type} // Pass correct type
//           onConfirmCancel={handleConfirmCancel}
//           isSubmitting={isSubmitting} // Pass submitting state for button disabling
//           error={submissionError} // Pass error to display inside the modal
//         />
//       )}
//     </section>
//   );
// };

// export default TransactionDetailsPage;

// frontend/app/dashboard/transactions/[transactionId]/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parseISO, addHours } from "date-fns"; // Added addHours
import axios from "axios"; // Import axios for error checking

// Custom Hooks & Services
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path
import paymentService from "../../../services/payment"; // Adjust path
import transferService from "../../../services/transfer"; // Adjust path

// UI Components & Utils
import { cn } from "@/lib/utils"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import CancelTransferModal from "../../components/CancelTransferModal"; // Adjust path

// Transaction Specific Components & Types
import {
  TransactionDetailsPageParams,
  PaymentDetails,
  TransferDetails,
  TransactionDetails,
  TimelineStatus,
  TimelineStep,
} from "../../../../types/transaction"; // Adjust path
import TransactionHeader from "../../components/transactionDetails/TransactionHeader"; // Adjust path
import TransactionTabs from "../../components/transactionDetails/TransactionTabs"; // Adjust path
import TransactionTimeline from "../../components/transactionDetails/TransactionTimeline"; // Adjust path
import TransactionDetailsContent from "../../components/transactionDetails/TransactionDetailsContent"; // Adjust path
import AwaitingVerificationView from "../../components/transactionDetails/AwaitingVerificationView"; // Adjust path
import TransactionUpdateActions from "../../components/transactionDetails/TransactionUpdateActions"; // Adjust path
import TransactionDetailsPageSkeleton from "../../components/TransactionPageSection/TransactionDetailsPageSkeleton"; // Adjust path

// --- Helper function to calculate estimated arrival date ---
function calculateEstimatedArrivalDate(
  creationDateString: string | undefined
): string | null {
  if (!creationDateString) return null;

  try {
    const creationDate = parseISO(creationDateString);
    if (isNaN(creationDate.getTime())) {
      console.warn(
        "calculateEstimatedArrivalDate: Invalid date string provided:",
        creationDateString
      );
      return null;
    }

    const creationHour = creationDate.getHours();

    let hoursToAdd: number;
    if (creationHour >= 8 && creationHour < 18) {
      // 8 AM to 5:59 PM
      hoursToAdd = 48;
    } else {
      // 6 PM to 7:59 AM
      hoursToAdd = 64;
    }

    const arrivalDate = addHours(creationDate, hoursToAdd);
    // Format as "May 15, 2025, 4:17 PM"
    return format(arrivalDate, "MMM d, yyyy, h:mm a");
  } catch (e) {
    console.error(
      "Error calculating estimated arrival date:",
      e,
      "Input:",
      creationDateString
    );
    return null;
  }
}

// --- Component Definition ---
const TransactionDetailsPage = () => {
  // --- Hooks ---
  const params = useParams<TransactionDetailsPageParams>();
  const router = useRouter();
  const { transactionId } = params;
  const { token } = useAuth();

  // --- State Variables ---
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Updates" | "Details">("Updates");
  const [noteText, setNoteText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [showAwaitingVerificationView, setShowAwaitingVerificationView] =
    useState(false);

  // --- Data Fetching ---
  const fetchTransactionDetails = useCallback(
    async (showLoadingSpinner = true) => {
      if (!transactionId || !token) {
        setError("Missing transaction ID or authentication token.");
        setIsLoading(false);
        return;
      }
      if (showLoadingSpinner) setIsLoading(true);
      setError(null);
      setSubmissionError(null);
      console.log("Fetching details for:", transactionId);

      try {
        let found = false;
        // Try Transfer
        try {
          const transferData = (await transferService.getTransferDetails(
            transactionId,
            token
          )) as Omit<TransferDetails, "type">;
          const fullTransferData: TransferDetails = {
            ...transferData,
            type: "transfer",
          };
          setTransactionDetails(fullTransferData);
          setNoteText(fullTransferData.note || "");
          setShowAwaitingVerificationView(false);
          found = true;
          console.log("Found as Transfer. Status:", fullTransferData.status);
        } catch (transferErr: unknown) {
          let message = "Unknown error fetching transfer";
          let status = 0;
          if (axios.isAxiosError(transferErr) && transferErr.response) {
            message = transferErr.response.data?.message || message;
            status = transferErr.response.status;
          } else if (transferErr instanceof Error) {
            message = transferErr.message;
          }
          const isNotFoundError =
            status === 404 || message?.toLowerCase().includes("not found");
          if (isNotFoundError) {
            console.warn(
              `Transfer ${transactionId} not found (status ${status}). Trying Payment.`
            );
          } else if (status !== 0) {
            console.error(
              `Error fetching transfer ${transactionId} (status ${status}):`,
              message
            );
            throw transferErr;
          } else {
            console.error(
              "Non-API error fetching transfer details (allowing fallback):",
              transferErr
            );
          }
        }
        // Try Payment if not found as Transfer
        if (!found) {
          try {
            const paymentData = (await paymentService.getPaymentDetails(
              transactionId,
              token
            )) as unknown as Omit<PaymentDetails, "type">;
            const fullPaymentData: PaymentDetails = {
              ...paymentData,
              type: "payment",
            };
            setTransactionDetails(fullPaymentData);
            setNoteText(fullPaymentData.note || "");
            if (fullPaymentData.status !== "pending") {
              setShowAwaitingVerificationView(false);
            }
            found = true;
            console.log("Found as Payment. Status:", fullPaymentData.status);
          } catch (paymentErr: unknown) {
            let message = "Unknown error fetching payment";
            let status = 0;
            if (axios.isAxiosError(paymentErr) && paymentErr.response) {
              message = paymentErr.response.data?.message || message;
              status = paymentErr.response.status;
            } else if (paymentErr instanceof Error) {
              message = paymentErr.message;
            }
            if (
              status === 404 ||
              message?.toLowerCase().includes("not found")
            ) {
              setError(`Transaction with ID ${transactionId} not found.`);
              setTransactionDetails(null);
            } else {
              console.error(
                `Error fetching payment ${transactionId} (status ${status}):`,
                message
              );
              throw paymentErr;
            }
          }
        }
        if (!found && !error) {
          setError(
            `Transaction ${transactionId} could not be found or accessed.`
          );
          setTransactionDetails(null);
        }
      } catch (err: unknown) {
        let message = "Failed to load transaction details";
        if (axios.isAxiosError(err) && err.response) {
          message = err.response.data?.message || err.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
        setTransactionDetails(null);
        console.error("Unhandled error during transaction fetch:", err);
      } finally {
        if (showLoadingSpinner) setIsLoading(false);
      }
    },
    [transactionId, token]
  );

  useEffect(() => {
    fetchTransactionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, token]);

  const isPayment = useMemo(
    () => transactionDetails?.type === "payment",
    [transactionDetails]
  );
  const isTransfer = useMemo(
    () => transactionDetails?.type === "transfer",
    [transactionDetails]
  );

  const canCancelTransaction = useMemo(() => {
    if (!transactionDetails) return false;
    const { type, status } = transactionDetails;
    if (type === "payment") {
      return status === "pending" && !showAwaitingVerificationView;
    } else if (type === "transfer") {
      return status === "pending";
    }
    return false;
  }, [transactionDetails, showAwaitingVerificationView]);

  const formatDisplayDate = useCallback(
    (dateString: string | undefined): string => {
      if (!dateString) return "Date not available";
      try {
        const parsedDate = parseISO(dateString);
        if (isNaN(parsedDate.getTime())) throw new Error("Invalid date value");
        return format(parsedDate, "MMM d 'at' h:mm a");
      } catch (e) {
        console.error("Date formatting error:", e, "Input:", dateString);
        return "Invalid Date";
      }
    },
    []
  );

  const timelineSteps = useMemo((): TimelineStep[] => {
    if (!transactionDetails) return [];

    const {
      createdAt,
      updatedAt,
      status: overallStatus,
      failureReason,
      type,
    } = transactionDetails;
    const createdDate = formatDisplayDate(createdAt);
    const finalDate = formatDisplayDate(updatedAt);

    if (type === "payment") {
      const payment = transactionDetails as PaymentDetails;
      const isPending = overallStatus === "pending";
      const isInProgress = overallStatus === "in progress";
      const isComplete = overallStatus === "completed";
      const isCancelled = overallStatus === "canceled";
      const hasFailed = overallStatus === "failed";

      let steps: TimelineStep[] = [
        {
          id: "setup",
          label: "You set up this payment",
          status: "completed",
          date: createdDate,
        },
        {
          id: "waiting",
          label: "Your money's on its way to us",
          status: "pending",
          date: undefined,
          info: `your bank might take up to 4 hours to get it to us. we'll let you know when it arrives.`,
          showCancelAction: false,
        },
        {
          id: "receive",
          label: `We receive your ${payment.payInCurrency?.code || "money"}`,
          status: "pending",
          date: undefined,
        },
        {
          id: "add_balance",
          label: `We add it to your ${
            payment.balanceCurrency?.code || ""
          } balance`,
          status: "pending",
          date: undefined,
        },
        { id: "done", label: "All done!", status: "pending", date: undefined },
      ];

      if (isPending) {
        steps[1].status = "active";
        steps[1].showCancelAction = !showAwaitingVerificationView;
      } else if (isInProgress) {
        steps[1] = {
          ...steps[1],
          status: "completed",
          date: finalDate,
          info: null,
          showCancelAction: false,
        };
        steps[2] = {
          ...steps[2],
          status: "active",
          date: finalDate,
          info: `We're checking your payment of ${
            payment.amountToPay?.toFixed(2) ?? "N/A"
          } ${payment.payInCurrency?.code ?? ""}.`,
        };
      } else if (isComplete) {
        steps = steps.map((step, index) => ({
          ...step,
          status: "completed",
          date: index === 0 ? createdDate : finalDate,
          info: null,
          showCancelAction: false,
        }));
      } else if (isCancelled || hasFailed) {
        const finalStatusForStep: TimelineStatus = isCancelled
          ? "cancelled"
          : "failed";
        const finalInfo = isCancelled
          ? "This payment was cancelled."
          : `This payment failed. ${
              failureReason || "Check details tab or contact support."
            }`;
        let failedStepIndex = steps.findIndex(
          (step, index) => index > 0 && step.status !== "completed"
        );
        if (failedStepIndex === -1) failedStepIndex = steps.length - 1;
        for (let i = 1; i < failedStepIndex; i++) {
          if (steps[i].status !== "completed") {
            steps[i] = {
              ...steps[i],
              status: "completed",
              date: finalDate,
              info: null,
            };
          }
        }
        if (failedStepIndex >= 1) {
          steps[failedStepIndex] = {
            ...steps[failedStepIndex],
            status: finalStatusForStep,
            date: finalDate,
            info: finalInfo,
          };
        }
        for (let i = failedStepIndex + 1; i < steps.length; i++) {
          steps[i] = {
            ...steps[i],
            status: "pending",
            date: undefined,
            info: null,
          };
        }
        steps = steps.map((step) => ({ ...step, showCancelAction: false }));
      }
      return steps;
    } else if (type === "transfer") {
      const transfer = transactionDetails as TransferDetails;
      const isTransferPending = overallStatus === "pending";
      const isTransferProcessing = overallStatus === "processing";
      const isTransferComplete = overallStatus === "completed";
      const isTransferCancelled = overallStatus === "canceled";
      const isTransferFailed = overallStatus === "failed";

      let estimatedArrivalDateString = "";
      // Only calculate estimate if transaction is in an active, non-terminal state
      if ((isTransferPending || isTransferProcessing) && transfer.createdAt) {
        const estimatedArrival = calculateEstimatedArrivalDate(
          transfer.createdAt
        );
        if (estimatedArrival) {
          estimatedArrivalDateString = estimatedArrival;
        }
      }

      const deliveredStepBaseInfo = `The recipient’s bank should receive the funds shortly. However, please note that some banks may take up to 2 hours to process the transaction.`;

      let receivedStepInfo = `Your recipient should receive the funds.`;
      if (
        estimatedArrivalDateString &&
        (isTransferPending || isTransferProcessing)
      ) {
        receivedStepInfo = `Your recipient should receive the funds by an estimated ${estimatedArrivalDateString}.`;
      }

      let steps: TimelineStep[] = [
        {
          id: "setup",
          label: "You set up your transfer",
          status: "completed",
          date: createdDate,
        },
        {
          id: "funded",
          label: `We've taken funds from your ${
            transfer.sendCurrency?.code || "account"
          }`,
          status: "pending",
          date: undefined,
        },
        {
          id: "processing",
          label: `Your money's being processed`,
          status: "pending",
          date: undefined,
        },
        {
          id: "delivered",
          label: `Your money's been sent out to ${
            transfer.recipient?.accountHolderName || "recipient"
          }'s bank`,
          status: "pending",
          date: undefined,
          info: deliveredStepBaseInfo,
        },
        {
          id: "received",
          label: `${
            transfer.recipient?.accountHolderName || "Recipient"
          } received your ${transfer.receiveCurrency?.code || "money"}`,
          status: "pending",
          date: undefined,
          info: receivedStepInfo, // Initial info, may be overridden
        },
      ];

      if (isTransferPending) {
        steps[1].status = "active";
      } else if (isTransferProcessing) {
        steps[1] = { ...steps[1], status: "completed", date: finalDate };
        steps[2] = {
          ...steps[2],
          status: "active",
          date: finalDate,
          info: "We're converting and sending the funds.",
        };
      } else if (isTransferComplete) {
        steps = steps.map((step, index) => ({
          ...step,
          status: "completed",
          date: index === 0 ? createdDate : finalDate,
          info:
            step.id === "delivered"
              ? `Sent on ${finalDate}`
              : step.id === "received"
              ? `Received around ${finalDate}`
              : null,
        }));
      } else if (isTransferCancelled || isTransferFailed) {
        const finalStatusForStep: TimelineStatus = isTransferCancelled
          ? "cancelled"
          : "failed";
        const finalOverallInfoText = isTransferCancelled
          ? "Transfer cancelled."
          : `Transfer failed: ${
              failureReason || "Check details or contact support."
            }`;

        steps[0].status = "completed";

        // Determine at which step the failure/cancellation message should be shown.
        // Default to step 1 (funded) as this is where user cancellation typically occurs.
        let stopIndex = 1;

        // This is a simplified logic. A more robust solution would involve the backend
        // indicating the exact step of failure if it's a system failure beyond 'pending'.
        // For now, we assume if it's not 'pending' when it failed/cancelled, it might have been 'processing'.
        // We check if 'funded' (steps[1]) would have been marked as 'completed' by the 'isTransferProcessing' block.
        // This check is tricky as 'steps' array is rebuilt. We rely on `overallStatus` for a hint.
        // If `overallStatus` *was* 'processing' before becoming terminal, `stopIndex` could be 2.
        // However, `overallStatus` *is already* terminal here.
        // For simplicity and based on typical user cancellation:
        if (isTransferCancelled && canCancelTransaction) {
          // `canCancelTransaction` implies it was 'pending'
          stopIndex = 1;
        } else if (isTransferFailed) {
          // If failed, it's harder to know exactly where without more info.
          // Let's keep `stopIndex = 1` as a default if we can't reliably determine it reached processing.
          // A backend field like `failedAtStep` would be ideal.
          // If we want to assume failure during processing if it wasn't user-cancellable 'pending':
          // (This is an assumption based on limited frontend info)
          // if (!canCancelTransaction) { // Implies it was likely past 'pending' when it failed.
          //    stopIndex = 2; // Tentatively processing
          // }
          // For now, keeping stopIndex = 1 for failed as well to align with the "Transfer Cancelled" screenshot behavior.
          stopIndex = 1;
        }

        for (let i = 1; i < steps.length; i++) {
          if (i < stopIndex) {
            // Steps before the failure/cancellation point that were genuinely completed.
            // This depends on knowing the actual progress before failure.
            // If `stopIndex` is 1, this loop part won't run for `i=1`.
            // This part is more relevant if `stopIndex` can be > 1.
            // For now, if `stopIndex` is 1, this won't change `steps[0]` which is already completed.
            // We need to be careful not to mark things as 'completed' that weren't.
            // Let's assume only `steps[0]` is definitively completed if `stopIndex = 1`.
            // If `stopIndex = 2`, then `steps[1]` would be 'completed'.
            if (i < stopIndex) {
              // Only mark as completed if *before* the stop point
              steps[i] = {
                ...steps[i],
                status: "completed",
                date: finalDate,
                info: steps[i].info || null,
              };
            }
          } else if (i === stopIndex) {
            steps[i] = {
              ...steps[i],
              status: finalStatusForStep,
              date: finalDate,
              info: finalOverallInfoText,
            };
          } else {
            // For steps after failure/cancellation, set info to null
            steps[i] = {
              ...steps[i],
              status: "pending",
              date: undefined,
              info: null,
            };
          }
        }
      }

      steps = steps.map((step) => ({ ...step, showCancelAction: false }));
      return steps;
    }

    return [];
  }, [
    transactionDetails,
    formatDisplayDate,
    showAwaitingVerificationView,
    canCancelTransaction,
  ]); // Added canCancelTransaction

  const handleConfirmPaymentSubmit = useCallback(async () => {
    if (
      !transactionId ||
      !token ||
      !isPayment ||
      transactionDetails?.status !== "pending" ||
      showAwaitingVerificationView
    ) {
      console.warn("Confirm payment aborted. Conditions not met.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await paymentService.confirmUserTransfer(transactionId, token);
      setShowAwaitingVerificationView(true);
    } catch (err: unknown) {
      let message = `Failed to confirm payment`;
      let status = 0;
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data?.message || message;
        status = err.response.status;
      } else if (err instanceof Error) {
        message = err.message;
      }
      if (
        message.includes("not in pending state") ||
        status === 400 ||
        status === 409
      ) {
        setSubmissionError("Payment status may have changed. Refreshing...");
        await fetchTransactionDetails(false);
        setShowAwaitingVerificationView(false);
      } else {
        setSubmissionError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [
    transactionId,
    token,
    isPayment,
    transactionDetails?.status,
    fetchTransactionDetails,
    showAwaitingVerificationView,
  ]);

  const handleConfirmCancel = useCallback(async () => {
    if (!transactionId || !token || !transactionDetails) {
      setSubmissionError("Cannot proceed: Missing required information.");
      return;
    }
    if (!canCancelTransaction) {
      setSubmissionError(
        "This transaction can no longer be cancelled. Refreshing status..."
      );
      await fetchTransactionDetails(false);
      setIsCancelModalOpen(false);
      return;
    }
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      let cancelPromise;
      if (isPayment) {
        cancelPromise = paymentService.cancelPayment(transactionId, token);
      } else if (isTransfer) {
        cancelPromise = transferService.cancelTransfer(transactionId, token);
      } else {
        throw new Error("Cannot cancel: Unknown transaction type.");
      }
      await cancelPromise;
      setIsCancelModalOpen(false);
      await fetchTransactionDetails(false);
    } catch (err: unknown) {
      let message = `Failed to cancel ${isPayment ? "payment" : "transfer"}`;
      if (err instanceof Error) {
        message = err.message;
      }
      setSubmissionError(message);
      setIsCancelModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    transactionId,
    token,
    transactionDetails,
    isPayment,
    isTransfer,
    canCancelTransaction,
    fetchTransactionDetails,
  ]);

  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteText(e.target.value),
    []
  );

  const { headerStatusText, headerStatusColorClass } = useMemo(() => {
    if (!transactionDetails)
      return {
        headerStatusText: "Loading...",
        headerStatusColorClass: "text-gray-500 dark:text-gray-400",
      };
    if (
      isPayment &&
      transactionDetails.status === "pending" &&
      showAwaitingVerificationView
    ) {
      return {
        headerStatusText: "Verifying Payment",
        headerStatusColorClass:
          "text-blue-600 dark:text-blue-400 animate-pulse",
      };
    }
    switch (transactionDetails.status) {
      case "pending":
        return {
          headerStatusText: isPayment
            ? "Waiting for payment"
            : "Transfer Pending",
          headerStatusColorClass: "text-orange-600 dark:text-orange-400",
        };
      case "in progress":
        return {
          headerStatusText: "Processing Payment",
          headerStatusColorClass: "text-blue-600 dark:text-blue-400",
        };
      case "processing":
        return {
          headerStatusText: "Transfer Processing",
          headerStatusColorClass: "text-blue-600 dark:text-blue-400",
        };
      case "completed":
        return {
          headerStatusText: isPayment ? "Money Added" : "Transfer Completed",
          headerStatusColorClass: "text-green-600 dark:text-green-400",
        };
      case "canceled":
        return {
          headerStatusText: "Transaction Cancelled",
          headerStatusColorClass: "text-red-600 dark:text-red-400",
        };
      case "failed":
        return {
          headerStatusText: "Transaction Failed",
          headerStatusColorClass: "text-red-600 dark:text-red-400",
        };
      default:
        return {
          headerStatusText: `Status: ${transactionDetails.status}`,
          headerStatusColorClass: "text-gray-500 dark:text-gray-400",
        };
    }
  }, [transactionDetails, isPayment, showAwaitingVerificationView]);

  const SvgLoader = () => (
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
  );

  if (isLoading && !transactionDetails)
    return <TransactionDetailsPageSkeleton />;
  if (error && !transactionDetails) {
    return (
      <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
        <h2 className="lg:text-3xl text-2xl font-medium text-neutral-900 dark:text-white">
          Error Loading Transaction
        </h2>
        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300 max-w-lg mx-auto">
          {error}
        </p>
        <div className="flex sm:flex-row flex-col items-center justify-center gap-3 w-full">
          <button
            onClick={() => router.back()}
            className="inline-flex justify-center items-center font-medium cursor-pointer bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear"
          >
            Go Back
          </button>
          <button
            onClick={() => fetchTransactionDetails()}
            className="inline-flex justify-center items-center font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear cursor-pointer"
            disabled={isLoading}
          >
            
            {isLoading && <SvgLoader />}
            {isLoading ? "Retrying..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }
  if (!transactionDetails) {
    return (
      <div className="bg-lightgray dark:bg-primarybox rounded-2xl sm:p-6 p-4 text-center space-y-4 min-h-[300px] flex flex-col justify-center items-center">
        <p className="lg:text-lg text-base text-neutral-900 dark:text-white max-w-lg mx-auto">
          Transaction details could not be loaded.
        </p>
        <button
          onClick={() => router.push("/dashboard/transactions")}
          className="inline-flex justify-center items-center font-medium bg-primary hover:bg-primaryhover text-neutral-900 px-8 py-3 h-12.5 sm:w-auto w-full rounded-full transition-all duration-75 ease-linear cursor-pointer"
        >
          
          View All Transactions
        </button>
      </div>
    );
  }

  return (
    <section className="Transaction-Detial-Page-Wrapper">
      <div className="Transaction-Detial">
        <div className="bg-white dark:bg-background rounded-2xl border mx-auto lg:max-w-5xl">
          <TransactionHeader
            transaction={transactionDetails}
            statusText={headerStatusText}
            statusColorClass={headerStatusColorClass}
          />
          <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-4 sm:p-6">
            {activeTab === "Updates" && (
              <div>
                <div className="flex items-center mb-6 text-sm gap-2">
                  <span className="text-gray-500 dark:text-gray-300 flex-shrink-0">
                    {isPayment ? "Reference Code:" : "Transfer ID:"}
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-white break-all">
                    {isPayment
                      ? (transactionDetails as PaymentDetails).referenceCode ||
                        "N/A"
                      : transactionDetails._id}
                  </span>
                </div>
                {isPayment &&
                transactionDetails.status === "pending" &&
                showAwaitingVerificationView ? (
                  <AwaitingVerificationView
                    transaction={transactionDetails as PaymentDetails}
                    onRefresh={() => fetchTransactionDetails(false)}
                    isSubmitting={isLoading}
                  />
                ) : (
                  <>
                    <TransactionTimeline
                      steps={timelineSteps}
                      isPayment={!!isPayment}
                      status={transactionDetails.status}
                      isSubmitting={isSubmitting && isCancelModalOpen}
                      onOpenCancelModal={() => {
                        setSubmissionError(null);
                        setIsCancelModalOpen(true);
                      }}
                    />
                    <TransactionUpdateActions
                      transaction={transactionDetails}
                      canCancel={canCancelTransaction}
                      isSubmitting={isSubmitting}
                      showAwaitingVerificationView={
                        showAwaitingVerificationView
                      }
                      submissionError={submissionError}
                      onConfirmPayment={handleConfirmPaymentSubmit}
                      onOpenCancelModal={() => {
                        setSubmissionError(null);
                        setIsCancelModalOpen(true);
                      }}
                      onSwitchToDetailsTab={() => setActiveTab("Details")}
                      onRefresh={() => fetchTransactionDetails(false)}
                    />
                  </>
                )}
              </div>
            )}
            {activeTab === "Details" && (
              <TransactionDetailsContent
                transaction={transactionDetails}
                note={noteText}
                onNoteChange={handleNoteChange}
                formatDisplayDate={formatDisplayDate}
              />
            )}
          </div>
        </div>
      </div>
      {transactionDetails && (
        <CancelTransferModal
          isOpen={isCancelModalOpen}
          onClose={() => {
            if (!isSubmitting) {
              setIsCancelModalOpen(false);
              setSubmissionError(null);
            }
          }}
          transactionId={transactionId}
          transactionType={transactionDetails.type}
          onConfirmCancel={handleConfirmCancel}
          isSubmitting={isSubmitting}
          error={submissionError}
        />
      )}
    </section>
  );
};

export default TransactionDetailsPage;
